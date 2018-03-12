# rn-gdax

This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).

## Info

Very small project to create a code sample for evaluation of a React-Native app that consumes the [GDAX API](https://docs.gdax.com)k

Unfortunately, c urrently the project is **not** working locally, and as I'm still learning React-Native, I don't have the troubleshooting
skills with it yet to understand why it's not working.

Additionally, due to some quirks with Create React Native App's configuration with jest and jest itself, running `yarn test` globally breaks
on tokens used in imports of some node modules.

What does pass is:

```sh
yarn test src
```

which is running the tests created for the Redux Store in [src/store/products](src/store/products)
