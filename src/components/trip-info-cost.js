import {createElement} from '../utils/render';

const getTripInfoCost = (price) => (
  `<p class="trip-info__cost">
    Total:&nbsp;&#8381;&nbsp;<span class="trip-info__cost-value">${price}</span>
  </p>`
);

export default class TripInfoCost {
  constructor(price) {
    this._price = price;

    this._element = null;
  }

  getTemplate() {
    return getTripInfoCost(this._price);
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
