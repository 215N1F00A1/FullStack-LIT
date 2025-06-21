import React, { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { User, Mood } from '@/types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (updates: Partial<User>) => void;
  updateMood: (mood: Mood) => void;
  addSparkPoints: (points: number) => void;
  completeQuest: (questId: string, points: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStoredUser();
  }, []);

  const loadStoredUser = async () => {
    try {
      const storedUser = await SecureStore.getItemAsync('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Error loading stored user:', error);
    } finally {
      setLoading(false);
    }
  };

  const storeUser = async (userData: User) => {
    try {
      await SecureStore.setItemAsync('user', JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error('Error storing user:', error);
    }
  };

  const signIn = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user data - in real app, this would come from API
    const mockUser: User = {
      id: 'user-1',
      email,
      firstName: 'Sarah',
      lastName: 'Johnson',
      profilePicture: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      sparkPoints: 1250,
      level: 8,
      joinDate: '2024-01-15',
      hasCompletedOnboarding: true,
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

    await storeUser(mockUser);
  };

  const signUp = async (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: `user-${Date.now()}`,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      profilePicture: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      sparkPoints: 0,
      level: 1,
      joinDate: new Date().toISOString(),
      hasCompletedOnboarding: false,
      personalityProfile: {
        introversion: 5,
        openness: 5,
        conscientiousness: 5,
        extraversion: 5,
        agreeableness: 5,
        neuroticism: 5,
        emotionalNeeds: [],
        preferredActivityTypes: [],
        selfCarePreferences: [],
      },
      currentMood: {
        energy: 5,
        positivity: 5,
        stress: 5,
        motivation: 5,
        social: 5,
        timestamp: new Date().toISOString(),
      },
      streak: 0,
      completedQuests: [],
      badges: [],
    };

    await storeUser(newUser);
  };

  const signOut = async () => {
    try {
      await SecureStore.deleteItemAsync('user');
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      storeUser(updatedUser);
    }
  };

  const updateMood = (mood: Mood) => {
    if (user) {
      const updatedUser = { ...user, currentMood: mood };
      storeUser(updatedUser);
    }
  };

  const addSparkPoints = (points: number) => {
    if (user) {
      const updatedUser = { 
        ...user, 
        sparkPoints: user.sparkPoints + points,
        level: Math.floor((user.sparkPoints + points) / 100) + 1
      };
      storeUser(updatedUser);
    }
  };

  const completeQuest = (questId: string, points: number) => {
    if (user) {
      const updatedUser = {
        ...user,
        completedQuests: [...user.completedQuests, questId],
        sparkPoints: user.sparkPoints + points,
        streak: user.streak + 1,
        level: Math.floor((user.sparkPoints + points) / 100) + 1,
      };
      storeUser(updatedUser);
    }
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    updateUser,
    updateMood,
    addSparkPoints,
    completeQuest,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}