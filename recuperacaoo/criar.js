import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Criar = () => {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [item, setItem] = useState('');

  const navigation = useNavigation();

  const irParaListarDoacoes = () => {
    navigation.navigate('VerDoacoes');
  };

  const handleCadastrarDoacao = () => {
    const doacao = {
      nome: nome,
      cpf: cpf,
      item: item,
    };

    fetch('http://localhost:3000/doacoes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(doacao),
    })
      .then(response => response.json())
      .then(data => {
        Alert.alert('Sucesso', 'Doação cadastrada com sucesso!');
        setNome('');
        setCpf('');
        setItem('');
      })
      .catch(error => {
        console.error(error);
        Alert.alert('Erro', 'Ocorreu um erro ao cadastrar a doação.');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Cadastro de Doação</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={text => setNome(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="CPF"
        value={cpf}
        onChangeText={text => setCpf(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Item"
        value={item}
        onChangeText={text => setItem(text)}
      />
      <View style={styles.buttonContainer}>
        <Button title="Cadastrar" onPress={handleCadastrarDoacao} color="green" />
        <Button title="Minhas Doações" onPress={irParaListarDoacoes} color="brown" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 10,
  },
});

export default Criar;
