'use client'

import { ThemeProvider } from '@theme-ui/core'
import { Theme } from '@theme-ui/core'
import theme from './theme'

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  return <ThemeProvider theme={theme as Theme}>{children}</ThemeProvider>
}
