const path = require('path');
const rewireMobX = require('react-app-rewire-mobx');
const rewireLess = require('react-app-rewire-less');
const rewireTypescript = require('react-app-rewire-typescript');

/* config-overrides.js */
module.exports = function override(config, env) {

    config.resolve = {
        extensions: ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx', '.ts', '.tsx'],
        alias: {
            Src: path.resolve(__dirname, 'src')
        }
    };

    // use the MobX rewire
    // use the less rewire
    // use the typescript
    config = rewireMobX(config, env);
    config = rewireLess(config, env);
    config = rewireTypescript(config, env);

    return config;
}