import {renderTemplate, RenderPosition} from './utils';
import TripHeader from './components/trip-header';
import Navigation from './components/menu';
import Filters from './components/filters';
import TripControls from './components/trip-controls';
import TripInfo from './components/trip-info';
import TripInfoCost from './components/trip-info-cost';
import Sort from './components/sort-trip';
import TripEvents from './components/trip-events';
import TripDays from './components/trip-days';
import {points} from './mock/trip-point';
import {dayGroups} from './mock/trip-days';
import {filters} from './mock/filters';
import {sortItems} from './mock/sort-trip';
import {fullCost} from './mock/trip-info-cost';
import {tripInfo} from './mock/trip-info';
import {tabs} from './mock/menu';


const headerContainer = document.querySelector(`.page-header__container`);
const eventsContainer = document.querySelector(`.page-main .page-body__container`);

const TripHeaderComponent = new TripHeader();
const TripEventsComponent = new TripEvents();
renderTemplate(headerContainer, TripHeaderComponent.getElement());
renderTemplate(eventsContainer, TripEventsComponent.getElement());

const renderTripControls = (mainComponent, tabsArr, filtersArr) => {
  const tripControlsComponent = new TripControls();
  const navigationComponent = new Navigation(tabsArr);
  const filtersComponent = new Filters(filtersArr);

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

const renderTripMain = (mainComponent, info, cost, tabsArr, filtersArr) => {
  renderTripControls(mainComponent, tabsArr, filtersArr);
  renderTripInfoCost(mainComponent, info, cost);
};

const renderTripEvents = (tripEventsComponent, pointsArr, sortItemsArr, dayGroupsArr) => {
  const sortComponent = new Sort(sortItemsArr);
  const tripDaysComponent = new TripDays(dayGroupsArr);

  renderTemplate(tripEventsComponent.getElement(), sortComponent.getElement());
  renderTemplate(tripEventsComponent.getElement(), tripDaysComponent.getElement());
};

renderTripMain(TripHeaderComponent, tripInfo, fullCost, tabs.slice(), filters.slice());
renderTripEvents(TripEventsComponent, points.slice(), sortItems.slice(), dayGroups.slice());


