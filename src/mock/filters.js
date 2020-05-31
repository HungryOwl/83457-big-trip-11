import {FilterType} from '../const';

const getFilters = () => {
  return Object.values(FilterType).map((filterType, i) => {
    return {
      name: filterType,
      checked: i === 0,
    };
  });
};

const filters = getFilters();

export {filters};
