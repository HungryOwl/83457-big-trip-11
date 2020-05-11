import AbstractComponent from './abstract-component';

const getTripInfoCost = (price) => (
  `<p class="trip-info__cost">
    Total:&nbsp;&#8381;&nbsp;<span class="trip-info__cost-value">${price}</span>
  </p>`
);

export default class TripInfoCost extends AbstractComponent {
  constructor(price) {
    super();
    this._price = price;
  }

  getTemplate() {
    return getTripInfoCost(this._price);
  }
}
