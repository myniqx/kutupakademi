export const HOMEPAGE = {
  partners: {
    title: {
      tr: 'Kullandığımız Teknolojiler',
      en: 'Technologies We Use',
    },
    subtitle: {
      tr: 'Araştırma ve analiz süreçlerinde yararlandığımız yazılım araçları',
      en: 'Software tools used in research and analysis workflows',
    },
    list: [
      {
        name: 'AMOS',
        logo: '/partners/amos.webp',
      },
      {
        name: 'Comprehensive Meta Analysis',
        logo: '/partners/comprehensive-meta-analysis.webp',
      },
      {
        name: 'G*Power',
        logo: '/partners/gpower.webp',
      },
      {
        name: 'Jamovi',
        logo: '/partners/jamovi.webp',
      },
      {
        name: 'JASP',
        logo: '/partners/jasp.webp',
      },
      {
        name: 'MAXQDA',
        logo: '/partners/maxqda.webp',
      },
      {
        name: 'Minitab',
        logo: '/partners/minitab.webp',
      },
      {
        name: 'Power BI',
        logo: '/partners/power-bi.webp',
      },
      {
        name: 'Python',
        logo: '/partners/python.webp',
      },
      {
        name: 'R',
        logo: '/partners/r.webp',
      },
      {
        name: 'SPSS',
        logo: '/partners/spss.webp',
      },
      {
        name: 'SQL',
        logo: '/partners/sql.webp',
      },
      {
        name: 'VOSviewer',
        logo: '/partners/vosviewer.webp',
      },
      {
        name: 'Winsteps',
        logo: '/partners/winsteps.webp',
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
          tr: 'Araştırma planlama, yöntem seçimi, akademik yazım ilkeleri ve araştırmacının kendi metnini geliştirmesi için danışmanlık sağlıyoruz.',
          en: 'We provide consulting on research planning, method selection, academic writing principles, and helping researchers improve their own texts.',
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
      tr: 'Araştırmacının sorumluluğunu koruyan şeffaf bir danışmanlık süreci',
      en: 'A transparent consulting process that preserves the researcher’s responsibility',
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
          tr: 'İhtiyaç ve danışmanlık kapsamı birlikte netleştirilir',
          en: 'The need and consulting scope are clarified together',
        },
      },
      {
        number: 2,
        icon: 'Gear',
        title: {
          tr: 'Rehberlik',
          en: 'Guidance',
        },
        description: {
          tr: 'Yöntem, araç ve uygulama adımları araştırmacıyla paylaşılır',
          en: 'Methods, tools, and practical steps are shared with the researcher',
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
          tr: 'Araştırmacının kendi çıktıları bilimsel ölçütlerle gözden geçirilir',
          en: 'The researcher’s own outputs are reviewed against scientific criteria',
        },
      },
      {
        number: 4,
        icon: 'CheckCircle',
        title: {
          tr: 'Geri Bildirim',
          en: 'Feedback',
        },
        description: {
          tr: 'Geliştirme önerileri ve izlenecek sonraki adımlar paylaşılır',
          en: 'Improvement suggestions and next steps are shared',
        },
      },
    ],
  },
} as const;
