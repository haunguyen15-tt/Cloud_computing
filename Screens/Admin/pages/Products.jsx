import { StyleSheet, Text, View, Dimensions, FlatList, ActivityIndicator } from 'react-native';
import { Header, Item, Input } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useEffect, useState, useCallback } from 'react';
import DemonsButton from '../../../components/Button';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ListItem from './ListItem';

var { height, width } = Dimensions.get('window');

import { DUMMY_PRODUCTS } from '../../../assets/data/products';
import { getAllProducts, deleteProduct } from '../../../Service/apis/product';

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
  const [products, setProducts] = useState();
  const [productsFilter, setProductsFilter] = useState();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState();

  // useEffect(() => {
  //   const timer = setTimeout(() => setLoading(false), 100);

  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, []);

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem('token')
        .then((res) => {
          setToken(res);
        })
        .catch((error) => console.log(error));
      const getProducts = async () => {
        try {
          const res = await getAllProducts();
          console.log(res.data);
          setProducts(res.data.products);
          setProductsFilter(res.data.products);
          setLoading(false);
        } catch (e) {
          console.log(e.message);
        }
      };

      getProducts();
      // getData();

      return () => {
        setProducts();
        setProductsFilter();
        setLoading(true);
      };
    }, [])
  );

  // useEffect(async () => {
  //   const productsData = await getAllProducts();
  //   setProducts(productsData.data.products);

  //   return () => {
  //     setProducts([]);
  //   };
  // }, []);

  const searchProduct = (text) => {
    if (text == '') {
      setProductsFilter(products);
    }
    setProductsFilter(products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase())));
  };

  const deleteProductForm = async (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      await deleteProduct(id, config);
      const products = productsFilter.filter((item) => item._id !== id);
      setProductsFilter(products);
    } catch (error) {
      console.log(error);
    }
    console.log(id);
    console.log(token);
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
          data={productsFilter}
          contentContainerStyle={{
            paddingBottom: 100,
          }}
          ListHeaderComponent={ListHeader}
          renderItem={({ item, index }) => (
            <ListItem {...item} navigation={navigation} index={index} delete={deleteProductForm} />
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
