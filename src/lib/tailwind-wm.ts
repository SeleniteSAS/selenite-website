import plugin from "tailwindcss/plugin";

const vmPlugin = plugin(
  function ({ addUtilities, matchUtilities, theme }) {
    addUtilities({
      ".wm-horizontal": { writingMode: "horizontal-tb" },
      ".wm-vertical": { writingMode: "vertical-rl" },
      ".wm-vertical-lr": { writingMode: "vertical-lr" },
    });

    matchUtilities(
      {
        wm: (value) => ({ writingMode: value }),
      },
      { values: theme("writingMode", {}) },
    );
  },
  {
    theme: {
      extend: {
        writingMode: {
          horizontal: "horizontal-tb",
          vertical: "vertical-rl",
          "vertical-lr": "vertical-lr",
        },
      },
    },
  },
);

export default vmPlugin;
