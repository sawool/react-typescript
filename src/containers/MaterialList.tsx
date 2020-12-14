import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Table, Button, Row, Col, Form } from 'react-bootstrap';
import { RootStateType } from '../modules';
import { getMaterialAsync } from '../modules/material';
import './MaterialList.css';

function MaterialList({ history }: RouteComponentProps<any>) {
  const { loading, data, error } = useSelector(
    (state: RootStateType) => state.material.materials
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!data) {
      dispatch(getMaterialAsync.request());
    }
  }, [data, dispatch]);

  const materialRows = data?.map((material, index) => (
    <tr
      key={index}
      onClick={() => {
        history.push('/material', { material, isUpdate: true });
      }}
    >
      <td className="tdCenter">
        {material.purchaseDate.substr(0, 4)}.
        {material.purchaseDate.substr(4, 2)}.
        {material.purchaseDate.substr(6, 2)}
      </td>
      <td className="tdCenter">{material.location}</td>
      <td className="tdCenter">{material.kind}</td>
      <td>{material.detail}</td>
      <td className="tdRight">{material.weight}</td>
      <td className="tdRight">{material.quantity}</td>
    </tr>
  ));

  return (
    <div className="materialList p-2">
      <Row>
        <Col className="showEntries" sm={6}>
          <Form.Label>
            Show{' '}
            <Form.Control as="select">
              <option>10</option>
              <option>20</option>
              <option>30</option>
            </Form.Control>{' '}
            entries
          </Form.Label>
        </Col>
      </Row>
      <Table striped bordered hover responsive="sm">
        <thead>
          <tr className="tr">
            <th>구입일</th>
            <th>보관위치</th>
            <th>종류</th>
            <th>상세종류</th>
            <th>중량</th>
            <th>수량</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length ? (
            materialRows
          ) : (
            <tr>
              <td colSpan={6}>No Data</td>
            </tr>
          )}
        </tbody>
      </Table>
      <Button className="regBtn" onClick={() => history.push('/material')}>
        등록
      </Button>
    </div>
  );
}

export default withRouter(MaterialList);
