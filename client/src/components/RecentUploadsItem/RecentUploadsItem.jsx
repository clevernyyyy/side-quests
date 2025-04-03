import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './RecentUploadsItem.css';



export function RecentUploadsItem({ item }) {  
    if (item.computed_score) {
        return (
            <>
                <tr key={item.user}>
                    <td>{item.username}</td>
                    <td>{item.computed_score}</td>
                    <td>{item.badge_score ? item.badge_score : ''}</td>
                    <td>{item.roborace_easy_score ? item.roborace_easy_score : ''}</td>
                    <td>{item.roborace_hard_score ? item.roborace_hard_score : ''}</td>
                    <td>{item.web_score ? item.web_score : ''}</td>
                    <td>{item.escape_score ? item.escape_score : ''}</td>
                    <td>{item.radio_score ? item.radio_score : ''}</td>
                    <td>{item.lockpicking_score ? item.lockpicking_score : ''}</td>
                </tr>

            </>
        )
    }
    return null
    
}