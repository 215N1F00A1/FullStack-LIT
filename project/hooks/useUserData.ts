import { useState, useEffect } from 'react';
import { User, Quest, QuestCompletion, Analytics } from '@/types';

// Mock user data - in a real app, this would come from an API
const mockUser: User = {
  id: 'user-1',
  email: 'sarah@example.com',
  firstName: 'Sarah',
  lastName: 'Johnson',
  profilePicture: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
  sparkPoints: 1250,
  level: 8,
  joinDate: '2024-01-15',
  personalityProfile: {
    introversion: 6,
    openness: 8,
    conscientiousness: 7,
    extraversion: 4,
    agreeableness: 9,
    neuroticism: 3,
    emotionalNeeds: [
      { type: 'growth', intensity: 9 },
      { type: 'peace', intensity: 7 },
      { type: 'creativity', intensity: 8 },
    ],
    preferredActivityTypes: [
      { type: 'mindful', preference: 9 },
      { type: 'creative', preference: 8 },
      { type: 'solo', preference: 7 },
    ],
    selfCarePreferences: [
      { type: 'mental', preference: 9 },
      { type: 'emotional', preference: 8 },
      { type: 'spiritual', preference: 7 },
    ],
  },
  currentMood: {
    energy: 7,
    positivity: 8,
    stress: 3,
    motivation: 9,
    social: 4,
    timestamp: new Date().toISOString(),
  },
  streak: 12,
  completedQuests: ['sunset-reflection', 'creative-expression'],
  badges: [
    {
      id: 'first-quest',
      name: 'First Steps',
      description: 'Completed your first quest',
      icon: 'star',
      color: '#FFD700',
      unlockedAt: '2024-01-16',
      rarity: 'common',
    },
    {
      id: 'creative-soul',
      name: 'Creative Soul',
      description: 'Completed 5 creative quests',
      icon: 'palette',
      color: '#45B7D1',
      unlockedAt: '2024-01-20',
      rarity: 'rare',
    },
  ],
};

export function useUserData() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setUser(mockUser);
      setLoading(false);
    }, 1000);
  }, []);

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  const updateMood = (mood: User['currentMood']) => {
    if (user) {
      setUser({ ...user, currentMood: mood });
    }
  };

  const addSparkPoints = (points: number) => {
    if (user) {
      setUser({ ...user, sparkPoints: user.sparkPoints + points });
    }
  };

  const completeQuest = (questId: string, points: number) => {
    if (user) {
      setUser({
        ...user,
        completedQuests: [...user.completedQuests, questId],
        sparkPoints: user.sparkPoints + points,
        streak: user.streak + 1,
      });
    }
  };

  return {
    user,
    loading,
    updateUser,
    updateMood,
    addSparkPoints,
    completeQuest,
  };
}