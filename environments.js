const path = require('path');
const envs = {
	nfxUser: process.env.SMSM_NFX_USER || null,
	nfxPass: process.env.SMSM_NFX_PASSWORRD || null,
	nfxAccountOriginCoutryCode: process.env.SMSM_NFX_ORIGIN_COUNTRY_CODE || 'RO',
	privatePath: process.env.PRIVATE_DIR || path.resolve(__dirname, './private'),
};

module.exports = envs;