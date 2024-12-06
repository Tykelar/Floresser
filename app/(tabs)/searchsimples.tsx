/* import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Text, View } from 'react-native';
import { db } from '../../FirebaseConfig';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';

export default function EditarSaldo() {
  const [nif, setNif] = useState('');
  const [usuario, setUsuario] = useState<any>(null);
  const [saldoAlteracao, setSaldoAlteracao] = useState('');

  const buscarUsuario = async () => {
    const q = query(collection(db, 'usuarios'), where('nif', '==', nif));
    const data = await getDocs(q);
    if (!data.empty) {
      setUsuario({ ...data.docs[0].data(), id: data.docs[0].id });
    } else {
      console.log('Usuário não encontrado.');
      setUsuario(null);
    }
  };

  const atualizarSaldo = async () => {
    if (usuario && !isNaN(Number(saldoAlteracao))) {
      const novoSaldo = usuario.saldo + parseFloat(saldoAlteracao);
      await updateDoc(doc(db, 'usuarios', usuario.id), { saldo: novoSaldo });
      setUsuario({ ...usuario, saldo: novoSaldo });
      setSaldoAlteracao('');
    } else {
      console.log('Saldo inválido.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscar e Editar Saldo</Text>
      <TextInput
        placeholder="Buscar por NIF"
        value={nif}
        onChangeText={setNif}
        style={styles.input}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={buscarUsuario}>
        <Text style={styles.buttonText}>Buscar Usuário</Text>
      </TouchableOpacity>
      {usuario && (
        <View style={styles.usuarioContainer}>
          <Text style={styles.label}>Nome: {usuario.nome}</Text>
          <Text style={styles.label}>Saldo Atual: {usuario.saldo.toFixed(2)}</Text>
          <TextInput
            placeholder="Adicionar/Remover Saldo"
            value={saldoAlteracao}
            onChangeText={setSaldoAlteracao}
            style={styles.input}
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.button} onPress={atualizarSaldo}>
            <Text style={styles.buttonText}>Atualizar Saldo</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { height: 50, borderColor: 'gray', borderWidth: 1, marginBottom: 20, padding: 10, width: '80%', borderRadius: 5 },
  button: { padding: 15, backgroundColor: '#4CAF50', alignItems: 'center', borderRadius: 5, width: '80%' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  usuarioContainer: { marginTop: 20, width: '80%', alignItems: 'center' },
  label: { fontSize: 16, marginBottom: 10 },
});

*/