import {points} from './trip-point';

let fullCost = 0;

points.forEach((point) => {
  fullCost += point.getFullPrice();
});

export {fullCost};
