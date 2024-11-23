const eventBus = {
  subscribe(event, callback) {
    document.addEventListener(event, (e) => callback(e.detail));
  },
  publish(event, data) {
    document.dispatchEvent(new CustomEvent(event, { detail: data }));
  },
  unsubscribe(event, callback) {
    document.removeEventListener(event, callback);
  },
};

export { eventBus };