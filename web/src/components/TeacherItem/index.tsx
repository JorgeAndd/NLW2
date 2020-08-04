import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

function TeacherItem() {
  return (
    <article className="teacher-item">
      <header>
        <img src="https://avatars0.githubusercontent.com/u/5915194?s=460&u=7b4f6b1f167f91841f3db53984eb52c87f486c2d&v=4" />
        <div>
          <strong>Jorge Luiz Andrade</strong>
          <span>Física</span>
        </div>
      </header>

      <p>
        We're acquainted with the wormhole phenomenon, but this...
        <br /> <br />
        Is a remarkable piece of bio-electronic engineering by which I see much of the EM spectrum ranging from heat and infrared through radio waves, et cetera, and forgive me if I've said and listened to this a thousand times. This planet's interior heat provides an abundance of geothermal energy. We need to neutralize the homing signal.
      </p>

      <footer>
        <p>
          Preço/hora
          <strong>R$ 50,00</strong>
        </p>
        <button type="button">
          <img src={whatsappIcon} alt="whatsapp" />
            Entrar em contato
          </button>
      </footer>
    </article>
  );
}

export default TeacherItem;