import axios from 'axios';

export enum MealCls {
  Breakfast = 'breakfast',
  Launch = 'launch',
  Dinner = 'dinner',
}

export type SideDish = {  
  _id: string;
  name: string;
  quantity: number;
  materialId: string;
  updatedAt: Date;
  createdAt: Date;
};

export type Meal = {  
  _id: string;
  mainDish: string;
  sideDishes: Array<SideDish>;
  classification: string; // 아침, 점심, 저녁
  updatedAt: Date;
  createdAt: Date;
};

export type MenuPayload = {  
  _id: string;
  date: string;
  breakfast?: Meal;
  lunch?: Meal;
  dinner?: Meal;
  updatedAt: Date;
  createdAt: Date;
};

export async function menuGetRequest(date: string): Promise<MenuPayload> {
  console.log('axios - menuGetRequest');

  const response = await axios.get<MenuPayload>('api/menu', {
    params: {
      date,
    },
  });

  return response.data;
}

export async function menuPutRequest(payload: MenuPayload): Promise<boolean> {
  console.log('axios - menuPutRequest');
  console.log(payload);

  const response = await axios.put<boolean>('api/menu', payload);

  return response.data;
}
export async function menuPostRequest(payload: MenuPayload): Promise<boolean> {
  console.log('axios - menuPostRequest');
  console.log(payload);

  const response = await axios.post<boolean>('api/menu', payload);

  return response.data;
}
