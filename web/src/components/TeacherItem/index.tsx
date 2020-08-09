import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

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
        <a href={`https://wa.me/${teacher.whatsapp}`}>
          <img src={whatsappIcon} alt="whatsapp" />
            Entrar em contato
        </a>
      </footer>
    </article>
  );
}

export default TeacherItem;