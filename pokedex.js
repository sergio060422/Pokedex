let name = "";

function add_fun(){
    let start = document.getElementById("start");
    start.addEventListener("click", get_poke);
}

function set_info(e){
    if(e.target.status == 200){
        let data = e.target.response;
        let maintype = document.getElementById("maintype");
        let sprite = document.getElementById("sprite");
        let card = document.getElementById("card");
        let pokename = document.getElementById("pokename");
        let lk = data["sprites"]["other"]["dream_world"]["front_default"];
        let poketype = data["types"]["0"]["type"]["name"];
        
        card.style.display = "block";
        sprite.src = lk;
        maintype.src = "Types/"+poketype+".png"; 
        pokename.textContent = name[0].toUpperCase() + name.substr(1, name.length);
        
        if(data["types"].length == 2){
            let poketype2 = data["types"]["1"]["type"]["name"];
            let sectype = document.getElementById("sectype");
            sectype.style.display = "inline-block";    
            sectype.src = "Types/"+poketype2+".png";
        }
        else{
            let sectype = document.getElementById("sectype");
            sectype.style.display = "none";    
        }
    }
   
}

function get_poke(){
    let textbar = document.getElementById("textbar");
    name = textbar.value;
    
    if(name.length){
        let lk = "https://pokeapi.co/api/v2/pokemon/" + name;
        let res = new XMLHttpRequest();
        res.addEventListener("load", set_info);
        res.responseType = "json";
        res.open("GET", lk, true);
        res.send(null);
    }
}


window.addEventListener("load", add_fun);
//ditto