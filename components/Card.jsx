import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import COLORS from '../assets/data/colors';

const width = Dimensions.get('screen').width / 2 - 30;

const Card = ({ navigation, product }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={(e) => {
        navigation.navigate('Detail', product);
      }}
    >
      <View style={styles.card}>
        <View style={{ alignItems: 'flex-end' }}>
          {/* <TouchableOpacity
            style={{
              width: 30,
              height: 30,
              borderRadius: 15,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: product.like ? 'rgba(245, 42, 42,0.2)' : 'rgba(0,0,0,0.2)',
              elevation: 100,
            }}
            onPress={(e) => {
              if (!e.preventDefault) {
                console.log('Tim');
              }
            }}
          >
            <Icon name='favorite' size={18} color={product.like ? COLORS.red : COLORS.dark} />
          </TouchableOpacity> */}
        </View>
        <View style={styles.imageWrapper}>
          <Image
            style={{
              flex: 1,
              width: 150,
              resizeMode: 'cover',
              marginTop: -30,
            }}
            source={{
              uri: product.imageCover ? product.imageCover : 'assets/product1.png',
            }}
          />
        </View>
        <Text style={{ fontWeight: 'bold', fontSize: 17, marginTop: 10 }}>{product.name}</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 5,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>${product.price}</Text>
          <TouchableOpacity
            style={{
              height: 30,
              width: 30,
              backgroundColor: COLORS.red,
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => console.log('Press')}
          >
            <Text
              style={{
                fontSize: 20,
                color: COLORS.white,
                fontWeight: 'bold',
              }}
            >
              +
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 270,
    backgroundColor: COLORS.light,
    width,
    marginHorizontal: 2,
    borderRadius: 10,
    marginBottom: 15,
    padding: 15,
  },
  imageWrapper: {
    alignItems: 'center',
    height: 150,
  },
});

export default Card;
