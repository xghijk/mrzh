;(function($){
	var comm_data = {
		ie6 : (window.VBArray && !window.XMLHttpRequest),
		isIE : ('CollectGarbage' in window),
		mark_str : "<div class='fixed-top' id='iwgc_dialog_bg' style='position:fixed; left:0; background:#000;bottom:auto;top:0;'></div>",
		win:$(window),
		doc:$(document)
	};

	var temp_cover = '';
	var temp_id = '';
	var temp_close_id = '';
	$.iwgcDialog = function (opt){
		$.iwgcDialog.dialog_default = $.extend({},$.iwgcDialog.dialog_default,opt);

		temp_cover = $("#iwgc_dialog_bg");
		if($.iwgcDialog.dialog_default.cover){
			if(temp_cover.length==0){
				$("body").append(comm_data.mark_str);
				temp_cover = $("#iwgc_dialog_bg");
				temp_cover.css({height:comm_data.win.height(),width:comm_data.win.width(),opacity:$.iwgcDialog.dialog_default.opacity});
				if(comm_data.ie6){
					temp_cover.css({"top":comm_data.win.scrollTop()+"px"});
					ie6_fixed(temp_cover[0]);
				}
			}else{
				temp_cover.show();
			}
		}

		temp_id = $("#"+$.iwgcDialog.dialog_default.id);
		if(temp_id.length==1){
			temp_id.show().css({
				"position":"fixed",
				"top":(comm_data.win.height()-temp_id.height())/2+"px",
				"left":(comm_data.win.width()-temp_id.width())/2,
				"zIndex":"99999"
			});
			if(comm_data.ie6){
				temp_id.css({"top":(comm_data.win.height()-temp_id.height())/2+comm_data.win.scrollTop()+"px"});
				ie6_fixed($("#"+$.iwgcDialog.dialog_default.id)[0]);
			}

			if($.iwgcDialog.dialog_default.close_id != ''){
				temp_close_id = $("#"+$.iwgcDialog.dialog_default.close_id);
				temp_close_id.unbind("click").bind("click",$.iwgcDialog.cancel);
			}
			comm_data.win.bind("resize",$.iwgcDialog.resize_dialog);
		}
	};

	$.extend($.iwgcDialog,{
		dialog_default:{
			id:'',
			close_id:'',
			close_fun:null,
			opacity:0.5,
			cover:true
		},
		cancel :function (){
			temp_cover.hide();
			temp_id.hide();
			if($.iwgcDialog.dialog_default.close_id){temp_close_id.unbind("click");}
			if(typeof $.iwgcDialog.dialog_default.close_fun=="function"){
				$.iwgcDialog.dialog_default.close_fun();
			}
			comm_data.win.unbind("resize scroll",$.iwgcDialog.resize_dialog);
			return false;
		},
		resize_dialog : function(){
			temp_cover.css({height:comm_data.win.height(),width:comm_data.win.width()});
			if(comm_data.ie6){
				temp_id.css({"top":(comm_data.win.height()-temp_id.height())/2+comm_data.win.scrollTop()+"px","left":(comm_data.win.width()-temp_id.width())/2});
				ie6_fixed($("#"+$.iwgcDialog.dialog_default.id)[0]);
			}else{
				temp_id.css({"top":(comm_data.win.height()-temp_id.height())/2+"px","left":(comm_data.win.width()-temp_id.width())/2});
			}
		}
	});

	function ie6_fixed(elem){
		var style = elem.style,
		dom = '(document.documentElement)',
		left = parseInt(style.left) - document.documentElement.scrollLeft,
		top = parseInt(style.top) - document.documentElement.scrollTop;
		style.position = 'absolute';
		style.removeExpression('left');
		style.removeExpression('top');
		style.setExpression('left', 'eval(' + dom + '.scrollLeft + ' + left + ') + "px"');
		style.setExpression('top', 'eval(' + dom + '.scrollTop + ' + top + ') + "px"');
	}

})(jQuery)
