import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { ArrowLeft, TrendingUp, Calendar } from 'lucide-react-native';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { ProgressBar } from '@/components/common/ProgressBar';
import { useAuth } from '@/contexts/AuthContext';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';

const moodCategories = [
  { key: 'energy', label: 'Energy Level', icon: '⚡', color: colors.warning },
  { key: 'positivity', label: 'Positivity', icon: '😊', color: colors.success },
  { key: 'stress', label: 'Stress Level', icon: '😰', color: colors.error },
  { key: 'motivation', label: 'Motivation', icon: '🎯', color: colors.primary },
  { key: 'social', label: 'Social Mood', icon: '👥', color: colors.secondary },
];

export default function MoodTrackerScreen() {
  const { user, updateMood } = useAuth();
  const [currentMood, setCurrentMood] = useState(user?.currentMood || {
    energy: 5,
    positivity: 5,
    stress: 5,
    motivation: 5,
    social: 5,
    timestamp: new Date().toISOString(),
  });

  const handleMoodChange = (category: string, value: number) => {
    setCurrentMood(prev => ({
      ...prev,
      [category]: value,
      timestamp: new Date().toISOString(),
    }));
  };

  const handleSaveMood = () => {
    updateMood(currentMood);
    router.back();
  };

  const getMoodDescription = (value: number) => {
    if (value <= 2) return 'Very Low';
    if (value <= 4) return 'Low';
    if (value <= 6) return 'Moderate';
    if (value <= 8) return 'Good';
    return 'Excellent';
  };

  const getMoodColor = (value: number) => {
    if (value <= 3) return colors.error;
    if (value <= 6) return colors.warning;
    return colors.success;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={colors.gradient.secondary}
          style={styles.header}
        >
          <Button
            title=""
            onPress={() => router.back()}
            variant="ghost"
            size="small"
            style={styles.backButton}
          />
          <ArrowLeft size={24} color="#FFFFFF" style={styles.backIcon} />
          
          <View style={styles.headerContent}>
            <Text style={styles.title}>Mood Tracker</Text>
            <Text style={styles.subtitle}>How are you feeling today?</Text>
          </View>
        </LinearGradient>

        {/* Current Mood Overview */}
        <Card style={styles.overviewCard}>
          <Text style={styles.sectionTitle}>Today's Mood Summary</Text>
          <View style={styles.moodSummary}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Overall</Text>
              <Text style={[
                styles.summaryValue,
                { color: getMoodColor(Object.values(currentMood).slice(0, 5).reduce((a, b) => a + b, 0) / 5) }
              ]}>
                {getMoodDescription(Object.values(currentMood).slice(0, 5).reduce((a, b) => a + b, 0) / 5)}
              </Text>
            </View>
            <View style={styles.summaryItem}>
              <Calendar size={20} color={colors.textSecondary} />
              <Text style={styles.summaryDate}>
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </Text>
            </View>
          </View>
        </Card>

        {/* Mood Categories */}
        {moodCategories.map((category) => (
          <Card key={category.key} style={styles.categoryCard}>
            <View style={styles.categoryHeader}>
              <View style={styles.categoryInfo}>
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text style={styles.categoryLabel}>{category.label}</Text>
              </View>
              <Text style={[
                styles.categoryValue,
                { color: getMoodColor(currentMood[category.key as keyof typeof currentMood] as number) }
              ]}>
                {currentMood[category.key as keyof typeof currentMood]}/10
              </Text>
            </View>
            
            <ProgressBar
              progress={(currentMood[category.key as keyof typeof currentMood] as number) / 10}
              height={8}
              gradient={[category.color, category.color]}
            />
            
            <View style={styles.scaleContainer}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                <Button
                  key={value}
                  title={value.toString()}
                  onPress={() => handleMoodChange(category.key, value)}
                  variant={currentMood[category.key as keyof typeof currentMood] === value ? 'primary' : 'outline'}
                  size="small"
                  style={styles.scaleButton}
                />
              ))}
            </View>
          </Card>
        ))}

        {/* Mood History */}
        <Card style={styles.historyCard}>
          <Text style={styles.sectionTitle}>Recent Trends</Text>
          <View style={styles.trendItem}>
            <TrendingUp size={20} color={colors.success} />
            <View style={styles.trendContent}>
              <Text style={styles.trendTitle}>Energy Levels</Text>
              <Text style={styles.trendDescription}>
                Your energy has been steadily improving over the past week!
              </Text>
            </View>
          </View>
          <View style={styles.trendItem}>
            <TrendingUp size={20} color={colors.primary} />
            <View style={styles.trendContent}>
              <Text style={styles.trendTitle}>Motivation</Text>
              <Text style={styles.trendDescription}>
                Great job maintaining high motivation levels consistently.
              </Text>
            </View>
          </View>
        </Card>

        {/* Save Button */}
        <View style={styles.buttonContainer}>
          <Button
            title="Save Mood Check-in"
            onPress={handleSaveMood}
            size="large"
            style={styles.saveButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 32,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  backIcon: {
    position: 'absolute',
    top: 28,
    left: 28,
    zIndex: 2,
  },
  headerContent: {
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: typography.sizes['2xl'],
    fontFamily: typography.fonts.bold,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: typography.sizes.base,
    fontFamily: typography.fonts.regular,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  overviewCard: {
    margin: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: typography.sizes.lg,
    fontFamily: typography.fonts.semiBold,
    color: colors.text,
    marginBottom: 16,
  },
  moodSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.regular,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: typography.sizes.lg,
    fontFamily: typography.fonts.bold,
  },
  summaryDate: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.regular,
    color: colors.textSecondary,
    marginLeft: 8,
  },
  categoryCard: {
    marginHorizontal: 20,
    marginBottom: 16,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  categoryLabel: {
    fontSize: typography.sizes.base,
    fontFamily: typography.fonts.medium,
    color: colors.text,
  },
  categoryValue: {
    fontSize: typography.sizes.lg,
    fontFamily: typography.fonts.bold,
  },
  scaleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginTop: 16,
  },
  scaleButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  historyCard: {
    marginHorizontal: 20,
    marginBottom: 16,
  },
  trendItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  trendContent: {
    flex: 1,
    marginLeft: 12,
  },
  trendTitle: {
    fontSize: typography.sizes.base,
    fontFamily: typography.fonts.semiBold,
    color: colors.text,
    marginBottom: 4,
  },
  trendDescription: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.regular,
    color: colors.textSecondary,
    lineHeight: typography.sizes.sm * typography.lineHeights.relaxed,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  saveButton: {
    width: '100%',
  },
});