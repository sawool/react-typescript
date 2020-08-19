import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Form, Row, Col, Button } from 'react-bootstrap';

import { RootStateType } from '../../modules';
import { MaterialPayload } from '../../services/material';

import './SideDish.css';

export interface ISideDish {
  sideDishKey: number;
  _id?: string;
  name?: string;
  quantity?: number;
}

interface ISideDishComp extends ISideDish {
  onDelete: (sideDishKey: number) => void;
}

function SideDish({
  sideDishKey,
  _id,
  name,
  quantity,
  onDelete,
}: ISideDishComp) {
  const [sideOption, setSideOption] = useState('0');
  const [material, setMaterial] = useState<MaterialPayload>();
  const materials = useSelector(
    (state: RootStateType) => state.material.materials.data
  );

  const materialOptions = materials?.map((material) => {
    return (
      <option
        value={material._id}
      >{`${material.kind} - ${material.detail}`}</option>
    );
  });

  const onChangeQuantity = (e: React.FormEvent<HTMLInputElement>) => {
    let newMaterial = material
      ? {
          ...material,
          ...{ quantity: parseInt(e.currentTarget.value) },
        }
      : undefined;
    setMaterial(newMaterial);
  };

  return (
    <div className="sideDish">
      <Form.Group as={Row} className="mt-1">
        <Form.Label column sm="2">
          반찬
        </Form.Label>
        <Col sm="3">
          <Form.Control
            as="select"
            value={sideOption}
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              setSideOption(e.currentTarget.value);
            }}
          >
            <option value="0">직접입력</option>
            <option value="1">식재료 선택</option>
          </Form.Control>
        </Col>
        {sideOption === '0' ? (
          <Col sm="4" className="pl-0 pr-1">
            <Form.Control></Form.Control>
          </Col>
        ) : (
          <>
            <Col sm="3" className="pl-0 pr-1">
              <Form.Control
                as="select"
                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                  console.log(e.currentTarget.value);
                  const selectMaterial = materials?.find(
                    (material) => material._id === e.currentTarget.value
                  );
                  setMaterial(selectMaterial);
                }}
                text-align="end"
              >
                {materialOptions}
              </Form.Control>
            </Col>
            <Col sm="1" className="pl-0 pr-1">
              <Form.Control
                className="quantity"
                value={material?.quantity.toString()}
                onChange={onChangeQuantity}
              />
            </Col>
          </>
        )}
        <Button
          variant="outline-dark"
          onClick={() => {
            onDelete(sideDishKey);
          }}
        >
          삭제
        </Button>
      </Form.Group>
    </div>
  );
}

export default SideDish;
