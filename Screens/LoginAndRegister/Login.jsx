import React, { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
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
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../Redux/actions/authActions';

function Login({ navigation }) {
  const navigateToRegister = () => {
    navigation.navigate('Register');
  };

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (auth.error) {
      Toast.show({
        type: 'error',
        text1: auth.error,
      });
    } else if (auth.user) {
      navigation.goBack();
    }
  }, [auth.error, auth.user]);

  return (
    <View style={styles.mainView}>
      <View style={styles.TopView}>
        <Image style={{ width: 300, resizeMode: 'contain', marginBottom: 10 }} source={Icon} />
      </View>
      <View style={styles.BottomView}>
        <Text style={styles.Heading}>Welcome{'\n'} back</Text>
        <ScrollView contentContainerStyle={styles.FormView}>
          <TextInput
            placeholder={'Email Address'}
            placeholderTextColor={'#fff'}
            style={styles.TextInput}
            value={email}
            onChangeText={(text) => setEmail(text.toLowerCase())}
          />
          <TextInput
            placeholder={'Password'}
            placeholderTextColor={'#fff'}
            style={styles.TextInput}
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text.toLowerCase())}
          />
          <TouchableOpacity style={styles.Button} onPress={() => handleSubmit()}>
            <Text style={styles.ButtonText}>Login</Text>
          </TouchableOpacity>
        </ScrollView>
        <TouchableOpacity style={styles.RegisterButton} onPress={navigateToRegister}>
          <Text style={styles.RegisterText}>Register</Text>
        </TouchableOpacity>
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
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  TopView: {
    width: '100%',
    height: '30%',
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  BottomView: {
    width: '100%',
    height: '70%',
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
    marginTop: 30,
    alignItems: 'center',
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
    color: '#fff',
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

export default Login;
