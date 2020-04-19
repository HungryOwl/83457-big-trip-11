import {randomInteger, formatDate} from '../utils';

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

const prepositions = {
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
dapibus. In rutrum ac purus sit amet tempus`.split(`.`);

const photo = `http://picsum.photos/248/152?r=${randomInteger(5)}`;
const PHOTO_COUNT = 7;

const offers = new Map([
  [`Taxi`, [
    {name: `Order Uber`, price: 20, checked: false},
    {name: `Order Uber Comfort`, price: 55, checked: false},
    {name: `Order Uber VIP`, price: 100, checked: false},
  ]],
  [`Flight`, [
    {name: `Add luggage`, price: 50, checked: true},
    {name: `Switch to comfort`, price: 80, checked: true},
    {name: `Add meal`, price: 80, checked: false},
    {name: `Choose seats`, price: 5, checked: true},
    {name: `Travel by train`, price: 45, checked: false}
  ]],
  [`Drive`, [
    {name: `Rent a car`, price: 200, checked: false},
    {name: `Rent a bike`, price: 200, checked: true}
  ]],
  [`Check-in`, [
    {name: `Add breakfast`, price: 50, checked: true},
    {name: `Add lunch`, price: 50, checked: true},
    {name: `Add dinner`, price: 70, checked: true},
    {name: `Room with minibar`, price: 70, checked: false},
    {name: `Rooftop pool`, price: 70, checked: false},
  ]],
  [`Sightseeing`, [
    {name: `Book excursion tickets`, price: 40, checked: false},
    {name: `Lunch in city`, price: 30, checked: true},
    {name: `Going to the theater`, price: 75, checked: false},
    {name: `Trip to the exhibition of paintings`, price: 45, checked: true},
    {name: `Tour of places of military glory`, price: 60, checked: false}
  ]]
]);

const getDate = (value) => {
  const [day, month, year] = value.split(` `)[0].split(`/`);
  const [hours, minutes] = value.split(` `)[1].split(`:`);
  return new Date(year, month, day, hours, minutes);
};

export {offers};
