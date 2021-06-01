// Place for various services (settings (.env) parser, api, auth, store, localStorage)

// import Settings from "./services/settings";
// import Auth from "./services/auth";

export default class Container {
  // settings: Settings;
  // local_storage: LocalStorage;
  // auth: Auth;
  // http: Http;
  // api: Api;
  // constructor(
  //   fetch_function: IFetchFunction, local_storage_function: Storage,
  // ) {
  //   // create object of .env variables
  //   this.settings = new Settings();
  //   // wrapper around localStorage
  //   // consists of getters and setters of all keys in storage
  //   this.local_storage = new LocalStorage(local_storage_function);
  //   this.auth = new Auth(this.local_storage);
  //   // wrapper around fetch function with some error handling functionallity
  //   this.http = new Http(fetch_function, this.auth, this.settings);
  //   this.api = new Api(this.http, this.auth);
  // }
}
