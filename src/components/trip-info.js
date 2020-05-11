import {createElement} from '../utils/render';
import {getFormattedDate} from '../utils/common';

const getDatesFromTo = ([from, to] = [``, ``]) => {
  const monthFrom = (from) ? from.monthName : from;
  const dayFrom = (from) ? getFormattedDate(from.day) : from;
  const monthTo = (to && to.monthName !== from.monthName) ? to.monthName : ``;
  const dayTo = (to) ? getFormattedDate(to.day) : to;

  return (
    `<p class="trip-info__dates">${monthFrom} ${dayFrom}&nbsp;&mdash;&nbsp;${monthTo} ${dayTo}</p>`
  );
};

const getSequenceOfCities = (cities) => {
  let cityChain = [];

  if (cities.length > 3) {
    cityChain = [cities[0], `...`, cities[cities.length - 1]];
  } else {
    cityChain = [...cities];
  }

  cityChain = cityChain.join(` &mdash; `);

  return (
    `<h1 class="trip-info__title">${cityChain}</h1>`
  );
};

const getTripInfoTemplate = ({cities, dates}) => {
  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        ${getSequenceOfCities(cities)}
        ${getDatesFromTo(dates)}
      </div>
    </section>`
  );
};

export default class TripInfo {
  constructor(tripInfo) {
    this._info = tripInfo;

    this._element = null;
  }

  getTemplate() {
    return getTripInfoTemplate(this._info);
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
