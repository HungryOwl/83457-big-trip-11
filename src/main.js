import API from "./api.js";
import {renderTemplate} from './utils/render';
import TripController from './controllers/TripController';
import TripHeader from './components/trip-header';
import TripEvents from './components/trip-events';
import PointsModel from './models/points.js';
import {points} from './mock/trip-point';

const AUTHORIZATION = `Basic kTy9gIdsz2317rD`;
const END_POINT = `https://11.ecmascript.pages.academy/big-trip/`;

const headerContainer = document.querySelector(`.page-header__container`);
const eventsContainer = document.querySelector(`.page-main .page-body__container`);


const api = new API(END_POINT, AUTHORIZATION);
const pointsModel = new PointsModel();
pointsModel.setPoints(points.slice());

const tripHeaderComponent = new TripHeader();
const tripEventsComponent = new TripEvents();

const tripController = new TripController(tripHeaderComponent, tripEventsComponent, pointsModel, api);

renderTemplate(headerContainer, tripHeaderComponent);
renderTemplate(eventsContainer, tripEventsComponent);
tripController.render();
