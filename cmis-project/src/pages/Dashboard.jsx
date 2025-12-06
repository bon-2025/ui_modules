import React from 'react';
import { Container, Row, Col, Card, Table, ProgressBar } from 'react-bootstrap';

const Dashboard = () => {
  // Sample data
  const activityLog = [
    { id: 1, activity: 'Added new grave', user: 'John Doe', date: '2025-12-04' },
    { id: 2, activity: 'Registered new employee', user: 'Admin', date: '2025-12-03' },
    { id: 3, activity: 'Backup completed', user: 'System', date: '2025-12-02' },
  ];

  const emailSummary = [
    { type: 'Unread Emails', count: 5 },
    { type: 'Sent Emails', count: 24 },
    { type: 'Drafts', count: 2 },
  ];

  const backupStatus = 80; // percentage
  const analyticsData = [
    { title: 'Total Graves', value: 1254 },
    { title: 'Active Employees', value: 12 },
    { title: 'Pending Reports', value: 5 },
    { title: 'Archives', value: 320 },
  ];

  return (
    <Container className="mt-4">
      <h1>Admin Dashboard</h1>
      <p>Monitor activities, backups, emails, and employee records efficiently.</p>

      {/* Analytics Cards */}
      <Row className="mt-3">
        {analyticsData.map((item, idx) => (
          <Col md={3} sm={6} className="mb-3" key={idx}>
            <Card bg="light" text="dark">
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                  {item.value}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Activity Log Table */}
      <Row className="mt-4">
        <Col md={6} className="mb-3">
          <Card>
            <Card.Header>Activity Log</Card.Header>
            <Card.Body>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Activity</th>
                    <th>User</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {activityLog.map((log) => (
                    <tr key={log.id}>
                      <td>{log.id}</td>
                      <td>{log.activity}</td>
                      <td>{log.user}</td>
                      <td>{log.date}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        {/* Email Summary */}
        <Col md={6} className="mb-3">
          <Card>
            <Card.Header>Email Summary</Card.Header>
            <Card.Body>
              {emailSummary.map((email, idx) => (
                <div key={idx} className="mb-2">
                  <strong>{email.type}:</strong> {email.count}
                </div>
              ))}
            </Card.Body>
          </Card>

          {/* Backup Status */}
          <Card className="mt-3">
            <Card.Header>Backup Status</Card.Header>
            <Card.Body>
              <p>Current Backup Completion:</p>
              <ProgressBar now={backupStatus} label={`${backupStatus}%`} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
