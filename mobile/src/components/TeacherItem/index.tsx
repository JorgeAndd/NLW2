import React, { useState } from 'react';
import { View, Image, Text, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';

import styles from './styles';

export interface Teacher {
  id: number;
  avatar: string;
  bio: string;
  cost: number;
  name: string;
  subject: string;
  whatsapp: string;
}

interface TeacherItemProps {
  teacher: Teacher;
  favorited: boolean;
}

const TeacherItem: React.FC<TeacherItemProps> = (props) => {
  const { teacher, favorited } = props;

  const [isFavorited, setIsFavorited] = useState(favorited);

  function handleWhatsapp() {
    Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`);
  }

  async function handleToggleFavorite() {
    const storedFavoritesJson = await AsyncStorage.getItem('favorites');
    let favorites = []

    if (storedFavoritesJson) {
      favorites = JSON.parse(storedFavoritesJson);
    }

    if (isFavorited) {
      const index = favorites.indexOf(teacher.id);
      if (index > -1) {
        favorites.splice(index, 1);
      }
    } else {
      favorites.push(teacher.id);
    }

    setIsFavorited(!isFavorited);
    await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
  }

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image
          style={styles.avatar}
          source={{
            uri: teacher.avatar
          }}
        />

        <View style={styles.profileInfo}>
          <Text style={styles.name}>{teacher.name}</Text>
          <Text style={styles.subject}>{teacher.subject}</Text>
        </View>
      </View>

      <Text style={styles.bio}>
        {teacher.bio}
      </Text>

      <View style={styles.footer}>
        {teacher.cost &&
          <Text style={styles.price}>
            Preço/hora {'   '}
            <Text style={styles.priceValue}>R$ {teacher.cost}</Text>
          </Text>
        }

        <View style={styles.buttonsContainer}>
          <RectButton
            style={[styles.favoriteButton, isFavorited ? styles.favorited : {}]}
            onPress={handleToggleFavorite}
          >
            <Image source={isFavorited ? unfavoriteIcon : heartOutlineIcon} />
          </RectButton>

          <RectButton
            style={styles.contactButton}
            onPress={handleWhatsapp}
          >
            <Image source={whatsappIcon} />
            <Text style={styles.contactButtonText}>Entrar em contato</Text>
          </RectButton>
        </View>
      </View>
    </View>
  )
}

export default TeacherItem;