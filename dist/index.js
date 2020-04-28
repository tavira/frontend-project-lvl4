"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/stable");

require("regenerator-runtime/runtime");

var _path = _interopRequireDefault(require("path"));

var _pug = _interopRequireDefault(require("pug"));

var _socket = _interopRequireDefault(require("socket.io"));

var _fastify = _interopRequireDefault(require("fastify"));

var _pointOfView = _interopRequireDefault(require("point-of-view"));

var _fastifyStatic = _interopRequireDefault(require("fastify-static"));

var _routes = _interopRequireDefault(require("./routes.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// @ts-check
// import _ from 'lodash';
var isProduction = process.env.NODE_ENV === 'production';

var appPath = _path["default"].join(__dirname, '..');

var isDevelopment = !isProduction;

var setUpViews = function setUpViews(app) {
  var domain = isDevelopment ? 'http://localhost:8080' : '';
  app.register(_pointOfView["default"], {
    engine: {
      pug: _pug["default"]
    },
    defaultContext: {
      assetPath: function assetPath(filename) {
        return "".concat(domain, "/assets/").concat(filename);
      }
    },
    templates: _path["default"].join(__dirname, 'views')
  });
};

var setUpStaticAssets = function setUpStaticAssets(app) {
  app.register(_fastifyStatic["default"], {
    root: _path["default"].join(appPath, 'dist/public'),
    prefix: '/assets'
  });
};

var _default = function _default(options) {
  var app = (0, _fastify["default"])();
  setUpViews(app);
  setUpStaticAssets(app);
  var io = (0, _socket["default"])(app.server);
  (0, _routes["default"])(app, io, options.state || {});
  return app;
};

exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NlcnZlci9pbmRleC5qcyJdLCJuYW1lcyI6WyJpc1Byb2R1Y3Rpb24iLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJhcHBQYXRoIiwicGF0aCIsImpvaW4iLCJfX2Rpcm5hbWUiLCJpc0RldmVsb3BtZW50Iiwic2V0VXBWaWV3cyIsImFwcCIsImRvbWFpbiIsInJlZ2lzdGVyIiwicG9pbnRPZlZpZXciLCJlbmdpbmUiLCJwdWciLCJQdWciLCJkZWZhdWx0Q29udGV4dCIsImFzc2V0UGF0aCIsImZpbGVuYW1lIiwidGVtcGxhdGVzIiwic2V0VXBTdGF0aWNBc3NldHMiLCJmYXN0aWZ5U3RhdGljIiwicm9vdCIsInByZWZpeCIsIm9wdGlvbnMiLCJpbyIsInNlcnZlciIsInN0YXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBRUE7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7Ozs7QUFaQTtBQVdBO0FBR0EsSUFBTUEsWUFBWSxHQUFHQyxPQUFPLENBQUNDLEdBQVIsQ0FBWUMsUUFBWixLQUF5QixZQUE5Qzs7QUFDQSxJQUFNQyxPQUFPLEdBQUdDLGlCQUFLQyxJQUFMLENBQVVDLFNBQVYsRUFBcUIsSUFBckIsQ0FBaEI7O0FBQ0EsSUFBTUMsYUFBYSxHQUFHLENBQUNSLFlBQXZCOztBQUVBLElBQU1TLFVBQVUsR0FBRyxTQUFiQSxVQUFhLENBQUNDLEdBQUQsRUFBUztBQUMxQixNQUFNQyxNQUFNLEdBQUdILGFBQWEsR0FBRyx1QkFBSCxHQUE2QixFQUF6RDtBQUNBRSxFQUFBQSxHQUFHLENBQUNFLFFBQUosQ0FBYUMsdUJBQWIsRUFBMEI7QUFDeEJDLElBQUFBLE1BQU0sRUFBRTtBQUNOQyxNQUFBQSxHQUFHLEVBQUVDO0FBREMsS0FEZ0I7QUFJeEJDLElBQUFBLGNBQWMsRUFBRTtBQUNkQyxNQUFBQSxTQUFTLEVBQUUsbUJBQUNDLFFBQUQ7QUFBQSx5QkFBaUJSLE1BQWpCLHFCQUFrQ1EsUUFBbEM7QUFBQTtBQURHLEtBSlE7QUFPeEJDLElBQUFBLFNBQVMsRUFBRWYsaUJBQUtDLElBQUwsQ0FBVUMsU0FBVixFQUFxQixPQUFyQjtBQVBhLEdBQTFCO0FBU0QsQ0FYRDs7QUFhQSxJQUFNYyxpQkFBaUIsR0FBRyxTQUFwQkEsaUJBQW9CLENBQUNYLEdBQUQsRUFBUztBQUNqQ0EsRUFBQUEsR0FBRyxDQUFDRSxRQUFKLENBQWFVLHlCQUFiLEVBQTRCO0FBQzFCQyxJQUFBQSxJQUFJLEVBQUVsQixpQkFBS0MsSUFBTCxDQUFVRixPQUFWLEVBQW1CLGFBQW5CLENBRG9CO0FBRTFCb0IsSUFBQUEsTUFBTSxFQUFFO0FBRmtCLEdBQTVCO0FBSUQsQ0FMRDs7ZUFPZSxrQkFBQ0MsT0FBRCxFQUFhO0FBQzFCLE1BQU1mLEdBQUcsR0FBRywwQkFBWjtBQUVBRCxFQUFBQSxVQUFVLENBQUNDLEdBQUQsQ0FBVjtBQUNBVyxFQUFBQSxpQkFBaUIsQ0FBQ1gsR0FBRCxDQUFqQjtBQUVBLE1BQU1nQixFQUFFLEdBQUcsd0JBQU9oQixHQUFHLENBQUNpQixNQUFYLENBQVg7QUFFQSwwQkFBVWpCLEdBQVYsRUFBZWdCLEVBQWYsRUFBbUJELE9BQU8sQ0FBQ0csS0FBUixJQUFpQixFQUFwQztBQUVBLFNBQU9sQixHQUFQO0FBQ0QsQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEB0cy1jaGVja1xuXG5pbXBvcnQgJ2NvcmUtanMvc3RhYmxlJztcbmltcG9ydCAncmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lJztcblxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgUHVnIGZyb20gJ3B1Zyc7XG5pbXBvcnQgc29ja2V0IGZyb20gJ3NvY2tldC5pbyc7XG5pbXBvcnQgZmFzdGlmeSBmcm9tICdmYXN0aWZ5JztcbmltcG9ydCBwb2ludE9mVmlldyBmcm9tICdwb2ludC1vZi12aWV3JztcbmltcG9ydCBmYXN0aWZ5U3RhdGljIGZyb20gJ2Zhc3RpZnktc3RhdGljJztcbi8vIGltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgYWRkUm91dGVzIGZyb20gJy4vcm91dGVzLmpzJztcblxuY29uc3QgaXNQcm9kdWN0aW9uID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJztcbmNvbnN0IGFwcFBhdGggPSBwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi4nKTtcbmNvbnN0IGlzRGV2ZWxvcG1lbnQgPSAhaXNQcm9kdWN0aW9uO1xuXG5jb25zdCBzZXRVcFZpZXdzID0gKGFwcCkgPT4ge1xuICBjb25zdCBkb21haW4gPSBpc0RldmVsb3BtZW50ID8gJ2h0dHA6Ly9sb2NhbGhvc3Q6ODA4MCcgOiAnJztcbiAgYXBwLnJlZ2lzdGVyKHBvaW50T2ZWaWV3LCB7XG4gICAgZW5naW5lOiB7XG4gICAgICBwdWc6IFB1ZyxcbiAgICB9LFxuICAgIGRlZmF1bHRDb250ZXh0OiB7XG4gICAgICBhc3NldFBhdGg6IChmaWxlbmFtZSkgPT4gYCR7ZG9tYWlufS9hc3NldHMvJHtmaWxlbmFtZX1gLFxuICAgIH0sXG4gICAgdGVtcGxhdGVzOiBwYXRoLmpvaW4oX19kaXJuYW1lLCAndmlld3MnKSxcbiAgfSk7XG59O1xuXG5jb25zdCBzZXRVcFN0YXRpY0Fzc2V0cyA9IChhcHApID0+IHtcbiAgYXBwLnJlZ2lzdGVyKGZhc3RpZnlTdGF0aWMsIHtcbiAgICByb290OiBwYXRoLmpvaW4oYXBwUGF0aCwgJ2Rpc3QvcHVibGljJyksXG4gICAgcHJlZml4OiAnL2Fzc2V0cycsXG4gIH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgKG9wdGlvbnMpID0+IHtcbiAgY29uc3QgYXBwID0gZmFzdGlmeSgpO1xuXG4gIHNldFVwVmlld3MoYXBwKTtcbiAgc2V0VXBTdGF0aWNBc3NldHMoYXBwKTtcblxuICBjb25zdCBpbyA9IHNvY2tldChhcHAuc2VydmVyKTtcblxuICBhZGRSb3V0ZXMoYXBwLCBpbywgb3B0aW9ucy5zdGF0ZSB8fCB7fSk7XG5cbiAgcmV0dXJuIGFwcDtcbn07XG4iXX0=