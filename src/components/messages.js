const getMessagesTemplate = (message) => (
  `<p class="trip-events__msg">${message}</p>`
);

export default class Message {
  constructor(message) {
    this._message = message;
    this._element = null;
    this._template = this.getTemplate();
  }

  getTemplate() {
    return getMessagesTemplate(this._message);
  }

  getElement() {
    if (!this._element) {
      this._element = this.getElemFromTemplate(this._template);
    }

    return this._element;
  }

  getElemFromTemplate(template) {
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
  }

  removeElement() {
    this._element = null;
  }
}
