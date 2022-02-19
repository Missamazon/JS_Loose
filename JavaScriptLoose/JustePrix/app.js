// Etape 1 - Sélectionner nos éléments
let input = document.querySelector('#prix');
let error = document.querySelector('small');
let form = document.querySelector('#formulaire');

// Etape 2 - Cacher l'erreur

error.style.display = "none";

// Etape 3 - Générer un nombre aléatoire

let randomNumber = Math.floor(Math.random()*1001);
let turn = 0;
let chosenNumber;
function check(nbr) {
    let instruction = document.createElement('div');
    if(nbr < randomNumber) {
        instruction.textContent = "#" + turn + "(" + nbr + ") C'est plus !";
        instruction.className = "instruction plus";
    } else if(nbr > randomNumber) {
        instruction.textContent = "#" + turn + "(" + nbr + ") C'est moins !";
        instruction.className = "instruction moins";
    } else {
        instruction.textContent = "#" + turn + "(" + nbr + ") C'est le juste prix Félicitations !";
        instruction.className = "instruction fini";
        input.disabled = 'true';
    }

    document.querySelector('#instructions').prepend(instruction);
}

// Etape 4 - Vérifier que l'utilisateur donne bien un nombre

input.addEventListener('keyup', () => {
    if (isNaN(input.value)) {
        error.style.display = "inline";
    } else {
        error.style.display = "none";
    }
});

// Etape 5 - Agir à l'envoi du formulaire

form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (isNaN(input.value) || input.value == 0){
        input.style.borderColor = 'red';
    } else {
        turn++;
        input.style.borderColor = 'silver';
        chosenNumber = input.value;
        input.value = '';
        check(chosenNumber);

    }
});

// Etape 6 - Créer la fonction vérifier