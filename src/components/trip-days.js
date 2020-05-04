import {TripPoint} from './trip-point';
import {createElement} from '../utils';

class TripEventsList {
  constructor(points) {
    this._points = points;
    this._pointElems = this.getPoints();
    this._pointNodes = null;
  }

  getPoints() {
    return this._points.map((point) => new TripPoint(point));
  }

  getTemplate() {
    const tripPoints = this._pointElems
      .map((point) => `<li class="trip-events__item">${point.getTemplate()}</li>`)
      .join(` `);

    return `<ul class="trip-events__list">${tripPoints}</ul>`;
  }

  getTripEventsList() {
    const container = this.getElement(`<ul class="trip-events__list"></ul>`);
    const fragment = new DocumentFragment();

    this._pointElems.forEach((point) => {
      const pointElem = point.getElement();
      const listElem = this.getElement(`<li class="trip-events__item"></li>`);

      listElem.append(pointElem);
      fragment.append(listElem);
    });

    container.append(fragment);
  }

  getElement(template) {
    const newElement = document.createElement(`div`);
    newElement.innerHTML = template;

    if (newElement.childNodes.length > 1) {
      const fragment = new DocumentFragment();

      for (let i = 0; i < newElement.childNodes.length; i++) {
        fragment.append(newElement.childNodes[i]);
      }

      return fragment;
    } else {
      return newElement.firstChild;
    }
  }
}

class TripDay {
  constructor(dayGroup, dayNumber) {
    this._dayGroup = dayGroup;
    this._dayNumber = dayNumber;
    this._tripEventsList = new TripEventsList(this._dayGroup.points);

    this._tripEventsList.getTripEventsList();
  }

  // @TODO добавить генерацию элемента и вставку в него другого элемента
  getTemplate() {
    return (
      `<li class="trip-days__item day">
        <div class="day__info">
          <span class="day__counter">${(this._dayNumber)}</span>
          <time class="day__date" datetime=${this._dayGroup.date}>${this._dayGroup.month.slice(0, 3)} ${this._dayGroup.day}</time>
        </div>

        ${this._tripEventsList.getTemplate()}
      </li>`
    );
  }
}

export default class TripDays {
  constructor(dayGroups) {
    this._element = null;
    this._tripDays = this._getTripDays(dayGroups);
  }

  // @TODO геттер или нет?
  _getTripDays(dayGroups) {
    return dayGroups.map((dayGroup, day) => new TripDay(dayGroup, day + 1));
  }

  getTemplate() {
    const days = this._tripDays
      .map((tripDay) => tripDay.getTemplate())
      .join(` `);

    return (
      `<ul class="trip-days">${days}</ul>`
    );
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
