import {randomInteger, formatDate} from '../utils';

const MIN_IN_HOUR = 60;
const HOURS_IN_DAY = 24;
const SEC_IN_MIN = 60;
const MS_IN_SEC = 1000;
const MS_IN_DAY = MS_IN_SEC * SEC_IN_MIN * MIN_IN_HOUR * HOURS_IN_DAY;
const MS_IN_HOUR = MIN_IN_HOUR * SEC_IN_MIN * MS_IN_SEC;
const MS_IN_MIN = SEC_IN_MIN * MS_IN_SEC;

const getLowCost = () => randomInteger(10, 60);
const getMiddleCost = () => randomInteger(70, 140);
const getHightCost = () => randomInteger(150, 600);

// По велению судьбы и дизайнера мы получаем дату из поля ввода в формате 18/03/19 00:00
const getDate = (value) => {
  const [day, month, year] = value.split(` `)[0].split(`/`);
  const [hours, minutes] = value.split(` `)[1].split(`:`);
  return new Date(year, month, day, hours, minutes);
};

const getEventTime = (from, to) => {
  return {
    from: {hours: from.getHours(), minutes: from.getMinutes()},
    to: {hours: to.getHours(), minutes: to.getMinutes()}
  };
};

const getEventDuration = (from, to) => {
  let timeDuration = to - from;
  let days;
  let hours;
  let minutes;

  minutes = new Date(timeDuration).getMinutes();
  days = Math.floor(timeDuration / MS_IN_DAY);
  console.log('days', days);
  timeDuration = timeDuration - days * MS_IN_DAY;
  hours = Math.floor(timeDuration / MS_IN_HOUR);

  return `
    ${days ? formatDate(days) + `D` : ``}
    ${hours ? formatDate(hours) + `H` : ``}
    ${minutes ? formatDate(minutes) + `M` : ``}
  `;
};

const pointTypes = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeing`, `Restaurant`];
const destinations = [`Горький`, `Дзержинск`, `Сталинград`, `Ногинск`, `Ворошиловск`, `Ульяновск`, `Молотов`, `Орджоникидзе`];

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

const SENTENCE_COUNT = randomInteger(1, 5);

const descriptionArr = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.
Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.
Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.
Phasellus eros mauris, condimentum sed nibhvitae, sodales efficitur ipsum.
Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc anteut dui.
Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac portadapibus.
In rutrum ac purus sit amet tempus`.split(`.`);

const getRandomDescription = (count, descArr) => {
  let initialArr = descArr;
  let descriptionArr = [];

  for (let i = 0; i < count; i++) {
    let index = Math.floor(Math.random() * initialArr.length);
    descriptionArr.push(initialArr.splice(index, 1).join(``).trim());
  }

  return descriptionArr;
};

console.log(getRandomDescription(SENTENCE_COUNT, descriptionArr));

const photo = `http://picsum.photos/248/152?r=${randomInteger(5)}`;
const PHOTO_COUNT = 7;

const offers = new Map([
  [`Taxi`, [
    {name: `Order Uber`, price: getLowCost(), checked: false},
    {name: `Order Uber Comfort`, price: getMiddleCost(), checked: false},
    {name: `Order Uber VIP`, price: getMiddleCost(), checked: false},
  ]],
  [`Flight`, [
    {name: `Add luggage`, price: getLowCost(), checked: true},
    {name: `Switch to comfort`, price: getMiddleCost(), checked: true},
    {name: `Add meal`, price: getLowCost(), checked: false},
    {name: `Choose seats`, price: getLowCost(), checked: true},
    {name: `Travel by train`, price: getLowCost(), checked: false}
  ]],
  [`Drive`, [
    {name: `Rent a car`, price: getHightCost(), checked: false},
    {name: `Rent a bike`, price: getHightCost(), checked: true}
  ]],
  [`Check-in`, [
    {name: `Add breakfast`, price: getLowCost(), checked: true},
    {name: `Add lunch`, price: getLowCost(), checked: true},
    {name: `Add dinner`, price: getMiddleCost(), checked: true},
    {name: `Room with minibar`, price: getMiddleCost(), checked: false},
    {name: `Rooftop pool`, price: getMiddleCost(), checked: false},
  ]],
  [`Sightseeing`, [
    {name: `Book excursion tickets`, price: getLowCost(), checked: false},
    {name: `Lunch in city`, price: getLowCost(), checked: true},
    {name: `Going to the theater`, price: getMiddleCost(), checked: false},
    {name: `Trip to the exhibition of paintings`, price: getLowCost(), checked: true},
    {name: `Tour of places of military glory`, price: getLowCost(), checked: false}
  ]]
]);

const getPoint = () => {
  return {

  };
};

export {offers};