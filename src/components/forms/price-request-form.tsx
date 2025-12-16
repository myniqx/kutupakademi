"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { GlowButton } from '@/components/ui/glow-button';

const priceRequestSchema = z.object({
  name: z.string().min(2, 'İsim en az 2 karakter olmalıdır / Name must be at least 2 characters'),
  email: z.string().email('Geçerli bir e-posta adresi giriniz / Invalid email address'),
  phone: z.string().min(10, 'Geçerli bir telefon numarası giriniz / Valid phone number required'),
  department: z.string().min(2, 'Bölüm bilgisi gereklidir / Department is required'),
  workTitle: z.string().min(5, 'Çalışma başlığı gereklidir / Work title is required'),
  studyLevel: z.string().min(1, 'Çalışma seviyesi seçiniz / Study level is required'),
  submissionDate: z.string().min(1, 'Teslim tarihi gereklidir / Submission date is required'),
  additionalInfo: z.string().optional(),
});

type PriceRequestData = z.infer<typeof priceRequestSchema>;

interface PriceRequestFormProps {
  locale: 'tr' | 'en';
}

export function PriceRequestForm({ locale }: PriceRequestFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PriceRequestData>({
    resolver: zodResolver(priceRequestSchema),
  });

  const onSubmit = async (data: PriceRequestData) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus('success');
        reset();
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const t = {
    tr: {
      name: 'İsim-Soyisim',
      email: 'E-mail Adresiniz',
      phone: 'Telefon Numaranız',
      department: 'Bölümünüz',
      workTitle: 'Çalışmanızın Başlığı',
      studyLevel: 'Çalışmanızın Seviyesi',
      submissionDate: 'Çalışmanızın Teslim Tarihi',
      additionalInfo: 'Eklemek İstedikleriniz',
      submit: 'Teklif Al !',
      submitting: 'Gönderiliyor...',
      success: 'Talebiniz başarıyla gönderildi. En kısa sürede size dönüş yapacağız.',
      error: 'Bir hata oluştu. Lütfen tekrar deneyin.',
      studyLevelOptions: {
        placeholder: 'Seçiniz...',
        bachelor: 'Lisans',
        masterNonThesis: 'Tezsiz Yüksek Lisans',
        masterThesis: 'Tezli Yüksek Lisans',
        phd: 'Doktora',
        journal: 'Hakemli Dergide Yayın',
      },
    },
    en: {
      name: 'Full Name',
      email: 'Your Email Address',
      phone: 'Your Phone Number',
      department: 'Your Department',
      workTitle: 'Title of Your Work',
      studyLevel: 'Level of Your Study',
      submissionDate: 'Submission Date',
      additionalInfo: 'Additional Information',
      submit: 'Get Quote !',
      submitting: 'Submitting...',
      success: 'Your request has been sent successfully. We will get back to you soon.',
      error: 'An error occurred. Please try again.',
      studyLevelOptions: {
        placeholder: 'Select...',
        bachelor: 'Bachelor',
        masterNonThesis: 'Master without Thesis',
        masterThesis: 'Master with Thesis',
        phd: 'PhD',
        journal: 'Journal Publication',
      },
    },
  };

  const content = t[locale];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-foreground mb-2"
        >
          {content.name} *
        </label>
        <input
          {...register('name')}
          type="text"
          id="name"
          className="w-full px-4 py-3 border border-border bg-background text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          placeholder={content.name}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      {/* Email & Phone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-foreground mb-2"
          >
            {content.email} *
          </label>
          <input
            {...register('email')}
            type="email"
            id="email"
            className="w-full px-4 py-3 border border-border bg-background text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            placeholder={content.email}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-foreground mb-2"
          >
            {content.phone} *
          </label>
          <input
            {...register('phone')}
            type="tel"
            id="phone"
            className="w-full px-4 py-3 border border-border bg-background text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            placeholder={content.phone}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-destructive">{errors.phone.message}</p>
          )}
        </div>
      </div>

      {/* Department */}
      <div>
        <label
          htmlFor="department"
          className="block text-sm font-medium text-foreground mb-2"
        >
          {content.department} *
        </label>
        <input
          {...register('department')}
          type="text"
          id="department"
          className="w-full px-4 py-3 border border-border bg-background text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          placeholder={content.department}
        />
        {errors.department && (
          <p className="mt-1 text-sm text-destructive">{errors.department.message}</p>
        )}
      </div>

      {/* Work Title */}
      <div>
        <label
          htmlFor="workTitle"
          className="block text-sm font-medium text-foreground mb-2"
        >
          {content.workTitle} *
        </label>
        <input
          {...register('workTitle')}
          type="text"
          id="workTitle"
          className="w-full px-4 py-3 border border-border bg-background text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          placeholder={content.workTitle}
        />
        {errors.workTitle && (
          <p className="mt-1 text-sm text-destructive">{errors.workTitle.message}</p>
        )}
      </div>

      {/* Study Level & Submission Date */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="studyLevel"
            className="block text-sm font-medium text-foreground mb-2"
          >
            {content.studyLevel} *
          </label>
          <select
            {...register('studyLevel')}
            id="studyLevel"
            className="w-full px-4 py-3 border border-border bg-background text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          >
            <option value="">{content.studyLevelOptions.placeholder}</option>
            <option value="bachelor">{content.studyLevelOptions.bachelor}</option>
            <option value="masterNonThesis">{content.studyLevelOptions.masterNonThesis}</option>
            <option value="masterThesis">{content.studyLevelOptions.masterThesis}</option>
            <option value="phd">{content.studyLevelOptions.phd}</option>
            <option value="journal">{content.studyLevelOptions.journal}</option>
          </select>
          {errors.studyLevel && (
            <p className="mt-1 text-sm text-destructive">{errors.studyLevel.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="submissionDate"
            className="block text-sm font-medium text-foreground mb-2"
          >
            {content.submissionDate} *
          </label>
          <input
            {...register('submissionDate')}
            type="date"
            id="submissionDate"
            className="w-full px-4 py-3 border border-border bg-background text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          />
          {errors.submissionDate && (
            <p className="mt-1 text-sm text-destructive">{errors.submissionDate.message}</p>
          )}
        </div>
      </div>

      {/* Additional Info */}
      <div>
        <label
          htmlFor="additionalInfo"
          className="block text-sm font-medium text-foreground mb-2"
        >
          {content.additionalInfo}
        </label>
        <textarea
          {...register('additionalInfo')}
          id="additionalInfo"
          rows={4}
          className="w-full px-4 py-3 border border-border bg-background text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
          placeholder={content.additionalInfo}
        />
      </div>

      {/* Status Messages */}
      {submitStatus === 'success' && (
        <div className="p-4 bg-primary/10 border border-primary rounded-lg">
          <p className="text-sm text-primary">{content.success}</p>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="p-4 bg-destructive/10 border border-destructive rounded-lg">
          <p className="text-sm text-destructive">{content.error}</p>
        </div>
      )}

      {/* Submit Button */}
      <GlowButton
        type="submit"
        disabled={isSubmitting}
        mode="border"
        intensity="high"
        size="lg"
        className="w-full"
      >
        {isSubmitting ? content.submitting : content.submit}
      </GlowButton>
    </form>
  );
}
