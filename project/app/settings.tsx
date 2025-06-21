import React from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { ArrowLeft, Bell, Shield, User, CircleHelp as HelpCircle, LogOut, Moon, Smartphone } from 'lucide-react-native';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { useAuth } from '@/contexts/AuthContext';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';

export default function SettingsScreen() {
  const { user, signOut } = useAuth();

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: () => {
            signOut();
            router.replace('/');
          },
        },
      ]
    );
  };

  const settingSections = [
    {
      title: 'Account',
      items: [
        {
          icon: User,
          label: 'Edit Profile',
          onPress: () => Alert.alert('Coming Soon', 'Profile editing will be available soon!'),
        },
        {
          icon: Shield,
          label: 'Privacy & Security',
          onPress: () => Alert.alert('Coming Soon', 'Privacy settings will be available soon!'),
        },
      ],
    },
    {
      title: 'Notifications',
      items: [
        {
          icon: Bell,
          label: 'Quest Reminders',
          hasSwitch: true,
          value: true,
        },
        {
          icon: Smartphone,
          label: 'Mood Check-in Reminders',
          hasSwitch: true,
          value: true,
        },
      ],
    },
    {
      title: 'Preferences',
      items: [
        {
          icon: Moon,
          label: 'Dark Mode',
          hasSwitch: true,
          value: false,
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          icon: HelpCircle,
          label: 'Help & FAQ',
          onPress: () => Alert.alert('Help', 'Contact support at help@solosparks.com'),
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={colors.gradient.primary}
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
            <Text style={styles.title}>Settings</Text>
            <Text style={styles.subtitle}>Customize your Solo Sparks experience</Text>
          </View>
        </LinearGradient>

        {/* User Info */}
        <Card style={styles.userCard}>
          <View style={styles.userInfo}>
            <View style={styles.userAvatar}>
              <Text style={styles.userInitials}>
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </Text>
            </View>
            <View style={styles.userDetails}>
              <Text style={styles.userName}>{user?.firstName} {user?.lastName}</Text>
              <Text style={styles.userEmail}>{user?.email}</Text>
              <Text style={styles.userLevel}>Level {user?.level} • {user?.sparkPoints} Spark Points</Text>
            </View>
          </View>
        </Card>

        {/* Settings Sections */}
        {settingSections.map((section, sectionIndex) => (
          <Card key={sectionIndex} style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.items.map((item, itemIndex) => (
              <View key={itemIndex} style={styles.settingItem}>
                <View style={styles.settingLeft}>
                  <item.icon size={20} color={colors.textSecondary} />
                  <Text style={styles.settingLabel}>{item.label}</Text>
                </View>
                {item.hasSwitch ? (
                  <Switch
                    value={item.value}
                    onValueChange={() => {}}
                    trackColor={{ false: colors.border, true: colors.primary }}
                    thumbColor={item.value ? '#FFFFFF' : colors.textLight}
                  />
                ) : (
                  <Button
                    title=">"
                    onPress={item.onPress}
                    variant="ghost"
                    size="small"
                    style={styles.settingButton}
                    textStyle={styles.settingButtonText}
                  />
                )}
              </View>
            ))}
          </Card>
        ))}

        {/* Sign Out */}
        <View style={styles.signOutContainer}>
          <Button
            title="Sign Out"
            onPress={handleSignOut}
            variant="outline"
            size="large"
            style={styles.signOutButton}
            textStyle={styles.signOutText}
          />
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appVersion}>Solo Sparks v1.0.0</Text>
          <Text style={styles.appDescription}>
            Made with ❤️ for your self-discovery journey
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
    paddingBottom: 32,
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
    marginBottom: 8,
  },
  subtitle: {
    fontSize: typography.sizes.base,
    fontFamily: typography.fonts.regular,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  userCard: {
    margin: 20,
    marginBottom: 16,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  userInitials: {
    fontSize: typography.sizes.lg,
    fontFamily: typography.fonts.bold,
    color: '#FFFFFF',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: typography.sizes.lg,
    fontFamily: typography.fonts.semiBold,
    color: colors.text,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: typography.sizes.base,
    fontFamily: typography.fonts.regular,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  userLevel: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.medium,
    color: colors.primary,
  },
  sectionCard: {
    marginHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: typography.sizes.base,
    fontFamily: typography.fonts.semiBold,
    color: colors.text,
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingLabel: {
    fontSize: typography.sizes.base,
    fontFamily: typography.fonts.regular,
    color: colors.text,
    marginLeft: 12,
  },
  settingButton: {
    width: 30,
    height: 30,
  },
  settingButtonText: {
    color: colors.textSecondary,
    fontSize: typography.sizes.lg,
  },
  signOutContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  signOutButton: {
    borderColor: colors.error,
  },
  signOutText: {
    color: colors.error,
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  appVersion: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.regular,
    color: colors.textLight,
    marginBottom: 4,
  },
  appDescription: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.regular,
    color: colors.textLight,
  },
});