import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CategoriesBar from '../components/CategoriesBar';
import COLORS from '../assets/data/colors.js';

const Header = ({ navigation }) => {
  return (
    <SafeAreaView style={{ paddingHorizontal: 20 }}>
      <View style={styles.header}>
        <View>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Welcome to</Text>
          <Text
            style={{
              fontSize: 30,
              fontWeight: 'bold',
              color: COLORS.red,
            }}
          >
            Hau Store
          </Text>
        </View>
        <Icon onPress={() => navigation.navigate('Cart')} name='shopping-cart' size={28} />
      </View>
      <View style={{ marginTop: 10, flexDirection: 'row' }}>
        <View style={styles.searchContainer}>
          <Icon name='search' size={24} style={{ marginLeft: 20 }} />
          <TextInput placeholder='Search' style={styles.input} />
        </View>
        <View style={styles.sortBtn}>
          <Icon name='sort' size={30} color={COLORS.white} />
        </View>
      </View>
      <CategoriesBar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchContainer: {
    height: 50,
    backgroundColor: COLORS.light,
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.dark,
    paddingLeft: 10,
    flex: 1,
  },
  sortBtn: {
    marginLeft: 10,
    height: 50,
    width: 50,
    backgroundColor: COLORS.red,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});

export default Header;
