import {getTripPointTemplate} from './trip-point';

const TRIPS_COUNT = 3;

const getTripEventsList = (tripsCount, pointTemplate) => {
  let tripEvents = ``;
  let tripEventsList;

  for (let i = 0; i < tripsCount; i++) {
    tripEvents += `<li class="trip-events__item">${pointTemplate}</li>`;
  }

  tripEventsList = `<ul class="trip-events__list">${tripEvents}</ul>`;
  return tripEventsList;
};

const tripEventsList = getTripEventsList(TRIPS_COUNT, getTripPointTemplate());

const getTripDaysTemplate = () => (
  `
    <ul class="trip-days">
      <li class="trip-days__item day">
        <div class="day__info">
          <span class="day__counter">1</span>
          <time class="day__date" datetime="2019-03-18">MAR 18</time>
        </div>

        ${tripEventsList}
      </li>
    </ul>
  `
);

export {getTripDaysTemplate};
