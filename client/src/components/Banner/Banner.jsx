import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

import './Banner.css';

// yup, cannot for the life of me get django to recognize an image referenced like this
// so I stuck it in the django scoreboard/static folder and ref directly via abs path
// fix later if you can figure it out, idiot
// import imgUrl from 'src/assets/kernelcon_logo.png';
// import imgUrl from '../../assets/kernelcon_logo.png';
// import imgUrl from './kernelcon_logo.png';


export function Banner() {

  return (
    <>
      <Row className="my-4">
        <Col xs={12} lg={{ span: 8, offset: 2 }} >
          <Image src='static/images/kernelcon_logo.png' fluid />
        </Col>
      </Row>

    </>
  )

}