const doDishes = {
  plates: ["a", "b", "c", "e", "d"],
  forks: ["a", "c", "g", "d", "s", "w"],
  cups: ["q", "w", "e", "r"],
};

function washing(dishes, callback) {
  const total = Object.entries(dishes).reduce(
    (acc, [type, dishes]) => acc + dishes.length,
    0
  );
  callback(total);
}

washing(doDishes, update_dishes_dom);
