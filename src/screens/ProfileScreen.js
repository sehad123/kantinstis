/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {StyleSheet, Text, SafeAreaView, Pressable, Image} from 'react-native';
import React from 'react';
import {auth} from '../firebase';
import {signOut} from 'firebase/auth';
import {useNavigation} from '@react-navigation/native';
import img from '../assets/img/sehad.jpeg';

const ProfileScreen = () => {
  const user = auth.currentUser;
  const navigation = useNavigation();
  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        navigation.replace('Login');
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Pressable style={{marginHorizontal: 'auto'}}>
        <Image
          style={{width: 120, height: 120, borderRadius: 80}}
          source={img}
        />
      </Pressable>
      <Pressable style={{marginVertical: 10}}>
        <Text>Selamat Datang {user.email}</Text>
      </Pressable>

      <Pressable onPress={signOutUser}>
        <Text
          style={{
            padding: 7,
            backgroundColor: 'orange',
            borderRadius: 10,
            color: 'white',
          }}>
          Sign Out
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
