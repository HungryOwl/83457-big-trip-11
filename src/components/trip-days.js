import {TripPoint} from './trip-point';

class TripEventsList {
  constructor(points) {
    this._element = null;
    this._points = points;
    this._pointElems = this.getPoints();
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

  getElement() {
    const container = this.getElemFromTemplate(`<ul class="trip-events__list"></ul>`);
    const fragment = new DocumentFragment();

    this._pointElems.forEach((point) => {
      const pointElem = point.getElement();
      const listElem = this.getElemFromTemplate(`<li class="trip-events__item"></li>`);

      listElem.append(pointElem);
      fragment.append(listElem);
    });

    container.append(fragment);
    this._element = container;

    return this._element;
  }

  getElemFromTemplate(template) {
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

  removeElement() {
    this._element = null;
  }
}

class TripDay {
  constructor(dayGroup, dayNumber) {
    this._dayGroup = dayGroup;
    this._dayNumber = dayNumber;
    this._template = this.getTemplate();
    this._element = null;
    this._tripEventsList = new TripEventsList(this._dayGroup.points);
  }

  getTemplate() {
    return (
      `<li class="trip-days__item day">
        <div class="day__info">
          <span class="day__counter">${(this._dayNumber)}</span>
          <time class="day__date" datetime=${this._dayGroup.date}>${this._dayGroup.month.slice(0, 3)} ${this._dayGroup.day}</time>
        </div>
      </li>`
    );
  }

  getElement() {
    const container = this.getElemFromTemplate(this._template);
    container.append(this._tripEventsList.getElement());
    this._element = container;

    return this._element;
  }

  getElemFromTemplate(template) {
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

  removeElement() {
    this._element = null;
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
    const container = this.getElemFromTemplate(`<ul class="trip-days"></ul>`);

    this._tripDays.forEach((tripDay) => {
      const tripDayElem = tripDay.getElement();
      container.append(tripDayElem);
    });

    this._element = container;

    return this._element;
  }

  getElemFromTemplate(template) {
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

  removeElement() {
    this._element = null;
  }
}
