export const tasksParentVariant = {
  start: {
    opacity: 0,
    overflow: "hidden",
  },
  end: {
    overflow: "auto",
    opacity: 1,
    transition: {
      duration: 1,
      delay: 1.5,
      when: "beforeChildren",
      staggerChildren: 1,
    },
  },
  exit: {
    overflow: "hidden",
    opacity: 1,
    transition: {
      overflow: { delay: 0 },
      when: "afterChildren",
      staggerDirection: -1,
      staggerChildren: 1,
    },
  },
};

export const singletaskVariants = {
  start: {
    opacity: 0,
  },
  end: {
    opacity: 1,
    transition: {
      delay: 0.2,
      duration: 0.5,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
      delay: 0.2,
    },
  },
};

export const ParentVariant = {
  start: {
    opacity: 0,
  },
  end: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerDirection: -1,
      staggerChildren: 0.15,
      delayChildren: 2.2,
      when: "afterChildren",
    },
  },
};

export const noDataContVariant = {
  start: { height: 0 },
  end: { height: 100, transition: { delay: 0.2, duration: 0.4 } },
  exit: { height: 0, transition: { delay: 0.2, duration: 0.4 } },
};

export const noDataSpanVariant = {};
