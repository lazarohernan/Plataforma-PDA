
import React from 'react';
import { Text } from '@react-pdf/renderer';
import { styles } from './PDFStyles';

export const PDFPageFooter = () => {
  return (
    <>
      <Text style={styles.footer}>
        Evalua - Evaluación PDA © {new Date().getFullYear()}
      </Text>
      <Text 
        style={styles.pageNumber}
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} 
      />
    </>
  );
};
