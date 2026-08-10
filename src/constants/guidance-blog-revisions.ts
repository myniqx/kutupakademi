export type LocalizedGuidanceArticle = {
  title: string
  description: string
  summary: string
  introduction: string
  goal: string
  steps: string[]
  checks: string[]
  mistakes: string[]
  faq: Array<{ question: string; answer: string }>
  customContent?: string
}

export type GuidanceBlogRevision = {
  slug: string
  keywords: string
  lastModified: string
  coverImage?: string
  tr: LocalizedGuidanceArticle
  en: LocalizedGuidanceArticle
}

const LAST_MODIFIED = '2026-08-06T00:00:00.000Z'

const revisions: GuidanceBlogRevision[] = [
  {
    slug: 'spss-analizi-yaptirma',
    keywords: 'SPSS analizi yaptırma, SPSS danışmanlık, tez veri analizi, makale istatistik analizi, SPSS analysis consulting',
    lastModified: LAST_MODIFIED,
    coverImage: 'featured-image.webp',
    tr: {
      title: 'SPSS Analizi Yaptırma: Tez ve Makale İçin Doğru İstatistik Desteğini Seçme Rehberi',
      description: 'Tez ve makale araştırmalarında SPSS danışmanlığı alırken veri hazırlama, test seçimi, varsayım kontrolü ve sonuçları öğrenerek yorumlama süreçlerini inceleyin.',
      summary: '- SPSS desteği araştırma sorusu ve veri yapısıyla başlamalıdır.\n- Test seçimi varsayımlar ve bilimsel gerekçelerle açıklanmalıdır.\n- Akademik yorum, yazarlık ve nihai metin araştırmacıya aittir.',
      introduction: '', goal: '', steps: [], checks: [], mistakes: [], faq: [],
      customContent: `# SPSS Analizi Yaptırma: Tez ve Makale İçin Doğru İstatistik Desteğini Seçme Rehberi

# SPSS Analizi Yaptırma: Tez ve Makale İçin Doğru İstatistik Desteğini Seçme Rehberi

Tez veya makale yazarken, “SPSS analizi yaptırma” kararı çoğu zaman yalnızca teknik bir tercih değil, aynı zamanda zaman yönetimi ve akademik risk açısından kritik bir dönüm noktasıdır. Verilerinizi topladıktan sonra, SPSS ile hangi testleri kullanmanız gerektiğine, varsayımları nasıl kontrol edeceğinize ve sonuçları nasıl raporlayacağınıza emin değilseniz, yanlış bir adım tüm çalışmanızın bilimsel güvenilirliğini zayıflatabilir.

Türkiye’de lisansüstü öğrenciler ve akademisyenler, giderek daha fazla “SPSS analizi yaptırma” talebiyle profesyonel istatistik destek hizmetlerine yöneliyor; ancak doğru hizmeti seçmek ve süreci bilinçli şekilde yönetmek, en az analiz kadar önemli. Bu makalenin amacı, tez ve makale odaklı **SPSS analizi yaptırma** sürecini adım adım anlamanıza yardımcı olurken, Kutup Akademi’nin ilgili hizmetlerinde size uygun çözümlere yön göstermek.

## SPSS Analizi Yaptırma Nedir, Tez ve Makaleler İçin Ne İfade Eder?

SPSS analizi yaptırma, araştırma verilerinizin SPSS programı kullanılarak uzman istatistikçiler tarafından incelenmesi, uygun testlerin seçilmesi, sonuçların yorumlanması ve akademik standartlara uygun şekilde raporlanması sürecini kapsayan profesyonel bir hizmettir. Tez ve makale çalışmalarında bu hizmet:

- Veri setinizin temizlenmesi ve düzenlenmesini,
- Hipotezlerinize uygun istatistiksel yöntemlerin belirlenmesini,
- Bulguların yorumlanmasını içerir.

Bu makale, özellikle tez ve hakemli dergi makaleleri için **SPSS analizi yaptırma** kararını değerlendiren araştırmacılara yöneliktir; ders ödevleri gibi farklı kapsamlar için ise Kutup Akademi’de ayrı yapılandırılmış “[SPSS Ödevi Yaptırma](/spss-odevi-yaptirma)” içerikleri mevcuttur ve oraya yönlendirilmesi daha uygundur.

## Neden SPSS Analizi Yaptırma İhtiyacı Ortaya Çıkıyor?

Tez ve makale süreçlerinde SPSS analizi yaptırma ihtiyacı, birkaç temel nedenden kaynaklanır:

- **Zaman kısıtı:** Literatür, yazım ve etik süreçler zaten yoğunken, SPSS’te karmaşık testler öğrenmek çoğu zaman gerçekçi bir seçenek olmayabilir.
- **Metodolojik belirsizlik:** Hangi testin hangi veri yapısına uygun olduğu, varsayımların nasıl kontrol edileceği ve sonuçların nasıl raporlanacağı konusunda belirsizlikler, analizi profesyonel bir ekibe devretme ihtiyacını doğurur.
- **Hakem ve jüri baskısı:** Özellikle yüksek lisans ve doktora tezlerinde, hakem ve jüriler istatistiksel analizlerin yöntemsel açıdan güçlü olmasını bekler; bu nedenle SPSS analizi yaptırma hizmetleri, eleştirileri azaltmaya yardımcı olabilir.

Bu bağlamda, “SPSS analizi yaptırma” ifadesi yalnızca teknik bir işlem değil, tez ve makale sürecinin risklerini minimize eden stratejik bir tercih hâline gelir.

## SPSS Analizi Yaptırma Süreci Nasıl Planlanmalı?

SPSS analizi yaptırma sürecini bilinçli şekilde yönetmek için, birkaç temel adımı netleştirmek gerekir.

1. **Çalışmanın kapsamını ve hedeflerini netleştirin:** Tez veya makalenizin konusu, hipotezleriniz ve veri türünüz (anket, deney, gözlem vb.) SPSS analizi planının temelini oluşturur.
2. **Analiz türlerini belirleyin:** İhtiyaç duyduğunuz analizler (betimsel istatistik, t testi, ANOVA, regresyon, faktör analizi, güvenilirlik, vb.) hakkında en azından genel bir fikre sahip olmak, hizmet talebi oluştururken sizi güçlendirir.
3. **Veri setinizi hazırlayın:** SPSS veya Excel formatında temizlenmiş ve kodlanmış bir veri seti, analizi hızlandırır; eksik veri ve uç değerler için ön düzenleme yapmanız gerekebilir.
4. **Hizmet sağlayıcı ile beklentilerinizi paylaşın:** Analiz kapsamı, teslim süresi gibi detayları net bir şekilde iletmek, SPSS analizi yaptırma sürecinde yanlış anlamaları önler.

Bu makale genel süreci anlatsa da, sizin tez ve makalenize özel analiz planı oluşturmak için Kutup Akademi’nin ilgili sayfalarını kullanarak daha detaylı rehberlik almanız mümkündür; örneğin tez ve makale odaklı veri analizi için “[SPSS Veri Analizi Yaptırma](/spss-veri-analizi-yaptirma-2)” içeriğine göz atabilirsiniz.

## SPSS Analizi Yaptırma Fiyatları: Hangi Faktörlerle Değişiyor?

SPSS analizi yaptırma fiyatları, Türkiye’de farklı hizmet sağlayıcılarda oldukça geniş bir aralıkta değişmektedir; kapsam, test sayısı, veri büyüklüğü, raporlama detayları ve teslim süresi bu değişimde belirleyici rol oynar.

Örnek eğilimler:

- Bazı hizmetlerde **basit analizler** (betimsel istatistik, temel testler) daha düşük aralıklarda ücretlendirilirken, **orta ve ileri düzey analizler** (regresyon, çoklu analizler, faktör, SEM vb.) daha yüksek ücretlere sahiptir.
- Farklı sitelerde, 500 TL’den başlayan küçük analizlerden 20.000 TL’ye kadar çıkan kapsamlı paketlere kadar geniş bir fiyat yelpazesi görülebilmektedir.

Bu makalenin amacı net bir fiyat listesi vermekten ziyade, “SPSS analizi yaptırma” sürecini anlamanıza yardımcı olmaktır; çalışmanız için en uygun ücret aralığını görmek istiyorsanız, Kutup Akademi’deki [SPSS Analiz Ücretleri](/spss-analiz-ucretleri) içeriğini ve tez/makale odaklı hizmet sayfalarını inceleyerek daha somut fikir edinebilirsiniz.

## SPSS Analizi Yaptırma Hizmetini Seçerken Nelere Dikkat Etmelisiniz?

SPSS analizi yaptırma kararı verirken, yalnızca fiyata bakmak çoğu zaman yeterli değildir; hizmetin bilimsel, etik ve pratik açıdan sağlam olmasına dikkat etmek gerekir.

Önemli kriterler:

- **Uzmanlık ve deneyim:** Tez ve makale analizlerinde istatistiksel yöntemler konusunda deneyimli bir ekiple çalışmak, yanlış test seçimi ve hatalı yorum riskini azaltır.
- **Akademik standartlara uygun yorumlama:** Bulguların ne anlama geldiğinin teorik çerçeve ışığında belirtilmesi son derece kritiktir ve uzman görüşü gerektirir.
- **Veri gizliliği ve etik:** Verilerinizin güvenli biçimde saklanması ve etik ilkelere uygun şekilde kullanılması, hem akademik hem hukuki açıdan önemlidir.
- **Teslim süresi ve iletişim:** SPSS analizi yaptırma sürecinde, çalışma takviminize uygun teslim tarihleri ve açık iletişim kanalları (e posta, WhatsApp, telefon vb.) kritik rol oynar.

Bu makale, doğru hizmeti seçerken düşünmeniz gereken başlıkları genel hatlarıyla sunar; çalışmanız daha kapsamlı bir danışmanlık gerektiriyorsa, [Kutup Akademi’deki SPSS Danışmanlık Hizmeti](/spss-danismanlik-hizmeti) içeriği tez sürecinizi adım adım planlamak için ek bir referans olabilir.

## SPSS Analizi Yaptırmak mı, SPSS’i Kendiniz Öğrenmek mi?

Tez ve makale yoğunluğu içinde SPSS analizi yaptırma, pratik bir çözüm olarak öne çıkar; ancak uzun vadeli akademik kariyer hedefi olanlar için SPSS’i kendisinin öğrenmesi de önemli bir yatırım olabilir.

Kısa bir karşılaştırma:

- **SPSS analizi yaptırma:** Zaman kazanmak, karmaşık testlerde hata riskini azaltmak ve tez/makale sürecini mevcut takvime uydurmak için uygundur.
- **SPSS’i öğrenme:** Birden çok araştırma yapmayı planlayan, yöntem bilgisini derinleştirmek isteyen ve ileride bağımsız analizi tercih edecek araştırmacılar için daha uzun vadeli bir çözümdür.

Kutup Akademi, bu iki ihtiyacı birbirinden ayırmak için, tez ve makale odaklı veri analizi için [SPSS Veri Analizi Yaptırma](/spss-veri-analizi-yaptirma-2) içeriğini, öğrenme odaklı süreçler için ise [SPSS Eğitimi ile Veri Analizi](/spss-egitimi-ile-veri-analizi) içeriğini ayrı ayrı yapılandırmıştır; böylece hangi yolun sizin için daha uygun olduğuna karar verip, ilgili sayfaya metin içi linklerle ilerleyebilirsiniz.

## SPSS Analizi Yaptırma Kararını Bilinçli Verin

SPSS analizi yaptırma kararı, tez ve makale çalışmalarınızın istatistiksel temelini güçlendiren, zamanınızı geri kazandıran ve akademik risklerinizi azaltan kritik bir adımdır; erteledikçe belirsizlik büyür, hakem ve jüri baskısı artar. Doğru bir analiz desteği aldığınızda ise, verileriniz bilimsel yöntemlerle değerlendirilir, sonuçlarınız savunulabilir hâle gelir ve çalışmanızın kalitesi gözle görülür biçimde yükselir.

Eğer bu satırları okuyorsanız, büyük ihtimalle tez veya makale sürecinizde SPSS analizi konusunda kararsızlık yaşıyor ya da zamanla yarışıyorsunuz demektir; bu noktadan sonra yalnızca daha fazla “bilgi toplamak” yerine, somut bir adım atmanız gerekir. SPSS analizi yaptırma sürecini netleştirmek ve kendi çalışmanız için gerçekçi bir ücret aralığı görmek istiyorsanız, şimdi beklemeden Kutup Akademi’nin [Ücretsiz Fiyat Teklifi](/fiyat-talebi) formunu doldurun; formu gönderdiğiniz anda verileriniz ve araştırma hedefleriniz incelenerek size özel analiz planı ve fiyat teklifi hazırlanır.

Tezinizin istatistik bölümünü “nasıl yapacağım?” kaygısıyla uzatmak yerine, bugün SPSS analizi yaptırma talebinizi ileterek süreci profesyonel bir ekibe devredebilir, siz de teorik çerçeveye ve yazım aşamasına odaklanabilirsiniz. Şu anda formu doldurmanız, birkaç dakika sürecek küçük bir işlem; ama savunma gününde, elinizde güçlü ve tutarlı analiz sonuçlarıyla duruyor olmanız açısından büyük fark yaratacaktır.,
    },
    en: {
      title: 'SPSS Analysis Support: A Guide to Choosing the Right Statistical Consulting for a Thesis or Article',
      description: 'Learn how data preparation, test selection, assumption checks, and interpretation should be handled when seeking SPSS consulting for research.',
      summary: '- SPSS support should begin with the question and data structure.\n- Test choices require transparent scientific justification.\n- Interpretation, authorship, and the final text remain the researcher’s responsibility.',
      introduction: '', goal: '', steps: [], checks: [], mistakes: [], faq: [],
      customContent: `# SPSS Analysis Support: A Guide to Choosing the Right Statistical Consulting for a Thesis or Article

SPSS is widely used to organize research data and apply statistical methods. Reliable analysis, however, involves more than selecting a command. The research question, variables, data quality, assumptions, and limits of the study design must be considered together.

> **Service boundary:** Consulting helps researchers understand their own data and analysis process. No thesis, article, assignment, project, or exam submission is prepared on behalf of a client or student. Academic interpretation and the final text remain the researcher’s responsibility.

## What SPSS Consulting Can Cover

Support may include checking variable definitions and coding, reviewing missing values and scale scoring, comparing suitable tests, explaining assumptions, and teaching researchers how to read key SPSS tables. Feedback may also be provided on the methodological consistency of a findings section written by the researcher.

## Clarify the Research Design First

Before analysis, define the question, hypotheses, dependent and independent variables, measurement levels, group structure, sampling method, and limits of generalization. These decisions determine whether comparison, association, prediction, or latent-variable methods are appropriate.

## Data Preparation and Quality Checks

Raw data should be reviewed for missing values, duplicates, impossible codes, outliers, reverse-coded items, and scale-scoring rules. Decisions must be documented so the process can be reproduced. See the [SPSS data analysis process](/en/spss-veri-analizi-yaptirma-2) for further guidance.

## Selecting an Appropriate Test

There is no universal best test. The choice depends on the question, variable types, group structure, sample size, and assumptions. Group comparisons, correlation, regression, factor analysis, or suitable robust and non-parametric alternatives may be considered. [SPSS consulting](/en/spss-danismanlik-hizmeti) explains how these options can be justified rather than making unexplained decisions for the researcher.

## Assumptions and Interpretation

Normality, homogeneity, linearity, independence, and multicollinearity vary by method. Checks should combine plots, diagnostics, sample characteristics, and the robustness of the selected method. Output should be interpreted with the test statistic, uncertainty, effect size, and study limitations—not the p-value alone.

SPSS output is not an academic findings section. Consulting can explain what tables mean and review the consistency of the researcher’s own interpretation. Connecting results to the literature and writing the final academic narrative remain the researcher’s work.

## Preparing for a Consultation

Prepare the research questions, an anonymized dataset, a variable dictionary, scale-scoring instructions, and the applicable institutional guide. Remove personal or sensitive information and observe all ethics and data-security requirements.

Researchers who want to learn the process step by step may consider [SPSS training](/en/spss-egitimi-ile-veri-analizi). You can also review [SPSS analysis pricing](/en/spss-analiz-ucretleri) or submit a [price request](/en/fiyat-talebi).

## Conclusion

Good SPSS support is a transparent learning process. When the question, data quality, test rationale, assumptions, and interpretation limits are addressed together, results become more reproducible and scientifically defensible. Researchers retain academic responsibility by understanding the decisions and producing their own final text.`,
    },
  },
  {
    slug: 'spss-analiz-ucretleri',
    keywords: 'SPSS analiz ücretleri, SPSS danışmanlık fiyatları, istatistik danışmanlığı, veri analizi fiyat teklifi, SPSS analysis pricing',
    lastModified: LAST_MODIFIED,
    tr: {
      title: 'SPSS Analiz Ücretleri',
      description: 'SPSS analiz danışmanlığı ücretlerini etkileyen veri yapısı, yöntem, varsayım kontrolleri, model karmaşıklığı ve çalışma kapsamını öğrenin.',
      summary: '- Ücret, araştırmanın gerçek kapsamına göre belirlenir.\n- Değişken sayısı tek başına yeterli bir ölçüt değildir.\n- Tekliften önce veri, yöntem ve beklenen destek düzeyi netleştirilir.',
      introduction: '', goal: '', steps: [], checks: [], mistakes: [], faq: [],
      customContent: `# SPSS Analiz Ücretleri

SPSS analiz danışmanlığı için tek ve sabit bir ücret belirtmek çoğu zaman sağlıklı değildir. Çünkü iki veri dosyası aynı sayıda değişken içerse bile araştırma soruları, veri temizleme ihtiyacı, kullanılacak yöntemler ve beklenen rehberlik düzeyi birbirinden farklı olabilir. Şeffaf bir teklif, çalışmanın gerçek kapsamı incelendikten sonra hazırlanmalıdır.

> **Hizmet sınırı:** Ücretlendirme, araştırmacının kendi çalışmasına yönelik yöntem ve veri analizi danışmanlığını kapsar. Danışan veya öğrenci adına tez, makale, ödev, proje ya da sınav çalışması hazırlanmaz; nihai akademik yorum ve metin araştırmacıya aittir.

## SPSS Analiz Ücretleri Neden Sabit Değildir?

Fiyatı belirleyen temel unsur yalnızca satır veya değişken sayısı değil, verinin analize hazır hâle getirilmesi için gereken emek ve yöntemsel karmaşıklıktır.

## SPSS Analiz Ücretlerini Belirleyen İlk Parametre: Analizin Yoğunluğu

### Araştırma Sorusu ve Hipotez Sayısı

Her hipotez ayrı bir test anlamına gelmeyebilir; bazı sorular tek bir model içinde birlikte değerlendirilebilir. Buna karşılık görünüşte kısa bir soru, çok sayıda varsayım kontrolü veya alternatif model gerektirebilir. Bu nedenle kapsam, hipotezlerin sayısından çok aralarındaki ilişki ve analiz planı üzerinden değerlendirilir.

### Veri Dosyasının Hazırlık Düzeyi

Değişkenlerin açık biçimde adlandırıldığı, kod kitabı bulunan ve eksik değerleri tanımlanmış bir veri seti daha hızlı incelenebilir. Hatalı kodlar, yinelenen kayıtlar, ters madde sorunları, birleştirilmesi gereken dosyalar veya belirsiz ölçek puanları ek çalışma gerektirir.

## SPSS Analiz Ücretlerini Belirleyen İkinci Parametre: Analizin Seviyesi

### Kullanılacak Analiz Yöntemleri

Tanımlayıcı istatistikler, basit grup karşılaştırmaları ve korelasyon analizi ile çok değişkenli regresyon, aracılık-düzenleyicilik, faktör analizi veya tekrarlı ölçüm modelleri aynı düzeyde değildir. Model sayısı, varsayım kontrolleri, alternatiflerin karşılaştırılması ve çıktıların açıklanması toplam çalışma süresini etkiler.

### Örneklem ve Değişken Yapısı

Örneklem büyüklüğü tek başına fiyatı belirlemez. Grup sayısı, bağımlı gözlemler, kategorik değişkenler, çoklu ölçümler ve eksik veri örüntüsü gibi özellikler analiz planını değiştirebilir. Ölçek kullanılan çalışmalarda alt boyutlar ve puanlama kuralları da ayrıca denetlenir.

### Beklenen Danışmanlık Düzeyi

Bazı araştırmacılar yalnızca yöntem seçeneklerini tartışmak isterken bazıları SPSS adımlarını uygulamalı biçimde öğrenmek, çıktıları birlikte incelemek ve kendi hazırladığı rapora geri bildirim almak isteyebilir. Görüşme sayısı, açıklama derinliği ve eğitim ihtiyacı teklif kapsamına yansır.

## Univariate ve Multivariate Analizler Ücreti Nasıl Etkiler?

### Univariate analizler

Tek değişkenli incelemeler bir değişkenin dağılımı, frekansı ve temel özellikleri üzerine yoğunlaşır. İşlem adımları ve varsayım yapısı çoğu zaman daha sınırlı olduğu için danışmanlık kapsamı daha düşük olabilir.

### Multivariate analizler

Tek değişkenli veya iki değişkenli incelemelerde veri yapısı daha sınırlı olabilir. Çok değişkenli modellerde ise değişkenler arası ilişkiler, çoklu bağlantı, model uyumu, artıklar ve alternatif modeller gibi ek kontroller gerekir. Bu fark, yalnızca yazılımda çalıştırılan komut sayısından değil, kararların bilimsel olarak gerekçelendirilmesi için gereken değerlendirmeden kaynaklanır.

## Tez ve Makale Çalışmalarında SPSS Analiz Ücreti Neden Değişir?

Tez ve makale araştırmalarında analiz, kurum veya dergi ölçütleriyle uyumlu olmalıdır. Çalışmanın tasarımı, yöntem bölümündeki plan, veri toplama biçimi ve hedef raporlama standardı birlikte incelenir. Danışmanlık; yöntemin mantığını açıklama ve araştırmacının kendi analiz kararlarını savunabilmesine yardımcı olma amacı taşır.

[SPSS danışmanlık hizmetinin kapsamını](/spss-danismanlik-hizmeti) inceleyerek hangi desteğe ihtiyaç duyduğunuzu netleştirebilirsiniz. Analiz adımlarını kendiniz uygulamak istiyorsanız [SPSS eğitimi](/spss-egitimi-ile-veri-analizi) seçeneği daha uygun olabilir.

## SPSS Analiz Ücreti Alırken Hangi Bilgileri Hazır Tutmalısınız?

Sağlıklı bir ön değerlendirme için şu bilgilerin paylaşılması yararlıdır:

- Araştırma konusu, amacı ve temel soruları
- Anonimleştirilmiş veri dosyası veya değişken listesi
- Örneklem büyüklüğü ve grup yapısı
- Kullanılan ölçekler ile puanlama yönergeleri
- Planlanan analizler veya yöntem konusunda karşılaşılan belirsizlikler
- Kurum, danışman veya derginin özel raporlama beklentileri
- İstenen görüşme, eğitim ve geri bildirim düzeyi
- Gerçekçi çalışma takvimi

Kişisel veya hassas veriler teklif aşamasında paylaşılmamalı; örnek dosyalar mutlaka anonimleştirilmelidir.

## SPSS Analiz Ücretleri İçin Net Teklif Nasıl Alınır?

Kapsam bazlı teklif, araştırmacının ihtiyaç duymadığı işlemler için ücret ödemesini önler ve hangi desteğin sunulacağını baştan görünür kılar. Teklifte analiz planı, olası kontroller, görüşme biçimi, teslim edilecek öğretici materyaller ve zamanlama açıkça belirtilmelidir. Analiz sonucunun anlamlı çıkacağına, belirli bir yayın veya akademik sonuca ulaşılacağına dair garanti verilmez.

## Sonuç

SPSS analiz ücreti; veri kalitesi, araştırma tasarımı, yöntemsel yoğunluk ve beklenen danışmanlık düzeyi birlikte değerlendirilerek belirlenir. Şeffaf bir ön inceleme hem kapsamın doğru kurulmasını hem de araştırmacının ne için destek aldığını bilmesini sağlar. Çalışmanızın kapsamına göre değerlendirme almak için kişisel verileri kaldırılmış bilgilerle [fiyat talebi oluşturabilirsiniz](/fiyat-talebi).`,
    },
    en: {
      title: 'SPSS Analysis Pricing',
      description: 'Learn how data readiness, methods, assumption checks, model complexity, and the requested level of consulting affect SPSS analysis pricing.',
      summary: '- Pricing is based on the actual research scope.\n- Variable count alone is not a sufficient measure.\n- Data, methods, and the level of support are clarified before a quote.',
      introduction: '', goal: '', steps: [], checks: [], mistakes: [], faq: [],
      customContent: `# SPSS Analysis Pricing

A single fixed price is rarely appropriate for SPSS consulting. Two datasets with the same number of variables may involve very different questions, data-cleaning needs, methods, and levels of guidance. A transparent quote should follow a review of the actual scope.

> **Service boundary:** Pricing covers methodology and data-analysis consulting for the researcher’s own work. No thesis, article, assignment, project, or exam submission is prepared on behalf of a client or student. Final interpretation and academic writing remain the researcher’s responsibility.

## What Affects the Price?

Key factors include the relationship among research questions, data readiness, required cleaning and scoring, the complexity of statistical methods, sample and group structure, assumption checks, alternative models, and the amount of teaching or feedback requested.

Descriptive analysis and a limited comparison are not equivalent to multivariable regression, mediation, moderation, factor analysis, or repeated-measures models. The difference reflects the scientific review needed to justify the decisions—not merely the number of software commands.

## Defining Scope for a Thesis or Article

The study design, planned methods, data-collection process, and institutional or journal requirements should be reviewed together. Consulting explains the methodological rationale and helps researchers understand and defend their own decisions. See the [scope of SPSS consulting](/en/spss-danismanlik-hizmeti), or consider [SPSS training](/en/spss-egitimi-ile-veri-analizi) if you want to apply the steps yourself.

## Information Needed for a Quote

- Research topic, purpose, and main questions
- An anonymized dataset or variable list
- Sample size and group structure
- Scale-scoring instructions
- Planned methods or current methodological questions
- Institutional or journal reporting requirements
- Requested meetings, training, and feedback
- A realistic timeline

Personal or sensitive data should not be shared during the quote stage; sample files must be anonymized.

## Why Scope-Based Pricing Is More Transparent

Scope-based pricing prevents unnecessary work and makes the support clear from the beginning. A quote should identify the analysis plan, checks, consultation format, educational materials, and timing. It cannot guarantee statistical significance, publication, a grade, or another academic outcome.

## Conclusion

SPSS consulting fees depend on data quality, research design, methodological intensity, and the requested level of guidance. A preliminary review makes the scope and responsibilities visible. You can submit an anonymized [price request](/en/fiyat-talebi) for an assessment.`,
    },
  },
  {
    slug: 'spss-ile-stres-ve-basa-cikma-stratejileri-analizi',
    keywords: 'stres ölçeği analizi, başa çıkma stratejileri, SPSS veri analizi, psikoloji araştırmaları, stress and coping analysis',
    lastModified: LAST_MODIFIED,
    tr: {
      title: 'SPSS ile Stres ve Başa Çıkma Stratejileri Analizi',
      description: 'Stres ve başa çıkma verilerini SPSS ile değerlendirirken ölçek yapısı, varsayımlar, test seçimi ve sonuç yorumlama ilkelerini öğrenin.',
      summary: '- Ölçek puanları araştırma sorusuna göre yapılandırılır.\n- Test seçimi veri yapısı ve varsayımlarla gerekçelendirilir.\n- Akademik yorum ve nihai metin araştırmacıya aittir.',
      introduction: 'Stres ve başa çıkma stratejilerini inceleyen araştırmalarda yalnızca toplam puanları karşılaştırmak yeterli değildir. Ölçeklerin yönü, alt boyutları, güvenirliği ve araştırma tasarımı birlikte değerlendirilmelidir.',
      goal: 'Amaç, araştırmacının veri yapısını tanıması, uygun analiz seçeneklerini gerekçelendirmesi ve çıktıları araştırma sorusunun sınırları içinde yorumlayabilmesidir.',
      steps: [
        'Ölçekteki ters maddeleri, alt boyutları ve puanlama yönergesini doğrulayın.',
        'Eksik veri, aykırı değer ve dağılım özelliklerini analizden önce inceleyin.',
        'Araştırma sorusuna göre grup karşılaştırması, ilişki veya yordama yaklaşımını belirleyin.',
        'Seçilen testin varsayımlarını ve gerekli alternatifleri değerlendirin.',
        'Etki büyüklüğü, güven aralığı ve sınırlılıkları sonuçlarla birlikte açıklayın.',
      ],
      checks: ['Ölçek puanlama yönergesi doğru uygulandı.', 'Test seçimi değişken ve örneklem yapısıyla uyumlu.', 'Varsayım kontrolleri raporlandı.', 'Sonuçlar nedensellik sınırları aşılmadan yorumlandı.'],
      mistakes: ['Yalnızca p-değerine göre karar vermek.', 'Ters maddeleri ve alt boyutları kontrol etmemek.', 'Kesitsel ilişkileri nedensel etki olarak sunmak.'],
      faq: [
        { question: 'Hangi SPSS testi kullanılmalıdır?', answer: 'Tek bir standart test yoktur. Araştırma sorusu, ölçüm düzeyi, grup yapısı ve varsayımlar birlikte değerlendirilmelidir.' },
        { question: 'Analiz sonuçları araştırmacı adına yazılır mı?', answer: 'Hayır. Test mantığı ve çıktıların nasıl okunacağı açıklanır; akademik yorum ve nihai metin araştırmacıya aittir.' },
      ],
    },
    en: {
      title: 'Analyzing Stress and Coping Strategies with SPSS',
      description: 'Learn how scale structure, assumptions, test selection, and interpretation should be handled when analyzing stress and coping data in SPSS.',
      summary: '- Scale scores are structured around the research question.\n- Test selection is justified by the data and assumptions.\n- Academic interpretation and the final text remain the researcher’s responsibility.',
      introduction: 'Comparing total scores alone is not enough in research on stress and coping strategies. Scale direction, subscales, reliability, and study design need to be evaluated together.',
      goal: 'The goal is to help researchers understand their data, justify appropriate analysis options, and interpret output within the limits of the research question.',
      steps: [
        'Verify reverse-coded items, subscales, and scoring instructions.',
        'Review missing data, outliers, and distributional properties before analysis.',
        'Choose a comparison, association, or prediction approach based on the research question.',
        'Evaluate assumptions and suitable alternatives for the selected test.',
        'Explain effect sizes, confidence intervals, and limitations with the results.',
      ],
      checks: ['Scoring instructions were applied correctly.', 'The test matches the variables and sample structure.', 'Assumption checks were reported.', 'Interpretation stays within causal limits.'],
      mistakes: ['Making decisions from p-values alone.', 'Ignoring reverse-coded items or subscales.', 'Presenting cross-sectional associations as causal effects.'],
      faq: [
        { question: 'Which SPSS test should be used?', answer: 'There is no single standard test. The research question, measurement level, group structure, and assumptions must be considered together.' },
        { question: 'Will the analysis results be written for the researcher?', answer: 'No. The method and output-reading process are explained; academic interpretation and the final text remain the researcher’s responsibility.' },
      ],
    },
  },
  {
    slug: 'ingilizce-tez-yazma',
    keywords: 'İngilizce tez yazımı, akademik İngilizce, tez danışmanlığı, akademik dil, English thesis writing',
    lastModified: LAST_MODIFIED,
    tr: {
      title: 'İngilizce Tez Yazımında Akademik Dil Rehberi',
      description: 'Kendi İngilizce tezinizi yazarken akademik dil, bölüm yapısı, kaynak kullanımı ve etik editoryal destek ilkelerini öğrenin.',
      summary: '- İngilizce tez araştırmacı tarafından yazılır.\n- Danışmanlık, akademik dil ve yapı hakkında gerekçeli geri bildirim sunar.\n- Kaynaklar, yorumlar ve nihai metin araştırmacının sorumluluğundadır.',
      introduction: 'İngilizce tez yazmak yalnızca bir metni başka dile çevirmek değildir. Araştırma sorusunu açık kurmak, yöntem tercihlerini gerekçelendirmek ve kanıt ile yorum arasındaki sınırı korumak gerekir.',
      goal: 'Amaç, araştırmacının kendi tezini alanının akademik söylemine uygun, tutarlı ve denetlenebilir biçimde geliştirebilmesidir.',
      steps: [
        'Üniversitenizin tez kılavuzunu ve kullanmanız gereken İngilizce çeşidini belirleyin.',
        'Araştırma sorusu, temel kavramlar ve yöntem için tutarlı bir terim listesi oluşturun.',
        'Giriş, literatür, yöntem, bulgular ve tartışma bölümlerinin aynı araştırma odağını koruduğunu denetleyin.',
        'İddiaların gücünü kullanılan kanıtın ve araştırma tasarımının sınırlarıyla eşleştirin.',
        'Son metni kaynak, dil, biçim ve kurum kuralları bakımından ayrı turlarda kontrol edin.',
      ],
      checks: ['Kaynak ile araştırmacının yorumu açıkça ayrılıyor.', 'Terimler ve zaman kullanımı metin boyunca tutarlı.', 'Doğrudan alıntılar ve parafrazlar doğru biçimde kaynaklandırılmış.', 'Son kararlar ve nihai metin araştırmacıya ait.'],
      mistakes: ['Kaynağı yalnızca kelime değiştirerek veya çevirerek gizlemek.', 'Yöntem ve bulguların desteklemediği kesinlikte iddialar kurmak.', 'Editoryal önerileri anlamadan otomatik olarak kabul etmek.'],
      faq: [
        { question: 'İngilizce tez benim adıma yazılır mı?', answer: 'Hayır. Danışmanlık yalnızca araştırmacının kendi taslağına dil, yapı ve yöntem açısından geri bildirim verir.' },
        { question: 'Dil incelemesi neleri kapsar?', answer: 'Açıklık, akış, dil bilgisi, terim tutarlılığı ve akademik üslup hakkında gerekçeli öneriler sunulabilir.' },
      ],
    },
    en: {
      title: 'Academic Language Guide for Writing a Thesis in English',
      description: 'Learn academic language, section structure, source use, and ethical editorial support principles while writing your own thesis in English.',
      summary: '- The thesis is written by the researcher.\n- Consulting provides reasoned feedback on language and structure.\n- Sources, interpretations, and the final text remain the researcher’s responsibility.',
      introduction: 'Writing a thesis in English is more than translating a text. It requires a clear research question, justified methodological choices, and a visible distinction between evidence and interpretation.',
      goal: 'The goal is to help researchers develop their own thesis in a consistent, auditable form that fits the academic discourse of their field.',
      steps: ['Identify the institutional thesis guide and required variety of English.', 'Create a consistent terminology list for the question, concepts, and methods.', 'Check alignment across the introduction, literature, methods, findings, and discussion.', 'Match the strength of each claim to the evidence and design.', 'Review sources, language, formatting, and institutional rules in separate passes.'],
      checks: ['Sources and the researcher’s interpretation are clearly distinguished.', 'Terminology and tense remain consistent.', 'Quotations and paraphrases are cited correctly.', 'Final decisions and authorship remain with the researcher.'],
      mistakes: ['Concealing a source through word substitution or translation.', 'Making claims stronger than the method or findings support.', 'Accepting editorial suggestions without understanding them.'],
      faq: [
        { question: 'Will you write an English thesis for me?', answer: 'No. Consulting provides language, structure, and methodology feedback only on the researcher’s own draft.' },
        { question: 'What can language review cover?', answer: 'It can provide reasoned suggestions on clarity, flow, grammar, terminology, and academic style.' },
      ],
    },
  },
  {
    slug: 'intihal-dusurme',
    keywords: 'benzerlik raporu, Turnitin raporu yorumlama, akademik dürüstlük, etik kaynak kullanımı, similarity report',
    lastModified: LAST_MODIFIED,
    tr: {
      title: 'Benzerlik Raporunu Etik Biçimde Yorumlama',
      description: 'Benzerlik yüzdesinin ne anlama geldiğini, eşleşmelerin nasıl inceleneceğini ve kaynak kullanımının etik biçimde nasıl geliştirileceğini öğrenin.',
      summary: '- Benzerlik yüzdesi tek başına intihal kararı değildir.\n- Evrensel bir kabul oranı veya oran düşürme garantisi yoktur.\n- Amaç sistemi atlatmak değil, kaynak kullanımını düzeltmektir.',
      introduction: 'Benzerlik raporu, metindeki ifadeleri erişebildiği kaynaklarla karşılaştırır. Doğru alıntılar, kaynakça kayıtları ve yaygın yöntem ifadeleri de eşleşebileceği için yüzdelik değer tek başına intihal kanıtı değildir.',
      goal: 'Amaç belirli bir yüzdeye ulaşmak değil, her eşleşmenin bağlamını incelemek ve kaynak kullanımını akademik dürüstlük ilkelerine göre düzeltmektir.',
      steps: ['Kurumunuzun güncel benzerlik ve kaynak kullanımı kurallarını okuyun.', 'Her eşleşmeyi doğrudan alıntı, parafraz, ortak ifade veya kaynakça kaydı olarak sınıflandırın.', 'Atıf, sayfa bilgisi ve tırnak işaretlerinin eksiksiz olduğunu kontrol edin.', 'Kaynağa çok yakın cümleleri fikri yeniden anlayarak kendi araştırma bağlamınızda kurun.', 'Metin içi atıflarla kaynakça listesinin birbirini karşıladığını doğrulayın.'],
      checks: ['Her eşleşme bağlam içinde değerlendirildi.', 'Parafraz yalnızca eş anlamlı kelime değişiminden oluşmuyor.', 'Öz-intihal ve metin geri dönüşümü kuralları kontrol edildi.', 'Kurumun resmî ölçütleri esas alındı.'],
      mistakes: ['Evrensel bir kabul yüzdesi olduğunu varsaymak.', 'Kaynağı çeviri veya otomatik kelime değişimiyle gizlemek.', 'Tespit sistemini yanıltmaya yönelik araçlara başvurmak.'],
      faq: [
        { question: 'Belirli bir benzerlik oranı garanti edilir mi?', answer: 'Hayır. Ölçütler kuruma ve belge türüne göre değişir; etik inceleme belirli bir yüzde garantisi vermez.' },
        { question: 'Metin benim adıma yeniden yazılır mı?', answer: 'Hayır. Araştırmacıya kendi metnindeki kaynak kullanımını düzeltmesi için açıklayıcı geri bildirim sunulur.' },
      ],
    },
    en: {
      title: 'How to Interpret a Similarity Report Ethically',
      description: 'Learn what a similarity percentage means, how to review matches, and how to improve source use ethically.',
      summary: '- A percentage alone is not a plagiarism decision.\n- There is no universal acceptable rate or reduction guarantee.\n- The goal is to correct source use, not bypass detection.',
      introduction: 'A similarity report compares expressions with sources available to the system. Correct quotations, reference entries, and common methodological language can also match, so the percentage alone is not proof of plagiarism.',
      goal: 'The goal is not a target percentage but a contextual review of each match and correction of source use under academic integrity principles.',
      steps: ['Read the current rules of your institution.', 'Classify each match as a quotation, paraphrase, common phrase, or reference entry.', 'Check citations, page details, and quotation marks.', 'Reconstruct overly close wording after understanding the idea in your own research context.', 'Verify that in-text citations and the reference list match.'],
      checks: ['Each match was reviewed in context.', 'Paraphrasing goes beyond synonym replacement.', 'Rules on self-plagiarism and text recycling were checked.', 'Official institutional criteria were followed.'],
      mistakes: ['Assuming a universal acceptable percentage.', 'Concealing a source through translation or automated substitution.', 'Using tools intended to mislead detection systems.'],
      faq: [
        { question: 'Is a specific similarity rate guaranteed?', answer: 'No. Criteria vary by institution and document type; ethical review cannot guarantee a percentage.' },
        { question: 'Will the text be rewritten for me?', answer: 'No. Researchers receive explanatory feedback so they can correct source use in their own text.' },
      ],
    },
  },
  {
    slug: 'yapay-zeka-bypass',
    keywords: 'akademik yapay zeka kullanımı, yapay zeka beyanı, akademik dürüstlük, AI disclosure, responsible AI',
    lastModified: LAST_MODIFIED,
    tr: {
      title: 'Akademik Çalışmalarda Yapay Zekâ Kullanımını Şeffaf Beyan Etme',
      description: 'Yapay zekâyı tespit sistemlerini atlatmak için değil; kurum kurallarına uygun, doğrulanabilir ve şeffaf biçimde kullanmayı öğrenin.',
      summary: '- Yapay zekâ tespitini atlatmaya yönelik yöntem sunulmaz.\n- Kurum politikaları kullanımdan önce kontrol edilmelidir.\n- Her çıktı doğrulanmalı ve gerekli kullanım beyanı yapılmalıdır.',
      introduction: 'Üretken yapay zekâ araçları fikir düzenleme, kavram açıklama ve dil kontrolünde yardımcı olabilir. Kabul edilebilir kullanım sınırı ise üniversiteye, dergiye, derse ve çalışma türüne göre değişir.',
      goal: 'Amaç, yapay zekâ kullanımını gizlemek değil; izin verilen kullanımı doğrulanabilir, sınırlı ve şeffaf biçimde belgelemektir.',
      steps: ['Kurumunuzun veya hedef derginin güncel politikasını okuyun.', 'Aracı hangi sınırlı amaçla kullanacağınızı önceden belirleyin.', 'Kişisel veri, katılımcı bilgisi ve yayımlanmamış bulgu yüklemeyin.', 'Her bilgi, kaynak ve hesaplamayı güvenilir kaynaklardan doğrulayın.', 'Gerekli kullanım beyanına araç, amaç, tarih ve doğrulama sürecini ekleyin.'],
      checks: ['Nihai argüman ve yorum araştırmacıya ait.', 'Yapay zekânın önerdiği kaynaklar okunarak doğrulandı.', 'Kurumun istediği kullanım beyanı eklendi.', 'Çalışma notları ve sürümler saklandı.'],
      mistakes: ['Yapay zekâ çıktısını insan tarafından yazılmış gibi sunmak.', 'Tespit sistemini atlatmaya çalışmak.', 'Gizli veya kişisel verileri üçüncü taraf araçlara yüklemek.'],
      faq: [
        { question: 'Yapay zekâ tespitini aşma hizmeti veriliyor mu?', answer: 'Hayır. Tespit sistemlerini yanıltmaya yönelik yöntem veya hizmet sunulmaz.' },
        { question: 'Yapay zekâ kullanımı nasıl beyan edilir?', answer: 'Kurumun istediği biçimde araç, kullanım amacı, kapsamı ve doğrulama süreci açıklanmalıdır.' },
      ],
    },
    en: {
      title: 'Transparent Disclosure of AI Use in Academic Work',
      description: 'Learn to use AI transparently, verifiably, and under institutional rules rather than attempting to bypass detection systems.',
      summary: '- No AI-detection bypass methods are provided.\n- Institutional policies must be checked first.\n- Every output must be verified and required use disclosed.',
      introduction: 'Generative AI can support idea organization, concept explanation, and language checks. Acceptable use varies by university, journal, course, and type of work.',
      goal: 'The goal is not to conceal AI use but to document permitted use in a limited, verifiable, and transparent way.',
      steps: ['Read the current institutional or journal policy.', 'Define the limited purpose of the tool in advance.', 'Do not upload personal data, participant information, or unpublished findings.', 'Verify every fact, reference, and calculation.', 'Disclose the tool, purpose, date, and verification process when required.'],
      checks: ['The final argument and interpretation belong to the researcher.', 'AI-suggested sources were read and verified.', 'The required disclosure was included.', 'Working notes and versions were retained.'],
      mistakes: ['Presenting AI output as human-authored.', 'Attempting to bypass detection systems.', 'Uploading confidential or personal data to third-party tools.'],
      faq: [
        { question: 'Do you provide AI-detection bypass?', answer: 'No. No method or service intended to mislead detection systems is provided.' },
        { question: 'How should AI use be disclosed?', answer: 'Follow the institution’s format and explain the tool, purpose, scope, and verification process.' },
      ],
    },
  },
  {
    slug: 'tez-sunumu-hazirlama',
    keywords: 'tez sunumu, tez savunması, sunum provası, akademik sunum, thesis defense presentation',
    lastModified: LAST_MODIFIED,
    tr: {
      title: 'Tez Sunumunu Geliştirme ve Savunma Provası',
      description: 'Kendi tez sunumunuzu açık bir akışla geliştirin; süre yönetimi, görsel sadelik ve jüri sorularına hazırlık için uygulanabilir öneriler alın.',
      summary: '- Sunum ve konuşma notları araştırmacı tarafından hazırlanır.\n- Danışmanlık akış, süre, görsel tasarım ve prova geri bildirimi sağlar.\n- Araştırmacı yöntem ve bulgularını kendi sözleriyle savunur.',
      introduction: 'Etkili bir tez sunumu, çalışmanın tamamını slaytlara taşımak yerine araştırma problemini, yöntemi, temel bulguları ve katkıyı anlaşılır bir anlatı içinde sunar.',
      goal: 'Amaç, araştırmacının kendi çalışmasına hâkimiyetini açık bir sunum ve gerçekçi savunma provasıyla gösterebilmesidir.',
      steps: ['Problem ve araştırma gerekçesini tek bir ana mesajla açıklayın.', 'Amaç, yöntem, temel bulgular, tartışma ve sınırlılıklar için dengeli bir akış kurun.', 'Her slaytı tek bir ana fikre hizmet edecek biçimde sadeleştirin.', 'Tam süreli prova yaparak zor geçişleri ve uzayan açıklamaları belirleyin.', 'Örneklem, varsayımlar, alternatif yöntemler ve sınırlılıklar için dürüst yanıtlar hazırlayın.'],
      checks: ['Slaytlar araştırmacı tarafından hazırlandı.', 'Tablo ve grafiklerin eksen, birim ve örneklem bilgileri görünür.', 'Sunum belirlenen süre içinde tamamlanıyor.', 'Araştırmacı her yöntemi ve bulguyu kendi sözleriyle açıklayabiliyor.'],
      mistakes: ['Tezin tamamını küçük yazıyla slaytlara aktarmak.', 'Sınırlılıkları gizlemek veya bilmediği konuda tahmin yürütmek.', 'Konuşma metnini başkasına hazırlatıp ezberlemek.'],
      faq: [
        { question: 'Sunum benim adıma hazırlanır mı?', answer: 'Hayır. Araştırmacının hazırladığı slaytlara akış, görsel sadelik, süre ve anlatım bakımından geri bildirim verilir.' },
        { question: 'Savunma provası nasıl yürütülür?', answer: 'Olası jüri soruları üzerinden yöntem, bulgular ve sınırlılıkların araştırmacı tarafından açıklanması çalışılır.' },
      ],
    },
    en: {
      title: 'Improving Your Thesis Presentation and Defense Rehearsal',
      description: 'Improve your own thesis presentation with guidance on flow, timing, visual simplicity, and committee questions.',
      summary: '- Slides and speaking notes are prepared by the researcher.\n- Consulting provides feedback on flow, timing, visuals, and rehearsal.\n- Researchers defend their methods and findings in their own words.',
      introduction: 'An effective thesis presentation does not copy the entire document onto slides. It presents the research problem, method, key findings, and contribution as a clear narrative.',
      goal: 'The goal is to demonstrate command of one’s own research through a clear presentation and realistic defense rehearsal.',
      steps: ['Explain the problem and rationale with one main message.', 'Balance the purpose, method, findings, discussion, and limitations.', 'Simplify each slide around a single idea.', 'Run a full timed rehearsal and identify difficult transitions.', 'Prepare honest answers about the sample, assumptions, alternatives, and limitations.'],
      checks: ['Slides were prepared by the researcher.', 'Tables and charts show axes, units, and sample details.', 'The presentation fits the allotted time.', 'The researcher can explain every method and finding in their own words.'],
      mistakes: ['Copying the thesis onto slides in small text.', 'Hiding limitations or guessing when an answer is unknown.', 'Having someone else prepare and script the defense.'],
      faq: [
        { question: 'Will the presentation be prepared for me?', answer: 'No. Feedback is provided on flow, visual simplicity, timing, and delivery for slides prepared by the researcher.' },
        { question: 'How does defense rehearsal work?', answer: 'The researcher practices explaining methods, findings, and limitations through possible committee questions.' },
      ],
    },
  },
  {
    slug: 'ingilizce-odev-yaptirma',
    keywords: 'İngilizce akademik ödev, akademik İngilizce, yazım rehberi, kaynak kullanımı, English academic writing',
    lastModified: LAST_MODIFIED,
    tr: {
      title: 'İngilizce Akademik Ödevlerde Yazım ve Dil Rehberi',
      description: 'Kendi İngilizce ödevinizi planlama, kaynaklandırma ve akademik dil bakımından geliştirme yollarını öğrenin.',
      summary: '- Ödev öğrenci tarafından hazırlanır.\n- Destek; planlama, dil öğrenimi ve taslağa geri bildirimle sınırlıdır.\n- Teslim edilen metnin yazarlığı ve sorumluluğu öğrenciye aittir.',
      introduction: 'İngilizce akademik ödev, yalnızca doğru dil bilgisi değil; açık bir soru, kaynaklara dayalı gerekçelendirme ve tutarlı bir bölüm yapısı gerektirir.',
      goal: 'Amaç, öğrencinin kendi düşüncesini akademik İngilizceyle açıkça ifade etme ve kaynakları etik biçimde kullanma becerisini geliştirmektir.',
      steps: ['Ödev yönergesindeki görev fiillerini ve değerlendirme ölçütlerini belirleyin.', 'Soruyu yanıtlayan kısa bir tez cümlesi ve bölüm planı oluşturun.', 'Güvenilir kaynakları okuyup her kaynağın katkısını kendi notlarınızla özetleyin.', 'İlk taslağı kaynaklara bakmadan kendi cümlelerinizle yazın ve gerekli atıfları ekleyin.', 'Dil, akış, kaynakça ve yönerge uyumunu ayrı kontrol turlarında değerlendirin.'],
      checks: ['Ana iddia soruyu doğrudan yanıtlıyor.', 'Her paragraf tek bir işlev taşıyor.', 'Kaynaklar doğru biçimde atfediliyor.', 'Öğrenci metindeki her cümleyi açıklayabiliyor.'],
      mistakes: ['Hazır bir metni teslim etmek veya çeviriyle yazarlığı gizlemek.', 'Kaynak okumadan yapay zekâ çıktısını kullanmak.', 'Dil düzeltmesini yeni içerik üretimiyle karıştırmak.'],
      faq: [
        { question: 'İngilizce ödev benim adıma hazırlanır mı?', answer: 'Hayır. Öğrenci adına teslim edilecek ödev hazırlanmaz; öğrencinin kendi taslağına öğretici geri bildirim verilir.' },
        { question: 'Hangi destekler alınabilir?', answer: 'Yönergeyi anlama, çalışma planı, akademik dil açıklamaları, kaynak kullanımı ve taslak geri bildirimi alınabilir.' },
      ],
    },
    en: {
      title: 'Writing and Language Guide for English Academic Assignments',
      description: 'Learn how to plan, reference, and improve your own English assignment in an academically responsible way.',
      summary: '- The student prepares the assignment.\n- Support is limited to planning, language learning, and draft feedback.\n- Authorship and responsibility remain with the student.',
      introduction: 'An English academic assignment requires more than correct grammar. It needs a clear question, source-based reasoning, and a coherent structure.',
      goal: 'The goal is to develop the student’s ability to express their own reasoning in academic English and use sources ethically.',
      steps: ['Identify the task verbs and assessment criteria.', 'Create a short thesis statement and section plan.', 'Read reliable sources and summarize each contribution in your own notes.', 'Write the first draft in your own words and add citations.', 'Review language, flow, references, and compliance in separate passes.'],
      checks: ['The central claim answers the question.', 'Each paragraph has one function.', 'Sources are attributed correctly.', 'The student can explain every sentence.'],
      mistakes: ['Submitting ready-made text or concealing authorship through translation.', 'Using AI output without reading the sources.', 'Confusing language correction with content production.'],
      faq: [
        { question: 'Will you prepare my English assignment?', answer: 'No. No submission-ready assignment is prepared on behalf of a student; teaching-focused feedback is provided on the student’s own draft.' },
        { question: 'What support is available?', answer: 'Support can cover understanding the brief, planning, academic language, source use, and feedback on a draft.' },
      ],
    },
  },
  {
    slug: 'biyoistatistik-odevi-yapma',
    keywords: 'biyoistatistik ödevi, istatistik öğrenme, analiz planı, sonuç yorumlama, biostatistics assignment',
    lastModified: LAST_MODIFIED,
    tr: {
      title: 'Biyoistatistik Ödevleri İçin Uygulamalı Öğrenme Rehberi',
      description: 'Biyoistatistik ödevinizde araştırma sorusunu, değişkenleri, uygun testi ve sonuç yorumunu kendi başınıza geliştirmek için bir yol haritası.',
      summary: '- Çözüm ve rapor öğrenci tarafından oluşturulur.\n- Danışmanlık test seçiminin mantığını ve uygulama adımlarını öğretir.\n- Hazır cevap veya teslim edilecek ödev sunulmaz.',
      introduction: 'Biyoistatistik ödevleri, formül ezberlemekten çok araştırma sorusunu veri yapısıyla eşleştirme ve sonucu doğru sınırlar içinde yorumlama becerisini ölçer.',
      goal: 'Amaç, öğrencinin hangi yöntemin neden seçildiğini açıklayabilmesi, analizi yeniden üretebilmesi ve çıktıyı kendi cümleleriyle raporlayabilmesidir.',
      steps: ['Araştırma sorusunu ve ölçüm düzeylerini açıkça yazın.', 'Bağımlı, bağımsız ve olası karıştırıcı değişkenleri belirleyin.', 'Örneklem yapısı ve varsayımlara göre aday testleri karşılaştırın.', 'Analizi adım adım uygulayıp işlem kaydını saklayın.', 'Etki büyüklüğü, belirsizlik ve sınırlılıkları sonuçla birlikte yorumlayın.'],
      checks: ['Test seçimi araştırma sorusuyla uyumlu.', 'Varsayımlar kontrol edilip raporlandı.', 'Çıktı tabloları körü körüne kopyalanmadı.', 'Öğrenci her adımı ve sonucu açıklayabiliyor.'],
      mistakes: ['Yalnızca p-değerine bakarak karar vermek.', 'Örneklem ve değişken yapısını incelemeden test seçmek.', 'Hazır analiz çıktısını anlamadan teslim etmek.'],
      faq: [
        { question: 'Biyoistatistik ödevinin çözümü hazırlanır mı?', answer: 'Hayır. Hazır çözüm veya teslim edilecek rapor verilmez; yöntem mantığı öğretilir ve öğrencinin uygulamasına geri bildirim sunulur.' },
        { question: 'Teknik destek neleri kapsar?', answer: 'Veri yapısını anlama, test seçeneklerini karşılaştırma, varsayımları kontrol etme ve çıktıyı yorumlama açıklanabilir.' },
      ],
    },
    en: {
      title: 'Applied Learning Guide for Biostatistics Assignments',
      description: 'A roadmap for developing your own research question, variable map, test choice, and interpretation in a biostatistics assignment.',
      summary: '- The student creates the solution and report.\n- Consulting teaches the logic of test selection and application.\n- No ready-made answer or submission is provided.',
      introduction: 'Biostatistics assignments assess more than formula recall. They test the ability to align a research question with the data structure and interpret results within appropriate limits.',
      goal: 'The goal is for students to explain why a method was selected, reproduce the analysis, and report the output in their own words.',
      steps: ['State the research question and measurement levels.', 'Identify dependent, independent, and possible confounding variables.', 'Compare candidate tests under the sample structure and assumptions.', 'Run the analysis step by step and retain an audit trail.', 'Interpret effect size, uncertainty, and limitations with the result.'],
      checks: ['The test matches the research question.', 'Assumptions were checked and reported.', 'Software output was not copied blindly.', 'The student can explain every step and result.'],
      mistakes: ['Making a decision from the p-value alone.', 'Choosing a test before examining the sample and variables.', 'Submitting ready-made output without understanding it.'],
      faq: [
        { question: 'Will you solve my biostatistics assignment?', answer: 'No. No ready-made solution or report is provided; the method is taught and feedback is given on the student’s own work.' },
        { question: 'What can technical support cover?', answer: 'It can explain data structure, test alternatives, assumptions, and interpretation of output.' },
      ],
    },
  },
  {
    slug: 'seminer-odevi-yaptirma',
    keywords: 'seminer çalışması, literatür taraması, akademik sunum, seminer ödevi planlama, seminar paper',
    lastModified: LAST_MODIFIED,
    tr: {
      title: 'Seminer Çalışmasını Planlama ve Geliştirme Rehberi',
      description: 'Kendi seminer çalışmanızı araştırma sorusu, literatür taraması, bölüm yapısı ve sunum bakımından geliştirin.',
      summary: '- Seminer metni ve sunumu öğrenci tarafından hazırlanır.\n- Danışmanlık plan, kaynak stratejisi ve taslak geri bildirimi sağlar.\n- Hazır çalışma veya teslim garantisi sunulmaz.',
      introduction: 'Seminer çalışması, bir konuyu özetlemekten çok literatürdeki yaklaşımları karşılaştırmayı, tutarlı bir soru etrafında sentez yapmayı ve sonucu sözlü olarak savunmayı gerektirir.',
      goal: 'Amaç, öğrencinin kendi literatür taramasını yürütebilmesi, kaynakları eleştirel biçimde sentezleyebilmesi ve çalışmasını açıkça sunabilmesidir.',
      steps: ['Konuyu tek bir yönetilebilir soruya daraltın.', 'Anahtar kavramlar, eş anlamlılar ve veri tabanları için tarama planı oluşturun.', 'Kaynakları yöntem, bulgu, güçlü yön ve sınırlılık bakımından notlayın.', 'Kaynakları listelemek yerine ortak temalar ve ayrımlar etrafında sentezleyin.', 'Metin ile sunumun aynı ana mesajı taşıdığını prova ederek doğrulayın.'],
      checks: ['Kapsam ve dışlama ölçütleri açık.', 'Kaynaklar güvenilir ve izlenebilir.', 'Her bölüm araştırma sorusuna katkı sağlıyor.', 'Öğrenci kaynak seçimlerini ve yorumlarını açıklayabiliyor.'],
      mistakes: ['Kaynak özetlerini arka arkaya dizmek.', 'Doğrulanmamış veya okunmamış kaynak kullanmak.', 'Başkasının hazırladığı metni veya sunumu teslim etmek.'],
      faq: [
        { question: 'Seminer ödevi benim adıma hazırlanır mı?', answer: 'Hayır. Öğrenci adına seminer metni veya sunumu hazırlanmaz; öğrencinin kendi çalışmasına planlama ve geri bildirim desteği verilir.' },
        { question: 'Literatür desteği nasıl sunulur?', answer: 'Arama stratejisi, kaynak değerlendirme ölçütleri ve sentez tablosu oluşturma yöntemi öğretilebilir.' },
      ],
    },
    en: {
      title: 'Guide to Planning and Developing a Seminar Paper',
      description: 'Develop your own seminar paper through a clear question, literature strategy, structure, and presentation plan.',
      summary: '- The student prepares the paper and presentation.\n- Consulting supports planning, source strategy, and draft feedback.\n- No ready-made work or delivery guarantee is offered.',
      introduction: 'A seminar paper requires more than summarizing a topic. It compares approaches in the literature, synthesizes them around a coherent question, and presents the conclusion orally.',
      goal: 'The goal is for students to run their own literature review, synthesize sources critically, and present their work clearly.',
      steps: ['Narrow the topic to one manageable question.', 'Build a search plan using concepts, synonyms, and databases.', 'Record each source’s method, findings, strengths, and limitations.', 'Synthesize around themes and differences instead of listing summaries.', 'Rehearse to ensure the paper and presentation carry the same message.'],
      checks: ['Scope and exclusion criteria are explicit.', 'Sources are reliable and traceable.', 'Every section contributes to the question.', 'The student can explain source choices and interpretations.'],
      mistakes: ['Placing source summaries one after another.', 'Using unverified or unread references.', 'Submitting a paper or presentation prepared by someone else.'],
      faq: [
        { question: 'Will you prepare my seminar paper?', answer: 'No. No seminar paper or presentation is prepared on behalf of a student; planning and feedback support is provided on the student’s own work.' },
        { question: 'How is literature support provided?', answer: 'The process can teach search strategies, source evaluation criteria, and synthesis-table methods.' },
      ],
    },
  },
  {
    slug: 'yapay-zeka-ile-odev-yaptirma',
    keywords: 'ödevlerde yapay zeka, etik yapay zeka kullanımı, AI beyanı, akademik dürüstlük, AI in assignments',
    lastModified: LAST_MODIFIED,
    tr: {
      title: 'Ödevlerde Yapay Zekâyı Etik ve Şeffaf Kullanma',
      description: 'Yapay zekâ araçlarını ödevin yazarlığını devretmeden, kurum kurallarına uygun ve doğrulanabilir biçimde kullanın.',
      summary: '- Yapay zekâ ödevi öğrenci yerine üretmemelidir.\n- Kullanım sınırı kurum politikasına göre belirlenir.\n- Çıktılar doğrulanır ve gerekiyorsa açıkça beyan edilir.',
      introduction: 'Yapay zekâ; kavram açıklama, çalışma planı ve dil kontrolünde yardımcı olabilir. Ancak aracın ürettiği metni kendi çalışmasıymış gibi teslim etmek akademik sorumluluğu ortadan kaldırmaz.',
      goal: 'Amaç, öğrencinin kendi düşünme ve yazma sürecini koruyarak yapay zekâyı sınırlı, doğrulanabilir ve şeffaf bir öğrenme aracı olarak kullanmasıdır.',
      steps: ['Dersin ve kurumun yapay zekâ politikasını okuyun.', 'İzin verilen kullanım amacını önceden yazın.', 'Aracı cevap üretmek yerine kavramı açıklama veya kendi taslağınızı sorgulama için kullanın.', 'Her iddia, hesaplama ve kaynağı bağımsız olarak doğrulayın.', 'Gerekliyse araç, tarih, amaç ve kullanılan yöntemi beyan edin.'],
      checks: ['Ana fikir, analiz ve nihai metin öğrenciye ait.', 'Hiçbir kişisel veya gizli veri paylaşılmadı.', 'Kaynaklar öğrenci tarafından okunup doğrulandı.', 'Öğrenci teslim ettiği her bölümü açıklayabiliyor.'],
      mistakes: ['Tam ödevi üretip olduğu gibi teslim etmek.', 'Sahte veya okunmamış kaynakları kullanmak.', 'Kullanımı gizlemek ya da tespit sistemini aşmaya çalışmak.'],
      faq: [
        { question: 'Yapay zekâyla ödev hazırlama hizmeti veriliyor mu?', answer: 'Hayır. Öğrenci adına ödev üretilmez; etik kullanım planı ve öğrencinin kendi taslağı hakkında öğretici geri bildirim sunulabilir.' },
        { question: 'Her yapay zekâ kullanımı beyan edilmeli mi?', answer: 'Kesin kural kurumunuza bağlıdır. Dersin veya kurumun güncel politikasını izlemelisiniz.' },
      ],
    },
    en: {
      title: 'Using AI Ethically and Transparently in Assignments',
      description: 'Use AI tools under institutional rules without transferring authorship of your assignment and with verifiable, transparent practice.',
      summary: '- AI must not produce the assignment in place of the student.\n- Institutional policy defines the permitted scope.\n- Outputs are verified and disclosed when required.',
      introduction: 'AI can support concept explanation, study planning, and language checks. Submitting generated text as one’s own does not remove academic responsibility.',
      goal: 'The goal is to preserve the student’s own thinking and writing while using AI as a limited, verifiable, and transparent learning tool.',
      steps: ['Read the course and institutional AI policy.', 'Write down the permitted purpose before using the tool.', 'Use it to explain concepts or question your own draft rather than generate an answer.', 'Verify every claim, calculation, and reference independently.', 'Disclose the tool, date, purpose, and method when required.'],
      checks: ['The central idea, analysis, and final text belong to the student.', 'No personal or confidential data was shared.', 'Sources were read and verified by the student.', 'The student can explain every submitted section.'],
      mistakes: ['Generating the entire assignment and submitting it unchanged.', 'Using fabricated or unread references.', 'Concealing use or attempting to bypass detection.'],
      faq: [
        { question: 'Do you provide AI-generated assignments?', answer: 'No. No assignment is produced on behalf of a student; ethical-use planning and teaching-focused feedback on the student’s own draft may be provided.' },
        { question: 'Must every use of AI be disclosed?', answer: 'The exact rule depends on your institution. Follow the current course or institutional policy.' },
      ],
    },
  },
  {
    slug: 'yuksek-lisans-odev-yaptirma',
    keywords: 'yüksek lisans ödevi, lisansüstü çalışma planı, akademik yazım, literatür sentezi, graduate assignment',
    lastModified: LAST_MODIFIED,
    tr: {
      title: 'Yüksek Lisans Ödevlerini Planlama ve Geliştirme Rehberi',
      description: 'Kendi yüksek lisans ödevinizi araştırma sorusu, literatür, yöntem ve akademik yazım bakımından sistemli biçimde geliştirin.',
      summary: '- Yüksek lisans ödevi öğrenci tarafından hazırlanır.\n- Danışmanlık planlama, yöntem öğrenimi ve taslak geri bildirimi sağlar.\n- Hazır metin, teslim veya özgünlük garantisi sunulmaz.',
      introduction: 'Yüksek lisans ödevi, öğrencinin bir problemi tanımlama, bilimsel kaynakları eleştirel biçimde değerlendirme ve gerekçeli bir sonuç oluşturma becerisini göstermelidir.',
      goal: 'Amaç, öğrencinin kendi akademik çalışmasını planlaması, kaynak kararlarını açıklaması ve yazdığı metni savunabilecek düzeyde konuya hâkim olmasıdır.',
      steps: ['Ödev yönergesini değerlendirme ölçütleriyle birlikte çözümleyin.', 'Kapsamı yönetilebilir bir araştırma sorusuna daraltın.', 'Kaynak tarama ve eleme ölçütlerini önceden belirleyin.', 'İddia, kanıt ve yorum ilişkisini gösteren ayrıntılı bir taslak oluşturun.', 'Metni içerik, kaynak kullanımı, yöntem, dil ve biçim bakımından ayrı ayrı gözden geçirin.'],
      checks: ['Araştırma sorusu açık ve yönetilebilir.', 'Kaynak seçimi izlenebilir ölçütlere dayanıyor.', 'Her iddia uygun kanıt ve atıfla destekleniyor.', 'Öğrenci tüm kararları ve metni kendi sözleriyle açıklayabiliyor.'],
      mistakes: ['Başkasının hazırladığı metni kendi çalışması olarak teslim etmek.', 'Kaynakları yalnızca özetleyip eleştirel sentez yapmamak.', 'Teslim tarihini planlamadan son anda hazır içerik aramak.'],
      faq: [
        { question: 'Yüksek lisans ödevim veya tezim benim adıma hazırlanır mı?', answer: 'Hayır. Öğrenci adına ödev, tez, makale veya proje hazırlanmaz. Danışmanlık öğrencinin kendi çalışmasını geliştirmesine yöneliktir.' },
        { question: 'Danışmanlık hangi aşamalarda yardımcı olabilir?', answer: 'Soruyu daraltma, kaynak stratejisi, yöntem seçeneklerini anlama, çalışma planı ve öğrencinin kendi taslağına geri bildirim aşamalarında destek sunulabilir.' },
        { question: 'Teslim veya not garantisi var mı?', answer: 'Hayır. Hazır çalışma, belirli not, benzerlik oranı veya teslim sonucu garantisi verilmez.' },
      ],
    },
    en: {
      title: 'Guide to Planning and Developing Graduate Assignments',
      description: 'Develop your own graduate assignment systematically through a clear question, literature strategy, method, and academic writing process.',
      summary: '- The graduate assignment is prepared by the student.\n- Consulting supports planning, method learning, and draft feedback.\n- No ready-made text, delivery, or originality guarantee is offered.',
      introduction: 'A graduate assignment should demonstrate the student’s ability to define a problem, evaluate scientific sources critically, and form a reasoned conclusion.',
      goal: 'The goal is for students to plan their own academic work, explain source decisions, and understand the topic well enough to defend the text they wrote.',
      steps: ['Analyze the brief together with the assessment criteria.', 'Narrow the scope to one manageable research question.', 'Define search and screening criteria in advance.', 'Create a detailed outline linking claims, evidence, and interpretation.', 'Review content, sources, methods, language, and formatting in separate passes.'],
      checks: ['The research question is clear and manageable.', 'Source selection follows traceable criteria.', 'Each claim is supported by appropriate evidence and citation.', 'The student can explain every decision and passage in their own words.'],
      mistakes: ['Submitting text prepared by someone else as one’s own.', 'Listing source summaries without critical synthesis.', 'Seeking ready-made content at the last moment instead of planning.'],
      faq: [
        { question: 'Will you prepare my graduate assignment or thesis?', answer: 'No. No assignment, thesis, article, or project is prepared on behalf of a student. Consulting helps students develop their own work.' },
        { question: 'Which stages can consulting support?', answer: 'Support may cover narrowing the question, source strategy, understanding method options, planning, and feedback on the student’s own draft.' },
        { question: 'Is a delivery or grade guaranteed?', answer: 'No. There is no guarantee of ready-made work, a particular grade, similarity rate, or submission result.' },
      ],
    },
  },
]

function buildContent(article: LocalizedGuidanceArticle, locale: 'tr' | 'en'): string {
  if (article.customContent) return article.customContent

  const labels = locale === 'tr'
    ? {
        boundary: '> **Hizmet sınırı:** Danışan veya öğrenci adına teslim edilmek üzere tez, makale, ödev, proje ya da sınav çalışması hazırlanmaz. Sunulan destek; araştırmacının kendi çalışmasını planlaması, yöntemleri öğrenmesi ve kendi taslağını geliştirmesi için danışmanlık ve geri bildirimle sınırlıdır.',
        goal: 'Bu Çalışmanın Amacı',
        steps: 'Uygulanabilir Çalışma Adımları',
        checks: 'Nitelik Kontrol Listesi',
        mistakes: 'Kaçınılması Gereken Yaklaşımlar',
        consulting: 'Danışmanlık Kapsamı',
        consultingText: 'Danışmanlık; yönergeyi veya kurum kılavuzunu anlamlandırma, çalışma planı oluşturma, yöntem seçeneklerini açıklama, araştırmacının kendi taslağına gerekçeli geri bildirim verme ve öğrenme sürecini destekleme biçiminde yürütülür. Yeni bir akademik çalışma üretilmez; veri, kaynak, analiz kararları, yorumlar ve nihai metin araştırmacının sorumluluğundadır.',
        faq: 'Sık Sorulan Sorular',
      }
    : {
        boundary: '> **Service boundary:** We do not prepare a thesis, article, assignment, project, or exam submission on behalf of a student or client. Support is limited to consulting and feedback that help researchers plan, learn methods, and improve their own draft.',
        goal: 'Purpose of This Guide',
        steps: 'Practical Working Steps',
        checks: 'Quality Checklist',
        mistakes: 'Approaches to Avoid',
        consulting: 'Scope of Consulting',
        consultingText: 'Consulting may explain a brief or institutional guide, help create a work plan, teach method alternatives, and provide reasoned feedback on the researcher’s own draft. It does not produce a new academic submission; data, sources, analytical decisions, interpretations, and the final text remain the researcher’s responsibility.',
        faq: 'Frequently Asked Questions',
      }

  const numberedSteps = article.steps.map((step, index) => `${index + 1}. ${step}`).join('\n')
  const checkItems = article.checks.map((item) => `- ${item}`).join('\n')
  const mistakeItems = article.mistakes.map((item) => `- ${item}`).join('\n')
  const faqItems = article.faq
    .map(({ question, answer }) => `### ${question}\n\n${answer}`)
    .join('\n\n')

  return `# ${article.title}\n\n${article.introduction}\n\n${labels.boundary}\n\n## ${labels.goal}\n\n${article.goal}\n\n## ${labels.steps}\n\n${numberedSteps}\n\n## ${labels.checks}\n\n${checkItems}\n\n## ${labels.mistakes}\n\n${mistakeItems}\n\n## ${labels.consulting}\n\n${labels.consultingText}\n\n## ${labels.faq}\n\n${faqItems}`
}

export function getGuidanceBlogRevision(slug: string) {
  const revision = revisions.find((item) => item.slug === slug)
  if (!revision) return null

  return {
    ...revision,
    tr: { ...revision.tr, content: buildContent(revision.tr, 'tr') },
    en: { ...revision.en, content: buildContent(revision.en, 'en') },
  }
}

export function getAllGuidanceBlogRevisions() {
  return revisions.map((revision) => getGuidanceBlogRevision(revision.slug)!)
}
