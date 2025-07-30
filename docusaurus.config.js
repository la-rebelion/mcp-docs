const path = require('path');

module.exports = {
  // ...existing configuration...
  plugins: [
    // Register the JSON-LD plugin
    [
      require.resolve("./src/plugins/docusaurus-plugin-jsonld"),
      {
        // Plugin options (if needed)
      },
    ],
  ],
};