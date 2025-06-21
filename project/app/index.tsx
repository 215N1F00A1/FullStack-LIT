import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Button } from '@/components/common/Button';
import { useAuth } from '@/contexts/AuthContext';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';

export default function WelcomeScreen() {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (user) {
        if (user.hasCompletedOnboarding) {
          router.replace('/(tabs)');
        } else {
          router.replace('/onboarding');
        }
      }
    }
  }, [user, loading]);

  if (loading) {
    return (
      <LinearGradient
        colors={colors.gradient.primary}
        style={styles.container}
      >
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Solo Sparks</Text>
          <Text style={styles.loadingSubtext}>Loading your journey...</Text>
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
          style={styles.heroImage}
        />
        
        <View style={styles.textContainer}>
          <Text style={styles.title}>Solo Sparks</Text>
          <Text style={styles.subtitle}>
            Discover yourself through personalized quests designed to help you grow, 
            reflect, and fall in love with who you are.
          </Text>
        </View>

        <View style={styles.features}>
          <View style={styles.feature}>
            <Text style={styles.featureText}>✨ Personalized growth quests</Text>
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

        <View style={styles.buttonContainer}>
          <Button
            title="Get Started"
            onPress={() => router.push('/auth')}
            size="large"
            style={styles.primaryButton}
          />
          <Button
            title="Sign In"
            onPress={() => router.push('/auth?mode=signin')}
            variant="outline"
            size="large"
            style={styles.secondaryButton}
          />
        </View>
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
    paddingBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: typography.sizes['4xl'],
    fontFamily: typography.fonts.bold,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  loadingSubtext: {
    fontSize: typography.sizes.lg,
    fontFamily: typography.fonts.regular,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  heroImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 32,
  },
  textContainer: {
    alignItems: 'center',
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
    lineHeight: typography.sizes.lg * typography.lineHeights.relaxed,
  },
  features: {
    marginBottom: 40,
    alignItems: 'center',
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
  buttonContainer: {
    width: '100%',
    gap: 16,
  },
  primaryButton: {
    width: '100%',
  },
  secondaryButton: {
    width: '100%',
    borderColor: '#FFFFFF',
  },
});