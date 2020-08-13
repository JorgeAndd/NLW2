import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TextInput } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import { Picker } from 'react-native';
import { Event } from '@react-native-community/datetimepicker';
import moment from 'moment';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import api from '../../services/api';

import styles from './styles';
import RNDateTimePicker from '@react-native-community/datetimepicker';

function TeacherList() {
  const [teachers, setTeachers] = useState([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showingFilters, setShowingFilters] = useState(false);
  const [selectingTime, setSelectingTime] = useState(false);

  const [subject, setSubject] = useState('');
  const [week_day, setWeekday] = useState('');
  const [time, setTime] = useState(new Date());

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

  function handleChangeSubject(value: string) {
    if (value !== '') {
      setSubject(value);
    }
  }

  function handleChangeWeekday(value: string) {
    if (value !== '') {
      setWeekday(value);
    }
  }

  function canSearch() {
    return subject !== '' && week_day !== '';
  }

  function onChangeTime(event: Event, selectedTime?: Date) {
    setSelectingTime(false);
    setTime(selectedTime || time);
  }

  function getTimeAsString(time: Date) {
    const timeAsString = moment(time).format('HH:mm');
    return timeAsString;
  }

  async function filter() {
    const timeAsString = moment(time).format('HH:mm');

    try {
      const response = await api.get('classes', {
        params: {
          subject,
          week_day,
          time: timeAsString,
        }
      });

      setTeachers(response.data);
    } catch (error) {
      alert('Erro ao recuperar professores');
    }


    setShowingFilters(false);

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
              onValueChange={handleChangeSubject}
            >
              <Picker.Item value='' label='Escolha uma matéria' />
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
                  onValueChange={handleChangeWeekday}
                >
                  <Picker.Item value='' label='Escolha dia' />
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
                  value={getTimeAsString(time)}
                  onTouchStart={() => setSelectingTime(true)}
                  placeholder='Qual o horário?'
                  placeholderTextColor='#C1BCCC'
                />

                {selectingTime && (
                  <RNDateTimePicker
                    mode="time"
                    value={time}
                    onChange={onChangeTime}
                  />
                )}
              </View>
            </View>

            <RectButton
              style={
                canSearch() ?
                  styles.searchButton :
                  { ...styles.searchButton, ...styles.searchButtonDisabled }
              }
              enabled={canSearch()}
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