import {offersMap} from '../mock/trip-point';
import {getFormatDate} from '../utils';

const MIN_IN_HOUR = 60;
const HOURS_IN_DAY = 24;
const SEC_IN_MIN = 60;
const MS_IN_SEC = 1000;
const MS_IN_DAY = MS_IN_SEC * SEC_IN_MIN * MIN_IN_HOUR * HOURS_IN_DAY;
const MS_IN_HOUR = MIN_IN_HOUR * SEC_IN_MIN * MS_IN_SEC;
const MS_IN_MIN = SEC_IN_MIN * MS_IN_SEC;

const parseDate = (value) => {
  const [day, month, year] = value.split(` `)[0].split(`/`);
  const [hours, minutes] = value.split(` `)[1].split(`:`);

  return new Date(year, month, day, hours, minutes);
};

const getEventTime = (from, to) => {
  return {
    from: {hours: from.getHours(), minutes: from.getMinutes()},
    to: {hours: to.getHours(), minutes: to.getMinutes()}
  };
};

const getEventDuration = (from, to) => {
  let timeDuration = to - from;

  let days;
  let hours;
  let minutes;

  minutes = new Date(timeDuration).getMinutes();
  days = Math.floor(timeDuration / MS_IN_DAY);
  timeDuration = timeDuration - days * MS_IN_DAY;
  hours = Math.floor(timeDuration / MS_IN_HOUR);

  return `
    ${days ? getFormatDate(days) + `D` : ``}
    ${hours ? getFormatDate(hours) + `H` : ``}
    ${minutes ? getFormatDate(minutes) + `M` : ``}
  `;
};

const startTime = parseDate(`17/03/19 12:24`);
const endTime = parseDate(`18/03/19 13:55`);

const eventDuration = getEventDuration(startTime, endTime);
const eventTime = getEventTime(startTime, endTime);

const pointType = `Flight`;
const destination = `Дзержинск`;
const prepositions = {
  Taxi: `to`,
  Bus: `to`,
  Train: `to`,
  Ship: `to`,
  Transport: `to`,
  Drive: `to`,
  Flight: `to`,
  [`Check-in`]: `at`,
  Sightseeing: `at`,
  Restaurant: `at`
};

const preposition = prepositions[pointType];
const price = 20;

const getEventOfferMarkup = (name, price) => {
  return (
    `<li class="event__offer">
        <span class="event__offer-title">${name}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${price}</span>
    </li>`
  );
};

const getCheckedOffersTemplate = (eventType) => {
  const offers = offersMap.get(eventType).filter((offer) => offer.checked);

  const offersList = offers.map((offer) => {
    return getEventOfferMarkup(offer.name, offer.price);
  }).slice(0, 3).join(`\n`);

  return (
    `<h4 class="visually-hidden">Offers:</h4>
     <ul class="event__selected-offers">${offersList}</ul>`
  );
};

const getTripPointTemplate = (point) => {
  // const {} = point;

  return `
     <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${pointType.toLowerCase()}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${pointType} ${preposition} ${destination}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="2019-03-18T10:30">${eventTime.from.hours}:${eventTime.from.minutes}</time>
            &mdash;
            <time class="event__end-time" datetime="2019-03-18T11:00">${eventTime.to.hours}:${eventTime.to.minutes}</time>
          </p>
          <p class="event__duration">${eventDuration}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>

        ${getCheckedOffersTemplate(pointType)}

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
     </div>
   `;
};

export {getTripPointTemplate};
