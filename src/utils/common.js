import moment from 'moment';

const formatTime = (date) => {
  return moment(date).format(`HH:mm`);
};

const formatDate = (date) => {
  return moment(date).format(`DD[/]MM[/]YY`);
};

const monthNames = [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`];

const getHtmlElement = (className) => {
  const element = document.querySelector(`.${className}`);

  if (!element) {
    throw new Error(`Элемент ${className} не найден`);
  }

  return element;
};

const getRandomInteger = (min = 1, max) => {
  const rand = min - 0.5 + Math.random() * (max - min + 1);
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

  const dateFrom = date.from ? formatDate(date.from) : formatDate(new Date());
  const dateTo = date.to ? formatDate(date.to) : formatDate(new Date());

  const timeFrom = date.from ? formatTime(date.from) : formatDate(new Date());
  const timeTo = date.to ? formatTime(date.to) : formatDate(new Date());

  tripTime.from = `${dateFrom} ${timeFrom}`;
  tripTime.to = `${dateTo} ${timeTo}`;

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
  return {
    from: formatTime(from),
    to: formatTime(to),
  };
};

const getEventDuration = (from, to) => {
  const momentFrom = moment(from);
  const momentTo = moment(to);

  let MinDuration = moment.duration(momentTo.diff(momentFrom)).minutes();
  let HourDuration = moment.duration(momentTo.diff(momentFrom)).hours();
  let DayDuration = moment.duration(momentTo.diff(momentFrom)).days();

  MinDuration = MinDuration ? `${MinDuration}M` : ``;
  HourDuration = HourDuration ? `${HourDuration}H` : ``;
  DayDuration = DayDuration ? `${DayDuration}D` : ``;

  return `${DayDuration} ${HourDuration} ${MinDuration}`;
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

const isFuture = (date) => {
  return date > new Date().getTime();
};

const isPast = (date) => {
  return new Date().getTime() > date;
};

export {
  getRandomInteger,
  flipCoin,
  getHtmlElement,
  getFormattedDate,
  sortPointsByDate,
  getEventTime,
  getDateObj,
  getFormattedEventTime,
  getEventDuration,
  formatTime,
  formatDate,
  isFuture,
  isPast,
  monthNames
};
