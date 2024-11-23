/**
 * This function measures and reports key performance metrics in web applications using the web-vitals package.
 *
 * @param {Function} onPerfEntry - The callback function to handle the performance metrics.
 * The function should accept a `PerfEntry` object as its only argument.
 * @returns {void}
 */
const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry).catch(() => {});
      getFID(onPerfEntry).catch(() => {});
      getFCP(onPerfEntry).catch(() => {});
      getLCP(onPerfEntry).catch(() => {});
      getTTFB(onPerfEntry).catch(() => {});
    }).catch(() => {});
  }
};

export default reportWebVitals;
