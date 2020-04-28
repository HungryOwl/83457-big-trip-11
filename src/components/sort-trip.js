const getSortMarkup = (sortName, isChecked) => {
  const icon = (sortName === `time` || sortName === `price`) ?
    `<svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
      <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
    </svg>` : ``;

  return (
    `<div class="trip-sort__item  trip-sort__item--${sortName.toLowerCase()}">
      <input
        id="sort-${sortName}"
        class="trip-sort__input  visually-hidden"
        type="radio"
        name="trip-sort"
        value="sort-${sortName}"
        ${isChecked ? `checked` : ``}
      >
      <label class="trip-sort__btn" for="sort-${sortName}">
        ${sortName}
        ${icon}
      </label>
    </div>`
  );
};

const getSortTemplate = (sortItems) => {
  const sortMarkup = sortItems.map((sortObj, i) => {
    return getSortMarkup(sortObj.name, i === 0);
  }).join(`\n`);

  return (
    `<!-- Сортировка -->
    <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      <span class="trip-sort__item  trip-sort__item--day">Day</span>
      ${sortMarkup}
      <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
    </form>`
  );
};

export {getSortTemplate};
