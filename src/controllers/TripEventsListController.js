import {RenderPosition, renderTemplate} from '../utils/render';
import PointController from './PointController';
import {TripDays, TripDay} from '../components/trip-days';
import {TripEventsList} from '../components/trip-days';

export class TripDayController {
  constructor(container, parentController) {
    this._points = [];
    this._pointControllers = [];
    this._parentController = parentController;
    this._container = container;
    this._tripDayComponent = null;
    this._tripEventsListComponent = new TripEventsList();
    this._onViewChange = this._onViewChange.bind(this);
  }

  _onViewChange() {
    this._pointControllers.forEach((controller) => controller.setDefaultView());
  }

  _getPointControllers(onViewChange) {
    return this._points.map((point) => {
      const tripEventsListElement = this._tripEventsListComponent.getElement();
      const pointController = new PointController(tripEventsListElement, onViewChange);
      pointController.render(point);
      return pointController;
    });
  }

  render(dayGroup, dayNumber) {
    this._points = dayGroup.points;
    this._dayGroup = dayGroup;
    this._dayNumber = dayNumber;
    this._pointControllers = this._getPointControllers(this._onViewChange);
    this._tripDayComponent = new TripDay(this._dayGroup, this._dayNumber);
    const tripDayElement = this._tripDayComponent.getElement();

    renderTemplate(tripDayElement, this._tripEventsListComponent, RenderPosition.BEFOREEND);
    renderTemplate(this._container, this._tripDayComponent, RenderPosition.BEFOREEND);
  }
}

export class TripDaysController {
  constructor(container) {
    this._container = container;
    this._tripDayControllers = [];
    this._tripDaysComponent = new TripDays();
  }

  _getDayNumber(arr, day) {
    return (arr.length > 1) ? day + 1 : null;
  }

  _getTripDayControllers() {
    return this._dayGroups.map((dayGroup, day, arr) => {
      const groupDayNumber = this._getDayNumber(arr, day);
      const tripDaysElement = this._tripDaysComponent.getElement();
      const tripDayController = new TripDayController(tripDaysElement, this);

      tripDayController.render(dayGroup, groupDayNumber);
      return tripDayController;
    });
  }

  render(dayGroups) {
    this._dayGroups = dayGroups;
    this._tripDayControllers = this._getTripDayControllers();

    renderTemplate(this._container, this._tripDaysComponent, RenderPosition.BEFOREEND);
  }
}
