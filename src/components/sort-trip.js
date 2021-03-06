import AbstractComponent from './abstract-component';

export const SortType = {
  TIME: `time`,
  PRICE: `price`,
  EVENT: `event`,
};

const getSortMarkup = (sortName, isChecked) => {
  let {name} = sortName;
  name = name.toLowerCase();

  const icon = (name === `time` || name === `price`) ?
    `<svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
      <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
    </svg>`
    : ``;

  return (
    `<div class="trip-sort__item trip-sort__item--${name}">
      <input
        id="sort-${name}"
        class="trip-sort__input  visually-hidden"
        type="radio"
        name="trip-sort"
        value="sort-${name}"
        ${isChecked ? `checked` : ``}
      >
      <label class="trip-sort__btn" for="sort-${name}" data-sort-type="${SortType[name.toUpperCase()]}">
        ${name}
        ${icon}
      </label>
    </div>`
  );
};

const getSortTemplate = (sortItems) => {
  const sortMarkup = sortItems.map((sortObj, i) => {
    return getSortMarkup(sortObj, i === 0);
  }).join(`\n`);

  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      <span class="trip-sort__item  trip-sort__item--day">Day</span>
      ${sortMarkup}
      <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
    </form>`
  );
};

export default class Sort extends AbstractComponent {
  constructor(sortItems) {
    super();
    this._sortItems = sortItems;
    this._currenSortType = SortType.EVENT;
  }

  getTemplate() {
    return getSortTemplate(this._sortItems);
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (!evt.target.classList.contains(`trip-sort__btn`)) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._currenSortType === sortType) {
        return;
      }

      this._currenSortType = sortType;

      handler(this._currenSortType);
    });
  }
}
