import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Button } from '@/components/common/Button';
import { PersonalityAssessment } from '@/components/onboarding/PersonalityAssessment';
import { MoodAssessment } from '@/components/onboarding/MoodAssessment';
import { useAuth } from '@/contexts/AuthContext';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { PersonalityProfile, Mood } from '@/types';

type OnboardingStep = 'welcome' | 'personality' | 'mood' | 'complete';

export default function OnboardingScreen() {
  const { updateUser } = useAuth();
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('welcome');
  const [personalityProfile, setPersonalityProfile] = useState<PersonalityProfile | null>(null);
  const [mood, setMood] = useState<Mood | null>(null);

  const handlePersonalityComplete = (profile: PersonalityProfile) => {
    setPersonalityProfile(profile);
    setCurrentStep('mood');
  };

  const handleMoodComplete = (moodData: Mood) => {
    setMood(moodData);
    setCurrentStep('complete');
  };

  const handleComplete = () => {
    // Update user with onboarding data
    updateUser({
      hasCompletedOnboarding: true,
      personalityProfile: personalityProfile!,
      currentMood: mood!,
    });
    router.replace('/(tabs)');
  };

  if (currentStep === 'personality') {
    return (
      <PersonalityAssessment
        onComplete={handlePersonalityComplete}
        onBack={() => setCurrentStep('welcome')}
      />
    );
  }

  if (currentStep === 'mood') {
    return (
      <MoodAssessment
        onComplete={handleMoodComplete}
        onBack={() => setCurrentStep('personality')}
      />
    );
  }

  if (currentStep === 'complete') {
    return (
      <LinearGradient
        colors={colors.gradient.accent}
        style={styles.container}
      >
        <View style={styles.content}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/1851415/pexels-photo-1851415.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' }}
            style={styles.celebrationImage}
          />
          <Text style={styles.title}>You're All Set! ✨</Text>
          <Text style={styles.subtitle}>
            Your personalized Solo Sparks journey is ready to begin. 
            We've prepared quests tailored just for you.
          </Text>
          <Button
            title="Start My Journey"
            onPress={handleComplete}
            size="large"
            style={styles.button}
          />
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={colors.gradient.primary}
      style={styles.container}
    >
      <View style={styles.content}>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/1005324/pexels-photo-1005324.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' }}
          style={styles.welcomeImage}
        />
        <Text style={styles.title}>Welcome to Solo Sparks</Text>
        <Text style={styles.subtitle}>
          Discover yourself through personalized quests designed to help you grow, 
          reflect, and fall in love with who you are.
        </Text>
        <View style={styles.features}>
          <View style={styles.feature}>
            <Text style={styles.featureText}>🌟 Personalized growth quests</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureText}>💝 Earn Spark Points for rewards</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureText}>📱 Multi-media reflections</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureText}>📈 Track your emotional journey</Text>
          </View>
        </View>
        <Button
          title="Let's Get Started"
          onPress={() => setCurrentStep('personality')}
          size="large"
          style={styles.button}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 32,
  },
  celebrationImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 32,
  },
  title: {
    fontSize: typography.sizes['4xl'],
    fontFamily: typography.fonts.bold,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: typography.sizes.lg,
    fontFamily: typography.fonts.regular,
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.9,
    marginBottom: 32,
    lineHeight: typography.sizes.lg * typography.lineHeights.relaxed,
  },
  features: {
    marginBottom: 32,
  },
  feature: {
    marginBottom: 12,
  },
  featureText: {
    fontSize: typography.sizes.base,
    fontFamily: typography.fonts.medium,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  button: {
    marginTop: 16,
    minWidth: 200,
  },
});