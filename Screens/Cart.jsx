import React, { useState } from 'react';
import { Text, Image, FlatList, TouchableOpacity, StyleSheet, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { CART_DUMMY_PRODUCTS } from '../assets/data/cartProducts';

function Cart({ navigation }) {
  const [products, setProducts] = useState(CART_DUMMY_PRODUCTS);
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Text style={styles.Heading}>My cart</Text>
        <MaterialCommunityIcons
          name='cart'
          size={28}
          style={{
            marginTop: 20,
            paddingLeft: 10,
          }}
        />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 10,
          paddingBottom: 20,
        }}
        numColumns={1}
        data={products}
        renderItem={({ item }) => <CartItem product={item} keyExtractor={(item) => item.id} />}
      />
      <View style={styles.totalPrice}>
        <Text style={styles.totalPriceText}>Total:</Text>
        <Text style={styles.totalPriceText}>599$</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Checkout')}>
          <Text style={styles.checkoutBtn}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const CartItem = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <View style={styles.container}>
      <View style={styles.imgWrapped}>
        <Image source={product.img} style={styles.img} />
      </View>
      <View style={styles.productInfo}>
        <View>
          <Text style={styles.productName}>{product.name}</Text>
        </View>
        <View>
          <Text style={styles.productPrice}>{product.price}</Text>
        </View>
        <View style={styles.productQuantityWrapped}>
          <TouchableOpacity
            style={styles.borderBtn}
            onPress={() => quantity > 0 && setQuantity((prev) => prev - 1)}
          >
            <Text style={styles.borderBtnText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.productQuantity}>{quantity}</Text>
          <TouchableOpacity
            style={styles.borderBtn}
            onPress={() => setQuantity((prev) => prev + 1)}
          >
            <Text style={styles.borderBtnText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity>
        <MaterialCommunityIcons
          name='delete-outline'
          style={{
            fontSize: 16,
            color: '#fff',
            backgroundColor: '#000',
            padding: 8,
            borderRadius: 100,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  Heading: {
    fontSize: 30,
    color: '#000',
    fontWeight: 'bold',
    paddingTop: 20,
    paddingLeft: 20,
    letterSpacing: 1,
  },
  container: {
    width: '100%',
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 6,
  },
  totalPrice: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 100,
  },
  totalPriceText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 10,
  },
  checkoutBtn: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#fff',
    marginLeft: 150,
    backgroundColor: '#B22222',
    padding: 10,
    borderRadius: 10,
  },
  imgWrapped: {
    width: '30%',
    height: 100,
    padding: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgray',
    borderRadius: 10,
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  productInfo: {
    flex: 1,
    height: '100%',
    justifyContent: 'flex-start',
    paddingLeft: 20,
    paddingTop: 10,
  },
  productName: {
    fontSize: 14,
    maxWidth: '100%',
    color: '#000',
    fontWeight: '700',
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '400',
    maxWidth: '85%',
    color: 'gray',
  },
  productQuantityWrapped: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  productQuantity: {
    fontSize: 20,
    marginHorizontal: 10,
    fontWeight: 'bold',
  },
  borderBtn: {
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
  },
  borderBtnText: { fontWeight: 'bold', fontSize: 18 },
});

export default Cart;
