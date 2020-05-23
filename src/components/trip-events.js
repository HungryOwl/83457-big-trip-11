import AbstractComponent from './abstract-component.js';

const getTripEventsTemplate = () => (
  `<section class="trip-events">
    <h2 class="visually-hidden">Trip events</h2>
  </section>`
);


export default class TripEvents extends AbstractComponent {
  getTemplate() {
    return getTripEventsTemplate();
  }
}
