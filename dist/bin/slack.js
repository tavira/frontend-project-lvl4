#! /usr/bin/env node
"use strict";

var _ = _interopRequireDefault(require(".."));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var port = process.env.PORT || 5000;
var app = (0, _["default"])({
  port: port
});
app.listen(port, '0.0.0.0', function () {
  console.log("Server has been started on ".concat(port));
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NlcnZlci9iaW4vc2xhY2suanMiXSwibmFtZXMiOlsicG9ydCIsInByb2Nlc3MiLCJlbnYiLCJQT1JUIiwiYXBwIiwibGlzdGVuIiwiY29uc29sZSIsImxvZyJdLCJtYXBwaW5ncyI6IkFBQUE7OztBQUVBOzs7O0FBRUEsSUFBTUEsSUFBSSxHQUFHQyxPQUFPLENBQUNDLEdBQVIsQ0FBWUMsSUFBWixJQUFvQixJQUFqQztBQUNBLElBQU1DLEdBQUcsR0FBRyxrQkFBTztBQUFFSixFQUFBQSxJQUFJLEVBQUpBO0FBQUYsQ0FBUCxDQUFaO0FBQ0FJLEdBQUcsQ0FBQ0MsTUFBSixDQUFXTCxJQUFYLEVBQWlCLFNBQWpCLEVBQTRCLFlBQU07QUFDaENNLEVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixzQ0FBMENQLElBQTFDO0FBQ0QsQ0FGRCIsInNvdXJjZXNDb250ZW50IjpbIiMhIC91c3IvYmluL2VudiBub2RlXG5cbmltcG9ydCBnZXRBcHAgZnJvbSAnLi4nO1xuXG5jb25zdCBwb3J0ID0gcHJvY2Vzcy5lbnYuUE9SVCB8fCA1MDAwO1xuY29uc3QgYXBwID0gZ2V0QXBwKHsgcG9ydCB9KTtcbmFwcC5saXN0ZW4ocG9ydCwgJzAuMC4wLjAnLCAoKSA9PiB7XG4gIGNvbnNvbGUubG9nKGBTZXJ2ZXIgaGFzIGJlZW4gc3RhcnRlZCBvbiAke3BvcnR9YCk7XG59KTtcbiJdfQ==