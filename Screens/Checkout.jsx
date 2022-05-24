import React from 'react';
import { Text, View, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Checkout = () => {
  return (
    <View style={styles.checkout}>
      <View style={styles.headerWrapped}>
        <Text style={styles.header}>Checkout Information</Text>
        <MaterialCommunityIcons name='information' size={28} />
      </View>
      <ScrollView contentContainerStyle={styles.checkoutForm} showsVerticalScrollIndicator={false}>
        <View style={styles.inputContainer}>
          <View style={styles.flexRowAlignCenter}>
            <Text style={styles.inputText}>Full Name</Text>
            <MaterialIcons name='person' size={20} />
          </View>
          <TextInput
            placeholder={'Full Name'}
            placeholderTextColor={'#D1D1D1'}
            style={styles.TextInput}
          />
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.flexRowAlignCenter}>
            <Text style={styles.inputText}>Number Phone</Text>
            <MaterialIcons name='local-phone' size={20} />
          </View>
          <TextInput
            placeholder={'Number Phone'}
            placeholderTextColor={'#D1D1D1'}
            style={styles.TextInput}
          />
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.flexRowAlignCenter}>
            <Text style={styles.inputText}>Address</Text>
            <MaterialCommunityIcons name='home-map-marker' size={20} />
          </View>
          <TextInput
            placeholder={'Address'}
            placeholderTextColor={'#D1D1D1'}
            style={styles.TextInput}
          />
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.flexRowAlignCenter}>
            <Text style={styles.inputText}>Notes</Text>
            <MaterialIcons name='speaker-notes' size={20} />
          </View>
          <TextInput
            placeholder={'Notes'}
            placeholderTextColor={'#D1D1D1'}
            style={styles.TextInput}
          />
        </View>
        <TouchableOpacity style={styles.checkoutBtn}>
          <Text style={styles.checkoutBtnText}>Checkout</Text>
          <MaterialIcons name='arrow-forward-ios' size={24} color='#fff' />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  flexRowAlignCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkout: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerWrapped: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingRight: 10,
  },
  checkoutForm: {
    paddingLeft: 10,
    paddingTop: 30,
  },
  inputContainer: {
    width: '100%',
  },
  TextInput: {
    width: '100%',
    height: 52,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    paddingLeft: 20,
    color: '#000',
    marginBottom: 20,
    marginTop: 10,
    backgroundColor: '#EEEEEE',
  },
  inputText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#000',
    paddingRight: 10,
  },
  checkoutBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 20,
    marginTop: 10,
    borderRadius: 14,
  },
  checkoutBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Checkout;
