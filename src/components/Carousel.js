/* eslint-disable prettier/prettier */
import {StyleSheet, View, Text, ImageBackground} from 'react-native';
import React from 'react';
import {SliderBox} from 'react-native-image-slider-box';
import img from '../assets/img/snack2.jpg';
import img2 from '../assets/img/snack3.jpg';
import img3 from '../assets/img/snack.jpeg';
import img1 from '../assets/img/food.jpeg';
const Carousel = () => {
  const images = [img, img2, img1, img3];

  return (
    <View>
      <SliderBox
        images={images}
        autoPlay
        circleLoop
        dotColor={'#13274F'}
        inactiveDotColor="#90A4AE"
        ImageComponentStyle={{
          borderRadius: 6,
          width: '94%',
        }}></SliderBox>
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({});
