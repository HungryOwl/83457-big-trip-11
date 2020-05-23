const sortNames = [
  `Event`, `Time`, `Price`
];

const getSortItems = () => {
  return sortNames.map((name) => {
    return {
      name,
    };
  });
};

const sortItems = getSortItems();

export {sortItems};
