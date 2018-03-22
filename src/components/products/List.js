import React, { PureComponent } from 'react';
import { Stylesheet, SectionList, View, Text, Button } from 'react-native';
import { Card, CardItem, Container, Text as NbText, Icon, Right, Left } from 'native-base';
import { isNil, isEmpty } from 'lodash';

import { connect } from 'react-redux';
import { groupBy, map } from 'lodash';

import * as productActions from '../../store/products/actions';
import * as selectors from '../../store/products/selectors';

const ProductCardItem = ({ currency, products, select }) => {
  const items = map(products, p => (
    <CardItem
      key={p.id}
      button={true}
      onPress={() => console.log(`selecting: ${p.display_name}`) & select(p.id) }
    >
      <NbText>{p.display_name}</NbText>
      <Left>
        <NbText>Quote Increment: {p.quote_increment}</NbText>
        <NbText>Base Min Size: {p.base_min_size}</NbText>
        <NbText>Base Max Size: {p.base_max_size}</NbText>
      </Left>
      <Right>
        <Icon name="arrow-forward" />
      </Right>
    </CardItem>
  ))
  return (
    <Card>
      <CardItem header>
        <Text>{currency}</Text>
      </CardItem>
      {items}
    </Card>
  );
};

const needToLoad = currencies => isNil(currencies) || isEmpty(currencies);

class ProductList extends PureComponent {
  render() {
    const {
      currencies,
      currentProduct,
      selectProduct,
      fetchProducts
    } = this.props;
    let cards = null;
    if (needToLoad(currencies)) {
      console.log('need to load');
      cards = (
        <Button
          onPress={fetchProducts}
          title="Load Products"
          color="purple"
        />
      );
    }
    else {
      cards = map(currencies, (products, currency) => (
        <ProductCardItem
          key={currency}
          currency={currency}
          products={products}
          select={selectProduct}
        />
      ));
    }
    return (
      <Container>
        {cards}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  currencies: selectors.selectCurrencies(state),
  currentProduct: selectors.selectCurrentProduct(state),
});

const mapDispatchToProps = dispatch => ({
  fetchProducts: () => dispatch(productActions.fetchProducts()),
  selectProduct: id => dispatch(productActions.selectProduct(id)),
});

const ProductListContainer = connect(mapStateToProps, mapDispatchToProps)(ProductList);

export default ProductListContainer;
