import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { wedding, type BankAccount } from '../config/wedding'
import { getDisplayCouple } from '../lib/couple'
import { Section } from './ui/Section'

function vietQrUrl(acc: BankAccount) {
  // VietQR: https://www.vietqr.io/ — sinh ảnh QR động từ mã ngân hàng + số tài khoản
  const params = new URLSearchParams({ accountName: acc.holder })
  return `https://img.vietqr.io/image/${acc.bank}-${acc.account}-compact2.png?${params.toString()}`
}

function GiftSheet({ acc, onClose }: { acc: BankAccount; onClose: () => void }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
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
  }, [onClose])

  return createPortal(
    <div
      className={`fixed inset-0 z-[999999] flex items-center justify-center p-4 transition-opacity duration-300 sm:p-6 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <button
        type="button"
        aria-label="Đóng thông tin mừng cưới"
        onClick={onClose}
        className="absolute inset-0 bg-forest/45 backdrop-blur-sm"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="gift-sheet-title"
        className={`relative z-10 max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl border border-white/60 bg-cream px-5 pb-8 pt-4 shadow-2xl transition-[transform,opacity] duration-300 sm:px-8 sm:pb-10 ${
          visible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-8 scale-95 opacity-0'
        }`}
      >
        <div className="mx-auto mb-5 h-1.5 w-12 rounded-full bg-sage-light/70" />
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-sage">{acc.owner}</p>
            <h3 id="gift-sheet-title" className="mt-1 font-serif text-2xl text-forest">
              Mừng cưới
            </h3>
          </div>
          <button
            type="button"
            aria-label="Đóng"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-sage-light/50 text-xl text-forest transition-[background-color,transform] hover:rotate-90 hover:bg-sage-light/20 active:scale-90"
          >
            ×
          </button>
        </div>

        <div className="mt-5 grid items-center gap-6 sm:grid-cols-[auto_1fr] sm:gap-8">
          <img
            src={vietQrUrl(acc)}
            alt={`Mã QR ${acc.owner}`}
            loading="lazy"
            className="mx-auto h-56 w-56 rounded-xl bg-white object-contain p-2 shadow-sm"
          />
          <div className="text-center sm:text-left">
            <p className="font-serif text-xl text-forest">{acc.bankName}</p>
            <p className="mt-2 text-sm text-ink/80">Số tài khoản: {acc.account}</p>
            <p className="mt-1 text-sm font-medium text-ink">{acc.holder}</p>
            <p className="mt-4 text-sm leading-relaxed text-ink/70">
              Quét mã QR để gửi lời chúc phúc đến {acc.owner.toLowerCase()}.
            </p>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}

function GiftButton({ acc, onClick }: { acc: BankAccount; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex w-full items-center justify-between gap-4 rounded-2xl border border-sage-light/50 bg-white/60 px-5 py-5 text-left shadow-sm backdrop-blur-sm transition-[border-color,background-color,transform,box-shadow] hover:-translate-y-1 hover:border-sage hover:bg-white/80 hover:shadow-md active:translate-y-0 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-sage/50"
    >
      <span>
        <span className="block text-xs uppercase tracking-[0.3em] text-sage">{acc.owner}</span>
        <span className="mt-1 block font-serif text-lg text-forest">Xem mã QR</span>
      </span>
      <span
        aria-hidden="true"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sage text-xl text-cream transition-[background-color,transform] group-hover:-translate-y-1 group-hover:bg-forest"
      >
        ↑
      </span>
    </button>
  )
}

export function Gifts() {
  const [selectedAccount, setSelectedAccount] = useState<BankAccount | null>(null)
  const couple = getDisplayCouple()
  const accounts = couple
    .map(({ person }) => wedding.gifts.accounts.find((account) => account.owner === person.role))
    .filter((account): account is BankAccount => Boolean(account))

  return (
    <Section id="gifts" eyebrow="Mừng cưới" title="Hộp quà mừng">
      <p className="mx-auto mb-10 max-w-xl text-center leading-relaxed text-ink/80">
        {wedding.gifts.note}
      </p>
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2">
        {accounts.map((acc) => (
          <GiftButton key={acc.owner} acc={acc} onClick={() => setSelectedAccount(acc)} />
        ))}
      </div>
      {selectedAccount && (
        <GiftSheet acc={selectedAccount} onClose={() => setSelectedAccount(null)} />
      )}
    </Section>
  )
}
