import {createElement} from '../utils';

const getTabTemplate = (tab, isActive) => {
  const activeClass = isActive ? `trip-tabs__btn--active` : ``;
  return (
    `<a class="trip-tabs__btn  ${activeClass}" href="#">${tab}</a>`
  );
};


const getTabsTemplate = (tabs) => {
  const tabMarkup = tabs.map((tab, i) => {
    return getTabTemplate(tab, i === 0);
  }).join(`\n`);

  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
        ${tabMarkup}
    </nav>`
  );
};

const getMenuTemplate = (tabs) => {
  return (
    ` <!-- Меню -->
    <h2 class="visually-hidden">Switch trip view</h2>
    ${getTabsTemplate(tabs)}`
  );
};

export default class Navigation {
  constructor(tabs) {
    this._tabs = tabs;

    this._element = null;
  }

  getTemplate() {
    return getMenuTemplate(this._tabs);
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

