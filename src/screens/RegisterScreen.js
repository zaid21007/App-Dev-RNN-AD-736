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
  Button,
  ActivityIndicator,
} from 'react-native';
import { useState } from 'react';

import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import { Picker } from '@react-native-community/picker';
import Decode from 'jwt-decode';
import { signup } from '../api';

export default function userflowScreen2({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [accountType, setAccountType] = useState('');

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

  const onSignup = (event) => {
    setLoading(!loading);
    event.preventDefault();
    const payload = {
      name: name.trim(),
      email: email.toLowerCase(),
      password: password,
      accountType: accountType,
    };
    // console.log(payload);
    signup(payload)
      .then((response) => {
        let user = Decode(response.data);
        setLoading(!loading);
        if (user.isAdmin === false && user.accountType === 'basic') {
          navigation.navigate('Home');
        } else if (user.isAdmin === false && user.accountType === 'premium') {
          navigation.navigate('Profile');
        } else if (user.isAdmin === true) {
          navigation.navigate('Settings');
        } else {
          (error) => {
            setLoading(false);
            Alert.alert(JSON.stringify(error));
            // console.log(error);
          };
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
          {'\n'}Welcome Community App
        </Text>

        <Text style={{ color: '#FFFFFF', fontWeight: 'normal', fontSize: 16 }}>
          Sign Up to getting Started
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
            marginTop: 30,
            backgroundColor: '#19181F',
          }}
        >
          <FontAwesome5 name='person-booth' size={18} color='#FFFFFF' />
          <Picker
            style={{
              color: '#CCCCCC',
              height: 40,
              width: '90%',
              marginHorizontal: 4,
            }}
            selectedValue={accountType}
            onValueChange={(value) => setAccountType(value)}
          >
            <Picker.Item label='Basic' value='basic' />
            <Picker.Item label='Premium' value='premium' />
          </Picker>
          {/* <DropDownPicker
            open={open}
            value={value}
            items={accountType}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setAccountType}
          /> */}
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
            marginTop: 15,
            backgroundColor: '#19181F',
          }}
        >
          <Ionicons name='person-circle-outline' size={24} color='#FFFFFF' />

          <TextInput
            style={{
              color: '#FFFFFF',
              height: 40,
              width: '90%',
              marginHorizontal: 10,
            }}
            value={name}
            placeholder='Name...'
            placeholderTextColor='#CCCCCC'
            onChangeText={(name) => setName(name)}
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
            marginTop: 15,
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
            marginTop: 15,
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
          onPress={(event) => onSignup(event)}
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
            Register Here
          </Text>
        </TouchableOpacity>

        <Text
          style={{
            color: '#FFFFFF',
            marginHorizontal: 15,
            fontSize: 12,
            textAlign: 'center',
          }}
          onPress={() => navigation.navigate('Login')}
        >
          Already have an account? Sign In
        </Text>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
