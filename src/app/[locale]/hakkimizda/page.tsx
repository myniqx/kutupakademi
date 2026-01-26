import { CTASection } from '@/components/sections/cta-section';
import { HeroMiddle } from '@/components/sections/hero-middle';
import { GlowCard } from '@/components/ui/glow-card';
import { Users, CheckCircle2, TrendingUp } from 'lucide-react';
import { generateMeta } from '@/constants/seo';
import type { Metadata } from 'next';

type AboutPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;

  return generateMeta({
    title: locale === 'tr' ? 'Hakkımızda' : 'About Us',
    description:
      locale === 'tr'
        ? 'Kutup Akademi olarak 10 yılı aşkın deneyimimizle akademisyenlere ve öğrencilere veri analizi eğitimi ve danışmanlık hizmeti sunuyoruz.'
        : 'As Kutup Akademi, we provide data analysis education and consultancy services to academics and students with over 10 years of experience.',
    locale: locale as 'tr' | 'en',
    path: locale === 'en' ? '/en/hakkimizda' : '/hakkimizda',
  });
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;

  const content = {
    tr: {
      hero: {
        greeting: 'Kutup Akademi\'ye Hoş Geldiniz!',
        subtitle: "Akademik çalışma ve yayın desteği, SPSS istatistik analiz ve danışmanlık hizmetleri",
      },
      about: {
        title: 'Hakkımızda',
        paragraphs: [
          'Gökyüzündeki yıldızlar yüzyıllardır tüm seyyahlara ve maceracılara yön göstermiş, kılavuzluk yapmışlardır. Bütün bu yıldızların içerisinde ise kutup yıldızı, hiçbir zaman gök yüzündeki yerinin değişmemesi ve göz kamaştırıcı parlaklığı ile yönünü bulmak isteyenlere şaşmaz bir pusula olmuştur. Böylece, binlerce yıldır sönmeyen parlaklığı ve her zaman yerli yerinde duruyor oluşu ile insanoğluna hep güven vermiştir.',
          'Kendisine kutup yıldızı gibi olmayı ilke edinen ekibimiz, bu isim altında sizlere akademik alanda hizmet sunmak için sabırsızlanmaktadır. Sizlere istatistik analizi ve İngilizce yabancı dil eğitiminde hizmet sunarken tıpkı kutup yıldızı gibi güvenilir ve yol gösterici olmayı hedefliyoruz. Dinamik ve donanımlı kadromuzla on yılı aşkın süredir sizlerin ihtiyaç duyduğu eğitimleri ve akademik desteği, bilimsel ilkeler ışığında sizlere sunmaktan büyük bir mutluluk duymaktayız.',
          'Kutup Akademi, bünyesinde barındırdığı nitelikli kadroyla yurt içinde ve yurt dışında pek çok akademisyen ve öğrenciye veri analizi, eğitim danışmanlık hizmeti sağlamaktadır. Sunduğu kaliteli eğitim hizmeti ile, tanınırlığını uluslararası boyuta taşımıştır.',
          'Kurulduğu andan itibaren tıpkı kutup yıldızı gibi bilimsel ilkeler üzerindeki yerini değiştirmeyen, bilimsel gelişmeler doğrultusunda kendini yenileyerek her zaman parlaklığını koruyan kurumumuz, her zaman alanında sizlere yol gösterici olmaya devam edecektir.',
        ],
      },
      stats: {
        projects: 'Başarılı Proje',
        experts: 'Uzman Analist',
        customers: 'Mutlu Müşteri',
      },
      values: {
        title: 'Değerlerimiz',
        items: [
          {
            title: 'Bilimsel Titizlik',
            description:
              'Her projede akademik standartlara ve bilimsel metodolojilere sıkı sıkıya bağlı kalıyoruz.',
          },
          {
            title: 'Güvenilir Rehberlik',
            description:
              'Kutup Yıldızı gibi, araştırmacılara doğru yolu göstermek için varız.',
          },
          {
            title: 'Sürekli Gelişim',
            description:
              'Alandaki yeni gelişmeleri takip ediyor ve hizmetlerimizi sürekli güncelliyoruz.',
          },
          {
            title: 'Kişiselleştirilmiş Yaklaşım',
            description:
              'Her projeye özgü ihtiyaçları anlayıp, özelleştirilmiş çözümler sunuyoruz.',
          },
        ],
      },
    },
    en: {
      hero: {
        greeting: 'Welcome to Kutup Akademi!',
        subtitle: 'Academic work and publication support, SPSS statistical analysis and consultancy services',
      },
      about: {
        title: 'About Us',
        paragraphs: [
          'The stars in the sky have guided all travelers and adventurers for centuries. Among all these stars, the Polaris star has been an infallible compass for those who want to find their direction with its unchanging position in the sky and dazzling brightness. Thus, with its brightness that has not faded for thousands of years and its standing in place, it has always given confidence to humanity.',
          'Our team, which has adopted the principle of being like the Polaris star, is eager to serve you in the academic field under this name. While providing services in statistical analysis and English language education, we aim to be reliable and guiding just like the Polaris star. With our dynamic and equipped team, we are delighted to provide you with the training and academic support you need for over a decade, in the light of scientific principles.',
          'Kutup Akademi provides data analysis and educational consultancy services to many academics and students at home and abroad with its qualified staff. With its high-quality educational services, it has taken its recognition to an international level.',
          'From the moment it was founded, our institution, which does not change its place on scientific principles like the Polaris star, renews itself in line with scientific developments and always maintains its brightness, will continue to guide you in its field at all times.',
        ],
      },
      stats: {
        projects: 'Successful Projects',
        experts: 'Expert Analysts',
        customers: 'Happy Customers',
      },
      values: {
        title: 'Our Values',
        items: [
          {
            title: 'Scientific Rigor',
            description:
              'We strictly adhere to academic standards and scientific methodologies in every project.',
          },
          {
            title: 'Reliable Guidance',
            description:
              'Like the Polaris star, we exist to guide researchers on the right path.',
          },
          {
            title: 'Continuous Improvement',
            description:
              'We follow new developments in the field and continuously update our services.',
          },
          {
            title: 'Personalized Approach',
            description:
              'We understand the unique needs of each project and provide customized solutions.',
          },
        ],
      },
    },
  };

  const t = content[locale as keyof typeof content] || content.tr;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroMiddle
        imageSrc="/hakkimizda.webp"
        imageAlt={t.hero.greeting}
        title={t.hero.greeting}
        subtitle={t.hero.subtitle}
      />

      {/* About Section */}
      <section className="container mx-auto px-4 py-20 md:py-28">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8 bg-linear-to-br from-foreground to-foreground/80 bg-clip-text text-transparent border-b border-border/50 pb-4">
            {t.about.title}
          </h2>

          <div className="space-y-6 text-lg text-foreground/80 leading-relaxed">
            {t.about.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative overflow-hidden border-y border-border/50 bg-muted/20">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto">
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2 mb-4">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
              <div className="text-5xl md:text-6xl font-bold bg-linear-to-br from-primary to-primary/70 bg-clip-text text-transparent">
                500+
              </div>
              <div className="text-lg text-muted-foreground">{t.stats.projects}</div>
            </div>

            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <div className="text-5xl md:text-6xl font-bold bg-linear-to-br from-primary to-primary/70 bg-clip-text text-transparent">
                10+
              </div>
              <div className="text-lg text-muted-foreground">{t.stats.experts}</div>
            </div>

            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2 mb-4">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <div className="text-5xl md:text-6xl font-bold bg-linear-to-br from-primary to-primary/70 bg-clip-text text-transparent">
                98%
              </div>
              <div className="text-lg text-muted-foreground">{t.stats.customers}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="container mx-auto px-4 py-20 md:py-28">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-12 text-center bg-linear-to-br from-foreground to-foreground/80 bg-clip-text text-transparent">
            {t.values.title}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {t.values.items.map((item, index) => (
              <GlowCard key={index} mode="border" intensity="medium">
                <div className="space-y-3 p-8 h-32">
                  <h3 className="text-2xl font-bold text-foreground">{item.title}</h3>
                  <p className="text-foreground/70 leading-relaxed">{item.description}</p>
                </div>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection locale={locale as 'tr' | 'en'} />
    </div>
  );
}
