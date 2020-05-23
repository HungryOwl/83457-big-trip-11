import {createElement, replaceComponent} from '../utils/render.js';
import TripPoint from './trip-point';
import EditTrip from './edit-trip';
import AbstractComponent from './abstract-component';

const getTripDaysemplate = (dayGroup, dayNumber) => (
  `<li class="trip-days__item day">
      <div class="day__info">
        <span class="day__counter">${dayNumber}</span>
        <time class="day__date" datetime=${dayGroup.date}>${dayGroup.month.slice(0, 3)} ${dayGroup.day}</time>
      </div>
    </li>`
);

const getTripDaysTemplate = () => (
  `<ul class="trip-days"></ul>`
);

const getTripEventsListTemplate = () => (
  `<ul class="trip-events__list"></ul>`
);

const getTripEventsItemTemplate = () => (
  `<li class="trip-events__item"></li>`
);

class TripEventsList extends AbstractComponent {
  constructor(points) {
    super();
    this._points = points;
    this._pointComponents = this._getPoints();
  }

  _getPoints() {
    return this._points.map((point) => new TripPoint(point));
  }

  _renderTripPoint() {
    this._pointComponents.forEach((point) => {
      const pointElem = point.getElement();
      const listElem = createElement(getTripEventsItemTemplate());

      listElem.append(pointElem);
      this._element.append(listElem);
    });
  }

  getTemplate() {
    return getTripEventsListTemplate();
  }

  getElement() {
    super.getElement();
    this._renderTripPoint();

    return this._element;
  }

  _onEditTripCancelBtnClick(editTripComponent, pointComponent) {
    return () => {
      replaceComponent(editTripComponent, pointComponent);
    };
  }

  _onRollupBtnClick(pointComponent) {
    const point = pointComponent.getPointData();
    const editTripComponent = new EditTrip(point);

    editTripComponent.setCancelButtonClick(this._onEditTripCancelBtnClick(editTripComponent, pointComponent));

    return () => {
      replaceComponent(pointComponent, editTripComponent);
    };
  }

  setRollupBtnClickHandler() {
    this._pointComponents.forEach((pointComponent) => {
      pointComponent.setRollupBtnClickHandler(this._onRollupBtnClick(pointComponent));
    });
  }
}

class TripDay extends AbstractComponent {
  constructor(dayGroup, dayNumber) {
    super();
    this._dayGroup = dayGroup;
    this._dayNumber = dayNumber;
    this._template = this.getTemplate();
    this._tripEventsListComponent = new TripEventsList(this._dayGroup.points);
    this._tripEventsListComponent.setRollupBtnClickHandler();
  }

  _renderTripDay() {
    this._element.append(this._tripEventsListComponent.getElement());
  }

  getTemplate() {
    return getTripDaysemplate(this._dayGroup, this._dayNumber);
  }

  getElement() {
    super.getElement();
    this._renderTripDay();

    return this._element;
  }
}

export default class TripDays extends AbstractComponent {
  constructor(dayGroups) {
    super();
    this._tripDaysComponents = this._getTripDays(dayGroups);
  }

  _getTripDays(dayGroups) {
    return dayGroups.map((dayGroup, day) => new TripDay(dayGroup, day + 1));
  }

  _renderTripDays() {
    this._tripDaysComponents.forEach((tripDay) => {
      const tripDayElem = tripDay.getElement();
      this._element.append(tripDayElem);
    });
  }

  getTemplate() {
    return getTripDaysTemplate(this._message);
  }

  getElement() {
    super.getElement();
    this._renderTripDays();

    return this._element;
  }
}
