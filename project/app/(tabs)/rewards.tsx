import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Sparkles, Gift, Lock, Clock as Unlock, Info, Star } from 'lucide-react-native';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { useUserData } from '@/hooks/useUserData';
import { sampleRewards, rewardCategories } from '@/data/sampleRewards';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';

export default function RewardsScreen() {
  const { user } = useUserData();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredRewards = sampleRewards.filter(reward => {
    const categoryMatch = selectedCategory === 'all' || reward.category.id === selectedCategory;
    const levelMatch = user ? reward.unlockLevel <= user.level : false;
    return categoryMatch && levelMatch;
  });

  const handleRedeemReward = (reward: typeof sampleRewards[0]) => {
    if (!user) return;

    if (user.sparkPoints < reward.cost) {
      Alert.alert(
        'Insufficient Points 💫',
        `You need ${reward.cost - user.sparkPoints} more Spark Points to redeem this reward.\n\nKeep completing quests to earn more points!`,
        [
          { text: 'View Quests', onPress: () => {} },
          { text: 'OK', style: 'default' }
        ]
      );
      return;
    }

    Alert.alert(
      'Redeem Reward 🎉',
      `Are you sure you want to redeem "${reward.name}" for ${reward.cost} Spark Points?\n\nThis will unlock: ${reward.benefits.join(', ')}`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Redeem',
          onPress: () => {
            Alert.alert(
              'Reward Redeemed! 🎉',
              `Congratulations! You have successfully redeemed "${reward.name}"!\n\nCheck your profile to see your new benefits. Keep up the amazing work on your self-discovery journey!`
            );
          },
        },
      ]
    );
  };

  const handleRewardInfo = (reward: typeof sampleRewards[0]) => {
    Alert.alert(
      `ℹ️ ${reward.name}`,
      `${reward.description}\n\nBenefits:\n${reward.benefits.map(b => `• ${b}`).join('\n')}\n\nCost: ${reward.cost} Spark Points\nUnlock Level: ${reward.unlockLevel}`,
      [{ text: 'Got it!' }]
    );
  };

  const handleEarnMorePoints = () => {
    Alert.alert(
      '✨ Earn More Spark Points!',
      'Here are the best ways to earn Spark Points:\n\n• Complete daily quests (+25-75 points)\n• Submit thoughtful reflections (+10-25 points)\n• Maintain your streak (+bonus points)\n• Try new quest categories (+extra points)',
      [
        { text: 'View Quests', onPress: () => {} },
        { text: 'OK', style: 'default' }
      ]
    );
  };

  const handleSpecialOffers = () => {
    Alert.alert(
      '🌟 Special Offers',
      'Limited time offers and exclusive rewards will appear here! Keep checking back for amazing deals on premium features.',
      [{ text: 'Awesome!' }]
    );
  };

  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading rewards...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.title}>Rewards Store</Text>
              <Text style={styles.subtitle}>
                Redeem your Spark Points for amazing rewards
              </Text>
            </View>
            <TouchableOpacity onPress={handleSpecialOffers} style={styles.specialOffersButton}>
              <Star size={24} color={colors.warning} />
            </TouchableOpacity>
          </View>
          
          <Card style={styles.pointsCard}>
            <View style={styles.pointsContent}>
              <Sparkles size={24} color={colors.primary} />
              <View style={styles.pointsInfo}>
                <Text style={styles.pointsValue}>{user.sparkPoints}</Text>
                <Text style={styles.pointsLabel}>Spark Points Available</Text>
              </View>
              <Button
                title="Earn More"
                onPress={handleEarnMorePoints}
                variant="outline"
                size="small"
                style={styles.earnMoreButton}
              />
            </View>
          </Card>
        </View>

        {/* Categories Filter */}
        <View style={styles.categoriesSection}>
          <Text style={styles.categoriesTitle}>Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
            <TouchableOpacity
              style={[
                styles.categoryChip,
                selectedCategory === 'all' && styles.categoryChipActive
              ]}
              onPress={() => setSelectedCategory('all')}
            >
              <Text style={[
                styles.categoryChipText,
                selectedCategory === 'all' && styles.categoryChipTextActive
              ]}>
                All
              </Text>
            </TouchableOpacity>
            {rewardCategories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryChip,
                  selectedCategory === category.id && styles.categoryChipActive,
                  selectedCategory === category.id && { backgroundColor: category.color }
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Text style={[
                  styles.categoryChipText,
                  selectedCategory === category.id && styles.categoryChipTextActive
                ]}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Rewards List */}
        <View style={styles.rewardsList}>
          <Text style={styles.resultsCount}>
            {filteredRewards.length} reward{filteredRewards.length !== 1 ? 's' : ''} available
          </Text>

          {filteredRewards.map((reward) => {
            const canAfford = user.sparkPoints >= reward.cost;
            const isLocked = user.level < reward.unlockLevel;
            
            return (
              <TouchableOpacity 
                key={reward.id} 
                onPress={() => handleRewardInfo(reward)}
                activeOpacity={0.8}
              >
                <Card style={styles.rewardCard} elevated>
                  <View style={styles.rewardHeader}>
                    <View style={styles.rewardTitleRow}>
                      <Text style={styles.rewardName}>{reward.name}</Text>
                      <View style={styles.rewardHeaderActions}>
                        <TouchableOpacity 
                          onPress={() => handleRewardInfo(reward)}
                          style={styles.infoButton}
                        >
                          <Info size={16} color={colors.textSecondary} />
                        </TouchableOpacity>
                        <View style={styles.rewardCost}>
                          <Sparkles size={16} color={colors.primary} />
                          <Text style={styles.rewardCostText}>{reward.cost}</Text>
                        </View>
                      </View>
                    </View>
                    
                    <View style={styles.rewardMeta}>
                      <View style={[
                        styles.categoryBadge,
                        { backgroundColor: reward.category.color }
                      ]}>
                        <Text style={styles.categoryBadgeText}>{reward.category.name}</Text>
                      </View>
                      
                      {reward.isExclusive && (
                        <View style={styles.exclusiveBadge}>
                          <Text style={styles.exclusiveBadgeText}>EXCLUSIVE</Text>
                        </View>
                      )}
                    </View>
                  </View>

                  <Text style={styles.rewardDescription}>{reward.description}</Text>

                  <View style={styles.benefitsSection}>
                    <Text style={styles.benefitsTitle}>Benefits:</Text>
                    {reward.benefits.slice(0, 2).map((benefit, index) => (
                      <Text key={index} style={styles.benefitText}>• {benefit}</Text>
                    ))}
                    {reward.benefits.length > 2 && (
                      <TouchableOpacity onPress={() => handleRewardInfo(reward)}>
                        <Text style={styles.viewMoreBenefits}>View all benefits...</Text>
                      </TouchableOpacity>
                    )}
                  </View>

                  <View style={styles.rewardFooter}>
                    <View style={styles.rewardInfo}>
                      <Text style={styles.rewardInfoText}>
                        Level {reward.unlockLevel} required
                      </Text>
                      {reward.availability === 'limited' && reward.remainingCount && (
                        <Text style={styles.rewardInfoText}>
                          {reward.remainingCount} remaining
                        </Text>
                      )}
                    </View>

                    <Button
                      title={isLocked ? 'Locked' : canAfford ? 'Redeem' : 'Insufficient Points'}
                      onPress={() => handleRedeemReward(reward)}
                      disabled={isLocked || !canAfford}
                      size="small"
                      variant={canAfford && !isLocked ? 'primary' : 'outline'}
                      style={styles.redeemButton}
                    />
                  </View>
                </Card>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Locked Rewards Preview */}
        <View style={styles.lockedSection}>
          <Text style={styles.lockedTitle}>Unlock More Rewards</Text>
          <Text style={styles.lockedSubtitle}>
            Level up to access exclusive rewards!
          </Text>
          
          {sampleRewards
            .filter(reward => reward.unlockLevel > user.level)
            .slice(0, 3)
            .map((reward) => (
              <TouchableOpacity 
                key={reward.id} 
                onPress={() => Alert.alert(
                  `🔒 ${reward.name}`,
                  `This reward will unlock at Level ${reward.unlockLevel}!\n\nKeep completing quests to level up and unlock amazing rewards like this one.`
                )}
              >
                <Card style={styles.lockedCard}>
                  <View style={styles.lockedContent}>
                    <Lock size={20} color={colors.textLight} />
                    <View style={styles.lockedInfo}>
                      <Text style={styles.lockedName}>{reward.name}</Text>
                      <Text style={styles.lockedRequirement}>
                        Unlock at Level {reward.unlockLevel}
                      </Text>
                    </View>
                    <View style={styles.lockedCost}>
                      <Sparkles size={14} color={colors.textLight} />
                      <Text style={styles.lockedCostText}>{reward.cost}</Text>
                    </View>
                  </View>
                </Card>
              </TouchableOpacity>
            ))}
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
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  title: {
    fontSize: typography.sizes['3xl'],
    fontFamily: typography.fonts.bold,
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: typography.sizes.base,
    fontFamily: typography.fonts.regular,
    color: colors.textSecondary,
    lineHeight: typography.sizes.base * typography.lineHeights.relaxed,
  },
  specialOffersButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: colors.surface,
  },
  pointsCard: {
    backgroundColor: colors.surface,
  },
  pointsContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  pointsInfo: {
    flex: 1,
  },
  pointsValue: {
    fontSize: typography.sizes['2xl'],
    fontFamily: typography.fonts.bold,
    color: colors.text,
  },
  pointsLabel: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.regular,
    color: colors.textSecondary,
  },
  earnMoreButton: {
    minWidth: 80,
  },
  categoriesSection: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  categoriesTitle: {
    fontSize: typography.sizes.lg,
    fontFamily: typography.fonts.semiBold,
    color: colors.text,
    marginBottom: 12,
  },
  categoriesScroll: {
    marginLeft: -20,
    paddingLeft: 20,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: 8,
  },
  categoryChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryChipText: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.medium,
    color: colors.text,
  },
  categoryChipTextActive: {
    color: '#FFFFFF',
  },
  rewardsList: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  resultsCount: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.regular,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  rewardCard: {
    marginBottom: 16,
  },
  rewardHeader: {
    marginBottom: 12,
  },
  rewardTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  rewardName: {
    fontSize: typography.sizes.lg,
    fontFamily: typography.fonts.semiBold,
    color: colors.text,
    flex: 1,
    marginRight: 12,
  },
  rewardHeaderActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoButton: {
    padding: 4,
  },
  rewardCost: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rewardCostText: {
    fontSize: typography.sizes.base,
    fontFamily: typography.fonts.bold,
    color: colors.primary,
  },
  rewardMeta: {
    flexDirection: 'row',
    gap: 8,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryBadgeText: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fonts.medium,
    color: '#FFFFFF',
  },
  exclusiveBadge: {
    backgroundColor: colors.warning,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  exclusiveBadgeText: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fonts.bold,
    color: '#FFFFFF',
  },
  rewardDescription: {
    fontSize: typography.sizes.base,
    fontFamily: typography.fonts.regular,
    color: colors.textSecondary,
    lineHeight: typography.sizes.base * typography.lineHeights.relaxed,
    marginBottom: 16,
  },
  benefitsSection: {
    marginBottom: 16,
  },
  benefitsTitle: {
    fontSize: typography.sizes.base,
    fontFamily: typography.fonts.semiBold,
    color: colors.text,
    marginBottom: 8,
  },
  benefitText: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.regular,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  viewMoreBenefits: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.medium,
    color: colors.primary,
    marginTop: 4,
  },
  rewardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rewardInfo: {
    flex: 1,
  },
  rewardInfoText: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fonts.regular,
    color: colors.textLight,
    marginBottom: 2,
  },
  redeemButton: {
    minWidth: 120,
  },
  lockedSection: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  lockedTitle: {
    fontSize: typography.sizes.xl,
    fontFamily: typography.fonts.semiBold,
    color: colors.text,
    marginBottom: 4,
  },
  lockedSubtitle: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.regular,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  lockedCard: {
    backgroundColor: colors.surface,
    opacity: 0.7,
    marginBottom: 8,
  },
  lockedContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  lockedInfo: {
    flex: 1,
  },
  lockedName: {
    fontSize: typography.sizes.base,
    fontFamily: typography.fonts.medium,
    color: colors.textSecondary,
  },
  lockedRequirement: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.regular,
    color: colors.textLight,
  },
  lockedCost: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  lockedCostText: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.medium,
    color: colors.textLight,
  },
});