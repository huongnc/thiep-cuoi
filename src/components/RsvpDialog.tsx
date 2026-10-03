import { createPortal } from 'react-dom'
import { useEffect, useState, type FormEvent } from 'react'
import { wedding } from '../config/wedding'
import { getInvitationType } from '../lib/couple'
import { postToSheet } from '../lib/sheet'

interface Opt {
  value: string
  label: string
}

interface RsvpFormState {
  name: string
  phone: string
  attending: string
  guests: string
  message: string
}

function createInitialForm(): RsvpFormState {
  return {
    name: '',
    phone: '',
    attending: 'yes',
    guests: '1',
    message: '',
  }
}

function Pills({
  value,
  onChange,
  options,
}: {
  value: string
  onChange: (value: string) => void
  options: Opt[]
}) {
  return (
    <div className="flex gap-2">
      {options.map((option) => (
        <button
          type="button"
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`flex-1 cursor-pointer rounded-full border px-4 py-2.5 text-sm transition-[background-color,border-color,color,transform,box-shadow] active:scale-[0.98] ${
            value === option.value
              ? 'border-sage bg-sage text-cream shadow-sm hover:-translate-y-0.5'
              : 'border-sage-light/60 bg-white/60 text-ink/70 hover:-translate-y-0.5 hover:border-sage hover:bg-white/80 hover:shadow-sm'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

export function RsvpDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [visible, setVisible] = useState(false)
  const [form, setForm] = useState<RsvpFormState>(createInitialForm)
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  useEffect(() => {
    if (!open) {
      setVisible(false)
      return
    }

    setForm(createInitialForm())
    setStatus('idle')
    const frame = requestAnimationFrame(() => setVisible(true))
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    const previousOverflow = document.body.style.overflow

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)

    return () => {
      cancelAnimationFrame(frame)
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose])

  if (!open) return null

  const update = (key: keyof RsvpFormState, value: string) => {
    setForm((current) => ({ ...current, [key]: value }))
  }

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    if (!form.name.trim()) return

    setStatus('sending')
    await postToSheet({
      name: form.name.trim(),
      phone: form.phone.trim(),
      attending: form.attending,
      guests: form.guests,
      message: form.message.trim(),
      type: getInvitationType(),
    })
    setStatus('sent')
  }

  const inputClass =
    'w-full rounded-xl border border-sage-light/50 bg-white/70 px-4 py-3 text-ink outline-none transition placeholder:text-ink/40 focus:border-sage focus:bg-white'

  return createPortal(
    <div
      className={`fixed inset-0 z-[999999] flex items-center justify-center p-4 transition-opacity duration-300 sm:p-6 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <button
        type="button"
        aria-label="Đóng xác nhận tham dự"
        onClick={onClose}
        className="absolute inset-0 cursor-pointer bg-forest/45 backdrop-blur-sm"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="rsvp-dialog-title"
        className={`relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-white/60 bg-cream px-5 pb-7 pt-4 shadow-2xl transition-[transform,opacity] duration-300 sm:px-8 sm:pb-9 ${
          visible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-8 scale-95 opacity-0'
        }`}
      >
        <div className="mx-auto mb-5 h-1.5 w-12 rounded-full bg-sage-light/70" />
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-sage">Chung vui cùng chúng mình</p>
            <h2 id="rsvp-dialog-title" className="mt-1 font-serif text-3xl text-forest">
              Xác nhận tham dự
            </h2>
          </div>
          <button
            type="button"
            aria-label="Đóng"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-sage-light/50 text-xl text-forest transition-[background-color,transform] hover:rotate-90 hover:bg-sage-light/20 active:scale-90"
          >
            ×
          </button>
        </div>

        {status === 'sent' ? (
          <div className="py-10 text-center">
            <p className="font-serif text-5xl italic text-gold">Cảm ơn bạn!</p>
            <p className="mt-5 leading-relaxed text-ink/80">
              Chúng mình đã nhận được phản hồi của bạn. Sự hiện diện và lời chúc của bạn là niềm
              hạnh phúc lớn lao trong ngày trọng đại này.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-7 cursor-pointer rounded-full bg-sage px-7 py-2.5 text-sm font-medium uppercase tracking-widest text-cream transition-[background-color,transform,box-shadow] hover:-translate-y-0.5 hover:bg-forest hover:shadow-md active:scale-95"
            >
              Đóng
            </button>
          </div>
        ) : (
          <>
            <p className="mt-6 text-sm leading-relaxed text-ink/70">
              Vui lòng xác nhận trước ngày {wedding.dateText} và gửi đôi lời chúc phúc đến chúng
              mình nhé.
            </p>

            <form onSubmit={submit} className="mt-5 space-y-4">
              <input
                value={form.name}
                onChange={(event) => update('name', event.target.value)}
                placeholder="Họ và tên"
                required
                className={inputClass}
              />
              <input
                value={form.phone}
                onChange={(event) => update('phone', event.target.value)}
                placeholder="Số điện thoại (không bắt buộc)"
                className={inputClass}
              />
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-widest text-sage">Bạn sẽ tham dự?</p>
                <Pills
                  value={form.attending}
                  onChange={(value) => update('attending', value)}
                  options={[
                    { value: 'yes', label: 'Mình sẽ đến' },
                    { value: 'no', label: 'Mình bận mất rồi' },
                  ]}
                />
              </div>

              {form.attending === 'yes' && (
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-widest text-sage">Bạn đi cùng ai?</p>
                  <Pills
                    value={form.guests}
                    onChange={(value) => update('guests', value)}
                    options={[
                      { value: '1', label: 'Một mình' },
                      { value: '2', label: 'Cùng người thương' },
                    ]}
                  />
                </div>
              )}
              <textarea
                value={form.message}
                onChange={(event) => update('message', event.target.value)}
                placeholder="Gửi đôi lời chúc phúc đến cô dâu & chú rể... (không bắt buộc)"
                rows={4}
                className={`${inputClass} resize-none`}
              />
              <div className="pt-1 text-center">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="cursor-pointer rounded-full bg-sage px-9 py-3 text-sm font-medium uppercase tracking-widest text-cream transition-[background-color,transform,box-shadow] hover:-translate-y-0.5 hover:bg-forest hover:shadow-md active:translate-y-0 active:scale-95 disabled:cursor-wait disabled:opacity-60"
                >
                  {status === 'sending' ? 'Đang gửi...' : 'Gửi xác nhận'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>,
    document.body,
  )
}
