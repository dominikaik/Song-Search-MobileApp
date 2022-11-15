import { StyleSheet, View, StatusBar} from 'react-native';
import FrontPage from './components/FrontPage';
import {Appbar, MD3DarkTheme, DefaultTheme, Provider, MD3LightTheme} from "react-native-paper";
import { useState } from 'react';

const theme = {
  ...MD3LightTheme, // or MD3DarkTheme
  roundness: 2,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#3498db',
    secondary: '#f1c40f',
    tertiary: '#a1b2c3',
  },
};

export default function App() {
  const [nightMode, setNightmode] = useState(false);
  return (
      <Provider theme={nightMode ? MD3DarkTheme : DefaultTheme}>
        <StatusBar
          backgroundColor={
            nightMode ? MD3DarkTheme.colors.surface : DefaultTheme.colors.primary
          }
          barStyle={"light-content"}
        />
        <Appbar.Header>
          <Appbar.Content title="Spotify explorer" />
          <Appbar.Action
            icon={nightMode ? "brightness-7" : "brightness-3"}
            onPress={() => setNightmode(!nightMode)}
        />
        </Appbar.Header>
        <FrontPage />
      </Provider>

  );
}


