import axios from "axios";

import * as Auth from "./auth";
import * as Articles from "./articles";
import * as Categories from "./categories";
import * as Bookmarks from "./bookmarks";

const API = {
  Auth,
  Articles,
  Categories,
  Bookmarks,
};

export default API;
