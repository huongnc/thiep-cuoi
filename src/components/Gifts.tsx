import { wedding, type BankAccount } from '../config/wedding'
import { Section } from './ui/Section'

function vietQrUrl(acc: BankAccount) {
  // VietQR: https://www.vietqr.io/ — sinh ảnh QR động từ mã ngân hàng + số tài khoản
  const params = new URLSearchParams({ accountName: acc.holder })
  return `https://img.vietqr.io/image/${acc.bank}-${acc.account}-compact2.png?${params.toString()}`
}

function GiftCard({ acc }: { acc: BankAccount }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-sage-light/40 bg-white/60 px-6 py-8 text-center">
      <p className="text-xs uppercase tracking-[0.3em] text-sage">{acc.owner}</p>
      <img
        src={vietQrUrl(acc)}
        alt={`Mã QR ${acc.owner}`}
        loading="lazy"
        className="mt-4 h-56 w-56 rounded-lg bg-white object-contain p-2 shadow-sm"
      />
      <p className="mt-4 font-serif text-lg text-forest">{acc.bankName}</p>
      <p className="text-sm text-ink/80">{acc.account}</p>
      <p className="text-sm font-medium text-ink">{acc.holder}</p>
    </div>
  )
}

export function Gifts() {
  return (
    <Section id="gifts" eyebrow="Mừng cưới" title="Hộp quà mừng">
      <p className="mx-auto mb-10 max-w-xl text-center leading-relaxed text-ink/80">
        {wedding.gifts.note}
      </p>
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2">
        {wedding.gifts.accounts.map((acc) => (
          <GiftCard key={acc.owner} acc={acc} />
        ))}
      </div>
    </Section>
  )
}
