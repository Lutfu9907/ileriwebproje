module.exports = {
  formatDate: (date) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Intl.DateTimeFormat("tr-TR", options).format(date);
  },
};
