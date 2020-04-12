const getFilterMarkup = (name) => {
  return (
    ` <div class="trip-filters__filter">
        <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value=${name}>
        <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
    </div>`
  );
};

const getFilterTemplate = (filters) => {
  const filtersMarkup = filters.map((filterObj) => {
    return getFilterMarkup(filterObj.name);
  }).join(`\n`);

  return `
    <!-- Фильтры -->
    <h2 class="visually-hidden">Filter events</h2>
    <form class="trip-filters" action="#" method="get">
      ${filtersMarkup}

      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
  `;
};

export {getFilterTemplate};

