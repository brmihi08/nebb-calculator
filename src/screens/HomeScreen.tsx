import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
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
    <ScrollView style={[styles.container, { backgroundColor: '#f0f8f0' }]}>
      <View style={styles.headerContainer}>
        <Surface style={styles.header}>
          <View style={styles.headerGradient}>
            <Title style={styles.welcomeTitle}>Unofficial NEBB Calculator</Title>
            <Paragraph style={styles.welcomeSubtitle}>
              Educational and reference tools for NEBB calculations
            </Paragraph>
            <View style={styles.disclaimerContainer}>
              <Text style={styles.disclaimerText}>
                ⚠️ This is an unofficial calculator for educational purposes only. 
                Always verify calculations and consult official NEBB procedures for professional use.
              </Text>
            </View>
          </View>
        </Surface>
      </View>

      <View style={styles.quickActions}>
        <Button
          mode="contained"
          icon="history"
          onPress={() => navigation.navigate('RecentCalculations')}
          style={styles.quickActionButton}
        >
          Recent
        </Button>
      </View>

      <View style={styles.section}>
        <Title style={styles.sectionTitle}>⚡ Quick Calcs</Title>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quickCalcScroll}>
          {quickCalculations.map((calc, index) => (
            <Card
              key={index}
              style={[styles.quickCalcCard, { backgroundColor: calc.color }]}
              onPress={() => navigation.navigate(calc.screen, { screen: calc.subscreen })}
            >
              <Card.Content style={styles.quickCalcContent}>
                <Ionicons name={calc.icon as any} size={28} color="white" />
                <Text style={styles.quickCalcTitle}>{calc.title}</Text>
                <Text style={styles.quickCalcFormula}>{calc.formula}</Text>
              </Card.Content>
            </Card>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Title style={styles.sectionTitle}>Calculator Categories</Title>
        {calculatorCategories.map((category, index) => (
          <Card
            key={index}
            style={[styles.card, { marginBottom: 16 }]}
            onPress={() => navigation.navigate(category.screen, category.subscreen ? { screen: category.subscreen } : undefined)}
          >
            <Card.Content style={styles.cardContent}>
              <View style={styles.cardHeader}>
                <View style={[styles.iconContainer, { backgroundColor: category.color }]}>
                  <Ionicons name={category.icon as any} size={24} color="white" />
                </View>
                <View style={styles.cardText}>
                  <Title style={styles.cardTitle}>{category.title}</Title>
                  <Paragraph style={styles.cardDescription}>
                    {category.description}
                  </Paragraph>
                </View>
              </View>
            </Card.Content>
          </Card>
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
  container: {
    flex: 1,
    padding: 16,
  },
  headerContainer: {
    marginBottom: 20,
    overflow: 'hidden',
    borderRadius: 24,
  },
  header: {
    borderRadius: 24,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    backgroundColor: '#ffffff',
  },
  headerGradient: {
    padding: 24,
    backgroundColor: '#ffffff',
    backdropFilter: 'blur(20px)',
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
    color: '#000000',
    letterSpacing: -0.5,
  },
  welcomeSubtitle: {
    textAlign: 'center',
    fontSize: 16,
    opacity: 0.8,
    color: '#000000',
    lineHeight: 22,
    marginBottom: 16,
  },
  disclaimerContainer: {
    backgroundColor: '#FFF3E0',
    borderLeftWidth: 4,
    borderLeftColor: '#FF6B35',
    padding: 12,
    borderRadius: 8,
  },
  disclaimerText: {
    fontSize: 12,
    color: '#E65100',
    lineHeight: 16,
    textAlign: 'center',
  },
  
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 16,
  },
  quickActionButton: {
    borderRadius: 12,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: '#000000',
    letterSpacing: -0.3,
  },
  card: {
    borderRadius: 20,
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    backgroundColor: '#ffffff',
    backdropFilter: 'blur(20px)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  cardContent: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
    color: '#000000',
  },
  cardDescription: {
    fontSize: 14,
    opacity: 0.8,
    color: '#000000',
  },
  quickCalcTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  formula: {
    fontSize: 14,
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  quickCalcDescription: {
    fontSize: 14,
    opacity: 0.8,
  },
  quickCalcScroll: {
    marginBottom: 8,
  },
  quickCalcCard: {
    width: 140,
    height: 100,
    marginRight: 12,
    borderRadius: 16,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  quickCalcContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  quickCalcTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: 'white',
    marginTop: 8,
    textAlign: 'center',
  },
  quickCalcFormula: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.9)',
    marginTop: 4,
    fontFamily: 'monospace',
  },
  aboutText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  disclaimerParagraph: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
    color: '#333333',
  },
  disclaimerSection: {
    marginTop: 16,
    marginBottom: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  disclaimerSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#000000',
  },
});

export default HomeScreen;
