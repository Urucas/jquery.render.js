try {
	
	jQuery.fn.render = function(source, data, config) {
		
		config = config || { append:false, prepend: false, async: false }
		var response;
		var el = this;
		$.ajax({ 
			url:source, 
			data:[], 
			success:function(response){
				html = response;
			}, 
			async: false
		});
		
		var replace = function(key, value, string) {
			var reg = new RegExp("{%"+key+"}");
			return string.replace(reg, value);
		}
		if(data instanceof Array) {
			var len = data.length;
			var aux;
			for(var i=0; i< len; i++) {
			
			}
		}else if(data instanceof Object) {
			var aux = html;
			for(key in data) {
				aux = replace(key, data[key], aux);
			}
		}
		html = aux;

		if(config.append) 
		{
			$(el).append(html);	
		}
		else if(config.prepend) 
		{
			$(el).prepend(html);	
		}
		else
		{
			$(el).html(html);	
		}

		return this;
	}
	
}catch(e) {}
