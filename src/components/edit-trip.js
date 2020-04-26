import {placeTypes, rideTypes, destinations} from '../mock/trip-point';
import {getFormattedDate} from '../utils';

const eventTypeItems = (eventTypesArr, currentType, id) => {
  return eventTypesArr
    .map((eventType) => {
      const isChecked = eventType === currentType;
      const type = eventType.toLowerCase();

      return (
        `<div class="event__type-item">
          <input id="event-type-taxi-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" checked=${isChecked}>
          <label class="event__type-label  event__type-label--${eventType.toLowerCase()}" for="event-type-${type}-${id}">${eventType}</label>
        </div>`
      );
    }).join(` `);
};

const getEventTypesList = (point) => {
  const {type, id} = point;

  return (
    `<div class="event__type-list">
      <fieldset class="event__type-group">
        <legend class="visually-hidden">Transfer</legend>
        ${eventTypeItems(rideTypes, type, id)}
      </fieldset>

      <fieldset class="event__type-group">
        <legend class="visually-hidden">Activity</legend>
        ${eventTypeItems(placeTypes, type, id)}
      </fieldset>
    </div>`
  );
};

const getDestinationList = (destinationsArr, id) => {
  const options = destinationsArr.map((dest) => {
    return `<option value="${dest}"></option>`;
  }).join(` `);

  return (
    `<datalist id="destination-list-${id}">
        ${options}
    </datalist>`
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

const getPhotosTemplate = (photos) => {
  return photos.map((src) => `<img class="event__photo" src="${src}" alt="Event photo">`).join(` `);
};

const getTripEditTemplate = (point) => {
  const {type, price, destination, offers, description, preposition, photos, date, id} = point;

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
  const eventTime = date.eventTime;

  const startTime = `${year.from}/${month.from}/${day.from} ${eventTime.from.hours}:${eventTime.from.minutes}`;
  const endTime = `${year.to}/${month.to}/${day.to} ${eventTime.to.hours}:${eventTime.to.minutes}`;

  return (
    `
      <!-- Cоздание/редактирование маршрута -->
      <form class="trip-events__item  event  event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">

            ${getEventTypesList(point)}
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-${id}">
              ${type} ${preposition}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value=${destination} list="destination-list-${id}">

            ${getDestinationList(destinations, id)}
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-${id}">
              From
            </label>
            <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${startTime}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-${id}">
              To
            </label>
            <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${endTime}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-${id}">
              <span class="visually-hidden">Price</span>
              &#8381;
            </label>
            <input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price" value="${price}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Cancel</button>
        </header>
        <section class="event__details">
          ${getAvailableOffers(offers, id)}

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${description}</p>

            <div class="event__photos-container">
              <div class="event__photos-tape">
                ${getPhotosTemplate(photos)}
              </div>
            </div>
          </section>
        </section>
      </form>
    `
  );
};

export {getTripEditTemplate};
