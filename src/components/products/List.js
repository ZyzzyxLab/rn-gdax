import React, { PureComponent } from 'react';
import { Stylesheet, SectionList, View, Text } from 'react-native';
import { Card, CardItem, Container, Text as NbText, Icon, Right } from 'native-base';

import { connect } from 'react-redux';
import { groupBy, map } from 'lodash';

import { fetchProducts, selectProduct } from '../../store/products/actions';
import * as selectors from '../../store/products/selectors';

const ListItem = ({ item }) => (
  <View style={styles.item}>
    <Text>Product: {item.display_name}</Text>
    <View>
      <Text>Quote Increment: {item.quote_increment}</Text>
      <Text>Base Min Size: {item.base_min_size}</Text>
      <Text>Base Max Size: {item.base_max_size}</Text>
    </View>
  </View>
);

const SectionHeader = ({ section }) => (
  <View>
    <Text>{section.base_currency}</Text>
  </View>
)

const ProductCardItem = ({ currency, products, select }) => {
  const items = map(products, p => (
    <CardItem button={() => select(p.id) }>
      <NbText>Product: {p.display_name}</NbText>
      <Container>
        <NbText>Quote Increment: {p.quote_increment}</NbText>
        <NbText>Base Min Size: {p.base_min_size}</NbText>
        <NbText>Base Max Size: {p.base_max_size}</NbText>
      </Container>
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

class ProductList extends PureComponent {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    this.props.fetchProducts();
  }

  render() {
    const { currencies, currentProduct, selectProduct } = this.props;
    const cards = map(currencies, (products, currency) => (
      <ProductCardItem currency={currency} products={products} select={selectProduct} />
    ));
    return (
      <Container>
        {cards}
      </Container>
    );
    // return (
    //   {/*<SectionList
    //     sections={currencies}
    //     keyExtractor={({ id }) => id }
    //     renderItem={ListItem}
    //     renderSectionHeader={SectionHeader}
    //   />*/}
    // );
  }
}

const mapStateToProps = state => ({
  currencies: selectors.selectCurrencies,
  currentProduct: selectors.selectCurrentProduct,
});

const mapDispatchToProps = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts()),
  selectProduct: id => dispatch(selectProduct(id)),
});

const ProductListContainer = connect(mapStateToProps, mapDispatchToProps)(ProductList);

export default ProductListContainer;
