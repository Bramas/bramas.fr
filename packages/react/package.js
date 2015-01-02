Package.describe({
  summary: "React rendering for Meteor apps"
});

var reactVersion = "0.12.2";

Npm.depends({
  "react": reactVersion
});

Package.registerBuildPlugin({
  name: "compileJSX",
  use: [],
  sources: [
    'plugin/compile-jsx.js'
  ],
  npmDependencies: {
    "react": reactVersion,
    "react-tools": reactVersion
  }
});

Package.onUse(function(api) {
  // Standard distribution of React, same version as react-tools.
  api.addFiles("vendor/react-" + reactVersion + ".js", "client");

  // On the server, we use the modules that ship with react.
  api.addFiles("src/require-react.js", "server");

  // Meteor-enabled components should include this mixin via
  // React.createClass({ mixins: [ReactMeteor.Mixin], ... }).
  api.addFiles("src/ReactMeteor.js", ["server", "client"]);
  api.export("ReactMeteor", ["server", "client"]);
});
