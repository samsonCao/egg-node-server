import {EggAppConfig, PowerPartial} from 'egg';

export default () => {
    const config: PowerPartial<EggAppConfig> = {};

    config.host = 'set server url';

    return config;
};
