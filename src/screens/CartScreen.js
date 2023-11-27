/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  Pressable,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {decrementQty, incrementQty} from '../ProductReducer';
import search from '../assets/img/search.png';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {cleanCart, decrementQuantity, incrementQuantity} from '../CartReducer';
import {doc, setDoc} from 'firebase/firestore';
import img from '../assets/icon/back.png';
import {auth, db} from '../firebase';
const CartScreen = () => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.cart);
  const route = useRoute();
  const userUid = auth.currentUser.uid;
  const total = cart
    .map(item => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);
  const navigation = useNavigation();
  const placeOrder = async () => {
    navigation.navigate('Order');
    dispatch(cleanCart());
    await setDoc(
      doc(db, 'users', `${userUid}`),
      {
        orders: {...cart},
        pickUpDetails: route.params,
      },
      {
        merge: true,
      },
    );
  };
  return (
    <>
      <ScrollView style={{marginTop: 0}}>
        {total === 0 ? (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{marginTop: 40}}>Your Cart is Empty</Text>
          </View>
        ) : (
          <>
            <View
              style={{padding: 10, flexDirection: 'row', alignItems: 'center'}}>
              <Pressable
                onPress={() => navigation.goBack()}
                style={{marginRight: 'auto'}}>
                <Image style={{width: 40, height: 40}} source={img} />
              </Pressable>
              <Text
                style={{
                  textAlign: 'left',
                  marginRight: 100,
                  fontSize: 20,
                  fontWeight: 'bold',
                }}>
                Isi Keranjang anda
              </Text>
            </View>

            <Pressable
              style={{
                backgroundColor: 'white',
                borderRadius: 12,
                marginLeft: 10,
                marginRight: 10,
                padding: 14,
              }}>
              {cart.map((item, index) => (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginVertical: 12,
                  }}
                  key={index}>
                  <Text style={{width: 100, fontSize: 16, fontWeight: '500'}}>
                    {item.name}
                  </Text>

                  {/* - + button */}
                  <Pressable
                    style={{
                      flexDirection: 'row',
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      alignItems: 'center',
                      borderColor: '#BEBEBE',
                      borderWidth: 0.5,
                      borderRadius: 10,
                    }}>
                    <Pressable
                      onPress={() => {
                        dispatch(decrementQuantity(item)); // cart
                        dispatch(decrementQty(item)); // product
                      }}>
                      <Text
                        style={{
                          fontSize: 20,
                          color: '#088F8F',
                          paddingHorizontal: 6,
                          fontWeight: '600',
                        }}>
                        -
                      </Text>
                    </Pressable>

                    <Pressable>
                      <Text
                        style={{
                          fontSize: 19,
                          color: '#088F8F',
                          paddingHorizontal: 8,
                          fontWeight: '600',
                        }}>
                        {item.quantity}
                      </Text>
                    </Pressable>

                    <Pressable
                      onPress={() => {
                        dispatch(incrementQuantity(item)); // cart
                        dispatch(incrementQty(item)); //product
                      }}>
                      <Text
                        style={{
                          fontSize: 20,
                          color: '#088F8F',
                          paddingHorizontal: 6,
                          fontWeight: '600',
                        }}>
                        +
                      </Text>
                    </Pressable>
                  </Pressable>

                  <Text style={{fontSize: 16, fontWeight: '500'}}>
                    Rp {item.price * item.quantity}
                  </Text>
                </View>
              ))}
            </Pressable>
            <View style={{marginHorizontal: 10}}>
              <Text style={{fontSize: 16, fontWeight: 'bold', marginTop: 30}}>
                Detail Items
              </Text>
              <View
                style={{
                  backgroundColor: 'white',
                  borderRadius: 7,
                  padding: 10,
                  marginTop: 15,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{fontSize: 18, fontWeight: '400', color: 'gray'}}>
                    Item Total
                  </Text>
                  <Text style={{fontSize: 18, fontWeight: '400'}}>
                    Rp {total}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginVertical: 8,
                  }}>
                  <Text
                    style={{fontSize: 18, fontWeight: '400', color: 'gray'}}>
                    Biaya Pengiriman | 1.2KM
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '400',
                      color: '#088F8F',
                    }}>
                    FREE
                  </Text>
                </View>

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={{fontSize: 18, fontWeight: '500', color: 'gray'}}>
                    Gratis Ongkir
                  </Text>
                </View>

                <View
                  style={{
                    borderColor: 'gray',
                    height: 1,
                    borderWidth: 0.5,
                    marginTop: 10,
                  }}
                />

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginVertical: 10,
                  }}>
                  <Text
                    style={{fontSize: 18, fontWeight: '500', color: 'gray'}}>
                    {/* Tanggal Terpilih */}
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '400',
                      color: '#088F8F',
                    }}>
                    {/* {route.params.pickUpDate} */}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{fontSize: 18, fontWeight: '500', color: 'gray'}}>
                    Estimasi sampai Tujuan
                  </Text>

                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '400',
                      color: '#088F8F',
                    }}>
                    {route.params.no_Of_days}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginVertical: 10,
                  }}>
                  <Text
                    style={{fontSize: 18, fontWeight: '500', color: 'gray'}}>
                    Waktu Pemesanan
                  </Text>

                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '400',
                      color: '#088F8F',
                    }}>
                    {route.params.selectedTime}
                  </Text>
                </View>
                <View
                  style={{
                    borderColor: 'gray',
                    height: 1,
                    borderWidth: 0.5,
                    marginTop: 10,
                  }}
                />

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginVertical: 8,
                  }}>
                  <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                    Total Biaya
                  </Text>
                  <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                    Rp {total + 95}
                  </Text>
                </View>
              </View>
            </View>
          </>
        )}
      </ScrollView>
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
              {cart.length} items | Rp {total}
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: '400',
                color: 'white',
                marginVertical: 6,
              }}>
              biaya tambahan mungkin terjadi
            </Text>
          </View>
          <Pressable onPress={placeOrder}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: '600',
                color: 'white',
                marginBottom: 5,
                marginRight: 5,
                backgroundColor: 'red',
                padding: 10,
                borderRadius: 20,
              }}>
              Pesan
            </Text>
          </Pressable>
        </Pressable>
      )}
    </>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
