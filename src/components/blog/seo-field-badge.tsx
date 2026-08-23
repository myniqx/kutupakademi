'use client';

import { useState } from 'react';
import { AlertTriangle, CheckCircle2, Info, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Explains, in plain language, what each editor field does for search
 * engines. Written for site owners rather than developers: it never says a
 * field is "unused", because fields like keywords are still stored and
 * published — what changed is how much weight Google gives them.
 */

export type SeoFieldKey =
  | 'slug'
  | 'title_tr'
  | 'title_en'
  | 'description_tr'
  | 'description_en'
  | 'summary_tr'
  | 'summary_en'
  | 'keywords'
  | 'coverImage'
  | 'author'
  | 'content_tr'
  | 'content_en';

type SeoStatus = 'good' | 'fallback' | 'missing' | 'informational';

type SeoFieldInfo = {
  /** Where the value actually ends up, in the owner's words. */
  usage: string;
  /** What happens when it is left empty. */
  whenEmpty: string;
  /** Fields Google no longer weighs are always 'informational'. */
  alwaysInformational?: boolean;
  /** Empty is a real problem here, not just a fallback. */
  emptyIsProblem?: boolean;
  /** The form itself refuses to save without this, so say so directly. */
  required?: boolean;
};

const SEO_FIELDS: Record<SeoFieldKey, SeoFieldInfo> = {
  slug: {
    usage:
      'Yazının internet adresini oluşturur. Google bu adresi arama sonuçlarında gösterir ve site haritasına bu adresle eklenir.',
    whenEmpty: 'Türkçe başlıktan otomatik üretilir, dilerseniz değiştirebilirsiniz.',
    required: true,
  },
  title_tr: {
    usage:
      'Google arama sonuçlarında görünen mavi başlık. Ayrıca sosyal medyada paylaşıldığında çıkan başlık ve tarayıcı sekmesinde yazan isim.',
    whenEmpty: 'Yazının en belirleyici alanı — arama sonuçlarında ilk görünen şey budur.',
    required: true,
  },
  title_en: {
    usage:
      'İngilizce sayfanın arama sonuçlarındaki başlığı ve sosyal medya paylaşım başlığı.',
    whenEmpty:
      'Boş bırakılırsa İngilizce sayfada Türkçe başlık görünür. Sayfa çalışır ama yabancı ziyaretçiye Türkçe başlık gider.',
  },
  description_tr: {
    usage:
      'Google arama sonuçlarında başlığın altındaki açıklama yazısı. Sosyal medya paylaşımlarında da bu metin görünür.',
    whenEmpty:
      'Boş bırakılırsa Google yazının içinden rastgele bir bölüm seçip gösterir. Ziyaretçinin ilk gördüğü cümle kontrolünüzden çıkar — doldurmanız önerilir.',
    emptyIsProblem: true,
  },
  description_en: {
    usage:
      'İngilizce sayfanın arama sonuçlarındaki açıklama yazısı ve sosyal medya paylaşım metni.',
    whenEmpty:
      'Boş bırakılırsa İngilizce sayfada Türkçe açıklama görünür. Sayfa çalışır ama yabancı ziyaretçiye Türkçe metin gider.',
  },
  summary_tr: {
    usage:
      'Yazının başındaki özet kutusunda görünür. Ziyaretçi sayfaya girdiğinde okuduğu ilk bölüm olduğu için sayfada kalma süresini artırır; Google bu süreyi dolaylı olarak değerlendirir.',
    whenEmpty: 'Boş bırakılırsa özet kutusu hiç görünmez. Arama sıralamasına doğrudan etkisi olmaz.',
    alwaysInformational: true,
  },
  summary_en: {
    usage:
      'İngilizce sayfada özet kutusunda görünür. Sayfada kalma süresini artırır; Google bu süreyi dolaylı olarak değerlendirir.',
    whenEmpty: 'Boş bırakılırsa İngilizce sayfada özet kutusu görünmez. Arama sıralamasına doğrudan etkisi olmaz.',
    alwaysInformational: true,
  },
  keywords: {
    usage:
      'Sayfanın etiket bilgisine eklenir ve kaydedilir. Google bu alanı sıralama hesabında kullanmıyor — arama motorları artık anahtar kelimeleri yazının kendi metninden çıkarıyor. Yani buraya yazdığınız kelimelerin asıl karşılığı, aynı kelimelerin yazı içinde doğal biçimde geçmesidir. Alan kayıt altında tutulur ve sayfaya işlenir.',
    whenEmpty:
      'Boş bırakılması arama sıralamasını etkilemez. Kelimeleriniz yazının metninde geçiyorsa Google onları zaten görüyor.',
    alwaysInformational: true,
  },
  coverImage: {
    usage:
      'Yazı sosyal medyada (WhatsApp, LinkedIn, Facebook, X) paylaşıldığında görünen büyük görsel. Google Haberler ve görsel aramada da bu resim kullanılır.',
    whenEmpty:
      'Boş bırakılırsa sitenin varsayılan kapak görseli kullanılır. Paylaşımlar çalışır ama yazıya özel bir görsel her zaman daha çok tıklama alır.',
  },
  author: {
    usage:
      'Yazının kim tarafından yazıldığı bilgisi. Google bu bilgiyi içeriğin güvenilirliğini değerlendirirken dikkate alır.',
    whenEmpty: 'Boş bırakılırsa "KutupAkademi" yazar olarak görünür.',
  },
  content_tr: {
    usage:
      'Yazının kendisi. Arama sıralamasında en belirleyici alan burasıdır — Google konunuzu ve hangi aramalarda çıkacağınızı bu metinden anlar. Hedeflediğiniz kelimelerin burada doğal olarak geçmesi, en çok işe yarayan yöntemdir.',
    whenEmpty: 'Yazı metni olmadan sayfanın arama sonuçlarında görünme şansı yoktur.',
    required: true,
  },
  content_en: {
    usage:
      'İngilizce sayfanın metni. Google bu sayfanın hangi aramalarda çıkacağını buradan anlar.',
    whenEmpty:
      'Boş bırakılırsa İngilizce sayfada Türkçe metin görünür. Sayfa çalışır ama yabancı ziyaretçiye Türkçe içerik gider.',
  },
};

const STATUS_STYLE: Record<
  SeoStatus,
  { icon: LucideIcon; chip: string; accent: string; label: string }
> = {
  good: {
    icon: CheckCircle2,
    chip: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400',
    accent: 'text-emerald-600 dark:text-emerald-400',
    label: 'SEO',
  },
  fallback: {
    icon: CheckCircle2,
    chip: 'border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400',
    accent: 'text-amber-600 dark:text-amber-400',
    label: 'SEO',
  },
  missing: {
    icon: AlertTriangle,
    chip: 'border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-400',
    accent: 'text-red-600 dark:text-red-400',
    label: 'SEO',
  },
  informational: {
    icon: Info,
    chip: 'border-border bg-muted/50 text-muted-foreground',
    accent: 'text-muted-foreground',
    label: 'SEO',
  },
};

const STATUS_HEADLINE: Record<SeoStatus, string> = {
  good: 'Bu alan dolu ve arama motorlarına iletiliyor.',
  fallback: 'Bu alan boş — yerine otomatik bir değer kullanılıyor.',
  missing: 'Bu alanın doldurulması önerilir.',
  informational: 'Bilgi',
};

/** Required fields get their own headline: the form will not save without them. */
const REQUIRED_EMPTY_HEADLINE = 'Bu alan zorunlu, doldurmadan kaydedemezsiniz.';

function resolveStatus(field: SeoFieldInfo, isFilled: boolean): SeoStatus {
  if (field.alwaysInformational) return 'informational';
  if (isFilled) return 'good';
  if (field.required) return 'missing';
  return field.emptyIsProblem ? 'missing' : 'fallback';
}

export function SeoFieldBadge({
  field,
  value,
  className,
}: {
  field: SeoFieldKey;
  /** Current field value; whitespace-only counts as empty. */
  value?: string | null;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const info = SEO_FIELDS[field];
  const isFilled = Boolean(value && value.trim().length > 0);
  const status = resolveStatus(info, isFilled);
  const style = STATUS_STYLE[status];
  const StatusIcon = style.icon;
  const headline = !isFilled && info.required
    ? REQUIRED_EMPTY_HEADLINE
    : STATUS_HEADLINE[status];

  return (
    <span className={cn('relative inline-flex', className)}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        aria-expanded={open}
        aria-label={`SEO bilgisi: ${headline}`}
        className={cn(
          'inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-medium transition-colors',
          style.chip
        )}
      >
        <StatusIcon className="size-3" aria-hidden="true" />
        {style.label}
      </button>

      {open && (
        <span
          role="tooltip"
          className="absolute right-0 top-full z-50 mt-2 w-80 rounded-lg border border-border bg-popover p-3 text-left shadow-lg"
        >
          <span className="flex items-start gap-1.5 text-xs font-semibold text-foreground">
            <StatusIcon className={cn('mt-px size-3.5 shrink-0', style.accent)} aria-hidden="true" />
            {headline}
          </span>
          <span className="mt-2 block text-xs leading-relaxed text-muted-foreground">
            {info.usage}
          </span>
          {!isFilled && (
            <span className="mt-2 block border-t border-border pt-2 text-xs leading-relaxed text-muted-foreground">
              {info.whenEmpty}
            </span>
          )}
        </span>
      )}
    </span>
  );
}
