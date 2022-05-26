import React, { useState, useEffect } from 'react';
import { Text, Image, FlatList, TouchableOpacity, StyleSheet, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { INCREASE_QUANTITY, DECREASE_QUANTITY, GET_TOTAL_AMOUNT } from '../Redux/constants';
import { useFocusEffect } from '@react-navigation/native';
import { CART_DUMMY_PRODUCTS } from '../assets/data/cartProducts';

function Cart({ navigation }) {
  const products = useSelector((state) => state.cart.items);
  // const [totalAmount, setTotalAmount] = useState(0);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     setTotalAmount(totalPrice);
  //     return () => setTotalAmount(0);
  //   })
  // );

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
      {products.length > 0 && (
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: 10,
            paddingBottom: 20,
          }}
          numColumns={1}
          data={products}
          renderItem={({ item }) => <CartItem product={item} />}
          keyExtractor={(item) => item._id}
        />
      )}
      <View style={styles.totalPrice}>
        <Text style={styles.totalPriceText}>Total:</Text>
        {/* <Text style={styles.totalPriceText}>${totalAmount}</Text> */}
        <TotalAmount />
        <TouchableOpacity onPress={() => navigation.navigate('Checkout', products)}>
          <Text style={styles.checkoutBtn}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const CartItem = ({ product }) => {
  let products = useSelector((state) => state.cart.items);
  const product1 = products.find((item) => item._id === product._id);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      setQuantity(product1.quantity);
      return () => setQuantity(1);
    }, [])
  );

  const handleIncreaseQuantity = () => {
    dispatch({ type: INCREASE_QUANTITY, payload: product1 });
    console.log(quantity);
  };
  const handleDecreaseQuantity = () => {
    dispatch({ type: DECREASE_QUANTITY, payload: product1 });
    setQuantity((prev) => prev - 1);
    dispatch({ type: GET_TOTAL_AMOUNT });
  };

  return (
    <View style={styles.container}>
      <View style={styles.imgWrapped}>
        <Image
          source={{
            uri: product.imageCover ? product.imageCover : 'assets/product1.png',
          }}
          style={styles.img}
        />
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
            onPress={() => {
              quantity > 0 && handleDecreaseQuantity();
            }}
          >
            <Text style={styles.borderBtnText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.productQuantity}>{quantity}</Text>
          <TouchableOpacity
            style={styles.borderBtn}
            onPress={() => {
              handleIncreaseQuantity();
              setQuantity((prev) => prev + 1);
              dispatch({ type: GET_TOTAL_AMOUNT });
            }}
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

const TotalAmount = () => {
  const dispatch = useDispatch();
  const [totalAmount, setTotalAmount] = useState(0);
  const totalPrice = useSelector((state) => state.cart.totalAmount);

  useFocusEffect(
    React.useCallback(() => {
      dispatch({ type: GET_TOTAL_AMOUNT });
      setTotalAmount(totalPrice);
      return () => setTotalAmount(0);
    })
  );
  return <Text style={styles.totalPriceText}>${totalAmount}</Text>;
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
