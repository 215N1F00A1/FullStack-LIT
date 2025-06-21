export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePicture?: string;
  sparkPoints: number;
  level: number;
  joinDate: string;
  hasCompletedOnboarding: boolean;
  personalityProfile: PersonalityProfile;
  currentMood: Mood;
  streak: number;
  completedQuests: string[];
  badges: Badge[];
}

export interface PersonalityProfile {
  introversion: number; // 1-10 scale
  openness: number;
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  neuroticism: number;
  emotionalNeeds: EmotionalNeed[];
  preferredActivityTypes: ActivityType[];
  selfCarePreferences: SelfCarePreference[];
}

export interface EmotionalNeed {
  type: 'connection' | 'adventure' | 'peace' | 'growth' | 'creativity' | 'accomplishment';
  intensity: number; // 1-10
}

export interface ActivityType {
  type: 'indoor' | 'outdoor' | 'social' | 'solo' | 'creative' | 'physical' | 'mindful';
  preference: number; // 1-10
}

export interface SelfCarePreference {
  type: 'physical' | 'mental' | 'emotional' | 'spiritual' | 'social';
  preference: number; // 1-10
}

export interface Mood {
  energy: number; // 1-10
  positivity: number; // 1-10
  stress: number; // 1-10
  motivation: number; // 1-10
  social: number; // 1-10
  timestamp: string;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  category: QuestCategory;
  difficulty: 'easy' | 'medium' | 'hard';
  duration: number; // in minutes
  sparkPoints: number;
  requirements: QuestRequirement[];
  instructions: string[];
  reflectionPrompts: string[];
  isDaily: boolean;
  isWeekly: boolean;
  isSpecial: boolean;
  targetPersonality: PersonalityProfile;
  targetMood: Mood;
  createdAt: string;
  completedBy: string[];
}

export interface QuestCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export interface QuestRequirement {
  type: 'time' | 'location' | 'weather' | 'mood' | 'energy';
  value: string;
  description: string;
}

export interface QuestCompletion {
  id: string;
  questId: string;
  userId: string;
  completedAt: string;
  reflection: Reflection;
  sparkPointsEarned: number;
  completionRating: number; // 1-5 stars
  tags: string[];
}

export interface Reflection {
  id: string;
  text?: string;
  images?: string[];
  audio?: string;
  emotions: string[];
  insights: string[];
  gratitude?: string;
  growth?: string;
  timestamp: string;
}

export interface Reward {
  id: string;
  name: string;
  description: string;
  category: RewardCategory;
  cost: number; // in spark points
  availability: 'limited' | 'unlimited';
  remainingCount?: number;
  isExclusive: boolean;
  unlockLevel: number;
  icon: string;
  benefits: string[];
}

export interface RewardCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  unlockedAt: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface GrowthMilestone {
  id: string;
  title: string;
  description: string;
  achievedAt: string;
  category: 'emotional' | 'social' | 'personal' | 'spiritual';
  metrics: {
    questsCompleted: number;
    streakDays: number;
    reflectionCount: number;
    sparkPointsEarned: number;
  };
}

export interface Analytics {
  userId: string;
  weeklyCompletionRate: number;
  favoriteQuestCategories: string[];
  moodTrends: MoodTrend[];
  growthAreas: GrowthArea[];
  streakHistory: StreakRecord[];
  engagementScore: number;
}

export interface MoodTrend {
  date: string;
  mood: Mood;
}

export interface GrowthArea {
  area: string;
  progress: number; // 0-100
  recommendations: string[];
}

export interface StreakRecord {
  startDate: string;
  endDate: string;
  length: number;
  type: 'current' | 'best' | 'recent';
}