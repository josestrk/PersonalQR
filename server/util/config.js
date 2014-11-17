var config;

//revisar cuando tengamos openshift desplegado
// if (process.env.CONFIG) {
// 	config = require('../config/' + process.env.CONFIG);
// } else {
//   // config = require('../config/dev');
// 	config = {
// 		server: {
// 			ip: process.env.IP || '0.0.0.0',
// 			port: process.env.PORT || 9001
// 		},
// 		db: {
// 			conn: 'mongodb://0.0.0.0:27017/socialscoreboard'
// 		}
// 	};
// }

config = {
		server: {
			ip: process.env.IP || '0.0.0.0',
			port: process.env.PORT || 9001
		},
		db: {
			conn: 'mongodb://0.0.0.0:27017/socialscoreboard'
		}
	};

module.exports = config;
