
export interface ProfileData {
  risk: number;
  extroversion: number;
  patience: number;
  normativity: number;
  selfControl: number;
}

export interface DerivedIndicatorsData {
  energyLevel: number;
  energyBalance: number;
  decisionMaking: number;
  changeRhythm: number;
}

export interface ResultsData {
  natural: ProfileData;
  adapted: ProfileData;
  derivedIndicators: DerivedIndicatorsData;
}

// Mock data for results - in a real app this would come from an API
export const mockResults: ResultsData = {
  natural: {
    risk: 65,
    extroversion: 82,
    patience: 45,
    normativity: 70,
    selfControl: 55,
  },
  adapted: {
    risk: 58,
    extroversion: 75,
    patience: 52,
    normativity: 78,
    selfControl: 62,
  },
  derivedIndicators: {
    energyLevel: 72,
    energyBalance: 65,
    decisionMaking: 58, // 0-100 scale: 0 = Emotional, 100 = Rational
    changeRhythm: 80,
  }
};
