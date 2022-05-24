import React, { useState } from 'react';
import { FlatList, Button } from 'react-native';

import Header from '../components/Header';
import Card from '../components/Card';

import { DUMMY_PRODUCTS } from '../assets/data/products';

const Home = ({ navigation }) => {
  const [products, setProducts] = useState(DUMMY_PRODUCTS);
  console.log(products);
  return (
    <>
      <Header navigation={navigation} />
      <FlatList
        columnWrapperStyle={{
          justifyContent: 'space-between',
          paddingHorizontal: 20,
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 10,
          paddingBottom: 50,
        }}
        numColumns={2}
        data={products}
        renderItem={({ item }) => (
          <Card product={item} navigation={navigation} keyExtractor={(item) => item.id} />
        )}
      />
    </>
  );
};

export default Home;
