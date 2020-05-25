import _ from 'lodash';
import {renderTemplate, removeElement, RenderPosition} from '../utils/render.js';
import {getDateObj, getFormattedDate, monthNames} from '../utils/common';
import Message from '../components/messages';
import Filters from '../components/filters';
import Sort, {SortType} from '../components/sort-trip';
import EditTrip from '../components/edit-trip';
import {TripDaysController} from './TripDaysController';
import {TripDays} from '../components/trip-days';
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
};

export default class TripController {
  constructor(headerContainer, eventsContainer) {
    this._points = null;
    this._tripInfo = {};
    this._fullCost = 0;
    this._headerContainer = headerContainer;
    this._eventsContainer = eventsContainer;
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
  }

  _getTripDayGroups(currentDate = null) {
    const dayGroups = [];
    const daysMap = {};

    if (!this._points) {
      return dayGroups;
    }

    this._points.forEach((point) => {
      const pointDate = currentDate ? currentDate : point.date.from;
      const dateObj = getDateObj(pointDate);
      const year = dateObj.year;
      const month = dateObj.month;
      const day = getFormattedDate(dateObj.day);
      const date = `${year}-${getFormattedDate(month)}-${day}`;

      let group = daysMap[date];

      if (!group) {
        group = {
          date,
          points: [point],
          month: monthNames[month],
          day
        };

        daysMap[date] = group;
        dayGroups.push(group);
      } else {
        group.points.push(point);
      }
    });

    return dayGroups;
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

    if (!this._points || _.isEmpty(this._points)) {
      return tripInfo;
    }

    const pointsCopy = this._points.slice(1);

    tripInfo.cities = this._getCitySequence(pointsCopy);
    tripInfo.dates = this._getStartEndDates(pointsCopy);

    return tripInfo;
  }

  _getFullCost() {
    let fullCost = 0;

    if (!this._points || _.isEmpty(this._points)) {
      return fullCost;
    }

    this._points.forEach((point) => {
      fullCost += point.getFullPrice();
    });

    return fullCost;
  }

  _onAddTripCancelBtnClick() {
    return () => {
      document.removeEventListener(`keydown`, this._onEscKeyDown);
      this._newEventBtnComponent.enable();
      removeElement(this._addTripComponent);
      this._newPointMode = NewPointMode.DEFAULT;
    };
  }

  _renderAddTripForm() {
    const sortElement = this._sortComponent.getElement();
    document.addEventListener(`keydown`, this._onEscKeyDown);
    this._addTripComponent.setCancelButtonClickHandler(this._onAddTripCancelBtnClick());
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
      this._tripDaysController.onViewChange(); // закрываем все остальные точки маршрута
      this._renderAddTripForm();
    };
  }

  _getSortedPoints(sortType) {
    let sortedPoints = [];
    const showingPoints = this._points.slice();

    switch (sortType) {
      case SortType.TIME:
        sortedPoints = showingPoints.sort((a, b) => b.date.timeDuration - a.date.timeDuration);
        break;
      case SortType.PRICE:
        sortedPoints = showingPoints.sort((a, b) => b.price - a.price);
        break;
      case SortType.EVENT:
        sortedPoints = showingPoints;
        break;
    }

    return sortedPoints;
  }

  _renderDayGroups(eventsElement, date = null) {
    this._dayGroups = this._getTripDayGroups(date);
    this._tripDaysComponent = new TripDays(this._dayGroups);
    renderTemplate(eventsElement, this._tripDaysComponent);
  }

  _onSortBtnClick(sortType) {
    this._points = this._getSortedPoints(sortType);
    const eventsElement = this._eventsContainer.getElement();

    removeElement(this._tripDaysComponent);

    switch (sortType) {
      case SortType.TIME:
      case SortType.PRICE:
        this._renderDayGroups(eventsElement, new Date());
        break;
      case SortType.EVENT:
        this._renderDayGroups(eventsElement);
        break;
    }
  }

  render(points) {
    this._points = points;
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

    this._dayGroups = this._getTripDayGroups();
    this._tripDaysController = new TripDaysController(eventsElement, this);

    renderTemplate(eventsElement, this._sortComponent);
    this._tripDaysController.render(this._dayGroups, this._points);

    this._newEventBtnComponent.setClickHandler(this._onNewEventButtonClick(this._sortComponent));
    this._sortComponent.setSortTypeChangeHandler(this._onSortBtnClick);
  }
}
