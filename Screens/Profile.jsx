import React, { useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import OrderItem from '../components/OrderItem';
import Login from '../Screens/LoginAndRegister/Login';
import Register from '../Screens/LoginAndRegister/Register';
import * as ImagePicker from 'expo-image-picker';
import { useSelector, useDispatch } from 'react-redux';

const OrderItems = [
  {
    address: 'Da Nang',
    numberPhone: '0334854808',
    totalAmount: 86500,
    status: 'pending',
    product: [
      { id: 1, name: 'T-shirt', quantity: 1 },
      { id: 2, name: 'T-shirt', quantity: 1 },
      { id: 3, name: 'T-shirt', quantity: 1 },
    ],
  },
  {
    address: 'Da Nang',
    numberPhone: '0334854808',
    totalAmount: 86500,
    status: 'pending',
    product: [
      { id: 1, name: 'T-shirt', quantity: 1 },
      { id: 2, name: 'T-shirt', quantity: 1 },
      { id: 3, name: 'T-shirt', quantity: 1 },
    ],
  },
  {
    address: 'Da Nang',
    numberPhone: '0334854808',
    totalAmount: 86500,
    status: 'pending',
    product: [
      { id: 1, name: 'T-shirt', quantity: 1 },
      { id: 2, name: 'T-shirt', quantity: 1 },
      { id: 3, name: 'T-shirt', quantity: 1 },
    ],
  },
  {
    address: 'Da Nang',
    numberPhone: '0334854808',
    totalAmount: 86500,
    status: 'pending',
    product: [
      { id: 1, name: 'T-shirt', quantity: 1 },
      { id: 2, name: 'T-shirt', quantity: 1 },
      { id: 3, name: 'T-shirt', quantity: 1 },
    ],
  },
  {
    address: 'Da Nang',
    numberPhone: '0334854808',
    totalAmount: 86500,
    status: 'pending',
    product: [
      { id: 1, name: 'T-shirt', quantity: 1 },
      { id: 2, name: 'T-shirt', quantity: 1 },
      { id: 3, name: 'T-shirt', quantity: 1 },
    ],
  },
  {
    address: 'Da Nang',
    numberPhone: '0334854808',
    totalAmount: 86500,
    status: 'pending',
    product: [
      { id: 1, name: 'T-shirt', quantity: 1 },
      { id: 2, name: 'T-shirt', quantity: 1 },
      { id: 3, name: 'T-shirt', quantity: 1 },
    ],
  },
  {
    address: 'Da Nang',
    numberPhone: '0334854808',
    totalAmount: 86500,
    status: 'pending',
    product: [
      { id: 1, name: 'T-shirt', quantity: 1 },
      { id: 2, name: 'T-shirt', quantity: 1 },
      { id: 3, name: 'T-shirt', quantity: 1 },
    ],
  },
  {
    address: 'Da Nang',
    numberPhone: '0334854808',
    totalAmount: 86500,
    status: 'pending',
    product: [
      { id: 1, name: 'T-shirt', quantity: 1 },
      { id: 2, name: 'T-shirt', quantity: 1 },
      { id: 3, name: 'T-shirt', quantity: 1 },
    ],
  },
  {
    address: 'Da Nang',
    numberPhone: '0334854808',
    totalAmount: 86500,
    status: 'pending',
    product: [
      { id: 1, name: 'T-shirt', quantity: 1 },
      { id: 2, name: 'T-shirt', quantity: 1 },
      { id: 3, name: 'T-shirt', quantity: 1 },
    ],
  },
  {
    address: 'Da Nang',
    numberPhone: '0334854808',
    totalAmount: 86500,
    status: 'pending',
    product: [
      { id: 1, name: 'T-shirt', quantity: 1 },
      { id: 2, name: 'T-shirt', quantity: 1 },
      { id: 3, name: 'T-shirt', quantity: 1 },
    ],
  },
  {
    address: 'Da Nang',
    numberPhone: '0334854808',
    totalAmount: 86500,
    status: 'delivered',
    product: [
      { id: 1, name: 'T-shirt', quantity: 1 },
      { id: 2, name: 'T-shirt', quantity: 1 },
      { id: 3, name: 'T-shirt', quantity: 1 },
    ],
  },
  {
    address: 'Da Nang',
    numberPhone: '0334854808',
    totalAmount: 86500,
    status: 'confirmed',
    product: [
      { id: 1, name: 'T-shirt', quantity: 1 },
      { id: 2, name: 'T-shirt', quantity: 1 },
      { id: 3, name: 'T-shirt', quantity: 1 },
    ],
  },
  {
    address: 'Da Nang',
    numberPhone: '0334854808',
    totalAmount: 86500,
    status: 'pending',
    product: [
      { id: 1, name: 'T-shirt', quantity: 1 },
      { id: 2, name: 'T-shirt', quantity: 1 },
      { id: 3, name: 'T-shirt', quantity: 1 },
    ],
  },
  {
    address: 'Da Nang',
    numberPhone: '0334854808',
    totalAmount: 86500,
    status: 'delivered',
    product: [
      { id: 1, name: 'T-shirt', quantity: 1 },
      { id: 2, name: 'T-shirt', quantity: 1 },
      { id: 3, name: 'T-shirt', quantity: 1 },
    ],
  },
  {
    address: 'Da Nang',
    numberPhone: '0334854808',
    totalAmount: 86500,
    status: 'pending',
    product: [
      { id: 1, name: 'T-shirt', quantity: 1 },
      { id: 2, name: 'T-shirt', quantity: 1 },
      { id: 3, name: 'T-shirt', quantity: 1 },
    ],
  },
];

const Profile = ({ navigation }) => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [image, setImage] = useState();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const newImageUri = 'file:///' + result.uri.split('file:/').join('');
      const name = newImageUri.split('/').pop();
      setImage(result.uri);
    }
  };

  const hanldeLogout = () => {
    dispatch({ type: 'LOG_OUT' });
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {user ? (
        <View style={styles.container}>
          <View style={styles.contentTop}></View>
          <View style={styles.avatarWrapped}>
            <Image source={{ uri: image }} style={styles.avatar} />
            <TouchableOpacity style={styles.avatarPicker} onPress={pickImage}>
              <MaterialCommunityIcons color={'#fff'} name='camera-outline' size={24} colo />
            </TouchableOpacity>
          </View>
          <View style={styles.contentBot}>
            <View style={styles.botContent}>
              <View style={styles.header}>
                <Text style={styles.headerText}>{user.name}</Text>
                <Text style={{ fontSize: 12, fontWeight: 'bold' }}>
                  Number Phone: {user.numberPhone}
                </Text>
                <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Address: {user.address}</Text>
                <TouchableOpacity onPress={hanldeLogout}>
                  <Text
                    style={{
                      backgroundColor: 'red',
                      color: 'white',
                      paddingHorizontal: 5,
                      paddingVertical: 3,
                      fontSize: 14,
                      fontWeight: 'bold',
                      marginTop: 10,
                    }}
                  >
                    Logout
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.userOrder}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', paddingBottom: 10 }}>
                  Orders Management
                </Text>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{
                    marginTop: 10,
                    paddingBottom: 100,
                  }}
                  data={OrderItems}
                  renderItem={({ item }) => <OrderCard orderItem={item} />}
                  keyExtractor={(item) => item._id}
                />
              </View>
            </View>
          </View>
        </View>
      ) : (
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text>Please Login to access your profile</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const OrderCard = ({ orderItem }) => {
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        backgroundColor:
          orderItem.status === 'pending'
            ? '#E6E300'
            : orderItem.status === 'delivered'
            ? '#00FF00'
            : 'red',
        marginBottom: 5,
        borderRadius: 20,
      }}
    >
      <View>
        <Text
          style={[
            styles.textOrder,
            orderItem.status === 'confirmed' ? styles.textWhite : styles.textBlack,
          ]}
        >
          Addres: {orderItem.address}
        </Text>
        <Text
          style={[
            styles.textOrder,
            orderItem.status === 'confirmed' ? styles.textWhite : styles.textBlack,
          ]}
        >
          Phone: {orderItem.numberPhone}
        </Text>
        <Text
          style={[
            styles.textOrder,
            orderItem.status === 'confirmed' ? styles.textWhite : styles.textBlack,
          ]}
        >
          Total Amount: {orderItem.totalAmount}
        </Text>
        <Text
          style={[
            styles.textOrder,
            orderItem.status === 'confirmed' ? styles.textWhite : styles.textBlack,
          ]}
        >
          Products:
        </Text>
        {orderItem.product.map((item) => (
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={[
                styles.textOrderProduct,
                orderItem.status === 'confirmed' ? styles.textWhite : styles.textBlack,
              ]}
            >
              Name: {item.name}
            </Text>
            <Text
              style={[
                styles.textOrderProduct,
                orderItem.status === 'confirmed' ? styles.textWhite : styles.textBlack,
              ]}
            >
              Quantity: {item.quantity}
            </Text>
          </View>
        ))}
      </View>
      <View>
        <Text style={styles.textOrder}>{orderItem.status}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  contentTop: {
    width: '100%',
    height: '15%',
    backgroundColor: '#000',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentBot: {
    width: '100%',
    height: '85%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 200,
    marginTop: 50,
  },
  botContent: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    // alignItems: 'center',
  },
  header: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: 20,
    marginTop: -200,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  avatarWrapped: {
    width: 100,
    height: 100,
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 20,
    top: 50,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,
    elevation: 18,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  avatarPicker: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    elevation: 10000,
    backgroundColor: '#000',
    padding: 2,
    borderRadius: 10,
  },
  userOrder: {
    width: '100%',
    // backgroundColor: 'red',
    paddingHorizontal: 20,
  },
  textOrder: {
    fontSize: 14,
    fontWeight: '700',
  },
  textOrderProduct: {
    fontSize: 14,
    fontWeight: '600',
    marginRight: 8,
  },
  textWhite: {
    color: '#fff',
  },
  textBlack: {
    color: '#000',
  },
});

export default Profile;
