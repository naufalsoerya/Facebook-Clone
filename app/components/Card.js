import React from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";

function Card() {
  const { title, subtitle, buttonText, imageUrl, width } = this.props;
  return (
    <View style={[styles.container, { width: width - 2 * Card.Margin }]}>
      <Image
        source={{ uri: imageUrl }}
        style={{
          width: width - 2 * Card.Margin,
          height: width - 2 * Card.Margin,
        }}
      />
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => {}}>
            <Text>{buttonText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
