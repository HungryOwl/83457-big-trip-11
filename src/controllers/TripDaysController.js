import {RenderPosition, renderTemplate, removeElement} from "../utils/render";
import {TripDayController} from "./TripDayController";
import {TripDays} from "../components/trip-days";

export class TripDaysController {
  constructor(container, parentController) {
    this._container = container;
    this._tripDayControllers = [];
    this._parentController = parentController;
    this._tripDaysComponent = new TripDays();
  }

  onViewChange() {
    this._parentController.onViewChange();
    this._tripDayControllers.forEach((controller) => controller.setDefaultView());
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

  removeElement() {
    removeElement(this._tripDaysComponent);
  }

  render(dayGroups) {
    this._dayGroups = dayGroups;
    this._tripDayControllers = this._getTripDayControllers();

    renderTemplate(this._container, this._tripDaysComponent, RenderPosition.BEFOREEND);
  }
}
