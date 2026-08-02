import { useState, type FormEvent } from 'react'
import { wedding } from '../config/wedding'
import { Section } from './ui/Section'
import { postToSheet } from '../lib/sheet'

interface Opt {
  value: string
  label: string
}

function Pills({
  value,
  onChange,
  options,
}: {
  value: string
  onChange: (v: string) => void
  options: Opt[]
}) {
  return (
    <div className="flex gap-2">
      {options.map((o) => (
        <button
          type="button"
          key={o.value}
          onClick={() => onChange(o.value)}
          className={`flex-1 rounded-full border px-4 py-2.5 text-sm transition ${
            value === o.value
              ? 'border-sage bg-sage text-cream shadow-sm'
              : 'border-sage-light/60 bg-white/60 text-ink/70 hover:border-sage'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

export function Wishes() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    attending: 'yes',
    guests: '1',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }))

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (!form.name.trim()) return
    setStatus('sending')
    await postToSheet({
      type: 'rsvp',
      name: form.name.trim(),
      phone: form.phone.trim(),
      attending: form.attending,
      guests: form.guests,
      message: form.message.trim(),
    })
    setStatus('sent')
  }

  const inputClass =
    'w-full rounded-xl border border-sage-light/50 bg-white/70 px-4 py-3 text-ink outline-none transition placeholder:text-ink/40 focus:border-sage focus:bg-white'

  return (
    <Section
      id="rsvp"
      eyebrow="Chung vui cùng chúng mình"
      title="Xác nhận tham dự"
      className="bg-cream-dark/40"
    >
      {status === 'sent' ? (
        <div className="mx-auto max-w-md text-center">
          <p className="font-script text-5xl text-gold">Cảm ơn bạn!</p>
          <p className="mt-5 leading-relaxed text-ink/80">
            Chúng mình đã nhận được phản hồi của bạn. Sự hiện diện và lời chúc của bạn là niềm
            hạnh phúc lớn lao trong ngày trọng đại này.
          </p>
        </div>
      ) : (
        <>
          <p className="mx-auto -mt-4 mb-8 max-w-md text-center text-ink/70">
            Vui lòng xác nhận trước ngày {wedding.dateText} và gửi đôi lời chúc phúc đến chúng
            mình nhé.
          </p>

          <form onSubmit={submit} className="mx-auto max-w-lg">
            <div className="space-y-4 rounded-3xl border border-sage-light/40 bg-white/50 p-6 shadow-sm sm:p-8">
              <input
                value={form.name}
                onChange={(e) => update('name', e.target.value)}
                placeholder="Họ và tên"
                required
                className={inputClass}
              />
              <input
                value={form.phone}
                onChange={(e) => update('phone', e.target.value)}
                placeholder="Số điện thoại (không bắt buộc)"
                className={inputClass}
              />
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-widest text-sage">Bạn sẽ tham dự?</p>
                <Pills
                  value={form.attending}
                  onChange={(v) => update('attending', v)}
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
                    onChange={(v) => update('guests', v)}
                    options={[
                      { value: '1', label: 'Một mình' },
                      { value: '2', label: 'Cùng người thương' },
                    ]}
                  />
                </div>
              )}
              <textarea
                value={form.message}
                onChange={(e) => update('message', e.target.value)}
                placeholder="Gửi đôi lời chúc phúc đến cô dâu & chú rể... (không bắt buộc)"
                rows={4}
                className={`${inputClass} resize-none`}
              />
              <div className="pt-1 text-center">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="rounded-full bg-sage px-9 py-3 text-sm font-medium uppercase tracking-widest text-cream transition hover:bg-forest disabled:opacity-60"
                >
                  {status === 'sending' ? 'Đang gửi...' : 'Gửi xác nhận'}
                </button>
              </div>
            </div>
          </form>
        </>
      )}
    </Section>
  )
}
