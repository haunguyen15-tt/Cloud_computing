import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector, useDispatch } from 'react-redux';
import { CLEAR_CART } from '../Redux/constants';
import { createOrder } from '../Service/apis/order';

const Checkout = ({ navigation, route }) => {
  const products = route.params;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [fullName, setFullName] = useState('');
  const [numberPhone, setNumberPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [orderItems, setOrderItems] = useState();

  const productsConvert = products.map((product) => {
    return {
      idProduct: product._id,
      quantity: product.quantity,
    };
  });
  console.log(productsConvert);

  useEffect(() => {
    setOrderItems(productsConvert);

    return () => {
      setOrderItems();
    };
  }, []);

  const handleCheckout = async () => {
    try {
      const order = await createOrder({
        user: user._id,
        products: orderItems,
        address: address,
        numberPhone: numberPhone,
        notes: notes,
      });

      if (order.status === 'success') {
        Toast.show({
          type: 'success',
          text1: 'Order success',
        });

        dispatch({ type: CLEAR_CART });

        setTimeout(() => {
          navigation.navigate('Profile');
        }, 2000);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Order fail, please do it again at Cart',
        });

        setTimeout(() => {
          navigation.navigate('Cart');
        }, 2000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={styles.checkout}>
      {user ? (
        <>
          <View style={styles.headerWrapped}>
            <Text style={styles.header}>Checkout Information</Text>
            <MaterialCommunityIcons name='information' size={28} />
          </View>
          <ScrollView
            contentContainerStyle={styles.checkoutForm}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.inputContainer}>
              <View style={styles.flexRowAlignCenter}>
                <Text style={styles.inputText}>Full Name</Text>
                <MaterialIcons name='person' size={20} />
              </View>
              <TextInput
                placeholder={'Full Name'}
                placeholderTextColor={'#D1D1D1'}
                style={styles.TextInput}
                value={fullName}
                onChangeText={(text) => setFullName(text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.flexRowAlignCenter}>
                <Text style={styles.inputText}>Number Phone</Text>
                <MaterialIcons name='local-phone' size={20} />
              </View>
              <TextInput
                placeholder={'Number Phone'}
                placeholderTextColor={'#D1D1D1'}
                style={styles.TextInput}
                value={numberPhone}
                onChangeText={(text) => setNumberPhone(text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.flexRowAlignCenter}>
                <Text style={styles.inputText}>Address</Text>
                <MaterialCommunityIcons name='home-map-marker' size={20} />
              </View>
              <TextInput
                placeholder={'Address'}
                placeholderTextColor={'#D1D1D1'}
                style={styles.TextInput}
                value={address}
                onChangeText={(text) => setAddress(text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.flexRowAlignCenter}>
                <Text style={styles.inputText}>Notes</Text>
                <MaterialIcons name='speaker-notes' size={20} />
              </View>
              <TextInput
                placeholder={'Notes'}
                placeholderTextColor={'#D1D1D1'}
                style={styles.TextInput}
                value={notes}
                onChangeText={(text) => setNotes(text)}
              />
            </View>
            <TouchableOpacity onPress={handleCheckout} style={styles.checkoutBtn}>
              <Text style={styles.checkoutBtnText}>Checkout</Text>
              <MaterialIcons name='arrow-forward-ios' size={24} color='#fff' />
            </TouchableOpacity>
          </ScrollView>
        </>
      ) : (
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text>Please Login to checkout your order</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  flexRowAlignCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkout: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerWrapped: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingRight: 10,
  },
  checkoutForm: {
    paddingLeft: 10,
    paddingTop: 30,
  },
  inputContainer: {
    width: '100%',
  },
  TextInput: {
    width: '100%',
    height: 52,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    paddingLeft: 20,
    color: '#000',
    marginBottom: 20,
    marginTop: 10,
    backgroundColor: '#EEEEEE',
  },
  inputText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#000',
    paddingRight: 10,
  },
  checkoutBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 20,
    marginTop: 10,
    borderRadius: 14,
  },
  checkoutBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Checkout;
