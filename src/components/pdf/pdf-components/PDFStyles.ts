
import { StyleSheet } from '@react-pdf/renderer';

// Create styles
export const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#fff',
  },
  coverPage: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    padding: 40,
    backgroundColor: '#f9fafc',
  },
  coverTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1A365D',
    textAlign: 'center',
  },
  coverSubtitle: {
    fontSize: 18,
    marginBottom: 40,
    color: '#4A5568',
    textAlign: 'center',
  },
  coverDate: {
    fontSize: 14,
    color: '#718096',
    position: 'absolute',
    bottom: 40,
    textAlign: 'center',
  },
  pageTitle: {
    fontSize: 20,
    marginBottom: 20,
    color: '#1A365D',
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#2D3748',
  },
  profileGrid: {
    flexDirection: 'row',
    marginBottom: 15,
    borderBottom: '1px solid #E2E8F0',
    paddingBottom: 10,
  },
  profileColumn: {
    flex: 1,
  },
  profileLabel: {
    fontSize: 12,
    color: '#718096',
    marginBottom: 3,
  },
  profileValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2D3748',
  },
  indicatorsSection: {
    marginTop: 20,
    marginBottom: 20,
  },
  indicatorRow: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingBottom: 5,
    borderBottom: '1px solid #E2E8F0',
  },
  indicatorLabel: {
    flex: 2,
    fontSize: 12,
    color: '#4A5568',
  },
  indicatorValue: {
    flex: 1,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2D3748',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    color: '#A0AEC0',
    fontSize: 10,
    paddingTop: 10,
    borderTop: '1px solid #E2E8F0',
  },
  pageNumber: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    fontSize: 10,
    color: '#A0AEC0',
  },
  recommendation: {
    marginBottom: 10,
    fontSize: 12,
  },
  recommendationTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#2D3748',
  },
  recommendationText: {
    fontSize: 12,
    color: '#4A5568',
    lineHeight: 1.5,
  },
  compatibilitySection: {
    marginTop: 20,
  },
  compatibilityRow: {
    flexDirection: 'row',
    marginBottom: 15,
    borderBottom: '1px solid #E2E8F0',
    paddingBottom: 10,
  },
  compatibilityRole: {
    flex: 2,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2D3748',
  },
  compatibilityScore: {
    flex: 1,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2D3748',
  }
});
