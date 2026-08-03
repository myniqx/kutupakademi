import * as dotenv from 'dotenv'
import { mkdir, writeFile } from 'fs/promises'
import { join } from 'path'
import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'
import { eq, inArray } from 'drizzle-orm'
import { blogs } from '../src/db/schema'
import { getAllGuidanceBlogRevisions } from '../src/constants/guidance-blog-revisions'

dotenv.config({ path: '.env.local' })

const revisions = getAllGuidanceBlogRevisions()

const protectedAnalysisSlugs = [
  'aracilik-etkisi-analizi-yaptirma',
  'duzenleyici-degisken-analizi',
]

function assertSafeScope() {
  const protectedTargets = revisions.filter((revision) =>
    revision.slug.includes('spss') || protectedAnalysisSlugs.includes(revision.slug),
  )

  if (protectedTargets.length > 0) {
    throw new Error(`Protected SPSS/analysis blogs entered the update scope: ${protectedTargets.map((item) => item.slug).join(', ')}`)
  }
}

async function main() {
  assertSafeScope()

  const databaseUrl = process.env.POSTGRES_URL
  if (!databaseUrl) {
    throw new Error('POSTGRES_URL is required in .env.local')
  }

  const applyChanges = process.argv.includes('--apply')
  const client = postgres(databaseUrl, { max: 1 })
  const db = drizzle(client)

  try {
    const targetSlugs = revisions.map((revision) => revision.slug)
    const existingRows = await db.select().from(blogs).where(inArray(blogs.slug, targetSlugs))
    const foundSlugs = new Set(existingRows.map((row) => row.slug))
    const missingSlugs = targetSlugs.filter((slug) => !foundSlugs.has(slug))

    if (missingSlugs.length > 0) {
      throw new Error(`Missing blog rows: ${missingSlugs.join(', ')}`)
    }

    console.log(`Validated ${existingRows.length} non-SPSS blog rows:`)
    targetSlugs.forEach((slug) => console.log(`- ${slug}`))

    if (!applyChanges) {
      console.log('Dry run only. Re-run with --apply to back up and update these rows.')
      return
    }

    const backupDirectory = join(process.cwd(), 'backups')
    const backupName = `guidance-blogs-${new Date().toISOString().replaceAll(':', '-')}.json`
    await mkdir(backupDirectory, { recursive: true })
    await writeFile(join(backupDirectory, backupName), JSON.stringify(existingRows, null, 2), 'utf8')

    await db.transaction(async (transaction) => {
      for (const revision of revisions) {
        await transaction
          .update(blogs)
          .set({
            title_tr: revision.tr.title,
            title_en: revision.en.title,
            description_tr: revision.tr.description,
            description_en: revision.en.description,
            summary_tr: revision.tr.summary,
            summary_en: revision.en.summary,
            keywords: revision.keywords,
            content_tr: revision.tr.content,
            content_en: revision.en.content,
            updatedAt: new Date(revision.lastModified),
          })
          .where(eq(blogs.slug, revision.slug))
      }
    })

    console.log(`Updated ${revisions.length} blog rows. Backup: backups/${backupName}`)
  } finally {
    await client.end()
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
})
