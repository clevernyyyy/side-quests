import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './Home.css';

import { Banner } from '../../components/Banner/Banner';
import { RecentUploads } from '../../components/RecentUploads/RecentUploads';


export function Home({ data }) {


  return (
    <>
      <Banner />
      <Row className="text-center">
        <Col xs={12}>
          <h3>Home Page</h3>
        </Col>
      </Row>
      <Row className='my-4'>
        <Col xs={12} lg={{ span: 8, offset: 2 }}>
          <RecentUploads data={data} />
        </Col>
      </Row>
      
    </>

  )

}