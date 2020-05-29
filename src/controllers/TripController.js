import _ from 'lodash';
import {renderTemplate, removeElement, RenderPosition} from '../utils/render.js';
import {getDateObj, getFormattedDate, monthNames} from '../utils/common';
import Message from '../components/messages';
import Filters from '../components/filters';
import Sort, {SortType} from '../components/sort-trip';
import EditTrip from '../components/edit-trip';
import {TripDaysController} from './TripDaysController';
import TripControls from '../components/trip-controls';
import Navigation from '../components/menu';
import TripInfo from '../components/trip-info';
import TripInfoCost from '../components/trip-info-cost';
import NewEventButton from '../components/new-event-button';
import {tabs} from '../mock/menu';
import {sortItems} from '../mock/sort-trip';
import {filters} from '../mock/filters';

export const NewPointMode = {
  DEFAULT: `close`,
  OPEN: `open`,
  TYPE: `flight`
};

export default class TripController {
  constructor(headerContainer, eventsContainer, pointsModel) {
    this._points = null;
    this._tripInfo = {};
    this._fullCost = 0;
    this._headerContainer = headerContainer;
    this._eventsContainer = eventsContainer;
    this._pointsModel = pointsModel;
    this._messageComponent = new Message(`Click New Event to create your first point`);
    this._newEventBtnComponent = new NewEventButton();
    this._sortComponent = new Sort(sortItems.slice());
    this._filtersComponent = new Filters(filters.slice());
    this._tripControlsComponent = new TripControls();
    this._navigationComponent = new Navigation(tabs.slice());
    this._addTripComponent = new EditTrip();
    this._newPointMode = NewPointMode.DEFAULT;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._onSortBtnClick = this._onSortBtnClick.bind(this);
    this._removeAddTripForm = this._removeAddTripForm.bind(this);
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
      for (let offer of point.offers) {
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

  _onAddTripCancelBtnClick() {
    return this._removeAddTripForm;
  }

  _renderAddTripForm() {
    const sortElement = this._sortComponent.getElement();
    document.addEventListener(`keydown`, this._onEscKeyDown);
    this._addTripComponent.setCancelButtonClickHandler(this._onAddTripCancelBtnClick());
    this._addTripComponent.rerender();
    renderTemplate(sortElement, this._addTripComponent, RenderPosition.AFTEREND);
    this._newPointMode = NewPointMode.OPEN;
  }

  _removeAddTripForm() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._newEventBtnComponent.enable();
    removeElement(this._addTripComponent);
    this._newPointMode = NewPointMode.DEFAULT;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._removeAddTripForm();
    }
  }

  onViewChange() {
    if (this._newPointMode !== NewPointMode.DEFAULT) {
      this._removeAddTripForm();
    }
  }

  _onNewEventButtonClick() {
    return (evt) => {
      evt.target.disabled = true;
      this._tripDaysController.onViewChange();
      this._renderAddTripForm();
    };
  }

  _onSortBtnClick(sortType) {
    this._tripDaysController.removeElement();

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

    renderTemplate(tripControlsElement, this._navigationComponent);
    renderTemplate(tripControlsElement, this._filtersComponent);
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

    this._newEventBtnComponent.setClickHandler(this._onNewEventButtonClick(this._sortComponent));
    this._sortComponent.setSortTypeChangeHandler(this._onSortBtnClick);
  }
}
