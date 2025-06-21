import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Camera, Mic, Send, CircleCheck as CheckCircle } from 'lucide-react-native';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { sampleQuests } from '@/data/sampleQuests';
import { useAuth } from '@/contexts/AuthContext';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';

export default function QuestCompletionScreen() {
  const { questId } = useLocalSearchParams();
  const { user, addSparkPoints, completeQuest } = useAuth();
  const quest = sampleQuests.find(q => q.id === questId);

  const [reflection, setReflection] = useState('');
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [isCompleting, setIsCompleting] = useState(false);

  const emotions = [
    { id: 'grateful', label: 'Grateful', emoji: '🙏' },
    { id: 'peaceful', label: 'Peaceful', emoji: '☮️' },
    { id: 'accomplished', label: 'Accomplished', emoji: '🎯' },
    { id: 'inspired', label: 'Inspired', emoji: '✨' },
    { id: 'joyful', label: 'Joyful', emoji: '😊' },
    { id: 'confident', label: 'Confident', emoji: '💪' },
  ];

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

  const toggleEmotion = (emotionId: string) => {
    setSelectedEmotions(prev => 
      prev.includes(emotionId) 
        ? prev.filter(id => id !== emotionId)
        : [...prev, emotionId]
    );
  };

  const handleCompleteQuest = async () => {
    if (!reflection.trim()) {
      Alert.alert('Reflection Required', 'Please share your thoughts about this quest.');
      return;
    }

    setIsCompleting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Complete quest and add points
      completeQuest(quest.id, quest.sparkPoints);
      
      Alert.alert(
        'Quest Completed! 🎉',
        `Amazing work! You've earned ${quest.sparkPoints} Spark Points and grown a little more today.`,
        [
          {
            text: 'Continue',
            onPress: () => router.replace('/(tabs)'),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to complete quest. Please try again.');
    } finally {
      setIsCompleting(false);
    }
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
          />
          <ArrowLeft size={24} color="#FFFFFF" style={styles.backIcon} />
          
          <View style={styles.headerContent}>
            <CheckCircle size={48} color="#FFFFFF" />
            <Text style={styles.title}>Quest Complete!</Text>
            <Text style={styles.subtitle}>{quest.title}</Text>
          </View>
        </LinearGradient>

        {/* Celebration Image */}
        <Image
          source={{ uri: 'https://images.pexels.com/photos/1851415/pexels-photo-1851415.jpeg?auto=compress&cs=tinysrgb&w=800&h=300&fit=crop' }}
          style={styles.celebrationImage}
        />

        {/* Reflection Prompts */}
        <Card style={styles.promptsCard}>
          <Text style={styles.sectionTitle}>Reflect on Your Experience</Text>
          {quest.reflectionPrompts.map((prompt, index) => (
            <View key={index} style={styles.promptItem}>
              <Text style={styles.promptText}>• {prompt}</Text>
            </View>
          ))}
        </Card>

        {/* Reflection Input */}
        <Card style={styles.reflectionCard}>
          <Text style={styles.sectionTitle}>Share Your Thoughts</Text>
          <TextInput
            style={styles.reflectionInput}
            placeholder="How did this quest make you feel? What did you discover about yourself?"
            placeholderTextColor={colors.textLight}
            multiline
            numberOfLines={6}
            value={reflection}
            onChangeText={setReflection}
            textAlignVertical="top"
          />
          
          <View style={styles.mediaButtons}>
            <Button
              title="📷 Photo"
              onPress={() => Alert.alert('Coming Soon', 'Photo capture will be available soon!')}
              variant="outline"
              size="small"
              style={styles.mediaButton}
            />
            <Button
              title="🎤 Voice"
              onPress={() => Alert.alert('Coming Soon', 'Voice recording will be available soon!')}
              variant="outline"
              size="small"
              style={styles.mediaButton}
            />
          </View>
        </Card>

        {/* Emotions */}
        <Card style={styles.emotionsCard}>
          <Text style={styles.sectionTitle}>How are you feeling?</Text>
          <View style={styles.emotionsGrid}>
            {emotions.map((emotion) => (
              <Button
                key={emotion.id}
                title={`${emotion.emoji} ${emotion.label}`}
                onPress={() => toggleEmotion(emotion.id)}
                variant={selectedEmotions.includes(emotion.id) ? 'primary' : 'outline'}
                size="small"
                style={styles.emotionButton}
              />
            ))}
          </View>
        </Card>

        {/* Rewards Preview */}
        <Card style={styles.rewardsCard}>
          <Text style={styles.sectionTitle}>Quest Rewards</Text>
          <View style={styles.rewardItem}>
            <Text style={styles.rewardEmoji}>✨</Text>
            <View style={styles.rewardContent}>
              <Text style={styles.rewardTitle}>{quest.sparkPoints} Spark Points</Text>
              <Text style={styles.rewardDescription}>Use these to unlock amazing rewards!</Text>
            </View>
          </View>
          <View style={styles.rewardItem}>
            <Text style={styles.rewardEmoji}>🏆</Text>
            <View style={styles.rewardContent}>
              <Text style={styles.rewardTitle}>Growth Progress</Text>
              <Text style={styles.rewardDescription}>Another step in your self-discovery journey</Text>
            </View>
          </View>
        </Card>

        {/* Complete Button */}
        <View style={styles.buttonContainer}>
          <Button
            title={isCompleting ? 'Completing Quest...' : 'Complete Quest'}
            onPress={handleCompleteQuest}
            loading={isCompleting}
            size="large"
            style={styles.completeButton}
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
    paddingBottom: 32,
    alignItems: 'center',
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
    marginTop: 12,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: typography.sizes.base,
    fontFamily: typography.fonts.regular,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  celebrationImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  promptsCard: {
    margin: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: typography.sizes.lg,
    fontFamily: typography.fonts.semiBold,
    color: colors.text,
    marginBottom: 12,
  },
  promptItem: {
    marginBottom: 8,
  },
  promptText: {
    fontSize: typography.sizes.base,
    fontFamily: typography.fonts.regular,
    color: colors.textSecondary,
    lineHeight: typography.sizes.base * typography.lineHeights.relaxed,
  },
  reflectionCard: {
    marginHorizontal: 20,
    marginBottom: 16,
  },
  reflectionInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 16,
    fontSize: typography.sizes.base,
    fontFamily: typography.fonts.regular,
    color: colors.text,
    backgroundColor: colors.surface,
    minHeight: 120,
    marginBottom: 16,
  },
  mediaButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  mediaButton: {
    flex: 1,
  },
  emotionsCard: {
    marginHorizontal: 20,
    marginBottom: 16,
  },
  emotionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  emotionButton: {
    minWidth: 100,
  },
  rewardsCard: {
    marginHorizontal: 20,
    marginBottom: 16,
  },
  rewardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  rewardEmoji: {
    fontSize: 32,
    marginRight: 16,
  },
  rewardContent: {
    flex: 1,
  },
  rewardTitle: {
    fontSize: typography.sizes.base,
    fontFamily: typography.fonts.semiBold,
    color: colors.text,
    marginBottom: 4,
  },
  rewardDescription: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.regular,
    color: colors.textSecondary,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  completeButton: {
    width: '100%',
  },
});