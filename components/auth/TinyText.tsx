import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../constants';

type TinyTextProps = {
  text: string;
  onPress: () => void;
}

export default function TinyText({ text, onPress }: TinyTextProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    marginTop: SIZES.large * 2,
  },
  text: {
    fontFamily: "regular",
    fontSize: 15,
    color: COLORS.primary,
  },
})