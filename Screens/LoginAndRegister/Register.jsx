import React from 'react';
import {
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TextInput,
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native';

import Icon from '../../assets/logo.png';

function Register() {
  return (
    <View style={styles.mainView}>
      <View style={styles.TopView}>
        <Image style={{ width: 200, resizeMode: 'contain' }} source={Icon} />
      </View>
      <View style={styles.BottomView}>
        <Text style={styles.Heading}>Welcome{'\n'} back</Text>
        <ScrollView contentContainerStyle={styles.FormView}>
          <TextInput
            placeholder={'Email Address'}
            placeholderTextColor={'#fff'}
            style={styles.TextInput}
          />
          <TextInput
            placeholder={'Number Phone'}
            placeholderTextColor={'#fff'}
            style={styles.TextInput}
          />
          <TextInput
            placeholder={'Address'}
            placeholderTextColor={'#fff'}
            style={styles.TextInput}
          />
          <TextInput
            placeholder={'Password'}
            placeholderTextColor={'#fff'}
            style={styles.TextInput}
            secureTextEntry={true}
          />
          <TextInput
            placeholder={'Confirm Password'}
            placeholderTextColor={'#fff'}
            style={styles.TextInput}
            secureTextEntry={true}
          />
          <TouchableOpacity style={styles.Button}>
            <Text style={styles.ButtonText}>Register</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // topSection: {
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   height: '30%',
  // },
  // body: {
  //   flex: 1,
  //   backgroundColor: 'white',
  //   flexDirection: 'column',
  //   justifyContent: 'space-between',
  // },
  // bottomSection: {
  //   width: '100%',
  //   height: '70%',
  //   backgroundColor: '#000',
  //   borderTopLeftRadius: 30,
  //   borderTopRightRadius: 30,
  // },
  mainView: {
    marginTop: 40,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: -20,
  },
  TopView: {
    width: '100%',
    height: '20%',
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  BottomView: {
    width: '100%',
    height: '80%',
    backgroundColor: '#000',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  Heading: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: 30,
    marginLeft: 30,
  },
  FormView: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginTop: 20,
    alignItems: 'center',
    height: 450,
  },
  TextInput: {
    width: '80%',
    height: 52,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 10,
    paddingLeft: 20,
    color: '#fff',
    marginBottom: 20,
  },
  Button: {
    width: '50%',
    height: 52,
    backgroundColor: '#B22222',
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ButtonText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
  },
  RegisterText: {
    color: 'gray',
    fontWeight: 'bold',
    fontSize: 18,
  },
  RegisterButton: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    marginBottom: 50,
  },
});

export default Register;
