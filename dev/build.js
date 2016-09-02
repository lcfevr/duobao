({
	appDir: './',
	baseUrl: './js',
	dir: '../build',
    // allowSourceOverwrites:true,
	modules: [{
        name: 'app'
    }],
    //fileExclusionRegExp: /(^(r|build)\.js$)|demo\.css|demo.html|iconfont\.css|(\.zip$)|myApp/,
	fileExclusionRegExp: /(^(r|build)\.js$)|demo\.css|demo\.html|ui\.html|index\.html|iconfont\.css|(\.zip$)|(\.psd$)|(\.ai$)|(\.bak$)/,
	optimizeCss: 'standard',
	removeCombined: true,
    'paths': {
        'text': './lib/text',
        'hbs': './lib/handlebars-v2.0.0',
        'zepto': './lib/zepto',
        'pageSwitch': './lib/pageSwitch',
        'ctrl': './controller/',
        'util': './utils/util',
        'ui': './utils/ui',
        'config': './utils/config'
    },
    'shim': {
        './utils/utils/hbs': ['hbs']
    }
})
