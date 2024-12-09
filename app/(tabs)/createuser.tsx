import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Text, View } from 'react-native';
import { db } from '../../FirebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

export default function CriarUsuario() {
  const [nome, setNome] = useState('');
  const [nif, setNif] = useState('');

  const criarUsuario = async () => {
    if (nif.length !== 9 || isNaN(Number(nif))) {
      console.log("NIF inválido. Deve conter exatamente 9 dígitos.");
      return;
    }

    await addDoc(collection(db, 'usuarios'), { nome, nif, saldo: 0 });
    setNome('');
    setNif('');
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Nome" value={nome} onChangeText={setNome} style={styles.input} />
      <TextInput placeholder="NIF (9 dígitos)" value={nif} onChangeText={setNif} keyboardType="numeric" style={styles.input} />
      <TouchableOpacity style={styles.button} onPress={criarUsuario}>
      <Text style={styles.buttonText}>Criar Usuário</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: { height: 50, borderColor: 'gray', borderWidth: 1, marginBottom: 20, padding: 10 },
  button: { padding: 15, backgroundColor: '#4CAF50', alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
