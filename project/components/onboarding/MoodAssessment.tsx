import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { ProgressBar } from '@/components/common/ProgressBar';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { Mood } from '@/types';

interface MoodAssessmentProps {
  onComplete: (mood: Mood) => void;
  onBack: () => void;
}

interface MoodQuestion {
  key: keyof Omit<Mood, 'timestamp'>;
  question: string;
  lowLabel: string;
  highLabel: string;
}

const moodQuestions: MoodQuestion[] = [
  {
    key: 'energy',
    question: 'How energetic do you feel right now?',
    lowLabel: 'Very Tired',
    highLabel: 'Very Energetic',
  },
  {
    key: 'positivity',
    question: 'How positive is your mood today?',
    lowLabel: 'Very Negative',
    highLabel: 'Very Positive',
  },
  {
    key: 'stress',
    question: 'How stressed are you feeling?',
    lowLabel: 'Very Relaxed',
    highLabel: 'Very Stressed',
  },
  {
    key: 'motivation',
    question: 'How motivated do you feel to try new things?',
    lowLabel: 'Not Motivated',
    highLabel: 'Very Motivated',
  },
  {
    key: 'social',
    question: 'How much do you want to be around others?',
    lowLabel: 'Prefer Alone',
    highLabel: 'Very Social',
  },
];

export function MoodAssessment({ onComplete, onBack }: MoodAssessmentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Partial<Mood>>({});

  const progress = (currentQuestion + 1) / moodQuestions.length;
  const question = moodQuestions[currentQuestion];

  const handleAnswer = (value: number) => {
    const newAnswers = { ...answers, [question.key]: value };
    setAnswers(newAnswers);

    if (currentQuestion < moodQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Complete mood assessment
      const mood: Mood = {
        energy: newAnswers.energy || 5,
        positivity: newAnswers.positivity || 5,
        stress: newAnswers.stress || 5,
        motivation: newAnswers.motivation || 5,
        social: newAnswers.social || 5,
        timestamp: new Date().toISOString(),
      };
      onComplete(mood);
    }
  };

  return (
    <LinearGradient
      colors={colors.gradient.secondary}
      style={styles.container}
    >
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Mood Check-In</Text>
          <Text style={styles.subtitle}>
            Question {currentQuestion + 1} of {moodQuestions.length}
          </Text>
          <ProgressBar progress={progress} height={6} />
        </View>

        <Card style={styles.questionCard} elevated>
          <Text style={styles.questionText}>{question.question}</Text>
          
          <View style={styles.scaleContainer}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
              <Button
                key={value}
                title={value.toString()}
                onPress={() => handleAnswer(value)}
                variant={answers[question.key] === value ? 'primary' : 'outline'}
                size="small"
                style={styles.scaleButton}
              />
            ))}
          </View>

          <View style={styles.labelsContainer}>
            <Text style={styles.scaleLabel}>{question.lowLabel}</Text>
            <Text style={styles.scaleLabel}>{question.highLabel}</Text>
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
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 16,
    gap: 8,
  },
  scaleButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  scaleLabel: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.regular,
    color: colors.textSecondary,
    textAlign: 'center',
    flex: 1,
  },
  backButton: {
    marginBottom: 32,
  },
});