import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert, Modal, TextInput, ScrollView } from 'react-native';

const VerDoacoes = () => {
    const [doacoes, setDoacoes] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [doacaoAtualizar, setDoacaoAtualizar] = useState({ id: '', nome: '', cpf: '', item: '' });

    useEffect(() => {
        fetch('http://localhost:3000/doacoes')
            .then((response) => response.json())
            .then((data) => setDoacoes(data))
            .catch((error) => console.error(error));
    }, []);

    const handleUpdate = (id) => {
        const selectedDoacao = doacoes.find((doacao) => doacao._id === id);
        setDoacaoAtualizar({ ...selectedDoacao, id });
        setModalVisible(true);
    };

    const handleSave = () => {
        const { id, nome, cpf, item } = doacaoAtualizar;
        const updatedDoacao = { nome, cpf, item };

        fetch(`http://localhost:3000/doacoes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedDoacao),
        })
            .then((response) => response.json())
            .then((data) => {
                // Atualização bem-sucedida, atualize a lista de doações
                const updatedList = doacoes.map((doacao) =>
                    doacao._id === id ? data : doacao
                );
                setDoacoes(updatedList);
                setModalVisible(false);
                Alert.alert('Doação atualizada com sucesso!');
            })
            .catch((error) => {
                console.error(error);
                Alert.alert('Erro ao atualizar a doação.');
            });
    };

    const handleDelete = (id) => {
        fetch(`http://localhost:3000/doacoes/${id}`, {
            method: 'DELETE',
        })
            .then(() => {
                // Remoção bem-sucedida, remova a doação da lista
                const updatedList = doacoes.filter((doacao) => doacao._id !== id);
                setDoacoes(updatedList);
                Alert.alert('Doação removida com sucesso!');
            })
            .catch((error) => {
                console.error(error);
                Alert.alert('Erro ao remover a doação.');
            });
    };

    return (
        <ScrollView>
            <View style={{ marginVertical: 20 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Lista de Doações:</Text>
                {doacoes.map((doacao) => (
                    <View key={doacao._id} style={{ marginBottom: 20 }}>
                        <Text>Nome: {doacao.nome}</Text>
                        <Text>CPF: {doacao.cpf}</Text>
                        <Text>Item: {doacao.item}</Text>
                        <Button
                            title="Atualizar"
                            onPress={() => handleUpdate(doacao._id)}
                            color="green" // Definindo a cor do botão como verde
                        />
                        <Button
                            title="Deletar"
                            onPress={() => handleDelete(doacao._id)}
                            color="red" // Definindo a cor do botão como vermelho
                        />
                    </View>
                ))}
            </View>

            <Modal visible={modalVisible} animationType="slide">
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Atualizar Doação</Text>
                    <TextInput
                        value={doacaoAtualizar.nome}
                        onChangeText={(text) => setDoacaoAtualizar({ ...doacaoAtualizar, nome: text })}
                        placeholder="Nome"
                        style={{ borderWidth: 1, padding: 10, width: 200, marginVertical: 10 }}
                    />
                    <TextInput
                        value={doacaoAtualizar.cpf}
                        onChangeText={(text) => setDoacaoAtualizar({ ...doacaoAtualizar, cpf: text })}
                        placeholder="CPF"
                        style={{ borderWidth: 1, padding: 10, width: 200, marginVertical: 10 }}
                    />
                    <TextInput
                        value={doacaoAtualizar.item}
                        onChangeText={(text) => setDoacaoAtualizar({ ...doacaoAtualizar, item: text })}
                        placeholder="Item"
                        style={{ borderWidth: 1, padding: 10, width: 200, marginVertical: 10 }}
                    />
                    <Button title="Salvar" onPress={handleSave} />
                    <Button title="Cancelar" onPress={() => setModalVisible(false)} />
                </View>
            </Modal>
        </ScrollView>
    );
};

export default VerDoacoes;
