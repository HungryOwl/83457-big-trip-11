import {getContainerClasses, renderTemplate, RenderPosition} from './utils';
import {flipCoin} from './utils';
import TripHeader from './components/trip-header';
import Navigation from './components/menu';
import Filters from './components/filters';
import TripControls from './components/trip-controls';
import TripInfo from './components/trip-info';
import TripInfoCost from './components/trip-info-cost';
import Sort from './components/sort-trip';
import TripEvents from './components/trip-events';
import EditTrip from './components/edit-trip';
import TripDays from './components/trip-days';
import Statistics from './components/statistics';
import {points} from './mock/trip-point';
import {dayGroups as dayGroupsArr} from './mock/trip-days';
import {filters as filtersArr} from './mock/filters';
import {sortItems as sortItemsArr} from './mock/sort-trip';
import {statNames} from './mock/statistics';
import {fullCost} from './mock/trip-info-cost';
import {tripInfo} from './mock/trip-info';
import {tabs as tabsArr} from './mock/menu';

let pointsArr = points.slice(1);
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

const sortItems = sortItemsArr.slice();
const dayGroups = dayGroupsArr.slice();

const headerContainer = document.querySelector(`.page-header__container`);
const eventsContainer = document.querySelector(`.page-main .page-body__container`);

const TripHeaderComponent = new TripHeader();
const TripEventsComponent = new TripEvents();
renderTemplate(headerContainer, TripHeaderComponent.getElement());
renderTemplate(eventsContainer, TripEventsComponent.getElement());

const renderTripControls = (mainComponent, tabs, filters) => {
  const tripControlsComponent = new TripControls();
  const navigationComponent = new Navigation(tabs);
  const filtersComponent = new Filters(filters);

  renderTemplate(tripControlsComponent.getElement(), navigationComponent.getElement());
  renderTemplate(tripControlsComponent.getElement(), filtersComponent.getElement());
  renderTemplate(mainComponent.getElement(), tripControlsComponent.getElement(), RenderPosition.AFTERBEGIN);
};

const renderTripInfoCost = (mainComponent, info, cost) => {
  const tripInfoComponent = new TripInfo(info);
  const tripInfoCostComponent = new TripInfoCost(cost);

  renderTemplate(tripInfoComponent.getElement(), tripInfoCostComponent.getElement());
  renderTemplate(mainComponent.getElement(), tripInfoComponent.getElement(), RenderPosition.AFTERBEGIN);
};

const renderTripMain = (mainComponent, info, cost, tabs, filters) => {
  renderTripControls(mainComponent, tabs, filters);
  renderTripInfoCost(mainComponent, info, cost);
};

const renderTripEvents = (tripEventsComponent, points, sortItems) => {
  const sortComponent = new Sort(sortItems);

  renderTemplate(tripEventsComponent.getElement(), sortComponent.getElement());
};

renderTripMain(TripHeaderComponent, tripInfo, fullCost, tabsArr.slice(), filtersArr.slice());
renderTripEvents(TripEventsComponent, points, sortItems);


