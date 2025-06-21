import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Clock, Star, MapPin, CircleCheck as CheckCircle, Heart, Share2, BookOpen } from 'lucide-react-native';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { sampleQuests } from '@/data/sampleQuests';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';

export default function QuestDetailsScreen() {
  const { questId } = useLocalSearchParams();
  const quest = sampleQuests.find(q => q.id === questId);
  const [isFavorited, setIsFavorited] = useState(false);

  if (!quest) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Quest not found</Text>
          <Button title="Go Back" onPress={() => router.back()} />
        </View>
      </SafeAreaView>
    );
  }

  const handleStartQuest = () => {
    Alert.alert(
      '🌟 Ready to Begin?',
      `You're about to start "${quest.title}". This quest will take approximately ${quest.duration} minutes and reward you with ${quest.sparkPoints} Spark Points.\n\nAre you ready to embark on this self-discovery journey?`,
      [
        { text: 'Not Yet', style: 'cancel' },
        { 
          text: 'Let\'s Go!', 
          onPress: () => router.push(`/quest-completion?questId=${quest.id}`)
        }
      ]
    );
  };

  const handleFavoriteQuest = () => {
    setIsFavorited(!isFavorited);
    Alert.alert(
      isFavorited ? '💔 Removed from Favorites' : '💝 Added to Favorites!',
      isFavorited 
        ? 'This quest has been removed from your favorites.'
        : 'This quest has been saved to your favorites for easy access.'
    );
  };

  const handleShareQuest = () => {
    Alert.alert(
      '📱 Share Quest',
      `Share "${quest.title}" with friends who might enjoy this self-discovery journey!`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Share', onPress: () => Alert.alert('Shared! 🌟', 'Quest shared successfully!') }
      ]
    );
  };

  const handleQuestTips = () => {
    Alert.alert(
      '💡 Quest Tips',
      `Tips for "${quest.title}":\n\n• Take your time and be present\n• Be honest in your reflections\n• Don't worry about being perfect\n• Focus on the experience, not the outcome\n• Remember: this is your unique journey`,
      [{ text: 'Got it! 💪' }]
    );
  };

  const handlePreviewReflection = () => {
    Alert.alert(
      '📝 Reflection Preview',
      `After completing this quest, you'll reflect on:\n\n${quest.reflectionPrompts.map((prompt, index) => `${index + 1}. ${prompt}`).join('\n\n')}\n\nTake a moment to think about these questions as you complete your quest.`,
      [{ text: 'Understood!' }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={[quest.category.color, quest.category.color + '80']}
          style={styles.header}
        >
          <Button
            title=""
            onPress={() => router.back()}
            variant="ghost"
            size="small"
            style={styles.backButton}
            textStyle={{ color: '#FFFFFF' }}
          />
          <ArrowLeft size={24} color="#FFFFFF" style={styles.backIcon} />
          
          <View style={styles.headerActions}>
            <Button
              title=""
              onPress={handleFavoriteQuest}
              variant="ghost"
              size="small"
              style={styles.headerActionButton}
            />
            <Heart 
              size={24} 
              color={isFavorited ? colors.error : '#FFFFFF'} 
              fill={isFavorited ? colors.error : 'transparent'}
              style={styles.favoriteIcon} 
            />
            
            <Button
              title=""
              onPress={handleShareQuest}
              variant="ghost"
              size="small"
              style={styles.headerActionButton}
            />
            <Share2 size={24} color="#FFFFFF" style={styles.shareIcon} />
          </View>
          
          <View style={styles.headerContent}>
            <Text style={styles.questTitle}>{quest.title}</Text>
            <View style={styles.questMeta}>
              <View style={styles.metaItem}>
                <Star size={16} color="#FFFFFF" />
                <Text style={styles.metaText}>{quest.sparkPoints} Points</Text>
              </View>
              <View style={styles.metaItem}>
                <Clock size={16} color="#FFFFFF" />
                <Text style={styles.metaText}>{quest.duration}min</Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* Quest Image */}
        <Image
          source={{ uri: 'https://images.pexels.com/photos/1851415/pexels-photo-1851415.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop' }}
          style={styles.questImage}
        />

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <View style={styles.quickActions}>
            <Button
              title="💡 Quest Tips"
              onPress={handleQuestTips}
              variant="outline"
              size="small"
              style={styles.quickActionButton}
            />
            <Button
              title="📝 Preview Reflection"
              onPress={handlePreviewReflection}
              variant="outline"
              size="small"
              style={styles.quickActionButton}
            />
          </View>
        </View>

        {/* Description */}
        <Card style={styles.descriptionCard}>
          <Text style={styles.sectionTitle}>About This Quest</Text>
          <Text style={styles.description}>{quest.description}</Text>
          
          <View style={styles.badges}>
            <View style={[styles.badge, { backgroundColor: quest.category.color }]}>
              <Text style={styles.badgeText}>{quest.category.name}</Text>
            </View>
            <View style={[styles.badge, { backgroundColor: colors.warning }]}>
              <Text style={styles.badgeText}>{quest.difficulty}</Text>
            </View>
            {quest.isDaily && (
              <View style={[styles.badge, { backgroundColor: colors.accent }]}>
                <Text style={styles.badgeText}>Daily</Text>
              </View>
            )}
          </View>
        </Card>

        {/* Instructions */}
        <Card style={styles.instructionsCard}>
          <Text style={styles.sectionTitle}>How to Complete</Text>
          {quest.instructions.map((instruction, index) => (
            <View key={index} style={styles.instructionItem}>
              <View style={styles.instructionNumber}>
                <Text style={styles.instructionNumberText}>{index + 1}</Text>
              </View>
              <Text style={styles.instructionText}>{instruction}</Text>
            </View>
          ))}
        </Card>

        {/* Requirements */}
        {quest.requirements.length > 0 && (
          <Card style={styles.requirementsCard}>
            <Text style={styles.sectionTitle}>Requirements</Text>
            {quest.requirements.map((requirement, index) => (
              <View key={index} style={styles.requirementItem}>
                <MapPin size={16} color={colors.textSecondary} />
                <View style={styles.requirementContent}>
                  <Text style={styles.requirementTitle}>{requirement.type}</Text>
                  <Text style={styles.requirementDescription}>{requirement.description}</Text>
                </View>
              </View>
            ))}
          </Card>
        )}

        {/* Reflection Prompts */}
        <Card style={styles.promptsCard}>
          <View style={styles.promptsHeader}>
            <Text style={styles.sectionTitle}>Reflection Prompts</Text>
            <Button
              title="Preview"
              onPress={handlePreviewReflection}
              variant="outline"
              size="small"
              style={styles.previewButton}
            />
          </View>
          <Text style={styles.promptsSubtitle}>
            After completing the quest, you'll be asked to reflect on these questions:
          </Text>
          {quest.reflectionPrompts.map((prompt, index) => (
            <View key={index} style={styles.promptItem}>
              <Text style={styles.promptText}>• {prompt}</Text>
            </View>
          ))}
        </Card>

        {/* Motivation Card */}
        <Card style={styles.motivationCard}>
          <View style={styles.motivationHeader}>
            <BookOpen size={20} color={colors.primary} />
            <Text style={styles.motivationTitle}>Why This Quest Matters</Text>
          </View>
          <Text style={styles.motivationText}>
            This quest is designed to help you connect with yourself on a deeper level. 
            Every moment of self-discovery is a step toward understanding and loving who you are. 
            You're exactly where you need to be on this journey.
          </Text>
        </Card>

        {/* Start Button */}
        <View style={styles.buttonContainer}>
          <Button
            title="🌟 Start Your Quest"
            onPress={handleStartQuest}
            size="large"
            style={styles.startButton}
          />
          <Text style={styles.encouragementText}>
            Take your time and enjoy this moment of self-discovery ✨
          </Text>
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: typography.sizes.lg,
    fontFamily: typography.fonts.medium,
    color: colors.textSecondary,
    marginBottom: 20,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
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
  headerActions: {
    position: 'absolute',
    top: 20,
    right: 20,
    flexDirection: 'row',
    gap: 8,
    zIndex: 1,
  },
  headerActionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  favoriteIcon: {
    position: 'absolute',
    top: 28,
    right: 68,
    zIndex: 2,
  },
  shareIcon: {
    position: 'absolute',
    top: 28,
    right: 20,
    zIndex: 2,
  },
  headerContent: {
    marginTop: 20,
    alignItems: 'center',
  },
  questTitle: {
    fontSize: typography.sizes['2xl'],
    fontFamily: typography.fonts.bold,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
  },
  questMeta: {
    flexDirection: 'row',
    gap: 20,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.medium,
    color: '#FFFFFF',
  },
  questImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  quickActionsSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12,
  },
  quickActionButton: {
    flex: 1,
  },
  descriptionCard: {
    margin: 20,
    marginTop: 0,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: typography.sizes.lg,
    fontFamily: typography.fonts.semiBold,
    color: colors.text,
    marginBottom: 12,
  },
  description: {
    fontSize: typography.sizes.base,
    fontFamily: typography.fonts.regular,
    color: colors.textSecondary,
    lineHeight: typography.sizes.base * typography.lineHeights.relaxed,
    marginBottom: 16,
  },
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  badgeText: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fonts.semiBold,
    color: '#FFFFFF',
    textTransform: 'capitalize',
  },
  instructionsCard: {
    marginHorizontal: 20,
    marginBottom: 16,
  },
  instructionItem: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  instructionNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  instructionNumberText: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.bold,
    color: '#FFFFFF',
  },
  instructionText: {
    flex: 1,
    fontSize: typography.sizes.base,
    fontFamily: typography.fonts.regular,
    color: colors.text,
    lineHeight: typography.sizes.base * typography.lineHeights.relaxed,
  },
  requirementsCard: {
    marginHorizontal: 20,
    marginBottom: 16,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  requirementContent: {
    flex: 1,
    marginLeft: 8,
  },
  requirementTitle: {
    fontSize: typography.sizes.base,
    fontFamily: typography.fonts.semiBold,
    color: colors.text,
    textTransform: 'capitalize',
  },
  requirementDescription: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.regular,
    color: colors.textSecondary,
  },
  promptsCard: {
    marginHorizontal: 20,
    marginBottom: 16,
  },
  promptsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  previewButton: {
    minWidth: 80,
  },
  promptsSubtitle: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.regular,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  promptItem: {
    marginBottom: 8,
  },
  promptText: {
    fontSize: typography.sizes.base,
    fontFamily: typography.fonts.regular,
    color: colors.text,
    lineHeight: typography.sizes.base * typography.lineHeights.relaxed,
  },
  motivationCard: {
    marginHorizontal: 20,
    marginBottom: 16,
    backgroundColor: colors.surface,
  },
  motivationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  motivationTitle: {
    fontSize: typography.sizes.base,
    fontFamily: typography.fonts.semiBold,
    color: colors.text,
  },
  motivationText: {
    fontSize: typography.sizes.base,
    fontFamily: typography.fonts.regular,
    color: colors.textSecondary,
    lineHeight: typography.sizes.base * typography.lineHeights.relaxed,
    fontStyle: 'italic',
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 32,
    alignItems: 'center',
  },
  startButton: {
    width: '100%',
    marginBottom: 12,
  },
  encouragementText: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.regular,
    color: colors.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});