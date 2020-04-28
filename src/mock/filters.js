const filterNames = [
  `Everything`, `Future`, `Past`
];

const getFilters = () => {
  return filterNames.map((name) => {
    return {
      name
    };
  });
};

const filters = getFilters();

export {filters};
