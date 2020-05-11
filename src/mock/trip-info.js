import {points} from './trip-point';
import {getDateObj} from '../utils/common';

const pointsCopy = points.slice(1);
const tripInfo = {};

const getStartEndDates = (pointsArr) => {
  let dates = [pointsArr[0].date.from];

  if (points.length > 1) {
    dates.push(points[points.length - 1].date.to);
  }

  dates = dates.map((timestamp) => {
    return getDateObj(timestamp);
  });

  return dates;
};

const getCitySequence = (pointsArr) => {
  const cities = [];

  pointsArr.forEach((point) => {
    cities.push(point.destination);
  });

  return cities;
};

tripInfo.cities = getCitySequence(pointsCopy);
tripInfo.dates = getStartEndDates(pointsCopy);

export {tripInfo};


