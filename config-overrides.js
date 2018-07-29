const rewireMobX = require('react-app-rewire-mobx');
const rewirePreact = require('react-app-rewire-preact');
const rewireLess = require('react-app-rewire-less');

/* config-overrides.js */
module.exports = function override(config, env) {

    // use the Preact rewire
    if (env === "production") {
        console.log("⚡ Production build with Preact");
        config = rewirePreact(config, env);
    }

    // use the MobX rewire
    // use the less rewire
    config = rewireMobX(config, env);
    config = rewireLess(config, env);

    return config;
}