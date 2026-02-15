import React from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }: any) => {
  const calculatorCategories = [
    {
      title: 'Testing, Adjusting, and Balancing',
      description: 'TAB calculations',
      icon: 'clipboard',
      screen: 'TAB',
      subscreen: 'TABOverview',
      color: '#4CAF50',
    },
    {
      title: 'Cleanroom Testing',
      description: 'Cleanroom classifications',
      icon: 'shield-checkmark',
      screen: 'Cleanroom',
      subscreen: 'CleanroomOverview',
      color: '#2196F3',
    },
    {
      title: 'Fume Hood Testing',
      description: 'Face velocity tools',
      icon: 'flask',
      screen: 'Fumehood',
      subscreen: 'FumehoodOverview',
      color: '#FF9800',
    },
    {
      title: 'Building Envelope Testing',
      description: 'Air tightness testing',
      icon: 'business-outline',
      screen: 'BET',
      subscreen: 'BETOverview',
      color: '#9C27B0',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>NEBB Calculator</Text>
        <Text style={styles.subtitle}>Professional TAB Calculations</Text>
      </View>

      {/* Recent Button */}
      <TouchableOpacity
        style={styles.recentButton}
        onPress={() => navigation.navigate('RecentCalculations')}
      >
        <Ionicons name="time-outline" size={20} color="#007AFF" />
        <Text style={styles.recentText}>Recent Calculations</Text>
        <Ionicons name="chevron-forward" size={20} color="#888" />
      </TouchableOpacity>

      {/* Categories */}
      <Text style={styles.sectionTitle}>Calculator Categories</Text>
      {calculatorCategories.map((category, index) => (
        <TouchableOpacity
          key={index}
          style={styles.categoryCard}
          onPress={() => navigation.navigate(category.screen, { screen: category.subscreen })}
        >
          <View style={[styles.iconCircle, { backgroundColor: category.color }]}>
            <Ionicons name={category.icon as any} size={28} color="white" />
          </View>
          <View style={styles.categoryText}>
            <Text style={styles.categoryTitle}>{category.title}</Text>
            <Text style={styles.categoryDesc}>{category.description}</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#555" />
        </TouchableOpacity>
      ))}

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          ⚠️ Educational use only - Verify all calculations
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  header: {
    padding: 24,
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    margin: 16,
    marginTop: 24,
    borderWidth: 1,
    borderColor: '#333',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#999',
  },
  recentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#333',
    gap: 12,
  },
  recentText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333',
    gap: 16,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryText: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  categoryDesc: {
    fontSize: 14,
    color: '#888',
  },
  footer: {
    padding: 20,
    marginTop: 20,
    marginBottom: 40,
  },
  footerText: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
  },
});

export default HomeScreen;
