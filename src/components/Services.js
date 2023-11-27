/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Image,
} from 'react-native';
import React from 'react';

const Services = () => {
  const services = [
    {
      id: '0',
      image: 'https://cdn-icons-png.flaticon.com/128/2975/2975115.png',
      name: 'Food',
    },

    {
      id: '11',
      image: 'https://cdn-icons-png.flaticon.com/128/2975/2975662.png',
      name: 'Drink',
    },
    {
      id: '12',
      image: 'https://cdn-icons-png.flaticon.com/128/2975/2975126.png',
      name: 'Snack',
    },
    {
      id: '13',
      image: 'https://cdn-icons-png.flaticon.com/128/2975/2975160.png',
      name: 'Dessert',
    },
  ];
  return (
    <View style={{padding: 10}}>
      <Text
        style={{
          fontSize: 16,
          fontWeight: '500',
          marginBottom: 7,
          textAlign: 'center',
        }}>
        Menu Available
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {services.map((service, index) => (
          <Pressable
            style={{
              margin: 10,
              backgroundColor: 'white',
              padding: 20,
              borderRadius: 7,
            }}
            key={index}>
            <Image
              source={{uri: service.image}}
              style={{width: 70, height: 70}}
            />

            <Text style={{textAlign: 'center', marginTop: 10}}>
              {service.name}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default Services;

const styles = StyleSheet.create({});
