import _ from 'lodash';
import {renderTemplate, removeElement, RenderPosition} from '../utils/render.js';
import {getDateObj} from '../utils/common';
import Message from '../components/messages';
import Sort, {SortType} from '../components/sort-trip';
import EditTrip from '../components/edit-trip';
import {TripDaysController} from './TripDaysController';
import {Mode as PointControllerMode} from './PointController';
import FilterController from './filter';
import TripControls from '../components/trip-controls';
import Navigation from '../components/menu';
import TripInfo from '../components/trip-info';
import TripInfoCost from '../components/trip-info-cost';
import NewEventButton from '../components/new-event-button';
import {tabs} from '../mock/menu';
import {sortItems} from '../mock/sort-trip';

export const NewPointMode = {
  DEFAULT: `close`,
  OPEN: `open`,
  TYPE: `flight`
};

export default class TripController {
  constructor(headerContainer, eventsContainer, pointsModel) {
    this._headerContainer = headerContainer;
    this._eventsContainer = eventsContainer;
    this._pointsModel = pointsModel;

    this._points = null;
    this._tripInfo = {};
    this._fullCost = 0;

    this._filtersController = null;
    this._tripDaysController = null;

    this._messageComponent = new Message(`Click New Event to create your first point`);
    this._newEventBtnComponent = new NewEventButton();
    this._activeSortType = SortType.EVENT;
    this._sortComponent = new Sort(sortItems.slice());
    this._tripControlsComponent = new TripControls();
    this._navigationComponent = new Navigation(tabs.slice());
    
    this.sortElement = this._sortComponent.getElement();
    // this._addTripComponent = new EditTrip();

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._onSortBtnClick = this._onSortBtnClick.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onNewEventButtonClick = this._onNewEventButtonClick.bind(this);

    this._newEventBtnComponent.setClickHandler(this._onNewEventButtonClick);
    this._sortComponent.setSortTypeChangeHandler(this._onSortBtnClick);
    this._pointsModel.setFilterChangeHandler(this._onFilterChange);
  }

  _getStartEndDates() {
    let dates = [this._points[0].date.from];

    if (this._points.length > 1) {
      dates.push(this._points[this._points.length - 1].date.to);
    }

    dates = dates.map((timestamp) => {
      return getDateObj(timestamp);
    });

    return dates;
  }

  _getCitySequence() {
    const cities = [];

    this._points.forEach((point) => {
      cities.push(point.destination);
    });

    return cities;
  }

  _getTripInfo() {
    const tripInfo = {};

    if (_.isEmpty(this._points)) {
      return tripInfo;
    }

    const pointsCopy = this._points.slice();

    tripInfo.cities = this._getCitySequence(pointsCopy);
    tripInfo.dates = this._getStartEndDates(pointsCopy);

    return tripInfo;
  }

  _getFullEventCost(point) {
    let fullPrice = point.price;

    if (point.offers) {
      for (const offer of point.offers) {
        fullPrice += offer.price;
      }
    }

    return fullPrice;
  }

  _getFullCost() {
    let fullCost = 0;

    if (!this._points || _.isEmpty(this._points)) {
      return fullCost;
    }

    this._points.forEach((point) => {
      fullCost += this._getFullEventCost(point);
    });

    return fullCost;
  }

  // _onAddTripCancelBtnClick() {
  //   return this._removeAddTripForm;
  // }

  _createPoint() {
    document.addEventListener(`keydown`, this._onEscKeyDown);
    // this._addTripComponent.setCancelButtonClickHandler(this._onAddTripCancelBtnClick());
    // this._addTripComponent.rerender();
    // renderTemplate(sortElement, this._addTripComponent, RenderPosition.AFTEREND);
    // this._newPointMode = NewPointMode.OPEN;
  }

  // _removeAddTripForm() {
  //   document.removeEventListener(`keydown`, this._onEscKeyDown);
  //   // this._newEventBtnComponent.enable();
  //   // removeElement(this._addTripComponent);
  //   // this._newPointMode = NewPointMode.DEFAULT;
  // }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      // this._removeAddTripForm();
    }
  }

  _removeTripDays() {
    this._tripDaysController.remove();
    // this._showedTaskControllers.forEach((taskController) => taskController.destroy());
  }

  _renderTripDays() {
    this._tripDaysController.render(this._activeSortType);
  }

  _updateTripDays() {
    this._removeTripDays();
    this._renderTripDays();
  }

  onViewChange(mode) {
    switch (mode) {
      case PointControllerMode.REMOVE:
        this._updateTripDays();
        break;
      default:
        break;
    }
  }

  _onNewEventButtonClick(evt) {
    evt.target.disabled = true;
    this._tripDaysController.onViewChange();
    this._createPoint();
  }

  _onSortBtnClick(sortType) {
    this._activeSortType = sortType;
    this._tripDaysController.remove();

    switch (sortType) {
      case SortType.TIME:
      case SortType.PRICE:
        this._tripDaysController.render(sortType, new Date());
        break;
      case SortType.EVENT:
        this._tripDaysController.render(sortType);
        break;
    }
  }

  _onFilterChange() {
    this._tripDaysController.remove();
    const eventsElement = this._eventsContainer.getElement();
    this._tripDaysController = new TripDaysController(eventsElement, this, this._pointsModel);
    this._tripDaysController.render(this._activeSortType);
  }

  render() {
    this._points = this._pointsModel.getPoints();
    this._fullCost = this._getFullCost();
    this._tripInfo = this._getTripInfo();
    this._tripInfoComponent = new TripInfo(this._tripInfo);
    this._tripInfoCostComponent = new TripInfoCost(this._fullCost);

    const headerElement = this._headerContainer.getElement();
    const eventsElement = this._eventsContainer.getElement();
    const tripControlsElement = this._tripControlsComponent.getElement();
    const tripInfoElement = this._tripInfoComponent.getElement();

    this._filtersController = new FilterController(tripControlsElement, this._pointsModel);
    this._filtersController.render();

    renderTemplate(tripControlsElement, this._navigationComponent);
    renderTemplate(headerElement, this._tripControlsComponent, RenderPosition.AFTERBEGIN);
    renderTemplate(tripInfoElement, this._tripInfoCostComponent);
    renderTemplate(headerElement, this._tripInfoComponent, RenderPosition.AFTERBEGIN);
    renderTemplate(headerElement, this._newEventBtnComponent);

    if (_.isEmpty(this._points)) {
      renderTemplate(eventsElement, this._messageComponent);
      return;
    }

    this._tripDaysController = new TripDaysController(eventsElement, this, this._pointsModel);

    renderTemplate(eventsElement, this._sortComponent);
    this._tripDaysController.render();
  }
}
