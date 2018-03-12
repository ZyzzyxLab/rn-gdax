import React from 'react';
import { StyleSheet, NbText, View } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './src/store/configure';

import Products from './src/components/products';

const store = configureStore();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Products />
      </Provider>
    );
//     // return (
//     //   {/*<View style={styles.container}>
//     //     <Text>Open up App.js to start working on your app!</Text>
//     //     <Text>Changes you make will automatically reload.</Text>
//     //     <Text>Shake your phone to open the developer menu.</Text>
//     //   </View>*/}
//     // );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// const Wrapper = () => (
//   <Provider store={store}>
//     <Products />
//   </Provider>
// );

// export default Wrapper;
