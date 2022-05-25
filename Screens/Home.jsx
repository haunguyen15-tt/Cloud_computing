import React, { useState, useCallback, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { FlatList, Button, View, Text, SafeAreaView, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CategoriesBar from '../components/CategoriesBar';
import COLORS from '../assets/data/colors.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getAllProducts } from '../Service/apis/product';

import Card from '../components/Card';

const Home = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [productsCtg, setProductsCtg] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const getProducts = async () => {
        try {
          const res = await getAllProducts();
          console.log(res.data);
          setProducts(res.data.products);
          setProductsFiltered(res.data.products);
        } catch (e) {
          console.log(e.message);
        }
      };

      getProducts();
      getData();

      return () => {
        setProducts([]);
        setProductsFiltered([]);
      };
    }, [])
  );

  const searchProduct = (text) => {
    setProductsFiltered(products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase())));
  };

  const getProductsByCategory = async (id) => {
    try {
      const res = await getAllProducts({ category: id });
      setProductsFiltered(res.data.products);
    } catch (e) {
      console.log(e);
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        console.log(value);
      }
    } catch (e) {
      // error reading value
    }
  };

  return (
    <>
      <SafeAreaView style={{ paddingHorizontal: 20 }}>
        <View style={styles.header}>
          <View>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Welcome to</Text>
            <Text
              style={{
                fontSize: 30,
                fontWeight: 'bold',
                color: COLORS.red,
              }}
            >
              Demons Store
            </Text>
          </View>
          <Icon onPress={() => navigation.navigate('Cart')} name='shopping-cart' size={28} />
        </View>
        <View style={{ marginTop: 10, flexDirection: 'row' }}>
          <View style={styles.searchContainer}>
            <Icon name='search' size={24} style={{ marginLeft: 20 }} />
            <TextInput
              placeholder='Search'
              style={styles.input}
              onChangeText={(text) => searchProduct(text)}
            />
          </View>
          <View style={styles.sortBtn}>
            <Icon name='sort' size={30} color={COLORS.white} />
          </View>
        </View>
        <CategoriesBar getProductsByCategory={getProductsByCategory} />
      </SafeAreaView>
      {productsFiltered.length > 0 ? (
        <FlatList
          columnWrapperStyle={{
            justifyContent: 'space-between',
            paddingHorizontal: 20,
          }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: 10,
            paddingBottom: 100,
          }}
          numColumns={2}
          data={productsFiltered}
          renderItem={({ item }) => <Card product={item} navigation={navigation} />}
          keyExtractor={(item) => item._id}
        />
      ) : (
        <Text style={{ fontSize: 20, fontWeight: 'bold', paddingLeft: 50 }}>No products found</Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchContainer: {
    height: 50,
    backgroundColor: COLORS.light,
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.dark,
    paddingLeft: 10,
    flex: 1,
  },
  sortBtn: {
    marginLeft: 10,
    height: 50,
    width: 50,
    backgroundColor: COLORS.red,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});

export default Home;
