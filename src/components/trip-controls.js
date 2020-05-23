import AbstractComponent from './abstract-component';

const getTripControlsTemplate = () => (
  `<div class="trip-main__trip-controls  trip-controls"></div>`
);

export default class TripControls extends AbstractComponent {
  getTemplate() {
    return getTripControlsTemplate();
  }
}
