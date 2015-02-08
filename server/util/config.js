var config;
config = {
			// server: {
			// 	ip: process.env.IP || '127.0.0.1',
			// 	port: process.env.PORT || 9005
			// },
			// db: {
			// 	conn: 'mongodb://127.0.0.1:27017/pqr_db'
			// },

		//para servir desde local con linux, sino no deja...
		server: {
			ip: process.env.IP || '0.0.0.0',
			port: process.env.PORT || 9005
		},
		db: {
			conn: 'mongodb://0.0.0.0:27017/pqr_db'
		},
		ids: {
			google: {
				client_id:'735884603730-dr7hk7c0dctaueb4md5t6dcj2t9f7amg.apps.googleusercontent.com',
				client_secret: 'N_2NrIdqzFhNX8NYP42tcg_m',
				callback_url: 'http://localhost:9005/auth/oauth2callback',
				scopes: ['https://www.googleapis.com/auth/userinfo.profile','https://www.googleapis.com/auth/userinfo.email']
			},
			facebook: {
				client_id:'845795205477907',
				client_secret: '12b9578e81997d0fa063ad50692ccf9b',
				callback_url: 'http://localhost:9005/auth/oauth2callbackfb',
				scopes: ['public_profile', 'email','user_friends']
			}
		},
		jwtSecret: 'dY5E9gcjfHGqktM?85GmnED@q+WxQE7LMrx*rhzq$PDuH4+6p9NfsB-QxeXJd6U+ZqfxSzkc_E?YUL%AFyxz@LKXv?chDVGJL=rd?rxA67&dX_3Gg5EDFdE53F_hxHd3#Ty2QRUA_KGK9Z%ADQv$Kp9Y$e*Jz9^MqAKvafd%73C4_^qhRhYLB9bkN=u$ex@97?PZHKY_d#$-PA#8JQ86J7e8WNKNcT+jt9=$nx@63SV8fjSnq4=qLMn$xf9Eu4sPpWVKjMgV7uY+x9hXQ2n2@UVFqtwzD3hg@WBSsR@gsq5f?GAjGqR!A%GtZ7NyFUfbSg*?cMTR2W+cTR#wBsPSGATvXx$%BLkK#s5T2b*S#rQ4aMq29Xm--ppcV5feQTM*ms-Mt!G4xJ_Kec-SU?Ts!g!JWcW@$&_sV!XZ?8@3Jy@f4V+ZGChy6$gnWUQ?!azNJ-Z3-E4c*Px3Np4tSUhRvCG#kc%dp*Zgp$vPG_M2-p_93p!dH&7+w&s2XcYBJYxj3@sLfyZ#uRHTVqXGUygW6YHsDA6g4*Kz$gs6tzajEeAzD%#-+8sgLZ9KrQg=UD6mHhU#7XykwwEffb9n4tgHa#Ue+&R=2DZ-pBTcp3LZBQL5h*zsCEseBd?gZUNW3ESmazATFe88s!$2^@Gggm?CxyyG7PMmzyJevUWkzxk9!Yp4wn_rE37*Z@YR6QLHnDU+cTSJ6@T*hDbHCPe^rRBGGXUE!Ueg&JBX_2Mypd5+kV37^5$MVw#u&TZD2?#?hrvVXvy&gnd^6#r!UK?TdVkrA5__*!-4mARu^NHCZd=qS3NN@^b+wn!-@_6bMZyE@L?bnDrJ!w5GBSvfAZnqZ2hbdK&K6#E_7w547HK$Hk5sSR-K%-wyAE3@f&whsKA!%^XUFm&E2DR4a7vYHnK_h6#GkruYX@zzN4-fY5V5zCCZb%w7f8MuRs+9a+YakXxYgTUy=Ku_LCCuxGpktb^7ybH#?pSRh^$8d%fNMj3T$sP+@nxJmvz-NW9drGw*GUX#tg7C8876-!66@3qtM_a=98*yCnMW+r4j?^jKgh?LR8Zaw5gBznv^Ks=E5Gw=m23u8_2kjcMdMztTGJYahr4CqP_!sH-+vD+AkDFby9S$LEwL-T=@+wHyW*rFZUuEWVkrejMC3h94MFu#vRA@hDrHTA#??bJE3Lakcazam9zgTcXqQk!GM#t&jcAta6_2qWB9!K@FuX&#tw4dA6g5EFq6k*3GCKm4g4YP=JNM6rejp!CJY?n#eH_wATQ#!kna7e_skE$n99GZRf-27!5Z%qHAD$@GB%4tuqtjzwyn9T^_eeK2!#ycj*-8uM2WzydN-74GKe$Hqv_#hMGUth=fj4UN9ybnn^+yN=DSGNT7sEazzZ@#=Rybq7!DUJdQDM8&jc8rN+n?Necc$x6Xaerkm3ZgHeuqjaK5qUJvFwd=7x6?LyuKQ@?FLPV_$z-bh8!*QW^?!8sccQN!5@Zr@g6%3q7_Sw&%gEK$dJ^9Sfs3WX+Kv5b%+_PxQ92X&j$kUs+PYGnvh%jWBqk?x#ewa+Yxh6e%H%EDrP%DH9SR%pDST#VCw4&muzdpDGRAjgjTLm!66nsk@Zv9HN8ruMAb7S+L!$3Aq=9v?&PF#Ew&p-%BjF9WKVF*Ee^X?9K+Lxgcz7!NYwNx@d3RGW&fm_&&Vc5CTgq42x6#aR9uzpXwvEBP2G@LkFtP-hG=BLfzjT$qN&$5GM-3fg7$FF59!ajPfMvaT3hKUavEqS&k#pFG$P8aDjbT45A9PaU%Q&UPTX-$hE2K7RR#KPW8wezJKj?%FvsS?5Fm2xT22Q95CwERcrq+R%6k?77NzqgyQuBSsf3M533L3M3Mfb9qsHGMB#59V+2hu9EN^SHL3v=hJ+AnU56*#nVe5wRtpbjfAW+-Pwf_d?@n-98HR3nkX9T4yR=K-SFp*_tAFd@*z?-!9_^Hv^PDpRAyE9c*2SFn3uBFX$NZSq^3=N-GyK+-Xc8%HDq_r9H7S^#P=gWjUp*ed+SCK-+aD+y734BMab3tYdD&Q6=Wxv59runjw@78'
	};

	module.exports = config;

	//revisar cuando tengamos openshift desplegado
	// if (process.env.CONFIG) {
	// 	config = require('../config/' + process.env.CONFIG);
	// } else {
	//   // config = require('../config/dev');
// 	config = {
// 		server: {
// 			ip: process.env.IP || '0.0.0.0',
// 			port: process.env.PORT || 9005
// 		},
// 		db: {
// 			conn: 'mongodb://0.0.0.0:27017/socialscoreboard'
// 		}
// 	};
// }
