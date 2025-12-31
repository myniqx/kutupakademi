export const SERVICE_SLUGS = [
  'yapisal-esitlik-modellemesi-analizi',
  'spss-veri-analizi-yaptirma-2',
  'spss-odevi-yaptirma',
  'spss-egitimi-ile-veri-analizi',
  'spss-ile-olcek-gelistirme-ve-uyarlama-hizmeti',
  'maxqda-ile-tematik-analiz-hizmeti',
  'vosviewer-ile-bibliyometrik-analiz-yaptirma',
  'g-power-ile-orneklem-buyuklugu-hesaplama-analizi',
  'meta-analiz-yaptirma',
  'tez-danismanligi',
  'tez-duzenleme-hizmetleri',
] as const;

export type ServiceSlug = typeof SERVICE_SLUGS[number];

export const SERVICE_CATEGORIES = {
  quantitative: {
    id: 'quantitative',
    icon: 'ChartBar',
    title: {
      tr: 'Nicel Veri Analizi',
      en: 'Quantitative Data Analysis',
    },
    description: {
      tr: 'İstatistiksel analiz ve nicel araştırma yöntemleri',
      en: 'Statistical analysis and quantitative research methods',
    },
    services: [
      'spss-veri-analizi-yaptirma-2',
      'yapisal-esitlik-modellemesi-analizi',
      'spss-odevi-yaptirma',
      'spss-egitimi-ile-veri-analizi',
      'spss-ile-olcek-gelistirme-ve-uyarlama-hizmeti',
      'g-power-ile-orneklem-buyuklugu-hesaplama-analizi',
    ] as ServiceSlug[],
  },
  qualitative: {
    id: 'qualitative',
    icon: 'MagnifyingGlass',
    title: {
      tr: 'Nitel Veri Analizi',
      en: 'Qualitative Data Analysis',
    },
    description: {
      tr: 'Tematik analiz ve nitel araştırma yöntemleri',
      en: 'Thematic analysis and qualitative research methods',
    },
    services: [
      'maxqda-ile-tematik-analiz-hizmeti',
    ] as ServiceSlug[],
  },
  literature: {
    id: 'literature',
    icon: 'Books',
    title: {
      tr: 'Literatür Analizi',
      en: 'Literature Analysis',
    },
    description: {
      tr: 'Bibliyometrik ve meta analiz hizmetleri',
      en: 'Bibliometric and meta-analysis services',
    },
    services: [
      'vosviewer-ile-bibliyometrik-analiz-yaptirma',
      'meta-analiz-yaptirma',
    ] as ServiceSlug[],
  },
  consulting: {
    id: 'consulting',
    icon: 'GraduationCap',
    title: {
      tr: 'Tez & Danışmanlık',
      en: 'Thesis & Consulting',
    },
    description: {
      tr: 'Akademik tez danışmanlığı ve düzenleme hizmetleri',
      en: 'Academic thesis consulting and editing services',
    },
    services: [
      'tez-danismanligi',
      'tez-duzenleme-hizmetleri',
    ] as ServiceSlug[],
  },
} as const;

export type ServiceCategoryId = keyof typeof SERVICE_CATEGORIES;

export type ServiceData = {
  title: {
    tr: string;
    en: string;
  };
  description: {
    tr: string;
    en: string;
  };
  shortDescription: {
    tr: string;
    en: string;
  };
  features: {
    tr: string[];
    en: string[];
  };
  process: {
    title: { tr: string; en: string };
    steps: {
      title: { tr: string; en: string };
      description: { tr: string; en: string };
    }[];
  };
  pricing: {
    tr: string;
    en: string;
  };
  faq?: {
    question: { tr: string; en: string };
    answer: { tr: string; en: string };
  }[];
};

export const SERVICES: Record<ServiceSlug, ServiceData> = {
  'yapisal-esitlik-modellemesi-analizi': {
    title: {
      tr: 'Yapısal Eşitlik Modellemesi Analizi',
      en: 'Structural Equation Modeling Analysis',
    },
    description: {
      tr: 'Yapısal Eşitlik Modellemesi (YEM) analizi ile karmaşık ilişkileri modelleyin ve test edin.',
      en: 'Model and test complex relationships with Structural Equation Modeling (SEM) analysis.',
    },
    shortDescription: {
      tr: 'YEM analizi ile değişkenler arası ilişkileri test edin.',
      en: 'Test relationships between variables with SEM analysis.',
    },
    features: {
      tr: [
        'AMOS, LISREL veya Mplus ile analiz',
        'Ölçüm modeli ve yapısal model testleri',
        'Uyum iyiliği indeksleri değerlendirmesi',
        'Path analizi ve mediation/moderation testleri',
      ],
      en: [
        'Analysis with AMOS, LISREL or Mplus',
        'Measurement model and structural model tests',
        'Goodness of fit indices evaluation',
        'Path analysis and mediation/moderation tests',
      ],
    },
    process: {
      title: { tr: 'Çalışma Süreci', en: 'Work Process' },
      steps: [
        {
          title: { tr: 'İhtiyaç Analizi', en: 'Needs Analysis' },
          description: {
            tr: 'Araştırma modelinizi ve hipotezlerinizi değerlendiririz.',
            en: 'We evaluate your research model and hypotheses.',
          },
        },
        {
          title: { tr: 'Veri Kontrolü', en: 'Data Check' },
          description: {
            tr: 'Veri setinizin YEM için uygunluğunu kontrol ederiz.',
            en: 'We check the suitability of your dataset for SEM.',
          },
        },
        {
          title: { tr: 'Analiz ve Raporlama', en: 'Analysis and Reporting' },
          description: {
            tr: 'Detaylı analiz sonuçları ve yorumlarını sunarız.',
            en: 'We provide detailed analysis results and interpretations.',
          },
        },
      ],
    },
    pricing: {
      tr: 'Fiyat teklifi için iletişime geçin',
      en: 'Contact us for a price quote',
    },
  },
  'spss-veri-analizi-yaptirma-2': {
    title: {
      tr: 'SPSS Veri Analizi Yaptırma',
      en: 'SPSS Data Analysis Service',
    },
    description: {
      tr: 'Profesyonel SPSS veri analizi hizmeti ile araştırmanızı güçlendirin.',
      en: 'Strengthen your research with professional SPSS data analysis service.',
    },
    shortDescription: {
      tr: 'Kapsamlı SPSS veri analizi ve raporlama hizmeti.',
      en: 'Comprehensive SPSS data analysis and reporting service.',
    },
    features: {
      tr: [
        'Betimsel ve çıkarımsal istatistikler',
        'T-testi, ANOVA, regresyon analizi',
        'Faktör analizi ve güvenilirlik testleri',
        'Detaylı tablo ve grafik hazırlama',
      ],
      en: [
        'Descriptive and inferential statistics',
        'T-test, ANOVA, regression analysis',
        'Factor analysis and reliability tests',
        'Detailed table and chart preparation',
      ],
    },
    process: {
      title: { tr: 'Çalışma Süreci', en: 'Work Process' },
      steps: [
        {
          title: { tr: 'Veri İnceleme', en: 'Data Review' },
          description: {
            tr: 'Veri setinizi inceleyip analiz planı oluştururuz.',
            en: 'We review your dataset and create an analysis plan.',
          },
        },
        {
          title: { tr: 'Analiz', en: 'Analysis' },
          description: {
            tr: 'SPSS ile gerekli tüm analizleri gerçekleştiririz.',
            en: 'We perform all necessary analyses with SPSS.',
          },
        },
        {
          title: { tr: 'Raporlama', en: 'Reporting' },
          description: {
            tr: 'APA formatında detaylı rapor hazırlarız.',
            en: 'We prepare detailed reports in APA format.',
          },
        },
      ],
    },
    pricing: {
      tr: 'Fiyat teklifi için iletişime geçin',
      en: 'Contact us for a price quote',
    },
  },
  'spss-odevi-yaptirma': {
    title: {
      tr: 'SPSS Ödevi Yaptırma',
      en: 'SPSS Assignment Service',
    },
    description: {
      tr: 'Üniversite SPSS ödevleriniz için profesyonel destek.',
      en: 'Professional support for your university SPSS assignments.',
    },
    shortDescription: {
      tr: 'SPSS ödevlerinizde uzman desteği.',
      en: 'Expert support for your SPSS assignments.',
    },
    features: {
      tr: [
        'Adım adım çözüm açıklamaları',
        'Detaylı yorumlama',
        'Grafik ve tablo hazırlama',
        'Hızlı teslimat',
      ],
      en: [
        'Step-by-step solution explanations',
        'Detailed interpretation',
        'Chart and table preparation',
        'Fast delivery',
      ],
    },
    process: {
      title: { tr: 'Çalışma Süreci', en: 'Work Process' },
      steps: [
        {
          title: { tr: 'Ödev Detayları', en: 'Assignment Details' },
          description: {
            tr: 'Ödev gereksinimlerini detaylıca inceleriz.',
            en: 'We review assignment requirements in detail.',
          },
        },
        {
          title: { tr: 'Çözüm', en: 'Solution' },
          description: {
            tr: 'SPSS kullanarak ödevi çözeriz.',
            en: 'We solve the assignment using SPSS.',
          },
        },
        {
          title: { tr: 'Açıklama', en: 'Explanation' },
          description: {
            tr: 'Her adımı detaylıca açıklarız.',
            en: 'We explain each step in detail.',
          },
        },
      ],
    },
    pricing: {
      tr: 'Fiyat teklifi için iletişime geçin',
      en: 'Contact us for a price quote',
    },
  },
  'spss-egitimi-ile-veri-analizi': {
    title: {
      tr: 'SPSS Eğitimi ile Veri Analizi',
      en: 'Data Analysis with SPSS Training',
    },
    description: {
      tr: 'Birebir SPSS eğitimi ile veri analizini kendiniz yapabilir hale gelin.',
      en: 'Learn to perform data analysis yourself with one-on-one SPSS training.',
    },
    shortDescription: {
      tr: 'Online veya yüz yüze SPSS eğitimi.',
      en: 'Online or face-to-face SPSS training.',
    },
    features: {
      tr: [
        'Birebir veya grup eğitimleri',
        'Uygulamalı örnekler',
        'Kendi veriniz üzerinde çalışma',
        'Eğitim sonrası destek',
      ],
      en: [
        'One-on-one or group training',
        'Practical examples',
        'Working on your own data',
        'Post-training support',
      ],
    },
    process: {
      title: { tr: 'Eğitim Süreci', en: 'Training Process' },
      steps: [
        {
          title: { tr: 'İhtiyaç Belirleme', en: 'Needs Assessment' },
          description: {
            tr: 'Eğitim ihtiyaçlarınızı belirleriz.',
            en: 'We determine your training needs.',
          },
        },
        {
          title: { tr: 'Eğitim Planı', en: 'Training Plan' },
          description: {
            tr: 'Kişiselleştirilmiş eğitim programı oluştururuz.',
            en: 'We create a personalized training program.',
          },
        },
        {
          title: { tr: 'Uygulama', en: 'Practice' },
          description: {
            tr: 'Uygulamalı örneklerle öğrenirsiniz.',
            en: 'You learn with practical examples.',
          },
        },
      ],
    },
    pricing: {
      tr: 'Fiyat teklifi için iletişime geçin',
      en: 'Contact us for a price quote',
    },
  },
  'spss-ile-olcek-gelistirme-ve-uyarlama-hizmeti': {
    title: {
      tr: 'SPSS ile Ölçek Geliştirme ve Uyarlama Hizmeti',
      en: 'Scale Development and Adaptation Service with SPSS',
    },
    description: {
      tr: 'Geçerli ve güvenilir ölçek geliştirme veya uyarlama sürecinizde uzman desteği.',
      en: 'Expert support in your valid and reliable scale development or adaptation process.',
    },
    shortDescription: {
      tr: 'Ölçek geliştirme ve uyarlama hizmeti.',
      en: 'Scale development and adaptation service.',
    },
    features: {
      tr: [
        'Açımlayıcı faktör analizi (AFA)',
        'Doğrulayıcı faktör analizi (DFA)',
        'Güvenilirlik analizleri',
        'Geçerlilik testleri',
      ],
      en: [
        'Exploratory factor analysis (EFA)',
        'Confirmatory factor analysis (CFA)',
        'Reliability analyses',
        'Validity tests',
      ],
    },
    process: {
      title: { tr: 'Çalışma Süreci', en: 'Work Process' },
      steps: [
        {
          title: { tr: 'Ölçek İnceleme', en: 'Scale Review' },
          description: {
            tr: 'Ölçeğinizi ve madde havuzunu inceleriz.',
            en: 'We review your scale and item pool.',
          },
        },
        {
          title: { tr: 'Analiz', en: 'Analysis' },
          description: {
            tr: 'Gerekli tüm istatistiksel analizleri yaparız.',
            en: 'We perform all necessary statistical analyses.',
          },
        },
        {
          title: { tr: 'Raporlama', en: 'Reporting' },
          description: {
            tr: 'Detaylı psikometrik özellik raporu hazırlarız.',
            en: 'We prepare detailed psychometric property report.',
          },
        },
      ],
    },
    pricing: {
      tr: 'Fiyat teklifi için iletişime geçin',
      en: 'Contact us for a price quote',
    },
  },
  'maxqda-ile-tematik-analiz-hizmeti': {
    title: {
      tr: 'MAXQDA ile Tematik Analiz Hizmeti',
      en: 'Thematic Analysis Service with MAXQDA',
    },
    description: {
      tr: 'Nitel veri analizinde MAXQDA ile profesyonel tematik analiz hizmeti.',
      en: 'Professional thematic analysis service with MAXQDA for qualitative data analysis.',
    },
    shortDescription: {
      tr: 'Nitel veri için MAXQDA tematik analiz.',
      en: 'MAXQDA thematic analysis for qualitative data.',
    },
    features: {
      tr: [
        'Veri kodlama ve kategorizasyon',
        'Tema oluşturma ve analiz',
        'Görselleştirme ve raporlama',
        'MAXQDA proje dosyası teslimi',
      ],
      en: [
        'Data coding and categorization',
        'Theme creation and analysis',
        'Visualization and reporting',
        'MAXQDA project file delivery',
      ],
    },
    process: {
      title: { tr: 'Çalışma Süreci', en: 'Work Process' },
      steps: [
        {
          title: { tr: 'Veri Hazırlama', en: 'Data Preparation' },
          description: {
            tr: 'Nitel verilerinizi MAXQDA için hazırlarız.',
            en: 'We prepare your qualitative data for MAXQDA.',
          },
        },
        {
          title: { tr: 'Kodlama', en: 'Coding' },
          description: {
            tr: 'Sistematik kodlama ve tema oluşturma.',
            en: 'Systematic coding and theme creation.',
          },
        },
        {
          title: { tr: 'Analiz', en: 'Analysis' },
          description: {
            tr: 'Tematik analiz ve yorumlama.',
            en: 'Thematic analysis and interpretation.',
          },
        },
      ],
    },
    pricing: {
      tr: 'Fiyat teklifi için iletişime geçin',
      en: 'Contact us for a price quote',
    },
  },
  'vosviewer-ile-bibliyometrik-analiz-yaptirma': {
    title: {
      tr: 'Vosviewer ile Bibliyometrik Analiz Yaptırma',
      en: 'Bibliometric Analysis with Vosviewer',
    },
    description: {
      tr: 'Bilimsel literatür analizi için Vosviewer ile bibliyometrik analiz hizmeti.',
      en: 'Bibliometric analysis service with Vosviewer for scientific literature analysis.',
    },
    shortDescription: {
      tr: 'Literatür analizi için bibliyometrik analiz.',
      en: 'Bibliometric analysis for literature review.',
    },
    features: {
      tr: [
        'Atıf analizi',
        'Ortak yazarlık ağı analizi',
        'Anahtar kelime analizi',
        'Görselleştirme haritaları',
      ],
      en: [
        'Citation analysis',
        'Co-authorship network analysis',
        'Keyword analysis',
        'Visualization maps',
      ],
    },
    process: {
      title: { tr: 'Çalışma Süreci', en: 'Work Process' },
      steps: [
        {
          title: { tr: 'Veri Toplama', en: 'Data Collection' },
          description: {
            tr: 'Web of Science veya Scopus verilerini hazırlarız.',
            en: 'We prepare Web of Science or Scopus data.',
          },
        },
        {
          title: { tr: 'Analiz', en: 'Analysis' },
          description: {
            tr: 'Vosviewer ile bibliyometrik analiz yaparız.',
            en: 'We perform bibliometric analysis with Vosviewer.',
          },
        },
        {
          title: { tr: 'Görselleştirme', en: 'Visualization' },
          description: {
            tr: 'Ağ haritaları ve grafikler oluştururuz.',
            en: 'We create network maps and charts.',
          },
        },
      ],
    },
    pricing: {
      tr: 'Fiyat teklifi için iletişime geçin',
      en: 'Contact us for a price quote',
    },
  },
  'g-power-ile-orneklem-buyuklugu-hesaplama-analizi': {
    title: {
      tr: 'G Power ile Örneklem Büyüklüğü Hesaplama Analizi',
      en: 'Sample Size Calculation Analysis with G Power',
    },
    description: {
      tr: 'Araştırmanız için uygun örneklem büyüklüğünü G*Power ile hesaplayın.',
      en: 'Calculate the appropriate sample size for your research with G*Power.',
    },
    shortDescription: {
      tr: 'Güç analizi ve örneklem hesaplama.',
      en: 'Power analysis and sample calculation.',
    },
    features: {
      tr: [
        'A priori güç analizi',
        'Post-hoc güç analizi',
        'Etki büyüklüğü hesaplama',
        'Detaylı rapor ve yorumlama',
      ],
      en: [
        'A priori power analysis',
        'Post-hoc power analysis',
        'Effect size calculation',
        'Detailed report and interpretation',
      ],
    },
    process: {
      title: { tr: 'Çalışma Süreci', en: 'Work Process' },
      steps: [
        {
          title: { tr: 'Araştırma Tasarımı', en: 'Research Design' },
          description: {
            tr: 'Araştırma tasarımınızı inceleriz.',
            en: 'We review your research design.',
          },
        },
        {
          title: { tr: 'Hesaplama', en: 'Calculation' },
          description: {
            tr: 'G*Power ile örneklem hesaplaması yaparız.',
            en: 'We calculate sample size with G*Power.',
          },
        },
        {
          title: { tr: 'Raporlama', en: 'Reporting' },
          description: {
            tr: 'Detaylı rapor ve öneriler sunarız.',
            en: 'We provide detailed report and recommendations.',
          },
        },
      ],
    },
    pricing: {
      tr: 'Fiyat teklifi için iletişime geçin',
      en: 'Contact us for a price quote',
    },
  },
  'meta-analiz-yaptirma': {
    title: {
      tr: 'Meta Analiz Yaptırma',
      en: 'Meta Analysis Service',
    },
    description: {
      tr: 'Birden fazla çalışmanın bulgularını birleştiren meta analiz hizmeti.',
      en: 'Meta-analysis service combining findings from multiple studies.',
    },
    shortDescription: {
      tr: 'Sistematik derleme ve meta analiz.',
      en: 'Systematic review and meta-analysis.',
    },
    features: {
      tr: [
        'Literatür taraması',
        'Etki büyüklüğü hesaplama',
        'Heterojenlik testleri',
        'Forest plot ve funnel plot',
      ],
      en: [
        'Literature search',
        'Effect size calculation',
        'Heterogeneity tests',
        'Forest plot and funnel plot',
      ],
    },
    process: {
      title: { tr: 'Çalışma Süreci', en: 'Work Process' },
      steps: [
        {
          title: { tr: 'Literatür Tarama', en: 'Literature Search' },
          description: {
            tr: 'Sistematik literatür taraması yaparız.',
            en: 'We conduct systematic literature search.',
          },
        },
        {
          title: { tr: 'Veri Çıkarma', en: 'Data Extraction' },
          description: {
            tr: 'Çalışmalardan veri çıkarımı yaparız.',
            en: 'We extract data from studies.',
          },
        },
        {
          title: { tr: 'Meta Analiz', en: 'Meta Analysis' },
          description: {
            tr: 'İstatistiksel meta analiz gerçekleştiririz.',
            en: 'We perform statistical meta-analysis.',
          },
        },
      ],
    },
    pricing: {
      tr: 'Fiyat teklifi için iletişime geçin',
      en: 'Contact us for a price quote',
    },
  },
  'tez-danismanligi': {
    title: {
      tr: 'Tez Danışmanlığı',
      en: 'Thesis Consulting',
    },
    description: {
      tr: 'Yüksek lisans ve doktora tezi sürecinizde profesyonel danışmanlık.',
      en: 'Professional consulting for your masters and doctoral thesis process.',
    },
    shortDescription: {
      tr: 'Tez yazım sürecinde kapsamlı destek.',
      en: 'Comprehensive support in thesis writing process.',
    },
    features: {
      tr: [
        'Konu seçimi ve literatür taraması',
        'Metodoloji planlaması',
        'Veri analizi desteği',
        'Yazım ve düzenleme',
      ],
      en: [
        'Topic selection and literature review',
        'Methodology planning',
        'Data analysis support',
        'Writing and editing',
      ],
    },
    process: {
      title: { tr: 'Danışmanlık Süreci', en: 'Consulting Process' },
      steps: [
        {
          title: { tr: 'İlk Görüşme', en: 'Initial Meeting' },
          description: {
            tr: 'Tez sürecinizi ve ihtiyaçlarınızı değerlendiririz.',
            en: 'We evaluate your thesis process and needs.',
          },
        },
        {
          title: { tr: 'Planlama', en: 'Planning' },
          description: {
            tr: 'Tez takvimi ve çalışma planı oluştururuz.',
            en: 'We create thesis timeline and work plan.',
          },
        },
        {
          title: { tr: 'Destek', en: 'Support' },
          description: {
            tr: 'Süreç boyunca düzenli danışmanlık sağlarız.',
            en: 'We provide regular consulting throughout the process.',
          },
        },
      ],
    },
    pricing: {
      tr: 'Fiyat teklifi için iletişime geçin',
      en: 'Contact us for a price quote',
    },
  },
  'tez-duzenleme-hizmetleri': {
    title: {
      tr: 'Tez Düzenleme Hizmetleri',
      en: 'Thesis Editing Services',
    },
    description: {
      tr: 'Tezinizin akademik standartlara uygun şekilde düzenlenmesi ve formatlanması.',
      en: 'Editing and formatting your thesis according to academic standards.',
    },
    shortDescription: {
      tr: 'Profesyonel tez düzenleme ve formatlama.',
      en: 'Professional thesis editing and formatting.',
    },
    features: {
      tr: [
        'Dil ve anlatım düzeltmeleri',
        'Format kontrolü',
        'Kaynakça düzenleme',
        'Tablo ve şekil düzenleme',
      ],
      en: [
        'Language and expression corrections',
        'Format control',
        'Bibliography editing',
        'Table and figure editing',
      ],
    },
    process: {
      title: { tr: 'Düzenleme Süreci', en: 'Editing Process' },
      steps: [
        {
          title: { tr: 'İnceleme', en: 'Review' },
          description: {
            tr: 'Tezinizi detaylı olarak inceleriz.',
            en: 'We review your thesis in detail.',
          },
        },
        {
          title: { tr: 'Düzenleme', en: 'Editing' },
          description: {
            tr: 'Gerekli düzenlemeleri yaparız.',
            en: 'We make necessary edits.',
          },
        },
        {
          title: { tr: 'Kontrol', en: 'Check' },
          description: {
            tr: 'Son kontrolleri yapıp teslim ederiz.',
            en: 'We perform final checks and deliver.',
          },
        },
      ],
    },
    pricing: {
      tr: 'Fiyat teklifi için iletişime geçin',
      en: 'Contact us for a price quote',
    },
  },
};

export function isValidServiceSlug(slug: string): slug is ServiceSlug {
  return SERVICE_SLUGS.includes(slug as ServiceSlug);
}

export function getService(slug: string): ServiceData | null {
  if (!isValidServiceSlug(slug)) {
    return null;
  }
  return SERVICES[slug];
}
