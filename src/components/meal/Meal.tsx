import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import SideDish, { ISideDish } from './SideDish';

import './Meal.css';

interface IMeal {
  title: string;
  mainDishName?: string;
  sideDishes?: Array<ISideDish>;
}

function Meal({ title }: IMeal) {
  let [sideDishCnt, setSideDishCnt] = useState(1);
  let [sideDishComps, setSideDishComps] = useState<Array<ISideDish>>([
    {
      sideDishKey: sideDishCnt,
    },
  ]);

  let onDelete = (sideDishKey: number) => {
    let newSideDishComp = sideDishComps.filter(
      (sideDishComp) => sideDishComp.sideDishKey !== sideDishKey
    );
    setSideDishComps(newSideDishComp);
  };

  return (
    <Form className="meal p-2">
      <Form.Group as={Row} className="mt-1">
        <Form.Label column sm="2">
          {title}
        </Form.Label>
      </Form.Group>
      <Form.Group as={Row} className="mt-1">
        <Form.Label column sm="2">
          주식
        </Form.Label>
        <Col sm="3">
          <Form.Control />
        </Col>
      </Form.Group>
      {sideDishComps.map((sideDishComp, index) => {
        return (
          <SideDish
            key={index}
            sideDishKey={sideDishComp.sideDishKey}
            onDelete={onDelete}
          />
        );
      })}

      <Col sm="11" className="buttonGroup pl-0 pr-0">
        <Button
          variant="outline-primary"
          className="addButton"
          onClick={() => {
            setSideDishCnt(++sideDishCnt);
            setSideDishComps([...sideDishComps, { sideDishKey: sideDishCnt }]);
          }}
        >
          추가
        </Button>
      </Col>
    </Form>
  );
}

export default Meal;
