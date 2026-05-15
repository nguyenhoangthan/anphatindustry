'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { CheckCircle2, Send, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const contactSchema = z.object({
  name:    z.string().min(2, 'Vui lòng nhập họ tên (ít nhất 2 ký tự)'),
  phone:   z.string().min(9, 'Số điện thoại không hợp lệ').max(12).regex(/^[0-9+\s-]+$/, 'Chỉ gồm chữ số'),
  email:   z.string().email('Email không hợp lệ').optional().or(z.literal('')),
  service: z.string().optional(),
  message: z.string().min(10, 'Vui lòng nhập nội dung (ít nhất 10 ký tự)'),
})

type ContactFormData = z.infer<typeof contactSchema>

const serviceOptions = [
  'Bảo dưỡng định kỳ',
  'Sửa chữa điện & điện lạnh',
  'Sửa chữa máy gầm',
  'Chăm sóc nội thất',
  'Chăm sóc ngoại thất',
  'Đồng sơn',
  'Kiểm tra tổng quát',
  'Dịch vụ khác',
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
        <h3 className="font-heading font-bold text-white text-xl mb-2">Gửi Thành Công!</h3>
        <p className="text-white/50 text-sm max-w-xs">
          Cảm ơn quý khách. Chúng tôi sẽ liên hệ lại trong vòng 30 phút trong giờ làm việc.
        </p>
        <button onClick={() => setSubmitted(false)} className="mt-6 text-primary font-semibold text-sm hover:underline">
          Gửi yêu cầu khác
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
            Họ và tên <span className="text-primary">*</span>
          </label>
          <input {...register('name')} placeholder="Nguyễn Văn A" className={inputCls} />
          <FieldError msg={errors.name?.message} />
        </div>
        <div>
          <label className="block text-white/60 text-xs font-semibold mb-1.5 uppercase tracking-wide">
            Số điện thoại <span className="text-primary">*</span>
          </label>
          <input {...register('phone')} type="tel" placeholder="0901 234 567" className={inputCls} />
          <FieldError msg={errors.phone?.message} />
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="block text-white/60 text-xs font-semibold mb-1.5 uppercase tracking-wide">
          Email (tùy chọn)
        </label>
        <input {...register('email')} type="email" placeholder="example@email.com" className={inputCls} />
        <FieldError msg={errors.email?.message} />
      </div>

      {/* Service */}
      <div>
        <label className="block text-white/60 text-xs font-semibold mb-1.5 uppercase tracking-wide">
          Dịch vụ quan tâm
        </label>
        <select
          {...register('service')}
          className={cn(inputCls, 'appearance-none cursor-pointer')}
        >
          <option value="">-- Chọn dịch vụ --</option>
          {serviceOptions.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {/* Message */}
      <div>
        <label className="block text-white/60 text-xs font-semibold mb-1.5 uppercase tracking-wide">
          Nội dung <span className="text-primary">*</span>
        </label>
        <textarea
          {...register('message')}
          rows={5}
          placeholder="Mô tả vấn đề xe đang gặp phải hoặc yêu cầu cụ thể..."
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
          <><Loader2 size={16} className="animate-spin" /> Đang gửi...</>
        ) : (
          <><Send size={16} /> Gửi Yêu Cầu</>
        )}
      </button>

      <p className="text-white/25 text-xs text-center">
        Thông tin của quý khách được bảo mật tuyệt đối.
      </p>
    </form>
  )
}


const contactSchema = z.object({
  name: z.string().min(2, 'Vui lòng nhập họ tên (ít nhất 2 ký tự)'),
  phone: z
    .string()
    .min(9, 'Số điện thoại không hợp lệ')
    .max(12, 'Số điện thoại không hợp lệ')
    .regex(/^[0-9+\s-]+$/, 'Số điện thoại chỉ gồm chữ số'),
  email: z.string().email('Email không hợp lệ').optional().or(z.literal('')),
  service: z.string().optional(),
  message: z.string().min(10, 'Vui lòng nhập nội dung (ít nhất 10 ký tự)'),
})

type ContactFormData = z.infer<typeof contactSchema>

const serviceOptions = [
  'Bảo dưỡng định kỳ',
  'Sửa chữa điện & điện lạnh',
  'Sửa chữa máy gầm',
  'Chăm sóc nội thất',
  'Chăm sóc ngoại thất',
  'Đồng sơn',
  'Kiểm tra tổng quát',
  'Dịch vụ khác',
]

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    // TODO: integrate with email service / API endpoint
    await new Promise((r) => setTimeout(r, 1200))
    console.info('Contact form submitted:', data)
    setSubmitted(true)
    reset()
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 px-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle size={32} className="text-green-500" />
        </div>
        <h3 className="font-heading font-bold text-primary-900 text-xl mb-2">
          Gửi Thành Công!
        </h3>
        <p className="text-gray-500 text-sm max-w-xs">
          Cảm ơn quý khách. Chúng tôi sẽ liên hệ lại trong vòng 30 phút trong giờ làm việc.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 text-accent-500 font-semibold text-sm hover:underline"
        >
          Gửi yêu cầu khác
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* Name + Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Họ và tên <span className="text-accent-500">*</span>
          </label>
          <input
            {...register('name')}
            placeholder="Nguyễn Văn A"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all placeholder:text-gray-400"
          />
          {errors.name && (
            <p className="text-accent-500 text-xs mt-1.5">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Số điện thoại <span className="text-accent-500">*</span>
          </label>
          <input
            {...register('phone')}
            type="tel"
            placeholder="0901 234 567"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all placeholder:text-gray-400"
          />
          {errors.phone && (
            <p className="text-accent-500 text-xs mt-1.5">{errors.phone.message}</p>
          )}
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          Email (tùy chọn)
        </label>
        <input
          {...register('email')}
          type="email"
          placeholder="example@email.com"
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all placeholder:text-gray-400"
        />
        {errors.email && (
          <p className="text-accent-500 text-xs mt-1.5">{errors.email.message}</p>
        )}
      </div>

      {/* Service */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          Dịch vụ quan tâm
        </label>
        <select
          {...register('service')}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all bg-white"
        >
          <option value="">-- Chọn dịch vụ --</option>
          {serviceOptions.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          Nội dung / Mô tả tình trạng xe <span className="text-accent-500">*</span>
        </label>
        <textarea
          {...register('message')}
          rows={5}
          placeholder="Mô tả vấn đề xe đang gặp phải hoặc yêu cầu cụ thể của bạn..."
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all placeholder:text-gray-400"
        />
        {errors.message && (
          <p className="text-accent-500 text-xs mt-1.5">{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2.5 bg-accent-500 hover:bg-accent-600 disabled:opacity-60 text-white font-bold py-4 rounded-xl transition-all duration-200 text-base"
      >
        {isSubmitting ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Đang gửi...
          </>
        ) : (
          <>
            <Send size={18} />
            Gửi Yêu Cầu
          </>
        )}
      </button>

      <p className="text-gray-400 text-xs text-center">
        Thông tin của quý khách được bảo mật tuyệt đối.
      </p>
    </form>
  )
}
