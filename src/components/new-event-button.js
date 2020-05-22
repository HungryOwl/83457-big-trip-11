import AbstractComponent from './abstract-component.js';

const getNewEventBtnTemplate = () => (
  `<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>`
);

export default class NewEventButton extends AbstractComponent {
  getTemplate() {
    return getNewEventBtnTemplate();
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
