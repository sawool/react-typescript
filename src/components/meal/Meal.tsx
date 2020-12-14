import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import SideDish, { ISideDish } from './SideDish';

import './Meal.css';

export interface IMeal {    
  classification: string;
  _id?: string;
  mainDish?: string;
  sideDishes?: Array<ISideDish>;
  updatedAt?: Date;
  createdAt?: Date;
}

export interface IMealProp extends IMeal {
  handleMainDishChange: (classification: string, mainDishName: string) => void;
  handleSideDishChange: (
    classification: string,
    sideDishKey: number,
    materialId: string,
    name: string,
    quantity?: number
  ) => void;
  handleAppendSideDish: (
    classification: string,
    appendSideDishKey: number
  ) => void;
  handleDeleteSideDish: (classification: string, sideDishKey: number) => void;
}

function Meal({
  classification,
  mainDish,
  sideDishes,
  handleMainDishChange,
  handleSideDishChange,
  handleAppendSideDish,
  handleDeleteSideDish,
}: IMealProp) {
  const [nextKey, setNextKey] = useState(1);
  useEffect(()=>{
    if (sideDishes) {
      setNextKey(sideDishes.length);
    }
  }, [sideDishes])

  const handleDelete = (sideDishKey: number) => {
    handleDeleteSideDish(classification, sideDishKey);
  };

  const handleChange = (
    sideDishKey: number,
    materialId = '',
    name: string,
    quantity?: number
  ) => {
    const changedSideDish = sideDishes?.filter(
      (sideDish) => sideDish.sideDishKey === sideDishKey
    )[0];

    if (
      changedSideDish
        ? changedSideDish.materialId !== materialId ||
          changedSideDish.name !== name ||
          changedSideDish.quantity !== quantity
        : false
    ) {
      handleSideDishChange(
        classification,
        sideDishKey,
        materialId,
        name,
        quantity
      );
    }
  };

  return (
    <Form className="meal p-2">
      <Form.Group as={Row} className="mt-1">
        <Form.Label column sm="2">
          {classification}
        </Form.Label>
      </Form.Group>
      <Form.Group as={Row} className="mt-1">
        <Form.Label column sm="2">
          주식
        </Form.Label>
        <Col sm="3">
          <Form.Control
            value={mainDish || ''}
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              handleMainDishChange(classification, e.currentTarget.value);
            }}
          />
        </Col>
      </Form.Group>
      {sideDishes
        ? sideDishes.map((sideDish, index) => {
            return (
              <SideDish
                key={index}
                sideDish={{ ...sideDish }}
                handleDelete={handleDelete}
                handleChange={handleChange}
              />
            );
          })
        : null}

      <Col sm="11" className="buttonGroup pl-0 pr-0">
        <Button
          variant="outline-primary"
          className="addButton"
          onClick={() => {
            // let newSideDishCnt = sideDishCnt + 1;
            // setSideDishCnt(newSideDishCnt);
            // setSideDishComps([
            //   ...sideDishComps,
            //   { sideDishKey: newSideDishCnt - 1 },
            // ]);

            handleAppendSideDish(classification, nextKey);
            setNextKey(nextKey + 1);
          }}
        >
          추가
        </Button>
      </Col>
    </Form>
  );
}

export default Meal;
