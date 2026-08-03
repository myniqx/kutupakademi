import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { generateEmailHTML, generateEmailSubject } from '@/lib/email/templates';
import { SITE_CONFIG } from '@/constants/site';

const resend = new Resend(process.env.RESEND_API_KEY || 'fake-api-key');

function isNonEmptyString(value: unknown, maxLength: number) {
  return typeof value === 'string' && value.trim().length > 0 && value.length <= maxLength;
}

function isValidEmail(value: unknown) {
  return typeof value === 'string' && value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validateRequest(data: Record<string, unknown>) {
  if (!isNonEmptyString(data.name, 120) || !isValidEmail(data.email)) {
    return false;
  }

  const isPriceRequest = 'workTitle' in data;

  if (!isPriceRequest) {
    return isNonEmptyString(data.message, 5000);
  }

  return (
    isNonEmptyString(data.phone, 40) &&
    isNonEmptyString(data.department, 160) &&
    isNonEmptyString(data.workTitle, 300) &&
    isNonEmptyString(data.studyLevel, 60) &&
    isNonEmptyString(data.serviceType, 80) &&
    isNonEmptyString(data.submissionDate, 40) &&
    data.scopeDeclaration === true &&
    (data.additionalInfo === undefined || data.additionalInfo === '' || isNonEmptyString(data.additionalInfo, 5000))
  );
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json() as Record<string, unknown>;

    if (!validateRequest(data)) {
      return NextResponse.json(
        { error: 'Invalid or incomplete request' },
        { status: 400 }
      );
    }

    // Generate email HTML and subject
    const emailHTML = generateEmailHTML(data);
    const subject = generateEmailSubject(data);

    // Send email via Resend
    const result = await resend.emails.send({
      from: 'Kutup Akademi Website <sandbox@resend.dev>',
      to: SITE_CONFIG.contact.email,
      subject: subject,
      html: emailHTML,
      replyTo: data.email as string, // Allow replying directly to the sender
    });

    if (result.error) {
      console.error('Resend error:', result.error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, messageId: result.data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
