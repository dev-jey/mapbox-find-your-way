mapBoxLink =(name)=> {return `https://api.mapbox.com/geocoding/v5/mapbox.places/${name}.json?access_token=pk.eyJ1Ijoiam9obmF0aGFubml6aW9sIiwiYSI6ImNqcG5oZjR0cDAzMnEzeHBrZGUyYmF2aGcifQ.7vAuGZ0z6CY0kXYDkcaOBg&limit=10&bbox=-97.325875,49.766204,-96.953987,49.99275`}
getOrigin = () => {
  let origin = document.getElementById("origin").value;
  getMapBoxLocations(origin);
}
getDestination = () => {
  let destination = document.getElementById("destination").value;
  getMapBoxLocations(destination);
}

getMapBoxLocations = (name) => {
  fetch(mapBoxLink(name)).then((res)=>{
    console.log(res)
  })
}