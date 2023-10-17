import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useGetPokemonByNameQuery } from './services/pokemon';

const container = () => {
  const { data, error, isLoading } = useGetPokemonByNameQuery('bulbasaur')

  return (
    <View style={styles.container}>
      {error ? (
        <Text>Oh no, there was an error</Text>
      ) : isLoading ? (
        <Text>Loading...</Text>
      ) : data ? (
        <>
          <Text>{data.species.name}</Text>
          <Image
            accessibilityLabel={data.species.name}
            source={{
              uri: data.sprites.front_shiny,
            }}
            style={styles.tinyLogo}
          />
        </>
      ) : null}
    </View>
  )
}

export default container

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tinyLogo: {
    width: 96,
    height: 96,
  },
});