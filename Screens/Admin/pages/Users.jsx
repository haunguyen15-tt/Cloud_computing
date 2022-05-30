import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';

import DemonsButton from '../../../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

import { getAllUsers, updateUser } from '../../../Service/apis/user';

const Users = () => {
  const [users, setUsers] = useState();
  const [isSetrole, setIsSetrole] = useState(false);

  useEffect(async () => {
    const token = await AsyncStorage.getItem('token');

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const res = await getAllUsers(config);
      console.log(res.data.users);
      setUsers(res.data.users);
    } catch (error) {
      console.error(error);
    }

    return () => {
      setUsers([]);
      setIsSetrole((prev) => !prev);
    };
  }, [isSetrole]);

  const onSetRole = async (id) => {
    const updatedUser = users.filter((item) => item._id === id);
    const dataUpdated = {
      role: updatedUser[0].role === 'admin' ? 'customer' : 'admin',
    };

    try {
      const user = await updateUser(id, dataUpdated);
      setIsSetrole((prev) => !prev);
      Toast.show({
        topOffset: 60,
        visibilityTime: 1000,
        type: 'success',
        text1: 'Successfully updated role',
      });
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
    <View style={{ position: 'relative', height: '100%' }}>
      <View style={{ marginBottom: 100 }}>
        <FlatList
          data={users}
          renderItem={({ item, index }) => <Item item={item} index={index} onSetRole={onSetRole} />}
          keyExtractor={(item) => item?._id}
        />
      </View>
    </View>
  );
};

const Item = ({ item, onSetRole }) => {
  return (
    <View style={styles.item}>
      <View>
        <Text>{item?.name}</Text>
        <Text>{item?.role}</Text>
        <Text>{item?.email}</Text>
      </View>
      <DemonsButton primary medium onPress={() => onSetRole(item?._id)}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>
          {item.role === 'admin' ? 'Set as Customer' : 'Set as Admin'}
        </Text>
      </DemonsButton>
    </View>
  );
};

export default Users;

const styles = StyleSheet.create({
  item: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 1,
    padding: 5,
    paddingLeft: 10,
    margin: 5,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 5,
  },
});
