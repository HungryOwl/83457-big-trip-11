import {renderTemplate, replaceComponent, removeElement, RenderPosition} from '../utils/render.js';
import TripPoint from '../components/trip-point';
import EditTrip from '../components/edit-trip';

export const Mode = {
  ADDING: `adding`,
  DEFAULT: `default`,
  EDIT: `edit`,
  REMOVE: `remove`,
};

export const EmptyPoint = {
  type: `flight`,
  isEditing: false,
  isFavorite: false,
  preposition: `to`,
  offers: ``,
  destination: ``,
  description: ``,
  photos: ``,
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
    this._onSubmitBtnClick = this._onSubmitBtnClick.bind(this);
  }

  getMode() {
    return this._mode;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      if (this._mode === Mode.ADDING) {
        this._parentController.onDataChange(this, EmptyPoint, null);
      }
      this._replaceEditToPoint();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  _replaceEditToPoint() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._editPointComponent.reset();

    if (document.contains(this._editPointComponent.getElement())) {
      replaceComponent(this._editPointComponent, this._pointComponent);
    }

    this._mode = Mode.DEFAULT;
  }

  _replacePointToEdit() {
    document.addEventListener(`keydown`, this._onEscKeyDown);
    this._parentController.onViewChange(this._mode);
    this._mode = Mode.EDIT;
    replaceComponent(this._pointComponent, this._editPointComponent);
  }

  _onPointRollupBtnClick() {
    this._replacePointToEdit();
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _onEditTripRollupBtnClick() {
    this._replaceEditToPoint();
  }

  _onSubmitBtnClick(evt) {
    evt.preventDefault();
  }

  _onFavoriteButtonClick() {
    const favoriteTrigger = {isFavorite: !this._point.isFavorite};
    const newPoint = Object.assign({}, this._point, favoriteTrigger);
    this._parentController.onDataChange(this, this._point, newPoint);
  }

  _onCancelButtonClick() {
    this._replaceEditToPoint();
  }

  _onDeleteButtonClick(point) {
    return (evt) => {
      this._mode = Mode.REMOVE;
      console.log('_onDeleteButtonClick');
      evt.preventDefault();
      this._parentController.onDataChange(this, point, null);
    };
  }

  setDefaultView() {
    console.log('setDefaultView');
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToPoint();
    }
  }

  render(point, mode) {
    this._point = point;
    this._mode = mode;
    const oldPointComponent = this._pointComponent;
    const oldEditPointComponent = this._editPointComponent;

    this._pointComponent = new TripPoint(this._point);
    this._editPointComponent = new EditTrip(this._point);

    this._pointComponent.setRollupBtnClickHandler(this._onPointRollupBtnClick);

    this._editPointComponent.setFavoriteButtonClickHandler(this._onFavoriteButtonClick);
    this._editPointComponent.setSubmitButtonClickHandler(this._onSubmitBtnClick);
    this._editPointComponent.setRollupButtonClickHandler(this._onEditTripRollupBtnClick);
    this._editPointComponent.setDeleteButtonClickHandler(this._onDeleteButtonClick(this._point));
    // this._editPointComponent.setCancelButtonClickHandler(this._onCancelButtonClick);

    switch (mode) {
      case Mode.DEFAULT:
        if (oldPointComponent && oldEditPointComponent) {
          replaceComponent(oldPointComponent, this._pointComponent);
          replaceComponent(oldEditPointComponent, this._editPointComponent);
          this._replaceEditToPoint();
        } else {
          renderTemplate(this._container, this._pointComponent, RenderPosition.BEFOREEND);
        }
        break;
      case Mode.ADDING:
        if (oldPointComponent && oldEditPointComponent) {
          removeElement(oldPointComponent);
          removeElement(oldEditPointComponent);
        }
        document.addEventListener(`keydown`, this._onEscKeyDown);
        renderTemplate(this._container, this._editPointComponent, RenderPosition.AFTERBEGIN);
        break;
    }
  }
}
