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
