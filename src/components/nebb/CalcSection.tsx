import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

type CalcSectionProps = {
  children: React.ReactNode;
  style?: ViewStyle;
};

export function CalcSection({ children, style }: CalcSectionProps) {
  return <View style={[styles.section, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
  },
});
