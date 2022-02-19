let ville = "Lyon";
recevoirTemps(ville);

const change = document.querySelector('#changer');

const geoloc = document.querySelector('#geoloc');

function erreur() {
    villeChoisie = "Paris";
    recevoirTemps(villeChoisie);
}
// Fonction géolocaliser Ville

geolocation = geoloc.addEventListener('click', () =>{
    if("geolocation" in navigator) {
        navigator.geolocation.watchPosition((position) => {
            const url = 'https://api.openweathermap.org/data/2.5/weather?lon=' + position.coords.longitude + '&lat=' + position.coords.latitude + '&appid=2e416591ee347e6a2cc73ad37528e2c7&units=metric';

            let r = new XMLHttpRequest(); // Nous créons un objet qui nous permettra de faire des requêtes
            r.open('GET', url); // Nous récupérons juste des données
            r.responseType = 'json'; // Nous attendons du JSON
            r.send(); // Nous envoyons notre requête

            // Dès qu'on reçoit une réponse, cette fonction est executée
            r.onload = function() {
                if (r.readyState === XMLHttpRequest.DONE) {
                if (r.status === 200) {
                    let rep = r.response;
                    // console.log(reponse);
                    let temperature = rep.main.temp;
                    let ville       = rep.name;
                    // console.log(temperature);
                    document.querySelector('#temperature_label').textContent = temperature;
                    document.querySelector('#ville').textContent = ville;
                }
                else {
                    alert('Un problème est intervenu, merci de revenir plus tard.');
                }
                }
            }
        }, erreur, options);
    } else {
        villeChoisie = 'Paris';
        recevoirTemps(villeChoisie);
    };

    var options = {
        enableHighAccuracy : true,
    }
})

// Fonction pour changer de ville

let ChangerVille = change.addEventListener('click', function() {
    ville = prompt("Choisissez une ville :", "Entrez votre ville")
    recevoirTemps(ville);
}

function recevoirTemps(ville) {
    let url = 'https://api.openweathermap.org/data/2.5/weather?q=' + ville + '&appid=2e416591ee347e6a2cc73ad37528e2c7&units=metric';
        // Créer la requête

    let requete = new XMLHttpRequest();
    requete.open('GET', url);
    requete.responseType ='json';
    requete.send();

        // Dès qu'on reçoit une réponse on exécute la fonction

    requete.onload = function getTemperature() {
        if(requete.readyState === XMLHttpRequest.DONE) {
            if(requete.status === 200) {
                let reponse = requete.response;

                let temperature = Math.round(reponse.main.temp);
                document.querySelector('#temperature').textContent = temperature +' °C';
                    // Mise à jour de la ville
                document.querySelector('#ville').textContent = ville;

            } else {
                alert ('Une erreur est survenue lors du chargement de la température, merci de ré-essayer ultérieurement.');
            }
        }
    }

    let request = new XMLHttpRequest();
    request.open('GET', url);
    request.responseType ='json';
    request.send();
    request.onload = function getWeather() {
            
        if(request.readyState === XMLHttpRequest.DONE) {
            if(request.status === 200) {
                let reponse1 = request.response;
                // console.log('reponse')

                let weather = reponse1.weather[0].icon;
                let imgSrc = 'http://openweathermap.org/img/wn/' + weather + '@2x.png';
                document.querySelector('#weather').innerHTML = "<img src='" +  imgSrc + "' alt='Icone'>";
            } else {
            alert ('Une erreur est survenue lors du chargement du temps, merci de ré-essayer ultérieurement.');
            }
        }
    }
}