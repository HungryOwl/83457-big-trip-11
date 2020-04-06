import * as utils from './utils';
import {getMenuTemplate} from './components/menu';
import {getfilterTemplate} from './components/filter';
import {getTripInfoTemplate} from './components/tripInfo';
import {getTripInfoCost} from './components/tripInfoCost';
import {getSortTemplate} from './components/sortTrip';
import {getTripEditTemplate} from './components/editTrip';
import {getTripDaysTemplate} from './components/tripDays';
import {getTripPointTemplate} from './components/tripPoint';

const TRIP_COUNT = 3;
const elem = {};

const renderTemplate = (container, template, place = `beforeEnd`) => {
  container.insertAdjacentHTML(place, template);
};

const renderTemplates = (...templates) => {
  templates.forEach((template) => {
    let {className} = template;

    elem[className] = !elem[className] ? utils.getHtmlElement(className) : elem[className];
    renderTemplate(elem[className], template.render(), template.place && template.place);
  });
};

const renderTrips = (tripsCount) => {
  const tripListElement = utils.getHtmlElement(`trip-events__list`);

  for (let i = 0; i < tripsCount; i++) {
    renderTemplate(tripListElement, getTripPointTemplate());
  }
};

renderTemplates(
    {className: `trip-controls`, render: getMenuTemplate},
    {className: `trip-controls`, render: getfilterTemplate},
    {className: `trip-main`, render: getTripInfoTemplate, place: `afterBegin`},
    {className: `trip-info`, render: getTripInfoCost},
    {className: `trip-events`, render: getSortTemplate},
    {className: `trip-events`, render: getTripEditTemplate},
    {className: `trip-events`, render: getTripDaysTemplate}
);

renderTrips(TRIP_COUNT);
