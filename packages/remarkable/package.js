Package.describe({
  name: 'remarkable',
  summary: 'Markdown parser, done right. Commonmark support, extensions, syntax plugins, high speed - all in one',
  version: '1.6.0',
  git: 'https://github.com/jonschlinkert/remarkable'
});


Npm.depends({
  "remarkable": "1.5.0"
});

Package.onUse(function (api) {
  api.versionsFrom('METEOR@0.9.0');

  api.addFiles('remarkable.1.5.0.min.js', ['client']);
  api.addFiles('moduleExports.js', ['server']); 

  api.export('Remarkable', ['server']);
});
