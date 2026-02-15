import React, { useMemo } from 'react';
import { Platform } from 'react-native';
import { TextInput } from 'react-native-paper';
import { sanitizeNumberInput, SanitizeNumberOptions } from '../../utils/numberInput';

export type NumericFieldProps = {
  label: string;
  value: string;
  onChangeText: (next: string) => void;
  placeholder?: string;
  mode?: 'outlined' | 'flat';
  disabled?: boolean;
  /** Show a clear (X) icon when the field has content. */
  clearable?: boolean;
  /** If true, renders as read-only output. */
  readOnly?: boolean;
  /** Called when user submits via keyboard (Enter/Done). */
  onSubmitEditing?: () => void;
  /** Hint text under the input (Paper helper text uses separate component; we keep simple). */
  rightText?: string;
} & SanitizeNumberOptions;

export function NumericField({
  label,
  value,
  onChangeText,
  placeholder,
  mode = 'outlined',
  disabled,
  clearable = true,
  readOnly,
  allowNegative,
  maxDecimals,
  onSubmitEditing,
  rightText,
}: NumericFieldProps) {
  const keyboardType = useMemo(() => {
    // iOS numeric keyboard doesn't include decimal.
    // decimal-pad is best for decimals across iOS/Android.
    return Platform.OS === 'web' ? 'default' : 'decimal-pad';
  }, []);

  const handleChange = (raw: string) => {
    onChangeText(sanitizeNumberInput(raw, { allowNegative, maxDecimals }));
  };

  const right = useMemo(() => {
    if (rightText) {
      return <TextInput.Affix text={rightText} />;
    }

    if (clearable && !readOnly && value) {
      return <TextInput.Icon icon="close" onPress={() => onChangeText('')} accessibilityLabel={`Clear ${label}`} />;
    }

    return null;
  }, [rightText, clearable, readOnly, value, label, onChangeText]);

  return (
    <TextInput
      label={label}
      value={value}
      onChangeText={handleChange}
      placeholder={placeholder}
      keyboardType={keyboardType as any}
      inputMode={Platform.OS === 'web' ? 'decimal' : undefined}
      autoCorrect={false}
      autoCapitalize="none"
      mode={mode}
      disabled={disabled}
      editable={!readOnly && !disabled}
      selectTextOnFocus={!readOnly}
      right={right}
      onSubmitEditing={onSubmitEditing}
      returnKeyType={onSubmitEditing ? 'done' : undefined}
      // Dark theme colors
      style={{ backgroundColor: '#1a1a1a' }}
      textColor="#FFFFFF"
      placeholderTextColor="#666666"
      outlineColor="#444444"
      activeOutlineColor="#007AFF"
      theme={{
        colors: {
          text: '#FFFFFF',
          placeholder: '#666666',
          background: '#1a1a1a',
          onSurfaceVariant: '#CCCCCC',
        }
      }}
    />
  );
}
