import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Toast from 'react-native-toast-message';
import DemonsButton from '../../../components/Button';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { updateOrder } from '../../../Service/apis/order';

const codes = [
  { name: 'pending', code: '3' },
  { name: 'confirmed', code: '2' },
  { name: 'delivered', code: '1' },
];

const OrderCard = (props) => {
  const [orderStatus, setOrderStatus] = useState();
  const [statusText, setStatusText] = useState();
  const [statusChange, setStatusChange] = useState();
  const [token, setToken] = useState();
  const [cardColor, setCardColor] = useState();

  useEffect(() => {
    if (props.editMode) {
      AsyncStorage.getItem('token')
        .then((res) => {
          setToken(res);
        })
        .catch((error) => console.log(error));
    }

    if (props.status == 'pending') {
      setStatusText('pending');
      setCardColor('#E6E300');
      setStatusChange('pending');
    } else if (props.status == 'confirmed') {
      setStatusText('confirmed');
      setCardColor('red');
      setStatusChange('confirmed');
    } else {
      setStatusText('delivered');
      setCardColor('#00FF00');
      setStatusChange('delivered');
    }

    return () => {
      setOrderStatus();
      setStatusText();
      setCardColor();
    };
  }, []);

  const updateOrderForm = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const updateInfor = {
      status: statusChange,
    };

    try {
      const res = await updateOrder(props._id, updateInfor, config);
      if (res.status === 'success') {
        Toast.show({
          topOffset: 60,
          visibilityTime: 1000,
          type: 'success',
          text1: 'Order Edited',
        });

        setTimeout(() => {
          props.navigation.navigate('Products');
        }, 500);
      }
    } catch (error) {
      Toast.show({
        topOffset: 60,
        visibilityTime: 1000,
        type: 'error',
        text1: 'Something went wrong',
        text2: 'Please try again',
      });
    }
  };

  return (
    <View style={[{ backgroundColor: cardColor }, styles.container]}>
      <View style={styles.container}>
        <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>
          Order Number: #{props._id}
        </Text>
      </View>
      <View style={{ marginTop: 10 }}>
        <Text>
          Status: {statusText} {orderStatus}
        </Text>
        <Text>Address: {props.address}</Text>
        <Text>Date Ordered: {props.createdAt}</Text>
        <View style={styles.priceContainer}>
          <Text>Price: </Text>
          <Text style={styles.price}>$ {props.totalAmount}</Text>
        </View>
        {props.editMode ? (
          <View>
            <Picker
              mode='dropdown'
              style={{ width: undefined }}
              selectedValue={statusChange}
              placeholder='Change Status'
              placeholderIconColor={{ color: '#007aff' }}
              onValueChange={(e) => {
                setStatusChange(e);
                console.log(e);
              }}
            >
              {codes.map((c) => {
                return <Picker.Item key={c.code} label={c.name} value={c.name} />;
              })}
            </Picker>
            <DemonsButton secondary large onPress={() => updateOrderForm()}>
              <Text style={{ color: 'white' }}>Update</Text>
            </DemonsButton>
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 10,
    borderRadius: 10,
  },
  title: {
    backgroundColor: '#62B1F6',
    padding: 5,
  },
  priceContainer: {
    marginTop: 10,
    alignSelf: 'flex-start',
    flexDirection: 'row',
  },
  price: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default OrderCard;
