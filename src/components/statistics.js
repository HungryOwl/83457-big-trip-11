import AbstractComponent from './abstract-component';

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
    `<section class="statistics">
      <h2 class="visually-hidden">Trip statistics</h2>

      ${statMarkup}
    </section>`
  );
};

export default class Statistics extends AbstractComponent {
  constructor(stats) {
    super();
    this._stats = stats;
  }

  getTemplate() {
    return getFullStatisticsTemplate(this._stats);
  }
}

