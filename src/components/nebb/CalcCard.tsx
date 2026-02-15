import React from 'react';
import { Pressable, StyleSheet, View, ViewStyle } from 'react-native';
import { Surface } from 'react-native-paper';

type CalcCardProps = {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle | ViewStyle[];
};

const styles = StyleSheet.create({
  liquidCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  pressable: {
    borderRadius: 20,
  },
  cardContent: {
    padding: 20,
  },
});

export const calcCardStyles = styles;

export function CalcCard({ children, onPress, style }: CalcCardProps) {
  const cardContent = (
    <Surface style={[styles.liquidCard, style]}>
      <View style={styles.cardContent}>{children}</View>
    </Surface>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        style={({ pressed }) => [styles.pressable, { opacity: pressed ? 0.85 : 1 }]}
      >
        {cardContent}
      </Pressable>
    );
  }

  return cardContent;
}
