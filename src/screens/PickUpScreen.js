/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Pressable,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import HorizontalDatepicker from '@awrminkhodaei/react-native-horizontal-datepicker';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const PickUpScreen = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const cart = useSelector(state => state.cart.cart);
  const total = cart
    .map(item => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);
  const [selectedTime, setSelectedTime] = useState([]);
  const [delivery, setDelivery] = useState([]);
  const deliveryTime = [
    {
      id: '0',
      name: '5-10 minutes',
    },
    {
      id: '1',
      name: '10-15 minutes',
    },
    {
      id: '2',
      name: '15-20 minutes',
    },
    {
      id: '3',
      name: '20-25 minutes',
    },
    {
      id: '4',
      name: '25-30 minutes',
    },
  ];

  const times = [
    {
      id: '0',
      time: '10:00 AM',
    },
    {
      id: '1',
      time: '11:00 AM',
    },
    {
      id: '2',
      time: '1:00 PM',
    },
    {
      id: '2',
      time: '2:00 PM',
    },
    {
      id: '4',
      time: '3:00 PM',
    },
    {
      id: '5',
      time: '4:00 PM',
    },
  ];
  const navigation = useNavigation();
  const proceedToCart = () => {
    if (!selectedDate || !selectedTime || !delivery) {
      Alert.alert(
        'Empty or invalid',
        'Please select all the fields',
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
    }
    if (selectedDate && selectedTime && delivery) {
      navigation.replace('Cart', {
        pickUpDate: selectedDate,
        selectedTime: selectedTime,
        no_Of_days: delivery,
      });
    }
  };

  return (
    <>
      <SafeAreaView>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '500',
            marginHorizontal: 10,
            marginLeft: 10,
          }}>
          Masukkan Alamat anda
        </Text>
        <TextInput
          style={{
            padding: 40,
            borderColor: 'gray',
            borderWidth: 0.7,
            paddingVertical: 80,
            borderRadius: 9,
            margin: 10,
          }}
        />

        <Text style={{fontSize: 16, fontWeight: '500', marginHorizontal: 10}}>
          Tanggal Pemesanan
        </Text>
        <HorizontalDatepicker
          mode="gregorian"
          startDate={new Date('2023-11-21')}
          endDate={new Date('2023-11-30')}
          initialSelectedDate={new Date('2020-08-22')}
          onSelectedDateChange={date => setSelectedDate(date)}
          selectedItemWidth={170}
          unselectedItemWidth={38}
          itemHeight={38}
          itemRadius={10}
          selectedItemTextStyle={styles.selectedItemTextStyle}
          unselectedItemTextStyle={styles.selectedItemTextStyle}
          selectedItemBackgroundColor="#222831"
          unselectedItemBackgroundColor="#ececec"
          flatListContainerStyle={styles.flatListContainerStyle}
        />

        <Text style={{fontSize: 16, fontWeight: '500', marginHorizontal: 10}}>
          Pilih Waktu
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {times.map((item, index) => (
            <Pressable
              key={index}
              onPress={() => setSelectedTime(item.time)}
              style={
                selectedTime.includes(item.time)
                  ? {
                      margin: 10,
                      borderRadius: 7,
                      padding: 15,
                      borderColor: 'red',
                      borderWidth: 0.7,
                    }
                  : {
                      margin: 10,
                      borderRadius: 7,
                      padding: 15,
                      borderColor: 'gray',
                      borderWidth: 0.7,
                    }
              }>
              <Text>{item.time}</Text>
            </Pressable>
          ))}
        </ScrollView>
        <Text style={{fontSize: 16, fontWeight: '500', marginHorizontal: 10}}>
          Estimasi Pengiriman
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {deliveryTime.map((item, i) => (
            <Pressable
              style={
                delivery.includes(item.name)
                  ? {
                      margin: 10,
                      borderRadius: 7,
                      padding: 15,
                      borderColor: 'red',
                      borderWidth: 0.7,
                    }
                  : {
                      margin: 10,
                      borderRadius: 7,
                      padding: 15,
                      borderColor: 'gray',
                      borderWidth: 0.7,
                    }
              }
              onPress={() => setDelivery(item.name)}
              key={i}>
              <Text>{item.name}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </SafeAreaView>

      {total === 0 ? null : (
        <Pressable
          style={{
            backgroundColor: '#088F8F',
            marginTop: 'auto',
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
              {cart.length} items | $ {total}
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: '400',
                color: 'white',
                marginVertical: 6,
              }}>
              Perubahan harga mungkin terjadi
            </Text>
          </View>

          <Pressable onPress={proceedToCart}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: '600',
                color: 'white',
                marginBottom: 5,
                marginRight: 5,
                backgroundColor: 'orange',
                padding: 10,
                borderRadius: 20,
              }}>
              Proses
            </Text>
          </Pressable>
        </Pressable>
      )}
    </>
  );
};

export default PickUpScreen;

const styles = StyleSheet.create({});
