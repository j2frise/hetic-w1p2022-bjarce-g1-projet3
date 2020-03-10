// Transforme en majuscule la première lettre de la phrase
String.prototype.toUcFirst = function() {
    return this.substr(0,1).toUpperCase()+this.substr(1);
}

// Transforme en majuscule la première lettre de chaque mot
String.prototype.toUcWords = function() {
    str = this.toLowerCase();
    return str.replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g,
        function(s){
          return s.toUpperCase();
      });
};

/*
async function updateCount (namespace, key){
    const data = await fetch("https://api.countapi.xyz/hit/"+namespace+"/"+key);
    const count = await data.json();
    return await count.value;
}
*/

function updateCount (namespace, key){
    return fetch("https://api.countapi.xyz/hit/"+namespace+"/"+key)
    .then((response) => response.json())
    .then((responseData) => {
        console.log(responseData);
        return responseData;
    })
    .catch(error => console.warn(error));
}

localStorage.setItem("visite","");
localStorage.setItem("button","");

localStorage.visite = updateCount("home-page-jb","h-key").then(response => console.log(response));

var liste = document.querySelector('tbody');
var annuaire;
var total = 0;
annuaire = new Array();

function addDetail() 
{

    localStorage.button = updateCount("mon-bouton-contact","clickedddddddddd").then(response => console.log(response));

    var nom 	            = document.getElementById('nom').value;
    var prenom 	            = document.getElementById('prenom').value;
    var email 	            = document.getElementById('email').value;
    var adresse 	        = document.getElementById('adresse').value;
    var tel 	            = document.getElementById('tel').value;
    var photo 	            = document.getElementById('photo').value;
    var require             = document.getElementsByClassName('require');
    var error               = 0;
    for(var i = 0; i < require.length; i++)
    {
        if(require[i].value == ""){
            require[i].setAttribute("style","border:1px solid red;");
            error++;
        }
        else{
            require[i].setAttribute("style","border:1px solid rgba(0, 0, 0, 0.5);");
        }
    }
   
    if(error == 0) {
        if(adresse == ""){
            adresse = "<i style='text-align:center'> - </i>";
        }
        if(photo == ""){
            photo = "img/default.jpg"
        }
        else{
           var input = document.getElementById('photo').files[0];
           photo = window.URL.createObjectURL(input);
        }
        var contact = new Object();
        contact.nom	       	    = nom;
        contact.prenom	    	= prenom;
        contact.email	        = email;
        contact.adresse	        = adresse;
        contact.tel	            = tel;
        contact.photo           = photo;
        annuaire.push(contact);
        showListe();
        total++;
        document.getElementById('total').innerHTML="Total "+ total;	
        document.getElementById('nom').value="";
        document.getElementById('prenom').value="";
        document.getElementById('email').value="";
        document.getElementById('tel').value="";
        document.getElementById('adresse').value="";
        document.getElementById('photo').value="";
        document.getElementById("error").innerHTML="";
    }
    else {
        document.getElementById("error").innerHTML='<div class="message">Remplissez les champs obligatoires</div>';
    }
}

function remove(index) {
    annuaire.splice(index,1);
    showListe();	
    total--;
    document.getElementById('total').innerHTML="Total "+ total;	
}

function showListe() 
{
    var contenu="";
    var tailleTableau = annuaire.length;            
        
    for(var i = 0; i < tailleTableau; i++) {
        
        contenu += '<tr>';
        contenu += '<td>' +annuaire[i].nom.toUpperCase() + '</td>';
        contenu += '<td>' + annuaire[i].prenom.toUcWords() + '</td>';
        contenu += '<td><a href="#">' + annuaire[i].email.toLowerCase() + '</a></td>';
        contenu += '<td><i>' + annuaire[i].adresse + '</i></td>';
        contenu += '<td>' + annuaire[i].tel + '</td>';
        contenu += '<td style="text-align:center"><img src="' + annuaire[i].photo + '"/></td>';
        contenu += '<td style="text-align:center"><a href="javascript:();" onClick="remove(' + i + ')" title="Supprimer"><strong>X</strong></a></td>';
        contenu += '</tr>';
    }

    liste.innerHTML = contenu;
}
