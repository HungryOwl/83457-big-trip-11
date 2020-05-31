export default class Point {
  constructor(data) {
    this.id = data[`id`];
    this.date.from = data[`date_from`] || null;
    this.date.to = data[`date_to`] || null;
    this.price = data[`base_price`];
    this.isFavorite = Boolean(data[`is_favorite`]);
    this.offers = data[`offers`];
    this.type = data[`type`];
    this.destination = this[`destination`];
    this.photos = data[`pictures`];
  }

  toRAW() {
    return {
      "id": this.id,
      "date_from": this.date.from ? this.date.from.toISOString() : null,
      "date_to": this.date.to ? this.date.to.toISOString() : null,
      "base_price": this.price,
      "is_favorite": this.isFavorite,
      "offers": this.offers,
      "type": this.type,
      "destination": this.destination,
      "pictures": this.photos,
    };
  }

  static parsePoint(data) {
    return new Point(data);
  }

  static parsePoints(data) {
    return data.map(Point.parsePoint);
  }

  static clone(data) {
    return new Point(data.toRAW());
  }
}
