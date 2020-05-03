import {createElement} from '../utils.js';

const getEventOfferMarkup = (name, price) => {
  return (
    `<li class="event__offer">
        <span class="event__offer-title">${name}</span>
        &plus;
        &#8381;&nbsp;<span class="event__offer-price">${price}</span>
    </li>`
  );
};

const getCheckedOffersTemplate = (offers) => {
  if (!offers) {
    return ``;
  }

  const offersList = offers.map((offer) => {
    return getEventOfferMarkup(offer.name, offer.price);
  }).slice(0, 3).join(`\n`);

  return (
    `<h4 class="visually-hidden">Offers:</h4>
     <ul class="event__selected-offers">${offersList}</ul>`
  );
};

export const getTripPointTemplate = (point) => {
  const {type, price, destination, offers, preposition, date} = point;
  const eventTime = date.eventTime;
  const eventDuration = date.eventDuration;

  return `
     <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${preposition} ${destination}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="2019-03-18T10:30">${eventTime.from.hours}:${eventTime.from.minutes}</time>
            &mdash;
            <time class="event__end-time" datetime="2019-03-18T11:00">${eventTime.to.hours}:${eventTime.to.minutes}</time>
          </p>
          <p class="event__duration">${eventDuration}</p>
        </div>

        <p class="event__price">
          &#8381;&nbsp;<span class="event__price-value">${price}</span>
        </p>

        ${getCheckedOffersTemplate(offers)}

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
     </div>
   `;
};

export class TripPoint {
  constructor(point) {
    this._point = point;
    this._element = null;
  }

  getTemplate() {
    return getTripPointTemplate(this._point);
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
