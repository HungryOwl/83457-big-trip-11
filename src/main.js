import * as utils from './utils';
import {flipCoin} from './utils';
import {getMenuTemplate} from './components/menu';
import {getFiltersTemplate} from './components/filters';
import {getTripInfoTemplate} from './components/trip-info';
import {getTripInfoCost} from './components/trip-info-cost';
import {getSortTemplate} from './components/sort-trip';
import {getTripEditTemplate} from './components/edit-trip';
import {getTripDaysTemplate} from './components/trip-days';
import {getFullStatistics} from './components/statistics';
import {points} from './mock/trip-point';
import {dayGroups as dayGroupsArr} from './mock/trip-days';
import {filters as filtersArr} from './mock/filters';
import {sortItems as sortItemsArr} from './mock/sort-trip';
import {statNames} from './mock/statistics';
import {fullCost} from './mock/trip-info-cost';
import {tripInfo} from './mock/trip-info';
import {tabs} from './mock/menu';

let editPoint = points.slice(0, 1)[0];

const pointRandomReset = (point) => {
  const newPoint = {};
  const isReset = flipCoin();

  for (let field in point) {
    if (point.hasOwnProperty(field)) {
      newPoint[field] = (!isReset || field === `type`) ? point[field] : ``;
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

const renderTemplates = (...templates) => {
  templates.forEach((template) => {
    const {container} = template;
    const {data} = template;

    renderTemplate(container, template.render(data), template.place);
  });
};

utils.getContainerClasses(mainClassNames, elem);
renderTemplates(
    {container: elem[`trip-main`], render: getTripInfoTemplate, data: tripInfo, place: `afterBegin`},
    {container: elem[`trip-controls`], render: getMenuTemplate, data: tabs},
    {container: elem[`trip-controls`], render: getFiltersTemplate, data: filters}
);

utils.getContainerClasses(secondaryClassNames, elem);
renderTemplates(
    {container: elem[`trip-info`], render: getTripInfoCost, data: fullCost},
    {container: elem[`trip-events`], render: getSortTemplate, data: sortItems},
    {container: elem[`trip-events`], render: getTripEditTemplate, data: editPoint},
    {container: elem[`trip-events`], render: getTripDaysTemplate, data: dayGroups},
    {container: elem[`trip-events`], render: getFullStatistics, data: statNames, place: `afterEnd`}
);
