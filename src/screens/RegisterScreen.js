/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Alert,
  Image,
} from 'react-native';
import email1 from '../assets/icon/email.png';
import password2 from '../assets/icon/password.png';
import phone2 from '../assets/icon/phone.png';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth, db} from '../firebase';
import {doc, setDoc} from 'firebase/firestore';
const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhonel] = useState('');
  const navigation = useNavigation();

  const register = () => {
    if (email === '' || password === '' || phone === '') {
      Alert.alert(
        'Invalid Details',
        'Please fill all the details',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
          console.log('user credential', userCredential);
          const user = userCredential._tokenResponse.email;
          const myUserUid = auth.currentUser.uid;

          setDoc(doc(db, 'users', `${myUserUid}`), {
            email: user,
            phone: phone,
          });

          // Setelah pendaftaran berhasil dan data disimpan, navigasikan ke halaman Login
          navigation.navigate('Login');
        })
        .catch(error => {
          // Handle error jika proses pendaftaran gagal
          console.error('Registration failed', error);
          // Tampilkan pesan kesalahan kepada pengguna jika diperlukan
          Alert.alert(
            'Registration Failed',
            'There was an error during registration. Please try again.',
          );
        });
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        padding: 10,
      }}>
      <KeyboardAvoidingView>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 80,
          }}>
          <Text style={{fontSize: 20, color: '#662d91', fontWeight: 'bold'}}>
            Register
          </Text>
          <Text
            style={{
              fontSize: 18,
              marginTop: 8,
              fontWeight: '600',
            }}>
            Create a new Account
          </Text>
        </View>
        <View style={{marginTop: 50}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              style={{
                width: 40,
                marginLeft: 5,
                marginRight: -10,
                height: 50,
              }}
              source={email1}
            />
            <TextInput
              value={email}
              onChangeText={text => setEmail(text)}
              placeholder="Email"
              placeholderTextColor="black"
              style={{
                fontSize: email ? 18 : 18,
                borderBottomWidth: 1,
                borderBottomColor: 'gray',
                width: 300,
                marginLeft: 13,
                marginVertical: 10,
              }}
            />
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              style={{
                width: 40,
                marginLeft: 5,
                marginRight: -10,
                height: 50,
              }}
              source={password2}
            />
            <TextInput
              value={password}
              onChangeText={text => setPassword(text)}
              secureTextEntry={true}
              placeholder="Password"
              placeholderTextColor="black"
              style={{
                fontSize: password ? 18 : 18,
                borderBottomWidth: 1,
                borderBottomColor: 'gray',
                width: 300,
                marginLeft: 13,
                marginVertical: 10,
              }}
            />
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              style={{
                width: 40,
                marginLeft: 5,
                marginRight: -10,
                height: 50,
              }}
              source={phone2}
            />
            <TextInput
              value={phone}
              onChangeText={text => setPhonel(text)}
              placeholder="Nomer Hp"
              placeholderTextColor="black"
              style={{
                fontSize: password ? 18 : 18,
                borderBottomWidth: 1,
                borderBottomColor: 'gray',
                width: 300,
                marginLeft: 13,
                marginVertical: 10,
              }}
            />
          </View>

          <Pressable
            onPress={register}
            style={{
              width: 200,
              backgroundColor: '#318CE7',
              padding: 15,
              borderRadius: 7,
              marginTop: 50,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}>
            <Text style={{fontSize: 18, textAlign: 'center', color: 'white'}}>
              Register
            </Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.goBack()}
            style={{marginTop: 20}}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 17,
                color: 'gray',
                fontWeight: '500',
              }}>
              Already have a account?{' '}
              <Text style={{color: 'blue'}}>Sign in </Text>
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
