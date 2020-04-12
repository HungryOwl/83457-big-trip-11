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


export {getFilters};
