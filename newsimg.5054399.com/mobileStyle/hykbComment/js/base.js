window.hykbJsAndroidApiObj  = {
    user:window.userInterface || null,
    activity:window.activityInterface  || null,
    download:window.downloadInterface  || null
};

//客户端相关JS类
var Client = {
    scookie:"",
    env: {
        platform: 'android',		//运行平台
        version: '1.5.3.2',			//客户端的版本号
        isClient: 0					//是否是客户端
    },
    //初始化
    init: function() {
        var client = this;
        var isAndroid = (/android/gi).test(navigator.appVersion),
            isClient = (/@4399_sykb_android_activity@/gi).test(navigator.userAgent),
            isIDevice = (/iphone|ipad|ipod/gi).test(navigator.appVersion);
        this.env.platform = isAndroid ? 'android' : (isIDevice ? 'ios' : 'unknow');
        this.env.isClient = isClient;
        if(/(@4399_sykb_android_activity@\/)(\d+\.\d+\.\d+(\.\d+)?)/g.test(navigator.userAgent)) {
            client.env.version = RegExp.$2;
        }

        //判断是否有登录
        if(this.env.isClient) {
            if(window.userInterface && window.userInterface.isLogin()) {
                var UserInfo = window.userInterface.getUserInfo();
                var jsonobj  = eval('('+UserInfo+')');  
                this.scookie =  jsonobj.scookie;
            }  
        }          

    },
    //判断哪个版本号
    checkVersion: function(version2, operator) {
        this.php_js = this.php_js || {};
        this.php_js.ENV = this.php_js.ENV || {};
        var compare = 0,
            vm = {
                'dev': -6,
                'alpha': -5,
                'a': -5,
                'beta': -4,
                'b': -4,
                'RC': -3,
                'rc': -3,
                '#': -2,
                'p': 1,
                'pl': 1
            },
            prepVersion = function(version) {
                version = ""+version;
                version = version.replace(/[_\-+]/g, '.');
                version = version.replace(/([^.\d]+)/g, '.$1.')
                version = version.replace(/\.{2,}/g, '.');
                return (!version.length ? [-8] : version.split('.'));
            },
            numVersion = function(v) {
                return !v ? 0 : (isNaN(v) ? vm[v] || -7 : parseInt(v, 10));
            };

        version1 = prepVersion(this.env.version);
        version2 = prepVersion(version2)

        maxVersion = Math.max(version1.length, version2.length);
        for(var i = 0; i < maxVersion; i++) {
            if(version1[i] == version2[i]) {
                continue;
            }
            version1[i] = numVersion(version1[i]);
            version2[i] = numVersion(version2[i]);
            if(version1[i] < version2[i]) {
                compare = -1;
                break;
            }else if(version1[i] > version2[i]) {
                compare = 1;
                break;
            }
        }
        if(!operator) {
            return compare;
        }
        switch(operator) {
            case '>':
            case 'gt':
                return (compare > 0);
            case '>=':
            case 'ge':
                return (compare >= 0);
            case '<=':
            case 'le':
                return (compare <= 0);
            case '==':
            case '=':
            case 'eq':
                return (compare === 0);
            case '<>':
            case '!=':
            case 'ne':
                return (compare !== 0);
            case '':
            case '<':
            case 'lt':
                return (compare < 0);
            default:
                return null;
        }
    },
    login:function() {
        if(this.env.isClient) {
            if(this.scookie) {
                return false;
            }
			window.userInterface.login();
        }else {
            document.location.href = 'https://ptlogin.4399.com/oauth2/authorize.do?client_id=test&redirect_uri='+encodeURIComponent(window.location.href)+'&response_type=NILL&auth_action=LOGIN&css=&uid=&access_token=';
        }
        return true;
    },
    loginReload:function(ajaxPath,data,callback) {
        this.get(ajaxPath,data,callback);
    },
    get:function(url, data, callback) {
        if(this.env.isClient) {
            if(this.scookie=="" && window.userInterface.isLogin()) {
                var UserInfo = window.userInterface.getUserInfo();
                var jsonobj  = eval('('+UserInfo+')');  
                this.scookie =  jsonobj.scookie;
            }
            data.scookie = this.scookie;

            data.device = window.activityInterface.getUniqueDeviceId(); //设备号
        }       

        $.post(url, data, function(result) {callback(result);},"json");
    }

};
Client.init();

//弹窗类
var Dialog = function(config){
    this.config={
        id:'',
        close_id:'',
        close_fun:null,
        opacity:0.5,
        cover:true
    }
    this.config = $.extend({},this.config,config);
    this.show();
}
Dialog.prototype = {
    show:function(){
        var that = this;
        var comm_data = {
            mark_str : "<div class='fixed-top' id='iwgc_dialog_bg' style='position:fixed; left:0; background:#000;bottom:auto;top:0;'></div>",
            win:$(window),
            doc:$(document)
        };
        temp_cover = $("#iwgc_dialog_bg");
        if(this.config.cover){
            if(temp_cover.length==0){
                $("body").append(comm_data.mark_str);
                temp_cover = $("#iwgc_dialog_bg");
                temp_cover.css({height:comm_data.win.height(),width:comm_data.win.width(),opacity:this.config.opacity});
            }else{
                temp_cover.show();
            }
        }
        temp_id = $("#"+this.config.id);
        if(temp_id.length==1){
            temp_id.show().css({
                "position":"fixed",
                "top":(comm_data.win.height()-temp_id.height())/2+"px",
                "left":(comm_data.win.width()-temp_id.width())/2,
                "zIndex":"99999"
            });
            if(this.config.close_id != ''){
                temp_close_id = $(this.config.close_id);
                temp_close_id.unbind("click").bind("click",function(){
                    temp_id.hide();
                    temp_cover.hide();
                    if(typeof that.config.close_fun == 'function'){
                        that.config.close_fun();
                    }
                    $(window).unbind("resize");
					return false;
                });
            }

            $(window).bind("resize",resize);
            function resize(){
                $("#"+that.config.id).css({
                    "top":(comm_data.win.height()-temp_id.height())/2+"px",
                    "left":(comm_data.win.width()-temp_id.width())/2
                });
            }
        }
    },
	close:function(){
		var that = this;
		$("#iwgc_dialog_bg").hide();
		$("#"+this.config.id).hide();
		if(typeof this.config.close_fun == 'function'){
			that.config.close_fun();
		}
	}
}
//工具类
var Tools = {
    dialog: function(config) {
        return new Dialog(config);
    },
	scrollTo:function(opt){
        var o = {
            "id":"scroll",
            "pos":0
        };
        o = $.extend(o,{},opt);
        window.scrollTo(0,$(o.id).offset().top+o.pos);
        return false;
    },
    //信息弹窗接口。
    alert:function(msg,func){
        $("#dialog_msg_info").html(msg);
        return this.dialog({
            id:'dialog_msg',
            close_id:'.dialog_msg_close',
            close_fun:function(){
                if(typeof func == "function"){
                    func();
                }
            }
        });
    },
    //日常弹窗接口
    commalert:function(msg,dialogid,func){
        $("#"+dialogid+"_info").html(msg);
        return this.dialog({
            id:dialogid,
            close_id:'.'+dialogid+'_close',
            close_fun:function(){
                if(typeof func == "function"){
                    func();
                }
            }
        });
    },
    //判断版本
    checkVersion:function(version,msg,dialogid){
        if(Client.env.platform=="android" && Client.env.isClient==1){
            var version_low = Client.checkVersion(version, '>');
            if(version_low){
                msg = msg || "请下载升级客户端。";
                //this.alert(msg);
                this.commalert(msg,dialogid);
                return false;
            }
        }
        return true;
    },
    //判断版本-验证无弹窗
    checkVersionNoDialog:function(version){
        if(Client.env.platform=="android" && Client.env.isClient==1){
            var version_low = Client.checkVersion(version, '>');
            if(version_low){               
                return false;
            }
        }
        return true;
    },
    //获取链接的所有参数，保存成对象。默认添加 t参数
    filterReg:function(){
        var arr= window.location.search.substr(1);
        var myobj={};
        if(arr){
            var myarr=arr.split("&");
            for(var i in myarr){
                var nowArr=myarr[i].split("=");
                if(nowArr[0].search(/^[\w\d]+$/)==0){
                    myobj[nowArr[0]]=nowArr[1];
                }
            }
        }

        if(!myobj['t']){
            //myobj['t'] = "20140813";
            var t = new Date();
            var month = t.getMonth()+1;
            if(month<=9){
                month = "0"+month;
            }else{
                month = month;
            }

            var Mimutes = t.getMinutes();
            if(Mimutes<=9){
                Mimutes = "0"+Mimutes;
            }else{
                Mimutes = Mimutes;
            }
            myobj['t'] = t.getFullYear()+"-"+month+"-"+t.getDate()+" "+t.getHours()+":"+Mimutes+":"+t.getSeconds();
        }
        return myobj;
    }
}