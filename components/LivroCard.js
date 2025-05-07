import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';

export default function LivroCard({ livro, onEditar, onExcluir }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: livro.capa }} style={styles.imagem} />
      <View style={styles.info}>
        <Text style={styles.titulo}>{livro.titulo}</Text>
        <Text style={styles.id}>ID: {livro.id}</Text>
        <Text style={styles.autor}>Autor: {livro.autor}</Text>
        <Text style={styles.genero}>Gênero: {livro.genero}</Text>
        <View style={styles.botoes}>
          <Button title="Editar" onPress={() => onEditar(livro)} />
          <Button title="Excluir" onPress={() => onExcluir(livro.id)} color="#c00" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
  },
  imagem: {
    width: 80,
    height: 120,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: '#eee',
  },
  info: {
    flex: 1,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  id: {
    fontSize: 13,
    color: '#444',
    marginBottom: 2,
  },
  autor: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  genero: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  botoes: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
});