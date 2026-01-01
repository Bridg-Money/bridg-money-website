import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { renderToString } from "react-dom/server";
import * as React3 from "react";
import React3__default, { Component, memo, useRef, useState, useEffect } from "react";
import fastCompare from "react-fast-compare";
import invariant$1 from "invariant";
import shallowEqual from "shallowequal";
import { motion, useInView, useAnimation, AnimatePresence, useScroll as useScroll$1, useTransform } from "motion/react";
import { toast } from "sonner";
import * as ReactDOM from "react-dom";
/**
 * react-router v7.11.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
function createMemoryHistory(options = {}) {
  let { initialEntries = ["/"], initialIndex, v5Compat = false } = options;
  let entries;
  entries = initialEntries.map(
    (entry, index2) => createMemoryLocation(
      entry,
      typeof entry === "string" ? null : entry.state,
      index2 === 0 ? "default" : void 0
    )
  );
  let index = clampIndex(
    initialIndex == null ? entries.length - 1 : initialIndex
  );
  let action = "POP";
  let listener = null;
  function clampIndex(n) {
    return Math.min(Math.max(n, 0), entries.length - 1);
  }
  function getCurrentLocation() {
    return entries[index];
  }
  function createMemoryLocation(to, state = null, key) {
    let location = createLocation(
      entries ? getCurrentLocation().pathname : "/",
      to,
      state,
      key
    );
    warning(
      location.pathname.charAt(0) === "/",
      `relative pathnames are not supported in memory history: ${JSON.stringify(
        to
      )}`
    );
    return location;
  }
  function createHref2(to) {
    return typeof to === "string" ? to : createPath(to);
  }
  let history = {
    get index() {
      return index;
    },
    get action() {
      return action;
    },
    get location() {
      return getCurrentLocation();
    },
    createHref: createHref2,
    createURL(to) {
      return new URL(createHref2(to), "http://localhost");
    },
    encodeLocation(to) {
      let path = typeof to === "string" ? parsePath(to) : to;
      return {
        pathname: path.pathname || "",
        search: path.search || "",
        hash: path.hash || ""
      };
    },
    push(to, state) {
      action = "PUSH";
      let nextLocation = createMemoryLocation(to, state);
      index += 1;
      entries.splice(index, entries.length, nextLocation);
      if (v5Compat && listener) {
        listener({ action, location: nextLocation, delta: 1 });
      }
    },
    replace(to, state) {
      action = "REPLACE";
      let nextLocation = createMemoryLocation(to, state);
      entries[index] = nextLocation;
      if (v5Compat && listener) {
        listener({ action, location: nextLocation, delta: 0 });
      }
    },
    go(delta) {
      action = "POP";
      let nextIndex = clampIndex(index + delta);
      let nextLocation = entries[nextIndex];
      index = nextIndex;
      if (listener) {
        listener({ action, location: nextLocation, delta });
      }
    },
    listen(fn) {
      listener = fn;
      return () => {
        listener = null;
      };
    }
  };
  return history;
}
function invariant(value, message) {
  if (value === false || value === null || typeof value === "undefined") {
    throw new Error(message);
  }
}
function warning(cond, message) {
  if (!cond) {
    if (typeof console !== "undefined") console.warn(message);
    try {
      throw new Error(message);
    } catch (e) {
    }
  }
}
function createKey() {
  return Math.random().toString(36).substring(2, 10);
}
function createLocation(current, to, state = null, key) {
  let location = {
    pathname: typeof current === "string" ? current : current.pathname,
    search: "",
    hash: "",
    ...typeof to === "string" ? parsePath(to) : to,
    state,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: to && to.key || key || createKey()
  };
  return location;
}
function createPath({
  pathname = "/",
  search = "",
  hash = ""
}) {
  if (search && search !== "?")
    pathname += search.charAt(0) === "?" ? search : "?" + search;
  if (hash && hash !== "#")
    pathname += hash.charAt(0) === "#" ? hash : "#" + hash;
  return pathname;
}
function parsePath(path) {
  let parsedPath = {};
  if (path) {
    let hashIndex = path.indexOf("#");
    if (hashIndex >= 0) {
      parsedPath.hash = path.substring(hashIndex);
      path = path.substring(0, hashIndex);
    }
    let searchIndex = path.indexOf("?");
    if (searchIndex >= 0) {
      parsedPath.search = path.substring(searchIndex);
      path = path.substring(0, searchIndex);
    }
    if (path) {
      parsedPath.pathname = path;
    }
  }
  return parsedPath;
}
function createBrowserURLImpl(to, isAbsolute = false) {
  let base = "http://localhost";
  if (typeof window !== "undefined") {
    base = window.location.origin !== "null" ? window.location.origin : window.location.href;
  }
  invariant(base, "No window.location.(origin|href) available to create URL");
  let href = typeof to === "string" ? to : createPath(to);
  href = href.replace(/ $/, "%20");
  if (!isAbsolute && href.startsWith("//")) {
    href = base + href;
  }
  return new URL(href, base);
}
var _map;
var RouterContextProvider = class {
  /**
   * Create a new `RouterContextProvider` instance
   * @param init An optional initial context map to populate the provider with
   */
  constructor(init) {
    __privateAdd(this, _map, /* @__PURE__ */ new Map());
    if (init) {
      for (let [context, value] of init) {
        this.set(context, value);
      }
    }
  }
  /**
   * Access a value from the context. If no value has been set for the context,
   * it will return the context's `defaultValue` if provided, or throw an error
   * if no `defaultValue` was set.
   * @param context The context to get the value for
   * @returns The value for the context, or the context's `defaultValue` if no
   * value was set
   */
  get(context) {
    if (__privateGet(this, _map).has(context)) {
      return __privateGet(this, _map).get(context);
    }
    if (context.defaultValue !== void 0) {
      return context.defaultValue;
    }
    throw new Error("No value found for context");
  }
  /**
   * Set a value for the context. If the context already has a value set, this
   * will overwrite it.
   *
   * @param context The context to set the value for
   * @param value The value to set for the context
   * @returns {void}
   */
  set(context, value) {
    __privateGet(this, _map).set(context, value);
  }
};
_map = /* @__PURE__ */ new WeakMap();
var unsupportedLazyRouteObjectKeys = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "children"
]);
function isUnsupportedLazyRouteObjectKey(key) {
  return unsupportedLazyRouteObjectKeys.has(
    key
  );
}
var unsupportedLazyRouteFunctionKeys = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "middleware",
  "children"
]);
function isUnsupportedLazyRouteFunctionKey(key) {
  return unsupportedLazyRouteFunctionKeys.has(
    key
  );
}
function isIndexRoute(route) {
  return route.index === true;
}
function convertRoutesToDataRoutes(routes2, mapRouteProperties2, parentPath = [], manifest = {}, allowInPlaceMutations = false) {
  return routes2.map((route, index) => {
    let treePath = [...parentPath, String(index)];
    let id = typeof route.id === "string" ? route.id : treePath.join("-");
    invariant(
      route.index !== true || !route.children,
      `Cannot specify children on an index route`
    );
    invariant(
      allowInPlaceMutations || !manifest[id],
      `Found a route id collision on id "${id}".  Route id's must be globally unique within Data Router usages`
    );
    if (isIndexRoute(route)) {
      let indexRoute = {
        ...route,
        id
      };
      manifest[id] = mergeRouteUpdates(
        indexRoute,
        mapRouteProperties2(indexRoute)
      );
      return indexRoute;
    } else {
      let pathOrLayoutRoute = {
        ...route,
        id,
        children: void 0
      };
      manifest[id] = mergeRouteUpdates(
        pathOrLayoutRoute,
        mapRouteProperties2(pathOrLayoutRoute)
      );
      if (route.children) {
        pathOrLayoutRoute.children = convertRoutesToDataRoutes(
          route.children,
          mapRouteProperties2,
          treePath,
          manifest,
          allowInPlaceMutations
        );
      }
      return pathOrLayoutRoute;
    }
  });
}
function mergeRouteUpdates(route, updates) {
  return Object.assign(route, {
    ...updates,
    ...typeof updates.lazy === "object" && updates.lazy != null ? {
      lazy: {
        ...route.lazy,
        ...updates.lazy
      }
    } : {}
  });
}
function matchRoutes(routes2, locationArg, basename = "/") {
  return matchRoutesImpl(routes2, locationArg, basename, false);
}
function matchRoutesImpl(routes2, locationArg, basename, allowPartial) {
  let location = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
  let pathname = stripBasename(location.pathname || "/", basename);
  if (pathname == null) {
    return null;
  }
  let branches = flattenRoutes(routes2);
  rankRouteBranches(branches);
  let matches = null;
  for (let i = 0; matches == null && i < branches.length; ++i) {
    let decoded = decodePath(pathname);
    matches = matchRouteBranch(
      branches[i],
      decoded,
      allowPartial
    );
  }
  return matches;
}
function convertRouteMatchToUiMatch(match, loaderData) {
  let { route, pathname, params } = match;
  return {
    id: route.id,
    pathname,
    params,
    data: loaderData[route.id],
    loaderData: loaderData[route.id],
    handle: route.handle
  };
}
function flattenRoutes(routes2, branches = [], parentsMeta = [], parentPath = "", _hasParentOptionalSegments = false) {
  let flattenRoute = (route, index, hasParentOptionalSegments = _hasParentOptionalSegments, relativePath) => {
    let meta = {
      relativePath: relativePath === void 0 ? route.path || "" : relativePath,
      caseSensitive: route.caseSensitive === true,
      childrenIndex: index,
      route
    };
    if (meta.relativePath.startsWith("/")) {
      if (!meta.relativePath.startsWith(parentPath) && hasParentOptionalSegments) {
        return;
      }
      invariant(
        meta.relativePath.startsWith(parentPath),
        `Absolute route path "${meta.relativePath}" nested under path "${parentPath}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      );
      meta.relativePath = meta.relativePath.slice(parentPath.length);
    }
    let path = joinPaths([parentPath, meta.relativePath]);
    let routesMeta = parentsMeta.concat(meta);
    if (route.children && route.children.length > 0) {
      invariant(
        // Our types know better, but runtime JS may not!
        // @ts-expect-error
        route.index !== true,
        `Index routes must not have child routes. Please remove all child routes from route path "${path}".`
      );
      flattenRoutes(
        route.children,
        branches,
        routesMeta,
        path,
        hasParentOptionalSegments
      );
    }
    if (route.path == null && !route.index) {
      return;
    }
    branches.push({
      path,
      score: computeScore(path, route.index),
      routesMeta
    });
  };
  routes2.forEach((route, index) => {
    if (route.path === "" || !route.path?.includes("?")) {
      flattenRoute(route, index);
    } else {
      for (let exploded of explodeOptionalSegments(route.path)) {
        flattenRoute(route, index, true, exploded);
      }
    }
  });
  return branches;
}
function explodeOptionalSegments(path) {
  let segments = path.split("/");
  if (segments.length === 0) return [];
  let [first, ...rest] = segments;
  let isOptional = first.endsWith("?");
  let required = first.replace(/\?$/, "");
  if (rest.length === 0) {
    return isOptional ? [required, ""] : [required];
  }
  let restExploded = explodeOptionalSegments(rest.join("/"));
  let result = [];
  result.push(
    ...restExploded.map(
      (subpath) => subpath === "" ? required : [required, subpath].join("/")
    )
  );
  if (isOptional) {
    result.push(...restExploded);
  }
  return result.map(
    (exploded) => path.startsWith("/") && exploded === "" ? "/" : exploded
  );
}
function rankRouteBranches(branches) {
  branches.sort(
    (a, b) => a.score !== b.score ? b.score - a.score : compareIndexes(
      a.routesMeta.map((meta) => meta.childrenIndex),
      b.routesMeta.map((meta) => meta.childrenIndex)
    )
  );
}
var paramRe = /^:[\w-]+$/;
var dynamicSegmentValue = 3;
var indexRouteValue = 2;
var emptySegmentValue = 1;
var staticSegmentValue = 10;
var splatPenalty = -2;
var isSplat = (s) => s === "*";
function computeScore(path, index) {
  let segments = path.split("/");
  let initialScore = segments.length;
  if (segments.some(isSplat)) {
    initialScore += splatPenalty;
  }
  if (index) {
    initialScore += indexRouteValue;
  }
  return segments.filter((s) => !isSplat(s)).reduce(
    (score, segment) => score + (paramRe.test(segment) ? dynamicSegmentValue : segment === "" ? emptySegmentValue : staticSegmentValue),
    initialScore
  );
}
function compareIndexes(a, b) {
  let siblings = a.length === b.length && a.slice(0, -1).every((n, i) => n === b[i]);
  return siblings ? (
    // If two routes are siblings, we should try to match the earlier sibling
    // first. This allows people to have fine-grained control over the matching
    // behavior by simply putting routes with identical paths in the order they
    // want them tried.
    a[a.length - 1] - b[b.length - 1]
  ) : (
    // Otherwise, it doesn't really make sense to rank non-siblings by index,
    // so they sort equally.
    0
  );
}
function matchRouteBranch(branch, pathname, allowPartial = false) {
  let { routesMeta } = branch;
  let matchedParams = {};
  let matchedPathname = "/";
  let matches = [];
  for (let i = 0; i < routesMeta.length; ++i) {
    let meta = routesMeta[i];
    let end = i === routesMeta.length - 1;
    let remainingPathname = matchedPathname === "/" ? pathname : pathname.slice(matchedPathname.length) || "/";
    let match = matchPath(
      { path: meta.relativePath, caseSensitive: meta.caseSensitive, end },
      remainingPathname
    );
    let route = meta.route;
    if (!match && end && allowPartial && !routesMeta[routesMeta.length - 1].route.index) {
      match = matchPath(
        {
          path: meta.relativePath,
          caseSensitive: meta.caseSensitive,
          end: false
        },
        remainingPathname
      );
    }
    if (!match) {
      return null;
    }
    Object.assign(matchedParams, match.params);
    matches.push({
      // TODO: Can this as be avoided?
      params: matchedParams,
      pathname: joinPaths([matchedPathname, match.pathname]),
      pathnameBase: normalizePathname(
        joinPaths([matchedPathname, match.pathnameBase])
      ),
      route
    });
    if (match.pathnameBase !== "/") {
      matchedPathname = joinPaths([matchedPathname, match.pathnameBase]);
    }
  }
  return matches;
}
function matchPath(pattern, pathname) {
  if (typeof pattern === "string") {
    pattern = { path: pattern, caseSensitive: false, end: true };
  }
  let [matcher, compiledParams] = compilePath(
    pattern.path,
    pattern.caseSensitive,
    pattern.end
  );
  let match = pathname.match(matcher);
  if (!match) return null;
  let matchedPathname = match[0];
  let pathnameBase = matchedPathname.replace(/(.)\/+$/, "$1");
  let captureGroups = match.slice(1);
  let params = compiledParams.reduce(
    (memo2, { paramName, isOptional }, index) => {
      if (paramName === "*") {
        let splatValue = captureGroups[index] || "";
        pathnameBase = matchedPathname.slice(0, matchedPathname.length - splatValue.length).replace(/(.)\/+$/, "$1");
      }
      const value = captureGroups[index];
      if (isOptional && !value) {
        memo2[paramName] = void 0;
      } else {
        memo2[paramName] = (value || "").replace(/%2F/g, "/");
      }
      return memo2;
    },
    {}
  );
  return {
    params,
    pathname: matchedPathname,
    pathnameBase,
    pattern
  };
}
function compilePath(path, caseSensitive = false, end = true) {
  warning(
    path === "*" || !path.endsWith("*") || path.endsWith("/*"),
    `Route path "${path}" will be treated as if it were "${path.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${path.replace(/\*$/, "/*")}".`
  );
  let params = [];
  let regexpSource = "^" + path.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(
    /\/:([\w-]+)(\?)?/g,
    (_, paramName, isOptional) => {
      params.push({ paramName, isOptional: isOptional != null });
      return isOptional ? "/?([^\\/]+)?" : "/([^\\/]+)";
    }
  ).replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
  if (path.endsWith("*")) {
    params.push({ paramName: "*" });
    regexpSource += path === "*" || path === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$";
  } else if (end) {
    regexpSource += "\\/*$";
  } else if (path !== "" && path !== "/") {
    regexpSource += "(?:(?=\\/|$))";
  } else ;
  let matcher = new RegExp(regexpSource, caseSensitive ? void 0 : "i");
  return [matcher, params];
}
function decodePath(value) {
  try {
    return value.split("/").map((v) => decodeURIComponent(v).replace(/\//g, "%2F")).join("/");
  } catch (error) {
    warning(
      false,
      `The URL path "${value}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${error}).`
    );
    return value;
  }
}
function stripBasename(pathname, basename) {
  if (basename === "/") return pathname;
  if (!pathname.toLowerCase().startsWith(basename.toLowerCase())) {
    return null;
  }
  let startIndex = basename.endsWith("/") ? basename.length - 1 : basename.length;
  let nextChar = pathname.charAt(startIndex);
  if (nextChar && nextChar !== "/") {
    return null;
  }
  return pathname.slice(startIndex) || "/";
}
function prependBasename({
  basename,
  pathname
}) {
  return pathname === "/" ? basename : joinPaths([basename, pathname]);
}
var ABSOLUTE_URL_REGEX = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
var isAbsoluteUrl = (url) => ABSOLUTE_URL_REGEX.test(url);
function resolvePath(to, fromPathname = "/") {
  let {
    pathname: toPathname,
    search = "",
    hash = ""
  } = typeof to === "string" ? parsePath(to) : to;
  let pathname;
  if (toPathname) {
    if (isAbsoluteUrl(toPathname)) {
      pathname = toPathname;
    } else {
      if (toPathname.includes("//")) {
        let oldPathname = toPathname;
        toPathname = toPathname.replace(/\/\/+/g, "/");
        warning(
          false,
          `Pathnames cannot have embedded double slashes - normalizing ${oldPathname} -> ${toPathname}`
        );
      }
      if (toPathname.startsWith("/")) {
        pathname = resolvePathname(toPathname.substring(1), "/");
      } else {
        pathname = resolvePathname(toPathname, fromPathname);
      }
    }
  } else {
    pathname = fromPathname;
  }
  return {
    pathname,
    search: normalizeSearch(search),
    hash: normalizeHash(hash)
  };
}
function resolvePathname(relativePath, fromPathname) {
  let segments = fromPathname.replace(/\/+$/, "").split("/");
  let relativeSegments = relativePath.split("/");
  relativeSegments.forEach((segment) => {
    if (segment === "..") {
      if (segments.length > 1) segments.pop();
    } else if (segment !== ".") {
      segments.push(segment);
    }
  });
  return segments.length > 1 ? segments.join("/") : "/";
}
function getInvalidPathError(char, field, dest, path) {
  return `Cannot include a '${char}' character in a manually specified \`to.${field}\` field [${JSON.stringify(
    path
  )}].  Please separate it out to the \`to.${dest}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function getPathContributingMatches(matches) {
  return matches.filter(
    (match, index) => index === 0 || match.route.path && match.route.path.length > 0
  );
}
function getResolveToMatches(matches) {
  let pathMatches = getPathContributingMatches(matches);
  return pathMatches.map(
    (match, idx) => idx === pathMatches.length - 1 ? match.pathname : match.pathnameBase
  );
}
function resolveTo(toArg, routePathnames, locationPathname, isPathRelative = false) {
  let to;
  if (typeof toArg === "string") {
    to = parsePath(toArg);
  } else {
    to = { ...toArg };
    invariant(
      !to.pathname || !to.pathname.includes("?"),
      getInvalidPathError("?", "pathname", "search", to)
    );
    invariant(
      !to.pathname || !to.pathname.includes("#"),
      getInvalidPathError("#", "pathname", "hash", to)
    );
    invariant(
      !to.search || !to.search.includes("#"),
      getInvalidPathError("#", "search", "hash", to)
    );
  }
  let isEmptyPath = toArg === "" || to.pathname === "";
  let toPathname = isEmptyPath ? "/" : to.pathname;
  let from;
  if (toPathname == null) {
    from = locationPathname;
  } else {
    let routePathnameIndex = routePathnames.length - 1;
    if (!isPathRelative && toPathname.startsWith("..")) {
      let toSegments = toPathname.split("/");
      while (toSegments[0] === "..") {
        toSegments.shift();
        routePathnameIndex -= 1;
      }
      to.pathname = toSegments.join("/");
    }
    from = routePathnameIndex >= 0 ? routePathnames[routePathnameIndex] : "/";
  }
  let path = resolvePath(to, from);
  let hasExplicitTrailingSlash = toPathname && toPathname !== "/" && toPathname.endsWith("/");
  let hasCurrentTrailingSlash = (isEmptyPath || toPathname === ".") && locationPathname.endsWith("/");
  if (!path.pathname.endsWith("/") && (hasExplicitTrailingSlash || hasCurrentTrailingSlash)) {
    path.pathname += "/";
  }
  return path;
}
var joinPaths = (paths) => paths.join("/").replace(/\/\/+/g, "/");
var normalizePathname = (pathname) => pathname.replace(/\/+$/, "").replace(/^\/*/, "/");
var normalizeSearch = (search) => !search || search === "?" ? "" : search.startsWith("?") ? search : "?" + search;
var normalizeHash = (hash) => !hash || hash === "#" ? "" : hash.startsWith("#") ? hash : "#" + hash;
var ErrorResponseImpl = class {
  constructor(status, statusText, data2, internal = false) {
    this.status = status;
    this.statusText = statusText || "";
    this.internal = internal;
    if (data2 instanceof Error) {
      this.data = data2.toString();
      this.error = data2;
    } else {
      this.data = data2;
    }
  }
};
function isRouteErrorResponse(error) {
  return error != null && typeof error.status === "number" && typeof error.statusText === "string" && typeof error.internal === "boolean" && "data" in error;
}
function getRoutePattern(matches) {
  return matches.map((m) => m.route.path).filter(Boolean).join("/").replace(/\/\/*/g, "/") || "/";
}
var isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
function parseToInfo(_to, basename) {
  let to = _to;
  if (typeof to !== "string" || !ABSOLUTE_URL_REGEX.test(to)) {
    return {
      absoluteURL: void 0,
      isExternal: false,
      to
    };
  }
  let absoluteURL = to;
  let isExternal = false;
  if (isBrowser) {
    try {
      let currentUrl = new URL(window.location.href);
      let targetUrl = to.startsWith("//") ? new URL(currentUrl.protocol + to) : new URL(to);
      let path = stripBasename(targetUrl.pathname, basename);
      if (targetUrl.origin === currentUrl.origin && path != null) {
        to = path + targetUrl.search + targetUrl.hash;
      } else {
        isExternal = true;
      }
    } catch (e) {
      warning(
        false,
        `<Link to="${to}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
      );
    }
  }
  return {
    absoluteURL,
    isExternal,
    to
  };
}
var UninstrumentedSymbol = Symbol("Uninstrumented");
function getRouteInstrumentationUpdates(fns, route) {
  let aggregated = {
    lazy: [],
    "lazy.loader": [],
    "lazy.action": [],
    "lazy.middleware": [],
    middleware: [],
    loader: [],
    action: []
  };
  fns.forEach(
    (fn) => fn({
      id: route.id,
      index: route.index,
      path: route.path,
      instrument(i) {
        let keys = Object.keys(aggregated);
        for (let key of keys) {
          if (i[key]) {
            aggregated[key].push(i[key]);
          }
        }
      }
    })
  );
  let updates = {};
  if (typeof route.lazy === "function" && aggregated.lazy.length > 0) {
    let instrumented = wrapImpl(aggregated.lazy, route.lazy, () => void 0);
    if (instrumented) {
      updates.lazy = instrumented;
    }
  }
  if (typeof route.lazy === "object") {
    let lazyObject = route.lazy;
    ["middleware", "loader", "action"].forEach((key) => {
      let lazyFn = lazyObject[key];
      let instrumentations = aggregated[`lazy.${key}`];
      if (typeof lazyFn === "function" && instrumentations.length > 0) {
        let instrumented = wrapImpl(instrumentations, lazyFn, () => void 0);
        if (instrumented) {
          updates.lazy = Object.assign(updates.lazy || {}, {
            [key]: instrumented
          });
        }
      }
    });
  }
  ["loader", "action"].forEach((key) => {
    let handler = route[key];
    if (typeof handler === "function" && aggregated[key].length > 0) {
      let original = handler[UninstrumentedSymbol] ?? handler;
      let instrumented = wrapImpl(
        aggregated[key],
        original,
        (...args) => getHandlerInfo(args[0])
      );
      if (instrumented) {
        instrumented[UninstrumentedSymbol] = original;
        updates[key] = instrumented;
      }
    }
  });
  if (route.middleware && route.middleware.length > 0 && aggregated.middleware.length > 0) {
    updates.middleware = route.middleware.map((middleware) => {
      let original = middleware[UninstrumentedSymbol] ?? middleware;
      let instrumented = wrapImpl(
        aggregated.middleware,
        original,
        (...args) => getHandlerInfo(args[0])
      );
      if (instrumented) {
        instrumented[UninstrumentedSymbol] = original;
        return instrumented;
      }
      return middleware;
    });
  }
  return updates;
}
function instrumentClientSideRouter(router, fns) {
  let aggregated = {
    navigate: [],
    fetch: []
  };
  fns.forEach(
    (fn) => fn({
      instrument(i) {
        let keys = Object.keys(i);
        for (let key of keys) {
          if (i[key]) {
            aggregated[key].push(i[key]);
          }
        }
      }
    })
  );
  if (aggregated.navigate.length > 0) {
    let navigate = router.navigate[UninstrumentedSymbol] ?? router.navigate;
    let instrumentedNavigate = wrapImpl(
      aggregated.navigate,
      navigate,
      (...args) => {
        let [to, opts] = args;
        return {
          to: typeof to === "number" || typeof to === "string" ? to : to ? createPath(to) : ".",
          ...getRouterInfo(router, opts ?? {})
        };
      }
    );
    if (instrumentedNavigate) {
      instrumentedNavigate[UninstrumentedSymbol] = navigate;
      router.navigate = instrumentedNavigate;
    }
  }
  if (aggregated.fetch.length > 0) {
    let fetch2 = router.fetch[UninstrumentedSymbol] ?? router.fetch;
    let instrumentedFetch = wrapImpl(aggregated.fetch, fetch2, (...args) => {
      let [key, , href, opts] = args;
      return {
        href: href ?? ".",
        fetcherKey: key,
        ...getRouterInfo(router, opts ?? {})
      };
    });
    if (instrumentedFetch) {
      instrumentedFetch[UninstrumentedSymbol] = fetch2;
      router.fetch = instrumentedFetch;
    }
  }
  return router;
}
function wrapImpl(impls, handler, getInfo) {
  if (impls.length === 0) {
    return null;
  }
  return async (...args) => {
    let result = await recurseRight(
      impls,
      getInfo(...args),
      () => handler(...args),
      impls.length - 1
    );
    if (result.type === "error") {
      throw result.value;
    }
    return result.value;
  };
}
async function recurseRight(impls, info, handler, index) {
  let impl = impls[index];
  let result;
  if (!impl) {
    try {
      let value = await handler();
      result = { type: "success", value };
    } catch (e) {
      result = { type: "error", value: e };
    }
  } else {
    let handlerPromise = void 0;
    let callHandler = async () => {
      if (handlerPromise) {
        console.error("You cannot call instrumented handlers more than once");
      } else {
        handlerPromise = recurseRight(impls, info, handler, index - 1);
      }
      result = await handlerPromise;
      invariant(result, "Expected a result");
      if (result.type === "error" && result.value instanceof Error) {
        return { status: "error", error: result.value };
      }
      return { status: "success", error: void 0 };
    };
    try {
      await impl(callHandler, info);
    } catch (e) {
      console.error("An instrumentation function threw an error:", e);
    }
    if (!handlerPromise) {
      await callHandler();
    }
    await handlerPromise;
  }
  if (result) {
    return result;
  }
  return {
    type: "error",
    value: new Error("No result assigned in instrumentation chain.")
  };
}
function getHandlerInfo(args) {
  let { request, context, params, unstable_pattern } = args;
  return {
    request: getReadonlyRequest(request),
    params: { ...params },
    unstable_pattern,
    context: getReadonlyContext(context)
  };
}
function getRouterInfo(router, opts) {
  return {
    currentUrl: createPath(router.state.location),
    ..."formMethod" in opts ? { formMethod: opts.formMethod } : {},
    ..."formEncType" in opts ? { formEncType: opts.formEncType } : {},
    ..."formData" in opts ? { formData: opts.formData } : {},
    ..."body" in opts ? { body: opts.body } : {}
  };
}
function getReadonlyRequest(request) {
  return {
    method: request.method,
    url: request.url,
    headers: {
      get: (...args) => request.headers.get(...args)
    }
  };
}
function getReadonlyContext(context) {
  if (isPlainObject(context)) {
    let frozen = { ...context };
    Object.freeze(frozen);
    return frozen;
  } else {
    return {
      get: (ctx) => context.get(ctx)
    };
  }
}
var objectProtoNames = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function isPlainObject(thing) {
  if (thing === null || typeof thing !== "object") {
    return false;
  }
  const proto = Object.getPrototypeOf(thing);
  return proto === Object.prototype || proto === null || Object.getOwnPropertyNames(proto).sort().join("\0") === objectProtoNames;
}
var validMutationMethodsArr = [
  "POST",
  "PUT",
  "PATCH",
  "DELETE"
];
var validMutationMethods = new Set(
  validMutationMethodsArr
);
var validRequestMethodsArr = [
  "GET",
  ...validMutationMethodsArr
];
var validRequestMethods = new Set(validRequestMethodsArr);
var redirectStatusCodes = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
var redirectPreserveMethodStatusCodes = /* @__PURE__ */ new Set([307, 308]);
var IDLE_NAVIGATION = {
  state: "idle",
  location: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
};
var IDLE_FETCHER = {
  state: "idle",
  data: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
};
var IDLE_BLOCKER = {
  state: "unblocked",
  proceed: void 0,
  reset: void 0,
  location: void 0
};
var defaultMapRouteProperties = (route) => ({
  hasErrorBoundary: Boolean(route.hasErrorBoundary)
});
var TRANSITIONS_STORAGE_KEY = "remix-router-transitions";
var ResetLoaderDataSymbol = Symbol("ResetLoaderData");
function createRouter(init) {
  const routerWindow = init.window ? init.window : typeof window !== "undefined" ? window : void 0;
  const isBrowser3 = typeof routerWindow !== "undefined" && typeof routerWindow.document !== "undefined" && typeof routerWindow.document.createElement !== "undefined";
  invariant(
    init.routes.length > 0,
    "You must provide a non-empty routes array to createRouter"
  );
  let hydrationRouteProperties2 = init.hydrationRouteProperties || [];
  let _mapRouteProperties = init.mapRouteProperties || defaultMapRouteProperties;
  let mapRouteProperties2 = _mapRouteProperties;
  if (init.unstable_instrumentations) {
    let instrumentations = init.unstable_instrumentations;
    mapRouteProperties2 = (route) => {
      return {
        ..._mapRouteProperties(route),
        ...getRouteInstrumentationUpdates(
          instrumentations.map((i) => i.route).filter(Boolean),
          route
        )
      };
    };
  }
  let manifest = {};
  let dataRoutes = convertRoutesToDataRoutes(
    init.routes,
    mapRouteProperties2,
    void 0,
    manifest
  );
  let inFlightDataRoutes;
  let basename = init.basename || "/";
  if (!basename.startsWith("/")) {
    basename = `/${basename}`;
  }
  let dataStrategyImpl = init.dataStrategy || defaultDataStrategyWithMiddleware;
  let future = {
    ...init.future
  };
  let unlistenHistory = null;
  let subscribers = /* @__PURE__ */ new Set();
  let savedScrollPositions2 = null;
  let getScrollRestorationKey2 = null;
  let getScrollPosition = null;
  let initialScrollRestored = init.hydrationData != null;
  let initialMatches = matchRoutes(dataRoutes, init.history.location, basename);
  let initialMatchesIsFOW = false;
  let initialErrors = null;
  let initialized;
  if (initialMatches == null && !init.patchRoutesOnNavigation) {
    let error = getInternalRouterError(404, {
      pathname: init.history.location.pathname
    });
    let { matches, route } = getShortCircuitMatches(dataRoutes);
    initialized = true;
    initialMatches = matches;
    initialErrors = { [route.id]: error };
  } else {
    if (initialMatches && !init.hydrationData) {
      let fogOfWar = checkFogOfWar(
        initialMatches,
        dataRoutes,
        init.history.location.pathname
      );
      if (fogOfWar.active) {
        initialMatches = null;
      }
    }
    if (!initialMatches) {
      initialized = false;
      initialMatches = [];
      let fogOfWar = checkFogOfWar(
        null,
        dataRoutes,
        init.history.location.pathname
      );
      if (fogOfWar.active && fogOfWar.matches) {
        initialMatchesIsFOW = true;
        initialMatches = fogOfWar.matches;
      }
    } else if (initialMatches.some((m) => m.route.lazy)) {
      initialized = false;
    } else if (!initialMatches.some((m) => routeHasLoaderOrMiddleware(m.route))) {
      initialized = true;
    } else {
      let loaderData = init.hydrationData ? init.hydrationData.loaderData : null;
      let errors = init.hydrationData ? init.hydrationData.errors : null;
      if (errors) {
        let idx = initialMatches.findIndex(
          (m) => errors[m.route.id] !== void 0
        );
        initialized = initialMatches.slice(0, idx + 1).every(
          (m) => !shouldLoadRouteOnHydration(m.route, loaderData, errors)
        );
      } else {
        initialized = initialMatches.every(
          (m) => !shouldLoadRouteOnHydration(m.route, loaderData, errors)
        );
      }
    }
  }
  let router;
  let state = {
    historyAction: init.history.action,
    location: init.history.location,
    matches: initialMatches,
    initialized,
    navigation: IDLE_NAVIGATION,
    // Don't restore on initial updateState() if we were SSR'd
    restoreScrollPosition: init.hydrationData != null ? false : null,
    preventScrollReset: false,
    revalidation: "idle",
    loaderData: init.hydrationData && init.hydrationData.loaderData || {},
    actionData: init.hydrationData && init.hydrationData.actionData || null,
    errors: init.hydrationData && init.hydrationData.errors || initialErrors,
    fetchers: /* @__PURE__ */ new Map(),
    blockers: /* @__PURE__ */ new Map()
  };
  let pendingAction = "POP";
  let pendingPopstateNavigationDfd = null;
  let pendingPreventScrollReset = false;
  let pendingNavigationController;
  let pendingViewTransitionEnabled = false;
  let appliedViewTransitions = /* @__PURE__ */ new Map();
  let removePageHideEventListener = null;
  let isUninterruptedRevalidation = false;
  let isRevalidationRequired = false;
  let cancelledFetcherLoads = /* @__PURE__ */ new Set();
  let fetchControllers = /* @__PURE__ */ new Map();
  let incrementingLoadId = 0;
  let pendingNavigationLoadId = -1;
  let fetchReloadIds = /* @__PURE__ */ new Map();
  let fetchRedirectIds = /* @__PURE__ */ new Set();
  let fetchLoadMatches = /* @__PURE__ */ new Map();
  let activeFetchers = /* @__PURE__ */ new Map();
  let fetchersQueuedForDeletion = /* @__PURE__ */ new Set();
  let blockerFunctions = /* @__PURE__ */ new Map();
  let unblockBlockerHistoryUpdate = void 0;
  let pendingRevalidationDfd = null;
  function initialize() {
    unlistenHistory = init.history.listen(
      ({ action: historyAction, location, delta }) => {
        if (unblockBlockerHistoryUpdate) {
          unblockBlockerHistoryUpdate();
          unblockBlockerHistoryUpdate = void 0;
          return;
        }
        warning(
          blockerFunctions.size === 0 || delta != null,
          "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL."
        );
        let blockerKey = shouldBlockNavigation({
          currentLocation: state.location,
          nextLocation: location,
          historyAction
        });
        if (blockerKey && delta != null) {
          let nextHistoryUpdatePromise = new Promise((resolve) => {
            unblockBlockerHistoryUpdate = resolve;
          });
          init.history.go(delta * -1);
          updateBlocker(blockerKey, {
            state: "blocked",
            location,
            proceed() {
              updateBlocker(blockerKey, {
                state: "proceeding",
                proceed: void 0,
                reset: void 0,
                location
              });
              nextHistoryUpdatePromise.then(() => init.history.go(delta));
            },
            reset() {
              let blockers = new Map(state.blockers);
              blockers.set(blockerKey, IDLE_BLOCKER);
              updateState({ blockers });
            }
          });
          pendingPopstateNavigationDfd?.resolve();
          pendingPopstateNavigationDfd = null;
          return;
        }
        return startNavigation(historyAction, location);
      }
    );
    if (isBrowser3) {
      restoreAppliedTransitions(routerWindow, appliedViewTransitions);
      let _saveAppliedTransitions = () => persistAppliedTransitions(routerWindow, appliedViewTransitions);
      routerWindow.addEventListener("pagehide", _saveAppliedTransitions);
      removePageHideEventListener = () => routerWindow.removeEventListener("pagehide", _saveAppliedTransitions);
    }
    if (!state.initialized) {
      startNavigation("POP", state.location, {
        initialHydration: true
      });
    }
    return router;
  }
  function dispose() {
    if (unlistenHistory) {
      unlistenHistory();
    }
    if (removePageHideEventListener) {
      removePageHideEventListener();
    }
    subscribers.clear();
    pendingNavigationController && pendingNavigationController.abort();
    state.fetchers.forEach((_, key) => deleteFetcher(key));
    state.blockers.forEach((_, key) => deleteBlocker(key));
  }
  function subscribe(fn) {
    subscribers.add(fn);
    return () => subscribers.delete(fn);
  }
  function updateState(newState, opts = {}) {
    if (newState.matches) {
      newState.matches = newState.matches.map((m) => {
        let route = manifest[m.route.id];
        let matchRoute = m.route;
        if (matchRoute.element !== route.element || matchRoute.errorElement !== route.errorElement || matchRoute.hydrateFallbackElement !== route.hydrateFallbackElement) {
          return {
            ...m,
            route
          };
        }
        return m;
      });
    }
    state = {
      ...state,
      ...newState
    };
    let unmountedFetchers = [];
    let mountedFetchers = [];
    state.fetchers.forEach((fetcher, key) => {
      if (fetcher.state === "idle") {
        if (fetchersQueuedForDeletion.has(key)) {
          unmountedFetchers.push(key);
        } else {
          mountedFetchers.push(key);
        }
      }
    });
    fetchersQueuedForDeletion.forEach((key) => {
      if (!state.fetchers.has(key) && !fetchControllers.has(key)) {
        unmountedFetchers.push(key);
      }
    });
    [...subscribers].forEach(
      (subscriber) => subscriber(state, {
        deletedFetchers: unmountedFetchers,
        newErrors: newState.errors ?? null,
        viewTransitionOpts: opts.viewTransitionOpts,
        flushSync: opts.flushSync === true
      })
    );
    unmountedFetchers.forEach((key) => deleteFetcher(key));
    mountedFetchers.forEach((key) => state.fetchers.delete(key));
  }
  function completeNavigation(location, newState, { flushSync } = {}) {
    let isActionReload = state.actionData != null && state.navigation.formMethod != null && isMutationMethod(state.navigation.formMethod) && state.navigation.state === "loading" && location.state?._isRedirect !== true;
    let actionData;
    if (newState.actionData) {
      if (Object.keys(newState.actionData).length > 0) {
        actionData = newState.actionData;
      } else {
        actionData = null;
      }
    } else if (isActionReload) {
      actionData = state.actionData;
    } else {
      actionData = null;
    }
    let loaderData = newState.loaderData ? mergeLoaderData(
      state.loaderData,
      newState.loaderData,
      newState.matches || [],
      newState.errors
    ) : state.loaderData;
    let blockers = state.blockers;
    if (blockers.size > 0) {
      blockers = new Map(blockers);
      blockers.forEach((_, k) => blockers.set(k, IDLE_BLOCKER));
    }
    let restoreScrollPosition = isUninterruptedRevalidation ? false : getSavedScrollPosition(location, newState.matches || state.matches);
    let preventScrollReset = pendingPreventScrollReset === true || state.navigation.formMethod != null && isMutationMethod(state.navigation.formMethod) && location.state?._isRedirect !== true;
    if (inFlightDataRoutes) {
      dataRoutes = inFlightDataRoutes;
      inFlightDataRoutes = void 0;
    }
    if (isUninterruptedRevalidation) ;
    else if (pendingAction === "POP") ;
    else if (pendingAction === "PUSH") {
      init.history.push(location, location.state);
    } else if (pendingAction === "REPLACE") {
      init.history.replace(location, location.state);
    }
    let viewTransitionOpts;
    if (pendingAction === "POP") {
      let priorPaths = appliedViewTransitions.get(state.location.pathname);
      if (priorPaths && priorPaths.has(location.pathname)) {
        viewTransitionOpts = {
          currentLocation: state.location,
          nextLocation: location
        };
      } else if (appliedViewTransitions.has(location.pathname)) {
        viewTransitionOpts = {
          currentLocation: location,
          nextLocation: state.location
        };
      }
    } else if (pendingViewTransitionEnabled) {
      let toPaths = appliedViewTransitions.get(state.location.pathname);
      if (toPaths) {
        toPaths.add(location.pathname);
      } else {
        toPaths = /* @__PURE__ */ new Set([location.pathname]);
        appliedViewTransitions.set(state.location.pathname, toPaths);
      }
      viewTransitionOpts = {
        currentLocation: state.location,
        nextLocation: location
      };
    }
    updateState(
      {
        ...newState,
        // matches, errors, fetchers go through as-is
        actionData,
        loaderData,
        historyAction: pendingAction,
        location,
        initialized: true,
        navigation: IDLE_NAVIGATION,
        revalidation: "idle",
        restoreScrollPosition,
        preventScrollReset,
        blockers
      },
      {
        viewTransitionOpts,
        flushSync: flushSync === true
      }
    );
    pendingAction = "POP";
    pendingPreventScrollReset = false;
    pendingViewTransitionEnabled = false;
    isUninterruptedRevalidation = false;
    isRevalidationRequired = false;
    pendingPopstateNavigationDfd?.resolve();
    pendingPopstateNavigationDfd = null;
    pendingRevalidationDfd?.resolve();
    pendingRevalidationDfd = null;
  }
  async function navigate(to, opts) {
    pendingPopstateNavigationDfd?.resolve();
    pendingPopstateNavigationDfd = null;
    if (typeof to === "number") {
      if (!pendingPopstateNavigationDfd) {
        pendingPopstateNavigationDfd = createDeferred();
      }
      let promise = pendingPopstateNavigationDfd.promise;
      init.history.go(to);
      return promise;
    }
    let normalizedPath = normalizeTo(
      state.location,
      state.matches,
      basename,
      to,
      opts?.fromRouteId,
      opts?.relative
    );
    let { path, submission, error } = normalizeNavigateOptions(
      false,
      normalizedPath,
      opts
    );
    let currentLocation = state.location;
    let nextLocation = createLocation(state.location, path, opts && opts.state);
    nextLocation = {
      ...nextLocation,
      ...init.history.encodeLocation(nextLocation)
    };
    let userReplace = opts && opts.replace != null ? opts.replace : void 0;
    let historyAction = "PUSH";
    if (userReplace === true) {
      historyAction = "REPLACE";
    } else if (userReplace === false) ;
    else if (submission != null && isMutationMethod(submission.formMethod) && submission.formAction === state.location.pathname + state.location.search) {
      historyAction = "REPLACE";
    }
    let preventScrollReset = opts && "preventScrollReset" in opts ? opts.preventScrollReset === true : void 0;
    let flushSync = (opts && opts.flushSync) === true;
    let blockerKey = shouldBlockNavigation({
      currentLocation,
      nextLocation,
      historyAction
    });
    if (blockerKey) {
      updateBlocker(blockerKey, {
        state: "blocked",
        location: nextLocation,
        proceed() {
          updateBlocker(blockerKey, {
            state: "proceeding",
            proceed: void 0,
            reset: void 0,
            location: nextLocation
          });
          navigate(to, opts);
        },
        reset() {
          let blockers = new Map(state.blockers);
          blockers.set(blockerKey, IDLE_BLOCKER);
          updateState({ blockers });
        }
      });
      return;
    }
    await startNavigation(historyAction, nextLocation, {
      submission,
      // Send through the formData serialization error if we have one so we can
      // render at the right error boundary after we match routes
      pendingError: error,
      preventScrollReset,
      replace: opts && opts.replace,
      enableViewTransition: opts && opts.viewTransition,
      flushSync,
      callSiteDefaultShouldRevalidate: opts && opts.unstable_defaultShouldRevalidate
    });
  }
  function revalidate() {
    if (!pendingRevalidationDfd) {
      pendingRevalidationDfd = createDeferred();
    }
    interruptActiveLoads();
    updateState({ revalidation: "loading" });
    let promise = pendingRevalidationDfd.promise;
    if (state.navigation.state === "submitting") {
      return promise;
    }
    if (state.navigation.state === "idle") {
      startNavigation(state.historyAction, state.location, {
        startUninterruptedRevalidation: true
      });
      return promise;
    }
    startNavigation(
      pendingAction || state.historyAction,
      state.navigation.location,
      {
        overrideNavigation: state.navigation,
        // Proxy through any rending view transition
        enableViewTransition: pendingViewTransitionEnabled === true
      }
    );
    return promise;
  }
  async function startNavigation(historyAction, location, opts) {
    pendingNavigationController && pendingNavigationController.abort();
    pendingNavigationController = null;
    pendingAction = historyAction;
    isUninterruptedRevalidation = (opts && opts.startUninterruptedRevalidation) === true;
    saveScrollPosition(state.location, state.matches);
    pendingPreventScrollReset = (opts && opts.preventScrollReset) === true;
    pendingViewTransitionEnabled = (opts && opts.enableViewTransition) === true;
    let routesToUse = inFlightDataRoutes || dataRoutes;
    let loadingNavigation = opts && opts.overrideNavigation;
    let matches = opts?.initialHydration && state.matches && state.matches.length > 0 && !initialMatchesIsFOW ? (
      // `matchRoutes()` has already been called if we're in here via `router.initialize()`
      state.matches
    ) : matchRoutes(routesToUse, location, basename);
    let flushSync = (opts && opts.flushSync) === true;
    if (matches && state.initialized && !isRevalidationRequired && isHashChangeOnly(state.location, location) && !(opts && opts.submission && isMutationMethod(opts.submission.formMethod))) {
      completeNavigation(location, { matches }, { flushSync });
      return;
    }
    let fogOfWar = checkFogOfWar(matches, routesToUse, location.pathname);
    if (fogOfWar.active && fogOfWar.matches) {
      matches = fogOfWar.matches;
    }
    if (!matches) {
      let { error, notFoundMatches, route } = handleNavigational404(
        location.pathname
      );
      completeNavigation(
        location,
        {
          matches: notFoundMatches,
          loaderData: {},
          errors: {
            [route.id]: error
          }
        },
        { flushSync }
      );
      return;
    }
    pendingNavigationController = new AbortController();
    let request = createClientSideRequest(
      init.history,
      location,
      pendingNavigationController.signal,
      opts && opts.submission
    );
    let scopedContext = init.getContext ? await init.getContext() : new RouterContextProvider();
    let pendingActionResult;
    if (opts && opts.pendingError) {
      pendingActionResult = [
        findNearestBoundary(matches).route.id,
        { type: "error", error: opts.pendingError }
      ];
    } else if (opts && opts.submission && isMutationMethod(opts.submission.formMethod)) {
      let actionResult = await handleAction(
        request,
        location,
        opts.submission,
        matches,
        scopedContext,
        fogOfWar.active,
        opts && opts.initialHydration === true,
        { replace: opts.replace, flushSync }
      );
      if (actionResult.shortCircuited) {
        return;
      }
      if (actionResult.pendingActionResult) {
        let [routeId, result] = actionResult.pendingActionResult;
        if (isErrorResult(result) && isRouteErrorResponse(result.error) && result.error.status === 404) {
          pendingNavigationController = null;
          completeNavigation(location, {
            matches: actionResult.matches,
            loaderData: {},
            errors: {
              [routeId]: result.error
            }
          });
          return;
        }
      }
      matches = actionResult.matches || matches;
      pendingActionResult = actionResult.pendingActionResult;
      loadingNavigation = getLoadingNavigation(location, opts.submission);
      flushSync = false;
      fogOfWar.active = false;
      request = createClientSideRequest(
        init.history,
        request.url,
        request.signal
      );
    }
    let {
      shortCircuited,
      matches: updatedMatches,
      loaderData,
      errors
    } = await handleLoaders(
      request,
      location,
      matches,
      scopedContext,
      fogOfWar.active,
      loadingNavigation,
      opts && opts.submission,
      opts && opts.fetcherSubmission,
      opts && opts.replace,
      opts && opts.initialHydration === true,
      flushSync,
      pendingActionResult,
      opts && opts.callSiteDefaultShouldRevalidate
    );
    if (shortCircuited) {
      return;
    }
    pendingNavigationController = null;
    completeNavigation(location, {
      matches: updatedMatches || matches,
      ...getActionDataForCommit(pendingActionResult),
      loaderData,
      errors
    });
  }
  async function handleAction(request, location, submission, matches, scopedContext, isFogOfWar, initialHydration, opts = {}) {
    interruptActiveLoads();
    let navigation = getSubmittingNavigation(location, submission);
    updateState({ navigation }, { flushSync: opts.flushSync === true });
    if (isFogOfWar) {
      let discoverResult = await discoverRoutes(
        matches,
        location.pathname,
        request.signal
      );
      if (discoverResult.type === "aborted") {
        return { shortCircuited: true };
      } else if (discoverResult.type === "error") {
        if (discoverResult.partialMatches.length === 0) {
          let { matches: matches2, route } = getShortCircuitMatches(dataRoutes);
          return {
            matches: matches2,
            pendingActionResult: [
              route.id,
              {
                type: "error",
                error: discoverResult.error
              }
            ]
          };
        }
        let boundaryId = findNearestBoundary(discoverResult.partialMatches).route.id;
        return {
          matches: discoverResult.partialMatches,
          pendingActionResult: [
            boundaryId,
            {
              type: "error",
              error: discoverResult.error
            }
          ]
        };
      } else if (!discoverResult.matches) {
        let { notFoundMatches, error, route } = handleNavigational404(
          location.pathname
        );
        return {
          matches: notFoundMatches,
          pendingActionResult: [
            route.id,
            {
              type: "error",
              error
            }
          ]
        };
      } else {
        matches = discoverResult.matches;
      }
    }
    let result;
    let actionMatch = getTargetMatch(matches, location);
    if (!actionMatch.route.action && !actionMatch.route.lazy) {
      result = {
        type: "error",
        error: getInternalRouterError(405, {
          method: request.method,
          pathname: location.pathname,
          routeId: actionMatch.route.id
        })
      };
    } else {
      let dsMatches = getTargetedDataStrategyMatches(
        mapRouteProperties2,
        manifest,
        request,
        matches,
        actionMatch,
        initialHydration ? [] : hydrationRouteProperties2,
        scopedContext
      );
      let results = await callDataStrategy(
        request,
        dsMatches,
        scopedContext,
        null
      );
      result = results[actionMatch.route.id];
      if (!result) {
        for (let match of matches) {
          if (results[match.route.id]) {
            result = results[match.route.id];
            break;
          }
        }
      }
      if (request.signal.aborted) {
        return { shortCircuited: true };
      }
    }
    if (isRedirectResult(result)) {
      let replace2;
      if (opts && opts.replace != null) {
        replace2 = opts.replace;
      } else {
        let location2 = normalizeRedirectLocation(
          result.response.headers.get("Location"),
          new URL(request.url),
          basename
        );
        replace2 = location2 === state.location.pathname + state.location.search;
      }
      await startRedirectNavigation(request, result, true, {
        submission,
        replace: replace2
      });
      return { shortCircuited: true };
    }
    if (isErrorResult(result)) {
      let boundaryMatch = findNearestBoundary(matches, actionMatch.route.id);
      if ((opts && opts.replace) !== true) {
        pendingAction = "PUSH";
      }
      return {
        matches,
        pendingActionResult: [
          boundaryMatch.route.id,
          result,
          actionMatch.route.id
        ]
      };
    }
    return {
      matches,
      pendingActionResult: [actionMatch.route.id, result]
    };
  }
  async function handleLoaders(request, location, matches, scopedContext, isFogOfWar, overrideNavigation, submission, fetcherSubmission, replace2, initialHydration, flushSync, pendingActionResult, callSiteDefaultShouldRevalidate) {
    let loadingNavigation = overrideNavigation || getLoadingNavigation(location, submission);
    let activeSubmission = submission || fetcherSubmission || getSubmissionFromNavigation(loadingNavigation);
    let shouldUpdateNavigationState = !isUninterruptedRevalidation && !initialHydration;
    if (isFogOfWar) {
      if (shouldUpdateNavigationState) {
        let actionData = getUpdatedActionData(pendingActionResult);
        updateState(
          {
            navigation: loadingNavigation,
            ...actionData !== void 0 ? { actionData } : {}
          },
          {
            flushSync
          }
        );
      }
      let discoverResult = await discoverRoutes(
        matches,
        location.pathname,
        request.signal
      );
      if (discoverResult.type === "aborted") {
        return { shortCircuited: true };
      } else if (discoverResult.type === "error") {
        if (discoverResult.partialMatches.length === 0) {
          let { matches: matches2, route } = getShortCircuitMatches(dataRoutes);
          return {
            matches: matches2,
            loaderData: {},
            errors: {
              [route.id]: discoverResult.error
            }
          };
        }
        let boundaryId = findNearestBoundary(discoverResult.partialMatches).route.id;
        return {
          matches: discoverResult.partialMatches,
          loaderData: {},
          errors: {
            [boundaryId]: discoverResult.error
          }
        };
      } else if (!discoverResult.matches) {
        let { error, notFoundMatches, route } = handleNavigational404(
          location.pathname
        );
        return {
          matches: notFoundMatches,
          loaderData: {},
          errors: {
            [route.id]: error
          }
        };
      } else {
        matches = discoverResult.matches;
      }
    }
    let routesToUse = inFlightDataRoutes || dataRoutes;
    let { dsMatches, revalidatingFetchers } = getMatchesToLoad(
      request,
      scopedContext,
      mapRouteProperties2,
      manifest,
      init.history,
      state,
      matches,
      activeSubmission,
      location,
      initialHydration ? [] : hydrationRouteProperties2,
      initialHydration === true,
      isRevalidationRequired,
      cancelledFetcherLoads,
      fetchersQueuedForDeletion,
      fetchLoadMatches,
      fetchRedirectIds,
      routesToUse,
      basename,
      init.patchRoutesOnNavigation != null,
      pendingActionResult,
      callSiteDefaultShouldRevalidate
    );
    pendingNavigationLoadId = ++incrementingLoadId;
    if (!init.dataStrategy && !dsMatches.some((m) => m.shouldLoad) && !dsMatches.some(
      (m) => m.route.middleware && m.route.middleware.length > 0
    ) && revalidatingFetchers.length === 0) {
      let updatedFetchers2 = markFetchRedirectsDone();
      completeNavigation(
        location,
        {
          matches,
          loaderData: {},
          // Commit pending error if we're short circuiting
          errors: pendingActionResult && isErrorResult(pendingActionResult[1]) ? { [pendingActionResult[0]]: pendingActionResult[1].error } : null,
          ...getActionDataForCommit(pendingActionResult),
          ...updatedFetchers2 ? { fetchers: new Map(state.fetchers) } : {}
        },
        { flushSync }
      );
      return { shortCircuited: true };
    }
    if (shouldUpdateNavigationState) {
      let updates = {};
      if (!isFogOfWar) {
        updates.navigation = loadingNavigation;
        let actionData = getUpdatedActionData(pendingActionResult);
        if (actionData !== void 0) {
          updates.actionData = actionData;
        }
      }
      if (revalidatingFetchers.length > 0) {
        updates.fetchers = getUpdatedRevalidatingFetchers(revalidatingFetchers);
      }
      updateState(updates, { flushSync });
    }
    revalidatingFetchers.forEach((rf) => {
      abortFetcher(rf.key);
      if (rf.controller) {
        fetchControllers.set(rf.key, rf.controller);
      }
    });
    let abortPendingFetchRevalidations = () => revalidatingFetchers.forEach((f) => abortFetcher(f.key));
    if (pendingNavigationController) {
      pendingNavigationController.signal.addEventListener(
        "abort",
        abortPendingFetchRevalidations
      );
    }
    let { loaderResults, fetcherResults } = await callLoadersAndMaybeResolveData(
      dsMatches,
      revalidatingFetchers,
      request,
      scopedContext
    );
    if (request.signal.aborted) {
      return { shortCircuited: true };
    }
    if (pendingNavigationController) {
      pendingNavigationController.signal.removeEventListener(
        "abort",
        abortPendingFetchRevalidations
      );
    }
    revalidatingFetchers.forEach((rf) => fetchControllers.delete(rf.key));
    let redirect2 = findRedirect(loaderResults);
    if (redirect2) {
      await startRedirectNavigation(request, redirect2.result, true, {
        replace: replace2
      });
      return { shortCircuited: true };
    }
    redirect2 = findRedirect(fetcherResults);
    if (redirect2) {
      fetchRedirectIds.add(redirect2.key);
      await startRedirectNavigation(request, redirect2.result, true, {
        replace: replace2
      });
      return { shortCircuited: true };
    }
    let { loaderData, errors } = processLoaderData(
      state,
      matches,
      loaderResults,
      pendingActionResult,
      revalidatingFetchers,
      fetcherResults
    );
    if (initialHydration && state.errors) {
      errors = { ...state.errors, ...errors };
    }
    let updatedFetchers = markFetchRedirectsDone();
    let didAbortFetchLoads = abortStaleFetchLoads(pendingNavigationLoadId);
    let shouldUpdateFetchers = updatedFetchers || didAbortFetchLoads || revalidatingFetchers.length > 0;
    return {
      matches,
      loaderData,
      errors,
      ...shouldUpdateFetchers ? { fetchers: new Map(state.fetchers) } : {}
    };
  }
  function getUpdatedActionData(pendingActionResult) {
    if (pendingActionResult && !isErrorResult(pendingActionResult[1])) {
      return {
        [pendingActionResult[0]]: pendingActionResult[1].data
      };
    } else if (state.actionData) {
      if (Object.keys(state.actionData).length === 0) {
        return null;
      } else {
        return state.actionData;
      }
    }
  }
  function getUpdatedRevalidatingFetchers(revalidatingFetchers) {
    revalidatingFetchers.forEach((rf) => {
      let fetcher = state.fetchers.get(rf.key);
      let revalidatingFetcher = getLoadingFetcher(
        void 0,
        fetcher ? fetcher.data : void 0
      );
      state.fetchers.set(rf.key, revalidatingFetcher);
    });
    return new Map(state.fetchers);
  }
  async function fetch2(key, routeId, href, opts) {
    abortFetcher(key);
    let flushSync = (opts && opts.flushSync) === true;
    let routesToUse = inFlightDataRoutes || dataRoutes;
    let normalizedPath = normalizeTo(
      state.location,
      state.matches,
      basename,
      href,
      routeId,
      opts?.relative
    );
    let matches = matchRoutes(routesToUse, normalizedPath, basename);
    let fogOfWar = checkFogOfWar(matches, routesToUse, normalizedPath);
    if (fogOfWar.active && fogOfWar.matches) {
      matches = fogOfWar.matches;
    }
    if (!matches) {
      setFetcherError(
        key,
        routeId,
        getInternalRouterError(404, { pathname: normalizedPath }),
        { flushSync }
      );
      return;
    }
    let { path, submission, error } = normalizeNavigateOptions(
      true,
      normalizedPath,
      opts
    );
    if (error) {
      setFetcherError(key, routeId, error, { flushSync });
      return;
    }
    let scopedContext = init.getContext ? await init.getContext() : new RouterContextProvider();
    let preventScrollReset = (opts && opts.preventScrollReset) === true;
    if (submission && isMutationMethod(submission.formMethod)) {
      await handleFetcherAction(
        key,
        routeId,
        path,
        matches,
        scopedContext,
        fogOfWar.active,
        flushSync,
        preventScrollReset,
        submission,
        opts && opts.unstable_defaultShouldRevalidate
      );
      return;
    }
    fetchLoadMatches.set(key, { routeId, path });
    await handleFetcherLoader(
      key,
      routeId,
      path,
      matches,
      scopedContext,
      fogOfWar.active,
      flushSync,
      preventScrollReset,
      submission
    );
  }
  async function handleFetcherAction(key, routeId, path, requestMatches, scopedContext, isFogOfWar, flushSync, preventScrollReset, submission, callSiteDefaultShouldRevalidate) {
    interruptActiveLoads();
    fetchLoadMatches.delete(key);
    let existingFetcher = state.fetchers.get(key);
    updateFetcherState(key, getSubmittingFetcher(submission, existingFetcher), {
      flushSync
    });
    let abortController = new AbortController();
    let fetchRequest = createClientSideRequest(
      init.history,
      path,
      abortController.signal,
      submission
    );
    if (isFogOfWar) {
      let discoverResult = await discoverRoutes(
        requestMatches,
        new URL(fetchRequest.url).pathname,
        fetchRequest.signal,
        key
      );
      if (discoverResult.type === "aborted") {
        return;
      } else if (discoverResult.type === "error") {
        setFetcherError(key, routeId, discoverResult.error, { flushSync });
        return;
      } else if (!discoverResult.matches) {
        setFetcherError(
          key,
          routeId,
          getInternalRouterError(404, { pathname: path }),
          { flushSync }
        );
        return;
      } else {
        requestMatches = discoverResult.matches;
      }
    }
    let match = getTargetMatch(requestMatches, path);
    if (!match.route.action && !match.route.lazy) {
      let error = getInternalRouterError(405, {
        method: submission.formMethod,
        pathname: path,
        routeId
      });
      setFetcherError(key, routeId, error, { flushSync });
      return;
    }
    fetchControllers.set(key, abortController);
    let originatingLoadId = incrementingLoadId;
    let fetchMatches = getTargetedDataStrategyMatches(
      mapRouteProperties2,
      manifest,
      fetchRequest,
      requestMatches,
      match,
      hydrationRouteProperties2,
      scopedContext
    );
    let actionResults = await callDataStrategy(
      fetchRequest,
      fetchMatches,
      scopedContext,
      key
    );
    let actionResult = actionResults[match.route.id];
    if (!actionResult) {
      for (let match2 of fetchMatches) {
        if (actionResults[match2.route.id]) {
          actionResult = actionResults[match2.route.id];
          break;
        }
      }
    }
    if (fetchRequest.signal.aborted) {
      if (fetchControllers.get(key) === abortController) {
        fetchControllers.delete(key);
      }
      return;
    }
    if (fetchersQueuedForDeletion.has(key)) {
      if (isRedirectResult(actionResult) || isErrorResult(actionResult)) {
        updateFetcherState(key, getDoneFetcher(void 0));
        return;
      }
    } else {
      if (isRedirectResult(actionResult)) {
        fetchControllers.delete(key);
        if (pendingNavigationLoadId > originatingLoadId) {
          updateFetcherState(key, getDoneFetcher(void 0));
          return;
        } else {
          fetchRedirectIds.add(key);
          updateFetcherState(key, getLoadingFetcher(submission));
          return startRedirectNavigation(fetchRequest, actionResult, false, {
            fetcherSubmission: submission,
            preventScrollReset
          });
        }
      }
      if (isErrorResult(actionResult)) {
        setFetcherError(key, routeId, actionResult.error);
        return;
      }
    }
    let nextLocation = state.navigation.location || state.location;
    let revalidationRequest = createClientSideRequest(
      init.history,
      nextLocation,
      abortController.signal
    );
    let routesToUse = inFlightDataRoutes || dataRoutes;
    let matches = state.navigation.state !== "idle" ? matchRoutes(routesToUse, state.navigation.location, basename) : state.matches;
    invariant(matches, "Didn't find any matches after fetcher action");
    let loadId = ++incrementingLoadId;
    fetchReloadIds.set(key, loadId);
    let loadFetcher = getLoadingFetcher(submission, actionResult.data);
    state.fetchers.set(key, loadFetcher);
    let { dsMatches, revalidatingFetchers } = getMatchesToLoad(
      revalidationRequest,
      scopedContext,
      mapRouteProperties2,
      manifest,
      init.history,
      state,
      matches,
      submission,
      nextLocation,
      hydrationRouteProperties2,
      false,
      isRevalidationRequired,
      cancelledFetcherLoads,
      fetchersQueuedForDeletion,
      fetchLoadMatches,
      fetchRedirectIds,
      routesToUse,
      basename,
      init.patchRoutesOnNavigation != null,
      [match.route.id, actionResult],
      callSiteDefaultShouldRevalidate
    );
    revalidatingFetchers.filter((rf) => rf.key !== key).forEach((rf) => {
      let staleKey = rf.key;
      let existingFetcher2 = state.fetchers.get(staleKey);
      let revalidatingFetcher = getLoadingFetcher(
        void 0,
        existingFetcher2 ? existingFetcher2.data : void 0
      );
      state.fetchers.set(staleKey, revalidatingFetcher);
      abortFetcher(staleKey);
      if (rf.controller) {
        fetchControllers.set(staleKey, rf.controller);
      }
    });
    updateState({ fetchers: new Map(state.fetchers) });
    let abortPendingFetchRevalidations = () => revalidatingFetchers.forEach((rf) => abortFetcher(rf.key));
    abortController.signal.addEventListener(
      "abort",
      abortPendingFetchRevalidations
    );
    let { loaderResults, fetcherResults } = await callLoadersAndMaybeResolveData(
      dsMatches,
      revalidatingFetchers,
      revalidationRequest,
      scopedContext
    );
    if (abortController.signal.aborted) {
      return;
    }
    abortController.signal.removeEventListener(
      "abort",
      abortPendingFetchRevalidations
    );
    fetchReloadIds.delete(key);
    fetchControllers.delete(key);
    revalidatingFetchers.forEach((r) => fetchControllers.delete(r.key));
    if (state.fetchers.has(key)) {
      let doneFetcher = getDoneFetcher(actionResult.data);
      state.fetchers.set(key, doneFetcher);
    }
    let redirect2 = findRedirect(loaderResults);
    if (redirect2) {
      return startRedirectNavigation(
        revalidationRequest,
        redirect2.result,
        false,
        { preventScrollReset }
      );
    }
    redirect2 = findRedirect(fetcherResults);
    if (redirect2) {
      fetchRedirectIds.add(redirect2.key);
      return startRedirectNavigation(
        revalidationRequest,
        redirect2.result,
        false,
        { preventScrollReset }
      );
    }
    let { loaderData, errors } = processLoaderData(
      state,
      matches,
      loaderResults,
      void 0,
      revalidatingFetchers,
      fetcherResults
    );
    abortStaleFetchLoads(loadId);
    if (state.navigation.state === "loading" && loadId > pendingNavigationLoadId) {
      invariant(pendingAction, "Expected pending action");
      pendingNavigationController && pendingNavigationController.abort();
      completeNavigation(state.navigation.location, {
        matches,
        loaderData,
        errors,
        fetchers: new Map(state.fetchers)
      });
    } else {
      updateState({
        errors,
        loaderData: mergeLoaderData(
          state.loaderData,
          loaderData,
          matches,
          errors
        ),
        fetchers: new Map(state.fetchers)
      });
      isRevalidationRequired = false;
    }
  }
  async function handleFetcherLoader(key, routeId, path, matches, scopedContext, isFogOfWar, flushSync, preventScrollReset, submission) {
    let existingFetcher = state.fetchers.get(key);
    updateFetcherState(
      key,
      getLoadingFetcher(
        submission,
        existingFetcher ? existingFetcher.data : void 0
      ),
      { flushSync }
    );
    let abortController = new AbortController();
    let fetchRequest = createClientSideRequest(
      init.history,
      path,
      abortController.signal
    );
    if (isFogOfWar) {
      let discoverResult = await discoverRoutes(
        matches,
        new URL(fetchRequest.url).pathname,
        fetchRequest.signal,
        key
      );
      if (discoverResult.type === "aborted") {
        return;
      } else if (discoverResult.type === "error") {
        setFetcherError(key, routeId, discoverResult.error, { flushSync });
        return;
      } else if (!discoverResult.matches) {
        setFetcherError(
          key,
          routeId,
          getInternalRouterError(404, { pathname: path }),
          { flushSync }
        );
        return;
      } else {
        matches = discoverResult.matches;
      }
    }
    let match = getTargetMatch(matches, path);
    fetchControllers.set(key, abortController);
    let originatingLoadId = incrementingLoadId;
    let dsMatches = getTargetedDataStrategyMatches(
      mapRouteProperties2,
      manifest,
      fetchRequest,
      matches,
      match,
      hydrationRouteProperties2,
      scopedContext
    );
    let results = await callDataStrategy(
      fetchRequest,
      dsMatches,
      scopedContext,
      key
    );
    let result = results[match.route.id];
    if (fetchControllers.get(key) === abortController) {
      fetchControllers.delete(key);
    }
    if (fetchRequest.signal.aborted) {
      return;
    }
    if (fetchersQueuedForDeletion.has(key)) {
      updateFetcherState(key, getDoneFetcher(void 0));
      return;
    }
    if (isRedirectResult(result)) {
      if (pendingNavigationLoadId > originatingLoadId) {
        updateFetcherState(key, getDoneFetcher(void 0));
        return;
      } else {
        fetchRedirectIds.add(key);
        await startRedirectNavigation(fetchRequest, result, false, {
          preventScrollReset
        });
        return;
      }
    }
    if (isErrorResult(result)) {
      setFetcherError(key, routeId, result.error);
      return;
    }
    updateFetcherState(key, getDoneFetcher(result.data));
  }
  async function startRedirectNavigation(request, redirect2, isNavigation, {
    submission,
    fetcherSubmission,
    preventScrollReset,
    replace: replace2
  } = {}) {
    if (!isNavigation) {
      pendingPopstateNavigationDfd?.resolve();
      pendingPopstateNavigationDfd = null;
    }
    if (redirect2.response.headers.has("X-Remix-Revalidate")) {
      isRevalidationRequired = true;
    }
    let location = redirect2.response.headers.get("Location");
    invariant(location, "Expected a Location header on the redirect Response");
    location = normalizeRedirectLocation(
      location,
      new URL(request.url),
      basename
    );
    let redirectLocation = createLocation(state.location, location, {
      _isRedirect: true
    });
    if (isBrowser3) {
      let isDocumentReload = false;
      if (redirect2.response.headers.has("X-Remix-Reload-Document")) {
        isDocumentReload = true;
      } else if (isAbsoluteUrl(location)) {
        const url = createBrowserURLImpl(location, true);
        isDocumentReload = // Hard reload if it's an absolute URL to a new origin
        url.origin !== routerWindow.location.origin || // Hard reload if it's an absolute URL that does not match our basename
        stripBasename(url.pathname, basename) == null;
      }
      if (isDocumentReload) {
        if (replace2) {
          routerWindow.location.replace(location);
        } else {
          routerWindow.location.assign(location);
        }
        return;
      }
    }
    pendingNavigationController = null;
    let redirectNavigationType = replace2 === true || redirect2.response.headers.has("X-Remix-Replace") ? "REPLACE" : "PUSH";
    let { formMethod, formAction, formEncType } = state.navigation;
    if (!submission && !fetcherSubmission && formMethod && formAction && formEncType) {
      submission = getSubmissionFromNavigation(state.navigation);
    }
    let activeSubmission = submission || fetcherSubmission;
    if (redirectPreserveMethodStatusCodes.has(redirect2.response.status) && activeSubmission && isMutationMethod(activeSubmission.formMethod)) {
      await startNavigation(redirectNavigationType, redirectLocation, {
        submission: {
          ...activeSubmission,
          formAction: location
        },
        // Preserve these flags across redirects
        preventScrollReset: preventScrollReset || pendingPreventScrollReset,
        enableViewTransition: isNavigation ? pendingViewTransitionEnabled : void 0
      });
    } else {
      let overrideNavigation = getLoadingNavigation(
        redirectLocation,
        submission
      );
      await startNavigation(redirectNavigationType, redirectLocation, {
        overrideNavigation,
        // Send fetcher submissions through for shouldRevalidate
        fetcherSubmission,
        // Preserve these flags across redirects
        preventScrollReset: preventScrollReset || pendingPreventScrollReset,
        enableViewTransition: isNavigation ? pendingViewTransitionEnabled : void 0
      });
    }
  }
  async function callDataStrategy(request, matches, scopedContext, fetcherKey) {
    let results;
    let dataResults = {};
    try {
      results = await callDataStrategyImpl(
        dataStrategyImpl,
        request,
        matches,
        fetcherKey,
        scopedContext,
        false
      );
    } catch (e) {
      matches.filter((m) => m.shouldLoad).forEach((m) => {
        dataResults[m.route.id] = {
          type: "error",
          error: e
        };
      });
      return dataResults;
    }
    if (request.signal.aborted) {
      return dataResults;
    }
    if (!isMutationMethod(request.method)) {
      for (let match of matches) {
        if (results[match.route.id]?.type === "error") {
          break;
        }
        if (!results.hasOwnProperty(match.route.id) && !state.loaderData.hasOwnProperty(match.route.id) && (!state.errors || !state.errors.hasOwnProperty(match.route.id)) && match.shouldCallHandler()) {
          results[match.route.id] = {
            type: "error",
            result: new Error(
              `No result returned from dataStrategy for route ${match.route.id}`
            )
          };
        }
      }
    }
    for (let [routeId, result] of Object.entries(results)) {
      if (isRedirectDataStrategyResult(result)) {
        let response = result.result;
        dataResults[routeId] = {
          type: "redirect",
          response: normalizeRelativeRoutingRedirectResponse(
            response,
            request,
            routeId,
            matches,
            basename
          )
        };
      } else {
        dataResults[routeId] = await convertDataStrategyResultToDataResult(result);
      }
    }
    return dataResults;
  }
  async function callLoadersAndMaybeResolveData(matches, fetchersToLoad, request, scopedContext) {
    let loaderResultsPromise = callDataStrategy(
      request,
      matches,
      scopedContext,
      null
    );
    let fetcherResultsPromise = Promise.all(
      fetchersToLoad.map(async (f) => {
        if (f.matches && f.match && f.request && f.controller) {
          let results = await callDataStrategy(
            f.request,
            f.matches,
            scopedContext,
            f.key
          );
          let result = results[f.match.route.id];
          return { [f.key]: result };
        } else {
          return Promise.resolve({
            [f.key]: {
              type: "error",
              error: getInternalRouterError(404, {
                pathname: f.path
              })
            }
          });
        }
      })
    );
    let loaderResults = await loaderResultsPromise;
    let fetcherResults = (await fetcherResultsPromise).reduce(
      (acc, r) => Object.assign(acc, r),
      {}
    );
    return {
      loaderResults,
      fetcherResults
    };
  }
  function interruptActiveLoads() {
    isRevalidationRequired = true;
    fetchLoadMatches.forEach((_, key) => {
      if (fetchControllers.has(key)) {
        cancelledFetcherLoads.add(key);
      }
      abortFetcher(key);
    });
  }
  function updateFetcherState(key, fetcher, opts = {}) {
    state.fetchers.set(key, fetcher);
    updateState(
      { fetchers: new Map(state.fetchers) },
      { flushSync: (opts && opts.flushSync) === true }
    );
  }
  function setFetcherError(key, routeId, error, opts = {}) {
    let boundaryMatch = findNearestBoundary(state.matches, routeId);
    deleteFetcher(key);
    updateState(
      {
        errors: {
          [boundaryMatch.route.id]: error
        },
        fetchers: new Map(state.fetchers)
      },
      { flushSync: (opts && opts.flushSync) === true }
    );
  }
  function getFetcher(key) {
    activeFetchers.set(key, (activeFetchers.get(key) || 0) + 1);
    if (fetchersQueuedForDeletion.has(key)) {
      fetchersQueuedForDeletion.delete(key);
    }
    return state.fetchers.get(key) || IDLE_FETCHER;
  }
  function resetFetcher(key, opts) {
    abortFetcher(key, opts?.reason);
    updateFetcherState(key, getDoneFetcher(null));
  }
  function deleteFetcher(key) {
    let fetcher = state.fetchers.get(key);
    if (fetchControllers.has(key) && !(fetcher && fetcher.state === "loading" && fetchReloadIds.has(key))) {
      abortFetcher(key);
    }
    fetchLoadMatches.delete(key);
    fetchReloadIds.delete(key);
    fetchRedirectIds.delete(key);
    fetchersQueuedForDeletion.delete(key);
    cancelledFetcherLoads.delete(key);
    state.fetchers.delete(key);
  }
  function queueFetcherForDeletion(key) {
    let count = (activeFetchers.get(key) || 0) - 1;
    if (count <= 0) {
      activeFetchers.delete(key);
      fetchersQueuedForDeletion.add(key);
    } else {
      activeFetchers.set(key, count);
    }
    updateState({ fetchers: new Map(state.fetchers) });
  }
  function abortFetcher(key, reason) {
    let controller = fetchControllers.get(key);
    if (controller) {
      controller.abort(reason);
      fetchControllers.delete(key);
    }
  }
  function markFetchersDone(keys) {
    for (let key of keys) {
      let fetcher = getFetcher(key);
      let doneFetcher = getDoneFetcher(fetcher.data);
      state.fetchers.set(key, doneFetcher);
    }
  }
  function markFetchRedirectsDone() {
    let doneKeys = [];
    let updatedFetchers = false;
    for (let key of fetchRedirectIds) {
      let fetcher = state.fetchers.get(key);
      invariant(fetcher, `Expected fetcher: ${key}`);
      if (fetcher.state === "loading") {
        fetchRedirectIds.delete(key);
        doneKeys.push(key);
        updatedFetchers = true;
      }
    }
    markFetchersDone(doneKeys);
    return updatedFetchers;
  }
  function abortStaleFetchLoads(landedId) {
    let yeetedKeys = [];
    for (let [key, id] of fetchReloadIds) {
      if (id < landedId) {
        let fetcher = state.fetchers.get(key);
        invariant(fetcher, `Expected fetcher: ${key}`);
        if (fetcher.state === "loading") {
          abortFetcher(key);
          fetchReloadIds.delete(key);
          yeetedKeys.push(key);
        }
      }
    }
    markFetchersDone(yeetedKeys);
    return yeetedKeys.length > 0;
  }
  function getBlocker(key, fn) {
    let blocker = state.blockers.get(key) || IDLE_BLOCKER;
    if (blockerFunctions.get(key) !== fn) {
      blockerFunctions.set(key, fn);
    }
    return blocker;
  }
  function deleteBlocker(key) {
    state.blockers.delete(key);
    blockerFunctions.delete(key);
  }
  function updateBlocker(key, newBlocker) {
    let blocker = state.blockers.get(key) || IDLE_BLOCKER;
    invariant(
      blocker.state === "unblocked" && newBlocker.state === "blocked" || blocker.state === "blocked" && newBlocker.state === "blocked" || blocker.state === "blocked" && newBlocker.state === "proceeding" || blocker.state === "blocked" && newBlocker.state === "unblocked" || blocker.state === "proceeding" && newBlocker.state === "unblocked",
      `Invalid blocker state transition: ${blocker.state} -> ${newBlocker.state}`
    );
    let blockers = new Map(state.blockers);
    blockers.set(key, newBlocker);
    updateState({ blockers });
  }
  function shouldBlockNavigation({
    currentLocation,
    nextLocation,
    historyAction
  }) {
    if (blockerFunctions.size === 0) {
      return;
    }
    if (blockerFunctions.size > 1) {
      warning(false, "A router only supports one blocker at a time");
    }
    let entries = Array.from(blockerFunctions.entries());
    let [blockerKey, blockerFunction] = entries[entries.length - 1];
    let blocker = state.blockers.get(blockerKey);
    if (blocker && blocker.state === "proceeding") {
      return;
    }
    if (blockerFunction({ currentLocation, nextLocation, historyAction })) {
      return blockerKey;
    }
  }
  function handleNavigational404(pathname) {
    let error = getInternalRouterError(404, { pathname });
    let routesToUse = inFlightDataRoutes || dataRoutes;
    let { matches, route } = getShortCircuitMatches(routesToUse);
    return { notFoundMatches: matches, route, error };
  }
  function enableScrollRestoration(positions, getPosition, getKey) {
    savedScrollPositions2 = positions;
    getScrollPosition = getPosition;
    getScrollRestorationKey2 = getKey || null;
    if (!initialScrollRestored && state.navigation === IDLE_NAVIGATION) {
      initialScrollRestored = true;
      let y = getSavedScrollPosition(state.location, state.matches);
      if (y != null) {
        updateState({ restoreScrollPosition: y });
      }
    }
    return () => {
      savedScrollPositions2 = null;
      getScrollPosition = null;
      getScrollRestorationKey2 = null;
    };
  }
  function getScrollKey(location, matches) {
    if (getScrollRestorationKey2) {
      let key = getScrollRestorationKey2(
        location,
        matches.map((m) => convertRouteMatchToUiMatch(m, state.loaderData))
      );
      return key || location.key;
    }
    return location.key;
  }
  function saveScrollPosition(location, matches) {
    if (savedScrollPositions2 && getScrollPosition) {
      let key = getScrollKey(location, matches);
      savedScrollPositions2[key] = getScrollPosition();
    }
  }
  function getSavedScrollPosition(location, matches) {
    if (savedScrollPositions2) {
      let key = getScrollKey(location, matches);
      let y = savedScrollPositions2[key];
      if (typeof y === "number") {
        return y;
      }
    }
    return null;
  }
  function checkFogOfWar(matches, routesToUse, pathname) {
    if (init.patchRoutesOnNavigation) {
      if (!matches) {
        let fogMatches = matchRoutesImpl(
          routesToUse,
          pathname,
          basename,
          true
        );
        return { active: true, matches: fogMatches || [] };
      } else {
        if (Object.keys(matches[0].params).length > 0) {
          let partialMatches = matchRoutesImpl(
            routesToUse,
            pathname,
            basename,
            true
          );
          return { active: true, matches: partialMatches };
        }
      }
    }
    return { active: false, matches: null };
  }
  async function discoverRoutes(matches, pathname, signal, fetcherKey) {
    if (!init.patchRoutesOnNavigation) {
      return { type: "success", matches };
    }
    let partialMatches = matches;
    while (true) {
      let isNonHMR = inFlightDataRoutes == null;
      let routesToUse = inFlightDataRoutes || dataRoutes;
      let localManifest = manifest;
      try {
        await init.patchRoutesOnNavigation({
          signal,
          path: pathname,
          matches: partialMatches,
          fetcherKey,
          patch: (routeId, children) => {
            if (signal.aborted) return;
            patchRoutesImpl(
              routeId,
              children,
              routesToUse,
              localManifest,
              mapRouteProperties2,
              false
            );
          }
        });
      } catch (e) {
        return { type: "error", error: e, partialMatches };
      } finally {
        if (isNonHMR && !signal.aborted) {
          dataRoutes = [...dataRoutes];
        }
      }
      if (signal.aborted) {
        return { type: "aborted" };
      }
      let newMatches = matchRoutes(routesToUse, pathname, basename);
      let newPartialMatches = null;
      if (newMatches) {
        if (Object.keys(newMatches[0].params).length === 0) {
          return { type: "success", matches: newMatches };
        } else {
          newPartialMatches = matchRoutesImpl(
            routesToUse,
            pathname,
            basename,
            true
          );
          let matchedDeeper = newPartialMatches && partialMatches.length < newPartialMatches.length && compareMatches(
            partialMatches,
            newPartialMatches.slice(0, partialMatches.length)
          );
          if (!matchedDeeper) {
            return { type: "success", matches: newMatches };
          }
        }
      }
      if (!newPartialMatches) {
        newPartialMatches = matchRoutesImpl(
          routesToUse,
          pathname,
          basename,
          true
        );
      }
      if (!newPartialMatches || compareMatches(partialMatches, newPartialMatches)) {
        return { type: "success", matches: null };
      }
      partialMatches = newPartialMatches;
    }
  }
  function compareMatches(a, b) {
    return a.length === b.length && a.every((m, i) => m.route.id === b[i].route.id);
  }
  function _internalSetRoutes(newRoutes) {
    manifest = {};
    inFlightDataRoutes = convertRoutesToDataRoutes(
      newRoutes,
      mapRouteProperties2,
      void 0,
      manifest
    );
  }
  function patchRoutes(routeId, children, unstable_allowElementMutations = false) {
    let isNonHMR = inFlightDataRoutes == null;
    let routesToUse = inFlightDataRoutes || dataRoutes;
    patchRoutesImpl(
      routeId,
      children,
      routesToUse,
      manifest,
      mapRouteProperties2,
      unstable_allowElementMutations
    );
    if (isNonHMR) {
      dataRoutes = [...dataRoutes];
      updateState({});
    }
  }
  router = {
    get basename() {
      return basename;
    },
    get future() {
      return future;
    },
    get state() {
      return state;
    },
    get routes() {
      return dataRoutes;
    },
    get window() {
      return routerWindow;
    },
    initialize,
    subscribe,
    enableScrollRestoration,
    navigate,
    fetch: fetch2,
    revalidate,
    // Passthrough to history-aware createHref used by useHref so we get proper
    // hash-aware URLs in DOM paths
    createHref: (to) => init.history.createHref(to),
    encodeLocation: (to) => init.history.encodeLocation(to),
    getFetcher,
    resetFetcher,
    deleteFetcher: queueFetcherForDeletion,
    dispose,
    getBlocker,
    deleteBlocker,
    patchRoutes,
    _internalFetchControllers: fetchControllers,
    // TODO: Remove setRoutes, it's temporary to avoid dealing with
    // updating the tree while validating the update algorithm.
    _internalSetRoutes,
    _internalSetStateDoNotUseOrYouWillBreakYourApp(newState) {
      updateState(newState);
    }
  };
  if (init.unstable_instrumentations) {
    router = instrumentClientSideRouter(
      router,
      init.unstable_instrumentations.map((i) => i.router).filter(Boolean)
    );
  }
  return router;
}
function isSubmissionNavigation(opts) {
  return opts != null && ("formData" in opts && opts.formData != null || "body" in opts && opts.body !== void 0);
}
function normalizeTo(location, matches, basename, to, fromRouteId, relative) {
  let contextualMatches;
  let activeRouteMatch;
  if (fromRouteId) {
    contextualMatches = [];
    for (let match of matches) {
      contextualMatches.push(match);
      if (match.route.id === fromRouteId) {
        activeRouteMatch = match;
        break;
      }
    }
  } else {
    contextualMatches = matches;
    activeRouteMatch = matches[matches.length - 1];
  }
  let path = resolveTo(
    to ? to : ".",
    getResolveToMatches(contextualMatches),
    stripBasename(location.pathname, basename) || location.pathname,
    relative === "path"
  );
  if (to == null) {
    path.search = location.search;
    path.hash = location.hash;
  }
  if ((to == null || to === "" || to === ".") && activeRouteMatch) {
    let nakedIndex = hasNakedIndexQuery(path.search);
    if (activeRouteMatch.route.index && !nakedIndex) {
      path.search = path.search ? path.search.replace(/^\?/, "?index&") : "?index";
    } else if (!activeRouteMatch.route.index && nakedIndex) {
      let params = new URLSearchParams(path.search);
      let indexValues = params.getAll("index");
      params.delete("index");
      indexValues.filter((v) => v).forEach((v) => params.append("index", v));
      let qs = params.toString();
      path.search = qs ? `?${qs}` : "";
    }
  }
  if (basename !== "/") {
    path.pathname = prependBasename({ basename, pathname: path.pathname });
  }
  return createPath(path);
}
function normalizeNavigateOptions(isFetcher, path, opts) {
  if (!opts || !isSubmissionNavigation(opts)) {
    return { path };
  }
  if (opts.formMethod && !isValidMethod(opts.formMethod)) {
    return {
      path,
      error: getInternalRouterError(405, { method: opts.formMethod })
    };
  }
  let getInvalidBodyError = () => ({
    path,
    error: getInternalRouterError(400, { type: "invalid-body" })
  });
  let rawFormMethod = opts.formMethod || "get";
  let formMethod = rawFormMethod.toUpperCase();
  let formAction = stripHashFromPath(path);
  if (opts.body !== void 0) {
    if (opts.formEncType === "text/plain") {
      if (!isMutationMethod(formMethod)) {
        return getInvalidBodyError();
      }
      let text = typeof opts.body === "string" ? opts.body : opts.body instanceof FormData || opts.body instanceof URLSearchParams ? (
        // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#plain-text-form-data
        Array.from(opts.body.entries()).reduce(
          (acc, [name, value]) => `${acc}${name}=${value}
`,
          ""
        )
      ) : String(opts.body);
      return {
        path,
        submission: {
          formMethod,
          formAction,
          formEncType: opts.formEncType,
          formData: void 0,
          json: void 0,
          text
        }
      };
    } else if (opts.formEncType === "application/json") {
      if (!isMutationMethod(formMethod)) {
        return getInvalidBodyError();
      }
      try {
        let json = typeof opts.body === "string" ? JSON.parse(opts.body) : opts.body;
        return {
          path,
          submission: {
            formMethod,
            formAction,
            formEncType: opts.formEncType,
            formData: void 0,
            json,
            text: void 0
          }
        };
      } catch (e) {
        return getInvalidBodyError();
      }
    }
  }
  invariant(
    typeof FormData === "function",
    "FormData is not available in this environment"
  );
  let searchParams;
  let formData;
  if (opts.formData) {
    searchParams = convertFormDataToSearchParams(opts.formData);
    formData = opts.formData;
  } else if (opts.body instanceof FormData) {
    searchParams = convertFormDataToSearchParams(opts.body);
    formData = opts.body;
  } else if (opts.body instanceof URLSearchParams) {
    searchParams = opts.body;
    formData = convertSearchParamsToFormData(searchParams);
  } else if (opts.body == null) {
    searchParams = new URLSearchParams();
    formData = new FormData();
  } else {
    try {
      searchParams = new URLSearchParams(opts.body);
      formData = convertSearchParamsToFormData(searchParams);
    } catch (e) {
      return getInvalidBodyError();
    }
  }
  let submission = {
    formMethod,
    formAction,
    formEncType: opts && opts.formEncType || "application/x-www-form-urlencoded",
    formData,
    json: void 0,
    text: void 0
  };
  if (isMutationMethod(submission.formMethod)) {
    return { path, submission };
  }
  let parsedPath = parsePath(path);
  if (isFetcher && parsedPath.search && hasNakedIndexQuery(parsedPath.search)) {
    searchParams.append("index", "");
  }
  parsedPath.search = `?${searchParams}`;
  return { path: createPath(parsedPath), submission };
}
function getMatchesToLoad(request, scopedContext, mapRouteProperties2, manifest, history, state, matches, submission, location, lazyRoutePropertiesToSkip, initialHydration, isRevalidationRequired, cancelledFetcherLoads, fetchersQueuedForDeletion, fetchLoadMatches, fetchRedirectIds, routesToUse, basename, hasPatchRoutesOnNavigation, pendingActionResult, callSiteDefaultShouldRevalidate) {
  let actionResult = pendingActionResult ? isErrorResult(pendingActionResult[1]) ? pendingActionResult[1].error : pendingActionResult[1].data : void 0;
  let currentUrl = history.createURL(state.location);
  let nextUrl = history.createURL(location);
  let maxIdx;
  if (initialHydration && state.errors) {
    let boundaryId = Object.keys(state.errors)[0];
    maxIdx = matches.findIndex((m) => m.route.id === boundaryId);
  } else if (pendingActionResult && isErrorResult(pendingActionResult[1])) {
    let boundaryId = pendingActionResult[0];
    maxIdx = matches.findIndex((m) => m.route.id === boundaryId) - 1;
  }
  let actionStatus = pendingActionResult ? pendingActionResult[1].statusCode : void 0;
  let shouldSkipRevalidation = actionStatus && actionStatus >= 400;
  let baseShouldRevalidateArgs = {
    currentUrl,
    currentParams: state.matches[0]?.params || {},
    nextUrl,
    nextParams: matches[0].params,
    ...submission,
    actionResult,
    actionStatus
  };
  let pattern = getRoutePattern(matches);
  let dsMatches = matches.map((match, index) => {
    let { route } = match;
    let forceShouldLoad = null;
    if (maxIdx != null && index > maxIdx) {
      forceShouldLoad = false;
    } else if (route.lazy) {
      forceShouldLoad = true;
    } else if (!routeHasLoaderOrMiddleware(route)) {
      forceShouldLoad = false;
    } else if (initialHydration) {
      forceShouldLoad = shouldLoadRouteOnHydration(
        route,
        state.loaderData,
        state.errors
      );
    } else if (isNewLoader(state.loaderData, state.matches[index], match)) {
      forceShouldLoad = true;
    }
    if (forceShouldLoad !== null) {
      return getDataStrategyMatch(
        mapRouteProperties2,
        manifest,
        request,
        pattern,
        match,
        lazyRoutePropertiesToSkip,
        scopedContext,
        forceShouldLoad
      );
    }
    let defaultShouldRevalidate = false;
    if (typeof callSiteDefaultShouldRevalidate === "boolean") {
      defaultShouldRevalidate = callSiteDefaultShouldRevalidate;
    } else if (shouldSkipRevalidation) {
      defaultShouldRevalidate = false;
    } else if (isRevalidationRequired) {
      defaultShouldRevalidate = true;
    } else if (currentUrl.pathname + currentUrl.search === nextUrl.pathname + nextUrl.search) {
      defaultShouldRevalidate = true;
    } else if (currentUrl.search !== nextUrl.search) {
      defaultShouldRevalidate = true;
    } else if (isNewRouteInstance(state.matches[index], match)) {
      defaultShouldRevalidate = true;
    }
    let shouldRevalidateArgs = {
      ...baseShouldRevalidateArgs,
      defaultShouldRevalidate
    };
    let shouldLoad = shouldRevalidateLoader(match, shouldRevalidateArgs);
    return getDataStrategyMatch(
      mapRouteProperties2,
      manifest,
      request,
      pattern,
      match,
      lazyRoutePropertiesToSkip,
      scopedContext,
      shouldLoad,
      shouldRevalidateArgs,
      callSiteDefaultShouldRevalidate
    );
  });
  let revalidatingFetchers = [];
  fetchLoadMatches.forEach((f, key) => {
    if (initialHydration || !matches.some((m) => m.route.id === f.routeId) || fetchersQueuedForDeletion.has(key)) {
      return;
    }
    let fetcher = state.fetchers.get(key);
    let isMidInitialLoad = fetcher && fetcher.state !== "idle" && fetcher.data === void 0;
    let fetcherMatches = matchRoutes(routesToUse, f.path, basename);
    if (!fetcherMatches) {
      if (hasPatchRoutesOnNavigation && isMidInitialLoad) {
        return;
      }
      revalidatingFetchers.push({
        key,
        routeId: f.routeId,
        path: f.path,
        matches: null,
        match: null,
        request: null,
        controller: null
      });
      return;
    }
    if (fetchRedirectIds.has(key)) {
      return;
    }
    let fetcherMatch = getTargetMatch(fetcherMatches, f.path);
    let fetchController = new AbortController();
    let fetchRequest = createClientSideRequest(
      history,
      f.path,
      fetchController.signal
    );
    let fetcherDsMatches = null;
    if (cancelledFetcherLoads.has(key)) {
      cancelledFetcherLoads.delete(key);
      fetcherDsMatches = getTargetedDataStrategyMatches(
        mapRouteProperties2,
        manifest,
        fetchRequest,
        fetcherMatches,
        fetcherMatch,
        lazyRoutePropertiesToSkip,
        scopedContext
      );
    } else if (isMidInitialLoad) {
      if (isRevalidationRequired) {
        fetcherDsMatches = getTargetedDataStrategyMatches(
          mapRouteProperties2,
          manifest,
          fetchRequest,
          fetcherMatches,
          fetcherMatch,
          lazyRoutePropertiesToSkip,
          scopedContext
        );
      }
    } else {
      let defaultShouldRevalidate;
      if (typeof callSiteDefaultShouldRevalidate === "boolean") {
        defaultShouldRevalidate = callSiteDefaultShouldRevalidate;
      } else if (shouldSkipRevalidation) {
        defaultShouldRevalidate = false;
      } else {
        defaultShouldRevalidate = isRevalidationRequired;
      }
      let shouldRevalidateArgs = {
        ...baseShouldRevalidateArgs,
        defaultShouldRevalidate
      };
      if (shouldRevalidateLoader(fetcherMatch, shouldRevalidateArgs)) {
        fetcherDsMatches = getTargetedDataStrategyMatches(
          mapRouteProperties2,
          manifest,
          fetchRequest,
          fetcherMatches,
          fetcherMatch,
          lazyRoutePropertiesToSkip,
          scopedContext,
          shouldRevalidateArgs
        );
      }
    }
    if (fetcherDsMatches) {
      revalidatingFetchers.push({
        key,
        routeId: f.routeId,
        path: f.path,
        matches: fetcherDsMatches,
        match: fetcherMatch,
        request: fetchRequest,
        controller: fetchController
      });
    }
  });
  return { dsMatches, revalidatingFetchers };
}
function routeHasLoaderOrMiddleware(route) {
  return route.loader != null || route.middleware != null && route.middleware.length > 0;
}
function shouldLoadRouteOnHydration(route, loaderData, errors) {
  if (route.lazy) {
    return true;
  }
  if (!routeHasLoaderOrMiddleware(route)) {
    return false;
  }
  let hasData = loaderData != null && route.id in loaderData;
  let hasError = errors != null && errors[route.id] !== void 0;
  if (!hasData && hasError) {
    return false;
  }
  if (typeof route.loader === "function" && route.loader.hydrate === true) {
    return true;
  }
  return !hasData && !hasError;
}
function isNewLoader(currentLoaderData, currentMatch, match) {
  let isNew = (
    // [a] -> [a, b]
    !currentMatch || // [a, b] -> [a, c]
    match.route.id !== currentMatch.route.id
  );
  let isMissingData = !currentLoaderData.hasOwnProperty(match.route.id);
  return isNew || isMissingData;
}
function isNewRouteInstance(currentMatch, match) {
  let currentPath = currentMatch.route.path;
  return (
    // param change for this match, /users/123 -> /users/456
    currentMatch.pathname !== match.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    currentPath != null && currentPath.endsWith("*") && currentMatch.params["*"] !== match.params["*"]
  );
}
function shouldRevalidateLoader(loaderMatch, arg) {
  if (loaderMatch.route.shouldRevalidate) {
    let routeChoice = loaderMatch.route.shouldRevalidate(arg);
    if (typeof routeChoice === "boolean") {
      return routeChoice;
    }
  }
  return arg.defaultShouldRevalidate;
}
function patchRoutesImpl(routeId, children, routesToUse, manifest, mapRouteProperties2, allowElementMutations) {
  let childrenToPatch;
  if (routeId) {
    let route = manifest[routeId];
    invariant(
      route,
      `No route found to patch children into: routeId = ${routeId}`
    );
    if (!route.children) {
      route.children = [];
    }
    childrenToPatch = route.children;
  } else {
    childrenToPatch = routesToUse;
  }
  let uniqueChildren = [];
  let existingChildren = [];
  children.forEach((newRoute) => {
    let existingRoute = childrenToPatch.find(
      (existingRoute2) => isSameRoute(newRoute, existingRoute2)
    );
    if (existingRoute) {
      existingChildren.push({ existingRoute, newRoute });
    } else {
      uniqueChildren.push(newRoute);
    }
  });
  if (uniqueChildren.length > 0) {
    let newRoutes = convertRoutesToDataRoutes(
      uniqueChildren,
      mapRouteProperties2,
      [routeId || "_", "patch", String(childrenToPatch?.length || "0")],
      manifest
    );
    childrenToPatch.push(...newRoutes);
  }
  if (allowElementMutations && existingChildren.length > 0) {
    for (let i = 0; i < existingChildren.length; i++) {
      let { existingRoute, newRoute } = existingChildren[i];
      let existingRouteTyped = existingRoute;
      let [newRouteTyped] = convertRoutesToDataRoutes(
        [newRoute],
        mapRouteProperties2,
        [],
        // Doesn't matter for mutated routes since they already have an id
        {},
        // Don't touch the manifest here since we're updating in place
        true
      );
      Object.assign(existingRouteTyped, {
        element: newRouteTyped.element ? newRouteTyped.element : existingRouteTyped.element,
        errorElement: newRouteTyped.errorElement ? newRouteTyped.errorElement : existingRouteTyped.errorElement,
        hydrateFallbackElement: newRouteTyped.hydrateFallbackElement ? newRouteTyped.hydrateFallbackElement : existingRouteTyped.hydrateFallbackElement
      });
    }
  }
}
function isSameRoute(newRoute, existingRoute) {
  if ("id" in newRoute && "id" in existingRoute && newRoute.id === existingRoute.id) {
    return true;
  }
  if (!(newRoute.index === existingRoute.index && newRoute.path === existingRoute.path && newRoute.caseSensitive === existingRoute.caseSensitive)) {
    return false;
  }
  if ((!newRoute.children || newRoute.children.length === 0) && (!existingRoute.children || existingRoute.children.length === 0)) {
    return true;
  }
  return newRoute.children.every(
    (aChild, i) => existingRoute.children?.some((bChild) => isSameRoute(aChild, bChild))
  );
}
var lazyRoutePropertyCache = /* @__PURE__ */ new WeakMap();
var loadLazyRouteProperty = ({
  key,
  route,
  manifest,
  mapRouteProperties: mapRouteProperties2
}) => {
  let routeToUpdate = manifest[route.id];
  invariant(routeToUpdate, "No route found in manifest");
  if (!routeToUpdate.lazy || typeof routeToUpdate.lazy !== "object") {
    return;
  }
  let lazyFn = routeToUpdate.lazy[key];
  if (!lazyFn) {
    return;
  }
  let cache = lazyRoutePropertyCache.get(routeToUpdate);
  if (!cache) {
    cache = {};
    lazyRoutePropertyCache.set(routeToUpdate, cache);
  }
  let cachedPromise = cache[key];
  if (cachedPromise) {
    return cachedPromise;
  }
  let propertyPromise = (async () => {
    let isUnsupported = isUnsupportedLazyRouteObjectKey(key);
    let staticRouteValue = routeToUpdate[key];
    let isStaticallyDefined = staticRouteValue !== void 0 && key !== "hasErrorBoundary";
    if (isUnsupported) {
      warning(
        !isUnsupported,
        "Route property " + key + " is not a supported lazy route property. This property will be ignored."
      );
      cache[key] = Promise.resolve();
    } else if (isStaticallyDefined) {
      warning(
        false,
        `Route "${routeToUpdate.id}" has a static property "${key}" defined. The lazy property will be ignored.`
      );
    } else {
      let value = await lazyFn();
      if (value != null) {
        Object.assign(routeToUpdate, { [key]: value });
        Object.assign(routeToUpdate, mapRouteProperties2(routeToUpdate));
      }
    }
    if (typeof routeToUpdate.lazy === "object") {
      routeToUpdate.lazy[key] = void 0;
      if (Object.values(routeToUpdate.lazy).every((value) => value === void 0)) {
        routeToUpdate.lazy = void 0;
      }
    }
  })();
  cache[key] = propertyPromise;
  return propertyPromise;
};
var lazyRouteFunctionCache = /* @__PURE__ */ new WeakMap();
function loadLazyRoute(route, type, manifest, mapRouteProperties2, lazyRoutePropertiesToSkip) {
  let routeToUpdate = manifest[route.id];
  invariant(routeToUpdate, "No route found in manifest");
  if (!route.lazy) {
    return {
      lazyRoutePromise: void 0,
      lazyHandlerPromise: void 0
    };
  }
  if (typeof route.lazy === "function") {
    let cachedPromise = lazyRouteFunctionCache.get(routeToUpdate);
    if (cachedPromise) {
      return {
        lazyRoutePromise: cachedPromise,
        lazyHandlerPromise: cachedPromise
      };
    }
    let lazyRoutePromise2 = (async () => {
      invariant(
        typeof route.lazy === "function",
        "No lazy route function found"
      );
      let lazyRoute = await route.lazy();
      let routeUpdates = {};
      for (let lazyRouteProperty in lazyRoute) {
        let lazyValue = lazyRoute[lazyRouteProperty];
        if (lazyValue === void 0) {
          continue;
        }
        let isUnsupported = isUnsupportedLazyRouteFunctionKey(lazyRouteProperty);
        let staticRouteValue = routeToUpdate[lazyRouteProperty];
        let isStaticallyDefined = staticRouteValue !== void 0 && // This property isn't static since it should always be updated based
        // on the route updates
        lazyRouteProperty !== "hasErrorBoundary";
        if (isUnsupported) {
          warning(
            !isUnsupported,
            "Route property " + lazyRouteProperty + " is not a supported property to be returned from a lazy route function. This property will be ignored."
          );
        } else if (isStaticallyDefined) {
          warning(
            !isStaticallyDefined,
            `Route "${routeToUpdate.id}" has a static property "${lazyRouteProperty}" defined but its lazy function is also returning a value for this property. The lazy route property "${lazyRouteProperty}" will be ignored.`
          );
        } else {
          routeUpdates[lazyRouteProperty] = lazyValue;
        }
      }
      Object.assign(routeToUpdate, routeUpdates);
      Object.assign(routeToUpdate, {
        // To keep things framework agnostic, we use the provided `mapRouteProperties`
        // function to set the framework-aware properties (`element`/`hasErrorBoundary`)
        // since the logic will differ between frameworks.
        ...mapRouteProperties2(routeToUpdate),
        lazy: void 0
      });
    })();
    lazyRouteFunctionCache.set(routeToUpdate, lazyRoutePromise2);
    lazyRoutePromise2.catch(() => {
    });
    return {
      lazyRoutePromise: lazyRoutePromise2,
      lazyHandlerPromise: lazyRoutePromise2
    };
  }
  let lazyKeys = Object.keys(route.lazy);
  let lazyPropertyPromises = [];
  let lazyHandlerPromise = void 0;
  for (let key of lazyKeys) {
    if (lazyRoutePropertiesToSkip && lazyRoutePropertiesToSkip.includes(key)) {
      continue;
    }
    let promise = loadLazyRouteProperty({
      key,
      route,
      manifest,
      mapRouteProperties: mapRouteProperties2
    });
    if (promise) {
      lazyPropertyPromises.push(promise);
      if (key === type) {
        lazyHandlerPromise = promise;
      }
    }
  }
  let lazyRoutePromise = lazyPropertyPromises.length > 0 ? Promise.all(lazyPropertyPromises).then(() => {
  }) : void 0;
  lazyRoutePromise?.catch(() => {
  });
  lazyHandlerPromise?.catch(() => {
  });
  return {
    lazyRoutePromise,
    lazyHandlerPromise
  };
}
async function defaultDataStrategy(args) {
  let matchesToLoad = args.matches.filter((m) => m.shouldLoad);
  let keyedResults = {};
  let results = await Promise.all(matchesToLoad.map((m) => m.resolve()));
  results.forEach((result, i) => {
    keyedResults[matchesToLoad[i].route.id] = result;
  });
  return keyedResults;
}
async function defaultDataStrategyWithMiddleware(args) {
  if (!args.matches.some((m) => m.route.middleware)) {
    return defaultDataStrategy(args);
  }
  return runClientMiddlewarePipeline(args, () => defaultDataStrategy(args));
}
function runClientMiddlewarePipeline(args, handler) {
  return runMiddlewarePipeline(
    args,
    handler,
    (r) => {
      if (isRedirectResponse(r)) {
        throw r;
      }
      return r;
    },
    isDataStrategyResults,
    errorHandler
  );
  function errorHandler(error, routeId, nextResult) {
    if (nextResult) {
      return Promise.resolve(
        Object.assign(nextResult.value, {
          [routeId]: { type: "error", result: error }
        })
      );
    } else {
      let { matches } = args;
      let maxBoundaryIdx = Math.min(
        // Throwing route
        Math.max(
          matches.findIndex((m) => m.route.id === routeId),
          0
        ),
        // or the shallowest route that needs to load data
        Math.max(
          matches.findIndex((m) => m.shouldCallHandler()),
          0
        )
      );
      let boundaryRouteId = findNearestBoundary(
        matches,
        matches[maxBoundaryIdx].route.id
      ).route.id;
      return Promise.resolve({
        [boundaryRouteId]: { type: "error", result: error }
      });
    }
  }
}
async function runMiddlewarePipeline(args, handler, processResult, isResult, errorHandler) {
  let { matches, request, params, context, unstable_pattern } = args;
  let tuples = matches.flatMap(
    (m) => m.route.middleware ? m.route.middleware.map((fn) => [m.route.id, fn]) : []
  );
  let result = await callRouteMiddleware(
    {
      request,
      params,
      context,
      unstable_pattern
    },
    tuples,
    handler,
    processResult,
    isResult,
    errorHandler
  );
  return result;
}
async function callRouteMiddleware(args, middlewares, handler, processResult, isResult, errorHandler, idx = 0) {
  let { request } = args;
  if (request.signal.aborted) {
    throw request.signal.reason ?? new Error(`Request aborted: ${request.method} ${request.url}`);
  }
  let tuple = middlewares[idx];
  if (!tuple) {
    let result = await handler();
    return result;
  }
  let [routeId, middleware] = tuple;
  let nextResult;
  let next = async () => {
    if (nextResult) {
      throw new Error("You may only call `next()` once per middleware");
    }
    try {
      let result = await callRouteMiddleware(
        args,
        middlewares,
        handler,
        processResult,
        isResult,
        errorHandler,
        idx + 1
      );
      nextResult = { value: result };
      return nextResult.value;
    } catch (error) {
      nextResult = { value: await errorHandler(error, routeId, nextResult) };
      return nextResult.value;
    }
  };
  try {
    let value = await middleware(args, next);
    let result = value != null ? processResult(value) : void 0;
    if (isResult(result)) {
      return result;
    } else if (nextResult) {
      return result ?? nextResult.value;
    } else {
      nextResult = { value: await next() };
      return nextResult.value;
    }
  } catch (error) {
    let response = await errorHandler(error, routeId, nextResult);
    return response;
  }
}
function getDataStrategyMatchLazyPromises(mapRouteProperties2, manifest, request, match, lazyRoutePropertiesToSkip) {
  let lazyMiddlewarePromise = loadLazyRouteProperty({
    key: "middleware",
    route: match.route,
    manifest,
    mapRouteProperties: mapRouteProperties2
  });
  let lazyRoutePromises = loadLazyRoute(
    match.route,
    isMutationMethod(request.method) ? "action" : "loader",
    manifest,
    mapRouteProperties2,
    lazyRoutePropertiesToSkip
  );
  return {
    middleware: lazyMiddlewarePromise,
    route: lazyRoutePromises.lazyRoutePromise,
    handler: lazyRoutePromises.lazyHandlerPromise
  };
}
function getDataStrategyMatch(mapRouteProperties2, manifest, request, unstable_pattern, match, lazyRoutePropertiesToSkip, scopedContext, shouldLoad, shouldRevalidateArgs = null, callSiteDefaultShouldRevalidate) {
  let isUsingNewApi = false;
  let _lazyPromises = getDataStrategyMatchLazyPromises(
    mapRouteProperties2,
    manifest,
    request,
    match,
    lazyRoutePropertiesToSkip
  );
  return {
    ...match,
    _lazyPromises,
    shouldLoad,
    shouldRevalidateArgs,
    shouldCallHandler(defaultShouldRevalidate) {
      isUsingNewApi = true;
      if (!shouldRevalidateArgs) {
        return shouldLoad;
      }
      if (typeof callSiteDefaultShouldRevalidate === "boolean") {
        return shouldRevalidateLoader(match, {
          ...shouldRevalidateArgs,
          defaultShouldRevalidate: callSiteDefaultShouldRevalidate
        });
      }
      if (typeof defaultShouldRevalidate === "boolean") {
        return shouldRevalidateLoader(match, {
          ...shouldRevalidateArgs,
          defaultShouldRevalidate
        });
      }
      return shouldRevalidateLoader(match, shouldRevalidateArgs);
    },
    resolve(handlerOverride) {
      let { lazy, loader, middleware } = match.route;
      let callHandler = isUsingNewApi || shouldLoad || handlerOverride && !isMutationMethod(request.method) && (lazy || loader);
      let isMiddlewareOnlyRoute = middleware && middleware.length > 0 && !loader && !lazy;
      if (callHandler && (isMutationMethod(request.method) || !isMiddlewareOnlyRoute)) {
        return callLoaderOrAction({
          request,
          unstable_pattern,
          match,
          lazyHandlerPromise: _lazyPromises?.handler,
          lazyRoutePromise: _lazyPromises?.route,
          handlerOverride,
          scopedContext
        });
      }
      return Promise.resolve({ type: "data", result: void 0 });
    }
  };
}
function getTargetedDataStrategyMatches(mapRouteProperties2, manifest, request, matches, targetMatch, lazyRoutePropertiesToSkip, scopedContext, shouldRevalidateArgs = null) {
  return matches.map((match) => {
    if (match.route.id !== targetMatch.route.id) {
      return {
        ...match,
        shouldLoad: false,
        shouldRevalidateArgs,
        shouldCallHandler: () => false,
        _lazyPromises: getDataStrategyMatchLazyPromises(
          mapRouteProperties2,
          manifest,
          request,
          match,
          lazyRoutePropertiesToSkip
        ),
        resolve: () => Promise.resolve({ type: "data", result: void 0 })
      };
    }
    return getDataStrategyMatch(
      mapRouteProperties2,
      manifest,
      request,
      getRoutePattern(matches),
      match,
      lazyRoutePropertiesToSkip,
      scopedContext,
      true,
      shouldRevalidateArgs
    );
  });
}
async function callDataStrategyImpl(dataStrategyImpl, request, matches, fetcherKey, scopedContext, isStaticHandler) {
  if (matches.some((m) => m._lazyPromises?.middleware)) {
    await Promise.all(matches.map((m) => m._lazyPromises?.middleware));
  }
  let dataStrategyArgs = {
    request,
    unstable_pattern: getRoutePattern(matches),
    params: matches[0].params,
    context: scopedContext,
    matches
  };
  let runClientMiddleware = (cb) => {
    let typedDataStrategyArgs = dataStrategyArgs;
    return runClientMiddlewarePipeline(typedDataStrategyArgs, () => {
      return cb({
        ...typedDataStrategyArgs,
        fetcherKey,
        runClientMiddleware: () => {
          throw new Error(
            "Cannot call `runClientMiddleware()` from within an `runClientMiddleware` handler"
          );
        }
      });
    });
  };
  let results = await dataStrategyImpl({
    ...dataStrategyArgs,
    fetcherKey,
    runClientMiddleware
  });
  try {
    await Promise.all(
      matches.flatMap((m) => [
        m._lazyPromises?.handler,
        m._lazyPromises?.route
      ])
    );
  } catch (e) {
  }
  return results;
}
async function callLoaderOrAction({
  request,
  unstable_pattern,
  match,
  lazyHandlerPromise,
  lazyRoutePromise,
  handlerOverride,
  scopedContext
}) {
  let result;
  let onReject;
  let isAction = isMutationMethod(request.method);
  let type = isAction ? "action" : "loader";
  let runHandler = (handler) => {
    let reject;
    let abortPromise = new Promise((_, r) => reject = r);
    onReject = () => reject();
    request.signal.addEventListener("abort", onReject);
    let actualHandler = (ctx) => {
      if (typeof handler !== "function") {
        return Promise.reject(
          new Error(
            `You cannot call the handler for a route which defines a boolean "${type}" [routeId: ${match.route.id}]`
          )
        );
      }
      return handler(
        {
          request,
          unstable_pattern,
          params: match.params,
          context: scopedContext
        },
        ...ctx !== void 0 ? [ctx] : []
      );
    };
    let handlerPromise = (async () => {
      try {
        let val = await (handlerOverride ? handlerOverride((ctx) => actualHandler(ctx)) : actualHandler());
        return { type: "data", result: val };
      } catch (e) {
        return { type: "error", result: e };
      }
    })();
    return Promise.race([handlerPromise, abortPromise]);
  };
  try {
    let handler = isAction ? match.route.action : match.route.loader;
    if (lazyHandlerPromise || lazyRoutePromise) {
      if (handler) {
        let handlerError;
        let [value] = await Promise.all([
          // If the handler throws, don't let it immediately bubble out,
          // since we need to let the lazy() execution finish so we know if this
          // route has a boundary that can handle the error
          runHandler(handler).catch((e) => {
            handlerError = e;
          }),
          // Ensure all lazy route promises are resolved before continuing
          lazyHandlerPromise,
          lazyRoutePromise
        ]);
        if (handlerError !== void 0) {
          throw handlerError;
        }
        result = value;
      } else {
        await lazyHandlerPromise;
        let handler2 = isAction ? match.route.action : match.route.loader;
        if (handler2) {
          [result] = await Promise.all([runHandler(handler2), lazyRoutePromise]);
        } else if (type === "action") {
          let url = new URL(request.url);
          let pathname = url.pathname + url.search;
          throw getInternalRouterError(405, {
            method: request.method,
            pathname,
            routeId: match.route.id
          });
        } else {
          return { type: "data", result: void 0 };
        }
      }
    } else if (!handler) {
      let url = new URL(request.url);
      let pathname = url.pathname + url.search;
      throw getInternalRouterError(404, {
        pathname
      });
    } else {
      result = await runHandler(handler);
    }
  } catch (e) {
    return { type: "error", result: e };
  } finally {
    if (onReject) {
      request.signal.removeEventListener("abort", onReject);
    }
  }
  return result;
}
async function parseResponseBody(response) {
  let contentType = response.headers.get("Content-Type");
  if (contentType && /\bapplication\/json\b/.test(contentType)) {
    return response.body == null ? null : response.json();
  }
  return response.text();
}
async function convertDataStrategyResultToDataResult(dataStrategyResult) {
  let { result, type } = dataStrategyResult;
  if (isResponse(result)) {
    let data2;
    try {
      data2 = await parseResponseBody(result);
    } catch (e) {
      return { type: "error", error: e };
    }
    if (type === "error") {
      return {
        type: "error",
        error: new ErrorResponseImpl(result.status, result.statusText, data2),
        statusCode: result.status,
        headers: result.headers
      };
    }
    return {
      type: "data",
      data: data2,
      statusCode: result.status,
      headers: result.headers
    };
  }
  if (type === "error") {
    if (isDataWithResponseInit(result)) {
      if (result.data instanceof Error) {
        return {
          type: "error",
          error: result.data,
          statusCode: result.init?.status,
          headers: result.init?.headers ? new Headers(result.init.headers) : void 0
        };
      }
      return {
        type: "error",
        error: dataWithResponseInitToErrorResponse(result),
        statusCode: isRouteErrorResponse(result) ? result.status : void 0,
        headers: result.init?.headers ? new Headers(result.init.headers) : void 0
      };
    }
    return {
      type: "error",
      error: result,
      statusCode: isRouteErrorResponse(result) ? result.status : void 0
    };
  }
  if (isDataWithResponseInit(result)) {
    return {
      type: "data",
      data: result.data,
      statusCode: result.init?.status,
      headers: result.init?.headers ? new Headers(result.init.headers) : void 0
    };
  }
  return { type: "data", data: result };
}
function normalizeRelativeRoutingRedirectResponse(response, request, routeId, matches, basename) {
  let location = response.headers.get("Location");
  invariant(
    location,
    "Redirects returned/thrown from loaders/actions must have a Location header"
  );
  if (!isAbsoluteUrl(location)) {
    let trimmedMatches = matches.slice(
      0,
      matches.findIndex((m) => m.route.id === routeId) + 1
    );
    location = normalizeTo(
      new URL(request.url),
      trimmedMatches,
      basename,
      location
    );
    response.headers.set("Location", location);
  }
  return response;
}
function normalizeRedirectLocation(location, currentUrl, basename) {
  if (isAbsoluteUrl(location)) {
    let normalizedLocation = location;
    let url = normalizedLocation.startsWith("//") ? new URL(currentUrl.protocol + normalizedLocation) : new URL(normalizedLocation);
    let isSameBasename = stripBasename(url.pathname, basename) != null;
    if (url.origin === currentUrl.origin && isSameBasename) {
      return url.pathname + url.search + url.hash;
    }
  }
  return location;
}
function createClientSideRequest(history, location, signal, submission) {
  let url = history.createURL(stripHashFromPath(location)).toString();
  let init = { signal };
  if (submission && isMutationMethod(submission.formMethod)) {
    let { formMethod, formEncType } = submission;
    init.method = formMethod.toUpperCase();
    if (formEncType === "application/json") {
      init.headers = new Headers({ "Content-Type": formEncType });
      init.body = JSON.stringify(submission.json);
    } else if (formEncType === "text/plain") {
      init.body = submission.text;
    } else if (formEncType === "application/x-www-form-urlencoded" && submission.formData) {
      init.body = convertFormDataToSearchParams(submission.formData);
    } else {
      init.body = submission.formData;
    }
  }
  return new Request(url, init);
}
function convertFormDataToSearchParams(formData) {
  let searchParams = new URLSearchParams();
  for (let [key, value] of formData.entries()) {
    searchParams.append(key, typeof value === "string" ? value : value.name);
  }
  return searchParams;
}
function convertSearchParamsToFormData(searchParams) {
  let formData = new FormData();
  for (let [key, value] of searchParams.entries()) {
    formData.append(key, value);
  }
  return formData;
}
function processRouteLoaderData(matches, results, pendingActionResult, isStaticHandler = false, skipLoaderErrorBubbling = false) {
  let loaderData = {};
  let errors = null;
  let statusCode;
  let foundError = false;
  let loaderHeaders = {};
  let pendingError = pendingActionResult && isErrorResult(pendingActionResult[1]) ? pendingActionResult[1].error : void 0;
  matches.forEach((match) => {
    if (!(match.route.id in results)) {
      return;
    }
    let id = match.route.id;
    let result = results[id];
    invariant(
      !isRedirectResult(result),
      "Cannot handle redirect results in processLoaderData"
    );
    if (isErrorResult(result)) {
      let error = result.error;
      if (pendingError !== void 0) {
        error = pendingError;
        pendingError = void 0;
      }
      errors = errors || {};
      if (skipLoaderErrorBubbling) {
        errors[id] = error;
      } else {
        let boundaryMatch = findNearestBoundary(matches, id);
        if (errors[boundaryMatch.route.id] == null) {
          errors[boundaryMatch.route.id] = error;
        }
      }
      if (!isStaticHandler) {
        loaderData[id] = ResetLoaderDataSymbol;
      }
      if (!foundError) {
        foundError = true;
        statusCode = isRouteErrorResponse(result.error) ? result.error.status : 500;
      }
      if (result.headers) {
        loaderHeaders[id] = result.headers;
      }
    } else {
      loaderData[id] = result.data;
      if (result.statusCode && result.statusCode !== 200 && !foundError) {
        statusCode = result.statusCode;
      }
      if (result.headers) {
        loaderHeaders[id] = result.headers;
      }
    }
  });
  if (pendingError !== void 0 && pendingActionResult) {
    errors = { [pendingActionResult[0]]: pendingError };
    if (pendingActionResult[2]) {
      loaderData[pendingActionResult[2]] = void 0;
    }
  }
  return {
    loaderData,
    errors,
    statusCode: statusCode || 200,
    loaderHeaders
  };
}
function processLoaderData(state, matches, results, pendingActionResult, revalidatingFetchers, fetcherResults) {
  let { loaderData, errors } = processRouteLoaderData(
    matches,
    results,
    pendingActionResult
  );
  revalidatingFetchers.filter((f) => !f.matches || f.matches.some((m) => m.shouldLoad)).forEach((rf) => {
    let { key, match, controller } = rf;
    if (controller && controller.signal.aborted) {
      return;
    }
    let result = fetcherResults[key];
    invariant(result, "Did not find corresponding fetcher result");
    if (isErrorResult(result)) {
      let boundaryMatch = findNearestBoundary(state.matches, match?.route.id);
      if (!(errors && errors[boundaryMatch.route.id])) {
        errors = {
          ...errors,
          [boundaryMatch.route.id]: result.error
        };
      }
      state.fetchers.delete(key);
    } else if (isRedirectResult(result)) {
      invariant(false, "Unhandled fetcher revalidation redirect");
    } else {
      let doneFetcher = getDoneFetcher(result.data);
      state.fetchers.set(key, doneFetcher);
    }
  });
  return { loaderData, errors };
}
function mergeLoaderData(loaderData, newLoaderData, matches, errors) {
  let mergedLoaderData = Object.entries(newLoaderData).filter(([, v]) => v !== ResetLoaderDataSymbol).reduce((merged, [k, v]) => {
    merged[k] = v;
    return merged;
  }, {});
  for (let match of matches) {
    let id = match.route.id;
    if (!newLoaderData.hasOwnProperty(id) && loaderData.hasOwnProperty(id) && match.route.loader) {
      mergedLoaderData[id] = loaderData[id];
    }
    if (errors && errors.hasOwnProperty(id)) {
      break;
    }
  }
  return mergedLoaderData;
}
function getActionDataForCommit(pendingActionResult) {
  if (!pendingActionResult) {
    return {};
  }
  return isErrorResult(pendingActionResult[1]) ? {
    // Clear out prior actionData on errors
    actionData: {}
  } : {
    actionData: {
      [pendingActionResult[0]]: pendingActionResult[1].data
    }
  };
}
function findNearestBoundary(matches, routeId) {
  let eligibleMatches = routeId ? matches.slice(0, matches.findIndex((m) => m.route.id === routeId) + 1) : [...matches];
  return eligibleMatches.reverse().find((m) => m.route.hasErrorBoundary === true) || matches[0];
}
function getShortCircuitMatches(routes2) {
  let route = routes2.length === 1 ? routes2[0] : routes2.find((r) => r.index || !r.path || r.path === "/") || {
    id: `__shim-error-route__`
  };
  return {
    matches: [
      {
        params: {},
        pathname: "",
        pathnameBase: "",
        route
      }
    ],
    route
  };
}
function getInternalRouterError(status, {
  pathname,
  routeId,
  method,
  type,
  message
} = {}) {
  let statusText = "Unknown Server Error";
  let errorMessage = "Unknown @remix-run/router error";
  if (status === 400) {
    statusText = "Bad Request";
    if (method && pathname && routeId) {
      errorMessage = `You made a ${method} request to "${pathname}" but did not provide a \`loader\` for route "${routeId}", so there is no way to handle the request.`;
    } else if (type === "invalid-body") {
      errorMessage = "Unable to encode submission body";
    }
  } else if (status === 403) {
    statusText = "Forbidden";
    errorMessage = `Route "${routeId}" does not match URL "${pathname}"`;
  } else if (status === 404) {
    statusText = "Not Found";
    errorMessage = `No route matches URL "${pathname}"`;
  } else if (status === 405) {
    statusText = "Method Not Allowed";
    if (method && pathname && routeId) {
      errorMessage = `You made a ${method.toUpperCase()} request to "${pathname}" but did not provide an \`action\` for route "${routeId}", so there is no way to handle the request.`;
    } else if (method) {
      errorMessage = `Invalid request method "${method.toUpperCase()}"`;
    }
  }
  return new ErrorResponseImpl(
    status || 500,
    statusText,
    new Error(errorMessage),
    true
  );
}
function findRedirect(results) {
  let entries = Object.entries(results);
  for (let i = entries.length - 1; i >= 0; i--) {
    let [key, result] = entries[i];
    if (isRedirectResult(result)) {
      return { key, result };
    }
  }
}
function stripHashFromPath(path) {
  let parsedPath = typeof path === "string" ? parsePath(path) : path;
  return createPath({ ...parsedPath, hash: "" });
}
function isHashChangeOnly(a, b) {
  if (a.pathname !== b.pathname || a.search !== b.search) {
    return false;
  }
  if (a.hash === "") {
    return b.hash !== "";
  } else if (a.hash === b.hash) {
    return true;
  } else if (b.hash !== "") {
    return true;
  }
  return false;
}
function dataWithResponseInitToErrorResponse(data2) {
  return new ErrorResponseImpl(
    data2.init?.status ?? 500,
    data2.init?.statusText ?? "Internal Server Error",
    data2.data
  );
}
function isDataStrategyResults(result) {
  return result != null && typeof result === "object" && Object.entries(result).every(
    ([key, value]) => typeof key === "string" && isDataStrategyResult(value)
  );
}
function isDataStrategyResult(result) {
  return result != null && typeof result === "object" && "type" in result && "result" in result && (result.type === "data" || result.type === "error");
}
function isRedirectDataStrategyResult(result) {
  return isResponse(result.result) && redirectStatusCodes.has(result.result.status);
}
function isErrorResult(result) {
  return result.type === "error";
}
function isRedirectResult(result) {
  return (result && result.type) === "redirect";
}
function isDataWithResponseInit(value) {
  return typeof value === "object" && value != null && "type" in value && "data" in value && "init" in value && value.type === "DataWithResponseInit";
}
function isResponse(value) {
  return value != null && typeof value.status === "number" && typeof value.statusText === "string" && typeof value.headers === "object" && typeof value.body !== "undefined";
}
function isRedirectStatusCode(statusCode) {
  return redirectStatusCodes.has(statusCode);
}
function isRedirectResponse(result) {
  return isResponse(result) && isRedirectStatusCode(result.status) && result.headers.has("Location");
}
function isValidMethod(method) {
  return validRequestMethods.has(method.toUpperCase());
}
function isMutationMethod(method) {
  return validMutationMethods.has(method.toUpperCase());
}
function hasNakedIndexQuery(search) {
  return new URLSearchParams(search).getAll("index").some((v) => v === "");
}
function getTargetMatch(matches, location) {
  let search = typeof location === "string" ? parsePath(location).search : location.search;
  if (matches[matches.length - 1].route.index && hasNakedIndexQuery(search || "")) {
    return matches[matches.length - 1];
  }
  let pathMatches = getPathContributingMatches(matches);
  return pathMatches[pathMatches.length - 1];
}
function getSubmissionFromNavigation(navigation) {
  let { formMethod, formAction, formEncType, text, formData, json } = navigation;
  if (!formMethod || !formAction || !formEncType) {
    return;
  }
  if (text != null) {
    return {
      formMethod,
      formAction,
      formEncType,
      formData: void 0,
      json: void 0,
      text
    };
  } else if (formData != null) {
    return {
      formMethod,
      formAction,
      formEncType,
      formData,
      json: void 0,
      text: void 0
    };
  } else if (json !== void 0) {
    return {
      formMethod,
      formAction,
      formEncType,
      formData: void 0,
      json,
      text: void 0
    };
  }
}
function getLoadingNavigation(location, submission) {
  if (submission) {
    let navigation = {
      state: "loading",
      location,
      formMethod: submission.formMethod,
      formAction: submission.formAction,
      formEncType: submission.formEncType,
      formData: submission.formData,
      json: submission.json,
      text: submission.text
    };
    return navigation;
  } else {
    let navigation = {
      state: "loading",
      location,
      formMethod: void 0,
      formAction: void 0,
      formEncType: void 0,
      formData: void 0,
      json: void 0,
      text: void 0
    };
    return navigation;
  }
}
function getSubmittingNavigation(location, submission) {
  let navigation = {
    state: "submitting",
    location,
    formMethod: submission.formMethod,
    formAction: submission.formAction,
    formEncType: submission.formEncType,
    formData: submission.formData,
    json: submission.json,
    text: submission.text
  };
  return navigation;
}
function getLoadingFetcher(submission, data2) {
  if (submission) {
    let fetcher = {
      state: "loading",
      formMethod: submission.formMethod,
      formAction: submission.formAction,
      formEncType: submission.formEncType,
      formData: submission.formData,
      json: submission.json,
      text: submission.text,
      data: data2
    };
    return fetcher;
  } else {
    let fetcher = {
      state: "loading",
      formMethod: void 0,
      formAction: void 0,
      formEncType: void 0,
      formData: void 0,
      json: void 0,
      text: void 0,
      data: data2
    };
    return fetcher;
  }
}
function getSubmittingFetcher(submission, existingFetcher) {
  let fetcher = {
    state: "submitting",
    formMethod: submission.formMethod,
    formAction: submission.formAction,
    formEncType: submission.formEncType,
    formData: submission.formData,
    json: submission.json,
    text: submission.text,
    data: existingFetcher ? existingFetcher.data : void 0
  };
  return fetcher;
}
function getDoneFetcher(data2) {
  let fetcher = {
    state: "idle",
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
    data: data2
  };
  return fetcher;
}
function restoreAppliedTransitions(_window, transitions) {
  try {
    let sessionPositions = _window.sessionStorage.getItem(
      TRANSITIONS_STORAGE_KEY
    );
    if (sessionPositions) {
      let json = JSON.parse(sessionPositions);
      for (let [k, v] of Object.entries(json || {})) {
        if (v && Array.isArray(v)) {
          transitions.set(k, new Set(v || []));
        }
      }
    }
  } catch (e) {
  }
}
function persistAppliedTransitions(_window, transitions) {
  if (transitions.size > 0) {
    let json = {};
    for (let [k, v] of transitions) {
      json[k] = [...v];
    }
    try {
      _window.sessionStorage.setItem(
        TRANSITIONS_STORAGE_KEY,
        JSON.stringify(json)
      );
    } catch (error) {
      warning(
        false,
        `Failed to save applied view transitions in sessionStorage (${error}).`
      );
    }
  }
}
function createDeferred() {
  let resolve;
  let reject;
  let promise = new Promise((res, rej) => {
    resolve = async (val) => {
      res(val);
      try {
        await promise;
      } catch (e) {
      }
    };
    reject = async (error) => {
      rej(error);
      try {
        await promise;
      } catch (e) {
      }
    };
  });
  return {
    promise,
    //@ts-ignore
    resolve,
    //@ts-ignore
    reject
  };
}
var DataRouterContext = React3.createContext(null);
DataRouterContext.displayName = "DataRouter";
var DataRouterStateContext = React3.createContext(null);
DataRouterStateContext.displayName = "DataRouterState";
var RSCRouterContext = React3.createContext(false);
function useIsRSCRouterContext() {
  return React3.useContext(RSCRouterContext);
}
var ViewTransitionContext = React3.createContext({
  isTransitioning: false
});
ViewTransitionContext.displayName = "ViewTransition";
var FetchersContext = React3.createContext(
  /* @__PURE__ */ new Map()
);
FetchersContext.displayName = "Fetchers";
var AwaitContext = React3.createContext(null);
AwaitContext.displayName = "Await";
var NavigationContext = React3.createContext(
  null
);
NavigationContext.displayName = "Navigation";
var LocationContext = React3.createContext(
  null
);
LocationContext.displayName = "Location";
var RouteContext = React3.createContext({
  outlet: null,
  matches: [],
  isDataRoute: false
});
RouteContext.displayName = "Route";
var RouteErrorContext = React3.createContext(null);
RouteErrorContext.displayName = "RouteError";
var ERROR_DIGEST_BASE = "REACT_ROUTER_ERROR";
var ERROR_DIGEST_REDIRECT = "REDIRECT";
var ERROR_DIGEST_ROUTE_ERROR_RESPONSE = "ROUTE_ERROR_RESPONSE";
function decodeRedirectErrorDigest(digest) {
  if (digest.startsWith(`${ERROR_DIGEST_BASE}:${ERROR_DIGEST_REDIRECT}:{`)) {
    try {
      let parsed = JSON.parse(digest.slice(28));
      if (typeof parsed === "object" && parsed && typeof parsed.status === "number" && typeof parsed.statusText === "string" && typeof parsed.location === "string" && typeof parsed.reloadDocument === "boolean" && typeof parsed.replace === "boolean") {
        return parsed;
      }
    } catch {
    }
  }
}
function decodeRouteErrorResponseDigest(digest) {
  if (digest.startsWith(
    `${ERROR_DIGEST_BASE}:${ERROR_DIGEST_ROUTE_ERROR_RESPONSE}:{`
  )) {
    try {
      let parsed = JSON.parse(digest.slice(40));
      if (typeof parsed === "object" && parsed && typeof parsed.status === "number" && typeof parsed.statusText === "string") {
        return new ErrorResponseImpl(
          parsed.status,
          parsed.statusText,
          parsed.data
        );
      }
    } catch {
    }
  }
}
function useHref(to, { relative } = {}) {
  invariant(
    useInRouterContext(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    `useHref() may be used only in the context of a <Router> component.`
  );
  let { basename, navigator } = React3.useContext(NavigationContext);
  let { hash, pathname, search } = useResolvedPath(to, { relative });
  let joinedPathname = pathname;
  if (basename !== "/") {
    joinedPathname = pathname === "/" ? basename : joinPaths([basename, pathname]);
  }
  return navigator.createHref({ pathname: joinedPathname, search, hash });
}
function useInRouterContext() {
  return React3.useContext(LocationContext) != null;
}
function useLocation() {
  invariant(
    useInRouterContext(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    `useLocation() may be used only in the context of a <Router> component.`
  );
  return React3.useContext(LocationContext).location;
}
var navigateEffectWarning = `You should call navigate() in a React.useEffect(), not when your component is first rendered.`;
function useIsomorphicLayoutEffect(cb) {
  let isStatic = React3.useContext(NavigationContext).static;
  if (!isStatic) {
    React3.useLayoutEffect(cb);
  }
}
function useNavigate() {
  let { isDataRoute } = React3.useContext(RouteContext);
  return isDataRoute ? useNavigateStable() : useNavigateUnstable();
}
function useNavigateUnstable() {
  invariant(
    useInRouterContext(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    `useNavigate() may be used only in the context of a <Router> component.`
  );
  let dataRouterContext = React3.useContext(DataRouterContext);
  let { basename, navigator } = React3.useContext(NavigationContext);
  let { matches } = React3.useContext(RouteContext);
  let { pathname: locationPathname } = useLocation();
  let routePathnamesJson = JSON.stringify(getResolveToMatches(matches));
  let activeRef = React3.useRef(false);
  useIsomorphicLayoutEffect(() => {
    activeRef.current = true;
  });
  let navigate = React3.useCallback(
    (to, options = {}) => {
      warning(activeRef.current, navigateEffectWarning);
      if (!activeRef.current) return;
      if (typeof to === "number") {
        navigator.go(to);
        return;
      }
      let path = resolveTo(
        to,
        JSON.parse(routePathnamesJson),
        locationPathname,
        options.relative === "path"
      );
      if (dataRouterContext == null && basename !== "/") {
        path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname]);
      }
      (!!options.replace ? navigator.replace : navigator.push)(
        path,
        options.state,
        options
      );
    },
    [
      basename,
      navigator,
      routePathnamesJson,
      locationPathname,
      dataRouterContext
    ]
  );
  return navigate;
}
var OutletContext = React3.createContext(null);
function useOutletContext() {
  return React3.useContext(OutletContext);
}
function useOutlet(context) {
  let outlet = React3.useContext(RouteContext).outlet;
  return React3.useMemo(
    () => outlet && /* @__PURE__ */ React3.createElement(OutletContext.Provider, { value: context }, outlet),
    [outlet, context]
  );
}
function useParams() {
  let { matches } = React3.useContext(RouteContext);
  let routeMatch = matches[matches.length - 1];
  return routeMatch ? routeMatch.params : {};
}
function useResolvedPath(to, { relative } = {}) {
  let { matches } = React3.useContext(RouteContext);
  let { pathname: locationPathname } = useLocation();
  let routePathnamesJson = JSON.stringify(getResolveToMatches(matches));
  return React3.useMemo(
    () => resolveTo(
      to,
      JSON.parse(routePathnamesJson),
      locationPathname,
      relative === "path"
    ),
    [to, routePathnamesJson, locationPathname, relative]
  );
}
function useRoutesImpl(routes2, locationArg, dataRouterState, onError, future) {
  invariant(
    useInRouterContext(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    `useRoutes() may be used only in the context of a <Router> component.`
  );
  let { navigator } = React3.useContext(NavigationContext);
  let { matches: parentMatches } = React3.useContext(RouteContext);
  let routeMatch = parentMatches[parentMatches.length - 1];
  let parentParams = routeMatch ? routeMatch.params : {};
  let parentPathname = routeMatch ? routeMatch.pathname : "/";
  let parentPathnameBase = routeMatch ? routeMatch.pathnameBase : "/";
  let parentRoute = routeMatch && routeMatch.route;
  {
    let parentPath = parentRoute && parentRoute.path || "";
    warningOnce(
      parentPathname,
      !parentRoute || parentPath.endsWith("*") || parentPath.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${parentPathname}" (under <Route path="${parentPath}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${parentPath}"> to <Route path="${parentPath === "/" ? "*" : `${parentPath}/*`}">.`
    );
  }
  let locationFromContext = useLocation();
  let location;
  {
    location = locationFromContext;
  }
  let pathname = location.pathname || "/";
  let remainingPathname = pathname;
  if (parentPathnameBase !== "/") {
    let parentSegments = parentPathnameBase.replace(/^\//, "").split("/");
    let segments = pathname.replace(/^\//, "").split("/");
    remainingPathname = "/" + segments.slice(parentSegments.length).join("/");
  }
  let matches = matchRoutes(routes2, { pathname: remainingPathname });
  {
    warning(
      parentRoute || matches != null,
      `No routes matched location "${location.pathname}${location.search}${location.hash}" `
    );
    warning(
      matches == null || matches[matches.length - 1].route.element !== void 0 || matches[matches.length - 1].route.Component !== void 0 || matches[matches.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${location.pathname}${location.search}${location.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
    );
  }
  let renderedMatches = _renderMatches(
    matches && matches.map(
      (match) => Object.assign({}, match, {
        params: Object.assign({}, parentParams, match.params),
        pathname: joinPaths([
          parentPathnameBase,
          // Re-encode pathnames that were decoded inside matchRoutes.
          // Pre-encode `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          navigator.encodeLocation ? navigator.encodeLocation(
            match.pathname.replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : match.pathname
        ]),
        pathnameBase: match.pathnameBase === "/" ? parentPathnameBase : joinPaths([
          parentPathnameBase,
          // Re-encode pathnames that were decoded inside matchRoutes
          // Pre-encode `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          navigator.encodeLocation ? navigator.encodeLocation(
            match.pathnameBase.replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : match.pathnameBase
        ])
      })
    ),
    parentMatches,
    dataRouterState,
    onError,
    future
  );
  return renderedMatches;
}
function DefaultErrorComponent() {
  let error = useRouteError();
  let message = isRouteErrorResponse(error) ? `${error.status} ${error.statusText}` : error instanceof Error ? error.message : JSON.stringify(error);
  let stack = error instanceof Error ? error.stack : null;
  let lightgrey = "rgba(200,200,200, 0.5)";
  let preStyles = { padding: "0.5rem", backgroundColor: lightgrey };
  let codeStyles = { padding: "2px 4px", backgroundColor: lightgrey };
  let devInfo = null;
  {
    console.error(
      "Error handled by React Router default ErrorBoundary:",
      error
    );
    devInfo = /* @__PURE__ */ React3.createElement(React3.Fragment, null, /* @__PURE__ */ React3.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ React3.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ React3.createElement("code", { style: codeStyles }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ React3.createElement("code", { style: codeStyles }, "errorElement"), " prop on your route."));
  }
  return /* @__PURE__ */ React3.createElement(React3.Fragment, null, /* @__PURE__ */ React3.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ React3.createElement("h3", { style: { fontStyle: "italic" } }, message), stack ? /* @__PURE__ */ React3.createElement("pre", { style: preStyles }, stack) : null, devInfo);
}
var defaultErrorElement = /* @__PURE__ */ React3.createElement(DefaultErrorComponent, null);
var RenderErrorBoundary = class extends React3.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: props.location,
      revalidation: props.revalidation,
      error: props.error
    };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  static getDerivedStateFromProps(props, state) {
    if (state.location !== props.location || state.revalidation !== "idle" && props.revalidation === "idle") {
      return {
        error: props.error,
        location: props.location,
        revalidation: props.revalidation
      };
    }
    return {
      error: props.error !== void 0 ? props.error : state.error,
      location: state.location,
      revalidation: props.revalidation || state.revalidation
    };
  }
  componentDidCatch(error, errorInfo) {
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    } else {
      console.error(
        "React Router caught the following error during render",
        error
      );
    }
  }
  render() {
    let error = this.state.error;
    if (this.context && typeof error === "object" && error && "digest" in error && typeof error.digest === "string") {
      const decoded = decodeRouteErrorResponseDigest(error.digest);
      if (decoded) error = decoded;
    }
    let result = error !== void 0 ? /* @__PURE__ */ React3.createElement(RouteContext.Provider, { value: this.props.routeContext }, /* @__PURE__ */ React3.createElement(
      RouteErrorContext.Provider,
      {
        value: error,
        children: this.props.component
      }
    )) : this.props.children;
    if (this.context) {
      return /* @__PURE__ */ React3.createElement(RSCErrorHandler, { error }, result);
    }
    return result;
  }
};
RenderErrorBoundary.contextType = RSCRouterContext;
var errorRedirectHandledMap = /* @__PURE__ */ new WeakMap();
function RSCErrorHandler({
  children,
  error
}) {
  let { basename } = React3.useContext(NavigationContext);
  if (typeof error === "object" && error && "digest" in error && typeof error.digest === "string") {
    let redirect2 = decodeRedirectErrorDigest(error.digest);
    if (redirect2) {
      let existingRedirect = errorRedirectHandledMap.get(error);
      if (existingRedirect) throw existingRedirect;
      let parsed = parseToInfo(redirect2.location, basename);
      if (isBrowser && !errorRedirectHandledMap.get(error)) {
        if (parsed.isExternal || redirect2.reloadDocument) {
          window.location.href = parsed.absoluteURL || parsed.to;
        } else {
          const redirectPromise = Promise.resolve().then(
            () => window.__reactRouterDataRouter.navigate(parsed.to, {
              replace: redirect2.replace
            })
          );
          errorRedirectHandledMap.set(error, redirectPromise);
          throw redirectPromise;
        }
      }
      return /* @__PURE__ */ React3.createElement(
        "meta",
        {
          httpEquiv: "refresh",
          content: `0;url=${parsed.absoluteURL || parsed.to}`
        }
      );
    }
  }
  return children;
}
function RenderedRoute({ routeContext, match, children }) {
  let dataRouterContext = React3.useContext(DataRouterContext);
  if (dataRouterContext && dataRouterContext.static && dataRouterContext.staticContext && (match.route.errorElement || match.route.ErrorBoundary)) {
    dataRouterContext.staticContext._deepestRenderedBoundaryId = match.route.id;
  }
  return /* @__PURE__ */ React3.createElement(RouteContext.Provider, { value: routeContext }, children);
}
function _renderMatches(matches, parentMatches = [], dataRouterState = null, onErrorHandler = null, future = null) {
  if (matches == null) {
    if (!dataRouterState) {
      return null;
    }
    if (dataRouterState.errors) {
      matches = dataRouterState.matches;
    } else if (parentMatches.length === 0 && !dataRouterState.initialized && dataRouterState.matches.length > 0) {
      matches = dataRouterState.matches;
    } else {
      return null;
    }
  }
  let renderedMatches = matches;
  let errors = dataRouterState?.errors;
  if (errors != null) {
    let errorIndex = renderedMatches.findIndex(
      (m) => m.route.id && errors?.[m.route.id] !== void 0
    );
    invariant(
      errorIndex >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(
        errors
      ).join(",")}`
    );
    renderedMatches = renderedMatches.slice(
      0,
      Math.min(renderedMatches.length, errorIndex + 1)
    );
  }
  let renderFallback = false;
  let fallbackIndex = -1;
  if (dataRouterState) {
    for (let i = 0; i < renderedMatches.length; i++) {
      let match = renderedMatches[i];
      if (match.route.HydrateFallback || match.route.hydrateFallbackElement) {
        fallbackIndex = i;
      }
      if (match.route.id) {
        let { loaderData, errors: errors2 } = dataRouterState;
        let needsToRunLoader = match.route.loader && !loaderData.hasOwnProperty(match.route.id) && (!errors2 || errors2[match.route.id] === void 0);
        if (match.route.lazy || needsToRunLoader) {
          renderFallback = true;
          if (fallbackIndex >= 0) {
            renderedMatches = renderedMatches.slice(0, fallbackIndex + 1);
          } else {
            renderedMatches = [renderedMatches[0]];
          }
          break;
        }
      }
    }
  }
  let onError = dataRouterState && onErrorHandler ? (error, errorInfo) => {
    onErrorHandler(error, {
      location: dataRouterState.location,
      params: dataRouterState.matches?.[0]?.params ?? {},
      unstable_pattern: getRoutePattern(dataRouterState.matches),
      errorInfo
    });
  } : void 0;
  return renderedMatches.reduceRight(
    (outlet, match, index) => {
      let error;
      let shouldRenderHydrateFallback = false;
      let errorElement = null;
      let hydrateFallbackElement = null;
      if (dataRouterState) {
        error = errors && match.route.id ? errors[match.route.id] : void 0;
        errorElement = match.route.errorElement || defaultErrorElement;
        if (renderFallback) {
          if (fallbackIndex < 0 && index === 0) {
            warningOnce(
              "route-fallback",
              false,
              "No `HydrateFallback` element provided to render during initial hydration"
            );
            shouldRenderHydrateFallback = true;
            hydrateFallbackElement = null;
          } else if (fallbackIndex === index) {
            shouldRenderHydrateFallback = true;
            hydrateFallbackElement = match.route.hydrateFallbackElement || null;
          }
        }
      }
      let matches2 = parentMatches.concat(renderedMatches.slice(0, index + 1));
      let getChildren = () => {
        let children;
        if (error) {
          children = errorElement;
        } else if (shouldRenderHydrateFallback) {
          children = hydrateFallbackElement;
        } else if (match.route.Component) {
          children = /* @__PURE__ */ React3.createElement(match.route.Component, null);
        } else if (match.route.element) {
          children = match.route.element;
        } else {
          children = outlet;
        }
        return /* @__PURE__ */ React3.createElement(
          RenderedRoute,
          {
            match,
            routeContext: {
              outlet,
              matches: matches2,
              isDataRoute: dataRouterState != null
            },
            children
          }
        );
      };
      return dataRouterState && (match.route.ErrorBoundary || match.route.errorElement || index === 0) ? /* @__PURE__ */ React3.createElement(
        RenderErrorBoundary,
        {
          location: dataRouterState.location,
          revalidation: dataRouterState.revalidation,
          component: errorElement,
          error,
          children: getChildren(),
          routeContext: { outlet: null, matches: matches2, isDataRoute: true },
          onError
        }
      ) : getChildren();
    },
    null
  );
}
function getDataRouterConsoleError(hookName) {
  return `${hookName} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function useDataRouterContext(hookName) {
  let ctx = React3.useContext(DataRouterContext);
  invariant(ctx, getDataRouterConsoleError(hookName));
  return ctx;
}
function useDataRouterState(hookName) {
  let state = React3.useContext(DataRouterStateContext);
  invariant(state, getDataRouterConsoleError(hookName));
  return state;
}
function useRouteContext(hookName) {
  let route = React3.useContext(RouteContext);
  invariant(route, getDataRouterConsoleError(hookName));
  return route;
}
function useCurrentRouteId(hookName) {
  let route = useRouteContext(hookName);
  let thisRoute = route.matches[route.matches.length - 1];
  invariant(
    thisRoute.route.id,
    `${hookName} can only be used on routes that contain a unique "id"`
  );
  return thisRoute.route.id;
}
function useRouteId() {
  return useCurrentRouteId(
    "useRouteId"
    /* UseRouteId */
  );
}
function useRouteError() {
  let error = React3.useContext(RouteErrorContext);
  let state = useDataRouterState(
    "useRouteError"
    /* UseRouteError */
  );
  let routeId = useCurrentRouteId(
    "useRouteError"
    /* UseRouteError */
  );
  if (error !== void 0) {
    return error;
  }
  return state.errors?.[routeId];
}
function useNavigateStable() {
  let { router } = useDataRouterContext(
    "useNavigate"
    /* UseNavigateStable */
  );
  let id = useCurrentRouteId(
    "useNavigate"
    /* UseNavigateStable */
  );
  let activeRef = React3.useRef(false);
  useIsomorphicLayoutEffect(() => {
    activeRef.current = true;
  });
  let navigate = React3.useCallback(
    async (to, options = {}) => {
      warning(activeRef.current, navigateEffectWarning);
      if (!activeRef.current) return;
      if (typeof to === "number") {
        await router.navigate(to);
      } else {
        await router.navigate(to, { fromRouteId: id, ...options });
      }
    },
    [router, id]
  );
  return navigate;
}
var alreadyWarned = {};
function warningOnce(key, cond, message) {
  if (!cond && !alreadyWarned[key]) {
    alreadyWarned[key] = true;
    warning(false, message);
  }
}
var alreadyWarned2 = {};
function warnOnce(condition, message) {
  if (!condition && !alreadyWarned2[message]) {
    alreadyWarned2[message] = true;
    console.warn(message);
  }
}
var USE_OPTIMISTIC = "useOptimistic";
var useOptimisticImpl = React3[USE_OPTIMISTIC];
var stableUseOptimisticSetter = () => void 0;
function useOptimisticSafe(val) {
  if (useOptimisticImpl) {
    return useOptimisticImpl(val);
  } else {
    return [val, stableUseOptimisticSetter];
  }
}
function mapRouteProperties(route) {
  let updates = {
    // Note: this check also occurs in createRoutesFromChildren so update
    // there if you change this -- please and thank you!
    hasErrorBoundary: route.hasErrorBoundary || route.ErrorBoundary != null || route.errorElement != null
  };
  if (route.Component) {
    {
      if (route.element) {
        warning(
          false,
          "You should not include both `Component` and `element` on your route - `Component` will be used."
        );
      }
    }
    Object.assign(updates, {
      element: React3.createElement(route.Component),
      Component: void 0
    });
  }
  if (route.HydrateFallback) {
    {
      if (route.hydrateFallbackElement) {
        warning(
          false,
          "You should not include both `HydrateFallback` and `hydrateFallbackElement` on your route - `HydrateFallback` will be used."
        );
      }
    }
    Object.assign(updates, {
      hydrateFallbackElement: React3.createElement(route.HydrateFallback),
      HydrateFallback: void 0
    });
  }
  if (route.ErrorBoundary) {
    {
      if (route.errorElement) {
        warning(
          false,
          "You should not include both `ErrorBoundary` and `errorElement` on your route - `ErrorBoundary` will be used."
        );
      }
    }
    Object.assign(updates, {
      errorElement: React3.createElement(route.ErrorBoundary),
      ErrorBoundary: void 0
    });
  }
  return updates;
}
var hydrationRouteProperties = [
  "HydrateFallback",
  "hydrateFallbackElement"
];
function createMemoryRouter(routes2, opts) {
  return createRouter({
    basename: opts?.basename,
    getContext: opts?.getContext,
    future: opts?.future,
    history: createMemoryHistory({
      initialEntries: opts?.initialEntries,
      initialIndex: opts?.initialIndex
    }),
    hydrationData: opts?.hydrationData,
    routes: routes2,
    hydrationRouteProperties,
    mapRouteProperties,
    dataStrategy: opts?.dataStrategy,
    patchRoutesOnNavigation: opts?.patchRoutesOnNavigation,
    unstable_instrumentations: opts?.unstable_instrumentations
  }).initialize();
}
var Deferred = class {
  constructor() {
    this.status = "pending";
    this.promise = new Promise((resolve, reject) => {
      this.resolve = (value) => {
        if (this.status === "pending") {
          this.status = "resolved";
          resolve(value);
        }
      };
      this.reject = (reason) => {
        if (this.status === "pending") {
          this.status = "rejected";
          reject(reason);
        }
      };
    });
  }
};
function RouterProvider({
  router,
  flushSync: reactDomFlushSyncImpl,
  onError,
  unstable_useTransitions
}) {
  let unstable_rsc = useIsRSCRouterContext();
  unstable_useTransitions = unstable_rsc || unstable_useTransitions;
  let [_state, setStateImpl] = React3.useState(router.state);
  let [state, setOptimisticState] = useOptimisticSafe(_state);
  let [pendingState, setPendingState] = React3.useState();
  let [vtContext, setVtContext] = React3.useState({
    isTransitioning: false
  });
  let [renderDfd, setRenderDfd] = React3.useState();
  let [transition, setTransition] = React3.useState();
  let [interruption, setInterruption] = React3.useState();
  let fetcherData = React3.useRef(/* @__PURE__ */ new Map());
  let setState = React3.useCallback(
    (newState, { deletedFetchers, newErrors, flushSync, viewTransitionOpts }) => {
      if (newErrors && onError) {
        Object.values(newErrors).forEach(
          (error) => onError(error, {
            location: newState.location,
            params: newState.matches[0]?.params ?? {},
            unstable_pattern: getRoutePattern(newState.matches)
          })
        );
      }
      newState.fetchers.forEach((fetcher, key) => {
        if (fetcher.data !== void 0) {
          fetcherData.current.set(key, fetcher.data);
        }
      });
      deletedFetchers.forEach((key) => fetcherData.current.delete(key));
      warnOnce(
        flushSync === false || reactDomFlushSyncImpl != null,
        'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.'
      );
      let isViewTransitionAvailable = router.window != null && router.window.document != null && typeof router.window.document.startViewTransition === "function";
      warnOnce(
        viewTransitionOpts == null || isViewTransitionAvailable,
        "You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available."
      );
      if (!viewTransitionOpts || !isViewTransitionAvailable) {
        if (reactDomFlushSyncImpl && flushSync) {
          reactDomFlushSyncImpl(() => setStateImpl(newState));
        } else if (unstable_useTransitions === false) {
          setStateImpl(newState);
        } else {
          React3.startTransition(() => {
            if (unstable_useTransitions === true) {
              setOptimisticState((s) => getOptimisticRouterState(s, newState));
            }
            setStateImpl(newState);
          });
        }
        return;
      }
      if (reactDomFlushSyncImpl && flushSync) {
        reactDomFlushSyncImpl(() => {
          if (transition) {
            renderDfd?.resolve();
            transition.skipTransition();
          }
          setVtContext({
            isTransitioning: true,
            flushSync: true,
            currentLocation: viewTransitionOpts.currentLocation,
            nextLocation: viewTransitionOpts.nextLocation
          });
        });
        let t = router.window.document.startViewTransition(() => {
          reactDomFlushSyncImpl(() => setStateImpl(newState));
        });
        t.finished.finally(() => {
          reactDomFlushSyncImpl(() => {
            setRenderDfd(void 0);
            setTransition(void 0);
            setPendingState(void 0);
            setVtContext({ isTransitioning: false });
          });
        });
        reactDomFlushSyncImpl(() => setTransition(t));
        return;
      }
      if (transition) {
        renderDfd?.resolve();
        transition.skipTransition();
        setInterruption({
          state: newState,
          currentLocation: viewTransitionOpts.currentLocation,
          nextLocation: viewTransitionOpts.nextLocation
        });
      } else {
        setPendingState(newState);
        setVtContext({
          isTransitioning: true,
          flushSync: false,
          currentLocation: viewTransitionOpts.currentLocation,
          nextLocation: viewTransitionOpts.nextLocation
        });
      }
    },
    [
      router.window,
      reactDomFlushSyncImpl,
      transition,
      renderDfd,
      unstable_useTransitions,
      setOptimisticState,
      onError
    ]
  );
  React3.useLayoutEffect(() => router.subscribe(setState), [router, setState]);
  React3.useEffect(() => {
    if (vtContext.isTransitioning && !vtContext.flushSync) {
      setRenderDfd(new Deferred());
    }
  }, [vtContext]);
  React3.useEffect(() => {
    if (renderDfd && pendingState && router.window) {
      let newState = pendingState;
      let renderPromise = renderDfd.promise;
      let transition2 = router.window.document.startViewTransition(async () => {
        if (unstable_useTransitions === false) {
          setStateImpl(newState);
        } else {
          React3.startTransition(() => {
            if (unstable_useTransitions === true) {
              setOptimisticState((s) => getOptimisticRouterState(s, newState));
            }
            setStateImpl(newState);
          });
        }
        await renderPromise;
      });
      transition2.finished.finally(() => {
        setRenderDfd(void 0);
        setTransition(void 0);
        setPendingState(void 0);
        setVtContext({ isTransitioning: false });
      });
      setTransition(transition2);
    }
  }, [
    pendingState,
    renderDfd,
    router.window,
    unstable_useTransitions,
    setOptimisticState
  ]);
  React3.useEffect(() => {
    if (renderDfd && pendingState && state.location.key === pendingState.location.key) {
      renderDfd.resolve();
    }
  }, [renderDfd, transition, state.location, pendingState]);
  React3.useEffect(() => {
    if (!vtContext.isTransitioning && interruption) {
      setPendingState(interruption.state);
      setVtContext({
        isTransitioning: true,
        flushSync: false,
        currentLocation: interruption.currentLocation,
        nextLocation: interruption.nextLocation
      });
      setInterruption(void 0);
    }
  }, [vtContext.isTransitioning, interruption]);
  let navigator = React3.useMemo(() => {
    return {
      createHref: router.createHref,
      encodeLocation: router.encodeLocation,
      go: (n) => router.navigate(n),
      push: (to, state2, opts) => router.navigate(to, {
        state: state2,
        preventScrollReset: opts?.preventScrollReset
      }),
      replace: (to, state2, opts) => router.navigate(to, {
        replace: true,
        state: state2,
        preventScrollReset: opts?.preventScrollReset
      })
    };
  }, [router]);
  let basename = router.basename || "/";
  let dataRouterContext = React3.useMemo(
    () => ({
      router,
      navigator,
      static: false,
      basename,
      onError
    }),
    [router, navigator, basename, onError]
  );
  return /* @__PURE__ */ React3.createElement(React3.Fragment, null, /* @__PURE__ */ React3.createElement(DataRouterContext.Provider, { value: dataRouterContext }, /* @__PURE__ */ React3.createElement(DataRouterStateContext.Provider, { value: state }, /* @__PURE__ */ React3.createElement(FetchersContext.Provider, { value: fetcherData.current }, /* @__PURE__ */ React3.createElement(ViewTransitionContext.Provider, { value: vtContext }, /* @__PURE__ */ React3.createElement(
    Router,
    {
      basename,
      location: state.location,
      navigationType: state.historyAction,
      navigator,
      unstable_useTransitions
    },
    /* @__PURE__ */ React3.createElement(
      MemoizedDataRoutes,
      {
        routes: router.routes,
        future: router.future,
        state,
        onError
      }
    )
  ))))), null);
}
function getOptimisticRouterState(currentState, newState) {
  return {
    // Don't surface "current location specific" stuff mid-navigation
    // (historyAction, location, matches, loaderData, errors, initialized,
    // restoreScroll, preventScrollReset, blockers, etc.)
    ...currentState,
    // Only surface "pending/in-flight stuff"
    // (navigation, revalidation, actionData, fetchers, )
    navigation: newState.navigation.state !== "idle" ? newState.navigation : currentState.navigation,
    revalidation: newState.revalidation !== "idle" ? newState.revalidation : currentState.revalidation,
    actionData: newState.navigation.state !== "submitting" ? newState.actionData : currentState.actionData,
    fetchers: newState.fetchers
  };
}
var MemoizedDataRoutes = React3.memo(DataRoutes);
function DataRoutes({
  routes: routes2,
  future,
  state,
  onError
}) {
  return useRoutesImpl(routes2, void 0, state, onError, future);
}
function Navigate({
  to,
  replace: replace2,
  state,
  relative
}) {
  invariant(
    useInRouterContext(),
    // TODO: This error is probably because they somehow have 2 versions of
    // the router loaded. We can help them understand how to avoid that.
    `<Navigate> may be used only in the context of a <Router> component.`
  );
  let { static: isStatic } = React3.useContext(NavigationContext);
  warning(
    !isStatic,
    `<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.`
  );
  let { matches } = React3.useContext(RouteContext);
  let { pathname: locationPathname } = useLocation();
  let navigate = useNavigate();
  let path = resolveTo(
    to,
    getResolveToMatches(matches),
    locationPathname,
    relative === "path"
  );
  let jsonPath = JSON.stringify(path);
  React3.useEffect(() => {
    navigate(JSON.parse(jsonPath), { replace: replace2, state, relative });
  }, [navigate, jsonPath, relative, replace2, state]);
  return null;
}
function Outlet(props) {
  return useOutlet(props.context);
}
function Router({
  basename: basenameProp = "/",
  children = null,
  location: locationProp,
  navigationType = "POP",
  navigator,
  static: staticProp = false,
  unstable_useTransitions
}) {
  invariant(
    !useInRouterContext(),
    `You cannot render a <Router> inside another <Router>. You should never have more than one in your app.`
  );
  let basename = basenameProp.replace(/^\/*/, "/");
  let navigationContext = React3.useMemo(
    () => ({
      basename,
      navigator,
      static: staticProp,
      unstable_useTransitions,
      future: {}
    }),
    [basename, navigator, staticProp, unstable_useTransitions]
  );
  if (typeof locationProp === "string") {
    locationProp = parsePath(locationProp);
  }
  let {
    pathname = "/",
    search = "",
    hash = "",
    state = null,
    key = "default"
  } = locationProp;
  let locationContext = React3.useMemo(() => {
    let trailingPathname = stripBasename(pathname, basename);
    if (trailingPathname == null) {
      return null;
    }
    return {
      location: {
        pathname: trailingPathname,
        search,
        hash,
        state,
        key
      },
      navigationType
    };
  }, [basename, pathname, search, hash, state, key, navigationType]);
  warning(
    locationContext != null,
    `<Router basename="${basename}"> is not able to match the URL "${pathname}${search}${hash}" because it does not start with the basename, so the <Router> won't render anything.`
  );
  if (locationContext == null) {
    return null;
  }
  return /* @__PURE__ */ React3.createElement(NavigationContext.Provider, { value: navigationContext }, /* @__PURE__ */ React3.createElement(LocationContext.Provider, { children, value: locationContext }));
}
var defaultMethod = "get";
var defaultEncType = "application/x-www-form-urlencoded";
function isHtmlElement(object) {
  return typeof HTMLElement !== "undefined" && object instanceof HTMLElement;
}
function isButtonElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "button";
}
function isFormElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "form";
}
function isInputElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "input";
}
function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
function shouldProcessLinkClick(event, target) {
  return event.button === 0 && // Ignore everything but left clicks
  (!target || target === "_self") && // Let browser handle "target=_blank" etc.
  !isModifiedEvent(event);
}
var _formDataSupportsSubmitter = null;
function isFormDataSubmitterSupported() {
  if (_formDataSupportsSubmitter === null) {
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      );
      _formDataSupportsSubmitter = false;
    } catch (e) {
      _formDataSupportsSubmitter = true;
    }
  }
  return _formDataSupportsSubmitter;
}
var supportedFormEncTypes = /* @__PURE__ */ new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
]);
function getFormEncType(encType) {
  if (encType != null && !supportedFormEncTypes.has(encType)) {
    warning(
      false,
      `"${encType}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${defaultEncType}"`
    );
    return null;
  }
  return encType;
}
function getFormSubmissionInfo(target, basename) {
  let method;
  let action;
  let encType;
  let formData;
  let body;
  if (isFormElement(target)) {
    let attr = target.getAttribute("action");
    action = attr ? stripBasename(attr, basename) : null;
    method = target.getAttribute("method") || defaultMethod;
    encType = getFormEncType(target.getAttribute("enctype")) || defaultEncType;
    formData = new FormData(target);
  } else if (isButtonElement(target) || isInputElement(target) && (target.type === "submit" || target.type === "image")) {
    let form = target.form;
    if (form == null) {
      throw new Error(
        `Cannot submit a <button> or <input type="submit"> without a <form>`
      );
    }
    let attr = target.getAttribute("formaction") || form.getAttribute("action");
    action = attr ? stripBasename(attr, basename) : null;
    method = target.getAttribute("formmethod") || form.getAttribute("method") || defaultMethod;
    encType = getFormEncType(target.getAttribute("formenctype")) || getFormEncType(form.getAttribute("enctype")) || defaultEncType;
    formData = new FormData(form, target);
    if (!isFormDataSubmitterSupported()) {
      let { name, type, value } = target;
      if (type === "image") {
        let prefix = name ? `${name}.` : "";
        formData.append(`${prefix}x`, "0");
        formData.append(`${prefix}y`, "0");
      } else if (name) {
        formData.append(name, value);
      }
    }
  } else if (isHtmlElement(target)) {
    throw new Error(
      `Cannot submit element that is not <form>, <button>, or <input type="submit|image">`
    );
  } else {
    method = defaultMethod;
    action = null;
    encType = defaultEncType;
    body = target;
  }
  if (formData && encType === "text/plain") {
    body = formData;
    formData = void 0;
  }
  return { action, method: method.toLowerCase(), encType, formData, body };
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function invariant2(value, message) {
  if (value === false || value === null || typeof value === "undefined") {
    throw new Error(message);
  }
}
function singleFetchUrl(reqUrl, basename, extension) {
  let url = typeof reqUrl === "string" ? new URL(
    reqUrl,
    // This can be called during the SSR flow via PrefetchPageLinksImpl so
    // don't assume window is available
    typeof window === "undefined" ? "server://singlefetch/" : window.location.origin
  ) : reqUrl;
  if (url.pathname === "/") {
    url.pathname = `_root.${extension}`;
  } else if (basename && stripBasename(url.pathname, basename) === "/") {
    url.pathname = `${basename.replace(/\/$/, "")}/_root.${extension}`;
  } else {
    url.pathname = `${url.pathname.replace(/\/$/, "")}.${extension}`;
  }
  return url;
}
async function loadRouteModule(route, routeModulesCache) {
  if (route.id in routeModulesCache) {
    return routeModulesCache[route.id];
  }
  try {
    let routeModule = await import(
      /* @vite-ignore */
      /* webpackIgnore: true */
      route.module
    );
    routeModulesCache[route.id] = routeModule;
    return routeModule;
  } catch (error) {
    console.error(
      `Error loading route module \`${route.module}\`, reloading page...`
    );
    console.error(error);
    if (window.__reactRouterContext && window.__reactRouterContext.isSpaMode && // @ts-expect-error
    void 0) ;
    window.location.reload();
    return new Promise(() => {
    });
  }
}
function isHtmlLinkDescriptor(object) {
  if (object == null) {
    return false;
  }
  if (object.href == null) {
    return object.rel === "preload" && typeof object.imageSrcSet === "string" && typeof object.imageSizes === "string";
  }
  return typeof object.rel === "string" && typeof object.href === "string";
}
async function getKeyedPrefetchLinks(matches, manifest, routeModules) {
  let links = await Promise.all(
    matches.map(async (match) => {
      let route = manifest.routes[match.route.id];
      if (route) {
        let mod = await loadRouteModule(route, routeModules);
        return mod.links ? mod.links() : [];
      }
      return [];
    })
  );
  return dedupeLinkDescriptors(
    links.flat(1).filter(isHtmlLinkDescriptor).filter((link) => link.rel === "stylesheet" || link.rel === "preload").map(
      (link) => link.rel === "stylesheet" ? { ...link, rel: "prefetch", as: "style" } : { ...link, rel: "prefetch" }
    )
  );
}
function getNewMatchesForLinks(page, nextMatches, currentMatches, manifest, location, mode) {
  let isNew = (match, index) => {
    if (!currentMatches[index]) return true;
    return match.route.id !== currentMatches[index].route.id;
  };
  let matchPathChanged = (match, index) => {
    return (
      // param change, /users/123 -> /users/456
      currentMatches[index].pathname !== match.pathname || // splat param changed, which is not present in match.path
      // e.g. /files/images/avatar.jpg -> files/finances.xls
      currentMatches[index].route.path?.endsWith("*") && currentMatches[index].params["*"] !== match.params["*"]
    );
  };
  if (mode === "assets") {
    return nextMatches.filter(
      (match, index) => isNew(match, index) || matchPathChanged(match, index)
    );
  }
  if (mode === "data") {
    return nextMatches.filter((match, index) => {
      let manifestRoute = manifest.routes[match.route.id];
      if (!manifestRoute || !manifestRoute.hasLoader) {
        return false;
      }
      if (isNew(match, index) || matchPathChanged(match, index)) {
        return true;
      }
      if (match.route.shouldRevalidate) {
        let routeChoice = match.route.shouldRevalidate({
          currentUrl: new URL(
            location.pathname + location.search + location.hash,
            window.origin
          ),
          currentParams: currentMatches[0]?.params || {},
          nextUrl: new URL(page, window.origin),
          nextParams: match.params,
          defaultShouldRevalidate: true
        });
        if (typeof routeChoice === "boolean") {
          return routeChoice;
        }
      }
      return true;
    });
  }
  return [];
}
function getModuleLinkHrefs(matches, manifest, { includeHydrateFallback } = {}) {
  return dedupeHrefs(
    matches.map((match) => {
      let route = manifest.routes[match.route.id];
      if (!route) return [];
      let hrefs = [route.module];
      if (route.clientActionModule) {
        hrefs = hrefs.concat(route.clientActionModule);
      }
      if (route.clientLoaderModule) {
        hrefs = hrefs.concat(route.clientLoaderModule);
      }
      if (includeHydrateFallback && route.hydrateFallbackModule) {
        hrefs = hrefs.concat(route.hydrateFallbackModule);
      }
      if (route.imports) {
        hrefs = hrefs.concat(route.imports);
      }
      return hrefs;
    }).flat(1)
  );
}
function dedupeHrefs(hrefs) {
  return [...new Set(hrefs)];
}
function sortKeys(obj) {
  let sorted = {};
  let keys = Object.keys(obj).sort();
  for (let key of keys) {
    sorted[key] = obj[key];
  }
  return sorted;
}
function dedupeLinkDescriptors(descriptors, preloads) {
  let set = /* @__PURE__ */ new Set();
  new Set(preloads);
  return descriptors.reduce((deduped, descriptor) => {
    let key = JSON.stringify(sortKeys(descriptor));
    if (!set.has(key)) {
      set.add(key);
      deduped.push({ key, link: descriptor });
    }
    return deduped;
  }, []);
}
function useDataRouterContext2() {
  let context = React3.useContext(DataRouterContext);
  invariant2(
    context,
    "You must render this element inside a <DataRouterContext.Provider> element"
  );
  return context;
}
function useDataRouterStateContext() {
  let context = React3.useContext(DataRouterStateContext);
  invariant2(
    context,
    "You must render this element inside a <DataRouterStateContext.Provider> element"
  );
  return context;
}
var FrameworkContext = React3.createContext(void 0);
FrameworkContext.displayName = "FrameworkContext";
function useFrameworkContext() {
  let context = React3.useContext(FrameworkContext);
  invariant2(
    context,
    "You must render this element inside a <HydratedRouter> element"
  );
  return context;
}
function usePrefetchBehavior(prefetch, theirElementProps) {
  let frameworkContext = React3.useContext(FrameworkContext);
  let [maybePrefetch, setMaybePrefetch] = React3.useState(false);
  let [shouldPrefetch, setShouldPrefetch] = React3.useState(false);
  let { onFocus, onBlur, onMouseEnter, onMouseLeave, onTouchStart } = theirElementProps;
  let ref = React3.useRef(null);
  React3.useEffect(() => {
    if (prefetch === "render") {
      setShouldPrefetch(true);
    }
    if (prefetch === "viewport") {
      let callback = (entries) => {
        entries.forEach((entry) => {
          setShouldPrefetch(entry.isIntersecting);
        });
      };
      let observer = new IntersectionObserver(callback, { threshold: 0.5 });
      if (ref.current) observer.observe(ref.current);
      return () => {
        observer.disconnect();
      };
    }
  }, [prefetch]);
  React3.useEffect(() => {
    if (maybePrefetch) {
      let id = setTimeout(() => {
        setShouldPrefetch(true);
      }, 100);
      return () => {
        clearTimeout(id);
      };
    }
  }, [maybePrefetch]);
  let setIntent = () => {
    setMaybePrefetch(true);
  };
  let cancelIntent = () => {
    setMaybePrefetch(false);
    setShouldPrefetch(false);
  };
  if (!frameworkContext) {
    return [false, ref, {}];
  }
  if (prefetch !== "intent") {
    return [shouldPrefetch, ref, {}];
  }
  return [
    shouldPrefetch,
    ref,
    {
      onFocus: composeEventHandlers(onFocus, setIntent),
      onBlur: composeEventHandlers(onBlur, cancelIntent),
      onMouseEnter: composeEventHandlers(onMouseEnter, setIntent),
      onMouseLeave: composeEventHandlers(onMouseLeave, cancelIntent),
      onTouchStart: composeEventHandlers(onTouchStart, setIntent)
    }
  ];
}
function composeEventHandlers(theirHandler, ourHandler) {
  return (event) => {
    theirHandler && theirHandler(event);
    if (!event.defaultPrevented) {
      ourHandler(event);
    }
  };
}
function PrefetchPageLinks({ page, ...linkProps }) {
  let { router } = useDataRouterContext2();
  let matches = React3.useMemo(
    () => matchRoutes(router.routes, page, router.basename),
    [router.routes, page, router.basename]
  );
  if (!matches) {
    return null;
  }
  return /* @__PURE__ */ React3.createElement(PrefetchPageLinksImpl, { page, matches, ...linkProps });
}
function useKeyedPrefetchLinks(matches) {
  let { manifest, routeModules } = useFrameworkContext();
  let [keyedPrefetchLinks, setKeyedPrefetchLinks] = React3.useState([]);
  React3.useEffect(() => {
    let interrupted = false;
    void getKeyedPrefetchLinks(matches, manifest, routeModules).then(
      (links) => {
        if (!interrupted) {
          setKeyedPrefetchLinks(links);
        }
      }
    );
    return () => {
      interrupted = true;
    };
  }, [matches, manifest, routeModules]);
  return keyedPrefetchLinks;
}
function PrefetchPageLinksImpl({
  page,
  matches: nextMatches,
  ...linkProps
}) {
  let location = useLocation();
  let { manifest, routeModules } = useFrameworkContext();
  let { basename } = useDataRouterContext2();
  let { loaderData, matches } = useDataRouterStateContext();
  let newMatchesForData = React3.useMemo(
    () => getNewMatchesForLinks(
      page,
      nextMatches,
      matches,
      manifest,
      location,
      "data"
    ),
    [page, nextMatches, matches, manifest, location]
  );
  let newMatchesForAssets = React3.useMemo(
    () => getNewMatchesForLinks(
      page,
      nextMatches,
      matches,
      manifest,
      location,
      "assets"
    ),
    [page, nextMatches, matches, manifest, location]
  );
  let dataHrefs = React3.useMemo(() => {
    if (page === location.pathname + location.search + location.hash) {
      return [];
    }
    let routesParams = /* @__PURE__ */ new Set();
    let foundOptOutRoute = false;
    nextMatches.forEach((m) => {
      let manifestRoute = manifest.routes[m.route.id];
      if (!manifestRoute || !manifestRoute.hasLoader) {
        return;
      }
      if (!newMatchesForData.some((m2) => m2.route.id === m.route.id) && m.route.id in loaderData && routeModules[m.route.id]?.shouldRevalidate) {
        foundOptOutRoute = true;
      } else if (manifestRoute.hasClientLoader) {
        foundOptOutRoute = true;
      } else {
        routesParams.add(m.route.id);
      }
    });
    if (routesParams.size === 0) {
      return [];
    }
    let url = singleFetchUrl(page, basename, "data");
    if (foundOptOutRoute && routesParams.size > 0) {
      url.searchParams.set(
        "_routes",
        nextMatches.filter((m) => routesParams.has(m.route.id)).map((m) => m.route.id).join(",")
      );
    }
    return [url.pathname + url.search];
  }, [
    basename,
    loaderData,
    location,
    manifest,
    newMatchesForData,
    nextMatches,
    page,
    routeModules
  ]);
  let moduleHrefs = React3.useMemo(
    () => getModuleLinkHrefs(newMatchesForAssets, manifest),
    [newMatchesForAssets, manifest]
  );
  let keyedPrefetchLinks = useKeyedPrefetchLinks(newMatchesForAssets);
  return /* @__PURE__ */ React3.createElement(React3.Fragment, null, dataHrefs.map((href) => /* @__PURE__ */ React3.createElement("link", { key: href, rel: "prefetch", as: "fetch", href, ...linkProps })), moduleHrefs.map((href) => /* @__PURE__ */ React3.createElement("link", { key: href, rel: "modulepreload", href, ...linkProps })), keyedPrefetchLinks.map(({ key, link }) => (
    // these don't spread `linkProps` because they are full link descriptors
    // already with their own props
    /* @__PURE__ */ React3.createElement("link", { key, nonce: linkProps.nonce, ...link })
  )));
}
function mergeRefs(...refs) {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref != null) {
        ref.current = value;
      }
    });
  };
}
var isBrowser2 = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
try {
  if (isBrowser2) {
    window.__reactRouterVersion = // @ts-expect-error
    "7.11.0";
  }
} catch (e) {
}
var ABSOLUTE_URL_REGEX2 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
var Link = React3.forwardRef(
  function LinkWithRef({
    onClick,
    discover = "render",
    prefetch = "none",
    relative,
    reloadDocument,
    replace: replace2,
    state,
    target,
    to,
    preventScrollReset,
    viewTransition,
    unstable_defaultShouldRevalidate,
    ...rest
  }, forwardedRef) {
    let { basename, unstable_useTransitions } = React3.useContext(NavigationContext);
    let isAbsolute = typeof to === "string" && ABSOLUTE_URL_REGEX2.test(to);
    let parsed = parseToInfo(to, basename);
    to = parsed.to;
    let href = useHref(to, { relative });
    let [shouldPrefetch, prefetchRef, prefetchHandlers] = usePrefetchBehavior(
      prefetch,
      rest
    );
    let internalOnClick = useLinkClickHandler(to, {
      replace: replace2,
      state,
      target,
      preventScrollReset,
      relative,
      viewTransition,
      unstable_defaultShouldRevalidate,
      unstable_useTransitions
    });
    function handleClick(event) {
      if (onClick) onClick(event);
      if (!event.defaultPrevented) {
        internalOnClick(event);
      }
    }
    let link = (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      /* @__PURE__ */ React3.createElement(
        "a",
        {
          ...rest,
          ...prefetchHandlers,
          href: parsed.absoluteURL || href,
          onClick: parsed.isExternal || reloadDocument ? onClick : handleClick,
          ref: mergeRefs(forwardedRef, prefetchRef),
          target,
          "data-discover": !isAbsolute && discover === "render" ? "true" : void 0
        }
      )
    );
    return shouldPrefetch && !isAbsolute ? /* @__PURE__ */ React3.createElement(React3.Fragment, null, link, /* @__PURE__ */ React3.createElement(PrefetchPageLinks, { page: href })) : link;
  }
);
Link.displayName = "Link";
var NavLink = React3.forwardRef(
  function NavLinkWithRef({
    "aria-current": ariaCurrentProp = "page",
    caseSensitive = false,
    className: classNameProp = "",
    end = false,
    style: styleProp,
    to,
    viewTransition,
    children,
    ...rest
  }, ref) {
    let path = useResolvedPath(to, { relative: rest.relative });
    let location = useLocation();
    let routerState = React3.useContext(DataRouterStateContext);
    let { navigator, basename } = React3.useContext(NavigationContext);
    let isTransitioning = routerState != null && // Conditional usage is OK here because the usage of a data router is static
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useViewTransitionState(path) && viewTransition === true;
    let toPathname = navigator.encodeLocation ? navigator.encodeLocation(path).pathname : path.pathname;
    let locationPathname = location.pathname;
    let nextLocationPathname = routerState && routerState.navigation && routerState.navigation.location ? routerState.navigation.location.pathname : null;
    if (!caseSensitive) {
      locationPathname = locationPathname.toLowerCase();
      nextLocationPathname = nextLocationPathname ? nextLocationPathname.toLowerCase() : null;
      toPathname = toPathname.toLowerCase();
    }
    if (nextLocationPathname && basename) {
      nextLocationPathname = stripBasename(nextLocationPathname, basename) || nextLocationPathname;
    }
    const endSlashPosition = toPathname !== "/" && toPathname.endsWith("/") ? toPathname.length - 1 : toPathname.length;
    let isActive = locationPathname === toPathname || !end && locationPathname.startsWith(toPathname) && locationPathname.charAt(endSlashPosition) === "/";
    let isPending = nextLocationPathname != null && (nextLocationPathname === toPathname || !end && nextLocationPathname.startsWith(toPathname) && nextLocationPathname.charAt(toPathname.length) === "/");
    let renderProps = {
      isActive,
      isPending,
      isTransitioning
    };
    let ariaCurrent = isActive ? ariaCurrentProp : void 0;
    let className;
    if (typeof classNameProp === "function") {
      className = classNameProp(renderProps);
    } else {
      className = [
        classNameProp,
        isActive ? "active" : null,
        isPending ? "pending" : null,
        isTransitioning ? "transitioning" : null
      ].filter(Boolean).join(" ");
    }
    let style = typeof styleProp === "function" ? styleProp(renderProps) : styleProp;
    return /* @__PURE__ */ React3.createElement(
      Link,
      {
        ...rest,
        "aria-current": ariaCurrent,
        className,
        ref,
        style,
        to,
        viewTransition
      },
      typeof children === "function" ? children(renderProps) : children
    );
  }
);
NavLink.displayName = "NavLink";
var Form = React3.forwardRef(
  ({
    discover = "render",
    fetcherKey,
    navigate,
    reloadDocument,
    replace: replace2,
    state,
    method = defaultMethod,
    action,
    onSubmit,
    relative,
    preventScrollReset,
    viewTransition,
    unstable_defaultShouldRevalidate,
    ...props
  }, forwardedRef) => {
    let { unstable_useTransitions } = React3.useContext(NavigationContext);
    let submit = useSubmit();
    let formAction = useFormAction(action, { relative });
    let formMethod = method.toLowerCase() === "get" ? "get" : "post";
    let isAbsolute = typeof action === "string" && ABSOLUTE_URL_REGEX2.test(action);
    let submitHandler = (event) => {
      onSubmit && onSubmit(event);
      if (event.defaultPrevented) return;
      event.preventDefault();
      let submitter = event.nativeEvent.submitter;
      let submitMethod = submitter?.getAttribute("formmethod") || method;
      let doSubmit = () => submit(submitter || event.currentTarget, {
        fetcherKey,
        method: submitMethod,
        navigate,
        replace: replace2,
        state,
        relative,
        preventScrollReset,
        viewTransition,
        unstable_defaultShouldRevalidate
      });
      if (unstable_useTransitions && navigate !== false) {
        React3.startTransition(() => doSubmit());
      } else {
        doSubmit();
      }
    };
    return /* @__PURE__ */ React3.createElement(
      "form",
      {
        ref: forwardedRef,
        method: formMethod,
        action: formAction,
        onSubmit: reloadDocument ? onSubmit : submitHandler,
        ...props,
        "data-discover": !isAbsolute && discover === "render" ? "true" : void 0
      }
    );
  }
);
Form.displayName = "Form";
function getDataRouterConsoleError2(hookName) {
  return `${hookName} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function useDataRouterContext3(hookName) {
  let ctx = React3.useContext(DataRouterContext);
  invariant(ctx, getDataRouterConsoleError2(hookName));
  return ctx;
}
function useLinkClickHandler(to, {
  target,
  replace: replaceProp,
  state,
  preventScrollReset,
  relative,
  viewTransition,
  unstable_defaultShouldRevalidate,
  unstable_useTransitions
} = {}) {
  let navigate = useNavigate();
  let location = useLocation();
  let path = useResolvedPath(to, { relative });
  return React3.useCallback(
    (event) => {
      if (shouldProcessLinkClick(event, target)) {
        event.preventDefault();
        let replace2 = replaceProp !== void 0 ? replaceProp : createPath(location) === createPath(path);
        let doNavigate = () => navigate(to, {
          replace: replace2,
          state,
          preventScrollReset,
          relative,
          viewTransition,
          unstable_defaultShouldRevalidate
        });
        if (unstable_useTransitions) {
          React3.startTransition(() => doNavigate());
        } else {
          doNavigate();
        }
      }
    },
    [
      location,
      navigate,
      path,
      replaceProp,
      state,
      target,
      to,
      preventScrollReset,
      relative,
      viewTransition,
      unstable_defaultShouldRevalidate,
      unstable_useTransitions
    ]
  );
}
var fetcherId = 0;
var getUniqueFetcherId = () => `__${String(++fetcherId)}__`;
function useSubmit() {
  let { router } = useDataRouterContext3(
    "useSubmit"
    /* UseSubmit */
  );
  let { basename } = React3.useContext(NavigationContext);
  let currentRouteId = useRouteId();
  let routerFetch = router.fetch;
  let routerNavigate = router.navigate;
  return React3.useCallback(
    async (target, options = {}) => {
      let { action, method, encType, formData, body } = getFormSubmissionInfo(
        target,
        basename
      );
      if (options.navigate === false) {
        let key = options.fetcherKey || getUniqueFetcherId();
        await routerFetch(key, currentRouteId, options.action || action, {
          unstable_defaultShouldRevalidate: options.unstable_defaultShouldRevalidate,
          preventScrollReset: options.preventScrollReset,
          formData,
          body,
          formMethod: options.method || method,
          formEncType: options.encType || encType,
          flushSync: options.flushSync
        });
      } else {
        await routerNavigate(options.action || action, {
          unstable_defaultShouldRevalidate: options.unstable_defaultShouldRevalidate,
          preventScrollReset: options.preventScrollReset,
          formData,
          body,
          formMethod: options.method || method,
          formEncType: options.encType || encType,
          replace: options.replace,
          state: options.state,
          fromRouteId: currentRouteId,
          flushSync: options.flushSync,
          viewTransition: options.viewTransition
        });
      }
    },
    [routerFetch, routerNavigate, basename, currentRouteId]
  );
}
function useFormAction(action, { relative } = {}) {
  let { basename } = React3.useContext(NavigationContext);
  let routeContext = React3.useContext(RouteContext);
  invariant(routeContext, "useFormAction must be used inside a RouteContext");
  let [match] = routeContext.matches.slice(-1);
  let path = { ...useResolvedPath(action ? action : ".", { relative }) };
  let location = useLocation();
  if (action == null) {
    path.search = location.search;
    let params = new URLSearchParams(path.search);
    let indexValues = params.getAll("index");
    let hasNakedIndexParam = indexValues.some((v) => v === "");
    if (hasNakedIndexParam) {
      params.delete("index");
      indexValues.filter((v) => v).forEach((v) => params.append("index", v));
      let qs = params.toString();
      path.search = qs ? `?${qs}` : "";
    }
  }
  if ((!action || action === ".") && match.route.index) {
    path.search = path.search ? path.search.replace(/^\?/, "?index&") : "?index";
  }
  if (basename !== "/") {
    path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname]);
  }
  return createPath(path);
}
function useViewTransitionState(to, { relative } = {}) {
  let vtContext = React3.useContext(ViewTransitionContext);
  invariant(
    vtContext != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename } = useDataRouterContext3(
    "useViewTransitionState"
    /* useViewTransitionState */
  );
  let path = useResolvedPath(to, { relative });
  if (!vtContext.isTransitioning) {
    return false;
  }
  let currentPath = stripBasename(vtContext.currentLocation.pathname, basename) || vtContext.currentLocation.pathname;
  let nextPath = stripBasename(vtContext.nextLocation.pathname, basename) || vtContext.nextLocation.pathname;
  return matchPath(path.pathname, nextPath) != null || matchPath(path.pathname, currentPath) != null;
}
var TAG_NAMES = /* @__PURE__ */ ((TAG_NAMES2) => {
  TAG_NAMES2["BASE"] = "base";
  TAG_NAMES2["BODY"] = "body";
  TAG_NAMES2["HEAD"] = "head";
  TAG_NAMES2["HTML"] = "html";
  TAG_NAMES2["LINK"] = "link";
  TAG_NAMES2["META"] = "meta";
  TAG_NAMES2["NOSCRIPT"] = "noscript";
  TAG_NAMES2["SCRIPT"] = "script";
  TAG_NAMES2["STYLE"] = "style";
  TAG_NAMES2["TITLE"] = "title";
  TAG_NAMES2["FRAGMENT"] = "Symbol(react.fragment)";
  return TAG_NAMES2;
})(TAG_NAMES || {});
var SEO_PRIORITY_TAGS = {
  link: { rel: ["amphtml", "canonical", "alternate"] },
  script: { type: ["application/ld+json"] },
  meta: {
    charset: "",
    name: ["generator", "robots", "description"],
    property: [
      "og:type",
      "og:title",
      "og:url",
      "og:image",
      "og:image:alt",
      "og:description",
      "twitter:url",
      "twitter:title",
      "twitter:description",
      "twitter:image",
      "twitter:image:alt",
      "twitter:card",
      "twitter:site"
    ]
  }
};
var VALID_TAG_NAMES = Object.values(TAG_NAMES);
var REACT_TAG_MAP = {
  accesskey: "accessKey",
  charset: "charSet",
  class: "className",
  contenteditable: "contentEditable",
  contextmenu: "contextMenu",
  "http-equiv": "httpEquiv",
  itemprop: "itemProp",
  tabindex: "tabIndex"
};
var HTML_TAG_MAP = Object.entries(REACT_TAG_MAP).reduce(
  (carry, [key, value]) => {
    carry[value] = key;
    return carry;
  },
  {}
);
var HELMET_ATTRIBUTE = "data-rh";
var HELMET_PROPS = {
  DEFAULT_TITLE: "defaultTitle",
  DEFER: "defer",
  ENCODE_SPECIAL_CHARACTERS: "encodeSpecialCharacters",
  ON_CHANGE_CLIENT_STATE: "onChangeClientState",
  TITLE_TEMPLATE: "titleTemplate",
  PRIORITIZE_SEO_TAGS: "prioritizeSeoTags"
};
var getInnermostProperty = (propsList, property) => {
  for (let i = propsList.length - 1; i >= 0; i -= 1) {
    const props = propsList[i];
    if (Object.prototype.hasOwnProperty.call(props, property)) {
      return props[property];
    }
  }
  return null;
};
var getTitleFromPropsList = (propsList) => {
  let innermostTitle = getInnermostProperty(
    propsList,
    "title"
    /* TITLE */
  );
  const innermostTemplate = getInnermostProperty(propsList, HELMET_PROPS.TITLE_TEMPLATE);
  if (Array.isArray(innermostTitle)) {
    innermostTitle = innermostTitle.join("");
  }
  if (innermostTemplate && innermostTitle) {
    return innermostTemplate.replace(/%s/g, () => innermostTitle);
  }
  const innermostDefaultTitle = getInnermostProperty(propsList, HELMET_PROPS.DEFAULT_TITLE);
  return innermostTitle || innermostDefaultTitle || void 0;
};
var getOnChangeClientState = (propsList) => getInnermostProperty(propsList, HELMET_PROPS.ON_CHANGE_CLIENT_STATE) || (() => {
});
var getAttributesFromPropsList = (tagType, propsList) => propsList.filter((props) => typeof props[tagType] !== "undefined").map((props) => props[tagType]).reduce((tagAttrs, current) => ({ ...tagAttrs, ...current }), {});
var getBaseTagFromPropsList = (primaryAttributes, propsList) => propsList.filter((props) => typeof props[
  "base"
  /* BASE */
] !== "undefined").map((props) => props[
  "base"
  /* BASE */
]).reverse().reduce((innermostBaseTag, tag) => {
  if (!innermostBaseTag.length) {
    const keys = Object.keys(tag);
    for (let i = 0; i < keys.length; i += 1) {
      const attributeKey = keys[i];
      const lowerCaseAttributeKey = attributeKey.toLowerCase();
      if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && tag[lowerCaseAttributeKey]) {
        return innermostBaseTag.concat(tag);
      }
    }
  }
  return innermostBaseTag;
}, []);
var warn = (msg) => console && typeof console.warn === "function" && console.warn(msg);
var getTagsFromPropsList = (tagName, primaryAttributes, propsList) => {
  const approvedSeenTags = {};
  return propsList.filter((props) => {
    if (Array.isArray(props[tagName])) {
      return true;
    }
    if (typeof props[tagName] !== "undefined") {
      warn(
        `Helmet: ${tagName} should be of type "Array". Instead found type "${typeof props[tagName]}"`
      );
    }
    return false;
  }).map((props) => props[tagName]).reverse().reduce((approvedTags, instanceTags) => {
    const instanceSeenTags = {};
    instanceTags.filter((tag) => {
      let primaryAttributeKey;
      const keys2 = Object.keys(tag);
      for (let i = 0; i < keys2.length; i += 1) {
        const attributeKey = keys2[i];
        const lowerCaseAttributeKey = attributeKey.toLowerCase();
        if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && !(primaryAttributeKey === "rel" && tag[primaryAttributeKey].toLowerCase() === "canonical") && !(lowerCaseAttributeKey === "rel" && tag[lowerCaseAttributeKey].toLowerCase() === "stylesheet")) {
          primaryAttributeKey = lowerCaseAttributeKey;
        }
        if (primaryAttributes.indexOf(attributeKey) !== -1 && (attributeKey === "innerHTML" || attributeKey === "cssText" || attributeKey === "itemprop")) {
          primaryAttributeKey = attributeKey;
        }
      }
      if (!primaryAttributeKey || !tag[primaryAttributeKey]) {
        return false;
      }
      const value = tag[primaryAttributeKey].toLowerCase();
      if (!approvedSeenTags[primaryAttributeKey]) {
        approvedSeenTags[primaryAttributeKey] = {};
      }
      if (!instanceSeenTags[primaryAttributeKey]) {
        instanceSeenTags[primaryAttributeKey] = {};
      }
      if (!approvedSeenTags[primaryAttributeKey][value]) {
        instanceSeenTags[primaryAttributeKey][value] = true;
        return true;
      }
      return false;
    }).reverse().forEach((tag) => approvedTags.push(tag));
    const keys = Object.keys(instanceSeenTags);
    for (let i = 0; i < keys.length; i += 1) {
      const attributeKey = keys[i];
      const tagUnion = {
        ...approvedSeenTags[attributeKey],
        ...instanceSeenTags[attributeKey]
      };
      approvedSeenTags[attributeKey] = tagUnion;
    }
    return approvedTags;
  }, []).reverse();
};
var getAnyTrueFromPropsList = (propsList, checkedTag) => {
  if (Array.isArray(propsList) && propsList.length) {
    for (let index = 0; index < propsList.length; index += 1) {
      const prop = propsList[index];
      if (prop[checkedTag]) {
        return true;
      }
    }
  }
  return false;
};
var reducePropsToState = (propsList) => ({
  baseTag: getBaseTagFromPropsList([
    "href"
    /* HREF */
  ], propsList),
  bodyAttributes: getAttributesFromPropsList("bodyAttributes", propsList),
  defer: getInnermostProperty(propsList, HELMET_PROPS.DEFER),
  encode: getInnermostProperty(propsList, HELMET_PROPS.ENCODE_SPECIAL_CHARACTERS),
  htmlAttributes: getAttributesFromPropsList("htmlAttributes", propsList),
  linkTags: getTagsFromPropsList(
    "link",
    [
      "rel",
      "href"
      /* HREF */
    ],
    propsList
  ),
  metaTags: getTagsFromPropsList(
    "meta",
    [
      "name",
      "charset",
      "http-equiv",
      "property",
      "itemprop"
      /* ITEM_PROP */
    ],
    propsList
  ),
  noscriptTags: getTagsFromPropsList("noscript", [
    "innerHTML"
    /* INNER_HTML */
  ], propsList),
  onChangeClientState: getOnChangeClientState(propsList),
  scriptTags: getTagsFromPropsList(
    "script",
    [
      "src",
      "innerHTML"
      /* INNER_HTML */
    ],
    propsList
  ),
  styleTags: getTagsFromPropsList("style", [
    "cssText"
    /* CSS_TEXT */
  ], propsList),
  title: getTitleFromPropsList(propsList),
  titleAttributes: getAttributesFromPropsList("titleAttributes", propsList),
  prioritizeSeoTags: getAnyTrueFromPropsList(propsList, HELMET_PROPS.PRIORITIZE_SEO_TAGS)
});
var flattenArray = (possibleArray) => Array.isArray(possibleArray) ? possibleArray.join("") : possibleArray;
var checkIfPropsMatch = (props, toMatch) => {
  const keys = Object.keys(props);
  for (let i = 0; i < keys.length; i += 1) {
    if (toMatch[keys[i]] && toMatch[keys[i]].includes(props[keys[i]])) {
      return true;
    }
  }
  return false;
};
var prioritizer = (elementsList, propsToMatch) => {
  if (Array.isArray(elementsList)) {
    return elementsList.reduce(
      (acc, elementAttrs) => {
        if (checkIfPropsMatch(elementAttrs, propsToMatch)) {
          acc.priority.push(elementAttrs);
        } else {
          acc.default.push(elementAttrs);
        }
        return acc;
      },
      { priority: [], default: [] }
    );
  }
  return { default: elementsList, priority: [] };
};
var without = (obj, key) => {
  return {
    ...obj,
    [key]: void 0
  };
};
var SELF_CLOSING_TAGS = [
  "noscript",
  "script",
  "style"
  /* STYLE */
];
var encodeSpecialCharacters = (str, encode = true) => {
  if (encode === false) {
    return String(str);
  }
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
};
var generateElementAttributesAsString = (attributes) => Object.keys(attributes).reduce((str, key) => {
  const attr = typeof attributes[key] !== "undefined" ? `${key}="${attributes[key]}"` : `${key}`;
  return str ? `${str} ${attr}` : attr;
}, "");
var generateTitleAsString = (type, title, attributes, encode) => {
  const attributeString = generateElementAttributesAsString(attributes);
  const flattenedTitle = flattenArray(title);
  return attributeString ? `<${type} ${HELMET_ATTRIBUTE}="true" ${attributeString}>${encodeSpecialCharacters(
    flattenedTitle,
    encode
  )}</${type}>` : `<${type} ${HELMET_ATTRIBUTE}="true">${encodeSpecialCharacters(
    flattenedTitle,
    encode
  )}</${type}>`;
};
var generateTagsAsString = (type, tags, encode = true) => tags.reduce((str, t) => {
  const tag = t;
  const attributeHtml = Object.keys(tag).filter(
    (attribute) => !(attribute === "innerHTML" || attribute === "cssText")
  ).reduce((string, attribute) => {
    const attr = typeof tag[attribute] === "undefined" ? attribute : `${attribute}="${encodeSpecialCharacters(tag[attribute], encode)}"`;
    return string ? `${string} ${attr}` : attr;
  }, "");
  const tagContent = tag.innerHTML || tag.cssText || "";
  const isSelfClosing = SELF_CLOSING_TAGS.indexOf(type) === -1;
  return `${str}<${type} ${HELMET_ATTRIBUTE}="true" ${attributeHtml}${isSelfClosing ? `/>` : `>${tagContent}</${type}>`}`;
}, "");
var convertElementAttributesToReactProps = (attributes, initProps = {}) => Object.keys(attributes).reduce((obj, key) => {
  const mapped = REACT_TAG_MAP[key];
  obj[mapped || key] = attributes[key];
  return obj;
}, initProps);
var generateTitleAsReactComponent = (_type, title, attributes) => {
  const initProps = {
    key: title,
    [HELMET_ATTRIBUTE]: true
  };
  const props = convertElementAttributesToReactProps(attributes, initProps);
  return [React3__default.createElement("title", props, title)];
};
var generateTagsAsReactComponent = (type, tags) => tags.map((tag, i) => {
  const mappedTag = {
    key: i,
    [HELMET_ATTRIBUTE]: true
  };
  Object.keys(tag).forEach((attribute) => {
    const mapped = REACT_TAG_MAP[attribute];
    const mappedAttribute = mapped || attribute;
    if (mappedAttribute === "innerHTML" || mappedAttribute === "cssText") {
      const content = tag.innerHTML || tag.cssText;
      mappedTag.dangerouslySetInnerHTML = { __html: content };
    } else {
      mappedTag[mappedAttribute] = tag[attribute];
    }
  });
  return React3__default.createElement(type, mappedTag);
});
var getMethodsForTag = (type, tags, encode = true) => {
  switch (type) {
    case "title":
      return {
        toComponent: () => generateTitleAsReactComponent(type, tags.title, tags.titleAttributes),
        toString: () => generateTitleAsString(type, tags.title, tags.titleAttributes, encode)
      };
    case "bodyAttributes":
    case "htmlAttributes":
      return {
        toComponent: () => convertElementAttributesToReactProps(tags),
        toString: () => generateElementAttributesAsString(tags)
      };
    default:
      return {
        toComponent: () => generateTagsAsReactComponent(type, tags),
        toString: () => generateTagsAsString(type, tags, encode)
      };
  }
};
var getPriorityMethods = ({ metaTags, linkTags, scriptTags, encode }) => {
  const meta = prioritizer(metaTags, SEO_PRIORITY_TAGS.meta);
  const link = prioritizer(linkTags, SEO_PRIORITY_TAGS.link);
  const script = prioritizer(scriptTags, SEO_PRIORITY_TAGS.script);
  const priorityMethods = {
    toComponent: () => [
      ...generateTagsAsReactComponent("meta", meta.priority),
      ...generateTagsAsReactComponent("link", link.priority),
      ...generateTagsAsReactComponent("script", script.priority)
    ],
    toString: () => (
      // generate all the tags as strings and concatenate them
      `${getMethodsForTag("meta", meta.priority, encode)} ${getMethodsForTag(
        "link",
        link.priority,
        encode
      )} ${getMethodsForTag("script", script.priority, encode)}`
    )
  };
  return {
    priorityMethods,
    metaTags: meta.default,
    linkTags: link.default,
    scriptTags: script.default
  };
};
var mapStateOnServer = (props) => {
  const {
    baseTag,
    bodyAttributes,
    encode = true,
    htmlAttributes,
    noscriptTags,
    styleTags,
    title = "",
    titleAttributes,
    prioritizeSeoTags
  } = props;
  let { linkTags, metaTags, scriptTags } = props;
  let priorityMethods = {
    toComponent: () => {
    },
    toString: () => ""
  };
  if (prioritizeSeoTags) {
    ({ priorityMethods, linkTags, metaTags, scriptTags } = getPriorityMethods(props));
  }
  return {
    priority: priorityMethods,
    base: getMethodsForTag("base", baseTag, encode),
    bodyAttributes: getMethodsForTag("bodyAttributes", bodyAttributes, encode),
    htmlAttributes: getMethodsForTag("htmlAttributes", htmlAttributes, encode),
    link: getMethodsForTag("link", linkTags, encode),
    meta: getMethodsForTag("meta", metaTags, encode),
    noscript: getMethodsForTag("noscript", noscriptTags, encode),
    script: getMethodsForTag("script", scriptTags, encode),
    style: getMethodsForTag("style", styleTags, encode),
    title: getMethodsForTag("title", { title, titleAttributes }, encode)
  };
};
var server_default = mapStateOnServer;
var instances = [];
var isDocument = !!(typeof window !== "undefined" && window.document && window.document.createElement);
var HelmetData = class {
  instances = [];
  canUseDOM = isDocument;
  context;
  value = {
    setHelmet: (serverState) => {
      this.context.helmet = serverState;
    },
    helmetInstances: {
      get: () => this.canUseDOM ? instances : this.instances,
      add: (instance) => {
        (this.canUseDOM ? instances : this.instances).push(instance);
      },
      remove: (instance) => {
        const index = (this.canUseDOM ? instances : this.instances).indexOf(instance);
        (this.canUseDOM ? instances : this.instances).splice(index, 1);
      }
    }
  };
  constructor(context, canUseDOM) {
    this.context = context;
    this.canUseDOM = canUseDOM || false;
    if (!canUseDOM) {
      context.helmet = server_default({
        baseTag: [],
        bodyAttributes: {},
        htmlAttributes: {},
        linkTags: [],
        metaTags: [],
        noscriptTags: [],
        scriptTags: [],
        styleTags: [],
        title: "",
        titleAttributes: {}
      });
    }
  }
};
var defaultValue = {};
var Context = React3__default.createContext(defaultValue);
var HelmetProvider = class _HelmetProvider extends Component {
  static canUseDOM = isDocument;
  helmetData;
  constructor(props) {
    super(props);
    this.helmetData = new HelmetData(this.props.context || {}, _HelmetProvider.canUseDOM);
  }
  render() {
    return /* @__PURE__ */ React3__default.createElement(Context.Provider, { value: this.helmetData.value }, this.props.children);
  }
};
var updateTags = (type, tags) => {
  const headElement = document.head || document.querySelector(
    "head"
    /* HEAD */
  );
  const tagNodes = headElement.querySelectorAll(`${type}[${HELMET_ATTRIBUTE}]`);
  const oldTags = [].slice.call(tagNodes);
  const newTags = [];
  let indexToDelete;
  if (tags && tags.length) {
    tags.forEach((tag) => {
      const newElement = document.createElement(type);
      for (const attribute in tag) {
        if (Object.prototype.hasOwnProperty.call(tag, attribute)) {
          if (attribute === "innerHTML") {
            newElement.innerHTML = tag.innerHTML;
          } else if (attribute === "cssText") {
            if (newElement.styleSheet) {
              newElement.styleSheet.cssText = tag.cssText;
            } else {
              newElement.appendChild(document.createTextNode(tag.cssText));
            }
          } else {
            const attr = attribute;
            const value = typeof tag[attr] === "undefined" ? "" : tag[attr];
            newElement.setAttribute(attribute, value);
          }
        }
      }
      newElement.setAttribute(HELMET_ATTRIBUTE, "true");
      if (oldTags.some((existingTag, index) => {
        indexToDelete = index;
        return newElement.isEqualNode(existingTag);
      })) {
        oldTags.splice(indexToDelete, 1);
      } else {
        newTags.push(newElement);
      }
    });
  }
  oldTags.forEach((tag) => tag.parentNode?.removeChild(tag));
  newTags.forEach((tag) => headElement.appendChild(tag));
  return {
    oldTags,
    newTags
  };
};
var updateAttributes = (tagName, attributes) => {
  const elementTag = document.getElementsByTagName(tagName)[0];
  if (!elementTag) {
    return;
  }
  const helmetAttributeString = elementTag.getAttribute(HELMET_ATTRIBUTE);
  const helmetAttributes = helmetAttributeString ? helmetAttributeString.split(",") : [];
  const attributesToRemove = [...helmetAttributes];
  const attributeKeys = Object.keys(attributes);
  for (const attribute of attributeKeys) {
    const value = attributes[attribute] || "";
    if (elementTag.getAttribute(attribute) !== value) {
      elementTag.setAttribute(attribute, value);
    }
    if (helmetAttributes.indexOf(attribute) === -1) {
      helmetAttributes.push(attribute);
    }
    const indexToSave = attributesToRemove.indexOf(attribute);
    if (indexToSave !== -1) {
      attributesToRemove.splice(indexToSave, 1);
    }
  }
  for (let i = attributesToRemove.length - 1; i >= 0; i -= 1) {
    elementTag.removeAttribute(attributesToRemove[i]);
  }
  if (helmetAttributes.length === attributesToRemove.length) {
    elementTag.removeAttribute(HELMET_ATTRIBUTE);
  } else if (elementTag.getAttribute(HELMET_ATTRIBUTE) !== attributeKeys.join(",")) {
    elementTag.setAttribute(HELMET_ATTRIBUTE, attributeKeys.join(","));
  }
};
var updateTitle = (title, attributes) => {
  if (typeof title !== "undefined" && document.title !== title) {
    document.title = flattenArray(title);
  }
  updateAttributes("title", attributes);
};
var commitTagChanges = (newState, cb) => {
  const {
    baseTag,
    bodyAttributes,
    htmlAttributes,
    linkTags,
    metaTags,
    noscriptTags,
    onChangeClientState,
    scriptTags,
    styleTags,
    title,
    titleAttributes
  } = newState;
  updateAttributes("body", bodyAttributes);
  updateAttributes("html", htmlAttributes);
  updateTitle(title, titleAttributes);
  const tagUpdates = {
    baseTag: updateTags("base", baseTag),
    linkTags: updateTags("link", linkTags),
    metaTags: updateTags("meta", metaTags),
    noscriptTags: updateTags("noscript", noscriptTags),
    scriptTags: updateTags("script", scriptTags),
    styleTags: updateTags("style", styleTags)
  };
  const addedTags = {};
  const removedTags = {};
  Object.keys(tagUpdates).forEach((tagType) => {
    const { newTags, oldTags } = tagUpdates[tagType];
    if (newTags.length) {
      addedTags[tagType] = newTags;
    }
    if (oldTags.length) {
      removedTags[tagType] = tagUpdates[tagType].oldTags;
    }
  });
  if (cb) {
    cb();
  }
  onChangeClientState(newState, addedTags, removedTags);
};
var _helmetCallback = null;
var handleStateChangeOnClient = (newState) => {
  if (_helmetCallback) {
    cancelAnimationFrame(_helmetCallback);
  }
  if (newState.defer) {
    _helmetCallback = requestAnimationFrame(() => {
      commitTagChanges(newState, () => {
        _helmetCallback = null;
      });
    });
  } else {
    commitTagChanges(newState);
    _helmetCallback = null;
  }
};
var client_default = handleStateChangeOnClient;
var HelmetDispatcher = class extends Component {
  rendered = false;
  shouldComponentUpdate(nextProps) {
    return !shallowEqual(nextProps, this.props);
  }
  componentDidUpdate() {
    this.emitChange();
  }
  componentWillUnmount() {
    const { helmetInstances } = this.props.context;
    helmetInstances.remove(this);
    this.emitChange();
  }
  emitChange() {
    const { helmetInstances, setHelmet } = this.props.context;
    let serverState = null;
    const state = reducePropsToState(
      helmetInstances.get().map((instance) => {
        const props = { ...instance.props };
        delete props.context;
        return props;
      })
    );
    if (HelmetProvider.canUseDOM) {
      client_default(state);
    } else if (server_default) {
      serverState = server_default(state);
    }
    setHelmet(serverState);
  }
  // componentWillMount will be deprecated
  // for SSR, initialize on first render
  // constructor is also unsafe in StrictMode
  init() {
    if (this.rendered) {
      return;
    }
    this.rendered = true;
    const { helmetInstances } = this.props.context;
    helmetInstances.add(this);
    this.emitChange();
  }
  render() {
    this.init();
    return null;
  }
};
var Helmet = class extends Component {
  static defaultProps = {
    defer: true,
    encodeSpecialCharacters: true,
    prioritizeSeoTags: false
  };
  shouldComponentUpdate(nextProps) {
    return !fastCompare(without(this.props, "helmetData"), without(nextProps, "helmetData"));
  }
  mapNestedChildrenToProps(child, nestedChildren) {
    if (!nestedChildren) {
      return null;
    }
    switch (child.type) {
      case "script":
      case "noscript":
        return {
          innerHTML: nestedChildren
        };
      case "style":
        return {
          cssText: nestedChildren
        };
      default:
        throw new Error(
          `<${child.type} /> elements are self-closing and can not contain children. Refer to our API for more information.`
        );
    }
  }
  flattenArrayTypeChildren(child, arrayTypeChildren, newChildProps, nestedChildren) {
    return {
      ...arrayTypeChildren,
      [child.type]: [
        ...arrayTypeChildren[child.type] || [],
        {
          ...newChildProps,
          ...this.mapNestedChildrenToProps(child, nestedChildren)
        }
      ]
    };
  }
  mapObjectTypeChildren(child, newProps, newChildProps, nestedChildren) {
    switch (child.type) {
      case "title":
        return {
          ...newProps,
          [child.type]: nestedChildren,
          titleAttributes: { ...newChildProps }
        };
      case "body":
        return {
          ...newProps,
          bodyAttributes: { ...newChildProps }
        };
      case "html":
        return {
          ...newProps,
          htmlAttributes: { ...newChildProps }
        };
      default:
        return {
          ...newProps,
          [child.type]: { ...newChildProps }
        };
    }
  }
  mapArrayTypeChildrenToProps(arrayTypeChildren, newProps) {
    let newFlattenedProps = { ...newProps };
    Object.keys(arrayTypeChildren).forEach((arrayChildName) => {
      newFlattenedProps = {
        ...newFlattenedProps,
        [arrayChildName]: arrayTypeChildren[arrayChildName]
      };
    });
    return newFlattenedProps;
  }
  warnOnInvalidChildren(child, nestedChildren) {
    invariant$1(
      VALID_TAG_NAMES.some((name) => child.type === name),
      typeof child.type === "function" ? `You may be attempting to nest <Helmet> components within each other, which is not allowed. Refer to our API for more information.` : `Only elements types ${VALID_TAG_NAMES.join(
        ", "
      )} are allowed. Helmet does not support rendering <${child.type}> elements. Refer to our API for more information.`
    );
    invariant$1(
      !nestedChildren || typeof nestedChildren === "string" || Array.isArray(nestedChildren) && !nestedChildren.some((nestedChild) => typeof nestedChild !== "string"),
      `Helmet expects a string as a child of <${child.type}>. Did you forget to wrap your children in braces? ( <${child.type}>{\`\`}</${child.type}> ) Refer to our API for more information.`
    );
    return true;
  }
  mapChildrenToProps(children, newProps) {
    let arrayTypeChildren = {};
    React3__default.Children.forEach(children, (child) => {
      if (!child || !child.props) {
        return;
      }
      const { children: nestedChildren, ...childProps } = child.props;
      const newChildProps = Object.keys(childProps).reduce((obj, key) => {
        obj[HTML_TAG_MAP[key] || key] = childProps[key];
        return obj;
      }, {});
      let { type } = child;
      if (typeof type === "symbol") {
        type = type.toString();
      } else {
        this.warnOnInvalidChildren(child, nestedChildren);
      }
      switch (type) {
        case "Symbol(react.fragment)":
          newProps = this.mapChildrenToProps(nestedChildren, newProps);
          break;
        case "link":
        case "meta":
        case "noscript":
        case "script":
        case "style":
          arrayTypeChildren = this.flattenArrayTypeChildren(
            child,
            arrayTypeChildren,
            newChildProps,
            nestedChildren
          );
          break;
        default:
          newProps = this.mapObjectTypeChildren(child, newProps, newChildProps, nestedChildren);
          break;
      }
    });
    return this.mapArrayTypeChildrenToProps(arrayTypeChildren, newProps);
  }
  render() {
    const { children, ...props } = this.props;
    let newProps = { ...props };
    let { helmetData } = props;
    if (children) {
      newProps = this.mapChildrenToProps(children, newProps);
    }
    if (helmetData && !(helmetData instanceof HelmetData)) {
      const data = helmetData;
      helmetData = new HelmetData(data.context, true);
      delete newProps.helmetData;
    }
    return helmetData ? /* @__PURE__ */ React3__default.createElement(HelmetDispatcher, { ...newProps, context: helmetData.value }) : /* @__PURE__ */ React3__default.createElement(Context.Consumer, null, (context) => /* @__PURE__ */ React3__default.createElement(HelmetDispatcher, { ...newProps, context }));
  }
};
const DevFirstApiPlatformImg = "/assets/developer%20first%20api%20platform-BRLnZvGD.svg";
const TickSvg = "data:image/svg+xml,%3csvg%20width='36'%20height='36'%20viewBox='0%200%2036%2036'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M32.0625%2019.6874C30.9375%2025.3124%2026.6964%2030.6081%2020.7434%2031.7922C14.7904%2032.9764%208.74941%2030.2073%205.76058%2024.9245C2.77175%2019.6419%203.50961%2013.0376%207.59064%208.54479C11.6717%204.05192%2018.5625%202.81244%2024.1875%205.06244'%20fill='%23E5FFEE'/%3e%3cpath%20d='M32.0625%2019.6874C30.9375%2025.3124%2026.6964%2030.6081%2020.7434%2031.7922C14.7904%2032.9764%208.74941%2030.2073%205.76058%2024.9245C2.77175%2019.6419%203.50961%2013.0376%207.59064%208.54479C11.6717%204.05192%2018.5625%202.81244%2024.1875%205.06244'%20stroke='%2316A34A'%20stroke-width='1.5'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M12.9375%2017.4375L18.5625%2023.0625L32.0625%208.4375'%20fill='%23E5FFEE'/%3e%3cpath%20d='M12.9375%2017.4375L18.5625%2023.0625L32.0625%208.4375'%20stroke='%2316A34A'%20stroke-width='1.5'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e";
const BridgPayImg = "/assets/smiley-businesswoman-YM0L2x4w.webp";
const BridgCollectImg = "/assets/happy-businessman-qE9hBx_x.webp";
const BridgConnectImg = "/assets/image-photography-with-natural-BRyiPaW9.webp";
const AicpaSvg = "/assets/aicpa%20soc-BMRKo9TE.png";
const RbiSvg = "/assets/rbi-CCMe6BOf.png";
const IsoSvg = "/assets/iso-D3LXyORu.png";
const PciSvg = "/assets/pci-CbAydVEr.png";
const TestimonalSvg = "/assets/client%20container-D1JnuFD0.svg";
const DurationSvg = "data:image/svg+xml,%3csvg%20width='20'%20height='21'%20viewBox='0%200%2020%2021'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M10%200.0927734C15.523%200.0927734%2020%204.56977%2020%2010.0928C20%2015.6158%2015.523%2020.0928%2010%2020.0928C4.477%2020.0928%200%2015.6158%200%2010.0928C0%204.56977%204.477%200.0927734%2010%200.0927734ZM10%202.09277C7.87827%202.09277%205.84344%202.93563%204.34315%204.43592C2.84285%205.93621%202%207.97104%202%2010.0928C2%2012.2145%202.84285%2014.2493%204.34315%2015.7496C5.84344%2017.2499%207.87827%2018.0928%2010%2018.0928C12.1217%2018.0928%2014.1566%2017.2499%2015.6569%2015.7496C17.1571%2014.2493%2018%2012.2145%2018%2010.0928C18%207.97104%2017.1571%205.93621%2015.6569%204.43592C14.1566%202.93563%2012.1217%202.09277%2010%202.09277ZM10%204.09277C10.2449%204.09281%2010.4813%204.18273%2010.6644%204.34549C10.8474%204.50825%2010.9643%204.73252%2010.993%204.97577L11%205.09277V9.67877L13.707%2012.3858C13.8863%2012.5657%2013.9905%2012.8072%2013.9982%2013.0612C14.006%2013.3151%2013.9168%2013.5625%2013.7488%2013.7531C13.5807%2013.9436%2013.3464%2014.0631%2013.0935%2014.0872C12.8406%2014.1113%2012.588%2014.0382%2012.387%2013.8828L12.293%2013.7998L9.293%2010.7998C9.13758%2010.6442%209.03776%2010.4418%209.009%2010.2238L9%2010.0928V5.09277C9%204.82756%209.10536%204.5732%209.29289%204.38567C9.48043%204.19813%209.73478%204.09277%2010%204.09277Z'%20fill='%23A5EB14'/%3e%3c/svg%3e";
const CodeSvg = "data:image/svg+xml,%3csvg%20width='22'%20height='18'%20viewBox='0%200%2022%2018'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M11.89%200L13.85%200.4L10.11%2018L8.15002%2017.6L11.89%200ZM18.59%209L15%205.41V2.58L21.42%209L15%2015.41V12.58L18.59%209ZM0.580017%209L7.00002%202.58V5.41L3.41002%209L7.00002%2012.58V15.41L0.580017%209Z'%20fill='%23A5EB14'/%3e%3c/svg%3e";
const SlaSvg = "data:image/svg+xml,%3csvg%20width='16'%20height='18'%20viewBox='0%200%2016%2018'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M16%2014V4C16%201.832%2012.337%200%208%200C3.663%200%200%201.832%200%204V14C0%2016.168%203.663%2018%208%2018C12.337%2018%2016%2016.168%2016%2014ZM8%202C11.691%202%2013.931%203.507%2014%203.994C13.931%204.493%2011.691%206%208%206C4.309%206%202.069%204.493%202%204.006C2.069%203.507%204.309%202%208%202ZM2%206.607C3.479%207.454%205.637%208%208%208C10.363%208%2012.521%207.454%2014%206.607V8.994C13.931%209.493%2011.691%2011%208%2011C4.309%2011%202.069%209.493%202%209V6.607ZM2%2014V11.607C3.479%2012.454%205.637%2013%208%2013C10.363%2013%2012.521%2012.454%2014%2011.607V13.994C13.931%2014.493%2011.691%2016%208%2016C4.309%2016%202.069%2014.493%202%2014Z'%20fill='%23A5EB14'/%3e%3c/svg%3e";
const GradeSvg = "data:image/svg+xml,%3csvg%20width='16'%20height='20'%20viewBox='0%200%2016%2020'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M8%2020C5.68333%2019.4167%203.77067%2018.0873%202.262%2016.012C0.753334%2013.9367%20-0.000666225%2011.6327%204.41696e-07%209.1V3L8%200L16%203V9.1C16%2011.6333%2015.246%2013.9377%2013.738%2016.013C12.23%2018.0883%2010.3173%2019.4173%208%2020ZM8%2017.9C9.73333%2017.35%2011.1667%2016.25%2012.3%2014.6C13.4333%2012.95%2014%2011.1167%2014%209.1V4.375L8%202.125L2%204.375V9.1C2%2011.1167%202.56667%2012.95%203.7%2014.6C4.83333%2016.25%206.26667%2017.35%208%2017.9Z'%20fill='%23A5EB14'/%3e%3c/svg%3e";
const HeroImg = "/assets/hero-svg-BYxsg6xH.svg";
memo(
  ({
    src,
    alt,
    height = "auto",
    width = "auto",
    duration = 0.2,
    once = true,
    amount = "all",
    className = "",
    style = {}
  }) => {
    return /* @__PURE__ */ jsx(
      motion.img,
      {
        initial: { opacity: 0.8 },
        whileInView: { opacity: 1 },
        transition: { duration, ease: "easeInOut" },
        viewport: { once, amount },
        src,
        loading: "lazy",
        height,
        width,
        className,
        alt,
        style
      }
    );
  }
);
const TextFade = memo(
  ({ direction, children, staggerChildren = 0.05 }) => {
    const FADE_DOWN = {
      show: { opacity: 1, y: 0, transition: { type: "spring" } },
      hidden: { opacity: 0, y: direction === "down" ? -18 : 18 }
    };
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: "some" });
    return /* @__PURE__ */ jsx(
      motion.div,
      {
        ref,
        initial: "hidden",
        animate: isInView ? "show" : "",
        variants: {
          hidden: {},
          show: {
            transition: {
              staggerChildren
            }
          }
        },
        children: React3__default.Children.map(
          children,
          (child) => React3__default.isValidElement(child) ? /* @__PURE__ */ jsx(motion.div, { variants: FADE_DOWN, children: child }) : child
        )
      }
    );
  }
);
memo(
  ({ direction, type = "fade", children, staggerChildren = 0.05 }) => {
    const FADE_DOWN = {
      show: { opacity: 1, y: 0, transition: { type: "spring" } },
      hidden: { opacity: 0, y: direction === "down" ? -18 : 18 }
    };
    const FADE = {
      show: { opacity: 1, transition: { type: "spring" } },
      hidden: { opacity: 0 }
    };
    const animationType = type === "fadeup" ? FADE_DOWN : FADE;
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, amount: "some" });
    return /* @__PURE__ */ jsx(
      motion.div,
      {
        ref,
        initial: "hidden",
        animate: isInView ? "show" : "",
        variants: {
          hidden: {},
          show: {
            transition: {
              staggerChildren
            }
          }
        },
        children: React3__default.Children.map(
          children,
          (child, index) => React3__default.isValidElement(child) ? /* @__PURE__ */ jsx(motion.div, { variants: animationType, children: child }, index) : child
        )
      }
    );
  }
);
const ArrowSvg$1 = ({ height = 11, width = 11, color = "#1E1E1E" }) => {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      width,
      height,
      viewBox: "0 0 10 10",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: /* @__PURE__ */ jsx(
        "path",
        {
          fillRule: "evenodd",
          clipRule: "evenodd",
          d: "M4.4826 0.214312C4.76835 -0.0714374 5.23165 -0.0714374 5.5174 0.214312L9.78569 4.4826C9.92291 4.61983 10 4.80594 10 5C10 5.19406 9.92291 5.38017 9.78569 5.5174L5.5174 9.78569C5.23165 10.0714 4.76835 10.0714 4.4826 9.78569C4.19686 9.49994 4.19686 9.03665 4.4826 8.7509L7.5018 5.73171H0.731707C0.327596 5.73171 0 5.40411 0 5C0 4.59589 0.327596 4.26829 0.731707 4.26829H7.50179L4.4826 1.2491C4.19686 0.963353 4.19686 0.500062 4.4826 0.214312Z",
          fill: color
        }
      )
    }
  );
};
const TitleDecor = ({
  title = "",
  bgClr = "#1E1E1E",
  clr = "white"
}) => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(
    "h1",
    {
      className: "flex items-center gap-2 text-sm my-5 w-max rounded-2xl py-1.5 px-3",
      style: { color: clr, background: bgClr },
      children: [
        /* @__PURE__ */ jsx("span", { className: "w-3 h-3 rounded-full bg-[#CDFF66]" }),
        title,
        /* @__PURE__ */ jsx("span", { className: "w-3 h-3 rounded-full bg-[#CDFF66]" })
      ]
    }
  ) });
};
const Button = ({ text, clr, brClr, bgClr, arrClr, url, py, px }) => {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxs(
    "button",
    {
      className: `group ${brClr ? "border" : ""} cursor-pointer transition-all duration-300 rounded-3xl ${py || "py-2"} ${px || "px-6"} text-sm bg-center flex gap-3 items-center 
      hover:scale-103 hover:shadow-lg active:scale-95`,
      style: {
        color: clr,
        backgroundColor: bgClr,
        borderColor: brClr
      },
      onClick: () => navigate(url || ""),
      children: [
        /* @__PURE__ */ jsxs("span", { className: "relative overflow-hidden", children: [
          /* @__PURE__ */ jsx("span", { className: "block transition-transform duration-300 group-hover:translate-y-[-100%]", children: text }),
          /* @__PURE__ */ jsx("span", { className: "absolute left-0 top-0 block translate-y-full transition-transform duration-300 group-hover:translate-y-0", children: text })
        ] }),
        /* @__PURE__ */ jsx("span", { className: "ml-1 [animation-duration:300ms] group-hover:[animation:arrowMove_0.4s_ease-in-out]  transition-transform duration-300", children: /* @__PURE__ */ jsx(ArrowSvg$1, { color: arrClr }) })
      ]
    }
  );
};
const QuotesDecor = "data:image/svg+xml,%3csvg%20width='64'%20height='53'%20viewBox='0%200%2064%2053'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M63.0234%2026.2543H46.2073C50.24%2038.0298%2060.2136%2042.8343%2060.2136%2042.8343V53.0009C41.4776%2045.6052%2036.7698%2026.2543%2036.7698%2026.2543V13.1277V0.000976562H63.0234V26.2543Z'%20fill='%23A5EB14'/%3e%3cpath%20d='M26.2535%200V26.2534H9.43768C13.4703%2038.0288%2023.444%2042.8333%2023.444%2042.8333V53C4.70771%2045.6042%20-4.95911e-05%2026.2534%20-4.95911e-05%2026.2534V13.1267V0H26.2535Z'%20fill='%23A5EB14'/%3e%3c/svg%3e";
const Testimonal1 = "/assets/1-BRmtPHwh.jpg";
const Testimonal2 = "/assets/2-B0fw3imQ.jpg";
const Testimonal3 = "/assets/3--lsc-Boz.jpg";
function VerticalCarousel({ items, children }) {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);
  useEffect(() => {
    let frame;
    const container = containerRef.current;
    const checkActive = () => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2;
      let closest = 0;
      let minDist = Infinity;
      Array.from(container.querySelectorAll(".ticker-card")).forEach(
        (child, i) => {
          const cRect = child.getBoundingClientRect();
          const cCenter = cRect.top + cRect.height / 2;
          const dist = Math.abs(centerY - cCenter);
          if (dist < minDist) {
            minDist = dist;
            closest = i;
          }
        }
      );
      setActiveIndex(closest);
      frame = requestAnimationFrame(checkActive);
    };
    checkActive();
    return () => cancelAnimationFrame(frame);
  }, []);
  return /* @__PURE__ */ jsx("div", { className: "overflow-hidden h-100 group relative", ref: containerRef, children: /* @__PURE__ */ jsx("div", { className: "ticker__inner p-5", children: /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-4", children: items.concat(items).map((data, i) => /* @__PURE__ */ jsx("div", { className: "ticker-card", children: children(data, i === activeIndex) }, `a-${data.id}-${i}`)) }) }) });
}
const GreenTick = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M21.375%2013.1253C20.625%2016.8753%2017.7977%2020.4057%2013.829%2021.1951C9.8603%2021.9846%205.83298%2020.1385%203.84043%2016.6167C1.84787%2013.0949%202.33978%208.69208%205.06047%205.69685C7.78115%202.70161%2012.375%201.87529%2016.125%203.37529'%20fill='%23F2FFD6'/%3e%3cpath%20d='M21.375%2013.1253C20.625%2016.8753%2017.7977%2020.4057%2013.829%2021.1951C9.8603%2021.9846%205.83298%2020.1385%203.84043%2016.6167C1.84787%2013.0949%202.33978%208.69208%205.06047%205.69685C7.78115%202.70161%2012.375%201.87529%2016.125%203.37529'%20stroke='%239EEB00'%20stroke-width='1.5'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M8.625%2011.625L12.375%2015.375L21.375%205.625'%20fill='%23F2FFD6'/%3e%3cpath%20d='M8.625%2011.625L12.375%2015.375L21.375%205.625'%20stroke='%239EEB00'%20stroke-width='1.5'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e";
const XMark = "data:image/svg+xml,%3csvg%20width='17'%20height='17'%20viewBox='0%200%2017%2017'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M1%2016L16%201M16%2016L1%201'%20stroke='%23EB2525'%20stroke-width='1.5'%20stroke-miterlimit='10'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e";
const BridgOnboardSvg = "data:image/svg+xml,%3csvg%20width='34'%20height='34'%20viewBox='0%200%2034%2034'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M17%2019.8333L14.1667%2017L17%2014.1667L19.8333%2017L17%2019.8333ZM13.9896%2012.0006L11.5926%209.605L17%204.19617L22.4074%209.60358L20.0104%2012.0006L17%208.99017L13.9896%2012.0006ZM9.60358%2022.4074L4.19617%2017L9.60358%2011.5926L11.9992%2013.9896L8.99017%2017L12.0006%2020.0104L9.60358%2022.4074ZM24.3964%2022.4074L21.9994%2020.0104L25.0098%2017L21.9994%2013.9896L24.3964%2011.5926L29.8038%2017L24.3964%2022.4074ZM17%2029.8038L11.5926%2024.3964L13.9896%2021.9994L17%2025.0098L20.0104%2021.9994L22.4074%2024.3964L17%2029.8038Z'%20fill='%23A5EB14'/%3e%3c/svg%3e";
const BridgConnectSvg = "data:image/svg+xml,%3csvg%20width='34'%20height='34'%20viewBox='0%200%2034%2034'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M5.66683%208.49992C6.41828%208.49992%207.13895%208.20141%207.6703%207.67005C8.20165%207.1387%208.50016%206.41803%208.50016%205.66659C8.50016%204.91514%208.20165%204.19447%207.6703%203.66312C7.13895%203.13176%206.41828%202.83325%205.66683%202.83325C4.91538%202.83325%204.19471%203.13176%203.66336%203.66312C3.13201%204.19447%202.8335%204.91514%202.8335%205.66659C2.8335%206.41803%203.13201%207.1387%203.66336%207.67005C4.19471%208.20141%204.91538%208.49992%205.66683%208.49992ZM7.0835%2029.7499C8.21067%2029.7499%209.29167%2029.3022%2010.0887%2028.5051C10.8857%2027.7081%2011.3335%2026.6271%2011.3335%2025.4999C11.3335%2024.3727%2010.8857%2023.2917%2010.0887%2022.4947C9.29167%2021.6977%208.21067%2021.2499%207.0835%2021.2499C5.95633%2021.2499%204.87532%2021.6977%204.07829%2022.4947C3.28126%2023.2917%202.8335%2024.3727%202.8335%2025.4999C2.8335%2026.6271%203.28126%2027.7081%204.07829%2028.5051C4.87532%2029.3022%205.95633%2029.7499%207.0835%2029.7499ZM26.9168%2031.1666C28.044%2031.1666%2029.125%2030.7188%2029.922%2029.9218C30.7191%2029.1248%2031.1668%2028.0438%2031.1668%2026.9166C31.1668%2025.7894%2030.7191%2024.7084%2029.922%2023.9114C29.125%2023.1144%2028.044%2022.6666%2026.9168%2022.6666C25.7897%2022.6666%2024.7087%2023.1144%2023.9116%2023.9114C23.1146%2024.7084%2022.6668%2025.7894%2022.6668%2026.9166C22.6668%2028.0438%2023.1146%2029.1248%2023.9116%2029.9218C24.7087%2030.7188%2025.7897%2031.1666%2026.9168%2031.1666ZM15.5835%2019.8333C17.0864%2019.8333%2018.5277%2019.2362%2019.5904%2018.1735C20.6531%2017.1108%2021.2502%2015.6695%2021.2502%2014.1666C21.2502%2012.6637%2020.6531%2011.2224%2019.5904%2010.1596C18.5277%209.09694%2017.0864%208.49992%2015.5835%208.49992C14.0806%208.49992%2012.6393%209.09694%2011.5766%2010.1596C10.5139%2011.2224%209.91683%2012.6637%209.91683%2014.1666C9.91683%2015.6695%2010.5139%2017.1108%2011.5766%2018.1735C12.6393%2019.2362%2014.0806%2019.8333%2015.5835%2019.8333ZM24.0835%208.49992C24.8349%208.49992%2025.5556%208.20141%2026.087%207.67005C26.6183%207.1387%2026.9168%206.41803%2026.9168%205.66659C26.9168%204.91514%2026.6183%204.19447%2026.087%203.66312C25.5556%203.13176%2024.8349%202.83325%2024.0835%202.83325C23.3321%202.83325%2022.6114%203.13176%2022.08%203.66312C21.5487%204.19447%2021.2502%204.91514%2021.2502%205.66659C21.2502%206.41803%2021.5487%207.1387%2022.08%207.67005C22.6114%208.20141%2023.3321%208.49992%2024.0835%208.49992Z'%20fill='%23A5EB14'%20stroke='%23A5EB14'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M7.79199%207.7915L10.6253%2010.6248M21.2503%208.49984L19.8337%209.9165M24.0837%2023.729L19.8337%2018.4165M9.91699%2021.9582L12.7503%2019.1248'%20stroke='%23A5EB14'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e";
const BridgCollectSvg = "data:image/svg+xml,%3csvg%20width='34'%20height='34'%20viewBox='0%200%2034%2034'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M31.1666%2014.1666V24.0833C31.1666%2025.2105%2030.7189%2026.2915%2029.9219%2027.0885C29.1248%2027.8855%2028.0438%2028.3333%2026.9166%2028.3333H7.08331C5.95614%2028.3333%204.87514%2027.8855%204.07811%2027.0885C3.28108%2026.2915%202.83331%2025.2105%202.83331%2024.0833V14.1666H31.1666ZM25.5%2019.8333H21.25C20.8743%2019.8333%2020.5139%2019.9825%2020.2482%2020.2482C19.9826%2020.5139%2019.8333%2020.8742%2019.8333%2021.25C19.8333%2021.6257%2019.9826%2021.986%2020.2482%2022.2517C20.5139%2022.5174%2020.8743%2022.6666%2021.25%2022.6666H25.5C25.8757%2022.6666%2026.236%2022.5174%2026.5017%2022.2517C26.7674%2021.986%2026.9166%2021.6257%2026.9166%2021.25C26.9166%2020.8742%2026.7674%2020.5139%2026.5017%2020.2482C26.236%2019.9825%2025.8757%2019.8333%2025.5%2019.8333ZM26.9166%205.66663C28.0438%205.66663%2029.1248%206.11439%2029.9219%206.91142C30.7189%207.70845%2031.1666%208.78946%2031.1666%209.91663V11.3333H2.83331V9.91663C2.83331%208.78946%203.28108%207.70845%204.07811%206.91142C4.87514%206.11439%205.95614%205.66663%207.08331%205.66663H26.9166Z'%20fill='%23A5EB14'/%3e%3c/svg%3e";
const BridgPaySvg = "data:image/svg+xml,%3csvg%20width='34'%20height='34'%20viewBox='0%200%2034%2034'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M7.08337%205.66675C5.9562%205.66675%204.8752%206.11451%204.07817%206.91154C3.28114%207.70857%202.83337%208.78958%202.83337%209.91675V11.3334H31.1667V9.91675C31.1667%208.78958%2030.7189%207.70857%2029.9219%206.91154C29.1249%206.11451%2028.0439%205.66675%2026.9167%205.66675H7.08337ZM31.1667%2014.1667H2.83337V24.0834C2.83337%2025.2106%203.28114%2026.2916%204.07817%2027.0886C4.8752%2027.8856%205.9562%2028.3334%207.08337%2028.3334H26.9167C28.0439%2028.3334%2029.1249%2027.8856%2029.9219%2027.0886C30.7189%2026.2916%2031.1667%2025.2106%2031.1667%2024.0834V14.1667ZM11.3334%2021.2501C11.3334%2020.8744%2011.4826%2020.514%2011.7483%2020.2483C12.014%2019.9827%2012.3743%2019.8334%2012.75%2019.8334H19.0032L18.8318%2019.662C18.566%2019.3964%2018.4166%2019.036%2018.4164%2018.6602C18.4163%2018.2844%2018.5654%2017.9239%2018.8311%2017.6581C19.0967%2017.3923%2019.4571%2017.2429%2019.8329%2017.2428C20.2087%2017.2426%2020.5691%2017.3918%2020.835%2017.6574L23.4246%2020.2485C23.6902%2020.5142%2023.8394%2020.8744%2023.8394%2021.2501C23.8394%2021.6257%2023.6902%2021.986%2023.4246%2022.2517L20.835%2024.8413C20.7043%2024.9766%2020.548%2025.0846%2020.3751%2025.1588C20.2023%2025.2331%2020.0164%2025.2721%2019.8283%2025.2738C19.6402%2025.2754%2019.4536%2025.2396%2019.2795%2025.1683C19.1054%2025.0971%2018.9472%2024.9919%2018.8142%2024.8589C18.6812%2024.7259%2018.576%2024.5677%2018.5048%2024.3936C18.4336%2024.2195%2018.3977%2024.0329%2018.3994%2023.8448C18.401%2023.6567%2018.4401%2023.4708%2018.5143%2023.298C18.5886%2023.1252%2018.6965%2022.9688%2018.8318%2022.8382L19.0032%2022.6667H12.75C12.3743%2022.6667%2012.014%2022.5175%2011.7483%2022.2518C11.4826%2021.9861%2011.3334%2021.6258%2011.3334%2021.2501Z'%20fill='%23A5EB14'/%3e%3c/svg%3e";
const BridgRouteSvg = "data:image/svg+xml,%3csvg%20width='34'%20height='34'%20viewBox='0%200%2034%2034'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M20.2484%203.24852C20.5141%202.98294%2020.8744%202.83374%2021.25%202.83374C21.6257%202.83374%2021.9859%202.98294%2022.2516%203.24852L27.9183%208.91519C28.1839%209.18085%2028.333%209.54112%2028.333%209.91677C28.333%2010.2924%2028.1839%2010.6527%2027.9183%2010.9184L22.2516%2016.585C21.9844%2016.8431%2021.6266%2016.9859%2021.2551%2016.9826C20.8837%2016.9794%2020.5284%2016.8304%2020.2657%2016.5678C20.003%2016.3051%2019.854%2015.9498%2019.8508%2015.5783C19.8476%2015.2069%2019.9904%2014.849%2020.2484%2014.5819L23.4969%2011.3334H7.08335C6.70763%2011.3334%206.3473%2011.1842%206.08162%2010.9185C5.81594%2010.6528%205.66669%2010.2925%205.66669%209.91677C5.66669%209.54105%205.81594%209.18071%206.08162%208.91504C6.3473%208.64936%206.70763%208.5001%207.08335%208.5001H23.4969L20.2484%205.25169C19.9829%204.98602%2019.8337%204.62575%2019.8337%204.2501C19.8337%203.87445%2019.9829%203.51419%2020.2484%203.24852ZM13.7516%2017.4152C14.0172%2017.6809%2014.1664%2018.0411%2014.1664%2018.4168C14.1664%2018.7924%2014.0172%2019.1527%2013.7516%2019.4184L10.5032%2022.6668H26.9167C27.2924%2022.6668%2027.6527%2022.816%2027.9184%2023.0817C28.1841%2023.3474%2028.3334%2023.7077%2028.3334%2024.0834C28.3334%2024.4592%2028.1841%2024.8195%2027.9184%2025.0852C27.6527%2025.3508%2027.2924%2025.5001%2026.9167%2025.5001H10.5032L13.7516%2028.7485C14.0097%2029.0157%2014.1525%2029.3736%2014.1492%2029.745C14.146%2030.1164%2013.997%2030.4718%2013.7343%2030.7344C13.4717%2030.9971%2013.1164%2031.1461%2012.7449%2031.1493C12.3735%2031.1525%2012.0156%2031.0097%2011.7484%2030.7517L6.08177%2025.085C5.81619%2024.8194%205.66699%2024.4591%205.66699%2024.0834C5.66699%2023.7078%205.81619%2023.3475%206.08177%2023.0819L11.7484%2017.4152C12.0141%2017.1496%2012.3744%2017.0004%2012.75%2017.0004C13.1257%2017.0004%2013.4859%2017.1496%2013.7516%2017.4152Z'%20fill='%23A5EB14'/%3e%3c/svg%3e";
const BridgReconSvg = "data:image/svg+xml,%3csvg%20width='34'%20height='34'%20viewBox='0%200%2034%2034'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M10.4833%2024.4375C9.49164%2025.2639%208.45889%2025.6417%207.38505%2025.5708C6.31122%2025.5%205.37244%2025.134%204.56872%2024.4729C3.765%2023.8118%203.21628%2022.9443%202.92255%2021.8705C2.62883%2020.7967%202.82339%2019.6926%203.50622%2018.5583L6.16247%2014.1667C5.57219%2013.6472%205.10611%2013.0215%204.76422%2012.2896C4.42233%2011.5576%204.25092%2010.7667%204.24997%209.91667C4.24997%208.35833%204.80483%207.02431%205.91456%205.91458C7.02428%204.80486%208.3583%204.25%209.91664%204.25C11.475%204.25%2012.809%204.80486%2013.9187%205.91458C15.0284%207.02431%2015.5833%208.35833%2015.5833%209.91667C15.5833%2011.475%2015.0284%2012.809%2013.9187%2013.9187C12.809%2015.0285%2011.475%2015.5833%209.91664%2015.5833C9.70414%2015.5833%209.49164%2015.5715%209.27914%2015.5479C9.06664%2015.5243%208.86594%2015.4889%208.67705%2015.4417L5.94997%2020.0458C5.69025%2020.4708%205.60761%2020.8902%205.70206%2021.3038C5.7965%2021.7175%205.99719%2022.0537%206.30414%2022.3125C6.61108%2022.5713%206.97705%2022.7191%207.40205%2022.7559C7.82705%2022.7927%208.24025%2022.6449%208.64164%2022.3125L23.5166%209.52708C24.5083%208.70069%2025.5472%208.32858%2026.6333%208.41075C27.7194%208.49292%2028.6639%208.86503%2029.4666%209.52708C30.2694%2010.1891%2030.8125%2011.0571%2031.0958%2012.1309C31.3791%2013.2047%2031.1784%2014.3083%2030.4937%2015.4417L27.8375%2019.8333C28.4277%2020.3528%2028.8943%2020.9785%2029.2371%2021.7104C29.58%2022.4424%2029.7509%2023.2333%2029.75%2024.0833C29.75%2025.6417%2029.1951%2026.9757%2028.0854%2028.0854C26.9757%2029.1951%2025.6416%2029.75%2024.0833%2029.75C22.525%2029.75%2021.1909%2029.1951%2020.0812%2028.0854C18.9715%2026.9757%2018.4166%2025.6417%2018.4166%2024.0833C18.4166%2022.525%2018.9715%2021.191%2020.0812%2020.0813C21.1909%2018.9715%2022.525%2018.4167%2024.0833%2018.4167C24.2958%2018.4167%2024.5026%2018.4285%2024.7038%2018.4521C24.905%2018.4757%2025.0995%2018.5111%2025.2875%2018.5583L28.05%2013.9542C28.3097%2013.5292%2028.3923%2013.1098%2028.2979%2012.6962C28.2034%2012.2825%2028.0027%2011.9463%2027.6958%2011.6875C27.3889%2011.4287%2027.0229%2011.2814%2026.5979%2011.2455C26.1729%2011.2096%2025.7597%2011.3569%2025.3583%2011.6875L10.4833%2024.4375Z'%20fill='%23A5EB14'/%3e%3c/svg%3e";
const NeftSvg = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M0%2012C0%208.8174%201.26428%205.76515%203.51472%203.51472C5.76515%201.26428%208.8174%200%2012%200C15.1826%200%2018.2348%201.26428%2020.4853%203.51472C22.7357%205.76515%2024%208.8174%2024%2012C24%2015.1826%2022.7357%2018.2348%2020.4853%2020.4853C18.2348%2022.7357%2015.1826%2024%2012%2024C8.8174%2024%205.76515%2022.7357%203.51472%2020.4853C1.26428%2018.2348%200%2015.1826%200%2012ZM11.3152%2017.136L18.224%208.4992L16.976%207.5008L11.0848%2014.8624L6.912%2011.3856L5.888%2012.6144L11.3152%2017.136Z'%20fill='%23A5EB15'/%3e%3c/svg%3e";
const TransactionSvg$1 = "data:image/svg+xml,%3csvg%20width='22'%20height='12'%20viewBox='0%200%2022%2012'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M20%200C18.55%200%2017.74%201.44%2018.07%202.51L14.52%206.07C14.22%205.98%2013.78%205.98%2013.48%206.07L10.93%203.52C11.27%202.45%2010.46%201%209%201C7.55%201%206.73%202.44%207.07%203.52L2.51%208.07C1.44%207.74%200%208.55%200%2010C0%2011.1%200.9%2012%202%2012C3.45%2012%204.26%2010.56%203.93%209.49L8.48%204.93C8.78%205.02%209.22%205.02%209.52%204.93L12.07%207.48C11.73%208.55%2012.54%2010%2014%2010C15.45%2010%2016.27%208.56%2015.93%207.48L19.49%203.93C20.56%204.26%2022%203.45%2022%202C22%200.9%2021.1%200%2020%200Z'%20fill='%23A5EB14'/%3e%3c/svg%3e";
const ApiSvg = "data:image/svg+xml,%3csvg%20width='22'%20height='22'%20viewBox='0%200%2022%2022'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M11%2013L9%2011L11%209L13%2011L11%2013ZM8.875%207.125L6.375%204.625L11%200L15.625%204.625L13.125%207.125L11%205L8.875%207.125ZM4.625%2015.625L0%2011L4.625%206.375L7.125%208.875L5%2011L7.125%2013.125L4.625%2015.625ZM17.375%2015.625L14.875%2013.125L17%2011L14.875%208.875L17.375%206.375L22%2011L17.375%2015.625ZM11%2022L6.375%2017.375L8.875%2014.875L11%2017L13.125%2014.875L15.625%2017.375L11%2022Z'%20fill='%23A5EB15'/%3e%3c/svg%3e";
const RoutingSvg = "data:image/svg+xml,%3csvg%20width='22'%20height='18'%20viewBox='0%200%2022%2018'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M16.9735%200.202534C16.844%200.0727239%2016.6686%20-0.000129657%2016.4857%201.73227e-07C16.3028%200.000130003%2016.1274%200.0732329%2015.9982%200.203227C15.8689%200.333221%2015.7964%200.509458%2015.7965%200.693167C15.7967%200.876877%2015.8694%201.05301%2015.9989%201.18282L19.6464%204.84643L13.7836%204.84643C12.8696%204.84643%2011.9931%205.21112%2011.3468%205.86027C10.7005%206.50942%2010.3374%207.38986%2010.3374%208.3079V11.0771C10.3374%2011.6279%2010.1195%2012.1562%209.73176%2012.5456C9.34398%2012.9351%208.81805%2013.1539%208.26965%2013.1539H8.21313C8.04031%2012.127%207.48969%2011.2027%206.67041%2010.5643C5.85112%209.92591%204.82295%209.61993%203.78965%209.70703C2.75635%209.79413%201.79333%2010.2679%201.09144%2011.0346C0.389545%2011.8012%200%2012.8047%200%2013.8462C0%2014.8877%200.389545%2015.8913%201.09144%2016.6579C1.79333%2017.4245%202.75635%2017.8983%203.78965%2017.9854C4.82295%2018.0725%205.85112%2017.7666%206.67041%2017.1281C7.48969%2016.4897%208.04031%2015.5655%208.21313%2014.5385H8.26965C9.18365%2014.5385%2010.0602%2014.1738%2010.7065%2013.5247C11.3528%2012.8755%2011.7159%2011.9951%2011.7159%2011.0771V8.3079C11.7159%207.75707%2011.9337%207.22881%2012.3215%206.83932C12.7093%206.44983%2013.2352%206.23102%2013.7836%206.23102L19.6464%206.23102L15.9989%209.89463C15.933%209.95849%2015.8805%2010.0349%2015.8444%2010.1193C15.8083%2010.2038%2015.7893%2010.2947%2015.7885%2010.3866C15.7877%2010.4785%2015.8051%2010.5697%2015.8398%2010.6547C15.8744%2010.7398%2015.9256%2010.8171%2015.9903%2010.8821C16.055%2010.9471%2016.132%2010.9985%2016.2167%2011.0333C16.3014%2011.0681%2016.3922%2011.0857%2016.4837%2011.0849C16.5752%2011.0841%2016.6656%2011.065%2016.7497%2011.0287C16.8338%2010.9924%2016.9099%2010.9397%2016.9735%2010.8735L21.7982%206.02748C21.9274%205.89766%2022%205.7216%2022%205.53803C22%205.35446%2021.9274%205.17841%2021.7982%205.04858L16.9735%200.202534Z'%20fill='%23A5EB14'/%3e%3c/svg%3e";
const RefundsSvg = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cellipse%20cx='12'%20cy='12'%20rx='12'%20ry='12'%20fill='%23A5EB15'/%3e%3cpath%20d='M14.8998%2013.7985V13.0893C14.8998%2012.337%2014.6153%2011.6155%2014.1089%2011.0835C13.6025%2010.5515%2012.9157%2010.2527%2012.1995%2010.2527H9.49928M9.49928%2010.2527L11.5245%2012.3802M9.49928%2010.2527L11.5245%208.12521M17.6001%2018.0534V6.70689C17.6001%206.33073%2017.4578%205.96998%2017.2046%205.70399C16.9514%205.438%2016.608%205.28857%2016.2499%205.28857H8.14914C7.79107%205.28857%207.44766%205.438%207.19446%205.70399C6.94126%205.96998%206.79901%206.33073%206.79901%206.70689V18.0534L9.49928%2016.6351L12.1995%2018.0534L14.8998%2016.6351L17.6001%2018.0534Z'%20stroke='white'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e";
const SupportSvg$1 = "data:image/svg+xml,%3csvg%20width='22'%20height='20'%20viewBox='0%200%2022%2020'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M11%2020C10.6883%2020%2010.4273%2019.8933%2010.2168%2019.68C10.0063%2019.4667%209.90073%2019.203%209.9%2018.8889C9.89926%2018.5748%2010.0049%2018.3111%2010.2168%2018.0978C10.4287%2017.8844%2010.6898%2017.7778%2011%2017.7778H18.7V9.88889C18.7%207.72222%2017.9531%205.88444%2016.4593%204.37556C14.9655%202.86667%2013.1457%202.11185%2011%202.11111C8.85427%202.11037%207.03487%202.86519%205.5418%204.37556C4.04873%205.88593%203.30147%207.7237%203.3%209.88889V15.5556C3.3%2015.8704%203.1944%2016.1344%202.9832%2016.3478C2.772%2016.5611%202.51093%2016.6674%202.2%2016.6667C1.595%2016.6667%201.07727%2016.4493%200.6468%2016.0144C0.216333%2015.5796%200.000733333%2015.0563%200%2014.4444L0%2012.2222C0%2011.8333%200.0964333%2011.4678%200.2893%2011.1256C0.482167%2010.7833%200.7524%2010.51%201.1%2010.3056L1.1825%208.83333C1.32917%207.57407%201.69143%206.40741%202.2693%205.33333C2.84717%204.25926%203.57133%203.32407%204.4418%202.52778C5.31227%201.73148%206.31107%201.11111%207.4382%200.666667C8.56533%200.222222%209.7526%200%2011%200C12.2474%200%2013.4299%200.222222%2014.5475%200.666667C15.6651%201.11111%2016.6643%201.72704%2017.545%202.51444C18.4257%203.30185%2019.1499%204.23222%2019.7175%205.30556C20.2851%206.37889%2020.6518%207.54556%2020.8175%208.80556L20.9%2010.25C21.2483%2010.4167%2021.5189%2010.6667%2021.7118%2011C21.9047%2011.3333%2022.0007%2011.6852%2022%2012.0556V14.6111C22%2014.9815%2021.9039%2015.3333%2021.7118%2015.6667C21.5197%2016%2021.2491%2016.25%2020.9%2016.4167V17.7778C20.9%2018.3889%2020.6848%2018.9122%2020.2543%2019.3478C19.8238%2019.7833%2019.3057%2020.0007%2018.7%2020H11ZM7.7%2012.2222C7.38833%2012.2222%207.12727%2012.1156%206.9168%2011.9022C6.70633%2011.6889%206.60073%2011.4252%206.6%2011.1111C6.59927%2010.797%206.70487%2010.5333%206.9168%2010.32C7.12873%2010.1067%207.3898%2010%207.7%2010C8.0102%2010%208.27163%2010.1067%208.4843%2010.32C8.69697%2010.5333%208.8022%2010.797%208.8%2011.1111C8.7978%2011.4252%208.6922%2011.6893%208.4832%2011.9033C8.2742%2012.1174%208.01313%2012.2237%207.7%2012.2222ZM14.3%2012.2222C13.9883%2012.2222%2013.7273%2012.1156%2013.5168%2011.9022C13.3063%2011.6889%2013.2007%2011.4252%2013.2%2011.1111C13.1993%2010.797%2013.3049%2010.5333%2013.5168%2010.32C13.7287%2010.1067%2013.9898%2010%2014.3%2010C14.6102%2010%2014.8716%2010.1067%2015.0843%2010.32C15.297%2010.5333%2015.4022%2010.797%2015.4%2011.1111C15.3978%2011.4252%2015.2922%2011.6893%2015.0832%2011.9033C14.8742%2012.1174%2014.6131%2012.2237%2014.3%2012.2222ZM4.4275%2010.5C4.29917%208.53704%204.88583%206.85185%206.1875%205.44444C7.48917%204.03704%209.11166%203.33333%2011.055%203.33333C12.6867%203.33333%2014.1214%203.8563%2015.3593%204.90222C16.5972%205.94815%2017.3441%207.28667%2017.6%208.91778C15.9317%208.89852%2014.3964%208.44444%2012.9943%207.55556C11.5922%206.66667%2010.5149%205.46296%209.7625%203.94444C9.46916%205.42593%208.8506%206.74555%207.9068%207.90333C6.963%209.06111%205.80323%209.92667%204.4275%2010.5Z'%20fill='%23A5EB15'/%3e%3c/svg%3e";
const useScreen = () => {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return {
    width,
    isXs: width < 400,
    isSm: width < 640,
    isMd: width >= 768 && width < 1024,
    isLg: width >= 1024 && width < 1280,
    isXl: width >= 1280 && width < 1536,
    is2xl: width >= 1536
  };
};
const Meta = ({ metas }) => {
  const loaction = useLocation();
  const { title, desc, ogTitle, ogDesc } = metas;
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(Helmet, { children: [
    title && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("title", { children: title }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:title", content: title })
    ] }),
    desc && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("meta", { name: "description", content: desc }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:description", content: desc })
    ] }),
    /* @__PURE__ */ jsx(
      "link",
      {
        rel: "canonical",
        href: `https://bridg.money${loaction.pathname}`
      }
    ),
    (ogTitle || title) && /* @__PURE__ */ jsx("meta", { property: "og:title", content: ogTitle || title }),
    (ogDesc || desc) && /* @__PURE__ */ jsx("meta", { property: "og:description", content: ogDesc || desc }),
    (ogDesc || desc) && /* @__PURE__ */ jsx("meta", { property: "og:description", content: ogDesc || desc }),
    (ogDesc || desc) && /* @__PURE__ */ jsx("meta", { property: "og:description", content: ogDesc || desc }),
    /* @__PURE__ */ jsx(
      "meta",
      {
        property: "og:url",
        content: `https://bridg.money${loaction.pathname}`
      }
    )
  ] }) });
};
const products = [
  {
    id: 1,
    img: BridgPayImg,
    title: "BridgPay",
    heading: "Instant Business Payouts",
    text: "Send money instantly to bank accounts, UPI IDs, or cards — 24/7.",
    lists: [
      "Multiple payout options in one place",
      "Smart retries for higher success rates",
      "Real-time tracking & downloadable reports"
    ]
  },
  {
    id: 2,
    img: BridgCollectImg,
    title: "BridgCollect",
    heading: "Unified Payment Collections",
    text: "Accept customer payments through all major channels with one integration.",
    lists: [
      "UPI, VPA, virtual accounts, cards",
      "Instant payment tracking & auto reconciliation",
      "Faster settlements to improve cash flow"
    ]
  },
  {
    id: 3,
    img: BridgConnectImg,
    title: "BridgConnect",
    heading: "All Banks, One Dashboard",
    text: "Manage multiple bank accounts from a single view.",
    lists: [
      "Real-time balances & transactions",
      "Instant fund transfers between accounts",
      "Easy data export for accounting"
    ]
  }
];
const Home = () => {
  const allInOneInfrastructure = [
    {
      icon: BridgPaySvg,
      header: "BridgPay",
      text: "Instant payouts via NEFT, RTGS, IMPS, UPI, and cards, with smart retries & tracking."
    },
    {
      icon: BridgCollectSvg,
      header: "BridgCollect",
      text: "Multi-channel collections: Virtual Accounts (VA), UPI/VPA, QR, POS, and cards, with instant confirmation and auto-settlement."
    },
    {
      icon: BridgConnectSvg,
      header: "BridgConnect",
      text: "Real-time balances, statements, and payments directly from a merchant’s own account."
    },
    {
      icon: BridgOnboardSvg,
      header: "BridgOnboard",
      text: "API-first onboarding with automated document verification and instant activation."
    },
    {
      icon: BridgRouteSvg,
      header: "BridgRoute",
      text: "Dynamic bank selection with automatic failover."
    },
    {
      icon: BridgReconSvg,
      header: "BridgRecon",
      text: "Automated transaction matching, ERP sync, and anomaly detection."
    }
    // {
    //   icon: BridgVaultSvg,
    //   header: "BridgVault",
    //   text: "RBI-compliant structures with sub-ledgers and transaction-level controls.",
    // },
  ];
  const ApiIntegrationFeatures = [
    {
      icon: DurationSvg,
      header: "5 min",
      txt: "Setup time"
    },
    {
      icon: GradeSvg,
      header: "Bank Grade",
      txt: "Security"
    },
    {
      icon: SlaSvg,
      header: "99.9%",
      txt: "Uptime SLA"
    },
    {
      icon: CodeSvg,
      header: "REST/ GraphQL",
      txt: "API Types"
    }
  ];
  const testimonals = [
    {
      id: 1,
      img: Testimonal1,
      name: "Priya Sharma",
      desc: "bridg.money transformed our payment infrastructure. What used to take weeks now happens in minutes."
    },
    {
      id: 2,
      img: Testimonal2,
      name: "Raj Patel",
      desc: "The API documentation is incredible, and their support team helped us integrate in just 2 days."
    },
    {
      id: 3,
      img: Testimonal3,
      name: "Amit Kumar",
      desc: "99.9% uptime isn't just a promise - they deliver. Our business depends on reliability."
    }
  ];
  const featureTableData = [
    {
      feature: "Setup Time",
      bridg: "5 minutes",
      others: "2-4 weeks"
    },
    {
      feature: "API Documentation",
      bridg: "Interactive & Complete",
      others: "Basic & Outdated"
    },
    {
      feature: "Uptime SLA",
      bridg: "99.9%",
      others: "95-99%"
    },
    {
      feature: "Settlement Time",
      bridg: "Instant",
      others: "T+1 to T+3"
    },
    {
      feature: "Support Response",
      bridg: "< 2 hours",
      others: "24-48 hours"
    },
    {
      feature: "Pricing Model",
      bridg: "Transparent",
      others: "Hidden fees"
    }
  ];
  const { isXs, isSm } = useScreen();
  const heroSecData = [
    {
      img: RefundsSvg,
      text: "Refunds Auto-Processed in Seconds",
      x: -200,
      y: 50,
      sx: -110,
      sy: -10,
      xx: -90,
      xy: -10,
      opacity: 1,
      rotate: -7,
      z: true
    },
    {
      img: ApiSvg,
      text: "API Uptime: 99.98%",
      x: -195,
      y: -40,
      sx: -100,
      sy: -115,
      xx: -100,
      xy: -110,
      opacity: 1,
      rotate: 10,
      z: false
    },
    {
      img: NeftSvg,
      text: "Instant NEFT / IMPS / UPI Payouts",
      x: 230,
      y: -40,
      sx: 120,
      sy: -120,
      xx: 100,
      xy: -110,
      opacity: 1,
      rotate: -10,
      z: false
    },
    {
      img: SupportSvg$1,
      text: "24/7 Merchant Support Portal",
      x: 200,
      y: 50,
      sx: 120,
      sy: -10,
      xx: 105,
      xy: -0,
      opacity: 1,
      rotate: 8,
      z: true
    },
    {
      img: TransactionSvg$1,
      text: "+18% Weekly Transaction Growth",
      x: 180,
      y: -150,
      sx: 115,
      sy: -210,
      xx: 100,
      xy: -200,
      opacity: 1,
      rotate: 8,
      z: false
    },
    {
      img: RoutingSvg,
      text: "Smart Multi-Bank Routing Enabled",
      x: -180,
      y: -150,
      sx: -115,
      sy: -210,
      xx: -100,
      xy: -190,
      opacity: 1,
      rotate: -6,
      z: false
    }
  ];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Meta,
      {
        metas: {
          title: "bridg.money | Fast & Secure Digital Payments in India",
          desc: "Trusted digital payment platform for fast UPI, QR, and seamless transactions across India."
        }
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "md:flex justify-center", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1350px]", children: [
      /* @__PURE__ */ jsxs("section", { className: "relative z-0  flex flex-col justify-between overflow-hidden", children: [
        /* @__PURE__ */ jsx("div", { className: "pt-30 lg:pt-30 lg:px-20 xl:px-30", children: /* @__PURE__ */ jsxs("div", { className: "px-7 flex flex-col h-full", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex md:justify-center items-center pr-2.5 gap-3 p-0.5", children: [
            /* @__PURE__ */ jsx("span", { className: "bg-[#A5EB14] rounded-2xl p-0.5 px-4 text-xs", children: "Top Rated" }),
            /* @__PURE__ */ jsx("div", { className: "flex gap-1", children: [...Array(5)].map((_, i) => /* @__PURE__ */ jsx(
              motion.svg,
              {
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 20 20",
                fill: "currentColor",
                className: "h-4 w-4 text-yellow-400 star-animate",
                initial: { opacity: 0.4, scale: 0.9 },
                animate: {
                  opacity: [0.4, 1, 0.4],
                  scale: [0.9, 1.15, 0.9]
                },
                transition: {
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.25,
                  ease: "easeInOut"
                },
                children: /* @__PURE__ */ jsx("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" })
              },
              i
            )) })
          ] }),
          /* @__PURE__ */ jsx(StaggerHeadline, {}),
          /* @__PURE__ */ jsx(
            motion.p,
            {
              initial: { y: 20, opacity: 0 },
              whileInView: { y: 0, opacity: 1 },
              viewport: { once: true },
              transition: { duration: 0.3, ease: "easeInOut" },
              className: "text-lg md:text-center md:px-30",
              children: "Your trusted Technology Service Provider for secure, scalable, and compliant financial infrastructure."
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap md:justify-center gap-4 pb-40 md:pb-20 mt-5", children: /* @__PURE__ */ jsx(Button, { text: "Get Started", bgClr: "#A5EB14", url: "/contact" }) })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-center relative h-50 sm:h-80", children: [
          /* @__PURE__ */ jsx("div", { className: "rounded-full flex justify-center w-screen h-[450px] md:w-[800px] md:h-[800px] items-center bg-rotate overflow-hidden animate-rotate-slow", children: /* @__PURE__ */ jsx(
            "div",
            {
              className: "p-4 flex items-center justify-center rounded-full z-10 w-[350px] h-[350px] md:w-[650px] md:h-[650px]",
              style: {
                animation: "bg-rotate-slow 40s linear infinite"
              },
              children: /* @__PURE__ */ jsx(
                "div",
                {
                  className: "rounded-full z-10 w-[280px] h-[280px] md:w-[480px] md:h-[480px]",
                  style: {
                    animation: "bg-rotate-slower 60s linear infinite"
                  }
                }
              )
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "absolute bottom-0 flex flex-col items-center", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: HeroImg,
                alt: "hero img",
                className: "relative h-[70vw] sm:h-auto z-40"
              }
            ),
            heroSecData.map((data, idx) => {
              const rx = isXs ? data.xx : isSm ? data.sx : data.x;
              const ry = isXs ? data?.xy : isSm ? data.sy : data.y;
              const controls = useAnimation();
              useEffect(() => {
                controls.start({
                  x: rx,
                  y: ry,
                  rotate: data.rotate,
                  opacity: 1,
                  transition: {
                    duration: 0.6,
                    ease: "easeOut",
                    delay: idx * 0.15
                  }
                }).then(() => {
                  controls.start({
                    y: [ry, ry - 3, ry],
                    transition: {
                      repeat: Infinity,
                      duration: 3,
                      ease: "easeInOut",
                      delay: idx * 0.15
                    }
                  });
                });
              }, []);
              return /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { x: 0, opacity: 0 },
                  animate: controls,
                  viewport: { once: true },
                  className: `rounded-xl w-max flex gap-2 items-center absolute top-2/3 left-1/2 -translate-x-1/2 border-2 border-[#EBEBEB99] px-3 sm:px-4 py-2 md:py-3 shadow-[-6px_37px_50px_0px_#0000000D] bg-white ${data.z ? "z-40" : "z-30"}`,
                  children: [
                    /* @__PURE__ */ jsx(
                      "img",
                      {
                        src: data.img,
                        className: "h-3.5 md:h-auto",
                        alt: data.text
                      }
                    ),
                    /* @__PURE__ */ jsx("p", { className: "text-[9px] sm:text-xs", children: data.text })
                  ]
                },
                idx
              );
            })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { id: "products", className: "p-6 md:p-10 xl:p-15 ", children: [
        /* @__PURE__ */ jsx("div", { className: "flex justify-center my-5", children: /* @__PURE__ */ jsx(TitleDecor, { title: "Products" }) }),
        /* @__PURE__ */ jsxs(TextFade, { direction: "up", children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-center text-3xl md:text-4xl lg:text-6xl font-semibold mb-4", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[#A5EB14]", children: "Solutions" }),
            " built for modern Business"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-center lg:px-30 xl:px-50 mb-10 text-lg", children: "From onboarding to payouts, our comprehensive suite of financial APIs provides everything you need to build world-class fintech products with proven industry applications." })
        ] }),
        /* @__PURE__ */ jsx(Products, { products })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "px-6 md:px-15 lg:px-10 py-10 bg-[#FBFBFB] xl:px-20 mt-0 my-20", children: [
        /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx(TitleDecor, { title: "Products" }) }),
        /* @__PURE__ */ jsxs("h2", { className: "text-center text-3xl md:text-4xl lg:text-6xl font-semibold mb-5", children: [
          "One ",
          /* @__PURE__ */ jsx("span", { className: "text-[#A5EB14]", children: "Platform." }),
          " Every Transaction."
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 px-10 md:px-20 my-10", children: allInOneInfrastructure.map((card, index) => {
          return /* @__PURE__ */ jsxs(
            "div",
            {
              className: "rounded-0 text-center overflow-hidden group hover:shadow-[0px_0px_10px_0px_#A5EB1440] cursor-pointer hover:bg-[#F7FFE6] border border-gray-100 min-h-60 transition-all duration-300 relative p-5",
              children: [
                /* @__PURE__ */ jsx("div", { className: "flex justify-center mb-4 md:mb-3 group-hover:-rotate-45 transition-all", children: /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: card.icon,
                    className: "h-10 w-10 border border-[#D8D8D8] p-2 rounded-md shadow",
                    alt: card.header
                  }
                ) }),
                /* @__PURE__ */ jsx("h3", { className: "text-[1.32rem] font-medium", children: card.header }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-600 transition-opacity duration-700", children: card.text })
              ]
            },
            index
          );
        }) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "my-20", children: [
        /* @__PURE__ */ jsx(TextFade, { direction: "up", children: /* @__PURE__ */ jsx("h2", { className: "text-2xl xl:text-3xl text-center font-bold", children: "Secure and compliant" }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-center my-10 gap-5 md:gap-10", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: RbiSvg,
              alt: "RBI",
              className: "h-[60px] hover:scale-125 transition-all duration-500"
            }
          ),
          /* @__PURE__ */ jsx(
            "img",
            {
              src: PciSvg,
              alt: "PCI",
              className: "h-[60px] hover:scale-125 transition-all duration-500"
            }
          ),
          /* @__PURE__ */ jsx(
            "img",
            {
              src: IsoSvg,
              alt: "ISO",
              className: "h-[60px] hover:scale-125 transition-all duration-500"
            }
          ),
          /* @__PURE__ */ jsx(
            "img",
            {
              src: AicpaSvg,
              alt: "AICPA SOC",
              className: "h-[60px] hover:scale-125 transition-all duration-500"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "bg-[#FCF9F0]", children: /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 py-15 gap-y-10 px-5 lg:px-10 xl:px-15", children: [
        /* @__PURE__ */ jsxs("div", { className: "px-3 md:px-5 xl:px-10", children: [
          /* @__PURE__ */ jsxs(TextFade, { direction: "up", children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-4xl sm:text-5xl lg:text-6xl leading-14 sm:leading-16 lg:leading-20 font-bold mb-2", children: [
              "< Developer-First ",
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx("span", { className: "text-[#A5EB14]", children: "API Platform" }),
              " >"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-lg", children: "All bridg.money products are 100% API-first, modular, and developer-friendly" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 items-center my-5 md:gap-4 gap-3", children: ApiIntegrationFeatures.map((data, idx) => /* @__PURE__ */ jsxs("div", { className: "flex gap-2 lg:gap-3 items-center", children: [
            /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-black rounded-full flex-shrink-0 flex justify-center items-center", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: data?.icon,
                alt: data?.txt,
                className: "h-[20px] w-[20px] object-contain"
              }
            ) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "break-word", children: data?.header }),
              /* @__PURE__ */ jsx("p", { className: "text-sm", children: data?.txt })
            ] })
          ] }, idx)) }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-4 mt-10", children: [
            /* @__PURE__ */ jsx(Button, { text: "View Documentation", bgClr: "#A5EB14" }),
            /* @__PURE__ */ jsx(Button, { text: "Try Sandbox", brClr: "black" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: DevFirstApiPlatformImg,
            className: "w-100 hover:scale-105 transition-all duration-500",
            alt: "Developer-First API Platform"
          }
        ) })
      ] }) }),
      /* @__PURE__ */ jsxs("section", { className: "my-20 px-6 md:px-40", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-center text-3xl md:text-4xl lg:text-5xl font-semibold mb-4", children: [
          /* @__PURE__ */ jsx("span", { className: "text-[#A5EB14]", children: "Why" }),
          " Choose bridg.money?"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-xl text-center", children: "See how we compare to traditional payment processors and other fintech solutions" }),
        /* @__PURE__ */ jsx("div", { className: "border border-gray-300 overflow-auto rounded-2xl my-13", children: /* @__PURE__ */ jsxs("table", { className: "w-full min-w-[600px]", children: [
          /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("th", { className: "text-left text-lg p-7 text-gray-500 border-r border-gray-300", children: "Feature" }),
            /* @__PURE__ */ jsx("th", { className: "text-left text-lg p-7 text-[#9AE303] border-r border-gray-300 bg-[#FBFFF5]", children: "bridg.money" }),
            /* @__PURE__ */ jsx("th", { className: "text-left text-lg p-7 text-gray-500", children: "Others" })
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { children: featureTableData.map((row, index) => /* @__PURE__ */ jsxs("tr", { className: "border-t border-gray-300", children: [
            /* @__PURE__ */ jsx("td", { className: "p-7 border-r border-gray-300", children: row.feature }),
            /* @__PURE__ */ jsx("td", { className: "p-7 text-[#9AE303] border-r border-gray-300 bg-[#FBFFF5]", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-3 items-center", children: [
              /* @__PURE__ */ jsx("img", { src: GreenTick, className: "h-6 w-6" }),
              row.bridg
            ] }) }),
            /* @__PURE__ */ jsx("td", { className: "p-7 gap-3", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-3 items-center", children: [
              /* @__PURE__ */ jsx("img", { src: XMark, className: "h-3 w-3" }),
              row.others
            ] }) })
          ] }, index)) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "my-20 px-7 lg:px-25 bg-[#FBFFF5]", children: /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 items-center gap-y-10 py-15", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: QuotesDecor,
              alt: "quotes decor",
              className: "mb-3 h-15 w-15"
            }
          ),
          /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl md:pe-30 leading-16 lg:text-5xl font-semibold mb-4", children: "What Our Customers Say" }),
          /* @__PURE__ */ jsx("p", { className: "text-xl", children: "See how we compare to traditional payment processors and other fintech solutions" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "pl-4 md:pl-10", children: /* @__PURE__ */ jsx(VerticalCarousel, { items: testimonals, children: (item, isActive) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: `flex gap-5 items-center rounded-2xl border-0 border-l-6 bg-white p-5 transition-all duration-300
                ${isActive ? "shadow-xl scale-105 -translate-x-2 z-10 border-[#A5EB14]" : "border-[#EFEFEF] opacity-70"}
                `,
            children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: item.img,
                  loading: "lazy",
                  className: "rounded-full h-13 w-13 object-cover"
                }
              ),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold mb-1", children: item.name }),
                /* @__PURE__ */ jsx("p", { className: "text-sm", children: item.desc })
              ] })
            ]
          }
        ) }) })
      ] }) }),
      /* @__PURE__ */ jsxs("section", { className: "my-15 lg:my-20 px-6", children: [
        /* @__PURE__ */ jsx("div", { className: "flex justify-center my-3", children: /* @__PURE__ */ jsx("img", { src: TestimonalSvg, alt: "testimonal", className: "h-[55px]" }) }),
        /* @__PURE__ */ jsxs(TextFade, { direction: "up", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl text-center md:text-4xl font-semibold mb-3", children: "Still have questions?" }),
          /* @__PURE__ */ jsx("p", { className: "text-center text-lg mb-4", children: "Can’t find the answer you’re looking for? Please contact us to our friendly team." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx(Button, { text: "Contact Us", bgClr: "#A5EB14", url: "/contact" }) })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "px-6 sm:px-20 my-10 md:my-15 flex justify-center", children: /* @__PURE__ */ jsxs("div", { className: "bg-[url('./assets/images/ctaHome.jpg')] overflow-hidden bg-fixed bg-no-repeat bg-cover rounded-3xl relative p-5 grid grid-rows-2 md:grid-rows-3 grid-cols-3 items-end", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[#0A0C3326] z-0" }),
        /* @__PURE__ */ jsx("div", { className: "row-start-2 md:row-start-3 z-1 col-span-3 md:col-span-2", children: /* @__PURE__ */ jsxs(TextFade, { direction: "up", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg text-white md:text-5xl font-semibold mb-3", children: "Ready to Bridg the Gap?" }),
          /* @__PURE__ */ jsx("p", { className: "text-lg text-white mb-4", children: "Join thousands of businesses using bridg.money to streamline their financial operations. Start accepting payments and managing payouts in minutes." })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "flex justify-end items-end mb-4 h-full row-start-3 col-span-3 md:col-span-3 z-1", children: /* @__PURE__ */ jsx(
          Button,
          {
            text: "Book a Demo",
            clr: "#ffffff",
            brClr: "#ffffff",
            arrClr: "#ffffff",
            url: "/contact"
          }
        ) })
      ] }) })
    ] }) })
  ] });
};
const Products = ({ products: products2 }) => {
  return /* @__PURE__ */ jsx("div", { className: "lg:px-10 relative", children: products2.map((data, idx) => {
    return /* @__PURE__ */ jsxs(
      "div",
      {
        className: "grid items-center gap-10 lg:grid-cols-2 px-2 md:px-6 py-5 sticky top-30 bg-white",
        children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: `flex items-center justify-center py-3 ${idx % 2 !== 0 ? "lg:order-2" : "lg:order-1"}`,
              children: /* @__PURE__ */ jsx("div", { className: "overflow-hidden w-full rounded-3xl", children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: data?.img,
                  alt: "products-img",
                  className: "h-80 w-full object-cover object-center transition-all duration-300 hover:scale-115"
                }
              ) })
            }
          ),
          /* @__PURE__ */ jsx("div", { className: `${idx % 2 !== 0 ? "lg:order-1" : "lg:order-2"}`, children: /* @__PURE__ */ jsxs(TextFade, { children: [
            /* @__PURE__ */ jsx("p", { className: "text-[#A5EB14] text-xl font-semibold py-0.5 mb-3", children: data?.title }),
            /* @__PURE__ */ jsx("h2", { className: "text-3xl text-[#0A0C33] font-bold mb-3", children: data?.heading }),
            /* @__PURE__ */ jsx("p", { className: "mb-4 text-lg text-[#4D4D4D]", children: data?.text }),
            /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: data?.lists.map((list, idx2) => /* @__PURE__ */ jsxs(
              "li",
              {
                className: "flex items-center text-lg gap-3 text-[#4D4D4D] my-3",
                children: [
                  /* @__PURE__ */ jsx("img", { src: TickSvg, className: "h-6" }),
                  /* @__PURE__ */ jsx("p", { children: list })
                ]
              },
              idx2
            )) })
          ] }) })
        ]
      },
      data.id
    );
  }) });
};
const StaggerHeadline = () => {
  const words = ["Fast", "Reliable", "Secure", "Easy"];
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    },
    exit: {
      opacity: 0,
      transition: { staggerChildren: 0.03, staggerDirection: -1 }
    }
  };
  const letter = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.2 } },
    exit: { y: -20, opacity: 0, transition: { duration: 0.2 } }
  };
  return /* @__PURE__ */ jsxs("h1", { className: "text-dark md:text-center text-[42px] lg:text-6xl my-4 leading-[3.2rem] lg:leading-[4rem] font-semibold", children: [
    "Need to Move Money,",
    " ",
    /* @__PURE__ */ jsx("span", { className: "inline-block relative", children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsx(
      motion.span,
      {
        variants: container,
        initial: "hidden",
        animate: "show",
        exit: "exit",
        className: "inline-flex",
        children: words[index].split("").map((char, i) => /* @__PURE__ */ jsx(motion.span, { variants: letter, className: "text-gray-400", children: char }, i))
      },
      words[index]
    ) }) }),
    /* @__PURE__ */ jsx("br", {}),
    "Just ",
    /* @__PURE__ */ jsx("span", { className: "text-[#A5EB14]", children: "Bridg" }),
    " It."
  ] });
};
const Logo$1 = "/assets/logo-Db9bpFQY.svg";
const LinkedInSvg = "data:image/svg+xml,%3csvg%20width='17'%20height='17'%20viewBox='0%200%2017%2017'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M1.2751%200H16.1251C16.4963%200%2016.8001%200.30375%2016.8001%200.675V15.525C16.8001%2015.8963%2016.4963%2016.2%2016.1251%2016.2H1.2751C0.903848%2016.2%200.600098%2015.8963%200.600098%2015.525V0.675C0.600098%200.30375%200.903848%200%201.2751%200ZM2.99609%2013.8039H5.39234V6.0752H2.99609V13.8039ZM4.21134%205.02871C3.43509%205.02871%202.82759%204.42121%202.82759%203.64496C2.82759%202.86871%203.43509%202.26121%204.21134%202.26121C4.98759%202.26121%205.59509%202.86871%205.59509%203.64496C5.59509%204.38746%204.98759%205.02871%204.21134%205.02871ZM12.0075%2013.8038H14.37V9.55127C14.37%207.45877%2013.9312%205.87252%2011.5012%205.87252C10.3537%205.87252%209.54371%206.51377%209.23996%207.12127H9.20621V6.07502H6.91121V13.8038H9.30746V9.99002C9.30746%208.97752%209.50996%207.99877%2010.7587%207.99877C12.0075%207.99877%2012.0075%209.14627%2012.0075%2010.0575V13.8038Z'%20fill='%23A5EB14'/%3e%3c/svg%3e";
const InstaSvg = "data:image/svg+xml,%3csvg%20width='17'%20height='17'%20viewBox='0%200%2017%2017'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M5.56049%200.0486C6.42449%200.00945%206.70022%200%208.90005%200C11.0999%200%2011.3756%200.00945%2012.2396%200.0486C13.5565%200.108675%2014.7125%200.431325%2015.6406%201.35945C16.5691%202.28791%2016.8914%203.44419%2016.9514%204.76044C16.9906%205.62444%2017%205.90018%2017%208.1C17%2010.2998%2016.9906%2010.5756%2016.9514%2011.4396C16.8914%2012.7565%2016.5687%2013.9124%2015.6406%2014.8406C14.7121%2015.769%2013.5555%2016.0913%2012.2396%2016.1514C11.3756%2016.1905%2011.0999%2016.2%208.90005%2016.2C6.70022%2016.2%206.42449%2016.1905%205.56049%2016.1514C4.24356%2016.0913%203.08762%2015.7687%202.1595%2014.8406C1.23104%2013.9121%200.908724%2012.7558%200.848649%2011.4396C0.809499%2010.5756%200.800049%2010.2998%200.800049%208.1C0.800049%205.90018%200.809499%205.62444%200.848649%204.76044C0.908724%203.44351%201.23137%202.28758%202.1595%201.35945C3.08796%200.430987%204.24424%200.108675%205.56049%200.0486ZM12.1731%201.50656C11.3189%201.46741%2011.0628%201.45931%208.90007%201.45931C6.73737%201.45931%206.48121%201.46775%205.627%201.50656C4.70529%201.54875%203.84972%201.73336%203.1916%202.39149C2.53347%203.04961%202.34886%203.90518%202.30667%204.82689C2.26752%205.6811%202.25942%205.93726%202.25942%208.09996C2.25942%2010.2627%202.26786%2010.5188%202.30667%2011.373C2.34886%2012.2948%202.53347%2013.1503%203.1916%2013.8084C3.84972%2014.4666%204.70529%2014.6512%205.627%2014.6934C6.48087%2014.7325%206.73704%2014.7406%208.90007%2014.7406C11.0631%2014.7406%2011.3193%2014.7322%2012.1731%2014.6934C13.0949%2014.6512%2013.9504%2014.4666%2014.6085%2013.8084C15.2667%2013.1503%2015.4513%2012.2948%2015.4935%2011.373C15.5326%2010.5188%2015.5407%2010.2627%2015.5407%208.09996C15.5407%205.93726%2015.5323%205.6811%2015.4935%204.82689C15.4513%203.90518%2015.2667%203.04961%2014.6085%202.39149C13.9504%201.73336%2013.0949%201.54875%2012.1731%201.50656Z'%20fill='%23A5EB14'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M5.21802%208.46797C5.21802%206.23133%207.03105%204.41797%209.26802%204.41797C11.505%204.41797%2013.318%206.231%2013.318%208.46797C13.318%2010.7049%2011.505%2012.518%209.26802%2012.518C7.03105%2012.518%205.21802%2010.7046%205.21802%208.46797ZM6.63899%208.4679C6.63899%209.91977%207.81613%2011.0969%209.26801%2011.0969C10.7199%2011.0969%2011.897%209.91977%2011.897%208.4679C11.897%207.01602%2010.7199%205.83888%209.26801%205.83888C7.81613%205.83888%206.63899%207.01602%206.63899%208.4679Z'%20fill='%23A5EB14'/%3e%3ccircle%20cx='12.95'%20cy='4.04998'%20r='1.10455'%20fill='%23A5EB14'/%3e%3c/svg%3e";
const FbSvg = "data:image/svg+xml,%3csvg%20width='18'%20height='17'%20viewBox='0%200%2018%2017'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M16.4249%200H1.5749C1.20211%200%200.899902%200.302208%200.899902%200.675V15.525C0.899902%2015.8978%201.20211%2016.2%201.5749%2016.2H9.55283V9.92652H7.44166V7.48161H9.55283V5.67857C9.55283%203.58614%2010.8308%202.44678%2012.6974%202.44678C13.5915%202.44678%2014.3599%202.51335%2014.5839%202.5431V4.72981L13.2893%204.73039C12.2742%204.73039%2012.0776%205.21278%2012.0776%205.92065V7.48161H14.4987L14.1834%209.92652H12.0776V16.2H16.4249C16.7977%2016.2%2017.0999%2015.8978%2017.0999%2015.525V0.675C17.0999%200.302208%2016.7977%200%2016.4249%200Z'%20fill='%23A5EB14'/%3e%3c/svg%3e";
const XSvg = "data:image/svg+xml,%3csvg%20width='16'%20height='15'%20viewBox='0%200%2016%2015'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M15.3%202.36577C14.7263%202.64412%2014.1206%202.81809%2013.4831%202.92247C14.1206%202.50495%2014.6306%201.84386%2014.8538%201.04361C14.2481%201.42634%2013.5788%201.70469%2012.8456%201.87866C12.2719%201.21757%2011.4431%200.800049%2010.5506%200.800049C8.82938%200.800049%207.42688%202.33098%207.42688%204.20984C7.42688%204.48819%207.45875%204.73175%207.5225%204.97531C4.94063%204.83613%202.61375%203.47917%201.05188%201.39154C0.796875%201.91345%200.6375%202.47015%200.6375%203.09644C0.6375%204.27943%201.17938%205.32324%202.04%205.94953C1.53%205.91474%201.05187%205.77556%200.605625%205.53201V5.5668C0.605625%207.2369%201.68938%208.62866%203.12375%208.9418C2.86875%209.01139%202.58188%209.04618%202.295%209.04618C2.10375%209.04618%201.88063%209.01139%201.68938%208.97659C2.10375%2010.3336%203.25125%2011.3426%204.62187%2011.3426C3.53813%2012.2472%202.19938%2012.8039%200.733125%2012.8039C0.478125%2012.8039%200.223125%2012.8039%200%2012.7691C1.4025%2013.7433%203.02813%2014.3%204.81313%2014.3C10.5825%2014.3%2013.7381%209.08098%2013.7381%204.55778C13.7381%204.41861%2013.7381%204.24464%2013.7381%204.10546C14.3438%203.65314%2014.8856%203.06165%2015.3%202.36577Z'%20fill='%23A5EB14'/%3e%3c/svg%3e";
const useScroll = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const scrollNavigate = (path, targetId = null) => {
    if (location.pathname === path) {
      if (targetId) {
        const targetSection = document.getElementById(targetId);
        console.log(targetSection);
        if (targetSection) {
          window?.scrollTo({
            top: targetSection.offsetTop,
            behavior: "smooth"
          });
        }
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      navigate(path, { state: { scrollTo: targetId } });
    }
  };
  return scrollNavigate;
};
const ScrollHandler = memo(() => {
  const location = useLocation();
  useEffect(() => {
    if (typeof window === "undefined") return;
    const scrollToId = location.state?.scrollTo || location.hash?.replace("#", "");
    if (scrollToId) {
      setTimeout(() => {
        const targetSection = document.getElementById(scrollToId);
        if (targetSection) {
          window?.scrollTo({
            top: targetSection?.offsetTop,
            behavior: "smooth"
          });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.pathname, location.hash]);
  return null;
});
const Footer = () => {
  const scrollNavigate = useScroll();
  return /* @__PURE__ */ jsx("footer", { className: "bg-[#0A0C33] pb-5 pt-8 text-white", children: /* @__PURE__ */ jsxs("section", { className: "px-7 md:px-12 lg:px-15", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-y-10 py-15", children: [
      /* @__PURE__ */ jsxs("div", { className: "pe-10", children: [
        /* @__PURE__ */ jsx("button", { onClick: () => scrollNavigate("/"), children: /* @__PURE__ */ jsx(
          "img",
          {
            src: Logo$1,
            alt: "footer logo",
            className: "h-15 mb-2 cursor-pointer"
          }
        ) }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-200", children: "Collect. Payout. Reconcile. All-in-one fintech infrastructure built for modern merchants." }),
        /* @__PURE__ */ jsxs("div", { className: "my-3", children: [
          /* @__PURE__ */ jsx("p", { className: "text-[#A5EB14] text-lg font-bold", children: "Let's Talk" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-200 mt-2", children: "Connect with us" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-200", children: /* @__PURE__ */ jsx("a", { href: "emailto:hello@bridg.money", children: "hello@bridg.money" }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-5 mt-5", children: [
          /* @__PURE__ */ jsx("a", { href: "https://x.com/bridgmoney38481", target: "_blank", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: XSvg,
              alt: "X",
              className: "cursor-pointer hover:scale-125 transition"
            }
          ) }),
          /* @__PURE__ */ jsx(
            "img",
            {
              src: FbSvg,
              alt: "FaceBook",
              className: "cursor-pointer hover:scale-125 transition"
            }
          ),
          /* @__PURE__ */ jsx("a", { href: "https://www.instagram.com/bridg.money", target: "_blank", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: InstaSvg,
              alt: "Instagram",
              className: "cursor-pointer hover:scale-125 transition"
            }
          ) }),
          /* @__PURE__ */ jsx("a", { href: "https://www.linkedin.com/company/bridg-financial-technologies-private-limited/", target: "_blank", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: LinkedInSvg,
              alt: "LinkedIn",
              className: "cursor-pointer hover:scale-125 transition"
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:col-span-2 gap-4 xl:col-span-2 md:grid-cols-3 lg:grid-cols-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-2 col-span-2", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
              /* @__PURE__ */ jsx("h6", { className: "text-[#A5EB14] mb-3 text-lg font-bold", children: "Get Started" }),
              /* @__PURE__ */ jsx("p", { className: "mb-2 text-gray-200", children: "Login" }),
              /* @__PURE__ */ jsx("p", { className: "mb-2 text-gray-200", children: "SignUp" })
            ] }),
            /* @__PURE__ */ jsx("h6", { className: "text-[#A5EB14] mb-3 text-lg font-bold", children: "Product" }),
            /* @__PURE__ */ jsxs("ul", { children: [
              /* @__PURE__ */ jsx(
                "li",
                {
                  role: "button",
                  onClick: () => scrollNavigate("/bridg-pay"),
                  className: "text-gray-200 cursor-pointer mb-2",
                  children: "BridgPay"
                }
              ),
              /* @__PURE__ */ jsx("li", { className: "mb-2 text-gray-200", children: "BridgOnboard" }),
              /* @__PURE__ */ jsx("li", { className: "mb-2 text-gray-200", children: "BridgVerify" }),
              /* @__PURE__ */ jsx("li", { className: "mb-2 text-gray-200", children: "BridgCollect" }),
              /* @__PURE__ */ jsx("li", { className: "mb-2 text-gray-200", children: "BridgRoute" }),
              /* @__PURE__ */ jsx("li", { className: "mb-2 text-gray-200", children: "BridgRecon" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("ul", { children: [
            /* @__PURE__ */ jsx("h6", { className: "text-[#A5EB14] mb-3 text-lg font-bold", children: "Use Cases" }),
            /* @__PURE__ */ jsx(
              "li",
              {
                role: "button",
                onClick: () => scrollNavigate("/small-business"),
                className: "text-gray-200 cursor-pointer mb-2",
                children: "Small Businesses"
              }
            ),
            /* @__PURE__ */ jsx(
              "li",
              {
                role: "button",
                onClick: () => scrollNavigate("/startup"),
                className: "text-gray-200 cursor-pointer mb-2",
                children: "Startups"
              }
            ),
            /* @__PURE__ */ jsx(
              "li",
              {
                role: "button",
                onClick: () => scrollNavigate("/sme"),
                className: "text-gray-200 cursor-pointer mb-2",
                children: "SME's"
              }
            ),
            /* @__PURE__ */ jsx(
              "li",
              {
                role: "button",
                onClick: () => scrollNavigate("/enterprise"),
                className: "text-gray-200 cursor-pointer mb-2",
                children: "Enterprise"
              }
            ),
            /* @__PURE__ */ jsx(
              "li",
              {
                role: "button",
                onClick: () => scrollNavigate("/retail-and-e-commerce"),
                className: "text-gray-200 cursor-pointer mb-2",
                children: "Retail & Ecommerce"
              }
            ),
            /* @__PURE__ */ jsx(
              "li",
              {
                role: "button",
                onClick: () => scrollNavigate("/software-and-tech"),
                className: "text-gray-200 cursor-pointer mb-2",
                children: "Software and Tech"
              }
            ),
            /* @__PURE__ */ jsx(
              "li",
              {
                role: "button",
                onClick: () => scrollNavigate("/manufacturers"),
                className: "text-gray-200 cursor-pointer mb-2",
                children: "Manufacturers"
              }
            ),
            /* @__PURE__ */ jsx(
              "li",
              {
                role: "button",
                onClick: () => scrollNavigate("/real-estate"),
                className: "text-gray-200 cursor-pointer mb-2",
                children: "Real Estate"
              }
            ),
            /* @__PURE__ */ jsx(
              "li",
              {
                role: "button",
                onClick: () => scrollNavigate("/healthcare"),
                className: "text-gray-200 cursor-pointer mb-2",
                children: "Healthcare"
              }
            ),
            /* @__PURE__ */ jsx(
              "li",
              {
                role: "button",
                onClick: () => scrollNavigate("/hospitality"),
                className: "text-gray-200 cursor-pointer mb-2",
                children: "Hospitality"
              }
            ),
            /* @__PURE__ */ jsx(
              "li",
              {
                role: "button",
                onClick: () => scrollNavigate("/professional-services"),
                className: "text-gray-200 cursor-pointer mb-2",
                children: "Professional Services"
              }
            ),
            /* @__PURE__ */ jsx(
              "li",
              {
                role: "button",
                onClick: () => scrollNavigate("/consultant-and-freelancers"),
                className: "text-gray-200 cursor-pointer mb-2",
                children: "Consultants and Freelancers"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h6", { className: "text-[#A5EB14] mb-3 text-lg font-bold", children: "Company" }),
          /* @__PURE__ */ jsxs("ul", { children: [
            /* @__PURE__ */ jsx(
              "li",
              {
                role: "button",
                onClick: () => scrollNavigate("/about"),
                className: "text-gray-200 cursor-pointer mb-2",
                children: "About Us"
              }
            ),
            /* @__PURE__ */ jsx(
              "li",
              {
                role: "button",
                onClick: () => scrollNavigate("/careers"),
                className: "text-gray-200 cursor-pointer mb-2",
                children: "Careers"
              }
            ),
            /* @__PURE__ */ jsx(
              "li",
              {
                role: "button",
                onClick: () => scrollNavigate("/privacy-policy"),
                className: "text-gray-200 cursor-pointer mb-2",
                children: "Privacy Policy"
              }
            ),
            /* @__PURE__ */ jsx(
              "li",
              {
                role: "button",
                onClick: () => scrollNavigate("/terms"),
                className: "text-gray-200 cursor-pointer mb-2",
                children: "Terms & Conditions"
              }
            ),
            /* @__PURE__ */ jsx(
              "li",
              {
                role: "button",
                onClick: () => scrollNavigate("/grievance-redressal-policy"),
                className: "text-gray-200 cursor-pointer mb-2",
                children: "Grievance Policy"
              }
            ),
            /* @__PURE__ */ jsx(
              "li",
              {
                role: "button",
                onClick: () => scrollNavigate("/responsible-disclosure"),
                className: "text-gray-200 cursor-pointer mb-2",
                children: "Responsible Disclosure"
              }
            ),
            /* @__PURE__ */ jsx(
              "li",
              {
                role: "button",
                onClick: () => scrollNavigate("/security"),
                className: "text-gray-200 cursor-pointer mb-2",
                children: "Secure Usage Guidelines"
              }
            ),
            /* @__PURE__ */ jsx(
              "li",
              {
                role: "button",
                onClick: () => scrollNavigate("/trust-and-security"),
                className: "text-gray-200 cursor-pointer mb-2",
                children: "Trust & Security"
              }
            ),
            /* @__PURE__ */ jsx(
              "li",
              {
                role: "button",
                onClick: () => scrollNavigate("/corporate-policies"),
                className: "text-gray-200 cursor-pointer mb-2",
                children: "Corporate Policies"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "my-3", children: [
            /* @__PURE__ */ jsx("h6", { className: "text-[#A5EB14] mb-3 text-lg font-bold", children: "Resources" }),
            /* @__PURE__ */ jsxs("ul", { children: [
              /* @__PURE__ */ jsx(
                "li",
                {
                  role: "button",
                  onClick: () => scrollNavigate("/faq"),
                  className: "text-gray-200 cursor-pointer mb-2",
                  children: "FAQ"
                }
              ),
              /* @__PURE__ */ jsx(
                "li",
                {
                  role: "button",
                  onClick: () => scrollNavigate("/blog"),
                  className: "text-gray-200 cursor-pointer mb-2",
                  children: "Blog"
                }
              ),
              /* @__PURE__ */ jsx("p", { className: "mb-2 text-gray-200", children: "Help Centre" })
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "text-center", children: /* @__PURE__ */ jsxs("p", { className: "text-gray-400 py-5 text-sm", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " Bridg Financial Technologies Pvt. Ltd. All rights reserved."
    ] }) })
  ] }) });
};
const Logo = "/assets/logo%20dark-DOLJsy7G.svg";
const ArrowSvg = "data:image/svg+xml,%3csvg%20width='10'%20height='10'%20viewBox='0%200%2010%2010'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M4.4826%200.214312C4.76835%20-0.0714374%205.23165%20-0.0714374%205.5174%200.214312L9.78569%204.4826C9.92291%204.61983%2010%204.80594%2010%205C10%205.19406%209.92291%205.38017%209.78569%205.5174L5.5174%209.78569C5.23165%2010.0714%204.76835%2010.0714%204.4826%209.78569C4.19686%209.49994%204.19686%209.03665%204.4826%208.7509L7.5018%205.73171H0.731707C0.327596%205.73171%200%205.40411%200%205C0%204.59589%200.327596%204.26829%200.731707%204.26829H7.50179L4.4826%201.2491C4.19686%200.963353%204.19686%200.500062%204.4826%200.214312Z'%20fill='%231E1E1E'/%3e%3c/svg%3e";
const BridgVaultSvg = "data:image/svg+xml,%3csvg%20width='34'%20height='34'%20viewBox='0%200%2034%2034'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M17%205.66663C18.5029%205.66663%2019.9442%206.26365%2021.0069%207.32635C22.0696%208.38906%2022.6666%209.8304%2022.6666%2011.3333C22.6666%2012.8362%2022.0696%2014.2775%2021.0069%2015.3402C19.9442%2016.4029%2018.5029%2017%2017%2017C15.4971%2017%2014.0557%2016.4029%2012.993%2015.3402C11.9303%2014.2775%2011.3333%2012.8362%2011.3333%2011.3333C11.3333%209.8304%2011.9303%208.38906%2012.993%207.32635C14.0557%206.26365%2015.4971%205.66663%2017%205.66663ZM17%2019.8333C23.2616%2019.8333%2028.3333%2022.3691%2028.3333%2025.5V28.3333H5.66663V25.5C5.66663%2022.3691%2010.7383%2019.8333%2017%2019.8333Z'%20fill='%23A5EB14'/%3e%3c/svg%3e";
const SmallBusinessSvg = "data:image/svg+xml,%3csvg%20width='34'%20height='34'%20viewBox='0%200%2034%2034'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M6.79994%205.5982C7.11868%205.27936%207.55101%205.10019%208.00184%205.1001H25.998C26.4489%205.10019%2026.8812%205.27936%2027.1999%205.5982L31.6913%2010.0879C32.9867%2011.385%2032.0687%2013.6001%2030.2361%2013.6001H3.76374C1.93114%2013.6001%201.01484%2011.385%202.31194%2010.0879L6.79994%205.5982ZM28.8999%2015.3001H5.09994V25.5001C5.09994%2026.4018%205.45815%2027.2666%206.09578%2027.9043C6.7334%2028.5419%207.5982%2028.9001%208.49994%2028.9001H25.4999C26.4017%2028.9001%2027.2665%2028.5419%2027.9041%2027.9043C28.5417%2027.2666%2028.8999%2026.4018%2028.8999%2025.5001V15.3001ZM11.8999%2022.1001C11.4491%2022.1001%2011.0167%2021.921%2010.6979%2021.6022C10.379%2021.2834%2010.1999%2020.851%2010.1999%2020.4001C10.1999%2019.9492%2010.379%2019.5168%2010.6979%2019.198C11.0167%2018.8792%2011.4491%2018.7001%2011.8999%2018.7001C12.3508%2018.7001%2012.7832%2018.8792%2013.102%2019.198C13.4208%2019.5168%2013.5999%2019.9492%2013.5999%2020.4001C13.5999%2020.851%2013.4208%2021.2834%2013.102%2021.6022C12.7832%2021.921%2012.3508%2022.1001%2011.8999%2022.1001ZM16.9999%2022.1001C16.5491%2022.1001%2016.1167%2021.921%2015.7979%2021.6022C15.479%2021.2834%2015.2999%2020.851%2015.2999%2020.4001C15.2999%2019.9492%2015.479%2019.5168%2015.7979%2019.198C16.1167%2018.8792%2016.5491%2018.7001%2016.9999%2018.7001C17.4508%2018.7001%2017.8832%2018.8792%2018.202%2019.198C18.5208%2019.5168%2018.6999%2019.9492%2018.6999%2020.4001C18.6999%2020.851%2018.5208%2021.2834%2018.202%2021.6022C17.8832%2021.921%2017.4508%2022.1001%2016.9999%2022.1001ZM22.0999%2022.1001C21.6491%2022.1001%2021.2167%2021.921%2020.8979%2021.6022C20.579%2021.2834%2020.3999%2020.851%2020.3999%2020.4001C20.3999%2019.9492%2020.579%2019.5168%2020.8979%2019.198C21.2167%2018.8792%2021.6491%2018.7001%2022.0999%2018.7001C22.5508%2018.7001%2022.9832%2018.8792%2023.302%2019.198C23.6208%2019.5168%2023.7999%2019.9492%2023.7999%2020.4001C23.7999%2020.851%2023.6208%2021.2834%2023.302%2021.6022C22.9832%2021.921%2022.5508%2022.1001%2022.0999%2022.1001Z'%20fill='%23A5EB14'/%3e%3c/svg%3e";
const StartUpSvg = "data:image/svg+xml,%3csvg%20width='34'%20height='34'%20viewBox='0%200%2034%2034'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_1443_2537)'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M15.8999%2024.9243L9.07557%2018.1C9.826%2016.8444%2010.574%2015.5452%2011.3147%2014.2532C13.7821%209.96431%2016.1913%205.77745%2018.4499%203.59902C24.5796%20-2.53069%2032.9751%201.02474%2032.9751%201.02474C32.9751%201.02474%2036.5306%209.42031%2030.4009%2015.55C28.2394%2017.7892%2024.1181%2020.1643%2019.8609%2022.6123C18.5349%2023.3773%2017.1967%2024.1472%2015.8999%2024.9243ZM21.097%209.06088C21.097%208.04192%2021.5018%207.06469%2022.2223%206.34417C22.9428%205.62366%2023.92%205.21888%2024.939%205.21888C25.958%205.21888%2026.9352%205.62366%2027.6557%206.34417C28.3762%207.06469%2028.781%208.04192%2028.781%209.06088C28.7558%2010.0628%2028.3401%2011.0152%2027.6226%2011.7149C26.905%2012.4147%2025.9424%2012.8063%2024.9402%2012.8063C23.938%2012.8063%2022.9754%2012.4147%2022.2579%2011.7149C21.5403%2011.0152%2021.1222%2010.0628%2021.097%209.06088ZM11.1666%208.49745C7.72285%207.58188%204.49043%209.27702%201.62228%2011.9072C1.49002%2012.0318%201.38871%2012.1856%201.32645%2012.3563C1.2642%2012.527%201.24271%2012.7099%201.26371%2012.8904C1.28471%2013.0709%201.34761%2013.244%201.4474%2013.3958C1.54718%2013.5477%201.68109%2013.6741%201.83843%2013.765L6.46486%2016.553L6.46971%2016.5433C7.13757%2015.4262%207.88314%2014.1317%208.64086%2012.8203C9.503%2011.3219%2010.3797%209.80159%2011.1666%208.49745ZM17.4493%2027.5375L20.2373%2032.1639C20.3284%2032.321%2020.455%2032.4547%2020.607%2032.5543C20.7589%2032.6539%2020.9321%2032.7165%2021.1125%2032.7373C21.293%2032.758%2021.4759%2032.7363%2021.6465%2032.6739C21.8171%2032.6114%2021.9707%2032.51%2022.0951%2032.3776C24.7253%2029.5119%2026.4229%2026.277%2025.5049%2022.8333C24.2371%2023.5959%2022.9063%2024.3633%2021.5876%2025.1235L21.386%2025.24C20.0551%2026.0075%2018.7364%2026.7652%2017.4614%2027.5302L17.4493%2027.5375ZM6.36771%2022.69C7.34927%2022.6726%208.31305%2022.9531%209.13203%2023.4944C9.95101%2024.0357%2010.5867%2024.8125%2010.9554%2025.7223C11.3241%2026.6322%2011.4084%2027.6324%2011.1972%2028.5911C10.9861%2029.5499%2010.4894%2030.4221%209.77257%2031.0929C9.23343%2031.6077%208.39071%2032.0133%207.61114%2032.3217C6.73653%2032.6582%205.84482%2032.9484%204.93971%2033.1912C4.04843%2033.434%203.19843%2033.6283%202.55486%2033.757C2.28427%2033.8125%202.01216%2033.8603%201.73886%2033.9003C1.632%2033.9149%201.52433%2033.9254%201.41586%2033.9319C1.25361%2033.9465%201.09008%2033.9283%200.934998%2033.8785C0.707063%2033.8121%200.503579%2033.6804%200.349712%2033.4996C0.217565%2033.3465%200.125739%2033.1629%200.0825693%2032.9653C0.0518487%2032.825%200.0420283%2032.681%200.0534265%2032.5379C0.0607122%2032.4407%200.0752836%2032.329%200.089855%2032.227C0.121426%2032.0133%200.169998%2031.734%200.235569%2031.4159C0.364284%2030.7747%200.563426%2029.9296%200.806284%2029.0432C1.04914%2028.1592%201.34543%2027.212%201.67814%2026.3839C1.989%2025.6043%202.39214%2024.764%202.907%2024.2273C3.35151%2023.7524%203.88689%2023.3716%204.48137%2023.1075C5.07585%2022.8434%205.71732%2022.7015%206.36771%2022.69Z'%20fill='%23A5EB14'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_1443_2537'%3e%3crect%20width='34'%20height='34'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
const EnterpriseSvg = "data:image/svg+xml,%3csvg%20width='34'%20height='34'%20viewBox='0%200%2034%2034'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M5.66683%2029.7499C4.88766%2029.7499%204.22089%2029.4727%203.6665%2028.9183C3.11211%2028.3639%202.83444%2027.6967%202.8335%2026.9166V11.3333C2.8335%2010.5541%203.11116%209.88731%203.6665%209.33292C4.22183%208.77853%204.88861%208.50086%205.66683%208.49992H11.3335V5.66659C11.3335%204.88742%2011.6112%204.22064%2012.1665%203.66625C12.7218%203.11186%2013.3886%202.8342%2014.1668%202.83325H19.8335C20.6127%202.83325%2021.2799%203.11092%2021.8352%203.66625C22.3906%204.22159%2022.6678%204.88836%2022.6668%205.66659V8.49992H28.3335C29.1127%208.49992%2029.7799%208.77759%2030.3352%209.33292C30.8906%209.88825%2031.1678%2010.555%2031.1668%2011.3333V26.9166C31.1668%2027.6958%2030.8896%2028.363%2030.3352%2028.9183C29.7809%2029.4737%2029.1136%2029.7509%2028.3335%2029.7499H5.66683ZM14.1668%208.49992H19.8335V5.66659H14.1668V8.49992ZM17.0002%2021.9583C17.7793%2021.9583%2018.4466%2021.6811%2019.0019%2021.1267C19.5572%2020.5723%2019.8344%2019.905%2019.8335%2019.1249C19.8326%2018.3448%2019.5554%2017.678%2019.0019%2017.1246C18.4485%2016.5711%2017.7812%2016.2935%2017.0002%2016.2916C16.2191%2016.2897%2015.5523%2016.5674%2014.9998%2017.1246C14.4473%2017.6818%2014.1697%2018.3486%2014.1668%2019.1249C14.164%2019.9013%2014.4417%2020.5685%2014.9998%2021.1267C15.558%2021.6848%2016.2248%2021.962%2017.0002%2021.9583Z'%20fill='%23A5EB14'/%3e%3c/svg%3e";
const SMESvg = "data:image/svg+xml,%3csvg%20width='34'%20height='34'%20viewBox='0%200%2034%2034'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M5.6665%206.02075C5.6665%205.17537%206.00233%204.36462%206.6001%203.76685C7.19787%203.16908%208.00863%202.83325%208.854%202.83325H20.1873C21.0327%202.83325%2021.8435%203.16908%2022.4412%203.76685C23.039%204.36462%2023.3748%205.17537%2023.3748%206.02075V13.4583H25.1457C25.5643%2013.4583%2025.9787%2013.5407%2026.3655%2013.7009C26.7522%2013.8611%2027.1036%2014.0959%2027.3996%2014.3919C27.6956%2014.6878%2027.9303%2015.0392%2028.0905%2015.426C28.2507%2015.8127%2028.3332%2016.2272%2028.3332%2016.6458V30.1041C28.3332%2030.3859%2028.2212%2030.6561%2028.022%2030.8554C27.8227%2031.0546%2027.5525%2031.1666%2027.2707%2031.1666H23.3748V25.8541C23.3748%2024.8766%2022.5815%2024.0833%2021.604%2024.0833H12.3957C11.4182%2024.0833%2010.6248%2024.8766%2010.6248%2025.8541V31.1666H6.729C6.44721%2031.1666%206.17696%2031.0546%205.9777%2030.8554C5.77845%2030.6561%205.6665%2030.3859%205.6665%2030.1041V6.02075ZM21.2498%2026.2083V31.1666H18.0623V26.2083H21.2498ZM15.9373%2026.2083V31.1666H12.7498V26.2083H15.9373ZM10.6248%209.20825C10.6248%209.58398%2010.7741%209.94431%2011.0398%2010.21C11.3054%2010.4757%2011.6658%2010.6249%2012.0415%2010.6249C12.4172%2010.6249%2012.7776%2010.4757%2013.0432%2010.21C13.3089%209.94431%2013.4582%209.58398%2013.4582%209.20825C13.4582%208.83253%2013.3089%208.47219%2013.0432%208.20652C12.7776%207.94084%2012.4172%207.79159%2012.0415%207.79159C11.6658%207.79159%2011.3054%207.94084%2011.0398%208.20652C10.7741%208.47219%2010.6248%208.83253%2010.6248%209.20825ZM12.0415%2017.7083C11.6658%2017.7083%2011.3054%2017.8575%2011.0398%2018.1232C10.7741%2018.3889%2010.6248%2018.7492%2010.6248%2019.1249C10.6248%2019.5006%2010.7741%2019.861%2011.0398%2020.1267C11.3054%2020.3923%2011.6658%2020.5416%2012.0415%2020.5416C12.4172%2020.5416%2012.7776%2020.3923%2013.0432%2020.1267C13.3089%2019.861%2013.4582%2019.5006%2013.4582%2019.1249C13.4582%2018.7492%2013.3089%2018.3889%2013.0432%2018.1232C12.7776%2017.8575%2012.4172%2017.7083%2012.0415%2017.7083ZM12.0415%2012.7499C11.6658%2012.7499%2011.3054%2012.8992%2011.0398%2013.1649C10.7741%2013.4305%2010.6248%2013.7909%2010.6248%2014.1666C10.6248%2014.5423%2010.7741%2014.9026%2011.0398%2015.1683C11.3054%2015.434%2011.6658%2015.5833%2012.0415%2015.5833C12.4172%2015.5833%2012.7776%2015.434%2013.0432%2015.1683C13.3089%2014.9026%2013.4582%2014.5423%2013.4582%2014.1666C13.4582%2013.7909%2013.3089%2013.4305%2013.0432%2013.1649C12.7776%2012.8992%2012.4172%2012.7499%2012.0415%2012.7499ZM16.9998%207.79159C16.6241%207.79159%2016.2638%207.94084%2015.9981%208.20652C15.7324%208.47219%2015.5832%208.83253%2015.5832%209.20825C15.5832%209.58398%2015.7324%209.94431%2015.9981%2010.21C16.2638%2010.4757%2016.6241%2010.6249%2016.9998%2010.6249C17.3756%2010.6249%2017.7359%2010.4757%2018.0016%2010.21C18.2672%209.94431%2018.4165%209.58398%2018.4165%209.20825C18.4165%208.83253%2018.2672%208.47219%2018.0016%208.20652C17.7359%207.94084%2017.3756%207.79159%2016.9998%207.79159ZM16.9998%2017.7083C16.6241%2017.7083%2016.2638%2017.8575%2015.9981%2018.1232C15.7324%2018.3889%2015.5832%2018.7492%2015.5832%2019.1249C15.5832%2019.5006%2015.7324%2019.861%2015.9981%2020.1267C16.2638%2020.3923%2016.6241%2020.5416%2016.9998%2020.5416C17.3756%2020.5416%2017.7359%2020.3923%2018.0016%2020.1267C18.2672%2019.861%2018.4165%2019.5006%2018.4165%2019.1249C18.4165%2018.7492%2018.2672%2018.3889%2018.0016%2018.1232C17.7359%2017.8575%2017.3756%2017.7083%2016.9998%2017.7083ZM21.9582%2017.7083C21.5824%2017.7083%2021.2221%2017.8575%2020.9564%2018.1232C20.6908%2018.3889%2020.5415%2018.7492%2020.5415%2019.1249C20.5415%2019.5006%2020.6908%2019.861%2020.9564%2020.1267C21.2221%2020.3923%2021.5824%2020.5416%2021.9582%2020.5416C22.3339%2020.5416%2022.6942%2020.3923%2022.9599%2020.1267C23.2256%2019.861%2023.3748%2019.5006%2023.3748%2019.1249C23.3748%2018.7492%2023.2256%2018.3889%2022.9599%2018.1232C22.6942%2017.8575%2022.3339%2017.7083%2021.9582%2017.7083ZM16.9998%2012.7499C16.6241%2012.7499%2016.2638%2012.8992%2015.9981%2013.1649C15.7324%2013.4305%2015.5832%2013.7909%2015.5832%2014.1666C15.5832%2014.5423%2015.7324%2014.9026%2015.9981%2015.1683C16.2638%2015.434%2016.6241%2015.5833%2016.9998%2015.5833C17.3756%2015.5833%2017.7359%2015.434%2018.0016%2015.1683C18.2672%2014.9026%2018.4165%2014.5423%2018.4165%2014.1666C18.4165%2013.7909%2018.2672%2013.4305%2018.0016%2013.1649C17.7359%2012.8992%2017.3756%2012.7499%2016.9998%2012.7499Z'%20fill='%23A5EB14'/%3e%3c/svg%3e";
const ECommerceSvg = "/assets/e-commerce-D-IrN68K.svg";
const SoftwareSvg = "data:image/svg+xml,%3csvg%20width='34'%20height='34'%20viewBox='0%200%2034%2034'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M19.8332%2025.9533C18.288%2025.2064%2016.961%2024.0746%2015.9798%2022.6666H4.24984V5.66659H29.7498V8.86825C30.8962%209.675%2031.8613%2010.7125%2032.5832%2011.9141V5.66659C32.5832%204.91514%2032.2847%204.19447%2031.7533%203.66312C31.222%203.13176%2030.5013%202.83325%2029.7498%202.83325H4.24984C3.49839%202.83325%202.77772%203.13176%202.24637%203.66312C1.71501%204.19447%201.4165%204.91514%201.4165%205.66659V22.6666C1.4165%2023.418%201.71501%2024.1387%202.24637%2024.6701C2.77772%2025.2014%203.49839%2025.4999%204.24984%2025.4999H14.1665V28.3333H11.3332V31.1666H22.6665V28.3333H19.8332V25.9533Z'%20fill='%23A5EB14'/%3e%3cpath%20d='M24.0835%208.5C22.4024%208.5%2020.759%208.99852%2019.3612%209.93251C17.9633%2010.8665%2016.8739%2012.194%2016.2305%2013.7472C15.5872%2015.3004%2015.4189%2017.0094%2015.7468%2018.6583C16.0748%2020.3071%2016.8843%2021.8217%2018.0731%2023.0104C19.2618%2024.1992%2020.7764%2025.0087%2022.4252%2025.3367C24.0741%2025.6646%2025.7831%2025.4963%2027.3363%2024.853C28.8895%2024.2096%2030.217%2023.1202%2031.151%2021.7223C32.085%2020.3245%2032.5835%2018.6811%2032.5835%2017C32.5835%2014.7457%2031.688%2012.5837%2030.0939%2010.9896C28.4998%209.39553%2026.3378%208.5%2024.0835%208.5ZM24.0835%2019.125C23.6632%2019.125%2023.2524%2019.0004%2022.9029%2018.7669C22.5535%2018.5334%2022.2811%2018.2015%2022.1203%2017.8132C21.9594%2017.4249%2021.9173%2016.9976%2021.9993%2016.5854C22.0813%2016.1732%2022.2837%2015.7946%2022.5809%2015.4974C22.8781%2015.2002%2023.2567%2014.9978%2023.6689%2014.9158C24.0811%2014.8338%2024.5084%2014.8759%2024.8967%2015.0368C25.285%2015.1976%2025.6169%2015.47%2025.8504%2015.8194C26.0839%2016.1689%2026.2085%2016.5797%2026.2085%2017C26.2085%2017.5636%2025.9846%2018.1041%2025.5861%2018.5026C25.1876%2018.9011%2024.6471%2019.125%2024.0835%2019.125Z'%20fill='%23A5EB14'/%3e%3c/svg%3e";
const ManufacturesSvg = "data:image/svg+xml,%3csvg%20width='34'%20height='34'%20viewBox='0%200%2034%2034'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_1443_2541)'%3e%3cpath%20d='M8.5%200C8.82887%200%209.11347%200.120164%209.3538%200.360491C9.59412%200.600818%209.71429%200.885417%209.71429%201.21429V18.1194L19.8839%209.97991C20.099%209.80283%2020.3519%209.71429%2020.6429%209.71429C20.9717%209.71429%2021.2563%209.83445%2021.4967%2010.0748C21.737%2010.3151%2021.8571%2010.5997%2021.8571%2010.9286V18.1194L32.0268%209.97991C32.2418%209.80283%2032.4948%209.71429%2032.7857%209.71429C33.1146%209.71429%2033.3992%209.83445%2033.6395%2010.0748C33.8798%2010.3151%2034%2010.5997%2034%2010.9286V32.7857C34%2033.1146%2033.8798%2033.3992%2033.6395%2033.6395C33.3992%2033.8798%2033.1146%2034%2032.7857%2034H1.21429C0.885417%2034%200.600818%2033.8798%200.360491%2033.6395C0.120164%2033.3992%200%2033.1146%200%2032.7857V1.21429C0%200.885417%200.120164%200.600818%200.360491%200.360491C0.600818%200.120164%200.885417%200%201.21429%200H8.5Z'%20fill='%23A5EB14'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_1443_2541'%3e%3crect%20width='34'%20height='34'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
const RealEstateSvg = "data:image/svg+xml,%3csvg%20width='34'%20height='34'%20viewBox='0%200%2034%2034'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M3.3999%205.0999C3.3999%204.64903%203.57901%204.21663%203.89782%203.89782C4.21663%203.57901%204.64903%203.3999%205.0999%203.3999C5.55077%203.3999%205.98317%203.57901%206.30198%203.89782C6.6208%204.21663%206.7999%204.64903%206.7999%205.0999H28.8999C29.3508%205.0999%2029.7832%205.27901%2030.102%205.59782C30.4208%205.91663%2030.5999%206.34903%2030.5999%206.7999C30.5999%207.25077%2030.4208%207.68317%2030.102%208.00198C29.7832%208.3208%2029.3508%208.4999%2028.8999%208.4999H6.7999V29.7499C6.7999%2029.9753%206.71035%2030.1915%206.55094%2030.3509C6.39154%2030.5104%206.17534%2030.5999%205.9499%2030.5999H4.2499C4.02447%2030.5999%203.80827%2030.5104%203.64886%2030.3509C3.48946%2030.1915%203.3999%2029.9753%203.3999%2029.7499V5.0999ZM8.4999%2011.0499C8.4999%2010.8245%208.58946%2010.6083%208.74886%2010.4489C8.90827%2010.2895%209.12447%2010.1999%209.3499%2010.1999H28.0499C28.2753%2010.1999%2028.4915%2010.2895%2028.6509%2010.4489C28.8104%2010.6083%2028.8999%2010.8245%2028.8999%2011.0499V22.9499C28.8999%2024.0771%2028.4521%2025.1581%2027.6551%2025.9551C26.8581%2026.7521%2025.7771%2027.1999%2024.6499%2027.1999H12.7499C11.6227%2027.1999%2010.5417%2026.7521%209.7447%2025.9551C8.94767%2025.1581%208.4999%2024.0771%208.4999%2022.9499V11.0499ZM13.5999%2022.9499C13.5999%2023.1753%2013.6895%2023.3915%2013.8489%2023.5509C14.0083%2023.7104%2014.2245%2023.7999%2014.4499%2023.7999H16.1499C16.3753%2023.7999%2016.5915%2023.7104%2016.7509%2023.5509C16.9103%2023.3915%2016.9999%2023.1753%2016.9999%2022.9499V21.2499C16.9999%2021.0245%2017.0895%2020.8083%2017.2489%2020.6489C17.4083%2020.4895%2017.6245%2020.3999%2017.8499%2020.3999H19.5499C19.7753%2020.3999%2019.9915%2020.4895%2020.1509%2020.6489C20.3104%2020.8083%2020.3999%2021.0245%2020.3999%2021.2499V22.9499C20.3999%2023.1753%2020.4895%2023.3915%2020.6489%2023.5509C20.8083%2023.7104%2021.0245%2023.7999%2021.2499%2023.7999H22.9499C23.1753%2023.7999%2023.3915%2023.7104%2023.5509%2023.5509C23.7104%2023.3915%2023.7999%2023.1753%2023.7999%2022.9499V18.6149C23.8%2018.3746%2023.7491%2018.137%2023.6506%2017.9179C23.5522%2017.6987%2023.4084%2017.5029%2023.2287%2017.3433L19.2643%2013.8209C19.1087%2013.6828%2018.9079%2013.6065%2018.6999%2013.6065C18.4919%2013.6065%2018.2911%2013.6828%2018.1355%2013.8209L14.1711%2017.3399C13.991%2017.4998%2013.8469%2017.6962%2013.7485%2017.916C13.65%2018.1358%2013.5994%2018.374%2013.5999%2018.6149V22.9499Z'%20fill='%23A5EB14'/%3e%3c/svg%3e";
const HealthCareSvg = "data:image/svg+xml,%3csvg%20width='34'%20height='34'%20viewBox='0%200%2034%2034'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M12.6963%2026.1643C8.52708%2022.9697%202.8335%2017.6926%202.8335%2012.7031C2.8335%204.36748%2010.6252%201.25506%2017.0002%207.69239C23.3752%201.25506%2031.1668%204.36748%2031.1668%2012.7031C31.1668%2017.6926%2025.4718%2022.9697%2021.304%2026.1643C19.417%2027.6093%2018.4735%2028.3332%2017.0002%2028.3332C15.5268%2028.3332%2014.5833%2027.6107%2012.6963%2026.1643ZM23.3752%208.85406C23.657%208.85406%2023.9272%208.966%2024.1265%209.16526C24.3257%209.36452%2024.4377%209.63477%2024.4377%209.91656V11.6874H26.2085C26.4903%2011.6874%2026.7605%2011.7993%2026.9598%2011.9986C27.1591%2012.1979%2027.271%2012.4681%2027.271%2012.7499C27.271%2013.0317%2027.1591%2013.3019%2026.9598%2013.5012C26.7605%2013.7005%2026.4903%2013.8124%2026.2085%2013.8124H24.4377V15.5832C24.4377%2015.865%2024.3257%2016.1353%2024.1265%2016.3345C23.9272%2016.5338%2023.657%2016.6457%2023.3752%2016.6457C23.0934%2016.6457%2022.8231%2016.5338%2022.6239%2016.3345C22.4246%2016.1353%2022.3127%2015.865%2022.3127%2015.5832V13.8124H20.5418C20.26%2013.8124%2019.9898%2013.7005%2019.7905%2013.5012C19.5913%2013.3019%2019.4793%2013.0317%2019.4793%2012.7499C19.4793%2012.4681%2019.5913%2012.1979%2019.7905%2011.9986C19.9898%2011.7993%2020.26%2011.6874%2020.5418%2011.6874H22.3127V9.91656C22.3127%209.63477%2022.4246%209.36452%2022.6239%209.16526C22.8231%208.966%2023.0934%208.85406%2023.3752%208.85406Z'%20fill='%23A5EB14'/%3e%3c/svg%3e";
const HospitalSvg = "data:image/svg+xml,%3csvg%20width='34'%20height='34'%20viewBox='0%200%2034%2034'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M28.3335%202.83325H5.66683V5.66659H7.0835V11.3333H2.8335V31.1666H12.0418V21.2499H21.9585V31.1666H31.1668V11.3333H26.9168V5.66659H28.3335V2.83325ZM18.4168%209.91659H21.2502V12.7499H18.4168V15.5833H15.5835V12.7499H12.7502V9.91659H15.5835V7.08325H18.4168V9.91659Z'%20fill='%23A5EB14'/%3e%3cpath%20d='M14.875%2031.1666V24.0833H19.125V31.1666H14.875Z'%20fill='%23A5EB14'/%3e%3c/svg%3e";
const ProfessionalServiceSvg = "data:image/svg+xml,%3csvg%20width='34'%20height='34'%20viewBox='0%200%2034%2034'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M5.66683%2028.3333C4.88766%2028.3333%204.22089%2028.0561%203.6665%2027.5018C3.11211%2026.9474%202.83444%2026.2801%202.8335%2025.5V19.8333H9.91683C9.91683%2020.2347%2010.0528%2020.5714%2010.3248%2020.8434C10.5968%2021.1154%2010.9331%2021.2509%2011.3335%2021.25C11.7113%2021.25%2011.9771%2021.0786%2012.1311%2020.7358C12.285%2020.3929%2012.4914%2020.0921%2012.7502%2019.8333H21.2502C21.2502%2020.2347%2021.3862%2020.5714%2021.6582%2020.8434C21.9302%2021.1154%2022.2664%2021.2509%2022.6668%2021.25C23.0446%2021.25%2023.3105%2021.0786%2023.4644%2020.7358C23.6184%2020.3929%2023.8247%2020.0921%2024.0835%2019.8333H31.1668V25.5C31.1668%2026.2792%2030.8896%2026.9464%2030.3352%2027.5018C29.7809%2028.0571%2029.1136%2028.3343%2028.3335%2028.3333H5.66683ZM3.43558%2017L6.37516%2010.2C6.58766%209.68056%206.93002%209.26736%207.40225%208.96042C7.87447%208.65347%208.38211%208.5%208.92516%208.5H9.91683V7.08334C9.91683%206.30417%2010.1945%205.63692%2010.7498%205.08159C11.3052%204.52625%2011.9719%204.24906%2012.7502%204.25H21.2502C22.0293%204.25%2022.6966%204.52767%2023.2519%205.083C23.8072%205.63834%2024.0844%206.30511%2024.0835%207.08334V8.5H25.0752C25.6182%208.5%2026.1259%208.65347%2026.5981%208.96042C27.0703%209.26736%2027.4127%209.68056%2027.6252%2010.2L30.5647%2017H24.0835C24.0835%2016.5986%2023.9475%2016.2624%2023.6755%2015.9913C23.4035%2015.7203%2023.0673%2015.5843%2022.6668%2015.5833C22.2891%2015.5833%2022.0237%2015.7548%2021.8707%2016.0976C21.7177%2016.4404%2021.5108%2016.7412%2021.2502%2017H12.7502C12.7502%2016.5986%2012.6142%2016.2624%2012.3422%2015.9913C12.0702%2015.7203%2011.7339%2015.5843%2011.3335%2015.5833C10.9557%2015.5833%2010.6903%2015.7548%2010.5373%2016.0976C10.3843%2016.4404%2010.1775%2016.7412%209.91683%2017H3.43558ZM12.7502%208.5H21.2502V7.08334H12.7502V8.5Z'%20fill='%23A5EB14'/%3e%3c/svg%3e";
const FreelancersSvg = "data:image/svg+xml,%3csvg%20width='34'%20height='34'%20viewBox='0%200%2034%2034'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_1443_2569)'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M7.4375%205.3125C7.4375%204.84285%207.62407%204.39243%207.95616%204.06033C8.28826%203.72824%208.73868%203.54167%209.20833%203.54167C9.67799%203.54167%2010.1284%203.72824%2010.4605%204.06033C10.7926%204.39243%2010.9792%204.84285%2010.9792%205.3125C10.9792%205.78215%2010.7926%206.23257%2010.4605%206.56467C10.1284%206.89676%209.67799%207.08333%209.20833%207.08333C8.73868%207.08333%208.28826%206.89676%207.95616%206.56467C7.62407%206.23257%207.4375%205.78215%207.4375%205.3125ZM9.20833%200C7.79937%200%206.44812%200.559708%205.45183%201.556C4.45554%202.55228%203.89583%203.90354%203.89583%205.3125C3.89583%206.72146%204.45554%208.07272%205.45183%209.069C6.44812%2010.0653%207.79937%2010.625%209.20833%2010.625C10.6173%2010.625%2011.9686%2010.0653%2012.9648%209.069C13.9611%208.07272%2014.5208%206.72146%2014.5208%205.3125C14.5208%203.90354%2013.9611%202.55228%2012.9648%201.556C11.9686%200.559708%2010.6173%200%209.20833%200ZM17.85%2014.45L17.0014%2015.5819L17.7409%2014.5959L17.85%2014.45ZM0.566667%2014.45C0.566667%2014.45%200.566667%2014.4528%200.672917%2014.5917L1.36425%2015.5125L0.566667%2014.45ZM0.566667%2014.45L0.568083%2014.4486L0.570917%2014.4472L0.576583%2014.4429L0.59075%2014.433L0.630417%2014.4047C0.663472%2014.3801%200.707389%2014.3499%200.762167%2014.314C0.872667%2014.2384%201.02708%2014.1426%201.22542%2014.0264C1.62208%2013.7955%202.193%2013.4994%202.92683%2013.2048C4.39733%2012.6182%206.52375%2012.0417%209.20833%2012.0417C11.8929%2012.0417%2014.0193%2012.6168%2015.4898%2013.2062C16.2237%2013.4994%2016.7946%2013.7955%2017.1898%2014.0264C17.3933%2014.1438%2017.5918%2014.2695%2017.7848%2014.4032L17.8273%2014.4316L17.8415%2014.4429L17.8457%2014.4472L17.85%2014.45L18.4167%2014.875V20.5417H15.5833V34H2.83333V26.2083H0V14.875L0.566667%2014.45ZM18.4167%2023.375H21.6042V22.6667C21.6042%2021.4456%2022.0892%2020.2745%2022.9527%2019.411C23.8161%2018.5476%2024.9872%2018.0625%2026.2083%2018.0625C27.4294%2018.0625%2028.6005%2018.5476%2029.464%2019.411C30.3274%2020.2745%2030.8125%2021.4456%2030.8125%2022.6667V23.375H34V34H18.4167V23.375ZM27.2708%2023.375V22.6667C27.2708%2022.3849%2027.1589%2022.1146%2026.9596%2021.9154C26.7604%2021.7161%2026.4901%2021.6042%2026.2083%2021.6042C25.9265%2021.6042%2025.6563%2021.7161%2025.457%2021.9154C25.2578%2022.1146%2025.1458%2022.3849%2025.1458%2022.6667V23.375H27.2708ZM21.9583%2026.9167V30.4583H30.4583V26.9167H21.9583Z'%20fill='%23A5EB14'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_1443_2569'%3e%3crect%20width='34'%20height='34'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
const AboutUsSvg = "data:image/svg+xml,%3csvg%20width='30'%20height='30'%20viewBox='0%200%2030%2030'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M15%200C23.2843%200%2030%206.71569%2030%2015C30%2023.2842%2023.2843%2030%2015%2030C6.71576%2030%200%2023.2843%200%2015C0%206.71569%206.71576%200%2015%200ZM16.5033%2013.5H13.5033V22.5H16.5033V13.5ZM15.0152%207.12498C13.9216%207.12498%2013.1283%207.91388%2013.1283%208.97919C13.1283%2010.0876%2013.9007%2010.875%2015.0152%2010.875C16.0864%2010.875%2016.8783%2010.0875%2016.8783%209C16.8783%207.91395%2016.0864%207.12498%2015.0152%207.12498Z'%20fill='%23A5EB14'/%3e%3c/svg%3e";
const ContactSvg = "data:image/svg+xml,%3csvg%20width='30'%20height='30'%20viewBox='0%200%2030%2030'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M28.5%200H6C5.20435%200%204.44129%200.31607%203.87868%200.87868C3.31607%201.44129%203%202.20435%203%203V7.5H0V10.5H3V13.5H0V16.5H3V19.5H0V22.5H3V27C3%2027.7956%203.31607%2028.5587%203.87868%2029.1213C4.44129%2029.6839%205.20435%2030%206%2030H28.5C28.8978%2030%2029.2794%2029.842%2029.5607%2029.5607C29.842%2029.2794%2030%2028.8978%2030%2028.5V1.5C30%201.10218%2029.842%200.720644%2029.5607%200.43934C29.2794%200.158035%2028.8978%200%2028.5%200ZM16.5%204.4985C18.972%204.4985%2021%206.525%2021%208.9985C20.9964%2010.191%2020.5212%2011.3337%2019.6781%2012.1771C18.835%2013.0205%2017.6925%2013.496%2016.5%2013.5C14.0295%2013.5%2012%2011.4705%2012%208.9985C12%206.525%2014.0295%204.4985%2016.5%204.4985ZM25.5%2024H7.5V22.875C7.5%2019.5465%2011.5575%2016.125%2016.5%2016.125C21.4425%2016.125%2025.5%2019.5465%2025.5%2022.875V24Z'%20fill='%23A5EB14'/%3e%3c/svg%3e";
const MissionSvg = "data:image/svg+xml,%3csvg%20width='36'%20height='36'%20viewBox='0%200%2036%2036'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20opacity='0.3'%20d='M18%203C18.3674%203.00005%2018.7221%203.13493%2018.9966%203.37907C19.2712%203.62321%2019.4466%203.95962%2019.4895%204.3245L19.5%204.5V4.5825C22.4736%204.91587%2025.2523%206.22715%2027.4%208.31053C29.5477%2010.3939%2030.9429%2013.1315%2031.3665%2016.0935L31.4175%2016.5H31.5C31.8824%2016.5004%2032.2501%2016.6468%2032.5281%2016.9093C32.8061%2017.1717%2032.9734%2017.5304%2032.9958%2017.9121C33.0182%2018.2938%2032.894%2018.6696%2032.6487%2018.9627C32.4033%2019.2559%2032.0552%2019.4443%2031.6755%2019.4895L31.5%2019.5H31.4175C31.0842%2022.4736%2029.7729%2025.2523%2027.6895%2027.4C25.6061%2029.5477%2022.8686%2030.9429%2019.9065%2031.3665L19.5%2031.4175V31.5C19.4996%2031.8823%2019.3532%2032.25%2019.0908%2032.5281C18.8283%2032.8061%2018.4696%2032.9734%2018.088%2032.9958C17.7063%2033.0182%2017.3305%2032.894%2017.0373%2032.6486C16.7441%2032.4032%2016.5557%2032.0551%2016.5105%2031.6755L16.5%2031.5V31.4175C13.5265%2031.0841%2010.7478%2029.7728%208.60007%2027.6895C6.45235%2025.6061%205.05718%2022.8685%204.63355%2019.9065L4.58255%2019.5H4.50005C4.11773%2019.4996%203.75%2019.3532%203.47199%2019.0907C3.19399%2018.8283%203.02669%2018.4696%203.00429%2018.0879C2.98188%2017.7062%203.10606%2017.3304%203.35144%2017.0373C3.59683%2016.7441%203.9449%2016.5557%204.32455%2016.5105L4.50005%2016.5H4.58255C4.91592%2013.5264%206.2272%2010.7477%208.31058%208.60002C10.394%206.4523%2013.1315%205.05714%2016.0935%204.6335L16.5%204.5825V4.5C16.5%204.10218%2016.6581%203.72064%2016.9394%203.43934C17.2207%203.15804%2017.6022%203%2018%203Z'%20fill='%23A5EB14'/%3e%3cpath%20d='M18.0001%2010.5C12.2266%2010.5%208.61761%2016.7505%2011.5051%2021.75C12.1634%2022.8901%2013.1101%2023.8369%2014.2502%2024.4951C15.3903%2025.1534%2016.6836%2025.5%2018.0001%2025.5C23.7736%2025.5%2027.3826%2019.2495%2024.4951%2014.25C23.8369%2013.1099%2022.8901%2012.1631%2021.75%2011.5049C20.6099%2010.8466%2019.3166%2010.5%2018.0001%2010.5Z'%20fill='%23A5EB14'/%3e%3c/svg%3e";
const FaqSvg = "data:image/svg+xml,%3csvg%20width='36'%20height='36'%20viewBox='0%200%2036%2036'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_443_721)'%3e%3cpath%20d='M18%200C15.6462%200%2013.8462%201.8%2013.8462%204.15385V12.4615C13.8462%2014.8154%2015.6462%2016.6154%2018%2016.6154H26.3077L31.8462%2022.1538V16.6154C34.2%2016.6154%2036%2014.8154%2036%2012.4615V4.15385C36%201.8%2034.2%200%2031.8462%200H18ZM23.7988%204.15385H26.1775L28.5148%2012.4615H26.4378L25.8743%2010.3846H23.7974L23.2795%2012.4615H21.4615L23.7988%204.15385ZM24.9231%205.53846C24.7846%206.09231%2024.6295%206.768%2024.4897%207.18338L24.102%209H25.7455L25.3551%207.182C25.0795%206.768%2024.9231%206.09231%2024.9231%205.53846ZM4.15385%2013.8462C1.8%2013.8462%200%2015.6462%200%2018V26.3077C0%2028.6615%201.8%2030.4615%204.15385%2030.4615V36L9.69231%2030.4615H18C20.3538%2030.4615%2022.1538%2028.6615%2022.1538%2026.3077V18H18C15.3692%2018%2013.284%2016.2%2012.5917%2013.8462H4.15385ZM10.5148%2017.8698C12.8686%2017.8698%2013.9763%2019.8083%2013.9763%2022.0237C13.9763%2023.9622%2013.3103%2025.1917%2012.2026%2025.7455C12.7565%2026.0225%2013.4128%2026.1692%2014.1051%2026.3077L13.5872%2027.6923C12.618%2027.4154%2011.6128%2026.9834%2010.6435%2026.5666C10.5051%2026.4282%2010.2628%2026.4378%2010.1243%2026.4378C8.46277%2026.2994%206.92308%2024.9231%206.92308%2022.1538C6.92308%2019.8%208.29939%2017.8698%2010.5148%2017.8698ZM10.5148%2019.3846C9.40708%2019.3846%208.86985%2020.6308%208.86985%2022.1538C8.86985%2023.8154%209.40708%2024.9231%2010.5148%2024.9231C11.6225%2024.9231%2012.2012%2023.6769%2012.2012%2022.1538C12.2012%2020.6308%2011.6225%2019.3846%2010.5148%2019.3846Z'%20fill='%23A5EB14'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_443_721'%3e%3crect%20width='36'%20height='36'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
const JobIcon = "data:image/svg+xml,%3csvg%20width='30'%20height='29'%20viewBox='0%200%2030%2029'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M3%2028.5C2.175%2028.5%201.469%2028.2065%200.882%2027.6195C0.295%2027.0325%200.001%2026.326%200%2025.5V9C0%208.175%200.294%207.469%200.882%206.882C1.47%206.295%202.176%206.001%203%206H9V3C9%202.175%209.294%201.469%209.882%200.882C10.47%200.295%2011.176%200.001%2012%200H18C18.825%200%2019.5315%200.294%2020.1195%200.882C20.7075%201.47%2021.001%202.176%2021%203V6H27C27.825%206%2028.5315%206.294%2029.1195%206.882C29.7075%207.47%2030.001%208.176%2030%209V25.5C30%2026.325%2029.7065%2027.0315%2029.1195%2027.6195C28.5325%2028.2075%2027.826%2028.501%2027%2028.5H3ZM12%206H18V3H12V6Z'%20fill='%23A5EB14'/%3e%3c/svg%3e";
const SupportSvg = "data:image/svg+xml,%3csvg%20width='36'%20height='36'%20viewBox='0%200%2036%2036'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M17.9999%2026.1C17.0949%2026.1002%2016.2229%2025.7595%2015.5578%2025.1458C14.8927%2024.532%2014.4831%2023.6902%2014.4107%2022.788C12.0098%2021.9382%209.98639%2020.2675%208.69754%2018.0709C7.4087%2015.8743%206.93732%2013.2929%207.36663%2010.7825C7.79593%208.27214%209.09832%205.99413%2011.0439%204.35062C12.9894%202.7071%2015.4531%201.80376%2017.9999%201.80005C20.7087%201.79966%2023.3188%202.81721%2025.3125%204.65093C27.3063%206.48466%2028.5382%209.00066%2028.7639%2011.7C28.7714%2011.8171%2028.7545%2011.9345%2028.7142%2012.0447C28.674%2012.1549%2028.6112%2012.2555%2028.5299%2012.3402C28.4487%2012.4248%2028.3507%2012.4916%2028.2422%2012.5364C28.1338%2012.5811%2028.0172%2012.6028%2027.8999%2012.6C27.6588%2012.594%2027.4286%2012.4985%2027.2539%2012.3322C27.0793%2012.1659%2026.9727%2011.9406%2026.9549%2011.7C26.7946%2010.1086%2026.213%208.58853%2025.2701%207.29648C24.3271%206.00442%2023.0569%204.98702%2021.5901%204.34901C20.1233%203.71099%2018.5129%203.47542%2016.9248%203.66655C15.3367%203.85768%2013.8283%204.46859%2012.5547%205.43641C11.2812%206.40422%2010.2886%207.69396%209.67913%209.17285C9.06967%2010.6517%208.86535%2012.2663%209.08722%2013.8504C9.30908%2015.4345%209.94912%2016.9309%2010.9414%2018.1854C11.9337%2019.4399%2013.2425%2020.4074%2014.7329%2020.988C15.0041%2020.4021%2015.4279%2019.8998%2015.9599%2019.5339C16.4919%2019.168%2017.1126%2018.9519%2017.7568%2018.9083C18.401%2018.8647%2019.0451%2018.9951%2019.6216%2019.286C20.1981%2019.5768%2020.6857%2020.0173%2021.0334%2020.5614C21.3811%2021.1055%2021.5761%2021.7331%2021.5979%2022.3784C21.6197%2023.0238%2021.4676%2023.6631%2021.1574%2024.2294C20.8472%2024.7957%2020.3905%2025.2682%2019.8349%2025.5973C19.2794%2025.9264%2018.6456%2026.1001%2017.9999%2026.1ZM9.0161%2021.6H9.1799C10.2425%2022.6425%2011.4815%2023.4883%2012.8393%2024.0984C13.2383%2025.415%2014.1249%2026.5297%2015.3178%2027.2148C16.5108%2027.9%2017.9204%2028.104%2019.2586%2027.7851C20.5969%2027.4663%2021.7631%2026.6487%2022.519%2025.4992C23.2749%2024.3498%2023.5636%2022.9551%2023.3261%2021.6H26.9999C27.9547%2021.6%2028.8704%2021.9793%2029.5455%2022.6545C30.2206%2023.3296%2030.5999%2024.2453%2030.5999%2025.2001C30.5999%2028.2439%2029.1005%2030.5389%2026.7569%2032.0347C24.4493%2033.5053%2021.3389%2034.2001%2017.9999%2034.2001C14.6609%2034.2001%2011.5505%2033.5053%209.2429%2032.0347C6.8993%2030.5407%205.3999%2028.2421%205.3999%2025.2001C5.3999%2023.1966%207.0253%2021.6%209.0161%2021.6ZM25.1999%2012.6C25.2003%2013.818%2024.8917%2015.0161%2024.303%2016.0824C23.7143%2017.1486%2022.8648%2018.0481%2021.8339%2018.6966C21.3318%2018.1906%2020.7346%2017.789%2020.0765%2017.515C19.4185%2017.241%2018.7127%2017.1%2017.9999%2017.1C17.2871%2017.1%2016.5813%2017.241%2015.9233%2017.515C15.2652%2017.789%2014.668%2018.1906%2014.1659%2018.6966C12.7987%2017.8368%2011.7602%2016.5423%2011.2175%2015.021C10.9406%2014.2439%2010.7994%2013.425%2010.7999%2012.6C10.7999%2010.6905%2011.5585%208.85914%2012.9087%207.50888C14.259%206.15862%2016.0903%205.40005%2017.9999%205.40005C19.9095%205.40005%2021.7408%206.15862%2023.0911%207.50888C24.4413%208.85914%2025.1999%2010.6905%2025.1999%2012.6Z'%20fill='%23A5EB14'/%3e%3c/svg%3e";
const BlogSvg = "data:image/svg+xml,%3csvg%20width='36'%20height='36'%20viewBox='0%200%2036%2036'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M27%206V10.5H31.5C31.8978%2010.5%2032.2794%2010.658%2032.5607%2010.9393C32.842%2011.2206%2033%2011.6022%2033%2012V27C33%2028.1935%2032.5259%2029.3381%2031.682%2030.182C30.8381%2031.0259%2029.6935%2031.5%2028.5%2031.5H7.5C6.30653%2031.5%205.16193%2031.0259%204.31802%2030.182C3.47411%2029.3381%203%2028.1935%203%2027V6C3%205.60218%203.15804%205.22064%203.43934%204.93934C3.72064%204.65804%204.10218%204.5%204.5%204.5H25.5C25.8978%204.5%2026.2794%204.65804%2026.5607%204.93934C26.842%205.22064%2027%205.60218%2027%206ZM30%2027C30%2027.3978%2029.842%2027.7794%2029.5607%2028.0607C29.2794%2028.342%2028.8978%2028.5%2028.5%2028.5C28.1022%2028.5%2027.7206%2028.342%2027.4393%2028.0607C27.158%2027.7794%2027%2027.3978%2027%2027V13.5H30V27ZM9%2012C9%2011.6022%209.15804%2011.2206%209.43934%2010.9393C9.72064%2010.658%2010.1022%2010.5%2010.5%2010.5H19.5C19.8978%2010.5%2020.2794%2010.658%2020.5607%2010.9393C20.842%2011.2206%2021%2011.6022%2021%2012C21%2012.3978%2020.842%2012.7794%2020.5607%2013.0607C20.2794%2013.342%2019.8978%2013.5%2019.5%2013.5H10.5C10.1022%2013.5%209.72064%2013.342%209.43934%2013.0607C9.15804%2012.7794%209%2012.3978%209%2012ZM12%2018C12%2017.6022%2012.158%2017.2206%2012.4393%2016.9393C12.7206%2016.658%2013.1022%2016.5%2013.5%2016.5H19.5C19.8978%2016.5%2020.2794%2016.658%2020.5607%2016.9393C20.842%2017.2206%2021%2017.6022%2021%2018C21%2018.3978%2020.842%2018.7794%2020.5607%2019.0607C20.2794%2019.342%2019.8978%2019.5%2019.5%2019.5H13.5C13.1022%2019.5%2012.7206%2019.342%2012.4393%2019.0607C12.158%2018.7794%2012%2018.3978%2012%2018Z'%20fill='%23A5EB14'/%3e%3c/svg%3e";
const navbarMenus = [
  {
    title: "Products",
    type: "dropdown",
    cols: 3,
    w: "700px",
    lg: "800px",
    xl: "800px",
    items: [
      {
        icon: BridgPaySvg,
        heading: "BridgPay",
        text: "Instant Payouts",
        link: "/bridg-pay"
      },
      {
        icon: BridgCollectSvg,
        heading: "BridgCollect",
        text: "Multi-Channel Collections",
        link: "/bridg-collect"
      },
      {
        icon: BridgConnectSvg,
        heading: "BridgConnect",
        text: "Connected Banking",
        link: "/bridg-connect"
      },
      {
        icon: BridgOnboardSvg,
        heading: "BridgOnboard",
        text: "Merchant Onboarding",
        link: ""
      },
      {
        icon: BridgRouteSvg,
        heading: "BridgRoute",
        text: "Multi-Bank Smart Routing",
        link: ""
      },
      {
        icon: BridgReconSvg,
        heading: "BridgRecon",
        text: "Automated Reconciliation",
        link: ""
      },
      {
        icon: BridgVaultSvg,
        heading: "BridgVault",
        text: "Escrow & Pooled Accounts",
        link: ""
      }
    ]
  },
  {
    title: "Use Cases",
    type: "dropdown",
    cols: 4,
    w: "1100px",
    lg: "1100px",
    xl: "1200px",
    items: [
      {
        icon: SmallBusinessSvg,
        heading: "Small Businesses",
        text: "Simplify payouts, salaries, and collections with real-time visibility.",
        link: "/small-business"
      },
      {
        icon: StartUpSvg,
        heading: "Startups",
        text: "Scale faster with instant payouts and connected banking APIs.",
        link: "/startup"
      },
      {
        icon: SMESvg,
        heading: "SMEs",
        text: "Automate payments, streamline receivables, and cut manual errors.",
        link: "/sme"
      },
      {
        icon: EnterpriseSvg,
        heading: "Enterprise",
        text: "Handle high-volume flows with compliance-ready infrastructure.",
        link: "/enterprise"
      },
      {
        icon: ECommerceSvg,
        heading: "Retail & E-commerce",
        text: "Manage refunds, settlements, and COD in one dashboard.",
        link: "/retail-and-e-commerce"
      },
      {
        icon: SoftwareSvg,
        heading: "Software & Tech",
        text: "Embed payments, automate subscriptions, and partner payouts.",
        link: "/software-and-tech"
      },
      {
        icon: ManufacturesSvg,
        heading: "Manufacturers",
        text: "Simplify supplier payments and track receivables in real time.",
        link: "/manufacturers"
      },
      {
        icon: RealEstateSvg,
        heading: "Real Estate",
        text: "Collect instalments and release contractor payments seamlessly.",
        link: "/real-estate"
      },
      {
        icon: HealthCareSvg,
        heading: "Healthcare",
        text: "Streamline billing, collections, and staff/vendor payouts.",
        link: "/healthcare"
      },
      {
        icon: HospitalSvg,
        heading: "Hospitality",
        text: "Enable guest payments, instant refunds, and branch-wide tracking.",
        link: "/hospitality"
      },
      {
        icon: ProfessionalServiceSvg,
        heading: "Professional Services",
        text: "Automate retainers, payouts, and reconciliation.",
        link: "/professional-services"
      },
      {
        icon: FreelancersSvg,
        heading: "Consultants & Freelancers",
        text: "Get paid instantly and track earnings in real time.",
        link: "/consultant-and-freelancers"
      }
    ]
  },
  { title: "Integrations", type: "link", path: "" },
  {
    title: "Company",
    type: "dropdown",
    w: "600px",
    lg: "650px",
    xl: "700px",
    cols: 2,
    items: [
      {
        icon: AboutUsSvg,
        heading: "About Us",
        text: "Empowering businesses with secure, fast, and scalable fintech infrastructure solutions.",
        link: "/about"
      },
      {
        icon: MissionSvg,
        heading: "Mission",
        text: "Making digital finance simple, fast, and compliant for businesses of every size.",
        link: "/mission"
      },
      {
        icon: JobIcon,
        heading: "Careers ",
        text: "Build the future of fintech with us. Innovate, grow, and make an impact.",
        link: "/careers"
      },
      {
        icon: ContactSvg,
        heading: "Contact Us",
        text: "Reach out to our team for inquiries, partnerships, or support — we're here to help you.",
        link: "/contact"
      }
    ]
  },
  {
    title: "Resources",
    type: "dropdown",
    cols: 1,
    w: "350px",
    lg: "350px",
    xl: "350px",
    items: [
      {
        icon: FaqSvg,
        heading: "FAQ",
        text: "Find quick answers to your questions about onboarding, payouts, and compliance.",
        link: "/faq"
      },
      {
        icon: SupportSvg,
        heading: "Support",
        text: "Need help? Our support team is available 24/7 to assist you at every step.",
        link: ""
      },
      {
        icon: BlogSvg,
        heading: "Blog",
        text: "Explore expert insights, product updates, and fintech trends shaping the industry.",
        link: "/blog"
      }
    ]
  }
];
const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isSticky, setIsSticky] = useState(false);
  const scrollNavigate = useScroll();
  const [desktopOpenIndex, setDesktopOpenIndex] = useState(null);
  const timeoutRef = useRef(null);
  const triggerRefs = useRef({});
  const dropdownRefs = useRef({});
  const [dropdownPos, setDropdownPos] = useState({
    left: 0,
    top: 0,
    width: 0,
    arrowLeft: 12
  });
  const toggleMenu = () => setIsOpen(!isOpen);
  const handleDropdownToggle = (title) => {
    setOpenDropdown(openDropdown === title ? null : title);
  };
  const homeRoute = location.pathname === "/";
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    const adjust = (index) => {
      const triggerEl = triggerRefs.current[index];
      if (!triggerEl) return;
      const navDef = navbarMenus[index] || {};
      const declaredWidth = typeof navDef.w === "string" && navDef.w.endsWith("px") ? parseInt(navDef.w, 10) : navDef.w ? parseInt(navDef.w, 10) : null;
      const triggerRect = triggerEl.getBoundingClientRect();
      const dropdownWidth = declaredWidth || dropdownRefs.current[index] && dropdownRefs.current[index].offsetWidth || 300;
      let leftCandidate = triggerRect.left + triggerRect.width / 2 - dropdownWidth / 2;
      const minGap = 8;
      const maxLeft = window.innerWidth - dropdownWidth - minGap;
      let left = Math.max(minGap, Math.min(leftCandidate, maxLeft));
      const top = Math.max(triggerRect.bottom + 8, 8);
      const arrowLeft = Math.max(
        12,
        Math.min(
          triggerRect.left + triggerRect.width / 2 - left - 8,
          dropdownWidth - 24
        )
      );
      setDropdownPos({ left, top, width: dropdownWidth, arrowLeft });
    };
    if (desktopOpenIndex !== null) {
      adjust(desktopOpenIndex);
      const onResize = () => adjust(desktopOpenIndex);
      const onScroll = () => adjust(desktopOpenIndex);
      window.addEventListener("resize", onResize);
      window.addEventListener("scroll", onScroll);
      const onDocClick = (e) => {
        const trig = triggerRefs.current[desktopOpenIndex];
        const drop = dropdownRefs.current[desktopOpenIndex];
        if (!trig || !drop) return;
        if (!(trig.contains(e.target) || drop.contains(e.target))) {
          setDesktopOpenIndex(null);
        }
      };
      document.addEventListener("mousedown", onDocClick);
      return () => {
        window.removeEventListener("resize", onResize);
        window.removeEventListener("scroll", onScroll);
        document.removeEventListener("mousedown", onDocClick);
      };
    }
  }, [desktopOpenIndex]);
  const handleNavigate = (path) => {
    if (!path) return;
    scrollNavigate(path);
    setDesktopOpenIndex(null);
    setOpenDropdown(null);
    setIsOpen(false);
  };
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: `flex justify-center w-screen fixed ${!isOpen ? "top-5" : "top-0"} z-50`,
      children: /* @__PURE__ */ jsxs(
        "nav",
        {
          className: `transition-all w-6xl max-w-6xl duration-300 bg-white/80 backdrop-blur-md rounded-3xl
              py-1.5 ps-4 border border-[#4372FD1C] z-50`,
          children: [
            /* @__PURE__ */ jsx("div", { className: "px-4", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
              /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsx(Link, { to: "/", children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: homeRoute ? isSticky ? Logo : Logo : Logo,
                  alt: "logo",
                  className: "h-[50px]"
                }
              ) }) }),
              /* @__PURE__ */ jsx("div", { className: "flex lg:hidden", children: /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: toggleMenu,
                  type: "button",
                  className: "text-sm text-gray-400 hover:text-gray-600 focus:outline-none",
                  children: /* @__PURE__ */ jsx(
                    "svg",
                    {
                      className: "w-6 h-6",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24",
                      children: isOpen ? /* @__PURE__ */ jsx(
                        "path",
                        {
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          strokeWidth: 2,
                          d: "M6 18L18 6M6 6l12 12"
                        }
                      ) : /* @__PURE__ */ jsx(
                        "path",
                        {
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          strokeWidth: 2,
                          d: "M4 6h16M4 12h16M4 18h16"
                        }
                      )
                    }
                  )
                }
              ) }),
              /* @__PURE__ */ jsx("div", { className: "hidden lg:flex items-center", children: /* @__PURE__ */ jsx("ul", { className: "flex items-center gap-7", children: navbarMenus.map(
                (nav, index) => nav.type === "dropdown" ? /* @__PURE__ */ jsxs(
                  "li",
                  {
                    className: "relative",
                    onMouseEnter: () => {
                      clearTimeout(timeoutRef.current);
                      setDesktopOpenIndex(index);
                    },
                    onMouseLeave: () => {
                      timeoutRef.current = setTimeout(
                        () => setDesktopOpenIndex(null),
                        200
                      );
                    },
                    children: [
                      /* @__PURE__ */ jsxs(
                        "button",
                        {
                          ref: (el) => triggerRefs.current[index] = el,
                          onClick: () => setDesktopOpenIndex(
                            (cur) => cur === index ? null : index
                          ),
                          className: `flex items-center gap-2 text-gray-700 rounded-none !bg-transparent font-medium text-md cursor-pointer`,
                          children: [
                            nav.title,
                            /* @__PURE__ */ jsx(
                              "svg",
                              {
                                className: `w-3 h-3 transition-transform duration-300 ${desktopOpenIndex === index ? "rotate-180" : ""}`,
                                fill: "none",
                                stroke: "currentColor",
                                strokeWidth: "2",
                                viewBox: "0 0 24 24",
                                children: /* @__PURE__ */ jsx(
                                  "path",
                                  {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    d: "M19 9l-7 7-7-7"
                                  }
                                )
                              }
                            )
                          ]
                        }
                      ),
                      desktopOpenIndex === index && /* @__PURE__ */ jsx(
                        "div",
                        {
                          ref: (el) => dropdownRefs.current[index] = el,
                          className: "z-100",
                          style: {
                            position: "fixed",
                            left: `${dropdownPos.left}px`,
                            top: `${dropdownPos.top}px`,
                            width: nav.w || nav.xl || "auto",
                            maxWidth: nav.xl || "90vw"
                          },
                          children: /* @__PURE__ */ jsxs("div", { className: "relative bg-white shadow-lg rounded-lg p-6", children: [
                            /* @__PURE__ */ jsx(
                              "div",
                              {
                                style: {
                                  position: "absolute",
                                  top: -8,
                                  left: `${dropdownPos.arrowLeft}px`,
                                  width: 16,
                                  height: 16,
                                  transform: "rotate(45deg)",
                                  background: "#ffffff",
                                  boxShadow: "-1px -1px 1px rgba(0,0,0,0.06)",
                                  zIndex: 1
                                }
                              }
                            ),
                            /* @__PURE__ */ jsx(
                              "ul",
                              {
                                className: "text-gray-700 grid gap-4",
                                style: {
                                  gridTemplateColumns: `repeat(${nav.cols || 1}, minmax(0, 1fr))`,
                                  width: "100%"
                                },
                                children: nav.items.map((item, i) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
                                  Link,
                                  {
                                    to: item.link || "#",
                                    onClick: () => {
                                      if (item.link) handleNavigate(item.link);
                                      else setDesktopOpenIndex(null);
                                    },
                                    className: "p-3 flex items-start gap-4 hover:bg-gray-50 rounded-md",
                                    children: [
                                      item?.icon && /* @__PURE__ */ jsx("div", { className: "p-2.5 bg-[#0A0C33] rounded-full flex-shrink-0", children: /* @__PURE__ */ jsx(
                                        "img",
                                        {
                                          src: item.icon,
                                          alt: item.heading,
                                          className: "w-5 h-5"
                                        }
                                      ) }),
                                      /* @__PURE__ */ jsxs("div", { children: [
                                        /* @__PURE__ */ jsxs("div", { className: "font-medium flex gap-2 group items-center transition duration-400", children: [
                                          item.heading,
                                          " "
                                        ] }),
                                        /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-500", children: item.text })
                                      ] })
                                    ]
                                  }
                                ) }, i))
                              }
                            )
                          ] })
                        }
                      )
                    ]
                  },
                  index
                ) : /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
                  Link,
                  {
                    to: nav.path,
                    className: `text-md font-medium text-gray-700 `,
                    children: nav.title
                  }
                ) }, index)
              ) }) }),
              /* @__PURE__ */ jsx("div", { className: "hidden lg:block", children: /* @__PURE__ */ jsx(
                Button,
                {
                  text: "Get Started",
                  bgClr: "#A5EB14",
                  url: "/contact",
                  py: "py-2",
                  px: "px-5.5"
                }
              ) })
            ] }) }),
            /* @__PURE__ */ jsxs(
              "div",
              {
                className: `fixed top-0 left-0 z-40 flex lg:hidden h-screen transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`,
                children: [
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      onClick: toggleMenu,
                      className: "absolute inset-0 bg-black opacity-50"
                    }
                  ),
                  /* @__PURE__ */ jsxs(
                    "div",
                    {
                      className: `relative flex flex-col w-85 bg-white shadow-xl transition-transform duration-300 ease-in-out transform ${isOpen ? "translate-x-0" : "-translate-x-full"}`,
                      children: [
                        /* @__PURE__ */ jsx(
                          "button",
                          {
                            onClick: toggleMenu,
                            className: "self-end p-4 focus:outline-none",
                            children: "✕"
                          }
                        ),
                        /* @__PURE__ */ jsxs("nav", { className: "flex flex-col gap-4 px-6 py-4 overflow-y-auto h-full max-w-[100vw]", children: [
                          navbarMenus.map(
                            (nav, index) => nav.type === "dropdown" ? /* @__PURE__ */ jsxs("div", { children: [
                              /* @__PURE__ */ jsxs(
                                "button",
                                {
                                  onClick: () => handleDropdownToggle(nav.title),
                                  className: "flex justify-between w-full text-gray-700 text-md font-medium",
                                  children: [
                                    nav.title,
                                    /* @__PURE__ */ jsx(
                                      "svg",
                                      {
                                        className: `w-4 h-4 transform transition-transform ${openDropdown === nav.title ? "rotate-180" : "rotate-0"}`,
                                        fill: "none",
                                        stroke: "currentColor",
                                        viewBox: "0 0 24 24",
                                        children: /* @__PURE__ */ jsx(
                                          "path",
                                          {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 2,
                                            d: "M19 9l-7 7-7-7"
                                          }
                                        )
                                      }
                                    )
                                  ]
                                }
                              ),
                              /* @__PURE__ */ jsx(
                                "div",
                                {
                                  className: `transition-all duration-300 ease-in-out overflow-hidden ${openDropdown === nav.title ? "mt-2" : "max-h-0 overflow-hidden"}`,
                                  children: /* @__PURE__ */ jsx("div", { className: "pl-2 flex flex-col gap-2 my-5 gap-y-5", children: nav.items.map((item, i) => /* @__PURE__ */ jsxs(
                                    Link,
                                    {
                                      to: item.link || "#",
                                      onClick: () => {
                                        if (item.link) handleNavigate(item.link);
                                        else setDesktopOpenIndex(null);
                                      },
                                      className: "flex gap-3 items-start hover:text-[#A5EB14]",
                                      children: [
                                        item.icon && /* @__PURE__ */ jsx("div", { className: "p-2 bg-[#0A0C33] flex-shrink-0 rounded-full", children: /* @__PURE__ */ jsx(
                                          "img",
                                          {
                                            src: item.icon,
                                            alt: item.heading,
                                            className: "w-4 h-4 object-contain"
                                          }
                                        ) }),
                                        /* @__PURE__ */ jsxs("div", { children: [
                                          /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-gray-700", children: item.heading }),
                                          /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500", children: item.text })
                                        ] })
                                      ]
                                    },
                                    i
                                  )) })
                                }
                              )
                            ] }, index) : /* @__PURE__ */ jsx(
                              Link,
                              {
                                to: nav.path,
                                className: "text-gray-700 font-medium text-md hover:text-[#A5EB14]",
                                children: nav.title
                              },
                              index
                            )
                          ),
                          /* @__PURE__ */ jsxs(
                            "button",
                            {
                              className: "bg-[#A5EB14] cursor-pointer group text-[12px] flex rounded-3xl py-2 px-5 gap-3 justify-center items-center",
                              onClick: () => scrollNavigate("/contact"),
                              children: [
                                "Get Started",
                                /* @__PURE__ */ jsx("span", { className: "translate-x-[-5px] group-hover:opacity-100 group-hover:translate-x-0 transition duration-300", children: /* @__PURE__ */ jsx("img", { src: ArrowSvg, alt: "arrow" }) })
                              ]
                            }
                          )
                        ] })
                      ]
                    }
                  )
                ]
              }
            )
          ]
        }
      )
    }
  );
};
const BackToTop = memo(() => {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    if (!mounted) return;
    const onScroll = () => {
      setIsVisible(window.scrollY > 500);
    };
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [mounted]);
  if (!mounted) return null;
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "fixed bottom-6 right-6", children: isVisible && /* @__PURE__ */ jsx(
    "button",
    {
      onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }),
      className: "cursor-pointer",
      children: /* @__PURE__ */ jsx("div", { className: "bg-[#A5EB14] h-12 w-12 text-xl rounded-full p-2 flex justify-center items-center", children: "↑" })
    }
  ) }) });
});
const HomeLayout = () => {
  return /* @__PURE__ */ jsxs("main", { children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx(ScrollHandler, {}),
    /* @__PURE__ */ jsx("section", { children: /* @__PURE__ */ jsx(Outlet, {}) }),
    /* @__PURE__ */ jsx(Footer, {}),
    /* @__PURE__ */ jsx(BackToTop, {})
  ] });
};
const ModularAndScalableApiSvg = "data:image/svg+xml,%3csvg%20width='26'%20height='26'%20viewBox='0%200%2026%2026'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M12.9999%2015.8333L10.1665%2013L12.9999%2010.1667L15.8332%2013L12.9999%2015.8333ZM9.98946%208.00058L7.59246%205.605L12.9999%200.196167L18.4073%205.60358L16.0103%208.00058L12.9999%204.99017L9.98946%208.00058ZM5.60346%2018.4074L0.196045%2013L5.60346%207.59258L7.99905%209.98958L4.99005%2013L8.00046%2016.0104L5.60346%2018.4074ZM20.3963%2018.4074L17.9993%2016.0104L21.0097%2013L17.9993%209.98958L20.3963%207.59258L25.8037%2013L20.3963%2018.4074ZM12.9999%2025.8038L7.59246%2020.3964L9.98946%2017.9994L12.9999%2021.0098L16.0103%2017.9994L18.4073%2020.3964L12.9999%2025.8038Z'%20fill='%23292929'/%3e%3c/svg%3e";
const SecuritySvg = "data:image/svg+xml,%3csvg%20width='23'%20height='25'%20viewBox='0%200%2023%2025'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M22.6167%204.79899L11.7556%200.0560576C11.6756%200.0191408%2011.5883%200%2011.5%200C11.4117%200%2011.3244%200.0191408%2011.2444%200.0560576L0.383334%204.79899C0.271028%204.8471%200.175179%204.92591%200.107213%205.02602C0.0392475%205.12613%200.0020309%205.24332%200%205.36362V8.72633C0%2014.8997%203.75667%2022.3779%2011.27%2024.9627C11.4192%2025.0124%2011.5808%2025.0124%2011.73%2024.9627C19.2433%2022.3779%2023%2014.8997%2023%208.72633V5.36362C22.998%205.24332%2022.9608%205.12613%2022.8928%205.02602C22.8248%204.92591%2022.729%204.8471%2022.6167%204.79899ZM17.4902%208.95219L10.7436%2017.3866C10.6455%2017.5082%2010.5224%2017.6081%2010.3824%2017.6799C10.2424%2017.7517%2010.0885%2017.7937%209.93089%2017.8031L9.86444%2017.8057C9.56736%2017.8052%209.28255%2017.6892%209.07222%2017.4832L5.59667%2014.0703C5.38706%2013.864%205.26951%2013.5843%205.26987%2013.2929C5.27023%2013.0015%205.38847%2012.7221%205.59858%2012.5163C5.80869%2012.3105%206.09346%2012.195%206.39024%2012.1954C6.68703%2012.1957%206.97151%2012.3118%207.18111%2012.5182L9.76478%2015.0553L15.732%207.59581C15.9185%207.37628%2016.1849%207.23677%2016.4744%207.20689C16.764%207.17701%2017.0541%207.25911%2017.283%207.43576C17.5119%207.61242%2017.6618%207.86972%2017.7007%208.15308C17.7396%208.43643%2017.6646%208.72353%2017.4915%208.95344L17.4902%208.95219Z'%20fill='%23292929'/%3e%3c/svg%3e";
const BackendEcoSystemSvg = "data:image/svg+xml,%3csvg%20width='30'%20height='30'%20viewBox='0%200%2030%2030'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M5.00007%2023.5714V13.5714H7.85721V23.5714H5.00007ZM13.5715%2023.5714V13.5714H16.4286V23.5714H13.5715ZM0.714355%2029.2857V26.4285H29.2858V29.2857H0.714355ZM22.1429%2023.5714V13.5714H25.0001V23.5714H22.1429ZM0.714355%2010.7142V7.85709L15.0001%200.714233L29.2858%207.85709V10.7142H0.714355Z'%20fill='%23292929'/%3e%3c/svg%3e";
const RbiComplaintInfrastructureSvg = "data:image/svg+xml,%3csvg%20width='28'%20height='28'%20viewBox='0%200%2028%2028'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_50_279)'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M14.4142%200.956056C14.2842%200.896927%2014.1431%200.866333%2014.0002%200.866333C13.8574%200.866333%2013.7162%200.896927%2013.5862%200.956056L8.34024%203.34406L13.9962%205.92006L19.6562%203.34206L14.4142%200.956056ZM7.40024%2011.2201V5.11206L13.0002%207.66206V14.4121L7.98224%2012.1301C7.80754%2012.0506%207.65939%2011.9226%207.55548%2011.7612C7.45157%2011.5998%207.39629%2011.412%207.39624%2011.2201M14.9962%2024.6441V17.9641L20.3002%2020.3801V27.1301L15.2882%2024.8481C15.1788%2024.7983%2015.0812%2024.7292%2014.9962%2024.6441ZM22.2982%2027.1341V20.3801L27.9042%2017.8281V23.9381C27.9042%2024.13%2027.8489%2024.3178%2027.745%2024.4792C27.6411%2024.6405%2027.4929%2024.7686%2027.3182%2024.8481L22.2982%2027.1341ZM12.9962%2017.9641V24.6521C12.913%2024.7335%2012.8163%2024.7999%2012.7102%2024.8481L7.69024%2027.1341V20.3801L12.9962%2017.9641ZM5.69024%2020.3801V27.1301L0.680238%2024.8481C0.505536%2024.7686%200.357389%2024.6405%200.25348%2024.4792C0.149572%2024.3178%200.0942914%2024.13%200.0942383%2023.9381V17.8301L5.69024%2020.3801ZM14.9962%2014.4161V7.66006L20.6022%205.10806V11.2201C20.6022%2011.412%2020.5469%2011.5998%2020.443%2011.7612C20.3391%2011.9226%2020.1909%2012.0506%2020.0162%2012.1301L14.9962%2014.4161ZM20.8922%2013.6761C21.0222%2013.6169%2021.1634%2013.5863%2021.3062%2013.5863C21.4491%2013.5863%2021.5902%2013.6169%2021.7202%2013.6761L26.9602%2016.0601L21.3002%2018.6381L15.6502%2016.0601L20.8922%2013.6761ZM6.28024%2013.6761C6.41025%2013.6169%206.55141%2013.5863%206.69424%2013.5863C6.83706%2013.5863%206.97823%2013.6169%207.10824%2013.6761L12.3482%2016.0601L6.69024%2018.6401L1.03624%2016.0601L6.28024%2013.6761Z'%20fill='%23292929'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_50_279'%3e%3crect%20width='28'%20height='28'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
const MultiBankNetworkSvg = "data:image/svg+xml,%3csvg%20width='33'%20height='31'%20viewBox='0%200%2033%2031'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M17.6773%2016.6071H23.731C24.0176%2017.6508%2024.6991%2018.5604%2025.6477%2019.1653C26.5964%2019.7703%2027.7471%2020.0291%2028.8841%2019.8933C30.0212%2019.7575%2031.0666%2019.2363%2031.8243%2018.4275C32.582%2017.6188%2033%2016.5779%2033%2015.5C33%2014.4221%2032.582%2013.3812%2031.8243%2012.5725C31.0666%2011.7637%2030.0212%2011.2425%2028.8841%2011.1067C27.7471%2010.9709%2026.5964%2011.2297%2025.6477%2011.8347C24.6991%2012.4396%2024.0176%2013.3492%2023.731%2014.3929H17.6773V5.53572H23.731C24.0176%206.57938%2024.6991%207.48893%2025.6477%208.09389C26.5964%208.69884%2027.7471%208.95767%2028.8841%208.82185C30.0212%208.68603%2031.0666%208.16489%2031.8243%207.35612C32.582%206.54735%2033%205.50646%2033%204.42858C33%203.35069%2032.582%202.30981%2031.8243%201.50104C31.0666%200.692264%2030.0212%200.171126%2028.8841%200.0353078C27.7471%20-0.10051%2026.5964%200.158316%2025.6477%200.763272C24.6991%201.36823%2024.0176%202.27778%2023.731%203.32144H17.6773C17.0528%203.32144%2016.4539%203.55473%2016.0123%203.96999C15.5708%204.38524%2015.3227%204.94846%2015.3227%205.53572V14.3929H9.26895C8.9824%2013.3492%208.30093%2012.4396%207.35228%2011.8347C6.40363%2011.2297%205.25292%2010.9709%204.11586%2011.1067C2.9788%2011.2425%201.93344%2011.7637%201.17574%2012.5725C0.418031%2013.3812%200%2014.4221%200%2015.5C0%2016.5779%200.418031%2017.6188%201.17574%2018.4275C1.93344%2019.2363%202.9788%2019.7575%204.11586%2019.8933C5.25292%2020.0291%206.40363%2019.7703%207.35228%2019.1653C8.30093%2018.5604%208.9824%2017.6508%209.26895%2016.6071H15.3227V25.4643C15.3227%2026.0515%2015.5708%2026.6148%2016.0123%2027.03C16.4539%2027.4453%2017.0528%2027.6786%2017.6773%2027.6786H23.731C24.0176%2028.7222%2024.6991%2029.6318%2025.6477%2030.2367C26.5964%2030.8417%2027.7471%2031.1005%2028.8841%2030.9647C30.0212%2030.8289%2031.0666%2030.3077%2031.8243%2029.499C32.582%2028.6902%2033%2027.6493%2033%2026.5714C33%2025.4935%2032.582%2024.4527%2031.8243%2023.6439C31.0666%2022.8351%2030.0212%2022.314%2028.8841%2022.1782C27.7471%2022.0423%2026.5964%2022.3012%2025.6477%2022.9061C24.6991%2023.5111%2024.0176%2024.4206%2023.731%2025.4643H17.6773V16.6071ZM28.2731%2013.2857C28.7388%2013.2857%2029.1941%2013.4156%2029.5813%2013.6589C29.9685%2013.9022%2030.2703%2014.248%2030.4485%2014.6526C30.6267%2015.0572%2030.6733%2015.5025%2030.5825%2015.932C30.4916%2016.3615%2030.2674%2016.7561%2029.9381%2017.0657C29.6088%2017.3754%2029.1892%2017.5863%2028.7325%2017.6717C28.2757%2017.7572%2027.8023%2017.7133%2027.372%2017.5457C26.9418%2017.3781%2026.574%2017.0943%2026.3153%2016.7302C26.0566%2016.3661%2025.9185%2015.9379%2025.9185%2015.5C25.9185%2014.9127%2026.1666%2014.3495%2026.6081%2013.9343C27.0497%2013.519%2027.6486%2013.2857%2028.2731%2013.2857ZM28.2731%202.21429C28.7388%202.21429%2029.1941%202.34416%2029.5813%202.58747C29.9685%202.83078%2030.2703%203.1766%2030.4485%203.58121C30.6267%203.98582%2030.6733%204.43104%2030.5825%204.86056C30.4916%205.29009%2030.2674%205.68464%2029.9381%205.99431C29.6088%206.30399%2029.1892%206.51488%2028.7325%206.60032C28.2757%206.68576%2027.8023%206.6419%2027.372%206.47431C26.9418%206.30672%2026.574%206.02291%2026.3153%205.65877C26.0566%205.29463%2025.9185%204.86652%2025.9185%204.42858C25.9185%203.84131%2026.1666%203.2781%2026.6081%202.86284C27.0497%202.44758%2027.6486%202.21429%2028.2731%202.21429ZM4.72688%2017.7143C4.26118%2017.7143%203.80594%2017.5844%203.41873%2017.3411C3.03151%2017.0978%202.72971%2016.752%202.5515%2016.3474C2.37328%2015.9428%202.32665%2015.4975%202.41751%2015.068C2.50836%2014.6385%202.73262%2014.2439%203.06192%2013.9343C3.39122%2013.6246%203.81077%2013.4137%204.26752%2013.3283C4.72427%2013.2428%205.19771%2013.2867%205.62796%2013.4543C6.05821%2013.6219%206.42595%2013.9057%206.68468%2014.2698C6.94341%2014.6339%207.08151%2015.0621%207.08151%2015.5C7.08151%2016.0873%206.83343%2016.6505%206.39185%2017.0657C5.95028%2017.481%205.35137%2017.7143%204.72688%2017.7143ZM28.2731%2024.3571C28.7388%2024.3571%2029.1941%2024.487%2029.5813%2024.7303C29.9685%2024.9736%2030.2703%2025.3194%2030.4485%2025.7241C30.6267%2026.1287%2030.6733%2026.5739%2030.5825%2027.0034C30.4916%2027.4329%2030.2674%2027.8275%2029.9381%2028.1372C29.6088%2028.4468%2029.1892%2028.6577%2028.7325%2028.7432C28.2757%2028.8286%2027.8023%2028.7847%2027.372%2028.6172C26.9418%2028.4496%2026.574%2028.1657%2026.3153%2027.8016C26.0566%2027.4375%2025.9185%2027.0094%2025.9185%2026.5714C25.9185%2025.9842%2026.1666%2025.4209%2026.6081%2025.0057C27.0497%2024.5904%2027.6486%2024.3571%2028.2731%2024.3571Z'%20fill='%230A0C33'/%3e%3c/svg%3e";
const OpenLinkSvg = "data:image/svg+xml,%3csvg%20width='18'%20height='18'%20viewBox='0%200%2018%2018'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M8%200C8.25488%200.000282707%208.50003%200.0978791%208.68537%200.272848C8.8707%200.447818%208.98223%200.686953%208.99717%200.941395C9.01211%201.19584%208.92933%201.44638%208.76574%201.64183C8.60215%201.83729%208.3701%201.9629%208.117%201.993L8%202H2V16H16V10C16.0003%209.74512%2016.0979%209.49997%2016.2728%209.31463C16.4478%209.1293%2016.687%209.01777%2016.9414%209.00283C17.1958%208.98789%2017.4464%209.07067%2017.6418%209.23426C17.8373%209.39785%2017.9629%209.6299%2017.993%209.883L18%2010V16C18.0002%2016.5046%2017.8096%2016.9906%2017.4665%2017.3605C17.1234%2017.7305%2016.6532%2017.9572%2016.15%2017.995L16%2018H2C1.49542%2018.0002%201.00943%2017.8096%200.639452%2017.4665C0.269471%2017.1234%200.0428434%2016.6532%200.00500021%2016.15L1.00268e-07%2016V2C-0.000159579%201.49542%200.190406%201.00943%200.533497%200.639452C0.876588%200.269471%201.34684%200.0428433%201.85%200.00500011L2%200H8ZM16.75%200C17.44%200%2018%200.56%2018%201.25V5C18%205.26522%2017.8946%205.51957%2017.7071%205.70711C17.5196%205.89464%2017.2652%206%2017%206C16.7348%206%2016.4804%205.89464%2016.2929%205.70711C16.1054%205.51957%2016%205.26522%2016%205V3.414L9.414%2010H11C11.2652%2010%2011.5196%2010.1054%2011.7071%2010.2929C11.8946%2010.4804%2012%2010.7348%2012%2011C12%2011.2652%2011.8946%2011.5196%2011.7071%2011.7071C11.5196%2011.8946%2011.2652%2012%2011%2012H7.25C6.56%2012%206%2011.44%206%2010.75V7C6%206.73478%206.10536%206.48043%206.29289%206.29289C6.48043%206.10536%206.73478%206%207%206C7.26522%206%207.51957%206.10536%207.70711%206.29289C7.89464%206.48043%208%206.73478%208%207V8.586L14.586%202H13C12.7348%202%2012.4804%201.89464%2012.2929%201.70711C12.1054%201.51957%2012%201.26522%2012%201C12%200.734784%2012.1054%200.48043%2012.2929%200.292893C12.4804%200.105357%2012.7348%200%2013%200H16.75Z'%20fill='white'/%3e%3c/svg%3e";
const About = () => {
  const WhyBridgMoney = [
    { icon: ModularAndScalableApiSvg, txt: "Modular & scalable APIs" },
    {
      icon: RbiComplaintInfrastructureSvg,
      txt: "RBI-compliant infrastructure"
    },
    { icon: SecuritySvg, txt: "Industry-grade uptime & security" },
    { icon: BackendEcoSystemSvg, txt: "Multi-bank backend ecosystem" }
  ];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("section", { className: " bg-[#FFFCF5]", children: /* @__PURE__ */ jsxs("div", { className: "px-6 pt-25 py-10 lg:pb-15 sm:px-15 xl:px-30", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-3 gap-y-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "col-span-2", children: [
          /* @__PURE__ */ jsx(
            "h1",
            {
              className: "\n                    relative px-7 before:content-[''] before:absolute before:left-[7px] before:top-1/2 before:-translate-y-1/2 before:w-[11px] before:h-[11px] before:rounded-full before:bg-[#CDFF66] \n                    after:content-[''] after:absolute after:right-[7px] after:top-1/2 after:-translate-y-1/2 after:w-[11px] after:h-[11px] after:rounded-full after:bg-[#CDFF66]\n                    text-sm my-3 bg-[#1E1E1E] w-max rounded-2xl py-1 text-white",
              children: "About Us"
            }
          ),
          /* @__PURE__ */ jsx("h1", { className: "text-[#A5EB14] text-4xl lg:text-5xl font-semibold leading-12 lg:leading-16", children: "bridg.money" }),
          /* @__PURE__ */ jsx("h1", { className: "text-4xl lg:text-5xl font-semibold leading-12 lg:leading-16", children: "The Backbone of Modern Fintech Operations" }),
          /* @__PURE__ */ jsx("p", { className: "my-3 lg:my-4 xl:pr-50 text-lg", children: "bridg.money is a next-gen Technology Service Provider (TSP) powering India’s financial infrastructure.We enable startups, fintechs, and enterprises to move money compliantly and efficiently with plug-and play APIs." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center", children: /* @__PURE__ */ jsx("img", { src: TestimonalSvg, alt: "testimonal" }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row flex-wrap lg:flex-nowrap gap-5 my-10 lg:my-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-[#0A0C33] lg:min-w-[390px] rounded-2xl flex justify-between items-center gap-5 p-3", children: [
          /* @__PURE__ */ jsx("h1", { className: " text-white text-2xl xl:text-3xl p-6 xl:p-7", children: "Modular APIs" }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ jsx("button", { className: "pointer-events-none text-[#ACE238] text-sm border border-[#ACE238] rounded-2xl py-0.5 mb-3 sm:mb-2 px-2", children: "Composable" }),
            /* @__PURE__ */ jsx("button", { className: "pointer-events-none text-[#ACE238] text-sm border border-[#ACE238] rounded-2xl py-0.5 px-2", children: "Plug-and-Play" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-[#0A0C33] rounded-2xl flex justify-between gap-1 p-2", children: [
          /* @__PURE__ */ jsx("h1", { className: " text-white text-2xl xl:text-3xl p-6 xl:p-7", children: "Multi-bank network" }),
          /* @__PURE__ */ jsx("div", { className: "bg-[#A5EB14] rounded-xl flex items-center px-3 py-2", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: MultiBankNetworkSvg,
              className: "h-[35px] lg:h-[50px]",
              alt: "Multi-bank network"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white border flex justify-between gap-2 p-2 rounded-2xl", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-2xl xl:text-3xl p-6 xl:p-7", children: "Scalable and reliable infrastructure" }),
          /* @__PURE__ */ jsx("div", { className: "bg-[#0A0C33] h-max w-max p-3 rounded-full", children: /* @__PURE__ */ jsx("img", { src: OpenLinkSvg, alt: "Multi-bank network" }) })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { className: "mt-15 lg:mt-20 mb-20 lg:mb-30 px-6 sm:px-15 xl:px-30", children: [
      /* @__PURE__ */ jsxs("h1", { className: "text-center text-3xl md:text-5xl font-semibold mb-4", children: [
        "Why ",
        /* @__PURE__ */ jsx("span", { className: "text-[#A5EB14]", children: "bridg.money" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-center text-lg", children: "We’re not just a payment layer. We’re your end-to-end fintech stack." }),
      /* @__PURE__ */ jsx(WhySection, { about: WhyBridgMoney })
    ] })
  ] });
};
const WhySection = ({ about }) => {
  return /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:px-7 gap-5 my-7", children: about.map((data, idx) => /* @__PURE__ */ jsxs(
    "div",
    {
      className: "flex gap-4 bg-[#A5EB141A] items-center hover:bg-[#A5EB14] px-5 py-10 lg:py-13 rounded-2xl",
      children: [
        /* @__PURE__ */ jsx("div", { className: "bg-[#A5EB14] rounded-full p-3", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: data?.icon,
            alt: data.txt,
            className: "h-[20px] lg:h-[25px] object-contain"
          }
        ) }),
        /* @__PURE__ */ jsx("p", { children: data.txt })
      ]
    },
    idx
  )) });
};
const EmailSvg = "data:image/svg+xml,%3csvg%20width='20'%20height='16'%20viewBox='0%200%2020%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M20%202C20%200.9%2019.1%200%2018%200H2C0.9%200%200%200.9%200%202V14C0%2015.1%200.9%2016%202%2016H18C19.1%2016%2020%2015.1%2020%2014V2ZM18%202L10%207L2%202H18ZM18%2014H2V4L10%209L18%204V14Z'%20fill='%23A5EB14'/%3e%3c/svg%3e";
const PhoneSvg = "data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M3.14691%201.77604C3.20024%202.56715%203.33358%203.34049%203.54691%204.07826L2.48024%205.14493C2.1158%204.07826%201.88469%202.94937%201.80469%201.77604H3.14691ZM11.9104%2012.4635C12.666%2012.6769%2013.4393%2012.8102%2014.2215%2012.8635V14.188C13.0482%2014.108%2011.9193%2013.8769%2010.8438%2013.5213L11.9104%2012.4635ZM4%200H0.888889C0.4%200%200%200.4%200%200.888889C0%209.23556%206.76444%2016%2015.1111%2016C15.6%2016%2016%2015.6%2016%2015.1111V12.0089C16%2011.52%2015.6%2011.12%2015.1111%2011.12C14.0089%2011.12%2012.9333%2010.9422%2011.9378%2010.6133C11.8489%2010.5778%2011.7511%2010.5689%2011.6622%2010.5689C11.4311%2010.5689%2011.2089%2010.6578%2011.0311%2010.8267L9.07556%2012.7822C6.56%2011.4933%204.49778%209.44%203.21778%206.92444L5.17333%204.96889C5.42222%204.72%205.49333%204.37333%205.39556%204.06222C5.06667%203.06667%204.88889%202%204.88889%200.888889C4.88889%200.4%204.48889%200%204%200Z'%20fill='%23A5EB14'/%3e%3c/svg%3e";
const formspreeKey = "xpwlnpyo";
const ErrMsg = ({ error }) => {
  return /* @__PURE__ */ jsx(Fragment, { children: error && /* @__PURE__ */ jsx("p", { className: "pl-3 text-sm pb-0 text-red-700", children: /* @__PURE__ */ jsx("small", { children: error }) }) });
};
const validateField = (name, value) => {
  const trimmedValue = String(value ?? "").trim();
  switch (name) {
    case "name":
      return !trimmedValue ? "Name is required" : "";
    case "email":
      return !trimmedValue ? "Email is required" : "";
    case "phone":
      return !trimmedValue ? "Phone no is required" : "";
    case "companyName":
      return !trimmedValue ? "Company Name is required" : "";
    case "interestedProducts":
      return !trimmedValue ? "Interested Products is required" : "";
    default:
      return "";
  }
};
const Contact = () => {
  const defaultValue2 = {
    name: "",
    email: "",
    phone: "",
    companyName: "",
    interestedProducts: ""
  };
  const [user, setUser] = useState(defaultValue2);
  const [error, setError] = useState({});
  const [processing, setProcessing] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    let validValue = value;
    if (name === "phone") {
      validValue = value.replace(/[^0-9]/g, "").slice(0, 12);
    } else if (name === "email") {
      validValue = value.replace(/[^a-zA-Z0-9@._%+-]/g, "").replace(/(@.*)@/g, "$1").slice(0, 100);
    }
    const error2 = validateField(name, value);
    setError((prev) => ({
      ...prev,
      [name]: error2
    }));
    setUser((prev) => ({
      ...prev,
      [name]: validValue
    }));
  };
  const validate = () => {
    const newErrors = Object.entries(user).reduce((acc, [key, value]) => {
      const error2 = validateField(key, value);
      if (error2) acc[key] = error2;
      return acc;
    }, {});
    setError(newErrors);
    const proceed = Object.values(newErrors).length === 0;
    return proceed;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    setProcessing(true);
    if (validate()) {
      const res = await fetch(`https://formspree.io/f/${formspreeKey}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" }
      });
      if (res.ok) {
        toast.success("Thanks! Your message has been sent.");
        setUser(defaultValue2);
      } else {
        toast.error("Oops! Something went wrong.");
      }
    }
    setProcessing(false);
  };
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("section", { className: "px-7 md:px-15 lg:px-22 xl:px-30 pt-30 pb-15", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-y-10", children: [
    /* @__PURE__ */ jsx("div", { className: "lg:pr-10 xl:pr-20 order-2 lg:order-1", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "name", children: "Name" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            id: "name",
            name: "name",
            type: "text",
            value: user?.name,
            className: `rounded-2xl py-1 px-4 mt-2 outline-0 bg-[#1E1E1E05] w-full border ${error.name ? "border-red-700" : "border-[#1E1E1E14]"}`,
            onChange: handleChange,
            maxLength: 100
          }
        ),
        /* @__PURE__ */ jsx(ErrMsg, { error: error?.name })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "email", children: "Email" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            id: "email",
            type: "email",
            name: "email",
            value: user?.email,
            className: `rounded-2xl py-1 px-4 mt-2 outline-0 bg-[#1E1E1E05] w-full border ${error.email ? "border-red-700" : "border-[#1E1E1E14]"}`,
            onChange: handleChange,
            maxLength: 100
          }
        ),
        /* @__PURE__ */ jsx(ErrMsg, { error: error?.email })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "companyName", children: "Company Name" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            id: "companyName",
            type: "text",
            name: "companyName",
            value: user?.companyName,
            className: `rounded-2xl py-1 px-4 mt-2 outline-0 bg-[#1E1E1E05] w-full border ${error.companyName ? "border-red-700" : "border-[#1E1E1E14]"}`,
            onChange: handleChange,
            maxLength: 150
          }
        ),
        /* @__PURE__ */ jsx(ErrMsg, { error: error?.companyName })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "phone", children: "Phone No" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            id: "phone",
            type: "text",
            name: "phone",
            value: user?.phone,
            className: `rounded-2xl py-1 px-4 mt-2 outline-0 bg-[#1E1E1E05] w-full border ${error.phone ? "border-red-700" : "border-[#1E1E1E14]"}`,
            onChange: handleChange,
            maxLength: 12,
            pattern: "[0-9]*",
            inputMode: "numeric"
          }
        ),
        /* @__PURE__ */ jsx(ErrMsg, { error: error?.phone })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "products", children: "Interested Products" }),
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxs(
            "select",
            {
              id: "products",
              name: "interestedProducts",
              value: user?.interestedProducts,
              className: `rounded-2xl appearance-none py-1.5 px-4 mt-2 outline-0 bg-[#1E1E1E05] w-full border ${error.interestedProducts ? "border-red-700" : "border-[#1E1E1E14]"}`,
              onChange: handleChange,
              children: [
                /* @__PURE__ */ jsx("option", { value: "", children: "select" }),
                /* @__PURE__ */ jsx("option", { value: "BridgPay – Instant Payouts", children: "BridgPay – Instant Payouts" }),
                /* @__PURE__ */ jsx("option", { value: "BridgCollect – Multi-Channel Collections", children: "BridgCollect – Multi-Channel Collections" }),
                /* @__PURE__ */ jsx("option", { value: "BridgConnect – Connected Banking", children: "BridgConnect – Connected Banking" })
              ]
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "absolute inset-y-1 h-full right-3 flex items-center pointer-events-none", children: "▼" })
        ] }),
        /* @__PURE__ */ jsx(ErrMsg, { error: error?.interestedProducts })
      ] }),
      /* @__PURE__ */ jsx("input", { type: "hidden", name: "_subject", value: "New Contact from bridg.money" }),
      /* @__PURE__ */ jsx("input", { type: "hidden", name: "source", value: "bridg.money" }),
      /* @__PURE__ */ jsx("input", { type: "hidden", name: "_captcha", value: "false" }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          type: "submit",
          disabled: processing,
          className: "cursor-pointer bg-[#A5EB14] group text-sm rounded-3xl py-2 mt-5 px-5 flex gap-3 items-center",
          children: [
            "Contact Us",
            /* @__PURE__ */ jsx("span", { className: "translate-x-[-5px] group-hover:opacity-100 group-hover:translate-x-0 transition duration-300", children: /* @__PURE__ */ jsx(ArrowSvg$1, {}) })
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "order-1 lg:order-2 flex items-center", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(
        "h1",
        {
          className: "\n                          relative px-7 before:content-[''] before:absolute before:left-[7px] before:top-1/2 before:-translate-y-1/2 before:w-[11px] before:h-[11px] before:rounded-full before:bg-[#CDFF66] \n                          after:content-[''] after:absolute after:right-[7px] after:top-1/2 after:-translate-y-1/2 after:w-[11px] after:h-[11px] after:rounded-full after:bg-[#CDFF66]\n                          text-sm mb-5 bg-[#1E1E1E] w-max rounded-2xl py-1 text-white",
          children: "Contact Us"
        }
      ),
      /* @__PURE__ */ jsxs("h1", { className: "text-[38px] md:text-5xl xl:text-6xl font-semibold leading-12 md:leading-16 mb-3", children: [
        "Let’s Power Your ",
        /* @__PURE__ */ jsx("span", { className: "text-[#A5EB14]", children: "Fintech" }),
        " ",
        "Journey"
      ] }),
      /* @__PURE__ */ jsxs("button", { className: "border pointer-events-none text-sm border-black rounded-3xl py-2 px-5 flex gap-3 items-center", children: [
        "Book a Demo ",
        /* @__PURE__ */ jsx(ArrowSvg$1, {})
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-5 lg:gap-10 my-8 items-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-[#0A0C33] rounded-full p-2.5 flex items-center justify-center", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: EmailSvg,
              alt: "Phone no",
              className: "h-[11px] object-contain"
            }
          ) }),
          /* @__PURE__ */ jsx("a", { href: "mailto:hello@bridg.money", children: "hello@bridg.money" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-[#0A0C33] rounded-full p-2.5 flex items-center justify-center", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: PhoneSvg,
              alt: "Phone no",
              className: "h-[12px] object-contain"
            }
          ) }),
          /* @__PURE__ */ jsx("a", { href: "tel:+91 75756 12809", children: "+91 75756 12809" })
        ] })
      ] })
    ] }) })
  ] }) }) });
};
const headings$7 = [
  {
    id: "1",
    heading: "General",
    questions: [
      {
        question: "What is bridg.money?",
        ans: "bridg.money is a Technology Service Provider (TSP) offering a unified API stack for compliant, scalable money movement — including payouts, collections, connected banking, merchant onboarding, multi-bank routing, reconciliation, and escrow infrastructure."
      },
      {
        question: "Is bridg.money a bank or financial institution?",
        ans: "No. We are not a bank. We partner with RBI-licensed banks and financial institutions to deliver API-based financial services."
      },
      {
        question: "Who can use bridg.money’s services?",
        ans: "We serve businesses, marketplaces, platforms, fintechs, enterprises, and (if eligible) individual sellers who require secure and compliant money movement."
      },
      {
        question: "Do you serve international merchants?",
        ans: "Currently, our services are for Indian entities. Cross-border capabilities may be available via select partner banks."
      },
      {
        question: "What industries do you support?",
        ans: "We support a wide range of industries, subject to compliance checks. Certain high-risk categories may be restricted."
      }
    ]
  },
  {
    id: "2",
    heading: "Pricing & Fees",
    questions: [
      {
        question: "What are the charges for using bridg.money’s services?",
        ans: "Pricing depends on your transaction volumes, risk profile, and product usage. Contact our sales team for a custom quote."
      },
      {
        question: "Is there a minimum monthly commitment?",
        ans: "No fixed minimum for most products. High-volume plans may have minimum usage for preferential pricing."
      },
      {
        question: "Are there any hidden fees?",
        ans: "No. All charges are transparently listed in your agreement."
      }
    ]
  },
  {
    id: "3",
    heading: "Security & Compliance",
    questions: [
      {
        question: "How secure is my data?",
        ans: "We use bank-grade encryption, secure storage, and multi-layered security protocols."
      },
      {
        question: "Are you PCI-DSS compliant?",
        ans: "Yes, through PCI-DSS certified partners."
      },
      {
        question: "Do you comply with RBI guidelines?",
        ans: "Yes. All services are provided in full compliance with RBI and applicable laws."
      },
      {
        question: "Do you hold any certifications?",
        ans: "We work with partners who are PCI-DSS certified, ISO 27001 certified, and SOC 2 ready."
      },
      {
        question: "How do you prevent fraud and money laundering?",
        ans: "We perform KYC/KYB verification, transaction monitoring, and AML/CFT checks."
      },
      {
        question: "Do you undergo regular compliance audits?",
        ans: "Yes. Our systems and processes are periodically reviewed for regulatory and security compliance."
      }
    ]
  },
  {
    id: "4",
    heading: "Getting Started",
    questions: [
      {
        question: "How do I sign up?",
        ans: "Contact sales or register on our website to begin onboarding."
      },
      {
        question: "Do you provide API documentation?",
        ans: "Yes. We offer detailed API docs, sandbox credentials, and sample code."
      },
      {
        question: "Do you offer SDKs and plugins?",
        ans: "Yes. SDKs are available in popular languages, and plugins for platforms like Shopify and WooCommerce."
      },
      {
        question: "Do you assist with integration?",
        ans: "Yes. Our technical team supports both API and plugin-based setups."
      },
      {
        question: "Do you provide webhook and callback support?",
        ans: "Yes. We support webhooks for real-time status updates and callbacks for transaction events."
      },
      {
        question: "What is your uptime SLA?",
        ans: "We target 99.9% uptime, with automatic failover routing to ensure service continuity."
      }
    ]
  },
  {
    id: "5",
    heading: "BridgOnboard – Merchant Onboarding",
    questions: [
      {
        question: "What is BridgOnboard?",
        ans: "An API-first onboarding solution with automated document verification, KYC/KYB checks, and instant merchant activation."
      },
      {
        question: "What documents are required?",
        ans: "Certificate of Incorporation, GST, PAN, bank proof, and authorized signatory KYC. Requirements vary by business type."
      },
      {
        question: "How long does onboarding take?",
        ans: "Typically 24–48 hours after submitting all documents."
      },
      {
        question: "Is onboarding paperless?",
        ans: "Yes — entirely digital via a secure upload flow."
      }
    ]
  },
  {
    id: "6",
    heading: "BridgCollect – Multi-Channel Collections",
    questions: [
      {
        question: "What is BridgCollect?",
        ans: "Accept payments via Virtual Accounts, UPI/VPA, QR, and cards — with instant confirmation and auto-settlement."
      },
      {
        question: "Are collections available 24x7?",
        ans: "Yes, including weekends and public holidays."
      },
      {
        question: "How fast are settlements?",
        ans: "T+0 or T+1, depending on bank arrangements."
      }
    ]
  },
  {
    id: "7",
    heading: "BridgPay – Instant Payouts",
    questions: [
      {
        question: "What is BridgPay?",
        ans: "Enables instant payouts via NEFT, RTGS, IMPS, UPI, and cards with smart retries and live tracking."
      },
      {
        question: "Can I do bulk payouts?",
        ans: "Yes — through API or dashboard CSV upload."
      },
      {
        question: "What happens if a payout fails?",
        ans: "It is retried automatically or refunded to your source account."
      },
      {
        question: "Are payouts available 24x7?",
        ans: "Yes via IMPS/UPI; NEFT/RTGS follow banking hours."
      }
    ]
  },
  {
    id: "8",
    heading: "BridgConnect – Connected Banking",
    questions: [
      {
        question: "What is BridgConnect?",
        ans: "Gives real-time access to your own bank account balances, transactions, and statements — with the ability to initiate payments directly."
      },
      {
        question: "Can I connect multiple bank accounts?",
        ans: "Yes. You can link multiple accounts to view and operate them from a single dashboard."
      }
    ]
  },
  {
    id: "9",
    heading: "BridgRoute – Multi-Bank Smart Routing",
    questions: [
      {
        question: "What is BridgRoute?",
        ans: "An intelligent routing engine that selects the fastest, most cost-efficient bank rail for transactions, with automatic failover."
      },
      {
        question: "Does it work for both payouts and collections?",
        ans: "Yes — it optimises both."
      }
    ]
  },
  {
    id: "10",
    heading: "BridgRecon – Automated Reconciliation",
    questions: [
      {
        question: "What is BridgRecon?",
        ans: "Matches incoming and outgoing transactions in real time, syncs with ERP systems, and flags anomalies instantly."
      },
      {
        question: "Can I export reports?",
        ans: "Yes — available in CSV or Excel."
      },
      {
        question: "Can reports be scheduled automatically?",
        ans: "Yes — enterprise clients can schedule automated report delivery via API or email."
      }
    ]
  },
  {
    id: "11",
    heading: "BridgVault – Escrow & Pooled Accounts",
    questions: [
      {
        question: "What is BridgVault?",
        ans: "Provides RBI-compliant escrow and pooled account structures with sub-ledgers and transaction-level controls."
      },
      {
        question: "Can escrow be multi-party?",
        ans: "Yes — suitable for marketplaces, gig platforms, and other multi-party settlements."
      },
      {
        question: "What happens in a dispute?",
        ans: "Funds remain in escrow until resolution per agreed terms."
      }
    ]
  },
  {
    id: "12",
    heading: "Product Limitations & Exclusions",
    questions: [
      {
        question: "Are there restricted industries?",
        ans: "Yes. We do not support certain high-risk categories such as gambling, adult content, unregulated forex, and cryptocurrency trading."
      },
      {
        question: "Are all features available for all merchants?",
        ans: "Some features (e.g., T+0 settlements, certain API types) may be bank-dependent and subject to risk approval."
      }
    ]
  },
  {
    id: "13",
    heading: "Account Management",
    questions: [
      {
        question: "Can I add multiple users?",
        ans: "Yes — with role-based access controls."
      },
      {
        question: "Can I white-label bridg.money’s services?",
        ans: "Yes — available for eligible partners."
      }
    ]
  },
  {
    id: "14",
    heading: "Technical & Operational Policies",
    questions: [
      {
        question: "What happens if my account is inactive?",
        ans: "If dormant for a long period, re-verification may be required."
      },
      {
        question: "What happens if a bank is down?",
        ans: "Transactions are rerouted automatically using BridgRoute."
      }
    ]
  },
  {
    id: "15",
    heading: "Disputes, Chargebacks & Support",
    questions: [
      {
        question: "How are disputes handled?",
        ans: "Via our published grievance redressal process."
      },
      {
        question: "Do you assist in chargeback resolution?",
        ans: "Yes — in coordination with the merchant."
      },
      {
        question: "Is support available 24x7?",
        ans: "Email support is 24x7; phone support during business hours."
      }
    ]
  },
  {
    id: "16",
    heading: "Reporting & Analytics",
    questions: [
      {
        question: "Do you provide dashboards?",
        ans: "Yes — with real-time transaction data and analytics."
      },
      {
        question: "Can I request custom reports?",
        ans: "Yes — for enterprise clients."
      },
      {
        question: "Do you have real-time analytics APIs?",
        ans: "Yes — available for enterprise integrations."
      }
    ]
  },
  {
    id: "17",
    heading: "Sandbox & Testing",
    questions: [
      {
        question: "Do you offer a sandbox?",
        ans: "Yes — with test credentials after initial setup."
      },
      {
        question: "How long does it take to go live?",
        ans: "Plugin integration can be same-day; full API integration may take a few days based on complexity."
      }
    ]
  }
];
const FAQ = () => {
  return /* @__PURE__ */ jsxs("div", { className: "contaier px-7 md:px-10 pt-25", children: [
    /* @__PURE__ */ jsxs("div", { className: "lg:30 xl:px-40 pb-10", children: [
      /* @__PURE__ */ jsxs("h1", { className: "font-semibold pl-3 text-center text-3xl md:text-4xl lg:text-5xl py-4", children: [
        "Frequently Asked ",
        /* @__PURE__ */ jsx("span", { className: "text-[#A5EB14]", children: "Questions" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-center text-lg lg:px-20", children: "Unified answers for onboarding, collections, payouts, reconciliation, escrow, and routing—built for compliance and scale." })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "relative", children: /* @__PURE__ */ jsx(SidebarHighlight$7, {}) })
  ] });
};
function SidebarHighlight$7() {
  const [activeId, setActiveId] = useState(headings$7[0].id);
  const itemRefs = useRef({});
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-50%  0px -50% 0px" }
    );
    headings$7.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (activeId && itemRefs.current[activeId]) {
      const sidebarEl = document.getElementById("sidebar");
      const activeEl = itemRefs.current[activeId];
      if (sidebarEl && activeEl) {
        const sidebarRect = sidebarEl.getBoundingClientRect();
        const activeRect = activeEl.getBoundingClientRect();
        if (activeRect.top < sidebarRect.top || activeRect.bottom > sidebarRect.bottom) {
          sidebarEl.scrollTop += activeRect.top - sidebarRect.top - 20;
        }
      }
    }
  }, [activeId]);
  return /* @__PURE__ */ jsxs("div", { className: "flex mb-20", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "w-65 sticky top-25 h-screen hidden lg:block overflow-y-auto",
        id: "sidebar",
        children: /* @__PURE__ */ jsx("ul", { className: "relative space-y-2", children: headings$7.map((sec) => {
          const isActive = activeId === sec.id;
          return /* @__PURE__ */ jsxs(
            "li",
            {
              ref: (el) => itemRefs.current[sec.id] = el,
              className: "relative",
              children: [
                isActive && /* @__PURE__ */ jsx(
                  motion.div,
                  {
                    layoutId: "activeBorder",
                    className: "absolute left-0 top-0 h-full w-1 bg-[#96DC03] rounded-r",
                    transition: { type: "spring", stiffness: 300, damping: 30 }
                  }
                ),
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: `#${sec.id}`,
                    className: `pl-5 py-2 block rounded transition-colors ${isActive ? "text-[#96DC03]" : "text-gray-500"}`,
                    children: sec.heading
                  }
                )
              ]
            },
            sec.id
          );
        }) })
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "flex-1 space-y-7 md:px-5 xl:pl-10", children: headings$7.map((sec) => /* @__PURE__ */ jsxs("section", { id: sec.id, className: "scroll-mt-25", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-[500] text-gray-600 mb-6", children: sec.heading }),
      sec.questions?.map((q, i) => /* @__PURE__ */ jsxs(
        "details",
        {
          className: "group mb-5 py-5 p-3 shadow-[0px_1px_4px_0px_#19213D0F] border-l-6 rounded-sm border-[#F1F2F9] open:border-[#A5EB14] open:bg-[#FBFFF4] transition-all duration-500",
          children: [
            /* @__PURE__ */ jsxs("summary", { className: "cursor-pointer font-[500] flex gap-2 items-center list-none", children: [
              /* @__PURE__ */ jsx(
                "svg",
                {
                  className: "w-4 h-4 text-gray-500 transform transition-transform duration-300 group-open:rotate-90",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: "2",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx(
                    "path",
                    {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      d: "M9 5l7 7-7 7"
                    }
                  )
                }
              ),
              q.question
            ] }),
            /* @__PURE__ */ jsx("div", { className: "answer mt-1 text-gray-700 pl-6", children: q.ans })
          ]
        },
        i
      ))
    ] }, sec.id)) })
  ] });
}
const ImpactSvg = "data:image/svg+xml,%3csvg%20width='50'%20height='50'%20viewBox='0%200%2050%2050'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M41.4064%2017.5439H30.6495L40.3224%205.32227C40.5226%205.06348%2040.3419%204.6875%2040.0148%204.6875H21.2892C21.1524%204.6875%2021.0206%204.76074%2020.9523%204.88281L8.30089%2026.7334C8.14952%2026.9922%208.33507%2027.3193%208.6378%2027.3193H17.1534L12.7882%2044.7803C12.6954%2045.1611%2013.1544%2045.4297%2013.4376%2045.1562L41.6749%2018.2129C41.9288%2017.9736%2041.7579%2017.5439%2041.4064%2017.5439ZM18.4669%2035.7666L21.4112%2023.999H13.7257L22.9835%208.0127H33.9503L23.7794%2020.8691H34.0821L18.4669%2035.7666Z'%20fill='%23A5EB14'/%3e%3c/svg%3e";
const InnovationSvg$1 = "data:image/svg+xml,%3csvg%20width='50'%20height='50'%20viewBox='0%200%2050%2050'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M10.7143%2029.1667C9.15108%2026.6068%208.32691%2023.6641%208.33304%2020.6647C8.33304%2011.5522%2015.7955%204.16675%2024.9997%204.16675C34.2039%204.16675%2041.6664%2011.5522%2041.6664%2020.6647C41.6725%2023.6641%2040.8483%2026.6068%2039.2851%2029.1667M31.2497%2039.5834L30.9789%2040.9313C30.6872%2042.4042%2030.5393%2043.1397%2030.208%2043.723C29.6976%2044.6221%2028.8712%2045.2993%2027.8893%2045.623C27.2539%2045.8334%2026.4997%2045.8334%2024.9997%2045.8334C23.4997%2045.8334%2022.7455%2045.8334%2022.1101%2045.6251C21.1279%2045.3008%2020.3014%2044.6229%2019.7914%2043.723C19.4601%2043.1397%2019.3122%2042.4042%2019.0205%2040.9313L18.7497%2039.5834M15.381%2035.6209C15.1893%2035.0459%2015.0935%2034.7563%2015.1039%2034.523C15.1157%2034.2817%2015.1971%2034.0491%2015.3383%2033.8531C15.4796%2033.6571%2015.6746%2033.5063%2015.8997%2033.4188C16.1164%2033.3334%2016.4205%2033.3334%2017.0247%2033.3334H32.9747C33.581%2033.3334%2033.883%2033.3334%2034.0997%2033.4168C34.3252%2033.5044%2034.5204%2033.6555%2034.6616%2033.8519C34.8029%2034.0482%2034.8841%2034.2814%2034.8955%2034.523C34.906%2034.7563%2034.8101%2035.0438%2034.6185%2035.6209C34.2643%2036.6855%2034.0872%2037.2188%2033.8143%2037.6501C33.2435%2038.5514%2032.3487%2039.1993%2031.3143%2039.4605C30.8185%2039.5834%2030.2601%2039.5834%2029.1414%2039.5834H20.858C19.7393%2039.5834%2019.1789%2039.5834%2018.6851%2039.4584C17.6511%2039.1978%2016.7563%2038.5506%2016.1851%2037.6501C15.9122%2037.2188%2015.7351%2036.6855%2015.381%2035.6209Z'%20stroke='%23A5EB14'%20stroke-width='2.5'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M17.1875%2020.3125L21.875%2025V33.3333M32.8125%2020.3125L28.125%2025V33.3333M17.1875%2021.875C17.6019%2021.875%2017.9993%2021.7104%2018.2924%2021.4174C18.5854%2021.1243%2018.75%2020.7269%2018.75%2020.3125C18.75%2019.8981%2018.5854%2019.5007%2018.2924%2019.2076C17.9993%2018.9146%2017.6019%2018.75%2017.1875%2018.75C16.7731%2018.75%2016.3757%2018.9146%2016.0826%2019.2076C15.7896%2019.5007%2015.625%2019.8981%2015.625%2020.3125C15.625%2020.7269%2015.7896%2021.1243%2016.0826%2021.4174C16.3757%2021.7104%2016.7731%2021.875%2017.1875%2021.875ZM32.8125%2021.875C32.3981%2021.875%2032.0007%2021.7104%2031.7076%2021.4174C31.4146%2021.1243%2031.25%2020.7269%2031.25%2020.3125C31.25%2019.8981%2031.4146%2019.5007%2031.7076%2019.2076C32.0007%2018.9146%2032.3981%2018.75%2032.8125%2018.75C33.2269%2018.75%2033.6243%2018.9146%2033.9174%2019.2076C34.2104%2019.5007%2034.375%2019.8981%2034.375%2020.3125C34.375%2020.7269%2034.2104%2021.1243%2033.9174%2021.4174C33.6243%2021.7104%2033.2269%2021.875%2032.8125%2021.875Z'%20stroke='%23A5EB14'%20stroke-width='2.5'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e";
const CollabrativeSvg = "data:image/svg+xml,%3csvg%20width='44'%20height='29'%20viewBox='0%200%2044%2029'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M28.25%200.5V3.625H38.5406L25.125%2017.0406L18.4172%2010.3328C18.1242%2010.0399%2017.7268%209.87533%2017.3125%209.87533C16.8982%209.87533%2016.5008%2010.0399%2016.2078%2010.3328L0.125%2026.4156L2.33438%2028.625L17.3125%2013.6469L24.0203%2020.3547C24.3133%2020.6476%2024.7107%2020.8122%2025.125%2020.8122C25.5393%2020.8122%2025.9367%2020.6476%2026.2297%2020.3547L40.75%205.83437V16.125H43.875V0.5H28.25Z'%20fill='%23A5EB14'/%3e%3c/svg%3e";
const SpeedSvg = "data:image/svg+xml,%3csvg%20width='42'%20height='34'%20viewBox='0%200%2042%2034'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M38.4583%209.85409L35.8958%2013.7083C37.1316%2016.173%2037.7366%2018.9058%2037.6566%2021.6618C37.5766%2024.4179%2036.8141%2027.111%2035.4375%2029.4999H6.56245C4.77322%2026.396%204.03182%2022.7981%204.44816%2019.2397C4.86451%2015.6812%206.41643%2012.3516%208.87387%209.74457C11.3313%207.13749%2014.5634%205.39168%2018.0911%204.76596C21.6187%204.14024%2025.2541%204.66792%2028.4583%206.27076L32.3125%203.70826C28.3885%201.19204%2023.734%200.0645205%2019.0935%200.506044C14.453%200.947568%2010.0946%202.93263%206.71556%206.1437C3.3365%209.35477%201.13196%2013.6063%200.454572%2018.2183C-0.222812%2022.8303%200.666099%2027.5362%202.97912%2031.5833C3.34268%2032.213%203.86472%2032.7366%204.49335%2033.1021C5.12198%2033.4676%205.83531%2033.6622%206.56245%2033.6666H35.4166C36.1508%2033.6695%2036.8728%2033.4784%2037.5093%2033.1125C38.1459%2032.7467%2038.6745%2032.2191%2039.0416%2031.5833C40.9612%2028.2581%2041.9245%2024.4672%2041.8252%2020.629C41.7259%2016.7908%2040.568%2013.0548%2038.4791%209.83326L38.4583%209.85409ZM18.0625%2024.1041C18.4494%2024.4915%2018.909%2024.7988%2019.4148%2025.0085C19.9206%2025.2182%2020.4628%2025.3261%2021.0104%2025.3261C21.5579%2025.3261%2022.1001%2025.2182%2022.606%2025.0085C23.1118%2024.7988%2023.5713%2024.4915%2023.9583%2024.1041L35.75%206.41659L18.0625%2018.2083C17.6751%2018.5952%2017.3677%2019.0548%2017.158%2019.5606C16.9484%2020.0664%2016.8404%2020.6086%2016.8404%2021.1562C16.8404%2021.7037%2016.9484%2022.2459%2017.158%2022.7518C17.3677%2023.2576%2017.6751%2023.7171%2018.0625%2024.1041Z'%20fill='%23A5EB14'/%3e%3c/svg%3e";
const ObsessionSvg = "data:image/svg+xml,%3csvg%20width='44'%20height='46'%20viewBox='0%200%2044%2046'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M22.0001%202.16675L27.4719%206.15841L34.2459%206.14592L36.3261%2012.5917L41.8136%2016.5626L39.7084%2023.0001L41.8136%2029.4376L36.3261%2033.4084L34.2459%2039.8543L27.4719%2039.8418L22.0001%2043.8334L16.5282%2039.8418L9.75423%2039.8543L7.67402%2033.4084L2.18652%2029.4376L4.29173%2023.0001L2.18652%2016.5626L7.67402%2012.5917L9.75423%206.14592L16.5282%206.15841L22.0001%202.16675Z'%20stroke='%23A5EB14'%20stroke-width='3'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M14.708%2023.0001L19.9163%2028.2084L30.333%2017.7917'%20stroke='%23A5EB14'%20stroke-width='3'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e";
const TrustSvg = "data:image/svg+xml,%3csvg%20width='50'%20height='50'%20viewBox='0%200%2050%2050'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_561_224)'%3e%3cpath%20d='M25.2158%200.00010449C26.0346%200.00010449%2026.8408%200.0532295%2027.5908%200.178229C28.3298%200.273414%2029.0587%200.434472%2029.769%200.659479C30.4773%200.871979%2031.1794%201.14594%2031.8752%201.48135C32.5533%201.80323%2033.2502%202.19698%2033.9471%202.6251C35.1252%203.3751%2036.2846%203.98135%2037.4658%204.46573C39.7907%205.39836%2042.25%205.95226%2044.7502%206.10635C46.0148%206.2001%2047.3242%206.24802%2048.6783%206.2501V18.7501C48.6783%2021.123%2048.3752%2023.3793%2047.769%2025.5189C47.1865%2027.632%2046.359%2029.6698%2045.3033%2031.5907C44.2522%2033.5091%2043.0083%2035.3153%2041.5908%2036.9814C40.1525%2038.6861%2038.5944%2040.286%2036.9283%2041.7689C35.2388%2043.2542%2033.4616%2044.6369%2031.6065%2045.9095C29.7481%2047.2011%2027.8794%2048.3918%2026.0002%2049.4814L25.2502%2049.9282L24.5002%2049.4814C22.5726%2048.3657%2020.6898%2047.1741%2018.8565%2045.9095C16.9913%2044.6506%2015.2133%2043.2672%2013.5346%2041.7689C11.8696%2040.2859%2010.3125%2038.686%208.87521%2036.9814C7.46256%2035.3075%206.21313%2033.5024%205.14396%2031.5907C4.10728%2029.6608%203.28067%2027.6252%202.67834%2025.5189C2.07228%2023.3141%201.77156%2021.0366%201.78459%2018.7501V6.2501C3.13875%206.24802%204.44917%206.2001%205.71584%206.10635C6.96497%206.02144%208.20596%205.84282%209.42834%205.57198C10.6252%205.30323%2011.8221%204.94698%2013.0002%204.46573C14.2224%203.97169%2015.3944%203.36161%2016.5002%202.64385C17.8752%201.7501%2019.269%201.09073%2020.644%200.656354C22.1249%200.202884%2023.6671%20-0.0184897%2025.2158%200.00010449ZM45.5346%209.32198C43.1692%209.2062%2040.8258%208.81074%2038.5533%208.14385C36.2938%207.46807%2034.1412%206.47594%2032.1596%205.19698C31.1315%204.52388%2030.0158%203.99499%2028.844%203.6251C27.6727%203.27185%2026.4548%203.09697%2025.2315%203.10635C23.999%203.09884%2022.7722%203.27365%2021.5908%203.6251C20.4176%203.98396%2019.3036%204.5136%2018.2846%205.19698C16.2989%206.48164%2014.1409%207.47803%2011.8752%208.15635C9.66063%208.8001%207.33875%209.19385%204.90959%209.3376V18.7657C4.90959%2020.8345%205.17834%2022.822%205.71584%2024.7282C6.2639%2026.6208%207.01843%2028.4475%207.96584%2030.1751C8.92498%2031.9206%2010.0556%2033.5662%2011.3408%2035.0876C12.644%2036.622%2014.0346%2038.0501%2015.5346%2039.4064C17.0346%2040.7626%2018.6065%2042.0189%2020.2502%2043.1751C21.9106%2044.3334%2023.571%2045.3928%2025.2315%2046.3532C26.9314%2045.3653%2028.5881%2044.305%2030.1971%2043.1751C31.8537%2042.022%2033.434%2040.7632%2034.9283%2039.4064C36.4283%2038.0501%2037.8221%2036.622%2039.1252%2035.0876C40.4105%2033.5662%2041.5411%2031.9206%2042.5002%2030.1751C43.4428%2028.4493%2044.1862%2026.622%2044.7158%2024.7282C45.2702%2022.7896%2045.5459%2020.782%2045.5346%2018.7657V9.32198Z'%20fill='%23A5EB14'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M36.8658%2014.7157L35.4908%2013.5344L34.2221%2013.6438L20.5971%2029.7313L15.9564%2023.1063L14.7064%2022.8938L13.2596%2023.9282L13.0439%2025.1782L19.0096%2033.6969L19.6877%2034.0719L21.1158%2034.1594L21.8471%2033.8407L36.9564%2015.9813L36.8658%2014.7157Z'%20fill='%23A5EB14'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_561_224'%3e%3crect%20width='50'%20height='50'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
const Careers = () => {
  const WhyWork = [
    {
      icon: ImpactSvg,
      heading: "Impact That Matters",
      txt: "Your work directly powers businesses, startups, and fintechs across India."
    },
    {
      icon: InnovationSvg$1,
      heading: "Innovation-First Culture",
      txt: "We embrace creativity, challenge the status quo, and build solutions ahead of the curve."
    },
    {
      icon: CollabrativeSvg,
      heading: "Collaborative Growth",
      txt: "We believe in growing together—personally, professionally, and as a team."
    }
  ];
  const OurValues = [
    {
      icon: SpeedSvg,
      heading: "Speed with Precision",
      txt: "Move fast, but never cut corners."
    },
    {
      icon: ObsessionSvg,
      heading: "Customer Obsession",
      txt: "We measure success by our customers’ success"
    },
    {
      icon: TrustSvg,
      heading: "Transparency & Trust",
      txt: "Integrity is non-negotiable in everything we do."
    }
  ];
  const jobs = [
    {
      id: 1,
      role: "Product Manager",
      desc: "Own the roadmap for features that enhance money movement—partner with engineering, design, and customers.",
      location: "Remote / Full Time",
      link: ""
    },
    {
      id: 2,
      role: "Backend Developer (Node.js)",
      desc: "Own the roadmap for features that enhance money movement—partner with engineering, design, and customers.",
      location: "Remote / Full Time",
      link: ""
    },
    {
      id: 3,
      role: "UI/UX Designer",
      desc: "Own the roadmap for features that enhance money movement—partner with engineering, design, and customers.",
      location: "Remote / Full Time",
      link: ""
    }
  ];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("section", { className: "bg-[linear-gradient(#0A0C33CC,#0A0C33CC),url('./assets/images/careersHero.jpg')] bg-cover bg-center", children: /* @__PURE__ */ jsx("div", { className: "px-6 pt-30 py-20 sm:px-15 xl:px-25", children: /* @__PURE__ */ jsx("div", { className: "grid lg:grid-cols-2 gap-x-10 gap-y-5", children: /* @__PURE__ */ jsx("div", { className: "flex items-center col-span-1", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(
        "h1",
        {
          className: "\r\n                    relative px-7 before:content-[''] before:absolute before:left-[7px] before:top-1/2 before:-translate-y-1/2 before:w-[11px] before:h-[11px] before:rounded-full before:bg-[#CDFF66] \r\n                    after:content-[''] after:absolute after:right-[7px] after:top-1/2 after:-translate-y-1/2 after:w-[11px] after:h-[11px] after:rounded-full after:bg-[#CDFF66]\r\n                    text-sm my-3 text-[#1E1E1E] w-max rounded-2xl py-1 bg-white",
          children: "Careers"
        }
      ),
      /* @__PURE__ */ jsxs(TextFade, { children: [
        /* @__PURE__ */ jsxs("h1", { className: "text-4xl lg:text-[53px] font-semibold leading-12 text-white lg:leading-16 mb-3", children: [
          "Build the Future of Money Movement at",
          " ",
          /* @__PURE__ */ jsx("span", { className: "text-[#A5EB14]", children: "Bridg Money" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "my-3 lg:my-4 text-lg text-white", children: "we’re on a mission to transform the way businesses move money—making it faster, smarter, and more secure. Our team thrives on solving complex financial challenges with simple, powerful technology." })
      ] })
    ] }) }) }) }) }),
    /* @__PURE__ */ jsx("section", { className: "bg-[#FFFCF5]", children: /* @__PURE__ */ jsxs("div", { className: "px-6 sm:px-15 py-20 xl:px-20", children: [
      /* @__PURE__ */ jsxs("h2", { className: "text-5xl font-semibold mb-3", children: [
        "Why ",
        /* @__PURE__ */ jsx("span", { className: "text-[#A5EB14]", children: "Work" }),
        " With Us"
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-5 py-5", children: WhyWork.map((data, idx) => {
        return /* @__PURE__ */ jsxs("div", { className: "p-3 border rounded-2xl", children: [
          /* @__PURE__ */ jsx("div", { className: "p-2", children: /* @__PURE__ */ jsx("img", { src: data.icon, className: "h-10 w-10" }) }),
          /* @__PURE__ */ jsx("p", { className: "font-semibold text-lg mb-2", children: data.heading }),
          /* @__PURE__ */ jsx("p", { className: "mb-2", children: data.txt })
        ] }, idx);
      }) }),
      /* @__PURE__ */ jsxs("h2", { className: "text-5xl font-semibold mt-10 mb-3", children: [
        "Our ",
        /* @__PURE__ */ jsx("span", { className: "text-[#A5EB14]", children: "Values" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-5 py-5", children: OurValues.map((data, idx) => {
        return /* @__PURE__ */ jsxs("div", { className: "p-3 border rounded-2xl", children: [
          /* @__PURE__ */ jsx("div", { className: "p-2", children: /* @__PURE__ */ jsx("img", { src: data.icon, className: "h-10 w-10" }) }),
          /* @__PURE__ */ jsx("p", { className: "font-semibold text-lg mb-2", children: data.heading }),
          /* @__PURE__ */ jsx("p", { className: "mb-2", children: data.txt })
        ] }, idx);
      }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "mt-15 mb-20 lg:mb-30 px-6 sm:px-15 xl:px-20", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-y-10 lg:gap-x-15", children: [
      /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-5xl font-semibold mb-4", children: [
          "Open ",
          /* @__PURE__ */ jsx("span", { className: "text-[#A5EB14]", children: "Roles" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-lg mb-4", children: "We’re always looking for passionate problem-solvers, tech innovators, and fintech enthusiasts. If you don’t see a role that matches you today, drop us your resume—we’ll connect when the right opportunity comes along." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "", children: jobs.map((data, idx) => {
        return /* @__PURE__ */ jsxs("div", { className: "p-6 mb-5 bg-[#F6FDE8] rounded-2xl", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex gap-3 items-center mb-2", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-[#0A0C33] p-3 rounded-full", children: /* @__PURE__ */ jsx("img", { src: JobIcon, className: "h-5 w-5" }) }),
            /* @__PURE__ */ jsx("p", { children: data.role })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mb-3", children: data.desc }),
          /* @__PURE__ */ jsx("p", { children: "Location" }),
          /* @__PURE__ */ jsx("p", { className: "text-[#1E1E1E]", children: data.location }),
          /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx("button", { className: "rounded-3xl border border-gray-200 py-1 px-5", children: "Apply Now" }) })
        ] }, idx);
      }) })
    ] }) })
  ] });
};
const HeroSvg$3 = "/assets/missionHero-CQUHvTgX.svg";
const TrustedSvg = "data:image/svg+xml,%3csvg%20width='36'%20height='36'%20viewBox='0%200%2036%2036'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_566_4442)'%3e%3cpath%20d='M18.155%204.59357e-05C18.7445%204.59357e-05%2019.325%200.0382959%2019.865%200.128296C20.397%200.196829%2020.9218%200.31279%2021.4332%200.474796C21.9432%200.627796%2022.4487%200.825046%2022.9497%201.06655C23.438%201.2983%2023.9397%201.5818%2024.4415%201.89005C25.2897%202.43005%2026.1245%202.86655%2026.975%203.2153C28.6489%203.88679%2030.4196%204.2856%2032.2197%204.39655C33.1302%204.46405%2034.073%204.49855%2035.048%204.50005V13.5C35.048%2015.2085%2034.8297%2016.833%2034.3932%2018.3735C33.9739%2019.895%2033.3781%2021.3622%2032.618%2022.7453C31.8612%2024.1265%2030.9655%2025.427%2029.945%2026.6265C28.9094%2027.8539%2027.7876%2029.0059%2026.588%2030.0735C25.3715%2031.143%2024.0919%2032.1386%2022.7562%2033.0548C21.4182%2033.9848%2020.0727%2034.842%2018.7197%2035.6265L18.1797%2035.9483L17.6397%2035.6265C16.2518%2034.8233%2014.8962%2033.9653%2013.5762%2033.0548C12.2333%2032.1484%2010.9532%2031.1524%209.74447%2030.0735C8.54566%2029.0058%207.42457%2027.8539%206.38972%2026.6265C5.37261%2025.4213%204.47302%2024.1217%203.70322%2022.7453C2.95681%2021.3557%202.36165%2019.8901%201.92797%2018.3735C1.49161%2016.7861%201.27509%2015.1463%201.28447%2013.5V4.50005C2.25947%204.49855%203.20297%204.46405%204.11497%204.39655C5.01435%204.33541%205.90786%204.2068%206.78797%204.0118C7.64972%203.8183%208.51147%203.5618%209.35972%203.2153C10.2397%202.85959%2011.0836%202.42033%2011.8797%201.90355C12.8697%201.26005%2013.8732%200.785296%2014.8632%200.472546C15.9295%200.146047%2017.0399%20-0.0133419%2018.155%204.59357e-05ZM32.7845%206.7118C31.0814%206.62844%2029.3941%206.34371%2027.758%205.86355C26.1311%205.37698%2024.5812%204.66265%2023.1545%203.7418C22.4142%203.25716%2021.611%202.87636%2020.7672%202.61005C19.9239%202.3557%2019.0471%202.22979%2018.1662%202.23655C17.2788%202.23114%2016.3955%202.357%2015.545%202.61005C14.7002%202.86843%2013.8981%203.24976%2013.1645%203.7418C11.7348%204.66675%2010.181%205.38415%208.54972%205.87255C6.95522%206.33605%205.28347%206.61955%203.53447%206.72305V13.5113C3.53447%2015.0008%203.72797%2016.4318%204.11497%2017.8043C4.50958%2019.167%205.05284%2020.4821%205.73497%2021.726C6.42556%2022.9828%207.23957%2024.1676%208.16497%2025.263C9.10322%2026.3678%2010.1045%2027.396%2011.1845%2028.3725C12.2645%2029.349%2013.3962%2030.2535%2014.5797%2031.086C15.7752%2031.92%2016.9707%2032.6828%2018.1662%2033.3743C19.3901%2032.663%2020.583%2031.8996%2021.7415%2031.086C22.9342%2030.2558%2024.0721%2029.3494%2025.148%2028.3725C26.228%2027.396%2027.2315%2026.3678%2028.1697%2025.263C29.0951%2024.1676%2029.9091%2022.9828%2030.5997%2021.726C31.2784%2020.4835%2031.8136%2019.1678%2032.195%2017.8043C32.5941%2016.4085%2032.7926%2014.963%2032.7845%2013.5113V6.7118Z'%20fill='white'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M26.5434%2010.5954L25.5534%209.74487L24.6399%209.82362L14.8299%2021.4066L11.4886%2016.6366L10.5886%2016.4836L9.54685%2017.2284L9.3916%2018.1284L13.6869%2024.2619L14.1751%2024.5319L15.2034%2024.5949L15.7299%2024.3654L26.6086%2011.5066L26.5434%2010.5954Z'%20fill='white'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_566_4442'%3e%3crect%20width='36'%20height='36'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
const InnovationSvg = "data:image/svg+xml,%3csvg%20width='36'%20height='36'%20viewBox='0%200%2036%2036'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M7.71452%2021C6.58901%2019.1568%205.99561%2017.0381%206.00002%2014.8785C6.00002%208.3175%2011.373%203%2018%203C24.627%203%2030%208.3175%2030%2014.8785C30.0044%2017.0381%2029.411%2019.1568%2028.2855%2021M22.5%2028.5L22.305%2029.4705C22.095%2030.531%2021.9885%2031.0605%2021.75%2031.4805C21.3825%2032.1278%2020.7875%2032.6154%2020.0805%2032.8485C19.623%2033%2019.08%2033%2018%2033C16.92%2033%2016.377%2033%2015.9195%2032.85C15.2123%2032.6165%2014.6172%2032.1284%2014.25%2031.4805C14.0115%2031.0605%2013.905%2030.531%2013.695%2029.4705L13.5%2028.5M11.0745%2025.647C10.9365%2025.233%2010.8675%2025.0245%2010.875%2024.8565C10.8835%2024.6828%2010.9421%2024.5153%2011.0438%2024.3742C11.1455%2024.2331%2011.2859%2024.1245%2011.448%2024.0615C11.604%2024%2011.823%2024%2012.258%2024H23.742C24.1785%2024%2024.396%2024%2024.552%2024.06C24.7144%2024.1231%2024.8549%2024.2319%2024.9566%2024.3733C25.0583%2024.5147%2025.1168%2024.6825%2025.125%2024.8565C25.1325%2025.0245%2025.0635%2025.2315%2024.9255%2025.647C24.6705%2026.4135%2024.543%2026.7975%2024.3465%2027.108C23.9355%2027.7569%2023.2913%2028.2235%2022.5465%2028.4115C22.1895%2028.5%2021.7875%2028.5%2020.982%2028.5H15.018C14.2125%2028.5%2013.809%2028.5%2013.4535%2028.41C12.709%2028.2223%2012.0648%2027.7563%2011.6535%2027.108C11.457%2026.7975%2011.3295%2026.4135%2011.0745%2025.647Z'%20stroke='white'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M12.375%2014.625L15.75%2018V24M23.625%2014.625L20.25%2018V24M12.375%2015.75C12.6734%2015.75%2012.9595%2015.6315%2013.1705%2015.4205C13.3815%2015.2095%2013.5%2014.9234%2013.5%2014.625C13.5%2014.3266%2013.3815%2014.0405%2013.1705%2013.8295C12.9595%2013.6185%2012.6734%2013.5%2012.375%2013.5C12.0766%2013.5%2011.7905%2013.6185%2011.5795%2013.8295C11.3685%2014.0405%2011.25%2014.3266%2011.25%2014.625C11.25%2014.9234%2011.3685%2015.2095%2011.5795%2015.4205C11.7905%2015.6315%2012.0766%2015.75%2012.375%2015.75ZM23.625%2015.75C23.3266%2015.75%2023.0405%2015.6315%2022.8295%2015.4205C22.6185%2015.2095%2022.5%2014.9234%2022.5%2014.625C22.5%2014.3266%2022.6185%2014.0405%2022.8295%2013.8295C23.0405%2013.6185%2023.3266%2013.5%2023.625%2013.5C23.9234%2013.5%2024.2095%2013.6185%2024.4205%2013.8295C24.6315%2014.0405%2024.75%2014.3266%2024.75%2014.625C24.75%2014.9234%2024.6315%2015.2095%2024.4205%2015.4205C24.2095%2015.6315%2023.9234%2015.75%2023.625%2015.75Z'%20stroke='white'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e";
const TransactionSvg = "data:image/svg+xml,%3csvg%20width='36'%20height='36'%20viewBox='0%200%2036%2036'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M3%2010.5H30M24%203L31.5%2010.5L24%2018M33%2025.5H6M12%2018L4.5%2025.5L12%2033'%20stroke='white'%20stroke-width='2'/%3e%3c/svg%3e";
const SuccessSvg = "data:image/svg+xml,%3csvg%20width='36'%20height='36'%20viewBox='0%200%2036%2036'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M18%201L22.4187%204.2572L27.8889%204.247L29.5687%209.5068L34%2012.747L32.3%2018L34%2023.253L29.5687%2026.4932L27.8889%2031.753L22.4187%2031.7428L18%2035L13.5813%2031.7428L8.11114%2031.753L6.43131%2026.4932L2%2023.253L3.70002%2018L2%2012.747L6.43131%209.5068L8.11114%204.247L13.5813%204.2572L18%201Z'%20stroke='white'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M12.75%2018L16.5%2021.75L24%2014.25'%20stroke='white'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e";
const MissionWhySecImg = "/assets/mission-why-sec-B1COWuJS.png";
const Mission = () => {
  const OurMission = [
    {
      icon: TransactionSvg,
      heading: "Speed Without Compromise",
      txt: "Fast transactions, instant onboarding, and quick settlement cycles"
    },
    {
      icon: TrustedSvg,
      heading: "Security You Can Trust",
      txt: "Bank-grade encryption and compliance-first systems to protect every transaction."
    },
    {
      icon: InnovationSvg,
      heading: "Innovation at the Core",
      txt: "Future-ready APIs that adapt to your needs and scale with your business."
    },
    {
      icon: SuccessSvg,
      heading: "Customer First",
      txt: "We measure success by the value we deliver to you."
    }
  ];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("section", { className: " bg-[#FFFCF5]", children: /* @__PURE__ */ jsx("div", { className: "px-6 pt-25 py-20 sm:px-15 xl:px-25", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-x-10 gap-y-5", children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-center col-span-1", children: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(
          "h1",
          {
            className: "\r\n                    relative px-7 before:content-[''] before:absolute before:left-[7px] before:top-1/2 before:-translate-y-1/2 before:w-[11px] before:h-[11px] before:rounded-full before:bg-[#CDFF66] \r\n                    after:content-[''] after:absolute after:right-[7px] after:top-1/2 after:-translate-y-1/2 after:w-[11px] after:h-[11px] after:rounded-full after:bg-[#CDFF66]\r\n                    text-sm my-3 bg-[#1E1E1E] w-max rounded-2xl py-1 text-white",
            children: "Mission"
          }
        ),
        /* @__PURE__ */ jsxs(TextFade, { children: [
          /* @__PURE__ */ jsxs("h1", { className: "text-4xl lg:text-[53px] font-semibold leading-12 lg:leading-17 mb-3", children: [
            "Powering the Future of",
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-[#A5EB14]", children: "Money" }),
            " Movement"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "my-3 lg:my-4 text-lg", children: "At bridg.money, our mission is to enable businesses to move money seamlessly, securely, and at scale—bridging the gap between traditional banking and modern financial technology." })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center", children: /* @__PURE__ */ jsx("img", { src: HeroSvg$3, alt: "testimonal", className: "h-90" }) })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "mt-15 lg:mt-20 mb-20 lg:mb-30 px-6 sm:px-15 xl:px-20", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#0A0C33] grid lg:grid-cols-3 md:gap-x-15 gap-y-10 p-10 md:p-15 rounded-3xl", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-5xl font-semibold text-[#A5EB14] mb-5", children: "Our Mission" }),
        /* @__PURE__ */ jsxs("p", { className: "mb-3 text-lg text-white", children: [
          "At ",
          /* @__PURE__ */ jsx("strong", { children: "bridg.money" }),
          ", we believe that moving money should be as simple as sending a text—no delays, no unnecessary complexity. Our mission is to bridge the gap between banks and businesses with a unified platform that delivers:"
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "col-span-2 grid md:grid-cols-2 gap-5", children: OurMission.map((data, idx) => {
        return /* @__PURE__ */ jsxs("div", { className: "bg-[#1B1D41] rounded-2xl p-4", children: [
          /* @__PURE__ */ jsx("div", { className: "p-3", children: /* @__PURE__ */ jsx("img", { src: data.icon, className: "h-6 w-6" }) }),
          /* @__PURE__ */ jsx("p", { className: "text-white text-lg font-semibold mb-2", children: data.heading }),
          /* @__PURE__ */ jsx("p", { className: "text-white mb-2", children: data.txt })
        ] }, idx);
      }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "mt-15 mb-20 lg:mb-30 px-6 sm:px-15 xl:px-30", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-y-10", children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-center w-full md:px-5   lg:px-10", children: /* @__PURE__ */ jsx("img", { src: MissionWhySecImg, alt: "Why We Exist", className: "h-2/2" }) }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs(TextFade, { children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-5xl font-semibold mb-4", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[#A5EB14]", children: "Why" }),
            " We Exist"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-lg mb-4", children: "We’re on a mission to remove the roadblocks in business money movement—offering one unified platform that makes financial transactions as simple as sending a message." })
        ] }),
        /* @__PURE__ */ jsx("ul", { children: /* @__PURE__ */ jsxs(TextFade, { children: [
          /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-4 text-lg mb-2", children: [
            /* @__PURE__ */ jsx("img", { src: TickSvg, alt: "tick", className: "h-6 mt-1" }),
            "Fragmented systems slow innovation and create operational friction."
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-4 text-lg mb-2", children: [
            /* @__PURE__ */ jsx("img", { src: TickSvg, alt: "tick", className: "h-6 mt-1" }),
            "Complex compliance requirements make scaling harder than it should be."
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-4 text-lg mb-5", children: [
            /* @__PURE__ */ jsx("img", { src: TickSvg, alt: "tick", className: "h-6 mt-1" }),
            "Limited access to advanced banking infrastructure holds back ambitious businesses."
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(TextFade, { children: /* @__PURE__ */ jsx("p", { className: "text-lg", children: "With bridg.money, these barriers disappear—so you can focus on growth, not groundwork." }) })
      ] }) })
    ] }) })
  ] });
};
const HeroSvg$2 = "/assets/hero-CpZDk6Xw.svg";
const HowItWorksSvg = "/assets/how%20it%20works-Bf4fNVUw.svg";
const ConnectedBankingSvg$1 = "/assets/connected%20banking-BjHyVaL0.svg";
const BulkPaymentSvg = "/assets/bulk%20payment-DPGfcNRH.svg";
const SmartBillPaymentSvg = "/assets/smart%20bill%20payment-zZVhpUuM.svg";
const VendorPaymentSvg = "/assets/vendor%20payment-Bd7h1hYh.svg";
const BusinessOwnerIcon = "data:image/svg+xml,%3csvg%20width='50'%20height='50'%20viewBox='0%200%2050%2050'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M25.0003%2020.8332C29.6027%2020.8332%2033.3337%2017.1022%2033.3337%2012.4998C33.3337%207.89746%2029.6027%204.1665%2025.0003%204.1665C20.398%204.1665%2016.667%207.89746%2016.667%2012.4998C16.667%2017.1022%2020.398%2020.8332%2025.0003%2020.8332Z'%20fill='%23A5EB14'%20stroke='%23A5EB14'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M43.75%2045.833C43.75%2035.4778%2035.3552%2027.083%2025%2027.083C14.6448%2027.083%206.25%2035.4778%206.25%2045.833'%20stroke='%23A5EB14'%20stroke-width='2.5'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M24.9997%2045.833L29.1663%2040.6247L24.9997%2027.083L20.833%2040.6247L24.9997%2045.833Z'%20fill='%23A5EB14'%20stroke='%23A5EB14'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e";
const FinanceTeamIcon$1 = "data:image/svg+xml,%3csvg%20width='50'%20height='50'%20viewBox='0%200%2050%2050'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M12.5%2034.375L6.25%2040.5V22.9167H12.5M22.9167%2030.5417L19.6458%2027.75L16.6667%2030.5V14.5833H22.9167M33.3333%2027.0833L27.0833%2033.3333V6.25H33.3333M39.1875%2026.6875L35.4167%2022.9167H45.8333V33.3333L42.1042%2029.6042L27.0833%2044.5L19.8542%2038.2083L11.9792%2045.8333H6.25L19.7292%2032.625L27.0833%2038.8333'%20fill='%23A5EB14'/%3e%3c/svg%3e";
const OparationManagersIcon = "data:image/svg+xml,%3csvg%20width='50'%20height='50'%20viewBox='0%200%2050%2050'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M25%2035.9375H42.1875V7.8125H7.8125V35.9375H25ZM25%2035.9375V42.1875M25%2042.1875H15.625M25%2042.1875H34.375M14.0625%2026.5625L21.875%2020.3125L26.5625%2025L35.9375%2017.1875'%20stroke='%23A5EB14'%20stroke-width='3'/%3e%3c/svg%3e";
const ProductTeamsIcon = "data:image/svg+xml,%3csvg%20width='50'%20height='50'%20viewBox='0%200%2050%2050'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M22.6562%207.03125C23.0877%207.03125%2023.4375%207.38101%2023.4375%207.8125V22.6562C23.4375%2023.0877%2023.0877%2023.4375%2022.6562%2023.4375H7.8125C7.38101%2023.4375%207.03125%2023.0877%207.03125%2022.6562V7.8125C7.03125%207.38101%207.38101%207.03125%207.8125%207.03125H22.6562ZM20.1172%2010.3516H10.3516V20.1172H20.1172V10.3516ZM44.2057%2014.6331C44.5108%2014.9382%2044.5108%2015.4329%2044.2057%2015.7379L35.3668%2024.5768C35.0618%2024.8819%2034.5671%2024.8819%2034.262%2024.5768L25.4232%2015.7379C25.1181%2015.4329%2025.1181%2014.9382%2025.4232%2014.6331L34.2621%205.79424C34.5671%205.48916%2035.0618%205.48916%2035.3669%205.79424L44.2057%2014.6331ZM40.0625%2015.1855L34.8145%209.9375L29.5664%2015.1855L34.8145%2020.4336L40.0625%2015.1855ZM22.6562%2026.5625C23.0877%2026.5625%2023.4375%2026.9123%2023.4375%2027.3438V42.1875C23.4375%2042.619%2023.0877%2042.9688%2022.6562%2042.9688H7.8125C7.38101%2042.9688%207.03125%2042.619%207.03125%2042.1875V27.3438C7.03125%2026.9123%207.38101%2026.5625%207.8125%2026.5625H22.6562ZM20.1172%2029.8828H10.3516V39.6484H20.1172V29.8828ZM42.1875%2026.5625C42.619%2026.5625%2042.9688%2026.9123%2042.9688%2027.3438V42.1875C42.9688%2042.619%2042.619%2042.9688%2042.1875%2042.9688H27.3438C26.9123%2042.9688%2026.5625%2042.619%2026.5625%2042.1875V27.3438C26.5625%2026.9123%2026.9123%2026.5625%2027.3438%2026.5625H42.1875ZM39.6484%2029.8828H29.8828V39.6484H39.6484V29.8828Z'%20fill='%23A5EB14'/%3e%3c/svg%3e";
const CTADecorSvg = "data:image/svg+xml,%3csvg%20width='1320'%20height='495'%20viewBox='0%200%201320%20495'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M248.921%2072.2947C243.774%2078.7909%20-181.446%20333.144%20122.282%20295.166C426.011%20257.188%201493.18%20-176.062%201058.18%20110.273C623.176%20396.607%20655.094%20586.498%20948.526%20419.594C1183.27%20286.071%201289.32%20222.042%201313%20206.717'%20stroke='%23A5EB14'%20stroke-opacity='0.1'%20stroke-width='25'/%3e%3c/svg%3e";
const BridgPay = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const featureRef = useRef(null);
  const { scrollYProgress } = useScroll$1({
    target: featureRef,
    offset: ["start start", "end end"]
  });
  const features = [
    {
      id: 1,
      img: BulkPaymentSvg,
      heading: "Bulk Payments Made Easy",
      align: "left",
      bg: "#FFFCF5",
      clr: "black",
      text: /* @__PURE__ */ jsx("p", { className: "text-xl", children: "Handle payouts and payroll in minutes with a simple CSV file upload. Our bank-tested system ensures accuracy while reducing your workload by up to 75%." })
    },
    {
      id: 2,
      img: SmartBillPaymentSvg,
      heading: "Smart Bill Payments & Reconciliation",
      align: "right",
      bg: "#0A0C33",
      clr: "white",
      text: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("p", { className: "text-xl mb-3", children: "Simplify vendor payouts while keeping your books accurate." }),
        /* @__PURE__ */ jsx("p", { className: "text-xl", children: "Sync Tally, Zoho Books, or any major accounting tool and automatically reconcile bills with transactions on BridgPay." })
      ] })
    },
    {
      id: 3,
      img: VendorPaymentSvg,
      heading: "Stay Ahead of Vendor Payments",
      align: "left",
      bg: "#FFFCF5",
      clr: "black",
      text: /* @__PURE__ */ jsx("p", { className: "text-xl", children: "Monitor pending payouts and account balances with ease. Our dashboard ensures you never miss a due date and helps optimize cashflow management." })
    }
  ];
  const howItWorks = [
    {
      id: 1,
      heading: "Add Bills Swiftly",
      txt: "Create, upload, or import vendor invoices from Tally, Zoho Books, or Microsoft Dynamics 365"
    },
    {
      id: 1,
      heading: "Pay Vendors",
      txt: "You can directly pay your vendor from the bank of your choice via OPEN"
    },
    {
      id: 1,
      heading: "Reconcile Payments",
      txt: "Vendor payment reconciliation happens automatically on both OPEN as well as your accounting tool"
    }
  ];
  const buildForYourTeam = [
    {
      id: 1,
      icon: BusinessOwnerIcon,
      heading: "Business Owners",
      txt: "Gain full visibility into approvals and payments while staying focused on growth"
    },
    {
      id: 2,
      icon: FinanceTeamIcon$1,
      heading: "Finance Teams",
      txt: "Automate payouts and reconciliation to cut down on manual effort and errors"
    },
    {
      id: 3,
      icon: OparationManagersIcon,
      heading: "Operations Managers",
      txt: "Plan cashflow better and keep vendor and payroll disbursements on track"
    },
    {
      id: 4,
      icon: ProductTeamsIcon,
      heading: "Product Teams",
      txt: "Embed BridgPay APIs into your app or platform to power seamless transactions"
    }
  ];
  useEffect(() => {
    let progressValue = 0;
    let interval = setInterval(() => {
      progressValue += 2;
      setProgress(progressValue);
      if (progressValue >= 100) {
        clearInterval(interval);
        setProgress(0);
        setActiveIndex(
          (prev) => prev === howItWorks.length - 1 ? 0 : prev + 1
        );
      }
    }, 100);
    return () => clearInterval(interval);
  }, [activeIndex, howItWorks.length]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("section", { className: "px-6 pt-30 py-10 sm:px-15 xl:px-25", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 xl:gap-x-5 gap-y-5", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(TitleDecor, { title: "BridgPay" }),
        /* @__PURE__ */ jsxs("h1", { className: "text-4xl lg:text-5xl xl:text-6xl font-semibold leading-12 lg:leading-16 xl:leading-18", children: [
          "Fast-Track Your Business Payouts with",
          " ",
          /* @__PURE__ */ jsx("span", { className: "text-[#A5EB14]", children: "BridgPay" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "my-3 lg:my-4 lg:pr-5 text-xl", children: "Manage vendor disbursements seamlessly: Generate invoices, schedule payments, and track settlements in one unified flow — cutting down manual effort and ensuring error-free reconciliations." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center px-5", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: HeroSvg$2,
          alt: "bridgpay",
          className: "drop-shadow-[0px_4px_100px_#0A0C330D] scale-95 hover:scale-100 transition-all duration-300"
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "my-15 px-3 md:px-10", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#0A0C3306] py-10 md:py-15 rounded-2xl", children: [
      /* @__PURE__ */ jsx(TextFade, { children: /* @__PURE__ */ jsx("h2", { className: "text-center text-3xl lg:text-5xl pb-5 lg:pb-15 font-semibold", children: "How it Works" }) }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 xl:gap-x-5 gap-y-5", children: [
        /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center px-5", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: HowItWorksSvg,
            alt: "how it works",
            className: "drop-shadow-[0px_4px_100px_#0A0C330D]"
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: "px-5 flex flex-col justify-center", children: howItWorks.map((work, index) => {
          const isActive = activeIndex === index;
          return /* @__PURE__ */ jsxs(
            "div",
            {
              onClick: () => setActiveIndex(index),
              className: `
              overflow-hidden transition-all border duration-500 rounded-lg shadow-[0px_0px_25px_0px_#00000008]
              flex flex-col my-3 cursor-pointer relative
               p-5
            `,
              children: [
                /* @__PURE__ */ jsx(
                  "h3",
                  {
                    className: `text-[1.32rem] font-medium ${isActive ? "mb-3" : ""}`,
                    children: work.heading
                  }
                ),
                isActive && /* @__PURE__ */ jsx("p", { className: "text-gray-600 transition-opacity text-lg duration-700 mb-3", children: work.txt }),
                isActive && /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-full h-1 bg-gray-200", children: /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "h-1 bg-black transition-all duration-100",
                    style: { width: `${progress}%` }
                  }
                ) })
              ]
            },
            index
          );
        }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { className: "bg-[#0A0C33] py-15 lg:py-20 px-5 my-30", children: [
      /* @__PURE__ */ jsx(TextFade, { children: /* @__PURE__ */ jsxs("h2", { className: "text-center xl:px-50 text-white text-[33px] md:text-4xl lg:text-5xl xl:leading-16 font-semibold leading-12", children: [
        "Smart Banking Connections for Instant Transfers with",
        " ",
        /* @__PURE__ */ jsx("span", { className: "text-[#A5EB14]", children: "Connected Banking" })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-center py-10", children: /* @__PURE__ */ jsx(
        motion.img,
        {
          src: ConnectedBankingSvg$1,
          alt: "connected banking",
          initial: { scale: 0.9, opacity: 0.8 },
          whileInView: { scale: 1, opacity: 1 },
          transition: { duration: 0.3, ease: "easeIn" },
          viewport: { once: true, amount: 0.3 }
        }
      ) }),
      /* @__PURE__ */ jsxs(TextFade, { children: [
        /* @__PURE__ */ jsx("p", { className: "text-xl xl:px-50 text-center text-white pb-8", children: "Integrate your accounts with BridgPay to automate bulk payments. Pay vendors and run payroll in real time using IMPS, UPI, NEFT, or RTGS." }),
        /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx(Button, { text: "Get Started", bgClr: "#A5EB14" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      "section",
      {
        ref: featureRef,
        className: "relative flex flex-col justify-center",
        children: features.map((feature, idx) => {
          const targetScale = 1 - (features.length - idx) * 0.05;
          return /* @__PURE__ */ jsx(
            FeaturesCard$1,
            {
              idx,
              feature,
              range: [idx * 0.33, 1],
              targetScale,
              progress: scrollYProgress
            },
            feature.id
          );
        })
      }
    ),
    /* @__PURE__ */ jsxs("section", { className: "my-20 px-10 md:px-15", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-4xl md:text-5xl font-semibold text-center mb-5", children: "Build For Your Team" }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 gap-4 my-10", children: buildForYourTeam.map((team) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "hover:shadow-[0px_4px_100px_#0A0C330D] border rounded-3xl p-5",
          children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: team.icon,
                className: "py-3 h-15 w-15",
                alt: team.heading
              }
            ),
            /* @__PURE__ */ jsx("h6", { className: "text-xl font-semibold mb-2", children: team.heading }),
            /* @__PURE__ */ jsx("p", { className: "text-lg mb-3", children: team.txt })
          ]
        },
        team.id
      )) })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "px-6 sm:px-20 my-10 md:my-15 flex justify-center", children: /* @__PURE__ */ jsxs("div", { className: "w-5xl px-5 rounded-2xl border border-[#A5EB14] py-17 bg-[#F9FFED] relative", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: CTADecorSvg,
          className: "absolute object-cover z-0 pointer-events-none w-full h-full top-0 left-0 bottom-0 right-0"
        }
      ),
      /* @__PURE__ */ jsxs(TextFade, { direction: "up", children: [
        /* @__PURE__ */ jsxs("h1", { className: "text-center text-3xl md:text-5xl font-semibold mb-5", children: [
          "Ready to ",
          /* @__PURE__ */ jsx("span", { className: "text-[#A5EB14]", children: "Bridg" }),
          " the Gap?"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-center text-xl leading-8 mb-4 px-5 md:px-20 lg:px-30 xl:px-40", children: "Join thousands of businesses using bridg.money to streamline their financial operations. Start accepting payments and managing payouts in minutes." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx(Button, { text: "Book Demo", brClr: "black" }) })
    ] }) })
  ] });
};
const FeaturesCard$1 = ({ feature, idx, range, progress, targetScale }) => {
  const scale = useTransform(progress, range, [1, targetScale]);
  return /* @__PURE__ */ jsx(
    "section",
    {
      className: `px-1 my-10 md:px-10 sticky`,
      style: { top: `${idx * 40 + 100}px` },
      children: /* @__PURE__ */ jsx(
        motion.div,
        {
          className: "py-15 rounded-2xl border",
          style: { scale, backgroundColor: feature.bg, color: feature.clr },
          children: /* @__PURE__ */ jsxs("div", { className: "grid px-6 lg:px-15 lg:grid-cols-2 xl:gap-x-10 gap-y-5", children: [
            /* @__PURE__ */ jsxs(
              "div",
              {
                className: `flex flex-col justify-center lg:pe-5 ${feature.align === "left" ? "order-1" : "order-2"}`,
                children: [
                  /* @__PURE__ */ jsx(TitleDecor, { title: "Features" }),
                  /* @__PURE__ */ jsx("h2", { className: "text-4xl md:text-5xl font-semibold mb-5 leading-12 md:leading-14", children: feature.heading }),
                  /* @__PURE__ */ jsx(Fragment, { children: feature.text })
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: `px-5 flex justify-center ${feature.align === "left" ? "order-2" : "order-1"}`,
                children: /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: feature.img,
                    className: "h-70 lg:h-90 z-0 drop-shadow-[0px_4px_100px_#0A0C330D]",
                    alt: feature.heading
                  }
                )
              }
            )
          ] })
        }
      )
    }
  );
};
const HeroSvg$1 = "/assets/hero-BEniydJx.svg";
const ConnectAccountSvg = "/assets/Connect%20Your%20Account-B4KWdxmu.svg";
const SecureAccessSvg = "/assets/Authorize%20Secure%20Access-7mbOmLOH.svg";
const ConnectedBankingSvg = "/assets/Get%20Connected%20Banking-Cf1sdoGt.svg";
const AccountToAccountTransferSvg = "/assets/account%20to%20account%20transfer-CjAcXdFh.svg";
const ManageBankAccountSvg = "/assets/manage%20bank%20account-DbSnJ2tD.svg";
const BusinessIcon = "data:image/svg+xml,%3csvg%20width='44'%20height='48'%20viewBox='0%200%2044%2048'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M28.25%2016.1875V0.5625H0.125V47.4375H12.625V38.0625H15.75V47.4375H43.875V16.1875H28.25ZM7.9375%2041.1875H4.8125V38.0625H7.9375V41.1875ZM7.9375%2033.375H4.8125V30.25H7.9375V33.375ZM7.9375%2025.5625H4.8125V22.4375H7.9375V25.5625ZM7.9375%2017.75H4.8125V14.625H7.9375V17.75ZM7.9375%209.9375H4.8125V6.8125H7.9375V9.9375ZM20.4375%206.8125H23.5625V9.9375H20.4375V6.8125ZM15.75%2033.375H12.625V30.25H15.75V33.375ZM15.75%2025.5625H12.625V22.4375H15.75V25.5625ZM15.75%2017.75H12.625V14.625H15.75V17.75ZM15.75%209.9375H12.625V6.8125H15.75V9.9375ZM23.5625%2041.1875H20.4375V38.0625H23.5625V41.1875ZM23.5625%2033.375H20.4375V30.25H23.5625V33.375ZM23.5625%2025.5625H20.4375V22.4375H23.5625V25.5625ZM23.5625%2017.75H20.4375V14.625H23.5625V17.75ZM40.75%2044.3125H28.25V41.1875H31.375V38.0625H28.25V33.375H31.375V30.25H28.25V25.5625H31.375V22.4375H28.25V19.3125H40.75V44.3125Z'%20fill='%23A5EB14'/%3e%3c/svg%3e";
const FinanceTeamIcon = "data:image/svg+xml,%3csvg%20width='50'%20height='50'%20viewBox='0%200%2050%2050'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M12.5%2034.375L6.25%2040.5V22.9167H12.5M22.9167%2030.5417L19.6458%2027.75L16.6667%2030.5V14.5833H22.9167M33.3333%2027.0833L27.0833%2033.3333V6.25H33.3333M39.1875%2026.6875L35.4167%2022.9167H45.8333V33.3333L42.1042%2029.6042L27.0833%2044.5L19.8542%2038.2083L11.9792%2045.8333H6.25L19.7292%2032.625L27.0833%2038.8333'%20fill='%23A5EB14'/%3e%3c/svg%3e";
const PlatformAndFintechsIcon = "data:image/svg+xml,%3csvg%20width='50'%20height='50'%20viewBox='0%200%2050%2050'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M21.875%2040.625V37.5H28.125V40.625H37.5V43.75H12.5V40.625H21.875ZM6.25%2034.375V6.25H43.75V34.375H6.25Z'%20fill='%23A5EB14'/%3e%3c/svg%3e";
const BridgConnect = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [progress, setProgress] = useState(0);
  const featureRef = useRef(null);
  const { scrollYProgress } = useScroll$1({
    target: featureRef,
    offset: ["start start", "end end"]
  });
  const features = [
    {
      id: 1,
      img: AccountToAccountTransferSvg,
      heading: "Seamless Account-to-Account Transfers",
      align: "left",
      text: /* @__PURE__ */ jsx("p", { className: "text-xl", children: "Send money instantly to vendors, contractors, or employees—directly into their bank accounts. Whether it’s IMPS, NEFT, RTGS, or UPI." })
    }
  ];
  const howItWorks = [
    {
      id: 1,
      heading: "Connect Your Account",
      txt: "Easily link your business current account with BridgConnect in just a few clicks.",
      img: ConnectAccountSvg
    },
    {
      id: 2,
      heading: "Authorize Secure Access",
      txt: "Confirm and approve the connection to enable safe, real-time sync of your banking data.",
      img: SecureAccessSvg
    },
    {
      id: 3,
      heading: "Get Connected Banking",
      txt: "View balances across multiple banks, track cashflows, and experience seamless money movement from a single dashboard.",
      img: ConnectedBankingSvg
    }
  ];
  const buildForYourTeam = [
    {
      id: 1,
      icon: BusinessIcon,
      heading: "Businesses & Startups",
      txt: "Manage all your accounts and payments from one place."
    },
    {
      id: 2,
      icon: FinanceTeamIcon,
      heading: "Finance Teams",
      txt: "Automate reconciliation, gain visibility, and save hours of manual work."
    },
    {
      id: 3,
      icon: PlatformAndFintechsIcon,
      heading: "Platforms & Fintechs",
      txt: "Integrate APIs for collections, payouts, and connected banking at scale."
    }
  ];
  useEffect(() => {
    let progressValue = 0;
    let interval = setInterval(() => {
      progressValue += 2;
      setProgress(progressValue);
      if (progressValue >= 100) {
        clearInterval(interval);
        setProgress(0);
        setActiveIndex(
          (prev) => prev === howItWorks.length - 1 ? 0 : prev + 1
        );
      }
    }, 100);
    return () => clearInterval(interval);
  }, [activeIndex, howItWorks.length]);
  const activeStep = howItWorks[activeIndex];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("section", { className: "px-6 pt-30 py-10 sm:px-15 xl:px-25", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 xl:gap-x-5 gap-y-5", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(TitleDecor, { title: "BridgConnect" }),
        /* @__PURE__ */ jsx("h1", { className: "text-4xl lg:text-5xl xl:text-5xl font-semibold leading-12 lg:leading-14", children: "One Dashboard. Every Bank Account. Total Control." }),
        /* @__PURE__ */ jsxs("p", { className: "my-3 lg:my-4 lg:pr-5 text-xl", children: [
          "Link all your current accounts with",
          " ",
          /* @__PURE__ */ jsx("span", { className: "font-[600]", children: "BridgConnect" }),
          " and simplify the way you handle money. Monitor cashflow in real time, initiate payments, track bills and invoices automatically, and close reconciliations without hassle. Take charge of your finances with a single, seamless platform."
        ] }),
        /* @__PURE__ */ jsx(Button, { text: "Get Started", bgClr: "#A5EB14" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center px-5", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: HeroSvg$1,
          alt: "bridgpay",
          className: "drop-shadow-[0px_4px_100px_#0A0C330D] scale-95 hover:scale-100 transition-all duration-300"
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "my-15", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#0A0C3306] px-3 md:px-10 py-10 md:py-15 rounded-2xl", children: [
      /* @__PURE__ */ jsx(TextFade, { children: /* @__PURE__ */ jsx("h2", { className: "text-center text-3xl lg:text-5xl pb-5 lg:pb-15 font-semibold", children: "How it Works" }) }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 xl:gap-x-5 gap-y-5", children: [
        /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center px-5", children: /* @__PURE__ */ jsxs("div", { className: "pe-10", children: [
          /* @__PURE__ */ jsx(TitleDecor, { title: `Step ${activeStep.id}` }),
          /* @__PURE__ */ jsx("h2", { className: "text-4xl font-semibold mb-3", children: activeStep.heading }),
          /* @__PURE__ */ jsx("p", { className: "text-xl mb-15", children: activeStep.txt })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: activeStep.img,
            alt: activeStep.heading,
            className: "h-80 w-80"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "px-5 grid lg:grid-cols-3 py-10 gap-10 justify-center", children: howItWorks.map((work, index) => {
        const isActive = activeIndex === index;
        return /* @__PURE__ */ jsxs(
          "div",
          {
            onClick: () => setActiveIndex(index),
            className: "transition-all border h-1 bg-gray-200 duration-500 my-8 cursor-pointer relative",
            children: [
              isActive && /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-full h-1 bg-gray-200", children: /* @__PURE__ */ jsx(
                "div",
                {
                  className: "h-1 bg-black transition-all duration-100",
                  style: { width: `${progress}%` }
                }
              ) }),
              /* @__PURE__ */ jsx("p", { className: "pt-5", children: `0${work.id}` }),
              /* @__PURE__ */ jsx("p", { className: "pb-5", children: work.heading })
            ]
          },
          index
        );
      }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "px-7 lg:px-25", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-15", children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: " text-4xl lg:text-5xl font-semibold mb-3", children: "Manage All Your Accounts in One Place" }),
        /* @__PURE__ */ jsx("p", { className: "text-xl mb-5", children: "Stop juggling multiple internet banking logins and passwords. With BridgConnect, you can:" }),
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsxs("li", { className: "flex gap-2 text-lg mb-3", children: [
            /* @__PURE__ */ jsx("img", { src: TickSvg, alt: "tick", className: "h-6 w-6" }),
            "View balances across all your business accounts instantly"
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex gap-2 text-lg mb-3", children: [
            /* @__PURE__ */ jsx("img", { src: TickSvg, alt: "tick", className: "h-6 w-6" }),
            "Pay vendors and manage disbursements with ease"
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex gap-2 text-lg mb-3", children: [
            /* @__PURE__ */ jsx("img", { src: TickSvg, alt: "tick", className: "h-6 w-6" }),
            "Track customer payments and reconcile faster"
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-xl", children: "All from a secure, unified dashboard built for businesses." })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: ManageBankAccountSvg,
          className: "w-full lg:w-4/5",
          alt: "Manage All Your Accounts in One Place"
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsx(
      "section",
      {
        ref: featureRef,
        className: "relative flex flex-col justify-center",
        children: features.map((feature, idx) => {
          const targetScale = 1 - (features.length - idx) * 0.05;
          return /* @__PURE__ */ jsx(
            FeaturesCard,
            {
              idx,
              feature,
              range: [idx * 0.33, 1],
              targetScale,
              progress: scrollYProgress
            },
            feature.id
          );
        })
      }
    ),
    /* @__PURE__ */ jsx("section", { className: "px-7 lg:px-15", children: /* @__PURE__ */ jsxs("div", { className: "bg-[url('./assets/svg/bridgConnect/bankSupport.jpg')] bg-fixed bg-no-repeat bg-cover relative bg-center text-white rounded-2xl py-15 grid grid-cols-2 grid-rows-2 lg:grid-rows-3 p-5", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0)] to-[rgba(0,0,0,0.3)] z-0" }),
      /* @__PURE__ */ jsxs("div", { className: "row-start-3 col-span-2 lg:col-span-1 z-1", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-4xl font-semibold", children: "All major banks supported" }),
        /* @__PURE__ */ jsxs("p", { className: "text-lg", children: [
          "Your business doesn’t have to switch banks to go digital. With",
          /* @__PURE__ */ jsx("strong", { children: "BridgConnect" }),
          ", securely link accounts from all major banks and manage them effortlessly in one place."
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { className: "my-20 px-10 md:px-15", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-4xl md:text-5xl font-semibold text-center mb-5", children: "Built for Businesses" }),
      /* @__PURE__ */ jsxs("p", { className: "text-xl text-center mb-5", children: [
        "From small businesses to enterprises, ",
        /* @__PURE__ */ jsx("strong", { children: "BridgConnect" }),
        " ",
        "adapts to the way you bank."
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-4 my-10", children: buildForYourTeam.map((team) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "hover:shadow-[0px_4px_100px_#0A0C330D] border rounded-3xl p-5",
          children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: team.icon,
                className: "py-3 h-15 w-15",
                alt: team.heading
              }
            ),
            /* @__PURE__ */ jsx("h6", { className: "text-xl font-semibold mb-2", children: team.heading }),
            /* @__PURE__ */ jsx("p", { className: "text-lg mb-3", children: team.txt })
          ]
        },
        team.id
      )) })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "px-6 sm:px-20 my-10 md:my-15 flex justify-center", children: /* @__PURE__ */ jsxs("div", { className: "w-5xl px-5 rounded-2xl border border-[#A5EB14] py-17 bg-[#F9FFED] relative", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: CTADecorSvg,
          className: "absolute object-cover z-0 pointer-events-none w-full h-full top-0 left-0 bottom-0 right-0"
        }
      ),
      /* @__PURE__ */ jsx(TextFade, { direction: "up", children: /* @__PURE__ */ jsx("h1", { className: "text-center text-3xl md:text-5xl leading-12 lg:leading-14 font-semibold mb-5", children: "One Dashboard for All Your Banking & Payments." }) }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx(Button, { text: "Get Started", bgClr: "#A5EB14" }) })
    ] }) })
  ] });
};
const FeaturesCard = ({ feature, idx, range, progress, targetScale }) => {
  const scale = useTransform(progress, range, [1, targetScale]);
  return /* @__PURE__ */ jsx(
    "section",
    {
      className: `px-1 my-10 md:px-10 sticky`,
      style: { top: `${idx * 40 + 100}px` },
      children: /* @__PURE__ */ jsx(motion.div, { className: "bg-[#F9F9FA] py-15 rounded-2xl", style: { scale }, children: /* @__PURE__ */ jsxs("div", { className: "grid px-6 lg:px-15 lg:grid-cols-2 xl:gap-x-10 gap-y-5", children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: `flex flex-col justify-center lg:pe-5 ${feature.align === "left" ? "order-1" : "order-2"}`,
            children: [
              /* @__PURE__ */ jsx(TitleDecor, { title: "Features" }),
              /* @__PURE__ */ jsx("h2", { className: "text-4xl md:text-5xl font-semibold mb-5 leading-12 md:leading-14", children: feature.heading }),
              /* @__PURE__ */ jsx(Fragment, { children: feature.text })
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: `px-5 flex justify-center ${feature.align === "left" ? "order-2" : "order-1"}`,
            children: /* @__PURE__ */ jsx(
              "img",
              {
                src: feature.img,
                className: "h-70 lg:h-90 z-0 drop-shadow-[0px_4px_100px_#0A0C330D]",
                alt: feature.heading
              }
            )
          }
        )
      ] }) })
    }
  );
};
const HeroSvg = "/assets/hero-BVZPg-XX.svg";
const CreateInvoiceSvg = "data:image/svg+xml,%3csvg%20width='50'%20height='50'%20viewBox='0%200%2050%2050'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M20.5417%2044.6458L18.75%2045.8333L12.5%2041.6667L6.25%2045.8333V6.25H43.75V21.25C42.4375%2020.6875%2040.9167%2020.6875%2039.5833%2021.2917V10.4167H10.4167V38.0417L12.5%2036.6667L18.75%2040.8333L20.5417%2039.5833V44.6458ZM24.7083%2041.5833L37.5%2028.8125L41.7292%2033.0625L28.9583%2045.8333H24.7083V41.5833ZM43.1875%2031.6042L45.2292%2029.5625C45.6458%2029.1667%2045.6458%2028.4792%2045.2292%2028.0625L42.4792%2025.3125C42.433%2025.2596%2042.3762%2025.217%2042.3125%2025.1875C42.1194%2025.0537%2041.8866%2024.9891%2041.6521%2025.0042C41.4177%2025.0193%2041.1952%2025.1133%2041.0208%2025.2708L40.9792%2025.3125L38.9375%2027.3542L43.1875%2031.6042Z'%20fill='%230A0C33'/%3e%3c/svg%3e";
const TrackInvoiceAndPaymentSvg = "data:image/svg+xml,%3csvg%20width='50'%20height='50'%20viewBox='0%200%2050%2050'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M39.5833%2027.0833C41.0417%2027.0833%2042.4375%2027.3333%2043.75%2027.7917V6.25H6.25V45.8333L12.5%2041.6667L18.75%2045.8333L25%2041.6667L27.7083%2043.4583C27.2917%2042.25%2027.0833%2040.9375%2027.0833%2039.5833C27.0833%2039.0833%2027.0833%2038.5417%2027.1667%2038.1042L25%2036.6667L18.75%2040.8333L12.5%2036.6667L10.4167%2038.0417V10.4167H39.5833V27.0833ZM32.2917%2039.5833L38.0208%2045.8333L47.9167%2035.8958L45.5%2032.9583L38.0208%2040.4375L34.7083%2037.125L32.2917%2039.5833Z'%20fill='%230A0C33'/%3e%3c/svg%3e";
const GetPaidFasterSvg = "data:image/svg+xml,%3csvg%20width='50'%20height='50'%20viewBox='0%200%2050%2050'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M41.666%208.33325H8.33268C6.02018%208.33325%204.18685%2010.1874%204.18685%2012.4999L4.16602%2037.4999C4.16602%2039.8124%206.02018%2041.6666%208.33268%2041.6666H41.666C43.9785%2041.6666%2045.8327%2039.8124%2045.8327%2037.4999V12.4999C45.8327%2010.1874%2043.9785%208.33325%2041.666%208.33325ZM41.666%2037.4999H8.33268V24.9999H41.666V37.4999ZM41.666%2016.6666H8.33268V12.4999H41.666V16.6666Z'%20fill='%230A0C33'/%3e%3c/svg%3e";
const AccountingIntegrationSvg = "/assets/accounting%20Integration-4JjIiXTJ.svg";
const SmarterPaymentLinkSvg = "/assets/collect%20smarter%20with%20payment%20links-DBFPnhgL.svg";
const PaymentOptionSvg = "/assets/Payment%20Options-Dy26ddkP.svg";
const BankSettlementSvg = "data:image/svg+xml,%3csvg%20width='100'%20height='100'%20viewBox='0%200%20100%20100'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M84.3757%2076.5667H15.6257C13.3245%2076.5667%2011.459%2078.4321%2011.459%2080.7333V84.9C11.459%2087.2012%2013.3245%2089.0667%2015.6257%2089.0667H84.3757C86.6768%2089.0667%2088.5423%2087.2012%2088.5423%2084.9V80.7333C88.5423%2078.4321%2086.6768%2076.5667%2084.3757%2076.5667Z'%20stroke='%2329C76F'%20stroke-width='3'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M21.8757%2041.1417V76.6001M78.1257%2041.1417V76.6001M60.4173%2041.1417V76.6001M39.584%2041.1417V76.6001M46.0007%2013.1251L13.6257%2030.8334C12.97%2031.1922%2012.4228%2031.7207%2012.0416%2032.3636C11.6604%2033.0065%2011.4592%2033.7401%2011.459%2034.4876V38.6417C11.459%2039.3048%2011.7224%2039.9406%2012.1912%2040.4095C12.6601%2040.8783%2013.2959%2041.1417%2013.959%2041.1417H86.0423C86.7054%2041.1417%2087.3413%2040.8783%2087.8101%2040.4095C88.2789%2039.9406%2088.5423%2039.3048%2088.5423%2038.6417V34.4876C88.5421%2033.7401%2088.3409%2033.0065%2087.9597%2032.3636C87.5785%2031.7207%2087.0314%2031.1922%2086.3757%2030.8334L54.0007%2013.1251C52.7742%2012.454%2051.3987%2012.1023%2050.0007%2012.1023C48.6026%2012.1023%2047.2271%2012.454%2046.0007%2013.1251Z'%20stroke='%2329C76F'%20stroke-width='3'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e";
const ReconcileSvg = "data:image/svg+xml,%3csvg%20width='100'%20height='100'%20viewBox='0%200%20100%20100'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M87.5%2029.1668V26.5418C87.5%2021.571%2087.5%2019.0835%2086.8417%2017.0835C86.2424%2015.2269%2085.2238%2013.5332%2083.8646%2012.1336C82.5055%2010.734%2080.8424%209.6661%2079.0042%209.01266C77.0542%208.3335%2074.6417%208.3335%2069.8125%208.3335H30.1875C25.3583%208.3335%2022.9458%208.3335%2020.9958%209.01266C19.158%209.66568%2017.4952%2010.7329%2016.1361%2012.1318C14.777%2013.5306%2013.7581%2015.2235%2013.1583%2017.0793C12.5%2019.0877%2012.5%2021.571%2012.5%2026.5418V62.5002M87.5%2045.8335V84.8918C87.5%2088.4668%2083.3958%2090.3668%2080.8%2087.9918C80.0717%2087.3189%2079.1166%2086.9452%2078.125%2086.9452C77.1334%2086.9452%2076.1783%2087.3189%2075.45%2087.9918L73.4375%2089.8335C72.1616%2091.0133%2070.4878%2091.6686%2068.75%2091.6686C67.0122%2091.6686%2065.3384%2091.0133%2064.0625%2089.8335C62.7866%2088.6537%2061.1128%2087.9983%2059.375%2087.9983C57.6372%2087.9983%2055.9634%2088.6537%2054.6875%2089.8335C53.4116%2091.0133%2051.7378%2091.6686%2050%2091.6686C48.2622%2091.6686%2046.5884%2091.0133%2045.3125%2089.8335C44.0366%2088.6537%2042.3628%2087.9983%2040.625%2087.9983C38.8872%2087.9983%2037.2134%2088.6537%2035.9375%2089.8335C34.6616%2091.0133%2032.9878%2091.6686%2031.25%2091.6686C29.5122%2091.6686%2027.8384%2091.0133%2026.5625%2089.8335L24.55%2087.9918C23.8217%2087.3189%2022.8666%2086.9452%2021.875%2086.9452C20.8834%2086.9452%2019.9283%2087.3189%2019.2%2087.9918C16.6042%2090.3668%2012.5%2088.4668%2012.5%2084.8918V79.1668'%20stroke='%23F6A01A'%20stroke-width='3'%20stroke-linecap='round'/%3e%3cpath%20d='M39.584%2043.3335L45.5382%2050.0002L60.4173%2033.3335'%20stroke='%23F6A01A'%20stroke-width='3'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M31.25%2064.5835H37.5M68.75%2064.5835H50'%20stroke='%23F6A01A'%20stroke-width='3'%20stroke-linecap='round'/%3e%3c/svg%3e";
const EInvoicingSvg = "/assets/e-invoicing-BGgoycSH.svg";
const InstantSettlementSvg = "/assets/instant%20settlements-BmhkIAan.svg";
const PaymentWithFullControlImg = "/assets/online-payment-with-full-control-bridg-collect-BbZvOGk_.jpg";
const fullControlSvg1 = "data:image/svg+xml,%3csvg%20width='26'%20height='26'%20viewBox='0%200%2026%2026'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M13%200.8125C6.28%200.8125%200.8125%206.28%200.8125%2013C0.8125%2019.72%206.28%2025.1875%2013%2025.1875C19.72%2025.1875%2025.1875%2019.72%2025.1875%2013C25.1875%206.28%2019.72%200.8125%2013%200.8125ZM13%202.6875C18.7066%202.6875%2023.3125%207.29344%2023.3125%2013C23.3125%2018.7066%2018.7066%2023.3125%2013%2023.3125C7.29344%2023.3125%202.6875%2018.7066%202.6875%2013C2.6875%207.29344%207.29344%202.6875%2013%202.6875ZM12.0625%207.375V12.0625H7.375V13.9375H12.0625V18.625H13.9375V13.9375H18.625V12.0625H13.9375V7.375H12.0625Z'%20fill='%230A0C33'/%3e%3c/svg%3e";
const fullControlSvg2 = "data:image/svg+xml,%3csvg%20width='28'%20height='22'%20viewBox='0%200%2028%2022'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M11.4305%200.0625H16.5705C18.868%200.0625%2020.688%200.0625001%2022.1117%200.25375C23.5767%200.45125%2024.763%200.86625%2025.6992%201.80125C26.6342%202.7375%2027.0492%203.92375%2027.2467%205.38875C27.3592%206.23%2027.4055%207.20875%2027.4242%208.3425C27.4397%208.43759%2027.4414%208.53443%2027.4292%208.63C27.4367%209.33667%2027.4396%2010.1033%2027.438%2010.93V11.07C27.438%2013.3675%2027.438%2015.1875%2027.2467%2016.6112C27.0492%2018.0763%2026.6342%2019.2625%2025.6992%2020.1987C24.763%2021.1337%2023.5767%2021.5487%2022.1117%2021.7463C20.6867%2021.9375%2018.868%2021.9375%2016.5705%2021.9375H11.4305C9.13295%2021.9375%207.31295%2021.9375%205.8892%2021.7463C4.4242%2021.5487%203.23795%2021.1337%202.3017%2020.1987C1.3667%2019.2625%200.951705%2018.0763%200.754205%2016.6112C0.562955%2015.1863%200.562955%2013.3675%200.562955%2011.07V10.93C0.561288%2010.1033%200.564205%209.33667%200.571705%208.63C0.559099%208.53449%200.560362%208.43765%200.575455%208.3425C0.595455%207.20875%200.641705%206.23%200.754205%205.38875C0.951705%203.92375%201.3667%202.7375%202.3017%201.80125C3.23795%200.86625%204.4242%200.45125%205.8892%200.25375C7.31421%200.0625001%209.13295%200.0625%2011.4305%200.0625ZM2.44045%209.4375C2.43879%209.9225%202.43795%2010.4433%202.43795%2011C2.43795%2013.3837%202.44045%2015.0775%202.61295%2016.3625C2.7817%2017.6188%203.0992%2018.3438%203.62795%2018.8725C4.1567%2019.4013%204.8817%2019.7188%206.1392%2019.8875C7.4242%2020.06%209.1167%2020.0625%2011.5005%2020.0625H16.5005C18.8842%2020.0625%2020.578%2020.06%2021.863%2019.8875C23.1192%2019.7188%2023.8442%2019.4013%2024.373%2018.8725C24.9017%2018.3438%2025.2192%2017.6187%2025.388%2016.3612C25.5605%2015.0762%2025.563%2013.3837%2025.563%2011C25.563%2010.4433%2025.5621%209.9225%2025.5605%209.4375H2.44045ZM25.5305%207.5625H2.47045C2.49545%206.82875%202.53795%206.195%202.61295%205.6375C2.7817%204.38125%203.0992%203.65625%203.62795%203.1275C4.1567%202.59875%204.8817%202.28125%206.1392%202.1125C7.4242%201.94%209.1167%201.9375%2011.5005%201.9375H16.5005C18.8842%201.9375%2020.578%201.94%2021.863%202.1125C23.1192%202.28125%2023.8442%202.59875%2024.373%203.1275C24.9017%203.65625%2025.2192%204.38125%2025.388%205.63875C25.463%206.195%2025.5055%206.82875%2025.5305%207.5625ZM5.56295%2016C5.56295%2015.7514%205.66173%2015.5129%205.83754%2015.3371C6.01336%2015.1613%206.25181%2015.0625%206.50045%2015.0625H11.5005C11.7491%2015.0625%2011.9876%2015.1613%2012.1634%2015.3371C12.3392%2015.5129%2012.438%2015.7514%2012.438%2016C12.438%2016.2486%2012.3392%2016.4871%2012.1634%2016.6629C11.9876%2016.8387%2011.7491%2016.9375%2011.5005%2016.9375H6.50045C6.25181%2016.9375%206.01336%2016.8387%205.83754%2016.6629C5.66173%2016.4871%205.56295%2016.2486%205.56295%2016ZM13.688%2016C13.688%2015.7514%2013.7867%2015.5129%2013.9625%2015.3371C14.1384%2015.1613%2014.3768%2015.0625%2014.6255%2015.0625H16.5005C16.7491%2015.0625%2016.9876%2015.1613%2017.1634%2015.3371C17.3392%2015.5129%2017.438%2015.7514%2017.438%2016C17.438%2016.2486%2017.3392%2016.4871%2017.1634%2016.6629C16.9876%2016.8387%2016.7491%2016.9375%2016.5005%2016.9375H14.6255C14.3768%2016.9375%2014.1384%2016.8387%2013.9625%2016.6629C13.7867%2016.4871%2013.688%2016.2486%2013.688%2016Z'%20fill='%230A0C33'/%3e%3c/svg%3e";
const fullControlSvg3 = "data:image/svg+xml,%3csvg%20width='26'%20height='26'%20viewBox='0%200%2026%2026'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M9.70875%200.8125H12.375C12.6236%200.8125%2012.8621%200.911272%2013.0379%201.08709C13.2137%201.2629%2013.3125%201.50136%2013.3125%201.75C13.3125%201.99864%2013.2137%202.2371%2013.0379%202.41291C12.8621%202.58873%2012.6236%202.6875%2012.375%202.6875H9.75C8.335%202.6875%207.32875%202.6875%206.5425%202.7525C5.7675%202.815%205.28625%202.93625%204.905%203.13C4.14079%203.51945%203.51945%204.14079%203.13%204.905C2.93625%205.28625%202.81625%205.7675%202.7525%206.5425C2.68875%207.33%202.6875%208.335%202.6875%209.75V16.25C2.6875%2017.6663%202.6875%2018.6713%202.7525%2019.4575C2.815%2020.2325%202.93625%2020.7137%203.13%2021.095C3.51945%2021.8592%204.14079%2022.4805%204.905%2022.87C5.28625%2023.0637%205.7675%2023.1838%206.5425%2023.2475C7.33%2023.3113%208.335%2023.3125%209.75%2023.3125H16.25C17.6663%2023.3125%2018.6713%2023.3125%2019.4575%2023.2475C20.2325%2023.185%2020.7137%2023.0637%2021.095%2022.87C21.8592%2022.4805%2022.4805%2021.8592%2022.87%2021.095C23.0637%2020.7137%2023.1838%2020.2325%2023.2475%2019.4575C23.3113%2018.67%2023.3125%2017.665%2023.3125%2016.25V13.625C23.3125%2013.3764%2023.4113%2013.1379%2023.5871%2012.9621C23.7629%2012.7863%2024.0014%2012.6875%2024.25%2012.6875C24.4986%2012.6875%2024.7371%2012.7863%2024.9129%2012.9621C25.0887%2013.1379%2025.1875%2013.3764%2025.1875%2013.625V16.2913C25.1875%2017.6562%2025.1875%2018.7388%2025.1163%2019.61C25.0438%2020.5025%2024.8913%2021.2563%2024.5413%2021.9462C23.9718%2023.0631%2023.0634%2023.9711%2021.9462%2024.54C21.2563%2024.8913%2020.5025%2025.0438%2019.61%2025.1163C18.7388%2025.1875%2017.6562%2025.1875%2016.2913%2025.1875H9.70875C8.34375%2025.1875%207.26125%2025.1875%206.39%2025.1163C5.4975%2025.0438%204.74375%2024.8913%204.055%2024.5413C2.93767%2023.972%202.02927%2023.0636%201.46%2021.9462C1.10875%2021.2563%200.95625%2020.5025%200.88375%2019.61C0.8125%2018.7388%200.8125%2017.6562%200.8125%2016.2913V9.70875C0.8125%208.34375%200.8125%207.26125%200.88375%206.39C0.95625%205.4975%201.10875%204.74375%201.45875%204.055C2.02834%202.93748%202.93721%202.02906%204.055%201.46C4.7425%201.10875%205.4975%200.95625%206.39%200.88375C7.26125%200.8125%208.34375%200.8125%209.70875%200.8125ZM16.4375%205.1875C16.4375%204.61297%2016.5507%204.04406%2016.7705%203.51326C16.9904%202.98246%2017.3127%202.50016%2017.7189%202.09391C18.1252%201.68765%2018.6075%201.36539%2019.1383%201.14553C19.6691%200.925663%2020.238%200.8125%2020.8125%200.8125C21.387%200.8125%2021.9559%200.925663%2022.4867%201.14553C23.0175%201.36539%2023.4998%201.68765%2023.9061%202.09391C24.3123%202.50016%2024.6346%202.98246%2024.8545%203.51326C25.0743%204.04406%2025.1875%204.61297%2025.1875%205.1875C25.1875%206.34782%2024.7266%207.46062%2023.9061%208.28109C23.0856%209.10156%2021.9728%209.5625%2020.8125%209.5625C19.6522%209.5625%2018.5394%209.10156%2017.7189%208.28109C16.8984%207.46062%2016.4375%206.34782%2016.4375%205.1875Z'%20fill='%230A0C33'/%3e%3c/svg%3e";
const fullControlSvg4 = "data:image/svg+xml,%3csvg%20width='24'%20height='28'%20viewBox='0%200%2024%2028'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M17.9437%201.5H6.05625C4.6075%201.5%203.88375%201.5%203.29875%201.70375C2.74741%201.89965%202.24856%202.21983%201.84084%202.63948C1.43311%203.05913%201.12744%203.567%200.9475%204.12375C0.75%204.72625%200.75%205.47125%200.75%206.9625V24.4675C0.75%2025.54%201.98125%2026.11%202.76%2025.3975C2.97848%2025.1956%203.26503%2025.0835%203.5625%2025.0835C3.85997%2025.0835%204.14652%2025.1956%204.365%2025.3975L4.96875%2025.95C5.35151%2026.304%205.85367%2026.5005%206.375%2026.5005C6.89633%2026.5005%207.39849%2026.304%207.78125%2025.95C8.16401%2025.596%208.66617%2025.3995%209.1875%2025.3995C9.70883%2025.3995%2010.211%2025.596%2010.5938%2025.95C10.9765%2026.304%2011.4787%2026.5005%2012%2026.5005C12.5213%2026.5005%2013.0235%2026.304%2013.4062%2025.95C13.789%2025.596%2014.2912%2025.3995%2014.8125%2025.3995C15.3338%2025.3995%2015.836%2025.596%2016.2188%2025.95C16.6015%2026.304%2017.1037%2026.5005%2017.625%2026.5005C18.1463%2026.5005%2018.6485%2026.304%2019.0312%2025.95L19.635%2025.3975C19.8535%2025.1956%2020.14%2025.0835%2020.4375%2025.0835C20.735%2025.0835%2021.0215%2025.1956%2021.24%2025.3975C22.0188%2026.11%2023.25%2025.54%2023.25%2024.4675V6.9625C23.25%205.47125%2023.25%204.725%2023.0525%204.125C22.8727%203.56802%2022.5671%203.0599%2022.1594%202.64002C21.7517%202.22015%2021.2527%201.89978%2020.7013%201.70375C20.1163%201.5%2019.3925%201.5%2017.9437%201.5Z'%20stroke='%230A0C33'%20stroke-width='1.5'/%3e%3cpath%20d='M8.875%2012L10.6612%2014L15.125%209'%20stroke='%230A0C33'%20stroke-width='1.5'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M6.375%2018.375H17.625'%20stroke='%230A0C33'%20stroke-width='1.5'%20stroke-linecap='round'/%3e%3c/svg%3e";
const fullControlSvg5 = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M17.9655%2015.3149L16.6398%2013.9893L19.2911%2011.3362C21.4886%209.14054%2021.7848%205.87617%2019.9548%204.04429C18.123%202.21429%2014.8586%202.51054%2012.6611%204.70804L10.0117%207.35929L8.68609%206.03367L11.3373%203.38242C14.268%200.453668%2018.7192%200.157418%2021.2823%202.71867C23.8455%205.28179%2023.5473%209.73304%2020.6186%2012.6637L17.9673%2015.3149H17.9655ZM15.3142%2017.9662L12.663%2020.6174C9.73234%2023.5462%205.28109%2023.8424%202.71796%2021.2812C0.154837%2018.718%200.452962%2014.2668%203.38171%2011.3362L6.03296%208.68492L7.35859%2010.0105L4.70734%2012.6637C2.50984%2014.8593%202.21359%2018.1237%204.04359%2019.9555C5.87546%2021.7855%209.13984%2021.4893%2011.3373%2019.2918L13.9886%2016.6405L15.3142%2017.9662ZM15.3142%207.35929L16.6398%208.68492L8.68421%2016.6405L7.35859%2015.3149L15.3142%207.35929Z'%20fill='%230A0C33'/%3e%3c/svg%3e";
const fullControlSvg6 = "data:image/svg+xml,%3csvg%20width='26'%20height='26'%20viewBox='0%200%2026%2026'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M23.3125%2020.9702H2.6875C1.99714%2020.9702%201.4375%2021.5299%201.4375%2022.2202V23.4702C1.4375%2024.1606%201.99714%2024.7202%202.6875%2024.7202H23.3125C24.0029%2024.7202%2024.5625%2024.1606%2024.5625%2023.4702V22.2202C24.5625%2021.5299%2024.0029%2020.9702%2023.3125%2020.9702Z'%20stroke='%230A0C33'%20stroke-width='1.5'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M4.5625%2010.3427V20.9802M21.4375%2010.3427V20.9802M16.125%2010.3427V20.9802M9.875%2010.3427V20.9802M11.8%201.93769L2.0875%207.25019C1.89079%207.35782%201.72666%207.51638%201.61229%207.70925C1.49793%207.90213%201.43756%208.12221%201.4375%208.34644V9.59269C1.4375%209.7916%201.51652%209.98237%201.65717%2010.123C1.79782%2010.2637%201.98859%2010.3427%202.1875%2010.3427H23.8125C24.0114%2010.3427%2024.2022%2010.2637%2024.3428%2010.123C24.4835%209.98237%2024.5625%209.7916%2024.5625%209.59269V8.34644C24.5624%208.12221%2024.5021%207.90213%2024.3877%207.70925C24.2733%207.51638%2024.1092%207.35782%2023.9125%207.25019L14.2%201.93769C13.8321%201.73637%2013.4194%201.63086%2013%201.63086C12.5806%201.63086%2012.1679%201.73637%2011.8%201.93769Z'%20stroke='%230A0C33'%20stroke-width='1.5'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e";
const BridgCollect = () => {
  const features = [
    {
      id: 1,
      img: PaymentOptionSvg,
      heading: "Flexible Payment Options",
      cols: 2,
      bg: "#F9F9FF",
      text: /* @__PURE__ */ jsx("p", { className: "text-lg", children: "Let your customers pay the way they prefer—via UPI, bank transfers, or credit cards. Even split payments or settle against credit notes with ease." })
    },
    {
      id: 2,
      icon: BankSettlementSvg,
      heading: "Direct Bank Settlements",
      cols: 1,
      bg: "#E9FFF3",
      text: /* @__PURE__ */ jsx("p", { className: "text-lg", children: "Every online payment is settled automatically into your bank account, ensuring accuracy and eliminating manual intervention." })
    },
    {
      id: 3,
      icon: ReconcileSvg,
      heading: "Reconcile Without the Effort",
      cols: 1,
      bg: "#FFFBF6",
      text: /* @__PURE__ */ jsx("p", { className: "text-lg", children: "Automate reconciliation across all payments by syncing directly with tools like Tally and Zoho Books—cutting down on manual work and saving valuable time." })
    },
    {
      id: 4,
      img: EInvoicingSvg,
      heading: "Smart e-Invoicing",
      cols: 2,
      bg: "#FAFAFA",
      text: /* @__PURE__ */ jsx("p", { className: "text-lg", children: "Save time with built-in GST e-invoicing. Auto-generate e-way bills with accurate details and share them effortlessly to keep your supply chain moving." })
    },
    {
      id: 5,
      img: InstantSettlementSvg,
      heading: "Instant Settlement",
      center: true,
      cols: 2,
      bg: "#FFF7F7",
      text: /* @__PURE__ */ jsx("p", { className: "text-lg", children: "Boost your cashflow with immediate access to online customer payments with Open’s instant settlement option. This means you get cash-like access to all your customer payments - even if the customers pay using credit cards or net banking." })
    }
  ];
  const howItWorks = [
    {
      id: 1,
      heading: "Create invoice",
      txt: "Create and send customised invoices with GST split-up and payment link via email, SMS and WhatsApp.",
      icon: CreateInvoiceSvg
    },
    {
      id: 2,
      heading: "Track invoices and payments",
      txt: "Track the status of payments on the Dashboard and send auto-payment reminders to customers.",
      icon: TrackInvoiceAndPaymentSvg
    },
    {
      id: 3,
      heading: "Get paid faster",
      txt: "Accept and receive payments online, directly to your connected bank account, with an automated settlement process.",
      icon: GetPaidFasterSvg
    }
  ];
  const buildForYourTeam = [
    {
      id: 1,
      icon: BusinessOwnerIcon,
      heading: "Business Owners",
      txt: "Gain full visibility into approvals and payments while staying focused on growth"
    },
    {
      id: 2,
      icon: FinanceTeamIcon$1,
      heading: "Finance Teams",
      txt: "Automate payouts and reconciliation to cut down on manual effort and errors"
    },
    {
      id: 3,
      icon: OparationManagersIcon,
      heading: "Operations Managers",
      txt: "Plan cashflow better and keep vendor and payroll disbursements on track"
    },
    {
      id: 4,
      icon: ProductTeamsIcon,
      heading: "Product Teams",
      txt: "Embed BridgPay APIs into your app or platform to power seamless transactions"
    }
  ];
  const PaymentWithFullControl = [
    {
      id: 1,
      icon: fullControlSvg1,
      text: " Generate and manage estimates, challans, sales orders, and invoices from one platform"
    },
    {
      id: 2,
      icon: fullControlSvg2,
      text: " Record and reconcile cash payments, partial payments, and credit notes with ease"
    },
    {
      id: 3,
      icon: fullControlSvg3,
      text: " Stay on top of due and overdue invoices with smart tracking and automated reminders"
    },
    {
      id: 4,
      icon: fullControlSvg4,
      text: " Enable automatic reconciliation by syncing payments directly with your accounting software"
    },
    {
      id: 5,
      icon: fullControlSvg5,
      text: " Share invoices with secure payment links for quick online collections"
    },
    {
      id: 6,
      icon: fullControlSvg6,
      text: " Receive funds directly into your connected bank account with seamless settlement"
    }
  ];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("section", { className: "px-6 pt-30 py-10 sm:px-15 xl:px-25", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 xl:gap-x-5 gap-y-5", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(TitleDecor, { title: "BridgCollect" }),
        /* @__PURE__ */ jsx("h1", { className: "text-4xl lg:text-5xl xl:text-5xl font-semibold leading-12 lg:leading-14", children: "Simplify Collections. Accelerate Cashflows." }),
        /* @__PURE__ */ jsx("p", { className: "my-3 lg:my-4 lg:pr-5 text-xl", children: "Generate GST-ready invoices, share them with built-in payment links, and let customers pay via UPI, bank transfers, cards, or netbanking. Stay on top with automated reminders, real-time tracking, and seamless settlements—all from one platform." }),
        /* @__PURE__ */ jsx(Button, { text: "Get Started", bgClr: "#A5EB14", url: "/contact" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center px-5", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: HeroSvg,
          alt: "bridgpay",
          className: "drop-shadow-[0px_4px_100px_#0A0C330D] scale-95 hover:scale-100 transition-all duration-300"
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "my-15", children: /* @__PURE__ */ jsxs("div", { className: "bg-[url('./assets/images/how-it-works-bridg-collect.jpg')] overflow-hidden bg-fixed bg-no-repeat bg-cover px-3 md:px-10 py-10 md:py-25 rounded-2xl relative z-[-2]", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[#FFFFFFBF] z-[-1]" }),
      /* @__PURE__ */ jsx(TextFade, { children: /* @__PURE__ */ jsx("h2", { className: "text-center text-3xl lg:text-5xl pb-5 lg:pb-15 font-semibold z-1", children: "How it Works" }) }),
      /* @__PURE__ */ jsx("div", { className: "grid lg:grid-cols-3 xl:gap-x-5 z-10 px-5 gap-y-5 pb-10", children: howItWorks.map((works) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "bg-white p-5 text-center rounded-3xl border border-[linear-gradient(180deg, #9F9F9F 0%, #FFFFFF 100%)]",
          children: [
            /* @__PURE__ */ jsx("div", { className: "flex justify-center my-3", children: /* @__PURE__ */ jsx("img", { src: works.icon, className: "h-10 w-10" }) }),
            /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold my-3", children: works.heading }),
            /* @__PURE__ */ jsx("p", { children: works.txt })
          ]
        },
        works.id
      )) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "px-7 lg:px-25", children: /* @__PURE__ */ jsx("div", { className: "grid gap-10 justify-center md:grid-cols-3", children: features.map((feature, idx) => {
      const isLast = idx === features.length - 1;
      return /* @__PURE__ */ jsxs(
        "div",
        {
          className: `p-7 rounded-3xl w-full hover:shadow-lg ${feature.cols === 2 ? "lg:col-span-2 grid gap-6 md:grid-cols-2" : ""} ${isLast ? "md:col-start-2" : ""} `,
          style: { backgroundColor: feature.bg },
          children: [
            /* @__PURE__ */ jsxs("div", { children: [
              feature.icon ? /* @__PURE__ */ jsx("div", { className: "flex justify-center my-3", children: /* @__PURE__ */ jsx("img", { src: feature.icon, className: "h-15 w-15" }) }) : null,
              /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold my-3", children: feature.heading }),
              feature.text
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex lg:justify-end", children: /* @__PURE__ */ jsx("img", { src: feature.img }) })
          ]
        },
        feature.id
      );
    }) }) }),
    /* @__PURE__ */ jsx("section", { className: "my-10 px-7 lg:px-25", children: /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-3 md:gap-15", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(TitleDecor, { title: "Feature" }),
        /* @__PURE__ */ jsx("h2", { className: "text-4xl font-semibold mb-5", children: "Accept Payments Online With Full Control" }),
        /* @__PURE__ */ jsx(
          "img",
          {
            src: PaymentWithFullControlImg,
            className: "h-50 rounded-2xl object-center object-cover",
            alt: "Accept Payments Online With Full Control"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "md:col-span-2 mt-10", children: /* @__PURE__ */ jsx(VerticalCarousel, { items: PaymentWithFullControl, children: (item, isActive) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: `ticker-card border hover:shadow-xl border-gray-200 rounded-lg p-4 flex gap-5 items-center flex-shrink-0 bg-white transition-all duration-300
      `,
          children: [
            /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 flex justify-center items-center bg-[#EEEFFF] rounded-md p-3", children: /* @__PURE__ */ jsx("img", { src: item.icon, className: "h-5 w-5" }) }),
            /* @__PURE__ */ jsx("p", { className: "text-lg m-0", children: item.text })
          ]
        },
        item.id
      ) }) })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { className: "bg-[#0A0C33] py-15 lg:py-20 px-5 my-20", children: [
      /* @__PURE__ */ jsx(TextFade, { children: /* @__PURE__ */ jsx("h2", { className: "text-center xl:px-50 text-white text-[33px] md:text-4xl lg:text-5xl xl:leading-16 font-semibold leading-12", children: "Collect Smarter with Payment Links" }) }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-center py-10", children: /* @__PURE__ */ jsx(
        motion.img,
        {
          src: SmarterPaymentLinkSvg,
          alt: "connected banking",
          initial: { scale: 0.9, opacity: 0.8 },
          whileInView: { scale: 1, opacity: 1 },
          transition: { duration: 0.3, ease: "easeIn" },
          viewport: { once: true, amount: 0.3 }
        }
      ) }),
      /* @__PURE__ */ jsxs(TextFade, { children: [
        /* @__PURE__ */ jsx("p", { className: "text-xl xl:px-50 text-center text-white pb-8", children: "Send invoices with built-in payment links and let customers pay you instantly—anytime, anywhere. With just a few clicks, payments can be made through bank transfers, UPI, credit cards, or other online methods, all settling directly into your connected bank account. No delays, no manual follow-ups—just faster payments with automated settlement." }),
        /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx(Button, { bgClr: "#A5EB14", text: "Get Started", url: "/contact" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "relative flex flex-col justify-center", children: /* @__PURE__ */ jsx("section", { className: "px-1 my-10 md:px-10", children: /* @__PURE__ */ jsx(motion.div, { className: "bg-[#F9F9FA] py-15 rounded-2xl", children: /* @__PURE__ */ jsxs("div", { className: "grid px-6 lg:px-15 lg:grid-cols-2 xl:gap-x-10 gap-y-5", children: [
      /* @__PURE__ */ jsx("div", { className: `px-5 flex justify-center`, children: /* @__PURE__ */ jsx(
        "img",
        {
          src: AccountingIntegrationSvg,
          className: "h-70 lg:h-90 z-0 drop-shadow-[0px_4px_100px_#0A0C330D]",
          alt: "Real-Time Accounting Integration"
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: `flex flex-col justify-center lg:pe-5`, children: [
        /* @__PURE__ */ jsx(TitleDecor, { title: "Features" }),
        /* @__PURE__ */ jsx("h2", { className: "text-4xl md:text-5xl font-semibold mb-5 leading-12 md:leading-14", children: "Real-Time Accounting Integration" }),
        /* @__PURE__ */ jsx("p", { className: "text-xl", children: "BridgCollect connects seamlessly with leading accounting tools like Tally and Zoho Books. Every transaction is automatically recorded, invoices are updated instantly, and your books stay accurate without manual intervention." })
      ] })
    ] }) }) }) }),
    /* @__PURE__ */ jsxs("section", { className: "my-20 px-10 md:px-15", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-4xl md:text-5xl font-semibold text-center mb-5", children: "Build For Your Team" }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 gap-4 my-15", children: buildForYourTeam.map((team) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "hover:shadow-xl border rounded-2xl p-5",
          children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: team.icon,
                className: "py-3 h-15 w-15",
                alt: team.heading
              }
            ),
            /* @__PURE__ */ jsx("h6", { className: "text-xl font-semibold mb-2", children: team.heading }),
            /* @__PURE__ */ jsx("p", { className: "text-lg mb-3", children: team.txt })
          ]
        },
        team.id
      )) })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "px-6 sm:px-20 my-10 md:my-15 flex justify-center", children: /* @__PURE__ */ jsxs("div", { className: "w-5xl px-5 rounded-2xl md:px-40 border border-[#A5EB14] py-17 bg-[#F9FFED] relative", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: CTADecorSvg,
          className: "absolute object-cover z-0 pointer-events-none w-full h-full top-0 left-0 bottom-0 right-0"
        }
      ),
      /* @__PURE__ */ jsx(TextFade, { direction: "up", children: /* @__PURE__ */ jsx("h1", { className: "text-center text-3xl md:text-5xl leading-12 lg:leading-14 font-semibold mb-5", children: "Start Accepting Online Payments, Today!" }) }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx(Button, { text: "Get Started", bgClr: "#A5EB14", url: "/contact" }) })
    ] }) })
  ] });
};
const PrivacyPolicy = () => {
  return /* @__PURE__ */ jsxs("div", { className: "contaier px-7 md:px-10", children: [
    /* @__PURE__ */ jsx("h1", { className: "font-bold md:pl-3 text-3xl md:text-4xl lg:text-5xl pt-5 pb-7 lg:pb-10", children: "Privacy Policy" }),
    /* @__PURE__ */ jsx("section", { children: /* @__PURE__ */ jsx(SidebarHighlight$6, {}) })
  ] });
};
const headings$6 = [
  {
    id: "1",
    heading: "Introduction & Scope",
    desc: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("p", { className: "mb-3", children: "Bridg Financial Technologies Private Limited (“bridg.money”, “we”, “our”, or “us”) is committed to safeguarding the privacy and security of personal, financial, and business data. This Privacy Policy describes how we collect, process, use, disclose, and protect information in compliance with Indian regulations, including the Digital Personal Data Protection Act, 2023 (DPDP Act), the Information Technology Act, 2000, RBI Master Directions, PMLA Rules, FIU-IND guidelines, and global best practices. It applies to all visitors, customers, merchants, partners, and users of our website, applications, and services." }) })
  },
  {
    id: "2",
    heading: "Who We Are",
    desc: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("p", { className: "mb-3", children: "bridg.money is a Technology Service Provider (TSP) offering secure and scalable API-based financial infrastructure for payouts, collections, reconciliation, escrow/pooled accounts, and connected banking solutions. We work in close partnership with RBI-licensed banks, card networks, NPCI, and other regulated service providers to deliver compliant and reliable money movement infrastructure." }) })
  },
  {
    id: "3",
    heading: "Applicability & Consent",
    desc: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("p", { className: "mb-3", children: "By accessing or using our platform, services, or website, you consent to the collection and processing of your personal and business information as outlined in this policy. Where required by law, we seek explicit consent and provide clear notice at the point of data collection. You may withdraw consent at any time; however, certain services may not be available without required information. Consent withdrawal is always subject to applicable legal and regulatory requirements." }) })
  },
  {
    id: "4",
    heading: "Data We Collect",
    desc: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("ul", { className: "mb-3 list-disc pl-4 md:pl-10", children: [
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Identity & KYC Information:" }),
        " Name, date of birth, PAN, Aadhaar, passport, voter ID, GSTIN, CIN, registered business details, shareholding patterns, beneficial ownership data, and address proofs."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: " Business & Financial Data:" }),
        " Bank account numbers, UPI handles, virtual account identifiers, settlement instructions, and transaction history."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "AML & Screening Data:" }),
        " Results of sanctions checks, Politically Exposed Person (PEP) identification, adverse media scans, and internal blacklist/watchlist screenings."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Technical Information:" }),
        " Device identifiers, IP address, operating system, browser type, cookies, geolocation (where permitted), and system usage logs."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Communication Records:" }),
        " Emails, chat records, grievance submissions, call logs, and customer support tickets."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-3", children: [
        /* @__PURE__ */ jsx("strong", { children: "Third-Party Data:" }),
        " Information shared by partner banks, verification agencies, payment networks, and fraud detection providers."
      ] })
    ] }) })
  },
  {
    id: "5",
    heading: "Purpose of Collection & Use",
    desc: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("ul", { className: "mb-3 list-disc pl-4 md:pl-10", children: [
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "To onboard merchants, partners, and customers in compliance with regulatory requirements." }),
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "To perform due diligence, KYC, and AML checks before granting access to services." }),
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "To process payments, settlements, collections, and payouts securely." }),
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "To monitor transactions in real-time for fraud, suspicious activity, and risk management." }),
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "To generate reports, statements, and records required by regulators (RBI, FIU-IND)." }),
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "To enhance service performance, improve user experience, and provide customer support." }),
      /* @__PURE__ */ jsx("li", { className: "mb-3", children: "To send service-related communications and, with consent, relevant marketing material." })
    ] }) })
  },
  {
    id: "6",
    heading: "AML & KYC Compliance",
    desc: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("ul", { className: "mb-3 list-disc pl-4 md:pl-10", children: [
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Customer Due Diligence (CDD):" }),
        " We verify the identity of individuals and businesses through official documents, government databases, and third-party verification providers. For businesses, we also verify directors, partners, and beneficial owners."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Enhanced Due Diligence (EDD):" }),
        " Customers identified as high-risk undergo stricter checks, including deeper financial scrutiny, source of funds verification, and frequent review cycles."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Sanctions & Screening:" }),
        " Every customer and beneficial owner is screened against OFAC, UN, EU, RBI, and SEBI sanctions lists. We also check against adverse media and PEP lists."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Transaction Monitoring:" }),
        " We use automated and manual monitoring systems to detect suspicious patterns such as unusual transaction sizes, frequency anomalies, or cross-border risks."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Regulatory Reporting:" }),
        " We file Suspicious Transaction Reports (STRs), Cash Transaction Reports (CTRs), and other mandated reports to FIU-IND promptly, maintaining strict confidentiality."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Record Keeping:" }),
        " In compliance with PMLA, we retain transaction records for 10 years and KYC/relationship records for 5 years post account closure."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-3", children: [
        /* @__PURE__ */ jsx("strong", { children: "Ongoing Compliance:" }),
        " Our AML program includes employee training, regular audits, maker-checker controls, and board-level oversight to ensure adherence to evolving regulations."
      ] })
    ] }) })
  },
  {
    id: "7",
    heading: "Customer Acceptance Policy",
    desc: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("ul", { className: "mb-3 list-disc pl-4 md:pl-10", children: [
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: " Permitted Customers:" }),
        " Businesses operating in lawful industries such as e-commerce, SaaS, education, healthcare, lending, gig economy, and financial services. These entities must provide complete KYC/KYB documentation."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: " Restricted/High-Risk Customers:" }),
        " Entities engaged in cross-border remittances, gaming, or other higher-risk industries are subject to Enhanced Due Diligence and stricter monitoring."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: " Prohibited Customers:" }),
        " bridg.money does not onboard entities involved in gambling, pornography, narcotics, arms and ammunition, money mules, shell companies, cryptocurrency exchanges (unless permitted under Indian law), and any activities restricted by RBI or other regulators."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: " Risk Categorization:" }),
        " All customers are classified into Low, Medium, or High risk categories based on industry, geography, business model, transaction volume, and ownership. High-risk customers are reviewed more frequently."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-3", children: [
        /* @__PURE__ */ jsx("strong", { children: "Transparency Requirement:" }),
        " Businesses must have clear ownership structures and lawful sources of funds. Anonymous or fictitious accounts are not permitted."
      ] })
    ] }) })
  },
  {
    id: "8",
    heading: "Data Storage & Security",
    desc: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("ul", { className: "mb-3 list-disc pl-4 md:pl-10", children: [
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "All data is encrypted both at rest and in transit using industry-standard protocols." }),
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Systems are hosted in data centers compliant with RBI’s data localization guidelines." }),
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Security controls include multi-factor authentication, access logging, firewalls, intrusion detection, and real-time monitoring." }),
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Incident response procedures are in place, with CERT-In aligned reporting within 6 hours of identifying a breach." }),
      /* @__PURE__ */ jsx("li", { className: "mb-3", children: "We periodically undergo independent security audits and assessments (ISO 27001, PCI DSS compliance)." })
    ] }) })
  },
  {
    id: "9",
    heading: "Sharing & Disclosure",
    desc: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("ul", { className: "mb-3 list-disc pl-4 md:pl-10", children: [
        /* @__PURE__ */ jsx("li", { className: "mb-2", children: "With partner banks, NBFCs, and regulated institutions for processing transactions." }),
        /* @__PURE__ */ jsx("li", { className: "mb-2", children: "With KYC/AML verification agencies, fraud detection service providers, and auditors bound by confidentiality." }),
        /* @__PURE__ */ jsx("li", { className: "mb-2", children: "With regulators, courts, and law enforcement agencies when legally required." }),
        /* @__PURE__ */ jsx("li", { className: "mb-2", children: "With consultants or vendors under strict data processing agreements." })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mb-3", children: "We do not sell or misuse customer data under any circumstances." })
    ] })
  },
  {
    id: "10",
    heading: "International Transfers",
    desc: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("p", { className: "mb-3", children: "Where necessary, data may be transferred outside India to service providers or affiliates. Such transfers are subject to strict contractual safeguards, including Standard Contractual Clauses (SCCs) or equivalent mechanisms, and always in compliance with Indian law, including government restrictions on cross-border transfers." }) })
  },
  {
    id: "11",
    heading: "Data Retention",
    desc: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("ul", { className: "mb-3 list-disc pl-4 md:pl-10", children: [
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Transaction Data: Retained for a minimum of 10 years." }),
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "KYC & Onboarding Data: Retained for 5 years after termination of the business relationship." }),
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Other Data: Retained only as long as necessary to meet operational, legal, or regulatory obligations." })
    ] }) })
  },
  {
    id: "12",
    heading: "Cookies & Analytics",
    desc: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("p", { className: "pb-3", children: "We use cookies, tracking pixels, and analytics tools (such as Google Analytics) to improve user experience, analyse traffic, and enhance platform security. Users can control cookie preferences through browser settings. Some cookies are essential for platform functionality and cannot be disabled." }) })
  },
  {
    id: "13",
    heading: "Children’s Data",
    desc: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("p", { className: "mb-3", children: "Our services are intended for businesses and adults. We do not knowingly collect data from children under 18. If we discover such data has been collected inadvertently, we delete it immediately unless retention is legally required. If parental consent is identified as necessary under law, we will ensure appropriate steps are taken." }) })
  },
  {
    id: "14",
    heading: "User Rights",
    desc: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("p", { className: "mb-2", children: "Users and customers have the right to:" }),
      /* @__PURE__ */ jsxs("ul", { className: "mb-3 list-disc pl-4 md:pl-10", children: [
        /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Request access to personal and business data held by us." }),
        /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Correct inaccurate or incomplete data." }),
        /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Request deletion of data, subject to mandatory legal retention requirements." }),
        /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Withdraw consent for optional data processing, including marketing." }),
        /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Opt-out of marketing communications via unsubscribe links in emails or by contacting us directly." }),
        /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Request data portability where applicable." }),
        /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Nominate a representative to exercise rights in case of death or incapacity, as permitted under DPDP Act 2023." }),
        /* @__PURE__ */ jsx("li", { className: "mb-3", children: "Raise grievances and seek resolution." })
      ] })
    ] })
  },
  {
    id: "15",
    heading: "Security Measures",
    desc: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("ul", { className: "mb-3 list-disc pl-4 md:pl-10", children: [
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Encryption protocols, secure storage, and access controls." }),
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Periodic penetration testing and vulnerability assessments." }),
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Independent audits and certifications (ISO 27001, PCI DSS)." }),
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Employee training and awareness programs." }),
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Data breach protocols ensuring timely communication with affected parties and regulators." })
    ] }) })
  },
  {
    id: "16",
    heading: "Grievance Redressal",
    desc: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("p", { className: "mb-2", children: "We maintain a structured grievance redressal mechanism in line with RBI and IT Act requirements." }),
      /* @__PURE__ */ jsx("p", { className: "font-bold", children: "Grievance Officer / Data Protection Officer (DPO):" }),
      /* @__PURE__ */ jsxs("ul", { className: "mb-3", children: [
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Email:" }),
          " ",
          /* @__PURE__ */ jsx(
            "a",
            {
              className: "text-blue-600 underline",
              href: "mailto:grievance@bridg.money",
              children: "grievance@bridg.money"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Address:" }),
          " WorkFlo Ranka Junction, Property No. 224, 3rd Floor, #80/3, Vijinapura Village, Old Madras Road, Hobli, Krishnarajapuram, Bengaluru, Karnataka 560016."
        ] })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mb-3", children: "Complaints are acknowledged within 48 hours and resolved within 30 days." })
    ] })
  },
  {
    id: "17",
    heading: "Third-Party Links",
    desc: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("p", { className: "mb-3", children: "Our platform may link to external sites. We are not responsible for their privacy practices and recommend users review their policies before engagement." }) })
  },
  {
    id: "18",
    heading: "Policy Updates",
    desc: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("p", { className: "mb-3", children: [
      "We may revise this Privacy Policy from time to time to reflect legal, regulatory, or operational changes. Updated versions will always be published at",
      " ",
      /* @__PURE__ */ jsx(Link, { to: "/privacy-policy", className: "text-blue-600 underline", children: "https://bridg.money/privacy-policy." }),
      " ",
      "Users are encouraged to review this page periodically."
    ] }) })
  }
];
function SidebarHighlight$6() {
  const [activeId, setActiveId] = useState(headings$6[0].id);
  const itemRefs = useRef({});
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-35%  0px -65% 0px" }
    );
    headings$6.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (activeId && itemRefs.current[activeId]) {
      const sidebarEl = document.getElementById("sidebar");
      const activeEl = itemRefs.current[activeId];
      if (sidebarEl && activeEl) {
        const sidebarRect = sidebarEl.getBoundingClientRect();
        const activeRect = activeEl.getBoundingClientRect();
        if (activeRect.top < sidebarRect.top || activeRect.bottom > sidebarRect.bottom) {
          sidebarEl.scrollTop += activeRect.top - sidebarRect.top - 20;
        }
      }
    }
  }, [activeId]);
  return /* @__PURE__ */ jsxs("div", { className: "flex mb-20", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "w-65 sticky top-30 h-screen hidden lg:block overflow-y-auto",
        id: "sidebar",
        children: /* @__PURE__ */ jsx("ul", { className: "relative space-y-2", children: headings$6.map((sec) => {
          const isActive = activeId === sec.id;
          return /* @__PURE__ */ jsxs(
            "li",
            {
              ref: (el) => itemRefs.current[sec.id] = el,
              className: "relative",
              children: [
                isActive && /* @__PURE__ */ jsx(
                  motion.div,
                  {
                    layoutId: "activeBorder",
                    className: "absolute left-0 top-0 h-full w-1 bg-[#96DC03] rounded-r",
                    transition: { type: "spring", stiffness: 300, damping: 30 }
                  }
                ),
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: `#${sec.id}`,
                    className: `pl-5 py-1.5 block rounded transition-colors ${isActive ? "text-[#96DC03]" : "text-gray-500"}`,
                    children: sec.heading
                  }
                )
              ]
            },
            sec.id
          );
        }) })
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "flex-1 space-y-7 md:px-5 lg:pl-10 w-screen overflow-hidden", children: headings$6.map((sec) => /* @__PURE__ */ jsxs("section", { id: sec.id, className: "scroll-mt-28", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-bold text-2xl mb-3", children: sec.heading }),
      /* @__PURE__ */ jsx("section", { children: sec.desc })
    ] }, sec.id)) })
  ] });
}
const TermsAndCondition = () => {
  return /* @__PURE__ */ jsxs("div", { className: "contaier px-7 md:px-10", children: [
    /* @__PURE__ */ jsx("h1", { className: "font-bold md:pl-3 text-3xl md:text-4xl pt-5 pb-10", children: "Terms & Conditions" }),
    /* @__PURE__ */ jsx("section", { children: /* @__PURE__ */ jsx(SidebarHighlight$5, {}) })
  ] });
};
const headings$5 = [
  {
    id: "1",
    heading: "Acceptance of Terms",
    desc: /* @__PURE__ */ jsxs("p", { className: "mb-3", children: [
      "By accessing or using ",
      /* @__PURE__ */ jsx("strong", { children: "bridg.money" }),
      " (the “Platform”), you confirm that you have read, understood, and agree to be bound by these Website Terms & Conditions (the “Terms”). If you do not agree, you must immediately cease all use of the Platform."
    ] })
  },
  {
    id: "2",
    heading: "Eligibility & Authority",
    desc: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("p", { className: "mb-3", children: "You represent that you (a) are at least 18 years old; (b) have full legal capacity to enter into a binding contract; and (c) are accessing the Platform on behalf of yourself or an entity you are duly authorised to represent. If you are acting for a business, “you” and “your” include that entity." }) })
  },
  {
    id: "3",
    heading: "Definitions",
    desc: /* @__PURE__ */ jsxs("div", { className: "overflow-x-auto", children: [
      /* @__PURE__ */ jsxs("p", { className: "mb-3", children: [
        /* @__PURE__ */ jsx("strong", { children: '"bridg.money,” “we,” “our,” and “us” refer to Bridg Financial Technologies Private Limited' }),
        ", an Indian company incorporated under the Companies Act 2013, having its registered office at WorkFlo Ranka"
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mb-5", children: "Property No. 224, 3rd Floor, #80/3, Vijinapur Village, Old Madras Road, KR Puram Hobli, Bangalore – 560016." }),
      /* @__PURE__ */ jsxs("p", { className: "mb-3", children: [
        /* @__PURE__ */ jsx("strong", { children: "“Services”" }),
        " means all products, tools, APIs, dashboards, content, documentation, and support made available via the Platform, including BridgPay (Payouts), BridgCollect (Collections), BridgRecon (Reconciliation), BridgVault (Account Infrastructure & Escrow), BridgRoute (Routing Engine), BridgVerify/ Onboard (KYC/KYB), and ancillary solutions."
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "mb-5", children: [
        /* @__PURE__ */ jsx("strong", { children: "“User”" }),
        " means any natural or legal person who visits, browses, registers, or uses the Platform."
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mb-3", children: "Other capitalised terms shall have meanings assigned in context." })
    ] })
  },
  {
    id: "4",
    heading: "Scope of Services",
    desc: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("p", { className: "mb-3", children: [
      "bridg.money acts as a",
      " ",
      /* @__PURE__ */ jsx("strong", { children: "Technology Service Provider (TSP)." }),
      " We are",
      " ",
      /* @__PURE__ */ jsx("strong", { children: "not a bank, NBFC, or payment aggregator." }),
      " All underlying banking and settlement services are powered by partner financial institutions regulated by the Reserve Bank of India (“RBI”). Our Services facilitate, but do not independently execute, money movement. You acknowledge that transactions are ultimately processed by partner banks / payment networks and are subject to their terms."
    ] }) })
  },
  {
    id: "5",
    heading: "Account Registration & Security",
    desc: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("ul", { className: "mb-3 list-disc pl-3 md:pl-10", children: [
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "To access merchant‑specific modules, you must create an account, complete KYC/KYB, and accept any product‑specific agreements." }),
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "You agree to provide accurate, complete information and keep it updated. We may suspend or terminate access if details are false, incomplete, or unverifiable." }),
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "You are solely responsible for safeguarding credentials (username, password, API keys, tokens, certificates). All activity under your account is deemed authorised by you unless reported otherwise in writing." })
    ] }) })
  },
  {
    id: "6",
    heading: "Compliance, KYC & AML",
    desc: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("ul", { className: "mb-3 list-disc pl-4 md:pl-10", children: [
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "We follow RBI/SEBI/UIDAI and related guidelines on client due diligence, anti‑money laundering (“AML”), and combating financing of terrorism (“CFT”)." }),
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "You must cooperate in supplying information, documents, or consents requested for compliance reviews." }),
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "We may verify details with third‑party service providers or government databases." }),
      /* @__PURE__ */ jsx("li", { className: "mb-3", children: "Failure to comply or suspicious activity may result in suspension, reporting to authorities, or termination without liability." })
    ] }) })
  },
  {
    id: "7",
    heading: "Your Obligations",
    desc: /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("ul", { className: "mb-3 list-disc pl-4 md:pl-10", children: [
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Use the Platform only for lawful business purposes and in accordance with applicable laws (including RBI Master Directions on IT-FS 2023, IT Act 2000, PCI DSS, and the Digital Personal Data Protection Act 2023)." }),
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Obtain and maintain all licences, registrations, and approvals required for your operations." }),
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Promptly notify us of any unauthorised access, security breach, or suspicious transaction within 6 hours of discovery (CERT-In timeline)." }),
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Not impersonate another person, infringe intellectual property, or upload malicious code." }),
      /* @__PURE__ */ jsx("li", { className: "mb-3", children: "Pay all fees, charges, taxes, and other amounts due in a timely manner." })
    ] }) })
  },
  {
    id: "8",
    heading: "Acceptable‑Use Policy & Prohibited Activities ",
    desc: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { className: "mb-3", children: "You shall not:" }),
      /* @__PURE__ */ jsxs("ul", { className: "mb-3 list-disc pl-4  md:pl-10", children: [
        /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Use the Platform for illegal, fraudulent, or high-risk products/services including, but not limited to: drugs, gambling & betting, virtual currencies, deep-web/tor services, pornography, weapons, multi-level marketing, fantasy gaming, deepfakes, or any activity prohibited by RBI or partner-bank policies." }),
        /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Reverse-engineer, decompile, or attempt to derive source code." }),
        /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Interfere with or disrupt servers, networks, or security controls." }),
        /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Resell, lease, or provide the Services to third parties except as expressly permitted." }),
        /* @__PURE__ */ jsx("li", { className: "mb-3", children: "Exceed fair-use thresholds or API rate limits set by bridg.money." })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mb-3", children: "We may update this policy at any time; continued use constitutes acceptance of updates." })
    ] })
  },
  {
    id: "9",
    heading: "Fees, Taxes & Settlement",
    desc: /* @__PURE__ */ jsxs("ul", { className: "mb-3 list-disc pl-4  md:pl-10", children: [
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Pricing models (per-transaction, subscription, or bespoke) are set forth in executed order forms or merchant agreements." }),
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "All fees are exclusive of GST and other applicable taxes. You are responsible for reporting and remitting taxes." }),
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Settlement timelines are subject to partner-bank clearing cycles and applicable regulations." })
    ] })
  },
  {
    id: "10",
    heading: "Intellectual Property & API Licence",
    desc: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("ul", { className: "mb-3 list-disc pl-4  md:pl-10", children: [
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "All software, APIs, dashboards, text, graphics, and other content on the Platform (collectively, “IP”) are owned by bridg.money or its licensors. You receive a limited, revocable, non-exclusive, non-transferable licence to use the IP solely to access the Services." }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "API Keys." }),
        " API keys are confidential, personal to you, and must not be shared, sublicensed, or hard-coded in open-source repositories. We may revoke keys to enforce compliance, mitigate security risks, or address excessive usage."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Rate Limits." }),
        " We may impose rate limits per IP address, account, or endpoint. Automated calls beyond limits may be blocked."
      ] }),
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "You shall not create derivative works, scrape, or build competing services using our APIs without written consent." })
    ] }) })
  },
  {
    id: "11",
    heading: "Confidentiality",
    desc: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("ul", { className: "mb-3 list-disc pl-4  md:pl-10", children: [
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "“Confidential Information” means non-public information disclosed by either party (“Discloser”) to the other (“Recipient”) that is designated confidential or that a reasonable person would understand to be confidential" }),
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Recipient shall (i) use Confidential Information solely to perform obligations under these Terms; (ii) not disclose it to third parties except to employees, affiliates, or advisors on a need-to-know basis who are bound by similar obligations; and (iii) protect it with at least the same degree of care it uses for its own confidential data (and no less than reasonable care)." }),
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Exclusions: information that is (i) publicly available without breach; (ii) rightfully received from a third party without duty of confidentiality; (iii) independently developed without use of Confidential Information; or (iv) required to be disclosed by law or court order (with prompt notice to Discloser, where lawful)." }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        "Obligations survive ",
        /* @__PURE__ */ jsx("strong", { children: "3 years" }),
        " post-termination, except trade secrets (indefinitely)."
      ] })
    ] }) })
  },
  {
    id: "12",
    heading: "Data Privacy, Security & Retention",
    desc: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("ul", { className: "mb-3 list-disc pl-4  md:pl-10", children: [
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        "We process personal data in accordance with our",
        " ",
        /* @__PURE__ */ jsx("strong", { children: "Privacy Policy" }),
        " and industry standards (ISO 27001, PCI DSS v4). You agree to adopt equivalent safeguards."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Retention." }),
        " Transaction & KYC records are retained for a minimum of ",
        /* @__PURE__ */ jsx("strong", { children: "5 years" }),
        " from the date of creation or longer if required by RBI/SEBI/ED. Non-regulatory data may be deleted upon your written request, subject to legal holds."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-3", children: [
        /* @__PURE__ */ jsx("strong", { children: "Security-Incident Notification." }),
        " Each party shall notify the other of any actual or suspected data breach or security incident within ",
        /* @__PURE__ */ jsx("strong", { children: "6 hours" }),
        " of becoming aware (per CERT-In Directive 2022). Notifications shall include nature of incident, data affected, mitigation steps, and further actions required."
      ] })
    ] }) })
  },
  {
    id: "13",
    heading: "Service Levels & Availability",
    desc: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("ul", { className: "mb-3 list-disc pl-4  md:pl-10", children: [
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        "We target ",
        /* @__PURE__ */ jsx("strong", { children: "99.5 % monthly API uptime," }),
        " excluding (i) scheduled maintenance (with at least 24‑hour prior notice via dashboard/email) and (ii) force‑majeure events."
      ] }),
      /* @__PURE__ */ jsx("li", { className: "mb-3", children: "Your sole remedy for failure to meet service levels is a service-credit (not cash) equal to a pro-rated portion of fees for the affected period, provided you submit a written claim within 30 days." })
    ] }) })
  },
  {
    id: "14",
    heading: "Representations & Warranties",
    desc: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("p", { className: "mb-3", children: "Each party represents and warrants that: (a) it has full power and authority to enter into these Terms; (b) its execution does not violate any other agreement; (c) it will comply with all applicable laws and regulations; and (d) it will not knowingly infringe the intellectual‑property rights of any third party." }) })
  },
  {
    id: "15",
    heading: "Disclaimer of Warranties",
    desc: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("p", { className: "mb-3", children: [
      "The Platform and Services are provided ",
      /* @__PURE__ */ jsx("strong", { children: "“as is”" }),
      " and",
      " ",
      /* @__PURE__ */ jsx("strong", { children: "“as available.”" }),
      " To the fullest extent permitted by law, we disclaim all warranties—express, implied, statutory—including merchantability, fitness for a particular purpose, accuracy, uninterrupted availability, and non-infringement."
    ] }) })
  },
  {
    id: "16",
    heading: "Limitation of Liability",
    desc: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("p", { className: "mb-3", children: [
      "To the maximum extent permitted by law, bridg.money, its directors, officers, employees, or affiliates shall",
      " ",
      /* @__PURE__ */ jsx("strong", { children: "not be liable" }),
      " for (a) any indirect, incidental, special, consequential, punitive, or exemplary damages; (b) loss of profits, revenues, goodwill, or data; or (c) damages exceeding the",
      " ",
      /* @__PURE__ */ jsx("strong", { children: "aggregate fees paid by you to bridg.money in the 12 months preceding the claim," }),
      " ",
      "arising out of or related to the Platform or these Terms, regardless of the legal theory and even if advised of the possibility of such damages."
    ] }) })
  },
  {
    id: "17",
    heading: "Indemnification",
    desc: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("p", { className: "mb-3", children: "You agree to defend, indemnify, and hold harmless bridg.money and its affiliates from any claims, damages, liabilities, costs, and expenses (including reasonable attorneys’ fees) arising from (a) your use of the Platform; (b) violation of these Terms or applicable law; or (c) infringement of any third-party right." }) })
  },
  {
    id: "18",
    heading: "Audit & Compliance Assistance",
    desc: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("p", { className: "mb-3", children: "We, our banking partners, auditors, or regulators may, upon reasonable notice, audit your use of the Services (on‑site or remote) to verify compliance with these Terms, RBI guidelines, and partner‑bank requirements. You shall cooperate, provide access to records, and implement corrective actions at your cost." }) })
  },
  {
    id: "19",
    heading: "Suspension & Termination",
    desc: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("p", { className: "mb-3", children: "We may suspend or terminate your access with or without notice if we believe you have breached these Terms, violated law, or pose security/AML risk. Upon termination, rights granted under these Terms cease immediately. Sections regarding IP, Confidentiality, Indemnity, Liability, and Dispute Resolution survive termination." }) })
  },
  {
    id: "20",
    heading: "Modifications to Platform or Terms",
    desc: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("p", { className: "mb-3", children: "We may modify, suspend, or discontinue any part of the Platform and/or update these Terms at any time. Revised Terms will be posted with an updated “Last updated” date. Continued use constitutes acceptance." }) })
  },
  {
    id: "21",
    heading: "Export‑Control & Sanctions Compliance",
    desc: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("p", { className: "mb-3", children: "You shall not use the Platform if (a) you are located in, or a citizen of, a country subject to Indian Government or UN sanctions, or (b) you are on any sanctions or prohibited‑persons list. You agree to comply with all export‑control laws and trade‑embargo regulations" }) })
  },
  {
    id: "22",
    heading: "Feedback Licence",
    desc: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("p", { className: "mb-3", children: "If you provide suggestions, ideas, or feedback regarding the Platform (“Feedback”), you grant bridg.money an irrevocable, sublicensable, worldwide licence to use, modify, and incorporate such Feedback without obligation or restriction." }) })
  },
  {
    id: "23",
    heading: "Governing Law & Dispute Resolution",
    desc: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("p", { className: "mb-3", children: [
      "These Terms shall be governed by and construed in accordance with the laws of India without regard to conflict‑of‑laws rules. Any disputes shall be subject to the exclusive jurisdiction of the competent courts in ",
      /* @__PURE__ */ jsx("strong", { children: "Bangalore, Karnataka." }),
      " bridg.money may, at its discretion, opt for binding arbitration under the Arbitration & Conciliation Act  1996, seated in Bangalore, with proceedings in English. The arbitral tribunal shall comprise a sole arbitrator appointed by bridg.money."
    ] }) })
  },
  {
    id: "24",
    heading: "Notices & Electronic Signature",
    desc: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("ul", { className: "mb-3 list-disc pl-4  md:pl-10", children: [
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        "All notices shall be deemed delivered when (i) sent by email to your registered email address, or (ii) posted conspicuously on your dashboard. Notices to bridg.money must be sent to",
        " ",
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "emailto:legal@bridg.money",
            className: "underline text-blue-600",
            children: "legal@bridg.money"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "By clicking “I agree,” API‑key generation, or continuing to use the Platform, you adopt an electronic signature that is binding under the Information Technology Act 2000." })
    ] }) })
  },
  {
    id: "25",
    heading: "Miscellaneous",
    desc: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("ul", { className: "mb-3 list-disc pl-4  md:pl-10", children: [
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Entire Agreement:" }),
        " These Terms constitute the entire agreement between you and bridg.money for website usage and supersede all prior understandings."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Severability:" }),
        " If any provision is held unenforceable, the remaining provisions shall remain in effect."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Waiver:" }),
        " Failure to enforce any right does not constitute a waiver"
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Assignment:" }),
        " You may not assign or transfer rights without prior written consent. bridg.money may assign its rights and obligations to an affiliate or successor."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Force Majeure:" }),
        " bridg.money is not liable for delay or failure caused by events beyond reasonable control (e.g., natural disaster, war, strikes, internet outages, government action)."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-3", children: [
        /* @__PURE__ */ jsx("strong", { children: "Survival:" }),
        " Sections relating to Confidentiality, Intellectual Property, Data Privacy, Fees, Limitation of Liability, Indemnity, Dispute Resolution, and Miscellaneous shall survive termination."
      ] })
    ] }) })
  },
  {
    id: "26",
    heading: "Grievance Redressal & Contact",
    desc: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { className: "mb-5", children: "If you have questions, complaints, or require support, please contact:" }),
      /* @__PURE__ */ jsxs("p", { className: "mb-3 ps-3 md:ps-10", children: [
        /* @__PURE__ */ jsx("strong", { children: "Grievance Officer" }),
        "\\ Ms. Priya Menon (Designated Grievance Officer)\\ Bridg Financial Technologies Private Limited\\ WorkFlo Ranka Junction, Property No. 224, 3rd Floor, #80/3, Old Madras Road, KR Puram Hobli, Bangalore – 560016, India\\",
        " ",
        /* @__PURE__ */ jsx("strong", { children: "Email:" }),
        " security@bridg.money\\",
        " ",
        /* @__PURE__ */ jsx("strong", { children: "Alternate Email:" }),
        " hello@bridg.money\\",
        " ",
        /* @__PURE__ */ jsx("strong", { children: "Phone:" }),
        " +91 75756 12809\\ Office Hours: 10:00 a.m. – 6:00 p.m. IST, Monday – Friday (excluding Indian public holidays)"
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mb-3", children: "We will acknowledge receipt of grievances within 48 hours and endeavour to resolve queries within 30 days, consistent with RBI and IT Act 2000 guidelines" })
    ] })
  }
];
function SidebarHighlight$5() {
  const [activeId, setActiveId] = useState(headings$5[0].id);
  const itemRefs = useRef({});
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-35%  0px -65% 0px" }
    );
    headings$5.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (activeId && itemRefs.current[activeId]) {
      const sidebarEl = document.getElementById("sidebar");
      const activeEl = itemRefs.current[activeId];
      if (sidebarEl && activeEl) {
        const sidebarRect = sidebarEl.getBoundingClientRect();
        const activeRect = activeEl.getBoundingClientRect();
        if (activeRect.top < sidebarRect.top || activeRect.bottom > sidebarRect.bottom) {
          sidebarEl.scrollTop += activeRect.top - sidebarRect.top - 20;
        }
      }
    }
  }, [activeId]);
  return /* @__PURE__ */ jsxs("div", { className: "flex mb-20", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "w-65 sticky top-25 h-screen hidden lg:block overflow-y-auto",
        id: "sidebar",
        children: /* @__PURE__ */ jsx("ul", { className: "relative space-y-2", children: headings$5.map((sec) => {
          const isActive = activeId === sec.id;
          return /* @__PURE__ */ jsxs(
            "li",
            {
              ref: (el) => itemRefs.current[sec.id] = el,
              className: "relative",
              children: [
                isActive && /* @__PURE__ */ jsx(
                  motion.div,
                  {
                    layoutId: "activeBorder",
                    className: "absolute left-0 top-0 h-full w-1 bg-[#96DC03] rounded-r",
                    transition: { type: "spring", stiffness: 300, damping: 30 }
                  }
                ),
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: `#${sec.id}`,
                    className: `pl-5 py-1.5 block rounded transition-colors ${isActive ? "text-[#96DC03]" : "text-gray-500"}`,
                    children: sec.heading
                  }
                )
              ]
            },
            sec.id
          );
        }) })
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "flex-1 space-y-7 md:px-5 lg:pl-10 w-screen overflow-hidden", children: headings$5.map((sec) => /* @__PURE__ */ jsxs("section", { id: sec.id, className: "scroll-mt-28", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-3", children: sec.heading }),
      /* @__PURE__ */ jsx("section", { children: sec.desc })
    ] }, sec.id)) })
  ] });
}
const TrustAndSecurity = () => {
  return /* @__PURE__ */ jsxs("div", { className: "contaier px-7 md:px-10", children: [
    /* @__PURE__ */ jsx("h1", { className: "font-bold md:pl-3 text-3xl md:text-4xl lg:text-5xl pt-5 pb-7 lg:pb-10", children: "Trust & Security" }),
    /* @__PURE__ */ jsx("section", { children: /* @__PURE__ */ jsx(SidebarHighlight$4, {}) })
  ] });
};
const headings$4 = [
  {
    id: "1",
    heading: "Why Trust bridg.money?",
    desc: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("p", { className: "mb-2", children: "At bridg.money, security, compliance, and reliability are the foundations of our platform. As a Technology Service Provider (TSP) working exclusively with RBI-licensed banks and regulated financial institutions, we are committed to safeguarding sensitive financial data and ensuring that all money movement on our platform adheres to the highest legal and technical standards." }),
      /* @__PURE__ */ jsx("p", { className: "mb-3", children: "Our mission is to ensure that your data and transactions remain secure, compliant, and always available. We combine strong governance, advanced technology, and continuous oversight to provide a platform trusted by merchants, banks, and regulators alike." })
    ] })
  },
  {
    id: "2",
    heading: "Security Practices",
    desc: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("ul", { className: "mb-3 list-disc pl-4 md:pl-10", children: [
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "End-to-End Encryption:" }),
        " All data is encrypted using AES-256 standards when stored and protected with TLS 1.3 during transmission."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "No Sensitive Storage:" }),
        " We do not store card CVV, PIN, Aadhaar biometrics, or other sensitive data beyond what is strictly necessary for compliance with RBI and AML guidelines."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Future PCI-DSS Readiness:" }),
        " While bridg.money does not currently process or store cardholder data directly, our infrastructure is designed to adopt PCI DSS controls if required in future collaborations with banks or card networks."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Role-Based Access Control (RBAC):" }),
        " All employee access is controlled by multi-factor authentication (MFA) and governed by the principle of least privilege."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Continuous Security Monitoring:" }),
        " 24×7 monitoring detects anomalies, intrusion attempts, or fraudulent activity in real time."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Regular Security Testing:" }),
        " Periodic vulnerability assessments and penetration tests (VAPT) are conducted by CERT-IN empanelled third-party auditors."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Independent Audits:" }),
        " Annual audits are performed to align with industry-recognised frameworks such as ISO/IEC 27001."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-3", children: [
        /* @__PURE__ */ jsx("strong", { children: "Employee Practices:" }),
        " All employees undergo background verification, sign NDAs, and complete mandatory security awareness training."
      ] })
    ] }) })
  },
  {
    id: "3",
    heading: "Compliance & Regulatory Alignment",
    desc: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("ul", { className: "mb-3 list-disc pl-4 md:pl-10", children: [
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "RBI TSP & Payment Regulations:" }),
        " bridg.money operates strictly within the framework of the Payment & Settlement Systems Act, PMLA, and RBI Master Directions."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "KYC/KYB Compliance:" }),
        " Our merchant onboarding (BridgOnboard & BridgVerify) ensures that all entities on the platform are verified in compliance with RBI AML/KYC requirements."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Data Protection Laws:" }),
        " We comply with the Digital Personal Data Protection (DPDP) Act 2023 and ensure fair and lawful processing of personal data."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Escrow & Pooled Account Structures:" }),
        " All merchant and customer funds are managed through escrow and pooled account arrangements that follow RBI-prescribed safeguards."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: " Reporting & Audit Trails:" }),
        " Automated reconciliation, STR/CTR filings, and regulatory reporting ensure transparency and accountability."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Regulatory Cooperation:" }),
        " We work closely with banks, FIU-IND, and regulators to ensure continuous alignment with evolving compliance expectations."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-3", children: [
        /* @__PURE__ */ jsx("strong", { children: "Vendor Risk Management:" }),
        " All critical third-party vendors (e.g., KYC providers, cloud services, SMS gateways) are assessed for compliance with security and data protection requirements before onboarding."
      ] })
    ] }) })
  },
  {
    id: "4",
    heading: "Infrastructure Reliability",
    desc: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("ul", { className: "mb-3 list-disc pl-4 md:pl-10", children: [
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "High Availability:" }),
        " Our systems are designed with redundancy and disaster recovery measures to ensure uptime and resilience."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Multi-Bank Routing (BridgRoute):" }),
        " Transactions are intelligently routed across partner banks for better uptime and efficiency, reducing reliance on any single banking partner."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Disaster Recovery Protocols:" }),
        " Data is backed up regularly, and recovery processes are tested to meet operational continuity standards."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "API Scalability:" }),
        " bridg.money APIs are designed to process large transaction volumes efficiently, without compromising security."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-3", children: [
        /* @__PURE__ */ jsx("strong", { children: " Business Continuity:" }),
        " RTO ≤ 1 hour and RPO ≤ 15 minutes for critical services; quarterly DR drills validate readiness."
      ] })
    ] }) })
  },
  {
    id: "5",
    heading: "Data Privacy & Rights",
    desc: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("ul", { className: "mb-3 list-disc pl-4 md:pl-10", children: [
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Data Minimisation:" }),
        " We collect only the information necessary to provide services and meet regulatory obligations."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "No Sale of Data:" }),
        " bridg.money does not sell or rent personal data to advertisers or third parties."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Privacy by Design:" }),
        " Every feature we build incorporates privacy and data protection principles from inception."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Merchant Control:" }),
        " Merchants have rights to access, correct,port, or request deletion of their data subject to applicable laws and retention requirements."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-3", children: [
        /* @__PURE__ */ jsx("strong", { children: "Cross-Border Safeguards:" }),
        " International transfers, if required, are protected through Standard Contractual Clauses (SCCs) or equivalent safeguards."
      ] })
    ] }) })
  },
  {
    id: "6",
    heading: "Incident Management & Response",
    desc: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("ul", { className: "mb-3 list-disc pl-4 md:pl-10", children: [
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Breach Notification:" }),
        " In the event of a security breach that poses a risk to users, bridg.money will notify affected users and regulators as required under the DPDP Act, RBI guidelines, and other applicable laws."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Dedicated Response Team:" }),
        " A specialised incident response team ensures that any issue is investigated and remediated promptly."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Responsible Disclosure:" }),
        " We encourage ethical security researchers to responsibly disclose vulnerabilities to us at",
        " ",
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "emailto:security@bridg.money",
            className: "underline text-blue-600",
            children: "security@bridg.money"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-3", children: [
        /* @__PURE__ */ jsx("strong", { children: "Incident Response SLAs:" }),
        " Critical incidents acknowledged within 24 hours; root cause analysis and closure report within 10 days."
      ] })
    ] }) })
  },
  {
    id: "7",
    heading: "Certifications & Assurance",
    desc: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("p", { className: "pb-2", children: "We follow industry-leading practices and only claim certifications that we have formally achieved. Current compliance measures include:" }),
      /* @__PURE__ */ jsxs("ul", { className: "mb-3 list-disc pl-4 md:pl-10", children: [
        /* @__PURE__ */ jsx("li", { className: "mb-2", children: "ISO/IEC 27001 (under audit process) – Information Security Management System." }),
        /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Regular third-party VAPT reports available to banking partners upon request." })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "pb-3", children: "We do not claim PCI DSS, SOC 2, or other certifications until formally obtained. However, our infrastructure and policies are designed to adopt these frameworks as business and regulatory needs evolve." })
    ] })
  },
  {
    id: "8",
    heading: "Contact Us",
    desc: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("ul", { className: "mb-3 list-disc pl-4 md:pl-10", children: [
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Security Team:" }),
        " ",
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "emailto:security@bridg.money",
            className: "underline text-blue-600",
            children: "security@bridg.money"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Grievance Officer / Nodal & Compliance Officer:" }),
        " Ms. Priya Sharma"
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Registered Office:" }),
        " Bridg Financial Technologies Pvt. Ltd., WorkFlo Ranka Junction, Property No. 224, 3rd Floor, #80/3, Old Madras Road, Bengaluru 560016, India"
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-3", children: [
        /* @__PURE__ */ jsx("strong", { children: "Phone:" }),
        " ",
        /* @__PURE__ */ jsx("a", { href: "tel:+91 76765 12809", className: "underline text-blue-600", children: "+91 76765 12809" })
      ] })
    ] }) })
  },
  {
    id: "9",
    heading: "Optional Website Enhancements ",
    desc: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("ul", { className: "mb-3 list-disc pl-4 md:pl-10", children: [
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Visual Compliance Badges:" }),
        " RBI TSP alignment, ISO 27001 (in progress)."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Trust by Numbers:" }),
        "Highlight uptime percentage, number of merchants onboarded, and transactions processed securely."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Dedicated FAQ Section:" }),
        " Answer common security questions clearly (e.g., “Where is my data stored?” “How does escrow work?”)."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Annual Transparency Report:" }),
        " Share statistics on uptime, security incidents, and compliance audits."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-3", children: [
        /* @__PURE__ */ jsx("strong", { children: "Certification Roadmap:" }),
        " Communicate future compliance milestones (e.g., SOC 2, PCI DSS if required, ISO 22301 for business continuity)."
      ] })
    ] }) })
  }
];
function SidebarHighlight$4() {
  const [activeId, setActiveId] = useState(headings$4[0].id);
  const itemRefs = useRef({});
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-35%  0px -65% 0px" }
    );
    headings$4.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (activeId && itemRefs.current[activeId]) {
      const sidebarEl = document.getElementById("sidebar");
      const activeEl = itemRefs.current[activeId];
      if (sidebarEl && activeEl) {
        const sidebarRect = sidebarEl.getBoundingClientRect();
        const activeRect = activeEl.getBoundingClientRect();
        if (activeRect.top < sidebarRect.top || activeRect.bottom > sidebarRect.bottom) {
          sidebarEl.scrollTop += activeRect.top - sidebarRect.top - 20;
        }
      }
    }
  }, [activeId]);
  return /* @__PURE__ */ jsxs("div", { className: "flex mb-20", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "w-65 sticky top-25 h-screen hidden lg:block overflow-y-auto",
        id: "sidebar",
        children: /* @__PURE__ */ jsx("ul", { className: "relative space-y-2", children: headings$4.map((sec) => {
          const isActive = activeId === sec.id;
          return /* @__PURE__ */ jsxs(
            "li",
            {
              ref: (el) => itemRefs.current[sec.id] = el,
              className: "relative",
              children: [
                isActive && /* @__PURE__ */ jsx(
                  motion.div,
                  {
                    layoutId: "activeBorder",
                    className: "absolute left-0 top-0 h-full w-1 bg-[#96DC03] rounded-r",
                    transition: { type: "spring", stiffness: 300, damping: 30 }
                  }
                ),
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: `#${sec.id}`,
                    className: `pl-5 py-1.5 block rounded transition-colors ${isActive ? "text-[#96DC03]" : "text-gray-500"}`,
                    children: sec.heading
                  }
                )
              ]
            },
            sec.id
          );
        }) })
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "flex-1 space-y-7 md:px-5 lg:pl-10 w-screen overflow-hidden", children: headings$4.map((sec) => /* @__PURE__ */ jsxs("section", { id: sec.id, className: "scroll-mt-28", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-bold text-2xl mb-3", children: sec.heading }),
      /* @__PURE__ */ jsx("section", { children: sec.desc })
    ] }, sec.id)) })
  ] });
}
const CorporatePolicies = () => {
  return /* @__PURE__ */ jsxs("div", { className: "contaier px-7 md:px-10", children: [
    /* @__PURE__ */ jsx("h1", { className: "font-bold md:pl-3 text-3xl md:text-4xl lg:text-5xl pt-5 pb-7 lg:pb-10", children: "Corporate Policies" }),
    /* @__PURE__ */ jsx("section", { children: /* @__PURE__ */ jsx(SidebarHighlight$3, {}) })
  ] });
};
const headings$3 = [
  {
    id: "1",
    heading: "Code of Conduct",
    desc: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("p", { className: "mb-3", children: "bridg.money expects all employees, contractors, and partners to uphold integrity, fairness, and professionalism in every action. The Code of Conduct establishes principles of workplace ethics, anti-bribery commitments, conflict of interest disclosure, and compliance with applicable laws and regulations. It promotes transparency, accountability, and trust across all levels of the organisation. Breaches of the Code may result in disciplinary action, up to and including termination. Detailed version available in the Employee Handbook." }) })
  },
  {
    id: "2",
    heading: "POSH (Prevention of Sexual Harassment) Policy",
    desc: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("p", { className: "mb-2", children: "We are committed to a safe, inclusive, and respectful workplace. bridg.money strictly prohibits any form of sexual harassment in compliance with the POSH Act 2013. An Internal Complaints Committee (ICC) comprising trained members ensures that complaints are received, investigated, and resolved confidentially, fairly, and within statutory timelines. The policy also mandates awareness programmes and training to foster a culture of respect." }),
      /* @__PURE__ */ jsx("p", { className: "mb-3", children: "Detailed version available in the Employee Handbook" })
    ] })
  },
  {
    id: "3",
    heading: "IT & Email Usage Policy",
    desc: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("p", { className: "mb-2", children: "Company IT assets, networks, and email systems must be used responsibly and only for authorised business purposes. Misuse, unauthorised access, sharing of credentials, or installing unapproved software is strictly prohibited. This policy sets requirements for password hygiene, secure use of corporate email, monitoring protocols, and outlines penalties for misuse. It ensures IT resources are utilised to enhance productivity while safeguarding organisational security." }),
      /* @__PURE__ */ jsx("p", { className: "mb-3", children: "Detailed version available in the Employee Handbook." })
    ] })
  },
  {
    id: "4",
    heading: "Confidentiality & Data Protection Policy",
    desc: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("p", { className: "mb-2", children: "Employees and partners must protect proprietary, customer, and personal data entrusted to bridg.money. Confidential information may not be disclosed without explicit authorisation. Data protection measures align with the DPDP Act 2023, RBI IT & Outsourcing Guidelines, and global best practices. The policy covers handling of sensitive data, NDA obligations, classification protocols, and penalties for breach. Maintaining confidentiality is central to client trust and regulatory compliance." }),
      /* @__PURE__ */ jsx("p", { className: "mb-3", children: "Detailed version available in the Employee Handbook." })
    ] })
  },
  {
    id: "5",
    heading: "Leave & Attendance Policy",
    desc: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("p", { className: "mb-2", children: "Our leave and attendance framework ensures transparency, fairness, and compliance with applicable labour laws. Employees are entitled to specified categories of leave, including casual, sick, and earned leave, subject to company rules. Attendance is tracked through approved systems, and employees are expected to maintain punctuality. Leave encashment and carry-forward are not applicable. This policy balances employee welfare with operational needs." }),
      /* @__PURE__ */ jsx("p", { className: "mb-3", children: "Detailed version available in the Employee Handbook." })
    ] })
  },
  {
    id: "6",
    heading: "Whistleblower / Vigil Mechanism Policy",
    desc: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("p", { className: "mb-2", children: "bridg.money provides a secure, confidential channel for employees, partners, and stakeholders to report unethical behaviour, fraud, financial irregularities, or misconduct without fear of retaliation. All reports are reviewed by the Vigil Committee and escalated to the Board, where required. The policy ensures protection for whistleblowers, investigation protocols, and compliance with Section 177 of the Companies Act. It reinforces our zero-tolerance stance towards corruption or malpractice." }),
      /* @__PURE__ */ jsx("p", { className: "mb-3", children: "Detailed version available in the Employee Handbook." })
    ] })
  },
  {
    id: "7",
    heading: "Equal Opportunity & Diversity Policy",
    desc: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("p", { className: "mb-2", children: "We are an equal opportunity employer and value diversity and inclusion. Recruitment, promotions, and workplace practices are free from discrimination on the basis of gender, age, religion, caste, disability, or sexual orientation. The policy ensures fair treatment, encourages diversity in hiring, and provides for grievance mechanisms in case of discrimination. This reflects our belief that diverse teams foster innovation, collaboration, and organisational growth." }),
      /* @__PURE__ */ jsx("p", { className: "mb-3", children: "Detailed version available in the Employee Handbook." })
    ] })
  },
  {
    id: "8",
    heading: "Employee Disciplinary & Termination Policy",
    desc: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("p", { className: "mb-2", children: "Defines expected standards of conduct and outlines procedures for addressing misconduct, performance issues, or breaches of company policy. It describes processes for verbal/written warnings, suspension, and termination, ensuring fairness, proportionality, and compliance with Indian labour laws. This policy protects employee rights while maintaining discipline and operational integrity within the organisation." }),
      /* @__PURE__ */ jsx("p", { className: "mb-3", children: "Detailed version available in the Employee Handbook." })
    ] })
  },
  {
    id: "9",
    heading: "Remote Work & BYOD Policy",
    desc: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("p", { className: "mb-2", children: "Outlines expectations for employees working remotely or using personal devices for work. The policy establishes requirements for secure VPN use, encryption, approved tools, and responsibility for protecting company data while offsite. It ensures productivity, security, and accountability in hybrid work models while balancing flexibility for employees." }),
      /* @__PURE__ */ jsx("p", { className: "mb-3", children: "Detailed version available in the Employee Handbook." })
    ] })
  },
  {
    id: "10",
    heading: "Terms & Conditions",
    desc: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("p", { className: "mb-2", children: "Defines the legal agreement governing the use of bridg.money’s platform, products, and services. Covers rights and obligations of users and the company, limitations of liability, intellectual property protections, and dispute resolution mechanisms. It forms the legal foundation of customer relationships and ensures transparent, fair dealings." }),
      /* @__PURE__ */ jsx("p", { className: "mb-3", children: "Detailed version available in the Employee Handbook." })
    ] })
  },
  {
    id: "11",
    heading: "Cookie Policy",
    desc: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("p", { className: "mb-2", children: "Explains how bridg.money uses cookies, tracking tools, and analytics to enhance user experience, improve services, and comply with legal requirements. It provides transparency on the categories of cookies used (essential, performance, analytics), retention timelines, and options for users to manage preferences. This ensures compliance with DPDP Act and IT Act disclosure norms." }),
      /* @__PURE__ */ jsx("p", { className: "mb-3", children: "Detailed version available in the Employee Handbook." })
    ] })
  },
  {
    id: "12",
    heading: "AML, KYC & Customer Acceptance Policy",
    desc: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("p", { className: "mb-2", children: "Sets out how bridg.money complies with RBI Master Directions, PMLA 2002, and FIU-IND guidelines. Defines customer due diligence (CDD), enhanced due diligence (EDD), restricted and prohibited businesses, transaction monitoring, and reporting obligations. It explains our approach to customer onboarding, ongoing monitoring, suspicious transaction reporting, and risk categorisation. This policy demonstrates our commitment to preventing money laundering and ensuring strong governance in customer acceptance." }),
      /* @__PURE__ */ jsx("p", { className: "mb-3", children: "Detailed version available in the Employee Handbook." })
    ] })
  },
  {
    id: "13",
    heading: "Vendor & Third-Party Risk Management Policy",
    desc: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("p", { className: "mb-2", children: "bridg.money assesses all critical vendors and third-party service providers (e.g., cloud services, KYC partners, SMS gateways) for compliance with data security, confidentiality, and regulatory requirements before onboarding. Vendors must undergo due diligence, contractual review, and periodic monitoring. The policy ensures that third-party risks are identified, assessed, and mitigated, reducing vulnerabilities in the extended supply chain." }),
      /* @__PURE__ */ jsx("p", { className: "mb-3", children: "Detailed version available in the Employee Handbook." })
    ] })
  },
  {
    id: "14",
    heading: "Business Continuity & Disaster Recovery (BCP/DR) Policy",
    desc: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("p", { className: "mb-2", children: "We maintain robust continuity and recovery protocols to minimise disruption of services. Critical systems have redundancy, and recovery time objectives (RTO ≤ 1 hour, RPO ≤ 15 minutes) are tested through quarterly drills. This policy includes incident communication, backup management, crisis management planning, and regular testing. It ensures resilience during outages or unforeseen events and demonstrates preparedness to regulators and partners." }),
      /* @__PURE__ */ jsx("p", { className: "mb-3", children: "Detailed version available in the Employee Handbook." })
    ] })
  },
  {
    id: "15",
    heading: "Governance & Oversight",
    desc: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("ul", { className: "mb-3 list-disc pl-4 md:pl-10", children: [
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "All policies are reviewed annually or earlier if mandated by law or regulator." }),
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "The Board of Directors approves material updates and ensures oversight of compliance." }),
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Nodal & Compliance Officer ensures implementation, monitoring, and reporting across all teams." }),
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Training and awareness programmes are conducted to familiarise employees with their responsibilities under these policies." })
    ] }) })
  }
];
function SidebarHighlight$3() {
  const [activeId, setActiveId] = useState(headings$3[0].id);
  const itemRefs = useRef({});
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-35%  0px -65% 0px" }
    );
    headings$3.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (activeId && itemRefs.current[activeId]) {
      const sidebarEl = document.getElementById("sidebar");
      const activeEl = itemRefs.current[activeId];
      if (sidebarEl && activeEl) {
        const sidebarRect = sidebarEl.getBoundingClientRect();
        const activeRect = activeEl.getBoundingClientRect();
        if (activeRect.top < sidebarRect.top || activeRect.bottom > sidebarRect.bottom) {
          sidebarEl.scrollTop += activeRect.top - sidebarRect.top - 20;
        }
      }
    }
  }, [activeId]);
  return /* @__PURE__ */ jsxs("div", { className: "flex mb-20", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "w-65 sticky top-30 h-screen hidden lg:block overflow-y-auto",
        id: "sidebar",
        children: /* @__PURE__ */ jsx("ul", { className: "relative space-y-2", children: headings$3.map((sec) => {
          const isActive = activeId === sec.id;
          return /* @__PURE__ */ jsxs(
            "li",
            {
              ref: (el) => itemRefs.current[sec.id] = el,
              className: "relative",
              children: [
                isActive && /* @__PURE__ */ jsx(
                  motion.div,
                  {
                    layoutId: "activeBorder",
                    className: "absolute left-0 top-0 h-full w-1 bg-[#96DC03] rounded-r",
                    transition: { type: "spring", stiffness: 300, damping: 30 }
                  }
                ),
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: `#${sec.id}`,
                    className: `pl-5 py-1.5 block rounded transition-colors ${isActive ? "text-[#96DC03]" : "text-gray-500"}`,
                    children: sec.heading
                  }
                )
              ]
            },
            sec.id
          );
        }) })
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "flex-1 space-y-7 md:px-5 lg:pl-10 w-screen overflow-hidden", children: headings$3.map((sec) => /* @__PURE__ */ jsxs("section", { id: sec.id, className: "scroll-mt-28", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-bold text-2xl mb-3", children: sec.heading }),
      /* @__PURE__ */ jsx("section", { children: sec.desc })
    ] }, sec.id)) })
  ] });
}
const GrievanceRedressalPolicy = () => {
  return /* @__PURE__ */ jsxs("div", { className: "contaier px-7 md:px-10", children: [
    /* @__PURE__ */ jsx("h1", { className: "font-bold md:pl-3 text-3xl md:text-4xl pt-5 pb-10", children: "Grievance Redressal Policy" }),
    /* @__PURE__ */ jsx("section", { children: /* @__PURE__ */ jsx(SidebarHighlight$2, {}) })
  ] });
};
const headings$2 = [
  {
    id: "1",
    heading: "Purpose & Scope",
    desc: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { className: "mb-5", children: "This Policy describes how Bridg Financial Technologies Pvt. Ltd. (“bridg.money”, “we”, “our” or “us”) receives, investigates, and resolves grievances related to its products, services, personnel, partners, or platform. It applies to prospective / on‑boarded merchants, end‑customers, website visitors, suppliers, contractors, employees, and the general public." }),
      /* @__PURE__ */ jsx("p", { className: "mb-5", children: "The framework is designed to meet or exceed:" }),
      /* @__PURE__ */ jsxs("ul", { className: "mb-3 list-disc pl-4 md:pl-10", children: [
        /* @__PURE__ */ jsx("li", { className: "mb-2", children: "RBI Integrated Ombudsman Scheme 2021 & Payment Aggregator / Gateway Directions" }),
        /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Information Technology Act 2000 & Intermediary Rules 2021 (15‑day disposal rule)" }),
        /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Consumer Protection (E‑commerce) Rules 2020" }),
        /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Industry best practice in grievance redressal adopted by regulated entities" }),
        /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Industry best practice adopted by Razorpay, Cashfree, Paytm, etc" }),
        /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Internal Bridg policies including BridgCollect (virtual accounts & UPI collections), BridgVerify / BridgOnboard (KYC/KYB & merchant onboarding tools), BridgPay and BridgRoute APIs" })
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "mb-3", children: [
        /* @__PURE__ */ jsx("strong", { children: "Zero Fees" }),
        " – bridg.money does not charge any fee at any stage of the grievance process."
      ] })
    ] })
  },
  {
    id: "2",
    heading: "Governance & Oversight",
    desc: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("ul", { className: "mb-3 list-disc pl-4 md:pl-10", children: [
        /* @__PURE__ */ jsx("li", { className: "mb-2", children: "The Board of Directors approves this Policy and reviews grievance dashboards quarterly." }),
        /* @__PURE__ */ jsx("li", { className: "mb-2", children: "A Nodal & Compliance Officer is appointed to oversee implementation and ensure regulatory filings." }),
        /* @__PURE__ */ jsx("li", { className: "mb-2", children: "The Board is responsible for ensuring adequate resources, independence, and authority for the grievance function." })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "font-bold mb-3", children: "Nodal & Compliance Officer:" }),
      /* @__PURE__ */ jsx("p", { children: "Ms. Priya Sharma" }),
      /* @__PURE__ */ jsx("p", { children: "Senior Compliance Manager" }),
      /* @__PURE__ */ jsxs("p", { children: [
        "Email:",
        " ",
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "mailto:compliance@bridg.money",
            className: "text-blue-600 underline",
            children: "compliance@bridg.money"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        "Phone:",
        " ",
        /* @__PURE__ */ jsx("a", { href: "tel:+91 76765 12809", className: "text-blue-600 underline", children: "+91 76765 12809" })
      ] }),
      /* @__PURE__ */ jsx("p", { children: "Address: WorkFlo Ranka Junction, Property No. 224, 3rd Floor, #80/3 Old Madras Road, Bengaluru 560016, India" })
    ] })
  },
  {
    id: "3",
    heading: "Key Definitions",
    desc: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("p", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Complaint / Grievance:" }),
        " Written or verbal expression of dissatisfaction about any bridg.money product, service, process, employee, or partner."
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Complainant:" }),
        " Person or entity lodging the grievance."
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Dispute / Chargeback:" }),
        " Challenge raised against a transaction by a cardholder / customer through their issuing bank."
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "mb-3", children: [
        /* @__PURE__ */ jsx("strong", { children: "Working Day:" }),
        " Monday–Friday, 10 a.m.–6 p.m. IST (excluding Indian public holidays)."
      ] })
    ] })
  },
  {
    id: "4",
    heading: "Typical Grievance Categories",
    desc: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("ul", { className: "mb-3 list-disc pl-4 md:pl-10", children: [
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Failed or delayed payout / settlement" }),
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Unauthorised or duplicate debit" }),
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "KYC / onboarding dispute" }),
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Data‑privacy or confidentiality breach" }),
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Chargeback, refund, or failed‑transaction issue" }),
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Misconduct by bridg.money personnel or partners" }),
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Policy or process non‑compliance" })
    ] }) })
  },
  {
    id: "5",
    heading: "How to Lodge a Complaint",
    desc: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("ul", { className: "mb-3", children: [
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Web Form:" }),
        " ",
        /* @__PURE__ */ jsx(Link, { className: "text-blue-600 underline", to: "/support", children: "https://www.bridg.money/support" }),
        " ",
        "— auto‑generates a ticket & reference ID"
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Email:" }),
        " ",
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "mailto:support@bridg.money",
            className: "text-blue-600 underline",
            children: "support@bridg.money"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Phone:" }),
        " ",
        /* @__PURE__ */ jsx("a", { href: "tel:+91 76765 12809", className: "text-blue-600 underline", children: "+91 76765 12809" }),
        " ",
        "(10 a.m.–6 p.m., Mon–Fri)"
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Post / Courier:" }),
        " Grievance Desk, Bridg Financial Technologies Pvt. Ltd., WorkFlo Ranka Junction, Property No. 224, 3rd Floor, #80/3 Old Madras Road, Bengaluru 560016, India"
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "In‑Person:" }),
        " By prior appointment at the corporate office"
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Acknowledgement:" }),
        " Reference ID emailed within 24–48 hours."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Track Status:" }),
        " Self‑service portal:",
        /* @__PURE__ */ jsx(Link, { className: "text-blue-600 underline", to: "/support/status", children: "https://www.bridg.money/support/status" })
      ] })
    ] }) })
  },
  {
    id: "6",
    heading: "Escalation Matrix & Timelines",
    desc: /* @__PURE__ */ jsxs("div", { className: "pl-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
        /* @__PURE__ */ jsx("p", { className: "font-bold mb-2", children: "L1 – Customer Success" }),
        /* @__PURE__ */ jsxs("p", { className: "mb-1", children: [
          "Email:",
          " ",
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "mailto:support@bridg.money",
              className: "text-blue-600 underline",
              children: "support@bridg.money"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mb-1", children: "First Response: ≤ 2 working days" }),
        /* @__PURE__ */ jsx("p", { className: "mb-1", children: "Resolution SLA: ≤ 10 working days" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
        /* @__PURE__ */ jsx("p", { className: "font-bold mb-2", children: "L2 – Grievance Officer" }),
        /* @__PURE__ */ jsxs("p", { className: "mb-1", children: [
          "Email:",
          " ",
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "mailto:grievance@bridg.money",
              className: "text-blue-600 underline",
              children: "grievance@bridg.money"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mb-1", children: "First Response: ≤ 3 working days" }),
        /* @__PURE__ */ jsx("p", { className: "mb-1", children: "Resolution SLA: ≤ 15 calendar days (IT Act cap)" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
        /* @__PURE__ */ jsx("p", { className: "font-bold mb-2", children: "L3 – Nodal & Compliance Officer" }),
        /* @__PURE__ */ jsxs("p", { className: "mb-1", children: [
          "Email:",
          " ",
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "mailto:compliance@bridg.money",
              className: "text-blue-600 underline",
              children: "compliance@bridg.money"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mb-1", children: "First Response: ≤ 5 working days" }),
        /* @__PURE__ */ jsx("p", { className: "mb-1", children: "Resolution SLA: ≤ 30 working days" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
        /* @__PURE__ */ jsx("p", { className: "font-bold mb-2", children: "L4 – RBI Integrated Ombudsman" }),
        /* @__PURE__ */ jsxs("p", { className: "mb-1", children: [
          "Portal:",
          " ",
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "https://cms.rbi.org.in",
              className: "text-blue-600 underline",
              children: "https://cms.rbi.org.in"
            }
          ),
          " ",
          "or toll‑free 14448"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mb-1", children: "Resolution as per RBI timelines" }),
        /* @__PURE__ */ jsx("p", { className: "mb-1", children: "If additional time is required, an interim update with reasons and expected closure date will be provided. For IT Act matters, total disposal will never exceed 15 calendar days. At each escalation stage, the complainant will be informed of next‑level options if resolution is unsatisfactory." }),
        /* @__PURE__ */ jsx("p", { className: "mb-1", children: "Ombudsman Eligibility: Escalate after 30 calendar days of first filing and within 1 year + 30 days of that filing." })
      ] })
    ] })
  },
  {
    id: "7",
    heading: "Dispute, Chargeback, Refund & Failed‑Transaction Handling",
    desc: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("p", { className: "mb-1", children: [
        /* @__PURE__ */ jsx("strong", { children: "Chargebacks:" }),
        " bridg.money notifies merchants of disputes and assists in gathering evidence. If the merchant accepts or fails to contest within network timelines, the amount is permanently debited."
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "mb-1", children: [
        /* @__PURE__ */ jsx("strong", { children: "Refunds:" }),
        " Merchants may initiate refunds routed back through bridg.money’s escrow account; typical bank credit timeline is 5–7 working days (may vary by network)."
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "mb-1", children: [
        /* @__PURE__ */ jsx("strong", { children: "Failed Transactions:" }),
        " Reversals are processed within the RBI‑prescribed TAT for the relevant payment mode. Refunds and reversals also comply with NPCI / Visa / Mastercard / RuPay timelines. Compensation is paid to customers where delays exceed TAT."
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "mb-1", children: [
        /* @__PURE__ */ jsx("strong", { children: "Compensation:" }),
        " Legitimate monetary losses from unauthorised debits or operational errors are reversed or compensated, in line with RBI’s electronic‑transaction liability framework."
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "mb-3", children: [
        /* @__PURE__ */ jsx("strong", { children: "Merchant Responsibility:" }),
        " Merchants remain responsible for resolving disputes relating to goods/services; bridg.money facilitates financial redressal only."
      ] })
    ] })
  },
  {
    id: "8",
    heading: "Fraud Alerts & Law‑Enforcement Cooperation",
    desc: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { className: "mb-3", children: "Upon receiving alerts from Law‑Enforcement Agencies (LEA) via NCRP portal or other authorised channels, bridg.money will:" }),
      /* @__PURE__ */ jsxs("ul", { className: "mb-3 list-disc pl-4 md:pl-10", children: [
        /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Freeze or monitor suspected transactions." }),
        /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Assist LEA with evidence, subject to legal and privacy requirements." }),
        /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Adhere to directions for fund recovery or merchant suspension." })
      ] })
    ] })
  },
  {
    id: "9",
    heading: "Accessibility & Language Support",
    desc: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("p", { className: "mb-3", children: "Support is available in English, Hindi, and Kannada. Alternative formats (large‑print / screen‑reader‑friendly) are provided upon request." }) })
  },
  {
    id: "10",
    heading: "Record‑Keeping & Review",
    desc: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("ul", { className: "mb-3 list-disc pl-4  md:pl-10", children: [
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Grievance records are retained for ≥ 5 years post‑closure." }),
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Quarterly dashboards & root‑cause analyses are reviewed by senior management and the Board." }),
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Annual policy review, or earlier if mandated by law/regulator." }),
      /* @__PURE__ */ jsx("li", { className: "mb-3", children: "Public disclosure: Aggregate grievance statistics (volume, resolution, TAT) will be published annually on our website." })
    ] }) })
  },
  {
    id: "11",
    heading: "Confidentiality & Data Protection",
    desc: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("p", { className: "mb-2", children: "Personal data is processed as per our Privacy Policy and protected by technical/organisational safeguards. Exceptions to confidentiality apply only when disclosure is" }),
      /* @__PURE__ */ jsx("p", { className: "mb-1", children: "(a) compelled by law." }),
      /* @__PURE__ */ jsx("p", { className: "mb-1", children: "(b) in the public interest, or " }),
      /* @__PURE__ */ jsx("p", { className: "mb-1", children: "(c) essential to protect bridg.money’s rights." })
    ] })
  },
  {
    id: "12",
    heading: "Regulatory Reporting & Public Disclosure",
    desc: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("ul", { className: "mb-3 list-disc pl-4  md:pl-10", children: [
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        "Nodal Officer details and this Policy are displayed prominently on",
        " ",
        /* @__PURE__ */ jsx(Link, { to: "/", className: "text-blue-600 underline", children: "https://www.bridg.money." })
      ] }),
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "bridg.money submits periodic grievance reports to RBI and any other regulators, as required." })
    ] }) })
  },
  {
    id: "13",
    heading: "Policy Updates",
    desc: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("p", { className: "mb-3", children: "Material amendments are posted on the website 15 days before they take effect." }) })
  }
];
function SidebarHighlight$2() {
  const [activeId, setActiveId] = useState(headings$2[0].id);
  const itemRefs = useRef({});
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-35%  0px -65% 0px" }
    );
    headings$2.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (activeId && itemRefs.current[activeId]) {
      const sidebarEl = document.getElementById("sidebar");
      const activeEl = itemRefs.current[activeId];
      if (sidebarEl && activeEl) {
        const sidebarRect = sidebarEl.getBoundingClientRect();
        const activeRect = activeEl.getBoundingClientRect();
        if (activeRect.top < sidebarRect.top || activeRect.bottom > sidebarRect.bottom) {
          sidebarEl.scrollTop += activeRect.top - sidebarRect.top - 20;
        }
      }
    }
  }, [activeId]);
  return /* @__PURE__ */ jsxs("div", { className: "flex mb-20", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "w-65 sticky top-25 h-screen hidden lg:block overflow-y-auto",
        id: "sidebar",
        children: /* @__PURE__ */ jsx("ul", { className: "relative space-y-2", children: headings$2.map((sec) => {
          const isActive = activeId === sec.id;
          return /* @__PURE__ */ jsxs(
            "li",
            {
              ref: (el) => itemRefs.current[sec.id] = el,
              className: "relative",
              children: [
                isActive && /* @__PURE__ */ jsx(
                  motion.div,
                  {
                    layoutId: "activeBorder",
                    className: "absolute left-0 top-0 h-full w-1 bg-[#96DC03] rounded-r",
                    transition: { type: "spring", stiffness: 300, damping: 30 }
                  }
                ),
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: `#${sec.id}`,
                    className: `pl-5 py-1.5 block rounded transition-colors ${isActive ? "text-[#96DC03]" : "text-gray-500"}`,
                    children: sec.heading
                  }
                )
              ]
            },
            sec.id
          );
        }) })
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "flex-1 space-y-7 md:px-5 lg:pl-10 w-screen overflow-hidden", children: headings$2.map((sec) => /* @__PURE__ */ jsxs("section", { id: sec.id, className: "scroll-mt-28", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-3", children: sec.heading }),
      /* @__PURE__ */ jsx("section", { children: sec.desc })
    ] }, sec.id)) })
  ] });
}
const ResponsibleDisclosure = () => {
  return /* @__PURE__ */ jsxs("div", { className: "contaier px-7 md:px-10", children: [
    /* @__PURE__ */ jsx("h1", { className: "font-bold  text-3xl md:text-4xl pt-5 pb-10", children: "Responsible Disclosure & Vulnerability Reporting Policy" }),
    /* @__PURE__ */ jsx("section", { children: /* @__PURE__ */ jsx(SidebarHighlight$1, {}) })
  ] });
};
const headings$1 = [
  {
    id: "1",
    heading: "Overview",
    desc: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("p", { className: "mb-5", children: "Responsible Disclosure is bridg.money’s public invitation to discover and privately report vulnerabilities before they can be exploited. As a Technology Service Provider (TSP) bridging banks and businesses, we rely on a robust security posture to safeguard every payment flow. By following this policy, you are authorised to conduct certain security research on specified assets without fear of legal action, provided you act in good faith and comply with the rules below." }) })
  },
  {
    id: "2",
    heading: "Definitions",
    desc: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("ul", { className: "mb-3 list-disc pl-4 md:pl-10", children: [
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Researcher:" }),
        " Any individual or entity performing security testing under this policy."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "In-scope asset:" }),
        " A domain, sub-domain, API, application or environment explicitly listed in Scope of Testing."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Vulnerability:" }),
        " A weakness that could compromise confidentiality, integrity or availability."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Coordinated Disclosure:" }),
        " The process of privately reporting a vulnerability, allowing bridg.money time to remediate before public release."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-3", children: [
        /* @__PURE__ */ jsx("strong", { children: "Safe-Harbour:" }),
        " Legal protection granted by bridg.money for authorised research activities performed in good faith"
      ] })
    ] }) })
  },
  {
    id: "3",
    heading: "Scope of Testing",
    desc: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("p", { className: "font-bold mb-3", children: "Environment / Asset:" }),
      /* @__PURE__ */ jsxs("ul", { className: "mb-3 list-disc pl-4 md:pl-10", children: [
        /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Merchant Dashboard (Production)" }),
        /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Public APIs (BridgPay, BridgCollect, BridgRoute, BridgVault, BridgRecon)" }),
        /* @__PURE__ */ jsx("li", { className: "mb-2", children: "BridgVerify & BridgOnboard modules (KYC/KYB & onboarding tools)" }),
        /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Sandbox partner portal (test integrations)" }),
        /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
          "Corporate website (",
          /* @__PURE__ */ jsx(Link, { to: "/", className: "text-blue-600 underline", children: "www.bridg.money" }),
          ", trust & security pages)"
        ] }),
        /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Future mobile apps (when launched)" }),
        /* @__PURE__ */ jsx("li", { className: "mb-3", children: "New public-facing assets automatically enter scope upon launch" })
      ] })
    ] })
  },
  {
    id: "4",
    heading: "Eligibility & Safe-Harbour",
    desc: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("ul", { className: "mb-3 list-disc pl-4 md:pl-10", children: [
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Who may participate?" }),
        " Any individual except (a) current bridg.money employees or contractors, or (b) residents of OFAC-sanctioned jurisdictions. Teams may collaborate but must designate a single payout recipient."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Legal authorisation:" }),
        " Activities that comply fully with this policy are expressly authorised. bridg.money will not initiate civil or criminal action, nor escalate to law enforcement."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Good faith requirement:" }),
        " Cease testing and report immediately if you access personal data or service disruption occurs. Do not retain, copy or share sensitive data."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Compliance with law:" }),
        " Safe-harbour applies only to activity that adheres to applicable cyber-security and data-protection laws, including the Information Technology Act 2000 (as amended) and related rules."
      ] })
    ] }) })
  },
  {
    id: "5",
    heading: "Rules of Engagement",
    desc: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("p", { className: "font-bold mb-3", children: "Allowed:" }),
      /* @__PURE__ */ jsxs("ul", { className: "mb-3 list-disc pl-4 md:pl-10", children: [
        /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Manual probing and targeted fuzzing of in-scope assets" }),
        /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Testing your own accounts / test data" }),
        /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Rate-limited automated scans ≤ 10 req/s" }),
        /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Exploiting LFI, SSRF, IDOR, authentication bypass" }),
        /* @__PURE__ */ jsx("li", { className: "mb-3", children: "Sub-domain takeover confirmation" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "font-bold mb-3", children: "Not Allowed:" }),
      /* @__PURE__ */ jsxs("ul", { className: "mb-3 list-disc pl-4 md:pl-10", children: [
        /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Volumetric DoS / DDoS attacks" }),
        /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Social engineering (phishing, vishing, smishing)" }),
        /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Physical intrusion into offices or data centres" }),
        /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Spam or brute-force credential stuffing" }),
        /* @__PURE__ */ jsx("li", { className: "mb-3", children: "Actions that modify or delete data without consent" })
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "mb-3", children: [
        /* @__PURE__ */ jsx("strong", { children: "Tip:" }),
        " Include the header X-Researcher-Handle in test traffic to avoid being blocked by our fraud rules."
      ] })
    ] })
  },
  {
    id: "6",
    heading: "Reporting Procedure",
    desc: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("ul", { className: "mb-3 list-disc pl-4 md:pl-10", children: [
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        "Send an encrypted email to",
        " ",
        /* @__PURE__ */ jsx("a", { href: "emailto:security@bridg.money", children: "security@bridg.money" }),
        " (PGP fingerprint: E95E 1C83 39F0 D14A BD01 3B78 650B 00F4 2C2B 65D9)."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Subject line:" }),
        " [VULN] — ."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Body must include:" }),
        /* @__PURE__ */ jsxs("ul", { className: "mb-2 list-disc pl-4 md:pl-10", children: [
          /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Asset/endpoint (URL, IP)" }),
          /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Step-by-step PoC with requests, responses, screenshots or video" }),
          /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Impact analysis" }),
          /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Severity suggestion (CVSS v3.1)" }),
          /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Proposed remediation (optional)" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "bridg.money responds within 3 business days and assigns a tracking ID." }),
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Public disclosure is permitted 30 days after a fix, or sooner with written approval." })
    ] }) })
  },
  {
    id: "7",
    heading: "Assessment & SLAs",
    desc: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("ul", { className: "mb-2 list-disc pl-4 md:pl-10", children: [
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Acknowledgement:" }),
        " ≤ 3 business days (automated receipt + analyst confirmation)"
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Triage & Severity Assignment:" }),
        " ≤ 5 business days (CVSS 3.1 + business context)"
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Remediation – Critical / High:" }),
        " ≤ 15 business days (compensating controls may be deployed first)"
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Remediation – Medium / Low:" }),
        " ≤ 45 business days (part of scheduled release cycle)"
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Status Updates to Researcher:" }),
        " Every 10 days until closure"
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-3", children: [
        /* @__PURE__ */ jsx("strong", { children: "Duplicate reports:" }),
        " credit goes to the first valid submission; later duplicates are closed as informative."
      ] })
    ] }) })
  },
  {
    id: "8",
    heading: "Reward Framework",
    desc: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("p", { className: "mb-3", children: "bridg.money offers competitive, severity-based rewards benchmarked against leading fintech programmes. Exact amounts are confidential; ranges below are indicative." }),
      /* @__PURE__ */ jsxs("ul", { className: "mb-2 list-disc pl-4 md:pl-10", children: [
        /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
          /* @__PURE__ */ jsx("strong", { children: "Critical:" }),
          " Unauthenticated RCE, full account takeover, unrestricted SQLi → Hall of Fame, top-tier monetary reward, invite to private programmes"
        ] }),
        /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
          /* @__PURE__ */ jsx("strong", { children: "High:" }),
          " Authentication bypass, serious SSRF, vertical privilege escalation → Hall of Fame, substantial monetary reward"
        ] }),
        /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
          /* @__PURE__ */ jsx("strong", { children: "Medium:" }),
          " Reflected/DOM XSS, limited IDOR, misconfigured S3 bucket → Swag pack + discretionary monetary reward"
        ] }),
        /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
          /* @__PURE__ */ jsx("strong", { children: "Low:" }),
          " Clickjacking, missing security headers, rate-limit gaps → Public thanks, possible swag"
        ] })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mb-3", children: "Rewards are issued within 30 days of fix deployment via INR bank transfer or USD-pegged stable-coin. Tax withholding follows Indian regulations." })
    ] })
  },
  {
    id: "9",
    heading: "Out-of-Scope / Non-Qualifying Issues",
    desc: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("ul", { className: "mb-3 list-disc pl-4 md:pl-10", children: [
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Informational findings without exploitable impact" }),
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Attacks requiring outdated browsers or rooted devices" }),
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Banner disclosure, server-version leaks, descriptive 404 pages" }),
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Self-XSS, SPF/DMARC misconfigurations alone" }),
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "TLS/SSL cipher issues mandated by regulatory compliance" }),
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Testing of partner-bank infrastructure or third-party rails without consent" }),
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "www ↔ non-www redirect preferences" })
    ] }) })
  },
  {
    id: "10",
    heading: "Hall of Fame",
    desc: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("p", { className: "mb-3", children: "Researchers who submit valid, first‑to‑report vulnerabilities may be listed (with consent) on our public Wall of Appreciation, including severity, vulnerability title and CVE (if issued). Anonymous credit available on request." }) })
  },
  {
    id: "11",
    heading: "Confidentiality & Data Use",
    desc: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("p", { className: "mb-3", children: "All submissions are treated as confidential. bridg.money handles vulnerability information in alignment with the Digital Personal Data Protection Act 2023 (DPDP 2023) and relevant RBI privacy circulars. We will not share your report outside our remediation team without permission, and request that you keep details private until coordinated disclosure timelines are met." }) })
  },
  {
    id: "12",
    heading: "Policy Lifecycle",
    desc: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("p", { className: "pb-5", children: [
      "This policy is Version 1.0. This document is informational and does not create contractual rights or obligations. bridg.money may modify the policy at any time at its sole discretion. This policy is governed by the laws of India, and disputes shall be subject to the exclusive jurisdiction of the courts in Bengaluru, Karnataka. Future updates will be posted at",
      " ",
      /* @__PURE__ */ jsx(Link, { to: "responsible-disclosure", className: "text-blue-600 underline", children: "https://www.bridg.money/responsible-disclosure" }),
      " ",
      "with a 14‑day notice for material changes."
    ] }) })
  },
  {
    id: "13",
    heading: "Contact",
    desc: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("ul", { className: "mb-3 list-disc pl-4 md:pl-10", children: [
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Security Team:" }),
        " ",
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "emailto:security@bridg.money",
            className: "text-blue-600 underline",
            children: "security@bridg.money"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Emergency phone (24 x 7):" }),
        " +91 76765 12809"
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Postal address (legal notices):" }),
        " Bridg Financial Technologies Pvt Ltd, WorkFlo Ranka Junction, #80/3 Old Madras Road, Bengaluru 560016, India"
      ] })
    ] }) })
  },
  {
    id: "14",
    heading: "Quick Summary",
    desc: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("ul", { className: "mb-3 list-disc pl-4 md:pl-10", children: [
        /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
          /* @__PURE__ */ jsx("strong", { children: "In‑scope:" }),
          " Prod dashboard, public APIs, sandbox partner portal, corporate site"
        ] }),
        /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
          /* @__PURE__ */ jsx("strong", { children: "Report to:" }),
          " ",
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "emailto:security@bridg.money",
              className: "text-blue-600 underline",
              children: "security@bridg.money"
            }
          ),
          " ",
          "(PGP) — Acknowledge ≤ 3 days"
        ] }),
        /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
          /* @__PURE__ */ jsx("strong", { children: "Rewards:" }),
          " Severity‑based, competitive, paid within 30 days post‑fix"
        ] }),
        /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
          /* @__PURE__ */ jsx("strong", { children: "Forbidden tests:" }),
          " Phishing, DoS, physical intrusion, data destruction"
        ] }),
        /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
          /* @__PURE__ */ jsx("strong", { children: "Safe‑harbour:" }),
          " Full legal protection when acting in good faith"
        ] })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mb-3", children: "Thank you for partnering with us to keep bridg.money secure." })
    ] })
  }
];
function SidebarHighlight$1() {
  const [activeId, setActiveId] = useState(headings$1[0].id);
  const itemRefs = useRef({});
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-50%  0px -50% 0px" }
    );
    headings$1.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (activeId && itemRefs.current[activeId]) {
      const sidebarEl = document.getElementById("sidebar");
      const activeEl = itemRefs.current[activeId];
      if (sidebarEl && activeEl) {
        const sidebarRect = sidebarEl.getBoundingClientRect();
        const activeRect = activeEl.getBoundingClientRect();
        if (activeRect.top < sidebarRect.top || activeRect.bottom > sidebarRect.bottom) {
          sidebarEl.scrollTop += activeRect.top - sidebarRect.top - 20;
        }
      }
    }
  }, [activeId]);
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "flex mb-10", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "w-65 sticky top-25 h-screen hidden lg:block overflow-y-auto",
        id: "sidebar",
        children: /* @__PURE__ */ jsx("ul", { className: "relative space-y-2", children: headings$1.map((sec) => {
          const isActive = activeId === sec.id;
          return /* @__PURE__ */ jsxs(
            "li",
            {
              ref: (el) => itemRefs.current[sec.id] = el,
              className: "relative",
              children: [
                isActive && /* @__PURE__ */ jsx(
                  motion.div,
                  {
                    layoutId: "activeBorder",
                    className: "absolute left-0 top-0 h-full w-1 bg-[#96DC03] rounded-r",
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 30
                    }
                  }
                ),
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: `#${sec.id}`,
                    className: `pl-5 py-2 block rounded transition-colors ${isActive ? "text-[#96DC03]" : "text-gray-500"}`,
                    children: sec.heading
                  }
                )
              ]
            },
            sec.id
          );
        }) })
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "flex-1 space-y-10 md:px-5 lg:pl-10 w-screen overflow-hidden", children: headings$1.map((sec) => /* @__PURE__ */ jsxs("section", { id: sec.id, className: "scroll-mt-28", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-3", children: sec.heading }),
      /* @__PURE__ */ jsx("section", { children: sec.desc })
    ] }, sec.id)) })
  ] }) });
}
const SecureUsageGuidelines = () => {
  return /* @__PURE__ */ jsxs("div", { className: "contaier px-7 md:px-10", children: [
    /* @__PURE__ */ jsx("h1", { className: "font-bold  text-3xl md:text-4xl pt-5 pb-10", children: "Secure Usage Guidelines" }),
    /* @__PURE__ */ jsx("section", { children: /* @__PURE__ */ jsx(SidebarHighlight, {}) })
  ] });
};
const headings = [
  {
    id: "1",
    heading: "Purpose",
    desc: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("p", { className: "mb-2", children: "These guidelines establish mandatory security controls and best practices for all users, merchants, developers, and partners who access or integrate with the bridg.money platform. They are designed to protect the confidentiality, integrity, and availability of systems and data while ensuring compliance with Indian regulations and international standards." }),
      /* @__PURE__ */ jsx("p", { className: "mb-3", children: "The purpose of this document is to:" }),
      /* @__PURE__ */ jsxs("ul", { className: "mb-3 list-disc pl-4 md:pl-10", children: [
        /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Provide a clear framework of security responsibilities for bridg.money and its ecosystem participants." }),
        /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Minimise risks of fraud, data breaches, financial loss, and reputational harm." }),
        /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Align bridg.money operations with RBI Master Directions, PCI-DSS, ISO 27001, and the Digital Personal Data Protection Act (DPDP 2023)." }),
        /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Support safe innovation by guiding developers and partners in secure coding, integration, and operational practices." }),
        /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Reinforce customer and regulator trust by demonstrating proactive governance and transparency." }),
        /* @__PURE__ */ jsx("li", { className: "mb-3", children: "Serve as a reference document for internal teams, auditors, regulators, and bank partners evaluating our security posture." })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mb-3", children: "These guidelines supplement – not replace – contractual obligations and applicable laws or regulations." })
    ] })
  },
  {
    id: "2",
    heading: "Scope",
    desc: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("p", { className: "mb-2", children: "These guidelines apply to all categories of systems, users, and data that interact with bridg.money. They ensure that every stakeholder follows a consistent security standard and that critical infrastructure remains resilient against threats." }),
      /* @__PURE__ */ jsx("p", { className: "mb-3 font-bold", children: "Category – Included Assets" }),
      /* @__PURE__ */ jsxs("ul", { className: "mb-3 list-disc pl-4 md:pl-10", children: [
        /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
          /* @__PURE__ */ jsx("strong", { children: "Interfaces:" }),
          " bridg.money web dashboard, mobile applications, API endpoints, SDKs, command-line utilities, and any future client-facing tools."
        ] }),
        /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
          /* @__PURE__ */ jsx("strong", { children: "Actors:" }),
          " Merchants, employees, contractors, service providers, developers, auditors, consultants, and integrated third-party systems."
        ] }),
        /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
          /* @__PURE__ */ jsx("strong", { children: "Data:" }),
          " Any personal, financial, transactional, or business data processed, stored, or transmitted via bridg.money infrastructure, including KYC/AML information, reconciliation data, logs, and audit trails."
        ] }),
        /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
          /* @__PURE__ */ jsx("strong", { children: "Infrastructure:" }),
          " Core systems, servers, databases, cloud environments, monitoring tools, APIs, CI/CD pipelines, and backup/disaster recovery systems used to support bridg.money operations."
        ] })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mb-3", children: "The scope extends across production, sandbox, and test environments, and applies to both internal users and external partners. These guidelines are binding for all parties engaging with bridg.money’s technology stack." })
    ] })
  },
  {
    id: "3",
    heading: " Key Definitions",
    desc: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("ul", { className: "mb-3 list-disc pl-4 md:pl-10", children: [
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "2FA:" }),
        " Two-Factor Authentication (OTP / authenticator app)."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "API Key:" }),
        " Credential issued to integrate programmatically with bridg.money."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Sensitive Data:" }),
        " Personally identifiable information (PII), financial data, authentication secrets, and any data classified Confidential or above."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "RBAC:" }),
        " Role-Based Access Control."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "DPO:" }),
        " Data Protection Officer."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-3", children: [
        /* @__PURE__ */ jsx("strong", { children: "CISO:" }),
        " Chief Information Security Officer, responsible for governance, audits, and regulatory liaison."
      ] })
    ] }) })
  },
  {
    id: "4",
    heading: "Security Governance",
    desc: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("ul", { className: "mb-3 list-disc pl-4 md:pl-10", children: [
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Risk Ownership:" }),
        " Each merchant is responsible for safeguarding its own credentials, infrastructure, and customer data."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Shared Responsibility Model:" }),
        " bridg.money secures core platform infrastructure; users secure their endpoints and usage."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: " Leadership Roles:" }),
        " The CISO and DPO oversee policy compliance, incident response, and regulator liaison."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Annual Review:" }),
        " These guidelines are reviewed every 12 months or upon major regulatory change."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Board Oversight:" }),
        " The Board of Directors receives quarterly dashboards on compliance, fraud trends, and incident response statistics."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Policy Enforcement:" }),
        " Violations may result in suspension, termination, regulatory reporting, or legal action."
      ] })
    ] }) })
  },
  {
    id: "5",
    heading: "Acceptable Use Requirements",
    desc: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
        /* @__PURE__ */ jsx("h6", { className: "font-bold mb-3", children: "Accounts & Credentials" }),
        /* @__PURE__ */ jsxs("ul", { className: "mb-3 list-disc pl-4 md:pl-10", children: [
          /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Create accounts with unique, verifiable business email IDs – shared or group IDs are prohibited." }),
          /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Passwords must be ≥ 12 characters with at least 1 uppercase, 1 lowercase, 1 digit, and 1 symbol." }),
          /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Enable 2FA for every administrator and finance role." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
        /* @__PURE__ */ jsx("h6", { className: "font-bold mb-3", children: "Device Security" }),
        /* @__PURE__ */ jsxs("ul", { className: "mb-3 list-disc pl-4 md:pl-10", children: [
          /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Keep operating systems, browsers, firmware, and antivirus solutions fully patched." }),
          /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Use full-disk encryption on laptops and mobile devices." }),
          /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Restrict privileged access to bridg.money dashboards to company-managed devices." }),
          /* @__PURE__ */ jsx("li", { className: "mb-3", children: "Ensure background verification and NDA compliance for all employees handling sensitive data." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
        /* @__PURE__ */ jsx("h6", { className: "font-bold mb-3", children: "Network Security" }),
        /* @__PURE__ */ jsxs("ul", { className: "mb-3 list-disc pl-4 md:pl-10", children: [
          /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Access the dashboard via private or corporate networks; avoid public Wi-Fi." }),
          /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Use VPN or zero-trust access solutions where feasible." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h6", { className: "font-bold mb-3", children: "Environment Hygiene" }),
        /* @__PURE__ */ jsxs("ul", { className: "mb-3 list-disc pl-4 md:pl-10", children: [
          /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Do not use production data in sandbox or test environments." }),
          /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Disable default or unused accounts and services promptly." }),
          /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Conduct quarterly reviews of environment segregation and security patches." })
        ] })
      ] })
    ] })
  },
  {
    id: "6",
    heading: "Authentication & Access Control",
    desc: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("ul", { className: "mb-3 list-disc pl-4 md:pl-10", children: [
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "RBAC:" }),
        " Assign least-privilege roles (Viewer, Ops, Finance, Admin)."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Quarterly Access Review:" }),
        " Re-validate all privileged roles every 90 days."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Session Timeout:" }),
        " Auto-logout after 15 minutes of inactivity."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "API Key Scope:" }),
        " Restrict by IP, environment (test/live), service (payouts, VAM, etc.)."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Key Rotation:" }),
        " Rotate or regenerate keys at least every 90 days or immediately after suspected compromise."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Credential Storage:" }),
        " Never embed keys in client-side code; use secure server-side vaults."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Password Hashing:" }),
        " bridg.money hashes all passwords with bcrypt (cost 12)."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Audit Trails:" }),
        " Maintain complete logs of authentication, privilege escalations, and API key issuance/revocation for ≥ 5 years."
      ] })
    ] }) })
  },
  {
    id: "7",
    heading: "Secure Development & Integration",
    desc: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("ul", { className: "mb-3 list-disc pl-4 md:pl-10", children: [
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Environment Separation:" }),
        " Use Bridg sandbox for development; never test with live data."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Secrets Management:" }),
        " Store API keys, JWT secrets, and database passwords in encrypted secret stores (e.g., AWS Secrets Manager, HashiCorp Vault)."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Secure Coding Standard:" }),
        " Follow OWASP ASVS 4.0 and SEI-CERT guidelines."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "SAST/DAST & Dependency Scanning:" }),
        " Run static, dynamic, and ",
        /* @__PURE__ */ jsx("strong", { children: "software-composition analysis (SCA)" }),
        " ",
        "scans; remediate CVEs before deployment."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Webhook Validation:" }),
        " All webhooks are signed (HMAC-SHA256). Verify the signature header before processing events."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Rate Limiting:" }),
        " Implement retry logic with exponential back-off; do not exceed published rate limits."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "DNS Hygiene:" }),
        " Honour bridg.money DNS TTLs (no aggressive caching) to ensure quick fail-over & certificate rotation."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "API Lifecycle & Versioning:" }),
        " bridg.money publishes a stable, date-based API version (e.g., 2025-08-01) with a 6-month deprecation window for breaking changes. Multiple versions are supported concurrently; upgrade guides are provided."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-3", children: [
        /* @__PURE__ */ jsx("strong", { children: "Code Reviews:" }),
        " Enforce peer reviews, unit testing, and CI/CD pipeline checks before production deployment."
      ] })
    ] }) })
  },
  {
    id: "8",
    heading: "Data Protection & Privacy",
    desc: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("ul", { className: "mb-3 list-disc pl-4 md:pl-10", children: [
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Data Collection:" }),
        " Collect only data necessary for the stated business purpose or legal obligation (data minimisation)."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: " Data Classification & Encryption:" }),
        /* @__PURE__ */ jsxs("ul", { className: "mb-3 list-disc pl-4 md:pl-10", children: [
          /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Public: Product documentation → Optional encryption." }),
          /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Internal: Configuration files → Transport encryption (TLS)." }),
          /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Confidential: PII, KYC docs, transaction data → AES-256 at rest + TLS in transit." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: " Retention & Disposal:" }),
        /* @__PURE__ */ jsxs("ul", { className: "mb-3 list-disc pl-4 md:pl-10", children: [
          /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Retain transactional & KYC data for 8 years (per RBI Master Directions) or longer if legally mandated." }),
          /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Dispose of data securely (crypto-shred or DoD wipe) once retention period lapses." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Data-Subject Rights:" }),
        " bridg.money honours rights to access, correction, deletion, portability, and consent withdrawal under India’s DPDP Act and (if applicable) GDPR."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Cross-Border Transfers:" }),
        " Data remains within India unless explicit consent and adequate safeguards exist for permitted regions (EU SCCs, BCRs, or equivalent mechanisms)."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-3", children: [
        /* @__PURE__ */ jsx("strong", { children: "Third-Party Data Processing:" }),
        " Vendors handling personal or sensitive data must sign binding Data Processing Agreements (DPAs)."
      ] })
    ] }) })
  },
  {
    id: "9",
    heading: "Transaction Security",
    desc: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("ul", { className: "mb-3 list-disc pl-4 md:pl-10", children: [
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "All API and dashboard traffic must use TLS 1.2+; bridg.money rejects plain HTTP." }),
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Validate beneficiary name and account number (penny-drop or bank API) for payouts over INR 50,000." }),
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Enable maker-checker workflows on corporate payouts." }),
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "bridg.money reviews fraud and AML patterns daily." }),
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Merchants must configure transaction-level approval thresholds (₹ amount & risk category)." }),
      /* @__PURE__ */ jsx("li", { className: "mb-3", children: "Suspicious transactions are escalated to AML teams within 1 hour." })
    ] }) })
  },
  {
    id: "10",
    heading: "Monitoring, Logging & Alerting",
    desc: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("ul", { className: "mb-3 list-disc pl-4 md:pl-10", children: [
      /* @__PURE__ */ jsxs("li", { className: "mb-2 font-bold", children: [
        /* @__PURE__ */ jsx("strong", { children: "Transaction Logs:" }),
        " Retain for a minimum of 5 years; export via BridgRecon or API."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Security Logs:" }),
        " Retain for 8 years; stored in tamper-evident, WORM-compliant storage."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: " Anomaly Detection:" }),
        " Configure alerts for unusual spikes, geo-location anomalies, or repeated failures."
      ] }),
      /* @__PURE__ */ jsx("li", { className: "mb-3", children: "Logs are periodically reviewed by the compliance and risk team." })
    ] }) })
  },
  {
    id: "11",
    heading: "Incident Response & Reporting",
    desc: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("ul", { className: "mb-3 list-disc pl-4 md:pl-10", children: [
        /* @__PURE__ */ jsxs("li", { className: "mb-2 font-bold", children: [
          /* @__PURE__ */ jsx("strong", { children: "Contain:" }),
          " Suspend affected API keys/users. bridg.money acknowledges within 24 hours."
        ] }),
        /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
          /* @__PURE__ */ jsx("strong", { children: " Report:" }),
          " Email security@bridg.money with incident details; Bridg provides an IR reference number."
        ] }),
        /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
          /* @__PURE__ */ jsx("strong", { children: "Investigate:" }),
          " Cooperate with Bridg investigators; interim updates: Sev 1 – hourly, Sev 2 – 4-hourly, Sev 3 – daily."
        ] }),
        /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
          /* @__PURE__ */ jsx("strong", { children: "Eradicate:" }),
          " Patch systems, reset credentials; confirm closure & preventive steps."
        ] }),
        /* @__PURE__ */ jsxs("li", { className: "mb-3", children: [
          /* @__PURE__ */ jsx("strong", { children: "Post-mortem:" }),
          " Share learnings & remediation plan; Bridg delivers incident report within 10 days."
        ] })
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "mb-3", children: [
        /* @__PURE__ */ jsx("strong", { children: "Safe-Harbor:" }),
        " Good-faith security researchers following our Responsible Disclosure programme will not face legal action, provided they do not exploit data and report promptly."
      ] })
    ] })
  },
  {
    id: "12",
    heading: "Business Continuity & Disaster Recovery",
    desc: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("ul", { className: "mb-3 list-disc pl-4 md:pl-10", children: [
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "RTO ≤ 1 hour and RPO ≤ 15 minutes for critical services." }),
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Annual DR test conducted every Q2; summary results available on request." }),
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Incident updates are posted on status.bridg.money with email/SMS alerts for Sev 1 outages." }),
      /* @__PURE__ */ jsx("li", { className: "mb-3", children: "Critical vendor dependencies are included in DR planning." })
    ] }) })
  },
  {
    id: "13",
    heading: "Compliance & Audits",
    desc: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("ul", { className: "mb-3 list-disc pl-4 md:pl-10", children: [
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Platform certified against PCI-DSS v4.0 and aligned with ISO 27001 controls." }),
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Annual VAPT performed by CERT-IN empanelled partners." }),
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "SOC 2 Type II attestation in progress (target completion Q1 2026)." }),
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "bridg.money operates a private bug-bounty programme (invite-only)." }),
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "RBI/Bank Audits: bridg.money cooperates with RBI inspections, statutory auditors, and partner bank compliance reviews." }),
      /* @__PURE__ */ jsx("li", { className: "mb-3", children: "FIU Reporting: AML monitoring and suspicious activity reports (STR/CTR) are filed with FIU-IND as required." })
    ] }) })
  },
  {
    id: "14",
    heading: "Prohibited Activities",
    desc: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("ul", { className: "mb-3 list-disc pl-4 md:pl-10", children: [
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Money laundering, terror financing, corruption, child exploitation." }),
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "High-risk categories (gambling, crypto, adult content) without explicit written approval." }),
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Unauthorized penetration testing, scraping, or denial-of-service attacks." }),
      /* @__PURE__ */ jsx("li", { className: "mb-3", children: "Activities that compromise confidentiality, integrity, or availability of Bridg systems." })
    ] }) })
  },
  {
    id: "15",
    heading: "Third-Party Services & Plugins",
    desc: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("ul", { className: "mb-3 list-disc pl-4 md:pl-10", children: [
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Use only vetted plugins/extensions that comply with these guidelines." }),
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Merchants must perform vendor security assessments for any third-party code touching Bridg APIs." }),
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Users are responsible for security of any code executed on their infrastructure." }),
      /* @__PURE__ */ jsx("li", { className: "mb-3", children: "bridg.money reviews third-party providers periodically for compliance with DPDP and RBI requirements." })
    ] }) })
  },
  {
    id: "16",
    heading: "Updates to Guidelines",
    desc: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("p", { className: "mb-5", children: [
      "This document may be revised to address new threats or regulations. The latest version is always available at",
      " ",
      /* @__PURE__ */ jsx(Link, { to: "/security", className: "text-blue-600 underline", children: "www.bridg.money/security." }),
      " ",
      "Continued use constitutes acceptance of updates. API Deprecation Policy: Breaking API changes are communicated at least 6 months in advance. Clients have a rollback window of 72 hours after upgrade."
    ] }) })
  },
  {
    id: "17",
    heading: "Contact Information",
    desc: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("ul", { className: "mb-3 list-disc pl-4 md:pl-10", children: [
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Security Incidents:" }),
        " ",
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "emailto:security@bridg.money",
            className: "text-blue-600 underline",
            children: "security@bridg.money"
          }
        ),
        " ",
        "(24 × 7)"
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "General Support:" }),
        " ",
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "emailto:hello@bridg.money",
            className: "text-blue-600 underline",
            children: "hello@bridg.money"
          }
        ),
        " ",
        "(09:00–18:00 IST, Mon–Fri)"
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Phone Support:" }),
        " ",
        /* @__PURE__ */ jsx("a", { href: "tel:+91 76765 12809", className: "text-blue-600 underline", children: "+91 76765 12809" }),
        " ",
        "(09:00–18:00 IST, Mon–Fri)"
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-3", children: [
        /* @__PURE__ */ jsx("strong", { children: "Postal Address:" }),
        " Bridg Financial Technologies Pvt. Ltd., WorkFlo Ranka Junction, Property No. 224, 3rd Floor, #80/3, Vijinapura Village, Old Madras Road (OMR), KR Puram Hobli, Bengaluru - 560016, India"
      ] })
    ] }) })
  },
  {
    id: "18",
    heading: "Quick Reference",
    desc: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("ul", { className: "mb-3 list-disc pl-4 md:pl-10", children: [
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Passwords ≥ 12 chars + 2FA" }),
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Never share or hard-code API keys; rotate every 90 days." }),
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "HTTPS only; verify webhook signatures." }),
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Monitor logs daily; investigate anomalies promptly." }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        "Report incidents to",
        " ",
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "emailto:security@bridg.money",
            className: "text-blue-600 underline",
            children: "security@bridg.money"
          }
        ),
        " ",
        "within 24 hours."
      ] }),
      /* @__PURE__ */ jsx("li", { className: "mb-2", children: "Follow API deprecation notices; migrate within 6 months to avoid disruption." })
    ] }) })
  },
  {
    id: "19",
    heading: "Policy Governance",
    desc: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("ul", { className: "mb-3 list-disc pl-4 md:pl-10", children: [
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Document ID:" }),
        " SG-001"
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Owner:" }),
        " Chief Information Security Officer (CISO)"
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Approval Authority:" }),
        " Board of Directors"
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Versioning Scheme:" }),
        " Semantic (major.minor.patch). Operational changes increment minor; textual fixes increment patch."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Distribution:" }),
        " Confluence (HTML) & Signed PDF (SHA-256 checksum)."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Next Review Due:" }),
        " 01 September 2026"
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Supersedes:" }),
        " All prior Secure Usage Guidelines"
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Change Log:" }),
        " Stored in Git; diff summary available on request."
      ] })
    ] }) })
  }
];
function SidebarHighlight() {
  const [activeId, setActiveId] = useState(headings[0].id);
  const itemRefs = useRef({});
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-50%  0px -50% 0px" }
    );
    headings.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (activeId && itemRefs.current[activeId]) {
      const sidebarEl = document.getElementById("sidebar");
      const activeEl = itemRefs.current[activeId];
      if (sidebarEl && activeEl) {
        const sidebarRect = sidebarEl.getBoundingClientRect();
        const activeRect = activeEl.getBoundingClientRect();
        if (activeRect.top < sidebarRect.top || activeRect.bottom > sidebarRect.bottom) {
          sidebarEl.scrollTop += activeRect.top - sidebarRect.top - 20;
        }
      }
    }
  }, [activeId]);
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "flex mb-20", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "w-65 sticky top-25 h-screen hidden lg:block overflow-y-auto",
        id: "sidebar",
        children: /* @__PURE__ */ jsx("ul", { className: "relative space-y-2", children: headings.map((sec) => {
          const isActive = activeId === sec.id;
          return /* @__PURE__ */ jsxs(
            "li",
            {
              ref: (el) => itemRefs.current[sec.id] = el,
              className: "relative",
              children: [
                isActive && /* @__PURE__ */ jsx(
                  motion.div,
                  {
                    layoutId: "activeBorder",
                    className: "absolute left-0 top-0 h-full w-1 bg-[#96DC03] rounded-r",
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 30
                    }
                  }
                ),
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: `#${sec.id}`,
                    className: `pl-5 py-2 block rounded transition-colors ${isActive ? "text-[#96DC03]" : "text-gray-500"}`,
                    children: sec.heading
                  }
                )
              ]
            },
            sec.id
          );
        }) })
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "flex-1 space-y-10 md:px-5 lg:pl-10 w-screen overflow-hidden", children: headings.map((sec) => /* @__PURE__ */ jsxs("section", { id: sec.id, className: "scroll-mt-28", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-3", children: sec.heading }),
      /* @__PURE__ */ jsx("section", { children: sec.desc })
    ] }, sec.id)) })
  ] }) });
}
const SlidingCard = ({ cards = [] }) => {
  return /* @__PURE__ */ jsx("div", { children: cards.map((card, idx) => /* @__PURE__ */ jsxs(
    "div",
    {
      className: `border mb-10 border-[#A4F200] rounded-2xl p-8 sm:p-10 ${idx % 2 === 0 ? "-rotate-2" : "rotate-2"}`,
      children: [
        /* @__PURE__ */ jsx("p", { className: "text-[#A4F200] text-5xl xl:text-7xl font-[500] mb-2", children: card.id }),
        /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-3xl font-bold mb-2", children: card.heading }),
        /* @__PURE__ */ jsx("p", { className: "text-lg mb-3", children: card.desc })
      ]
    },
    card.id
  )) });
};
const BenefitImg$b = "/assets/small-business-B0thUjyk.webp";
const SmallBusiness = () => {
  const cards = [
    {
      id: 1,
      heading: "Complete KYC/KYB",
      desc: "Get started by verifying your business through our secure onboarding portal."
    },
    {
      id: 2,
      heading: "Set Up Dashboard or APIs",
      desc: "Manage payouts and collections directly from our dashboard or integrate seamlessly via APIs."
    },
    {
      id: 3,
      heading: "Process Payouts Instantly",
      desc: "Upload vendor or salary lists, and process bulk payouts in just a click."
    },
    {
      id: 4,
      heading: "Enable Customer Collections",
      desc: "Generate UPI handles or virtual accounts—customers pay, and we auto-reconcile."
    },
    {
      id: 5,
      heading: "Track & Reconcile in Real-Time",
      desc: "View live balances, settlements, and reconciled statements through connected banking."
    }
  ];
  const benefits = [
    {
      id: 1,
      heading: "Never Miss a Payment",
      desc: "No delays in vendor/staff payments."
    },
    {
      id: 2,
      heading: "Offer Easy Customer Options",
      desc: "Customers pay easily via multiple channels."
    },
    {
      id: 3,
      heading: "Reduce Manual Errors",
      desc: "Automated reconciliation saves time and effort."
    },
    {
      id: 4,
      heading: "See the Full Picture",
      desc: "Centralized financial visibility across accounts."
    }
  ];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("section", { className: " bg-[linear-gradient(#0B0B0B40,#0B0B0B40),url('./assets/images/useCase/hero-section/small-business.webp')] bg-cover h-screen bg-center flex items-center", children: /* @__PURE__ */ jsx("div", { className: "px-6 pt-30 py-20 sm:px-15 xl:px-25", children: /* @__PURE__ */ jsx("div", { className: "grid lg:grid-cols-3 gap-x-10 gap-y-5", children: /* @__PURE__ */ jsx("div", { className: "flex items-center col-span-2", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(
        TitleDecor,
        {
          title: "Small Businesses",
          clr: "black",
          bgClr: "white"
        }
      ),
      /* @__PURE__ */ jsxs(TextFade, { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-5xl lg:text-[53px] font-semibold leading-15 text-white lg:leading-17 mb-3", children: "Smarter Money Movement for Growing Businesses" }),
        /* @__PURE__ */ jsx("p", { className: "my-3 lg:my-4 text-lg text-white", children: "Small businesses often operate on thin margins and tight cash cycles. Manual reconciliations, delayed vendor payments, and limited visibility into funds can slow growth." }),
        /* @__PURE__ */ jsx(Button, { text: "Get Started", bgClr: "#A5EB14", url: "/contact" })
      ] })
    ] }) }) }) }) }),
    /* @__PURE__ */ jsx("section", { className: "bg-[#FCF9F0] px-8 md:px-30 py-15", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-x-10 gap-y-5", children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(TextFade, { children: /* @__PURE__ */ jsxs("h1", { className: "text-4xl lg:text-[45px] font-semibold leading-12 lg:leading-16 mb-3", children: [
        "Instant Payouts.",
        /* @__PURE__ */ jsx("br", {}),
        " Seamless Collections.",
        /* @__PURE__ */ jsx("br", {}),
        " Real-Time Visibility."
      ] }) }) }) }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsx("p", { className: "my-3 lg:my-4 text-lg", children: "bridg.money equips small businesses with enterprise-grade tools. With payout APIs, you can pay vendors, employees, and partners instantly. Our collections suite allows you to accept payments across UPI, cards, and net banking, while connected banking gives you real-time financial visibility across accounts." }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "px-8 md:px-30 py-15 bg-[linear-gradient(180deg,#FFFFFF_0%,#F5FFE0_100%)]", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-10 relative", children: [
      /* @__PURE__ */ jsx("div", { className: "lg:sticky top-40 h-fit", children: /* @__PURE__ */ jsxs(TextFade, { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-4xl sm:text-5xl font-semibold mb-2", children: "How it works" }),
        /* @__PURE__ */ jsx("p", { className: "text-lg mb-5", children: "Here’s a simple step-by-step view of how bridg.money powers your financial operations." })
      ] }) }),
      /* @__PURE__ */ jsx(SlidingCard, { cards })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "px-8 md:px-20 py-15 ", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-5 gap-y-10 relative", children: [
      /* @__PURE__ */ jsx("div", { className: "sm:px-15 flex items-center", children: /* @__PURE__ */ jsxs("div", { className: "relative p-2.5", children: [
        /* @__PURE__ */ jsx("img", { src: BenefitImg$b, className: "rounded-3xl" }),
        /* @__PURE__ */ jsx("div", { className: "bg-[#A5EB14] h-60 sm:h-80 w-full absolute bottom-0 left-0 -z-10 rounded-3xl" })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "font-semibold text-3xl sm:text-4xl mb-2", children: "Benefits" }),
        /* @__PURE__ */ jsx("p", { className: "mb-10 text-lg", children: "Unlock faster payments, automated reconciliation, and real-time visibility tailored to your business needs." }),
        /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 gap-5", children: benefits.map((benefit) => /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "h-2.5 w-2.5 rounded-full bg-[#A5EB14] mb-3" }),
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mb-2", children: benefit.heading }),
          /* @__PURE__ */ jsx("p", { children: benefit.desc })
        ] })) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "px-6 sm:px-20 my-10 md:my-15 flex justify-center", children: /* @__PURE__ */ jsxs("div", { className: "bg-[url('./assets/images/useCase/cta.webp')] overflow-hidden bg-fixed bg-center bg-no-repeat bg-cover rounded-3xl relative p-5 grid grid-rows-2 md:grid-rows-3 grid-cols-3 items-end", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[#0A0C3326] z-0" }),
      /* @__PURE__ */ jsx("div", { className: "row-start-2 md:row-start-3 z-1 col-span-3 sm:col-span-2", children: /* @__PURE__ */ jsxs(TextFade, { direction: "up", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-lg text-white md:text-5xl font-semibold mb-3", children: "Ready to Bridg the Gap?" }),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-white mb-4", children: "Join thousands of businesses using bridg.money to streamline their financial operations. Start accepting payments and managing payouts in minutes." })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-end items-end mb-4 h-full row-start-3 col-span-3 md:col-span-3 z-1", children: /* @__PURE__ */ jsx(
        Button,
        {
          text: "Book a Demo",
          clr: "#ffffff",
          brClr: "#ffffff",
          arrClr: "#ffffff",
          url: "/contact"
        }
      ) })
    ] }) })
  ] });
};
const BenefitImg$a = "/assets/startup-CopUHoLz.webp";
const StartUp = () => {
  const cards = [
    {
      id: 1,
      heading: "Quick Onboarding",
      desc: "Get started fast with lightweight KYB."
    },
    {
      id: 2,
      heading: "Collect Funds Easily",
      desc: "Generate invoices or payment links → receive funds instantly."
    },
    {
      id: 3,
      heading: "Automate Payouts",
      desc: "Disburse payroll, freelancer, or vendor payments instantly."
    },
    {
      id: 4,
      heading: "Stay in Control",
      desc: "Track every transaction and balance with connected banking APIs."
    }
  ];
  const benefits = [
    {
      id: 1,
      heading: "Get Started Fas",
      desc: "Quick setup, perfect for lean teams."
    },
    {
      id: 2,
      heading: "Support Gig Workers",
      desc: " Instant payouts to freelancers and vendors."
    },
    {
      id: 3,
      heading: "Handle Any Payment Type",
      desc: "Smooth subscription and one-time collections."
    },
    {
      id: 4,
      heading: "Better Growth Decisions",
      desc: "Real-time fund visibility for smarter planning."
    }
  ];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("section", { className: " bg-[linear-gradient(270deg,rgba(11,11,11,0)_0%,#0B0B0B_100%),url('./assets/images/useCase/hero-section/startup.webp')] bg-cover h-screen bg-center flex items-center", children: /* @__PURE__ */ jsx("div", { className: "px-6 pt-30 py-20 sm:px-15 xl:px-25", children: /* @__PURE__ */ jsx("div", { className: "grid lg:grid-cols-2 gap-x-10 gap-y-5", children: /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(TitleDecor, { title: "Startups", clr: "black", bgClr: "white" }),
      /* @__PURE__ */ jsxs(TextFade, { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-5xl lg:text-[53px] font-semibold leading-15 text-white lg:leading-17 mb-3", children: "Scale Faster with Seamless Payment Infrastructure" }),
        /* @__PURE__ */ jsx("p", { className: "my-3 lg:my-4 text-lg text-white", children: "Startups thrive on speed and agility, but banking operations often slow them down. Whether paying freelancers, handling subscriptions, or managing collections, inefficiencies can hinder growth." }),
        /* @__PURE__ */ jsx(Button, { text: "Get Started", bgClr: "#A5EB14", url: "/contact" })
      ] })
    ] }) }) }) }) }),
    /* @__PURE__ */ jsx("section", { className: "bg-[#FCF9F0] px-8 md:px-30 py-15", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-x-10 gap-y-5", children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(TextFade, { children: /* @__PURE__ */ jsxs("h1", { className: "text-4xl lg:text-[45px] font-semibold leading-12 lg:leading-16 mb-3", children: [
        "Instant Payouts.",
        /* @__PURE__ */ jsx("br", {}),
        " Seamless Collections.",
        /* @__PURE__ */ jsx("br", {}),
        " Real-Time Visibility."
      ] }) }) }) }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsx("p", { className: "my-3 lg:my-4 text-lg", children: "bridg.money helps startups focus on scaling, not banking hurdles. With payouts, disburse salaries, reimbursements, or vendor payments instantly. With collections, accept recurring or one-time payments. With connected banking, get real-time oversight to extend your runway and plan growth better." }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "px-8 md:px-30 py-15 bg-[linear-gradient(180deg,#FFFFFF_0%,#F5FFE0_100%)]", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-10 relative", children: [
      /* @__PURE__ */ jsx("div", { className: "lg:sticky top-40 h-fit", children: /* @__PURE__ */ jsxs(TextFade, { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-4xl sm:text-5xl font-semibold mb-2", children: "How it works" }),
        /* @__PURE__ */ jsx("p", { className: "text-lg mb-5", children: "Here’s a simple step-by-step view of how bridg.money powers your financial operations." })
      ] }) }),
      /* @__PURE__ */ jsx(SlidingCard, { cards })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "px-8 md:px-20 py-15 ", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-5 gap-y-10 relative", children: [
      /* @__PURE__ */ jsx("div", { className: "sm:px-15 flex items-center", children: /* @__PURE__ */ jsxs("div", { className: "relative p-2.5", children: [
        /* @__PURE__ */ jsx("img", { src: BenefitImg$a, className: "rounded-3xl" }),
        /* @__PURE__ */ jsx("div", { className: "bg-[#A5EB14] h-60 sm:h-80 w-full absolute bottom-0 left-0 -z-10 rounded-3xl" })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "font-semibold text-3xl sm:text-4xl mb-2", children: "Benefits" }),
        /* @__PURE__ */ jsx("p", { className: "mb-10 text-lg", children: "Unlock faster payments, automated reconciliation, and real-time visibility tailored to your business needs." }),
        /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 gap-5", children: benefits.map((benefit) => /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "h-2.5 w-2.5 rounded-full bg-[#A5EB14] mb-3" }),
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mb-2", children: benefit.heading }),
          /* @__PURE__ */ jsx("p", { children: benefit.desc })
        ] })) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "px-6 sm:px-20 my-10 md:my-15 flex justify-center", children: /* @__PURE__ */ jsxs("div", { className: "bg-[url('./assets/images/useCase/cta.webp')] overflow-hidden bg-fixed bg-center bg-no-repeat bg-cover rounded-3xl relative p-5 grid grid-rows-2 md:grid-rows-3 grid-cols-3 items-end", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[#0A0C3326] z-0" }),
      /* @__PURE__ */ jsx("div", { className: "row-start-2 md:row-start-3 z-1 col-span-3 sm:col-span-2", children: /* @__PURE__ */ jsxs(TextFade, { direction: "up", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-lg text-white md:text-5xl font-semibold mb-3", children: "Ready to Bridg the Gap?" }),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-white mb-4", children: "Join thousands of businesses using bridg.money to streamline their financial operations. Start accepting payments and managing payouts in minutes." })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-end items-end mb-4 h-full row-start-3 col-span-3 md:col-span-3 z-1", children: /* @__PURE__ */ jsx(
        Button,
        {
          text: "Book a Demo",
          clr: "#ffffff",
          brClr: "#ffffff",
          arrClr: "#ffffff",
          url: "/contact"
        }
      ) })
    ] }) })
  ] });
};
const BenefitImg$9 = "/assets/sme-C7hT7EGG.webp";
const SME = () => {
  const cards = [
    {
      id: 1,
      heading: "Business Setup",
      desc: "Register your SME and complete KYB."
    },
    {
      id: 2,
      heading: "Accept Payments",
      desc: "Collect customer payments through UPI, net banking, or cards."
    },
    {
      id: 3,
      heading: "Automate Payouts",
      desc: "Schedule or bulk vendor/supplier disbursals."
    },
    {
      id: 4,
      heading: "Stay Compliant",
      desc: "Access reconciled statements and transaction insights with connected banking."
    }
  ];
  const benefits = [
    {
      id: 1,
      heading: "Instant Vendor Settlements",
      desc: "Pay suppliers without delays."
    },
    {
      id: 2,
      heading: "Automated Receivables",
      desc: "Collect customer dues seamlessly."
    },
    {
      id: 3,
      heading: "Eliminate Errors",
      desc: "Reduced manual reconciliation."
    },
    {
      id: 4,
      heading: "One Dashboard View",
      desc: "Consolidated financial visibility across banks."
    }
  ];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("section", { className: " bg-[linear-gradient(270deg,rgba(11,11,11,0)_0%,#0B0B0B_100%),url('./assets/images/useCase/hero-section/sme.webp')] bg-cover h-screen bg-center flex items-center", children: /* @__PURE__ */ jsx("div", { className: "px-6 pt-30 py-20 sm:px-15 xl:px-25", children: /* @__PURE__ */ jsx("div", { className: "grid lg:grid-cols-2 gap-x-10 gap-y-5", children: /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(TitleDecor, { title: "SMEs", clr: "black", bgClr: "white" }),
      /* @__PURE__ */ jsxs(TextFade, { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-5xl lg:text-[53px] font-semibold leading-15 text-white lg:leading-17 mb-3", children: "Streamline Financial Operations for SMEs" }),
        /* @__PURE__ */ jsx("p", { className: "my-3 lg:my-4 text-lg text-white", children: "SMEs often handle large supplier networks, bulk payouts, and recurring receivables. Manual processes can cause delays, inefficiencies, and errors." }),
        /* @__PURE__ */ jsx(Button, { text: "Get Started", bgClr: "#A5EB14", url: "/contact" })
      ] })
    ] }) }) }) }) }),
    /* @__PURE__ */ jsx("section", { className: "bg-[#FCF9F0] px-8 md:px-30 py-15", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-x-10 gap-y-5", children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(TextFade, { children: /* @__PURE__ */ jsxs("h1", { className: "text-4xl lg:text-[45px] font-semibold leading-12 lg:leading-16 mb-3", children: [
        "Instant Payouts.",
        /* @__PURE__ */ jsx("br", {}),
        " Seamless Collections.",
        /* @__PURE__ */ jsx("br", {}),
        " Real-Time Visibility."
      ] }) }) }) }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsx("p", { className: "my-3 lg:my-4 text-lg", children: "bridg.money offers SMEs a powerful way to automate their financial operations. Payout APIs handle vendor and distributor payments instantly. Collections tools capture receivables seamlessly. Connected banking ensures real-time monitoring and reconciliation across multiple accounts." }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "px-8 md:px-30 py-15 bg-[linear-gradient(180deg,#FFFFFF_0%,#F5FFE0_100%)]", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-10 relative", children: [
      /* @__PURE__ */ jsx("div", { className: "lg:sticky top-40 h-fit", children: /* @__PURE__ */ jsxs(TextFade, { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-4xl sm:text-5xl font-semibold mb-2", children: "How it works" }),
        /* @__PURE__ */ jsx("p", { className: "text-lg mb-5", children: "Here’s a simple step-by-step view of how bridg.money powers your financial operations." })
      ] }) }),
      /* @__PURE__ */ jsx(SlidingCard, { cards })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "px-8 md:px-20 py-15 ", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-5 gap-y-10 relative", children: [
      /* @__PURE__ */ jsx("div", { className: "sm:px-15 flex items-center", children: /* @__PURE__ */ jsxs("div", { className: "relative p-2.5", children: [
        /* @__PURE__ */ jsx("img", { src: BenefitImg$9, className: "rounded-3xl" }),
        /* @__PURE__ */ jsx("div", { className: "bg-[#A5EB14] h-60 sm:h-80 w-full absolute bottom-0 left-0 -z-10 rounded-3xl" })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "font-semibold text-3xl sm:text-4xl mb-2", children: "Benefits" }),
        /* @__PURE__ */ jsx("p", { className: "mb-10 text-lg", children: "Unlock faster payments, automated reconciliation, and real-time visibility tailored to your business needs." }),
        /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 gap-5", children: benefits.map((benefit) => /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "h-2.5 w-2.5 rounded-full bg-[#A5EB14] mb-3" }),
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mb-2", children: benefit.heading }),
          /* @__PURE__ */ jsx("p", { children: benefit.desc })
        ] })) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "px-6 sm:px-20 my-10 md:my-15 flex justify-center", children: /* @__PURE__ */ jsxs("div", { className: "bg-[url('./assets/images/useCase/cta.webp')] overflow-hidden bg-fixed bg-center bg-no-repeat bg-cover rounded-3xl relative p-5 grid grid-rows-2 md:grid-rows-3 grid-cols-3 items-end", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[#0A0C3326] z-0" }),
      /* @__PURE__ */ jsx("div", { className: "row-start-2 md:row-start-3 z-1 col-span-3 sm:col-span-2", children: /* @__PURE__ */ jsxs(TextFade, { direction: "up", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-lg text-white md:text-5xl font-semibold mb-3", children: "Ready to Bridg the Gap?" }),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-white mb-4", children: "Join thousands of businesses using bridg.money to streamline their financial operations. Start accepting payments and managing payouts in minutes." })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-end items-end mb-4 h-full row-start-3 col-span-3 md:col-span-3 z-1", children: /* @__PURE__ */ jsx(
        Button,
        {
          text: "Book a Demo",
          clr: "#ffffff",
          brClr: "#ffffff",
          arrClr: "#ffffff",
          url: "/contact"
        }
      ) })
    ] }) })
  ] });
};
const BenefitImg$8 = "/assets/Enterprise-JlWWZf0T.webp";
const Enterprise = () => {
  const cards = [
    {
      id: 1,
      heading: "Enterprise KYB",
      desc: "Onboard with system-level integration."
    },
    {
      id: 2,
      heading: "Payout at Scale",
      desc: "Disburse funds to vendors, employees, or partners across geographies."
    },
    {
      id: 3,
      heading: "Multi-Channel Collections",
      desc: "Accept payments through UPI, cards, and net banking worldwide."
    },
    {
      id: 4,
      heading: "Comprehensive Monitoring",
      desc: "Reconcile balances across all accounts with connected banking APIs."
    }
  ];
  const benefits = [
    {
      id: 1,
      heading: "High-Throughput Processing",
      desc: "Handle millions of transactions smoothly."
    },
    {
      id: 2,
      heading: "Audit Ready",
      desc: "Automated reconciliation ensures compliance."
    },
    {
      id: 3,
      heading: "Resilient Operations",
      desc: "Multi-bank routing ensures uptime."
    },
    {
      id: 4,
      heading: "Peace of Mind",
      desc: "End-to-end compliance built in."
    }
  ];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("section", { className: " bg-[linear-gradient(270deg,rgba(11,11,11,0)_0%,#0B0B0B_100%),url('./assets/images/useCase/hero-section/Enterprise.webp')] bg-cover h-screen bg-center flex items-center", children: /* @__PURE__ */ jsx("div", { className: "px-6 pt-30 py-20 sm:px-15 xl:px-25", children: /* @__PURE__ */ jsx("div", { className: "grid lg:grid-cols-2 gap-x-10 gap-y-5", children: /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(TitleDecor, { title: "Enterprise", clr: "black", bgClr: "white" }),
      /* @__PURE__ */ jsxs(TextFade, { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-5xl lg:text-[53px] font-semibold leading-15 text-white lg:leading-17 mb-3", children: "Enterprise-Grade Payments at Scale" }),
        /* @__PURE__ */ jsx("p", { className: "my-3 lg:my-4 text-lg text-white", children: "Enterprises need secure, compliant, and scalable financial infrastructure. Managing millions of transactions, multiple subsidiaries, and global vendors requires more than traditional banking." }),
        /* @__PURE__ */ jsx(Button, { text: "Get Started", bgClr: "#A5EB14", url: "/contact" })
      ] })
    ] }) }) }) }) }),
    /* @__PURE__ */ jsx("section", { className: "bg-[#FCF9F0] px-8 md:px-30 py-15", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-x-10 gap-y-5", children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(TextFade, { children: /* @__PURE__ */ jsxs("h1", { className: "text-4xl lg:text-[45px] font-semibold leading-12 lg:leading-16 mb-3", children: [
        "Instant Payouts.",
        /* @__PURE__ */ jsx("br", {}),
        " Seamless Collections.",
        /* @__PURE__ */ jsx("br", {}),
        " Real-Time Visibility."
      ] }) }) }) }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsx("p", { className: "my-3 lg:my-4 text-lg", children: "bridg.money provides enterprises with high-volume payout APIs, collections solutions, and connected banking APIs to manage funds at scale. Multi-bank routing, real-time reconciliations, and audit-ready dashboards make operations seamless." }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "px-8 md:px-30 py-15 bg-[linear-gradient(180deg,#FFFFFF_0%,#F5FFE0_100%)]", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-10 relative", children: [
      /* @__PURE__ */ jsx("div", { className: "lg:sticky top-40 h-fit", children: /* @__PURE__ */ jsxs(TextFade, { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-4xl sm:text-5xl font-semibold mb-2", children: "How it works" }),
        /* @__PURE__ */ jsx("p", { className: "text-lg mb-5", children: "Here’s a simple step-by-step view of how bridg.money powers your financial operations." })
      ] }) }),
      /* @__PURE__ */ jsx(SlidingCard, { cards })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "px-8 md:px-20 py-15 ", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-5 gap-y-10 relative", children: [
      /* @__PURE__ */ jsx("div", { className: "sm:px-15 flex items-center", children: /* @__PURE__ */ jsxs("div", { className: "relative p-2.5", children: [
        /* @__PURE__ */ jsx("img", { src: BenefitImg$8, className: "rounded-3xl" }),
        /* @__PURE__ */ jsx("div", { className: "bg-[#A5EB14] h-60 sm:h-80 w-full absolute bottom-0 left-0 -z-10 rounded-3xl" })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "font-semibold text-3xl sm:text-4xl mb-2", children: "Benefits" }),
        /* @__PURE__ */ jsx("p", { className: "mb-10 text-lg", children: "Unlock faster payments, automated reconciliation, and real-time visibility tailored to your business needs." }),
        /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 gap-5", children: benefits.map((benefit) => /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "h-2.5 w-2.5 rounded-full bg-[#A5EB14] mb-3" }),
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mb-2", children: benefit.heading }),
          /* @__PURE__ */ jsx("p", { children: benefit.desc })
        ] })) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "px-6 sm:px-20 my-10 md:my-15 flex justify-center", children: /* @__PURE__ */ jsxs("div", { className: "bg-[url('./assets/images/useCase/cta.webp')] overflow-hidden bg-fixed bg-center bg-no-repeat bg-cover rounded-3xl relative p-5 grid grid-rows-2 md:grid-rows-3 grid-cols-3 items-end", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[#0A0C3326] z-0" }),
      /* @__PURE__ */ jsx("div", { className: "row-start-2 md:row-start-3 z-1 col-span-3 sm:col-span-2", children: /* @__PURE__ */ jsxs(TextFade, { direction: "up", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-lg text-white md:text-5xl font-semibold mb-3", children: "Ready to Bridg the Gap?" }),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-white mb-4", children: "Join thousands of businesses using bridg.money to streamline their financial operations. Start accepting payments and managing payouts in minutes." })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-end items-end mb-4 h-full row-start-3 col-span-3 md:col-span-3 z-1", children: /* @__PURE__ */ jsx(
        Button,
        {
          text: "Book a Demo",
          clr: "#ffffff",
          brClr: "#ffffff",
          arrClr: "#ffffff",
          url: "/contact"
        }
      ) })
    ] }) })
  ] });
};
const BenefitImg$7 = "/assets/Retail%20_%20E-commerce-Dh6yEliJ.webp";
const ECommerce = () => {
  const cards = [
    {
      id: 1,
      heading: "Merchant Onboarding",
      desc: "Complete KYB once for your store/marketplace."
    },
    {
      id: 2,
      heading: "Accept All Payments",
      desc: "UPI, cards, net banking, and virtual accounts."
    },
    {
      id: 3,
      heading: "COD Simplified",
      desc: "Auto-reconcile cash-on-delivery remittances to order IDs."
    },
    {
      id: 4,
      heading: "Fast Disbursals",
      desc: "Pay vendors and delivery partners instantly."
    },
    {
      id: 5,
      heading: "Hassle-Free Refunds",
      desc: "Process refunds in bulk at scale."
    }
  ];
  const benefits = [
    {
      id: 1,
      heading: "Vendor Trust",
      desc: "Same-day vendor settlements."
    },
    {
      id: 2,
      heading: "Customer Delight",
      desc: "Instant refunds build loyalty."
    },
    {
      id: 3,
      heading: "COD Ready",
      desc: "Automated reconciliation for cash transactions."
    },
    {
      id: 4,
      heading: "Marketplace Ready",
      desc: "Multi-party payouts at scale."
    }
  ];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("section", { className: " bg-[linear-gradient(270deg,rgba(11,11,11,0)_0%,#0B0B0B_100%),url('./assets/images/useCase/hero-section/Retail-and-E-commerce.webp')] bg-cover h-screen bg-center flex items-center", children: /* @__PURE__ */ jsx("div", { className: "px-6 pt-30 py-20 sm:px-15 xl:px-25", children: /* @__PURE__ */ jsx("div", { className: "grid lg:grid-cols-2 gap-x-10 gap-y-5", children: /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(
        TitleDecor,
        {
          title: "Retail & E-commerce",
          clr: "black",
          bgClr: "white"
        }
      ),
      /* @__PURE__ */ jsxs(TextFade, { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-5xl lg:text-[53px] font-semibold leading-15 text-white lg:leading-17 mb-3", children: "Fast, Reliable Settlements for Online Businesses" }),
        /* @__PURE__ */ jsx("p", { className: "my-3 lg:my-4 text-lg text-white", children: "Customers expect quick refunds. Vendors demand timely payouts. Delivery partners rely on instant payments. For e-commerce, financial operations define trust." }),
        /* @__PURE__ */ jsx(Button, { text: "Get Started", bgClr: "#A5EB14", url: "/contact" })
      ] })
    ] }) }) }) }) }),
    /* @__PURE__ */ jsx("section", { className: "bg-[#FCF9F0] px-8 md:px-30 py-15", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-x-10 gap-y-5", children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(TextFade, { children: /* @__PURE__ */ jsxs("h1", { className: "text-4xl lg:text-[45px] font-semibold leading-12 lg:leading-16 mb-3", children: [
        "Instant Payouts.",
        /* @__PURE__ */ jsx("br", {}),
        " Seamless Collections.",
        /* @__PURE__ */ jsx("br", {}),
        " Real-Time Visibility."
      ] }) }) }) }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsx("p", { className: "my-3 lg:my-4 text-lg", children: "bridg.money powers bulk payouts for vendor settlements, delivery partner payments, and instant refunds. With collections APIs, handle COD remittances and digital transactions. Connected banking ensures full visibility into balances, settlements, and transactions." }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "px-8 md:px-30 py-15 bg-[linear-gradient(180deg,#FFFFFF_0%,#F5FFE0_100%)]", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-10 relative", children: [
      /* @__PURE__ */ jsx("div", { className: "lg:sticky top-40 h-fit", children: /* @__PURE__ */ jsxs(TextFade, { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-4xl sm:text-5xl font-semibold mb-2", children: "How it works" }),
        /* @__PURE__ */ jsx("p", { className: "text-lg mb-5", children: "Here’s a simple step-by-step view of how bridg.money powers your financial operations." })
      ] }) }),
      /* @__PURE__ */ jsx(SlidingCard, { cards })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "px-8 md:px-20 py-15 ", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-5 gap-y-10 relative", children: [
      /* @__PURE__ */ jsx("div", { className: "sm:px-15 flex items-center", children: /* @__PURE__ */ jsxs("div", { className: "relative p-2.5", children: [
        /* @__PURE__ */ jsx("img", { src: BenefitImg$7, className: "rounded-3xl" }),
        /* @__PURE__ */ jsx("div", { className: "bg-[#A5EB14] h-60 sm:h-80 w-full absolute bottom-0 left-0 -z-10 rounded-3xl" })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "font-semibold text-3xl sm:text-4xl mb-2", children: "Benefits" }),
        /* @__PURE__ */ jsx("p", { className: "mb-10 text-lg", children: "Unlock faster payments, automated reconciliation, and real-time visibility tailored to your business needs." }),
        /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 gap-5", children: benefits.map((benefit) => /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "h-2.5 w-2.5 rounded-full bg-[#A5EB14] mb-3" }),
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mb-2", children: benefit.heading }),
          /* @__PURE__ */ jsx("p", { children: benefit.desc })
        ] })) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "px-6 sm:px-20 my-10 md:my-15 flex justify-center", children: /* @__PURE__ */ jsxs("div", { className: "bg-[url('./assets/images/useCase/cta.webp')] overflow-hidden bg-fixed bg-center bg-no-repeat bg-cover rounded-3xl relative p-5 grid grid-rows-2 md:grid-rows-3 grid-cols-3 items-end", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[#0A0C3326] z-0" }),
      /* @__PURE__ */ jsx("div", { className: "row-start-2 md:row-start-3 z-1 col-span-3 sm:col-span-2", children: /* @__PURE__ */ jsxs(TextFade, { direction: "up", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-lg text-white md:text-5xl font-semibold mb-3", children: "Ready to Bridg the Gap?" }),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-white mb-4", children: "Join thousands of businesses using bridg.money to streamline their financial operations. Start accepting payments and managing payouts in minutes." })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-end items-end mb-4 h-full row-start-3 col-span-3 md:col-span-3 z-1", children: /* @__PURE__ */ jsx(
        Button,
        {
          text: "Book a Demo",
          clr: "#ffffff",
          brClr: "#ffffff",
          arrClr: "#ffffff",
          url: "/contact"
        }
      ) })
    ] }) })
  ] });
};
const BenefitImg$6 = "/assets/Software%20_%20Tech-CUWyx5Ie.webp";
const SoftwareAndTech = () => {
  const cards = [
    {
      id: 1,
      heading: "Onboard Smoothly",
      desc: "Register your business and connect bank accounts."
    },
    {
      id: 2,
      heading: "API Integration",
      desc: "Embed bridg.money into your platform seamlessly."
    },
    {
      id: 3,
      heading: "Manage Subscriptions",
      desc: "Collect recurring and one-time fees automatically."
    },
    {
      id: 4,
      heading: "Fast Payouts",
      desc: "Disburse instantly to contractors, partners, or users."
    },
    {
      id: 5,
      heading: "Stay Transparent",
      desc: "Get live transaction and balance insights via connected banking."
    }
  ];
  const benefits = [
    {
      id: 1,
      heading: "Built for Developers",
      desc: "Easy API integration."
    },
    {
      id: 2,
      heading: "Recurring Billing",
      desc: "Subscription collections handled with ease."
    },
    {
      id: 3,
      heading: "Support Ecosystem",
      desc: " Instant payouts for users or partners."
    },
    {
      id: 4,
      heading: "Clear Oversight",
      desc: "Transparent, real-time reporting."
    }
  ];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("section", { className: " bg-[linear-gradient(270deg,rgba(11,11,11,0)_0%,#0B0B0B_100%),url('./assets/images/useCase/hero-section/Software-and-Tech.webp')] bg-cover h-screen bg-center flex items-center", children: /* @__PURE__ */ jsx("div", { className: "px-6 pt-30 py-20 sm:px-15 xl:px-25", children: /* @__PURE__ */ jsx("div", { className: "grid lg:grid-cols-2 gap-x-10 gap-y-5", children: /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(TitleDecor, { title: "Software & Tech", clr: "black", bgClr: "white" }),
      /* @__PURE__ */ jsxs(TextFade, { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-5xl lg:text-[53px] font-semibold leading-15 text-white lg:leading-17 mb-3", children: "Embedded Finance for Software & Tech Companies" }),
        /* @__PURE__ */ jsx("p", { className: "my-3 lg:my-4 text-lg text-white", children: "SaaS platforms and tech firms need smooth financial operations for subscriptions, client payments, and embedded financial services." }),
        /* @__PURE__ */ jsx(Button, { text: "Get Started", bgClr: "#A5EB14", url: "/contact" })
      ] })
    ] }) }) }) }) }),
    /* @__PURE__ */ jsx("section", { className: "bg-[#FCF9F0] px-8 md:px-30 py-15", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-x-10 gap-y-5", children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(TextFade, { children: /* @__PURE__ */ jsxs("h1", { className: "text-4xl lg:text-[45px] font-semibold leading-12 lg:leading-16 mb-3", children: [
        "Instant Payouts.",
        /* @__PURE__ */ jsx("br", {}),
        " Seamless Collections.",
        /* @__PURE__ */ jsx("br", {}),
        " Real-Time Visibility."
      ] }) }) }) }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsx("p", { className: "my-3 lg:my-4 text-lg", children: "bridg.money allows tech companies to embed payouts for users, manage subscription collections, and leverage connected banking APIs for real-time transparency." }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "px-8 md:px-30 py-15 bg-[linear-gradient(180deg,#FFFFFF_0%,#F5FFE0_100%)]", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-10 relative", children: [
      /* @__PURE__ */ jsx("div", { className: "lg:sticky top-40 h-fit", children: /* @__PURE__ */ jsxs(TextFade, { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-4xl sm:text-5xl font-semibold mb-2", children: "How it works" }),
        /* @__PURE__ */ jsx("p", { className: "text-lg mb-5", children: "Here’s a simple step-by-step view of how bridg.money powers your financial operations." })
      ] }) }),
      /* @__PURE__ */ jsx(SlidingCard, { cards })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "px-8 md:px-20 py-15 ", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-5 gap-y-10 relative", children: [
      /* @__PURE__ */ jsx("div", { className: "sm:px-15 flex items-center", children: /* @__PURE__ */ jsxs("div", { className: "relative p-2.5", children: [
        /* @__PURE__ */ jsx("img", { src: BenefitImg$6, className: "rounded-3xl" }),
        /* @__PURE__ */ jsx("div", { className: "bg-[#A5EB14] h-60 sm:h-80 w-full absolute bottom-0 left-0 -z-10 rounded-3xl" })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "font-semibold text-3xl sm:text-4xl mb-2", children: "Benefits" }),
        /* @__PURE__ */ jsx("p", { className: "mb-10 text-lg", children: "Unlock faster payments, automated reconciliation, and real-time visibility tailored to your business needs." }),
        /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 gap-5", children: benefits.map((benefit) => /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "h-2.5 w-2.5 rounded-full bg-[#A5EB14] mb-3" }),
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mb-2", children: benefit.heading }),
          /* @__PURE__ */ jsx("p", { children: benefit.desc })
        ] })) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "px-6 sm:px-20 my-10 md:my-15 flex justify-center", children: /* @__PURE__ */ jsxs("div", { className: "bg-[url('./assets/images/useCase/cta.webp')] overflow-hidden bg-fixed bg-center bg-no-repeat bg-cover rounded-3xl relative p-5 grid grid-rows-2 md:grid-rows-3 grid-cols-3 items-end", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[#0A0C3326] z-0" }),
      /* @__PURE__ */ jsx("div", { className: "row-start-2 md:row-start-3 z-1 col-span-3 sm:col-span-2", children: /* @__PURE__ */ jsxs(TextFade, { direction: "up", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-lg text-white md:text-5xl font-semibold mb-3", children: "Ready to Bridg the Gap?" }),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-white mb-4", children: "Join thousands of businesses using bridg.money to streamline their financial operations. Start accepting payments and managing payouts in minutes." })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-end items-end mb-4 h-full row-start-3 col-span-3 md:col-span-3 z-1", children: /* @__PURE__ */ jsx(
        Button,
        {
          text: "Book a Demo",
          clr: "#ffffff",
          brClr: "#ffffff",
          arrClr: "#ffffff",
          url: "/contact"
        }
      ) })
    ] }) })
  ] });
};
const BenefitImg$5 = "/assets/manufaturer-CUf84_is.webp";
const Manufacturer = () => {
  const cards = [
    {
      id: 1,
      heading: "KYB & Setup",
      desc: "Onboard and link your accounts."
    },
    {
      id: 2,
      heading: "Collect Distributor Payments",
      desc: "Use virtual accounts or UPI for large inflows."
    },
    {
      id: 3,
      heading: "Pay Suppliers Fast",
      desc: "Instant payouts to vendors and logistics providers."
    },
    {
      id: 4,
      heading: "Reconcile Flows",
      desc: "Access statements and fund visibility with connected banking."
    }
  ];
  const benefits = [
    {
      id: 1,
      heading: "Stronger Supply Chain",
      desc: "Faster supplier and distributor payments."
    },
    {
      id: 2,
      heading: "Working Capital Relief",
      desc: "Reduce payment delays and cash gaps."
    },
    {
      id: 3,
      heading: "Error-Free Operations",
      desc: "Automated reconciliation of inflows/outflows."
    },
    {
      id: 4,
      heading: "Financial Control",
      desc: "Centralized visibility across accounts."
    }
  ];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("section", { className: " bg-[linear-gradient(270deg,rgba(11,11,11,0)_0%,#0B0B0B_100%),url('./assets/images/useCase/hero-section/manufaturer.webp')] bg-cover h-screen bg-center flex items-center", children: /* @__PURE__ */ jsx("div", { className: "px-6 pt-30 py-20 sm:px-15 xl:px-25", children: /* @__PURE__ */ jsx("div", { className: "grid lg:grid-cols-2 gap-x-10 gap-y-5", children: /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(TitleDecor, { title: "Manufacturers", clr: "black", bgClr: "white" }),
      /* @__PURE__ */ jsxs(TextFade, { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-5xl lg:text-[53px] font-semibold leading-15 text-white lg:leading-17 mb-3", children: "Automating Payouts and Collections for Manufacturing" }),
        /* @__PURE__ */ jsx("p", { className: "my-3 lg:my-4 text-lg text-white", children: "Manufacturers handle complex supply chains with multiple vendors, distributors, and logistics partners. Payment inefficiencies directly impact operations." }),
        /* @__PURE__ */ jsx(Button, { text: "Get Started", bgClr: "#A5EB14", url: "/contact" })
      ] })
    ] }) }) }) }) }),
    /* @__PURE__ */ jsx("section", { className: "bg-[#FCF9F0] px-8 md:px-30 py-15", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-x-10 gap-y-5", children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(TextFade, { children: /* @__PURE__ */ jsxs("h1", { className: "text-4xl lg:text-[45px] font-semibold leading-12 lg:leading-16 mb-3", children: [
        "Instant Payouts.",
        /* @__PURE__ */ jsx("br", {}),
        " Seamless Collections.",
        /* @__PURE__ */ jsx("br", {}),
        " Real-Time Visibility."
      ] }) }) }) }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsx("p", { className: "my-3 lg:my-4 text-lg", children: "bridg.money enables vendor payouts, bulk collections from distributors, and connected banking for real-time reconciliation and fund tracking." }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "px-8 md:px-30 py-15 bg-[linear-gradient(180deg,#FFFFFF_0%,#F5FFE0_100%)]", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-10 relative", children: [
      /* @__PURE__ */ jsx("div", { className: "lg:sticky top-40 h-fit", children: /* @__PURE__ */ jsxs(TextFade, { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-4xl sm:text-5xl font-semibold mb-2", children: "How it works" }),
        /* @__PURE__ */ jsx("p", { className: "text-lg mb-5", children: "Here’s a simple step-by-step view of how bridg.money powers your financial operations." })
      ] }) }),
      /* @__PURE__ */ jsx(SlidingCard, { cards })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "px-8 md:px-20 py-15 ", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-5 gap-y-10 relative", children: [
      /* @__PURE__ */ jsx("div", { className: "sm:px-15 flex items-center", children: /* @__PURE__ */ jsxs("div", { className: "relative p-2.5", children: [
        /* @__PURE__ */ jsx("img", { src: BenefitImg$5, className: "rounded-3xl" }),
        /* @__PURE__ */ jsx("div", { className: "bg-[#A5EB14] h-60 sm:h-80 w-full absolute bottom-0 left-0 -z-10 rounded-3xl" })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "font-semibold text-3xl sm:text-4xl mb-2", children: "Benefits" }),
        /* @__PURE__ */ jsx("p", { className: "mb-10 text-lg", children: "Unlock faster payments, automated reconciliation, and real-time visibility tailored to your business needs." }),
        /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 gap-5", children: benefits.map((benefit) => /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "h-2.5 w-2.5 rounded-full bg-[#A5EB14] mb-3" }),
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mb-2", children: benefit.heading }),
          /* @__PURE__ */ jsx("p", { children: benefit.desc })
        ] })) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "px-6 sm:px-20 my-10 md:my-15 flex justify-center", children: /* @__PURE__ */ jsxs("div", { className: "bg-[url('./assets/images/useCase/cta.webp')] overflow-hidden bg-fixed bg-center bg-no-repeat bg-cover rounded-3xl relative p-5 grid grid-rows-2 md:grid-rows-3 grid-cols-3 items-end", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[#0A0C3326] z-0" }),
      /* @__PURE__ */ jsx("div", { className: "row-start-2 md:row-start-3 z-1 col-span-3 sm:col-span-2", children: /* @__PURE__ */ jsxs(TextFade, { direction: "up", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-lg text-white md:text-5xl font-semibold mb-3", children: "Ready to Bridg the Gap?" }),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-white mb-4", children: "Join thousands of businesses using bridg.money to streamline their financial operations. Start accepting payments and managing payouts in minutes." })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-end items-end mb-4 h-full row-start-3 col-span-3 md:col-span-3 z-1", children: /* @__PURE__ */ jsx(
        Button,
        {
          text: "Book a Demo",
          clr: "#ffffff",
          brClr: "#ffffff",
          arrClr: "#ffffff",
          url: "/contact"
        }
      ) })
    ] }) })
  ] });
};
const BenefitImg$4 = "/assets/Real%20Estate-C2QG_yl8.webp";
const RealEstate = () => {
  const cards = [
    {
      id: 1,
      heading: "Business Onboarding",
      desc: "Complete KYB and link accounts."
    },
    {
      id: 2,
      heading: "Collect Buyer Payments",
      desc: "Accept instalments via UPI, cards, or net banking."
    },
    {
      id: 3,
      heading: "Auto-Tag Transactions",
      desc: "Payments mapped to project or unit automatically."
    },
    {
      id: 4,
      heading: "Pay Contractors/Brokers",
      desc: "Instant disbursals at scale."
    },
    {
      id: 5,
      heading: "Track Funds",
      desc: "Reconcile balances and project-wise reports."
    }
  ];
  const benefits = [
    {
      id: 1,
      heading: "Build Trust",
      desc: "Faster contractor and broker payouts."
    },
    {
      id: 2,
      heading: "Multiple Channels",
      desc: "Buyers pay with flexibility."
    },
    {
      id: 3,
      heading: "Smart Projects",
      desc: "Automated reconciliation per unit/project."
    },
    {
      id: 4,
      heading: "Full Compliance",
      desc: "Real-time account visibility."
    }
  ];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("section", { className: " bg-[linear-gradient(270deg,rgba(11,11,11,0)_0%,#0B0B0B_100%),url('./assets/images/useCase/hero-section/Real-Estate.webp')] bg-cover h-screen bg-center flex items-center", children: /* @__PURE__ */ jsx("div", { className: "px-6 pt-30 py-20 sm:px-15 xl:px-25", children: /* @__PURE__ */ jsx("div", { className: "grid lg:grid-cols-2 gap-x-10 gap-y-5", children: /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(TitleDecor, { title: "Real Estate", clr: "black", bgClr: "white" }),
      /* @__PURE__ */ jsxs(TextFade, { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-5xl lg:text-[53px] font-semibold leading-15 text-white lg:leading-17 mb-3", children: "Transparent Payments for Real Estate Projects" }),
        /* @__PURE__ */ jsx("p", { className: "my-3 lg:my-4 text-lg text-white", children: "Real estate transactions involve high-value inflows and frequent contractor and broker payouts. Delays reduce trust and efficiency." }),
        /* @__PURE__ */ jsx(Button, { text: "Get Started", bgClr: "#A5EB14", url: "/contact" })
      ] })
    ] }) }) }) }) }),
    /* @__PURE__ */ jsx("section", { className: "bg-[#FCF9F0] px-8 md:px-30 py-15", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-x-10 gap-y-5", children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(TextFade, { children: /* @__PURE__ */ jsxs("h1", { className: "text-4xl lg:text-[45px] font-semibold leading-12 lg:leading-16 mb-3", children: [
        "Instant Payouts.",
        /* @__PURE__ */ jsx("br", {}),
        " Seamless Collections.",
        /* @__PURE__ */ jsx("br", {}),
        " Real-Time Visibility."
      ] }) }) }) }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsx("p", { className: "my-3 lg:my-4 text-lg", children: "bridg.money supports multi-channel collections for buyer instalments, instant payouts for brokers/contractors, and connected banking for compliance-ready account monitoring." }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "px-8 md:px-30 py-15 bg-[linear-gradient(180deg,#FFFFFF_0%,#F5FFE0_100%)]", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-10 relative", children: [
      /* @__PURE__ */ jsx("div", { className: "lg:sticky top-40 h-fit", children: /* @__PURE__ */ jsxs(TextFade, { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-4xl sm:text-5xl font-semibold mb-2", children: "How it works" }),
        /* @__PURE__ */ jsx("p", { className: "text-lg mb-5", children: "Here’s a simple step-by-step view of how bridg.money powers your financial operations." })
      ] }) }),
      /* @__PURE__ */ jsx(SlidingCard, { cards })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "px-8 md:px-20 py-15 ", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-5 gap-y-10 relative", children: [
      /* @__PURE__ */ jsx("div", { className: "sm:px-15 flex items-center", children: /* @__PURE__ */ jsxs("div", { className: "relative p-2.5", children: [
        /* @__PURE__ */ jsx("img", { src: BenefitImg$4, className: "rounded-3xl" }),
        /* @__PURE__ */ jsx("div", { className: "bg-[#A5EB14] h-60 sm:h-80 w-full absolute bottom-0 left-0 -z-10 rounded-3xl" })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "font-semibold text-3xl sm:text-4xl mb-2", children: "Benefits" }),
        /* @__PURE__ */ jsx("p", { className: "mb-10 text-lg", children: "Unlock faster payments, automated reconciliation, and real-time visibility tailored to your business needs." }),
        /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 gap-5", children: benefits.map((benefit) => /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "h-2.5 w-2.5 rounded-full bg-[#A5EB14] mb-3" }),
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mb-2", children: benefit.heading }),
          /* @__PURE__ */ jsx("p", { children: benefit.desc })
        ] })) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "px-6 sm:px-20 my-10 md:my-15 flex justify-center", children: /* @__PURE__ */ jsxs("div", { className: "bg-[url('./assets/images/useCase/cta.webp')] overflow-hidden bg-fixed bg-center bg-no-repeat bg-cover rounded-3xl relative p-5 grid grid-rows-2 md:grid-rows-3 grid-cols-3 items-end", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[#0A0C3326] z-0" }),
      /* @__PURE__ */ jsx("div", { className: "row-start-2 md:row-start-3 z-1 col-span-3 sm:col-span-2", children: /* @__PURE__ */ jsxs(TextFade, { direction: "up", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-lg text-white md:text-5xl font-semibold mb-3", children: "Ready to Bridg the Gap?" }),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-white mb-4", children: "Join thousands of businesses using bridg.money to streamline their financial operations. Start accepting payments and managing payouts in minutes." })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-end items-end mb-4 h-full row-start-3 col-span-3 md:col-span-3 z-1", children: /* @__PURE__ */ jsx(
        Button,
        {
          text: "Book a Demo",
          clr: "#ffffff",
          brClr: "#ffffff",
          arrClr: "#ffffff",
          url: "/contact"
        }
      ) })
    ] }) })
  ] });
};
const BenefitImg$3 = "/assets/Healthcare-C4Bbk6du.webp";
const HealthCare = () => {
  const cards = [
    {
      id: 1,
      heading: "Provider Onboarding",
      desc: "Complete KYB verification."
    },
    {
      id: 2,
      heading: "Collect Patient Payments",
      desc: "UPI, cards, or net banking accepted instantly."
    },
    {
      id: 3,
      heading: "Insurance Integration",
      desc: "Match payouts with claims automatically."
    },
    {
      id: 4,
      heading: "Pay Staff & Vendors",
      desc: "Doctors, nurses, and suppliers paid instantly."
    },
    {
      id: 5,
      heading: "Monitor Cash Flows",
      desc: "Track balances and reconciled statements easily."
    }
  ];
  const benefits = [
    {
      id: 1,
      heading: "Faster Claims",
      desc: "Quick settlements from insurers."
    },
    {
      id: 2,
      heading: "Smooth Patient Experience",
      desc: "Seamless billing and payments."
    },
    {
      id: 3,
      heading: "Zero Errors",
      desc: "Automated reconciliation of inflows/outflows."
    },
    {
      id: 4,
      heading: "Better Care Delivery",
      desc: "Real-time fund management."
    }
  ];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("section", { className: " bg-[linear-gradient(270deg,rgba(11,11,11,0)_0%,#0B0B0B_100%),url('./assets/images/useCase/hero-section/Healthcare.webp')] bg-cover h-screen bg-center flex items-center", children: /* @__PURE__ */ jsx("div", { className: "px-6 pt-30 py-20 sm:px-15 xl:px-25", children: /* @__PURE__ */ jsx("div", { className: "grid lg:grid-cols-2 gap-x-10 gap-y-5", children: /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(TitleDecor, { title: "Healthcare", clr: "black", bgClr: "white" }),
      /* @__PURE__ */ jsxs(TextFade, { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-5xl lg:text-[53px] font-semibold leading-15 text-white lg:leading-17 mb-3", children: "Faster Payments for Healthcare Providers" }),
        /* @__PURE__ */ jsx("p", { className: "my-3 lg:my-4 text-lg text-white", children: "Hospitals, clinics, and pharmacies manage multiple inflows (patients, insurance) and outflows (staff, vendors). Manual processes delay care delivery." }),
        /* @__PURE__ */ jsx(Button, { text: "Get Started", bgClr: "#A5EB14", url: "/contact" })
      ] })
    ] }) }) }) }) }),
    /* @__PURE__ */ jsx("section", { className: "bg-[#FCF9F0] px-8 md:px-30 py-15", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-x-10 gap-y-5", children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(TextFade, { children: /* @__PURE__ */ jsxs("h1", { className: "text-4xl lg:text-[45px] font-semibold leading-12 lg:leading-16 mb-3", children: [
        "Instant Payouts.",
        /* @__PURE__ */ jsx("br", {}),
        " Seamless Collections.",
        /* @__PURE__ */ jsx("br", {}),
        " Real-Time Visibility."
      ] }) }) }) }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsx("p", { className: "my-3 lg:my-4 text-lg", children: "bridg.money enables instant payouts to doctors, vendors, and staff, collections APIs for patient billing and insurance payments, and connected banking for real-time fund visibility." }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "px-8 md:px-30 py-15 bg-[linear-gradient(180deg,#FFFFFF_0%,#F5FFE0_100%)]", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-10 relative", children: [
      /* @__PURE__ */ jsx("div", { className: "lg:sticky top-40 h-fit", children: /* @__PURE__ */ jsxs(TextFade, { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-4xl sm:text-5xl font-semibold mb-2", children: "How it works" }),
        /* @__PURE__ */ jsx("p", { className: "text-lg mb-5", children: "Here’s a simple step-by-step view of how bridg.money powers your financial operations." })
      ] }) }),
      /* @__PURE__ */ jsx(SlidingCard, { cards })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "px-8 md:px-20 py-15 ", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-5 gap-y-10 relative", children: [
      /* @__PURE__ */ jsx("div", { className: "sm:px-15 flex items-center", children: /* @__PURE__ */ jsxs("div", { className: "relative p-2.5", children: [
        /* @__PURE__ */ jsx("img", { src: BenefitImg$3, className: "rounded-3xl" }),
        /* @__PURE__ */ jsx("div", { className: "bg-[#A5EB14] h-60 sm:h-80 w-full absolute bottom-0 left-0 -z-10 rounded-3xl" })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "font-semibold text-3xl sm:text-4xl mb-2", children: "Benefits" }),
        /* @__PURE__ */ jsx("p", { className: "mb-10 text-lg", children: "Unlock faster payments, automated reconciliation, and real-time visibility tailored to your business needs." }),
        /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 gap-5", children: benefits.map((benefit) => /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "h-2.5 w-2.5 rounded-full bg-[#A5EB14] mb-3" }),
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mb-2", children: benefit.heading }),
          /* @__PURE__ */ jsx("p", { children: benefit.desc })
        ] })) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "px-6 sm:px-20 my-10 md:my-15 flex justify-center", children: /* @__PURE__ */ jsxs("div", { className: "bg-[url('./assets/images/useCase/cta.webp')] overflow-hidden bg-fixed bg-center bg-no-repeat bg-cover rounded-3xl relative p-5 grid grid-rows-2 md:grid-rows-3 grid-cols-3 items-end", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[#0A0C3326] z-0" }),
      /* @__PURE__ */ jsx("div", { className: "row-start-2 md:row-start-3 z-1 col-span-3 sm:col-span-2", children: /* @__PURE__ */ jsxs(TextFade, { direction: "up", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-lg text-white md:text-5xl font-semibold mb-3", children: "Ready to Bridg the Gap?" }),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-white mb-4", children: "Join thousands of businesses using bridg.money to streamline their financial operations. Start accepting payments and managing payouts in minutes." })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-end items-end mb-4 h-full row-start-3 col-span-3 md:col-span-3 z-1", children: /* @__PURE__ */ jsx(
        Button,
        {
          text: "Book a Demo",
          clr: "#ffffff",
          brClr: "#ffffff",
          arrClr: "#ffffff",
          url: "/contact"
        }
      ) })
    ] }) })
  ] });
};
const BenefitImg$2 = "/assets/Hospitality-C1gFrc1P.webp";
const Hospitality = () => {
  const cards = [
    {
      id: 1,
      heading: "KYB & Account Linking",
      desc: "Onboard your hotel, restaurant, or travel firm."
    },
    {
      id: 2,
      heading: "Accept Guest Payments",
      desc: "UPI, cards, or net banking made simple."
    },
    {
      id: 3,
      heading: "Auto-Reconcile Bookings",
      desc: "Payments mapped by property or branch."
    },
    {
      id: 4,
      heading: "Instant Refunds & Payouts",
      desc: "Salaries, vendor bills, or guest refunds disbursed instantly."
    },
    {
      id: 5,
      heading: "Monitor Across Properties",
      desc: "View real-time balances across multiple accounts."
    }
  ];
  const benefits = [
    {
      id: 1,
      heading: "Happy Guests",
      desc: "Instant refunds and seamless payments."
    },
    {
      id: 2,
      heading: "Streamlined Operations",
      desc: "Smooth booking and settlement process."
    },
    {
      id: 3,
      heading: "Property-Level Tracking",
      desc: "Automated reconciliation per location."
    },
    {
      id: 4,
      heading: "Branch Oversight",
      desc: "Real-time visibility across franchises."
    }
  ];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("section", { className: " bg-[linear-gradient(270deg,rgba(11,11,11,0)_0%,#0B0B0B_100%),url('./assets/images/useCase/hero-section/Hospitality.webp')] bg-cover h-screen bg-center flex items-center", children: /* @__PURE__ */ jsx("div", { className: "px-6 pt-30 py-20 sm:px-15 xl:px-25", children: /* @__PURE__ */ jsx("div", { className: "grid lg:grid-cols-2 gap-x-10 gap-y-5", children: /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(TitleDecor, { title: "Hospitality", clr: "black", bgClr: "white" }),
      /* @__PURE__ */ jsxs(TextFade, { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-5xl lg:text-[53px] font-semibold leading-15 text-white lg:leading-17 mb-3", children: "Seamless Financial Flows for Hotels & Travel" }),
        /* @__PURE__ */ jsx("p", { className: "my-3 lg:my-4 text-lg text-white", children: "Hotels, restaurants, and travel operators rely on fast vendor payments, staff disbursals, and smooth guest collections. Banking delays hurt customer experience." }),
        /* @__PURE__ */ jsx(Button, { text: "Get Started", bgClr: "#A5EB14", url: "/contact" })
      ] })
    ] }) }) }) }) }),
    /* @__PURE__ */ jsx("section", { className: "bg-[#FCF9F0] px-8 md:px-30 py-15", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-x-10 gap-y-5", children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(TextFade, { children: /* @__PURE__ */ jsxs("h1", { className: "text-4xl lg:text-[45px] font-semibold leading-12 lg:leading-16 mb-3", children: [
        "Instant Payouts.",
        /* @__PURE__ */ jsx("br", {}),
        " Seamless Collections.",
        /* @__PURE__ */ jsx("br", {}),
        " Real-Time Visibility."
      ] }) }) }) }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsx("p", { className: "my-3 lg:my-4 text-lg", children: "bridg.money powers payouts for staff, vendors, and partners; collections APIs for guest bookings and online payments; and connected banking for account monitoring across branches or franchises." }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "px-8 md:px-30 py-15 bg-[linear-gradient(180deg,#FFFFFF_0%,#F5FFE0_100%)]", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-10 relative", children: [
      /* @__PURE__ */ jsx("div", { className: "lg:sticky top-40 h-fit", children: /* @__PURE__ */ jsxs(TextFade, { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-4xl sm:text-5xl font-semibold mb-2", children: "How it works" }),
        /* @__PURE__ */ jsx("p", { className: "text-lg mb-5", children: "Here’s a simple step-by-step view of how bridg.money powers your financial operations." })
      ] }) }),
      /* @__PURE__ */ jsx(SlidingCard, { cards })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "px-8 md:px-20 py-15 ", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-5 gap-y-10 relative", children: [
      /* @__PURE__ */ jsx("div", { className: "sm:px-15 flex items-center", children: /* @__PURE__ */ jsxs("div", { className: "relative p-2.5", children: [
        /* @__PURE__ */ jsx("img", { src: BenefitImg$2, className: "rounded-3xl" }),
        /* @__PURE__ */ jsx("div", { className: "bg-[#A5EB14] h-60 sm:h-80 w-full absolute bottom-0 left-0 -z-10 rounded-3xl" })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "font-semibold text-3xl sm:text-4xl mb-2", children: "Benefits" }),
        /* @__PURE__ */ jsx("p", { className: "mb-10 text-lg", children: "Unlock faster payments, automated reconciliation, and real-time visibility tailored to your business needs." }),
        /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 gap-5", children: benefits.map((benefit) => /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "h-2.5 w-2.5 rounded-full bg-[#A5EB14] mb-3" }),
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mb-2", children: benefit.heading }),
          /* @__PURE__ */ jsx("p", { children: benefit.desc })
        ] })) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "px-6 sm:px-20 my-10 md:my-15 flex justify-center", children: /* @__PURE__ */ jsxs("div", { className: "bg-[url('./assets/images/useCase/cta.webp')] overflow-hidden bg-fixed bg-center bg-no-repeat bg-cover rounded-3xl relative p-5 grid grid-rows-2 md:grid-rows-3 grid-cols-3 items-end", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[#0A0C3326] z-0" }),
      /* @__PURE__ */ jsx("div", { className: "row-start-2 md:row-start-3 z-1 col-span-3 sm:col-span-2", children: /* @__PURE__ */ jsxs(TextFade, { direction: "up", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-lg text-white md:text-5xl font-semibold mb-3", children: "Ready to Bridg the Gap?" }),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-white mb-4", children: "Join thousands of businesses using bridg.money to streamline their financial operations. Start accepting payments and managing payouts in minutes." })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-end items-end mb-4 h-full row-start-3 col-span-3 md:col-span-3 z-1", children: /* @__PURE__ */ jsx(
        Button,
        {
          text: "Book a Demo",
          clr: "#ffffff",
          brClr: "#ffffff",
          arrClr: "#ffffff",
          url: "/contact"
        }
      ) })
    ] }) })
  ] });
};
const BenefitImg$1 = "/assets/Professional%20Services-DAz8rjFA.webp";
const ProfessionalServices = () => {
  const cards = [
    {
      id: 1,
      heading: "KYB & Account Linking",
      desc: "Onboard your firm quickly."
    },
    {
      id: 2,
      heading: "Bill Clients Easily",
      desc: "Generate invoices or payment links."
    },
    {
      id: 3,
      heading: "Accept Payments",
      desc: "Multiple channels: UPI, cards, net banking."
    },
    {
      id: 4,
      heading: "Automate Payouts",
      desc: "Disburse salaries or vendor bills instantly."
    },
    {
      id: 5,
      heading: "Track Effortlessly",
      desc: "Connected banking APIs for reconciled balances."
    }
  ];
  const benefits = [
    {
      id: 1,
      heading: "Frictionless Billing",
      desc: "Easy client invoicing and collections."
    },
    {
      id: 2,
      heading: "Team Support",
      desc: "Quick staff and vendor payouts."
    },
    {
      id: 3,
      heading: "Reduce Errors",
      desc: "Automated reconciliation saves time."
    },
    {
      id: 4,
      heading: "Better Oversight",
      desc: "Centralized financial visibility."
    }
  ];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("section", { className: " bg-[linear-gradient(270deg,rgba(11,11,11,0)_0%,#0B0B0B_100%),url('./assets/images/useCase/hero-section/Professional-Services.webp')] bg-cover h-screen bg-center flex items-center", children: /* @__PURE__ */ jsx("div", { className: "px-6 pt-30 py-20 sm:px-15 xl:px-25", children: /* @__PURE__ */ jsx("div", { className: "grid lg:grid-cols-2 gap-x-10 gap-y-5", children: /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(
        TitleDecor,
        {
          title: "Professional Services",
          clr: "black",
          bgClr: "white"
        }
      ),
      /* @__PURE__ */ jsxs(TextFade, { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-5xl lg:text-[53px] font-semibold leading-15 text-white lg:leading-17 mb-3", children: "Simplified Payments for Service Firms" }),
        /* @__PURE__ */ jsx("p", { className: "my-3 lg:my-4 text-lg text-white", children: "Law firms, accounting agencies, and consultancies need efficient ways to collect retainers, manage client payments, and pay staff/vendors." }),
        /* @__PURE__ */ jsx(Button, { text: "Get Started", bgClr: "#A5EB14", url: "/contact" })
      ] })
    ] }) }) }) }) }),
    /* @__PURE__ */ jsx("section", { className: "bg-[#FCF9F0] px-8 md:px-30 py-15", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-x-10 gap-y-5", children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(TextFade, { children: /* @__PURE__ */ jsxs("h1", { className: "text-4xl lg:text-[45px] font-semibold leading-12 lg:leading-16 mb-3", children: [
        "Instant Payouts.",
        /* @__PURE__ */ jsx("br", {}),
        " Seamless Collections.",
        /* @__PURE__ */ jsx("br", {}),
        " Real-Time Visibility."
      ] }) }) }) }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsx("p", { className: "my-3 lg:my-4 text-lg", children: "bridg.money offers collections APIs for client billing, payouts for staff/vendor disbursements, and connected banking for reconciled account management." }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "px-8 md:px-30 py-15 bg-[linear-gradient(180deg,#FFFFFF_0%,#F5FFE0_100%)]", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-10 relative", children: [
      /* @__PURE__ */ jsx("div", { className: "lg:sticky top-40 h-fit", children: /* @__PURE__ */ jsxs(TextFade, { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-4xl sm:text-5xl font-semibold mb-2", children: "How it works" }),
        /* @__PURE__ */ jsx("p", { className: "text-lg mb-5", children: "Here’s a simple step-by-step view of how bridg.money powers your financial operations." })
      ] }) }),
      /* @__PURE__ */ jsx(SlidingCard, { cards })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "px-8 md:px-20 py-15 ", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-5 gap-y-10 relative", children: [
      /* @__PURE__ */ jsx("div", { className: "sm:px-15 flex items-center", children: /* @__PURE__ */ jsxs("div", { className: "relative p-2.5", children: [
        /* @__PURE__ */ jsx("img", { src: BenefitImg$1, className: "rounded-3xl" }),
        /* @__PURE__ */ jsx("div", { className: "bg-[#A5EB14] h-60 sm:h-80 w-full absolute bottom-0 left-0 -z-10 rounded-3xl" })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "font-semibold text-3xl sm:text-4xl mb-2", children: "Benefits" }),
        /* @__PURE__ */ jsx("p", { className: "mb-10 text-lg", children: "Unlock faster payments, automated reconciliation, and real-time visibility tailored to your business needs." }),
        /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 gap-5", children: benefits.map((benefit) => /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "h-2.5 w-2.5 rounded-full bg-[#A5EB14] mb-3" }),
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mb-2", children: benefit.heading }),
          /* @__PURE__ */ jsx("p", { children: benefit.desc })
        ] })) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "px-6 sm:px-20 my-10 md:my-15 flex justify-center", children: /* @__PURE__ */ jsxs("div", { className: "bg-[url('./assets/images/useCase/cta.webp')] overflow-hidden bg-fixed bg-center bg-no-repeat bg-cover rounded-3xl relative p-5 grid grid-rows-2 md:grid-rows-3 grid-cols-3 items-end", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[#0A0C3326] z-0" }),
      /* @__PURE__ */ jsx("div", { className: "row-start-2 md:row-start-3 z-1 col-span-3 sm:col-span-2", children: /* @__PURE__ */ jsxs(TextFade, { direction: "up", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-lg text-white md:text-5xl font-semibold mb-3", children: "Ready to Bridg the Gap?" }),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-white mb-4", children: "Join thousands of businesses using bridg.money to streamline their financial operations. Start accepting payments and managing payouts in minutes." })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-end items-end mb-4 h-full row-start-3 col-span-3 md:col-span-3 z-1", children: /* @__PURE__ */ jsx(
        Button,
        {
          text: "Book a Demo",
          clr: "#ffffff",
          brClr: "#ffffff",
          arrClr: "#ffffff",
          url: "/contact"
        }
      ) })
    ] }) })
  ] });
};
const BenefitImg = "/assets/Consultants%20_%20Freelancers-CAJrwaYH.webp";
const ConsultantAndFreelancers = () => {
  const cards = [
    {
      id: 1,
      heading: "Easy Onboarding",
      desc: "Complete a simple KYB in minutes."
    },
    {
      id: 2,
      heading: "Invoice Clients",
      desc: "Send invoices or payment links."
    },
    {
      id: 3,
      heading: "Get Paid Instantly",
      desc: "Accept UPI, cards, or bank transfers."
    },
    {
      id: 4,
      heading: "Withdraw Anytime",
      desc: "Instant payouts to your bank account."
    },
    {
      id: 5,
      heading: "Track Your Earnings",
      desc: "Real-time balances and reconciliations."
    }
  ];
  const benefits = [
    {
      id: 1,
      heading: "Faster Collections",
      desc: " No more delayed client payments."
    },
    {
      id: 2,
      heading: "Instant Withdrawals",
      desc: "Earnings transferred instantly."
    },
    {
      id: 3,
      heading: "Simplify Finances",
      desc: " Less manual reconciliation."
    },
    {
      id: 4,
      heading: "Clear Earnings View",
      desc: "Transparency in balances and income."
    }
  ];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("section", { className: " bg-[linear-gradient(270deg,rgba(11,11,11,0)_0%,#0B0B0B_100%),url('./assets/images/useCase/hero-section/Consultants-and-Freelancers.webp')] bg-cover h-screen bg-center flex items-center", children: /* @__PURE__ */ jsx("div", { className: "px-6 pt-30 py-20 sm:px-15 xl:px-25", children: /* @__PURE__ */ jsx("div", { className: "grid lg:grid-cols-2 gap-x-10 gap-y-5", children: /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(
        TitleDecor,
        {
          title: "Consultants & Freelancers",
          clr: "black",
          bgClr: "white"
        }
      ),
      /* @__PURE__ */ jsxs(TextFade, { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-5xl lg:text-[53px] font-semibold leading-15 text-white lg:leading-17 mb-3", children: "Get Paid Faster as a Freelancer or Consultant" }),
        /* @__PURE__ */ jsx("p", { className: "my-3 lg:my-4 text-lg text-white", children: "Freelancers and consultants often face delayed client payments and manual fund management." }),
        /* @__PURE__ */ jsx(Button, { text: "Get Started", bgClr: "#A5EB14", url: "/contact" })
      ] })
    ] }) }) }) }) }),
    /* @__PURE__ */ jsx("section", { className: "bg-[#FCF9F0] px-8 md:px-30 py-15", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-x-10 gap-y-5", children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(TextFade, { children: /* @__PURE__ */ jsxs("h1", { className: "text-4xl lg:text-[45px] font-semibold leading-12 lg:leading-16 mb-3", children: [
        "Instant Payouts.",
        /* @__PURE__ */ jsx("br", {}),
        " Seamless Collections.",
        /* @__PURE__ */ jsx("br", {}),
        " Real-Time Visibility."
      ] }) }) }) }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsx("p", { className: "my-3 lg:my-4 text-lg", children: "bridg.money simplifies finances with collections APIs for client payments, payouts for instant withdrawals, and connected banking for full visibility." }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "px-8 md:px-30 py-15 bg-[linear-gradient(180deg,#FFFFFF_0%,#F5FFE0_100%)]", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-10 relative", children: [
      /* @__PURE__ */ jsx("div", { className: "lg:sticky top-40 h-fit", children: /* @__PURE__ */ jsxs(TextFade, { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-4xl sm:text-5xl font-semibold mb-2", children: "How it works" }),
        /* @__PURE__ */ jsx("p", { className: "text-lg mb-5", children: "Here’s a simple step-by-step view of how bridg.money powers your financial operations." })
      ] }) }),
      /* @__PURE__ */ jsx(SlidingCard, { cards })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "px-8 md:px-20 py-15 ", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-5 gap-y-10 relative", children: [
      /* @__PURE__ */ jsx("div", { className: "sm:px-15 flex items-center", children: /* @__PURE__ */ jsxs("div", { className: "relative p-2.5", children: [
        /* @__PURE__ */ jsx("img", { src: BenefitImg, className: "rounded-3xl" }),
        /* @__PURE__ */ jsx("div", { className: "bg-[#A5EB14] h-60 sm:h-80 w-full absolute bottom-0 left-0 -z-10 rounded-3xl" })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "font-semibold text-3xl sm:text-4xl mb-2", children: "Benefits" }),
        /* @__PURE__ */ jsx("p", { className: "mb-10 text-lg", children: "Unlock faster payments, automated reconciliation, and real-time visibility tailored to your business needs." }),
        /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 gap-5", children: benefits.map((benefit) => /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "h-2.5 w-2.5 rounded-full bg-[#A5EB14] mb-3" }),
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mb-2", children: benefit.heading }),
          /* @__PURE__ */ jsx("p", { children: benefit.desc })
        ] })) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "px-6 sm:px-20 my-10 md:my-15 flex justify-center", children: /* @__PURE__ */ jsxs("div", { className: "bg-[url('./assets/images/useCase/cta.webp')] overflow-hidden bg-fixed bg-center bg-no-repeat bg-cover rounded-3xl relative p-5 grid grid-rows-2 md:grid-rows-3 grid-cols-3 items-end", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[#0A0C3326] z-0" }),
      /* @__PURE__ */ jsx("div", { className: "row-start-2 md:row-start-3 z-1 col-span-3 sm:col-span-2", children: /* @__PURE__ */ jsxs(TextFade, { direction: "up", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-lg text-white md:text-5xl font-semibold mb-3", children: "Ready to Bridg the Gap?" }),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-white mb-4", children: "Join thousands of businesses using bridg.money to streamline their financial operations. Start accepting payments and managing payouts in minutes." })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-end items-end mb-4 h-full row-start-3 col-span-3 md:col-span-3 z-1", children: /* @__PURE__ */ jsx(
        Button,
        {
          text: "Book a Demo",
          clr: "#ffffff",
          brClr: "#ffffff",
          arrClr: "#ffffff",
          url: "/contact"
        }
      ) })
    ] }) })
  ] });
};
const RbiStrongerDigitalLearningNorms = "/assets/rbis%20stringer%20digitel%20learning%20norms-BAilZAKL.webp";
const NpciRaisesUpiLimits = "/assets/npci%20raises%20upi%20limits-BosYCbIH.webp";
const AmazonAxioDeal = "/assets/amazon%20axio%20deal-Dz-Ki-xg.webp";
const GST2 = "/assets/gst%202.0-_EOJlCg6.webp";
const UpiReaches20BillionTransaction = "/assets/upi%20crosses%2020%20billion%20transaction-ClKtYUw3.webp";
const FloatAndTreasuryManagement = "/assets/float%20and%20treasury%20management-Lix4VHwN.webp";
const CollectionMadeSmarter = "/assets/collections%20made%20smarter-CWUtK83B.webp";
const PayoutsAtScale = "/assets/payouts%20at%20scale-DJUMgkRd.webp";
const whyComplianceFirstInfrastructureIsTheFoundation = "/assets/why%20compliance%20first%20infrastructure%20is%20the%20foundation-B1Jr-mYA.webp";
const FutureOfApiBanking = "/assets/future%20of%20api%20banking%20in%20india-Byh8YUuO.webp";
const connectedBankingGrowth = "/assets/connected%20banking%20growth%20level-Ca2Gorn4.webp";
const gamingBanInIndia = "/assets/gaming%20ban%20in%20india-7rHeeDID.webp";
const bridgingBanksAndBusinesses = "/assets/bridging%20banks%20and%20businesses-a0vDOzS0.webp";
const BlogHome = () => {
  const blogs = [
    {
      id: 1,
      title: "RBI’s Stronger Digital Lending Norms: Why They’re a Turning Point for Fintech Infrastructure",
      url: "rbis-stronger-digital-lending-norms-why-theyre-a-turning-point-for-fintech-infrastructure",
      img: RbiStrongerDigitalLearningNorms,
      date: "11 Sep 2025",
      subText: `The Reserve Bank of India (RBI) has recently issued updated
              Digital Lending Directions, 2025, strengthening regulatory
              guardrails for digital lending platforms, NBFCs, and the fintech
              ecosystem. `,
      section: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("section", { className: "border-b", children: [
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "The Reserve Bank of India (RBI) has recently issued updated",
            /* @__PURE__ */ jsx("strong", { children: "Digital Lending Directions, 2025" }),
            ", strengthening regulatory guardrails for digital lending platforms, NBFCs, and the fintech ecosystem. (IndiaCorpLaw) These norms include stricter due diligence, disclosures to borrowers, limitations on default loss guarantees, regulation of lending service providers, and more transparency."
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "For a Technology Service Provider (TSP) like",
            " ",
            /* @__PURE__ */ jsx(Link, { className: "text-blue-600", to: "/", children: "bridg.money" }),
            ", these changes are not just regulatory obligations—they are a signal of what the fintech future demands: trust, compliance, and infrastructure built for scale."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "border-b", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg my-3 font-medium", children: "Why the New Guidelines Matter" }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc ps-4 md:ps-10", children: [
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "Borrower Protection & Transparency" }),
              " – Platforms must now provide clear disclosures about interest rates, fees, loan terms, and default guarantees."
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "Stricter Partnership Standards" }),
              " – Lending service providers partnering with regulated entities need stronger vetting and governance."
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "Limitation on Default Loss Guarantees (DLGs)" }),
              " – NBFCs can no longer rely on DLGs from fintechs for provisioning in stressed loans."
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "Updates to Digital Lending Apps List & Consumer Trust" }),
              " ",
              "– RBI maintains a legal and updated list of approved digital lending apps (DLAs), improving visibility for consumers."
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "border-b", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg my-3 font-medium", children: "bridg.money’s Compliance-First Approach" }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "At",
            " ",
            /* @__PURE__ */ jsx(Link, { className: "text-blue-600", to: "/", children: "bridg.money" }),
            ", we see these guidelines as an opportunity to reinforce infrastructure that supports both growth and regulation. Our system is designed to ensure that:"
          ] }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc mb-3 ps-4 md:ps-10", children: [
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "API Banking and Payout & Collection APIs" }),
              " ",
              "include features for clear borrower disclosures and interest & fee transparency."
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "Multi-bank routing and virtual account mechanisms" }),
              " ",
              "help track inflows/outflows clearly, enabling audit-ready transaction histories."
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "Risk, fraud, and compliance checks" }),
              " (KYC, AML, etc.) are embedded into onboarding and daily operations."
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "Graceful support for default loss regulations," }),
              " ",
              "refusing to leverage DLGs from fintech service providers where disallowed."
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "border-b", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg my-3 font-medium", children: "Building Trust through Infrastructure" }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "Regulatory compliance builds trust. Every transaction powered by",
            " ",
            /* @__PURE__ */ jsx(Link, { className: "text-blue-600", to: "/", children: "bridg.money" }),
            " ",
            "under these norms is:"
          ] }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc mb-3 ps-4 md:ps-10", children: [
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              "Carried out via ",
              /* @__PURE__ */ jsx("strong", { children: "RBI-licensed bank partners" })
            ] }),
            /* @__PURE__ */ jsx("li", { className: "text-lg mb-3", children: "Encrypted and logged for transparency and audits" }),
            /* @__PURE__ */ jsx("li", { className: "text-lg mb-3", children: "Monitored in real time for suspicious behaviour or misuse" }),
            /* @__PURE__ */ jsx("li", { className: "text-lg mb-3", children: "Aligned with borrower protection principles (clear terms, grievance redressal pathways, etc.)" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "border-b", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium my-3", children: "The Bigger Picture" }),
          /* @__PURE__ */ jsx("p", { className: "text-lg mb-3", children: "As India’s fintech regulation tightens—especially around digital lending—businesses and consumers will increasingly trust platforms that demonstrate compliance, transparency, and reliability. For TSPs, the demand is shifting from just speed and scale to also offering a robust, regulation-aligned backbone." }),
          /* @__PURE__ */ jsx("p", { className: "text-lg mb-3", children: "The new norms reinforce that fintechs without strong infrastructure will struggle—not because regulation is heavy, but because user expectations and risk exposure demand enterprise-grade fintech architecture." })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "border-b", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium my-3", children: "Our Vision" }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "To make",
            " ",
            /* @__PURE__ */ jsx(Link, { className: "text-blue-600", to: "/", children: "bridg.money" }),
            " ",
            "the definitive infrastructure partner for fintechs and enterprises in India—to not only move money fast, but to do so with compliance, clarity, and trust."
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "Because in today’s regulated fintech marketplace,",
            " ",
            /* @__PURE__ */ jsx("strong", { children: "infrastructure isn’t optional—it’s foundational." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "my-3 text-lg font-semibold", children: [
          "Author: Shivam Roy Chowdhury, Co-Founder & CFO at",
          " ",
          /* @__PURE__ */ jsx(Link, { className: "text-blue-600", to: "/", children: "bridg.money" })
        ] })
      ] })
    },
    {
      id: 2,
      title: "NPCI Raises UPI Limits: A New Era of High-Value Digital Payments",
      url: "npci-raises-upi-limits-a-new-era-of-high-value-digital-payments",
      img: NpciRaisesUpiLimits,
      date: "9 Sep 2025",
      subText: `India’s digital payment ecosystem just got a major upgrade. The National Payments Corporation of India (NPCI) has significantly increased UPI transaction limits—now allowing up to ₹5 lakh per transaction and ₹10 lakh per day for capital market and select merchant categories (The Times of India, The Economic Times).`,
      section: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("section", { className: "border-b", children: [
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "India’s digital payment ecosystem just got a major upgrade. The National Payments Corporation of India (NPCI) has significantly increased UPI transaction limits—now allowing up to",
            " ",
            /* @__PURE__ */ jsx("strong", { children: "₹5 lakh per transaction" }),
            " and",
            " ",
            /* @__PURE__ */ jsx("strong", { children: "₹10 lakh per day" }),
            " for capital market and select merchant categories (The Times of India, The Economic Times)."
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "For a Technology Service Provider (TSP) like",
            " ",
            /* @__PURE__ */ jsx(Link, { className: "text-blue-600", to: "/", children: "bridg.money" }),
            ", this shift isn’t just a regulatory tweak—it’s a game-changer that expands what’s possible in corporate payouts, collections, and treasury flows."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "border-b", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg my-3 font-medium", children: "Why UPI Limit Hike Matters" }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc ps-4 md:ps-10", children: [
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "High-Value Use Cases:" }),
              " Businesses can now leverage UPI for larger payments—covering investments, invoicing, and enterprise disbursements—without switching rails."
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "Operational Agility:" }),
              " TSPs must now support bigger transaction sizes with real-time reconciliation, liquidity reporting, and compliance-weighted oversight."
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "Digital Trust & Adoption:" }),
              " Higher UPI thresholds elevate its role from everyday use to critical business infrastructure."
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "border-b", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg my-3 font-medium", children: "bridg.money’s Strategic Response" }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "At",
            " ",
            /* @__PURE__ */ jsx(Link, { className: "text-blue-600", to: "/", children: "bridg.money" }),
            "we’re ready to meet the moment:"
          ] }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc mb-3 ps-4 md:ps-10", children: [
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "Scalable API Infrastructure:" }),
              " Our APIs handle high-value UPI payouts and collections seamlessly across partner banks."
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "Real-Time Reconciliation & Reporting:" }),
              " Every high-value transaction is matched instantly—providing traceability and audit-readiness."
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "Liquidity & Float Optimization:" }),
              " With bigger cash flows, we help businesses manage liquidity more efficiently across accounts."
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "Compliance-First Framework:" }),
              " All flows are secured, encrypted, and aligned with RBI and NPCI norms."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "By embedding high-value payment support into our infrastructure,",
            /* @__PURE__ */ jsx(Link, { className: "text-blue-600", to: "/", children: "bridg.money" }),
            " ",
            "ensures businesses of all sizes can move money with confidence and scale."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "border-b", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg my-3 font-medium", children: "Building Trust Through Robust Infrastructure" }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "At a time when digital payments are transitioning from convenience to enterprise-grade operations, reliability matters.",
            /* @__PURE__ */ jsx(Link, { className: "text-blue-600", to: "/", children: "bridg.money" }),
            " ",
            "ensures every transaction is:"
          ] }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc mb-3 ps-4 md:ps-10", children: [
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              "Backed by ",
              /* @__PURE__ */ jsx("strong", { children: "RBI-licensed banks" })
            ] }),
            /* @__PURE__ */ jsx("li", { className: "text-lg mb-3 font-bold", children: "Encrypted and monitored in real time" }),
            /* @__PURE__ */ jsx("li", { className: "text-lg mb-3", children: "Audit-ready with full transaction visibility across flows and accounts" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-lg mb-3", children: "This gives enterprises and banks alike the confidence to scale with UPI as a primary rail—not just a convenience payment option." })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "border-b", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium my-3", children: "The Bigger Picture" }),
          /* @__PURE__ */ jsx("p", { className: "text-lg mb-3", children: "UPI’s higher limits signal India’s push toward digital-first, high-value commerce. As businesses start leveraging UPI for significant financial flows, the need for enterprise-grade reconciliation, compliance, and liquidity tools will surge." }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "For TSPs like",
            " ",
            /* @__PURE__ */ jsx(Link, { className: "text-blue-600", to: "/", children: "bridg.money" }),
            ", this is more than a product enhancement—it’s a strategic shift that calls for scalable, secure infrastructure that can power India’s high-value digital economy."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "border-b", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium my-3", children: "Our Vision" }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "To make",
            " ",
            /* @__PURE__ */ jsx(Link, { className: "text-blue-600", to: "/", children: "bridg.money" }),
            " ",
            "the most trusted fintech infrastructure provider for",
            " ",
            /* @__PURE__ */ jsx("strong", { children: "payouts, collections, connected banking, and liquidity management" }),
            " ",
            "in India’s era of enterprise-grade UPI usage."
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-lg mb-3", children: "Because in fintech, being ready for high-value transactions isn’t optional — it's essential." })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "my-3 text-lg font-semibold", children: [
          "Author: Shivam Roy Chowdhury, Co-Founder & CFO at",
          " ",
          /* @__PURE__ */ jsx(Link, { className: "text-blue-600", to: "/", children: "bridg.money" })
        ] })
      ] })
    },
    {
      id: 3,
      title: "Amazon’s Axio Deal: What It Means for Financial Infrastructure in India",
      url: "amazons-axio-deal-what-it-means-for-financial-infrastructure-in-india",
      img: AmazonAxioDeal,
      date: "9 Sep 2025",
      subText: `Amazon has completed its $200 million all-cash acquisition of Axio, earning a Non-Banking Financial Company (NBFC) license and gaining direct access to India’s digital credit market.`,
      section: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("section", { className: "border-b", children: [
          /* @__PURE__ */ jsx("p", { className: "text-lg mb-3", children: "Amazon has completed its $200 million all-cash acquisition of Axio, earning a Non-Banking Financial Company (NBFC) license and gaining direct access to India’s digital credit market. This strategic move positions Amazon to offer credit products directly, deepening its fintech footprint beyond payments. (The Economic Times, Reuters)" }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "For a Technology Service Provider (TSP) like",
            " ",
            /* @__PURE__ */ jsx(Link, { className: "text-blue-600", to: "/", children: "bridg.money" }),
            ", this isn’t just market news—it’s proof that the fintech ecosystem is expanding into integrated, bank-like services—and TSPs are right at the heart of that evolution."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "border-b", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg my-3 font-medium", children: "Why This Matters" }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc ps-4 md:ps-10", children: [
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "Evolving Business Models" }),
              " - When fintech platforms become lenders, they require seamless infrastructure for payouts, collections, reconciliations, and compliance."
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "Regulatory Alignment" }),
              " - NBFC licensing means new credit offerings must adhere to RBI norms—opening space for TSPs that prioritize compliant architecture."
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "API-Driven Lending Applications" }),
              " - Direct lending entails real-time flows, disbursements, and loan tracking across accounts—perfectly served by strong API infrastructure."
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "border-b", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg my-3 font-medium", children: "bridg.money: Enabling Infrastructure for Digital Lending" }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "At",
            " ",
            /* @__PURE__ */ jsx(Link, { className: "text-blue-600", to: "/", children: "bridg.money" }),
            ", we see this development as a catalyst for infrastructure demand in lending fintech:"
          ] }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc mb-3 ps-4 md:ps-10", children: [
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "Unified API stack" }),
              " supports both payment and credit flows—ideal for disbursing loans and collecting repayments."
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "Automated reconciliation and virtual accounts" }),
              " ",
              "simplify tracking of repayments."
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "RBI-compliant onboarding and KYC" }),
              " ensures alignment with regulatory standards for lending offerings."
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "Multi-bank routing and dashboards" }),
              " enable transparent operations and better liquidity management."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "By embedding high-value payment support into our infrastructure,",
            /* @__PURE__ */ jsx(Link, { className: "text-blue-600", to: "/", children: "bridg.money" }),
            " ",
            "ensures businesses of all sizes can move money with confidence and scale."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "border-b", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg my-3 font-medium", children: "Building Trust in a New Fintech Era" }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "As lending platforms grow, credibility becomes crucial.",
            " ",
            /* @__PURE__ */ jsx(Link, { className: "text-blue-600", to: "/", children: "bridg.money’s" }),
            " ",
            "infrastructure is built on trust:"
          ] }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc mb-3 ps-4 md:ps-10", children: [
            /* @__PURE__ */ jsx("li", { className: "text-lg mb-3", children: "Secure, encrypted APIs connect seamlessly with banking partners." }),
            /* @__PURE__ */ jsx("li", { className: "text-lg mb-3", children: "Audit-ready trails ensure every transaction is traceable and compliant." }),
            /* @__PURE__ */ jsx("li", { className: "text-lg mb-3", children: "Real-time dashboards enable visibility into payouts, collections, and liquidity for both merchants and regulators." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "border-b", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium my-3", children: "The Bigger Picture" }),
          /* @__PURE__ */ jsx("p", { className: "text-lg mb-3", children: "Amazon’s move into NBFC services marks a broader fintech shift—where platforms are becoming full-stack financial entities. To succeed in this space, companies need scalable, trusted APIs that handle everything from payouts to credit repatriation." }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "For TSPs like",
            " ",
            /* @__PURE__ */ jsx(Link, { className: "text-blue-600", to: "/", children: "bridg.money" }),
            ", this trend represents an expansive opportunity to underpin—and power—the next generation of fintech offerings across payments, lending, and beyond."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "border-b", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium my-3", children: "Our Vision" }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "To position",
            " ",
            /* @__PURE__ */ jsx(Link, { className: "text-blue-600", to: "/", children: "bridg.money" }),
            " ",
            "as the ",
            /* @__PURE__ */ jsx("strong", { children: "trusted infrastructure layer" }),
            " for fintechs and enterprises venturing into lending, payments, and ecommerce—offering everything from seamless payouts and collections to compliance-first reconciliation and liquidity management."
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-lg mb-3 font-bold", children: "Because in fintech, the future belongs to those who can move money, smartly and securely." })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "my-3 text-lg font-semibold", children: [
          "Author: Shivam Roy Chowdhury, Co-Founder & CFO at",
          " ",
          /* @__PURE__ */ jsx(Link, { className: "text-blue-600", to: "/", children: "bridg.money" })
        ] })
      ] })
    },
    {
      id: 4,
      title: "GST 2.0 Simplified: What It Means for Fintech and Businesses",
      url: "gst-2-0-simplified-what-it-means-for-fintech-and-businesses",
      img: GST2,
      date: "4 Sep 2025",
      subText: `Amazon has completed its $200 million all-cash acquisition of Axio, earning a Non-Banking Financial Company (NBFC) license and gaining direct access to India’s digital credit market.`,
      section: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("section", { className: "border-b", children: [
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "India’s taxation landscape is undergoing its biggest shift since 2017. The",
            " ",
            /* @__PURE__ */ jsx("strong", { children: "GST Council has slashed tax slabs to just two—5% and 18%—effective September 22, 2025," }),
            " ",
            "while applying a 40% levy on luxury and sin goods. This reform is expected to boost consumption, simplify compliance, and improve liquidity across sectors."
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "For a Technology Service Provider (TSP) like",
            " ",
            /* @__PURE__ */ jsx(Link, { className: "text-blue-600", to: "/", children: "bridg.money" }),
            ", this isn’t just a tax change—it’s an opportunity to help businesses adapt with speed, accuracy, and compliance."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "border-b", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg my-3 font-medium", children: "Why GST 2.0 Matters" }),
          /* @__PURE__ */ jsx("p", { className: "text-lg mb-3", children: "The overhaul aims to reduce complexity and spur growth, but it also creates immediate implications for enterprises and fintechs:" }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc ps-4 md:ps-10", children: [
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "Simplified Compliance" }),
              " - Moving from multiple slabs to two rates makes billing, collections, and APIs easier to manage."
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "Liquidity Boost" }),
              " - Faster input tax credit (ITC) and reduced mismatches free up working capital."
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "Lower Costs" }),
              " - Tax cuts on essentials, insurance, and services lower expenses for MSMEs and startups."
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "Technology Opportunity" }),
              " - Businesses now need digital platforms that auto-adapt to new GST rates in real time."
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "border-b", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg my-3 font-medium", children: "bridg.money’s Role in GST-Ready Infrastructure" }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "At",
            " ",
            /* @__PURE__ */ jsx(Link, { className: "text-blue-600", to: "/", children: "bridg.money" }),
            ", we see GST 2.0 as a chance to strengthen compliance-first money movement. Our infrastructure ensures that:"
          ] }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc mb-3 ps-4 md:ps-10", children: [
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "Collections & Payout APIs auto-update" }),
              " to reflect new GST slabs."
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "Virtual Accounts with automated reconciliation" }),
              " ",
              "capture GST-inclusive payments instantly."
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "Dashboards provide GST-aligned reporting," }),
              " ",
              "simplifying ITC claims and audits."
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "Liquidity management tools" }),
              " help MSMEs and enterprises optimize cash flow in a lower-tax environment."
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-lg mb-3", children: "By embedding GST compliance into our core APIs, we allow businesses to focus on growth while we handle complexity." })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "border-b", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg my-3 font-medium", children: "Building Trust Through Compliance" }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "Tax compliance is not optional—it is the backbone of credibility. With",
            " ",
            /* @__PURE__ */ jsx(Link, { className: "text-blue-600", to: "/", children: "bridg.money" }),
            " ",
            "every transaction is:"
          ] }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc mb-3 ps-4 md:ps-10", children: [
            /* @__PURE__ */ jsx("li", { className: "text-lg mb-3", children: "Tagged and reconciled with the correct GST rate" }),
            /* @__PURE__ */ jsx("li", { className: "text-lg mb-3", children: "Backed by RBI-licensed banking partners" }),
            /* @__PURE__ */ jsx("li", { className: "text-lg mb-3", children: "Encrypted and audit-ready for GST reporting" }),
            /* @__PURE__ */ jsx("li", { className: "text-lg mb-3", children: "Designed for transparency across banks and accounts" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-lg mb-3", children: "This ensures businesses stay compliant while minimizing manual effort." })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "border-b", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium my-3", children: "The Bigger Picture" }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "India’s GST 2.0 reform shows a clear intent: simplify, digitize, and accelerate growth. But while tax rates change, what businesses truly need is",
            " ",
            /* @__PURE__ */ jsx("strong", { children: "infrastructure that adapts instantly, reconciles automatically, and reports compliantly." })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "For TSPs like",
            " ",
            /* @__PURE__ */ jsx(Link, { className: "text-blue-600", to: "/", children: "bridg.money" }),
            ", this is more than a compliance challenge—it’s an opportunity to power ",
            /* @__PURE__ */ jsx("strong", { children: "MSMEs, enterprises, and fintechs" }),
            " with smarter money movement that aligns seamlessly with regulatory change."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "border-b", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium my-3", children: "Our Vision" }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "To position",
            " ",
            /* @__PURE__ */ jsx(Link, { className: "text-blue-600", to: "/", children: "bridg.money" }),
            " ",
            "as India’s most trusted TSP for",
            " ",
            /* @__PURE__ */ jsx("strong", { children: "payouts, collections, reconciliation, and compliance-first infrastructure" }),
            "—helping businesses thrive in the GST 2.0 era and beyond."
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3 font-bold", children: [
            "Because in fintech,",
            " ",
            /* @__PURE__ */ jsx("strong", { children: "regulatory change isn’t a disruption—it’s an opportunity." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "my-3 text-lg font-semibold", children: [
          "Author: Shivam Roy Chowdhury, Co-Founder & CFO at",
          " ",
          /* @__PURE__ */ jsx(Link, { className: "text-blue-600", to: "/", children: "bridg.money" })
        ] })
      ] })
    },
    {
      id: 5,
      title: "UPI Crosses 20 Billion Transactions in a Month: Why TSPs Must Enable the Next Wave of Growth",
      url: "upi-crosses-20-billion-transactions-in-a-month-why-tsps-must-enable-the-next-wave-of-growth",
      img: UpiReaches20BillionTransaction,
      date: "1 Sep 2025",
      subText: `India’s digital payments journey reached a landmark moment in August 2025, as UPI transaction volumes surpassed 20 billion in a single month, marking a new high for digital adoption and financial inclusion.`,
      section: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("section", { className: "border-b", children: [
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "India’s digital payments journey reached a landmark moment in",
            /* @__PURE__ */ jsx("strong", { children: "August 2025" }),
            ", as UPI transaction volumes surpassed",
            " ",
            /* @__PURE__ */ jsx("strong", { children: "20 billion in a single month" }),
            ", marking a new high for digital adoption and financial inclusion."
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "While UPI’s extraordinary momentum is undeniable, it also underscores a pressing truth: the real opportunity lies not just in payments, but in what lies beyond—like",
            " ",
            /* @__PURE__ */ jsx("strong", { children: "API-driven collections, payouts, reconciliation, and liquidity optimization." }),
            " ",
            "As the digital economy accelerates, enterprises need infrastructure that can scale with confidence."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "border-b", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg my-3 font-medium", children: "Why This Matters for India’s Digital Economy" }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc ps-4 md:ps-10", children: [
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "Unprecedented Demand" }),
              " - 20 billion UPI transactions in a month reflects sheer scale and consumer reliance on real-time payments."
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "Rising Complexity" }),
              " - As merchants, platforms, and marketplaces grow, managing high-volume payments across bank accounts demands more than UPI alone."
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "UX & Compliance Limits" }),
              " - UPI thrives on convenience—but enterprises require connected banking layers that ensure control, reconciliation, and regulatory alignment."
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "border-b", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg my-3 font-medium", children: "bridg.money’s Role in the Post-UPI Era" }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "At",
            " ",
            /* @__PURE__ */ jsx(Link, { className: "text-blue-600", to: "/", children: "bridg.money" }),
            ", we understand that today's achievements in digital finance need next-gen infrastructure for tomorrow's challenges. Here’s how our TSP platform complements UPI:"
          ] }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc mb-3 ps-4 md:ps-10", children: [
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "API-First Collections & Payouts" }),
              " - Handle high-frequency flows across partner banks with a unified integration layer."
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "Automated Reconciliation" }),
              " — Match inflows and outflows instantly using virtual accounts and real-time status."
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "Holistic Cash Flow Management" }),
              " — Monitor corporate funds, manage payouts, and optimize liquidity through one dashboard."
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "Compliance-First Architecture" }),
              " — Built to handle RBI and NPCI reporting, audit trails, and secure data standards."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "In short, while UPI provides the rails,",
            " ",
            /* @__PURE__ */ jsx(Link, { className: "text-blue-600", to: "/", children: "bridg.money" }),
            " ",
            "powers the engine behind enterprise-grade financial operations."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "border-b", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg my-3 font-medium", children: "Building Trust Through Scalability & Security" }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "When volumes reach the tens of billions, reliability isn't optional—it’s your lifeline. Every transaction routed via",
            " ",
            /* @__PURE__ */ jsx(Link, { className: "text-blue-600", to: "/", children: "bridg.money" }),
            " ",
            "ensures:"
          ] }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc mb-3 ps-4 md:ps-10", children: [
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "Resilient Multi-Bank Connectivity" }),
              " — Avoid single points of failure with routing across licensed banking partners."
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "Secure, Encrypted Architecture" }),
              " — Enterprise and bank-grade security standards embedded into every API."
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "Audit-Ready Design" }),
              " — Full visibility and traceability for regulators, auditors, and internal stakeholders."
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-lg mb-3", children: "This builds confidence not only for merchants, but also for financial institutions partnering with fintechs." })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "border-b", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium my-3", children: "The Bigger Picture" }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "The 20-billion UPI milestone is proof that",
            " ",
            /* @__PURE__ */ jsx("strong", { children: "digital adoption in India has reached critical mass." }),
            " ",
            "But UPI's growth also signals the demand for infrastructure that helps scale operations safely and smartly.",
            " ",
            /* @__PURE__ */ jsxs("strong", { children: [
              "TSPs like",
              " ",
              /* @__PURE__ */ jsx(Link, { className: "text-blue-600", to: "/", children: "bridg.money" }),
              " ",
              "are essential to transform raw transactional growth into operational strength."
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-lg mb-3", children: "Enterprises need financial rails that support not just movement, but strategy—payout scheduling, reconciliation accuracy, liquidity insights, and regulatory oversight." })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "border-b", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium my-3", children: "Our Vision" }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "To position",
            " ",
            /* @__PURE__ */ jsx(Link, { className: "text-blue-600", to: "/", children: "bridg.money" }),
            " ",
            "as India’s go-to TSP for",
            " ",
            /* @__PURE__ */ jsx("strong", { children: "payouts, collections, connected banking, and treasury-level orchestration" }),
            "—so that enterprises can harness UPI-scale growth with trust, control, and transparency."
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3 font-bold", children: [
            "Because in this digital era,",
            " ",
            /* @__PURE__ */ jsx("strong", { children: "transaction volumes are just the beginning—true value lies in managing them efficiently." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "my-3 text-lg font-semibold", children: [
          "Author: Shivam Roy Chowdhury, Co-Founder & CFO at",
          " ",
          /* @__PURE__ */ jsx(Link, { className: "text-blue-600", to: "/", children: "bridg.money" })
        ] })
      ] })
    },
    {
      id: 6,
      title: "Float & Treasury Management: Unlocking New Revenue for Enterprises",
      url: "float-and-treasury-management-unlocking-new-revenue-for-enterprises",
      img: FloatAndTreasuryManagement,
      date: "30 Aug 2025",
      subText: `India’s digital payments journey reached a landmark moment in August 2025, as UPI transaction volumes surpassed 20 billion in a single month, marking a new high for digital adoption and financial inclusion.`,
      section: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("section", { className: "border-b", children: [
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "In today’s competitive economy, enterprises are no longer looking at payments only as transactions—they’re also focusing on how to optimize cash flow, reduce idle balances, and unlock new sources of revenue. Traditional banking systems provide limited visibility and flexibility when it comes to treasury management. That’s why",
            /* @__PURE__ */ jsx("strong", { children: "Technology Service Providers (TSPs)" }),
            " are stepping in to build infrastructure that helps businesses manage their float more efficiently."
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "Float management and treasury optimization are no longer back-office functions—they are becoming a",
            " ",
            /* @__PURE__ */ jsx("strong", { children: "growth lever" }),
            " for modern enterprises."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "border-b", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg my-3 font-medium", children: "Why Float & Treasury Management Matter" }),
          /* @__PURE__ */ jsx("p", { className: "text-lg mb-3", children: "Businesses today deal with high-volume inflows and outflows across multiple banks, leading to:" }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc ps-4 md:ps-10", children: [
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "Idle Funds" }),
              "– Cash parked in accounts without generating returns"
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "Liquidity Gaps" }),
              " - Slow settlement cycles causing operational friction"
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "Complex Cash Visibility" }),
              " - Fragmented balances across banks"
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "Missed Revenue Opportunities" }),
              " - Lack of optimization in interest and yield management"
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-lg mb-3", children: "Enterprises that can effectively manage float and liquidity gain a clear edge in efficiency, cost savings, and profitability." })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "border-b", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg my-3 font-medium", children: "bridg.money’s Approach to Treasury Optimization" }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "At",
            " ",
            /* @__PURE__ */ jsx(Link, { className: "text-blue-600", to: "/", children: "bridg.money" }),
            ", we go beyond payouts and collections to help enterprises unlock value from their balances. Our infrastructure delivers:"
          ] }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc mb-3 ps-4 md:ps-10", children: [
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "Multi-Bank Visibility" }),
              " - Real-time tracking of balances across all connected accounts"
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "Automated Reconciliation" }),
              " — Ensuring every credit and debit is matched instantly"
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "Optimized Float Management" }),
              " — Structured fund flows that minimize idle balances"
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "Compliance-First Infrastructure" }),
              " — RBI-aligned reporting and audit-ready systemsRBI-aligned reporting and audit-ready systems"
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-lg mb-3", children: "By embedding treasury management into our connected banking stack, we help businesses treat liquidity as an asset—not a challenge." })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "border-b", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg my-3 font-medium", children: "Building Trust Through Compliance" }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "Treasury and float management deal with sensitive financial flows. That’s why every process at",
            " ",
            /* @__PURE__ */ jsx(Link, { className: "text-blue-600", to: "/", children: "bridg.money" }),
            " ",
            "is:"
          ] }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc mb-3 ps-4 md:ps-10", children: [
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              "Backed by ",
              /* @__PURE__ */ jsx("strong", { children: "RBI-licensed banking partners" })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              "Secured with",
              " ",
              /* @__PURE__ */ jsx("strong", { children: "bank-grade encryption and monitoring" })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              "Fully ",
              /* @__PURE__ */ jsx("strong", { children: "audit-ready" }),
              " to meet regulatory expectations"
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              "Designed with ",
              /* @__PURE__ */ jsx("strong", { children: "transparency" }),
              ", so enterprises retain control over their funds"
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-lg mb-3", children: "This compliance-first design ensures that treasury optimization is not only efficient but also trusted by both enterprises and regulators." })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "border-b", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium my-3", children: "The Bigger Picture" }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "As enterprises grow, managing liquidity will become as important as managing revenues. With",
            " ",
            /* @__PURE__ */ jsx("strong", { children: "real-time dashboards, automated reporting, and AI-driven insights" }),
            ", TSPs like",
            " ",
            /* @__PURE__ */ jsx(Link, { className: "text-blue-600", to: "/", children: "bridg.money" }),
            " ",
            "are positioned to transform treasury management into a strategic advantage."
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-lg mb-3", children: "For enterprises, this means not just moving money—but moving it intelligently." })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "border-b", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium my-3", children: "Our Vision" }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "To establish",
            " ",
            /* @__PURE__ */ jsx(Link, { className: "text-blue-600", to: "/", children: "bridg.money" }),
            " ",
            "as the trusted partner for enterprises in",
            " ",
            /* @__PURE__ */ jsx("strong", { children: "payouts, collections, connected banking, and treasury management" }),
            "—paving the way for sustainable growth and profitability."
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3 font-bold", children: [
            "Because in fintech,",
            " ",
            /* @__PURE__ */ jsx("strong", { children: "how you manage your money is just as important as how you move it." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "my-3 text-lg font-semibold", children: [
          "Author: Shivam Roy Chowdhury, Co-Founder & CFO at",
          " ",
          /* @__PURE__ */ jsx(Link, { className: "text-blue-600", to: "/", children: "bridg.money" })
        ] })
      ] })
    },
    {
      id: 7,
      title: "Collections Made Smarter: Virtual Accounts and Automated Reconciliation",
      url: "collections-made-smarter-virtual-accounts-and-automated-reconciliation",
      img: CollectionMadeSmarter,
      date: "29 Aug 2025",
      subText: `For any business, collecting payments efficiently is just as important as making payouts. Yet traditional banking systems often leave enterprises struggling with fragmented inflows, delayed settlements, and manual reconciliation that drains time and resources. In India’s fast-growing digital economy, this inefficiency isn’t sustainable.`,
      section: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("section", { className: "border-b", children: [
          /* @__PURE__ */ jsx("p", { className: "text-lg mb-3", children: "For any business, collecting payments efficiently is just as important as making payouts. Yet traditional banking systems often leave enterprises struggling with fragmented inflows, delayed settlements, and manual reconciliation that drains time and resources. In India’s fast-growing digital economy, this inefficiency isn’t sustainable." }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "That’s why ",
            /* @__PURE__ */ jsx("strong", { children: "Technology Service Providers (TSPs)" }),
            " ",
            "are reshaping the way businesses handle collections—through",
            " ",
            /* @__PURE__ */ jsx("strong", { children: "virtual accounts and automated reconciliation" }),
            " ",
            "that deliver both speed and accuracy."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "border-b", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg my-3 font-medium", children: "Why Smarter Collections Matter" }),
          /* @__PURE__ */ jsx("p", { className: "text-lg mb-3", children: "Manual collection processes create serious challenges:" }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc ps-4 md:ps-10", children: [
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "Complex Reconciliation" }),
              " – Payments from customers often arrive without proper references, leading to mismatches and manual tracking."
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "Delayed Settlements" }),
              " – Funds are credited but not reflected instantly, causing liquidity gaps."
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "Limited Visibility" }),
              " – Finance teams struggle to get real-time insight into cash inflows across accounts."
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "Compliance Risk" }),
              " – Errors in reconciliation increase the risk of audit issues and reporting gaps."
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-lg mb-3", children: "For businesses, inefficient collections aren’t just an operational burden—they directly impact growth and trust." })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "border-b", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg my-3 font-medium", children: "bridg.money’s Approach to Smarter Collections" }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "At",
            " ",
            /* @__PURE__ */ jsx(Link, { className: "text-blue-600", to: "/", children: "bridg.money" }),
            ", we simplify collections by building infrastructure that delivers:"
          ] }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc mb-3 ps-4 md:ps-10", children: [
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "Virtual Accounts" }),
              " – Unique account numbers for each customer, partner, or transaction stream, ensuring payments are instantly identifiable."
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "Automated Reconciliation" }),
              " – Every inflow is matched in real time, eliminating manual errors."
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "Multi-Bank Integration" }),
              " – Collections can be routed across partner banks with centralized visibility."
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "Compliance-Ready Infrastructure" }),
              " – All transactions are fully traceable and aligned with RBI guidelines."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "By combining ",
            /* @__PURE__ */ jsx("strong", { children: "virtual accounts with automation," }),
            " ",
            /* @__PURE__ */ jsx(Link, { className: "text-blue-600", to: "/", children: "bridg.money" }),
            " ",
            "ensures that enterprises can scale collections without scaling complexity."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "border-b", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg my-3 font-medium", children: "Building Trust Through Transparency" }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "Collections infrastructure is not just about faster inflows—it’s about control and accuracy. Every collection processed via",
            " ",
            /* @__PURE__ */ jsx(Link, { className: "text-blue-600", to: "/", children: "bridg.money" }),
            " ",
            "is:"
          ] }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc mb-3 ps-4 md:ps-10", children: [
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              "Backed by ",
              /* @__PURE__ */ jsx("strong", { children: "RBI-licensed banking partners" })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "Encrypted and secured" }),
              " with bank-grade technology"
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              "Visible in ",
              /* @__PURE__ */ jsx("strong", { children: "real time" }),
              " through a connected dashboard"
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "Audit-ready" }),
              ", ensuring compliance at every step"
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-lg mb-3", children: "This level of transparency builds trust with customers, merchants, and banking partners alike." })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "border-b", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium my-3", children: "The Bigger Picture" }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "As India’s economy shifts to ",
            /* @__PURE__ */ jsx("strong", { children: "API-driven payments" }),
            ", businesses will need more than just payment rails—they’ll need",
            " ",
            /* @__PURE__ */ jsx("strong", { children: "intelligent collection infrastructure" }),
            " that scales. From SaaS platforms to large enterprises, the demand for",
            " ",
            /* @__PURE__ */ jsx("strong", { children: "virtual accounts and automated reconciliation" }),
            " is only growing."
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "For TSPs like",
            " ",
            /* @__PURE__ */ jsx(Link, { className: "text-blue-600", to: "/", children: "bridg.money" }),
            " ",
            ", this represents an opportunity to redefine how money flows into businesses—making collections faster, smarter, and fully compliant."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "border-b", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium my-3", children: "Our Vision" }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "To make",
            " ",
            /* @__PURE__ */ jsx(Link, { className: "text-blue-600", to: "/", children: "bridg.money" }),
            " ",
            "the preferred TSP for enterprises and fintechs seeking",
            " ",
            /* @__PURE__ */ jsx("strong", { children: "API-driven collections, payouts, and connected banking." }),
            " ",
            "By embedding automation, compliance, and transparency into every collection flow, we empower businesses to scale without friction."
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3 font-bold", children: [
            "Because in fintech,",
            " ",
            /* @__PURE__ */ jsx("strong", { children: "accuracy is growth, and reconciliation is trust." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "my-3 text-lg font-semibold", children: [
          "Author: Shivam Roy Chowdhury, Co-Founder & CFO at",
          " ",
          /* @__PURE__ */ jsx(Link, { className: "text-blue-600", to: "/", children: "bridg.money" })
        ] })
      ] })
    },
    {
      id: 8,
      title: "Payouts at Scale: How TSPs Are Powering India’s Digital Economy",
      url: "payouts-at-scale-how-tsps-are-powering-indias-digital-economy",
      img: PayoutsAtScale,
      date: "28 Aug 2025",
      subText: `India’s digital economy is built on speed. From e-commerce marketplaces to gig platforms, businesses need the ability to disburse funds instantly—whether it’s vendor settlements, employee salaries, or customer refunds.`,
      section: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("section", { className: "border-b", children: [
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "India’s digital economy is built on speed. From e-commerce marketplaces to gig platforms, businesses need the ability to disburse funds instantly—whether it’s vendor settlements, employee salaries, or customer refunds. Traditional banking rails, however, are not designed to handle",
            " ",
            /* @__PURE__ */ jsx("strong", { children: "high-frequency, high-volume payouts" }),
            "with the precision and compliance today’s enterprises demand."
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "This is where ",
            /* @__PURE__ */ jsx("strong", { children: "Technology Service Providers (TSPs)" }),
            " ",
            "step in—bridging the gap between banks and businesses by enabling",
            " ",
            /* @__PURE__ */ jsx("strong", { children: "payouts at scale." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "border-b", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg my-3 font-medium", children: "Why Payouts at Scale Matter" }),
          /* @__PURE__ */ jsx("p", { className: "text-lg mb-3", children: "In the modern economy, businesses can no longer rely on manual transfers or batch settlements. They require:" }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc ps-4 md:ps-10", children: [
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "Instant Disbursements" }),
              " – To employees, partners, and gig workers in real time"
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "Bulk Payout Processing" }),
              " – Handling thousands of transfers in a single API call"
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "Error-Free Reconciliation" }),
              " – Automating ledger updates and payment tracking"
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "Regulatory Compliance" }),
              " – Ensuring payouts meet RBI’s reporting and AML guidelines"
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-lg mb-3", children: "For enterprises, the ability to move money quickly and securely isn’t just a convenience—it’s a growth necessity." })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "border-b", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg my-3 font-medium", children: "bridg.money’s Approach to Scalable Payouts" }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "At",
            " ",
            /* @__PURE__ */ jsx(Link, { className: "text-blue-600", to: "/", children: "bridg.money" }),
            ", our mission is to simplify payouts at scale by building API-driven infrastructure that delivers:"
          ] }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc mb-3 ps-4 md:ps-10", children: [
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "Unified Payout APIs" }),
              " – Connect once, access multiple bank rails"
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "Automated Reconciliation" }),
              " – Every disbursement tracked and matched in real time"
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "Multi-Bank Routing" }),
              " –Failover and cost-optimization across partner banks"
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "Compliance-First Processing" }),
              " – Built-in KYC, AML, and RBI-aligned reporting"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "Whether it’s a startup disbursing daily rewards or a large enterprise handling bulk vendor payments,",
            " ",
            /* @__PURE__ */ jsx(Link, { className: "text-blue-600", to: "/", children: "bridg.money" }),
            " ",
            "ensures speed, compliance, and scalability."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "border-b", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg my-3 font-medium", children: "Building Trust Through Reliability" }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "Payout infrastructure isn’t just about speed—it’s about reliability and trust. Every transaction processed via",
            " ",
            /* @__PURE__ */ jsx(Link, { className: "text-blue-600", to: "/", children: "bridg.money" }),
            " ",
            "is:"
          ] }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc mb-3 ps-4 md:ps-10", children: [
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              "Backed by ",
              /* @__PURE__ */ jsx("strong", { children: "RBI-licensed banking partners" })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              "Secured with ",
              /* @__PURE__ */ jsx("strong", { children: "bank-grade encryption" })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "Monitored in real time" }),
              " to prevent fraud or misuse"
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "Audit-ready" }),
              ", ensuring businesses stay fully compliant"
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-lg mb-3", children: "By embedding compliance and transparency into our payout stack, we enable enterprises to scale without risk." })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "border-b", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium my-3", children: "The Bigger Picture" }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "As India moves deeper into a ",
            /* @__PURE__ */ jsx("strong", { children: "real-time economy" }),
            ", the demand for instant, compliant, and scalable payouts will only grow. From gig platforms to lending startups, every sector requires",
            " ",
            /* @__PURE__ */ jsx("strong", { children: "payment infrastructure that can move at the speed of business." })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "For TSPs like",
            " ",
            /* @__PURE__ */ jsx(Link, { className: "text-blue-600", to: "/", children: "bridg.money" }),
            " ",
            ", this is more than just technology—it’s about",
            " ",
            /* @__PURE__ */ jsx("strong", { children: "powering India’s digital economy" }),
            " with the financial rails of the future."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "border-b", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium my-3", children: "Our Vision" }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "To make",
            " ",
            /* @__PURE__ */ jsx(Link, { className: "text-blue-600", to: "/", children: "bridg.money" }),
            " ",
            "the trusted backbone for",
            " ",
            /* @__PURE__ */ jsx("strong", { children: "payouts, collections, and connected banking" }),
            " in India—paving the path towards becoming a licensed",
            /* @__PURE__ */ jsx("strong", { children: "Payment Aggregator & Payment Gateway (PAPG)." })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "Because in fintech,",
            " ",
            /* @__PURE__ */ jsx("strong", { children: "the ability to move money fast, secure, and compliant is the ultimate growth driver." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "my-3 text-lg font-semibold", children: [
          "Author: Shivam Roy Chowdhury, Co-Founder & CFO at",
          " ",
          /* @__PURE__ */ jsx(Link, { className: "text-blue-600", to: "/", children: "bridg.money" })
        ] })
      ] })
    },
    {
      id: 9,
      title: "Why Compliance-First Infrastructure is the Foundation of Fintech",
      url: "why-compliance-first-infrastructure-is-the-foundation-of-fintech",
      img: whyComplianceFirstInfrastructureIsTheFoundation,
      date: "26 Aug 2025",
      subText: `India’s digital payments sector is expanding at an unprecedented pace. From startups to large enterprises, businesses are relying on fintech infrastructure for faster payouts, seamless collections, and connected banking.`,
      section: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("section", { className: "border-b", children: [
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "India’s digital payments sector is expanding at an unprecedented pace. From startups to large enterprises, businesses are relying on fintech infrastructure for faster payouts, seamless collections, and connected banking. But alongside this growth, regulators such as the",
            " ",
            /* @__PURE__ */ jsx("strong", { children: "Reserve Bank of India (RBI)" }),
            " are tightening oversight to ensure that money movement is secure, transparent, and accountable."
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "For fintech companies and",
            " ",
            /* @__PURE__ */ jsx("strong", { children: "Technology Service Providers (TSPs)" }),
            ", this isn’t just a regulatory requirement—it is the foundation for long-term trust and credibility."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "border-b", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg my-3 font-medium", children: "Why Compliance Matters in Fintech" }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "The financial system is built on confidence. Any lapse in compliance—whether related to",
            " ",
            /* @__PURE__ */ jsx("strong", { children: "KYC, AML, or data security" }),
            "—can result in:"
          ] }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc ps-4 md:ps-10", children: [
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "Severe penalties" }),
              " from regulators"
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "Reputational damage" }),
              " that erodes customer trust"
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "Loss of banking partnerships" }),
              " critical for sustaining fintech operations"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "This is why leading fintechs and TSPs are adopting a",
            /* @__PURE__ */ jsx("strong", { children: "compliance-first approach" }),
            "—embedding regulatory safeguards directly into their infrastructure."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "border-b", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg my-3 font-medium", children: "bridg.money’s Compliance-First Approach" }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "At",
            " ",
            /* @__PURE__ */ jsx(Link, { className: "text-blue-600", to: "/", children: "bridg.money" }),
            ", compliance is not an afterthought—it is at the heart of everything we build. Our infrastructure ensures that:"
          ] }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc mb-3 ps-4 md:ps-10", children: [
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              "Every partner is onboarded through",
              " ",
              /* @__PURE__ */ jsx("strong", { children: "robust KYC and KYB verification" })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              "All transactions are screened against",
              " ",
              /* @__PURE__ */ jsx("strong", { children: "AML and fraud-prevention checks" })
            ] }),
            /* @__PURE__ */ jsx("li", { className: "text-lg mb-3", children: "Merchant flows are monitored in real time to detect suspicious patterns" }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              "Systems are designed to be ",
              /* @__PURE__ */ jsx("strong", { children: "audit-ready" }),
              ", aligned with RBI standards"
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-lg mb-3", children: "By embedding compliance into our APIs and dashboards, we protect not just our merchants, but also the integrity of the wider financial ecosystem." })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "border-b", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg my-3 font-medium", children: "Building Trust Through Transparency" }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "For businesses and banks, working with a TSP is a matter of trust. At",
            " ",
            /* @__PURE__ */ jsx(Link, { className: "text-blue-600", to: "/", children: "bridg.money" }),
            ", we build that trust through:"
          ] }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc mb-3 ps-4 md:ps-10", children: [
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "Bank-grade encryption" }),
              " of all sensitive data"
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "Regulatory reporting dashboards" }),
              " for complete visibility"
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: " End-to-end traceability" }),
              " of every payout and collection"
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "Independent audits" }),
              " that certify our infrastructure against security benchmarks"
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-lg mb-3", children: "This compliance-first architecture ensures that our partners can focus on growth while we safeguard the rails." })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "border-b", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium my-3", children: "The Bigger Picture" }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "As India moves towards a",
            " ",
            /* @__PURE__ */ jsx("strong", { children: "PAPG (Payment Aggregator & Payment Gateway)" }),
            " ",
            "licensing regime, only those companies that prioritize compliance will thrive. In the coming years, the difference between fintechs that scale and those that fail will boil down to one factor—",
            /* @__PURE__ */ jsx("strong", { children: "credibility in the eyes of regulators and banks." })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "For",
            " ",
            /* @__PURE__ */ jsx(Link, { className: "text-blue-600", to: "/", children: "bridg.money" }),
            " ",
            ", compliance is not a hurdle—it is our",
            " ",
            /* @__PURE__ */ jsx("strong", { children: "competitive advantage" }),
            ". By ensuring every transaction is secure, regulated, and transparent, we enable sustainable growth for the businesses we serve."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "border-b", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium my-3", children: "Our Vision" }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "To make",
            " ",
            /* @__PURE__ */ jsx(Link, { className: "text-blue-600", to: "/", children: "bridg.money" }),
            " ",
            "the most trusted TSP in India—delivering payouts, collections, and connected banking APIs that are not only fast and scalable, but also fully compliant with RBI regulations."
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "Because in fintech,",
            " ",
            /* @__PURE__ */ jsxs("strong", { children: [
              "credibility is everything—and at",
              " ",
              /* @__PURE__ */ jsx(Link, { className: "text-blue-600", to: "/", children: "bridg.money" }),
              " ",
              ", compliance is our foundation."
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "my-3 text-lg font-semibold", children: [
          "Author: Shivam Roy Chowdhury, Co-Founder & CFO at",
          " ",
          /* @__PURE__ */ jsx(Link, { className: "text-blue-600", to: "/", children: "bridg.money" })
        ] })
      ] })
    },
    {
      id: 10,
      title: "The Future of API Banking in India: Why TSPs Are the Missing Link",
      url: "the-future-of-api-banking-in-india-why-tsps-are-the-missing-link",
      img: FutureOfApiBanking,
      date: "24 Aug 2025",
      subText: `India’s fintech ecosystem is undergoing a massive transformation. With businesses demanding faster, more reliable ways to move money, API Banking has emerged as the backbone of digital payments and corporate banking infrastructure.`,
      section: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("section", { className: "border-b", children: [
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "India’s fintech ecosystem is undergoing a massive transformation. With businesses demanding faster, more reliable ways to move money, ",
            /* @__PURE__ */ jsx("strong", { children: "API Banking" }),
            " has emerged as the backbone of digital payments and corporate banking infrastructure. From instant payouts to seamless collections, APIs are redefining how enterprises interact with banks."
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "But while banks are opening up their rails,",
            " ",
            /* @__PURE__ */ jsx("strong", { children: "Technology Service Providers (TSPs)" }),
            " are becoming the critical missing link between banks and businesses—bridging gaps in speed, compliance, and usability."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "border-b", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg my-3 font-medium", children: "Why API Banking Matters" }),
          /* @__PURE__ */ jsx("p", { className: "text-lg mb-3", children: "API Banking allows enterprises to plug directly into bank systems for:" }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc ps-4 md:ps-10", children: [
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "Instant Payouts" }),
              " – Real-time fund transfers to vendors, employees, and gig workers"
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "Efficient Collections" }),
              " – Virtual accounts and automated reconciliation for smoother inflows"
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "Better Cash Flow Control" }),
              " – Real-time balance visibility across multiple accounts"
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "Compliance Assurance" }),
              " – Transaction-level monitoring aligned with RBI regulations"
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-lg mb-3", children: "For businesses, the value is clear: reduced operational friction, faster settlements, and scalability." })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "border-b", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg my-3 font-medium", children: "The Missing Link: Role of TSPs" }),
          /* @__PURE__ */ jsx("p", { className: "text-lg mb-3", children: "While banks provide APIs, most businesses cannot consume them directly. Challenges include complex documentation, custom integrations, and compliance-heavy onboarding. This is where TSPs step in." }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "At",
            " ",
            /* @__PURE__ */ jsx(Link, { className: "text-blue-600", to: "/", children: "bridg.money" }),
            ", we simplify API Banking by:"
          ] }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc mb-3 ps-4 md:ps-10", children: [
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              "Offering a ",
              /* @__PURE__ */ jsx("strong", { children: "unified API stack" }),
              " that works across multiple banks"
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              "Delivering ",
              /* @__PURE__ */ jsx("strong", { children: "plug-and-play integrations" }),
              " with faster go-live timelines"
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              "Embedding ",
              /* @__PURE__ */ jsx("strong", { children: "compliance-first architecture" }),
              " with KYC/AML checks"
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              "Providing a ",
              /* @__PURE__ */ jsx("strong", { children: "single dashboard" }),
              " for payouts, collections, and reconciliations"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "By doing so, TSPs transform fragmented banking infrastructure into a ",
            /* @__PURE__ */ jsx("strong", { children: "business-ready layer" }),
            " that enterprises can rely on."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "border-b", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg my-3 font-medium", children: "Building Trust Through Compliance" }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "Trust is the foundation of API Banking adoption. That’s why",
            " ",
            /* @__PURE__ */ jsx(Link, { className: "text-blue-600", to: "/", children: "bridg.money" }),
            "ensures every integration is:"
          ] }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc mb-3 ps-4 md:ps-10", children: [
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              "Backed by ",
              /* @__PURE__ */ jsx("strong", { children: "RBI-licensed partner banks" })
            ] }),
            /* @__PURE__ */ jsx("li", { className: "text-lg mb-3", children: "Encrypted end-to-end for secure data transfer" }),
            /* @__PURE__ */ jsx("li", { className: "text-lg mb-3", children: "Monitored in real-time for suspicious activity" }),
            /* @__PURE__ */ jsx("li", { className: "text-lg mb-3", children: "Audit-ready with transparent records for regulators and partners" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-lg mb-3", children: "For merchants, this means reliability. For banks, this means confidence in partnering with fintechs." })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "border-b", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium my-3", children: "The Bigger Picture" }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "As India’s digital economy expands,",
            " ",
            /* @__PURE__ */ jsx("strong", { children: "API Banking will become the default mode of money movement." }),
            " ",
            "But the true enabler will be TSPs—making banking rails usable, compliant, and scalable for enterprises of all sizes."
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "At",
            " ",
            /* @__PURE__ */ jsx(Link, { className: "text-blue-600", to: "/", children: "bridg.money" }),
            " ",
            ", our mission is to act as that enabler—helping businesses access the speed of APIs without compromising on trust, compliance, or security."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "border-b", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium my-3", children: "Our Vision" }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "To position",
            " ",
            /* @__PURE__ */ jsx(Link, { className: "text-blue-600", to: "/", children: "bridg.money" }),
            " ",
            "as India’s most trusted TSP, powering the journey towards becoming a licensed",
            " ",
            /* @__PURE__ */ jsx("strong", { children: "Payment Aggregator & Payment Gateway (PAPG)." }),
            " We aim to provide infrastructure that is not just fast and scalable, but fully compliant—because in fintech, credibility is as important as capability."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "my-3 text-lg font-semibold", children: [
          "Author: Shivam Roy Chowdhury, Co-Founder & CFO at",
          " ",
          /* @__PURE__ */ jsx(Link, { className: "text-blue-600", to: "/", children: "bridg.money" })
        ] })
      ] })
    },
    {
      id: 11,
      title: "Connected Banking as a Growth Lever for Businesses",
      url: "connected-banking-as-a-growth-lever-for-businesses",
      img: connectedBankingGrowth,
      date: "24 Aug 2025",
      subText: `India’s financial ecosystem is evolving rapidly. As businesses scale, managing multiple banking relationships has become increasingly complex. From logging into different portals to reconciling transactions manually, finance teams are burdened with fragmented systems that slow down operations and increase risks.`,
      section: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("section", { className: "border-b", children: [
          /* @__PURE__ */ jsx("p", { className: "text-lg mb-3", children: "India’s financial ecosystem is evolving rapidly. As businesses scale, managing multiple banking relationships has become increasingly complex. From logging into different portals to reconciling transactions manually, finance teams are burdened with fragmented systems that slow down operations and increase risks." }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "For a Technology Service Provider (TSP) like",
            " ",
            /* @__PURE__ */ jsx(Link, { className: "text-blue-600", to: "/", children: "bridg.money" }),
            ", this presents both a challenge and an opportunity—to streamline corporate banking into a unified experience."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "border-b", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg my-3 font-medium", children: "Why Connected Banking Matters" }),
          /* @__PURE__ */ jsx("p", { className: "text-lg mb-3", children: "Traditional banking setups force enterprises to manage each account in isolation. This creates:" }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc ps-4 md:ps-10", children: [
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "Operational inefficiency" }),
              "from juggling multiple dashboards"
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "Limited visibility" }),
              "into cash positions across banks"
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "Compliance gaps" }),
              "due to scattered reporting"
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "Scalability issues" }),
              " as more accounts are added"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "With ",
            /* @__PURE__ */ jsx("strong", { children: "Connected Banking" }),
            ", these barriers are removed. Businesses gain a single platform for balances, payouts, collections, and reconciliations—across multiple partner banks."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "border-b", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg my-3 font-medium", children: "bridg.money’s Approach to Connected Banking" }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "At",
            " ",
            /* @__PURE__ */ jsx(Link, { className: "text-blue-600", to: "/", children: "bridg.money" }),
            ", our position is clear:"
          ] }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc mb-3 ps-4 md:ps-10", children: [
            /* @__PURE__ */ jsx("li", { className: "text-lg mb-3", children: "We integrate directly with RBI-licensed partner banks." }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              "Our infrastructure provides ",
              /* @__PURE__ */ jsx("strong", { children: "real-time" }),
              " ",
              "visibility into funds across accounts."
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              "Reconciliation and payouts are",
              " ",
              /* @__PURE__ */ jsx("strong", { children: "automated and audit-ready." })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              "Multi-bank routing ensures",
              " ",
              /* @__PURE__ */ jsx("strong", { children: "resilience, efficiency, and control." })
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-lg mb-3", children: "By becoming the “single pane of glass” for corporate banking, we empower enterprises to manage money smarter and scale without friction." })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "border-b", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg my-3 font-medium", children: "Building Trust Through Infrastructure" }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "Connected Banking isn’t just about convenience—it’s about trust. Every transaction that flows through",
            " ",
            /* @__PURE__ */ jsx(Link, { className: "text-blue-600", to: "/", children: "bridg.money" }),
            " ",
            "is:"
          ] }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc mb-3 ps-4 md:ps-10", children: [
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              "Backed by ",
              /* @__PURE__ */ jsx("strong", { children: "secure, bank-grade APIs" })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              "Encrypted and compliant with ",
              /* @__PURE__ */ jsx("strong", { children: "RBI guidelines" })
            ] }),
            /* @__PURE__ */ jsx("li", { className: "text-lg mb-3", children: "Designed for transparency, with real-time monitoring and reporting" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-lg mb-3", children: "For our merchants and banking partners, this means confidence that their financial operations are built on a reliable, compliant foundation." })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "border-b", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium my-3", children: "The Bigger Picture" }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "As banks open up to fintech tie-ups,",
            " ",
            /* @__PURE__ */ jsx("strong", { children: "Connected Banking via TSPs is becoming a growth lever for the digital economy." }),
            " ",
            "Enterprises no longer want fragmented financial management—they want control, visibility, and compliance in one place."
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "At",
            " ",
            /* @__PURE__ */ jsx(Link, { className: "text-blue-600", to: "/", children: "bridg.money" }),
            " ",
            ", ur mission is to deliver exactly that:",
            " ",
            /* @__PURE__ */ jsx("strong", { children: "fast, secure, and unified financial infrastructure that helps businesses move money the right way." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "border-b", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium my-3", children: "Our Vision" }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "To establish",
            " ",
            /* @__PURE__ */ jsx(Link, { className: "text-blue-600", to: "/", children: "bridg.money" }),
            " ",
            "as a trusted Payment Aggregator & Payment Gateway (PAPG), known not only for speed and scale, but for delivering compliance-first infrastructure that powers India’s next wave of digital growth."
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "Because in fintech,",
            " ",
            /* @__PURE__ */ jsx("strong", { children: "credibility isn’t optional—it’s everything." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "my-3 text-lg font-semibold", children: [
          "Author: Shivam Roy Chowdhury, Co-Founder & CFO at",
          " ",
          /* @__PURE__ */ jsx(Link, { className: "text-blue-600", to: "/", children: "bridg.money" })
        ] })
      ] })
    },
    {
      id: 12,
      title: "Gaming Ban in India: Why bridg.money Stays Committed to Compliance",
      url: "gaming-ban-in-india-why-bridg-money-stays-committed-to-compliance",
      img: gamingBanInIndia,
      date: "22 Aug 2025",
      subText: `India’s digital payments ecosystem is at a crossroads. While businesses, fintechs, and platforms are embracing API-led infrastructure to scale faster, regulators are also drawing firmer boundaries on what is acceptable.`,
      section: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("section", { className: "border-b", children: [
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "India’s digital payments ecosystem is at a crossroads. While businesses, fintechs, and platforms are embracing API-led infrastructure to scale faster, regulators are also drawing firmer boundaries on what is acceptable. One such area is",
            " ",
            /* @__PURE__ */ jsx("strong", { children: "online gaming and betting," }),
            " which remains banned or restricted in several states."
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "For a Technology Service Provider (TSP) like",
            " ",
            /* @__PURE__ */ jsx(Link, { className: "text-blue-600", to: "/", children: "bridg.money" }),
            ", this isn’t just a regulatory signal—it’s a call to uphold",
            /* @__PURE__ */ jsx("strong", { children: "compliance and transparency" }),
            " at the heart of money movement."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "border-b", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg my-3 font-medium", children: "Why the Gaming Ban Matters for Fintech" }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "States including Karnataka, Tamil Nadu, Telangana, and Andhra Pradesh have placed strict restrictions on online betting and real-money gaming. Backed by the ",
            /* @__PURE__ */ jsx("strong", { children: "IT Rules (2021)" }),
            " ",
            "and RBI directives, the message is clear: India’s financial rails cannot be misused for gambling or other prohibited sectors."
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-lg mb-3", children: "For businesses, this means that any exposure to non-compliant transactions can bring not just penalties, but reputational risk." })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "border-b", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg my-3 font-medium", children: "bridg.money’s Clear Position" }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "At",
            " ",
            /* @__PURE__ */ jsx(Link, { className: "text-blue-600", to: "/", children: "bridg.money" }),
            ", our stance is unambiguous:"
          ] }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc mb-3 ps-4 md:ps-10", children: [
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              "We do ",
              /* @__PURE__ */ jsx("strong", { children: "not" }),
              " support or process gaming, betting, or crypto transactions."
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              "Our infrastructure is built only for",
              " ",
              /* @__PURE__ */ jsx("strong", { children: "legitimate, regulated businesses." })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              "Every partner onboarded goes through strict",
              " ",
              /* @__PURE__ */ jsx("strong", { children: "KYC and AML checks " }),
              "to ensure compliance."
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-lg mb-3", children: "By staying away from high-risk sectors, we protect both our merchants and our banking partners." })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "border-b", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg my-3 font-medium", children: "Building Trust Through Compliance" }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "Trust is the true currency in fintech. That’s why our APIs and connected banking solutions are designed with compliance-first architecture. Every transaction that flows through",
            " ",
            /* @__PURE__ */ jsx(Link, { className: "text-blue-600", to: "/", children: "bridg.money" }),
            " ",
            "is:"
          ] }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc mb-3 ps-4 md:ps-10", children: [
            /* @__PURE__ */ jsx("li", { className: "text-lg mb-3", children: "Backed by RBI-licensed partner banks" }),
            /* @__PURE__ */ jsx("li", { className: "text-lg mb-3", children: "Encrypted and audit-ready" }),
            /* @__PURE__ */ jsx("li", { className: "text-lg mb-3", children: "Monitored in real time to prevent misuse" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-lg mb-3", children: "Just as businesses rely on us for scale, regulators rely on us to safeguard the ecosystem." })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "border-b", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium my-3", children: "The Bigger Picture" }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "As India’s digital economy grows, the temptation to tap into high-risk industries like gaming may rise. But sustainable growth comes only from building",
            " ",
            /* @__PURE__ */ jsx("strong", { children: "transparent, regulated infrastructure." })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            /* @__PURE__ */ jsx(Link, { className: "text-blue-600", to: "/", children: "bridg.money" }),
            "’s focus is clear—empowering enterprises, platforms, and fintechs with payouts, collections, and connected banking that are fast, secure, and fully compliant."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "border-b", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium my-3", children: "Our Vision" }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "To become a leading",
            " ",
            /* @__PURE__ */ jsx("strong", { children: "Payment Aggregator & Payment Gateway (PAPG)" }),
            " in India, trusted not just for speed and scale, but for",
            " ",
            /* @__PURE__ */ jsx("strong", { children: "responsibility and compliance." })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "Because in fintech, credibility isn’t optional—it’s everything. And at",
            " ",
            /* @__PURE__ */ jsx(Link, { className: "text-blue-600", to: "/", children: "bridg.money" }),
            ", we are committed to moving money the right way."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "my-3 text-lg font-semibold", children: [
          "Author: Shivam Roy Chowdhury, Co-Founder & CFO at",
          " ",
          /* @__PURE__ */ jsx(Link, { className: "text-blue-600", to: "/", children: "bridg.money" })
        ] })
      ] })
    },
    {
      id: 13,
      title: "Bridging Banks and Businesses: The Future of Money Movement in India",
      url: "bridging-banks-and-businesses-the-future-of-money-movement-in-india",
      img: bridgingBanksAndBusinesses,
      date: "21 Aug 2025",
      subText: `In today’s digital-first economy, money doesn’t just move—it powers growth. For businesses, marketplaces, fintechs, and platforms, the ability to transfer funds quickly, securely, and compliantly isn’t just an operational need, it’s a competitive advantage.`,
      section: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("section", { className: "border-b", children: [
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "In today’s digital-first economy,",
            " ",
            /* @__PURE__ */ jsx("strong", { children: "money doesn’t just move—it powers growth." }),
            " For businesses, marketplaces, fintechs, and platforms, the ability to transfer funds quickly, securely, and compliantly isn’t just an operational need, it’s a competitive advantage."
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "Yet, for many, managing payouts, collections, and reconciliations across multiple banks remains fragmented, slow, and compliance-heavy. That’s where",
            " ",
            /* @__PURE__ */ jsx("strong", { children: "Technology Service Providers (TSPs)" }),
            " ",
            "like",
            " ",
            /* @__PURE__ */ jsx(Link, { className: "text-blue-600", to: "/", children: "bridg.money" }),
            " ",
            "come in."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "border-b", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg my-3 font-medium", children: "Why Businesses Struggle with Traditional Banking Infrastructure" }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "Most companies today rely on ",
            /* @__PURE__ */ jsx("strong", { children: "multiple partners" }),
            "—banks for accounts, aggregators for payouts, and manual systems for reconciliation. This leads to:"
          ] }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc mb-3 ps-4 md:ps-10", children: [
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "Delays" }),
              " in settlements"
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "High costs" }),
              " from fragmented solutions"
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "Compliance challenges" }),
              " with shifting regulations"
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "Operational inefficiencies" }),
              " that drain time and resources"
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-lg mb-3", children: "The result? Businesses can’t scale as quickly as they should." })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "border-b", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg my-3 font-medium", children: "How bridg.money is Solving This" }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "At",
            " ",
            /* @__PURE__ */ jsx(Link, { className: "text-blue-600", to: "/", children: "bridg.money" }),
            ", our mission is simple:",
            " ",
            /* @__PURE__ */ jsx("strong", { children: "to bridge banks and businesses with a seamless, unified money movement infrastructure." })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-lg mb-3", children: "Our solutions include:" }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc mb-3 ps-4 md:ps-10", children: [
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "BridgPay" }),
              " – Instant, reliable payouts at scale"
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "BridgCollect" }),
              " – Multi-channel collections with automated reconciliation"
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "BridgConnect" }),
              " – Connected banking with real-time visibility across multiple banks"
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "text-lg mb-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "Unified Dashboard" }),
              " – A single view for payouts, collections, reconciliations, and insights"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "By partnering directly with ",
            /* @__PURE__ */ jsx("strong", { children: "RBI-licensed banks" }),
            ", we ensure that every transaction is not only",
            " ",
            /* @__PURE__ */ jsx("strong", { children: "fast and efficient" }),
            ", but also",
            " ",
            /* @__PURE__ */ jsx("strong", { children: "compliant and secure" }),
            "."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "border-b", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium my-3", children: "The Bigger Picture" }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "We’re building an ecosystem where",
            " ",
            /* @__PURE__ */ jsx("strong", { children: "startups, enterprises, and fintechs" }),
            " don’t need to worry about banking infrastructure. Instead, they can focus on what matters most—",
            /* @__PURE__ */ jsx("strong", { children: "innovation and growth." })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "As India’s digital economy continues to expand, the role of",
            " ",
            /* @__PURE__ */ jsx("strong", { children: "API banking and connected banking" }),
            " will only grow stronger. At",
            " ",
            /* @__PURE__ */ jsx(Link, { className: "text-blue-500", to: "/", children: "bridg.money" }),
            ", we’re proud to be part of this transformation."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "border-b", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium my-3", children: "Our Vision" }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "To become a",
            " ",
            /* @__PURE__ */ jsx("strong", { children: "leading Payment Aggregator & Payment Gateway (PAPG)" }),
            ", offering businesses a one-stop infrastructure for all money movement needs."
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mb-3", children: [
            "Because when businesses move money",
            " ",
            /* @__PURE__ */ jsx("strong", { children: "smarter, faster, and safer" }),
            ", the entire economy moves forward."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "my-3 text-lg font-semibold", children: [
          "Author: Shivam Roy Chowdhury, Co-Founder & CFO at",
          " ",
          /* @__PURE__ */ jsx(Link, { className: "text-blue-600", to: "/", children: "bridg.money" })
        ] })
      ] })
    }
  ];
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(Outlet, { context: blogs }) });
};
const Blogs = () => {
  const blogs = useOutletContext();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("section", { className: "container-xxl px-7 pt-25 py-4", children: [
      /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx(TitleDecor, { title: "Our Blogs" }) }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxs("div", { className: "md:w-3/4 text-center", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl font-semibold mb-3", children: "Find our all blogs from here" }),
        /* @__PURE__ */ jsx("p", { className: "text-lg", children: "our blogs are written from very research research and well known writers writers so that we can provide you the best blogs and articles articles for you to read them all along" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "container-xxl py-5 px-7 md:px-15", children: blogs.map((blog) => /* @__PURE__ */ jsxs("div", { className: "grid gap-5 mb-5 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsx("div", { className: "my-3 flex items-center", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: blog.img,
          alt: blog.title,
          className: "w-full rounded-3xl border"
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "mb-2 text-gray-400", children: blog.date }),
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-semibold leading-9.5 mb-3", children: blog.title }),
        /* @__PURE__ */ jsx("p", { className: "mb-3", children: blog.subText }),
        /* @__PURE__ */ jsx(
          Button,
          {
            text: "Read Blog",
            brClr: "black",
            clr: "black",
            url: blog.url
          }
        )
      ] }) })
    ] }, blog.id)) })
  ] });
};
const Blog = () => {
  const { slug } = useParams();
  const blogs = useOutletContext();
  const filteredBlog = blogs.filter((blg) => blg.url === slug);
  const blog = filteredBlog[0];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-3 lg:gap-4 xl:gap-5 px-7 md:px-15 lg:px-10 xl:px-15 pt-15", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-lg sm:text-xl font-bold mb-2 text-[#A4F200]", children: blog.date }),
        /* @__PURE__ */ jsx("h1", { className: "text-3xl sm:text-4xl md:text-[45px] lg:text-4xl xl:text-[45px] font-bold leading-10 sm:leading-12 md:leading-14 lg:leading-12 xl:leading-14 mb-3", children: blog.title })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "lg:col-span-2 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "pb-8", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: blog.img,
          alt: blog.title,
          className: "w-full rounded-3xl border"
        }
      ) }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-3 gap-5 px-7 md:px-15 lg:px-10 xl:px-15 pb-15", children: [
      /* @__PURE__ */ jsx("div", { className: "order-2 lg:order-1 lg:col-span-1", children: /* @__PURE__ */ jsxs("div", { className: "p-7 lg:px-5 shadow rounded-2xl sticky top-30", children: [
        /* @__PURE__ */ jsx(Link, { to: "", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: Logo,
            alt: "footer logo",
            className: "h-13 lg:h-13 xl:15 md:h-15 mb-2 cursor-pointer"
          }
        ) }),
        /* @__PURE__ */ jsx("p", { className: "text", children: "Collect. Payout. Reconcile. All-in-one fintech infrastructure built for modern merchants." }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-5 mt-5", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: XSvg,
              alt: "X",
              className: "cursor-pointer hover:scale-125 transition"
            }
          ),
          /* @__PURE__ */ jsx(
            "img",
            {
              src: FbSvg,
              alt: "FaceBook",
              className: "cursor-pointer hover:scale-125 transition"
            }
          ),
          /* @__PURE__ */ jsx(
            "img",
            {
              src: InstaSvg,
              alt: "Instagram",
              className: "cursor-pointer hover:scale-125 transition"
            }
          ),
          /* @__PURE__ */ jsx(
            "img",
            {
              src: LinkedInSvg,
              alt: "LinkedIn",
              className: "cursor-pointer hover:scale-125 transition"
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "order-1 lg:order-2 lg:col-span-2 lg:px-8", children: blog.section })
    ] })
  ] });
};
const routes = [
  {
    path: "/",
    element: /* @__PURE__ */ jsx(HomeLayout, {}),
    children: [
      { index: true, element: /* @__PURE__ */ jsx(Home, {}) },
      //products
      { path: "bridg-pay", element: /* @__PURE__ */ jsx(BridgPay, {}) },
      { path: "bridg-connect", element: /* @__PURE__ */ jsx(BridgConnect, {}) },
      { path: "bridg-collect", element: /* @__PURE__ */ jsx(BridgCollect, {}) },
      //products
      //use case
      { path: "small-business", element: /* @__PURE__ */ jsx(SmallBusiness, {}) },
      { path: "startup", element: /* @__PURE__ */ jsx(StartUp, {}) },
      { path: "sme", element: /* @__PURE__ */ jsx(SME, {}) },
      { path: "enterprise", element: /* @__PURE__ */ jsx(Enterprise, {}) },
      { path: "retail-and-e-commerce", element: /* @__PURE__ */ jsx(ECommerce, {}) },
      { path: "software-and-tech", element: /* @__PURE__ */ jsx(SoftwareAndTech, {}) },
      { path: "manufacturers", element: /* @__PURE__ */ jsx(Manufacturer, {}) },
      { path: "real-estate", element: /* @__PURE__ */ jsx(RealEstate, {}) },
      { path: "healthcare", element: /* @__PURE__ */ jsx(HealthCare, {}) },
      { path: "hospitality", element: /* @__PURE__ */ jsx(Hospitality, {}) },
      { path: "professional-services", element: /* @__PURE__ */ jsx(ProfessionalServices, {}) },
      {
        path: "consultant-and-freelancers",
        element: /* @__PURE__ */ jsx(ConsultantAndFreelancers, {})
      },
      //use case
      //company
      { path: "about", element: /* @__PURE__ */ jsx(About, {}) },
      { path: "contact", element: /* @__PURE__ */ jsx(Contact, {}) },
      { path: "careers", element: /* @__PURE__ */ jsx(Careers, {}) },
      { path: "mission", element: /* @__PURE__ */ jsx(Mission, {}) },
      { path: "privacy-policy", element: /* @__PURE__ */ jsx(PrivacyPolicy, {}) },
      { path: "terms", element: /* @__PURE__ */ jsx(TermsAndCondition, {}) },
      { path: "trust-and-security", element: /* @__PURE__ */ jsx(TrustAndSecurity, {}) },
      { path: "corporate-policies", element: /* @__PURE__ */ jsx(CorporatePolicies, {}) },
      {
        path: "grievance-redressal-policy",
        element: /* @__PURE__ */ jsx(GrievanceRedressalPolicy, {})
      },
      { path: "responsible-disclosure", element: /* @__PURE__ */ jsx(ResponsibleDisclosure, {}) },
      { path: "security", element: /* @__PURE__ */ jsx(SecureUsageGuidelines, {}) },
      //company
      //resources
      { path: "faq", element: /* @__PURE__ */ jsx(FAQ, {}) },
      {
        path: "blog",
        element: /* @__PURE__ */ jsx(BlogHome, {}),
        children: [
          { index: true, element: /* @__PURE__ */ jsx(Blogs, {}) },
          { path: ":slug", element: /* @__PURE__ */ jsx(Blog, {}) }
        ]
      }
      //resources
    ]
  },
  { path: "*", element: /* @__PURE__ */ jsx(Navigate, { to: "/" }) }
];
/**
 * react-router v7.11.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function RouterProvider2(props) {
  return /* @__PURE__ */ React3.createElement(RouterProvider, { flushSync: ReactDOM.flushSync, ...props });
}
function App({ router }) {
  return /* @__PURE__ */ jsx(RouterProvider2, { router });
}
function render(url) {
  const helmetContext = {};
  const router = createMemoryRouter(routes, {
    initialEntries: [url]
  });
  const html = renderToString(
    /* @__PURE__ */ jsx(HelmetProvider, { context: helmetContext, children: /* @__PURE__ */ jsx(App, { router }) })
  );
  const { helmet } = helmetContext;
  const head = `
    ${helmet.title.toString()}
    ${helmet.meta.toString()}
    ${helmet.link.toString()}
  `;
  return { appHtml: html, head };
}
export {
  render
};
