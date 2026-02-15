import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Title, Paragraph, Surface, Text } from 'react-native-paper';
import { liquidLayout } from '../../theme/liquidLayout';

const BETProceduresScreen = () => {
  const astmStandards = [
    {
      standard: 'ASTM E779',
      title: 'Pressurization Testing',
      description:
        'Standard Test Method for Determining Air Leakage Rate by Fan Pressurization',
      color: '#3b82f6',
      procedures: [
        'Install blower door in building opening',
        'Seal all intentional openings',
        'Pressurize building to target pressure (typically 50 Pa)',
        'Measure airflow rate at multiple pressure points',
        'Record pressure differential and airflow',
        'Calculate air leakage rate and flow coefficient',
        'Determine effective leakage area',
      ],
      pressurePoints: '10, 20, 30, 40, 50, 60 Pa (or as specified)',
      applications:
        'Commercial buildings, residential buildings, building envelope evaluation',
    },
    {
      standard: 'ASTM E1827',
      title: 'Depressurization Testing',
      description:
        'Standard Test Methods for Determining Airtightness of Buildings Using an Orifice Blower Door',
      color: '#22c55e',
      procedures: [
        'Install blower door with orifice plate',
        'Seal all intentional openings',
        'Depressurize building to target pressure (typically 50 Pa)',
        'Measure airflow rate through orifice',
        'Record pressure differential and airflow',
        'Calculate air leakage characteristics',
        'Determine building airtightness',
      ],
      pressurePoints: '10, 20, 30, 40, 50, 60 Pa (or as specified)',
      applications:
        'Residential buildings, small commercial buildings, airtightness verification',
    },
  ];

  const testingRequirements = [
    {
      title: 'Pre-Test Requirements',
      items: [
        'Close all windows and doors',
        'Seal all intentional openings (exhaust fans, vents)',
        'Turn off HVAC systems',
        'Verify blower door calibration',
        'Check weather conditions (wind < 15 mph recommended)',
        'Record indoor and outdoor temperatures',
      ],
    },
    {
      title: 'Test Procedure',
      items: [
        'Install blower door in primary entrance',
        'Establish baseline pressure reading',
        'Perform pressurization test (ASTM E779)',
        'Perform depressurization test (ASTM E1827)',
        'Record data at specified pressure points',
        'Verify data quality and repeatability',
      ],
    },
    {
      title: 'Post-Test Requirements',
      items: [
        'Calculate air leakage rate',
        'Determine flow coefficient (C)',
        'Determine flow exponent (n)',
        'Calculate effective leakage area',
        'Convert to standard conditions',
        'Compare to project requirements / standards',
        'Document all findings',
      ],
    },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: '#f0f8f0' }]}>
      <View style={styles.headerContainer}>
        <Surface style={styles.header}>
          <View style={styles.headerGradient}>
            <Title style={styles.headerTitle}>BET Procedures</Title>
            <Paragraph style={styles.headerSubtitle}>
              ASTM E1827 and E779 testing procedures and standards
            </Paragraph>
          </View>
        </Surface>
      </View>

      <View style={styles.section}>
        <Title style={styles.sectionTitle}>ASTM Standards</Title>

        {astmStandards.map((standard, index) => (
          <Surface key={index} style={styles.liquidCard}>
            <View style={styles.cardContent}>
              <View style={styles.standardHeader}>
                <View
                  style={[styles.standardBadge, { backgroundColor: standard.color }]}
                >
                  <Text style={styles.standardBadgeText}>{standard.standard}</Text>
                </View>
              </View>

              <Title style={styles.standardTitle}>{standard.title}</Title>
              <Paragraph style={styles.standardDescription}>
                {standard.description}
              </Paragraph>

              <View style={styles.proceduresContainer}>
                <Text style={styles.proceduresLabel}>Testing Procedures</Text>
                {standard.procedures.map((procedure, procIndex) => (
                  <Text key={procIndex} style={styles.procedureText}>
                    {procIndex + 1}. {procedure}
                  </Text>
                ))}
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Pressure Points</Text>
                <Text style={styles.infoValue}>{standard.pressurePoints}</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Typical Applications</Text>
                <Text style={styles.infoValue}>{standard.applications}</Text>
              </View>
            </View>
          </Surface>
        ))}
      </View>

      <View style={styles.section}>
        <Title style={styles.sectionTitle}>Testing Requirements</Title>

        {testingRequirements.map((requirement, index) => (
          <Surface key={index} style={styles.liquidCard}>
            <View style={styles.cardContent}>
              <Title style={styles.requirementTitle}>{requirement.title}</Title>
              {requirement.items.map((item, itemIndex) => (
                <Text key={itemIndex} style={styles.requirementText}>
                  • {item}
                </Text>
              ))}
            </View>
          </Surface>
        ))}
      </View>

      <View style={styles.section}>
        <Title style={styles.sectionTitle}>NEBB Testing Standards</Title>

        <Surface style={styles.liquidCard}>
          <View style={styles.cardContent}>
            <Paragraph style={styles.standardText}>
              NEBB certified technicians perform building envelope testing according to:
            </Paragraph>
            <Paragraph style={styles.standardText}>
              • ASTM E779: Standard Test Method for Determining Air Leakage Rate by Fan
              Pressurization
            </Paragraph>
            <Paragraph style={styles.standardText}>
              • ASTM E1827: Standard Test Methods for Determining Airtightness of
              Buildings Using an Orifice Blower Door
            </Paragraph>
            <Paragraph style={styles.standardText}>
              • ASHRAE 90.1: Energy Standard for Buildings Except Low-Rise Residential
              Buildings
            </Paragraph>
            <Paragraph style={styles.standardText}>
              • IECC: International Energy Conservation Code requirements
            </Paragraph>
          </View>
        </Surface>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  ...liquidLayout,

  // Procedures-specific
  standardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  standardBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  standardBadgeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  standardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000000',
  },
  standardDescription: {
    fontSize: 14,
    color: '#000000',
    opacity: 0.8,
    marginBottom: 12,
  },
  proceduresContainer: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  proceduresLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  procedureText: {
    fontSize: 13,
    color: '#000000',
    opacity: 0.9,
    marginBottom: 4,
    marginLeft: 8,
  },
  infoRow: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.08)',
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666666',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 13,
    color: '#000000',
    opacity: 0.9,
  },
  requirementTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 10,
  },
  requirementText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 6,
    color: '#000000',
    opacity: 0.9,
  },
  standardText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
    color: '#000000',
    opacity: 0.9,
  },
});

export default BETProceduresScreen;
