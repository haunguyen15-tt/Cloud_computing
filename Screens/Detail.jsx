import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';

import COLORS from '../assets/data/colors';
import { createdComment } from '../Service/apis/product';

function Detail({ navigation, route }) {
  const product = route.params;
  const user = useSelector((state) => state.auth.user);
  const [quantity, setQuantity] = useState(1);
  const [comments, setComments] = useState();
  const [comment, setComment] = useState();

  useEffect(() => {
    setComments(product.comment);

    return () => {
      setComments();
    };
  }, []);

  const handleCreateComment = async () => {
    try {
      if (!comment) {
        Toast.show({
          topOffset: 60,
          visibilityTime: 1000,
          type: 'error',
          text1: 'Something went wrong',
          text2: 'Please fill comment inputText',
        });
        return;
      }
      const res = await createdComment(product._id, {
        nameUser: user.name,
        emailUser: user.email,
        comment: comment,
      });
      setComments((prev) => [...prev, res.data.comment]);
      setComment('');
      Toast.show({
        topOffset: 60,
        visibilityTime: 1000,
        type: 'success',
        text1: 'Create comment successfuly',
      });
    } catch (error) {
      Toast.show({
        topOffset: 60,
        visibilityTime: 1000,
        type: 'error',
        text1: 'Something went wrong',
        text2: 'Please try again',
      });
      console.log(error);
    }
  };

  return (
    <>
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
              {product.description}
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
        {user ? (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text
              style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold', paddingBottom: 10 }}
            >
              Comments section
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <TextInput
                style={{
                  width: '70%',
                  marginBottom: 20,
                  height: 50,
                  borderWidth: 1,
                  borderColor: '#000',
                  borderRadius: 10,
                  paddingHorizontal: 10,
                }}
                placeholder='Add your comment'
                onChangeText={(text) => setComment(text)}
                value={comment}
              />
              <TouchableOpacity
                style={{
                  backgroundColor: 'black',
                  height: 40,
                  marginTop: 5,
                  padding: 5,
                  marginLeft: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={handleCreateComment}
              >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Submit</Text>
              </TouchableOpacity>
            </View>
            <View>
              {comments?.map((item) => (
                <Item item={item} key={item._id} />
              ))}
            </View>
          </View>
        ) : (
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold', paddingTop: 10 }}>
              Please Login to access your profile
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </>
  );
}

const Item = ({ item }) => {
  return (
    <View
      style={{
        flexDirection: 'column',
        backgroundColor: 'lightgray',
        marginBottom: 8,
        width: 380,
        padding: 10,
        borderRadius: 10,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ marginRight: 10, fontSize: 16, fontWeight: 'bold' }}>{item?.nameUser}</Text>
        <Text>{item?.emailUser}</Text>
      </View>
      <View>
        <Text style={{ marginTop: 10 }}>{item.comment}</Text>
      </View>
    </View>
  );
};

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
