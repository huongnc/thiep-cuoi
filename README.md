# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.

## Lưu xác nhận tham dự vào Google Sheet

Form “Xác nhận tham dự” gửi các trường `name`, `phone`, `attending`, `guests`, `message` và `type` tới Google Apps Script. `type` được tự động gán theo đường dẫn thiệp:

- `/codau` → `codau`
- `/chure` hoặc `/` → `chure`

Để bật lưu dữ liệu:

1. Tạo một Google Sheet mới và mở **Extensions → Apps Script**.
2. Dán nội dung file `scripts/google-apps-script.gs` vào Apps Script.
3. Deploy dạng **Web app**, chọn **Execute as: Me** và **Who has access: Anyone**.
4. Dán URL `/exec` nhận được vào `wedding.api.endpoint` trong `src/config/wedding.ts`.

Script sẽ tự tạo sheet `RSVP` với cột `type` ở cuối: `timestamp`, `name`, `phone`, `attending`, `guests`, `message`, `type`.
