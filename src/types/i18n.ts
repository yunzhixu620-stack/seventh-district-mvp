export type Language = 'zhCN' | 'en'

export type LocalizedText = {
  zhCN: string
  en: string
}

export const localize = (text: LocalizedText, language: Language): string =>
  text[language]
