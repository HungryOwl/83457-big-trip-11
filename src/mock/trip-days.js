import {points} from './trip-point';
import {monthNames, getDateObj, getFormattedDate} from '../utils';

const pointsArr = points.slice(1);

const getTripDayGroups = () => {
  const dayGroups = [];
  const daysMap = {};

  pointsArr.forEach((point) => {
    const dateFrom = point.date.from;
    const dateObj = getDateObj(dateFrom);
    const year = dateObj.year;
    const month = dateObj.month;
    const day = getFormattedDate(dateObj.day);

    const date = `${year}-${getFormattedDate(month)}-${day}`;

    let group = daysMap[date];

    if (!group) {
      group = {
        date,
        points: [point],
        month: monthNames[month],
        day
      };

      daysMap[date] = group;
      dayGroups.push(group);
    } else {
      group.points.push(point);
    }
  });

  return dayGroups;
};

const dayGroups = getTripDayGroups();

export {dayGroups};

