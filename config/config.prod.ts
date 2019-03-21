import {EggAppConfig, PowerPartial} from 'egg';

export default () => {
    const config: PowerPartial<EggAppConfig> = {};

    config.host = 'pro host';

    // 生产环境产生的文件存储到 njop-prod 空间中
    config.oss = {
        client: {
            accessKeyId: 'set key id ',
            accessKeySecret: 'set secret id',
            bucket: '',
            endpoint: 'oss.com',
            timeout: '19s',
        },
    };

    return config;
};
