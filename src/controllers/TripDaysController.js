import {renderTemplate, removeElement, RenderPosition} from '../utils/render';
import {getDateObj, getFormattedDate, monthNames} from '../utils/common';
import {TripDayController} from './TripDayController';
import {TripDays} from '../components/trip-days';
import {SortType} from '../components/sort-trip';

export class TripDaysController {
  constructor(container, parentController, pointsModel) {
    this._container = container;
    this._pointsModel = pointsModel;
    this._points = null;
    this._sortType = null;
    this._tripDayControllers = [];
    this._parentController = parentController;
    this._tripDaysComponent = new TripDays();
  }

  _getSortedPoints(points, sortType) {
    let sortedPoints = [];
    const showingPoints = points.slice();

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

  onViewChange() {
    this._parentController.onViewChange();
    this._tripDayControllers.forEach((controller) => controller.setDefaultView());
  }

  _getDayNumber(arr, day) {
    return this._sortType === SortType.EVENT ? day + 1 : null;
  }

  _getTripDayControllers() {
    return this._dayGroups.map((dayGroup, day, arr) => {
      const groupDayNumber = this._getDayNumber(arr, day);
      const tripDaysElement = this._tripDaysComponent.getElement();
      const tripDayController = new TripDayController(tripDaysElement, this, this._pointsModel);

      tripDayController.render(dayGroup, groupDayNumber);
      return tripDayController;
    });
  }

  _updatePoints(sortType) {
    this._points = this._pointsModel.getPoints();
    this._points = this._getSortedPoints(this._points, sortType);
  }

  remove() {
    removeElement(this._tripDaysComponent);
  }

  render(sortType = SortType.EVENT, currentDate = null) {
    this._sortType = sortType;
    this._updatePoints(this._sortType);
    this._dayGroups = this._getTripDayGroups(currentDate);
    this._tripDayControllers = this._getTripDayControllers();

    renderTemplate(this._container, this._tripDaysComponent, RenderPosition.BEFOREEND);
  }
}
