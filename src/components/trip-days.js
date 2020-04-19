import {getTripPointTemplate} from './trip-point';

const getTripEventsList = (points) => {
  const tripPoints = points
    .map((point) => `<li class="trip-events__item">${getTripPointTemplate(point)}</li>`)
    .join(` `);

  return `<ul class="trip-events__list">${tripPoints}</ul>`;
};

const getTripsDay = (dayGroup, dayNumber) => {
  return (
    `<li class="trip-days__item day">
      <div class="day__info">
        <span class="day__counter">${dayNumber}</span>
        <time class="day__date" datetime=${dayGroup.date}>${dayGroup.month.slice(0, 2)} ${dayGroup.day}</time>
      </div>

      ${getTripEventsList(dayGroup.points)}
    </li>`
  );
};

const getTripDaysTemplate = (dayGroups) => {
  const days = dayGroups
    .map((dayGroup, i) => getTripsDay(dayGroup, i + 1))
    .join(` `);

  return (
    `<ul class="trip-days">${days}</ul>`
  );
};

export {getTripDaysTemplate};
