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
        let main = document.getElementById("main");
        let infocon = document.getElementById("infocon");
        let pokename = document.getElementById("pokename");
        let lk = data["sprites"]["other"]["dream_world"]["front_default"];
        let poketype = data["types"]["0"]["type"]["name"];
        console.log(data);
        if(lk == null){
            lk = data["sprites"]["front_default"];
        }
        
        infocon.style.display = "block";
        main.style.display = "block";
        card.style.display = "inline-block";
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
        
        let sum = 0;
        
        for(let i = 0; i <= 5; i++){
            let curr = document.getElementById(i + "");
            let bar = curr.childNodes.item(3);
            let val = curr.childNodes.item(5);
            let stat_val = data["stats"][i + ""]["base_stat"];
            let mp = 1.5;
            
            sum += stat_val;
            
            if(stat_val > 200){
                mp = 1.2;
            }
            
            bar.style.width = stat_val * mp + "px";
            val.textContent = stat_val;
        }
        
        let tot = document.getElementById("tot");
        tot.textContent = "Total: " + sum;
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

function pika_pika(){
    let textbar = document.getElementById("textbar");
    textbar.value = "bulbasaur";
    get_poke();
}

window.addEventListener("load", add_fun);
window.addEventListener("load", pika_pika);
//ditto