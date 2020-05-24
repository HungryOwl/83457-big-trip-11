import PointController from "./PointController";
import {RenderPosition, renderTemplate} from "../utils/render";

export default class TripEventsList {
  constructor(container) {
    this._points = [];
    this._container = container;
    this._onViewChange = this._onViewChange.bind(this);
    this._pointControllers = this._getPointControllers(this._onViewChange);
  }

  _onViewChange() {
    this._pointControllers.forEach((controller) => controller.setDefaultView());
  }

  _getPointControllers(onViewChange) {
    return this._points.map((point) => {
      const listElement = this._getPointContainer();
      const pointController = new PointController(listElement, onViewChange);
      pointController.render(point);
      this._container.append(listElement);
      return pointController;
    });
  }

  render(points) {
    this._points = points;

    renderTemplate(this._container, this._tripEventsListComponent, RenderPosition.BEFOREEND);
  }
}
