import * as React from 'react';
import Constants from 'expo-constants';
import {
  Image,
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import Decode from 'jwt-decode';
import { login, setUser } from '../api';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [loading, setLoading] = useState(false);

  const iconPassword = () => {
    let name;
    if (hidePassword === true) {
      name = 'eye';
      return name;
    } else {
      name = 'eye-off';
      return name;
    }
  };

  const onLogin = (event) => {
    setLoading(!loading);
    event.preventDefault();
    const payload = {
      email: email.toLowerCase().trim(),
      password: password,
    };
    // console.log(payload);
    login(payload)
      .then((data) => {
        let user = Decode(data.data);
        setUser(user);
        setLoading(!loading);
        if (user.isAdmin === false && user.accountType === 'basic') {
          navigation.navigate('Home');
        } else if (user.isAdmin === false && user.accountType === 'premium') {
          navigation.navigate('Profile');
        } else if (user.isAdmin === true) {
          navigation.navigate('Settings');
        }
      })
      .catch((error) => {
        setLoading(false);
        Alert.alert(JSON.stringify(error));
        // console.log(error);
      });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <SafeAreaView
        style={{
          flex: 1,
          alignItems: 'center',
          backgroundColor: '#000000',
          paddingTop: Constants.statusBarHeight,
        }}
      >
        <View
          style={{
            width: 100,
            height: 100,
          }}
        >
          <Image
            style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
            source={require('../../assets/icon.png')}
          />
        </View>

        <Text style={{ color: '#FFFFFF', fontWeight: 'normal', fontSize: 18 }}>
          {'\n'}Welcome to Community App
        </Text>

        <Text style={{ color: '#FFFFFF', fontWeight: 'normal', fontSize: 16 }}>
          Sign In to getting Started
        </Text>

        <View
          style={{
            borderRadius: 1,
            flexDirection: 'row',
            borderWidth: 0.1,
            borderColor: '#707070',
            alignItems: 'center',
            padding: 5,
            width: '90%',
            margin: 30,
            backgroundColor: '#19181F',
          }}
        >
          <FontAwesome5 name='user-alt' size={24} color='#FFFFFF' />

          <TextInput
            style={{
              color: '#FFFFFF',
              height: 40,
              width: '90%',
              marginHorizontal: 10,
            }}
            value={email}
            onChangeText={(email) => setEmail(email)}
            placeholder='Email...'
            placeholderTextColor='#CCCCCC'
          />
        </View>

        <View
          style={{
            borderRadius: 1,
            flexDirection: 'row',
            borderWidth: 0.1,
            borderColor: '#707070',
            alignItems: 'center',
            padding: 5,
            width: '90%',
            margin: 5,
            backgroundColor: '#19181F',
          }}
        >
          <MaterialIcons name='lock' size={28} color='#FFFFFF' />

          <TextInput
            style={{
              color: '#FFFFFF',
              height: 40,
              width: '75%',
              marginHorizontal: 10,
            }}
            secureTextEntry={hidePassword}
            value={password}
            onChangeText={(password) => setPassword(password)}
            placeholder='Password...'
            placeholderTextColor='#CCCCCC'
          />

          <MaterialCommunityIcons
            name={iconPassword()}
            size={24}
            color='#FFFFFF'
            onPress={() => {
              setHidePassword(!hidePassword), iconPassword(hidePassword);
            }}
          />
        </View>

        <ActivityIndicator animating={loading} size='large' color='#D6000E' />

        <TouchableOpacity
          style={{
            margin: 10,
            backgroundColor: '#D6000E',
            height: 40,
            width: '90%',
            borderRadius: 4,
          }}
          onPress={(event) => onLogin(event)}
        >
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              justifyContent: 'center',
              top: 9,
              fontSize: 17,
            }}
          >
            Sign in
          </Text>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: 'row',
          }}
        >
          <Text
            style={{ color: '#FFFFFF', marginHorizontal: 15, fontSize: 12 }}
            onPress={() => navigation.navigate('Register')}
          >
            Don't have an account? Sign Up
          </Text>

          <MaterialCommunityIcons
            name='arrow-right'
            size={18}
            color='#FFFFFF'
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
