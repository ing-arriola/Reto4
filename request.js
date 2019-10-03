/*var request = require('request');
request('http://www.google.com', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
});*/
//El ejemplo de star wars


var request = require('request');

request.get('https://swapi.co/api/starships/9/',(err,res,body)=>{
  //console.log(body);
  const json=JSON.parse(body)
  console.log("La Nave se llama: "+json.name);
})
//primer ejercicio
request.get('https://pokeapi.co/api/v2/pokemon/pikachu/',(err,res,body)=>{
  //console.log(body);
  const json=JSON.parse(body)
  console.log("El tipo de pokemon es: "+json.types);
})
//Segundo ejercicio: Se hace con for :( aca no entendia como concatenar el valor al url )
function peticionlibro(nombreLibro){
  request.get('http://openlibrary.org/search.json?q=i+robot',(err,res,body)=>{
    const json=JSON.parse(body)
    for (var i = 0; i < json.docs.length; i++) {
      if (json.docs[i].title===nombreLibro) {
        console.log("Autor: "+json.docs[i].author_name);
      }
    }
  })

}

//Segundo ejercicio v2.0: Aca ya habia entendido la concatenacion que requiere la URL para que sea mas facil la busqueda
function peticionBook(nombreLibro){
  //Guardo la primera parte de la URL para despues concatenar con el argumento de la funcion
  peticion="http://openlibrary.org/search.json?q="
  request.get(peticion+nombreLibro,(err,res,body)=>{
    const json=JSON.parse(body)
    //Se quema el doc[0] por que el resultado de esta request es un arreglo
    //con una posicion :), esto se podria modificar considerando la longitud de la respuesta y usando un for
    console.log("V2.0 Nombre de Autor: "+json.docs[0].author_name);
  })
}

//Llamada a eje2 v1.0
peticionlibro("Illustrated Dictionary of Robotics")
//Llamada a eje2 v2.0
peticionBook("Illustrated Dictionary of Robotics")
//Tercer ejercicio, retornar lista de libros de un autor
function peticionAutor(nombreAutor){
  peticion="http://openlibrary.org/search.json?author="
  request.get(peticion+nombreAutor,(err,res,body)=>{
    const json=JSON.parse(body)
    let datosLibros=json.docs
    console.log("********* Libros de : "+nombreAutor+" ***************");
    for (var i = 0; i < datosLibros.length; i++) {
      console.log(datosLibros[i].title);
    }
  })
}
peticionAutor("Gaiman")
//Cuarto ejercicio
function generoBanda(nombreBanda){
  peticion="https://www.theaudiodb.com/api/v1/json/1/search.php?s="
  request.get(peticion+nombreBanda,(err,res,body)=>{
    const json=JSON.parse(body)
    console.log("El genero de la banda es: "+json.artists[0].strGenre);
  })
}
generoBanda("nirvana")
//Quinto ejercicio
function listaPeliculas(nombrePersonaje){
  peticion="https://swapi.co/api/people/"
  request.get(peticion+nombrePersonaje,(err,res,body)=>{
    const json=JSON.parse(body)
    let peliculasPeticion=json.films
    console.log("El personaje es: "+json.name);
    //Para sacar los nombres de las peliculas donde aparece el personaje
    for (var i = 0; i < json.films.length; i++) {
        peticion2=json.films[i]
        request.get(peticion2,(err,res,body)=>{
        const json2=JSON.parse(body)
          console.log("El titulo de la pelicula es: "+json2.title)
        })
    }
  })
}
listaPeliculas("4/")
//Sexto
*/

function asteroidePeligroso(){
  peticion="https://api.nasa.gov/neo/rest/v1/feed?start_date=2019-09-23&end_date=&api_key=RVCkZkHraOBKaQRYKCe0SNb9iiGH9ynSaRqYau2C"
  request.get(peticion,(err,res,body)=>{
    const json=JSON.parse(body)
    //const json3=JSON.parse(json.near_earth_objects)
    //Getting array from JSON near_earth_objects
    objeto={}
    var key //variable para almacenar las claves de objeto JSON y desoues poder acceder a sus elementos
    //Las claves son las fechas y los elementos son los asteroides peligrosos registrados en dicho dia
    var longi=Object.keys(json.near_earth_objects).length//Cantidad de fechas detectadas
    for (var i = 0; i < longi; i++) {
      key=Object.keys(json.near_earth_objects).sort()[i]
      objeto[key]=json.near_earth_objects[key]
      for (var j = 0; j < objeto[key].length; j++) {//Objecto[key].length Cuenta la cantidad de asteroides por dia
          console.log("Asteroide peligroso: "+objeto[key][j].name)
      }
    }
  })
}
asteroidePeligroso()

// Ultimo ejercicio :)

function listaPokemonesFirstGen(){
  peticion="https://pokeapi.co/api/v2/generation/1/"
  request.get(peticion,(err,res,body)=>{
    const json4=JSON.parse(body)
    pokeObjeto={}
    var keys
    for (var i = 0; i < Object.keys(json4).length; i++) {
      if (Object.keys(json4)[i]=="pokemon_species") {
        keys=Object.keys(json4)[i]
        //pokeObjeto[keys]=json4[i]
        console.log(keys)
      }
    }
  })
}

listaPokemonesFirstGen()
/*
const request=require('request')
const api_url='https://goodreads-devf-aaron.herokuapp.com/api/v1/authors/'
//Read all
request.get(api_url,(err,res,body)=>{
  const json=JSON.parse(body)
  if (res.statusCode==200) {
    console.log(json)
  }
})

//Read one
const getUser=(id)=>{
  const url=api_url+id+"/"
  request.get(url,(err,res,body)=>{
    const json=JSON.parse(body)
    if (res.statusCode==200) {
      console.log(json)
    }else{
      console.log(json)
    }
  })
}

//getUser("300")

//CREATE
const jason={
	"name":"Raul",
	"last_name":"Guillen",
	"nacionalidad":"USA",
	"biography":"Developer",
	"gender":"M",
	"age":20
}

request.post(api_url,{form:jason},(err,res,body)=>{
    if (res.statusCode==201) {
      console.log(JSON.parse(body))
    }else {
      console.log(body);
    }
  })

//DELETE
const deleteUser=(id)=>{
  const url=api_url+id+"/"
  request.delete(url,(err,res,body)=>{
    console.log(body)
    console.log(res.statusCode);
  })
}

deleteUser("3142")*/
