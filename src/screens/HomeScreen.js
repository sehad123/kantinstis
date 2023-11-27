/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {
  ScrollView,
  StyleSheet,
  Text,
  Alert,
  View,
  Pressable,
  Image,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
import Carousel from '../components/Carousel';
import img from '../assets/img/sehad.jpeg';
import location from '../assets/img/location.png';
import search from '../assets/img/search.png';
import Services from '../components/Services';
import DressItem from '../components/DressItem';
import {useSelector, useDispatch} from 'react-redux';
import {getProducts} from '../ProductReducer';
import {useNavigation} from '@react-navigation/native';
import FoodItem from '../components/FoodItem';
import {collection, getDoc, getDocs} from 'firebase/firestore';
import {db} from '../firebase';
const HomeScreen = () => {
  const [items, setItems] = useState([]);
  const cart = useSelector(state => state.cart.cart);
  const total = cart
    .map(item => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);

  const navigation = useNavigation();
  console.log(cart);
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    'We are loading your location',
  );
  const [locationServicesEnabled, setLocationServicesEnabled] = useState(false);

  useEffect(() => {
    checkIfLocationEnabled();
    getCurrentLocation();
  }, []);

  const checkIfLocationEnabled = () => {
    Geolocation.getCurrentPosition(
      position => {
        setLocationServicesEnabled(true);
      },
      error => {
        setLocationServicesEnabled(false);
        Alert.alert(
          'Location services not enabled',
          'Please enable the location services',
          [
            {
              text: 'OK',
              onPress: () => console.log('OK Pressed'),
            },
          ],
          {cancelable: false},
        );
      },
    );
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        reverseGeocode(latitude, longitude);
      },
      error => {
        Alert.alert(
          'Permission denied',
          'Allow the app to use the location services',
          [
            {
              text: 'OK',
              onPress: () => console.log('OK Pressed'),
            },
          ],
          {cancelable: false},
        );
      },
    );
  };

  const reverseGeocode = (latitude, longitude) => {
    Geolocation.reverseGeocode(latitude, longitude, (response, error) => {
      if (error) {
        console.error(error);
        return;
      }

      if (response.length > 0) {
        const address = `${response[0].name}, ${response[0].city}, ${response[0].region}, ${response[0].country}`;
        setDisplayCurrentAddress(address);
      }
    });
  };

  const product = useSelector(state => state.product.product);
  const dispatch = useDispatch();
  useEffect(() => {
    if (product.length > 0) return;
    const fetchProducts = async () => {
      const colRef = collection(db, 'types');
      const docsSnap = await getDocs(colRef);
      docsSnap.forEach(doc => {
        items.push(doc.data());
      });
      items?.map(service => dispatch(getProducts(service)));
    };
    fetchProducts();
  }, []);
  console.log(product);

  const services = [
    {
      id: '0',
      image: 'https://cdn-icons-png.flaticon.com/128/2975/2975160.png',
      name: 'Batagor',
      quantity: 0,
      price: 15000,
    },
    {
      id: '11',
      image: 'https://cdn-icons-png.flaticon.com/128/2975/2975160.png',
      name: 'Siomay',
      quantity: 0,
      price: 20000,
    },
    {
      id: '12',
      image: 'https://cdn-icons-png.flaticon.com/128/2975/2975160.png',
      name: 'jus jambu',
      quantity: 0,
      price: 10000,
    },

    {
      id: '13',
      image: 'https://cdn-icons-png.flaticon.com/128/2975/2975160.png',
      name: 'Nasi Goreng',
      quantity: 0,
      price: 15000,
    },
    {
      id: '14',
      image: 'https://cdn-icons-png.flaticon.com/128/2975/2975160.png',
      name: 'Mie Ayam',
      quantity: 0,
      price: 20000,
    },
    {
      id: '15',
      image: 'https://cdn-icons-png.flaticon.com/128/2975/2975110.png',
      name: 'Bakso',
      quantity: 0,
      price: 12000,
    },
    {
      id: '16',
      image: 'https://cdn-icons-png.flaticon.com/128/2975/2975160.png',
      name: 'Soto',
      quantity: 0,
      price: 12000,
    },
  ];
  return (
    <>
      <ScrollView style={{backgroundColor: '#F0F0F0', flex: 1, marginTop: 10}}>
        {/* Location and  */}
        <View style={{flexDirection: 'row', alignItems: 'center', padding: 10}}>
          {/* <MaterialIcons name="location-on" size={30} color="#fd5c63" /> */}
          <Image
            style={{width: 40, marginTop: 5, height: 40, borderRadius: 20}}
            source={location}
          />
          <View>
            <Text style={{fontSize: 18, fontWeight: '600'}}>Jakarta</Text>
            <Text>{displayCurrentAddress}</Text>
          </View>
          <Pressable
            onPress={() => navigation.navigate('Profile')}
            style={{marginLeft: 'auto', marginRight: 7}}>
            <Image
              style={{width: 40, height: 40, borderRadius: 20}}
              source={img}
            />
          </Pressable>
        </View>
        {/* Search Bar */}
        <View
          style={{
            margin: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderWidth: 0.8,
            borderColor: '#C0C0C0',
            borderRadius: 7,
          }}>
          <TextInput placeholder="Search for items or More" />
          <Image
            style={{width: 40, marginTop: 5, height: 40, borderRadius: 20}}
            source={search}
          />
          {/* <Icon name="search" size={30} color="black" /> */}
        </View>
        {/* Image Carousel */}
        <Carousel />
        {/* Service Component */}
        <Services />
        {/* render semua product */}
        {product.map((item, index) => {
          return <DressItem item={item} key={index} />;
        })}
      </ScrollView>
      {total === 0 ? null : (
        <Pressable
          style={{
            backgroundColor: '#088F8F',
            padding: 10,
            marginBottom: 40,
            margin: 15,
            borderRadius: 7,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text style={{fontSize: 17, fontWeight: '600', color: 'white'}}>
              {cart.length} items | Rp {total}
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: '400',
                color: 'white',
                marginVertical: 6,
              }}>
              perubahan biaya mungkin terjadi
            </Text>
          </View>

          <Pressable onPress={() => navigation.navigate('PickUp')}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: '600',
                color: 'white',
                marginBottom: 5,
                backgroundColor: 'red',
                padding: 10,
                borderRadius: 20,
              }}>
              Chekout
            </Text>
          </Pressable>
        </Pressable>
      )}
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
