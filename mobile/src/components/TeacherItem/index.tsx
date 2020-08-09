import React from 'react';
import { View, Image, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';

import styles from './styles';

function TeacherItem() {
  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image
          style={styles.avatar}
          source={{
            uri: 'https://avatars0.githubusercontent.com/u/5915194?v=4'
          }}
        />

        <View style={styles.profileInfo}>
          <Text style={styles.name}>Jorge Andrade</Text>
          <Text style={styles.subject}>Física</Text>
        </View>
      </View>

      <Text style={styles.bio}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Aliquam rhoncus justo et lacinia hendrerit. Nunc viverra ante eget diam interdum cursus.
        Sed vitae lectus consequat, rutrum diam tristique, sagittis erat.
      </Text>

      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço/hora {'   '}
          <Text style={styles.priceValue}>R$ 20,00</Text>
        </Text>

        <View style={styles.buttonsContainer}>
          <RectButton style={styles.favoriteButton}>
            <Image source={heartOutlineIcon} />
          </RectButton>

          <RectButton style={styles.contactButton}>
            <Image source={whatsappIcon} />
            <Text style={styles.contactButtonText}>Entrar em contato</Text>
          </RectButton>
        </View>
      </View>
    </View>
  )
}

export default TeacherItem;