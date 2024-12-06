import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, View, Text, TouchableOpacity, Alert } from 'react-native';
import { db } from '../../FirebaseConfig';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

export default function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState<any>([]);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const data = await getDocs(collection(db, 'usuarios'));
      setUsuarios(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  const deletarUsuario = async (usuarioId: string) => {
    try {
      await deleteDoc(doc(db, 'usuarios', usuarioId));
      Alert.alert("Sucesso", "Usuário deletado com sucesso.");
      fetchUsuarios(); // Atualiza a lista após apagar
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
      Alert.alert("Erro", "Ocorreu um erro ao tentar deletar o usuário.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Usuários</Text>
      <FlatList
        data={usuarios}
        renderItem={({ item }) => (
          <View style={styles.usuarioBox}>
            <View style={styles.usuarioInfo}>
              <Text style={styles.usuarioText}>Nome: {item.nome}</Text>
              <Text style={styles.usuarioText}>NIF: {item.nif}</Text>
              <Text style={styles.usuarioText}>Saldo: {item.saldo.toFixed(2)}</Text>
            </View>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() =>
                Alert.alert(
                  "Confirmar exclusão",
                  `Deseja excluir o usuário ${item.nome}?`,
                  [
                    { text: "Cancelar", style: "cancel" },
                    { text: "Excluir", style: "destructive", onPress: () => deletarUsuario(item.id) },
                  ]
                )
              }
            >
              <Text style={styles.deleteButtonText}>X</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />

      <TouchableOpacity style={styles.button} onPress={fetchUsuarios}>
        <Text style={styles.buttonText}>Atualizar Lista</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  usuarioBox: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: 'row', // Alinha o texto e o botão na mesma linha
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  usuarioInfo: {
    flex: 1, // Permite que o texto ocupe a maior parte do espaço
  },
  usuarioText: { fontSize: 16, color: '#333' },
  deleteButton: {
    backgroundColor: '#ff4d4d',
    padding: 5,
    borderRadius: 5,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  deleteButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  button: {
    padding: 15,
    backgroundColor: '#4CAF50',
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
