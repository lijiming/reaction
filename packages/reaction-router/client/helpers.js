//
// Layout container uses body
//
BlazeLayout.setRoot("body");

/**
 * pathFor
 * @summary get current router path
 * @param {String} path - path to fetch
 * @param {Object} options - url params
 * @return {String} returns current router path
 */
ReactionRouter.pathFor = pathFor = (path, options = {}) => {
  // let {params, query} = options;
  let params = options.hash;
  let query = options.hash.query ? ReactionRouter._qs.parse(options.hash.query) : {};
  let route = ReactionRouter.path(path, params, query);
  // console.log(`Requested path for ${path} and returned route: ${route}`);
  return route;
};

// return path
Template.registerHelper("pathFor", pathFor);
// deprecated same as pathForSEO
// Template.registerHelper("pathForSEO", pathFor);

// absolute + path
Template.registerHelper("urlFor", (path, params) => {
  return Meteor.absoluteUrl(pathFor(path, params).substr(1));
});

/**
 * active
 * @summary general helper to return "active" when on current path
 * @example {{active "name"}}
 * @param {String} routeName - route name as defined in registry
 * @return {String} return "active" or null
 */
Template.registerHelper("active", (routeName) => {
  ReactionRouter.watchPathChange();
  const group = ReactionRouter.current().route.group;
  let prefix;
  if (group && group.prefix) {
    prefix = ReactionRouter.current().route.group.prefix;
  } else {
    prefix = "";
  }
  const path = ReactionRouter.current().route.path;
  const routeDef = path.replace(prefix + "/", "");
  return routeDef === routeName ? "active" : "";
});
