import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Sparkles, Calendar, Target, TrendingUp, Settings, ChartBar as BarChart3, Bell, Share2, Heart } from 'lucide-react-native';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { ProgressBar } from '@/components/common/ProgressBar';
import { useAuth } from '@/contexts/AuthContext';
import { sampleQuests } from '@/data/sampleQuests';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';

export default function HomeScreen() {
  const { user, loading } = useAuth();
  const [selectedQuest, setSelectedQuest] = useState(sampleQuests[0]);
  const [showMotivation, setShowMotivation] = useState(false);

  if (loading || !user) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading your personalized experience...</Text>
      </View>
    );
  }

  const levelProgress = (user.sparkPoints % 100) / 100;
  const nextLevelPoints = Math.ceil(user.sparkPoints / 100) * 100;

  const motivationalQuotes = [
    "You are exactly where you need to be ✨",
    "Self-love is the greatest revolution 💝",
    "Your journey is uniquely beautiful 🌟",
    "Growth happens outside your comfort zone 🚀",
    "You are worthy of all the love you give others 💖"
  ];

  const handleShareProgress = () => {
    Alert.alert(
      'Share Your Journey! 🌟',
      `Amazing! You're Level ${user.level} with ${user.sparkPoints} Spark Points and a ${user.streak}-day streak! 🔥\n\nShare your self-discovery journey with friends?`,
      [
        { text: 'Maybe Later', style: 'cancel' },
        { 
          text: 'Share Progress', 
          onPress: () => Alert.alert('Shared! 📱', 'Your inspiring journey has been shared!')
        }
      ]
    );
  };

  const handleDailyMotivation = () => {
    const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    setShowMotivation(true);
    Alert.alert('Daily Motivation 💫', randomQuote, [
      { text: 'Thank You! 💝', onPress: () => setShowMotivation(false) }
    ]);
  };

  const handleStreakCelebration = () => {
    if (user.streak >= 7) {
      Alert.alert(
        '🔥 Streak Master! 🔥',
        `Incredible! You've maintained a ${user.streak}-day streak! You're building amazing habits and growing every day. Keep up the fantastic work!`,
        [
          { text: 'Share Achievement', onPress: handleShareProgress },
          { text: 'Continue Journey', style: 'default' }
        ]
      );
    } else {
      Alert.alert(
        'Building Your Streak! 💪',
        `You're on day ${user.streak}! Every day counts in your self-discovery journey. Keep going - you're doing amazing!`
      );
    }
  };

  const handleLevelCelebration = () => {
    Alert.alert(
      `🎉 Level ${user.level} Achiever! 🎉`,
      `You've reached Level ${user.level}! This represents real growth in your self-awareness journey. You're ${nextLevelPoints - user.sparkPoints} points away from the next level!`,
      [
        { text: 'View Rewards', onPress: () => router.push('/(tabs)/rewards') },
        { text: 'Continue Growing', style: 'default' }
      ]
    );
  };

  const handleNotifications = () => {
    Alert.alert(
      'Gentle Reminders 🔔',
      'Would you like us to send you loving reminders for your daily quests and mood check-ins?',
      [
        { text: 'Not Now', style: 'cancel' },
        { text: 'Yes, Please!', onPress: () => Alert.alert('Set! 💝', 'We\'ll send you gentle, encouraging reminders!') }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={colors.gradient.primary}
          style={styles.header}
        >
          <View style={styles.headerTop}>
            <TouchableOpacity onPress={() => router.push('/settings')}>
              <Settings size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <View style={styles.headerActions}>
              <TouchableOpacity onPress={handleNotifications} style={styles.headerAction}>
                <Bell size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleShareProgress} style={styles.headerAction}>
                <Share2 size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push('/analytics')}>
                <BarChart3 size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.headerContent}>
            <View style={styles.welcomeSection}>
              <TouchableOpacity onPress={handleDailyMotivation}>
                <Image
                  source={{ uri: user.profilePicture }}
                  style={styles.profileImage}
                />
              </TouchableOpacity>
              <View style={styles.welcomeText}>
                <Text style={styles.greeting}>Good morning, {user.firstName}!</Text>
                <TouchableOpacity onPress={handleDailyMotivation}>
                  <Text style={styles.subtitle}>Ready for today's spark? ✨</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.statsContainer}>
              <TouchableOpacity style={styles.statItem} onPress={() => router.push('/(tabs)/rewards')}>
                <Sparkles size={20} color="#FFFFFF" />
                <Text style={styles.statValue}>{user.sparkPoints}</Text>
                <Text style={styles.statLabel}>Spark Points</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.statItem} onPress={handleStreakCelebration}>
                <Target size={20} color="#FFFFFF" />
                <Text style={styles.statValue}>{user.streak}</Text>
                <Text style={styles.statLabel}>Day Streak</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.statItem} onPress={handleLevelCelebration}>
                <TrendingUp size={20} color="#FFFFFF" />
                <Text style={styles.statValue}>Level {user.level}</Text>
                <Text style={styles.statLabel}>Growth Level</Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>

        {/* Level Progress */}
        <Card style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Level Progress</Text>
            <TouchableOpacity onPress={handleLevelCelebration}>
              <Text style={styles.progressSubtitle}>
                {nextLevelPoints - user.sparkPoints} points to next level
              </Text>
            </TouchableOpacity>
          </View>
          <ProgressBar
            progress={levelProgress}
            height={12}
            gradient={colors.gradient.accent}
          />
        </Card>

        {/* Today's Quest */}
        <Card style={styles.questCard} elevated>
          <View style={styles.questHeader}>
            <Text style={styles.questTitle}>Today's Quest</Text>
            <View style={styles.questBadge}>
              <Text style={styles.questBadgeText}>{selectedQuest.sparkPoints} ✨</Text>
            </View>
          </View>

          <Text style={styles.questName}>{selectedQuest.title}</Text>
          <Text style={styles.questDescription}>{selectedQuest.description}</Text>

          <View style={styles.questMeta}>
            <View style={styles.questMetaItem}>
              <Calendar size={16} color={colors.textSecondary} />
              <Text style={styles.questMetaText}>{selectedQuest.duration}min</Text>
            </View>
            <View style={styles.questMetaItem}>
              <Text style={styles.questDifficulty}>{selectedQuest.difficulty}</Text>
            </View>
          </View>

          <View style={styles.questActions}>
            <Button
              title="Preview Quest"
              onPress={() => router.push(`/quest-details?questId=${selectedQuest.id}`)}
              variant="outline"
              size="small"
              style={styles.questActionButton}
            />
            <Button
              title="Start Quest"
              onPress={() => router.push(`/quest-details?questId=${selectedQuest.id}`)}
              style={styles.questActionButton}
            />
          </View>
        </Card>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity 
              style={styles.actionItem}
              onPress={() => router.push('/mood-tracker')}
            >
              <LinearGradient
                colors={colors.gradient.secondary}
                style={styles.actionGradient}
              >
                <Text style={styles.actionEmoji}>📝</Text>
                <Text style={styles.actionText}>Mood Check-in</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.actionItem}
              onPress={() => router.push('/(tabs)/quests')}
            >
              <LinearGradient
                colors={colors.gradient.warm}
                style={styles.actionGradient}
              >
                <Text style={styles.actionEmoji}>🎯</Text>
                <Text style={styles.actionText}>Browse Quests</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.actionItem}
              onPress={() => router.push('/(tabs)/rewards')}
            >
              <LinearGradient
                colors={colors.gradient.cool}
                style={styles.actionGradient}
              >
                <Text style={styles.actionEmoji}>💝</Text>
                <Text style={styles.actionText}>Rewards Store</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.actionItem}
              onPress={() => router.push('/analytics')}
            >
              <LinearGradient
                colors={colors.gradient.accent}
                style={styles.actionGradient}
              >
                <Text style={styles.actionEmoji}>📊</Text>
                <Text style={styles.actionText}>Progress</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {/* Motivation Section */}
        <Card style={styles.motivationCard}>
          <View style={styles.motivationHeader}>
            <Heart size={24} color={colors.primary} />
            <Text style={styles.motivationTitle}>Daily Inspiration</Text>
          </View>
          <Text style={styles.motivationText}>
            "Every small step you take in self-discovery is a victory worth celebrating. You're exactly where you need to be on your journey."
          </Text>
          <Button
            title="Get Daily Motivation"
            onPress={handleDailyMotivation}
            variant="outline"
            size="small"
            style={styles.motivationButton}
          />
        </Card>

        {/* Recent Achievements */}
        <View style={styles.achievementsSection}>
          <View style={styles.achievementsHeader}>
            <Text style={styles.sectionTitle}>Recent Achievements</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/profile')}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.achievementsScroll}>
            {user.badges.map((badge) => (
              <TouchableOpacity 
                key={badge.id} 
                onPress={() => Alert.alert(`🏆 ${badge.name}`, badge.description)}
              >
                <Card style={styles.badgeCard}>
                  <Text style={styles.badgeEmoji}>🏆</Text>
                  <Text style={styles.badgeName}>{badge.name}</Text>
                  <Text style={styles.badgeDescription}>{badge.description}</Text>
                </Card>
              </TouchableOpacity>
            ))}
          </ScrollView>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  loadingText: {
    fontSize: typography.sizes.lg,
    fontFamily: typography.fonts.medium,
    color: colors.textSecondary,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 16,
  },
  headerAction: {
    padding: 4,
  },
  headerContent: {
    gap: 20,
  },
  welcomeSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  welcomeText: {
    flex: 1,
  },
  greeting: {
    fontSize: typography.sizes.xl,
    fontFamily: typography.fonts.bold,
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: typography.sizes.base,
    fontFamily: typography.fonts.regular,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 16,
  },
  statItem: {
    alignItems: 'center',
    gap: 4,
    padding: 8,
    borderRadius: 12,
  },
  statValue: {
    fontSize: typography.sizes.lg,
    fontFamily: typography.fonts.bold,
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.regular,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  progressCard: {
    margin: 20,
    marginBottom: 16,
  },
  progressHeader: {
    marginBottom: 12,
  },
  progressTitle: {
    fontSize: typography.sizes.lg,
    fontFamily: typography.fonts.semiBold,
    color: colors.text,
  },
  progressSubtitle: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.regular,
    color: colors.textSecondary,
  },
  questCard: {
    margin: 20,
    marginTop: 0,
    marginBottom: 16,
  },
  questHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  questTitle: {
    fontSize: typography.sizes.lg,
    fontFamily: typography.fonts.semiBold,
    color: colors.text,
  },
  questBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  questBadgeText: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.semiBold,
    color: '#FFFFFF',
  },
  questName: {
    fontSize: typography.sizes.xl,
    fontFamily: typography.fonts.bold,
    color: colors.text,
    marginBottom: 8,
  },
  questDescription: {
    fontSize: typography.sizes.base,
    fontFamily: typography.fonts.regular,
    color: colors.textSecondary,
    lineHeight: typography.sizes.base * typography.lineHeights.relaxed,
    marginBottom: 16,
  },
  questMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  questMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  questMetaText: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.regular,
    color: colors.textSecondary,
  },
  questDifficulty: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.medium,
    color: colors.accent,
    textTransform: 'capitalize',
  },
  questActions: {
    flexDirection: 'row',
    gap: 12,
  },
  questActionButton: {
    flex: 1,
  },
  quickActions: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: typography.sizes.xl,
    fontFamily: typography.fonts.bold,
    color: colors.text,
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionItem: {
    width: '48%',
    borderRadius: 16,
    overflow: 'hidden',
  },
  actionGradient: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
  },
  actionEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  actionText: {
    fontSize: typography.sizes.base,
    fontFamily: typography.fonts.semiBold,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  motivationCard: {
    marginHorizontal: 20,
    marginBottom: 24,
    backgroundColor: colors.surface,
  },
  motivationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  motivationTitle: {
    fontSize: typography.sizes.lg,
    fontFamily: typography.fonts.semiBold,
    color: colors.text,
  },
  motivationText: {
    fontSize: typography.sizes.base,
    fontFamily: typography.fonts.regular,
    color: colors.textSecondary,
    lineHeight: typography.sizes.base * typography.lineHeights.relaxed,
    marginBottom: 16,
    fontStyle: 'italic',
  },
  motivationButton: {
    alignSelf: 'flex-start',
  },
  achievementsSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  achievementsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllText: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.medium,
    color: colors.primary,
  },
  achievementsScroll: {
    marginLeft: -20,
    paddingLeft: 20,
  },
  badgeCard: {
    width: 120,
    marginRight: 12,
    alignItems: 'center',
    padding: 16,
  },
  badgeEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  badgeName: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.semiBold,
    color: colors.text,
    textAlign: 'center',
    marginBottom: 4,
  },
  badgeDescription: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fonts.regular,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: typography.sizes.xs * typography.lineHeights.normal,
  },
});