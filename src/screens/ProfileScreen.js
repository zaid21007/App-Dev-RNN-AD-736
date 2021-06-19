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
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';

export default function ProfileScreen({ navigation }) {
  //   const [email, setEmail] = useState('');
  //   const [password, setPassword] = useState('');
  //   const [hidePassword, setHidePassword] = useState(true);
  //   const [loading, setLoading] = useState(false);

  //   const iconPassword = () => {
  //     let name;
  //     if (hidePassword === true) {
  //       name = 'eye';
  //       return name;
  //     } else {
  //       name = 'eye-off';
  //       return name;
  //     }
  //   };

  //   const onLogin = (event) => {
  //     setLoading(!loading);
  //     event.preventDefault();
  //     const payload = {
  //       email: email.toLowerCase().trim(),
  //       password: password,
  //     };
  //     console.log(payload);
  //     // login(payload)
  //     //   .then((response) => {
  //     //     setUser(response.data.data);
  //     //     setLoading(!loading);
  //     //     if (
  //     //       response.data.data.isAdmin === false &&
  //     //       response.data.data.accountType === 'basic'
  //     //     ) {
  //     //       navigation.navigate('Home');
  //     //     } else if (
  //     //       response.data.data.isAdmin === false &&
  //     //       response.data.data.role === 'premium'
  //     //     ) {
  //     //       navigation.navigate('Profile');
  //     //     } else if (response.data.data.isAdmin === true) {
  //     //       navigation.navigate('Settings');
  //     //     }
  //     //   })
  //     //   .catch((error) => {
  //     //     setLoading(false);
  //     //     Alert.alert(JSON.stringify(error));
  //     //   });
  //   };

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
        <Button title='Go back' onPress={() => navigation.goBack()} />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
