import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const SignupScreen = ({ navigation }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');

	const handleSignup = async () => {
		try {
			const response = await axios.post('http://localhost:3000/auth/signup', {
				email,
				password,
				name,
			});

			//Navigate to the main journal screen on success
			Alert.alert('Signup Success', 'You have successfully signed up');
		} catch (error) {
			Alert.alert('Signup Error', 'An error occurred while signing up');
		}
	};

	return (
		<View style={styles.container}>
			<TextInput
				placeholder="Name"
				value={name}
				onChangeText={setName}
				style={styles.input}
			/>
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
			<Button title="Sign Up" onPress={handleSignup} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		padding: 20,
	},
	input: {
		marginBottom: 10,
		padding: 10,
		borderWidth: 1,
		borderColor: '#333',
	},
});

export default SignupScreen;