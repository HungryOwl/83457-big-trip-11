const sortNames = [
  `Event`, `Time`, `Price`
];

const getSortItems = () => {
  return sortNames.map((name) => {
    const dataAttr = name.toUpperCase();
    const dataAttrValue = name.toLowerCase();

    return {
      name,
      [dataAttr]: dataAttrValue
    };
  });
};

const sortItems = getSortItems();

export {sortItems};
