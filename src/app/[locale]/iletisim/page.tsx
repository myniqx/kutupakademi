import { ContactForm } from '@/components/forms/contact-form';
import { SITE_CONFIG } from '@/constants/site';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">İletişim / Contact</h1>
        <p className="text-muted-foreground mb-12">
          Bizimle iletişime geçin, size yardımcı olmaktan mutluluk duyarız. /
          Get in touch with us, we would be happy to help you.
        </p>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Contact Information */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">İletişim Bilgileri / Contact Information</h2>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-1" />
                <div>
                  <p className="font-medium">Email</p>
                  <a
                    href={`mailto:${SITE_CONFIG.contact.email}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {SITE_CONFIG.contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary mt-1" />
                <div>
                  <p className="font-medium">Telefon / Phone</p>
                  <a
                    href={`tel:${SITE_CONFIG.contact.phone}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {SITE_CONFIG.contact.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-1" />
                <div>
                  <p className="font-medium">Adres / Address</p>
                  <p className="text-muted-foreground">
                    {SITE_CONFIG.contact.address.tr}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Mesaj Gönderin / Send Message</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
