import React, { useState, useRef } from 'react';
import DatePicker from 'react-datepicker';
import {
  Form,
  FormControl,
  Container,
  Row,
  Col,
  Button,
  InputGroup,
} from 'react-bootstrap';
import Meal from '../components/meal/Meal';

import './Menu.css';

type CurrentDate = Date | null;

function Menu() {
  const [currentDate, setCurrentDate] = useState<CurrentDate>(new Date());

  const dateRef = useRef<HTMLInputElement & FormControl>(null);
  const FormContorlDate = React.forwardRef(
    (props: any, ref: React.Ref<HTMLInputElement & FormControl>) => (
      <Form.Control type="input" {...props} ref={ref}></Form.Control>
    )
  );

  const addDays = (date: Date, days: number): Date => {
    const newDate = new Date(date.valueOf());
    newDate.setDate(newDate.getDate() + days);

    return newDate;
  };

  return (
    <Container className="menu">
      <Row className="mt-1">
        <Col sm={4}>
          <InputGroup>
            <InputGroup.Prepend>
              <Button
                className="dateBtn px-1"
                variant="outline-secondary"
                onClick={() => {
                  if (currentDate) {
                    setCurrentDate(addDays(currentDate, -1));
                  }
                }}
              >
                -
              </Button>
            </InputGroup.Prepend>
            <DatePicker
              className="datePicker"
              selected={currentDate}
              dateFormat="yyyy.MM.dd"
              onChange={(date) => setCurrentDate(date)}
              customInput={<FormContorlDate ref={dateRef} />}
            ></DatePicker>
            <InputGroup.Append>
              <Button
                className="dateBtn px-1"
                variant="outline-secondary"
                onClick={() => {
                  if (currentDate) {
                    setCurrentDate(addDays(currentDate, 1));
                  }
                }}
              >
                +
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Col>
      </Row>
      <Row className="my-2">
        <Col sm={12}>
          <Meal title={'아침'}></Meal>
        </Col>
      </Row>
      <Row className="my-2">
        <Col sm={12}>
          <Meal title={'점심'}></Meal>
        </Col>
      </Row>
      <Row className="my-2">
        <Col sm={12}>
          <Meal title={'저녁'}></Meal>
        </Col>
      </Row>
      <Button className="saveBtn">저장</Button>
    </Container>
  );
}

export default Menu;
