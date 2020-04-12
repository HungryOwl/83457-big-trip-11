import {randomInteger} from '../utils';

const getLowCost = () => randomInteger(10, 60);
const getMiddleCost = () => randomInteger(70, 140);
const getHightCost = () => randomInteger(150, 600);

const pointTypes = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeing`, `Restaurant`];
const destinations = [`Горький`, `Дзержинск`, `Сталинград`, `Ногинск`, `Ворошиловск`, `Ульяновск`, `Молотов`, `Орджоникидзе`];

const prices = {
  [`Taxi`]: getHightCost(),
  [`Bus`]: getLowCost(),
  [`Train`]: getMiddleCost(),
  [`Ship`]: getHightCost(),
  [`Transport`]: getLowCost(),
  [`Drive`]: getLowCost(),
  [`Flight`]: getHightCost(),
  [`Check-in`]: getHightCost(),
  [`Sightseeing`]: getHightCost(),
  [`Restaurant`]: getHightCost()
};

const placeholders = {
  Taxi: `to`,
  Bus: `to`,
  Train: `to`,
  Ship: `to`,
  Transport: `to`,
  Drive: `to`,
  Flight: `to`,
  [`Check-in`]: `at`,
  Sightseeng: `at`,
  Restaurant: `at`
};

const description = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta
ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.
Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh
vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante
ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta
dapibus. In rutrum ac purus sit amet tempus`;

const photo = `http://picsum.photos/248/152?r=${randomInteger(5)}`;

const offers = new Map([
  [`Taxi`, [
    {name: `Order Uber`, price: 20},
    {name: `Order Uber Comfort`, price: 55},
    {name: `Order Uber VIP`, price: 100},
  ]],
  [`Flight`, [
    {name: `Add luggage`, price: 50},
    {name: `Switch to comfort`, price: 80},
    {name: `Add meal`, price: 80},
    {name: `Choose seats`, price: 5},
    {name: `Travel by train`, price: 45}
  ]],
  [`Drive`, [
    {name: `Rent a car`, price: 200},
    {name: `Rent a bike`, price: 200}
  ]],
  [`Check-in`, [
    {name: `Add breakfast`, price: 50},
    {name: `Add lunch`, price: 50},
    {name: `Add dinner`, price: 70},
    {name: `Room witn minibar`, price: 70},
  ]],
  [`Sightseeing`, [
    {name: `Book tickets`, price: 40},
    {name: `Lunch in city`, price: 30}
  ]]
]);

const eventStartTime = `18/03/19 12:15`;
const eventEndTime = `18/03/19 13:45`;

export {offers};
