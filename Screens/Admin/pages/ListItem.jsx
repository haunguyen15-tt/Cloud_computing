import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableHighLight,
  TouchableOpacity,
  Dimensions,
  Button,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DemonsButton from '../../../components/Button';

var { width } = Dimensions.get('window');

const ListItem = ({ image, name, category, price, quantity, index }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              underlayColor='#E8E8E8'
              onPress={() => {
                setModalVisible(false);
              }}
              style={{
                alignSelf: 'flex-end',
                position: 'absolute',
                top: 5,
                right: 10,
              }}
            >
              <Icon name='close' size={20} />
            </TouchableOpacity>
            <DemonsButton
              medium
              secondary
              onPress={() => [
                // props.navigation.navigate('ProductForm', { item: props }),
                setModalVisible(false),
              ]}
            >
              <Text style={styles.textStyle}>Edit</Text>
            </DemonsButton>
            <DemonsButton medium danger onPress={() => [setModalVisible(false)]}>
              <Text style={styles.textStyle}>Delete</Text>
            </DemonsButton>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={[styles.container, { backgroundColor: index % 2 == 0 ? 'white' : 'lightgray' }]}
        onLongPress={() => setModalVisible(true)}
      >
        <Image
          source={{
            uri: image
              ? image
              : 'https://cdn.pixabay.com/photo/2019/07/26/20/52/man-4365597_960_720.png',
          }}
          resizeMode='contain'
          style={styles.image}
        />
        <Text numberOfLines={1} ellipsizeMode='tail' style={styles.item}>
          {name}
        </Text>
        <Text numberOfLines={1} ellipsizeMode='tail' style={styles.item}>
          {category.name}
        </Text>
        <Text numberOfLines={1} ellipsizeMode='tail' style={styles.item}>
          {price}
        </Text>
        <Text numberOfLines={1} ellipsizeMode='tail' style={styles.item}>
          {quantity}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    padding: 5,
    width: width,
    flexDirection: 'row',
  },
  image: {
    borderRadius: 50,
    width: width / 5,
    height: 50,
  },
  item: {
    margin: 3,
    width: width / 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ListItem;
