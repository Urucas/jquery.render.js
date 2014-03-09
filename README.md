jquery.render.js
================

jQuery html and data render extension

Usage
=====

``` javascript

  // example data
  var movies = [{id: 1,	titulo: "Pineapple express", img_icon: "images/peli1.jpg", desc: "Santiago y Eugenio son más que amigos: son socios de toda la vida en un negocio de electrodomésticos. Se entienden sin hablar, se complementan, se quieren, se necesitan. Pero un día, sin pistas ni huellas, Eugenio d...",trailer: "http://youtube.com", 		titulo_original: "Pineapple express", protagonistas: "James Franco, Seth Green", director: "Fuman chu", duracion: "1:32:00", genero: "comedia", guion: "James Franco", puntaje: "75", estreno: 1 },{ id: 2, titulo: "El hombre araña", 		img_icon: "images/peli2.jpg", desc: "un día, sin pistas ni huellas, Eugenio d...", trailer: "http://youtube.com", 		titulo_original: "Spiderman", protagonistas: "Toby Caradenada Mcguire", director: "La hormiga atomica", duracion: "1:32:00", genero: "Suspenso", guion: "", puntaje: "80", estreno: 0 }]

  // html to render
  /*
   * <div class="peli">
   *    <a onclick="app.loadMovie({%id})">
   *	      <div class="thumb"><img src="{%img_icon}"></div>
   *	      <div class="titulo">{%titulo}</div>
   *        <div class="votos">{%puntaje}</div>
   *	      <div class="votos">{%desc}</div>
   *    </a>
   * </div>
   */

 // .render extension will load the html into the container and replace the pseudo vars {%var_name} 
 // with the keys on the object passed as second parameter
 $("#wrapper-item").render("movie-list-item.html", movies[0]);
 // Result
 /*
   * <div class="peli">
   *    <a onclick="app.loadMovie(1)">
   *	      <div class="thumb"><img src="images/peli1.jpg"></div>
   *	      <div class="titulo">Pineapple express</div>
   *        <div class="votos">75</div>
   *	      <div class="votos">Santiago y Eugenio son más que amigos: son socios de toda la vida en un negocio de electrodomésticos. Se entienden sin hablar, se complementan, se quieren, se necesitan. Pero un día, sin pistas ni huellas, Eugenio d...</div>
   *    </a>
   * </div>
   */
 
 // If the second param is an Array, the .render method will loop trhough 
 // the Array creating a list in the container 
 $("#wrapper-list").render("movie-list-item.html", movies);
 // Result
 /*
   * <div class="peli">
   *    <a onclick="app.loadMovie(1)">
   *	      <div class="thumb"><img src="images/peli1.jpg"></div>
   *	      <div class="titulo">Pineapple express</div>
   *        <div class="votos">75</div>
   *	      <div class="votos">Santiago y Eugenio son más que amigos: son socios de toda la vida en un negocio de electrodomésticos. Se entienden sin hablar, se complementan, se quieren, se necesitan. Pero un día, sin pistas ni huellas, Eugenio d...</div>
   *    </a>
   * </div>
   * <div class="peli">
   *    <a onclick="app.loadMovie(2)">
   *	      <div class="thumb"><img src="images/peli2.jpg"></div>
   *	      <div class="titulo">El hombre araña</div>
   *        <div class="votos">80</div>
   *	      <div class="votos">un día, sin pistas ni huellas, Eugenio d...</div>
   *    </a>
   * </div>
   */
 

  // As default the container content will be replaced with the .render call response
  // To avoid this .render extension has a config Object as third param
  // Use append:true if you want to add the content at the end of the container
  // and still keep the content of the container 
  $("#wrapper-list").render("movie-list-item.html", movies, {append:true});
  
  // Use prepend:true if you want to add the content at the begining of the container
  // and still keep the content of the container 
  $("#wrapper-list").render("movie-list-item.html", movies, {prepend:true});
  
  
  // Add modifiers feature, set modifiers var to config param,
  // This way you can to modify the final value you want to put in the rendered html
  
  // For example;
  // Cut the titulo var into 10 characters max and add "..."
  // Add "%" to votos var
  var modifiers = {
	  titulo: function(s){ return s.length > 10 ? s.substr(0,7)+"..." : s; },
	  votos: function(s) { return s+"%"; }
	}
  ("#wrapper-list").render("movie-list-item.html", movies, {modifiers:modifiers});
  
  // Result
  /*
   * <div class="peli">
   *    <a onclick="app.loadMovie(2)">
   *	      <div class="thumb"><img src="images/peli2.jpg"></div>
   *	      <div class="titulo">El homb...</div>
   *        <div class="votos">80%</div>
   *	      <div class="votos">un día, sin pistas ni huellas, Eugenio d...</div>
   *    </a>
   * </div>
   */

```
.include
=======

``` javascript

    // .include function will load your html in wrapper container as native jquery.load method
    // but also loading <include tags on the final html, replacing it element with the source seted
    // as src attribute.
    
    // Include tag: <include src="other.html" />
    
    // For example; 
    // cartelera.html 
    /*
     * <include src="menu.html" />
     * <div id="general">
     * <!-- HEADER -->
     *      <div id="header">
     *   	<div id="btn-menu"><a onclick="toggle('menu')"><img src="images/btn-menu.png"></a></div>
     *   	<div id="btn-config"><a href="#configuracion"><img src="images/btn-config.png"></a></div>
     *   	<div id="titulo"><img src="images/titu-cartelera.png"></div>
     *       </div>
     * <include src="search-bar.html" />
     *  <!-- LISTADO -->
     *   <div id="cartelera">
     *       <div class="loading"><img src="images/loading.gif" width="25">&nbsp;&nbsp; Cargando contenido ...</div>
     *   </div>
     * </div>
     *
     /
     
     // menu.html 
     /*
      * <div id="menu">
      *	    <a href="#recomendados"><div class="btn-izq recomendados"><img src="images/ico-recomendados.png"></div></a>
      *	    <a href="#estrenos"><div class="btn-izq estrenos"><img src="images/ico-estrenos.png"></div></a>
      *	    <a href="#cartelera"><div class="btn-izq cartelera"><img src="images/ico-cartelera.png"></div></a>
      *	    <a href="#cines"><div class="btn-izq cines"><img src="images/ico-cines.png"></div></a>
      * </div>
      */
     
     // search-bar.html
     /*
      * <div id="buscador">
      *	    <div id="blanco">
      *         <div id="campo"><input id="field" value="" title="Titulo, actor, cine, etc" class="element2hint" type="text"></div>
      *	        <div id="btn-buscar"><a onclick="app.loadSearch();"><img src="images/btn-buscar.png"></a></div>
      *	    </div>
      *	</div>
      * <div class="sombra-int"><img src="images/sombra.png" width="100%" height="10"></div>
      * <script>
      *    $(".element2hint").hint();
      *    $(".element2hint").enterKey(function(value){
      *        app.loadSearch();
      *    });
      * </script>
      */
 
      $("#wrapper").include("cartelera.html", function(){ console.log("Html loaded with include"); });
      // Result 
    /*
     * <div id="menu">
     *	    <a href="#recomendados"><div class="btn-izq recomendados"><img src="images/ico-recomendados.png"></div></a>
     *	    <a href="#estrenos"><div class="btn-izq estrenos"><img src="images/ico-estrenos.png"></div></a>
     *	    <a href="#cartelera"><div class="btn-izq cartelera"><img src="images/ico-cartelera.png"></div></a>
     *	    <a href="#cines"><div class="btn-izq cines"><img src="images/ico-cines.png"></div></a>
     * </div>
     * <div id="general">
     * <!-- HEADER -->
     *      <div id="header">
     *   	<div id="btn-menu"><a onclick="toggle('menu')"><img src="images/btn-menu.png"></a></div>
     *   	<div id="btn-config"><a href="#configuracion"><img src="images/btn-config.png"></a></div>
     *   	<div id="titulo"><img src="images/titu-cartelera.png"></div>
     *       </div>
     /*
      * <div id="buscador">
      *	    <div id="blanco">
      *         <div id="campo"><input id="field" value="" title="Titulo, actor, cine, etc" class="element2hint" type="text"></div>
      *	        <div id="btn-buscar"><a onclick="app.loadSearch();"><img src="images/btn-buscar.png"></a></div>
      *	    </div>
      *	</div>
      * <div class="sombra-int"><img src="images/sombra.png" width="100%" height="10"></div>
      * <script>
      *    $(".element2hint").hint();
      *    $(".element2hint").enterKey(function(value){
      *        app.loadSearch();
      *    });
      * </script>
      *
      *  <!-- LISTADO -->
      *   <div id="cartelera">
      *       <div class="loading"><img src="images/loading.gif" width="25">&nbsp;&nbsp; Cargando contenido ...</div>
      *   </div>
      * </div>
      */
    
```

