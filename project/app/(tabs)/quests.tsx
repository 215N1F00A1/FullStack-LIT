import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Search, Filter, Clock, Star, Heart, Shuffle, BookOpen } from 'lucide-react-native';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { sampleQuests } from '@/data/sampleQuests';
import { questCategories } from '@/data/questCategories';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';

export default function QuestsScreen() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [showFavorites, setShowFavorites] = useState(false);

  const filteredQuests = sampleQuests.filter(quest => {
    const categoryMatch = selectedCategory === 'all' || quest.category.id === selectedCategory;
    const difficultyMatch = selectedDifficulty === 'all' || quest.difficulty === selectedDifficulty;
    return categoryMatch && difficultyMatch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return colors.success;
      case 'medium': return colors.warning;
      case 'hard': return colors.error;
      default: return colors.textSecondary;
    }
  };

  const getCategoryColor = (categoryId: string) => {
    const category = questCategories.find(cat => cat.id === categoryId);
    return category?.color || colors.primary;
  };

  const handleRandomQuest = () => {
    const randomQuest = sampleQuests[Math.floor(Math.random() * sampleQuests.length)];
    Alert.alert(
      '🎲 Random Quest Selected!',
      `"${randomQuest.title}"\n\n${randomQuest.description}`,
      [
        { text: 'Pick Another', onPress: handleRandomQuest },
        { text: 'Start This Quest', onPress: () => router.push(`/quest-details?questId=${randomQuest.id}`) }
      ]
    );
  };

  const handleQuestPreview = (quest: typeof sampleQuests[0]) => {
    Alert.alert(
      `✨ ${quest.title}`,
      `${quest.description}\n\n⏱️ Duration: ${quest.duration} minutes\n🌟 Difficulty: ${quest.difficulty}\n✨ Spark Points: ${quest.sparkPoints}`,
      [
        { text: 'View Details', onPress: () => router.push(`/quest-details?questId=${quest.id}`) },
        { text: 'Start Quest', onPress: () => router.push(`/quest-details?questId=${quest.id}`) }
      ]
    );
  };

  const handleFavoriteQuest = (questId: string) => {
    Alert.alert('💝 Added to Favorites!', 'This quest has been saved to your favorites for easy access.');
  };

  const handleQuestTips = () => {
    Alert.alert(
      '💡 Quest Tips',
      '• Start with easier quests to build confidence\n• Take your time with reflections\n• Be honest about your feelings\n• Celebrate small victories\n• Remember: this is your unique journey',
      [{ text: 'Got it! 💪' }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.title}>Discover Quests</Text>
              <Text style={styles.subtitle}>
                Choose your next adventure in self-discovery
              </Text>
            </View>
            <View style={styles.headerActions}>
              <TouchableOpacity onPress={handleQuestTips} style={styles.headerAction}>
                <BookOpen size={24} color={colors.primary} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleRandomQuest} style={styles.headerAction}>
                <Shuffle size={24} color={colors.primary} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <View style={styles.quickActions}>
            <Button
              title="🎲 Random Quest"
              onPress={handleRandomQuest}
              variant="outline"
              size="small"
              style={styles.quickActionButton}
            />
            <Button
              title="💡 Quest Tips"
              onPress={handleQuestTips}
              variant="outline"
              size="small"
              style={styles.quickActionButton}
            />
          </View>
        </View>

        {/* Categories Filter */}
        <View style={styles.filtersSection}>
          <Text style={styles.filterTitle}>Categories</Text>
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
            {questCategories.map((category) => (
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

        {/* Difficulty Filter */}
        <View style={styles.filtersSection}>
          <Text style={styles.filterTitle}>Difficulty</Text>
          <View style={styles.difficultyFilter}>
            {['all', 'easy', 'medium', 'hard'].map((difficulty) => (
              <TouchableOpacity
                key={difficulty}
                style={[
                  styles.difficultyChip,
                  selectedDifficulty === difficulty && styles.difficultyChipActive
                ]}
                onPress={() => setSelectedDifficulty(difficulty)}
              >
                <Text style={[
                  styles.difficultyChipText,
                  selectedDifficulty === difficulty && styles.difficultyChipTextActive
                ]}>
                  {difficulty === 'all' ? 'All' : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quests List */}
        <View style={styles.questsList}>
          <Text style={styles.resultsCount}>
            {filteredQuests.length} quest{filteredQuests.length !== 1 ? 's' : ''} found
          </Text>
          
          {filteredQuests.map((quest) => (
            <TouchableOpacity 
              key={quest.id} 
              onPress={() => handleQuestPreview(quest)}
              activeOpacity={0.8}
            >
              <Card style={styles.questCard} elevated>
                <View style={styles.questHeader}>
                  <View style={styles.questTitleRow}>
                    <Text style={styles.questTitle}>{quest.title}</Text>
                    <View style={styles.questHeaderActions}>
                      <TouchableOpacity 
                        onPress={() => handleFavoriteQuest(quest.id)}
                        style={styles.favoriteButton}
                      >
                        <Heart size={20} color={colors.error} />
                      </TouchableOpacity>
                      <View style={styles.questPoints}>
                        <Star size={16} color={colors.warning} />
                        <Text style={styles.questPointsText}>{quest.sparkPoints}</Text>
                      </View>
                    </View>
                  </View>
                  
                  <View style={styles.questMeta}>
                    <View style={[
                      styles.categoryBadge,
                      { backgroundColor: getCategoryColor(quest.category.id) }
                    ]}>
                      <Text style={styles.categoryBadgeText}>{quest.category.name}</Text>
                    </View>
                    <View style={[
                      styles.difficultyBadge,
                      { backgroundColor: getDifficultyColor(quest.difficulty) }
                    ]}>
                      <Text style={styles.difficultyBadgeText}>{quest.difficulty}</Text>
                    </View>
                  </View>
                </View>

                <Text style={styles.questDescription}>{quest.description}</Text>

                <View style={styles.questInfo}>
                  <View style={styles.questInfoItem}>
                    <Clock size={16} color={colors.textSecondary} />
                    <Text style={styles.questInfoText}>{quest.duration} minutes</Text>
                  </View>
                  <Text style={styles.questType}>
                    {quest.isDaily ? 'Daily' : quest.isWeekly ? 'Weekly' : 'Anytime'}
                  </Text>
                </View>

                <View style={styles.questActions}>
                  <Button
                    title="View Details"
                    onPress={() => router.push(`/quest-details?questId=${quest.id}`)}
                    variant="outline"
                    size="small"
                    style={styles.questActionButton}
                  />
                  <Button
                    title="Start Quest"
                    onPress={() => router.push(`/quest-details?questId=${quest.id}`)}
                    size="small"
                    style={styles.questActionButton}
                  />
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
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
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
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  headerAction: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: colors.surface,
  },
  quickActionsSection: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12,
  },
  quickActionButton: {
    flex: 1,
  },
  filtersSection: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  filterTitle: {
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
  difficultyFilter: {
    flexDirection: 'row',
    gap: 8,
  },
  difficultyChip: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  difficultyChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  difficultyChipText: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.medium,
    color: colors.text,
  },
  difficultyChipTextActive: {
    color: '#FFFFFF',
  },
  questsList: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  resultsCount: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.regular,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  questCard: {
    marginBottom: 16,
  },
  questHeader: {
    marginBottom: 12,
  },
  questTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  questTitle: {
    fontSize: typography.sizes.lg,
    fontFamily: typography.fonts.semiBold,
    color: colors.text,
    flex: 1,
    marginRight: 12,
  },
  questHeaderActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  favoriteButton: {
    padding: 4,
  },
  questPoints: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  questPointsText: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.semiBold,
    color: colors.warning,
  },
  questMeta: {
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
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  difficultyBadgeText: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fonts.medium,
    color: '#FFFFFF',
    textTransform: 'capitalize',
  },
  questDescription: {
    fontSize: typography.sizes.base,
    fontFamily: typography.fonts.regular,
    color: colors.textSecondary,
    lineHeight: typography.sizes.base * typography.lineHeights.relaxed,
    marginBottom: 16,
  },
  questInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  questInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  questInfoText: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.regular,
    color: colors.textSecondary,
  },
  questType: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.medium,
    color: colors.accent,
  },
  questActions: {
    flexDirection: 'row',
    gap: 12,
  },
  questActionButton: {
    flex: 1,
  },
});