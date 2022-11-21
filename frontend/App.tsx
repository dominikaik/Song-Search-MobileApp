import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import {StatusBar} from 'react-native';
import FrontPage from './components/FrontPage';
import {Appbar, MD3DarkTheme, Provider, MD3LightTheme, ThemeProvider} from "react-native-paper";
import { useState } from 'react';

const theme = {
  ...MD3DarkTheme,
  roundness: 2,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#f7f3f9',
    secondary: '#f1c40f',
    tertiary: '#a1b2c3',
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
        <Provider theme={lightMode ? MD3LightTheme : MD3DarkTheme}>
          <StatusBar
              backgroundColor={
                lightMode ? MD3LightTheme.colors.surface : MD3DarkTheme.colors.primary
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

  //AppRegistry.registerComponent('Spotify Explorer', () => App);




