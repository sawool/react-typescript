import React, { useState, useRef, useEffect } from 'react';
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
import Meal, { IMeal } from '../components/meal/Meal';
import { ISideDish } from '../components/meal/SideDish';
import Api from '../services';
import { MenuPayload } from '../services/menu';
import { dateToYyyymmddString } from '../lib/dateUtils';

import './Menu.css';

interface IMenu {
  _id: string;
  date: string;
  breakfast?: IMeal;
  lunch?: IMeal;
  dinner?: IMeal;
  updatedAt: Date;
  createdAt: Date;
}

type CurrentDate = Date | null;

function Menu() {
  const [currentDate, setCurrentDate] = useState<CurrentDate>(new Date());
  const [menu, setMenu] = useState<IMenu>();
  const [meals, setMeals] = useState<Array<IMeal>>(initialMeals());

  // 날짜가 변경되거나 컴포넌트가 열릴때 메뉴 데이터 조회
  useEffect(() => {
    async function fetchMenu() {
      if (currentDate) {
        try {
          const dailyMenu = await Api.menuGetRequest(
            dateToYyyymmddString(currentDate)
          );

          if (dailyMenu) {            
            const meals = getMeals(dailyMenu);
            setMenu({...dailyMenu, breakfast: meals[0], lunch: meals[1], dinner: meals[2]})                        
            setMeals(meals);
          } else {
            setMenu(undefined);
            setMeals(initialMeals());
          }
        } catch (error) {
          setMeals(initialMeals());
        }
      }
    }

    fetchMenu();
  }, [currentDate]);

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

  const handleMainDishChange = (classification: string, mainDish: string) => {    
    const newMeals = meals.map((meal) =>
      meal.classification === classification
        ? { ...meal, mainDish: mainDish }
        : meal
    );
    setMeals(newMeals);
  };

  const handleSideDishChange = (
    classification: string,
    sideDishKey: number,
    materialId: string,
    name: string,
    quantity?: number
  ) => {
    const newMeals = meals.map((meal) => {
      if (meal.classification !== classification) return meal;

      meal.sideDishes = meal.sideDishes
        ? meal.sideDishes.map((sideDish) =>
            sideDish.sideDishKey === sideDishKey
              ? {...sideDish, sideDishKey, materialId, name, quantity}
              : sideDish
          )
        : undefined;

      return meal;
    });
    setMeals(newMeals);
  };

  const handleAppendSideDish = (
    classification: string,
    appendSideDishKey: number
  ) => {
    const newMeals = meals.map((meal) =>
      meal.classification === classification
        ? ({
            ...meal,
            sideDishes: [
              ...(meal.sideDishes || []),
              {
                sideDishKey: appendSideDishKey,
              } as ISideDish,
            ],
          } as IMeal)
        : meal
    );
    console.log(newMeals);
    setMeals(newMeals);
  };

  const handleDeleteSideDish = (
    classification: string,
    sideDishKey: number
  ) => {
    console.log('handleDeleteSideDish - ' + sideDishKey);
    const newMeals = meals.map((meal) =>
      meal.classification === classification
        ? ({
            ...meal,
            sideDishes: (meal.sideDishes || []).filter(
              (sideDish) => sideDish.sideDishKey !== sideDishKey
            ),
          } as IMeal)
        : meal
    );
    setMeals(newMeals);
  };

  // 2020.09.10 저장 로직 구현해야함
  const handelSave = async () => {
    // 메뉴 저장
    console.log('handelSave');
    const menuPayload = {
      ...menu,
      date: dateToYyyymmddString(currentDate),
      breakfast: {...meals[0]},
      lunch: {...meals[1]},
      dinner: {...meals[2]},
    } as MenuPayload;
    try {
      if (menu?._id) {
        await Api.menuPutRequest(menuPayload);
      } else {
        await Api.menuPostRequest(menuPayload);
      }
    } catch (e) {
      alert('저장실패');
    }
  };

  const mealsComp = meals.map((meal, index) => (
    <Row key={index} className="my-2">
      <Col sm={12}>
        <Meal
          _id={meal._id}
          classification={meal.classification}
          mainDish={meal.mainDish}
          sideDishes={meal.sideDishes}
          handleMainDishChange={handleMainDishChange}
          handleSideDishChange={handleSideDishChange}
          handleAppendSideDish={handleAppendSideDish}
          handleDeleteSideDish={handleDeleteSideDish}
        ></Meal>
      </Col>
    </Row>
  ));

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
      {mealsComp}
      <Button className="saveBtn" onClick={handelSave}>
        저장
      </Button>
    </Container>
  );
}

function getMeals(dailyMenu: MenuPayload):Array<IMeal> {
  const meals = [
    { 
      ...dailyMenu.breakfast,
      classification: '아침',
      sideDishes: dailyMenu.breakfast?.sideDishes?.map(
        (sideDish, index) => {
          return {
            ...sideDish,
            sideDishKey: index,
          };
        }
      ),
    },
    {               
      ...dailyMenu.lunch,
      classification: '점심',
      sideDishes: dailyMenu.lunch?.sideDishes?.map(
        (sideDish, index) => {
          return {
            ...sideDish,
            sideDishKey: index,
          };
        }
      ),
    },
    {      
      ...dailyMenu.dinner,
      classification: '저녁',
      sideDishes: dailyMenu.dinner?.sideDishes?.map(
        (sideDish, index) => {
          return {
            ...sideDish,
            sideDishKey: index,
          };
        }
      ),
    },
  ];

  return meals;
}

function initialMeals() {
  return [
    {
      classification: '아침',
      mainDish: '',
      sideDishes: [{ sideDishKey: 0 } as ISideDish],
    } as IMeal,
    {
      classification: '점심',
      mainDish: '',
      sideDishes: [{ sideDishKey: 0 } as ISideDish],
    } as IMeal,
    {
      classification: '저녁',
      mainDish: '',
      sideDishes: [{ sideDishKey: 0 } as ISideDish],
    } as IMeal,
  ];
}

export default Menu;
