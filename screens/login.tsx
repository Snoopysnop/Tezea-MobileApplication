// LoginScreen.js

import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();


  
  const handleLogin = () => {
    // Votre logique de connexion ici
    if (username === 'user' && password === 'password') {
      // Connexion réussie, rediriger l'utilisateur vers la page suivante
      console.log('Login successful');
      navigation.navigate("WorkSiteList")
      
    } else {
      // Afficher un message d'erreur si les identifiants sont incorrects
      setLoginError('Nom d\'utilisateur ou mot de passe incorrect');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={require('../assets/tezea-logoCroped.png')} style={styles.logo} />
        <TextInput
          style={styles.input}
          placeholder="Nom d'utilisateur"
          onChangeText={setUsername}
          value={username}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
          autoCapitalize="none"
        />
        <Button title="Se connecter" onPress={handleLogin} />
        {loginError ? <Text style={styles.error}>{loginError}</Text> : null}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: 20,
        paddingBottom:100,
  

      },
      logo: {
        width: '80%',
        height: 150,
        marginBottom: 20,
        resizeMode: 'contain',
      },
      input: {
        width: 300,
        height: 50,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        fontSize: 18,
      },
      error: {
        color: 'red',
        marginTop: 10,
      },
      scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      },
});

export {LoginScreen};
