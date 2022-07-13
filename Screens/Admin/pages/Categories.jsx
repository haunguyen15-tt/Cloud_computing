import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Dimensions, TextInput, StyleSheet } from 'react-native';
import DemonsButton from '../../../components/Button';

import { getAllCategories, addCategory, deleteCategory } from '../../../Service/apis/categories';
import AsyncStorage from '@react-native-async-storage/async-storage';

var { width } = Dimensions.get('window');

const Item = ({ item, onDelete }) => {
  return (
    <View style={styles.item}>
      <Text>{item.name}</Text>
      <DemonsButton danger medium onPress={() => onDelete(item._id)}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Delete</Text>
      </DemonsButton>
    </View>
  );
};

const Categories = (props) => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState();
  const [token, setToken] = useState();

  useEffect(async () => {
    AsyncStorage.getItem('token')
      .then((res) => {
        setToken(res);
      })
      .catch((error) => console.log(error));

    try {
      const res = await getAllCategories();
      setCategories(res.data.categorys);
    } catch (err) {
      console.log(err);
    }

    return () => {
      setCategories();
      setToken();
    };
  }, []);

  const addCategoryForm = async () => {
    const category = {
      name: categoryName,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const res = await addCategory(category, config);
      setCategories((prev) => [...prev, res.data.category]);
    } catch (error) {
      console.log(error);
    }

    setCategoryName('');
  };

  const deleteCategoryForm = async (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const res = await deleteCategory(id, config);
      const newCategories = categories.filter((item) => item._id !== id);
      setCategories(newCategories);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ position: 'relative', height: '100%' }}>
      <View style={{ marginBottom: 160 }}>
        <FlatList
          data={categories}
          renderItem={({ item, index }) => (
            <Item item={item} index={index} onDelete={deleteCategoryForm} />
          )}
          keyExtractor={(item) => item._id}
        />
      </View>
      <View style={styles.bottomBar}>
        <View>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Add Category</Text>
        </View>
        <View style={{ width: width / 2.5 }}>
          <TextInput
            value={categoryName}
            style={styles.input}
            onChangeText={(text) => setCategoryName(text)}
          />
        </View>
        <View>
          <DemonsButton medium secondary onPress={() => addCategoryForm()}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Submit</Text>
          </DemonsButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomBar: {
    backgroundColor: 'white',
    width: width,
    height: 60,
    padding: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 80,
    left: 0,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
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
    margin: 5,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 5,
  },
});

export default Categories;
