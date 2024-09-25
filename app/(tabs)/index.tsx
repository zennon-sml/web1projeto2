import { View, Text, Button, ImageBackground,TextInput  } from 'react-native';
import { useRouter } from 'expo-router';

export default function App() {
  const router = useRouter();

  return (
    <ImageBackground src="https://i.pinimg.com/736x/8d/06/2c/8d062ca108e5ba761aaf84eec75d9bf8.jpg" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ width: '90%', backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: 10, padding: 20, marginTop: 200 }}>
        <Text style={{textAlign: 'center', fontSize: 24, marginBottom: 20 }}>WEB1 PROJETO2</Text>
        
        <TextInput
          placeholder='Usuário'
          style={{
            width: '100%',
            borderWidth: 1,
            padding: 10,
            marginBottom: 15,
            borderRadius: 5
          }}
        />
        
        <TextInput
          placeholder='Senha'
          secureTextEntry={true}
          style={{
            width: '100%',
            borderWidth: 1,
            padding: 10,
            marginBottom: 20,
            borderRadius: 5
          }}
        />

        <Button title="Entrar" onPress={() => router.push('/atletas')} />
      </View>
    </ImageBackground>
  );
}