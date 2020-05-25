import {RenderPosition, renderTemplate} from '../utils/render';
import PointController from './PointController';
import {TripDay} from '../components/trip-days';
import {TripEventsList} from '../components/trip-days';

export class TripDayController {
  constructor(container, parentController) {
    this._points = [];
    this._pointControllers = [];
    this._parentController = parentController;
    this._container = container;
    this._tripDayComponent = null;
    this._tripEventsListComponent = new TripEventsList();
  }

  onViewChange() {
    this._parentController.onViewChange();
  }

  setDefaultView() {
    this._pointControllers.forEach((controller) => controller.setDefaultView());
  }

  _getPointControllers() {
    return this._points.map((point) => {
      const tripEventsListElement = this._tripEventsListComponent.getElement();
      const pointController = new PointController(tripEventsListElement, this);
      pointController.render(point);
      return pointController;
    });
  }

  render(dayGroup, dayNumber) {
    this._points = dayGroup.points;
    this._dayGroup = dayGroup;
    this._dayNumber = dayNumber;
    this._pointControllers = this._getPointControllers();
    this._tripDayComponent = new TripDay(this._dayGroup, this._dayNumber);
    const tripDayElement = this._tripDayComponent.getElement();

    renderTemplate(tripDayElement, this._tripEventsListComponent, RenderPosition.BEFOREEND);
    renderTemplate(this._container, this._tripDayComponent, RenderPosition.BEFOREEND);
  }
}

