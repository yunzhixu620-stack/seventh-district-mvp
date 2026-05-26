import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'

const hiddenOrBidirectional =
  /[\u061c\u200b-\u200f\u202a-\u202e\u2060-\u206f\ufeff]/gu

const requestedFiles = process.argv.slice(2)
const files = requestedFiles.length
  ? requestedFiles
  : execFileSync('git', ['ls-files'], { encoding: 'utf8' })
      .split(/\r?\n/u)
      .filter(Boolean)

const findings = []

for (const file of files) {
  const content = readFileSync(file, 'utf8')
  const lines = content.split(/\r?\n/u)

  for (const [lineIndex, line] of lines.entries()) {
    for (const match of line.matchAll(hiddenOrBidirectional)) {
      const codePoint = match[0].codePointAt(0).toString(16).toUpperCase()
      findings.push(
        `${file}:${lineIndex + 1}:${match.index + 1} U+${codePoint}`,
      )
    }
  }
}

if (findings.length) {
  console.error('Unsafe directional or invisible code points found:')
  console.error(findings.join('\n'))
  process.exitCode = 1
} else {
  console.log(`Unicode control scan passed (${files.length} files).`)
}
