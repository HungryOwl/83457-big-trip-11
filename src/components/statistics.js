import {createElement} from '../utils/render';

const getStatistics = (statType, statName) => {

  return (
    `<div class="statistics__item statistics__item--${statName}">
      <canvas class="statistics__chart  statistics__chart--${statType}" width="900"></canvas>
    </div>`
  );
};

const getFullStatisticsTemplate = (stats) => {
  let statMarkup = ``;

  for (const [key, value] of stats) {
    statMarkup += getStatistics(key, value);
  }

  return (
    `<!-- Статистика путешествий -->
    <section class="statistics">
      <h2 class="visually-hidden">Trip statistics</h2>

      ${statMarkup}
    </section>`
  );
};

export default class Statistics {
  constructor(stats) {
    this._stats = stats;

    this._element = null;
  }

  getTemplate() {
    return getFullStatisticsTemplate(this._stats);
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

