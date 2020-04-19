import {points} from './trip-point';
import {getFormattedDate} from '../utils';

const pointsArr = points.slice(1, points.length - 1);
const monthNames = [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`];

const getTripDays = () => {
  const dayGroups = [];
  const daysMap = {};

  pointsArr.forEach((point) => {
    const dateFrom = point.date.from;
    const year = dateFrom.getFullYear();
    const month = dateFrom.getMonth();
    const day = dateFrom.getDate();
    const formattedDay = getFormattedDate(day);

    const date = `${year}-${getFormattedDate(month)}-${formattedDay}`;
    let group = daysMap[date];

    if (!group) {
      group = {
        date,
        points: [point],
        month: monthNames[month],
        day: formattedDay
      };

      daysMap[date] = group;
      dayGroups.push(group);
    } else {
      group.points.push(point);
    }
  });

  return dayGroups;
};

const dayGroups = getTripDays();

export {dayGroups};

