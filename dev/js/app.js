// var lang = (navigator.appName == 'Netscape' ? navigator.language : navigator.userLanguage).toLowerCase();
// lang = localStorage.getItem('language') || lang;
requirejs.config({
    'paths': {
        'text': 'lib/text',
        'hbs': 'lib/handlebars-v2.0.0',
        'zepto': 'lib/zepto',
        'pageSwitch': 'lib/pageSwitch',
        'app': '',
        'ctrl': 'controller',
        'util': 'utils/util',
        'ui': 'utils/ui',
        'config': 'utils/config'
    },
    'shim': {
        'utils/utils/hbs': ['hbs']
    }
});

requirejs(['zepto',
    'utils/hbs',
    'ui',
    'config',
    'module/user',
    'module/cart',
    'ctrl/route',
    'ctrl/global',
    'ctrl/weixin'
], function(undefined, HBS, UI, Config, ModUser, ModCart, Route, Global, WeiXin) {
    $(function(){
        if(typeof g_appname != 'undefined' && !!g_appname){
            Config.appName = g_appname;
            WeiXin.shareConf.title = g_appname;
            WeiXin.shareConf.desc = g_appname;
        }
        if(typeof g_apiurl != 'undefined' && !!g_apiurl){
             Config.apiDomain = g_apiurl;
        }

        UI.loading();
        // 初始化微信
        WeiXin.init(function() {
            // 用户初始化
            ModUser.init(function(){
                ModCart.init();

                Route.init();
                UI.loading(-1);
            });
        });

        // 全局方法初始化
        Global.init();
    });
});