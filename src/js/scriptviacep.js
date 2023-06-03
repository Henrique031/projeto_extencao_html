function initializeMap() {
  const cepInput = document.getElementById('cep-input');
  const localSelect = document.getElementById('local-select');
  const buscarBtn = document.getElementById('buscar-btn');
  const mapDiv = document.getElementById('map');
  let map;
  let markers = [];

  // Inicializar o mapa
  function initMap() {
    map = new google.maps.Map(mapDiv, {
      center: { lat: -23.550520, lng: -46.633308 }, // Coordenadas de São Paulo
      zoom: 13
    });

    // Adicionar recurso de autocompletar ao campo de input do CEP
    const autocomplete = new google.maps.places.Autocomplete(cepInput);
    autocomplete.setFields(['address_component']);
  }

  // Adicionar marcador no mapa
  function addMarker(place) {
    const marker = new google.maps.Marker({
      position: place.geometry.location,
      map: map,
      title: place.name
    });
    markers.push(marker);
  }

  // Remover todos os marcadores do mapa
  function clearMarkers() {
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];
  }

  // Buscar locais próximos com base no CEP e no tipo de local selecionado
  function buscarLocais() {
    const cep = cepInput.value;
    const tipoLocal = localSelect.value;
  
    // Converter o CEP em coordenadas geográficas utilizando a API Geocoding
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: cep }, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK && results.length > 0) {
        const latitude = results[0].geometry.location.lat();
        const longitude = results[0].geometry.location.lng();
  
        // Atualizar as coordenadas de latitude e longitude
        map.setCenter({ lat: latitude, lng: longitude });
  
        // Realizar a busca dos locais utilizando a API do Google Places
        const service = new google.maps.places.PlacesService(map);
        service.textSearch({
          query: tipoLocal,
          location: map.getCenter(),
          radius: 5000,
          bounds: map.getBounds()
        }, function(results, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            clearMarkers();
            for (let i = 0; i < results.length; i++) {
              addMarker(results[i]);
            }
          }
        });
      } else {
        // Tratar caso não seja possível obter as coordenadas geográficas do CEP
        console.log('Não foi possível obter as coordenadas do CEP.');
      }
    });
  }
  

  // Evento de clique do botão "Buscar"
  buscarBtn.addEventListener('click', buscarLocais);

  // Inicializar o mapa
  initMap();
}

function loadGoogleMapsScript() {
  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCbSgqBYLjAzcw3PtyhPV6mfEUpc0PH11A&libraries=places&callback=initializeMap`;
  script.defer = true;
  script.async = true;
  document.head.appendChild(script);
}

// Carregar o script da API do Google Maps de forma assíncrona
loadGoogleMapsScript();