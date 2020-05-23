import {renderTemplate, replaceComponent, removeElement, RenderPosition} from '../utils/render.js';
import Filters from '../components/filters';
import Sort from '../components/sort-trip';
import EditTrip from '../components/edit-trip';
import TripDays from '../components/trip-days';
import TripControls from '../components/trip-controls';
import Navigation from '../components/menu';
import TripInfo from '../components/trip-info';
import TripInfoCost from '../components/trip-info-cost';
import NewEventButton from '../components/new-event-button';
import {tabs} from '../mock/menu';
import {sortItems} from '../mock/sort-trip';
import {filters} from '../mock/filters';
import {getDateObj, getFormattedDate, monthNames} from '../utils/common';
import {points} from '../mock/trip-point';

export default class TripController {
  constructor(headerContainer, eventsContaianer) {
    this._points = null;
    this._tripInfo = {};
    this._fullCost = 0;
    this._headerContainer = headerContainer;
    this._eventsContaianer = eventsContaianer;
    this._newEventBtnComponent = new NewEventButton();
    this._sortComponent = new Sort(sortItems.slice());
    this._filtersComponent = new Filters(filters.slice());
    this._tripControlsComponent = new TripControls();
    this._navigationComponent = new Navigation(tabs.slice());
    this._addTripComponent = new EditTrip();
  }

  _getTripDayGroups() {
    const dayGroups = [];
    const daysMap = {};

    this._points.forEach((point) => {
      const dateFrom = point.date.from;
      const dateObj = getDateObj(dateFrom);
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

    if (points.length > 1) {
      dates.push(points[points.length - 1].date.to);
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
    const pointsCopy = this._points.slice(1);
    const tripInfo = {};

    tripInfo.cities = this._getCitySequence(pointsCopy);
    tripInfo.dates = this._getStartEndDates(pointsCopy);

    return tripInfo;
  }

  _getFullCost() {
    let fullCost = 0;

    this._points.forEach((point) => {
      fullCost += point.getFullPrice();
    });

    return fullCost;
  }

  _onAddTripCancelBtnClick() {
    return () => {
      this._newEventBtnComponent.enable();
      removeElement(this._addTripComponent);
    };
  }

  _onEditButtonClick() {
    return (evt) => {
      evt.target.disabled = true;
      renderTemplate(this._sortComponent.getElement(), this._addTripComponent, RenderPosition.AFTEREND);

      this._addTripComponent.setCancelButtonClick(this._onAddTripCancelBtnClick());
    };
  }

  render(points) {
    this._points = points;
    this._dayGroups = this._getTripDayGroups();
    this._tripInfo = this._getTripInfo();
    this._fullCost = this._getFullCost();
    this._tripDaysComponent = new TripDays(this._dayGroups);

    this._tripInfoComponent = new TripInfo(this._tripInfo);
    this._tripInfoCostComponent = new TripInfoCost(this._fullCost);

    const headerElement = this._headerContainer.getElement();
    const eventsElement = this._eventsContaianer.getElement();

    renderTemplate(this._tripControlsComponent.getElement(), this._navigationComponent);
    renderTemplate(this._tripControlsComponent.getElement(), this._filtersComponent);
    renderTemplate(headerElement, this._tripControlsComponent, RenderPosition.AFTERBEGIN);
    renderTemplate(this._tripInfoComponent.getElement(), this._tripInfoCostComponent);
    renderTemplate(headerElement, this._tripInfoComponent, RenderPosition.AFTERBEGIN);
    renderTemplate(headerElement, this._newEventBtnComponent);
    renderTemplate(eventsElement, this._sortComponent);
    renderTemplate(eventsElement, this._tripDaysComponent);

    this._newEventBtnComponent.setClickHandler(this._onEditButtonClick(this._sortComponent));

    console.log('rendered');
  }
}
