import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';

const API_HOST = 'numbersapi.p.rapidapi.com';
const API_KEY = '77909bf3a8msh14651affa094e91p103f94jsnee75454521ae';

export default function App() {
  const [month, setMonth] = useState<string | null>(null);
  const [day, setDay] = useState<string>('');
  const [fact, setFact] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFact = async (selectedMonth: string, selectedDay: string) => {
    if (!selectedMonth || !selectedDay) return;

    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://${API_HOST}/${selectedMonth}/${selectedDay}/date`,
        {
          headers: {
            'x-rapidapi-host': API_HOST,
            'x-rapidapi-key': API_KEY,
          },
        }
      );
      setFact(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setFact('Failed to fetch fact.');
    }
    setLoading(false);
  };

  const handleDayChange = (input: string) => {
    setDay(input);
    const dayNumber = parseInt(input, 10);

    if (isNaN(dayNumber) || dayNumber < 1 || dayNumber > 31) {
      setError('Please enter a valid day between 1 and 31.');
      setFact('');
    } else {
      setError(null);
    }
  };

  useEffect(() => {
    if (month && day && !error) {
      fetchFact(month, day);
    }
  }, [month, day]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Date</Text>

      <RNPickerSelect
        onValueChange={(value) => setMonth(value)}
        items={[
          { label: 'January', value: '1' },
          { label: 'February', value: '2' },
          { label: 'March', value: '3' },
          { label: 'April', value: '4' },
          { label: 'May', value: '5' },
          { label: 'June', value: '6' },
          { label: 'July', value: '7' },
          { label: 'August', value: '8' },
          { label: 'September', value: '9' },
          { label: 'October', value: '10' },
          { label: 'November', value: '11' },
          { label: 'December', value: '12' },
        ]}
        placeholder={{ label: 'Select a month...', value: null }}
        style={pickerSelectStyles}
      />

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter Day (1-31)"
        value={day}
        onChangeText={handleDayChange}
      />

      {error && <Text style={styles.errorText}>{error}</Text>}

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Text style={styles.fact}>{fact}</Text>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginTop: 5,
  },
  fact: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
});

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
  },
};
