import { useState } from 'react';
import { View, TextInput, TouchableOpacity, FlatList, Text, Image, ImageBackground } from 'react-native';

const zennon = {id: 4, name: "Zennon Sampaio", nationality: "Pernanbucano", birthdate: "2002-05-11", image: "https://lh3.googleusercontent.com/pw/AP1GczO5k-KPyJF7xNfwU2X9tnx7JbQS1TNOg4Su8ZS5iDawSNFX6lYUXjJWPs7MBgWVintyyxn5BlLQSlMGU-tTYtG96evfVUbHMS8rQyphHeKA_LtEa5j085poEOwIAajP3sM5IzZ7PCXh-3wxNU4T2WkU5A=w696-h929-s-no-gm?authuser=0"}
const junior= {id:27, name: "Francisco Júnior", nationality: "Cearense", birthdate: "2002-05-27", image: "https://lh3.googleusercontent.com/pw/AP1GczOElzBVRsU5Bx8YgP-DcJlv8ndvMLpkV-6ENuXXWkkzlCnZxTRY2QCkgeLT0SfUNU9KhS90wgKNLeGV_UQcS6a5cXA-tW80VrJYM49ncVoSlS72WVvVTKfHyUeoeoE6757DrA5LPBRneIdn3DeYYjbX5A=w698-h929-s-no-gm?authuser=0"}
export default function atletas() {
  const [query, setQuery] = useState('');
  const [athletes, setAthletes] = useState([zennon, junior]);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  const searchAthletes = async () => {
    try {
      const response = await fetch(`https://v1.formula-1.api-sports.io/drivers?search=${query}`, {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '32964fc7e9e7669a2586c660fc66aa4b',
          'x-rapidapi-host': 'v1.formula-1.api-sports.io',
        },
      });
      const data = await response.json();
      setAthletes(data.response);
    } catch (error) {
      console.error('Erro na busca:', error);
    }
  };

  const toggleFavorite = (driver) => {
    // Verifica se o driver já está nos favoritos
    if (favorites.some(fav => fav.id === driver.id)) {
      // Remove dos favoritos
      setFavorites(favorites.filter(fav => fav.id !== driver.id));
    } else {
      // Adiciona aos favoritos
      setFavorites([...favorites, driver]);
    }
  };

  // Função para calcular a idade a partir da data de nascimento
  const calculateAge = (birthdate) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Lista de pilotos a ser exibida (favoritos ou todos)
  const driversToDisplay = showFavorites ? favorites : athletes;

  return (
    <ImageBackground src="https://i.pinimg.com/736x/5e/39/d6/5e39d6fe10433c0be13bf166e7803640.jpg" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <View style={{ flex: 1,width: '100%', borderRadius: 10, padding: 20, marginTop: 40, }}>
      <TextInput
        style={{ borderWidth: 1, padding: 10, marginBottom: 10  , borderRadius: 5, backgroundColor: 'rgba(255, 255, 255, 0.8)'}}
        placeholder="Digite o nome do piloto"
        value={query}
        onChangeText={setQuery}
      />
      <TouchableOpacity 
        onPress={searchAthletes} 
        style={{ marginBottom: 10, backgroundColor: '#007BFF', padding: 10, borderRadius: 5 }}>
        <Text style={{ color: 'white', textAlign: 'center' }}>Pesquisar</Text>
      </TouchableOpacity>

      {/* Botão para alternar entre favoritos e todos os pilotos */}
      <TouchableOpacity 
        onPress={() => setShowFavorites(!showFavorites)} 
        style={{ backgroundColor: 'red', padding: 10, marginBottom: 10, borderRadius: 5 }}>
        <Text style={{ color: 'white', textAlign: 'center' }}>
          {showFavorites ? "Mostrar Pesquisa" : "Mostrar Favoritos"}
        </Text>
      </TouchableOpacity>
      <FlatList
        data={driversToDisplay}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 15,marginBottom: 5, borderBottomWidth: 4, borderBottomColor: "red", borderRadius: 5, flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
            <Image 
              source={{ uri: item.image }}
              style={{ width: 80, height: 80, borderRadius: 40, marginRight: 15 }}
            />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.name}</Text>
              <Text>Nacionalidade: {item.nationality}</Text>
              <Text>Idade: {calculateAge(item.birthdate)}</Text>
            </View>
            
            {/* Botão de Favoritar/Desfavoritar */}
            <TouchableOpacity onPress={() => toggleFavorite(item)}>
              <Text style={{ fontSize: 34 }}>
                {favorites.some(fav => fav.id === item.id) ? '★' : '☆'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
    </ImageBackground>
  );
}
