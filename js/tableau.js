var liste = document.querySelector('tbody');
var annuaire;
annuaire = new Array();

function addDetail() 
{
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
}

function showListe() 
{
    var contenu="";
    var tailleTableau = annuaire.length;            
        
    for(var i = 0; i < tailleTableau; i++) {
        
        contenu += '<tr>';
        contenu += '<td>' +annuaire[i].nom.toUpperCase() + '</td>';
        contenu += '<td>' + annuaire[i].prenom.ucFirst() + '</td>';
        contenu += '<td>' + annuaire[i].email.toLowerCase() + '</td>';
        contenu += '<td>' + annuaire[i].adresse + '</td>';
        contenu += '<td>' + annuaire[i].tel + '</td>';
        contenu += '<td style="text-align:center"><img src="' + annuaire[i].photo + '"/></td>';
        contenu += '<td style="text-align:center"><a href="javascript:();" onClick="remove(' + i + ')" title="Supprimer"><strong>X</strong></a></td>';
        contenu += '</tr>';
    }

    liste.innerHTML = contenu;
}