const getStatistics = (statType, statName) => {

  return (
    `<div class="statistics__item statistics__item--${statName}">
      <canvas class="statistics__chart  statistics__chart--${statType}" width="900"></canvas>
    </div>`
  );
};

const getFullStatistics = (stats) => {
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

export {getFullStatistics};

