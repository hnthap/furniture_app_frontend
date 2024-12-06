import { Image, StyleSheet, Text, View } from "react-native";
import { carouselStyles } from "./style";

// TODO: do according to https://docs.expo.dev/versions/latest/sdk/view-pager/

export default function Carousel() {
  const slides = [
    require("../../assets/images/fn1.jpg"),
    require("../../assets/images/fn2.jpg"),
    require("../../assets/images/fn4.jpg"),
  ];
  return (
    <View style={carouselStyles.container}>
      <Image style={carouselStyles.image} source={slides[0]} />
    </View>
  );
}
