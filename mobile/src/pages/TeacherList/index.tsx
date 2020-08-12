import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TextInput } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import { Picker } from 'react-native'

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import api from '../../services/api';

import styles from './styles';

function TeacherList() {
  const [teachers, setTeachers] = useState([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showingFilters, setShowingFilters] = useState(false);

  const [subject, setSubject] = useState('');
  const [week_day, setWeekday] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('favorites')
      .then(response => {
        if (response) {
          setFavorites(JSON.parse(response));
        }
      })

  }, []);

  function handleToggleFilters() {
    setShowingFilters(!showingFilters);
  }

  async function filter() {
    console.log(subject, week_day, time);

    const response = await api.get('classes', {
      params: {
        subject,
        week_day,
        time,
      }
    });

    setShowingFilters(false);
    setTeachers(response.data);
  }

  return (
    <View style={styles.container}>
      <PageHeader
        title="Proffys disponíveis"
        headerRight={
          <BorderlessButton onPress={handleToggleFilters}>
            <Feather name="filter" size={20} color="#FFF" />
          </BorderlessButton>
        }
      >
        {showingFilters && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>

            <Picker
              selectedValue={subject}
              style={styles.input}
              onValueChange={(value) => setSubject(value)}
            >
              <Picker.Item value='Artes' label='Artes' />
              <Picker.Item value='Física' label='Física' />
              <Picker.Item value='Matemática' label='Matemática' />
              <Picker.Item value='Química' label='Química' />
              <Picker.Item value='Geografia' label='Geografia' />
              <Picker.Item value='Português' label='Português' />
              <Picker.Item value='História' label='História' />
              <Picker.Item value='Biologia' label='Biologia' />
            </Picker>

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>

                <Picker
                  selectedValue={week_day}
                  style={styles.input}
                  onValueChange={(value) => setWeekday(value)}
                >
                  <Picker.Item value='0' label='Domingo' />
                  <Picker.Item value='1' label='Segunda-feira' />
                  <Picker.Item value='2' label='Terça-feira' />
                  <Picker.Item value='3' label='Quarta-feira' />
                  <Picker.Item value='4' label='Quinta-feira' />
                  <Picker.Item value='5' label='Sexta-feira' />
                  <Picker.Item value='6' label='Sábado' />
                </Picker>
              </View>

              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput
                  style={styles.input}
                  value={time}
                  onChangeText={text => setTime(text)}
                  placeholder='Qual o horário?'
                  placeholderTextColor='#C1BCCC'
                />
              </View>
            </View>

            <RectButton
              style={styles.searchButton}
              onPress={filter}
            >
              <Text style={styles.searchButtonText}>Buscar</Text>
            </RectButton>

          </View>
        )}
      </PageHeader>

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {teachers.map((teacher: Teacher) =>
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

export default TeacherList;