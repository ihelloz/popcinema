var App = {
	title: "",
    url: '',
	online: true,
    init: function(){
    	App.checkUpdates();
		jDownloader.init();
		App.online = navigator.onLine;

		if (App.online) {
			//if we have connection, delete old media caches
			for (key in localStorage) {
				if (key.indexOf('mediaCache') != -1) {
					delete(localStorage[key]);
				}
			}
		}
    },
	checkUpdates: function()
	{
		var version = Ti.App.getVersion();
		$.post(App.url+'updates.php',{version:version},function(data) {
			if (version != data.version) {
				alert('Nueva versión disponible');
			}
		});
	},
	getLink : function(idm,mediaType,idv,callback) {
		$.post(App.url+'go.php',{idv:idv, idm:idm, mediaType:mediaType},function(vlink) {
			if (vlink == '' || vlink.indexOf('http') == -1) {
				vlink = false;
			}
			callback(vlink);
		});
	}
};