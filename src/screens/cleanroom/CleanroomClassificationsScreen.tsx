import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Paragraph, Text, Title } from 'react-native-paper';
import {
  CalcCard,
  CalcScreen,
  CalcSection,
} from '../../components/nebb';

const ACCENT_COLOR = '#2196F3'; // Blue for Cleanroom

// ISO 14644-1:2015 Cleanroom Classification Table
// Particle limits are per cubic meter (particles/m³) for each particle size
const iso14644Classes = [
  {
    isoClass: 'ISO Class 1',
    particles: {
      '0.1 μm': '10',
      '0.2 μm': '2',
      '0.3 μm': '-',
      '0.5 μm': '-',
      '1.0 μm': '-',
      '5.0 μm': '-',
    },
    description: 'Ultra-clean environments for nanotechnology, advanced semiconductor',
    color: '#E91E63',
  },
  {
    isoClass: 'ISO Class 2',
    particles: {
      '0.1 μm': '100',
      '0.2 μm': '24',
      '0.3 μm': '10',
      '0.5 μm': '4',
      '1.0 μm': '-',
      '5.0 μm': '-',
    },
    description: 'Semiconductor manufacturing, critical medical devices',
    color: '#C2185B',
  },
  {
    isoClass: 'ISO Class 3',
    particles: {
      '0.1 μm': '1,000',
      '0.2 μm': '237',
      '0.3 μm': '102',
      '0.5 μm': '35',
      '1.0 μm': '8',
      '5.0 μm': '-',
    },
    description: 'Semiconductor manufacturing (equivalent to FS 209E Class 1)',
    color: '#9C27B0',
  },
  {
    isoClass: 'ISO Class 4',
    particles: {
      '0.1 μm': '10,000',
      '0.2 μm': '2,370',
      '0.3 μm': '1,020',
      '0.5 μm': '352',
      '1.0 μm': '83',
      '5.0 μm': '-',
    },
    description: 'Pharmaceutical manufacturing (equivalent to FS 209E Class 10)',
    color: '#7B1FA2',
  },
  {
    isoClass: 'ISO Class 5',
    particles: {
      '0.1 μm': '100,000',
      '0.2 μm': '23,700',
      '0.3 μm': '10,200',
      '0.5 μm': '3,520',
      '1.0 μm': '832',
      '5.0 μm': '29',
    },
    description: 'Sterile compounding, aseptic filling (equivalent to FS 209E Class 100)',
    color: '#3F51B5',
  },
  {
    isoClass: 'ISO Class 6',
    particles: {
      '0.1 μm': '1,000,000',
      '0.2 μm': '237,000',
      '0.3 μm': '102,000',
      '0.5 μm': '35,200',
      '1.0 μm': '8,320',
      '5.0 μm': '293',
    },
    description: 'Medical device manufacturing (equivalent to FS 209E Class 1,000)',
    color: '#1976D2',
  },
  {
    isoClass: 'ISO Class 7',
    particles: {
      '0.1 μm': '-',
      '0.2 μm': '-',
      '0.3 μm': '-',
      '0.5 μm': '352,000',
      '1.0 μm': '83,200',
      '5.0 μm': '2,930',
    },
    description: 'General cleanroom applications (equivalent to FS 209E Class 10,000)',
    color: '#388E3C',
  },
  {
    isoClass: 'ISO Class 8',
    particles: {
      '0.1 μm': '-',
      '0.2 μm': '-',
      '0.3 μm': '-',
      '0.5 μm': '3,520,000',
      '1.0 μm': '832,000',
      '5.0 μm': '29,300',
    },
    description: 'Light manufacturing, assembly areas (equivalent to FS 209E Class 100,000)',
    color: '#689F38',
  },
  {
    isoClass: 'ISO Class 9',
    particles: {
      '0.1 μm': '-',
      '0.2 μm': '-',
      '0.3 μm': '-',
      '0.5 μm': '35,200,000',
      '1.0 μm': '8,320,000',
      '5.0 μm': '293,000',
    },
    description: 'Clean zones (equivalent to typical office environment)',
    color: '#F57C00',
  },
];

// Reference: Federal Standard 209E vs ISO 14644-1 equivalents
const fs209eEquivalents = [
  { fs209e: 'Class 1', iso14644: 'ISO Class 3' },
  { fs209e: 'Class 10', iso14644: 'ISO Class 4' },
  { fs209e: 'Class 100', iso14644: 'ISO Class 5' },
  { fs209e: 'Class 1,000', iso14644: 'ISO Class 6' },
  { fs209e: 'Class 10,000', iso14644: 'ISO Class 7' },
  { fs209e: 'Class 100,000', iso14644: 'ISO Class 8' },
];

const CleanroomClassificationsScreen = () => {
  return (
    <CalcScreen title="Cleanroom Classifications" subtitle="ISO 14644-1:2015 cleanroom classification standards">
      <ScrollView>
        <CalcSection>
          <Title style={styles.sectionTitle}>ISO 14644-1:2015 Classes</Title>
          <Paragraph style={styles.standardNote}>
            Maximum allowable particle concentrations in particles per cubic meter (particles/m³)
          </Paragraph>
          
          {iso14644Classes.map((cleanroom, index) => (
            <CalcCard key={index} style={{ marginBottom: 12 }}>
              <View style={styles.classHeader}>
                <View style={[styles.classBadge, { backgroundColor: cleanroom.color }]}>
                  <Text style={styles.classText}>{cleanroom.isoClass}</Text>
                </View>
              </View>
              
              <View style={styles.particleTable}>
                <View style={styles.tableHeader}>
                  <Text style={styles.tableHeaderText}>Particle Size</Text>
                  <Text style={styles.tableHeaderText}>Maximum (particles/m³)</Text>
                </View>
                {Object.entries(cleanroom.particles).map(([size, limit]) => (
                  <View key={size} style={styles.tableRow}>
                    <Text style={styles.sizeText}>{size}</Text>
                    <Text style={[styles.limitText, limit === '-' && styles.dashText]}>{limit}</Text>
                  </View>
                ))}
              </View>
              
              <Paragraph style={styles.classDescription}>
                {cleanroom.description}
              </Paragraph>
            </CalcCard>
          ))}
        </CalcSection>

        <CalcSection>
          <Title style={styles.sectionTitle}>Federal Standard 209E Cross-Reference</Title>
          <Paragraph style={styles.standardNote}>
            Obsolete FS 209E (1992) equivalents to ISO 14644-1 (2001/2015)
          </Paragraph>
          <CalcCard>
            <View style={styles.equivalentTable}>
              <View style={styles.equivHeader}>
                <Text style={styles.equivHeaderText}>FS 209E (Obsolete)</Text>
                <Text style={styles.equivHeaderText}>ISO 14644-1 (Current)</Text>
              </View>
              {fs209eEquivalents.map((equiv, index) => (
                <View key={index} style={styles.equivRow}>
                  <Text style={styles.equivText}>{equiv.fs209e}</Text>
                  <Text style={[styles.equivText, styles.isoText]}>{equiv.iso14644}</Text>
                  <Text style={styles.arrowText}>→</Text>
                </View>
              ))}
            </View>
            <Paragraph style={styles.noteText}>
              Note: Federal Standard 209E was officially cancelled in 2001 and superseded by ISO 14644-1. 
              FS 209E used English units (particles/ft³) while ISO 14644-1 uses metric units (particles/m³).
            </Paragraph>
          </CalcCard>
        </CalcSection>

        <CalcSection>
          <Title style={styles.sectionTitle}>Standards Reference</Title>
          <CalcCard>
            <Text style={styles.standardTitle}>ISO 14644-1:2015</Text>
            <Paragraph style={styles.standardDescription}>
              Cleanrooms and associated controlled environments — Part 1: Classification of air cleanliness by particle concentration
            </Paragraph>
            <Paragraph style={styles.standardDescription}>
              • Supersedes the first edition (ISO 14644-1:1999)
              • Cancels and replaces Federal Standard 209E (1992)
              • Particle counts based on cubic meter (SI units)
              • Classes range from ISO Class 1 (cleanest) to ISO Class 9
            </Paragraph>
            
            <Text style={[styles.standardTitle, { marginTop: 16 }]}>NEBB Cleanroom Testing Standards</Text>
            <Paragraph style={styles.standardDescription}>
              • NEBB Procedural Standards for Certified Testing of Cleanrooms
              • Follow ISO 14644-1 for classification testing
              • Additional NEBB requirements for testing procedures and reporting
            </Paragraph>
          </CalcCard>
        </CalcSection>
      </ScrollView>
    </CalcScreen>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    color: '#000000',
    letterSpacing: -0.3,
  },
  standardNote: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 12,
    fontStyle: 'italic',
  },
  classHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  classBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  classText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  particleTable: {
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    marginBottom: 8,
  },
  tableHeaderText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  sizeText: {
    fontSize: 13,
    color: '#333',
  },
  limitText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#000',
  },
  dashText: {
    color: '#999',
  },
  classDescription: {
    fontSize: 14,
    opacity: 0.8,
    lineHeight: 20,
  },
  equivalentTable: {
    marginBottom: 12,
  },
  equivHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    marginBottom: 8,
  },
  equivHeaderText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
    flex: 1,
  },
  equivRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  equivText: {
    fontSize: 14,
    flex: 1,
  },
  isoText: {
    fontWeight: '600',
    color: '#3F51B5',
  },
  arrowText: {
    fontSize: 16,
    color: '#999',
    marginHorizontal: 8,
  },
  noteText: {
    fontSize: 13,
    opacity: 0.7,
    fontStyle: 'italic',
    marginTop: 8,
    lineHeight: 18,
  },
  standardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1976D2',
    marginBottom: 8,
  },
  standardDescription: {
    fontSize: 14,
    opacity: 0.85,
    marginBottom: 8,
    lineHeight: 20,
  },
});

export default CleanroomClassificationsScreen;
