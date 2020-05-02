const getTripInfoCost = (price) => (
  `<!-- Стоимость поездки -->
  <p class="trip-info__cost">
    Total:&nbsp;&#8381;&nbsp;<span class="trip-info__cost-value">${price}</span>
  </p>`
);


export {getTripInfoCost};
