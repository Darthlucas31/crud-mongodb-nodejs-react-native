import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Criar from './criar'
import Verdoacoes from './verdoacoes'

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Criar" component={Criar} />
        <Stack.Screen name="VerDoacoes" component={Verdoacoes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
