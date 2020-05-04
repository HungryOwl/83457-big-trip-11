import {createElement} from '../utils';

const getMessagesTemplate = (message) => (
  `<p class="trip-events__msg">${message}</p>`
);

export default class Message {
  constructor(message) {
    this._message = message;

    this._element = null;
  }

  getTemplate() {
    return getMessagesTemplate(this._message);
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
