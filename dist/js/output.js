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
          id="${location.id.split('.')[1]}" class="${_type}" onclick="setSelected(${location.id.split('.')[1]})">
          <div class="name ${_type}">${location && location.place_name.split(',')[0]}</div>
          <div class="${_type}">${location && location.place_name.split(',')[1]}</div>
        </li>`;
      all_locations.push(location_data);
    });
    if (_type == "origin") {
      document.getElementById("origins").innerHTML = all_locations.join("");
    } else {
      document.getElementById("destinations").innerHTML = all_locations.join("");
    }
  }).catch((error) => {
  });
}

setSelected = (id) => {
  _typ = event.target.className;
  var origins = document.getElementById("origins");

  for (var i = 0; i < origins.childNodes.length; i++) {
    if (origins.childNodes[i].className == "origin selected" && _typ.includes("origin")) {
      selected = origins.childNodes[i];
      selected.classList.remove("selected")
    }
    if (origins.childNodes[i].className == "origin" && origins.childNodes[i].id == id && _typ.includes("origin")) {
      origins.childNodes[i].classList.add("selected");
    }
  }

  var destinations = document.getElementById("destinations");
  for (var j = 0; j < destinations.childNodes.length; j++) {
    if (destinations.childNodes[j].className == "destination selected" && _typ.includes("destination")) {
      new_selected = destinations.childNodes[j];
      new_selected.classList.remove("selected")
    }
    if (destinations.childNodes[j].className == "destination" && destinations.childNodes[j].id == id && _typ.includes("destination")) {
      destinations.childNodes[j].classList.add("selected");
    }
  }
}


planTrip = () => {
  selected_origin = document.getElementsByClassName("origin selected");

  selected_destination = document.getElementsByClassName("destination selected");
  if ((selected_origin && selected_destination) && (selected_origin != selected_destination)) {
    fetch(`https://api.winnipegtransit.com/v3/trip-planner.json?origin=geo/${selected_origin[0].dataset.lat},${selected_origin[0].dataset.long}&api-key=ZPFv2Zx6ny1KrlPKnfe&destination=geo/${selected_destination[0].dataset.lat},${selected_destination[0].dataset.long}`)
      .then(res => res.json())
      .then(data => {
        all_segs = []
        data.plans[0].segments.forEach(seg => {
          if (seg.type == "walk") {
            if (seg.to.stop) {
              all_segs.push(`<li>
                              <i class="fas fa-walking" aria-hidden="true"></i>${seg.type} for ${seg.times.durations.total} minutes to stop #${seg.to.stop && seg.to.stop.key} - ${seg.to.stop && seg.to.stop.name}
                            </li>`)
            } else {
              all_segs.push(`<li>
                              <i class="fas fa-walking" aria-hidden="true"></i>${seg.type} for ${seg.times.durations.total} minutes to your destination
                            </li>`)
            }
          }

          if(seg.type == "ride"){
            all_segs.push(`
            <li>
              <i class="fas fa-bus" aria-hidden="true"></i>${seg.type} the ${seg.route.name || seg.route.key} for ${seg.times.durations.total} minutes
            </li>`)
          }

          if(seg.type == "transfer"){
            all_segs.push(`<li>
            <i class="fas fa-ticket-alt" aria-hidden="true"></i>${seg.type} from stop
             #${seg.from.stop && seg.from.stop.key} - ${seg.from.stop && seg.from.stop.key} to stop #${seg.to.stop && seg.to.stop.key} - ${seg.to.stop && seg.to.stop.name}
          </li>`)
          }
        })

        document.getElementById("my-trip").innerHTML = all_segs.join("");
      })
  }
}

const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');

gulp.task('minify-js', function () {
    return gulp.src('*.js')
        .pipe(sourcemaps.init())
        // .pipe(babel())     
        .pipe(concat('output.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/js'))
});

gulp.task('minify-css', () => {
    return gulp.src('*.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('dist/css'));
});

//# sourceMappingURL=output.js.map
