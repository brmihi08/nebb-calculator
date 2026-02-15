import React from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import * as Clipboard from 'expo-clipboard';

export type CopyableValueRowProps = {
  label: string;
  value: string;
  /** Optional full text to copy; defaults to `${label}: ${value}` */
  copyText?: string;
  onCopied?: () => void;
};

export function CopyableValueRow({ label, value, copyText, onCopied }: CopyableValueRowProps) {
  const doCopy = async () => {
    try {
      await Clipboard.setStringAsync(copyText ?? `${label}: ${value}`);
      onCopied?.();
    } catch {
      // ignore
    }
  };

  return (
    <View style={styles.row}>
      <View style={styles.textCol}>
        <Text style={styles.label}>{label}</Text>
        <Text selectable style={styles.value}>
          {value}
        </Text>
      </View>
      <IconButton icon="content-copy" onPress={doCopy} accessibilityLabel={`Copy ${label}`} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    paddingVertical: 4,
  },
  textCol: {
    flex: 1,
  },
  label: {
    fontSize: 13,
    opacity: 0.8,
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
  },
});
