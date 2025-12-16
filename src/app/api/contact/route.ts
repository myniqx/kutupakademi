import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { generateEmailHTML, generateEmailSubject } from '@/lib/email/templates';
import { SITE_CONFIG } from '@/constants/site';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate required fields
    if (!data.name || !data.email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Generate email HTML and subject
    const emailHTML = generateEmailHTML(data);
    const subject = generateEmailSubject(data);

    // Send email via Resend
    const result = await resend.emails.send({
      from: 'Kutup Akademi Website <onboarding@resend.dev>', // You'll need to configure your domain
      to: SITE_CONFIG.contact.email,
      subject: subject,
      html: emailHTML,
      replyTo: data.email, // Allow replying directly to the sender
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
