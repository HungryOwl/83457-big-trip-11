import AbstractComponent from './abstract-component';

const getNewEventBtnTemplate = () => (
  `<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>`
);
const getTripMainTemplate = () => (
  `<div class="trip-main">${getNewEventBtnTemplate()}</div>`
);

export default class TripHeader extends AbstractComponent {
  getTemplate() {
    return getTripMainTemplate();
  }
}
