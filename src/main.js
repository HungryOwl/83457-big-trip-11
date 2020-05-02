import {getContainerClasses, renderTemplate, RenderPosition} from './utils';
import {flipCoin} from './utils';
import TripMain from './components/trip-main';
import Navigation from './components/menu';
import Filters from './components/filters';
import TripControls from './components/trip-controls';
import TripInfo from './components/trip-info';
import TripInfoCost from './components/trip-info-cost';
import Sort from './components/sort-trip';
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

const mainClassNames = [`page-header__container`];
const elem = {};

getContainerClasses(mainClassNames, elem);

const TripMainComponent = new TripMain();
renderTemplate(elem[`page-header__container`], TripMainComponent.getElement(), RenderPosition.BEFOREEND);

const renderTripMain = (mainComponent, info, cost, tabs, filters) => {
  const tripInfoComponent = new TripInfo(info);
  const tripInfoCostComponent = new TripInfoCost(cost);
  const tripControlsComponent = new TripControls();
  const navigationComponent = new Navigation(tabs);
  const filtersComponent = new Filters(filters);


  renderTemplate(tripControlsComponent.getElement(), navigationComponent.getElement(), RenderPosition.AFTERBEGIN);
  renderTemplate(tripControlsComponent.getElement(), filtersComponent.getElement(), RenderPosition.BEFOREEND);
  renderTemplate(mainComponent.getElement(), tripControlsComponent.getElement(), RenderPosition.AFTERBEGIN);

  renderTemplate(mainComponent.getElement(), tripInfoComponent.getElement(), RenderPosition.AFTERBEGIN);
  renderTemplate(tripInfoComponent.getElement(), tripInfoCostComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderTripEvents = (TripEventsComponent, points) => {

};

renderTripMain(TripMainComponent, tripInfo, fullCost, tabsArr.slice(), filtersArr.slice());


