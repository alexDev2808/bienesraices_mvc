(function() {
    const lat = 19.31623;
    const lng = -98.2381746;
    const mapa = L.map('mapa').setView([lat, lng ], 16);
    let marker;
    

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);

    // Pin
    marker = new L.marker([lat, lng], {
        draggable: true,
        autoPan: true
    })
    .addTo(mapa)

    // Detectar el movimiento del pin
    marker.on('moveend', function(e){
        marker = e.target

        const posicion = marker.getLatLng();


        mapa.panTo(new L.LatLng(posicion.lat, posicion.lng))
    })

})()