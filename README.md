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
 

  // As default the container content will be replaced with the .render call
  // To avoid this .render extension has a config Object as third param
  // Use append:true if you want to add the content at the end of the container
  // and still keep the content of the container 
  $("#wrapper-list").render("movie-list-item.html", movies, {append:true});
  
  // Use prepend:true if you want to add the content at the begining of the container
  // and still keep the content of the container 
  $("#wrapper-list").render("movie-list-item.html", movies, {prepend:true});
  

```
