export const HOMEPAGE = {
  hero: {
    title: {
      tr: 'Veri Analizi, Eğitim & Danışmanlık',
      en: 'Data Analysis, Education & Consulting',
    },
    subtitle: {
      tr: 'En kaliteli eğitimleri ve en etkin çözümleri en hızlı bulabileceğiniz yerdesiniz',
      en: 'Your destination for the highest quality education and most effective solutions in the shortest time',
    },
    description: {
      tr: 'Kutup yıldızı olmayı ilke edinen ekibimiz, bu isimle sizlere akademik alanda hizmet sunmak için hazırdır.',
      en: 'Our team, which adopts being the North Star as a principle, is ready to serve you in the academic field with this name.',
    },
    cta: {
      primary: {
        tr: 'Bize Ulaşın',
        en: 'Contact Us',
      },
      secondary: {
        tr: 'Hizmetlerimiz',
        en: 'Our Services',
      },
      getFreeInfo: {
        tr: 'Ücretsiz Bilgi Alın',
        en: 'Get Free Information',
      },
    },
  },
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
  about: {
    title: {
      tr: 'Küresel Ölçekte Veri Analizi ve Yabancı Dil Eğitimi Hizmeti',
      en: 'Global Scale Data Analysis and Foreign Language Education Services',
    },
    description: {
      tr: 'Akademik çalışmalarınızda size profesyonel destek sağlıyoruz. Veri analizi, istatistiksel danışmanlık ve yabancı dil eğitimi konularında uzman ekibimizle yanınızdayız.',
      en: 'We provide professional support for your academic studies. We are with you with our expert team in data analysis, statistical consulting and foreign language education.',
    },
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
      {
        icon: 'Translate',
        title: {
          tr: 'Yabancı Dil Eğitimi',
          en: 'Foreign Language Education',
        },
        description: {
          tr: 'Takım işbirliğini güçlendirin',
          en: 'Strengthen team collaboration',
        },
        details: {
          tr: 'Akademik İngilizce ve diğer yabancı dil eğitimleriyle global ölçekte iletişim kurmanızı sağlıyoruz.',
          en: 'We enable you to communicate globally with Academic English and other foreign language trainings.',
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
