import AbstractComponent from './abstract-component';

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
    `<h2 class="visually-hidden">Switch trip view</h2>
    ${getTabsTemplate(tabs)}`
  );
};

export default class Navigation extends AbstractComponent {
  constructor(tabs) {
    super();
    this._tabs = tabs;
  }

  getTemplate() {
    return getMenuTemplate(this._tabs);
  }
}

