import AbstractComponent from './abstract-component';

const getMessagesTemplate = (message) => (
  `<p class="trip-events__msg">${message}</p>`
);

export default class Message extends AbstractComponent {
  constructor(message) {
    super();
    this._message = message;
    this._template = this.getTemplate();
  }

  getTemplate() {
    return getMessagesTemplate(this._message);
  }
}
