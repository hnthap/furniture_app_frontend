import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../constants';

type MediumButtonProps = {
  title: string;
  onPress: () => void;
}

export default function MediumButton({ title, onPress} : MediumButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    marginTop: SIZES.xxLarge,
    backgroundColor: COLORS.black,
    minWidth: SIZES.width / 3,
    flexDirection: "row",
    borderRadius: SIZES.large,
    height: SIZES.large * 2.5,
  },
  title: {
    color: COLORS.lightWhite,
    flex: 1,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 18,
    fontFamily: "regular",
    marginHorizontal: SIZES.small,
  },
});