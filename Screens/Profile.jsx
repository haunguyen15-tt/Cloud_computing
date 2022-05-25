import React from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import OrderItem from '../components/OrderItem';
import Login from '../Screens/LoginAndRegister/Login';
import Register from '../Screens/LoginAndRegister/Register';
import * as ImagePicker from 'expo-image-picker';
import { useSelector, useDispatch } from 'react-redux';

const OrderItems = [
  {
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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      console.log(result);
      const newImageUri = 'file:///' + result.uri.split('file:/').join('');
      const name = newImageUri.split('/').pop();
      console.log(name);
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
          <View style={styles.contentBot}>
            <View style={styles.botContent}>
              <View style={styles.header}>
                <Text style={styles.headerText}>{user.name}</Text>
                <Text style={{ fontSize: 12, fontWeight: 'bold' }}>
                  Number Phone: {user.numberPhone}
                </Text>
                <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Address: {user.address}</Text>
              </View>
              <View style={styles.userOrder}>
                <Text>Order1231</Text>
                <Text onPress={hanldeLogout}>Logout</Text>
              </View>
            </View>
          </View>
          <View style={styles.avatarWrapped}>
            <Image source={require('../assets/avatar2.jpg')} style={styles.avatar} />
            <TouchableOpacity style={styles.avatarPicker} onPress={pickImage}>
              <MaterialCommunityIcons color={'#fff'} name='camera-outline' size={24} colo />
            </TouchableOpacity>
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
  },
  botContent: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginTop: -520,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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
    top: 30,
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
    elevation: 1000,
    backgroundColor: '#000',
    padding: 2,
    borderRadius: 10,
  },
  userOrder: {
    width: '100%',
    backgroundColor: 'red',
  },
});

export default Profile;
