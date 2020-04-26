import * as utils from './utils';

import {flipCoin} from './utils';
import {getMenuTemplate} from './components/menu';
import {getFiltersTemplate} from './components/filters';
import {getTripInfoTemplate} from './components/trip-info';
import {getTripInfoCost} from './components/trip-info-cost';
import {getSortTemplate} from './components/sort-trip';
import {getTripEditTemplate} from './components/edit-trip';
import {getTripDaysTemplate} from './components/trip-days';
import {filters as filtersArr} from './mock/filters';
import {sortItems as sortItemsArr} from './mock/sort-trip';
import {dayGroups as dayGroupsArr} from './mock/trip-days';
import {points} from "./mock/trip-point";

let editPoint = points.slice(0, 1)[0];

const pointRandomReset = (point) => {
  const newPoint = {};
  const isReset = flipCoin();

  for (let field in point) {
    if (point.hasOwnProperty(field)) {
      newPoint[field] = (isReset || field === `type`) ? point[field] : ``;
    }
  }

  return newPoint;
};

editPoint = pointRandomReset(editPoint);

const filters = filtersArr.slice();
const sortItems = sortItemsArr.slice();
const dayGroups = dayGroupsArr.slice();

const mainClassNames = [`trip-main`, `trip-controls`];
const secondaryClassNames = [`trip-info`, `trip-events`];
const elem = {};

const renderTemplate = (container, template, place = `beforeEnd`) => {
  container.insertAdjacentHTML(place, template);
};

const renderTemplates = (...templates) => {
  templates.forEach((template) => {
    const {container} = template;
    const {data} = template;

    renderTemplate(container, template.render(data), template.place);
  });
};

utils.getContainerClasses(mainClassNames, elem);
renderTemplates(
    {container: elem[`trip-main`], render: getTripInfoTemplate, place: `afterBegin`},
    {container: elem[`trip-controls`], render: getMenuTemplate},
    {container: elem[`trip-controls`], render: getFiltersTemplate, data: filters}
);

utils.getContainerClasses(secondaryClassNames, elem);
renderTemplates(
    {container: elem[`trip-info`], render: getTripInfoCost},
    {container: elem[`trip-events`], render: getSortTemplate, data: sortItems},
    {container: elem[`trip-events`], render: getTripEditTemplate, data: editPoint},
    {container: elem[`trip-events`], render: getTripDaysTemplate, data: dayGroups}
);
