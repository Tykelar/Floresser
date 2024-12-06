import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Text, View, FlatList } from 'react-native';
import { db } from '../../FirebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default function EditarSaldo() {
  const [nif, setNif] = useState('');
  const [usuario, setUsuario] = useState<any>(null);
  const [transacoes, setTransacoes] = useState<any[]>([]);

  const buscarUsuario = async () => {
    const q = query(collection(db, 'usuarios'), where('nif', '==', nif));
    const data = await getDocs(q);
    if (!data.empty) {
      const usuarioData = { ...data.docs[0].data(), id: data.docs[0].id };
      setUsuario(usuarioData);
      await buscarTransacoes(usuarioData.id);
    } else {
      console.log('Usuário não encontrado.');
      setUsuario(null);
      setTransacoes([]);
    }
  };

  const buscarTransacoes = async (usuarioId: string) => {
    const q = query(collection(db, 'transacoes'), where('usuarioId', '==', usuarioId));
    const data = await getDocs(q);
    const transacoesArray = data.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setTransacoes(transacoesArray);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico de Transações</Text>
      <TextInput
        placeholder="Procurar por NIF"
        value={nif}
        onChangeText={setNif}
        style={styles.input}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={buscarUsuario}>
        <Text style={styles.buttonText}>Procurar</Text>
      </TouchableOpacity>

      {usuario && (
        <View style={styles.usuarioContainer}>
          <Text style={styles.label}>Nome: {usuario.nome}</Text>
          <Text style={styles.subTitle}>Histórico de Transações:</Text>
          <View style={{ flex: 1, width: '100%' }}>
            <FlatList
              data={transacoes}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <View style={styles.transacaoItem}>
                  <Text style={styles.transacaoText}>Valor: {item.valorAlteracao.toFixed(2)}</Text>
                  <Text style={styles.transacaoText}>Saldo Anterior: {item.saldoAnterior.toFixed(2)}</Text>
                  <Text style={styles.transacaoText}>Saldo Final: {item.saldoFinal.toFixed(2)}</Text>
                  <Text style={styles.transacaoText}>Justificativo: {item.justificacao}</Text>
                  <Text style={styles.transacaoText}>Data: {new Date(item.data).toLocaleString()}</Text>
                </View>
              )}
              contentContainerStyle={{ paddingBottom: 20 }}
            />
          </View>
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
  usuarioContainer: { flex: 1, marginTop: 20, width: '100%' },
  label: { fontSize: 16, marginBottom: 10 },
  subTitle: { fontSize: 20, fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
  transacaoItem: { backgroundColor: '#f0f0f0', padding: 10, marginVertical: 5, borderRadius: 5, width: '100%' },
  transacaoText: { fontSize: 14 },
});
