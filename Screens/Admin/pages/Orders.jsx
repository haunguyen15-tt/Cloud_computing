import React, { useState, useCallback } from 'react';
import { View, FlatList, Text } from 'react-native';
// import axios from 'axios';
// import baseURL from '../../assets/common/baseUrl';
import { useFocusEffect } from '@react-navigation/native';

import OrderCard from './OrderCard';

const date = '02/02/2022';

const orderList1 = [
  { id: '123', shippingAddress: 'Da Nang', dateOrdered: '02/02/2022', totalPrice: '1323' },
  { id: '1234', shippingAddress: 'Da Nang', dateOrdered: '02/02/2022', totalPrice: '1323' },
  { id: '12345', shippingAddress: 'Da Nang', dateOrdered: '02/02/2022', totalPrice: '1323' },
];

const Orders = (props) => {
  const [orderList, setOrderList] = useState(orderList1);

  // useFocusEffect(
  //   useCallback(() => {
  //     getOrders();
  //     return () => {
  //       setOrderList();
  //     };
  //   }, [])
  // );

  // const getOrders = () => {
  //   axios
  //     .get(`${baseURL}orders`)
  //     .then((x) => {
  //       setOrderList(x.data);
  //     })
  //     .catch((error) => console.log(error));
  // };

  return (
    <View style={{ paddingBottom: 100 }}>
      <FlatList
        data={orderList}
        renderItem={({ item }) => (
          <OrderCard navigation={props.navigation} {...item} editMode={true} />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Orders;
