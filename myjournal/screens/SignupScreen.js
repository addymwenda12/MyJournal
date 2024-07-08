import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = async () => {
		try {
			const response = await axios.post('http://localhost:3000/auth/login', {
				email,
				password,
			});
			
			//Navigate to the main journal screen on success
			Alert.alert('Login Success', 'You have successfully logged in');
		} catch (error) {
			Alert.alert('Login Error', 'An error occurred while logging in');
		}
	};

	return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Log In" onPress={handleLogin} />
    </View>
  );
};

