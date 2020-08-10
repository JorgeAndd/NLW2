import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import api from '../../services/api';

import styles from './styles';

function Favorites() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [favoritesData, setFavoritesData] = useState<Teacher[]>([]);

  useEffect(() => {
    AsyncStorage.getItem('favorites')
      .then(response => {
        if (response) {
          setFavorites(JSON.parse(response));
        }
      })
  }, []);

  useEffect(() => {
    getTeachersData(favorites);
  }, [favorites])

  async function getTeachersData(ids: number[]) {
    const data = await Promise.all(favorites.map(async (id) => {
      const user = await api.get('users', {
        params: { id }
      });

      return user.data;
    }));

    setFavoritesData(data);
  }

  return (
    <View style={styles.container}>
      <PageHeader title="Meus Favoritos" />

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >

        {favoritesData.map((teacher: Teacher) =>
          <TeacherItem
            key={teacher.id}
            teacher={teacher}
            favorited={favorites.includes(teacher.id)}
          />)
        }

      </ScrollView>


    </View>
  );
}

export default Favorites;