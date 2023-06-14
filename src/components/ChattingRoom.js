import React from 'react';
import { Container, Row, Col, ListGroup, Card, Form, Button } from 'react-bootstrap';

const ChatRoom = () => {
  return (
    <Container fluid>
      <Row>
        <Col sm={3}>
          <Card>
            <Card.Header>Friends</Card.Header>
            <ListGroup variant="flush">
              {/* List of friends */}
              <ListGroup.Item>Friend 1</ListGroup.Item>
              <ListGroup.Item>Friend 2</ListGroup.Item>
              <ListGroup.Item>Friend 3</ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
        <Col sm={9}>
          <Card>
            <Card.Header>Chat</Card.Header>
            <Card.Body className="chat-messages">
              {/* Chat messages */}
              <div className="scrollable">
                {/* Display chat messages here */}
              </div>
            </Card.Body>
            <Card.Footer>
              <Form>
                <Form.Group>
                  <Row>
                    <Col sm={12}>
                      <Form.Control type="text" placeholder="Type a message" />
                    </Col>
                  </Row>
                </Form.Group>
                <Button variant="primary" type="submit">
                  Send
                </Button>
              </Form>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ChatRoom;
