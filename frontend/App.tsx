import { StyleSheet, View, StatusBar} from 'react-native';
import FrontPage from './components/FrontPage';
import {Appbar, MD3DarkTheme, DefaultTheme, Provider, Surface } from "react-native-paper";
import { useState } from 'react';

export default function App() {
  const [nightMode, setNightmode] = useState(false);
  return (
    <View style={styles.container}>
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
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
