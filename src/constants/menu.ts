export type MenuItem = {
  label: {
    tr: string;
    en: string;
  };
  href: string;
  children?: MenuItem[];
};

export const MAIN_MENU: MenuItem[] = [
  {
    label: { tr: 'Ana Sayfa', en: 'Home' },
    href: '/',
  },
  {
    label: { tr: 'Hakkımızda', en: 'About Us' },
    href: '/hakkimizda',
  },
  {
    label: { tr: 'Hizmetlerimiz', en: 'Our Services' },
    href: '/hizmetler',
    children: [
      {
        label: {
          tr: 'Yapısal Eşitlik Modellemesi Analizi',
          en: 'Structural Equation Modeling Analysis',
        },
        href: '/yapisal-esitlik-modellemesi-analizi',
      },
      {
        label: { tr: 'SPSS Danışmanlık Hizmeti', en: 'SPSS Consulting Service' },
        href: '#',
        children: [
          {
            label: {
              tr: 'SPSS Veri Analizi Yaptırma',
              en: 'SPSS Data Analysis Service',
            },
            href: '/spss-veri-analizi-yaptirma-2',
          },
          {
            label: { tr: 'SPSS Ödevi Yaptırma', en: 'SPSS Assignment Service' },
            href: '/spss-odevi-yaptirma',
          },
          {
            label: {
              tr: 'SPSS Eğitimi ile Veri Analizi',
              en: 'Data Analysis with SPSS Training',
            },
            href: '/spss-egitimi-ile-veri-analizi',
          },
          {
            label: {
              tr: 'SPSS ile Ölçek Geliştirme ve Uyarlama Hizmeti',
              en: 'Scale Development and Adaptation Service with SPSS',
            },
            href: '/spss-ile-olcek-gelistirme-ve-uyarlama-hizmeti',
          },
        ],
      },
      {
        label: {
          tr: 'Nitel Veri Analizi Yaptırma',
          en: 'Qualitative Data Analysis Service',
        },
        href: '#',
        children: [
          {
            label: {
              tr: 'MAXQDA ile Tematik Analiz Hizmeti',
              en: 'Thematic Analysis Service with MAXQDA',
            },
            href: '/maxqda-ile-tematik-analiz-hizmeti',
          },
        ],
      },
      {
        label: {
          tr: 'Vosviewer ile Bibliyometrik Analiz Yaptırma',
          en: 'Bibliometric Analysis with Vosviewer',
        },
        href: '/vosviewer-ile-bibliyometrik-analiz-yaptirma',
      },
      {
        label: {
          tr: 'G Power ile Örneklem Büyüklüğü Hesaplama Analizi',
          en: 'Sample Size Calculation Analysis with G Power',
        },
        href: '/g-power-ile-orneklem-buyuklugu-hesaplama-analizi',
      },
      {
        label: { tr: 'Meta Analiz Yaptırma', en: 'Meta Analysis Service' },
        href: '/meta-analiz-yaptirma',
      },
      {
        label: { tr: 'Akademik Danışmanlık', en: 'Academic Consulting' },
        href: '#',
        children: [
          {
            label: { tr: 'Tez Danışmanlığı', en: 'Thesis Consulting' },
            href: '/tez-danismanligi',
          },
          {
            label: { tr: 'Tez Düzenleme Hizmetleri', en: 'Thesis Editing Services' },
            href: '/tez-duzenleme-hizmetleri',
          },
        ],
      },
    ],
  },
  {
    label: { tr: 'Blog', en: 'Blog' },
    href: '/blog',
  },
  {
    label: { tr: 'İletişim', en: 'Contact' },
    href: '/iletisim',
  },
];

export const FOOTER_MENU = {
  services: {
    title: { tr: 'Hizmetlerimiz', en: 'Our Services' },
    items: [
      {
        label: { tr: 'SPSS Veri Analizi', en: 'SPSS Data Analysis' },
        href: '/spss-veri-analizi-yaptirma-2',
      },
      {
        label: { tr: 'Yapısal Eşitlik Modellemesi', en: 'Structural Equation Modeling' },
        href: '/yapisal-esitlik-modellemesi-analizi',
      },
      {
        label: { tr: 'Tez Danışmanlığı', en: 'Thesis Consulting' },
        href: '/tez-danismanligi',
      },
      {
        label: { tr: 'Meta Analiz', en: 'Meta Analysis' },
        href: '/meta-analiz-yaptirma',
      },
    ],
  },
  company: {
    title: { tr: 'Kurumsal', en: 'Company' },
    items: [
      {
        label: { tr: 'Hakkımızda', en: 'About Us' },
        href: '/hakkimizda',
      },
      {
        label: { tr: 'İletişim', en: 'Contact' },
        href: '/iletisim',
      },
      {
        label: { tr: 'Blog', en: 'Blog' },
        href: '/blog',
      },
      {
        label: { tr: 'Fiyat Talebi', en: 'Price Request' },
        href: '/fiyat-talebi',
      },
    ],
  },
} as const;
