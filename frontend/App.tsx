import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import {AppRegistry, StatusBar} from 'react-native';
import FrontPage from './components/FrontPage';
import {Appbar, MD3DarkTheme, Provider, MD3LightTheme, ThemeProvider} from "react-native-paper";
import { useState } from 'react';

export const lightTheme = {
  ...MD3LightTheme, // or MD3DarkTheme
  roundness: 2,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#85aca2', //button
    surface: '#85aca2', //header color
    secondaryContainer: '#e4e8e2', //chips colord
    surfaceVariant: '#e4e8e2', // searchbar
    onPrimary: 'black', // text color on button
    onSecondaryContainer: '#2F3E46',// text on chips
    onSurface: 'black', // alt av teksten
    onSurfaceVariant: 'black', // topic chips/ search text color and icon theme color filed chips
    outline: '#85aca2',//outline color on otline elements buttons chips
    elevation: {
      level0: 'transparent',
      level1: 'white', // palette.primary40, alpha 0.05
      level2: 'rgb(0,0,0)', // palette.primary40, alpha 0.08
      level3: 'rgb(0,0,0)', // palette.primary40, alpha 0.11
      level4: 'rgb(0,0,0)', // palette.primary40, alpha 0.12
      level5: 'rgb(0,0,0)', // palette.primary40, alpha 0.14
    }
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  roundness: 2,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#628392', //button
    surface: '#394c55', //header color
    secondaryContainer: '#4f6875', //chips colord
    surfaceVariant: '#2F3E46', // searchbar
    onPrimary: 'white', // text color on button
    onSecondaryContainer: '#e4e8e2',// text on chips
    onSurface: 'white', // alt av teksten
    onSurfaceVariant: 'white', // topic chips/ search text color and icon theme color filed chips
    outline: '#2F3E46',//outline color on otline elements buttons chips
  },
};

const client = new ApolloClient({
  uri: 'http://it2810-67.idi.ntnu.no:4000/graphql', //end-point that we are making queries to  
  cache: new InMemoryCache()
});

export default function App() {
  const [lightMode, setLightmode] = useState(false);
  return (
      <ApolloProvider client={client}>
        <Provider theme={lightMode ? lightTheme : darkTheme}>
          <StatusBar
              backgroundColor={
                lightMode ? lightTheme.colors.surface : MD3DarkTheme.colors.primary
              }
              barStyle={"dark-content"}
            />
            <Appbar.Header>
              <Appbar.Content title="Spotify explorer" />
              <Appbar.Action
                icon={lightMode ? "brightness-3" : "brightness-7"}
                onPress={() => setLightmode(!lightMode)}
            />
            </Appbar.Header>
            <FrontPage/>
        </Provider>
      </ApolloProvider>
  );
}

AppRegistry.registerComponent('Spotify Explorer', () => App);




