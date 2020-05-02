import {createElement} from '../utils.js';

const getNewEventBtnTemplate = () => {
  return (
    `<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>`
  );
};

const getTripMainTemplate = () => {
  return (
    `<div class="trip-main">${getNewEventBtnTemplate}</div>`
  );
};


export default class TripMain {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return getTripMainTemplate();
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
