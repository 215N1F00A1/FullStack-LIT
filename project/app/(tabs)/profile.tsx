import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Calendar, TrendingUp, Award, Heart, Star, Settings } from 'lucide-react-native';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { ProgressBar } from '@/components/common/ProgressBar';
import { useUserData } from '@/hooks/useUserData';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';

export default function ProfileScreen() {
  const { user } = useUserData();

  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading your profile...</Text>
      </View>
    );
  }

  const joinedDate = new Date(user.joinDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const personalityData = [
    { label: 'Openness', value: user.personalityProfile.openness, color: colors.primary },
    { label: 'Conscientiousness', value: user.personalityProfile.conscientiousness, color: colors.secondary },
    { label: 'Extraversion', value: user.personalityProfile.extraversion, color: colors.accent },
    { label: 'Agreeableness', value: user.personalityProfile.agreeableness, color: colors.success },
    { label: 'Neuroticism', value: user.personalityProfile.neuroticism, color: colors.warning },
  ];

  const growthStats = [
    { label: 'Quests Completed', value: user.completedQuests.length, icon: TrendingUp },
    { label: 'Current Streak', value: user.streak, icon: Calendar },
    { label: 'Badges Earned', value: user.badges.length, icon: Award },
    { label: 'Spark Points', value: user.sparkPoints, icon: Star },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={colors.gradient.primary}
          style={styles.header}
        >
          <TouchableOpacity style={styles.settingsButton}>
            <Settings size={24} color="#FFFFFF" />
          </TouchableOpacity>
          
          <View style={styles.profileInfo}>
            <Image
              source={{ uri: user.profilePicture }}
              style={styles.profileImage}
            />
            <Text style={styles.profileName}>{user.firstName} {user.lastName}</Text>
            <Text style={styles.profileEmail}>{user.email}</Text>
            <Text style={styles.joinDate}>Sparking since {joinedDate}</Text>
          </View>

          <View style={styles.levelInfo}>
            <Text style={styles.levelText}>Level {user.level}</Text>
            <Text style={styles.levelDescription}>Self-Discovery Explorer</Text>
          </View>
        </LinearGradient>

        {/* Growth Statistics */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Growth Statistics</Text>
          <View style={styles.statsGrid}>
            {growthStats.map((stat, index) => (
              <Card key={index} style={styles.statCard}>
                <View style={styles.statContent}>
                  <stat.icon size={24} color={colors.primary} />
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </View>
              </Card>
            ))}
          </View>
        </View>

        {/* Personality Profile */}
        <View style={styles.personalitySection}>
          <Text style={styles.sectionTitle}>Personality Profile</Text>
          <Card style={styles.personalityCard}>
            {personalityData.map((trait, index) => (
              <View key={index} style={styles.traitRow}>
                <Text style={styles.traitLabel}>{trait.label}</Text>
                <View style={styles.traitBarContainer}>
                  <ProgressBar
                    progress={trait.value / 10}
                    height={8}
                    gradient={[trait.color, trait.color]}
                  />
                  <Text style={styles.traitValue}>{trait.value}/10</Text>
                </View>
              </View>
            ))}
          </Card>
        </View>

        {/* Current Mood */}
        <View style={styles.moodSection}>
          <Text style={styles.sectionTitle}>Current Mood</Text>
          <Card style={styles.moodCard}>
            <View style={styles.moodGrid}>
              <View style={styles.moodItem}>
                <Text style={styles.moodLabel}>Energy</Text>
                <Text style={styles.moodValue}>{user.currentMood.energy}/10</Text>
              </View>
              <View style={styles.moodItem}>
                <Text style={styles.moodLabel}>Positivity</Text>
                <Text style={styles.moodValue}>{user.currentMood.positivity}/10</Text>
              </View>
              <View style={styles.moodItem}>
                <Text style={styles.moodLabel}>Stress</Text>
                <Text style={styles.moodValue}>{user.currentMood.stress}/10</Text>
              </View>
              <View style={styles.moodItem}>
                <Text style={styles.moodLabel}>Motivation</Text>
                <Text style={styles.moodValue}>{user.currentMood.motivation}/10</Text>
              </View>
            </View>
            <Button
              title="Update Mood"
              onPress={() => {}}
              variant="outline"
              size="small"
              style={styles.updateMoodButton}
            />
          </Card>
        </View>

        {/* Achievements */}
        <View style={styles.achievementsSection}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.achievementsScroll}>
            {user.badges.map((badge) => (
              <Card key={badge.id} style={styles.achievementCard}>
                <Text style={styles.achievementEmoji}>🏆</Text>
                <Text style={styles.achievementName}>{badge.name}</Text>
                <Text style={styles.achievementDescription}>{badge.description}</Text>
                <View style={[styles.rarityBadge, { backgroundColor: colors.warning }]}>
                  <Text style={styles.rarityText}>{badge.rarity}</Text>
                </View>
              </Card>
            ))}
          </ScrollView>
        </View>

        {/* Emotional Needs */}
        <View style={styles.needsSection}>
          <Text style={styles.sectionTitle}>Emotional Needs</Text>
          <Card style={styles.needsCard}>
            {user.personalityProfile.emotionalNeeds.map((need, index) => (
              <View key={index} style={styles.needRow}>
                <Text style={styles.needLabel}>{need.type}</Text>
                <View style={styles.needBarContainer}>
                  <ProgressBar
                    progress={need.intensity / 10}
                    height={6}
                    gradient={colors.gradient.secondary}
                  />
                  <Text style={styles.needValue}>{need.intensity}/10</Text>
                </View>
              </View>
            ))}
          </Card>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsSection}>
          <Button
            title="Edit Profile"
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
    paddingBottom: 32,
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  settingsButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    marginBottom: 16,
  },
  profileName: {
    fontSize: typography.sizes['2xl'],
    fontFamily: typography.fonts.bold,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: typography.sizes.base,
    fontFamily: typography.fonts.regular,
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: 8,
  },
  joinDate: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.regular,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  levelInfo: {
    alignItems: 'center',
  },
  levelText: {
    fontSize: typography.sizes.xl,
    fontFamily: typography.fonts.bold,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  levelDescription: {
    fontSize: typography.sizes.base,
    fontFamily: typography.fonts.regular,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  statsSection: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 16,
  },
  sectionTitle: {
    fontSize: typography.sizes.xl,
    fontFamily: typography.fonts.bold,
    color: colors.text,
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    width: '48%',
    alignItems: 'center',
  },
  statContent: {
    alignItems: 'center',
    gap: 8,
  },
  statValue: {
    fontSize: typography.sizes.xl,
    fontFamily: typography.fonts.bold,
    color: colors.text,
  },
  statLabel: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.regular,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  personalitySection: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  personalityCard: {
    gap: 16,
  },
  traitRow: {
    gap: 8,
  },
  traitLabel: {
    fontSize: typography.sizes.base,
    fontFamily: typography.fonts.medium,
    color: colors.text,
  },
  traitBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  traitValue: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.semiBold,
    color: colors.textSecondary,
    minWidth: 30,
  },
  moodSection: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  moodCard: {
    gap: 16,
  },
  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  moodItem: {
    width: '48%',
    alignItems: 'center',
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
  },
  updateMoodButton: {
    marginTop: 8,
  },
  achievementsSection: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  achievementsScroll: {
    marginLeft: -20,
    paddingLeft: 20,
  },
  achievementCard: {
    width: 140,
    marginRight: 12,
    alignItems: 'center',
    position: 'relative',
  },
  achievementEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  achievementName: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.semiBold,
    color: colors.text,
    textAlign: 'center',
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fonts.regular,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 8,
  },
  rarityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  rarityText: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fonts.bold,
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  needsSection: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  needsCard: {
    gap: 12,
  },
  needRow: {
    gap: 8,
  },
  needLabel: {
    fontSize: typography.sizes.base,
    fontFamily: typography.fonts.medium,
    color: colors.text,
    textTransform: 'capitalize',
  },
  needBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  needValue: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.semiBold,
    color: colors.textSecondary,
    minWidth: 30,
  },
  actionsSection: {
    paddingHorizontal: 20,
    paddingBottom: 32,
    gap: 12,
  },
  actionButton: {
    width: '100%',
  },
});