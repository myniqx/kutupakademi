import * as dotenv from 'dotenv'
import { mkdir, writeFile } from 'fs/promises'
import { join } from 'path'
import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'
import { eq, inArray } from 'drizzle-orm'
import { blogs } from '../src/db/schema'

dotenv.config({ path: '.env.local' })

const revisions = [
  {
    slug: 'ingilizce-tez-yazma',
    title_tr: 'İngilizce Tez Yazımında Akademik Dil Rehberi',
    title_en: 'Academic Language Guide for Writing a Thesis in English',
    description_tr: 'Kendi İngilizce tezinizi yazarken akademik dil, bölüm yapısı, kaynak kullanımı ve etik editoryal destek ilkelerini öğrenin.',
    description_en: 'Learn academic language, section structure, source use, and ethical editorial support principles while writing your own thesis in English.',
    summary_tr: '- İngilizce tez metni araştırmacı tarafından yazılır.\n- Danışmanlık, akademik dil ve yapı konusunda gerekçeli geri bildirim sunar.\n- Kaynak, veri, yorum ve nihai metin araştırmacının sorumluluğundadır.',
    summary_en: '- The English thesis is written by the researcher.\n- Consulting provides reasoned feedback on academic language and structure.\n- Sources, data, interpretation, and the final text remain the researcher’s responsibility.',
    keywords: 'İngilizce tez yazımı, akademik İngilizce, tez danışmanlığı, akademik dil, English thesis writing',
    content_tr: `# İngilizce Tez Yazımında Akademik Dil Rehberi

İngilizce tez yazmak yalnızca Türkçe bir metni başka dile çevirmek değildir. Araştırma sorusunu açık kurmak, yöntem tercihlerini gerekçelendirmek, kanıt ile yorum arasındaki sınırı korumak ve alanın akademik söylemine uygun bir metin oluşturmak gerekir.

> **Hizmet sınırı:** İngilizce tez veya tez bölümleri araştırmacı adına yazılmaz. Danışmanlık ve editoryal inceleme, araştırmacının kendi metnini geliştirmesine yöneliktir; nihai metin ve akademik sorumluluk araştırmacıya aittir.

## Yazmaya Başlamadan Önce

Üniversitenizin tez kılavuzunu, bölüm beklentilerini ve kullanılacak İngilizce çeşidini belirleyin. Araştırma sorusu, temel kavramlar ve yöntem için küçük bir terim listesi oluşturmak metin boyunca tutarlılığı artırır.

## Bölümler Arasında Tutarlılık

- **Giriş:** Problem, amaç ve araştırma sorusu aynı odağı taşımalıdır.
- **Literatür:** Kaynaklar yalnızca sıralanmamalı; benzerlikler, ayrımlar ve araştırma boşluğu sentezlenmelidir.
- **Yöntem:** Tasarım, örneklem, veri toplama ve analiz kararları yeniden üretilebilir açıklıkta yazılmalıdır.
- **Bulgular:** Sonuçlar yorumdan ayrılmalı; tablo ve şekiller metni tekrar etmek yerine desteklemelidir.
- **Tartışma:** Bulgular literatürle ilişkilendirilmeli, alternatif açıklamalar ve sınırlılıklar açıkça belirtilmelidir.

## Akademik İngilizce İçin Pratik İlkeler

Kısa ve açık cümleleri tercih edin. İddianın gücünü kanıtın gücüyle eşleştirin; “proves” gibi kesin ifadeler yerine araştırma tasarımına uygun fiiller kullanın. Zamirlerin hangi isme gönderme yaptığını ve terimlerin metin boyunca aynı anlamda kullanıldığını kontrol edin.

Kaynakları doğrudan çeviriyle gizlemek veya yalnızca kelimeleri değiştirmek etik bir parafraz değildir. Önce kaynağın fikrini anlayın, kendi araştırma bağlamınızda yeniden kurun ve mutlaka atıf yapın.

## Etik Editoryal Destek Neleri Kapsar?

- Araştırmacının yazdığı metinde dil bilgisi, açıklık ve akış geri bildirimi
- Terim ve zaman kullanımının tutarlılık kontrolü
- Bölüm yapısı ve paragraf bağlantıları için öneriler
- Atıf ve kaynakça biçiminin kontrolü
- Değişikliklerin gerekçesini açıklayan örnekli geri bildirim

Editoryal destek yeni argüman, kaynak, veri, bulgu veya tez bölümü üretmez. Araştırmacı önerileri değerlendirir ve her değişikliğin son kararını kendisi verir.

Kendi İngilizce tez metninizi geliştirirken akademik dil ve yapı hakkında geri bildirim almak için danışmanlık talebi oluşturabilirsiniz.`,
    content_en: `# Academic Language Guide for Writing a Thesis in English

Writing a thesis in English is not simply translating a text from another language. Researchers need to frame a clear question, justify methodological decisions, distinguish evidence from interpretation, and use the academic discourse of their field.

> **Service boundary:** We do not write an English thesis or thesis chapters on behalf of a researcher. Consulting and editorial review help researchers improve their own text; the final text and academic responsibility remain with the researcher.

## Before You Start

Identify your university guide, departmental expectations, and the variety of English required. A short terminology list for the research question, core concepts, and methods helps maintain consistency.

## Alignment Across Sections

- **Introduction:** The problem, purpose, and research question should share the same focus.
- **Literature review:** Sources should be synthesized by patterns, differences, and the research gap rather than listed.
- **Method:** Design, sampling, data collection, and analysis decisions should be explained reproducibly.
- **Findings:** Results should be separated from interpretation; tables and figures should support rather than repeat the text.
- **Discussion:** Findings should be connected to literature, with alternative explanations and limitations stated openly.

## Practical Academic English Principles

Prefer clear, economical sentences. Match the strength of a claim to the strength of the evidence; avoid words such as “proves” when the design supports a more limited conclusion. Check that pronouns have clear references and key terms keep the same meaning throughout.

Changing words or translating a source to conceal it is not ethical paraphrasing. Understand the idea, reconstruct it in your own research context, and cite the source.

## What Does Ethical Editorial Support Include?

- Feedback on grammar, clarity, and flow in text written by the researcher
- Checks for consistency in terminology and tense
- Suggestions for section structure and paragraph connections
- Citation and reference-format checks
- Examples that explain the reason behind recommended changes

Editorial support does not create new arguments, sources, data, findings, or thesis chapters. The researcher evaluates every suggestion and makes the final decision.

You can request consulting for feedback on academic language and structure while developing your own English thesis text.`,
  },
  {
    slug: 'intihal-dusurme',
    title_tr: 'Benzerlik Raporunu Etik Biçimde Yorumlama',
    title_en: 'How to Interpret a Similarity Report Ethically',
    description_tr: 'Benzerlik yüzdesinin ne anlama geldiğini, eşleşmelerin nasıl inceleneceğini ve kaynak kullanımının etik biçimde nasıl geliştirileceğini öğrenin.',
    description_en: 'Learn what a similarity percentage means, how to review matches, and how to improve source use ethically.',
    summary_tr: '- Benzerlik yüzdesi tek başına intihal kararı değildir.\n- Evrensel bir kabul oranı veya oran düşürme garantisi yoktur.\n- Amaç tespit sistemini atlatmak değil, kaynak kullanımını düzeltmektir.',
    summary_en: '- A similarity percentage alone is not a plagiarism decision.\n- There is no universal acceptable rate or reduction guarantee.\n- The goal is to correct source use, not bypass detection.',
    keywords: 'benzerlik raporu, Turnitin raporu yorumlama, akademik dürüstlük, etik kaynak kullanımı, similarity report',
    content_tr: `# Benzerlik Raporunu Etik Biçimde Yorumlama

Benzerlik raporu, bir metindeki ifadeleri erişebildiği kaynaklarla karşılaştırır ve eşleşmeleri gösterir. Raporun yüzdesi tek başına intihal kanıtı değildir; doğru alıntılar, kaynakça kayıtları, mevzuat metinleri ve yaygın yöntem ifadeleri de eşleşebilir.

> **Etik ilke:** Amaç bir hedef yüzdeye ulaşmak veya sistemi atlatmak değil, her eşleşmenin nedenini incelemek ve kaynak kullanımını akademik dürüstlük ilkelerine göre düzeltmektir.

## Evrensel Bir Benzerlik Oranı Var mı?

Hayır. Kabul ölçütleri üniversiteye, enstitüye, dergiye, disipline ve belge türüne göre değişir. Bazı kurumlar kaynakça veya doğrudan alıntıları farklı biçimde değerlendirir. Bu nedenle kurumunuzun güncel kılavuzu ve resmî danışmanınızın yönlendirmesi esas alınmalıdır.

## Eşleşmeler Nasıl İncelenir?

1. En yüksek yüzdeli kaynağa değil, her eşleşmenin bağlamına bakın.
2. Doğrudan alıntının tırnak, sayfa numarası ve atıf bilgilerinin tam olduğunu kontrol edin.
3. Parafrazın yalnızca kelime değişimi olmadığından emin olun.
4. Kaynağa çok yakın cümle yapıları varsa fikri yeniden anlayıp kendi araştırma bağlamınızda kurun.
5. Kaynakça ile metin içi atıfların birbirini karşıladığını doğrulayın.
6. Kendi daha önceki çalışmalarınızdan alınan bölümlerde öz-intihal ve yeniden kullanım kurallarını kontrol edin.

## Etik Parafraz Nasıl Yapılır?

Kaynağı kapatıp ana fikri kendi sözcüklerinizle açıklamayı deneyin. Ardından özgün kaynakla karşılaştırın, anlamı bozmadığınızı kontrol edin ve atfı ekleyin. Kaynağın özgün katkısı görünür kalmalıdır.

Otomatik eş anlamlı değiştirme, çeviri yoluyla kaynağı gizleme veya yapay zekâyla tespit sistemini yanıltma girişimleri bilimsel dürüstlük sorununu çözmez.

## Danışmanlık Neleri Kapsar?

- Kurum kılavuzuna göre rapor filtrelerinin açıklanması
- Eşleşmelerin alıntı, parafraz ve kaynakça açısından sınıflandırılması
- Araştırmacının kendi cümlelerini etik biçimde geliştirmesi için örnekli geri bildirim
- Atıf ve kaynakça tutarlılığı için kontrol listesi

Belirli bir yüzdeye düşürme garantisi verilmez ve metin araştırmacı adına yeniden yazılmaz. Nihai düzeltmeler ve teslim edilen çalışma araştırmacının sorumluluğundadır.`,
    content_en: `# How to Interpret a Similarity Report Ethically

A similarity report compares expressions in a document with sources available to the system and displays matches. The percentage alone is not proof of plagiarism; correct quotations, reference entries, legislation, and common method phrases may also match.

> **Ethical principle:** The goal is not to reach a target percentage or bypass a system. Each match should be reviewed and source use corrected according to academic integrity principles.

## Is There a Universal Similarity Rate?

No. Criteria differ by university, graduate school, journal, discipline, and document type. Some institutions treat references or direct quotations differently. Follow the current guide of your institution and the direction of your official supervisor.

## How Should Matches Be Reviewed?

1. Review the context of every match, not only the source with the highest percentage.
2. Check that direct quotations include quotation marks, page details, and a complete citation.
3. Make sure paraphrasing involves more than replacing words.
4. If sentence structure remains too close, understand the idea again and reconstruct it in your own research context.
5. Confirm that every in-text citation has a matching reference entry and vice versa.
6. For passages from your previous work, review rules on self-plagiarism and text recycling.

## How Do You Paraphrase Ethically?

Close the source and explain the core idea in your own words. Compare your version with the original, check that the meaning is accurate, and add the citation. The source’s original contribution must remain visible.

Automatic synonym replacement, translation to conceal a source, or using AI to mislead detection systems does not resolve an academic integrity problem.

## What Can Consulting Cover?

- Explaining report filters under the institution’s rules
- Classifying matches as quotations, paraphrases, or reference issues
- Example-based feedback so researchers can improve their own sentences ethically
- A checklist for citation and reference consistency

No target-percentage guarantee is offered, and the text is not rewritten on behalf of the researcher. Final corrections and the submitted work remain the researcher’s responsibility.`,
  },
  {
    slug: 'yapay-zeka-bypass',
    title_tr: 'Akademik Çalışmalarda Yapay Zekâ Kullanımını Şeffaf Beyan Etme',
    title_en: 'Transparent Disclosure of AI Use in Academic Work',
    description_tr: 'Yapay zekâyı tespit sistemlerini atlatmak için değil; kurum kurallarına uygun, doğrulanabilir ve şeffaf biçimde kullanmayı öğrenin.',
    description_en: 'Learn to use AI transparently, verifiably, and under institutional rules rather than attempting to bypass detection systems.',
    summary_tr: '- Yapay zekâ tespitini atlatmaya yönelik yöntem sunulmaz.\n- Kurum ve dergi politikaları kullanımdan önce kontrol edilmelidir.\n- Her çıktı doğrulanmalı; gerekli kullanım beyanı açıkça yapılmalıdır.',
    summary_en: '- No methods for bypassing AI detection are provided.\n- Institutional and journal policies should be checked before use.\n- Every output must be verified and required disclosures made clearly.',
    keywords: 'akademik yapay zeka kullanımı, yapay zeka beyanı, akademik dürüstlük, AI disclosure, responsible AI',
    content_tr: `# Akademik Çalışmalarda Yapay Zekâ Kullanımını Şeffaf Beyan Etme

Üretken yapay zekâ araçları fikir düzenleme, kavram açıklama, dil kontrolü ve teknik öğrenme süreçlerinde yardımcı olabilir. Ancak kullanımın kabul edilebilir sınırı üniversiteye, dergiye, derse ve çalışmanın türüne göre değişir.

> **Temel ilke:** Yapay zekâ çıktısını insan tarafından yazılmış gibi göstermek veya tespit sistemlerini atlatmak akademik dürüstlükle bağdaşmaz. Bu sayfa bypass yöntemi sunmaz.

## Kullanmadan Önce Politikayı Kontrol Edin

Kurumunuzun, dersinizin, etik kurulun, fon sağlayıcının veya hedef derginin güncel politikasını okuyun. Bazı yerler dil düzeltmeye izin verirken içerik üretimini sınırlar; bazıları kullanılan araç, sürüm, tarih ve istemlerin açıklanmasını ister.

## Uygun Kullanım İçin Kontrol Listesi

- Aracı hangi amaçla kullandığınızı önceden belirleyin.
- Kişisel veri, katılımcı bilgisi, yayımlanmamış bulgu veya gizli belge yüklemeyin.
- Üretilen her bilgi, kaynak ve hesaplamayı güvenilir birincil kaynaklardan doğrulayın.
- Yapay zekânın verdiği kaynakları görmeden kaynakçaya eklemeyin.
- Nihai argüman, analiz, yorum ve metni kendiniz oluşturun.
- Kurumun istediği kullanım beyanını açık ve yeterli biçimde ekleyin.

## Kullanım Beyanında Neler Bulunabilir?

Beyan; kullanılan aracın adı ve sürümü, kullanım tarihi, hangi görevlerde yararlanıldığı, çıktının nasıl doğrulandığı ve nihai sorumluluğun kimde olduğu gibi bilgileri içerebilir. Kesin biçim için kurum veya dergi politikasını izleyin.

Örnek yaklaşım: Araştırmacı, dil bilgisi önerileri için kullandığı aracı belirtir; tüm önerileri kendisinin değerlendirdiğini, kaynakları doğruladığını ve nihai metnin sorumluluğunu taşıdığını açıklar.

## Yapay Zekâ Tespit Araçlarının Sınırları

Tespit araçları kesin yazarlık kanıtı değildir ve yanlış pozitif ya da yanlış negatif sonuç üretebilir. Bu belirsizlik, kullanımı gizlemeyi haklı çıkarmaz. En güvenilir yaklaşım; çalışma notlarını, sürümleri, kaynak kontrollerini ve gerekli beyanları düzenli tutmaktır.

## Danışmanlık Yaklaşımı

Danışmanlık; kurum politikasını anlamlandırma, etik kullanım planı oluşturma, kaynak doğrulama kontrol listesi hazırlama ve araştırmacının kendi kullanım beyanına geri bildirim verme ile sınırlıdır. Yapay zekâ tespitini aşma veya çalışmayı araştırmacı adına üretme hizmeti sunulmaz.`,
    content_en: `# Transparent Disclosure of AI Use in Academic Work

Generative AI can support idea organization, concept explanation, language checks, and technical learning. Acceptable use, however, varies by university, journal, course, and type of work.

> **Core principle:** Presenting AI output as human-authored or attempting to bypass detection systems conflicts with academic integrity. This page does not provide bypass methods.

## Check the Policy Before Use

Read the current policy of your institution, course, ethics committee, funder, or target journal. Some allow language assistance while limiting content generation; others require disclosure of the tool, version, date, and prompts used.

## Responsible-Use Checklist

- Define the purpose of using the tool in advance.
- Do not upload personal data, participant information, unpublished findings, or confidential documents.
- Verify every factual claim, source, and calculation against reliable primary sources.
- Never add an AI-suggested reference without reading and verifying it.
- Develop the final argument, analysis, interpretation, and text yourself.
- Add the disclosure required by your institution clearly and fully.

## What Can a Disclosure Include?

A disclosure may include the tool and version, date of use, tasks for which it was used, how output was verified, and who holds final responsibility. Follow the exact format required by the institution or journal.

For example, a researcher may identify a tool used for grammar suggestions and explain that they evaluated every suggestion, verified the sources, and remain responsible for the final text.

## Limits of AI Detection Tools

Detection tools are not conclusive proof of authorship and can produce false positives or false negatives. This uncertainty does not justify concealing use. A reliable approach is to retain working notes, versions, source checks, and required disclosures.

## Consulting Approach

Consulting is limited to understanding institutional policy, creating a responsible-use plan, preparing a source-verification checklist, and giving feedback on the researcher’s own disclosure. We do not provide AI-detection bypass or produce academic work on a researcher’s behalf.`,
  },
  {
    slug: 'tez-sunumu-hazirlama',
    title_tr: 'Tez Sunumunu Geliştirme ve Savunma Provası',
    title_en: 'Improving Your Thesis Presentation and Defense Rehearsal',
    description_tr: 'Kendi tez sunumunuzu açık bir akışla geliştirin; süre yönetimi, görsel sadelik ve jüri sorularına hazırlık için uygulanabilir öneriler alın.',
    description_en: 'Improve your own thesis presentation with a clear flow and practical guidance on timing, visual simplicity, and committee questions.',
    summary_tr: '- Sunum ve konuşma metni araştırmacı tarafından hazırlanır.\n- Danışmanlık akış, süre, görsel tasarım ve prova geri bildirimi sağlar.\n- Araştırmacı yöntem ve bulgularını kendi sözleriyle savunur.',
    summary_en: '- Slides and speaking notes are prepared by the researcher.\n- Consulting provides feedback on flow, timing, visual design, and rehearsal.\n- The researcher defends methods and findings in their own words.',
    keywords: 'tez sunumu, tez savunması, sunum provası, akademik sunum, thesis defense presentation',
    content_tr: `# Tez Sunumunu Geliştirme ve Savunma Provası

Etkili bir tez sunumu, çalışmanın tamamını slaytlara taşımak yerine araştırma problemini, yöntemi, temel bulguları ve katkıyı anlaşılır bir anlatı içinde sunar. Sunum araştırmacının kendi çalışmasına hâkimiyetini göstermelidir.

> **Hizmet sınırı:** Slaytlar ve konuşma metni araştırmacı adına hazırlanmaz. Danışmanlık, araştırmacının oluşturduğu sunuma yapı, görsel sadelik, süre ve anlatım açısından geri bildirim verir.

## Önerilen Sunum Akışı

1. **Problem ve gerekçe:** Bu araştırma neden gerekliydi?
2. **Amaç ve sorular:** Çalışma tam olarak neyi araştırdı?
3. **Yöntem:** Tasarım, örneklem, veri ve analiz tercihleri neden uygundu?
4. **Temel bulgular:** Araştırma sorularını yanıtlayan en önemli sonuçlar nelerdi?
5. **Tartışma:** Bulgular literatürle nasıl ilişkilendiriliyor?
6. **Katkı ve sınırlılıklar:** Çalışma ne sağlıyor ve hangi sınırlar içinde yorumlanmalı?
7. **Sonuç:** Jürinin hatırlamasını istediğiniz ana mesaj nedir?

## Slayt Tasarımında Sadelik

Her slayt tek bir ana fikre hizmet etmelidir. Küçük yazı, uzun paragraf ve gereksiz animasyonlardan kaçının. Tabloyu olduğu gibi kopyalamak yerine soruyu yanıtlayan değerleri vurgulayın; eksen, birim, örneklem ve belirsizlik bilgilerini görünür tutun.

## Süre Yönetimi

Toplam süreyi bölümlere ayırın ve yöntem ile bulgulara yeterli zaman bırakın. Birden fazla tam prova yapın. Prova sırasında geçen süreyi, zorlandığınız geçişleri ve açıklaması uzayan kavramları not ederek sunumu sadeleştirin.

## Jüri Sorularına Hazırlık

Örneklem seçimi, ölçüm araçları, analiz varsayımları, alternatif yöntemler, beklenmeyen bulgular ve sınırlılıklar hakkında kısa ve dürüst yanıtlar hazırlayın. Bilmediğiniz bir konuda tahmin yürütmek yerine sınırı kabul edip nasıl araştıracağınızı açıklamak daha güvenilirdir.

## Danışmanlık Neleri Kapsar?

- Araştırmacının hazırladığı slaytların akış ve süre bakımından değerlendirilmesi
- Görsellerin okunabilirliği ve tablo/grafik seçimi için geri bildirim
- Yöntem ve sınırlılıkların açık anlatımı için prova
- Olası sorular üzerinden deneme savunması
- Araştırmacının kendi konuşma notlarını sadeleştirmesine yönelik öneriler

Kendi hazırladığınız tez sunumunu geliştirmek ve savunma provası yapmak için danışmanlık talebi oluşturabilirsiniz.`,
    content_en: `# Improving Your Thesis Presentation and Defense Rehearsal

An effective thesis presentation does not transfer the entire document onto slides. It presents the research problem, method, key findings, and contribution as a clear narrative and demonstrates the researcher’s command of their own work.

> **Service boundary:** Slides and speaking notes are not prepared on behalf of the researcher. Consulting gives feedback on structure, visual simplicity, timing, and delivery for a presentation created by the researcher.

## Suggested Presentation Flow

1. **Problem and rationale:** Why was this research needed?
2. **Purpose and questions:** What exactly did the study investigate?
3. **Method:** Why were the design, sample, data, and analysis choices appropriate?
4. **Key findings:** Which results answer the research questions?
5. **Discussion:** How do the findings relate to the literature?
6. **Contribution and limitations:** What does the study add, and within what limits?
7. **Conclusion:** What is the main message the committee should remember?

## Visual Simplicity

Each slide should serve one main idea. Avoid small type, long paragraphs, and unnecessary animation. Instead of copying a full table, highlight values that answer the question while keeping axes, units, sample details, and uncertainty visible.

## Timing

Divide the available time across sections and reserve enough space for methods and findings. Run several full rehearsals. Record timing, difficult transitions, and concepts that take too long to explain, then simplify the presentation.

## Preparing for Committee Questions

Prepare concise and honest answers about sampling, measures, analysis assumptions, alternative methods, unexpected findings, and limitations. When you do not know something, acknowledging the limit and explaining how you would investigate it is more reliable than guessing.

## What Can Consulting Cover?

- Reviewing the researcher’s slides for flow and timing
- Feedback on readability and selection of tables or figures
- Rehearsal for explaining methods and limitations clearly
- A mock defense using possible committee questions
- Suggestions to simplify the researcher’s own speaking notes

You can request consulting to improve a thesis presentation you prepared yourself and rehearse your defense.`,
  },
] as const

async function main() {
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

    console.log(`Validated ${existingRows.length} blog rows: ${targetSlugs.join(', ')}`)

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
            title_tr: revision.title_tr,
            title_en: revision.title_en,
            description_tr: revision.description_tr,
            description_en: revision.description_en,
            summary_tr: revision.summary_tr,
            summary_en: revision.summary_en,
            keywords: revision.keywords,
            content_tr: revision.content_tr,
            content_en: revision.content_en,
            updatedAt: new Date(),
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
