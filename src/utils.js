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

export {getHtmlElement, getContainerClasses};
