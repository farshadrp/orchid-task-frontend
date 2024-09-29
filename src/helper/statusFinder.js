const statusFinder = (status) => {
  if (status === 1) {
    return "To Do";
  } else if (status === 2) {
    return "In progress";
  } else {
    return "Done";
  }
};

export default statusFinder;
