let name = "";

function add_fun(){
    let textbar = document.getElementById("textbar");
    textbar.addEventListener("input", get_poke);
}

function set_name(){
    let pokename = document.getElementById("pokename");
    let fixed = name[0];
    fixed = fixed.toUpperCase();
    fixed += name.substr(1, name.length);
    pokename.textContent = fixed;
}

function set_info(e){
    if(e.target.status == 200){
        let data = e.target.response;
        let sprite = document.getElementById("sprite");
        let pokename = document.getElementById("pokename");
        let lk = data["sprites"]["other"]["dream_world"]["front_default"];
        sprite.src = lk;
        sprite.addEventListener("load", set_name);
    }
}

function get_poke(){
    let textbar = document.getElementById("textbar");
    name = textbar.value;
    let lk = "https://pokeapi.co/api/v2/pokemon/" + name;
    let res = new XMLHttpRequest();
    res.addEventListener("load", set_info);
    res.responseType = "json";
    res.open("GET", lk, true);
    res.send(null);
}


window.addEventListener("load", add_fun);
//ditto