import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  Button,
  useTheme,
  Surface,
  Text,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { glassStyles, glassColors, spacing } from '../theme/glassStyles';

const HomeScreen = ({ navigation }: any) => {
  const theme = useTheme();

  const calculatorCategories = [
    {
      title: 'Testing, Adjusting, and Balancing',
      description: 'Testing, Adjusting, and Balancing calculations',
      icon: 'clipboard',
      screen: 'TAB',
      // Jump directly into the TAB stack.
      subscreen: 'TABOverview',
      color: '#4CAF50',
    },
    {
      title: 'Cleanroom Testing',
      description: 'Cleanroom classifications and particle counting',
      icon: 'shield-checkmark',
      screen: 'Cleanroom',
      // Land on the overview page; overview links to calculations.
      subscreen: 'CleanroomOverview',
      color: '#2196F3',
    },
    {
      title: 'Fume Hood Testing',
      description: 'Face velocity and related fume hood tools',
      icon: 'flask',
      screen: 'Fumehood',
      subscreen: 'FumehoodOverview',
      color: '#FF9800',
    },
    {
      title: 'Building Envelope Testing',
      description: 'Building air tightness and infiltration testing',
      icon: 'business-outline',
      screen: 'BET',
      subscreen: 'BETOverview',
      color: '#9C27B0',
    },
  ];

  const quickCalculations = [
    {
      title: 'Face Velocity',
      formula: 'V = CFM / A',
      description: 'Fume hood face velocity',
      icon: 'arrow-forward',
      screen: 'Fumehood',
      subscreen: 'FumehoodFaceVelocity',
      color: '#FF9800',
    },
    {
      title: 'Air Changes/Hour',
      formula: 'ACH = (CFM × 60) / Vol',
      description: 'Cleanroom ACH calculation',
      icon: 'refresh',
      screen: 'Cleanroom',
      subscreen: 'CleanroomAirChanges',
      color: '#2196F3',
    },
    {
      title: 'Velocity Pressure',
      formula: 'VP = (V/4005)²',
      description: 'Calculate VP from velocity',
      icon: 'speedometer',
      screen: 'TAB',
      subscreen: 'TABPressure',
      color: '#4CAF50',
    },
    {
      title: 'Dew Point',
      formula: 'DP from T + RH',
      description: 'Psychrometric dew point',
      icon: 'water',
      screen: 'TAB',
      subscreen: 'TABTemperature',
      color: '#9C27B0',
    },
  ];
  

  return (
    <ScrollView style={[glassStyles.container, styles.scrollView]}>
      {/* Header with glass effect */}
      <View style={styles.headerContainer}>
        <View style={styles.glassHeader}>
          <Text style={glassStyles.glassTitle}>NEBB Calculator</Text>
          <Text style={glassStyles.glassBodySecondary}>
            Professional TAB calculations for certified technicians
          </Text>
          <View style={styles.disclaimerBadge}>
            <Ionicons name="information-circle-outline" size={16} color={glassColors.appleOrange} />
            <Text style={styles.disclaimerText}>
              Educational use only - Verify all calculations
            </Text>
          </View>
        </View>
      </View>

      {/* Quick access button */}
      <View style={styles.quickActions}>
        <TouchableOpacity
          style={styles.recentButton}
          onPress={() => navigation.navigate('RecentCalculations')}
          activeOpacity={0.7}
        >
          <Ionicons name="time-outline" size={20} color={glassColors.appleBlue} />
          <Text style={styles.recentButtonText}>Recent Calculations</Text>
          <Ionicons name="chevron-forward" size={20} color={glassColors.textSecondary} />
        </TouchableOpacity>
      </View>

      {/* Quick Calculations */}
      <View style={styles.section}>
        <Text style={glassStyles.glassSubheading}>⚡ Quick Calcs</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.quickCalcScroll}
          contentContainerStyle={styles.quickCalcContent}
        >
          {quickCalculations.map((calc, index) => (
            <TouchableOpacity
              key={index}
              style={styles.quickCalcCard}
              onPress={() => navigation.navigate(calc.screen, { screen: calc.subscreen })}
              activeOpacity={0.8}
            >
              <View style={[styles.quickCalcIconContainer, { backgroundColor: calc.color }]}>
                <Ionicons name={calc.icon as any} size={24} color="white" />
              </View>
              <Text style={styles.quickCalcTitle}>{calc.title}</Text>
              <Text style={styles.quickCalcFormula}>{calc.formula}</Text>
              <Text style={styles.quickCalcDescription}>{calc.description}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Calculator Categories */}
      <View style={styles.section}>
        <Text style={glassStyles.glassSubheading}>Calculator Categories</Text>
        {calculatorCategories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={styles.categoryCard}
            onPress={() => navigation.navigate(category.screen, category.subscreen ? { screen: category.subscreen } : undefined)}
            activeOpacity={0.8}
          >
            <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
              <Ionicons name={category.icon as any} size={32} color="white" />
            </View>
            <View style={styles.categoryContent}>
              <Text style={styles.categoryTitle}>{category.title}</Text>
              <Text style={styles.categoryDescription}>{category.description}</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={glassColors.textTertiary} />
          </TouchableOpacity>
        ))}
      </View>
      {/*}
      <View style={styles.section}>
        <Title style={styles.sectionTitle}>About NEBB</Title>
        <Card style={styles.card}>
          <Card.Content>
            <Paragraph style={styles.aboutText}>
              The National Environmental Balancing Bureau (NEBB) is a non-profit organization 
              that certifies firms and qualifies technicians in the areas of testing, adjusting, 
              and balancing (TAB) of environmental systems.
            </Paragraph>
            <Paragraph style={styles.aboutText}>
              This calculator provides professional tools for NEBB certified technicians 
              to perform accurate calculations in the field.
            </Paragraph>
          </Card.Content>
        </Card>
      </View>
      */}

      <View style={styles.section}>
        <Title style={styles.sectionTitle}>About This App</Title>
        <Card style={styles.card}>
          <Card.Content>
            <Paragraph style={styles.disclaimerParagraph}>
              This app and website have been developed to assist air balancers, commissioning agents, and other professionals by providing tools, calculators, and engineering resources commonly used in the field.
            </Paragraph>
            <Paragraph style={styles.disclaimerParagraph}>
              Our goal is to make it easier for industry professionals to access commonly accepted engineering equations, formulas, and reference materials that are publicly available and widely recognized within the HVAC, TAB, and commissioning industries.
            </Paragraph>
            
            <View style={styles.disclaimerSection}>
              <Title style={styles.disclaimerSubtitle}>Disclaimer of Affiliation</Title>
              <Paragraph style={styles.disclaimerParagraph}>
                This app/website is not affiliated with, endorsed by, or sponsored by the National Environmental Balancing Bureau (NEBB) or any other certification body.
              </Paragraph>
            </View>

            <View style={styles.disclaimerSection}>
              <Title style={styles.disclaimerSubtitle}>Use of Engineering Equations and Information</Title>
              <Paragraph style={styles.disclaimerParagraph}>
                All formulas, equations, and workflows provided within this app are derived from commonly accepted engineering principles and publicly available industry knowledge.
              </Paragraph>
              <Paragraph style={styles.disclaimerParagraph}>
                • These calculations are based on general HVAC, TAB, cleanroom, and commissioning practices.
              </Paragraph>
              <Paragraph style={styles.disclaimerParagraph}>
                • Any similarity between tools in this app and NEBB's published materials is purely coincidental and reflects standard practices within the field.
              </Paragraph>
            </View>

            <View style={styles.disclaimerSection}>
              <Title style={styles.disclaimerSubtitle}>Limitation of Liability</Title>
              <Paragraph style={styles.disclaimerParagraph}>
                This app and website are provided "as-is" without any warranties or guarantees, express or implied. By using this app, you agree that:
              </Paragraph>
              <Paragraph style={styles.disclaimerParagraph}>
                • You are responsible for verifying any results, calculations, or recommendations provided.
              </Paragraph>
              <Paragraph style={styles.disclaimerParagraph}>
                • The app developer(s) are not liable for any direct, indirect, incidental, or consequential damages arising from the use of this tool.
              </Paragraph>
              <Paragraph style={styles.disclaimerParagraph}>
                • The app is intended for supplemental reference purposes only and is not a substitute for professional judgment, standards, or project specifications.
              </Paragraph>
            </View>

          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  
  // Header
  headerContainer: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
  },
  glassHeader: {
    ...glassStyles.glassCard,
    padding: spacing.xl,
    alignItems: 'center',
  },
  disclaimerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 159, 10, 0.15)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 159, 10, 0.3)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: spacing.md,
    gap: 6,
  },
  disclaimerText: {
    fontSize: 12,
    fontWeight: '500',
    color: glassColors.appleOrange,
  },

  // Quick Actions
  quickActions: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
  recentButton: {
    ...glassStyles.glassSurface,
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    gap: 12,
  },
  recentButtonText: {
    flex: 1,
    fontSize: 17,
    fontWeight: '600',
    color: glassColors.appleBlue,
  },

  // Sections
  section: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.xl,
  },

  // Quick Calculations
  quickCalcScroll: {
    marginTop: spacing.md,
    marginHorizontal: -spacing.md,
  },
  quickCalcContent: {
    paddingHorizontal: spacing.md,
    gap: 12,
  },
  quickCalcCard: {
    ...glassStyles.glassSurface,
    width: 160,
    padding: spacing.md,
    marginRight: 12,
  },
  quickCalcIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  quickCalcTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: glassColors.textPrimary,
    marginBottom: 4,
  },
  quickCalcFormula: {
    fontSize: 13,
    fontWeight: '500',
    color: glassColors.appleBlue,
    fontFamily: Platform.select({
      ios: 'Menlo',
      android: 'monospace',
      web: 'Monaco, monospace',
    }),
    marginBottom: 4,
  },
  quickCalcDescription: {
    fontSize: 12,
    color: glassColors.textSecondary,
  },

  // Category Cards
  categoryCard: {
    ...glassStyles.glassNavCard,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  categoryIcon: {
    width: 56,
    height: 56,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryContent: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: glassColors.textPrimary,
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 15,
    color: glassColors.textSecondary,
  },

  // Disclaimer sections (keep for compatibility)
  disclaimerSection: {
    marginTop: 16,
  },
  disclaimerSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  disclaimerParagraph: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
});

export default HomeScreen;
