import 'react-native-reanimated';

import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { ThemeProvider } from 'styled-components';
import * as SplashScreen from 'expo-splash-screen';
import Toast, {
  BaseToast,
  BaseToastProps,
  ErrorToast,
} from 'react-native-toast-message';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { getCustomToastProps, theme } from './layout';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter: require('../assets/fonts/Inter-Variable.ttf'),
  });

  const queryClient = new QueryClient();
  const customToastProps = getCustomToastProps();

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <StatusBar style="light" backgroundColor={theme.background} />
        <Stack />

        <Toast
          config={{
            success: (props: BaseToastProps) => (
              <BaseToast {...props} {...customToastProps} />
            ),

            error: (props: BaseToastProps) => (
              <ErrorToast {...props} {...customToastProps} />
            ),
          }}
        />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
