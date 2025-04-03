import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';

import './RecentUploads.css';
import { RecentUploadsItem } from '../RecentUploadsItem/RecentUploadsItem';

export function RecentUploads({ data }) {
    const [recentUploads, setRecentUploads] = useState('');
    console.log(data);

    useEffect(() => {        
        if (data.length) {
            const numberToDisplay = 5;
            let sortedDataByNew = [...data];

            console.log(sortedDataByNew);

            // sort by newest first
            sortedDataByNew.sort((a, b) => new Date(b.updated) - new Date(a.updated));
            // console.log("new");
            // console.log(sortedDataByNew);

            // don't display uploads with no associated high scores
            let sortedDataByNewAndFilteredOutNull = sortedDataByNew.filter(function(v, i) {
                return ( (v["badge_score"] != null || v["web_score"] != null) );
              });

            // only display top <numberToDisplay>
            let reducedData = sortedDataByNewAndFilteredOutNull.slice(0, numberToDisplay);


            // console.log(reducedData);

            setRecentUploads(reducedData);
        }
    
      }, [data])

    if (recentUploads.length) {
        return (
            <>                
                <Card>
                    <Card.Header as="h4" className="text-center">Top Side Quest Scores</Card.Header>
                    <Table className='mb-0'striped responsive>
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Total Score</th>
                                <th>Badge Score</th>
                                <th>Web Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentUploads.map((item) => (
                                <RecentUploadsItem key={item.id} item={item} />
                            ))}
                        </tbody>
                    </Table>
                </Card>

            </>
        );
    } else {
        return (
            <>
                <Card as="h4" className="text-center">
                    <Card.Header>Top Side Quest Scores</Card.Header>
                    <ListGroup variant='flush'>        
                        <ListGroup.Item>None</ListGroup.Item>
                    </ListGroup>
                </Card>

            </>
        )
    }
}