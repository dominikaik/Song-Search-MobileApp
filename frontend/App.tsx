import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import {AppRegistry, StatusBar} from 'react-native';
import FrontPage from './components/FrontPage';
import {Appbar, MD3DarkTheme, Provider, MD3LightTheme} from "react-native-paper";
import { useState } from 'react';

export const lightTheme = {
  ...MD3LightTheme, 
  roundness: 2,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#85aca2', 
    surface: '#85aca2', 
    secondaryContainer: '#e4e8e2', 
    surfaceVariant: '#e4e8e2', 
    onPrimary: 'black', 
    onSecondaryContainer: '#2F3E46',
    onSurface: 'black', 
    onSurfaceVariant: 'black', 
    outline: '#85aca2',
    elevation: {
      level0: 'transparent',
      level1: 'white', 
      level2: 'rgb(0,0,0)', 
      level3: 'rgb(0,0,0)', 
      level4: 'rgb(0,0,0)',
      level5: 'rgb(0,0,0)',
    }
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  roundness: 2,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#628392', 
    surface: '#394c55', 
    secondaryContainer: '#4f6875', 
    surfaceVariant: '#2F3E46',
    onPrimary: 'white', 
    onSecondaryContainer: '#e4e8e2',
    onSurface: 'white', 
    onSurfaceVariant: 'white', 
    outline: '#708f9f', 
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




