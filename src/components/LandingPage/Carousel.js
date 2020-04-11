import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';

/* Korzystając z react-bootstrapowej karuzeli nie mogłem znaleźć 
*  sposobu (w rozsądnym czasie) na rozciągnięcie obrazków z karuzeli
*  na 100% szerokości (żeby wystawały poza grid).
*  Postanowiłem improwizować, żeby uzyskać pożądany efekt.
*/
import bgImg1 from '../../assets/carousel-bg1.jpg'; 
import bgImg2 from '../../assets/carousel-bg2.jpg'; 
import bgImg3 from '../../assets/carousel-bg3.jpg'; 
const bgImages = [bgImg1, bgImg2, bgImg3];

const Carousel = () => {
  const [index, setIndex] = useState(0);

  const handleOnIncrement = () => {
    setIndex(prevState => prevState + 1)
  };

  const handleOnDecrement = () => {
    setIndex(prevState => prevState - 1)
  };

  useEffect(() => {
    if (index > bgImages.length - 1) {
      setIndex(0);
    }
    if (index < 0) {
      setIndex(bgImages.length - 1);
    }
  }, [index]);
  
  return (
    <Row
      className='carousel-row'
      style={{backgroundImage: `url(${bgImages[index]})`}}
    >
      <Container className='carousel-container' id='section-1'>
        <div className='arrow' onClick={handleOnDecrement}>
          <i className="fas fa-chevron-left"></i>
        </div>
        <h1>Carousel</h1>
        <div className='arrow' onClick={handleOnIncrement}>
          <i className="fas fa-chevron-right"></i>
        </div>
      </Container>
    </Row>
  );
}

export default Carousel;