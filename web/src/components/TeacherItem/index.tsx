import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';
import api from '../../services/api';

export interface Teacher {
  id: number;
  avatar: string;
  bio: string;
  cost: number;
  name: string;
  subject: string;
  whatsapp: string;
}

interface TeacherProps {
  teacher: Teacher;
}

const TeacherItem: React.FC<TeacherProps> = (props) => {
  const { teacher } = props;

  function handleWhatsapp(phoneNumber: string) {
    api.post('connections', {
      user_id: teacher.id,
    });

    window.open(`https://wa.me/${phoneNumber}`);
  }

  return (
    <article className="teacher-item">
      <header>
        <img
          src={teacher.avatar}
          alt="avatar"
        />
        <div>
          <strong>{teacher.name}</strong>
          <span>{teacher.subject}</span>
        </div>
      </header>

      <p>
        {teacher.bio}
      </p>

      <footer>
        <p>
          Preço/hora
          <strong>R$ {teacher.cost}</strong>
        </p>
        <button onClick={() => handleWhatsapp(teacher.whatsapp)}>
          <img src={whatsappIcon} alt="whatsapp" />
            Entrar em contato
        </button>
      </footer>
    </article>
  );
}

export default TeacherItem;