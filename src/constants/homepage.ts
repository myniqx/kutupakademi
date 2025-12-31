export const HOMEPAGE = {
  partners: {
    title: {
      tr: 'Teknoloji Ortaklarımız',
      en: 'Our Technology Partners',
    },
    subtitle: {
      tr: 'Güvenilir çözüm ortaklarımızla birlikte çalışıyoruz',
      en: 'We work together with our trusted solution partners',
    },
    list: [
      {
        name: 'Partner 1',
        logo: '/partners/partner-1.webp',
      },
      {
        name: 'Partner 2',
        logo: '/partners/partner-2.webp',
      },
      {
        name: 'Partner 3',
        logo: '/partners/partner-3.webp',
      },
      {
        name: 'Partner 4',
        logo: '/partners/partner-4.webp',
      },
      {
        name: 'Partner 5',
        logo: '/partners/partner-5.webp',
      },
    ],
  },
  services: {
    title: {
      tr: 'Hizmetlerimiz',
      en: 'Our Services',
    },
    subtitle: {
      tr: 'Akademik başarınız için kapsamlı hizmetler sunuyoruz',
      en: 'We offer comprehensive services for your academic success',
    },
    list: [
      {
        icon: 'ChartBar',
        title: {
          tr: 'İstatistik Analizi',
          en: 'Statistical Analysis',
        },
        description: {
          tr: 'Operasyonları düzenleyin, atıkları azaltın',
          en: 'Streamline operations, reduce waste',
        },
        details: {
          tr: 'SPSS, AMOS, LISREL ve diğer istatistiksel yazılımlarla profesyonel veri analizi hizmetleri sunuyoruz.',
          en: 'We provide professional data analysis services with SPSS, AMOS, LISREL and other statistical software.',
        },
      },
      {
        icon: 'GraduationCap',
        title: {
          tr: 'Akademik Danışmanlık',
          en: 'Academic Consulting',
        },
        description: {
          tr: 'Liderlik becerilerini geliştirin',
          en: 'Develop leadership skills',
        },
        details: {
          tr: 'Tez danışmanlığı, makale yazımı ve akademik çalışmalarınızda profesyonel destek sağlıyoruz.',
          en: 'We provide professional support in thesis consulting, article writing and your academic studies.',
        },

      },
    ],
  },
  process: {
    title: {
      tr: 'Çalışma Sürecimiz',
      en: 'Our Work Process',
    },
    subtitle: {
      tr: 'Projenizi baştan sona profesyonelce yönetiyoruz',
      en: 'We manage your project professionally from start to finish',
    },
    steps: [
      {
        number: 1,
        icon: 'ClipboardText',
        title: {
          tr: 'Planlama',
          en: 'Planning',
        },
        description: {
          tr: 'Proje süreçleri belirlenir, çalışma planı hazırlanır',
          en: 'Project processes are determined, work plan is prepared',
        },
      },
      {
        number: 2,
        icon: 'Gear',
        title: {
          tr: 'İşlem',
          en: 'Processing',
        },
        description: {
          tr: 'Uzman ekip tarafından işleme alınır',
          en: 'Processed by expert team',
        },
      },
      {
        number: 3,
        icon: 'ShieldCheck',
        title: {
          tr: 'Kontrol',
          en: 'Quality Control',
        },
        description: {
          tr: 'Uzman onayı alınır',
          en: 'Expert approval obtained',
        },
      },
      {
        number: 4,
        icon: 'CheckCircle',
        title: {
          tr: 'Teslimat',
          en: 'Delivery',
        },
        description: {
          tr: 'Belirlenen tarihte teslim edilir',
          en: 'Delivered on the specified date',
        },
      },
    ],
  },
} as const;
