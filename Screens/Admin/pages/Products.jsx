import { StyleSheet, Text, View, Dimensions, FlatList, ActivityIndicator } from 'react-native';
import { Header, Item, Input } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useEffect, useState } from 'react';
import DemonsButton from '../../../components/Button';

import ListItem from './ListItem';

var { height, width } = Dimensions.get('window');

import { DUMMY_PRODUCTS } from '../../../assets/data/products';
import { getAllProducts } from '../../../Service/apis/product';

const ListHeader = () => {
  return (
    <View elevation={1} style={styles.listHeader}>
      <View style={styles.headerItem}></View>
      <View style={styles.headerItem}>
        <Text style={{ fontWeight: 'bold' }}>Name</Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={{ fontWeight: 'bold' }}>Category</Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={{ fontWeight: 'bold' }}>Price</Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={{ fontWeight: 'bold' }}>Quantity</Text>
      </View>
    </View>
  );
};

const Products = ({ navigation }) => {
  const [products, setProducts] = useState(DUMMY_PRODUCTS);
  const [productFilter, setProductFilter] = useState(DUMMY_PRODUCTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // useEffect(async () => {
  //   const productsData = await getAllProducts();
  //   setProducts(productsData.data.products);

  //   return () => {
  //     setProducts([]);
  //   };
  // }, []);

  const searchProduct = (text) => {
    if (text == '') {
      setProductFilter(products);
    }
    setProductFilter(products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase())));
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <DemonsButton secondary medium onPress={() => navigation.navigate('Orders')}>
          <Icon name='shopping-bag' size={18} color='white' />
          <Text style={styles.buttonText}>Orders</Text>
        </DemonsButton>
        <DemonsButton secondary medium onPress={() => navigation.navigate('ProductForm')}>
          <Icon name='plus' size={18} color='white' />
          <Text style={styles.buttonText}>Products</Text>
        </DemonsButton>
        <DemonsButton secondary medium onPress={() => navigation.navigate('Categories')}>
          <Icon name='plus' size={18} color='white' />
          <Text style={styles.buttonText}>Categories</Text>
        </DemonsButton>
        <DemonsButton secondary medium onPress={() => navigation.navigate('Users')}>
          <Ionicons name='person' size={18} color='white' />
          <Text style={styles.buttonText}>Users</Text>
        </DemonsButton>
      </View>

      <View>
        <Header searchBar rounded>
          <Item style={{ padding: 5 }}>
            <Icon name='search' />
            <Input placeholder='Search' onChangeText={(text) => searchProduct(text)} />
          </Item>
        </Header>
      </View>

      {loading ? (
        <View style={styles.spinner}>
          <ActivityIndicator size='large' color='red' />
        </View>
      ) : (
        <FlatList
          data={productFilter}
          contentContainerStyle={{
            paddingBottom: 100,
          }}
          ListHeaderComponent={ListHeader}
          renderItem={({ item, index }) => (
            <ListItem
              {...item}
              navigation={navigation}
              index={index}
              // delete={deleteProduct}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  listHeader: {
    flexDirection: 'row',
    padding: 5,
    backgroundColor: 'gainsboro',
  },
  headerItem: {
    margin: 2,
    width: width / 5,
  },
  spinner: {
    height: height / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    marginBottom: 160,
    backgroundColor: 'white',
  },
  buttonContainer: {
    margin: 20,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    marginLeft: 4,
    color: 'white',
  },
});

export default Products;
