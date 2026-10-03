import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { wedding, type BankAccount } from '../config/wedding'
import { getDisplayCouple } from '../lib/couple'
import envelopeImage from '../assets/minimalism_darkred.webp'
import { Section } from './ui/Section'

function vietQrUrl(acc: BankAccount) {
  // VietQR: https://www.vietqr.io/ — sinh ảnh QR động từ mã ngân hàng + số tài khoản
  const params = new URLSearchParams({ accountName: acc.holder })
  return `https://img.vietqr.io/image/${acc.bank}-${acc.account}-compact2.png?${params.toString()}`
}

function GiftSheet({ accounts, onClose }: { accounts: BankAccount[]; onClose: () => void }) {
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
        aria-label="Đóng thông tin gửi quà mừng"
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
            <h3 id="gift-sheet-title" className="mt-1 font-serif text-2xl text-forest">
              Gửi quà mừng
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

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-4">
          {accounts.map((acc) => (
            <div key={acc.owner} className="flex flex-col items-center text-center">
              <h4 className="min-h-8 text-xs font-medium text-forest">{acc.owner}</h4>
              <div className="mt-2 flex h-40 w-40 items-center justify-center rounded-xl border border-sage-light/30 bg-white p-2 shadow-lg">
                <img
                  src={vietQrUrl(acc)}
                  alt={`Mã QR ${acc.owner}`}
                  loading="lazy"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="mt-2 space-y-0.5 text-[11px] text-ink/70">
                <p>{acc.bankName}</p>
                <p className="font-mono">{acc.account}</p>
                <p className="font-semibold text-ink">{acc.holder}</p>
              </div>
              <a
                href={vietQrUrl(acc)}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-center gap-1 rounded-full bg-sage/10 px-3 py-1 text-[10px] font-medium text-sage transition-colors hover:bg-sage/20"
              >
                Mở ảnh QR
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>,
    document.body,
  )
}

function GiftEnvelope({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Mở hộp quà mừng"
      className="group relative mx-auto flex h-[357px] w-[280px] max-w-full cursor-pointer flex-col items-center justify-end outline-none"
      style={{ width: 280, height: 357, maxWidth: '100%' }}
    >
      <span className="absolute left-[12%] top-[7%] text-xl text-[#b58b2f] transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-110">
        ✦
      </span>
      <span className="absolute right-[9%] top-[15%] text-sm text-[#b58b2f] transition-transform duration-500 group-hover:translate-y-1 group-hover:scale-110">
        ✦
      </span>
      <span className="absolute left-[4%] top-[35%] text-xs text-[#b58b2f] transition-transform duration-500 group-hover:-translate-x-1">
        ✦
      </span>
      <span className="absolute right-[3%] top-[25%] text-xs text-[#b58b2f] transition-transform duration-500 group-hover:translate-x-1">
        ✦
      </span>

      <div
        className="relative mb-10 block h-[275px] w-[260px] transition-transform duration-500 group-hover:-translate-y-2 group-hover:rotate-[-2deg]"
        style={{ width: 260, height: 275, maxWidth: '100%' }}
      >
        <div className="absolute bottom-[-6px] left-1/2 h-3 w-44 -translate-x-1/2 rounded-[50%] bg-[#5a1c20]/30 blur-[4px]" />
        <img
          src={envelopeImage}
          alt=""
          aria-hidden="true"
          className="gift-envelope-left absolute z-10 object-contain object-bottom opacity-95 drop-shadow-[0_8px_14px_rgba(0,0,0,0.18)]"
          style={{
            position: 'absolute',
            top: 8,
            left: 0,
            width: 155,
            height: 260,
            objectFit: 'contain',
            objectPosition: 'bottom',
          }}
        />
        <img
          src={envelopeImage}
          alt=""
          aria-hidden="true"
          className="gift-envelope-right absolute z-0 object-contain object-bottom drop-shadow-[0_10px_18px_rgba(0,0,0,0.22)]"
          style={{
            position: 'absolute',
            top: 25,
            left: 123,
            width: 135,
            height: 235,
            objectFit: 'contain',
            objectPosition: 'bottom',
          }}
        />
      </div>
      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm font-medium text-[#5a1c20]">
        Nhấn để mở
      </span>
    </button>
  )
}

export function Gifts() {
  const [isOpen, setIsOpen] = useState(false)
  const couple = getDisplayCouple()
  const accounts = couple
    .map(({ person }) => wedding.gifts.accounts.find((account) => account.owner === person.role))
    .filter((account): account is BankAccount => Boolean(account))

  return (
    <Section id="gifts" decor={false} className="bg-[#f7f1e7]" contentClassName="max-w-none">
      <h2 className="text-center font-serif text-[28px] font-bold uppercase tracking-[0.04em] text-[#5a1c20] sm:text-[32px]">
        Gửi quà mừng
      </h2>
      <div className="flex justify-center">
        <GiftEnvelope onClick={() => setIsOpen(true)} />
      </div>
      <p className="mx-auto mt-5 max-w-md px-4 text-center font-serif text-lg italic leading-relaxed text-[#5a1c20]/75 sm:mt-6 sm:text-xl">
        Điều hạnh phúc nhất với chúng mình là có sự hiện diện và lời chúc phúc của bạn trong ngày
        trọng đại này.
      </p>
      {isOpen && <GiftSheet accounts={accounts} onClose={() => setIsOpen(false)} />}
    </Section>
  )
}
