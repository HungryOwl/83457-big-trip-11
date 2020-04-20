import {placeTypes, rideTypes, destinations} from '../mock/trip-days';
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
  return offers.map((offer) => {
    return (
      `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" checked>
        <label class="event__offer-label" for="event-offer-luggage-1">
          <span class="event__offer-title">Add luggage</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">30</span>
        </label>
      </div>`
    );
  }).join(` `);
};

const getTripEditTemplate = (point) => {
  const {type, price, destination, offers, description, preposition, photos, date, id} = point;
  const year = {
    from: date.from.getFullYear().slice(1, 2),
    to: date.to.getFullYear().slice(1, 2)
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
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price" value="${price}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Cancel</button>
        </header>
        <section class="event__details">
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>

            <div class="event__available-offers">

              ${getAvailableOffers(offers)}
              <div class="event__offer-selector">
                <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" checked>
                <label class="event__offer-label" for="event-offer-luggage-1">
                  <span class="event__offer-title">Add luggage</span>
                  &plus;
                  &euro;&nbsp;<span class="event__offer-price">30</span>
                </label>
              </div>

              <div class="event__offer-selector">
                <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-1" type="checkbox" name="event-offer-comfort" checked>
                <label class="event__offer-label" for="event-offer-comfort-1">
                  <span class="event__offer-title">Switch to comfort class</span>
                  &plus;
                  &euro;&nbsp;<span class="event__offer-price">100</span>
                </label>
              </div>

              <div class="event__offer-selector">
                <input class="event__offer-checkbox  visually-hidden" id="event-offer-meal-1" type="checkbox" name="event-offer-meal">
                <label class="event__offer-label" for="event-offer-meal-1">
                  <span class="event__offer-title">Add meal</span>
                  &plus;
                  &euro;&nbsp;<span class="event__offer-price">15</span>
                </label>
              </div>

              <div class="event__offer-selector">
                <input class="event__offer-checkbox  visually-hidden" id="event-offer-seats-1" type="checkbox" name="event-offer-seats">
                <label class="event__offer-label" for="event-offer-seats-1">
                  <span class="event__offer-title">Choose seats</span>
                  &plus;
                  &euro;&nbsp;<span class="event__offer-price">5</span>
                </label>
              </div>

              <div class="event__offer-selector">
                <input class="event__offer-checkbox  visually-hidden" id="event-offer-train-1" type="checkbox" name="event-offer-train">
                <label class="event__offer-label" for="event-offer-train-1">
                  <span class="event__offer-title">Travel by train</span>
                  &plus;
                  &euro;&nbsp;<span class="event__offer-price">40</span>
                </label>
              </div>
            </div>
          </section>

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">Mordor is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Mordor). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.</p>

            <div class="event__photos-container">
              <div class="event__photos-tape">
                <img class="event__photo" src="img/photos/1.jpg" alt="Event photo">
                <img class="event__photo" src="img/photos/2.jpg" alt="Event photo">
                <img class="event__photo" src="img/photos/3.jpg" alt="Event photo">
                <img class="event__photo" src="img/photos/4.jpg" alt="Event photo">
                <img class="event__photo" src="img/photos/5.jpg" alt="Event photo">
              </div>
            </div>
          </section>
        </section>
      </form>
    `
  );
};

export {getTripEditTemplate};
