import {renderTemplate} from './utils/render';
import TripController from './controllers/TripController';
import TripHeader from './components/trip-header';
import TripEvents from './components/trip-events';
import PointsModel from './models/points.js';
import {points} from './mock/trip-point';

const headerContainer = document.querySelector(`.page-header__container`);
const eventsContainer = document.querySelector(`.page-main .page-body__container`);

const pointsModel = new PointsModel();
pointsModel.setPoints(points.slice());

const tripHeaderComponent = new TripHeader();
const tripEventsComponent = new TripEvents();

const tripController = new TripController(tripHeaderComponent, tripEventsComponent, pointsModel);

renderTemplate(headerContainer, tripHeaderComponent);
renderTemplate(eventsContainer, tripEventsComponent);
tripController.render();
