let name = "", id = 0;

function add_fun(){
    let start = document.getElementById("start");
    start.addEventListener("click", get_poke);
    start.addEventListener("click", get_evol);
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
        let aud = document.getElementById("aud");
        let hg = document.getElementById("hg");
        let wg = document.getElementById("wg");
        
        if(lk == null){
            lk = data["sprites"]["front_default"];
        }
        
        infocon.style.display = "block";
        main.style.display = "block";
        sprite.src = "https://img.pokemondb.net/artwork/vector/"+ name.trim() + ".png";
        maintype.src = "Types/"+poketype+".png"; 
        pokename.textContent = name[0].toUpperCase() + name.substr(1, name.length);
        aud.src = data["cries"]["latest"];
        hg.textContent = " " + data["height"] * 10 + "cm";
        wg.textContent = " " + data["weight"] / 10 + "kg";
        
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
        
        let sum = 0, indx;
        
        for(let i = 0; i <= 5; i++){
            indx = i + "";
            if(i == 0){
                indx = "hpcon";
            }
            let curr = document.getElementById(indx);
            let bar = curr.childNodes.item(3);
            let val = curr.childNodes.item(5);
            let stat_val = data["stats"][i + ""]["base_stat"];
            let mp = 1;
            
            sum += stat_val;
        
            bar.style.width = stat_val * mp + "px";
            val.textContent = stat_val;
            
        }
        
        let tot = document.getElementById("tot");
        tot.textContent = "Total: " + sum;
    }
}

function set_evol_info(e){
    if(e.target.status == 200){
        let data = e.target.response;
        let pstevocon = document.getElementById("pstevocon");
        
        for(let i = pstevocon.childElementCount - 1; i >= 0; i--){
            let element = pstevocon.children.item(i);
            pstevocon.removeChild(element);        
        }
        
        let card = document.createElement("div");
        card.className = "minicard";
        card.id = "minicard";
        pstevocon.appendChild(card);

        let evoname = document.createElement("label");
        evoname.className = "evoname";
        evoname.id = "evoname"
        card.appendChild(evoname);

        let evo = document.createElement("img");
        evo.className = "evo";
        evo.id = "evo";
        evo.height = "140px";
        card.appendChild(evo);        
        
        function fun(){
            let textbar = document.getElementById("textbar");
            textbar.value = data["name"];
            get_poke();
            get_evol();
        }
        
        card.addEventListener("click", fun);
        pstevo.style.display = "block";
        evo.src = data["sprites"]["front_default"];
        evoname.textContent = data["name"][0].toUpperCase() + data["name"].substr(1, data["name"].length);
    }
}

function get_evol_chain(e){
    if(e.target.status == 200){
        let data = e.target.response;
        let nxtevo = document.getElementById("nxtevo");
        let nxtevocon = document.getElementById("nxtevocon");
        nxtevo.style.display = "none";
        
        for(let i = nxtevocon.childElementCount - 1; i >= 0; i--){
            let element = nxtevocon.children.item(i);
            nxtevocon.removeChild(element);        
        }
        
        if(data["chain"]["species"]["name"] == name){
            let data2 = data["chain"]["evolves_to"];
            
            for(let i = 0; i < data2.length; i++){
                let card = document.createElement("div");
                card.className = "minicard";
                card.id = "minicard" + id;
                card.style.display = "inline-block";
                nxtevocon.appendChild(card);

                let evoname = document.createElement("label");
                evoname.className = "evoname";
                evoname.id = "evoname" + id;
                card.appendChild(evoname);

                let evo = document.createElement("img");
                evo.className = "evo";
                evo.id = "evo" + id;
                evo.height = "140px";
                card.appendChild(evo);
                
                let lk = "https://pokeapi.co/api/v2/pokemon/" + data2[i + ""]["species"]["name"];
                let res = new XMLHttpRequest();
                res.responseType = "json";
                res.open("GET", lk, true);
                res.send(null);
                
                id++;
                
                res.onload = function (e){
                    if(e.target.status == 200){
                        let data3 = e.target.response;
                        evo.src = data3["sprites"]["front_default"];
                        evoname.textContent = data3["name"][0].toUpperCase() + data3["name"].substr(1, data3["name"].length);
                        nxtevo.style.display = "block";
                        card.addEventListener("click", function (){
                            let textbar = document.getElementById("textbar");
                            textbar.value = data3["name"];
                            get_poke();
                            get_evol();
                        });
                    }
                }
            }
        }
        else{
            let data4 = data["chain"]["evolves_to"];
            
            for(let i = 0; i < data4.length; i++){
                if(data4[i + ""]["species"]["name"] == name){
                     let data2 = data4[i + ""]["evolves_to"];
            
                     for(let i = 0; i < data2.length; i++){
                         let card = document.createElement("div");
                         card.className = "minicard";
                         card.id = "minicard" + id;
                         card.style.display = "inline-block";
                         nxtevocon.appendChild(card);

                         let evoname = document.createElement("label");
                         evoname.className = "evoname";
                         evoname.id = "evoname" + id;
                         card.appendChild(evoname);

                         let evo = document.createElement("img");
                         evo.className = "evo";
                         evo.id = "evo" + id;
                         evo.height = "140px";
                         card.appendChild(evo);

                         let lk = "https://pokeapi.co/api/v2/pokemon/" + data2[i + ""]["species"]["name"];
                         let res = new XMLHttpRequest();
                         res.responseType = "json";
                         res.open("GET", lk, true);
                         res.send(null);

                         id++;

                         res.onload = function (e){
                             if(e.target.status == 200){
                                 let data3 = e.target.response;
                                 evo.src = data3["sprites"]["front_default"];
                                 evoname.textContent = data3["name"][0].toUpperCase() + data3["name"].substr(1, data3["name"].length);
                                 nxtevo.style.display = "block";
                                 card.addEventListener("click", function (){
                                    let textbar = document.getElementById("textbar");
                                    textbar.value = data3["name"];
                                    get_poke();
                                    get_evol();
                                });
                             }
                         }
                     }
                }
            }
        }
    }
}

function set_evol(e){
    if(e.target.status == 200){
        let data = e.target.response;
        let evol = data["evolves_from_species"];
        
        if(evol != null){
            let name = evol["name"];
            
            if(name.length){
                let id;
                let url = "https://pokeapi.co/api/v2/pokemon-species/" + name;
                let req = new XMLHttpRequest();
                req.responseType = "json";
                req.open("GET", url, true);
                req.send(null);

                req.onload = function (e){
                    if(e.target.status){
                        let data = e.target.response;
                        id = data["id"];
                        let lk = "https://pokeapi.co/api/v2/pokemon/" + id;
                        let res = new XMLHttpRequest();
                        res.addEventListener("load", set_evol_info);
                        res.responseType = "json";
                        res.open("GET", lk, true);
                        res.send(null);     
                    }
                }
            }     
        }
        else {
            let minicard = document.getElementById("minicard");
            let pstevo = document.getElementById("pstevo");
            minicard.style.display = "none";
            pstevo.style.display = "none";
        }
        
        let lk = data["evolution_chain"]["url"];
        let res = new XMLHttpRequest();
        res.addEventListener("load", get_evol_chain);
        res.responseType = "json";
        res.open("GET", lk, true);
        res.send(null);
    }
}

function get_evol(){
    let textbar = document.getElementById("textbar");
    name = textbar.value;
    
    name = name.toLowerCase();
    
    if(name.length){
        let lk = "https://pokeapi.co/api/v2/pokemon-species/" + name;
        let res = new XMLHttpRequest();
        res.addEventListener("load", set_evol);
        res.responseType = "json";
        res.open("GET", lk, true);
        res.send(null);
    }
}

function get_poke(){
    let textbar = document.getElementById("textbar");
    name = textbar.value;
    
    name = name.toLowerCase();
    
    if(name.length){
        let id;
        let url = "https://pokeapi.co/api/v2/pokemon-species/" + name;
        let req = new XMLHttpRequest();
        req.responseType = "json";
        req.open("GET", url, true);
        req.send(null);

        req.onload = function (e){
            if(e.target.status){
                let data = e.target.response;
                id = data["id"];
                let lk = "https://pokeapi.co/api/v2/pokemon/" + id;
                let res = new XMLHttpRequest();
                res.addEventListener("load", set_info);
                res.responseType = "json";
                res.open("GET", lk, true);
                res.send(null);     
            }
        }
    } 
}

function pika_pika(){
    let textbar = document.getElementById("textbar");
    textbar.value = "bulbasaur";
    get_poke();
    get_evol();
    
   
}

window.addEventListener("load", add_fun);
window.addEventListener("load", pika_pika);
//ditto