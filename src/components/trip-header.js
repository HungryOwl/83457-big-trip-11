import AbstractComponent from './abstract-component';

const getTripMainTemplate = () => (
  `<div class="trip-main"></div>`
);

export default class TripHeader extends AbstractComponent {
  getTemplate() {
    return getTripMainTemplate();
  }
}
