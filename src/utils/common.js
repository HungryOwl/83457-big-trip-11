import moment from 'moment';

export const formatTime = (date) => {
  return moment(date).format(`hh:mm`);
};

export const formatDate = (date) => {
  return moment(date).format(`DD MMMM`);
};

const monthNames = [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`];

const getHtmlElement = (className) => {
  const element = document.querySelector(`.${className}`);

  if (!element) {
    throw new Error(`Элемент ${className} не найден`);
  }

  return element;
};

const getContainerClasses = (classNamesArr, obj) => {
  return classNamesArr.forEach((className) => {
    obj[className] = getHtmlElement(className);
  });
};

const getRandomInteger = (min = 1, max) => {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};

const flipCoin = () => {
  return Boolean(getRandomInteger(0, 1));
};

const getFormattedDate = (value) => {
  const digits = `` + value;
  return `00`.substring(digits.length) + digits;
};

const getFormattedEventTime = (date) => {
  const tripTime = {
    from: ``,
    to: ``
  };

  if (!date) {
    return tripTime;
  }

  const eventTime = date.eventTime;

  const year = {
    from: date.from.getFullYear() % 100,
    to: (date.to) ? date.to.getFullYear() % 100 : ``
  };

  const month = {
    from: getFormattedDate(date.from.getMonth()),
    to: (date.to) ? getFormattedDate(date.to.getMonth()) : ``
  };

  const day = {
    from: getFormattedDate(date.from.getDate()),
    to: (date.to) ? getFormattedDate(date.to.getDate()) : ``
  };

  const hours = {
    from: eventTime.from.hours,
    to: (eventTime.to) ? eventTime.to.hours : ``
  };

  const minutes = {
    from: eventTime.from.minutes,
    to: eventTime.to ? eventTime.to.minutes : ``
  };

  tripTime.from = `${day.from}/${month.from}/${year.from} ${hours.from}:${minutes.from}`;
  tripTime.to = date.to ? `${day.to}/${month.to}/${year.to} ${hours.to}:${minutes.to}` : ``;

  return tripTime;
};

const sortPointsByDate = (point, nextPoint) => {
  const prevTimestamp = point.date.from.getTime();
  const nextTimestamp = nextPoint.date.from.getTime();

  if (prevTimestamp > nextTimestamp) {
    return 1;
  }

  if (prevTimestamp === nextTimestamp) {
    return 0;
  }

  return -1;
};

const getEventTime = (from, to) => {
  const hoursFrom = from ? getFormattedDate(from.getHours()) : ``;
  const minutesFrom = from ? getFormattedDate(from.getMinutes()) : ``;
  const hoursTo = to ? getFormattedDate(to.getHours()) : ``;
  const minutesTo = to ? getFormattedDate(to.getMinutes()) : ``;

  return {
    from: {hours: hoursFrom, minutes: minutesFrom},
    to: {hours: hoursTo, minutes: minutesTo}
  };
};

const getDateObj = (timestamp) => {
  const date = timestamp;
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  return {
    year,
    month,
    monthName: monthNames[month],
    day
  };
};

const pointRandomReset = (point) => {
  const newPoint = {};
  const isReset = flipCoin();

  for (let field in point) {
    if (point.hasOwnProperty(field)) {
      newPoint[field] = (!isReset || field === `type`) ? point[field] : ``;
    }
  }

  return newPoint;
};

export {
  getRandomInteger,
  flipCoin,
  getHtmlElement,
  getContainerClasses,
  getFormattedDate,
  sortPointsByDate,
  getEventTime,
  getDateObj,
  pointRandomReset,
  getFormattedEventTime,
  monthNames
};
