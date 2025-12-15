export const TESTIMONIALS = {
  title: {
    tr: 'Müşterilerimiz Ne Diyor?',
    en: 'What Our Clients Say',
  },
  subtitle: {
    tr: 'Hizmetlerimizden yararlanan akademisyen ve öğrencilerin görüşleri',
    en: 'Opinions of academics and students who benefited from our services',
  },
  items: [
    {
      id: 1,
      name: 'Dr. Ahmet Yılmaz',
      role: {
        tr: 'Doktora Öğrencisi',
        en: 'PhD Student',
      },
      university: {
        tr: 'İstanbul Üniversitesi',
        en: 'Istanbul University',
      },
      avatar: '/testimonials/avatar-1.jpg', // Placeholder - can be replaced
      rating: 5,
      comment: {
        tr: 'SPSS analiz hizmetleri için Kutup Akademi ile çalıştım. Sonuçlar çok profesyonelce hazırlanmış ve detaylı açıklamalar eşliğinde teslim edildi. Tez sürecimde büyük destek oldular.',
        en: 'I worked with Kutup Akademi for SPSS analysis services. The results were prepared very professionally and delivered with detailed explanations. They were a great support in my thesis process.',
      },
      date: '2024-11-15',
    },
    {
      id: 2,
      name: 'Ayşe Kaya',
      role: {
        tr: 'Yüksek Lisans Öğrencisi',
        en: 'Master\'s Student',
      },
      university: {
        tr: 'Boğaziçi Üniversitesi',
        en: 'Bogazici University',
      },
      avatar: '/testimonials/avatar-2.jpg',
      rating: 5,
      comment: {
        tr: 'Yapısal eşitlik modellemesi konusunda aldığım danışmanlık hizmeti mükemmeldi. Karmaşık istatistiksel kavramları anlaşılır şekilde açıkladılar. Kesinlikle tavsiye ediyorum.',
        en: 'The consulting service I received on structural equation modeling was excellent. They explained complex statistical concepts in an understandable way. I definitely recommend it.',
      },
      date: '2024-10-28',
    },
    {
      id: 3,
      name: 'Prof. Dr. Mehmet Demir',
      role: {
        tr: 'Öğretim Üyesi',
        en: 'Faculty Member',
      },
      university: {
        tr: 'ODTÜ',
        en: 'METU',
      },
      avatar: '/testimonials/avatar-3.jpg',
      rating: 5,
      comment: {
        tr: 'Araştırma projemiz için meta-analiz hizmeti aldık. Literatür taramasından sonuç raporuna kadar her aşama titizlikle yürütüldü. Ekip son derece profesyonel ve yardımcı.',
        en: 'We received meta-analysis service for our research project. Every stage from literature review to final report was carried out meticulously. The team is extremely professional and helpful.',
      },
      date: '2024-09-20',
    },
    {
      id: 4,
      name: 'Zeynep Şahin',
      role: {
        tr: 'Doktora Öğrencisi',
        en: 'PhD Student',
      },
      university: {
        tr: 'Hacettepe Üniversitesi',
        en: 'Hacettepe University',
      },
      avatar: '/testimonials/avatar-4.jpg',
      rating: 5,
      comment: {
        tr: 'Nitel veri analizi için MAXQDA danışmanlığı aldım. Kodlama sürecinden tema oluşturmaya kadar bana rehberlik ettiler. Tezimin en önemli kısmını başarıyla tamamlamama yardımcı oldular.',
        en: 'I received MAXQDA consulting for qualitative data analysis. They guided me from coding process to theme creation. They helped me successfully complete the most important part of my thesis.',
      },
      date: '2024-11-05',
    },
    {
      id: 5,
      name: 'Can Öztürk',
      role: {
        tr: 'Yüksek Lisans Öğrencisi',
        en: 'Master\'s Student',
      },
      university: {
        tr: 'Sabancı Üniversitesi',
        en: 'Sabanci University',
      },
      avatar: '/testimonials/avatar-5.jpg',
      rating: 5,
      comment: {
        tr: 'Ölçek geliştirme ve uyarlama hizmetinden yararlandım. Faktör analizi ve güvenilirlik testleri konusunda uzman desteği aldım. Sonuçlar akademik standartlara tam uygundu.',
        en: 'I benefited from scale development and adaptation services. I received expert support on factor analysis and reliability tests. The results were fully compliant with academic standards.',
      },
      date: '2024-10-12',
    },
    {
      id: 6,
      name: 'Dr. Elif Arslan',
      role: {
        tr: 'Araştırma Görevlisi',
        en: 'Research Assistant',
      },
      university: {
        tr: 'Koç Üniversitesi',
        en: 'Koc University',
      },
      avatar: '/testimonials/avatar-6.jpg',
      rating: 5,
      comment: {
        tr: 'Bibliyometrik analiz için Vosviewer danışmanlığı aldım. Atıf ağı ve ortak yazarlık haritaları çok etkileyici hazırlandı. Makale yayın sürecimde değerli katkıları oldu.',
        en: 'I received Vosviewer consulting for bibliometric analysis. Citation network and co-authorship maps were prepared very impressively. They made valuable contributions to my article publication process.',
      },
      date: '2024-09-30',
    },
  ],
} as const;
