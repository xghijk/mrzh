(function($){
    var __C = {},
		pos = 0,
		loading_flag = 0,
		reply_flag = 0,
		page_num_get = 10, //���ۻ�ȡ����
		reply_num_get = 100, //�ظ���ȡ����
		hasComment = 1,
		order = 1;
	var page_num = page_num_get, //ÿ�μ�����������
		repage = 2; //ÿ�μ��ػظ�����
	var ua = navigator.userAgent.toLowerCase();
	var is_sykb = ua.match(/4399_sykb/i);
	var is_https = ("https:" == document.location.protocol);
	var aClicks = {};
	reply_num_get = reply_num_get > 100 ? 100 : reply_num_get; //�ظ�������಻����100��
	var pid = 3;
    __C.URL = {
        "pinglunAjaxUrl" : "//newsapp.5054399.com/cdn/comment/view_v2-ac-js-pid-"+pid+"-fid-{fid}-p-{fpage}-page_num-"+page_num_get+"-reply_num-"+reply_num_get+"-order-{order}.htm",
		"replyAjaxUrl" : "//newsapp.5054399.com/cdn/comment/get_msg_v2-ac-get_reply-type-1-pid-"+pid+"-fid-{fid}-cid-{cid}-p-{fpage}-page_num-{page_num}-order-0.htm"
    }
	__C.showComment = function(){
		//$(".recomment-mk").show();
		$('body').addClass('comment-bg-color');
		$('#strategyDetailPage').hide();
		$(".recomment-wp").show();
		$(".comment-textarea").focus();
	}
	__C.hideComment = function(){		
		//$(".recomment-mk").hide();
		$('body').removeClass('comment-bg-color');
		$('#strategyDetailPage').show();
		$(".recomment-wp").hide();
	}
	__C.pop_comment = function(){
		if(typeof($.iwgcDialog) == 'function'){
			$.iwgcDialog({
				id:'comment_dia',
				close_id:'comment_dia_close'
			});
		} else if(typeof(Tools) == 'object'){
			Tools.dialog({
				id:'comment_dia',
				close_id:'.c-pop-close'
			});
		} else {
			alert('��ӭ���غ��ο챬APP��������');
			window.location.href = 'http://m.3839.com/';
		}
	}
    //��ʾ����
    __C.getComment = function(){
        var that = this;
        $(".comment_list").each(function(index){
            var currentComment = $(this);
            getComment(currentComment);
            currentComment.siblings(".comment-btn").find(".load_more").bind("click",function(){
                getComment(currentComment);
				return false;
            });
        });
		
		$('.comment-reply').live('click', function(){
			get_reply($(this));
			return false;
		});
		
        $(".reply").live("click",function(){
			if(!that.check()){
				return false;
			}
            var cid = $(this).data("cid");
			var reitem = "�ظ���"+$(this).attr('data-name');
			$(".comment-textarea").attr('placeholder',reitem).data('cid', cid).val('');
			pos = $(window).scrollTop();
			that.showComment();
			return false;
        });
		
		$('.show-more').live('click', function(){
			var comment = $(this).data('html');
			$(this).parent().html(comment);
			return false;
		});
		
		$('#comment_tab a').live('click', function(){
			var currentComment = $(".comment_list");
			//$('.comment_no').hide();
			currentComment.data('page', 1);
			currentComment.data('pltotal', 0);
			$(this).addClass('on').siblings().removeClass('on');
			
			order = $(this).data('typeid');
			getComment(currentComment);
			return false;
		});

        function getComment(currentComment){
            var fid = currentComment.data("id"); //����id
            var curPage = currentComment.data("page"); //��ǰҳ
            var plTotal = currentComment.data("plTotal"); //��������
			
			if(!is_sykb && curPage >= 6){
				that.pop_comment();
				return false;
			}

            var url = that.URL['pinglunAjaxUrl'];
            url = url.replace("{fid}", fid);
            url = url.replace("{fpage}", curPage);
			url = url.replace("{order}", order);
			
			if(loading_flag == 1){
				return false;
			}
			
			if(!hasComment){
				return false;
			}
			
			currentComment.siblings(".comment-btn").find(".load_more").html('���ڼ������ۡ���');
			loading_flag = 1;
            $.ajax({
                "url" : url,
                "type" : "get",
                "scriptCharset" : "utf-8",
                "dataType" : "script",
				"cache" : true,
                "success" : function(){
					loading_flag = 0;
					if(typeof(num) == 'undefined'){
						currentComment.siblings(".comment-btn").find(".load_more").html('����id�����ڣ�');
						return false;
					}
					if (!num || content.length == 0) {
						hasComment = 0;
						currentComment.siblings(".comment-btn").hide();
                        $('.comment_no').show();
                    } else {
						if(curPage == 1){
							plTotal = num;
							currentComment.data('plTotal', plTotal);
						}
						var reg = /<img.*?src=(.*?)>/g;
						var str = "";
						var userInfo = getUserInfo();
						for (var i = 0; i < content.length; i++) {
							if(content[i]['state_private'] == 1){
								if(userInfo['uid'] == 0){
									continue;
								} else if(userInfo['uid'] != content[i]['uid']){
									continue;
								}
							}
							var info  = clearInfo(content[i]);
							str += '<li class="item" data-cid="'+content[i]['id']+'">';
							str += '    <img class="avatar" src="//imga.3839.com/'+content[i]['uid']+'">';
							str += '    <div class="commentarea">';
							str += '        <div class="nick"><span class="uname">'+info.nick+'</span></div>';
							var comment_all = $.trim(content[i]['comment']).replace(reg,replaceImg);
							var comment_cut = subHtml(comment_all, 120);
							str += '        <div class="content">';
							if(comment_cut != comment_all){
								str += '        <a href="#" class="show-more" data-html="'+comment_all+'">��ʾȫ��</a>';
							}
							str += comment_cut+'</div>';
							str += '        <div class="com-infor cf">';
							str += '            <span class="phone fl">'+(cutStr(content[i]['user_agent'],14) || '��׿')+'</span>';
							str += '			<span class="pd10 fl">&middot;</span>';
							str += '			<span class="fl">'+info.time+'</span>';
							str += '			<a class="reply fr" data-cid="'+content[i]['id']+'" data-name="'+info.nick+'">�ظ�</a>';
							str += '		</div>';
												
							if(content[i]['num'] > 0){
								var reply = content[i]['reply'];
								str += '		<div class="hf_nr" id="reply_'+content[i]['id']+'" data-total="'+content[i]['num']+'" data-rel="'+reply.length+'" data-num="'+repage+'" data-page="1">';
								for(var j=0 in reply){
									reply_info  = clearInfo(reply[j]);
									var style = '';
									if(j >= repage){
										style= ' style="display:none;"';
									}
									str += '			<dl'+style+'>';
									str += '                 <dt>'+reply_info.nick+'��</dt>';
									str += '                 <dd>'+$.trim(reply[j]['reply']).replace(reg,replaceImg)+'</dd>';
									str += '            </dl>';
								}
								if(content[i]['num'] > repage){
									var num_left_r = content[i]['num'] - repage;
									str += '			<div class="morereply">';
									str += '				<a class="comment-reply" data-cid="'+content[i]['id']+'">�鿴����ظ�(<span>'+num_left_r+'</span>��)</a>';
									str += '			</div>';
								}
								str += '   		</div>';
							}
							
							str += '   </div>';
							str += '</li>';
						}
						
						// console.log(curPage);
						if(curPage == 1){
							currentComment.html(str);
						} else {
							currentComment.append(str);
						}
						$(".j-comment_count").html(plTotal);
						if (plTotal <= curPage * page_num) {
							currentComment.siblings(".comment-btn").find(".load_more").html('<em>���޸�������</em>').unbind("click");
							return true;
						} else {
							currentComment.siblings(".comment-btn").find(".load_more").html('<em class="num_left_str"><span>���ظ�������(<i class="comment-num">'+parseInt(plTotal - curPage * page_num)+'��</i>)</span></em>');
						}
						curPage++;
						currentComment.data('page', curPage);
					}
                },
				statusCode:{
					404:function(){
						loading_flag = 0;
						currentComment.siblings(".comment-btn").find(".load_more").html('���޸�������');
					}
				},
				error: function(e){
					loading_flag = 0;
					currentComment.siblings(".comment-btn").find(".load_more").html('���޸�������');
				}
            });
        }
		
		function getUserInfo(){
			var userInfo = {'uid':0,'nickname':'','avatar':''};
			if(is_sykb && typeof(window.userInterface) == 'object' && typeof(window.userInterface.getUserInfo) == 'function'){
				var info = window.userInterface.getUserInfo();
				info = eval('('+info+')');
				if(info != null){
					userInfo = info;
				}
			}
			
			return userInfo;
		}
		
		function get_reply(obj) {
			var cid = obj.data('cid');
			var replyObj = $("#reply_"+cid);
			var num = replyObj.data('num');
			if (repage * 4 <= num && !is_sykb) {
				that.pop_comment();
			} else {
				var total = replyObj.data('total'); //ʵ�ʻظ�����
				var rel = replyObj.data('rel');
				if(total > rel && (rel - num < repage)){
					get_more_reply(cid, replyObj);
				}
				var loadmore = num + repage;
				var nr = total - loadmore;
				if (nr <= 0) {
					$("#reply_"+cid).find(".morereply").hide();
				} else {
					replyObj.find(".morereply").find("span").html(nr);
				}
				
				replyObj.find('dl').slice(num, loadmore).show();
				replyObj.data('num', loadmore);
			}
		}
		
		function get_more_reply(cid, replyObj){
			var page_now = replyObj.data('page');
			var curPage = page_now + 1;
			var rel = replyObj.data('rel');
			var num = replyObj.data('num');
			
			var url = that.URL['replyAjaxUrl'];
            url = url.replace("{fid}", F_ID);
			url = url.replace("{cid}", cid);
            url = url.replace("{fpage}", curPage);
			url = url.replace("{page_num}", reply_num_get);
			 $.ajax({
				"url" : url,
				"type" : "get",
				"scriptCharset" : "utf-8",
				"dataType" : "script",
				"cache" : true,
				"success" : function(){
					if(typeof(content) == 'undefined'){
						return false;
					}
					var reply = content[0]['reply'];
					if(content[0]['num'] > 0 && reply.length > 0){
						var str = '';
						var reg = /<img.*?src=(.*?)>/g;
						for(var j=0 in reply){
							reply_info  = clearInfo(reply[j]);
							var style = '';

							if(j >= repage - (rel - num)){
								style= ' style="display:none;"';
							}
							str += '			<dl'+style+'>';
							str += '                 <dt>'+reply_info.nick+'��</dt>';
							str += '                 <dd>'+$.trim(reply[j]['reply']).replace(reg,replaceImg)+'</dd>';
							str += '            </dl>';
						}
						replyObj.find('.morereply').before(str);
						replyObj.data('page', curPage);
						replyObj.data('rel', reply.length+rel);
					}
					
				}
			 });
		}

        function clearInfo(content){
            var info = {"nick":"", "time":""}
            if(content["uid"] == 0) {
				var nick = '�챬�û�';
            }else {
                nick = content["username"];
            }

            info.nick = nick;
            info.time = formatDate(new Date(content['timeu']*1000));
            return info;
        }

        function replaceImg(a,b){
            var html = '';
            if(b.match(/http:\/\//g)){
                html = '<img src="'+b+'">';
            }else{
                html = '<img src="http://comment.5054399.com'+b+'">';
            }
            return html.replace('index.html','');
        }
		
		function formatDate(now){     
			var year = now.getFullYear();     
			var month = now.getMonth()+1;     
			var date = now.getDate();     
			return year+"."+month+"."+date;     
		}
		
		function cutStr(str, len) {
			if(str.length*2 <= len) {
				return str;
			}
			var strlen = 0;
			var s = "";
			for(var i = 0;i < str.length; i++) {
				s = s + str.charAt(i);
				if (str.charCodeAt(i) > 127) {
						strlen = strlen + 2;
					if(strlen >= len) {
						return s.substring(0,s.length-2) + "...";
					}
				} else {
					strlen = strlen + 1;
					if(strlen >= len) {
						return s.substring(0,s.length-3) + "...";
					}
				}
			}
			return s;
		}
		
		function subHtml(oHtml, nlen, isByte){
			var rgx1 = /<[^<^>^\/]+>/;      //ǰ��ǩ(<a>��href�����п��ܻ��С�//�����ţ����Ƴ����ж�)
			var rgx2 = /<\/[^<^>^\/]+>/;    //���ǩ
			var rgx3 = /<[^<^>^\/]+\/>/;    //�Ա�ǩ
			var rgx4 = /<[^<^>]+>/;         //���б�ǩ
			var selfTags = "hr,br,img,input,meta".split(",");
			if(typeof oHtml !== "string"){
				return "";
			}
			oHtml = oHtml.replace(/(^\s*)|(\s*$)/g, "").replace(/[\r\n]/g, "");
			var oStr = oHtml.replace(/<[^<^>]*>/g, "");
			var olen = isByte ? oStr.replace(/[^\x00-\xff]/g,"**").length : oStr.length;
			if(!/^\d+$/.test(nlen) || olen <= nlen){
				return oHtml;
			}
			var tStr = oHtml;
			var index = 0;
			var matchs = new Array();
			while(rgx4.test(tStr)){
				var m = new Object();
				m.index = index + tStr.search(rgx4);
				m.string = tStr.match(rgx4).toString();
				var len = tStr.search(/<[^<^>]+>/)+tStr.match(/<[^<^>]+>/)[0].length;
				tStr = tStr.substr(len);
				index += len;
				matchs.push(m);
			}
			if(isByte){
				var i=0;
				for(var z = 0; z < oStr.length; z++){
					i += (oStr.charCodeAt(z) > 255) ? 2 : 1;
					if(i >= nlen){
						tStr=oStr.slice(0,(z + 1));
						break;
					}
				}
			} else {
				tStr = oStr.substr(0, nlen);
			}
			var startTags = new Array();
			for(var i = 0; i < matchs.length; i++){
				if(tStr.length <= matchs[i].index){
					//tStr += matchs[i].string;
					matchs = matchs.slice(0, i);
					break;
				} else {
					tStr = tStr.substring(0, matchs[i].index) + matchs[i].string + tStr.substr(matchs[i].index);
					if(rgx1.test(matchs[i].string.replace(/(\/\/)/g, ""))){
						var name = matchs[i].string.replace(/[<>]/g, "").split(" ");
						if(name.length > 0){
							name = name[0];
							if(!$.inArray(name, selfTags)){
								startTags.push(name);
							}
						}
					} else if(rgx2.test(matchs[i].string)){
						var name = matchs[i].string.replace(/[<\/>]/g, "");
						if(startTags.length > 0 && startTags[startTags.length - 1] === name){
							startTags.pop();
						}
					}
				}
			}
			if(startTags.length > 0){
				for(var i = startTags.length - 1; i >=0; i--){
					tStr += '</' + startTags[i] + '>';
				}
			}
			return tStr;
		}

        return this;
    }
	
	__C.check = function(){
		var that = this;
		if(!is_sykb){
			that.pop_comment();
			return false;
		} else if(!that.checkLogin()){
			Client.login();
			return false;
		}
		return true;
	}
    //����
    __C.sayComment = function(){
        var that = this;
        var currentComment = $("#commentPage");
        $("#comment_say").bind("click", function(){
			try{
				if(!that.check()){
					return false;
				}
			} catch(e){
				alert(e);
			}
			
			currentComment.find(".comment-textarea").data("cid", 0);
			$(".comment-textarea").attr('placeholder','����˵����').val('');
			pos = $(window).scrollTop();
			that.showComment();
			return false;
        });
		
		$('.go_forum').bind("click", function(){
			if(!is_sykb){
				that.pop_comment();
				return false;
			}
			
			if(typeof window.activityInterface.toForumDetail == 'function'){
				window.activityInterface.toForumDetail(forum_id);
			} else {
				$.iwgcDialog({
					id:'setting_dia',
					close_id:'setting_dia_close'
				});
			}
			return false;
		});

        //click
        currentComment.find(".c-cancel").bind("click",function(){
            that.hideComment();
			currentComment.find(".comment-textarea").data("cid", 0);
			window.scrollTo(0, pos);
			return false;
        }).end().find(".c-submit").bind("click",function(){
			if(!that.check()){
				return false;
			}
			
            var aid = $('#user_pinglun').data("id");
            var content = $.trim(currentComment.find(".comment-textarea").val());
            if(content == ''){
                alert('�ף����۲���Ϊ�գ�');
                return false;
            }

            var cid  = currentComment.find(".comment-textarea").data("cid");
			that.zajax({'op':'submitComment','cid':cid,'content':content,'fid':aid}, function(result){
				if(result.status == 'ok'){
					content = result.content;
					var str = "";
					if(cid == 0){
						str += '<li class="item">';
						str += '    <img class="avatar" src="'+result.avatar+'">';
						str += '    <div class="commentarea">';
						str += '        <div class="nick"><span class="created fr">�ո�</span>'+result.nickname+'</div>';
						str += '        <div class="content">'+content+'<p style="color:#ff6600">����������������У������ĵȴ�...</p></div>';
						str += '    </div>';
						str += '</li>';

						var con = $(str).prependTo(".comment_list");
					}else{
						var reply = $(".comment_list li[data-cid="+cid+"]");
						var con = reply;

						if(reply.find('.hf_nr').size() == 0){
							str += '    <div class="hf_nr">';
							str += '    </div>';
							reply.append(str);
						}
						str = "";
						str += '            <dl>';
						str += '            	<dt>'+result.nickname+'��</dt>';
						str += '                <dd>'+content+'<p style="color:#ff6600">���Ļظ���������У������ĵȴ�...</p></dd>';
						str += '            </dl>';
						reply.find('.hf_nr').prepend(str);
					}

					that.hideComment();
					$('.comment_no').hide();
					window.scrollTo(0,con.offset().top);
				} else if(result.status == 'no_login'){
					var result = window.userInterface.isLogin();
					if(!result){
						Client.login();
					}
				} else if(result.status == 'params_error'){
					alert('��������');
				} else if(result.status == 'no_content'){
					alert('�ף����۲���Ϊ�գ�');
				} else if(result.status == 'fail'){
					alert(result.msg);
				} else if(result.status == 'network_timeout'){
					alert('���糬ʱ��������ˢ�³��ԣ�');
				}
				return false;
			});
            return false;
        });
        return this;
    }
	__C.zajax = function(postData, callback) {
		var postData = postData || {};
		postData['t'] = Math.random();
		postData['scookie'] = is_sykb ? Client['scookie'] : '';

		if(!Client['scookie']){
			return false;
		}

		var op = postData.op || 'd';
		if (aClicks[op]) {
			return false;
		}

		aClicks[op] = true;

		var requestUrl = 'http://www.onebiji.com/hykb/comment/ajax.php';
		$.ajax({
		type:'get',
		url:requestUrl,
		data:postData,
		dataType:'jsonp',
		async:false,
		success:function(result){
			aClicks[op] = false;
			if (typeof(callback) == 'function') {
				callback(result);
			}
		}
	});
	}
	__C.checkLogin = function(){
		if(is_sykb && typeof(window.userInterface) == 'object' && typeof(window.userInterface.isLogin) == 'function'){
			return window.userInterface.isLogin();
		}
		
		return false;
	}
	
    var $user_pinglun = $('#user_pinglun');
    var F_ID = 0|$user_pinglun.data('id');
	var forum_id = 0|$user_pinglun.data('forum_id');
    if (F_ID) {
		var html_1 = '',
			html_2 = '';
		if(forum_id){
			html_1 += '<div class="comment_top_btn cf">'
				 +  '    <a class="fl go_forum" href="#"><i class="it-bbs"></i>������̳</a>'
				 +  '    <a class="fr" href="#" id="comment_say"><i class="it-com"></i>��Ҫ����</a>'
				 +  '</div>';
			 html_2 = '<a href="#" class="link-bbs go_forum">ȥ��̳</a>';
		} else {
			html_2 = '<a href="#" class="writ-com" id="comment_say">д����</a>';
		}
		
        $user_pinglun.html('<div class="comarea">'
            + '    <div class="tit_comment">'
            + '        <em>����</em>'
            + '        <p class="comment_num">( <i class="j-comment_count new-j-comment_count">0</i> ��)</p>'
			+ '        <div class="div-sjbyjzgd" id="comment_tab"><a href="###" class="on" data-typeid="1">Ĭ��</a><span>/</span><a href="###" data-typeid="2">����</a></div>'
            + '    </div>'
			+ html_1
            + '    <p class="comment_no" style="display:none">��û�������ۣ�����������Ŀ�����</p>'
            + '    <ul class="comment_list comm_comment_list comlist" id="user_show_pinglun" data-id="'+F_ID+'" data-page="1" data-plTotal="0">'
            + '    </ul>'
            + '    <ul class="comment-btn">'
            + '        <li class="load_more"></li>'
            + '    </ul>'
            + '</div>'
			+ html_2
        );
        $("#strategyDetailPage").after('<div class="recomment-mk"></div><div class="recomment-wp recomment-wp-iso">'
            + '    <div class="recomment" id="commentPage">'
            + '        <div class="recomment-text">'
            + '            <textarea class="comment-textarea" placeholder="����˵����" data-cid=0></textarea>'
            + '        </div>'
            + '        <div class="recomment-btn">'
            + '            <a class="c-cancel" href="#">ȡ��</a>'
            + '            <a class="c-submit" href="#">����</a>'
            + '        </div>'
            + '    </div>'
            + '</div>'
			+ '<div class="c-pop" id="comment_dia" style="display: none;">'
			+ '		<a href="javascript:;" class="c-pop-close" id="comment_dia_close">+</a>'
			+ '		<div class="c-pop-cont">'
			+ '			<div class="c-pop-tit c-tac">��ӭ����<i>���ο챬APP</i>��������</div>'
			+ '			<p class="c-pt15">���ο챬APP����������Լ���APP������������Ժ͸���һͬ���۽�����Ϸ��������Ŀ��֣�������Ŀ�����ÿ�컹����ҷ����������������Ϸ����������Ϸ�����ߵ����ã���������ɣ�</p>'
			+ '			<div class="c-button c-pt15">'
			+ '			 <a href="http://m.3839.com/" rel="external nofollow">���غ��ο챬APP</a>'
			+ '			</div>'
			+ '		</div>'
			+ '	</div>'
			+ '<div class="c-pop" id="setting_dia" style="display: none;">'
			+ '		<a href="javascript:;" class="c-pop-close" id="setting_dia_close">+</a>'
			+ '		<div class="c-pop-cont">'
			+ '			<div class="c-pop-tit c-tac">��ܰ��ʾ</div>'
			+ '			<p class="c-pt15">��Ҫ�°汾�Ŀ챬����ʹ����̳Ŷ~<br>����·���� ��ҳ<i>���ҵġ�</i>�����Ͻǳ���<i>�����á�</i>������°汾</p>'
			+ '			<div class="c-button c-pt15">'
			+ '			 <a onclick="window.activityInterface.toSetting();return false;">ȥ����</a>'
			+ '			</div>'
			+ '		</div>'
			+ '	</div>'
        );
        $('head').append('<link href="//newsimg.5054399.com/mobileStyle/hykbComment/css/style.css" type="text/css" rel="stylesheet">');
		if(is_sykb && typeof(Client) != 'object'){
			$('head').append('<script type="text/javascript" src="../../../../../newsimg.5054399.com/mobileStyle/hykbComment/js/base.js"><\/script>');
		}
        $(function(){
            __C.getComment().sayComment();
        });
		
    }
})(jQuery);