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

const randomInteger = (min = 1, max) => {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};

export {randomInteger, getHtmlElement, getContainerClasses};
