var massCfg = {
	tap : "touchstart",
	click : "click",
	hideClass : "fn-hide",
	weiboAppKey : " "
};
!function (e) {
	"use strict";
	var t = document;
	e.getScript = function (e, i) {
		var a = t.createElement("script");
		a.src = e,
		a.async = "async",
		i && (a.onload = i),
		t.head.appendChild(a)
	}
	var a = navigator.userAgent;
	e.os = {
		iphone : -1 !== a.indexOf("iPhone"),
		android : -1 !== a.indexOf("Android")
	},
	e.browser = {
		safari : e.os.iphone && a.match(/Version\/([\d.]+)([^S](Safari)|[^M]*(Mobile)[^S]*(Safari))\/([\d.]+$)/),
		wechat : -1 !== a.indexOf("MicroMessenger/"),
		uc : -1 !== a.indexOf("UCBrowser"),
		qq : -1 !== a.indexOf("MQQBrowser/"),
		qq1 : -1 !== a.indexOf("MQQBrowser/") &&  -1 !== a.indexOf("QQ/")
	},
	e.getVersion = function (e) {
		var t = e.split("."),
		i = parseFloat(t[0] + "." + t[1]);
		return i
	};
}
(Zepto), function (e, t) {
	"use strict";
	function i() {
		var i = '[data-role="share"]';
		e(document).on(u, i, function (i) {
			if (i.preventDefault(), p = e(this), m = {
					url : p.data("share-url") || document.location.href,
					title : p.data("share-title") || document.title,
					pics : p.data("share-img") || w,
					summary : p.data("share-description")
				}, f = {
					url : p.data("share-url-qz") || m.url,
					title : p.data("share-title-qz") || m.title,
					pics : p.data("share-img-qz") || m.pics,
					summary : p.data("share-description-qz") || m.summary
				}, c && !r && !qq1)
				 - 1 === m.url.indexOf("#") && (m.url += "#fromQQ"), "undefined" != typeof browser ? window.browser.app.share({
					url : m.url,
					title : m.title,
					description : m.summary,
					img_url : m.pics
				}) : "undefined" != typeof window.qb && window.qb.share({
					url : m.url,
					title : m.title,
					description : m.summary,
					img_url : m.pics
				}), a(p, 1);
			else if (l)
				 - 1 === m.url.indexOf("#") && (m.url += "#fromUC"), e.os.android ? window.ucweb.startRequest("shell.page_share", [m.title, m.summary, m.url, "", "", m.title, ""]) : e.os.iphone && window.ucbrowser.web_share(m.title, m.summary, m.url, "", "", "", ""), a(p, 1);
			else {
				if (v)
					return void e(".j-share").removeClass(t.hideClass);
				var s = "",
				n = "";
				(o || r) && (s = '<li><a href="#" class="share-wechat"><i class="icon-sharing icon-sharing-wechat-friend"></i><strong>\u5fae\u4fe1\u597d\u53cb</strong></a></li><li><a href="#" class="share-wechat"><i class="icon-sharing icon-sharing-wechat-circle"></i><strong>\u5fae\u4fe1\u670b\u53cb\u5708</strong></a></li>', n = r ? '<div class="module-wechat ' + t.hideClass + '"><div class="item friend"><strong>\u53d1\u9001\u7ed9\u670b\u53cb</strong></div><div class="item circle"><strong>\u5206\u4eab\u5230\u670b\u53cb\u5708</strong></div></div>' : '<div class="module-guide ' + t.hideClass + '"><div class="guide"></div><div class="cancel">\u6211\u77e5\u9053\u4e86</div></div>');
				var d = '<section class="w-sharing j-share"><div class="module"><ul class="method"><li><a href="#" class="share-weibo"><i class="icon-sharing icon-sharing-weibo"></i><strong>\u65b0\u6d6a\u5fae\u535a</strong></a></li><li><a href="#" class="share-qzone"><i class="icon-sharing icon-sharing-qq-zone"></i><strong>QQ\u7a7a\u95f4</strong></a></li>' + s + '</ul><div class="cancel">\u53d6\u6d88</div></div>' + n + '<div class="mask"></div></section>';
				g.append(d).on("touchmove.share", function (e) {
					e.preventDefault()
				}, !1),
				v = !0
			}
		})
	}
 	function a(t, i, a) {
		var s = t.data("share-action"),
		n = t.data("share-count");
		return e(".number", t).html(++n),
		s ? void e.ajax({
			dataType : "jsonp",
			url : s + "&datatype=jsonp&target=" + i,
			timeout : 1e3,
			success : function () {
				a && a()
			},
			error : function () {
				a && a()
			}
		}) : void(a && a())
	} 
	function s() {

		if (h.qq = c ? e.getVersion(navigator.appVersion.split("MQQBrowser/")[1]) : 0, h.uc = l ? e.getVersion(navigator.appVersion.split("UCBrowser/")[1]) : 0, c) {
			var t = h.qq < 5.4 ? n.lower : n.higher;
			e.getScript(t, function () {
				i()
			})
		} else
			i()
	}
	var n = {
		lower : "http://3gimg.qq.com/html5/js/qb.js",
		higher : "http://jsapi.qq.com/get?api=app.share"
	},
	o = e.browser.safari,
	r = e.browser.wechat,
	c = e.browser.qq,
	qq1 = e.browser.qq1,
	l = e.browser.uc,
	d = t.weiboAppKey,
	h = {
		uc : "",
		qq : ""
	},
	u = t.click,
	p = null,
	m = {},
	f = {},
	v = !1,
	g = e("body"),
	w = "http://f1.img4399.com/ma~166_20151231150249_5684d319a4859.jpeg";


	e(document).on(u, ".j-share .share-wechat", function (i) {
		i.preventDefault(),
		a(p, 2, function () {
			e(".module").addClass(t.hideClass),
			e(r ? ".module-wechat" : ".module-guide").removeClass(t.hideClass)
		})
	}),
	e(document).on(u, ".j-share .module-guide .cancel", function (i) {
		i.preventDefault(),
		e(this).closest(".module-guide").addClass(t.hideClass),
		e(this).closest(".j-share").find(".module").removeClass(t.hideClass)
	}),
	e(document).on(u, ".j-share .share-weibo", function (e) {
		e.preventDefault(),
		a(p, 2, function () {
			var e = "http://service.weibo.com/share/mobile.php?";
			e += "appkey=" + d,
			e += "&title=" + encodeURIComponent(m.title),
			e += "&url=" + encodeURIComponent(m.url),
			e += "&pic=" + encodeURIComponent(m.pics),
			location.href = e
		})
	}),
	e(document).on(u, ".j-share .share-qzone", function (t) {
		t.preventDefault(),
		m = f,
		a(p, 2, function () {
			var t = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?";
			location.href = t + e.param(m)
		})
	}),
	e(document).on(u, ".j-share .module .cancel, .j-share .mask", function (i) {
		i.preventDefault(),
		g.off("touchmove.share"),
		e(this).closest(".j-share").addClass(t.hideClass),
		r && (e(".module-wechat").addClass(t.hideClass), e(this).closest(".j-share").find(".module").removeClass(t.hideClass))
	}),
	e(document).on(u, ".module-wechat", function (i) {
		e(".module-wechat").addClass(t.hideClass),
		e(this).closest(".j-share").find(".module").removeClass(t.hideClass)
	}),
	s()
}
(Zepto, massCfg);

