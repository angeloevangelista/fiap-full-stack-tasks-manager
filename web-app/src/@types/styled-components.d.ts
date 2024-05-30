import { theme } from '../styles'

type ThemeInterface = typeof theme

declare module "styled-components" {
  interface DefaultTheme extends ThemeInterface {}
}
