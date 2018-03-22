# rn-gdax

This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).

## Info

Very small project to create a code sample for evaluation of a React-Native app that consumes the [GDAX API](https://docs.gdax.com)

The project is **now** working locally.

### Starting

```sh
yarn start
```

And follow the instructions printed to the console

## Validating

Clone the repo and initialize it:
```sh
cd <desired parent dir>
git clone git@github.com:eudaimos/rn-gdax.git
nvm install # OR nvm use
yarn install
```
Additionally, due to some quirks with Create React Native App's configuration with jest and jest itself, running `yarn test` globally breaks
on tokens used in imports of some node modules in the [`App.js component`](App.js) provided by CRNA.

**What does pass is:**

```sh
yarn test src
```

which is running the tests created for the Redux Store in [src/store/products](src/store/products)

## GDAX API

I ran into issues trying to use the default client for the GDAX API which is a Node.js client library and not designed for React-Native.

[gdax-node](https://github.com/coinbase/gdax-node) uses several Node.js libraries like `assert`, `stream`, `events` and `crypto` which are
not provided in the React Native runtime.

After attempting to import those packages and running into continuous missing modules issues, I decided to move off and hit the API endpoints
directly using the built in [`fetch`](http://facebook.github.io/react-native/docs/network.html) provided by React Native

## Native Base

I attempted to use the [`native-base`](https://docs.nativebase.io) component suite which you will see in the [Product components](src/components/products)
but this may be why the app is failing.
