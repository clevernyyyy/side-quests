import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Banner } from '../../components/Banner/Banner';
import { RecentUploads } from '../../components/RecentUploads/RecentUploads';
import { useAuthStore } from '../../store/authStore'
import ContextualToast from '../../components/ContextualToast/ContextualToast';

import './Home.css';

function Home({ data }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [dataParam, setDataParam] = useState('');
  const [showToast, setShowToast] = useState(false);
  const { isAuthenticated, user, logout, fetchUser } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    void fetchUser()
  }, [fetchUser])

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/login')
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const paramValue = decodeBase64Dict(searchParams.get('data'));
    if (paramValue) {
      setDataParam(paramValue);
      setShowToast(true);
    }
  }, [searchParams]);

  const toggleShowToast = () => {
    setShowToast(prev => !prev);
  };
  
  function decodeBase64Dict(base64String) {
    try {
      const decodedString = atob(base64String);
      const pythonDict = JSON.parse(decodedString);
      return pythonDict;
    } catch (error) {
      return null;
    }
  }

  return (
    <>
      <Row>
        <Col xs={12}>
          <Banner />
        </Col>
      </Row>
      <Row className='my-4'>
        <Col xs={12} lg={{ span: 8, offset: 2 }}>
           <RecentUploads data={data} /> 
        </Col>
      </Row>

      {/* toast display from badge sync */}
      {dataParam ? (
          dataParam.success ? (
              <ContextualToast showToast={showToast} toggleShowToast={toggleShowToast} variant="secondary" message={dataParam.success} />
          ) : (
              <></>
          )      
      ) : (
          <></>
      )}
    </>
  )
}

export default Home;
