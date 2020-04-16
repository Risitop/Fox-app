class FilterBank {

  constructor() {
    this.fs = require('fs');
    this.sourceVertex = null;
    this.fragments = {};
  }

  loadFilters(json_filters) {
    for (let f in json_filters) {
      this.loadFilter(json_filters[f]);
    }
  }

  loadFilter(filter) {
    const that = this;
    this.fs.readFile(__dirname + '/' + filter.url, function (err, data) {
      if (err) {
        console.error('Unable to load filter ' + filter.url);
        throw err;
      }
      console.log(filter.url + ' loaded.');
      that.addFilterData(filter.id, data.toString());
    });
    if (filter.js !== null) {
      this.fragments[filter.id] = {
        "js": filter.js
      };
    }
  }

  addFilterData(id, source) {
    if (id === "vertex") {
      this.sourceVertex = source;
      return;
    }
    const filter = this.fragments[id];
    filter.source = source;
    filter.constructor = require(__dirname + '/' + filter.js).constructor;
    console.log('Filter class ' + id + ' loaded.');
  }

  createFilter(id, params = {}) {
    if (this.fragments[id] === undefined) {
      console.error("Unknown filter id " + id);
      throw err;
    }
    return new this.fragments[id].constructor(
      this.sourceVertex,
      this.fragments[id].source,
      params
    );
  }
  
}
