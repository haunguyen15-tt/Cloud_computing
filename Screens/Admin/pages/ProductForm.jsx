import { View, Text, Image, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Item, Picker } from 'native-base';
import React, { useState, useEffect } from 'react';
import FormContainer from '../../../components/Form/FormContainer';
import Input from '../../../components/Form/Input';
import Error from '../../../components/Error';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-toast-message';
import { getAllCategories } from '../../../Service/apis/categories';
import { addProduct, updateProduct } from '../../../Service/apis/product';
import * as ImagePicker from 'expo-image-picker';
import DemonsButton from '../../../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import mime from 'mime';
import axios from 'axios';

const ProductForm = (props) => {
  const [pickerValue, setPickerValue] = useState();
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  const [category, setCategory] = useState();
  const [categories, setCategories] = useState([]);
  const [token, setToken] = useState();
  const [err, setError] = useState();
  const [quantity, setQuantity] = useState();
  const [item, setItem] = useState(null);

  useEffect(async () => {
    if (!props.route.params) {
      setItem(null);
    } else {
      setItem(props.route.params);
      setName(props.route.params.name);
      setPrice(props.route.params.price.toString());
      setDescription(props.route.params.description);
      setImage(props.route.params.imageCover);
      setCategory(props.route.params.category?._id);
      setQuantity(props.route.params.quantity.toString());
    }

    // setToken(tokenredux);

    AsyncStorage.getItem('token')
      .then((res) => {
        setToken(res);
        console.log(res);
      })
      .catch((error) => console.log(error));

    const getCategory = async () => {
      try {
        const res = await getAllCategories();
        setCategories(res.data.categorys);
        console.log(res.data);
      } catch (e) {
        console.log(e.message);
      }
    };

    await getCategory();

    return () => {
      setCategories([]);
    };
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const addProductForm = async () => {
    if (name === '' || price === '' || description === '' || category === '' || quantity === '') {
      setError('Please fill all the form');
    }
    let formData = new FormData();

    const newImageUri = 'file:///' + image.split('file:/').join('');
    formData.append('imageCover', {
      uri: newImageUri,
      type: mime.getType(newImageUri),
      name: newImageUri.split('/').pop(),
    });
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('quantity', quantity);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    };

    if (item !== null) {
      try {
        const product = await addProduct(formData, config);
        if (product) {
          Toast.show({
            topOffset: 60,
            type: 'success',
            text1: 'Product successfuly updated',
          });
          setTimeout(() => {
            props.navigation.navigate('Products');
          }, 100);
        }
      } catch (error) {
        Toast.show({
          topOffset: 60,
          type: 'error',
          text1: 'Something went wrong',
          text2: 'Please try again',
        });
      }
      // axios
      //   .patch(`http://192.168.1.186:3000/api/v1/products/${item._id}`, formData, config)
      //   .then((res) => {
      //     if (res.status == 200 || res.status == 201) {
      //       Toast.show({
      //         topOffset: 60,
      //         type: 'success',
      //         text1: 'Product successfuly updated',
      //       });
      //       setTimeout(() => {
      //         props.navigation.navigate('Products');
      //       }, 500);
      //     }
      //   })
      //   .catch((error) => {
      //     Toast.show({
      //       topOffset: 60,
      //       type: 'error',
      //       text1: 'Something went wrong',
      //       text2: 'Please try again',
      //     });
      //     console.log(error);
      //   });
    } else {
      try {
        const product = await addProduct(formData, config);
        if (product) {
          Toast.show({
            topOffset: 60,
            type: 'success',
            text1: 'New Product added',
          });
          setTimeout(() => {
            props.navigation.navigate('Products');
          }, 100);
        }
      } catch (error) {
        Toast.show({
          topOffset: 60,
          type: 'error',
          text1: 'Something went wrong',
          text2: error.response.data.message.includes('duplicate')
            ? 'Duplicate name of product'
            : 'Please try again later',
        });
      }
    }

    // axios
    //   .post(`http://192.168.1.186:3000/api/v1/products`, formData, config)
    //   .then((res) => {
    //     if (res.status == 200 || res.status == 201) {
    //       Toast.show({
    //         topOffset: 60,
    //         type: 'success',
    //         text1: 'New Product added',
    //       });
    //       setTimeout(() => {
    //         props.navigation.navigate('Products');
    //       }, 500);
    //     }
    //   })
    //   .catch((error) => {
    //     Toast.show({
    //       topOffset: 60,
    //       type: 'error',
    //       text1: 'Something went wrong',
    //       text2: error.response.data.message.includes('duplicate')
    //         ? 'Duplicate name of product'
    //         : 'Please try again later',
    //     });
    //   });
  };

  return (
    <FormContainer title='Add Product'>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: image }} />
        <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
          <Icon style={{ color: 'white' }} name='camera' />
        </TouchableOpacity>
      </View>
      <View style={styles.label}>
        <Text style={{ textDecorationLine: 'underline', fontSize: 18, fontWeight: 'bold' }}>
          Name
        </Text>
      </View>
      <Input
        placeholder='Name'
        name='name'
        id='name'
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <View style={styles.label}>
        <Text style={{ textDecorationLine: 'underline', fontSize: 18, fontWeight: 'bold' }}>
          Quantity
        </Text>
      </View>
      <Input
        placeholder='Quantity'
        name='quantity'
        id='quantity'
        value={quantity}
        onChangeText={(text) => setQuantity(text)}
      />
      <View style={styles.label}>
        <Text style={{ textDecorationLine: 'underline', fontSize: 18, fontWeight: 'bold' }}>
          Price
        </Text>
      </View>
      <Input
        placeholder='Price'
        name='price'
        id='price'
        value={price}
        keyboardType={'numeric'}
        onChangeText={(text) => setPrice(text)}
      />
      <View style={styles.label}>
        <Text style={{ textDecorationLine: 'underline', fontSize: 18, fontWeight: 'bold' }}>
          Description
        </Text>
      </View>
      <Input
        placeholder='Description'
        name='description'
        id='description'
        value={description}
        onChangeText={(text) => setDescription(text)}
      />
      <View style={styles.label}>
        <Text style={{ textDecorationLine: 'underline', fontSize: 18, fontWeight: 'bold' }}>
          Categories
        </Text>
      </View>
      <Item picker style={{ paddingLeft: 40, paddingTop: 10 }}>
        <Picker
          mode='dropdown'
          iosIcon={<Icon color={'#007aff'} name='arrow-down' />}
          selectedValue={pickerValue}
          onValueChange={(e) => [setPickerValue(e._id), setCategory(e._id)]}
        >
          {categories?.map((c, index) => {
            return <Picker.Item key={index} label={c.name} value={c} />;
          })}
        </Picker>
      </Item>
      {err ? <Error message={err} /> : null}
      <View style={styles.buttonContainer}>
        <DemonsButton large secondary onPress={() => addProductForm()}>
          <Text style={styles.buttonText}>Confirm</Text>
        </DemonsButton>
      </View>
    </FormContainer>
  );
};

const styles = StyleSheet.create({
  label: {
    width: '80%',
    marginTop: 10,
  },
  buttonContainer: {
    width: '80%',
    marginBottom: 80,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderStyle: 'solid',
    borderWidth: 8,
    padding: 0,
    justifyContent: 'center',
    borderRadius: 100,
    borderColor: '#E0E0E0',
    elevation: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  imagePicker: {
    position: 'absolute',
    right: 5,
    bottom: 5,
    backgroundColor: 'grey',
    padding: 8,
    borderRadius: 100,
    elevation: 20,
  },
});

export default ProductForm;
