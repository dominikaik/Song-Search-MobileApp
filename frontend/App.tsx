import { AppRegistry } from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import {SongList} from "./components/SongList" 

const client = new ApolloClient({
  uri: 'localhost:4000/graphql', //end-point that we are making queries to  
  cache: new InMemoryCache()
});


export default function App() {
  return (
      <ApolloProvider client={client}>
        <SongList/> 
      </ApolloProvider>
    );
  }
    
AppRegistry.registerComponent('Spotify Explorer', () => App);

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
