import React from 'react'
import { Pressable, View, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'


function IconButton({ icon, size, color, onPress }) {
  return (
    <Pressable
      style={(({pressed}) => pressed ? styles.pressed : null)}
      onPress={onPress}
    >
      <View style={styles.buttonContainer}>
        <Ionicons name={icon} size={size} color={color}/>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 24,
    padding: 6,
    margin: 8,
  },
  pressed: {
    opacity: 0.75,
  }
});

export default IconButton