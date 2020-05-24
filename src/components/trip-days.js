import {createElement} from '../utils/render.js';
import PointController from '../controllers/PointController';
import AbstractComponent from './abstract-component';

const getTripDayTemplate = (dayGroup, dayNumber) => {
  const dayInfo = dayNumber
    ? `<span class="day__counter">${dayNumber}</span>
       <time class="day__date" datetime=${dayGroup.date}>${dayGroup.month.slice(0, 3)} ${dayGroup.day}</time>`
    : ``;

  return (
    `<li class="trip-days__item day">
      <div class="day__info">${dayInfo}</div>
    </li>`
  );
};

const getTripDaysTemplate = () => (
  `<ul class="trip-days"></ul>`
);

const getTripEventsListTemplate = () => (
  `<ul class="trip-events__list"></ul>`
);

export class TripEventsList extends AbstractComponent {
  getTemplate() {
    return getTripEventsListTemplate();
  }
}

export class TripDay extends AbstractComponent {
  constructor(dayGroup, dayNumber) {
    super();
    this._dayGroup = dayGroup;
    this._dayNumber = dayNumber;
    this._tripEventsListComponent = new TripEventsList(this._dayGroup.points);
  }

  _renderTripDay() {
    this._element.append(this._tripEventsListComponent.getElement());
  }

  getTemplate() {
    return getTripDayTemplate(this._dayGroup, this._dayNumber);
  }

  getElement() {
    super.getElement();
    this._renderTripDay();

    return this._element;
  }
}

export class TripDays extends AbstractComponent {
  getTemplate() {
    return getTripDaysTemplate();
  }
}
