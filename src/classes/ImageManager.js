class ImageManager {

  constructor() {
    this.atlases = {};
    this.loaded = true;
    this.nAtlas = 0;
  }

  getPath(url) {
    if (path === undefined) {
      return url;
    } else {
      return path.join(__dirname, url);
    }
  }

  addAtlas(atlas_list) {
    for (let atlas of atlas_list) {
      const url = this.getPath(atlas)
      this.atlases[url] = {};
      this.atlases[url].id = this.nAtlas;
      this.atlases[url].url = url;
      this.atlases[url].loaded = false;
      this.atlases[url].toLoad = true;
      this.nAtlas += 1;
    }
  }

  loadAtlases(callback) {
    this.loaded = false;
    const atlasesList = [];
    for (let url in this.atlases) {
      const atlas = this.atlases[url];
      if (atlas.toLoad && !atlas.loaded) {
        atlasesList.push(url);
      }
    }
    const that = this;
    PIXI.Loader.shared
      .add(atlasesList)
      .on("progress", (l, r) => that.partialLoad(l, r))
      .load(() => that.hasLoaded(callback));
  }

  partialLoad(loader, resource) {
    console.log(resource.url + " loaded.");
    if (this.atlases[resource.url] === undefined) return;
    this.atlases[resource.url].loaded = true;
  }

  hasLoaded(callback) {
    this.loaded = true;
    console.log("Atlases loaded.");
    callback();
  }

  getTexture(atlas, source) {
    return PIXI.Loader.shared.resources[this.getPath(atlas)].textures[source];
  }
  
}
