const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  BEFOREBEGIN: `beforebegin`,
  AFTEREND: `afterend`,
  REPLACE: `replace`
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  if (newElement.childNodes.length > 1) {
    const fragment = new DocumentFragment();

    for (let i = 0; i < newElement.childNodes.length; i++) {
      fragment.append(newElement.childNodes[i]);
    }

    return fragment;
  } else {
    return newElement.firstChild;
  }
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
  createElement,
  renderTemplate,
  RenderPosition,
};
