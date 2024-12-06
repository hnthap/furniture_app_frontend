import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

type BigNoticeProps = {
  text: string;
}

export default function BigNotice({ text }: BigNoticeProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  text: {
    flex: 1,
    fontFamily: "regular",
    fontSize: 25,
    textAlign: "center",
    textAlignVertical: "center",
  },
})