interface optionsVariantInterface {
  index: number;
  option: string;
  newOption: string;
  isOptionClicked: boolean;
}

export const optionVariant = {
  start: { opacity: 0 },
  end: ({
    index,
    newOption,
    option,
    isOptionClicked,
  }: optionsVariantInterface) => ({
    opacity: option === newOption ? 1 : 0.4,
    // transition: { delay: 0.4 * index, duration: 0.2 },
  }),

  exit: {
    opacity: 0,
    // transition: { delay: 1 + index * 0.2, duration: 0.3 },
  },
};

export const hrVariant = {
  start: { width: 0 },
  end: {
    width: "80%",
    // transition: { delay: 1.2, duration: 1 }
  },
  exit: {
    width: 0,
    //  transition: { delay: 0.4, duration: 1 }
  },
};

export const optionsParentVariant = {
  start: { height: 50 },
  end: {
    height: 50,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.2,
      // delayChildren: 1,
    },
  },
  exit: {
    height: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.3,
      staggerDirection: -1,
      // repeatDelay: 5,
      delayChildren: 1,
    },
  },
};

export const opacityVariant = {
  start: { opacity: 0 },
  end: { opacity: 1 },
  exit: { opacity: 0 },
};

export const clearBtn = {
  start: { opacity: 0, scale: 0.8 },
  end: {
    opacity: 1,
    scale: 1,
    background: ["rgb:(255,255,255)", "var(--delete)"],
    transition: { delay: 0.2, duration: 0.4 },
  },
  exit: { opacity: 0, scale: 0.8, transition: { delay: 0.2, duration: 0.4 } },
};

// , transition: { delay: 0.4, duration: 1 }
