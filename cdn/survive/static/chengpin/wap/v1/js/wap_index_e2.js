var show_dialog = function(id){
	if ($('#iwgc_dialog_bg').length) {
		$.iwgcDialog.cancel();
	}
	$.iwgcDialog({id:id});
	return false;
}

function check_ua(){
	var is_ios = ua.match(/iphone|ipad|ipod/i);
	if(!is_kb){
		if(is_ios){
			if(isWeiXin()){				
				return true;
			} else {
				show_dialog("ios_dlg");
			}
		} else {			
			show_dialog("kb_dlg");
		}
		return false;
	}
	return true;
}

function switch_sp(){
	var lis = $('#sp_list li');
	//搜索
	var $form = $('#sp_form'),
		default_txt = '请输入要查询的食谱';

	$('#sp_list_div').show();
	$('#sp_info_div').hide();
	$('#btn_sp_more').hide();
	$('#sp_type li').removeClass('on').eq(0).addClass('on');
	$form.find(':text').val(default_txt);
	
	lis.hide();
	lis.slice(0, sp_default_len).show().find('img[lz_src]').attr('lzimg', '1');
	lzimg_load();
	if (lis.length > sp_default_len) {
		$('#btn_sp_more').css('display', 'block');
	} else {
		$('#btn_sp_more').hide();
	}
}

function sp_list(){
	var lis = $('#sp_list li'),
		temp = lis,
		cur_len = sp_default_len,
		more_len = 12;
		
	var $form = $('#sp_form'),
		default_txt = '请输入要查询的食谱';
	
	function show_temp(){
		lis.hide();
		temp.slice(0, cur_len).show().find('img[lz_src]').attr('lzimg', '1');
		lzimg_load();
		if (temp.length > cur_len) {
			$('#btn_sp_more').css('display', 'block');
		} else {
			$('#btn_sp_more').hide();
		}
	}

	function show_all(){
		temp = lis;
		cur_len = sp_default_len;
		$('#sp_type li:eq(0)').addClass('on').siblings().removeClass('on');
		show_temp();
	}
	
	$('#sp_type li').click(function(){
		if(!check_ua()){
			return false;
		}

		var rel = parseInt($(this).attr('rel'))|0;
		$(this).addClass('on').siblings().removeClass('on');
		if (rel > 0) {
			cur_len = sp_default_len;
			temp = lis.filter('[rel="'+rel+'"]');
			show_temp();
		} else if(rel == -1) {
			cur_len = sp_default_len;
			temp = lis.filter('[data-zjtj="1"]');
			show_temp();
		} else {
			show_all();
		}
		return false;
	});

	$('#btn_sp_more').click(function(){
		if(!check_ua()){
			return false;
		}
		
		cur_len += more_len;
		show_temp();
		return false;
	});

	$form.submit(function(){
		if(!check_ua()){
			return false;
		}

		var text = $.trim($form.find(':text').val()).toLowerCase();
		if (text == '' || text == default_txt) {
			alert(default_txt);
			return false;
		}
		$('#sp_type li').removeClass('on');
		var flag = false;
		lis.hide().each(function(){
			var $this = $(this);
				name = $.trim($this.text()).toLowerCase();
			if (name.indexOf(text) != -1) {
				$this.show().find('img[lz_src]').attr('lzimg', 1);
				flag = true;
			}
		});

		if(flag){
			lzimg_load();
			$form.data('flag',1);
			$('#btn_sp_more').hide();
		} else {
			show_all();
			alert('没有找到你搜索的内容，如有遗漏或错误，请在评论区中留言，谢谢！');
		}

		return false;
	});

	$form.find(':text').keydown(function(e){
		if(!check_ua()){
			return false;
		}

		var currKey = e.keyCode || e.which || e.charCode;
		if (currKey == 8 || currKey == 46) {
			var val = $(this).val(),len = val.length;
			if (len <= 1 && $form.data('flag')) {
				show_all();
				$form.data('flag', 0);
			}
		}
	});
}

function switch_npc(){
	var lis = $('#npc_list li');
	//搜索
	var $form = $('#npc_form'),
		default_txt = '请输入要查询的NPC';

	$('#npc_list_div').show();
	$('#npc_info_div').hide();
	$('#btn_npc_more').hide();
	$('#npc_type li').removeClass('on').eq(0).addClass('on');
	$form.find(':text').val(default_txt);
	
	lis.hide();
	lis.slice(0, npc_default_len).show().find('img[lz_src]').attr('lzimg', '1');
	lzimg_load();
	if (lis.length > npc_default_len) {
		$('#btn_npc_more').css('display', 'block');
	} else {
		$('#btn_npc_more').hide();
	}
}

function mnq_cl_list(){
	var lis = $('#mnq_cl_list li'),
		temp = lis,
		cur_len = mnq_cl_default_len,
		more_len = 20;
		
	var $form = $('#mnq_cl_form'),
		default_txt = '请输入要查询的基础食材';
	
	function show_temp(){
		lis.hide();
		temp.slice(0, cur_len).show().find('img[lz_src]').attr('lzimg', '1');
		lzimg_load();
		if (temp.length > cur_len) {
			$('#btn_mnq_cl_more').css('display', 'block');
		} else {
			$('#btn_mnq_cl_more').hide();
		}
	}

	function show_all(){
		temp = lis;
		cur_len = sp_default_len;
		$('#sp_type li:eq(0)').addClass('on').siblings().removeClass('on');
		show_temp();
	}

	$('#btn_mnq_cl_more').click(function(){
		if(!check_ua()){
			return false;
		}
		
		cur_len += more_len;
		show_temp();
		return false;
	});

	$form.submit(function(){
		if(!check_ua()){
			return false;
		}

		var text = $.trim($form.find(':text').val()).toLowerCase();
		if (text == '' || text == default_txt) {
			alert(default_txt);
			return false;
		}
		
		var flag = false;
		lis.hide().each(function(){
			var $this = $(this);
				name = $.trim($this.text()).toLowerCase();
			if (name.indexOf(text) != -1) {
				$this.show().find('img[lz_src]').attr('lzimg', 1);
				flag = true;
			}
		});

		if(flag){
			lzimg_load();
			$form.data('flag',1);
			$('#btn_mnq_cl_more').hide();
		} else {
			show_all();
			alert('没有找到你搜索的内容，如有遗漏或错误，请在评论区中留言，谢谢！');
		}

		return false;
	});

	$form.find(':text').keydown(function(e){
		if(!check_ua()){
			return false;
		}

		var currKey = e.keyCode || e.which || e.charCode;
		if (currKey == 8 || currKey == 46) {
			var val = $(this).val(),len = val.length;
			if (len <= 1 && $form.data('flag')) {
				show_all();
				$form.data('flag', 0);
			}
		}
	});
}

function switch_mnq_cl(){
	var lis = $('#mnq_cl_list li');
	//搜索
	var $form = $('#mnq_cl_form'),
		default_txt = '请输入要查询的基础食材';

	$('#btn_mnq_cl_more').hide();
	var mnq_cl_div = $('#mnq_cl_div');
	mnq_cl_div.find('.grplist li').empty();
	mnq_cl_div.find('.grptext').hide();
	mnq_cl_div.find('.grpline').hide();
	$form.find(':text').val(default_txt);
	mnq_data = [];
	
	lis.hide();
	lis.slice(0, mnq_cl_default_len).show().find('img[lz_src]').attr('lzimg', '1');
	lzimg_load();
	if (lis.length > mnq_cl_default_len) {
		$('#btn_mnq_cl_more').css('display', 'block');
	} else {
		$('#btn_mnq_cl_more').hide();
	}
}

function npc_list(){
	var lis = $('#npc_list li'),
		temp = lis,
		cur_len = npc_default_len,
		more_len = 12;
		
	var $form = $('#npc_form'),
		default_txt = '请输入要查询的NPC';
	
	function show_temp(){
		lis.hide();
		temp.slice(0, cur_len).show().find('img[lz_src]').attr('lzimg', '1');
		lzimg_load();
		if (temp.length > cur_len) {
			$('#btn_npc_more').css('display', 'block');
		} else {
			$('#btn_npc_more').hide();
		}
	}

	function show_all(){
		temp = lis;
		cur_len = npc_default_len;
		$('#npc_type li:eq(0)').addClass('on').siblings().removeClass('on');
		show_temp();
	}
	
	$('#npc_type li').click(function(){
		if(!check_ua()){
			return false;
		}

		var rel = $(this).attr('rel');
		$(this).addClass('on').siblings().removeClass('on');
		if (rel) {
			cur_len = npc_default_len;
			temp = lis.filter('[rel="'+rel+'"]');
			show_temp();
		} else {
			show_all();
		}
		return false;
	});

	$('#btn_npc_more').click(function(){
		if(!check_ua()){
			return false;
		}
		
		cur_len += more_len;
		show_temp();
		return false;
	});

	$form.submit(function(){
		if(!check_ua()){
			return false;
		}

		var text = $.trim($form.find(':text').val()).toLowerCase();
		if (text == '' || text == default_txt.toLowerCase()) {
			alert(default_txt);
			return false;
		}
		$('#npc_type li').removeClass('on');
		var flag = false;
		lis.hide().each(function(){
			var $this = $(this);
				name = $.trim($this.text()).toLowerCase();
			if (name.indexOf(text) != -1) {
				$this.show().find('img[lz_src]').attr('lzimg', 1);
				flag = true;
			}
		});

		if(flag){
			lzimg_load();
			$form.data('flag',1);
			$('#btn_npc_more').hide();
		} else {
			show_all();
			alert('没有找到你搜索的内容，如有遗漏或错误，请在评论区中留言，谢谢！');
		}

		return false;
	});

	$form.find(':text').keydown(function(e){
		if(!check_ua()){
			return false;
		}

		var currKey = e.keyCode || e.which || e.charCode;
		if (currKey == 8 || currKey == 46) {
			var val = $(this).val(),len = val.length;
			if (len <= 1 && $form.data('flag')) {
				show_all();
				$form.data('flag', 0);
			}
		}
	});
}

function switch_cp(){
	var lis = $('#cp_list li');
	//搜索
	var $form = $('#cp_form'),
		default_txt = '请输入要查询的配方';

	$('#cp_list_div').show();
	$('#cp_info_div').hide();
	$('#btn_cp_more').hide();
	$('#cp_type li').removeClass('on').eq(0).addClass('on');
	$form.find(':text').val(default_txt);
	
	lis.hide();
	lis.slice(0, cp_default_len).show().find('img[lz_src]').attr('lzimg', '1');
	lzimg_load();
	if (lis.length > cp_default_len) {
		$('#btn_cp_more').css('display', 'block');
	} else {
		$('#btn_cp_more').hide();
	}
}

function cp_list(){
	var lis = $('#cp_list li'),
		temp = lis,
		cur_len = cp_default_len,
		more_len = 12;
	
	var $form = $('#cp_form'),
		default_txt = '请输入要查询的配方';
	
	function show_temp(){
		lis.hide();
		temp.slice(0, cur_len).show().find('img[lz_src]').attr('lzimg', '1');
		lzimg_load();
		if (temp.length > cur_len) {
			$('#btn_cp_more').css('display', 'block');
		} else {
			$('#btn_cp_more').hide();
		}
	}

	function show_all(){
		temp = lis;
		cur_len = cp_default_len;
		$('#cp_type li:eq(0)').addClass('on').siblings().removeClass('on');
		show_temp();
	}
	

	$('#cp_type li').click(function(){
		if(!check_ua()){
			return false;
		}

		var rel = $(this).attr('rel');
		$(this).addClass('on').siblings().removeClass('on');
		if (rel) {
			cur_len = cp_default_len;
			temp = lis.filter('[rel="'+rel+'"]');
			show_temp();
		} else {
			show_all();
		}
		return false;
	});

	$('#btn_cp_more').click(function(){
		if(!check_ua()){
			return false;
		}
		
		cur_len += more_len;
		show_temp();
		return false;
	});

	$form.submit(function(){
		if(!check_ua()){
			return false;
		}

		var text = $.trim($form.find(':text').val()).toLowerCase();
		if (text == '' || text == default_txt) {
			alert(default_txt);
			return false;
		}
		$('#cp_type li').removeClass('on');
		var flag = false;
		lis.hide().each(function(){
			var $this = $(this);
				name = $.trim($this.text()).toLowerCase();
			if (name.indexOf(text) != -1) {
				$this.show().find('img[lz_src]').attr('lzimg', 1);
				flag = true;
			}
		});

		if(flag){
			lzimg_load();
			$form.data('flag',1);
			$('#btn_cp_more').hide();
		} else {
			show_all();
			alert('没有找到你搜索的内容，如有遗漏或错误，请在评论区中留言，谢谢！');
		}

		return false;
	});

	$form.find(':text').keydown(function(e){
		if(!check_ua()){
			return false;
		}

		var currKey = e.keyCode || e.which || e.charCode;
		if (currKey == 8 || currKey == 46) {
			var val = $(this).val(),len = val.length;
			if (len <= 1 && $form.data('flag')) {
				show_all();
				$form.data('flag', 0);
			}
		}
	});
}

function switch_cl(){
	var lis = $('#cl_list li');
	
	//搜索
	var $form = $('#form-cl'),
		default_txt = '请输入要查询的材料';
	
	$('#cl_list_div').show();
	$('#cl_info_div').hide();
	$('#btn_cl_more').hide();
	$('#cl_type li').removeClass('on').eq(0).addClass('on');
	$form.find(':text').val(default_txt);
	
	lis.hide();
	lis.slice(0, cl_default_len).show().find('img[lz_src]').attr('lzimg','1');
	lzimg_load();
	if (lis.length > cl_default_len) {
		$('#btn_cl_more').css('display','block');
	} else {
		$('#btn_cl_more').hide();
	}
}

function cl_list(){
	var lis = $('#cl_list li'),
		temp = lis,
		cur_len = cl_default_len,
		more_len = 12;

	var $form = $('#form-cl'),
		default_txt = '请输入要查询的材料';
		
	function show_temp(){
		lis.hide();
		temp.slice(0,cur_len).show().find('img[lz_src]').attr('lzimg','1');
		lzimg_load();
		if (temp.length>cur_len) {
			$('#btn_cl_more').css('display','block');
		} else {
			$('#btn_cl_more').hide();
		}
	}

	function show_all(){
		temp = lis;
		cur_len = cl_default_len;
		$('#cl_type li:eq(0)').addClass('on').siblings().removeClass('on');
		show_temp();
	}
	
	$('#cl_type li').click(function(){
		if(!check_ua()){
			return false;
		}

		var rel = $(this).attr('rel');
		$(this).addClass('on').siblings().removeClass('on');
		if (rel) {
			cur_len = cl_default_len;
			temp = lis.filter('[rel="'+rel+'"]');
			show_temp();
		} else {
			show_all();
		}
		return false;
	});
	
	$('#btn_cl_more').click(function(){
		if(!check_ua()){
			return false;
		}
		cur_len += more_len;
		show_temp();
		return false;
	});

	$form.submit(function(){
		if(!check_ua()){
			return false;
		}
		var text = $.trim($form.find(':text').val()).toLowerCase();
		if (text == '' || text == default_txt) {
			alert(default_txt);
			return false;
		}
		$('#cl_type li').removeClass('on');
		var flag = false;
		lis.hide().each(function(){
			var $this = $(this);
				name = $.trim($this.text()).toLowerCase();
			if (name.indexOf(text)!=-1) {
				$this.show().find('img[lz_src]').attr('lzimg',1);
				flag = true;
			}
		});

		if (flag){
			lzimg_load();
			$form.data('flag',1);
			$('#btn_cl_more').hide();
		} else {
			show_all();
			alert('没有找到你搜索的内容，如有遗漏或错误，请在评论区中留言，谢谢！');
		}

		return false;
	});

	$form.find(':text').keydown(function(e){
		if(!check_ua()){
			return false;
		}
		var currKey = e.keyCode || e.which || e.charCode;
		if (currKey == 8 || currKey == 46) {
			var val = $(this).val(),len = val.length;
			if (len <= 1 && $form.data('flag')) {
				show_all();
				$form.data('flag',0);
			}
		}
	});
}

function showSP(id){
	if(!check_ua()){
		return false;
	}
	
	$('.tab-nav li').removeClass('on').filter(':eq(0)').addClass('on');
	$('.tab-con').hide().eq(0).show();
	$('#sp_info_div').show();
	$('#sp_list_div').hide();
	
	if (!id || !sp_json[id]) {
		alert('小编正在录入中...！');
		return false;
	}
	
	var spInfo = sp_json[id];
	var hc = spInfo['hc'];
	var cl_html = '';
	var hc_len = Object.keys(hc).length;
	for(var i in hc){
		var cl_id = hc[i]['id'];
		var clInfo = sp_json[cl_id];
		if(!clInfo){
			continue;
		}
		if(clInfo['hc'] && Object.keys(clInfo['hc']).length > 0){
			func = 'showSPNext';
		} else {
			func = 'showSPCL';
		}
		cl_html += '<li>'+(hc_len > 1 ? '<i></i>' : '')+
				'		<div class="pl-img">'+
				'			<a href="#" onclick="'+func+'('+cl_id+');return false;">'+
				'				<img src="'+clInfo['img']+'"><em>X'+hc[i]['num']+'</em>'+
				'			</a>'+
				'			<span>'+clInfo['name']+'</span>'+
				'		</div>'+
				'		<div class="pl-txt">'+clInfo['jianjie']+'</div>'+
				'	</li>';
	}
	var hcgs_html = '';
	for(var i in spInfo['need_sp_info']){
		hcgs_html += '<li><p>'+sp_json[i]['name']+'x'+spInfo['need_sp_info'][i]+'</p></li>';
	}
	var zb_jianjie = '';
	if(spInfo['jianjie']){
		zb_jianjie += '<div class="hcinfo mt10">'+
					'		<p>物品信息</p>'+
					'		<div class="hc-txt">'+
					'			<div class="hczbxx">'+spInfo['jianjie']+'</div>'+
					'		</div>'+
					'	</div>';
	}
	var html = '<div class="getinfo">'+
			'		<div class="gettit">'+spInfo['name']+'</div>'+
			'	</div>'+
			'	<div class="mt20" id="cp_content">'+
			'		<div class="pljz">'+
			'			<div class="tobe tobe1">'+
			'				<img src="'+spInfo['img']+'"><span>'+spInfo['name']+'</span>'+
			'			</div>'+
			'			<div class="pldiv pldiv'+hc_len+'">'+
			'				<i class="i-shu"></i><i class="i-jtou"></i>'+
			'				<ul class="pl-list cf">'+cl_html+'</ul>'+
			'			</div>'+
			'		</div>'+
					banner+
					zb_jianjie+
			'		<div class="hcinfo mt10">'+
			'			<p>合成所需基础材料汇总</p>'+
			'			<div class="hc-txt">'+
			'				<ul class="hcgstj cf">'+hcgs_html+'</ul>'+
			'			</div>'+
			'		</div>'+
			'	</div>';	
	
	$('#sp_info').html(html);
	go_to($('#tab-nav'));
	return false;
}

function showCP(id){
	if(!check_ua()){
		return false;
	}
	
	$('.tab-nav li').removeClass('on').filter(':eq(3)').addClass('on');
	$('.tab-con').hide().eq(3).show();
	$('#cp_info_div').show();
	$('#cp_list_div').hide();
	
	if (!id || !cp_json[id]) {
		alert('小编正在录入中...！');
		return false;
	}
	
	var cpInfo = cp_json[id];
	var hc = cpInfo['hc'];
	var cl_html = '';
	var hc_len = Object.keys(hc).length;
	for(var i in hc){
		var cl_id = hc[i]['id'];
		var clInfo = cl_json[cl_id];
		if(!clInfo){
			continue;
		}
		if(clInfo['hc'] && Object.keys(clInfo['hc']).length > 0){
			func = 'showCPNext';
		} else {
			func = 'showCL';
		}
		cl_html += '<li>'+(hc_len > 1 ? '<i></i>' : '')+
				'		<div class="pl-img">'+
				'			<a href="#" onclick="'+func+'('+cl_id+');return false;">'+
				'				<img src="'+clInfo['img']+'"><em>X'+hc[i]['num']+'</em>'+
				'			</a>'+
				'			<span>'+clInfo['name']+'</span>'+
				'		</div>'+
				'		<div class="pl-txt">'+clInfo['method']+'</div>'+
				'	</li>';
	}
	var hcgs_html = '';
	for(var i in cpInfo['need_cl_info']){
		hcgs_html += '<li><p>'+cl_json[i]['name']+'x'+cpInfo['need_cl_info'][i]+'</p></li>';
	}
	var zb_jianjie = '';
	if(cpInfo['jianjie']){
		zb_jianjie += '<div class="hcinfo mt10">'+
					'		<p>物品信息</p>'+
					'		<div class="hc-txt">'+
					'			<div class="hczbxx">'+cpInfo['jianjie']+'</div>'+
					'		</div>'+
					'	</div>';
	}
	var html = '<div class="getinfo">'+
			'		<div class="gettit">'+cpInfo['name']+'</div>'+
			'	</div>'+
			'	<div class="mt20" id="cp_content">'+
			'		<div class="pljz">'+
			'			<div class="tobe tobe1">'+
			'				<img src="'+cpInfo['img']+'"><span>'+cpInfo['name']+'</span>'+
			'			</div>'+
			'			<div class="pldiv pldiv'+hc_len+'">'+
			'				<i class="i-shu"></i><i class="i-jtou"></i>'+
			'				<ul class="pl-list cf">'+cl_html+'</ul>'+
			'			</div>'+
			'		</div>'+
					banner+
					zb_jianjie+
			'		<div class="hcinfo mt10">'+
			'			<p>合成所需基础材料汇总</p>'+
			'			<div class="hc-txt">'+
			'				<ul class="hcgstj cf">'+hcgs_html+'</ul>'+
			'			</div>'+
			'		</div>'+
			'	</div>';	
	
	$('#cp_info').html(html);
	go_to($('#tab-nav'));
	return false;
}

function showSPNext(id){
	if(!check_ua()){
		return false;
	}

	$('.tab-nav li').removeClass('on').filter(':eq(0)').addClass('on');
	$('.tab-con').hide().eq(0).show();
	$('#sp_info_div').show();
	$('#sp_list_div').hide();
	
	if (!id || !sp_json[id]) {
		alert('小编正在录入中...！');
		return false;
	}
	
	var parentClInfo = sp_json[id];
	var hc = parentClInfo['hc'];
	var cl_html = '';
	var hc_len = Object.keys(hc).length;
	for(var i in hc){
		var cl_id = hc[i]['id'];
		var clInfo = sp_json[cl_id];
		if(!clInfo){
			continue;
		}
		if(clInfo['hc'] && Object.keys(clInfo['hc']).length > 0){
			func = 'showSPNext';
		} else {
			func = 'showSPCL';
		}
		cl_html += '<li>'+(hc_len > 1 ? '<i></i>' : '')+
				'		<div class="pl-img">'+
				'			<a href="#" onclick="'+func+'('+cl_id+');return false;">'+
				'				<img src="'+clInfo['img']+'"><em>X'+hc[i]['num']+'</em>'+
				'			</a>'+
				'			<span>'+clInfo['name']+'</span>'+
				'		</div>'+
				'		<div class="pl-txt">'+clInfo['method']+'</div>'+
				'	</li>';
	}
	var hc_html = '';
	if(parentClInfo['hc_sp_id'] && parentClInfo['hc_sp_id'].length > 0){
		for(var i in parentClInfo['hc_sp_id']){
			var cp_id = parentClInfo['hc_sp_id'][i];
			hc_html += '<li><a href="#" onclick="showSP('+sp_id+');return false;"><span>'+sp_json[sp_id]['name']+'</span><img src="'+sp_json[sp_id]['img']+'" alt="'+sp_json[sp_id]['name']+'"></a></li>';
		}
	}
	if(hc_html){
		hc_html = '<div class="hcinfo mt10">'+
				'		<p>该材料可合成</p>'+
				'		<div class="hc-txt">'+
				'			<ul class="hc-list cf">'+hc_html+'</ul>'+
				'			<div style="text-align:center"><font color="red">（点击图片查看合成所需材料）</font></div>'+
				'		</div>'+
				'	</div>';
	}
	var zb_jianjie = '';
	if(parentClInfo['method']){
		zb_jianjie += '<div class="hcinfo mt10">'+
					'		<p>物品信息</p>'+
					'		<div class="hc-txt">'+
					'			<div class="hczbxx">'+parentClInfo['method']+'</div>'+
					'		</div>'+
					'	</div>';
	}
	var html = '<div class="getinfo">'+
			'		<div class="gettit">'+parentClInfo['name']+'</div>'+
			'	</div>'+
			'	<div class="mt20" id="cp_content">'+
			'		<div class="pljz">'+
			'			<div class="tobe tobe1">'+
			'				<img src="'+parentClInfo['img']+'"><span>'+parentClInfo['name']+'</span>'+
			'			</div>'+
			'			<div class="pldiv pldiv'+hc_len+'">'+
			'				<i class="i-shu"></i><i class="i-jtou"></i>'+
			'				<ul class="pl-list cf">'+cl_html+'</ul>'+
			'			</div>'+
			'		</div>'+
					banner+
					zb_jianjie+
					hc_html+
			'	</div>';	
	
	$('#cp_info').html(html);
	go_to($('#tab-nav'));
	return false;
}

function showNPC(id){
	if(!check_ua()){
		return false;
	}

	$('.tab-nav li').removeClass('on').filter(':eq(2)').addClass('on');
	$('.tab-con').hide().eq(2).show();
	$('#npc_info_div').show();
	$('#npc_list_div').hide();
	
	if (!id || !npc_json[id]) {
		alert('小编正在录入中...！');
		return false;
	}
	
	var npcInfo = npc_json[id];
	var hc_cl = npcInfo['hc_cl'];
	var hc_cl_html = hc_sp_html = '';
	var hc_cl_len = Object.keys(hc_cl).length;
	for(var i in hc_cl){
		var cl_id = hc_cl[i]['id'];
		var clInfo = cl_json[cl_id];
		if(!clInfo){
			continue;
		}
		hc_cl_html += '<li>'+(hc_cl_len > 1 ? '<i></i>' : '')+
				'		<div class="pl-img">'+
				'			<a href="#" onclick="showCL('+cl_id+');return false;">'+
				'				<img src="'+clInfo['img']+'"><em>X'+hc_cl[i]['num']+'</em>'+
				'			</a>'+
				'			<span>'+clInfo['name']+'</span>'+
				'		</div>'+
				'		<div class="pl-txt">'+clInfo['method']+'</div>'+
				'	</li>';
	}
	
	var hc_sp = npcInfo['hc_sp']; 
	var hc_sp_len = Object.keys(hc_sp).length;
	for(var i in hc_sp){
		var sp_id = hc_sp[i]['id'];
		var spInfo = sp_json[sp_id];
		if(!spInfo){
			continue;
		}
		if(spInfo['hc'] && Object.keys(spInfo['hc']).length > 0){
			func = 'showSP';
		} else {
			func = 'showSPNext';
		}
		hc_sp_html += '<li>'+(hc_sp_len > 1 ? '<i></i>' : (hc_cl_len == 0 ? '' : '<i></i>'))+
				'		<div class="pl-img">'+
				'			<a href="#" onclick="'+func+'('+sp_id+');return false;">'+
				'				<img src="'+spInfo['img']+'"><em>X'+hc_sp[i]['num']+'</em>'+
				'			</a>'+
				'			<span>'+spInfo['name']+'</span>'+
				'		</div>'+
				'		<div class="pl-txt">'+spInfo['jianjie']+'</div>'+
				'	</li>';
	}
	
	var jianjie = '';
	if(npcInfo['jianjie']){
		jianjie += '<div class="hcinfo mt10">'+
					'		<p>备注</p>'+
					'		<div class="hc-txt">'+
					'			<div class="hczbxx">'+npcInfo['jianjie']+'</div>'+
					'		</div>'+
					'	</div>';
	}
	var all_len = hc_cl_len + hc_sp_len;
	var html = '<div class="getinfo">'+
			'		<div class="gettit">'+npcInfo['name']+'</div>'+
			'	</div>'+
			'	<div class="mt20" id="cp_content">'+
			'		<div class="pljz">'+
			'			<div class="tobe tobe1">'+
			'				<img src="'+npcInfo['img']+'"><span>'+npcInfo['name']+'</span>'+
			'			</div>'+
			'			<div class="pldiv pldiv'+all_len+'">'+
			'				<i class="i-shu"></i><i class="i-jtou"></i>'+
			'				<ul class="pl-list cf">'+hc_cl_html+hc_sp_html+'</ul>'+
			'			</div>'+
			'		</div>'+
					banner+
					jianjie+
			'	</div>';	
	
	$('#npc_info').html(html);
	go_to($('#tab-nav'));
	return false;
}

function showCPNext(id, flag){
	if(!check_ua()){
		return false;
	}
	
	flag = flag || false;
	
	if (!id || !cl_json[id]) {
		alert('小编正在录入中...！');
		return false;
	}
	
	var parentClInfo = cl_json[id];
	var hc = parentClInfo['hc'];
	var cl_html = '';
	var hc_len = Object.keys(hc).length;
	for(var i in hc){
		var cl_id = hc[i]['id'];
		var clInfo = cl_json[cl_id];
		if(!clInfo){
			continue;
		}
		if(clInfo['hc'] && Object.keys(clInfo['hc']).length > 0){
			func = 'showCPNext('+cl_id+','+flag+')';
		} else {
			func = 'showCL('+cl_id+')';
		}
		cl_html += '<li>'+(hc_len > 1 ? '<i></i>' : '')+
				'		<div class="pl-img">'+
				'			<a href="#" onclick="'+func+';return false;">'+
				'				<img src="'+clInfo['img']+'"><em>X'+hc[i]['num']+'</em>'+
				'			</a>'+
				'			<span>'+clInfo['name']+'</span>'+
				'		</div>'+
				'		<div class="pl-txt">'+clInfo['method']+'</div>'+
				'	</li>';
	}
	var hc_html = '';
	if(parentClInfo['hc_cp_id'] && parentClInfo['hc_cp_id'].length > 0){
		for(var i in parentClInfo['hc_cp_id']){
			var cp_id = parentClInfo['hc_cp_id'][i];
			hc_html += '<li><a href="#" onclick="showCP('+cp_id+');return false;"><span>'+cp_json[cp_id]['name']+'</span><img src="'+cp_json[cp_id]['img']+'" alt="'+cp_json[cp_id]['name']+'"></a></li>';
		}
	}
	if(parentClInfo['hc_cl_id'] && parentClInfo['hc_cl_id'].length > 0){
		for(var i in parentClInfo['hc_cl_id']){
			var cl_id = parentClInfo['hc_cl_id'][i];
			hc_html += '<li><a href="#" onclick="showCPNext('+cl_id+','+flag+');return false;"><span>'+cl_json[cl_id]['name']+'</span><img src="'+cl_json[cl_id]['img']+'" alt="'+cl_json[cl_id]['name']+'"></a></li>';
		}
	}
	if(hc_html){
		hc_html = '<div class="hcinfo mt10">'+
				'		<p>该材料可合成</p>'+
				'		<div class="hc-txt">'+
				'			<ul class="hc-list cf">'+hc_html+'</ul>'+
				'			<div style="text-align:center"><font color="red">（点击图片查看合成所需材料）</font></div>'+
				'		</div>'+
				'	</div>';
	}
	var zb_jianjie = '';
	if(parentClInfo['method']){
		zb_jianjie += '<div class="hcinfo mt10">'+
					'		<p>物品信息</p>'+
					'		<div class="hc-txt">'+
					'			<div class="hczbxx">'+parentClInfo['method']+'</div>'+
					'		</div>'+
					'	</div>';
	}
	var html = '<div class="getinfo">'+
			'		<div class="gettit">'+parentClInfo['name']+'</div>'+
			'	</div>'+
			'	<div class="mt20" id="cp_content">'+
			'		<div class="pljz">'+
			'			<div class="tobe tobe1">'+
			'				<img src="'+parentClInfo['img']+'"><span>'+parentClInfo['name']+'</span>'+
			'			</div>'+
			'			<div class="pldiv pldiv'+hc_len+'">'+
			'				<i class="i-shu"></i><i class="i-jtou"></i>'+
			'				<ul class="pl-list cf">'+cl_html+'</ul>'+
			'			</div>'+
			'		</div>'+
					banner+
					zb_jianjie+
					hc_html+
			'	</div>';	
	
	if(!flag){
		$('.tab-nav li').removeClass('on').filter(':eq(3)').addClass('on');
		$('.tab-con').hide().eq(3).show();
		$('#cp_info_div').show();
		$('#cp_list_div').hide();
		$('#cp_info').html(html);
	} else {
		$('.tab-nav li').removeClass('on').filter(':eq(4)').addClass('on');
		$('.tab-con').hide().eq(4).show();
		$('#cl_info_div').show();
		$('#cl_list_div').hide();
		$('#cl_info').html(html);
	}
	
	go_to($('#tab-nav'));
	return false;
}

function showSPCL(id){
	if(!check_ua()){
		return false;
	}
	
	$('.tab-nav li').removeClass('on').filter(':eq(0)').addClass('on');
	$('.tab-con').hide().eq(0).show();
	$('#sp_info_div').show();
	$('#sp_list_div').hide();

	if (!sp_json[id]) {
		alert('小编正在录入中...！');
		return false;
	}
	
	var clInfo = sp_json[id];
	var hc_html = '';
	if(clInfo['hc_sp_id'] && clInfo['hc_sp_id'].length > 0){
		for(var i in clInfo['hc_sp_id']){
			var sp_id = clInfo['hc_sp_id'][i];
			hc_html += '<li><a href="#" onclick="showSP('+sp_id+');return false;"><span>'+sp_json[sp_id]['name']+'</span><img src="'+sp_json[sp_id]['img']+'" alt="'+sp_json[sp_id]['name']+'"></a></li>';
		}
	}
	if(hc_html){
		hc_html = '<div class="hcinfo mt10">'+
				'		<p>该材料可合成</p>'+
				'		<div class="hc-txt">'+
				'			<ul class="hc-list cf">'+hc_html+'</ul>'+
				'			<div style="text-align:center"><font color="red">（点击图片查看合成所需材料）</font></div>'+
				'		</div>'+
				'	</div>';
	}
	var zb_jianjie = '';
	if(clInfo['jianjie']){
		zb_jianjie += '<div class="hcinfo mt10">'+
					'		<p>物品信息</p>'+
					'		<div class="hc-txt">'+
					'			<div class="hczbxx">'+clInfo['jianjie']+'</div>'+
					'		</div>'+
					'	</div>';
	}
	var html = '<div class="tab-djcl">'+
			'		<div class="getinfo">'+
			'			<div class="gettit">'+clInfo['name']+'</div>'+
			'		</div>'+
			'		<div class="tobe mt10">'+
			'			<img src="'+clInfo['img']+'" alt="'+clInfo['name']+'">'+
			'			<span>'+clInfo['name']+'</span>'+
			'		</div>'+
					banner+
					zb_jianjie+
					hc_html+
			'	</div>';
	$('#sp_info').html(html);
	go_to($('#tab-nav'));
	return false;
}

function showCL(id){
	if(!check_ua()){
		return false;
	}
	
	$('.tab-nav li').removeClass('on').filter(':eq(4)').addClass('on');
	$('.tab-con').hide().eq(4).show();
	$('#cl_info_div').show();
	$('#cl_list_div').hide();

	if (!cl_json[id]) {
		alert('小编正在录入中...！');
		return false;
	}
	
	var clInfo = cl_json[id];
	var hc_html = '';
	if(clInfo['hc_cp_id'] && clInfo['hc_cp_id'].length > 0){
		for(var i in clInfo['hc_cp_id']){
			var cp_id = clInfo['hc_cp_id'][i];
			hc_html += '<li><a href="#" onclick="showCP('+cp_id+');return false;"><span>'+cp_json[cp_id]['name']+'</span><img src="'+cp_json[cp_id]['img']+'" alt="'+cp_json[cp_id]['name']+'"></a></li>';
		}
	}
	if(clInfo['hc_cl_id'] && clInfo['hc_cl_id'].length > 0){
		for(var i in clInfo['hc_cl_id']){
			var cl_id = clInfo['hc_cl_id'][i];
			hc_html += '<li><a href="#" onclick="showCPNext('+cl_id+', true);return false;"><span>'+cl_json[cl_id]['name']+'</span><img src="'+cl_json[cl_id]['img']+'" alt="'+cl_json[cl_id]['name']+'"></a></li>';
		}
	}
	if(hc_html){
		hc_html = '<div class="hcinfo mt10">'+
				'		<p>该材料可合成</p>'+
				'		<div class="hc-txt">'+
				'			<ul class="hc-list cf">'+hc_html+'</ul>'+
				'			<div style="text-align:center"><font color="red">（点击图片查看合成所需材料）</font></div>'+
				'		</div>'+
				'	</div>';
	}
	var zb_jianjie = '';
	if(clInfo['method']){
		zb_jianjie += '<div class="hcinfo mt10">'+
					'		<p>物品信息</p>'+
					'		<div class="hc-txt">'+
					'			<div class="hczbxx">'+clInfo['method']+'</div>'+
					'		</div>'+
					'	</div>';
	}
	var html = '<div class="tab-djcl">'+
			'		<div class="getinfo">'+
			'			<div class="gettit">'+clInfo['name']+'</div>'+
			'		</div>'+
			'		<div class="tobe mt10">'+
			'			<img src="'+clInfo['img']+'" alt="'+clInfo['name']+'">'+
			'			<span>'+clInfo['name']+'</span>'+
			'		</div>'+
					banner+
					zb_jianjie+
					hc_html+
			'	</div>';
	$('#cl_info').html(html);
	go_to($('#tab-nav'));
	return false;
}

function backSP(){
	$('#sp_list_div').show();
	$('#sp_info_div').hide();
	go_to($('#tab-nav'))
	return false;
}

function backNPC(){
	$('#npc_list_div').show();
	$('#npc_info_div').hide();
	go_to($('#tab-nav'))
	return false;
}

function backCP(){
	$('#cp_list_div').show();
	$('#cp_info_div').hide();
	if($('#cp_list li:eq(0)').find('img[lz_src]').length > 0){
		switch_cp();
	}
	go_to($('#tab-nav'));
	return false;
}

function backCL(){
	$('#cl_list_div').show();
	$('#cl_info_div').hide();
	if($('#cl_list li:eq(0)').find('img[lz_src]').length > 0){
		switch_cl();
	}
	go_to($('#tab-nav'));
}

function go_to(div,top){
	var top = parseInt(div.offset().top) - (top || 0);
	window.scrollTo(0,top);
	window.event && (window.event.returnValue = false);
	return false;
}

//判断是否微信登陆
function isWeiXin() {
	var ua = window.navigator.userAgent.toLowerCase();
	if (ua.match(/MicroMessenger/i) == 'micromessenger') {
		return true;
	} else {
		return false;
	}
}

var mnq_data = [];
$('#mnq_cl_list li').click(function(){
	if(!check_ua()){
		return false;
	}
	var id = $(this).data('id');
	if(!id || !mnq_cl_json[id]){
		return false;
	}
	
	var mnq_cl_div = $('#mnq_cl_div');
	if(mnq_data.length == 4){
		mnq_data.shift();
	}
	
	mnq_data.push(id);
	var k = 0, sort_mnq_data = [];
	for(var i in mnq_data){
		var info = mnq_cl_json[mnq_data[i]];
		if(info){
			sort_mnq_data.push(mnq_data[i]);
			var html = '<img src="'+info['img']+'" alt="'+info['name']+'">';
			mnq_cl_div.find('.grplist li:eq('+k+')').html(html);
			k++;
		} else {
			delete mnq_data[i];
		}
	}
	if(sort_mnq_data.length == 4){
		sort_mnq_data.sort(function(a, b){return a - b;})
		var mnq_data_str = sort_mnq_data.join(',');
		var html = '';
		for(var i in mnq_sp_json){
			var sp_info = mnq_sp_json[i];
			var gsStr = sp_info['gsStr'];
			for(var x in gsStr){
				if(mnq_data_str == gsStr[x]){
					html += '<div class="grpjsinfo">'+
                            '<div class="img"><img src="'+sp_info['img']+'" alt="'+sp_info['name']+'"></div>'+
                            '<div class="name">'+
                                '<p class="form">'+sp_info['origin']+'</p>'+
                                '<strong>'+sp_info['name']+'</strong>'+
                            '</div>'+
                            '<div class="cliao">必须食材：'+sp_info['bxsc']+'</div>'+
                        '</div>'+
                        '<div class="txt">'+sp_info['jianjie']+'</div>';
					break;
				}
			}
			if(html){
				break;
			}
		}
		var grptext = mnq_cl_div.find('.grptext');
		grptext.hide();
		mnq_cl_div.find('.grpline').show();
		if(html){
			grptext.eq(1).html(html).show();
		} else {
			grptext.eq(0).show();
		}
	}
	return false;
});

if(typeof window.activityInterface == 'object'){	
	$(document).on('click', 'a', function(){
		var $this = $(this),
			id = $this.data('id'),
			type = $this.data('type');
		if(type == 'forum_detail'){			
			if(typeof window.activityInterface.toForumPostDetail == 'function'){
				window.activityInterface.toForumPostDetail(id);
				return false;
			}
		}
	});
}

function resetBnt(){
	if(!check_ua()){
		return false;
	}
	
	mnq_data = [];
	var mnq_cl_div = $('#mnq_cl_div');
	mnq_cl_div.find('.grplist li').empty();
	mnq_cl_div.find('.grptext').hide();
	mnq_cl_div.find('.grpline').hide();
	return false;
}

(function(){
	sp_list();
	mnq_cl_list();
	npc_list();
	cp_list();
	cl_list();
	//切换配方大全和材料大全
	$('#tab-nav li').click(function(){
		var index = $(this).index();
		$(this).addClass('on').siblings().removeClass('on');
		$('.tab-con').hide().eq(index).show();
		if(index == 0){
			switch_sp();
		} else if (index == 1) {
			switch_mnq_cl();
		} else if(index == 2){
			switch_npc();
		} else if(index == 3){
			switch_cp();
		} else if(index == 4){
			switch_cl();
		}
		return false;
	});
	if(is_kb){
		$('#zqgl').click(function(){
			if(typeof(window.activityInterface) == 'object' && typeof(window.activityInterface.toGameDetail) == 'function'){
				var gameid = $(this).data('id');
				window.activityInterface.toGameDetail(gameid, '');
				return false;
			}
			return false;
		});
	}
	if(!isWeiXin()){
		$('#banner').show();
	}
})();
(function(){
	var ua = navigator.userAgent,
		is_ios = ua.match(/iphone|ipad|ipod/i);
	if (is_ios) {
		var clipboard = new Clipboard('.copy_btn');
		clipboard.on('success', function(e) {
			if (e.text) {
				alert('复制成功');
			}
		});
		clipboard.on('error', function(e) {
			var text = e.text;
			if (text) {
				window.prompt("你的浏览器不支持此复制功能,请直接长按进行复制", text);
			}
		});
	} else {
		$(document).on('click', '.copy_btn', function(){
			var $this = $(this),
				text = $this.attr('data-clipboard-text');
			if(!check_ua()){
				return false;
			}
			if (text) {
				if (typeof window.activityInterface == 'object' && typeof window.activityInterface.copyContentToClipboard == 'function') {
					window.activityInterface.copyContentToClipboard(text);
				} else {
					window.prompt("你的浏览器不支持此复制功能,请直接长按进行复制", text);
				}
			}
		});
	}
})();
