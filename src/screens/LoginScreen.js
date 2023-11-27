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
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import {signInWithEmailAndPassword} from 'firebase/auth';
import email1 from '../assets/icon/email.png';
import password2 from '../assets/icon/password.png';
import {auth} from '../firebase';
const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    setLoading(true);
    const unsubscribe = auth.onAuthStateChanged(authUser => {
      if (!authUser) {
        setLoading(false);
      }
      if (authUser) {
        navigation.replace('Home');
      }
    });

    return unsubscribe;
  }, []);

  const login = () => {
    signInWithEmailAndPassword(auth, email, password).then(userCredential => {
      console.log('user credential', userCredential);
      const user = userCredential.user;
      console.log('user details', user);
    });
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        padding: 10,
      }}>
      {loading ? (
        <View
          style={{
            alignItems: 'center',
            flex: 1,
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <Text>Loading</Text>
          <ActivityIndicator size="large" color={'red'} />
        </View>
      ) : (
        <KeyboardAvoidingView>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 80,
            }}>
            <Text style={{fontSize: 20, color: '#662d91', fontWeight: 'bold'}}>
              Sign In
            </Text>
            <Text
              style={{
                fontSize: 18,
                marginTop: 8,
                fontWeight: '600',
              }}>
              Sign In to your Account
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

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                maxHeight: 90,
              }}>
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

            <Pressable
              onPress={login}
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
                Login
              </Text>
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate('Register')}
              style={{marginTop: 20}}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 17,
                  color: 'gray',
                  fontWeight: '500',
                }}>
                Dont't have a account?{' '}
                <Text style={{color: 'blue'}}>Sign Up </Text>
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
