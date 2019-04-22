(function(){
    var is_support = (typeof window.activityInterface == 'object' && typeof window.activityInterface.toTopicNewsList == 'function');
	if(is_support){		
		$(document).on('click','a',function(){
			var $this = $(this),
				type = $this.data('type');
			if (type) {
				var id = $this.data('id');
				if (type == 'arc') {
					window.activityInterface.toArticleDetail(id.toString(), "");
				} else if (type == 'list') {
					if ($this.data('ext')) { //图鉴类或者关卡
						window.activityInterface.toArticleSortList(id.toString(), "", 0|$this.data('ext'));
					} else {
						window.activityInterface.toArticleList(id.toString(), "");
					}
				} else if (type == 'video') {
					window.activityInterface.toVideoDetail(id.toString(), "");
				} else if (type == 'video_list') {
					if ($this.data('tid')) {
						window.activityInterface.toVideoSortList(id.toString(), "", $this.data('tid').toString());
					} else {
						window.activityInterface.toVideoSortList(id.toString(), "", "");
					}
				} else if (type == 'game') {
					window.activityInterface.toGameDetail(id.toString(), "");
				} else if (type == 'tool' || type == 'hd') {
					var share_data = {};
					share_data['title'] = $this.data('title');
					share_data['icon']  = $this.data('icon');
					share_data['link']  = $this.data('link');
					share_data['desc']  = $this.data('desc');
					var json_str = JSON.stringify(share_data);
					if (type == 'tool') {
						window.activityInterface.toToolDetailWaps($this.attr('href').toString(),"",json_str);
					} else {
						window.activityInterface.toActivityWaps($this.attr('href').toString(),"",json_str);
					}
				} else if (type == 'search') {
					window.activityInterface.toMainSearch();
				} else if (type == 'tool_list') {
					window.activityInterface.toToolsList();
				} else if (type == 'forum_list') {
					if(typeof window.activityInterface.toForumDetail == 'function'){
						window.activityInterface.toForumDetail(id);
					}  else {
						alert('需要新版本的快爆才能使用论坛哦~<br>升级路径： 首页<i>【我的】</i>→右上角齿轮<i>【设置】</i>→检查新版本');
					}
				} else if (type == 'forum_detail') {
					if(typeof window.activityInterface.toForumPostDetail == 'function'){
						window.activityInterface.toForumPostDetail(id);
					} else {
						alert('需要新版本的快爆才能使用论坛哦~<br>升级路径： 首页<i>【我的】</i>→右上角齿轮<i>【设置】</i>→检查新版本');
					}
				} else if (type == 'wap') {
					window.activityInterface.toActivityWaps($this.attr('href').toString());
				}
				return false;
			}
		});
	}
})();
