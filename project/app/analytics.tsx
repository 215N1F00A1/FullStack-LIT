import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { ArrowLeft, TrendingUp, Calendar, Target, Award, Heart } from 'lucide-react-native';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { ProgressBar } from '@/components/common/ProgressBar';
import { useAuth } from '@/contexts/AuthContext';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';

export default function AnalyticsScreen() {
  const { user } = useAuth();

  if (!user) return null;

  const weeklyStats = [
    { label: 'Quests Completed', value: 5, total: 7, color: colors.primary },
    { label: 'Reflection Entries', value: 4, total: 5, color: colors.secondary },
    { label: 'Mood Check-ins', value: 6, total: 7, color: colors.accent },
    { label: 'Spark Points Earned', value: 350, total: 500, color: colors.warning },
  ];

  const growthAreas = [
    { area: 'Self-Awareness', progress: 85, improvement: '+12%' },
    { area: 'Emotional Intelligence', progress: 72, improvement: '+8%' },
    { area: 'Mindfulness', progress: 68, improvement: '+15%' },
    { area: 'Self-Care', progress: 91, improvement: '+5%' },
  ];

  const achievements = [
    { title: '7-Day Streak', description: 'Completed quests for 7 days straight', date: '2 days ago', icon: '🔥' },
    { title: 'Mindful Explorer', description: 'Completed 10 mindfulness quests', date: '1 week ago', icon: '🧘' },
    { title: 'Creative Soul', description: 'Completed 5 creative quests', date: '2 weeks ago', icon: '🎨' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={colors.gradient.accent}
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
            <Text style={styles.title}>Your Growth Analytics</Text>
            <Text style={styles.subtitle}>Track your self-discovery journey</Text>
          </View>
        </LinearGradient>

        {/* Weekly Overview */}
        <Card style={styles.overviewCard}>
          <Text style={styles.sectionTitle}>This Week's Progress</Text>
          {weeklyStats.map((stat, index) => (
            <View key={index} style={styles.statRow}>
              <View style={styles.statInfo}>
                <Text style={styles.statLabel}>{stat.label}</Text>
                <Text style={styles.statValue}>
                  {stat.value}{stat.total && `/${stat.total}`}
                </Text>
              </View>
              {stat.total && (
                <ProgressBar
                  progress={stat.value / stat.total}
                  height={8}
                  gradient={[stat.color, stat.color]}
                />
              )}
            </View>
          ))}
        </Card>

        {/* Growth Areas */}
        <Card style={styles.growthCard}>
          <Text style={styles.sectionTitle}>Growth Areas</Text>
          {growthAreas.map((area, index) => (
            <View key={index} style={styles.growthRow}>
              <View style={styles.growthHeader}>
                <Text style={styles.growthLabel}>{area.area}</Text>
                <View style={styles.growthStats}>
                  <Text style={styles.growthProgress}>{area.progress}%</Text>
                  <Text style={styles.growthImprovement}>{area.improvement}</Text>
                </View>
              </View>
              <ProgressBar
                progress={area.progress / 100}
                height={8}
                gradient={colors.gradient.primary}
              />
            </View>
          ))}
        </Card>

        {/* Mood Trends */}
        <Card style={styles.moodCard}>
          <Text style={styles.sectionTitle}>Mood Trends</Text>
          <View style={styles.moodGrid}>
            <View style={styles.moodItem}>
              <Text style={styles.moodEmoji}>⚡</Text>
              <Text style={styles.moodLabel}>Energy</Text>
              <Text style={styles.moodValue}>{user.currentMood.energy}/10</Text>
              <Text style={styles.moodTrend}>↗️ +1.2</Text>
            </View>
            <View style={styles.moodItem}>
              <Text style={styles.moodEmoji}>😊</Text>
              <Text style={styles.moodLabel}>Positivity</Text>
              <Text style={styles.moodValue}>{user.currentMood.positivity}/10</Text>
              <Text style={styles.moodTrend}>↗️ +0.8</Text>
            </View>
            <View style={styles.moodItem}>
              <Text style={styles.moodEmoji}>🎯</Text>
              <Text style={styles.moodLabel}>Motivation</Text>
              <Text style={styles.moodValue}>{user.currentMood.motivation}/10</Text>
              <Text style={styles.moodTrend}>↗️ +2.1</Text>
            </View>
            <View style={styles.moodItem}>
              <Text style={styles.moodEmoji}>😰</Text>
              <Text style={styles.moodLabel}>Stress</Text>
              <Text style={styles.moodValue}>{user.currentMood.stress}/10</Text>
              <Text style={styles.moodTrend}>↘️ -1.5</Text>
            </View>
          </View>
        </Card>

        {/* Recent Achievements */}
        <Card style={styles.achievementsCard}>
          <Text style={styles.sectionTitle}>Recent Achievements</Text>
          {achievements.map((achievement, index) => (
            <View key={index} style={styles.achievementRow}>
              <Text style={styles.achievementIcon}>{achievement.icon}</Text>
              <View style={styles.achievementContent}>
                <Text style={styles.achievementTitle}>{achievement.title}</Text>
                <Text style={styles.achievementDescription}>{achievement.description}</Text>
                <Text style={styles.achievementDate}>{achievement.date}</Text>
              </View>
            </View>
          ))}
        </Card>

        {/* Insights */}
        <Card style={styles.insightsCard}>
          <Text style={styles.sectionTitle}>Personal Insights</Text>
          <View style={styles.insightItem}>
            <Heart size={20} color={colors.primary} />
            <View style={styles.insightContent}>
              <Text style={styles.insightText}>
                You're most productive with creative quests in the evening. 
                Consider scheduling more creative activities during this time.
              </Text>
            </View>
          </View>
          <View style={styles.insightItem}>
            <TrendingUp size={20} color={colors.success} />
            <View style={styles.insightContent}>
              <Text style={styles.insightText}>
                Your mood significantly improves after completing mindfulness quests. 
                Keep up the great work!
              </Text>
            </View>
          </View>
        </Card>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <Button
            title="View Detailed Report"
            onPress={() => {}}
            variant="outline"
            style={styles.actionButton}
          />
          <Button
            title="Share Progress"
            onPress={() => {}}
            style={styles.actionButton}
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
  statRow: {
    marginBottom: 16,
  },
  statInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: typography.sizes.base,
    fontFamily: typography.fonts.regular,
    color: colors.text,
  },
  statValue: {
    fontSize: typography.sizes.base,
    fontFamily: typography.fonts.bold,
    color: colors.primary,
  },
  growthCard: {
    marginHorizontal: 20,
    marginBottom: 16,
  },
  growthRow: {
    marginBottom: 16,
  },
  growthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  growthLabel: {
    fontSize: typography.sizes.base,
    fontFamily: typography.fonts.medium,
    color: colors.text,
  },
  growthStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  growthProgress: {
    fontSize: typography.sizes.base,
    fontFamily: typography.fonts.bold,
    color: colors.text,
  },
  growthImprovement: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.medium,
    color: colors.success,
  },
  moodCard: {
    marginHorizontal: 20,
    marginBottom: 16,
  },
  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  moodItem: {
    width: '48%',
    alignItems: 'center',
    padding: 12,
    backgroundColor: colors.surface,
    borderRadius: 12,
  },
  moodEmoji: {
    fontSize: 24,
    marginBottom: 8,
  },
  moodLabel: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.regular,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  moodValue: {
    fontSize: typography.sizes.lg,
    fontFamily: typography.fonts.bold,
    color: colors.text,
    marginBottom: 4,
  },
  moodTrend: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fonts.medium,
    color: colors.success,
  },
  achievementsCard: {
    marginHorizontal: 20,
    marginBottom: 16,
  },
  achievementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  achievementIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: typography.sizes.base,
    fontFamily: typography.fonts.semiBold,
    color: colors.text,
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.regular,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  achievementDate: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fonts.regular,
    color: colors.textLight,
  },
  insightsCard: {
    marginHorizontal: 20,
    marginBottom: 16,
  },
  insightItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  insightContent: {
    flex: 1,
    marginLeft: 12,
  },
  insightText: {
    fontSize: typography.sizes.base,
    fontFamily: typography.fonts.regular,
    color: colors.text,
    lineHeight: typography.sizes.base * typography.lineHeights.relaxed,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 32,
    gap: 12,
  },
  actionButton: {
    width: '100%',
  },
});