import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { getInvitationMetadata } from './src/lib/invitation-metadata.ts'

function routeMetadataPlugin(): Plugin {
  let outputDir = resolve(process.cwd(), 'dist')

  return {
    name: 'route-metadata',
    apply: 'build',
    configResolved(config) {
      outputDir = resolve(config.root, config.build.outDir)
    },
    writeBundle() {
      const indexPath = join(outputDir, 'index.html')
      if (!existsSync(indexPath)) return

      const source = readFileSync(indexPath, 'utf8')
      for (const route of ['codau', 'chure']) {
        const html = withMetadata(source, getInvitationMetadata(`/${route}`))
        mkdirSync(join(outputDir, route), { recursive: true })
        writeFileSync(join(outputDir, route, 'index.html'), html)
        writeFileSync(join(outputDir, `${route}.html`), html)
      }
    },
  }
}

function withMetadata(source: string, metadata: ReturnType<typeof getInvitationMetadata>) {
  let html = source

  html = replaceMeta(html, 'name', 'description', metadata.description)
  html = replaceMeta(html, 'property', 'og:site_name', metadata.siteName)
  html = replaceMeta(html, 'property', 'og:url', metadata.url)
  html = replaceMeta(html, 'property', 'og:title', metadata.title)
  html = replaceMeta(html, 'property', 'og:description', metadata.description)
  html = replaceMeta(html, 'property', 'og:image', metadata.image)
  html = replaceMeta(html, 'property', 'og:image:alt', metadata.imageAlt)
  html = replaceMeta(html, 'name', 'twitter:title', metadata.title)
  html = replaceMeta(html, 'name', 'twitter:description', metadata.description)
  html = replaceMeta(html, 'name', 'twitter:image', metadata.image)
  html = replaceMeta(html, 'name', 'twitter:image:alt', metadata.imageAlt)
  html = html.replace(/<title>[^<]*<\/title>/i, `<title>${escapeHtml(metadata.title)}</title>`)
  html = html.replace(
    /<\/title>/i,
    `</title>\n    <link rel="canonical" href="${escapeHtml(metadata.url)}" />`,
  )

  return html
}

function replaceMeta(source: string, attribute: 'name' | 'property', value: string, content: string) {
  const escapedValue = value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const pattern = new RegExp(
    `(<meta\\s+${attribute}="${escapedValue}"\\s+content=")[^"]*(")`,
    'i',
  )
  return source.replace(pattern, `$1${escapeHtml(content)}$2`)
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), routeMetadataPlugin()],
})
