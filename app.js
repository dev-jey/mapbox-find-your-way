mapBoxLink = (name) => { return `https://api.mapbox.com/geocoding/v5/mapbox.places/${name}.json?access_token=pk.eyJ1Ijoiam9obmF0aGFubml6aW9sIiwiYSI6ImNqcG5oZjR0cDAzMnEzeHBrZGUyYmF2aGcifQ.7vAuGZ0z6CY0kXYDkcaOBg&limit=10&bbox=-97.325875,49.766204,-96.953987,49.99275` }
getOrigin = () => {
  let origin = document.getElementById("origin").value;
  getMapBoxLocations(origin, 'origin');
}
getDestination = () => {
  let destination = document.getElementById("destination").value;
  getMapBoxLocations(destination, 'destination');
}

getMapBoxLocations = (name, _type) => {
  fetch(mapBoxLink(name)).then(res => res.json()).then((data) => {
    locations = data.features;
    all_locations = [];
    locations.forEach(location => {
      location_data = `<li data-long="${location.center[0]}" data-lat="${location.center[1]}" 
          id="${location.id.split('.')[1]}" class="${_type}" name="${_type}" onclick="setSelected(${location.id.split('.')[1]})">
          <div class="name">${location && location.place_name.split(',')[0]}</div>
          <div>${location && location.place_name.split(',')[1]}</div>
        </li>`;
      all_locations.push(location_data);
    });
    if (_type == "origin") {
      document.getElementById("origins").innerHTML = all_locations.join("");
    } else {
      document.getElementById("destinations").innerHTML = all_locations.join("");
    }
  }).catch((error) => {
    console.log(error)
  });
}

setSelected = (id) => {
  console.log(event.target)
  var origins = document.getElementById("origins");
  for (var i = 0; i < origins.childNodes.length; i++) {
    if (origins.childNodes[i].className == "origin selected") {
      selected = origins.childNodes[i];
      selected.classList.remove("selected")
    }
    if(origins.childNodes[i].className == "origin" && origins.childNodes[i].id == id){
        origins.childNodes[i].classList.add("selected");
    }
  }

  var destinations = document.getElementById("destinations");
  for (var j = 0; j < destinations.childNodes.length; j++) {
    if (destinations.childNodes[j].className == "destination selected") {
      new_selected = destinations.childNodes[j];
      new_selected.classList.remove("selected")
    }
    if(destinations.childNodes[j].className == "origin" && destinations.childNodes[j].id == id){
      destinations.childNodes[j].classList.add("selected");
    }
  }
}