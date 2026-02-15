// Haptic feedback utility for calculations
import * as Haptics from 'expo-haptics';

export function triggerCalculationFeedback() {
  // Light haptic feedback when calculation completes
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
}

export function triggerSuccessFeedback() {
  // Success notification haptic
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
}

export function triggerErrorFeedback() {
  // Error notification haptic
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
}

export function triggerSelectionFeedback() {
  // Selection feedback for button presses
  Haptics.selectionAsync();
}
