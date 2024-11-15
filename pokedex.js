let pokes = [], aux = ["$"], jdata, pokeid = new Map(), name = "", id = 0, ispc = 0, dis = "inline-block";

function add_fun(){
    let start = document.getElementById("start");
    start.addEventListener("click", fun_poke);
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
        let lk = "https://img.pokemondb.net/artwork/vector/"+ name.trim() + ".png";
        let poketype = data["types"]["0"]["type"]["name"];
        let aud = document.getElementById("aud");
        let hg = document.getElementById("hg");
        let wg = document.getElementById("wg");
        
        create_curr(data);
        infocon.style.display = "block";
        main.style.display = "block";
        sprite.src = lk;
        sprite.onerror = function (){
            let lk2 = data["sprites"]["other"]["dream_world"]["front_default"];
            
            if(lk2 == null){
                lk2 = data["sprites"]["front_default"];
            }
            
            sprite.src = lk2;
        }
        maintype.src = "Types/"+poketype+".png"; 
        pokename.textContent = cap(name);
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
        
        let sum = 0, indx, flag = 0;
        
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
            
            if(ispc){
                mp = 1.8;
            }
            
            sum += stat_val;
        
            bar.style.width = stat_val * mp + "px";
            val.textContent = stat_val;
            
            if(stat_val > 200){
                flag = 1;
            }
            
            if(i % 2){
                curr.style.backgroundColor = "rgba(0, 0, 0, 0.05)";
                bar.style.backgroundColor = "blue";
            }
        }
        
        let stcon = document.getElementsByClassName("stcon");
        
        if(flag){
            for(let i = 0; i <= 5; i++){
                stcon.item(i).style.width = "120%";
            }
        }
        else{
            for(let i = 0; i <= 5; i++){
                stcon.item(i).style.width = "100%";
            }
        }
        
        let tot = document.getElementById("tot");
        tot.textContent = "Total: " + sum;
    }
}

function create_curr(data){
    let currevo = document.getElementById("currevo");
    let val = aux[data["id"]];
    let lfcon = document.getElementById("lfcon");
    let rgcon = document.getElementById("rgcon");
    
    lfcon.style.display = "none";
    rgcon.style.display = "none";
    
    get_evol(name);
    
    for(let i = currevo.childElementCount - 1; i >= 0; i--){
        let element = currevo.children.item(i);
        currevo.removeChild(element); 
    }
    
    currevo.style.display = "none";
    
    let card = document.createElement("div");
    card.className = "minicard";
    card.id = "minicard";
    currevo.appendChild(card);

    let evoname = document.createElement("label");
    evoname.className = "evoname";
    evoname.id = "evoname"
    card.appendChild(evoname);
    evoname.style.borderBottomColor = "orange";
    evoname.style.borderBottomWidth = "3px";
    evoname.style.borderBottomStyle = "solid";

    let evo = document.createElement("img");
    evo.className = "evo";
    evo.id = "evo";
    evo.height = "140px";
    card.appendChild(evo);
    
    evo.src = data["sprites"]["front_default"];
    evoname.textContent = cap(val);
}

function set_evol_info(e){
    if(e.target.status == 200){
        let data = e.target.response;
        let pstevocon = document.getElementById("pstevocon");
        let val = aux[data["id"]];
        let lfcon = document.getElementById("lfcon");
        let currevo = document.getElementById("currevo");
        
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
            textbar.value = "";
            get_poke(val);
        }
        
        card.addEventListener("click", fun);
        sp.style.display = "block";
        evo.src = data["sprites"]["front_default"];
        evoname.textContent = cap(val);
        lfcon.style.display = dis;
        currevo.style.display = dis;
        let evolcon = document.getElementById("evolcon");
        evolcon.style.display = "block";
    }
}

function get_evol_chain(e){
    if(e.target.status == 200){
        let data = e.target.response;
        let nxtevocon = document.getElementById("nxtevocon");
        let sp = document.getElementById("sp");
        let flag = 0;
        sp.style.display = "none";
        
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
                
                let lk = "https://pokeapi.co/api/v2/pokemon/" + pokeid[data2[i + ""]["species"]["name"].trim()];
                let res = new XMLHttpRequest();
                res.responseType = "json";
                res.open("GET", lk, true);
                res.send(null);
                
                id++;
                
                res.onload = function (e){
                    if(e.target.status == 200){
                        let data3 = e.target.response;
                        let namepoke = aux[data3["id"]];
                        let rgcon = document.getElementById("rgcon");
                        let currevo = document.getElementById("currevo");
                        let evolcon = document.getElementById("evolcon");
                        
                        evolcon.style.display = "block";
                        evo.src = data3["sprites"]["front_default"];
                        evoname.textContent = cap(namepoke);
                        sp.style.display = "block";
                        rgcon.style.display = dis;
                        currevo.style.display = dis;
                        
                        card.addEventListener("click", function (){
                            let textbar = document.getElementById("textbar");
                            textbar.value = "";
                            get_poke(namepoke);
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
                                 let namepoke = aux[data3["id"]];
                                 let rgcon = document.getElementById("rgcon");
                                 let currevo = document.getElementById("currevo");
                                 let evolcon = document.getElementById("evolcon");
                                 evolcon.style.display = "block";
                                 
                                 evo.src = data3["sprites"]["front_default"];
                                 evoname.textContent = cap(namepoke);
                                 sp.style.display = "block";
                                 rgcon.style.display = dis;
                                 currevo.style.display = dis;
                                 
                                 card.addEventListener("click", function (){
                                    let textbar = document.getElementById("textbar");
                                    textbar.value = "";
                                    get_poke(namepoke);
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
        let islg = document.getElementById("islg");
        let pokename = document.getElementById("pokename");

        if(data["is_legendary"]){
            islg.textContent = "Yes";
            pokename.style.color = "gold";
            pokename.style.textShadow = "1px 1px 1px black";
        }
        else{
            islg.textContent = "No";
            pokename.style.color = "black";
            pokename.style.textShadow = "0px 0px 0px black";
        }
        
        if(evol != null){
            let name = evol["name"] + "";
            name = name.trim();
            
            if(name.length){
                let url = "https://pokeapi.co/api/v2/pokemon-species/" + pokeid[name];
                let req = new XMLHttpRequest();
                req.responseType = "json";
                req.open("GET", url, true);
                req.send(null);

                req.onload = function (e){
                    if(e.target.status){
                        let data = e.target.response;
                        let id = data["id"];
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
            let sp = document.getElementById("sp");
            sp.style.display = "none";
            minicard.style.display = "none";
        }
        
        let lk = data["evolution_chain"]["url"];
        let res = new XMLHttpRequest();
        res.addEventListener("load", get_evol_chain);
        res.responseType = "json";
        res.open("GET", lk, true);
        res.send(null);
    }
}

function fun_poke(){
    let textbar = document.getElementById("textbar");
    get_poke(textbar.value);
}

function get_evol(pokemon){
    name = pokemon;
    
    name = name.toLowerCase();
    name = name.trim();
    
    if(name.length){
        let lk = "https://pokeapi.co/api/v2/pokemon-species/" + pokeid[name];
        let res = new XMLHttpRequest();
        res.addEventListener("load", set_evol);
        res.responseType = "json";
        res.open("GET", lk, true);
        res.send(null);
    }
}

function get_poke(pokemon){
    let currevo = document.getElementById("currevo");
    let rgcon = document.getElementById("rgcon");
    let body = document.getElementsByTagName("body");
    let fl1 = document.getElementById("fl1");
    let fl2 = document.getElementById("fl2");
    
    name = pokemon;
    
    name = name.toLowerCase();
    name = name.trim();
    
    let evolcon = document.getElementById("evolcon");
    evolcon.style.display = "none";
    
    if(body[0].offsetWidth > 900){
        if(name == "eevee"){
            evolcon.style.height = "400px";
            rgcon.style.top = "-12px";
            currevo.style.top = "-12px";
        }
        else{
             evolcon.style.height = "200px";
             rgcon.style.top = "50%";
             rgcon.style.transform = "translateY(0%)";
             currevo.style.top = "50%";
             currevo.style.transform = "translateY(-50%)";
        }   
    }
    
    if(name.length){
        let id;
        let url = "https://pokeapi.co/api/v2/pokemon-species/" + pokeid[name];
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

function cap(s){
    return s[0].toUpperCase() + s.substr(1, s.length - 1);
}

function show_menu(){
    let menu = document.getElementById("menu");
    let menucon = document.getElementById("menucon");
    let textbar = document.getElementById("textbar");
    let val = textbar.value;
    let flag = 0;
    val = val.trim();
    val = val.toLowerCase();
    
    for(let i = menucon.childNodes.length - 1; i >= 0; i--){
        menucon.removeChild(menucon.childNodes.item(i));
    }
    
    if(val.length){
        for(let i = 0; i < 1025; i++){
            let name = pokes[i].substr(0, val.length);

            if(flag && name != val){
                break; 
            }
            if(!flag && name == val){
                flag = 1;
                menu.style.display = "block";
            }
            if(flag){
                let element = document.createElement("div");
                element.className = "pokemenu";
                menucon.appendChild(element);
                
                let pokename = document.createElement("label");
                pokename.className = "namesp";
                pokename.textContent = cap(pokes[i]);
                element.appendChild(pokename);
                
                let hr = document.createElement("hr");
                hr.style.display = "block";
                hr.width = "90%";
                menucon.appendChild(hr);
                
                element.onclick = function(){
                    textbar.value = "";
                    get_poke(pokes[i]);
                }
            }
        }
    }
    else{
        menu.style.display = "none";
    }
    
    if(menucon.childNodes.length){
        menucon.removeChild(menucon.lastElementChild);
    }
    else{
        menu.style.display = "none";
    }
}

function hide_menu(e){
    let menu = document.getElementById("menu");
    let textbar = document.getElementById("textbar");
    
    if(e.target.tagName != "INPUT"){
        menu.style.display = "none";
    }
}

function asgn(data){
    jdata = data;
    
    for(let i = 0; i < 1025; i++){
        pokes.push(jdata["results"][i]["name"]);
        pokeid[pokes[i]] = i + 1;
        aux.push(pokes[i]);
    }
    
    pokes.sort();
    get_poke("bulbasaur");
    
}

function ft(){
    fetch("selected-text.json").then(ans => ans.json()).then(ans => asgn(ans));
}

function resz(){
    let currevo = document.getElementById("currevo");
    let pstevocon = document.getElementById("pstevocon");
    let nxtevocon = document.getElementById("nxtevocon");
    let lfcon = document.getElementById("lfcon");
    let rgcon = document.getElementById("rgcon");
    let body = document.getElementsByTagName("body");
    let fl1 = document.getElementById("fl1");
    let fl2 = document.getElementById("fl2");
    let evolcon = document.getElementById("evolcon");
    
    if(body[0].offsetWidth > 900){
        fl1.src = "Images/right.png";
        fl2.src = "Images/right.png";
        ispc = 1;
        dis = "inline-block";
        evolcon.height = "200px";
        currevo.style.display = dis;
        if(lfcon.style.display != "none"){
            lfcon.style.display = dis;    
        }
        if(rgcon.style.display != "none"){
            rgcon.style.display = dis;    
        }
        pstevocon.style.display = dis;
        nxtevocon.style.display = dis;
        console.log("pc");
    }
    else{
        fl1.src = "Images/down.png";
        fl2.src = "Images/down.png";
        ispc = 0;
        dis = "block";
        currevo.style.display = dis;
        if(lfcon.style.display != "none"){
            lfcon.style.display = dis;    
        }
        if(rgcon.style.display != "none"){
            rgcon.style.display = dis;    
        }
        pstevocon.style.display = dis;
        nxtevocon.style.display = dis;
    }
}

function pika_pika(){
    let textbar = document.getElementById("textbar");
    let body = document.getElementsByTagName("body");
    
    textbar.addEventListener("focus", show_menu);
    textbar.style.visibility = "visible";
    textbar.addEventListener("input", show_menu);
    body[0].addEventListener("click", hide_menu);
    
    resz();
    
    if(body[0].offsetWidth > 900){
        ispc = 1;
    }
    
    new ResizeObserver(resz).observe(body[0]);
}

window.addEventListener("load", ft);
window.addEventListener("load", add_fun);
window.addEventListener("load", pika_pika);
//ditto