import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import { Banner } from '../../components/Banner/Banner';
import { RecentUploads } from '../../components/RecentUploads/RecentUploads';
import { useAuthStore } from '../../store/authStore'
import ContextualToast from '../../components/ContextualToast/ContextualToast';
import Button from 'react-bootstrap/Button';

import './BadgeSync.css';


function BadgeSync() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [dataParam, setDataParam] = useState('');
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
    //   setRedirecting(false);
      navigate("/#/");
    }, 6000);

    return () => clearTimeout(timer);
  }, [navigate]);

  useEffect(() => {
    // const params = useSearchParams();
    const paramValue = decodeBase64Dict( searchParams.get('data') );
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
    //   console.error("Error decoding Base64 or parsing JSON:", error);
      return null;
    }
  }

  return (
    <>
            {/* toast display from badge sync */}
            {dataParam ? (
                dataParam.error ? (
                    <ContextualToast showToast={showToast} toggleShowToast={toggleShowToast} variant="danger" message={dataParam.error} />
                ) : (
                    dataParam.success ? (
                        <ContextualToast showToast={showToast} toggleShowToast={toggleShowToast} variant="secondary" message={dataParam.success} />
                    ) : (
                        // no success or error
                        <></>
                    )
                )
            
            ) : (
                // no data params sent
                <></>
            )}

        {/* </Col>
      </Row> */}
    </>
  )
}

export default BadgeSync;