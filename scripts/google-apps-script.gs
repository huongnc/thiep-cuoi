/**
 * Google Apps Script backend cho form Xác nhận tham dự.
 *
 * Tạo một Google Sheet, mở Extensions → Apps Script, dán file này vào
 * rồi deploy dưới dạng Web app với quyền chạy bằng tài khoản của bạn.
 * Cột type luôn được ghi cuối để phân biệt codau/chure.
 */
const RSVP_SHEET_NAME = 'RSVP'
const RSVP_SPREADSHEET_ID = '1mRcO_7OonlrzAI3jR_t-QhQJZemD6qOMRf_vlDWq0c0'
const RSVP_HEADERS = ['timestamp', 'name', 'phone', 'attending', 'guests', 'message', 'type']

function doPost(e) {
  const params = (e && e.parameter) || {}
  const type = params.type === 'codau' || params.type === 'chure' ? params.type : ''

  if (!params.name || !type) {
    return jsonResponse({ ok: false, error: 'Missing name or type' })
  }

  const sheet = getRsvpSheet()
  ensureHeaders(sheet)
  sheet.appendRow([
    new Date(),
    params.name,
    params.phone || '',
    params.attending || '',
    params.guests || '',
    params.message || '',
    type,
  ])

  return jsonResponse({ ok: true })
}

function getRsvpSheet() {
  const spreadsheet = SpreadsheetApp.openById(RSVP_SPREADSHEET_ID)
  return spreadsheet.getSheetByName(RSVP_SHEET_NAME) || spreadsheet.insertSheet(RSVP_SHEET_NAME)
}

function ensureHeaders(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(RSVP_HEADERS)
    sheet.setFrozenRows(1)
  }
}

function jsonResponse(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(
    ContentService.MimeType.JSON,
  )
}
