mapboxgl.accessToken = mapToken;
const campground = JSON.parse(camps);
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: campground.geometry.coordinates, // starting position [lng, lat]
    zoom: 9, // starting zoom
});
const marker = new mapboxgl.Marker()
    .setLngLat(campground.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({
            offset: 15,
        })
            .setHTML(`<h5>${campground.title}</h5><p>${campground.location}</p>`)
    )
    .addTo(map);


// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());