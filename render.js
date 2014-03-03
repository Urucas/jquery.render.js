try {
	
	jQuery.fn.render = function(source, data, config) {
		
		config = config || { append:false, prepend: false, async: false }
		var response;
		var el = this;
		$.ajax({ 
			url:source, 
			data:[], 
			success:function(response){
				el.response = response;
			}, 
			async: false
		});
	
		var html;
		for(key in data) {
			var reg = new RegExp("{%"+key+"}");
			html = el.response.replace(reg, data[key]);
		}
		if(config.append) {
			$(el).append(html);	
		}else if(config.prepend) {
			$(el).prepend(html);	
		}else{
			$(el).html(html);	
		}

		return this;
	}
	
}catch(e) {}
