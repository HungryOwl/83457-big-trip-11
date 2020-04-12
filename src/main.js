import * as utils from './utils';
import {getMenuTemplate} from './components/menu';
import {getFilterTemplate} from './components/filters';
import {getTripInfoTemplate} from './components/trip-info';
import {getTripInfoCost} from './components/trip-info-cost';
import {getSortTemplate} from './components/sort-trip';
import {getTripEditTemplate} from './components/edit-trip';
import {getTripDaysTemplate} from './components/trip-days';
import {getFilters} from './mock/filters';

const filters = getFilters();

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
    {container: elem[`trip-controls`], render: getFilterTemplate, data: filters}
);

utils.getContainerClasses(secondaryClassNames, elem);
renderTemplates(
    {container: elem[`trip-info`], render: getTripInfoCost},
    {container: elem[`trip-events`], render: getSortTemplate},
    {container: elem[`trip-events`], render: getTripEditTemplate},
    {container: elem[`trip-events`], render: getTripDaysTemplate}
);
