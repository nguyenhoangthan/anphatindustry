'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { CheckCircle2, Send, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const contactSchema = z.object({
  name:    z.string().min(2, 'Vui lÃ²ng nháº­p há» tÃªn (Ã­t nháº¥t 2 kÃ½ tá»±)'),
  phone:   z.string().min(9, 'Sá»‘ Ä‘iá»‡n thoáº¡i khÃ´ng há»£p lá»‡').max(12).regex(/^[0-9+\s-]+$/, 'Chá»‰ gá»“m chá»¯ sá»‘'),
  email:   z.string().email('Email khÃ´ng há»£p lá»‡').optional().or(z.literal('')),
  service: z.string().optional(),
  message: z.string().min(10, 'Vui lÃ²ng nháº­p ná»™i dung (Ã­t nháº¥t 10 kÃ½ tá»±)'),
})

type ContactFormData = z.infer<typeof contactSchema>

const serviceOptions = [
  'Báº£o dÆ°á»¡ng Ä‘á»‹nh ká»³',
  'Sá»­a chá»¯a Ä‘iá»‡n & Ä‘iá»‡n láº¡nh',
  'Sá»­a chá»¯a mÃ¡y gáº§m',
  'ChÄƒm sÃ³c ná»™i tháº¥t',
  'ChÄƒm sÃ³c ngoáº¡i tháº¥t',
  'Äá»“ng sÆ¡n',
  'Kiá»ƒm tra tá»•ng quÃ¡t',
  'Dá»‹ch vá»¥ khÃ¡c',
]

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null
  return <p className="text-primary text-xs mt-1.5">{msg}</p>
}

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } =
    useForm<ContactFormData>({ resolver: zodResolver(contactSchema) })

  const onSubmit = async (data: ContactFormData) => {
    await new Promise((r) => setTimeout(r, 1200))
    console.info('Contact form submitted:', data)
    setSubmitted(true)
    reset()
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 px-6">
        <div className="w-16 h-16 bg-primary/15 rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 size={32} className="text-primary" />
        </div>
        <h3 className="font-heading font-bold text-white text-xl mb-2">Gá»­i ThÃ nh CÃ´ng!</h3>
        <p className="text-white/50 text-sm max-w-xs">
          Cáº£m Æ¡n quÃ½ khÃ¡ch. ChÃºng tÃ´i sáº½ liÃªn há»‡ láº¡i trong vÃ²ng 30 phÃºt trong giá» lÃ m viá»‡c.
        </p>
        <button onClick={() => setSubmitted(false)} className="mt-6 text-primary font-semibold text-sm hover:underline">
          Gá»­i yÃªu cáº§u khÃ¡c
        </button>
      </div>
    )
  }

  const inputCls = cn(
    'form-control',
    'bg-dark-3 text-white border-white/10',
    'focus:border-primary focus:ring-0'
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      {/* Name + Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-white/60 text-xs font-semibold mb-1.5 uppercase tracking-wide">
            Há» vÃ  tÃªn <span className="text-primary">*</span>
          </label>
          <input {...register('name')} placeholder="Nguyá»…n VÄƒn A" className={inputCls} />
          <FieldError msg={errors.name?.message} />
        </div>
        <div>
          <label className="block text-white/60 text-xs font-semibold mb-1.5 uppercase tracking-wide">
            Sá»‘ Ä‘iá»‡n thoáº¡i <span className="text-primary">*</span>
          </label>
          <input {...register('phone')} type="tel" placeholder="0901 234 567" className={inputCls} />
          <FieldError msg={errors.phone?.message} />
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="block text-white/60 text-xs font-semibold mb-1.5 uppercase tracking-wide">
          Email (tÃ¹y chá»n)
        </label>
        <input {...register('email')} type="email" placeholder="example@email.com" className={inputCls} />
        <FieldError msg={errors.email?.message} />
      </div>

      {/* Service */}
      <div>
        <label className="block text-white/60 text-xs font-semibold mb-1.5 uppercase tracking-wide">
          Dá»‹ch vá»¥ quan tÃ¢m
        </label>
        <select
          {...register('service')}
          className={cn(inputCls, 'appearance-none cursor-pointer')}
        >
          <option value="">-- Chá»n dá»‹ch vá»¥ --</option>
          {serviceOptions.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {/* Message */}
      <div>
        <label className="block text-white/60 text-xs font-semibold mb-1.5 uppercase tracking-wide">
          Ná»™i dung <span className="text-primary">*</span>
        </label>
        <textarea
          {...register('message')}
          rows={5}
          placeholder="MÃ´ táº£ váº¥n Ä‘á» xe Ä‘ang gáº·p pháº£i hoáº·c yÃªu cáº§u cá»¥ thá»ƒ..."
          className={inputCls}
        />
        <FieldError msg={errors.message?.message} />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-main w-full justify-center py-3.5 text-sm disabled:opacity-60"
      >
        {isSubmitting ? (
          <><Loader2 size={16} className="animate-spin" /> Äang gá»­i...</>
        ) : (
          <><Send size={16} /> Gá»­i YÃªu Cáº§u</>
        )}
      </button>

      <p className="text-white/25 text-xs text-center">
        ThÃ´ng tin cá»§a quÃ½ khÃ¡ch Ä‘Æ°á»£c báº£o máº­t tuyá»‡t Ä‘á»‘i.
      </p>
    </form>
  )
}
