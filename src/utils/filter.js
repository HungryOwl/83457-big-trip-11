import {isFuture, isPast} from './common.js';
import {FilterType} from '../const.js';

export const getFutureTrips = (points) => {
  return points.filter((point) => isFuture(point.date.from));
};

export const getPastTrips = (points) => {
  return points.filter((point) => isPast(point.date.to));
};

export const getPointsByFilter = (points, filterType) => {
  switch (filterType) {
    case FilterType.ALL:
      return points;
    case FilterType.FUTURE:
      return getFutureTrips(points);
    case FilterType.PAST:
      return getPastTrips(points);
  }

  return points;
};
