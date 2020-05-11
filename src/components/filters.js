import {createElement} from '../utils/render';

const getFilterMarkup = (filterName, isChecked) => {
  return (
    ` <div class="trip-filters__filter">
      <input
        id="filter-${filterName}"
        class="trip-filters__filter-input  visually-hidden"
        type="radio"
        name="trip-filter"
        value=${filterName}
        ${isChecked ? `checked` : ``}
      />
      <label class="trip-filters__filter-label" for="filter-${filterName}">${filterName}</label>
    </div>`
  );
};

const getFiltersTemplate = (filters) => {
  const filtersMarkup = filters.map((filterObj, i) => {
    return getFilterMarkup(filterObj.name, i === 0);
  }).join(`\n`);

  return (
    `<!-- Фильтры -->
    <h2 class="visually-hidden">Filter events</h2>
    <form class="trip-filters" action="#" method="get">
      ${filtersMarkup}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

export default class Filters {
  constructor(filters) {
    this._filters = filters;

    this._element = null;
  }

  getTemplate() {
    return getFiltersTemplate(this._filters);
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
