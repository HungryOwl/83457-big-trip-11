import {getRandomInteger, getFormattedDate} from '../utils';

const MIN_IN_HOUR = 60;
const HOURS_IN_DAY = 24;
const SEC_IN_MIN = 60;
const MS_IN_SEC = 1000;
const MS_IN_DAY = MS_IN_SEC * SEC_IN_MIN * MIN_IN_HOUR * HOURS_IN_DAY;
const MS_IN_HOUR = MIN_IN_HOUR * SEC_IN_MIN * MS_IN_SEC;

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
  Sightseeing: `at`,
  Restaurant: `at`
};

const dates = [
  {from: `16/03/21 10:10`, to: `16/03/21 13:00`},
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
  {from: `16/03/21 14:05`, to: `16/03/21 13:55`},
  {from: `19/03/21 15:00`, to: `19/03/21 19:55`},
  {from: `19/03/21 21:45`, to: `19/03/21 23:00`},
];

const PHOTO_COUNT = getRandomInteger(1, 7);
const SENTENCE_COUNT = getRandomInteger(1, 5);
const POINTS_COUNT = dates.length;

const getLowCost = () => getRandomInteger(10, 60);
const getMiddleCost = () => getRandomInteger(70, 140);
const getHightCost = () => getRandomInteger(150, 600);
const isChecked = () => Math.random() > 0.5;

const offersMap = new Map([
  [`Taxi`, [
    {name: `Order Uber`, price: getLowCost(), checked: isChecked()},
    {name: `Order Uber Comfort`, price: getMiddleCost(), checked: isChecked()},
    {name: `Order Uber VIP`, price: getMiddleCost(), checked: isChecked()},
  ]],
  [`Bus`, [
    {name: `City bus tour`, price: getMiddleCost(), checked: isChecked()},
    {name: `Wifi`, price: getLowCost(), checked: isChecked()},
    {name: `Air conditioning`, price: getLowCost(), checked: isChecked()},
  ]],
  [`Train`, [
    {name: `Reserved seat`, price: getLowCost(), checked: isChecked()},
    {name: `Сoupe`, price: getHightCost(), checked: isChecked()},
    {name: `Restaurant car`, price: getHightCost(), checked: isChecked()},
    {name: `Sleeping set`, price: getMiddleCost(), checked: isChecked()},
    {name: `Wifi`, price: getLowCost(), checked: isChecked()},
  ]],
  [`Flight`, [
    {name: `Add luggage`, price: getLowCost(), checked: isChecked()},
    {name: `Switch to comfort`, price: getMiddleCost(), checked: isChecked()},
    {name: `Add meal`, price: getLowCost(), checked: isChecked()},
    {name: `Choose seats`, price: getLowCost(), checked: isChecked()},
    {name: `Travel by train`, price: getLowCost(), checked: isChecked()}
  ]],
  [`Ship`, [
    {name: `Full board meals`, price: getMiddleCost(), checked: isChecked()},
    {name: `Teacher services`, price: getMiddleCost(), checked: isChecked()},
    {name: `SPA treatments`, price: getMiddleCost(), checked: isChecked()}
  ]],
  [`Drive`, [
    {name: `Rent a car`, price: getHightCost(), checked: isChecked()},
    {name: `Rent a bike`, price: getHightCost(), checked: isChecked()}
  ]],
  [`Check-in`, [
    {name: `Add breakfast`, price: getLowCost(), checked: isChecked()},
    {name: `Add lunch`, price: getLowCost(), checked: isChecked()},
    {name: `Five stars`, price: getMiddleCost(), checked: isChecked()},
    {name: `Room with minibar`, price: getMiddleCost(), checked: isChecked()},
    {name: `Rooftop pool`, price: getMiddleCost(), checked: isChecked()},
  ]],
  [`Sightseeing`, [
    {name: `Book excursion tickets`, price: getLowCost(), checked: isChecked()},
    {name: `Lunch in city`, price: getLowCost(), checked: isChecked()},
    {name: `Going to the theater`, price: getMiddleCost(), checked: isChecked()},
    {name: `Trip to the exhibition of paintings`, price: getLowCost(), checked: isChecked()},
    {name: `Tour of places of military glory`, price: getLowCost(), checked: isChecked()}
  ]],
  [`Restaurant`, [
    {name: `Five Stars`, price: getHightCost(), checked: isChecked()}
  ]]
]);

const descriptionArr = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.
  Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.
  Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.
  Phasellus eros mauris, condimentum sed nibhvitae, sodales efficitur ipsum.
  Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc anteut dui.
  Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac portadapibus.
  In rutrum ac purus sit amet tempus`.split(`.`);

const getPointType = () => pointTypes[getRandomInteger(0, pointTypes.length - 1)];
const getDestination = () => destinations[getRandomInteger(0, destinations.length - 1)];

// По велению судьбы и дизайнера мы получаем дату из поля ввода в формате 18/03/19 00:00
const parseDate = (value) => {
  let [day, month, year] = value.split(` `)[0].split(`/`);
  const [hours, minutes] = value.split(` `)[1].split(`:`);
  year = 20 + year;

  return new Date(year, month, day, hours, minutes);
};

const getDate = (datesArr) => {
  const date = datesArr.splice(getRandomInteger(0, dates.length - 1), 1)[0];
  date.from = parseDate(date.from);
  date.to = parseDate(date.to);

  return date;
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
  timeDuration = timeDuration - days * MS_IN_DAY;
  hours = Math.floor(timeDuration / MS_IN_HOUR);

  return `
    ${days ? getFormattedDate(days) + `D` : ``}
    ${hours ? getFormattedDate(hours) + `H` : ``}
    ${minutes ? getFormattedDate(minutes) + `M` : ``}
  `;
};

const getRandomDescription = (count, descArr) => {
  let initialArr = descArr;
  let descriptions = [];

  for (let i = 0; i < count; i++) {
    let index = Math.floor(Math.random() * initialArr.length);
    descriptions.push(initialArr.splice(index, 1).join(``).trim());
  }

  return descriptions;
};

const getPhotos = (count) => {
  let photoArr = [];

  for (let i = 0; i < count; i++) {
    const photo = `http://picsum.photos/248/152?r=${getRandomInteger(1, 100)}`;
    photoArr.push(photo);
  }

  return photoArr;
};

const getPoint = () => {
  const type = getPointType();
  const destination = getDestination();
  const offers = offersMap.get(type);
  const description = getRandomDescription(SENTENCE_COUNT, descriptionArr);
  const photos = getPhotos(PHOTO_COUNT);
  const preposition = prepositions[type];
  const date = getDate(dates);
  const price = getRandomInteger(10, 600);
  date.eventTime = getEventTime(date.from, date.to);
  date.eventDuration = getEventDuration(date.from, date.to);

  return {
    type,
    price,
    destination,
    offers,
    description,
    photos,
    preposition,
    date
  };
};

const sortPoints = (point, nextPoint) => {
  const prevTimestamp = point.date.from.getTime();
  const nextTimestamp = nextPoint.date.from.getTime();

  if (prevTimestamp > nextTimestamp) {
    return 1;
  }

  if (prevTimestamp === nextTimestamp) {
    return 0;
  }

  return -1;
};

const getPoints = (count) => {
  return new Array(count)
    .fill(``)
    .map(getPoint)
    .sort(sortPoints);
};

const points = getPoints(POINTS_COUNT);

console.log(points);

export {points};
