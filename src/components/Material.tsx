import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import './Material.css';

type MaterialForm = {
  location: string;
  kinds: string;
  kindsDetail: string;
  weight: number;
  num: number;
};

function Material() {
  return (
    <Form className="materialForm pl-3 mt-3">
      <Form.Group as={Row} className="location" controlId="formLocation">
        <Form.Label column sm={2}>
          보관위치
        </Form.Label>
        <Col sm={2}>
          <Form.Control as="select" custom>
            <option value={1}>냉동실</option>
            <option value={2}>냉장고</option>
            <option value={3}>실온</option>
          </Form.Control>
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="formKinds">
        <Form.Label column sm={2}>
          종류
        </Form.Label>
        <Col sm={2}>
          <Form.Control as="select" custom>
            <option value={1}>고기</option>
            <option value={2}>생선</option>
            <option value={3}>야채</option>
            <option value={4}>기타</option>
          </Form.Control>
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="formKindsDetail">
        <Form.Label column sm={2}>
          상세종류
        </Form.Label>
        <Col sm={3}>
          <Form.Control
            type="input"
            placeholder="소 등심, 돼지 안심, 삼치... 등"
          ></Form.Control>
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="formWeight">
        <Form.Label column sm={2}>
          중량 (g)
        </Form.Label>
        <Col sm={2}>
          <Form.Control type="input"></Form.Control>
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="formNumber">
        <Form.Label column sm={2}>
          수량
        </Form.Label>
        <Col sm={2}>
          <Form.Control type="input"></Form.Control>
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="formTotal">
        <Form.Label column sm={2}>
          총량
        </Form.Label>
        <Col sm={2}>
          <Form.Control plaintext readOnly defaultValue="0">
            {}
          </Form.Control>
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Col sm={{ span: 3, offset: 2 }}>
          <Button type="submit" className="button">
            저장
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default Material;
