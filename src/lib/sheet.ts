import { wedding } from '../config/wedding'

/**
 * Gửi dữ liệu tới Google Apps Script web app (Google Sheet backend).
 * Dùng mode: 'no-cors' + form-encoded để tránh preflight CORS —
 * đổi lại không đọc được response nên luôn coi là thành công khi gửi xong.
 */
export async function postToSheet(payload: Record<string, string>): Promise<void> {
  const url = wedding.api.endpoint
  if (!url) {
    // Chưa cấu hình backend → giả lập độ trễ mạng để UX vẫn mượt.
    await new Promise((r) => setTimeout(r, 600))
    console.warn('[wedding] Chưa cấu hình wedding.api.endpoint — dữ liệu không được lưu.')
    return
  }
  await fetch(url, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(payload).toString(),
  })
}

export function isBackendConfigured(): boolean {
  return Boolean(wedding.api.endpoint)
}
