import { View, Text, Image, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Item, Picker } from 'native-base';
import React, { useState } from 'react';
import FormContainer from '../../../components/Form/FormContainer';
import Input from '../../../components/Form/Input';
import Error from '../../../components/Error';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-toast-message';
import * as ImagePicker from 'expo-image-picker';
import DemonsButton from '../../../components/Button';

const categories1 = ['POPULAR', 'BEST SALE', 'T-SHIRT', 'PANTS'];

const ProductForm = () => {
  const [pickerValue, setPickerValue] = useState();
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  const [category, setCategory] = useState();
  const [categories, setCategories] = useState(categories1);
  const [token, setToken] = useState();
  const [err, setError] = useState();
  const [quantity, setQuantity] = useState();
  const [item, setItem] = useState(null);

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
          onValueChange={(e) => [setPickerValue(e), setCategory(e)]}
        >
          {categories?.map((c, index) => {
            return <Picker.Item key={index} label={c} value={c} />;
          })}
        </Picker>
      </Item>
      {err ? <Error message={err} /> : null}
      <View style={styles.buttonContainer}>
        <DemonsButton large secondary onPress={() => addProduct()}>
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
