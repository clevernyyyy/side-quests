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

    useEffect(() => {        
        if (data.length) {
            let sortedData = [...data];

            sortedData.sort((a, b) => {
                // 1 Sort by computed_score (higher is better)
                if (b.computed_score !== a.computed_score) {
                    return b.computed_score - a.computed_score;
                }

                // 2 If tied, prioritize records with a badge_score entered
                const aHasBadgeScore = a.badge_score !== 0;
                const bHasBadgeScore = b.badge_score !== 0;
                if (aHasBadgeScore !== bHasBadgeScore) {
                    return bHasBadgeScore - aHasBadgeScore;
                }

                // 3 If still tied, prioritize records with a roborace_score entered
                const aHasRoboraceScore = a.roborace_score !== 0;
                const bHasRoboraceScore = b.roborace_score !== 0;
                if (aHasRoboraceScore !== bHasRoboraceScore) {
                    return bHasRoboraceScore - aHasRoboraceScore;
                }

                // 4 If still tied, sort by lowest badge_score
                if (a.badge_score !== b.badge_score) {
                    return a.badge_score - b.badge_score;
                }

                // 5 If still tied, sort by lowest roborace_score
                return a.roborace_score - b.roborace_score;
            });

            // Only display the top `numberToDisplay` entries
            setRecentUploads(sortedData);
        }
    }, [data]);

    if (recentUploads.length) {
        return (
            <>                
                <Card>
                    <Card.Header as="h4" className="text-center">Top Side Quest Scores</Card.Header>
                    <Table className='mb-0'striped responsive>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Total Score</th>
                                <th>Badge Time</th>
                                <th>RoboRace Time</th>
                                <th>Web (CTF)</th>
                                <th>Escape Room</th>
                                <th>Radio</th>
                                <th>LockPicking</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentUploads.map((item) => (
                                <RecentUploadsItem key={item.id} item={item} />
                            ))}
                        </tbody>
                    </Table>
                    <p><small><em>Please Note:</em> Each category completion is worth up to 5 points, with tie-breakers going to (1) doing the badge challenge, (2) doing the robo race challenge, (3) lowest badge time, and finally (4) lowest robo race time. The badge score updates will occur every five minutes.</small></p>
                </Card>

            </>
        );
    } else {
        return (
            <>
                <Card as="h4" className="text-center">
                    <Card.Header>Top Side Quest Scores</Card.Header>
                    <p><em>Please Note:</em> Each category completion is worth up to 5 points, with tie-breakers going to (1) doing the badge challenge, (2) doing the robo race challenge, (3) lowest badge time, and finally (4) lowest robo race time.</p>
                    <ListGroup variant='flush'>        
                        <ListGroup.Item>None</ListGroup.Item>
                    </ListGroup>
                </Card>

            </>
        )
    }
}