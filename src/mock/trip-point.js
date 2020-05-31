import {getRandomInteger, getEventDuration, getEventTime, sortPointsByDate, flipCoin} from '../utils/common';

const eventTypes = [
  {event: `Taxi`, type: `ride`},
  {event: `Bus`, type: `ride`},
  {event: `Train`, type: `ride`},
  {event: `Ship`, type: `ride`},
  {event: `Transport`, type: `ride`},
  {event: `Drive`, type: `ride`},
  {event: `Flight`, type: `ride`},
  {event: `Check-in`, type: `place`},
  {event: `Sightseeing`, type: `place`},
  {event: `Restaurant`, type: `place`},
];

const DESTINATIONS = [`Горький`, `Дзержинск`, `Сталинград`, `Ногинск`, `Ворошиловск`, `Ульяновск`, `Молотов`, `Орджоникидзе`];

export const PREPOSITIONS = {
  Taxi: `to`,
  Bus: `to`,
  Train: `to`,
  Ship: `to`,
  Transport: `to`,
  Drive: `to`,
  Flight: `to`,
  [`Check-in`]: `at`,
  Sightseeing: `at`,
  Restaurant: `at`
};

const dates = [
  {from: `16/03/19 07:00`, to: `16/03/19 10:03`},
  {from: `16/03/19 15:15`, to: `19/03/19 18:05`},
  {from: `16/03/21 15:15`, to: `16/03/21 18:05`},
  {from: `16/03/21 19:19`, to: `17/03/21 06:15`},
  {from: `17/03/21 11:11`, to: `17/03/21 12:00`},
  {from: `18/03/21 18:16`, to: `19/03/21 05:25`},
  {from: `17/03/21 12:24`, to: `17/03/21 13:55`},
  {from: `19/03/21 10:10`, to: `19/03/21 14:25`},
  {from: `19/03/21 20:20`, to: `19/03/21 21:21`},
  {from: `17/03/21 14:14`, to: `17/03/21 20:10`},
  {from: `17/03/21 22:15`, to: `18/03/21 07:33`},
  {from: `18/03/21 09:10`, to: `18/03/21 12:15`},
  {from: `18/03/21 13:45`, to: `18/03/21 16:05`},
  {from: `16/03/21 13:05`, to: `16/03/21 13:55`},
  {from: `19/03/21 15:00`, to: `19/03/21 19:55`},
  {from: `19/03/21 21:45`, to: `01/04/21 07:00`},
];

const PHOTO_COUNT = getRandomInteger(1, 7);
const SENTENCE_COUNT = getRandomInteger(1, 5);
const POINTS_COUNT = dates.length;

const getLowCost = () => getRandomInteger(5, 20) * 100;
const getMiddleCost = () => getRandomInteger(21, 140) * 100;
const getHighCost = () => getRandomInteger(141, 600) * 100;
const isChecked = () => Math.random() > 0.5;

const prices = {
  Taxi: getLowCost(),
  Bus: getLowCost(),
  Train: getMiddleCost(),
  Ship: getMiddleCost(),
  Transport: getLowCost(),
  Drive: getLowCost(),
  Flight: getHighCost(),
  [`Check-in`]: getLowCost(),
  Sightseeing: getLowCost(),
  Restaurant: getMiddleCost()
};

export const OFFERS_MAP = new Map([
  [`Taxi`, [
    {name: `Order Uber`, price: getLowCost(), label: `uber`, checked: isChecked()},
    {name: `Order Uber Comfort`, price: getMiddleCost(), label: `comfort`, checked: isChecked()},
    {name: `Order Uber VIP`, price: getMiddleCost(), label: `vip`, checked: isChecked()},
  ]],
  [`Bus`, [
    {name: `City bus tour`, price: getMiddleCost(), label: `tour`, checked: isChecked()},
    {name: `Wifi`, price: getLowCost(), label: `wifi`, checked: isChecked()},
    {name: `Air conditioning`, price: getLowCost(), label: `conditioning`, checked: isChecked()},
  ]],
  [`Train`, [
    {name: `Reserved seat`, price: getLowCost(), label: `seat`, checked: isChecked()},
    {name: `Сoupe`, price: getHighCost(), label: `coupe`, checked: isChecked()},
    {name: `Restaurant car`, price: getHighCost(), label: `restaurant`, checked: isChecked()},
    {name: `Sleeping set`, price: getMiddleCost(), label: `sleeping`, checked: isChecked()},
    {name: `Wifi`, price: getLowCost(), label: `wifi`, checked: isChecked()},
  ]],
  [`Flight`, [
    {name: `Add luggage`, price: getLowCost(), label: `luggage`, checked: isChecked()},
    {name: `Switch to comfort`, price: getMiddleCost(), label: `comfort`, checked: isChecked()},
    {name: `Add meal`, price: getLowCost(), label: `meal`, checked: isChecked()},
    {name: `Choose seats`, price: getLowCost(), label: `seats`, checked: isChecked()},
    {name: `Travel by train`, price: getLowCost(), label: `train`, checked: isChecked()}
  ]],
  [`Ship`, [
    {name: `Full board meals`, price: getMiddleCost(), label: `meals`, checked: isChecked()},
    {name: `Babyseat services`, price: getMiddleCost(), label: `babyseat`, checked: isChecked()},
    {name: `SPA treatments`, price: getMiddleCost(), label: `spa`, checked: isChecked()}
  ]],
  [`Drive`, [
    {name: `Rent a car`, price: getMiddleCost(), label: `car`, checked: isChecked()},
    {name: `Rent a bike`, price: getLowCost(), label: `bike`, checked: isChecked()}
  ]],
  [`Check-in`, [
    {name: `Add breakfast`, price: getLowCost(), label: `breakfast`, checked: isChecked()},
    {name: `Add lunch`, price: getLowCost(), label: `lunch`, checked: isChecked()},
    {name: `Five stars`, price: getMiddleCost(), label: `stars`, checked: isChecked()},
    {name: `Room with minibar`, price: getMiddleCost(), label: `minibar`, checked: isChecked()},
    {name: `Rooftop pool`, price: getMiddleCost(), label: `pool`, checked: isChecked()},
  ]],
  [`Sightseeing`, [
    {name: `Book excursion tickets`, price: getLowCost(), label: `tickets`, checked: isChecked()},
    {name: `Lunch in city`, price: getLowCost(), label: `lunch`, checked: isChecked()},
    {name: `Going to the theater`, price: getMiddleCost(), label: `theater`, checked: isChecked()},
    {name: `Trip to the exhibition of paintings`, price: getLowCost(), label: `exhibition`, checked: isChecked()},
    {name: `Tour of places of military glory`, price: getLowCost(), label: `military`, checked: isChecked()}
  ]],
  [`Restaurant`, [
    {name: `Five Stars`, price: getHighCost(), label: `stars`, checked: isChecked()}
  ]]
]);

const DESCRIPTION_MOCK = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.
  Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.
  Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.
  Phasellus eros mauris, condimentum sed nibhvitae, sodales efficitur ipsum.
  Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc anteut dui.
  Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac portadapibus.
  In rutrum ac purus sit amet tempus`.split(`.`);

const getPointType = () => eventTypes[getRandomInteger(0, eventTypes.length - 1)].event;
const getDestination = () => DESTINATIONS[getRandomInteger(0, DESTINATIONS.length - 1)];

// По велению судьбы и дизайнера мы получаем дату из поля ввода в формате 18/03/19 00:00
// Нужно добавить moment?
const parseDate = (value) => {
  if (!value) {
    return ``;
  }

  const THRESHOLD_YEAR = 30;
  const [day, month] = value.split(` `)[0].split(`/`);
  let [year] = value.split(` `)[0].split(`/`);
  const [hours, minutes] = value.split(` `)[1].split(`:`);

  year = year < THRESHOLD_YEAR ? `20` + year : `19` + year;

  return new Date(year, month, day, hours, minutes);
};

const getDate = (datesArr) => {
  const date = datesArr.splice(getRandomInteger(0, dates.length - 1), 1)[0];
  date.from = parseDate(date.from);
  date.to = parseDate(date.to);

  return date;
};

const getRandomDescription = (count, descArr) => {
  const initialArr = descArr.slice();
  const descriptions = [];

  for (let i = 0; i < count; i++) {
    const index = Math.floor(Math.random() * initialArr.length);
    descriptions.push(initialArr.splice(index, 1));
  }

  return descriptions.join(` `).trim();
};

const getPhotos = (count) => {
  const photoArr = [];

  for (let i = 0; i < count; i++) {
    const photo = `http://picsum.photos/248/152?r=${getRandomInteger(1, 100)}`;
    photoArr.push(photo);
  }

  return photoArr;
};

const getPoint = (i) => {
  const type = getPointType();
  const destination = getDestination();
  const offers = OFFERS_MAP.get(type);
  const description = getRandomDescription(SENTENCE_COUNT, DESCRIPTION_MOCK);
  const photos = getPhotos(PHOTO_COUNT);
  const preposition = PREPOSITIONS[type];
  const date = getDate(dates);
  const price = prices[type];
  const id = i;
  const isFavorite = flipCoin();
  date.eventTime = getEventTime(date.from, date.to);
  date.timeDuration = date.to - date.from;
  date.eventDuration = getEventDuration(date.from, date.to);

  return {
    type,
    price,
    destination,
    offers,
    description,
    photos,
    preposition,
    date,
    id,
    isFavorite,
  };
};

const getPoints = (count) => {
  const points = [];

  for (let i = 0; i < count; i++) {
    points.push(getPoint(i));
  }

  points.sort(sortPointsByDate);

  return points;
};

const points = getPoints(POINTS_COUNT);

export {
  points,
  eventTypes,
  DESTINATIONS,
  getRandomDescription,
  SENTENCE_COUNT,
  DESCRIPTION_MOCK,
  getPhotos,
  PHOTO_COUNT
};
