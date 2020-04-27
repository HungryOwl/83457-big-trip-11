import {eventTypes, destinations} from '../mock/trip-point';
import {getFormattedDate} from '../utils';

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
  debugger;

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
    }).join(` `);
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

const getEventTime = (date) => {
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
    to: date.to.getFullYear() % 100
  };

  const month = {
    from: getFormattedDate(date.from.getMonth()),
    to: getFormattedDate(date.to.getMonth())
  };

  const day = {
    from: getFormattedDate(date.from.getDate()),
    to: getFormattedDate(date.from.getDate())
  };

  const hours = {
    from: eventTime.from.hours,
    to: eventTime.to.hours
  };

  const minutes = {
    from: eventTime.from.minutes,
    to: eventTime.to.minutes
  };

  tripTime.from = `${day.from}/${month.from}/${year.from} ${hours.from}:${minutes.from}`;
  tripTime.to = `${day.to}/${month.to}/${year.to} ${hours.to}:${minutes.to}`;

  return tripTime;
};

const getEventTimeMarkup = (date, id) => {
  const time = getEventTime(date);

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
  if (!offers) {
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
  }).join(` `);

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

const getTripEditTemplate = (point) => {
  const {type, price, destination, offers, description, preposition, photos, date, id} = point;

  return (
    `
      <!-- Cоздание/редактирование маршрута -->
      <form class="trip-events__item  event  event--edit" action="#" method="post">
        <header class="event__header">
          ${getEventType(type, id)}
          ${getDestinationList(destinations, destination, id, type, preposition)}
          ${getEventTimeMarkup(date, id)}
          ${getBasePrice(price, id)}

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Cancel</button>
        </header>

        ${getEventDetailsMarkup(offers, id, description, photos)}
      </form>
    `
  );
};

export {getTripEditTemplate};
