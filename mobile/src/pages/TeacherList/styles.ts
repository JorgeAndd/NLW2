import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F7',
  },

  teacherList: {
    marginTop: 10,
  },

  searchForm: {
    marginTop: 20,
  },

  label: {
    fontFamily: 'Poppins_400Regular',
    color: '#D4C2FF',
  },

  inputGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  inputBlock: {
    width: '48%',
  },

  input: {
    height: 54,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginTop: 4,
    marginBottom: 16,
  },

  searchButton: {
    backgroundColor: '#04D361',
    height: 56,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  searchButtonText: {
    fontFamily: 'Archivo_700Bold',
    color: '#FFF',
    fontSize: 16,
  }
});

export default styles;