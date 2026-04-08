System.register([], function (_export, _context) {
  "use strict";

  var cc, Application;
  function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  return {
    setters: [],
    execute: function () {
      _export("Application", Application = /*#__PURE__*/function () {
        function Application() {
          _classCallCheck(this, Application);
          _defineProperty(this, "startLoadScene", 0);
          _defineProperty(this, "endLoadScene", 0);
          this.settingsPath = 'src/settings.json';
          this.showFPS = false;
        }
        _createClass(Application, [{
          key: "init",
          value: function init(engine) {
            console.log("Init engine");
            console.log("Tracking config", trackingConfig);
            cc = engine;
            cc.GoogleAnalyticsTracker = window.GoogleAnalyticsTracker;
            cc.game.onPreBaseInitDelegate.add(this.onPreBaseInit.bind(this));
            cc.game.onPostProjectInitDelegate.add(this.onPostProjectInit.bind(this));
            cc.error = function () {
              var _console;
              (_console = console).error.apply(_console, arguments);
            };
          }
        }, {
          key: "onPreBaseInit",
          value: function onPreBaseInit() {
            console.log("onPreBaseInit");
          }
        }, {
          key: "onPostProjectInit",
          value: function onPostProjectInit() {
            // do custom logic
            cc.director.once(cc.Director.BEFORE_SCENE_LOADING, this.onBeforeSceneLoading, this);
            cc.director.once(cc.Director.AFTER_SCENE_LAUNCH, this.onAfterSceneLaunch, this);
          }
        }, {
          key: "onBeforeSceneLoading",
          value: function onBeforeSceneLoading(name) {
            console.log("onBeforeSceneLoading", name);
            cc.GoogleAnalyticsTracker.sendEvent("STARTING");
            this.startLoadScene = performance.now();
          }
        }, {
          key: "onAfterSceneLaunch",
          value: function onAfterSceneLaunch() {
            console.log("onAfterSceneLaunch");
            this.endLoadScene = performance.now();
            cc.director.once(cc.Director.AFTER_DRAW, this.onceAfterDraw, this);
          }
        }, {
          key: "onceAfterDraw",
          value: function onceAfterDraw(e) {
            console.log("onceAfterDraw");
            cc.GoogleAnalyticsTracker.sendEvent("IMPRESSION", {
              duration: Number((this.endLoadScene - this.startLoadScene).toFixed(3))
            });
          }
        }, {
          key: "start",
          value: function start() {
            return cc.game.init({
              debugMode: false ? cc.DebugMode.INFO : cc.DebugMode.ERROR,
              settingsPath: this.settingsPath,
              overrideSettings: {
                // assets: {
                //      preloadBundles: [{ bundle: 'main', version: 'xxx' }],
                // }
                profiling: {
                  showFPS: this.showFPS
                }
              }
            }).then(function () {
              return cc.game.run();
            });
          }
        }]);
        return Application;
      }());
    }
  };
});