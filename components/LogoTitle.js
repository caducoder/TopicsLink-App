import { View, Text, Image, StyleSheet } from 'react-native';

function LogoTitle({ title }) {
  return (
    <View style={styles.container} >
      <Image
        style={{ width: 100, height: 50 }}
        source={require('../assets/logo-topicslink.png')}
      />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100vw'
  },
  image: {
    width: 120,
    height: 50,
  },
  title: {
    fontSize: 18,
    fontWeight: 500,
    marginRight: 30
  }
});

export default LogoTitle;