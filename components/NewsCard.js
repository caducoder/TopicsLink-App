import { Card, Text } from 'react-native-paper';
import { StyleSheet, View, Button } from 'react-native';
import { format } from 'date-fns';

export const NewsCard = ({ props, navigation }) => {

  return (
    <Card style={styles.item}>
      <Card.Cover source={{ uri: props.item.image }} />
      <Card.Content style={styles.conteudo}>
        <Text variant="titleMedium">{props.item.title}</Text>
        <View style={styles.fonte}>
          <Text variant="bodyMedium">{props.item.source.name}</Text>
          <Text variant="bodyMedium">
            {format(new Date(props.item.publishedAt), 'HH:mm dd/MM/yyyy')}
          </Text>
        </View>
      </Card.Content>
      <Card.Actions>
        <Button
          title='Acessar'
          onPress={() => navigation.navigate('Detalhes', {
            descricao: props.item.description,
            conteudo: props.item.content,
            link: props.item.url
          })}
        />
      </Card.Actions>
    </Card>
  )
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fefefe',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  conteudo: {
    padding: 0
  },
  fonte: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});