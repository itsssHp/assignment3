import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';

const API_HOST = 'numbersapi.p.rapidapi.com';
const API_KEY = '77909bf3a8msh14651affa094e91p103f94jsnee75454521ae';
