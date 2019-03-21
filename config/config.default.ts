import {EggAppConfig, EggAppInfo, PowerPartial} from 'egg';
import * as path from 'path';

export default (appInfo: EggAppInfo) => {
    const config: PowerPartial<EggAppConfig> = {};

    config.host = 'server host';
    config.client_id = 'webApp';
    config.client_secret = 'webApp';

    config.ossFolders = [
        'oss fields1',
        'oss fields2',
        'oss fields3',
    ];

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + 'sortxxx';

    // add your config here
    config.middleware = [];

    config.view = {
        root: [
            path.join(appInfo.baseDir, '/op-dist'),
            path.join(appInfo.baseDir, '/app/view'),
        ].join(','),
        defaultViewEngine: 'nunjucks',
        mapping: {
            '.html': 'nunjucks',
        },
    };

    config.static = {
        prefix: '/public',
        dir: [
            path.join(appInfo.baseDir, '/op-dist'),
            path.join(appInfo.baseDir, '/app/public'),
        ],
        gzip: true,
    };

    config.cluster = {
        listen: {
            port: 15012,
        },
    };

    config.security = {
        xframe: {
            enable: false,
        },
        csrf: {
            enable: false,
        },
        domainWhiteList: [
            'http://localhost:8088'
        ],
    };

    config.bodyParser = {
        enable: true,
        encoding: 'utf8',
        formLimit: '10mb',
        jsonLimit: '10mb',
    };

    config.multipart = {
        mode: 'file',
        fileExtensions: [ '.pdf' ],
        fileSize: '10mb',
    };

    config.cors = {
        credentials: true,
    };

    config.oss = {
        client: {
            accessKeyId: 'set key id',
            accessKeySecret: ' set key secret',
            bucket: 'njop',
            endpoint: 'set xxx.com',
            timeout: '19s',
        },
    };

    // config.raven = {
    //     dsn: 'set sentry url',
    //     options: {
    //         // refer to https://docs.sentry.io/clients/node/config/#optional-settings for more options detail.
    //         autoBreadcrumbs: {
    //             http: true,
    //         },
    //         release: '',
    //     },
    // };

    config.alinode = {
        enable: false,
        appid: '',
        secret: 'set secret',
    };

    return config;
};
