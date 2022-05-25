import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import COLORS from '../assets/data/colors';

function Detail({ navigation, route }) {
  const product = route.params;
  console.log(product);

  const [quantity, setQuantity] = useState(1);

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      <View style={style.header}>
        <Icon name='arrow-back' size={28} onPress={() => navigation.goBack()} />
        <Icon name='shopping-cart' size={28} />
      </View>
      <View style={style.imageContainer}>
        <Image
          source={{
            uri: product.imageCover ? product.imageCover : 'assets/product1.png',
          }}
          style={{ resizeMode: 'cover', flex: 1, width: '100%' }}
        />
      </View>
      <View style={style.detailsContainer}>
        <View
          style={{
            marginLeft: 20,
            flexDirection: 'row',
            alignItems: 'flex-end',
          }}
        >
          <View style={style.line} />
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Best choice</Text>
        </View>
        <View
          style={{
            marginLeft: 20,
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{product.name}</Text>
          <View style={style.priceTag}>
            <Text
              style={{
                marginLeft: 15,
                color: COLORS.white,
                fontWeight: 'bold',
                fontSize: 16,
              }}
            >
              ${product.price}
            </Text>
          </View>
        </View>
        <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>About</Text>
          <Text
            numberOfLines={4}
            style={{
              color: 'grey',
              fontSize: 16,
              lineHeight: 22,
              marginTop: 10,
            }}
          >
            {product.about}
          </Text>
          <View
            style={{
              marginTop: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <TouchableOpacity
                style={style.borderBtn}
                onPress={() => quantity > 0 && setQuantity((prev) => prev - 1)}
              >
                <Text style={style.borderBtnText}>-</Text>
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 20,
                  marginHorizontal: 10,
                  fontWeight: 'bold',
                }}
              >
                {quantity}
              </Text>
              <TouchableOpacity
                onPress={() => setQuantity((prev) => prev + 1)}
                style={style.borderBtn}
              >
                <Text style={style.borderBtnText}>+</Text>
              </TouchableOpacity>
            </View>

            <View style={style.buyBtn}>
              <Text
                style={{
                  color: COLORS.white,
                  fontSize: 18,
                  fontWeight: 'bold',
                }}
              >
                Buy
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageContainer: {
    flex: 0.45,
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
  },
  detailsContainer: {
    flex: 0.55,
    backgroundColor: COLORS.light,
    marginHorizontal: 7,
    marginBottom: 7,
    borderRadius: 20,
    marginTop: 30,
    paddingTop: 30,
    paddingBottom: 20,
  },
  line: {
    width: 25,
    height: 2,
    backgroundColor: COLORS.dark,
    marginBottom: 5,
    marginRight: 3,
  },
  borderBtn: {
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 40,
  },
  borderBtnText: { fontWeight: 'bold', fontSize: 28 },
  buyBtn: {
    width: 130,
    height: 50,
    backgroundColor: COLORS.red,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  priceTag: {
    backgroundColor: COLORS.red,
    width: 80,
    height: 40,
    justifyContent: 'center',
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },
});

export default Detail;
