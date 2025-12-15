import { ContactForm } from '@/components/forms/contact-form';

export default function PriceRequestPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Fiyat Talebi / Price Request</h1>
        <p className="text-muted-foreground mb-8">
          Hizmetlerimiz hakkında fiyat teklifi almak için formu doldurun. /
          Fill out the form to get a price quote for our services.
        </p>
        <ContactForm />
      </div>
    </div>
  );
}
