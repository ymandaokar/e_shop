// Generated by CoffeeScript 1.3.3
(function () {
  module.exports.container = function() {
    var argList, container, factories, get, haveVisited, notEmpty, register, registerOne, resolve, toFactory;
    factories = {};
    register = function (name, func) {
      var hash, _results;
      if (name === Object(name)) {
        hash = name;
        _results = [];
        for (name in hash) {
          func = hash[name];
          _results.push(registerOne(name, func));
        }
        return _results;
      } else {
        return registerOne(name, func);
      }
    };
    registerOne = function (name, func) {
      if (!(func != null)) {
        throw new Error("cannot register null function");
      }
      return factories[name] = toFactory(func);
    };
    toFactory = function (func) {
      if (typeof func === "function") {
        return {
          func: func,
          required: argList(func)
        };
      } else {
        return {
          func: function () {
            return func;
          },
          required: []
        };
      }
    };
    argList = function (func) {
      var match, required;
      match = func.toString().match(/function.*?\(([\s\S]*?)\)/);
      if (!(match != null)) {
        throw new Error("could not parse function arguments: " + (func != null ? func.toString() : void 0));
      }
      required = match[1].split(",").filter(notEmpty).map(function (str) {
        return str.trim();
      });
      return required;
    };
    notEmpty = function (a) {
      return a;
    };
    get = function (name, overrides, visited) {
      var dependencies, factory, instance, isOverridden;
      if (visited == null) {
        visited = [];
      }
      isOverridden = overrides != null;
      if (haveVisited(visited, name)) {
        throw new Error("circular dependency with '" + name + "'");
      }
      visited = visited.concat(name);
      factory = factories[name];
      if (!(factory != null)) {
        throw new Error("dependency '" + name + "' was not registered");
      }
      if ((factory.instance != null) && !isOverridden) {
        return factory.instance;
      }
      dependencies = factory.required.map(function (name) {
        if ((overrides != null ? overrides[name] : void 0) != null) {
          return overrides != null ? overrides[name] : void 0;
        } else {
          return get(name, overrides, visited);
        }
      });
      instance = factory.func.apply(factory, dependencies);
      if (!isOverridden) {
        factory.instance = instance;
      }
      return instance;
    };
    haveVisited = function (visited, name) {
      var isName;
      isName = function (n) {
        return n === name;
      };
      return visited.filter(isName).length;
    };
    resolve = function (overrides, func) {
      if (!func) {
        func = overrides;
        overrides = null;
      }
      register("__temp", func);
      return get("__temp", overrides);
    };
    container = {
      get: get,
      resolve: resolve,
      register: register
    };
    container.register("_container", container);
    return container;
  };
}).call(this);