import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { auth } from '../../FirebaseConfig';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function TabOneScreen() {
  const router = useRouter(); // Ensure router is initialized

  useEffect(() => {
    // Configura o listener apenas uma vez
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        console.log('No user, redirecting to login'); // Debugging
        router.replace('../'); // Redireciona apenas se não houver usuário
      }
    });

    // Cleanup: remove o listener ao desmontar
    return () => unsubscribe();
  }, []); // Dependência vazia garante execução única

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sair da Conta</Text>
      <TouchableOpacity style={styles.button} onPress={async () => {
        try {
          console.log('Logout button pressed'); // Debugging
          await auth.signOut(); // Realiza o logout
          console.log('Signed out, redirecting to login'); // Debugging
          router.replace('../'); // Redireciona para a tela de login
          console.log('Router replace called'); // Additional Debugging
        } catch (error) {
          console.error('Erro ao sair:', error);
        }
      }}>
        <Text style={styles.text}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFAFA', 
  },
  title: {
    fontSize: 28, 
    fontWeight: '800',
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'blue',
  },
  text: {
    color: 'white',
  },
});
