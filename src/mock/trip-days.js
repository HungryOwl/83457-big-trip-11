import {points} from './trip-point';

const pointsArr = points.slice();

const getTripDays = () => {
  const daysArr = [];
  let count = 0;

  daysArr[0] = {
    date: pointsArr[0].date
  }

  pointsArr.forEach((point, i, arr) => {
    daysArr[count] = {

    }
  });
};
