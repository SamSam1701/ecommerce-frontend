import { LocalePrefix, LocalePrefixMode } from "next-intl/routing"


const localePrefix: LocalePrefix<string[], LocalePrefixMode> | undefined = 'never'
// FIXME: Update this configuration file based on your project information
export const AppConfig = {
  name: 'Nextjs Starter',
  locales: ['vi', 'en'],
  defaultLocale: 'vi',
  localePrefix,
}

export const PAGE_SIZE = 18
export const MAX_FILE_SIZE = 1 * 1024 * 1024
