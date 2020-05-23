import {createElement, replaceComponent} from '../utils/render.js';
import TripPoint from './trip-point';
import EditTrip from './edit-trip';
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

const getTripEventsItemTemplate = () => (
  `<li class="trip-events__item"></li>`
);

class TripEventsList extends AbstractComponent {
  constructor(points) {
    super();
    this._points = points;
    this._pointComponents = this._getPointComponents();
  }

  _getPointComponents() {
    return this._points.map((point) => {
      const tripPointComponent = new TripPoint(point);
      const editTripComponent = new EditTrip(point);

      const replacePointToEdit = () => {
        replaceComponent(tripPointComponent, editTripComponent);
        document.addEventListener(`keydown`, onEscKeyDown);
      };

      const replaceEditToPoint = () => {
        replaceComponent(editTripComponent, tripPointComponent);
        document.removeEventListener(`keydown`, onEscKeyDown);
      };

      const onEscKeyDown = (evt) => {
        const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

        if (isEscKey) {
          replaceEditToPoint();
        }
      };

      const onEditTripRollupBtnClick = () => {
        replaceComponent(editTripComponent, tripPointComponent);
      };
      const onPointRollupBtnClick = () => {
        editTripComponent.setSubmitButtonClickHandler(onEditTripRollupBtnClick);
        editTripComponent.setRollupButtonClickHandler(onEditTripRollupBtnClick);
        replacePointToEdit();
      };

      tripPointComponent.setRollupBtnClickHandler(onPointRollupBtnClick);

      return tripPointComponent;
    });
  }

  _renderTripPoint() {
    this._pointComponents.forEach((pointComponent) => {
      const pointElem = pointComponent.getElement();
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
}

class TripDay extends AbstractComponent {
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

export default class TripDays extends AbstractComponent {
  constructor(dayGroups) {
    super();
    this._tripDaysComponents = this._getTripDays(dayGroups);
  }

  _getTripDays(dayGroups) {
    return dayGroups.map((dayGroup, day, arr) => {
      const groupDay = (arr.length > 1) ? day + 1 : null;
      return new TripDay(dayGroup, groupDay);
    });
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
