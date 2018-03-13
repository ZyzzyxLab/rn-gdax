import React from 'react';
import { connect } from 'react-redux';
import { Container, Header, Content, Spinner } from 'native-base';

import { selectProductsLoading } from '../../store/products/selectors';
import List from './List';

const IsLoading = ({ loading }) => {
  if (loading) {
    return <Spinner color='purple' />;
  }
  return <List />;
};

const Products = ({ loading }) => (
  <Container>
    <Header />
    <Content>
      <IsLoading loading={loading} />
    </Content>
  </Container>
);

const mapStateToProps = state => ({
  loading: selectProductsLoading(state),
});



export default connect(mapStateToProps)(Products);
