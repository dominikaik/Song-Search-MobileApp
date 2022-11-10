import { AppRegistry } from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'localhost:4000/graphql',
  cache: new InMemoryCache()
});


export default function App() {
  return (
      <ApolloProvider client={client}>
        {/* Add root component  */}
      </ApolloProvider>
    );
  }
    
AppRegistry.registerComponent('MyApplication', () => App);

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
