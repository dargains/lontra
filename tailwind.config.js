module.exports = {
  purge: [],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1280px",
      xl: "1440px",
      xxl: "1920px"
    },
    extend: {
      colors: {
        body: "var(--color-body)",
        primary: "var(--color-primary)",
        "primary-grey": "var(--color-primary-grey)",
        "primary-hover": "var(--color-primary-hover)",
        secondary: "var(--color-secondary)",
        highlight: "var(--color-highlight)",
      },
      fontFamily: {
        body: "var(--font-body)",
        heading: "var(--font-heading)",
      },
    },
  },
  variants: {},
  plugins: [
    require("tailwind-bootstrap-grid")({
      gridColumns: 24,
      gridGutterWidth: "20px",
      containerMaxWidths: {
        sm: "var(--container-max-w-sm)",
        md: "var(--container-max-w-md)",
        lg: "var(--container-max-w-lg)",
        xl: "var(--container-max-w-xl)",
        xxl: "var(--container-max-w-xxl)"
      }
    })],
}
