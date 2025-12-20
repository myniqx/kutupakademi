type ContactEmailProps = {
  name: string;
  email: string;
  message: string;
};

export function generateEmailHTML(data: ContactEmailProps): string {
  const { name, email, message } = data;

  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, sans-serif; background-color: #f6f9fc;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f6f9fc; padding: 20px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; margin: 0 auto; padding: 40px 20px; border-radius: 8px;">
            <tr>
              <td>
                <h1 style="color: #333; font-size: 24px; font-weight: bold; margin: 0 0 30px 0; text-align: center;">
                  New Contact Form Submission
                </h1>

                <p style="color: #333; font-size: 16px; line-height: 26px; margin: 16px 0;">
                  <strong>Name:</strong> ${escapeHtml(name)}
                </p>

                <p style="color: #333; font-size: 16px; line-height: 26px; margin: 16px 0;">
                  <strong>Email:</strong> ${escapeHtml(email)}
                </p>

                <p style="color: #333; font-size: 16px; line-height: 26px; margin: 16px 0;">
                  <strong>Message:</strong>
                </p>

                <div style="background-color: #f4f4f4; padding: 16px; border-radius: 4px; margin: 16px 0;">
                  <p style="color: #333; font-size: 16px; line-height: 26px; margin: 0; white-space: pre-wrap;">${escapeHtml(message)}</p>
                </div>
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

export function generateEmailSubject(data: ContactEmailProps): string {
  return `New Contact Form: ${escapeHtml(data.name)}`;
}

// Helper function to escape HTML
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}
