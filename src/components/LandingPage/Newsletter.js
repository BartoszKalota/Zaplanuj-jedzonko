import React, {useState} from 'react';
import {Container, Row} from 'react-bootstrap';

const Newsletter = ({onAddToNewsletter}) => {
  // Użycie formularza kontrolowanego - żeby za pomocą state'a zmienić
  // napis na przycisku newslettera na Wysłano
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleOnChange = ({target: {value}}) => setEmail(value);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    onAddToNewsletter(email);
    setIsSubmitted(true);
  };

  return (
    <Row className='newsletter-row'>
      <Container className='newsletter-container'>
        <h4>Zapisz się do naszego newslettera</h4>
        <form className='newsletter-form' onSubmit={handleOnSubmit}>
          <input
            placeholder='Podaj adres e-mail'
            type='email'
            value={email}
            disabled={isSubmitted}
            onChange={handleOnChange}
          />
          <button
            type='submit'
            disabled={isSubmitted}
            className={isSubmitted ? 'added-to-newsletter' : ''}
          >
            {isSubmitted ? 'Wysłano' : 'Zapisuję się!'}
          </button>
        </form>
      </Container>
    </Row>
  );
}

export default Newsletter;