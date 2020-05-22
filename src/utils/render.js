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

const renderTemplate = (container, component, place = `beforeend`) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(component.getElement());
      break;
    case RenderPosition.BEFOREEND:
      container.append(component.getElement());
      break;
    case RenderPosition.BEFOREBEGIN:
      container.before(component.getElement());
      break;
    case RenderPosition.AFTEREND:
      container.after(component.getElement());
      break;
    case RenderPosition.REPLACE:
      container.replaceWith(component.getElement());
      break;
  }
};

const replaceComponent = (newComponent, oldComponent) => {
  const parentElement = oldComponent.getElement().parentElement;
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();

  const isExistElements = !!(parentElement && newElement && oldElement);

  if (isExistElements && parentElement.contains(oldElement)) {
    parentElement.replaceChild(newElement, oldElement);
  }
};

const removeElement = (component) => {
  component.getElement().remove();
  component.removeElement();
};

export {
  createElement,
  renderTemplate,
  RenderPosition,
  replaceComponent,
  removeElement
};
