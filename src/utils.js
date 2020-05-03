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

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  if (newElement.childNodes.length > 1) {
    let fragment = new DocumentFragment();

    for (let i = 0; i < newElement.childNodes.length; i++) {
      fragment.append(newElement.childNodes[i]);
    }

    return fragment;
  } else {
    return newElement.firstChild;
  }
};

const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  BEFOREBEGIN: `beforebegin`,
  AFTEREND: `afterend`,
  REPLACE: `replace`
};

const renderTemplate = (container, element, place = `beforeend`) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
    case RenderPosition.BEFOREBEGIN:
      container.before(element);
      break;
    case RenderPosition.AFTEREND:
      container.after(element);
      break;
    case RenderPosition.REPLACE:
      container.replaceWith(element);
      break;
  }
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
  createElement,
  renderTemplate,
  RenderPosition,
  monthNames
};
