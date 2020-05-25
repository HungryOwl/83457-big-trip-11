import AbstractComponent from './abstract-component';

export class TripEventsList extends AbstractComponent {
  getTemplate() {
    return `<ul class="trip-events__list"></ul>`;
  }
}

export class TripDay extends AbstractComponent {
  constructor(dayGroup, dayNumber) {
    super();
    this._dayGroup = dayGroup;
    this._dayNumber = dayNumber;
  }

  getTemplate() {
    const dayInfo = this._dayNumber
      ? `<span class="day__counter">${this._dayNumber}</span>
       <time class="day__date" datetime=${ this._dayGroup.date}>${ this._dayGroup.month.slice(0, 3)} ${this._dayGroup.day}</time>`
      : ``;

    return (
      `<li class="trip-days__item day">
      <div class="day__info">${dayInfo}</div>
    </li>`
    );
  }
}

export class TripDays extends AbstractComponent {
  getTemplate() {
    return `<ul class="trip-days"></ul>`;
  }
}
