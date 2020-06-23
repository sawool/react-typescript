import axios from 'axios';

export type MaterialPayload = {
  _id?: string;
  email: string;
  purchaseDate: string;
  location: string;
  kind: string;
  detail: string;
  weight: number;
  quantity: number;
};

export async function materialGetRequest(): Promise<Array<MaterialPayload>> {
  console.log('axios - materialGetRequest');

  const response = await axios.get<Array<MaterialPayload>>('api/material');
  console.log(response);

  return response.data;
}

export async function materialPostRequest(
  payload: MaterialPayload
): Promise<boolean> {
  console.log('axios - materialPostRequest');
  console.log(payload);

  const response = await axios.post<boolean>('api/material', payload);

  return response.data;
}

export async function materialPutRequest(
  payload: Array<MaterialPayload>
): Promise<boolean> {
  console.log('axios - materialPutRequest');
  console.log(payload);

  const response = await axios.put<boolean>('api/material', payload);

  return response.data;
}
