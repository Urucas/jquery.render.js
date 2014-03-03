try {

	jQuery.fn.render = function(source, data, config) {
		try {
			config = config || { append:false, prepend: false, html: true }
			var response;
			var el = this;

			// load html file to render  synchronously
			$.ajax({ 
				url:source, 
				data:[], 
				success:function(response){
					html = response;
				}, 
				async: false
			});

			// create replace function
			var replace = function(key, value, str) {
				var reg = new RegExp("{%"+key+"}");
				return str.replace(reg, value);
			}

			// render a list of object
			if(data instanceof Array) {
				var len = data.length;
				var aux2= "";
				console.log(data);
				for(var i=0; i< len; i++) {
					var aux = html;
					var d = data[i];
					for(key in d) {
						aux = replace(key, d[key], aux);
					}
					aux2+=aux;
				}
				html = aux2;
			}
			// render a simple object
			else if(data instanceof Object) {
				var aux = html;
				for(key in data) {
					aux = replace(key, data[key], aux);
				}
				html = aux;
			}

			// html content can be render in 3 ways; 
			// * append: true, append content at the end of the container, 
			// * prepend: true, append content at the begining of the container,
			// * html(default): true, replace the content of the container
			if(config.append) { $(el).append(html);	 }
			else if(config.prepend) { $(el).prepend(html); }
			else { $(el).html(html); }

		}catch(e) {
			console.log(e);
		}
		return this;
	}

}catch(e) {
	console.log("jQuery is not defined, make sure to include the jquery library before including JQuery render extension");
}
