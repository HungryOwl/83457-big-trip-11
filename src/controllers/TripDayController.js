import {RenderPosition, renderTemplate} from '../utils/render';
import PointController, {Mode as PointControllerMode, EmptyPoint} from './PointController';
import {TripDay} from '../components/trip-days';
import {TripEventsList} from '../components/trip-days';

export class TripDayController {
  constructor(container, parentController, pointsModel) {
    this._points = [];
    this._pointControllers = [];
    this._parentController = parentController;
    this._container = container;
    this._pointsModel = pointsModel;
    this._tripDayComponent = null;
    this._tripEventsListComponent = new TripEventsList();
  }

  _getPointControllers() {
    return this._points.map((point) => {
      const tripEventsListElement = this._tripEventsListComponent.getElement();
      const pointController = new PointController(tripEventsListElement, this);
      pointController.render(point);
      return pointController;
    });
  }

  onDataChange(pointController, oldData, newData) {
    if (oldData === EmptyPoint) {
      console.log(`EmptyPoint`, EmptyPoint);
    } else if (newData === null) {
      this.pointsModel.removeTask(oldData.id);
      this.parentController.this._parentController.render();
    } else {
      const isSuccess = this._pointsModel.updatePoint(oldData.id, newData);

      if (isSuccess) {
        pointController.render(newData);
      }
    }
  }

  onViewChange() {
    this._parentController.onViewChange();
  }

  setDefaultView() {
    this._pointControllers.forEach((controller) => controller.setDefaultView());
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

