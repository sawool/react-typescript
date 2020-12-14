import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { StaticContext } from 'react-router';
import { Form, Row, Col, Button, FormControl, Alert } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Material.css';
import { MaterialPayload } from '../services/material';
import { RootStateType } from '../modules';
import Api from '../services';
import { dateToYyyymmddString } from '../lib/dateUtils';
type Material = {
  _id?: string;
  email?: string;
  purchaseDate: string;
  locations: string;
  kind: string;
  detail: string;
  weight: string;
  quantity: string;
};

type LocationState = {
  material: MaterialPayload;
  isUpdate: boolean;
};

type MaterialProps = RouteComponentProps<{}, StaticContext, LocationState>;

type PurchaseDate = Date | null;

function Material({ location, history }: MaterialProps) {
  const email = useSelector(
    (state: RootStateType) => state.authentication.auth.data?.email
  ) as string;

  const [material, setMaterial] = useState<Material>({
    purchaseDate: new Date().toString(),
    locations: '냉동실',
    kind: '고기',
    detail: '',
    weight: '0',
    quantity: '0',
  });
  const [pDate, setPDate] = useState<PurchaseDate>(new Date());
  const [total, setTotal] = useState('0');
  const [errorMessage, setErrorMessage] = useState('');

  const dateRef = useRef<HTMLInputElement & FormControl>(null);
  const FormContorlDate = React.forwardRef(
    (props: any, ref: React.Ref<HTMLInputElement & FormControl>) => (
      <Form.Control type="input" {...props} ref={ref}></Form.Control>
    )
  );

  const materialProps = location?.state?.material;
  const isUpdate = location?.state?.isUpdate;

  // 최초 화면 열릴 때
  useEffect(() => {
    if (materialProps) {
      console.log(materialProps.location);
      setMaterial({
        _id: materialProps._id,
        email: materialProps.email,
        purchaseDate: materialProps.purchaseDate,
        locations: materialProps.location,
        kind: materialProps.kind,
        detail: materialProps.detail,
        weight: materialProps.weight.toString(),
        quantity: materialProps.quantity.toString(),
      });

      let yyyy = parseInt(materialProps.purchaseDate.substr(0, 4));
      let mm = parseInt(materialProps.purchaseDate.substr(4, 2));
      let dd = parseInt(materialProps.purchaseDate.substr(6, 2));
      setPDate(new Date(yyyy, mm - 1, dd));
    }
  }, [materialProps]);

  // 총량 계산
  useEffect(() => {
    const w = parseInt(material.weight);
    const q = parseInt(material.quantity);
    const totalNumber: number = w * q;
    setTotal(totalNumber.toString());
  }, [material.quantity, material.weight]);

  // 저장 버튼 클릭 시
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newMaterial = {
      _id: material._id,
      email,
      purchaseDate: dateToYyyymmddString(pDate),
      location: material.locations,
      kind: material.kind,
      detail: material.detail,
      weight: parseInt(material.weight),
      quantity: parseInt(material.quantity),
    } as MaterialPayload;
    console.log(newMaterial);

    try {
      isUpdate
        ? await Api.materialPutRequest([newMaterial])
        : await Api.materialPostRequest(newMaterial);
      history.push('/materials');
    } catch (error) {
      console.log(error);
      setErrorMessage(error?.response?.data.message);
    }
  };

  return (
    <Form className="materialForm pl-3 mt-3" onSubmit={handleSubmit}>
      <Form.Group as={Row} className="date" controlId="formDate">
        <Form.Label column sm={3}>
          구입일
        </Form.Label>
        <Col sm={4} className="purchaseDate">
          <DatePicker
            dateFormat="yyyy.MM.dd"
            selected={pDate}
            onChange={(date) => setPDate(date)}
            customInput={<FormContorlDate ref={dateRef} />}
          ></DatePicker>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="location" controlId="formLocation">
        <Form.Label column sm={3}>
          보관위치
        </Form.Label>
        <Col sm={4}>
          <Form.Control
            as="select"
            value={material.locations}
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              setMaterial({ ...material, locations: e.currentTarget.value });
            }}
          >
            <option value={'냉동실'}>냉동실</option>
            <option value={'냉장고'}>냉장고</option>
            <option value={'실온'}>실온</option>
          </Form.Control>
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="formKinds">
        <Form.Label column sm={3}>
          종류
        </Form.Label>
        <Col sm={4}>
          <Form.Control
            as="select"
            value={material.kind}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setMaterial({ ...material, kind: e.currentTarget.value })
            }
          >
            <option value={'고기'}>고기</option>
            <option value={'생선'}>생선</option>
            <option value={'야채'}>야채</option>
            <option value={'기타'}>기타</option>
          </Form.Control>
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="formKindsDetail">
        <Form.Label column sm={3}>
          상세종류
        </Form.Label>
        <Col sm={4}>
          <Form.Control
            placeholder="소 등심, 돼지 안심, 삼치... 등"
            value={material.detail}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setMaterial({ ...material, detail: e.currentTarget.value })
            }
          ></Form.Control>
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="formWeight">
        <Form.Label column sm={3}>
          중량 (g)
        </Form.Label>
        <Col sm={4}>
          <Form.Control
            value={material.weight}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setMaterial({ ...material, weight: e.currentTarget.value })
            }
            className="formNumber"
          ></Form.Control>
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="formQuantity">
        <Form.Label column sm={3}>
          수량
        </Form.Label>
        <Col sm={4}>
          <Form.Control
            value={material.quantity}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setMaterial({ ...material, quantity: e.currentTarget.value })
            }
            className="formNumber"
          ></Form.Control>
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="formTotal">
        <Form.Label column sm={3}>
          총량
        </Form.Label>
        <Col sm={4}>
          <Form.Control
            plaintext
            readOnly
            value={total}
            className="formNumber"
          ></Form.Control>
        </Col>
      </Form.Group>
      {errorMessage ? <Alert variant="danger">{errorMessage}</Alert> : null}
      <Form.Group as={Row}>
        <Col sm={{ span: 4, offset: 3 }}>
          <Button type="submit" className="button">
            저장
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default withRouter(Material);
