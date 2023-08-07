// PDFDocument.js
import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  text: {
    marginBottom: 10,
  },
});

const PDFDocument = ({ data }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.text}>Table View Data</Text>
          <View>
            {/* Render your table here based on the 'data' prop */}
            {data.map((row, index) => (
              <Text key={index} style={styles.text}>
                {row}
              </Text>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PDFDocument;
