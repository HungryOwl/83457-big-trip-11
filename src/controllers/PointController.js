import {renderTemplate, replaceComponent, RenderPosition} from '../utils/render.js';
import TripPoint from '../components/trip-point';
import EditTrip from '../components/edit-trip';

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};

export default class PointController {
  constructor(container, parentController) {
    this._point = {};
    this._container = container;
    this._parentController = parentController;
    this._mode = Mode.DEFAULT;
    this._pointComponent = null;
    this._editPointComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._onPointRollupBtnClick = this._onPointRollupBtnClick.bind(this);
    this._onEditTripRollupBtnClick = this._onEditTripRollupBtnClick.bind(this);
    this._onFavoriteButtonClick = this._onFavoriteButtonClick.bind(this);
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._replaceEditToPoint();
    }
  }

  _replaceEditToPoint() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._editPointComponent.reset();
    replaceComponent(this._editPointComponent, this._pointComponent);
    this._mode = Mode.DEFAULT;
  }

  _replacePointToEdit() {
    this._parentController.onViewChange();
    replaceComponent(this._pointComponent, this._editPointComponent);
    document.addEventListener(`keydown`, this._onEscKeyDown);
    this._mode = Mode.EDIT;
  }

  _onPointRollupBtnClick() {
    this._replacePointToEdit();
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _onEditTripRollupBtnClick() {
    this._replaceEditToPoint();
  }

  _onFavoriteButtonClick() {
    const favoriteTrigger = {isFavorite: !this._point.isFavorite};
    const newPoint = Object.assign({}, this._point, favoriteTrigger);
    this._parentController.onDataChange(this, this._point, newPoint);
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToPoint();
    }
  }

  render(point) {
    this._point = point;
    const oldPointComponent = this._pointComponent;
    const oldEditPointComponent = this._editPointComponent;

    this._pointComponent = new TripPoint(this._point);
    this._editPointComponent = new EditTrip(this._point);

    this._pointComponent.setRollupBtnClickHandler(this._onPointRollupBtnClick);
    this._editPointComponent.setFavoriteButtonClickHandler(this._onFavoriteButtonClick);
    this._editPointComponent.setSubmitButtonClickHandler(this._onEditTripRollupBtnClick);
    this._editPointComponent.setRollupButtonClickHandler(this._onEditTripRollupBtnClick);

    if (oldPointComponent && oldEditPointComponent) {
      replaceComponent(oldPointComponent, this._pointComponent);
      replaceComponent(oldEditPointComponent, this._editPointComponent);

    } else {
      renderTemplate(this._container, this._pointComponent, RenderPosition.BEFOREEND);
    }
  }
}
