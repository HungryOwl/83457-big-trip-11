import * as utils from './utils';
import {getMenuTemplate} from './components/menu';
import {getFilterTemplate} from './components/filter';
import {getTripInfoTemplate} from './components/trip-info';
import {getTripInfoCost} from './components/trip-info-cost';
import {getSortTemplate} from './components/sort-trip';
import {getTripEditTemplate} from './components/edit-trip';
import {getTripDaysTemplate} from './components/trip-days';
import {getTripPointTemplate} from './components/trip-point';

const TRIP_COUNT = 3;
const mainClassNames = [`trip-main`, `trip-controls`];
const secondaryClassNames = [`trip-info`, `trip-events`];
const elem = {};

const renderTemplate = (container, template, place = `beforeEnd`) => {
  container.insertAdjacentHTML(place, template);
};

const renderTemplates = (...templates) => {
  templates.forEach((template) => {
    let {container} = template;

    renderTemplate(container, template.render(), template.place && template.place);
  });
};

const renderTrips = (tripsCount) => {
  const tripListElement = utils.getHtmlElement(`trip-events__list`);

  for (let i = 0; i < tripsCount; i++) {
    renderTemplate(tripListElement, getTripPointTemplate());
  }
};

utils.getContainerClasses(mainClassNames, elem);
renderTemplates(
    {container: elem[`trip-main`], render: getTripInfoTemplate, place: `afterBegin`},
    {container: elem[`trip-controls`], render: getMenuTemplate},
    {container: elem[`trip-controls`], render: getFilterTemplate}
);

utils.getContainerClasses(secondaryClassNames, elem);
renderTemplates(
    {container: elem[`trip-info`], render: getTripInfoCost},
    {container: elem[`trip-events`], render: getSortTemplate},
    {container: elem[`trip-events`], render: getTripEditTemplate},
    {container: elem[`trip-events`], render: getTripDaysTemplate}
);

renderTrips(TRIP_COUNT);
