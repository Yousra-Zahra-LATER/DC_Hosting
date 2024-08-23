import React, { useState } from 'react';
import {
  CCard,
  CCardBody,
  CCardTitle,
  CCardSubtitle,
  CCardText,
  CRow,
  CCol,
} from '@coreui/react';
import './style.css';
export default function Service() {
  const [selectedCard, setSelectedCard] = useState(null);

  // Tableau contenant les données des cartes
  const cardData = [
    {
      title: 'Cloud',
      subtitle: 'Card subtitle 1',
      text: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
    },
    {
      title: 'Web Hosting',
      subtitle: 'Card subtitle 2',
      text: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
    },
    {
      title: 'Database',
      subtitle: 'Card subtitle 3',
      text: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
    },
    {
      title: 'Database',
      subtitle: 'Card subtitle 3',
      text: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
    },
  ];

  return (
    <>
      <h3 className="text-center">Deploy a New Instance</h3>
      <div className="container mt-5">
        <h5 className='mb-4 '>Choose the right plan for your big plans.</h5>
        <CRow>
          {cardData.map((card, index) => (
            <CCol xs={12} md={3} key={index}>
              <CCard style={{ width: '18rem',height:'14rem'}}

                className={`relative mb-4 border-1 transition-all duration-300 hover:bg-blue-50 cursor-pointer ${
                  selectedCard === index ? 'bg-custom-important' : ''
                }`}
                onClick={() => setSelectedCard(index)}
              >
                <CCardBody>
                  {selectedCard === index && (
                    <div className="absolute top-0 right-0 m-2 text-lg ">
                      ✔️
                    </div>
                  )}
                  <CCardTitle>{card.title}</CCardTitle>
                  <CCardSubtitle className="mb-2 text-body-secondary">{card.subtitle}</CCardSubtitle>
                  <CCardText>{card.text}</CCardText>
                </CCardBody>
              </CCard>
            </CCol>
          ))}
        </CRow>
      </div>
    </>
  );
}
