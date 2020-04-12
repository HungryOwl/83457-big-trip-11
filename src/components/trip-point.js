import {offers as offersMap} from '../mock/trip-point';

const getEndTimeStamp = (startTime, additionalTimeStamp) => {
  return new Date((startTime.getTime() + additionalTimeStamp));
};

const getFilterMarkup = (name, price) => {
  return (
    `<li class="event__offer">
        <span class="event__offer-title">${name}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${price}</span>
    </li>`
  );
};

const getSelectedOffersTemplate = (eventType) => {
  const offers = offersMap.get(eventType);

  const offersList = offers.map((offer) => {
    return getFilterMarkup(offer.name, offer.price);
  }).slice(0, 3).join(`\n`);

  return (
    `<h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">${offersList}</ul>`
  );
};

const getTripPointTemplate = (point) => {
  // const {} = point;

  const MIN_IN_HOUR = 60;
  const MIN_IN_HALF_HOUR = 30;
  const HOURS_IN_DAY = 24;
  const SEC_IN_MIN = 60;
  const MS_IN_SEC = 1000;
  const MS_IN_DAY = MS_IN_SEC * SEC_IN_MIN * MIN_IN_HOUR * HOURS_IN_DAY;
  const MS_IN_HOUR = MIN_IN_HOUR * SEC_IN_MIN * MS_IN_SEC;
  const MS_IN_HALF_HOUR = MIN_IN_HALF_HOUR * SEC_IN_MIN * MS_IN_SEC;
  const MS_IN_MIN = SEC_IN_MIN * MS_IN_SEC;

  const pointType = `Flight`;
  const destination = `Дзержинск`;
  const placeholders = {
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

  const placeholder = placeholders[pointType];

  const startTime = new Date();
  const endTime = new Date(getEndTimeStamp(startTime, MS_IN_HALF_HOUR));

  const eventTime = {
    from: {hours: startTime.getHours(), minutes: startTime.getMinutes()},
    to: {hours: endTime.getHours(), minutes: endTime.getMinutes()}
  };

  let timeDuration = endTime - startTime;

  const days = Math.floor(timeDuration / MS_IN_DAY) || null;
  timeDuration = timeDuration - days * MS_IN_DAY;
  const hours = Math.floor(timeDuration / MS_IN_HOUR) || null;
  timeDuration = timeDuration - hours * MS_IN_HOUR;
  const minutes = Math.floor(timeDuration / MS_IN_MIN) || null;

  const eventDuration = `
    ${days ? days + `D` : ``}
    ${hours ? hours + `H` : ``}
    ${minutes ? minutes + `M` : ``}
  `;

  const price = 20;

  return `
     <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${pointType.toLowerCase()}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${pointType} ${placeholder} ${destination}</h3>

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

        ${getSelectedOffersTemplate(pointType)}

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
     </div>
   `;
};

export {getTripPointTemplate};
