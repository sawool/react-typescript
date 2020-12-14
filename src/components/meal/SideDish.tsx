import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Form, Row, Col, Button } from 'react-bootstrap';

import { RootStateType } from '../../modules';
import { MaterialPayload } from '../../services/material';

import './SideDish.css';

export interface ISideDish {  
  sideDishKey: number;
  _id: string;
  materialId?: string;
  name?: string;
  quantity?: number;
  updatedAt? : Date;
  createdAt? : Date;
}

interface ISideDishProp {
  sideDish: ISideDish;
  handleDelete: (sideDishKey: number) => void;
  handleChange: (
    sideDishKey: number,
    materialId: string | undefined,
    name: string,
    quantity?: number
  ) => void;
}

function SideDish({ sideDish, handleDelete, handleChange }: ISideDishProp) {
  const [sideOption, setSideOption] = useState('0');
  const [material, setMaterial] = useState<MaterialPayload>();
  const materials = useSelector(
    (state: RootStateType) => state.material.materials.data
  );

  useEffect(() => {
    if (materials && sideDish.materialId) {
      const material = materials.find(
        (material) => material._id === sideDish.materialId
      );

      if (material && sideDish.quantity) {
        setMaterial({
          ...material,
          quantity: sideDish.quantity,
        });

        setSideOption('1');
      }
    }
  }, [
    materials,
    sideDish.materialId,
    sideDish.name,
    sideDish.quantity,
    sideDish.sideDishKey,
  ]);

  useEffect(() => {
    if (material) {
      handleChange(
        sideDish.sideDishKey,
        material._id,
        `${material.kind} - ${material.detail}`,
        material.quantity
      );
    }
  }, [handleChange, material, sideDish.sideDishKey]);

  const materialOptions = materials?.map((material, index) => {
    return !index ? (
      <option
        key={material._id}
        value={material._id}
      >{`${material.kind} - ${material.detail}`}</option>
    ) : (
      <option
        key={material._id}
        value={material._id}
      >{`${material.kind} - ${material.detail}`}</option>
    );
  });

  const onChangeQuantity = (e: React.FormEvent<HTMLInputElement>) => {
    if (material) {
      const newMaterial = material
        ? {
            ...material,
            ...{ quantity: parseInt(e.currentTarget.value) },
          }
        : undefined;
      setMaterial(newMaterial);
    }
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
              if (e.currentTarget.value === '1' && materials)
                setMaterial(materials[0]);
              if (e.currentTarget.value === '0') {
                setMaterial(undefined);
                handleChange(sideDish.sideDishKey, undefined, '');
              }
            }}
          >
            <option value="0">직접입력</option>
            <option value="1">식재료 선택</option>
          </Form.Control>
        </Col>
        {sideOption === '0' ? (
          <Col sm="4" className="pl-0 pr-1">
            <Form.Control
              value={sideDish.name || ''}
              onChange={(e: React.FormEvent<HTMLInputElement>) => {
                handleChange(
                  sideDish.sideDishKey,
                  undefined,
                  e.currentTarget.value
                );
              }}
            ></Form.Control>
          </Col>
        ) : (
          <>
            <Col sm="3" className="pl-0 pr-1">
              <Form.Control
                as="select"
                value={material?._id}
                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                  const selectMaterial = materials?.find(
                    (material) => material._id === e.currentTarget.value
                  );

                  if (selectMaterial) {
                    setMaterial(selectMaterial);
                  }
                }}
                text-align="end"
              >
                {materialOptions}
              </Form.Control>
            </Col>
            <Col sm="1" className="pl-0 pr-1">
              <Form.Control
                className="quantity"
                value={material?.quantity.toString() || ''}
                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                  onChangeQuantity(e);
                }}
              />
            </Col>
          </>
        )}
        <Button
          variant="outline-dark"
          onClick={() => {
            handleDelete(sideDish.sideDishKey);
          }}
        >
          삭제
        </Button>
      </Form.Group>
    </div>
  );
}

export default SideDish;
