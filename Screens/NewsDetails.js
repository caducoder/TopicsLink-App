import { View, Linking, StyleSheet } from 'react-native';
import { Text, Divider } from 'react-native-paper';

function NewsDetails({ route }) {
  return (
    <View style={styles.container}>
      <Text variant='titleLarge' style={styles.descricao}>
        {route.params.descricao}
      </Text>
      <Text variant='bodyMedium' style={styles.conteudo}>
        {route.params.conteudo}
      </Text>
      <Divider />
      <Text style={styles.textStyle}>
        Ver mais no{' '}
        <Text
          style={styles.hyperlinkStyle}
          onPress={() => Linking.openURL(route.params.link)}>
          site da notícia
        </Text>
      </Text>
    </View>
  );
}

export default NewsDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '5px',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  descricao: {
    marginBottom: '20px',
    textAlign: 'justify'
  },
  conteudo: {
    marginBottom: '20px'
  },
  textStyle: {
    fontSize: 20,
  },
  hyperlinkStyle: {
    color: 'blue',
  },
});