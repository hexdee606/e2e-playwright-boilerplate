// config/global.variables.conf.js
const envURL = require('./env.conf');

global.env_url = {
    ui: envURL[envURL.env].web.host_url,
    apiConf: {
        end_point: envURL[envURL.env].restApi.end_point,
        headers: {}
    },
    gqlConf: {
        end_point: envURL[envURL.env].gql.end_point,
        headers: {}
    }
};

global.test_data = require('../src/data/test_data');
global.strings_data = require('../src/data/strings_data');
global.variables = require('../src/data/variables');
global.api_support = require('../supports/api_support');
global.gql_support = require('../supports/gql_support');
global.common_functions = require('../supports/common_functions');
global.common_methods = require('../supports/common_methods');
global.browser_storage_support = require('../supports/browser_storage_support');
global.excel_support = require('../supports/excel_support');