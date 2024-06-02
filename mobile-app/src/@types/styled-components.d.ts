import { theme } from '@/app/layout';

type ThemeInterface = typeof theme;

declare module 'styled-components/native' {
  interface DefaultTheme extends ThemeInterface {}
}
