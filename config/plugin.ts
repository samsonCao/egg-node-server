import {EggPlugin} from 'egg';

const plugin: EggPlugin = {
    static: {
        enable: true,
    },
    nunjucks: {
        enable: true,
        package: 'egg-view-nunjucks',
    },
    oss: {
        enable: true,
        package: 'egg-oss',
    },
    cors: {
        enable: true,
        package: 'egg-cors',
    },
    raven: {
        enable: true,
        package: 'egg-raven',
    },
    alinode: {
        enable: true,
        package: 'egg-alinode',
    },
};

export default plugin;
