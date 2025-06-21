import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { ProgressBar } from '@/components/common/ProgressBar';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { PersonalityProfile } from '@/types';

interface PersonalityAssessmentProps {
  onComplete: (profile: PersonalityProfile) => void;
  onBack: () => void;
}

interface Question {
  id: string;
  text: string;
  trait: keyof PersonalityProfile;
  scale: 'introversion' | 'trait' | 'preference';
}

const questions: Question[] = [
  {
    id: 'q1',
    text: 'I prefer spending time alone rather than in large groups',
    trait: 'introversion',
    scale: 'introversion',
  },
  {
    id: 'q2',
    text: 'I enjoy trying new experiences and activities',
    trait: 'openness',
    scale: 'trait',
  },
  {
    id: 'q3',
    text: 'I like to plan things in advance and stick to schedules',
    trait: 'conscientiousness',
    scale: 'trait',
  },
  {
    id: 'q4',
    text: 'I feel energized when meeting new people',
    trait: 'extraversion',
    scale: 'trait',
  },
  {
    id: 'q5',
    text: 'I tend to trust others and assume good intentions',
    trait: 'agreeableness',
    scale: 'trait',
  },
  {
    id: 'q6',
    text: 'I often worry about things that might go wrong',
    trait: 'neuroticism',
    scale: 'trait',
  },
];

export function PersonalityAssessment({ onComplete, onBack }: PersonalityAssessmentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const progress = (currentQuestion + 1) / questions.length;
  const question = questions[currentQuestion];

  const handleAnswer = (value: number) => {
    const newAnswers = { ...answers, [question.id]: value };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate personality profile
      const profile: PersonalityProfile = {
        introversion: newAnswers.q1 || 5,
        openness: newAnswers.q2 || 5,
        conscientiousness: newAnswers.q3 || 5,
        extraversion: newAnswers.q4 || 5,
        agreeableness: newAnswers.q5 || 5,
        neuroticism: newAnswers.q6 || 5,
        emotionalNeeds: [
          { type: 'growth', intensity: 8 },
          { type: 'peace', intensity: 7 },
          { type: 'creativity', intensity: 6 },
        ],
        preferredActivityTypes: [
          { type: 'solo', preference: newAnswers.q1 || 5 },
          { type: 'creative', preference: newAnswers.q2 || 5 },
          { type: 'mindful', preference: 8 },
        ],
        selfCarePreferences: [
          { type: 'mental', preference: 9 },
          { type: 'emotional', preference: 8 },
          { type: 'physical', preference: 6 },
        ],
      };
      onComplete(profile);
    }
  };

  const scaleLabels = {
    1: 'Strongly Disagree',
    2: 'Disagree',
    3: 'Slightly Disagree',
    4: 'Neutral',
    5: 'Slightly Agree',
    6: 'Agree',
    7: 'Strongly Agree',
  };

  return (
    <LinearGradient
      colors={colors.gradient.primary}
      style={styles.container}
    >
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Personality Assessment</Text>
          <Text style={styles.subtitle}>
            Question {currentQuestion + 1} of {questions.length}
          </Text>
          <ProgressBar progress={progress} height={6} />
        </View>

        <Card style={styles.questionCard} elevated>
          <Text style={styles.questionText}>{question.text}</Text>
          
          <View style={styles.scaleContainer}>
            {[1, 2, 3, 4, 5, 6, 7].map((value) => (
              <Button
                key={value}
                title={value.toString()}
                onPress={() => handleAnswer(value)}
                variant={answers[question.id] === value ? 'primary' : 'outline'}
                size="small"
                style={styles.scaleButton}
              />
            ))}
          </View>

          <View style={styles.labelsContainer}>
            <Text style={styles.scaleLabel}>{scaleLabels[1]}</Text>
            <Text style={styles.scaleLabel}>{scaleLabels[7]}</Text>
          </View>
        </Card>

        {currentQuestion > 0 && (
          <Button
            title="Previous Question"
            onPress={() => setCurrentQuestion(currentQuestion - 1)}
            variant="ghost"
            style={styles.backButton}
          />
        )}
      </ScrollView>
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
  },
  header: {
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
    fontSize: typography.sizes.lg,
    fontFamily: typography.fonts.regular,
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.9,
    marginBottom: 16,
  },
  questionCard: {
    marginBottom: 24,
    padding: 24,
  },
  questionText: {
    fontSize: typography.sizes.xl,
    fontFamily: typography.fonts.medium,
    color: colors.text,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: typography.sizes.xl * typography.lineHeights.relaxed,
  },
  scaleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  scaleButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 2,
  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  scaleLabel: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fonts.regular,
    color: colors.textSecondary,
    textAlign: 'center',
    flex: 1,
  },
  backButton: {
    marginBottom: 32,
  },
});