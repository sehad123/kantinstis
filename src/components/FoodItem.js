/* eslint-disable react-native/no-inline-styles */
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
const services = [
  {
    id: '0',
    image: 'https://cdn-icons-png.flaticon.com/128/2975/2975126.png',
    name: 'shirt',
    quantity: 0,
    price: 10,
  },
  {
    id: '11',
    image: 'https://cdn-icons-png.flaticon.com/128/2975/2975126.png',
    name: 'T-shirt',
    quantity: 0,
    price: 10,
  },
  {
    id: '12',
    image: 'https://cdn-icons-png.flaticon.com/128/2975/2975126.png',
    name: 'dresses',
    quantity: 0,
    price: 10,
  },
  {
    id: '13',
    image: 'https://cdn-icons-png.flaticon.com/128/2975/2975126.png',
    name: 'jeans',
    quantity: 0,
    price: 10,
  },
  {
    id: '14',
    image: 'https://cdn-icons-png.flaticon.com/128/2975/2975126.png',
    name: 'Sweater',
    quantity: 0,
    price: 10,
  },
  {
    id: '15',
    image: 'https://cdn-icons-png.flaticon.com/128/2975/2975126.png',
    name: 'shorts',
    quantity: 0,
    price: 10,
  },
  {
    id: '16',
    image: 'https://cdn-icons-png.flaticon.com/128/2975/2975126.png',
    name: 'Sleeveless',
    quantity: 0,
    price: 10,
  },
];
const FoodItem = () => {
  return (
    <View>
      <Text style={{textAlign: 'center'}}>FoodItem</Text>
      <ScrollView>
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

export default FoodItem;

const styles = StyleSheet.create({});
