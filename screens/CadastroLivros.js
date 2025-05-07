import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import LivroCard from '../components/LivroCard';
import { useDispatch, useSelector } from 'react-redux';
import { incrementar, decrementar } from '../redux/livroSlice';
import { useTema } from '../context/TemaContext';

export default function CadastroLivros({ navigation }) {
  const [livros, setLivros] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [genero, setGenero] = useState('');
  const [capa, setCapa] = useState(null);
  const [idEditar, setIdEditar] = useState(null);

  const dispatch = useDispatch();
  const total = useSelector((state) => state.livros.total);
  const { tema } = useTema();

  // Selecionar imagem da galeria do celular
  const escolherImagem = async () => {
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
    });
    if (!resultado.canceled && resultado.assets && resultado.assets[0].uri) {
      setCapa(resultado.assets[0].uri);
    }
  };

  const salvar = () => {
    if (!titulo || !autor || !genero || !capa) return;

    if (idEditar !== null) {
      setLivros(
        livros.map((livro) =>
          livro.id === idEditar
            ? { ...livro, titulo, autor, genero, capa }
            : livro
        )
      );
      setIdEditar(null);
    } else {
      const novoLivro = {
        id: Date.now(),                  // <--- ID único automático conforme enunciado
        titulo,
        autor,
        genero,
        capa,
      };
      setLivros([...livros, novoLivro]);
      dispatch(incrementar());
    }

    setTitulo('');
    setAutor('');
    setGenero('');
    setCapa(null);
  };

  const editar = (livro) => {
    setTitulo(livro.titulo);
    setAutor(livro.autor);
    setGenero(livro.genero);
    setCapa(livro.capa);
    setIdEditar(livro.id);
  };

  const excluir = (id) => {
    setLivros(livros.filter((l) => l.id !== id));
    dispatch(decrementar());
    if (id === idEditar) {
      setIdEditar(null);
      setTitulo('');
      setAutor('');
      setGenero('');
      setCapa(null);
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: tema === 'claro' ? '#f9f9f9' : '#333' },
      ]}
    >
      <Text
        style={[
          styles.titulo,
          { color: tema === 'claro' ? '#000' : '#fff' },
        ]}
      >
        Total de Livros: {total}
      </Text>

      <TextInput
        placeholder="Título"
        value={titulo}
        onChangeText={setTitulo}
        style={styles.input}
      />
      <TextInput
        placeholder="Autor"
        value={autor}
        onChangeText={setAutor}
        style={styles.input}
      />
      <TextInput
        placeholder="Gênero"
        value={genero}
        onChangeText={setGenero}
        style={styles.input}
      />

      <TouchableOpacity style={styles.uploadButton} onPress={escolherImagem}>
        <Text style={styles.uploadText}>Selecionar Imagem da Capa</Text>
      </TouchableOpacity>

      {capa && <Image source={{ uri: capa }} style={styles.preview} />}

      <Button
        title={idEditar !== null ? 'Atualizar' : 'Cadastrar'}
        onPress={salvar}
      />

      <FlatList
        data={livros}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <LivroCard livro={item} onEditar={editar} onExcluir={excluir} />
        )}
      />

      <View style={{ marginTop: 20 }}>
        <Button
          title="Ir para Configurações"
          onPress={() => navigation.navigate('Configuracoes')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  titulo: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  uploadButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 10,
  },
  uploadText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  preview: {
    width: 120,
    height: 120,
    marginBottom: 10,
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: '#ddd',
  },
});