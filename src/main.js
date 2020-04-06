import {getMenuTemplate} from './components/menu';
import {getfilterTemplate} from './components/filter';
import {getTripInfoTemplate} from './components/tripInfo';
import {getTripInfoCost} from './components/tripInfoCost';
import {getSortTemplate} from './components/sortTrip';
import {getTripEditTemplate} from './components/editTrip';
import {getTripDaysTemplate} from './components/tripDays';
import {getTripPointTemplate} from './components/tripPoint';

const TRIP_COUNT = 3;

const renderTemplate = (container, template, place = `beforeEnd`) => {
  container.insertAdjacentHTML(place, template);
};

const renderTemplates = (...templates) => {
  templates.forEach((template) => {
    const container = document.querySelector(template.container);

    renderTemplate(container, template.render(), template.place && template.place);
  });
};

const renderTrips = (tripsCount) => {
  const tripListElement = document.querySelector(`.trip-events__list`);

  Array(tripsCount).fill(``).forEach(() => {
    renderTemplate(tripListElement, getTripPointTemplate());
  });
};

renderTemplates(
    {container: `.trip-controls h2`, render: getMenuTemplate, place: `afterEnd`},
    {container: `.trip-controls h2~h2`, render: getfilterTemplate, place: `afterEnd`},
    {container: `.trip-main`, render: getTripInfoTemplate, place: `afterBegin`},
    {container: `.trip-info`, render: getTripInfoCost},
    {container: `.trip-events`, render: getSortTemplate},
    {container: `.trip-events`, render: getTripEditTemplate},
    {container: `.trip-events`, render: getTripDaysTemplate}
);

renderTrips(TRIP_COUNT);
