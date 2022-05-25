import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Dimensions, TextInput, StyleSheet } from 'react-native';
import DemonsButton from '../../../components/Button';

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

const categories1 = [
  { _id: '123123', name: 'T-Shirt' },
  { _id: '321321', name: 'Pant' },
  { _id: '333', name: 'Blazer' },
  { _id: '222', name: 'Others' },
];

const Categories = (props) => {
  const [categories, setCategories] = useState(categories1);
  const [categoryName, setCategoryName] = useState();
  // const [token, setToken] = useState();

  // useEffect(() => {
  //   AsyncStorage.getItem('jwt')
  //     .then((res) => {
  //       setToken(res);
  //     })
  //     .catch((error) => console.log(error));

  //   axios
  //     .get(`${baseURL}categories`)
  //     .then((res) => setCategories(res.data))
  //     .catch((error) => alert('Error to load categories'));

  //   return () => {
  //     setCategories();
  //     setToken();
  //   };
  // }, []);

  const addCategory = () => {
    // const category = {
    //   name: categoryName,
    // };
    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // };
    // axios
    //   .post(`${baseURL}categories`, category, config)
    //   .then((res) => setCategories([...categories, res.data]))
    //   .catch((error) => alert('Error to load categories'));
    // setCategoryName('');
  };

  const deleteCategory = (id) => {
    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // };
    // axios
    //   .delete(`${baseURL}categories/${id}`, config)
    //   .then((res) => {
    //     const newCategories = categories.filter((item) => item.id !== id);
    //     setCategories(newCategories);
    //   })
    //   .catch((error) => alert('Error to load categories'));
  };

  return (
    <View style={{ position: 'relative', height: '100%' }}>
      <View style={{ marginBottom: 60 }}>
        <FlatList
          data={categories}
          renderItem={({ item, index }) => (
            <Item item={item} index={index} onDelete={deleteCategory} />
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
          <DemonsButton medium secondary onPress={() => addCategory()}>
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
    bottom: 120,
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
