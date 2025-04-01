import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Banner } from '../../components/Banner/Banner';
import { RecentUploads } from '../../components/RecentUploads/RecentUploads';
import { useAuthStore } from '../../store/authStore'
import './Home.css';

function Home() {
  const { isAuthenticated, user, logout, fetchUser } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    void fetchUser()
  }, [fetchUser])

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/#/login')
    } catch (error) {
      console.error(error)
    }
  }

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
          {/* <RecentUploads data={data} /> */}
          <h1>test</h1>
        </Col>
      </Row>
    </>
  )
}

export default Home;