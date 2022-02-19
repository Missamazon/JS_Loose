recevoirTemps("Bordeaux"); //initialisation ville de base

const geoloc = document.querySelector('#geoloc');

const change = document.querySelector('#changer');


if (change.addEventListener('click', () => { //en cas de demande de changement de ville
    ville = prompt("Choisissez une ville :", "Entrez votre ville");
    recevoirTemps(ville);                
})); 

// vérification des données entrées par l'utilisateur se fait sur api openweathermap

if (geoloc.addEventListener('click', function() { //en cas de demande de géolocalisation
    if("geolocation" in navigator) {
        navigator.geolocation.watchPosition((position) => {
            const url = 'https://api.openweathermap.org/data/2.5/weather?lon=' + position.coords.longitude + '&lat=' + position.coords.latitude + '&appid=2e416591ee347e6a2cc73ad37528e2c7&units=metric';

            let r = new XMLHttpRequest();
            r.open('GET', url); 
            r.responseType = 'json'; 
            r.send(); 

            // fonction executée lors de la réception des données
            r.onload = function() {
                if (r.readyState === XMLHttpRequest.DONE) {
                    if (r.status === 200) {
                        let reponse = r.response;
                        recevoirTemps(reponse.name);
                    } else {
                        alert('Un problème est intervenu lors du chargement des données, merci de revenir plus tard.');
                    }
                } else {
                    alert ('Un problème est intervenu lors de la connexion au service, merci de revenir plus tard.');
                }  
            }
        
        });
    } else {
        alert('Un problème est intervenu lors du chargement des données, merci de revenir plus tard.');
}}));

//FUNCTION DEFINITION

function recevoirTemps(ville) {
    let url = 'https://api.openweathermap.org/data/2.5/weather?q=' + ville + '&appid=2e416591ee347e6a2cc73ad37528e2c7&units=metric';
        // Créer la requête

    let requete = new XMLHttpRequest();
    requete.open('GET', url);
    requete.responseType ='json';
    requete.send();

        // Dès qu'on reçoit une réponse on exécute la fonction

    requete.onload = () => {
        if(requete.readyState === XMLHttpRequest.DONE) {
            if(requete.status === 200) {
                let reponse = requete.response;

                let temperature = Math.round(reponse.main.temp);
                document.querySelector('#temperature').textContent = temperature +' °C';
                    // Mise à jour de la ville
                document.querySelector('#ville').textContent = ville;

                let weather = reponse.weather[0].icon;
                let imgSrc = 'http://openweathermap.org/img/wn/' + weather + '@2x.png';
                document.querySelector('#weather').innerHTML = "<img src='" +  imgSrc + "' alt='Icone'>";

            } else {
                alert ('Une erreur est survenue lors du chargement des données, merci de ré-essayer ultérieurement.');
            }
        }
    }
};
