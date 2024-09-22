import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { SQLiteProvider } from 'expo-sqlite';
import initializeDatabase from './database/initializeDatabase';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'light' ? DarkTheme : DefaultTheme}>
      <SQLiteProvider databaseName='pets.db' onInit={initializeDatabase}>
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen 
          name="index" 
          options={{
          title: "Tamagochi"
          }}/>
          <Stack.Screen 
          name="screens/cadastro" 
          options={{
            title: "Cadastrar Bichinho",
          }} 
        />
      </Stack>
      </SQLiteProvider>
    </ThemeProvider>
  );
}
