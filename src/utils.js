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

const sortPoints = (point, nextPoint) => {
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


export {
  getRandomInteger,
  flipCoin,
  getHtmlElement,
  getContainerClasses,
  getFormattedDate,
  sortPoints
};
