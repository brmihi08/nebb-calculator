import React, { useMemo } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {
  Title,
  Paragraph,
  Surface,
  Text,
} from 'react-native-paper';
import { createLiquidStyles, LIQUID_BACKGROUND } from '../shared/liquidStyles';

const FumehoodTypesScreen = () => {
  const styles = useMemo(() => createLiquidStyles('#22c55e'), []);

  const fumehoodTypes = [
    {
      type: 'Standard Fume Hood',
      faceVelocity: '80-120 ft/min',
      faceVelocityMPS: '0.41-0.61 m/s',
      description: 'General laboratory use for handling common chemicals and solvents',
      applications: 'General chemistry, teaching laboratories, routine chemical handling',
      features: [
        'Bypass design for consistent face velocity',
        'Sash height typically 18-24 inches',
        'Standard exhaust system',
        'Suitable for most laboratory applications',
      ],
      color: '#4CAF50',
    },
    {
      type: 'High Performance Fume Hood',
      faceVelocity: '60-100 ft/min',
      faceVelocityMPS: '0.30-0.51 m/s',
      description: 'Energy-efficient design with reduced airflow requirements',
      applications: 'Energy-conscious facilities, LEED-certified buildings, modern laboratories',
      features: [
        'Reduced face velocity requirements',
        'Variable air volume (VAV) compatible',
        'Lower energy consumption',
        'Maintains containment at lower velocities',
        'Advanced airflow management',
      ],
      color: '#2196F3',
    },
    {
      type: 'Radioisotope Fume Hood',
      faceVelocity: '100-150 ft/min',
      faceVelocityMPS: '0.51-0.76 m/s',
      description: 'Designed for handling radioactive materials with enhanced containment',
      applications: 'Nuclear medicine, research with radioisotopes, radioactive material handling',
      features: [
        'Higher face velocity for enhanced containment',
        'Sealed construction to prevent leakage',
        'Specialized filtration systems',
        'Radiation monitoring capabilities',
        'Stainless steel construction',
      ],
      color: '#FF9800',
    },
    {
      type: 'Perchloric Acid Fume Hood',
      faceVelocity: '150-200 ft/min',
      faceVelocityMPS: '0.76-1.02 m/s',
      description: 'Specialized hood for perchloric acid and explosive materials',
      applications: 'Perchloric acid handling, explosive material preparation, high-hazard chemicals',
      features: [
        'Highest face velocity requirements',
        'Wash-down capability for perchlorate removal',
        'Stainless steel or non-reactive materials',
        'Specialized exhaust treatment',
        'Enhanced containment design',
      ],
      color: '#F44336',
    },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: LIQUID_BACKGROUND }]}>
      <View style={styles.headerContainer}>
        <Surface style={styles.header}>
          <View style={styles.headerGradient}>
            <Title style={styles.headerTitle}>Fume Hood Types</Title>
            <Paragraph style={styles.headerSubtitle}>
              Common fume hood classifications and typical face velocity ranges
            </Paragraph>
          </View>
        </Surface>
      </View>

      <View style={styles.section}>
        <Surface style={styles.liquidCard}>
          <View style={styles.cardContent}>
            <Paragraph style={{ fontSize: 14, lineHeight: 20, color: '#000000', opacity: 0.85 }}>
              Fume hoods are classified by design and application. Face velocity is the average
              speed of air moving through the face opening of the hood, typically measured in feet
              per minute (ft/min) or meters per second (m/s).
            </Paragraph>
          </View>
        </Surface>
      </View>

      <View style={styles.section}>
        <Title style={styles.sectionTitle}>Fume Hood Classifications</Title>

        {fumehoodTypes.map((hood) => (
          <Surface key={hood.type} style={styles.liquidCard}>
            <View style={styles.cardContent}>
              <View style={localStyles.hoodHeader}>
                <View style={[localStyles.hoodBadge, { backgroundColor: hood.color }]}>
                  <Text style={localStyles.hoodText}>{hood.type}</Text>
                </View>
              </View>

              <Surface style={localStyles.velocityContainer}>
                <View style={localStyles.velocityRow}>
                  <Text style={localStyles.velocityLabel}>Face Velocity:</Text>
                  <Text style={localStyles.velocityValue}>{hood.faceVelocity}</Text>
                </View>
                <Text style={localStyles.velocityAlt}>({hood.faceVelocityMPS})</Text>
              </Surface>

              <Paragraph style={localStyles.hoodDescription}>{hood.description}</Paragraph>

              <View style={localStyles.applicationsContainer}>
                <Text style={localStyles.metaLabel}>Typical Applications:</Text>
                <Text style={localStyles.metaText}>{hood.applications}</Text>
              </View>

              <View style={localStyles.featuresContainer}>
                <Text style={localStyles.metaLabel}>Key Features:</Text>
                {hood.features.map((feature) => (
                  <Text key={feature} style={localStyles.featureText}>
                    • {feature}
                  </Text>
                ))}
              </View>
            </View>
          </Surface>
        ))}
      </View>

      <View style={styles.section}>
        <Title style={styles.sectionTitle}>NEBB Testing Standards</Title>
        <Surface style={styles.liquidCard}>
          <View style={styles.cardContent}>
            <Paragraph style={localStyles.standardText}>
              NEBB certified technicians test fume hoods according to industry standards including:
            </Paragraph>
            <Text style={localStyles.standardText}>• ASHRAE 110: Method of Testing Performance of Laboratory Fume Hoods</Text>
            <Text style={localStyles.standardText}>• ANSI/AIHA Z9.5: Laboratory Ventilation</Text>
            <Text style={localStyles.standardText}>• Face velocity measurements at multiple points</Text>
            <Text style={localStyles.standardText}>• Containment testing with smoke visualization</Text>
            <Text style={localStyles.standardText}>• Pressure differential verification</Text>
          </View>
        </Surface>
      </View>
    </ScrollView>
  );
};

const localStyles = StyleSheet.create({
  hoodHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  hoodBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  hoodText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  velocityContainer: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  velocityRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  velocityLabel: {
    fontSize: 14,
    fontWeight: '600',
    width: 120,
    color: '#000000',
  },
  velocityValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1976D2',
    flex: 1,
  },
  velocityAlt: {
    fontSize: 12,
    color: '#666666',
    marginLeft: 120,
    fontStyle: 'italic',
  },
  hoodDescription: {
    fontSize: 14,
    color: '#000000',
    opacity: 0.8,
    marginBottom: 12,
  },
  applicationsContainer: {
    marginBottom: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.06)',
  },
  featuresContainer: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.06)',
  },
  metaLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666666',
    marginBottom: 6,
  },
  metaText: {
    fontSize: 13,
    color: '#000000',
    opacity: 0.9,
  },
  featureText: {
    fontSize: 13,
    color: '#000000',
    opacity: 0.9,
    marginBottom: 4,
    marginLeft: 8,
  },
  standardText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
    color: '#000000',
    opacity: 0.85,
  },
});

export default FumehoodTypesScreen;
