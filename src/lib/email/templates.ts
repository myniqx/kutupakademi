import { SITE_CONFIG } from '@/constants/site';

type FormType = 'contact' | 'price-request';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

interface PriceRequestFormData {
  name: string;
  email: string;
  phone: string;
  department: string;
  workTitle: string;
  studyLevel: string;
  submissionDate: string;
  additionalInfo?: string;
}

type FormData = ContactFormData | PriceRequestFormData;

function isPriceRequestForm(data: FormData): data is PriceRequestFormData {
  return 'workTitle' in data;
}

function getFormType(data: FormData): FormType {
  return isPriceRequestForm(data) ? 'price-request' : 'contact';
}

function getEmailSubject(formType: FormType): string {
  return formType === 'price-request'
    ? '🎯 Yeni Fiyat Talebi | New Price Request'
    : '📧 Yeni İletişim Talebi | New Contact Request';
}

function formatFieldLabel(key: string): { tr: string; en: string } {
  const labels: Record<string, { tr: string; en: string }> = {
    name: { tr: 'İsim-Soyisim', en: 'Full Name' },
    email: { tr: 'E-mail', en: 'Email' },
    phone: { tr: 'Telefon', en: 'Phone' },
    message: { tr: 'Mesaj', en: 'Message' },
    department: { tr: 'Bölüm', en: 'Department' },
    workTitle: { tr: 'Çalışma Başlığı', en: 'Work Title' },
    studyLevel: { tr: 'Çalışma Seviyesi', en: 'Study Level' },
    submissionDate: { tr: 'Teslim Tarihi', en: 'Submission Date' },
    additionalInfo: { tr: 'Ek Bilgiler', en: 'Additional Info' },
  };

  return labels[key] || { tr: key, en: key };
}

function formatStudyLevel(value: string): string {
  const levels: Record<string, string> = {
    bachelor: 'Lisans / Bachelor',
    masterNonThesis: 'Tezsiz Yüksek Lisans / Master without Thesis',
    masterThesis: 'Tezli Yüksek Lisans / Master with Thesis',
    phd: 'Doktora / PhD',
    journal: 'Hakemli Dergide Yayın / Journal Publication',
  };

  return levels[value] || value;
}

export function generateEmailHTML(data: FormData): string {
  const formType = getFormType(data);
  const subject = getEmailSubject(formType);
  const logoUrl = `${SITE_CONFIG.url}/kutupakademi.svg`;
  const timestamp = new Date().toLocaleString('tr-TR', {
    dateStyle: 'full',
    timeStyle: 'short',
  });

  // Create table rows
  const rows = Object.entries(data)
    .filter(([_, value]) => value !== undefined && value !== '')
    .map(([key, value]) => {
      const label = formatFieldLabel(key);
      let displayValue = String(value);

      // Format special fields
      if (key === 'studyLevel') {
        displayValue = formatStudyLevel(displayValue);
      }

      return `
        <tr>
          <td style="padding: 12px 16px; background-color: #f8f9fa; border: 1px solid #e9ecef; font-weight: 600; color: #495057; width: 200px;">
            ${label.tr} / ${label.en}
          </td>
          <td style="padding: 12px 16px; background-color: #ffffff; border: 1px solid #e9ecef; color: #212529;">
            ${displayValue}
          </td>
        </tr>
      `;
    })
    .join('');

  return `
<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <!-- Main Container -->
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #6450e0 0%, #8b7ff4 100%); padding: 32px 24px; text-align: center;">
              <img src="${logoUrl}" alt="Kutup Akademi" style="height: 48px; margin-bottom: 16px;" />
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700;">
                ${formType === 'price-request' ? 'Yeni Fiyat Talebi' : 'Yeni İletişim Talebi'}
              </h1>
              <p style="margin: 8px 0 0 0; color: rgba(255, 255, 255, 0.9); font-size: 14px;">
                ${formType === 'price-request' ? 'New Price Request' : 'New Contact Request'}
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 32px 24px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
                ${rows}
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 24px; text-align: center; border-top: 1px solid #e9ecef;">
              <p style="margin: 0 0 8px 0; color: #6c757d; font-size: 13px;">
                📅 ${timestamp}
              </p>
              <p style="margin: 0; color: #6c757d; font-size: 12px;">
                ${SITE_CONFIG.name.tr} - ${SITE_CONFIG.contact.email}
              </p>
              <p style="margin: 8px 0 0 0; color: #6c757d; font-size: 12px;">
                ${SITE_CONFIG.contact.phone}
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

export function generateEmailSubject(data: FormData): string {
  const formType = getFormType(data);
  return getEmailSubject(formType);
}
