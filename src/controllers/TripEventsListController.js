import {RenderPosition, renderTemplate} from '../utils/render';
import PointController from './PointController';
import TripDay from '../components/trip-days';
import TripEventsList from '../components/trip-days';

export class TripEventsListController {
  constructor(container) {
    this._points = [];
    this._pointControllers = [];
    this._container = container;
    this._tripEventsListComponent = new TripEventsList();
    this._onViewChange = this._onViewChange.bind(this);
  }

  _onViewChange() {
    this._pointControllers.forEach((controller) => controller.setDefaultView());
  }

  _getPointControllers(onViewChange) {
    return this._points.map((point) => {
      const pointController = new PointController(this._tripEventsListComponent, onViewChange);
      pointController.render(point);
      return pointController;
    });
  }

  render(points) {
    this._points = points;
    this._pointControllers = this._getPointControllers(this._onViewChange);

    renderTemplate(this._container, this._tripEventsListComponent, RenderPosition.BEFOREEND);
  }
}

export class TripDayController {
  constructor(container) {
    this._container = container;
    this._tripEventsListControllers = [];
  }

  render(dayGroup, dayNumber) {
    this._dayGroup = dayGroup;
    this._dayNumber = dayNumber;
    this._tripDayComponent = new TripDay(this._dayGroup, this._dayNumber);

    renderTemplate(this._container, this._tripDayComponent, RenderPosition.BEFOREEND);
  }
}

export class TripDaysController {
  constructor(container) {
    this._container = container;
    this._tripDaysComponents = null;
  }

  _getDayNumber(arr, day) {
    return (arr.length > 1) ? day + 1 : null;
  }

  _getTripDays(dayGroups) {
    return dayGroups.map((dayGroup, day, arr) => {
      const groupDay = this._getDayNumber(arr, day);
      return new TripDay(dayGroup, groupDay);
    });
  }

  render(dayGroups) {
    this._tripDaysComponents = this._getTripDays(dayGroups);

    this._tripDaysComponents.forEach((tripDayComponent) => {
      renderTemplate(this._container, tripDayComponent, RenderPosition.BEFOREEND);
    });
  }
}
