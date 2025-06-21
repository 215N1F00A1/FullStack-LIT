import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Camera, Mic, Image as ImageIcon, Heart, Send } from 'lucide-react-native';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';

const emotionTags = [
  { id: 'grateful', label: 'Grateful', emoji: '🙏' },
  { id: 'peaceful', label: 'Peaceful', emoji: '☮️' },
  { id: 'accomplished', label: 'Accomplished', emoji: '🎯' },
  { id: 'inspired', label: 'Inspired', emoji: '✨' },
  { id: 'connected', label: 'Connected', emoji: '💝' },
  { id: 'creative', label: 'Creative', emoji: '🎨' },
  { id: 'confident', label: 'Confident', emoji: '💪' },
  { id: 'joyful', label: 'Joyful', emoji: '😊' },
];

const reflectionPrompts = [
  "What did this experience teach you about yourself?",
  "How did you feel during this quest?",
  "What would you do differently next time?",
  "What are you most grateful for right now?",
  "How has this contributed to your growth?",
  "What insights did you gain?",
];

export default function ReflectionsScreen() {
  const [reflectionText, setReflectionText] = useState('');
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);
  const [mediaAttachments, setMediaAttachments] = useState<string[]>([]);

  const toggleEmotion = (emotionId: string) => {
    setSelectedEmotions(prev => 
      prev.includes(emotionId) 
        ? prev.filter(id => id !== emotionId)
        : [...prev, emotionId]
    );
  };

  const handleAddPhoto = () => {
    Alert.alert(
      'Add Photo',
      'Choose an option',
      [
        { text: 'Camera', onPress: () => console.log('Open camera') },
        { text: 'Gallery', onPress: () => console.log('Open gallery') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleAddAudio = () => {
    Alert.alert('Voice Recording', 'This feature would open voice recording');
  };

  const handleSubmitReflection = () => {
    if (!reflectionText.trim()) {
      Alert.alert('Reflection Required', 'Please write something about your experience.');
      return;
    }

    const reflection = {
      text: reflectionText,
      emotions: selectedEmotions,
      prompt: selectedPrompt,
      media: mediaAttachments,
      timestamp: new Date().toISOString(),
    };

    console.log('Submitting reflection:', reflection);
    Alert.alert('Reflection Saved! ✨', 'Your reflection has been saved and you earned 25 Spark Points!');
    
    // Reset form
    setReflectionText('');
    setSelectedEmotions([]);
    setSelectedPrompt(null);
    setMediaAttachments([]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Reflect & Grow</Text>
          <Text style={styles.subtitle}>
            Share your thoughts, feelings, and insights from your quest
          </Text>
        </View>

        {/* Reflection Prompts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reflection Prompts</Text>
          <Text style={styles.sectionSubtitle}>Choose a prompt to get started (optional)</Text>
          
          {reflectionPrompts.map((prompt, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.promptCard,
                selectedPrompt === prompt && styles.promptCardSelected
              ]}
              onPress={() => setSelectedPrompt(selectedPrompt === prompt ? null : prompt)}
            >
              <Text style={[
                styles.promptText,
                selectedPrompt === prompt && styles.promptTextSelected
              ]}>
                {prompt}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Reflection Text */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Reflection</Text>
          {selectedPrompt && (
            <Card style={styles.selectedPromptCard}>
              <Text style={styles.selectedPromptText}>{selectedPrompt}</Text>
            </Card>
          )}
          
          <Card style={styles.textInputCard}>
            <TextInput
              style={styles.textInput}
              placeholder="Share your thoughts, insights, and feelings..."
              placeholderTextColor={colors.textLight}
              multiline
              numberOfLines={8}
              value={reflectionText}
              onChangeText={setReflectionText}
              textAlignVertical="top"
            />
          </Card>
        </View>

        {/* Media Attachments */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Add Media</Text>
          <Text style={styles.sectionSubtitle}>Capture the moment with photos or voice notes</Text>
          
          <View style={styles.mediaButtons}>
            <TouchableOpacity style={styles.mediaButton} onPress={handleAddPhoto}>
              <Camera size={24} color={colors.primary} />
              <Text style={styles.mediaButtonText}>Take Photo</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.mediaButton} onPress={handleAddPhoto}>
              <ImageIcon size={24} color={colors.secondary} />
              <Text style={styles.mediaButtonText}>From Gallery</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.mediaButton} onPress={handleAddAudio}>
              <Mic size={24} color={colors.accent} />
              <Text style={styles.mediaButtonText}>Voice Note</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Emotions Tags */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How are you feeling?</Text>
          <Text style={styles.sectionSubtitle}>Select emotions that resonate with your experience</Text>
          
          <View style={styles.emotionsContainer}>
            {emotionTags.map((emotion) => (
              <TouchableOpacity
                key={emotion.id}
                style={[
                  styles.emotionTag,
                  selectedEmotions.includes(emotion.id) && styles.emotionTagSelected
                ]}
                onPress={() => toggleEmotion(emotion.id)}
              >
                <Text style={styles.emotionEmoji}>{emotion.emoji}</Text>
                <Text style={[
                  styles.emotionLabel,
                  selectedEmotions.includes(emotion.id) && styles.emotionLabelSelected
                ]}>
                  {emotion.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Submit Button */}
        <View style={styles.submitSection}>
          <Button
            title="Save Reflection"
            onPress={handleSubmitReflection}
            size="large"
            style={styles.submitButton}
          />
          <Text style={styles.submitNote}>
            Complete reflections earn you Spark Points! ✨
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
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
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
  section: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: typography.sizes.xl,
    fontFamily: typography.fonts.semiBold,
    color: colors.text,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.regular,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  promptCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  promptCardSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  promptText: {
    fontSize: typography.sizes.base,
    fontFamily: typography.fonts.regular,
    color: colors.text,
    lineHeight: typography.sizes.base * typography.lineHeights.relaxed,
  },
  promptTextSelected: {
    color: '#FFFFFF',
  },
  selectedPromptCard: {
    backgroundColor: colors.primary,
    marginBottom: 16,
  },
  selectedPromptText: {
    fontSize: typography.sizes.base,
    fontFamily: typography.fonts.medium,
    color: '#FFFFFF',
    lineHeight: typography.sizes.base * typography.lineHeights.relaxed,
  },
  textInputCard: {
    padding: 0,
  },
  textInput: {
    fontSize: typography.sizes.base,
    fontFamily: typography.fonts.regular,
    color: colors.text,
    padding: 16,
    minHeight: 120,
    lineHeight: typography.sizes.base * typography.lineHeights.relaxed,
  },
  mediaButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  mediaButton: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  mediaButtonText: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.medium,
    color: colors.text,
    marginTop: 8,
  },
  emotionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  emotionTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  emotionTagSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  emotionEmoji: {
    fontSize: 16,
    marginRight: 6,
  },
  emotionLabel: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.medium,
    color: colors.text,
  },
  emotionLabelSelected: {
    color: '#FFFFFF',
  },
  submitSection: {
    paddingHorizontal: 20,
    paddingBottom: 32,
    alignItems: 'center',
  },
  submitButton: {
    width: '100%',
    marginBottom: 12,
  },
  submitNote: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.regular,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});