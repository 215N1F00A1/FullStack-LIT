import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { useAuth } from '@/contexts/AuthContext';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';

export default function AuthScreen() {
  const { mode } = useLocalSearchParams();
  const [isSignIn, setIsSignIn] = useState(mode === 'signin');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async () => {
    if (!formData.email || !formData.password) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (!isSignIn) {
      if (!formData.firstName || !formData.lastName) {
        Alert.alert('Error', 'Please fill in all required fields');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        Alert.alert('Error', 'Passwords do not match');
        return;
      }
      if (formData.password.length < 6) {
        Alert.alert('Error', 'Password must be at least 6 characters');
        return;
      }
    }

    setLoading(true);
    try {
      if (isSignIn) {
        await signIn(formData.email, formData.password);
      } else {
        await signUp({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        });
      }
      router.replace('/onboarding');
    } catch (error) {
      Alert.alert('Error', error instanceof Error ? error.message : 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={colors.gradient.primary}
      style={styles.container}
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.title}>
              {isSignIn ? 'Welcome Back' : 'Join Solo Sparks'}
            </Text>
            <Text style={styles.subtitle}>
              {isSignIn 
                ? 'Continue your self-discovery journey' 
                : 'Start your personalized growth adventure'
              }
            </Text>
          </View>

          <Card style={styles.formCard}>
            {!isSignIn && (
              <>
                <View style={styles.nameRow}>
                  <View style={styles.nameField}>
                    <Text style={styles.label}>First Name</Text>
                    <TextInput
                      style={styles.input}
                      value={formData.firstName}
                      onChangeText={(text) => setFormData(prev => ({ ...prev, firstName: text }))}
                      placeholder="Enter first name"
                      placeholderTextColor={colors.textLight}
                    />
                  </View>
                  <View style={styles.nameField}>
                    <Text style={styles.label}>Last Name</Text>
                    <TextInput
                      style={styles.input}
                      value={formData.lastName}
                      onChangeText={(text) => setFormData(prev => ({ ...prev, lastName: text }))}
                      placeholder="Enter last name"
                      placeholderTextColor={colors.textLight}
                    />
                  </View>
                </View>
              </>
            )}

            <View style={styles.field}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={formData.email}
                onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
                placeholder="Enter your email"
                placeholderTextColor={colors.textLight}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                value={formData.password}
                onChangeText={(text) => setFormData(prev => ({ ...prev, password: text }))}
                placeholder="Enter your password"
                placeholderTextColor={colors.textLight}
                secureTextEntry
              />
            </View>

            {!isSignIn && (
              <View style={styles.field}>
                <Text style={styles.label}>Confirm Password</Text>
                <TextInput
                  style={styles.input}
                  value={formData.confirmPassword}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, confirmPassword: text }))}
                  placeholder="Confirm your password"
                  placeholderTextColor={colors.textLight}
                  secureTextEntry
                />
              </View>
            )}

            <Button
              title={loading ? 'Please wait...' : (isSignIn ? 'Sign In' : 'Create Account')}
              onPress={handleSubmit}
              loading={loading}
              size="large"
              style={styles.submitButton}
            />

            <View style={styles.switchContainer}>
              <Text style={styles.switchText}>
                {isSignIn ? "Don't have an account? " : "Already have an account? "}
              </Text>
              <Button
                title={isSignIn ? 'Sign Up' : 'Sign In'}
                onPress={() => setIsSignIn(!isSignIn)}
                variant="ghost"
                size="small"
                textStyle={styles.switchButtonText}
              />
            </View>
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: typography.sizes['3xl'],
    fontFamily: typography.fonts.bold,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: typography.sizes.base,
    fontFamily: typography.fonts.regular,
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.9,
  },
  formCard: {
    padding: 24,
  },
  nameRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  nameField: {
    flex: 1,
  },
  field: {
    marginBottom: 16,
  },
  label: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.medium,
    color: colors.text,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: typography.sizes.base,
    fontFamily: typography.fonts.regular,
    color: colors.text,
    backgroundColor: colors.surface,
  },
  submitButton: {
    marginTop: 8,
    marginBottom: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchText: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.regular,
    color: colors.textSecondary,
  },
  switchButtonText: {
    color: colors.primary,
    fontSize: typography.sizes.sm,
  },
});