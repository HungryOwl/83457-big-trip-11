import _ from 'lodash';
import {eventTypes, destinations, PREPOSITIONS} from '../mock/trip-point';
import {getEventTime, getFormattedDate} from '../utils/common';
import AbstractSmartComponent from './abstract-smart-component';
import {NewPointMode} from '../controllers/TripController';

const rideTypes = [];
const placeTypes = [];

for (const {event, type} of eventTypes) {
  if (type === `ride`) {
    rideTypes.push(event);
  } else if (type === `place`) {
    placeTypes.push(event);
  }
}

const getEventTypeItems = (eventTypesArr, currentType, id) => {
  return eventTypesArr
    .map((eventType) => {
      const isChecked = eventType === currentType;
      const type = eventType.toLowerCase();

      return (
        `<div class="event__type-item">
          <input id="event-type-${type}-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${isChecked ? `checked` : ``}>
          <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-${id}">${eventType}</label>
        </div>`
      );
    }).join(``);
};

const getEventTypesList = (type, id) => {
  return (
    `<div class="event__type-list">
      <fieldset class="event__type-group">
        <legend class="visually-hidden">Transfer</legend>
        ${getEventTypeItems(rideTypes, type, id)}
      </fieldset>

      <fieldset class="event__type-group">
        <legend class="visually-hidden">Activity</legend>
        ${getEventTypeItems(placeTypes, type, id)}
      </fieldset>
    </div>`
  );
};

const getEventType = (type, id) => {
  return (
    `<div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">

      ${getEventTypesList(type, id)}
    </div>`
  );
};

const getDestinationList = (destinationsArr, destination, id, type, preposition) => {
  const options = destinationsArr.map((dest) => {
    return `<option value="${dest}"></option>`;
  }).join(` `);

  const datalist = `<datalist id="destination-list-${id}">${options}</datalist>`;

  return (
    `<div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-${id}">
        ${type} ${preposition}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${destination}" list="destination-list-${id}">

        ${datalist}
    </div>`
  );
};

// @TODO не забыть вынести в utils
const getFormattedEventTime = (date) => {
  const tripTime = {
    from: ``,
    to: ``
  };

  if (!date) {
    return tripTime;
  }

  const eventTime = date.eventTime;

  const year = {
    from: date.from.getFullYear() % 100,
    to: (date.to) ? date.to.getFullYear() % 100 : ``
  };

  const month = {
    from: getFormattedDate(date.from.getMonth()),
    to: (date.to) ? getFormattedDate(date.to.getMonth()) : ``
  };

  const day = {
    from: getFormattedDate(date.from.getDate()),
    to: (date.to) ? getFormattedDate(date.to.getDate()) : ``
  };

  const hours = {
    from: eventTime.from.hours,
    to: (eventTime.to) ? eventTime.to.hours : ``
  };

  const minutes = {
    from: eventTime.from.minutes,
    to: eventTime.to ? eventTime.to.minutes : ``
  };

  tripTime.from = `${day.from}/${month.from}/${year.from} ${hours.from}:${minutes.from}`;
  tripTime.to = date.to ? `${day.to}/${month.to}/${year.to} ${hours.to}:${minutes.to}` : ``;

  return tripTime;
};

const getEventTimeMarkup = (date, id) => {
  const time = getFormattedEventTime(date);

  return (
    `<div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-${id}">
        From
      </label>
      <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${time.from}">
      &mdash;
      <label class="visually-hidden" for="event-end-time-${id}">
        To
      </label>
      <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${time.to}">
    </div>`
  );
};

const getBasePrice = (price, id) => {
  return (
    `<div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-${id}">
        <span class="visually-hidden">Price</span>
        &#8381;
      </label>
      <input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price" value="${price}">
    </div>`
  );
};

const getAvailableOffers = (offers, id) => {
  if (!offers || offers.length === 0) {
    return ``;
  }

  const offersMock = offers.map((offer) => {
    const {name, label, price, checked: isChecked} = offer;

    return (
      `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${label}-${id}" type="checkbox" name="event-offer-${label}" ${isChecked ? `checked` : ``}>
        <label class="event__offer-label" for="event-offer-${label}-${id}">
          <span class="event__offer-title">${name}</span>
          &plus;
          &#8381;&nbsp;<span class="event__offer-price">${price}</span>
        </label>
      </div>`
    );
  }).join(``);

  return `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
        ${offersMock}
      </div>
  </section>`;
};

const getEventDescription = (description) => {
  if (!description) {
    return ``;
  }

  return (
    `<h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${description}</p>`
  );
};

const getPhotosTemplate = (photos) => {
  if (!photos) {
    return ``;
  }

  const photoMarkup = photos.map((src) => `<img class="event__photo" src="${src}" alt="Event photo">`).join(` `);

  return (
    `<div class="event__photos-container">
       <div class="event__photos-tape">${photoMarkup}</div>
    </div>`
  );
};

const getEventDetails = (description, photos) => {
  return (
    `<section class="event__section  event__section--destination">
      ${getEventDescription(description)}
      ${getPhotosTemplate(photos)}
    </section>`
  );
};

const getEventDetailsMarkup = (offers, id, description, photos) => {
  const isEventDetails = offers || description || photos;

  if (!isEventDetails) {
    return ``;
  }

  return (
    `<section class="event__details">
      ${getAvailableOffers(offers, id)}
      ${getEventDetails(description, photos)}
    </section>`
  );
};

const getEditingControls = (isEditing, isFavorite, id) => {
  return isEditing ?
    `<input id="event-favorite-${id}" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavorite ? `checked` : ``}>
      <label class="event__favorite-btn" for="event-favorite-${id}">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </label>

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>`
    : ``;
};

const getTripEditTemplate = (point = {}, options = {}) => {
  const dateNow = new Date();

  const {
    price = ``,
    date = {
      from: dateNow,
      eventTime: getEventTime(dateNow)
    },
    id = `0`,
    isFavorite = false,
  } = point;

  const {
    type = `flight`,
    isEditing = false,
    preposition = `to`,
    offers = ``,
    destination = ``,
    description = ``,
    photos = ``,
  } = options;

  const resetBtnCaption = isEditing ? `Delete` : `Cancel`;

  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
      <header class="event__header">
        ${getEventType(type, id)}
        ${getDestinationList(destinations, destination, id, type, preposition)}
        ${getEventTimeMarkup(date, id)}
        ${getBasePrice(price, id)}

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">${resetBtnCaption}</button>
        ${getEditingControls(isEditing, isFavorite, id)}
      </header>

      ${getEventDetailsMarkup(offers, id, description, photos)}
    </form>`
  );
};

export default class EditTrip extends AbstractSmartComponent {
  constructor(point = {}) {
    super();
    this._point = point;
    this._element = null;
    this._submitBtn = null;
    this._cancelBtn = null;
    this._rollupBtn = null;
    this._favoriteBtn = null;

    this._type = point.type || NewPointMode.TYPE;
    this._editing = !(_.isEmpty(this._point));
    this._preposition = point.preposition;
    this._offers = point.offers && point.offers.slice();
    this._destination = point.destination;
    this._description = point.description;
    this._photos = point.photos && point.photos.slice();

    this.getElement();
    // this._onEventTypeClick = this._onEventTypeClick.bind(this);
    this._eventTypeClickHandler();
  }

  getTemplate() {
    return getTripEditTemplate(this._point, {
      type: this._type,
      isEditing: this._editing,
      preposition: this._preposition,
      offers: this._offers,
      destination: this._destination,
      description: this._description,
      photos: this._photos
    });
  }

  removeElement() {
    super.removeElement();
    this._submitBtn = null;
    this._cancelBtn = null;
  }

  recoveryListeners() {
    this.setCancelButtonClickHandler(this._cancelButtonHandler);
    this.setRollupButtonClickHandler(this._rollupButtonHandler);
    this.setSubmitButtonClickHandler(this._submitButtonHandler);
    this.setDeleteButtonClickHandler(this._deleteButtonHandler);
    this.setFavoriteButtonClickHandler(this._favoriteButtonHandler);
    this._eventTypeClickHandler();
  }

  reset() {
    this.rerender();
  }

  setCancelButtonClickHandler(handler) {
    this._cancelBtn = this.getElement().querySelector(`.event__reset-btn`);
    this._cancelBtn.addEventListener(`click`, handler);
    this._cancelButtonHandler = handler;
  }

  setRollupButtonClickHandler(handler) {
    if (this._editing) {
      this._rollupBtn = this.getElement().querySelector(`.event__rollup-btn`);
      this._rollupBtn.addEventListener(`click`, handler);
      this._rollupButtonHandler = handler;
    }
  }

  setFavoriteButtonClickHandler(handler) {
    if (this._editing) {
      this._favoriteBtn = this.getElement().querySelector(`.event__favorite-btn`);
      this._favoriteBtn.addEventListener(`click`, handler);
      this._favoriteButtonHandler = handler;
    }
  }

  setSubmitButtonClickHandler(handler) {
    this._submitBtn = this.getElement().querySelector(`.event__save-btn`);
    this._submitBtn.addEventListener(`click`, handler);
    this._submitButtonHandler = handler;
  }

  setDeleteButtonClickHandler(handler) {
    if (this._editing) {
      this._cancelBtn = this.getElement().querySelector(`.event__reset-btn`);
      this._cancelBtn.addEventListener(`click`, handler);
    }

    this._deleteButtonHandler = handler;
  }

  _eventTypeClickHandler() {
    const list = this.getElement().querySelector(`.event__type-list`);
    list.addEventListener(`click`, this._onEventTypeClick());
  }

  _onEventTypeClick() {
    return (evt) => {
      if (evt.target.classList.contains(`event__type-label`)) {
        this._type = evt.target.textContent;
        this._preposition = PREPOSITIONS[this._type];
        this.rerender();
      }
    };
  }
}
