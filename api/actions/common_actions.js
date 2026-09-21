const commonData = require('../data/common_data');

class CommonActions {
  constructor(request) {
    this.request = request;
  }

  async send(method, path, options = {}) {
    const headers = {
      ...commonData.jsonHeaders,
      ...(options.headers || {}),
    };

    return this.request[method](path, {
      ...options,
      headers,
    });
  }
}

module.exports = { CommonActions };
