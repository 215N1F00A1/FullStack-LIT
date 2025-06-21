import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/constants/colors';

interface ProgressBarProps {
  progress: number; // 0-1
  height?: number;
  backgroundColor?: string;
  gradient?: string[];
  animated?: boolean;
}

export function ProgressBar({
  progress,
  height = 8,
  backgroundColor = colors.border,
  gradient = colors.gradient.primary,
  animated = true,
}: ProgressBarProps) {
  const clampedProgress = Math.max(0, Math.min(1, progress));

  return (
    <View style={[styles.container, { height, backgroundColor }]}>
      <LinearGradient
        colors={gradient}
        style={[
          styles.progress,
          {
            width: `${clampedProgress * 100}%`,
            height,
          },
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    overflow: 'hidden',
  },
  progress: {
    borderRadius: 4,
  },
});