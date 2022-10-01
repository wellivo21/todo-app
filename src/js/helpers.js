/**
 * Summary. This function clears the inputs passed in as the parameters.
 * @param {element} inputs expects an input element.
 *
 */
export const clearInputs = function (inputs) {
  arguments.length === 1
    ? (inputs.value = '')
    : [...arguments].forEach((el) => (el.value = ''));
};

/**
 * Summary . Formats the date passed in as the first argument to a valid format.
 * @param {string} date a date-string with dd-mm-yyy format. Example: 01-10-2022 or 01/10/2022
 * @param {string} symbol is the symbol used to separate day/month/year of the date. By default, it's set to "-", but can be changed to "/", depending on the date passed in.
 * @returns a date as a string in the following format "yyyy-mm-dd". Example: "2022-10-01".
 */
export const formatDate = (date, symbol = '-') => {
  const dateParts = date.split(symbol);
  const [day, month, year] = dateParts;
  const dateObj = new Date(year, month - 1, day);
  return dateObj.toISOString().slice(0, 10);
};
