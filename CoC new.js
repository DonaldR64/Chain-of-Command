const CoC = (() => { 
    const version = '1.9.23';
    if (!state.CoC) {state.CoC = {}};

    const pageInfo = {name: "",page: "",gridType: "",scale: 0,width: 0,height: 0};
    const rowLabels = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","AA","BB","CC","DD","EE","FF","GG","HH","II","JJ","KK","LL","MM","NN","OO","PP","QQ","RR","SS","TT","UU","VV","WW","XX","YY","ZZ","AAA","BBB","CCC","DDD","EEE","FFF","GGG","HHH","III","JJJ","KKK","LLL","MMM","NNN","OOO","PPP","QQQ","RRR","SSS","TTT","UUU","VVV","WWW","XXX","YYY","ZZZ"];

    let TerrainArray = {};
    let ModelArray = {}; //Individual Models, Tanks etc
    let TeamArray = {}; //Teams of Models
    let SectionArray = {}; //to track sections of teams

    let hexMap = {}; 
    let edgeArray = [];
    const xSpacing = 75.1985619844599;
    const ySpacing = 66.9658278242677;
    const DIRECTIONS = ["Northeast","East","Southeast","Southwest","West","Northwest"];

    const colours = {
        red: "#ff0000",
        blue: "#00ffff",
        yellow: "#ffff00",
        green: "#00ff00",
        purple: "#800080",
        black: "#000000",
    }

    const sm = {
        overwatch: "status_sentry-gun",
        tactical: "status_Prone::2006547",
        order: "status_green",
        floor2: "status_Green-02::2006607",
        floor3: "status_Green-03::2006611",
        fired: "status_Shell::5553215",
        wounded: "status_dead",  //temp
        lightWound: "status_dead",
        moved: "status_Advantage-or-Up::2006462",
    }

    let outputCard = {title: "",subtitle: "",nation: "",body: [],buttons: [],};
    const CharacterCountries = ["Soviet ","US ", "German ","UK "];

    const Axis = ["Germany","Italy","Japan"];
    const Allies = ["Soviet","USA","British","Canada"];

    const Nations = {
        "Soviet": {
            "image": "https://s3.amazonaws.com/files.d20.io/images/304547168/fMk9mH9WMsr8VSQFg6AZew/thumb.png?1663171370",
            "dice": "Soviet",
            "backgroundColour": "#FFFF00",
            "titlefont": "Anton",
            "fontColour": "#000000",
            "borderColour": "#FF0000",
            "borderStyle": "5px ridge",
            "overwatch": "-N_aLWelhXtAj2-HmbhX",
            "covering": "-N_aLMELJpCFCSdc38-r",
            "platoonmarkers": ["","letters_and_numbers0099::4815235","letters_and_numbers0100::4815236","letters_and_numbers0101::4815237","letters_and_numbers0102::4815238","letters_and_numbers0103::4815239","letters_and_numbers0104::4815240","letters_and_numbers0105::4815241","letters_and_numbers0106::4815242","letters_and_numbers0107::4815243","letters_and_numbers0108::4815244","letters_and_numbers0109::4815245","letters_and_numbers0110::4815246","letters_and_numbers0111::4815247","letters_and_numbers0112::4815248","letters_and_numbers0113::4815249","letters_and_numbers0114::4815250","letters_and_numbers0115::4815251","letters_and_numbers0116::4815252","letters_and_numbers0117::4815253","letters_and_numbers0118::4815254","letters_and_numbers0119::4815255","letters_and_numbers0120::4815256","letters_and_numbers0121::4815257","letters_and_numbers0122::4815258","letters_and_numbers0123::4815259","letters_and_numbers0124::4815260"],       
        },
        "Germany": {
            "image": "https://s3.amazonaws.com/files.d20.io/images/329415788/ypEgv2eFi-BKX3YK6q_uOQ/thumb.png?1677173028",
            "dice": "Germany",
            "backgroundColour": "#000000",
            "titlefont": "Bokor",
            "fontColour": "#FFFFFF",
            "borderColour": "#000000",
            "borderStyle": "5px double",
            "overwatch": "-N_aLRXvf68lFjYj5V3V",
            "covering": "-N_aLD7-Jrij3WlVHaUl",
            "platoonmarkers": ["","letters_and_numbers0197::4815333","letters_and_numbers0198::4815334","letters_and_numbers0199::4815335","letters_and_numbers0200::4815336","letters_and_numbers0201::4815337","letters_and_numbers0202::4815338","letters_and_numbers0203::4815339","letters_and_numbers0204::4815340","letters_and_numbers0205::4815341","letters_and_numbers0206::4815342","letters_and_numbers0207::4815343","letters_and_numbers0208::4815344","letters_and_numbers0209::4815345","letters_and_numbers0210::4815346","letters_and_numbers0211::4815347","letters_and_numbers0212::4815348","letters_and_numbers0213::4815349","letters_and_numbers0214::4815350","letters_and_numbers0215::4815351","letters_and_numbers0216::4815352","letters_and_numbers0217::4815353","letters_and_numbers0218::4815354","letters_and_numbers0219::4815355","letters_and_numbers0220::4815356","letters_and_numbers0221::4815357","letters_and_numbers0222::4815358"],   
        },
        "UK": {
            "image": "https://s3.amazonaws.com/files.d20.io/images/330506939/YtTgDTM3q7p8m0fJ4-E13A/thumb.png?1677713592",
            "backgroundColour": "#0E2A7A",
            "dice": "UK",
            "titlefont": "Merriweather",
            "fontColour": "#FFFFFF",
            "borderColour": "#BC2D2F",
            "borderStyle": "5px groove",
            "overwatch": "",
            "covering": "",
            "platoonmarkers": ["","letters_and_numbers0148::4815284","letters_and_numbers0149::4815285","letters_and_numbers0150::4815286","letters_and_numbers0151::4815287","letters_and_numbers0152::4815288","letters_and_numbers0153::4815289","letters_and_numbers0154::4815290","letters_and_numbers0155::4815291","letters_and_numbers0156::4815292","letters_and_numbers0157::4815293","letters_and_numbers0158::4815294","letters_and_numbers0159::4815295","letters_and_numbers0160::4815296","letters_and_numbers0161::4815297","letters_and_numbers0162::4815298","letters_and_numbers0163::4815299","letters_and_numbers0164::4815300","letters_and_numbers0165::4815301","letters_and_numbers0166::4815302","letters_and_numbers0167::4815303","letters_and_numbers0168::4815304","letters_and_numbers0169::4815305","letters_and_numbers0170::4815306","letters_and_numbers0171::4815307","letters_and_numbers0172::4815308","letters_and_numbers0173::4815309"],
        },
        "Neutral": {
            "image": "",
            "backgroundColour": "#FFFFFF",
            "titlefont": "Arial",
            "fontColour": "#000000",
            "borderColour": "#00FF00",
            "borderStyle": "5px ridge",
            "dice": "UK",
        },

    }

    const MapScale = 10; //10 ft to 1 hex

    const TerrainInfo = {
        "#000000": {name: "Hill 1", height: 10,los: 0,cover: 0,move: 0,obstacle: 0},
        "#434343": {name: "Hill 2", height: 20,los: 0,cover: 0,move: 0,obstacle: 0},    

        "#00ff00": {name: "Woods", height: 60,los: 2, cover: 2, move: 1, obstacle: 0},
        "#93c47d": {name: "Orchard", height: 25, los: 1, cover: 2, move: 1, obstacle: 0},
        "#b6d7a8": {name: "Scrub", height: 5, los: 1, cover: 2, move: 1, obstacle: 0},

    };

    //LOS: 0 = Open, 1 = Partially Blocked, 2/3" value, 2 = Partially Blocked 1" value, 3 = blocked 
    //cover: 0 = none, 1 = light cover for infantry if stationary, 2 = light cover, 3 = heavy cover, 4 = strongpoint
    //Move: 0 = Open, 1 = "Broken", 2 = Heavy Going, 3 = Really Heavy Going
    //Obstacle: 0 = None, 1 = minor, 2 = medium, 3 = major
    //Obstacles will generally be move 0, but an obstacle #

    const MapTokenInfo = {
        "Ploughed Field": {name: "Ploughed Field",height: 0,los:0,cover: 0,move: 1, obstacle: 0},
        "Medium Crops": {name: "Medium Crops",height: 3,los: 0,cover: 1,move: 1,obstacle: 0},
        "Tall Crops": {name: "Tall Crops",height: 5,los: 1,cover: 2,move: 1,obstacle: 0},

        "Short Hedge": {name: "Short Hedge",height: 3,los: 0,cover: 2,move: 0, obstacle: 1},
        "Short Wall": {name: "Short Wall",height: 3,los: 0,cover: 3,move: 0, obstacle: 1},
        "Medium Hedge": {name: "Medium Hedge",height: 5,los: 3,cover: 2,move: 0, obstacle: 2},
        "Medium Wall": {name: "Medium Wall",height: 5,los: 3,cover: 3,move: 0, obstacle: 2},
        "Tall Hedge": {name: "Tall Hedge",height: 10,los: 3,cover: 2,move: 0, obstacle: 3},
        "Tall Wall": {name: "Tall Wall",height: 10,los: 3,cover: 3,move: 0, obstacle: 3},
        "Bocage": {name: "Bocage",height: 10,los: 3,cover: 3,move: 0, obstacle: 3},

        "Ruins": {name: "Ruins",height: 5,los: 2,cover: 3,move: 1,obstacle: 0},
        "Stone Building A": {name: "Stone Building",height: 15,los: 3,cover: 3,move: 1,obstacle: 0},
        "Stone Building B": {name: "Stone Building",height: 25,los: 3,cover: 3,move: 1,obstacle: 0},
        "Wood Building A": {name: "Wood Building",height: 15,los: 3,cover: 2,move: 1,obstacle: 0},
        "Wood Building B": {name: "Wood Building",height: 25,los: 3,cover: 2,move: 1,obstacle: 0},
    }


    const simpleObj = (o) => {
        let p = JSON.parse(JSON.stringify(o));
        return p;
    };

    const getCleanImgSrc = (imgsrc) => {
        let parts = imgsrc.match(/(.*\/images\/.*)(thumb|med|original|max)([^?]*)(\?[^?]+)?$/);
        if(parts) {
            return parts[1]+'thumb'+parts[3]+(parts[4]?parts[4]:`?${Math.round(Math.random()*9999999)}`);
        }
        return;
    };

    const tokenImage = (img) => {
        //modifies imgsrc to fit api's requirement for token
        img = getCleanImgSrc(img);
        img = img.replace("%3A", ":");
        img = img.replace("%3F", "?");
        img = img.replace("med", "thumb");
        return img;
    };

    const stringGen = () => {
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < 6; i++) {
            text += possible.charAt(Math.floor(randomInteger(possible.length)));
        }
        return text;
    };

    const findCommonElements = (arr1,arr2) => {
        //iterates through array 1 and sees if array 2 has any of its elements
        //returns true if the arrays share an element
        return arr1.some(item => arr2.includes(item));
    };

    const DeepCopy = (variable) => {
        variable = JSON.parse(JSON.stringify(variable))
        return variable;
    };

    const PlaySound = (name) => {
        let sound = findObjs({type: "jukeboxtrack", title: name})[0];
        if (sound) {
            sound.set({playing: true,softstop:false});
        }
    };

    const FX = (fxname,model1,model2) => {
        //model2 is target, model1 is shooter
        //if its an area effect, model1 isnt used
        if (fxname.includes("System")) {
            //system fx
            fxname = fxname.replace("System-","");
            if (fxname.includes("Blast")) {
                fxname = fxname.replace("Blast-","");
                spawnFx(model2.location.x,model2.location.y, fxname);
            } else {
                spawnFxBetweenPoints(model1.location, model2.location, fxname);
            }
        } else {
            let fxType =  findObjs({type: "custfx", name: fxname})[0];
            if (fxType) {
                spawnFxBetweenPoints(model1.location, model2.location, fxType.id);
            }
        }
    }


    //Retrieve Values from Character Sheet Attributes
    const Attribute = (character,attributename) => {
        //Retrieve Values from Character Sheet Attributes
        let attributeobj = findObjs({type:'attribute',characterid: character.id, name: attributename})[0]
        let attributevalue = "";
        if (attributeobj) {
            attributevalue = attributeobj.get('current');
        }
        return attributevalue;
    }

    const AttributeArray = (characterID) => {
        let aa = {}
        let attributes = findObjs({_type:'attribute',_characterid: characterID});
        for (let j=0;j<attributes.length;j++) {
            let name = attributes[j].get("name")
            let current = attributes[j].get("current")   
            if (!current || current === "") {current = " "} 
            aa[name] = current;

        }
        return aa;
    }

    const AttributeSet = (characterID,attributename,newvalue,max) => {
        if (!max) {max = false};
        let attributeobj = findObjs({type:'attribute',characterid: characterID, name: attributename})[0]
        if (attributeobj) {
            if (max === true) {
                attributeobj.set("max",newvalue)
            } else {
                attributeobj.set("current",newvalue)
            }
        } else {
            if (max === true) {
                createObj("attribute", {
                    name: attributename,
                    current: newvalue,
                    max: newvalue,
                    characterid: characterID,
                });            
            } else {
                createObj("attribute", {
                    name: attributename,
                    current: newvalue,
                    characterid: characterID,
                });            
            }
        }
    }


    const ButtonInfo = (phrase,action) => {
        let info = {
            phrase: phrase,
            action: action,
        }
        outputCard.buttons.push(info);
    }

    const SetupCard = (title,subtitle,nation) => {
        outputCard.title = title;
        outputCard.subtitle = subtitle;
        outputCard.nation = nation;
        outputCard.body = [];
        outputCard.buttons = [];
        outputCard.inline = [];
    }

    const DisplayDice = (roll,nation,size) => {
        roll = roll.toString();
        if (!Nations[nation] || !nation) {
            nation = "Neutral";
        }
        let tablename = Nations[nation].dice;
        let table = findObjs({type:'rollabletable', name: tablename})[0];
        let obj = findObjs({type:'tableitem', _rollabletableid: table.id, name: roll })[0];        
        let avatar = obj.get('avatar');
        let out = "<img width = "+ size + " height = " + size + " src=" + avatar + "></img>";
        return out;
    };

    const HexInfo = {
        size: {
            x: 75.1985619844599/Math.sqrt(3),
            y: 66.9658278242677 * 2/3,
        },
        pixelStart: {
            x: 37.5992809922301,
            y: 43.8658278242683,
        },
        halfX: xSpacing/2,
        width: 75.1985619844599,
        height: 89.2877704323569,
        directions: {},
    };

    const M = {
            f0: Math.sqrt(3),
            f1: Math.sqrt(3)/2,
            f2: 0,
            f3: 3/2,
            b0: Math.sqrt(3)/3,
            b1: -1/3,
            b2: 0,
            b3: 2/3,
    };

    class Point {
        constructor(x,y) {
            this.x = x;
            this.y = y;
        }
    };

    class Hex {
        constructor(q,r,s) {
            this.q = q;
            this.r =r;
            this.s = s;
        }

        add(b) {
            return new Hex(this.q + b.q, this.r + b.r, this.s + b.s);
        }
        subtract(b) {
            return new Hex(this.q - b.q, this.r - b.r, this.s - b.s);
        }
        static direction(direction) {
            return HexInfo.directions[direction];
        }
        neighbour(direction) {
            //returns a hex (with q,r,s) for neighbour, specify direction eg. hex.neighbour("NE")
            return this.add(HexInfo.directions[direction]);
        }
        neighbours() {
            //all 6 neighbours
            let results = [];
            for (let i=0;i<DIRECTIONS.length;i++) {
                results.push(this.neighbour(DIRECTIONS[i]));
            }
            return results;
        }



        len() {
            return (Math.abs(this.q) + Math.abs(this.r) + Math.abs(this.s)) / 2;
        }
        distance(b) {
            return this.subtract(b).len();
        }
        round() {
            var qi = Math.round(this.q);
            var ri = Math.round(this.r);
            var si = Math.round(this.s);
            var q_diff = Math.abs(qi - this.q);
            var r_diff = Math.abs(ri - this.r);
            var s_diff = Math.abs(si - this.s);
            if (q_diff > r_diff && q_diff > s_diff) {
                qi = -ri - si;
            }
            else if (r_diff > s_diff) {
                ri = -qi - si;
            }
            else {
                si = -qi - ri;
            }
            return new Hex(qi, ri, si);
        }
        lerp(b, t) {
            return new Hex(this.q * (1.0 - t) + b.q * t, this.r * (1.0 - t) + b.r * t, this.s * (1.0 - t) + b.s * t);
        }
        linedraw(b) {
            //returns array of hexes between this hex and hex 'b'
            var N = this.distance(b);
            var a_nudge = new Hex(this.q + 1e-06, this.r + 1e-06, this.s - 2e-06);
            var b_nudge = new Hex(b.q + 1e-06, b.r + 1e-06, b.s - 2e-06);
            var results = [];
            var step = 1.0 / Math.max(N, 1);
            for (var i = 0; i < N; i++) {
                results.push(a_nudge.lerp(b_nudge, step * i).round());
            }
            return results;
        }
        label() {
            //translate hex qrs to Roll20 map label
            let doubled = DoubledCoord.fromCube(this);
            let label = rowLabels[doubled.row] + (doubled.col + 1).toString();
            return label;
        }

        radius(rad) {
            //returns array of hexes in radius rad
            //Not only is x + y + z = 0, but the absolute values of x, y and z are equal to twice the radius of the ring
            let results = [];
            let h;
            for (let i = 0;i <= rad; i++) {
                for (let j=-i;j<=i;j++) {
                    for (let k=-i;k<=i;k++) {
                        for (let l=-i;l<=i;l++) {
                            if((Math.abs(j) + Math.abs(k) + Math.abs(l) === i*2) && (j + k + l === 0)) {
                                h = new Hex(j,k,l);
                                results.push(this.add(h));
                            }
                        }
                    }
                }
            }
            return results;
        }
        angle(b) {
            //angle between 2 hexes
            let origin = hexToPoint(this);
            let destination = hexToPoint(b);

            let x = Math.round(origin.x - destination.x);
            let y = Math.round(origin.y - destination.y);
            let phi = Math.atan2(y,x);
            phi = phi * (180/Math.PI);
            phi = Math.round(phi);
            phi -= 90;
            phi = Angle(phi);
            return phi;
        }        
    };

    class DoubledCoord {
        constructor(col, row) {
            this.col = col;
            this.row = row;
        }
        static fromCube(h) {
            var col = 2 * h.q + h.r;
            var row = h.r;
            return new DoubledCoord(col, row);//note will need to use rowLabels for the row, and add one to column to translate from 0
        }
        toCube() {
            var q = (this.col - this.row) / 2; //as r = row
            var r = this.row;
            var s = -q - r;
            return new Hex(q, r, s);
        }
    };

    class Section {
        constructor(player,nation,sectionID,sectionName,core) {
            if (!sectionID) {
                sectionID = stringGen();
            }
            this.id = sectionID;
            this.name = sectionName;
            this.player = player;
            this.nation = nation;
            this.teamIDs = [];
            this.core = core;

            SectionArray[sectionID] = this;
        }

        add(team) {
            if (this.teamIDs.includes(team.id) === false) {
                this.teamIDs.push(team.id);
            }
        }

        remove(team) {
            let index = this.teamIDs.indexOf(team.id);
            if (index > -1) {
                this.teamIDs.splice(index,1);
            }
            if (this.teamIDs.length === 0) {
                //Bad Thing
            }
        }
    }

    class Team {
        constructor(player,nation,teamID,teamName,sectionID) {
            if (!teamID) {
                teamID = stringGen();
            }
            //should always have section ID as team added after section
            this.id = teamID;
            this.name = teamName;
            this.player = player;
            this.nation = nation;
            this.sectionID = sectionID;
            this.modelIDs = [];
            this.symbol = "";

            TeamArray[teamID] = this;
        }

        add(model) {
            if (this.modelIDs.includes(model.id) === false) {
                this.modelIDs.push(model.id);
            }
        }

        leader() {
            //sort team, 0 indexed token gets aura
            let leader = ModelArray[this.modelIDs[0]];
            leader.token.set({
                aura1_color: colours.green,
                aura1_radius: 0.1,
                showplayers_aura1: true,
            })
        }

        remove(model) {
            let index = this.modelIDs.indexOf(model.id);
            if (index > -1) {
                this.modelIDs.splice(index,1);
            }
            if (this.modelIDs.length === 0) {
                //Bad Thing
            }
        }
    }

    class Model {
        constructor(tokenID,sectionID,teamID,existing) {
            if (!existing) {existing = false};
            let token = findObjs({_type:"graphic", id: tokenID})[0];
            let char = getObj("character", token.get("represents")); 
            let charID = char.id;
            let charName = char.get("name");
            let attributeArray = AttributeArray(char.id);
            let nation = attributeArray.nation;
            let player = (Allies.includes(nation)) ? 0:1;
            if (nation === "Neutral") {player = 2};

            let type = attributeArray.type;
            let location = new Point(token.get("left"),token.get("top"));
            let hex = pointToHex(location);
            let hexLabel = hex.label();

            let size = "Standard";
            let radius = 1;
            let vertices = TokenVertices(token);

            if (token.get("width") > 100 || token.get("height") > 100) {
                size = "Large";
                let w = token.get("width")/2;
                let h = token.get("height")/2;
                radius = Math.ceil(Math.sqrt(w*w + h*h)/70);
            }

            //weapons

            let special = attributeArray.special;
            if (!special || special === "") {
                special = " ";
            }
            let crew = false;
            if (special.includes("Crew")) {crew = true};
            let rank = parseInt(attributeArray.rank);
            let name;
            if (existing === false) {
                name = Naming(charName,nation,rank,crew);
            } else {
                name = token.get("name");
            }
            this.name = name;
            this.id = tokenID;
            this.charID = charID;
            this.charName = charName;
            this.token = token;
            this.player = player;
            this.nation = nation;
            this.teamID = teamID;
            this.sectionID = sectionID;
            this.type = type;
            this.hex = hex;
            this.hexLabel = hexLabel;
            this.rank = rank;
            this.size = size;
            this.radius = radius;
            this.vertices = vertices;

            this.quality = attributeArray.quality;
            this.special = special;
            this.initiative = 0;
            this.leaderTeamIDs = [];
            this.soloNCO = false; //true if is an unattached NCO
            if (this.rank === 1 || this.rank === 2) {
                this.initiative = 2;
            } else if (this.rank > 2) {
                this.initiative = this.rank;
            }
            this.largeHexList = []; //hexes that have parts of larger token, mainly for LOS 
            hexMap[hexLabel].tokenIDs.push(tokenID);
            if (this.size === "Large") {
                LargeTokens(this); 
            }



            //this.weapons




            ModelArray[tokenID] = this;
        }

        casualty() {
            let health = parseInt(this.token.get("bar1_value")) - 1;
            if (health < 1) {
                let index = hexMap[this.hexLabel].tokenIDs.indexOf(this.id);
                if (index > -1) {
                    hexMap[this.hexLabel].tokenIDs.splice(index,1);
                }
                if (this.size === "Large") {
                    ClearLarge(this); 
                }            
                let team = TeamArray[this.teamID];
                team.remove(this);
                if (this.token) {
                    this.token.set({
                        status_dead: true,
                        layer: "map",
                    })
                    toFront(this.token);
                }
                delete ModelArray[this.id];
            } else {
                this.token.set({
                    bar1_value: health,
                });
            }
        }

        addMan() {
            let health = parseInt(base.token.get("bar1_value")) + 1;
            this.token.set({
                bar1_value: health,
            });
        }

        pinned() {
            let pinned = false;
            if (this.token.get("aura1_color") === colours.yellow) {
                pinned = true;
            }
            return pinned;
        }

        broken() {
            let broken = false;
            if (this.token.get("aura1_color") === colours.red) {
                broken = true;
            }
            return broken;
        }



    }




    const WeaponArray = {
        SMG: {
            Close: {Range: 6, FP: 4},
            Eff: {Range: 12, FP: 2},
            Reroll: false,
            Penalty: 0,
            Cover: "Nil",
        },
        Rifle: {
            Close: {Range: 18, FP: 1},
            Eff: {Range: 150, FP: 1},
            Reroll: false,
            Penalty: 0,
            Cover: "Nil",
        },
        Carbine: {
            Close: {Range: 18, FP: 1},
            Eff: {Range: 150, FP: 1},
            Reroll: true,
            Penalty: 0,
            Cover: "Nil",
        },
        BAR: {
            Close: {Range: 18, FP: 3},
            Eff: {Range: 150, FP: 3},
            Reroll: true,
            Penalty: 0,
            Cover: "Nil",
        },
        "Magazine LMG": {
            Close: {Range: 18, FP: 6},
            Eff: {Range: 150, FP: 6},
            Reroll: false,
            Penalty: 2,
            Cover: "Nil",
        },
        "Belt-Fed LMG": {
            Close: {Range: 18, FP: 8},
            Eff: {Range: 150, FP: 8},
            Reroll: false,
            Penalty: 3,
            Cover: "Nil",
        },
        SMG: {
            Close: {Range: 6, FP: 4},
            Eff: {Range: 12, FP: 2},
            Reroll: false,
            Penalty: 0,
            Cover: "Nil",
        },
        "Assault Rifle": {
            Close: {Range: 18, FP: 3},
            Eff: {Range: 48, FP: 1},
            Reroll: false,
            Penalty: 0,
            Cover: "Nil",
        },
        "MMG/HMG": {
            Close: {Range: 24, FP: 10},
            Eff: {Range: 150, FP: 10},
            Reroll: false,
            Penalty: 3,
            Cover: "Reduces",
        },
        "Pistol": {
            Close: {Range: 9, FP: 1},
            Eff: {Range: 0, FP: 0},
            Reroll: false,
            Penalty: 0,
            Cover: "Nil",
        },



    }

    const ToHitArray = {
        Green: {Close: 3, Eff: 4},
        Regular: {Close: 4, Eff: 5},
        Elite: {Close: 5, Eff: 6},
    }

    const HitEffect = [
        [0,0,0,1,1,2,2], //0 = Miss, 1 = Shock, 2 = Kill, extra 0 at start as zero index array
        [0,0,0,0,1,1,2],
        [0,0,0,0,0,1,2],
    ]

    const ModelDistance = (model1,model2) => {
        let hexes1 = [model1.hex];
        let hexes2 = [model2.hex];
        if (model1.size === "Large") {
            hexes1 = hexes1.concat(model1.largeHexList);
        }
        if (model2.size === "Large") {
            hexes2 = hexes2.concat(model2.largeHexList);
        }
        let closestDist = Infinity;
        let closestHex1 = model1.hex;
        let closestHex2 = model2.hex;

        for (let i=0;i<hexes1.length;i++) {
            let hex1 = hexes1[i];
            for (let j=0;j<hexes2.length;j++) {
                let hex2 = hexes2[j];
                let dist = hex1.distance(hex2);
                if (dist < closestDist) {
                    closestDist = dist;
                    closestHex1 = hex1;
                    closestHex2 = hex2;
                }
            }
        }
        //closestDist -= 1; //as its distance between bases
        let info = {
            distance: closestDist,
            hex1: closestHex1,
            hex2: closestHex2,
        }
        return info;
    }

    const pointToHex = (point) => {
        let x = (point.x - HexInfo.pixelStart.x)/HexInfo.size.x;
        let y = (point.y - HexInfo.pixelStart.y)/HexInfo.size.y;
        let q = M.b0 * x + M.b1 * y;
        let r = M.b2 * x + M.b3 * y;
        let s = -q-r;
        let hex = new Hex(q,r,s);
        hex = hex.round();
        return hex;
    }

    const hexToPoint = (hex) => {
        let q = hex.q;
        let r = hex.r;
        let x = (M.f0 * q + M.f1 * r) * HexInfo.size.x;
        x += HexInfo.pixelStart.x;
        let y = (M.f2 * r + M.f3 * r) * HexInfo.size.y;
        y += HexInfo.pixelStart.y;
        let point = new Point(x,y);
        return point;
    }


    const getAbsoluteControlPt = (controlArray, centre, w, h, rot, scaleX, scaleY) => {
        let len = controlArray.length;
        let point = new Point(controlArray[len-2], controlArray[len-1]);
        //translate relative x,y to actual x,y 
        point.x = scaleX*point.x + centre.x - (scaleX * w/2);
        point.y = scaleY*point.y + centre.y - (scaleY * h/2);
        point = RotatePoint(centre.x, centre.y, rot, point);
        return point;
    }

    const XHEX = (pts) => {
        //makes a small group of points for checking around centre
        let points = pts;
        points.push(new Point(pts[0].x - 20,pts[0].y - 20));
        points.push(new Point(pts[0].x + 20,pts[0].y - 20));
        points.push(new Point(pts[0].x + 20,pts[0].y + 20));
        points.push(new Point(pts[0].x - 20,pts[0].y + 20));
        return points;
    }

    const Angle = (theta) => {
        while (theta < 0) {
            theta += 360;
        }
        while (theta > 360) {
            theta -= 360;
        }
        return theta
    }   

    const RotatePoint = (cX,cY,angle, p) => {
        //cx, cy = coordinates of the centre of rotation
        //angle = clockwise rotation angle
        //p = point object
        let s = Math.sin(angle);
        let c = Math.cos(angle);
        // translate point back to origin:
        p.x -= cX;
        p.y -= cY;
        // rotate point
        let newX = p.x * c - p.y * s;
        let newY = p.x * s + p.y * c;
        // translate point back:
        p.x = Math.round(newX + cX);
        p.y = Math.round(newY + cY);
        return p;
    }

    const pointInPolygon = (point,polygon) => {
        //evaluate if point is in the polygon
        px = point.x
        py = point.y
        collision = false
        vertices = polygon.vertices
        len = vertices.length - 1
        for (let c=0;c<len;c++) {
            vc = vertices[c];
            vn = vertices[c+1]
            if (((vc.y >= py && vn.y < py) || (vc.y < py && vn.y >= py)) && (px < (vn.x-vc.x)*(py-vc.y)/(vn.y-vc.y)+vc.x)) {
                collision = !collision
            }
        }
        return collision
    }

    const ClearLarge = (model) => {
        //clear Old hexes, if any
        for (let h=0;h<model.largeHexList.length;h++) {
            let chlabel = model.largeHexList[h].label();
            let index = hexMap[chlabel].tokenIDs.indexOf(model.id);
            if (index > -1) {
                hexMap[chlabel].tokenIDs.splice(index,1);
            }                    
        }        
        model.largeHexList = [];
    }


    const LargeTokens = (model) => {
        ClearLarge(model);
        //adds tokenID to hexMap for LOS purposes
        let radiusHexes = model.hex.radius(model.radius);
        for (let i=0;i<radiusHexes.length;i++) {
            let radiusHex = radiusHexes[i];
            let radiusHexLabel = radiusHex.label();
            if (radiusHexLabel === model.hexLabel) {continue};
            if (!hexMap[radiusHexLabel]) {continue};
            let c = hexMap[radiusHexLabel].centre;
            let check = false;
            let num = 0;
            let pts = [];
            pts.push(c);
            pts = XHEX(pts);
            for (let i=0;i<5;i++) {
                check = pointInPolygon(pts[i],model);
                if (check === true) {num ++};
            }
            if (num > 2) {
                if (hexMap[radiusHexLabel].tokenIDs.includes(model.id) === false) {
                    hexMap[radiusHexLabel].tokenIDs.push(model.id);
                }
                model.largeHexList.push(radiusHex);
            }
        }
    }


    const TokenVertices = (tok) => {
      //Create corners with final being the first
      let corners = []
      let tokX = tok.get("left")
      let tokY = tok.get("top")
      let w = tok.get("width")
      let h = tok.get("height")
      let rot = tok.get("rotation") * (Math.PI/180)
      //define the four corners of the target token as new points
      //also rotate those corners around the target tok centre
      corners.push(RotatePoint(tokX, tokY, rot, new Point( tokX-w/2, tokY-h/2 )))     //Upper left
      corners.push(RotatePoint(tokX, tokY, rot, new Point( tokX+w/2, tokY-h/2 )))     //Upper right
      corners.push(RotatePoint(tokX, tokY, rot, new Point( tokX+w/2, tokY+h/2 )))     //Lower right
      corners.push(RotatePoint(tokX, tokY, rot, new Point( tokX-w/2, tokY+h/2 )))     //Lower left
      corners.push(RotatePoint(tokX, tokY, rot, new Point( tokX-w/2, tokY-h/2 )))     //Upper left
      return corners
    }


    const PrintCard = (id) => {
        let output = "";
        if (id) {
            let playerObj = findObjs({type: 'player',id: id})[0];
            let who = playerObj.get("displayname");
            output += `/w "${who}"`;
        } else {
            output += "/desc ";
        }

        if (!outputCard.nation || !Nations[outputCard.nation]) {
            outputCard.nation = "Neutral";
        }

        //start of card
        output += `<div style="display: table; border: ` + Nations[outputCard.nation].borderStyle + " " + Nations[outputCard.nation].borderColour + `; `;
        output += `background-color: #EEEEEE; width: 100%; text-align: centre; `;
        output += `border-radius: 1px; border-collapse: separate; box-shadow: 5px 3px 3px 0px #aaa;;`;
        output += `"><div style="display: table-header-group; `;
        output += `background-color: ` + Nations[outputCard.nation].backgroundColour + `; `;
        output += `background-image: url(` + Nations[outputCard.nation].image + `), url(` + Nations[outputCard.nation].image + `); `;
        output += `background-position: left,right; background-repeat: no-repeat, no-repeat; background-size: contain, contain; align: centre,centre; `;
        output += `border-bottom: 2px solid #444444; "><div style="display: table-row;"><div style="display: table-cell; padding: 2px 2px; text-align: centre;"><span style="`;
        output += `font-family: ` + Nations[outputCard.nation].titlefont + `; `;
        output += `font-style: normal; `;

        let titlefontsize = "1.4em";
        if (outputCard.title.length > 12) {
            titlefontsize = "1em";
        }

        output += `font-size: ` + titlefontsize + `; `;
        output += `line-height: 1.2em; font-weight: strong; `;
        output += `color: ` + Nations[outputCard.nation].fontColour + `; `;
        output += `text-shadow: none; `;
        output += `">`+ outputCard.title + `</span><br /><span style="`;
        output += `font-family: Arial; font-variant: normal; font-size: 13px; font-style: normal; font-weight: bold; `;
        output += `color: ` +  Nations[outputCard.nation].fontColour + `; `;
        output += `">` + outputCard.subtitle + `</span></div></div></div>`;

        //body of card
        output += `<div style="display: table-row-group; ">`;

        let inline = 0;

        for (let i=0;i<outputCard.body.length;i++) {
            let out = "";
            let line = outputCard.body[i];
            if (!line || line === "") {continue};
            if (line.includes("[INLINE")) {
                let end = line.indexOf("]");
                let substring = line.substring(0,end+1);
                let num = substring.replace(/[^\d]/g,"");
                if (!num) {num = 1};
                line = line.replace(substring,"");
                out += `<div style="display: table-row; background: #FFFFFF;; `;
                out += `"><div style="display: table-cell; padding: 0px 0px; font-family: Arial; font-style: normal; font-weight: normal; font-size: 14px; `;
                out += `"><span style="line-height: normal; color: #000000; `;
                out += `"> <div style='text-align: centre; display:block;'>`;
                out += line + " ";

                for (let q=0;q<num;q++) {
                    let info = outputCard.inline[inline];
                    out += `<a style ="background-color: ` + Nations[outputCard.nation].backgroundColour + `; padding: 5px;`
                    out += `color: ` + Nations[outputCard.nation].fontColour + `; text-align: centre; vertical-align: middle; border-radius: 5px;`;
                    out += `border-color: ` + Nations[outputCard.nation].borderColour + `; font-family: Tahoma; font-size: x-small; `;
                    out += `"href = "` + info.action + `">` + info.phrase + `</a>`;
                    inline++;                    
                }
                out += `</div></span></div></div>`;
            } else {
                line = line.replace(/\[hr(.*?)\]/gi, '<hr style="width:95%; align:centre; margin:0px 0px 5px 5px; border-top:2px solid $1;">');
                line = line.replace(/\[\#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})\](.*?)\[\/[\#]\]/g, "<span style='color: #$1;'>$2</span>"); // [#xxx] or [#xxxx]...[/#] for color codes. xxx is a 3-digit hex code
                line = line.replace(/\[[Uu]\](.*?)\[\/[Uu]\]/g, "<u>$1</u>"); // [U]...[/u] for underline
                line = line.replace(/\[[Bb]\](.*?)\[\/[Bb]\]/g, "<b>$1</b>"); // [B]...[/B] for bolding
                line = line.replace(/\[[Ii]\](.*?)\[\/[Ii]\]/g, "<i>$1</i>"); // [I]...[/I] for italics
                let lineBack = (i % 2 === 0) ? "#D3D3D3" : "#EEEEEE";
                out += `<div style="display: table-row; background: ` + lineBack + `;; `;
                out += `"><div style="display: table-cell; padding: 0px 0px; font-family: Arial; font-style: normal; font-weight: normal; font-size: 14px; `;
                out += `"><span style="line-height: normal; color: #000000; `;
                out += `"> <div style='text-align: centre; display:block;'>`;
                out += line + `</div></span></div></div>`;                
            }
            output += out;
        }

        //buttons
        if (outputCard.buttons.length > 0) {
            for (let i=0;i<outputCard.buttons.length;i++) {
                let out = "";
                let info = outputCard.buttons[i];
                out += `<div style="display: table-row; background: #FFFFFF;; `;
                out += `"><div style="display: table-cell; padding: 0px 0px; font-family: Arial; font-style: normal; font-weight: normal; font-size: 14px; `;
                out += `"><span style="line-height: normal; color: #000000; `;
                out += `"> <div style='text-align: centre; display:block;'>`;
                out += `<a style ="background-color: ` + Nations[outputCard.nation].backgroundColour + `; padding: 5px;`
                out += `color: ` + Nations[outputCard.nation].fontColour + `; text-align: centre; vertical-align: middle; border-radius: 5px;`;
                out += `border-color: ` + Nations[outputCard.nation].borderColour + `; font-family: Tahoma; font-size: x-small; `;
                out += `"href = "` + info.action + `">` + info.phrase + `</a></div></span></div></div>`;
                output += out;
            }
        }

        output += `</div></div><br />`;
        sendChat("",output);
        outputCard = {title: "",subtitle: "",nation: "",body: [],buttons: [],};
    }


    const LoadPage = () => {
        //build Page Info and flesh out Hex Info
        pageInfo.page = getObj('page', Campaign().get("playerpageid"));
        pageInfo.name = pageInfo.page.get("name");
        pageInfo.scale = pageInfo.page.get("snapping_increment");
        pageInfo.width = pageInfo.page.get("width") * 70;
        pageInfo.height = pageInfo.page.get("height") * 70;

        HexInfo.directions = {
            "Northeast": new Hex(1, -1, 0),
            "East": new Hex(1, 0, -1),
            "Southeast": new Hex(0, 1, -1),
            "Southwest": new Hex(-1, 1, 0),
            "West": new Hex(-1, 0, 1),
            "Northwest": new Hex(0, -1, 1),
        }

        let edges = findObjs({_pageid: Campaign().get("playerpageid"),_type: "path",layer: "map",stroke: "#d5a6bd",});
        let c = pageInfo.width/2;
        for (let i=0;i<edges.length;i++) {
            edgeArray.push(edges[i].get("left"));
        }
        if (edgeArray.length === 0) {
            sendChat("","Add Edge(s) to map and reload API");
            return;
        } else if (edgeArray.length === 1) {
            if (edgeArray[0] < c) {
                edgeArray.push(pageInfo.width)
            } else {
                edgeArray.unshift(0);
            }
        } else if (edgeArray.length === 2) {
            edgeArray.sort();
        } else if (edgeArray.length > 2) {
            sendChat("","Error with > 2 edges, Fix and Reload API");
            return
        }
    }
    
    const Linear = (polygon) => {
        //adds linear obstacles, eg Ridgelines
        let vertices = polygon.vertices;
        for (let i=0;i<(vertices.length - 1);i++) {
            let hexes = [];
            let pt1 = vertices[i];
            let pt2 = vertices[i+1];
            let hex1 = pointToHex(pt1);
            let hex2 = pointToHex(pt2);
            hexes = hex1.linedraw(hex2);
            for (let j=0;j<hexes.length;j++) {
                let hex = hexes[j];
                let hexLabel = hex.label();
                if (!hexMap[hexLabel]) {continue};
                if (hexMap[hexLabel].terrain.includes(polygon.name) === false) {
                    hexMap[hexLabel].terrain.push(polygon.name);
                    hexMap[hexLabel].terrainIDs.push(polygon.id);
                    if (polygon.blocksLOS === true) {
                        hexMap[hexLabel].losBlocked = true;
                    }
                    hexMap[hexLabel].height = Math.max(hexMap[hexLabel].height,polygon.height);
                    hexMap[hexLabel].cover = Math.min(hexMap[hexLabel].cover,polygon.cover);
                }
            }
        }
    }

    const BuildMap = () => {
        let startTime = Date.now();
        hexMap = {};
        //builds a hex map, assumes Hex(V) page setting
        let halfToggleX = HexInfo.halfX;
        let rowLabelNum = 0;
        let columnLabel = 1;
        let startX = 37.5992809922301;
        let startY = 43.8658278242683;

        for (let j = startY; j <= pageInfo.height;j+=ySpacing){
            let rowLabel = rowLabels[rowLabelNum];
            for (let i = startX;i<= pageInfo.width;i+=xSpacing) {
                let point = new Point(i,j);     
                let label = (rowLabel + columnLabel).toString(); //id of hex
                let hexInfo = {
                    id: label,
                    centre: point,
                    terrain: [], //array of names of terrain in hex
                    terrainIDs: [], //used to see if tokens in same building or such
                    tokenIDs: [], //ids of tokens in hex
                    elevation: 0, //based on hills
                    height: 0, //height of top of terrain over elevation
                    los: 0,
                    cover: 0,
                    move: 0,
                    obstacle: 0,
                    smoke: false,
                    smokeGrenade: false,
                    coverID: "", //track ID of light cover in case > 3
                };
                hexMap[label] = hexInfo;
                columnLabel += 2;
            }
            startX += halfToggleX;
            halfToggleX = -halfToggleX;
            rowLabelNum += 1;
            columnLabel = (columnLabel % 2 === 0) ? 1:2; //swaps odd and even
        }

        BuildTerrainArray();

        let keys = Object.keys(hexMap);
        const burndown = () => {
            let key = keys.shift();
            if (key){
                let c = hexMap[key].centre;
                if (c.x >= edgeArray[1] || c.x <= edgeArray[0]) {
                    //Offboard
                    hexMap[key].terrain = ["Offboard"];
                } else {
                    let temp = DeepCopy(hexMap[key]);
                    let taKeys = Object.keys(TerrainArray);
                    for (let t=0;t<taKeys.length;t++) {
                        let polygon = TerrainArray[taKeys[t]];
                        if (temp.terrain.includes(polygon.name)) {continue};
                        let check = false;
                        let pts = [];
                        pts.push(c);
                        pts = XHEX(pts);
                        let num = 0;
                        for (let i=0;i<5;i++) {
                            check = pointInPolygon(pts[i],polygon);
                            if (check === true) {num ++};
                        }
                        if (num > 2) {
                            temp.terrain.push(polygon.name);
                            temp.terrainIDs.push(polygon.id);
                            temp.los = Math.max(temp.los,polygon.los);
                            temp.cover = Math.max(temp.cover,polygon.cover);
                            temp.move = Math.max(temp.move,polygon.move);
                            temp.obstacle = Math.max(temp.obstacle,polygon.obstacle);
                            if (polygon.name.includes("Hill")) {
                                temp.elevation = Math.max(temp.elevation,polygon.height);
                                temp.height = Math.max(temp.elevation,polygon.height)
                            } else {
                                temp.height = Math.max(temp.height,polygon.height);
                            };
                            if (polygon.cover === 2) {
                                temp.coverID = polygon.id
                            }
                        };
                    };
                    if (temp.terrain.length === 0) {
                        temp.terrain.push("Open Ground");
                    }
                    hexMap[key] = temp;
                }
                setTimeout(burndown,0);
            }
        }
        burndown();

        let elapsed = Date.now()-startTime;
        log("Hex Map Built in " + elapsed/1000 + " seconds");
        //add tokens to hex map, rebuild Team/Unit Arrays
        TA();
    }


//Shock tokens

    const TA = () => {
        //add tokens on map into various arrays
        ModelArray = {};
        TeamArray = {};
        SectionArray = {};
        //create an array of all tokens
        let start = Date.now();
        let tokens = findObjs({
            _pageid: Campaign().get("playerpageid"),
            _type: "graphic",
            _subtype: "token",
            layer: "objects",
        });

        let c = tokens.length;
        let s = (1===c?'':'s');     
        tokens.forEach((token) => {
            let character = getObj("character", token.get("represents"));           
            if (character === null || character === undefined) {return};
            let nation = Attribute(character,"nation");
            let info = decodeURIComponent(token.get("gmnotes")).toString();
            if (!info) {return};
            info = info.split(";");
            let player = (Allies.includes(nation)) ? 0:1;
            let core = info[0]
            let sectionName = info[1];
            let sectionID = info[2];
            let section = SectionArray[sectionID];
            let teamName = info[3];
            let teamID = info[4];
            let team = TeamArray[teamID];
            if (!section) {
                section = new Section(player,nation,sectionID,sectionName,core);
            }
            if (!team) {
                team = new Team(player,nation,teamID,teamName,sectionID);
                let markers = token.get("statusmarkers");
                let teamMarker = Nations[nation].platoonmarkers.filter(value => Nations[nation].platoonmarkers.includes(value));
                team.symbol = teamMarker;
            }
            let model = new Model(token.id,sectionID,teamID,player,true);
            team.add(model);
        });


        let elapsed = Date.now()-start;
        log(`${c} token${s} checked in ${elapsed/1000} seconds - ` + Object.keys(ModelArray).length + " placed in Model Array");
    }


//Linear
    const BuildTerrainArray = () => {
        TerrainArray = {};
        //first look for graphic lines outlining hills etc
        let paths = findObjs({_pageid: Campaign().get("playerpageid"),_type: "path",layer: "map"});
        paths.forEach((pathObj) => {
            let vertices = [];
            toFront(pathObj);
            let colour = pathObj.get("stroke").toLowerCase();
            let t = TerrainInfo[colour];
            if (!t) {return};  
            let path = JSON.parse(pathObj.get("path"));
            let centre = new Point(pathObj.get("left"), pathObj.get("top"));
            let w = pathObj.get("width");
            let h = pathObj.get("height");
            let rot = pathObj.get("rotation");
            let scaleX = pathObj.get("scaleX");
            let scaleY = pathObj.get("scaleY");

            //covert path vertices from relative coords to actual map coords
            path.forEach((vert) => {
                let tempPt = getAbsoluteControlPt(vert, centre, w, h, rot, scaleX, scaleY);
                if (isNaN(tempPt.x) || isNaN(tempPt.y)) {return}
                vertices.push(tempPt);            
            });
            let id = stringGen();
            if (TerrainArray[id]) {
                id += stringGen();
            }
            let info = {
                name: t.name,
                id: id,
                vertices: vertices,
                centre: centre,
                height: t.height,
                cover: t.cover,
                los: t.los,
                move: t.move,
                obstacle: t.obstacle,
            };
            TerrainArray[id] = info;
        });
        //add tokens on map eg woods, crops
        let mta = findObjs({_pageid: Campaign().get("playerpageid"),_type: "graphic",_subtype: "token",layer: "map",});
        mta.forEach((token) => {
            let truncName = token.get("name").replace(/[0-9]/g, '');
            truncName = truncName.trim();
            let t = MapTokenInfo[truncName];
            if (!t) {return};
            let vertices = TokenVertices(token);
            let centre = new Point(token.get('left'),token.get('top'));
            let id = stringGen();
            if (TerrainArray[id]) {
                id += stringGen();
            }
            let info = {
                name: t.name,
                id: id,
                vertices: vertices,
                centre: centre,
                height: t.height,
                cover: t.cover,
                los: t.los,
                move: t.move,
                obstacle: t.obstacle,
            };
            TerrainArray[id] = info;
        });
    };


    const Naming = (charName,nation,rank,crew) => {
        //checks if rank name already in character name on sheet, otherwise assigns based on nation and rank level on sheet
        let AllRanks = ["Obergefreiter","Unteroffizier","Leutnant","Hauptmann","Serzhant","Leytenant","Kapitan","Corporal","Sergeant","Platoon Sgt.","Lieutenant","Captain"];
        let NationRanks = {
            "Germany": ["Pvt.","Obergefreiter ","Unteroffizier ","Leutnant ","Hauptmann "],
            "Soviet": ["Pvt.","Serzhant ","Serzhant ","Leytenant ","Kapitan "],
            "USA": ["Pvt.","Sergeant ","Platoon Sgt. ","Lieutenant ","Captain "],
            "UK": ["Pvt.","Sergeant ","Platoon Sgt. ","Lieutenant ","Captain "],
        };
        let rankName = "";
        for (let i=0;i<AllRanks.length;i++) {
            r = AllRanks[i];
            if (charName.includes(r)) {
                rankName = r + " ";
                break;
            }
        }
        if (rankName === "") {
            rankName = NationRanks[nation][rank];
        }
        let name = rankName + Surname(nation);
        if (crew === true) {
            name = "Cpl. " + Surname(nation) + " Crew";
        } 

        return name;
    }

	const Surname = (nat) => {
	    let num = randomInteger(25) - 1
	    let names = {
	        Germany: ["Schmidt","Schneider","Fischer","Weber","Meyer","Wagner","Becker","Schulz","Hoffmann","Bauer","Richter","Klein","Wolf","Schroder","Neumann","Schwarz","Braun","Hofmann","Werner","Krause","Konig","Lang","Vogel","Frank","Beck"],
	        Soviet: ["Ivanov","Smirnov","Petrov","Sidorov","Popov","Vassiliev","Sokolov","Novikov","Volkov","Alekseev","Lebedev","Pavlov","Kozlov","Orlov","Makarov","Nikitin","Zaitsev","Golubev","Tarasov","Ilyin","Gusev","Titov","Kuzmin","Kiselyov","Belov"],
	        USA: ["Smith","Johnson","Williams","Brown","Jones","Wright","Miller","Davis","Wilson","Anderson","Thomas","Taylor","Moore","Jackson","Martin","Lee","Thompson","White","Harris","Clark","Lewis","Robinson","Walker","Young","Allen"],
	        UK: ["Smith","Jones","Williams","Taylor","Davies","Brown","Wilson","Evans","Thomas","Johnson","Roberts","Walker","Wright","Robinson","Thompson","White","Hughes","Edwards","Green","Lewis","Wood","Harris","Martin","Jackson","Clarke"],
	    }
	    let nameList = names[nat]
	    let surname = nameList[num]
	    return surname	
	}


    const LOS = (id1,id2,special) => {

//need to add other models into LOS that might block LOS

        if (!special) {special = " "};
        let model1 = ModelArray[id1];
        let team1 = TeamArray[model1.teamID];
        let model2 = ModelArray[id2];       
        let team2 = TeamArray[model2.teamID];

        if (!model1 || !model2) {
            let info = (!model1) ? "Model 1":"Model2";
            sendChat("",info + " is not in Model Array");
            let result = {
                los: false,
                cover: 0,
                distance: -1,
                phi: 0,
            }
            return result
        }

        let md = ModelDistance(model1,model2);

        let distanceT1T2 = md.distance * MapScale; //in feet
        let hex1 = hexMap[md.hex1.label()];
        let hex2 = hexMap[md.hex2.label()];
        let los = true;


        let cover = hex2.cover;
log("Model 2 Hex Cover: " + cover);
        let model1Height = modelHeight(model1);
        let model2Height = modelHeight(model2);
log("Team1 H: " + model1Height)
log("Team2 H: " + model2Height)
        let modelLevel = Math.min(model1Height,model2Height);
        model1Height -= modelLevel;
        model2Height -= modelLevel;

        let interHexes = md.hex1.linedraw(md.hex2); 
        //uses closest hexes
        //interHexes will be hexes between shooter and target, not including their hexes or closest hexes for large tokens
        let lightCovers = [];

        let theta = md.hex1.angle(md.hex2);
        let phi = Angle(theta - model1.token.get('rotation')); //angle from shooter to target taking into account shooters direction
log("Base Level: " + modelLevel)
        let sameTerrain = findCommonElements(hex1.terrainIDs,hex2.terrainIDs);
        let lastElevation = model1Height;

        if (sameTerrain === true) {
            //in same Terrain
            if ((hex1.los === 1 && distanceT1T2 > 60) || (hex1.los === 2 && distanceT1T2 > 40)) {
log("In same terrain, distance > allowed")
                let result = {
                    los: false,
                    cover: 0,
                    distance: -1,
                    phi: 0
                }
                return result;
            }
        }

        let openFlag = (hex1.los === 0) ? true:false;
        let partialHexes = 0;
        let partialFlag = false;
        if (hex1.los === 1 || hex1.los === 2) {
            partialFlag = true;
            partialHexes += hex1.los + 1;
        }
log("Initial Open Flag: " + openFlag);
log("Initial Partial Flag: " + partialFlag);

        for (let i=1;i<interHexes.length;i++) {
            //0 is tokens own hex
            let qrs = interHexes[i];
            let interHex = hexMap[qrs.label()];

log(i + ": " + qrs.label());
log(interHex.terrain);
log("Interhex Cover: " + interHex.cover);
log("Blocks LOS? " + interHex.los)
            let interHexElevation = parseInt(interHex.elevation) - modelLevel
            let interHexHeight = parseInt(interHex.height);
            let B;
            if (model1Height > model2Height) {
                B = (distanceT1T2 - (i* MapScale)) * model1Height / distanceT1T2;

            } else if (model1Height <= model2Height) {
                B = i* MapScale * model2Height / distanceT1T2;
            }
log("InterHex Height: " + interHexHeight);
log("InterHex Elevation: " + interHexElevation);
log("Last Elevation: " + lastElevation);
log("B: " + B)
            if (interHexElevation < lastElevation && lastElevation > model1Height && lastElevation > model2Height) {
log("Intervening Higher Terrain");
                los = false;
                break;
            }            
            lastElevation = interHexElevation;

            if (interHexHeight + interHexElevation >= B) {
log("Terrain higher than B")
                if (interHex.cover === 2 && cover < 3 && i > 1) {
log("Hex CoverID: " + interHex.coverID);
                    if (lightCovers.includes(interHex.coverID) === false) {
                        lightCovers.push(interHex.coverID);
                    }
log(lightCovers)
                    if (cover === 2 && lightCovers.length > 2) {
                        cover = 3;
                    } else {
                        cover = 2;
                    }
                }
                if (interHex.cover === 3 && cover < 3 && i > 1) {
                    cover = 3;
                }
                //cover 1 and 4 are only for hex the model is in
                if (interHex.los === 3 && i<(interHexes.length - 1)) {
log("Intervening LOS Blocking Terrain");
                    los = false;
                    break;
                } else if (interHex.los === 1 || interHex.los === 2) {
                    partialFlag = true;
                    partialHexes += interHex.los + 1;
log("Partial Hexes: " + partialHexes)
                    if (partialHexes > 12) {
                        log("Too Deep into Partial ")
                        los = false;
                        break;
                    }
                } else if (interHex.los === 0) {
                    if (openFlag === false) {
                        openFlag = true;
                        partialHexes = 0;
                        partialFlag = false;
                    } else if (openFlag === true) {
                        if (partialFlag === true) {
log("Other side of Partial LOS Blocking Terrain")
                            los = false;
                            break;
                        }
                    }
                } 
            } else {
log("Terrain less than B")
                //treated as open as looking into empty space above terrain
                if (openFlag === false) {
                    openFlag = true;
                    partialHexes = 0;
                    partialFlag = false;
                } else if (openFlag === true) {
                    if (partialFlag === true) {
log("Other side of Partial LOS Blocking Terrain")
                        los = false;
                        break;
                    }
                }
            }
            log("Open Flag: " + openFlag)
            log("Partial Flag: " + partialFlag)
            log("Cover at Hex: " + cover)
        }
        if (model2Height < lastElevation && lastElevation > model1Height && lastElevation > model2Height) {
log("Intervening Higher Terrain")
            los = false;
        }   

        if (hex2.los === 1 || hex2.los === 2) {
            partialHexes += hex2.los + 1;
log("Partial Hexes: " + partialHexes)
            if (partialHexes > 12) {
                log("Too Deep into Partial ")
                los = false;
            }
        }

        if (hex2.los === 0 && partialFlag === true) {
log("Other side of Partial LOS Blocking Terrain")
            los = false;
        }
    
        if (cover === 1) {
            if (model2.type === "Infantry" && model2.token.get(sm.moved) === false) {
                cover = 2;
            } else {
                cover = 0;
            }
        }

        if (team2.order === "Tactical") {
            cover += 1;
            if (cover === 1) {cover = 2};
        }

        let result = {
            los: los,
            cover: cover,
            distance: distanceT1T2,
            angle: phi,
        }
        return result;
    }

    const modelHeight = (model) => {
        //height of model based on terrain, with additional based on type
        let hex = hexMap[model.hexLabel];
        let height = parseInt(hex.elevation);
        if (model.type === "Infantry" || model.type === "Gun") {
            if (model.token.get(sm.floor2) === true) {
                height += 10;
            } else if (model.token.get(sm.floor3) === true) {
                height += 20;
            }
        } else if (model.type === "Vehicle") {
            height += 5;
        }
        return height;
    }


    const CheckLOS = (msg) => {
        let Tag = msg.content.split(";");
        let id1 = Tag[1];
        let model1 = ModelArray[id1];
        let id2 = Tag[2];
        let model2 = ModelArray[id2];
        let losResult = LOS(id1,id2);
        let covers = ["the Open","n/a","Light Cover","Hard Cover","a Bunker"]

        SetupCard("LOS","",model1.nation);
        if (losResult.los === false) {
            outputCard.body.push(model1.name + " has No LOS to " + model2.name);
        } else {
            outputCard.body.push(model1.name + " has LOS to " + model2.name);
            outputCard.body.push("Distance: " + losResult.distance + " feet");
            outputCard.body.push("Target is in " + covers[losResult.cover]);
        }

        PrintCard();
    }

    const TokenInfo = (msg) => {
        if (!msg.selected) {
            sendChat("","No Token Selected");
            return;
        };
        let id = msg.selected[0]._id;
        let model = ModelArray[id];
        if (!model) {
            sendChat("","Not in Model Array Yet");
            return;
        };
        let nation  = model.nation;
        if (!nation) {nation = "Neutral"};
        SetupCard(model.name,"Hex: " + model.hexLabel,nation);
        let h = hexMap[model.hexLabel];
        let terrain = h.terrain;
        terrain = terrain.toString();
        let elevation = modelHeight(model);
        let cover = h.cover;
        let team = TeamArray[model.teamID];
        let covers = ["the Open","Light Cover if Stationary","Light Cover","Hard Cover","a Bunker"]
        outputCard.body.push("Terrain: " + terrain);
        if (cover === 1 && model.type !== "Infantry") {
            cover = 0;
        }
        outputCard.body.push(model.name + " is in " + covers[cover]);
        outputCard.body.push("Elevation: " + elevation + " Feet");
        outputCard.body.push("[hr]");
        outputCard.body.push("Team: " + team.name);
        for (let i=0;i<team.modelIDs.length;i++) {
            let m = ModelArray[team.modelIDs[i]];
            outputCard.body.push(m.name);
        }


        PrintCard();
    }






    const ClearState = () => {
        //clear arrays
        ModelArray = {};
        TeamArray = {};
        SectionArray = {};
        //clear token info
        let tokens = findObjs({
            _pageid: Campaign().get("playerpageid"),
            _type: "graphic",
            _subtype: "token",
            layer: "objects",
        })
        tokens.forEach((token) => {
            if (token.get("name").includes("Jump Off Point") === true) {return};
            token.set({
                name: "",
                tint_color: "transparent",
                aura1_color: "transparent",
                aura1_radius: 0,
                showplayers_bar1: true,
                showname: true,
                showplayers_aura1: true,
                bar1_value: 0,
                bar1_max: "",
                gmnotes: "",
                statusmarkers: "",
            });                
        })

        RemoveDead("All");

        state.CoC = {
            nations: [[],[]],
            players: {},
            playerInfo: [[],[]],
            markers: [[],[]],
            lineArray: [],
            forceMorale: [0,0],
            CoCPoints: [0,0],
            commandDice: [5,5],
            unitnumbers: [0,0],
        }
        sendChat("","Cleared State/Arrays");
    }


    const RemoveDead = (info) => {
        let tokens = findObjs({
            _pageid: Campaign().get("playerpageid"),
            _type: "graphic",
            _subtype: "token",
            layer: "map",
        });
        tokens.forEach((token) => {
            if (token.get("status_dead") === true) {
                token.remove();
            }
            if (token.get("name").includes("Jump Off Point") && info === "All") {
                token.remove();
            }
        });
    }

    const UnitCreation = (msg) => {
        let Tag = msg.content.split(";");
        let unitComp = Tag[1]; //Squad of Teams, Team, Sr. Leader
        let sectionName = Tag[2];
        let teamName;
        let core = Tag[3];
        let tokenIDs = [];
        for (let i=0;i<msg.selected.length;i++) {
            tokenIDs.push(msg.selected[i]._id);
        }
        if (tokenIDs.length === 0) {return};
        let refToken = findObjs({_type:"graphic", id: tokenIDs[0]})[0];
        let refChar = getObj("character", refToken.get("represents")); 
        let nation = Attribute(refChar,"nation");
        let player = (Allies.includes(nation)) ? 0:1;
        let sectionID = stringGen();
        let statusNum = parseInt(state.CoC.unitnumbers[player]);
        statusNum += 1;
        state.CoC.unitnumbers[player] = statusNum;
        let statusmarkers = Nations[nation].platoonmarkers[statusNum];
        section = new Section(player,nation,sectionID,sectionName,core);
        if (unitComp === "Leader") {
            teamName = sectionName;
            let team = new Team(player,nation,stringGen(),sectionName,sectionID);
            let model = new Model(refToken.id,sectionID,team.id,player);
            team.add(model);
            section.add(team);
            let gmn = core + ";" + sectionName + ";" + sectionID + ";" + sectionName + ";" + team.id;
            model.token.set({
                name: model.name,
                tint_color: "transparent",
                aura1_color: colours.green,
                aura1_radius: 0.1,
                showplayers_bar1: true,
                showname: true,
                showplayers_aura1: true,
                bar1_value: team.initiative,
                showplayers_bar3: true,
                bar3_value: 0,
                gmnotes: gmn,
            });
            model.token.set("statusmarkers",statusmarkers);
        } else if (unitComp === "Team") {
            //solo Team, Tank etc
            teamName = sectionName;
            let team = new Team(player,nation,stringGen(),sectionName,sectionID);
            let gmn = core + ";" + sectionName + ";" + sectionID + ";" + sectionName + ";" + team.id;
            for (let i=0;i<tokenIDs.length;i++) {
                let model = new Model(tokenIDs[i],sectionID,team.id,false);
                team.add(model);
                let hp = 1;
                if (model.special.includes("Crew")) {
                    //should be "Crew of X"
                    let index = model.special.indexOf("Crew") + 8;
                    hp = parseInt(model.special.charAt(index));
                }            
                model.token.set({
                    name: model.name,
                    tint_color: "transparent",
                    showplayers_bar1: true,
                    showname: true,
                    bar1_value: hp,
                    showplayers_bar3: true,
                    bar3_value: 0,
                    gmnotes: gmn,
                });
                model.token.set("statusmarkers",statusmarkers);
            }
            section.add(team);
        } else if (unitComp === "Section") {
            //sort into units in squad based on spacing
            //when creating units, need to seperate each subunit on map
            let groups = [];
            let sortedIDs = [];
            for (let i=0;i<tokenIDs.length;i++) {
                let id = tokenIDs[i];
                let m1 = ModelArray[id];
                if (sortedIDs.includes(id)) {continue};
                //check if adjacent to a team in existing group
                sortLoop1:
                for (let j=0;j<groups.length;j++) {
                    let group = groups[j];
                    for (let k=0;k<group.length;k++) {
                        let id2 = group[k];
                        let m2 = ModelArray[id2];
                        let dist = ModelDistance(m1,m2).distance;
                        if (dist >= 1) {continue};
                        sortedIDs.push(id);
                        groups[j].push(id);
                        break sortLoop1
                    }
                }
                if (sortedIDs.includes(id)) {continue};
                //check if any adjacent teams which will be themselves unsorted
                //if so, the 2 form a group
                //if not, id becomes its own group
                for (let j=0;j<tokenIDs.length;j++) {
                    let id2 = tokenIDs[j];
                    let m2 = ModelArray[id2];
                    if (id2 === id) {continue};
                    let dist = ModelDistance(m1,m2).distance;
                    if (dist >= 1) {continue};
                    sortedIDs.push(id);
                    sortedIDs.push(id2);
                    groups.push([id,id2]);
                    break;
                }
                if (sortedIDs.includes(id)) {continue};
                groups.push([id]);
            }

            //now sort into "Teams" and Jr. Leaders
            for (let i=0;i<groups.length;i++) {
                let group = groups[i];
                let letters = ["A","B","C","D","E","F","G"];
                let teamName = sectionName + "/" + letters[i];
                let team = new Team(player,nation,stringGen(),sectionName,sectionID);
                let gmn = core + ";" + sectionName + ";" + sectionID + ";" + teamName + ";" + team.id;
/////work from here
                let teamID = team.id;
                let nco = false;
                for (let j=0;j<group.length;j++) {
                    let base = BaseArray[group[j]];
                    let name = base.charName;
                    let hp = parseInt(base.token.get("currentSide")) + 1; //# men in token
                    if (base.rank > 0) {
                        name = OfficerName(base);
                        nco = true;
                        hp = base.initiative;
                        tName = name;
                    } else {
                        for (let c=0;c<CharacterCountries.length;c++) {
                            let cName = CharacterCountries[c];
                            if (name.includes(cName)) {
                                name = name.replace(cName,"");
                            }
                        }
                        tName = name;
                        if (group.length > 1) {
                            name += "/" + (j+1);
                        }
                    }
                    base.name = name;                    
                    base.token.set({
                        name: name,
                        tint_color: "transparent",
                        showplayers_bar1: true,
                        showname: true,
                        showplayers_bar3: true,
                        bar3_value: 0,
                        bar1_value: hp,
                    })
                    if (nco === true || j === 0) {
                        base.token.set({
                            aura1_color: colours.green,
                            aura1_radius: 0.1,
                            showplayers_aura1: true,
                        })
                    }
                    base.token.set("statusmarkers",statusmarkers);
                    team.bases.push(base.id);
                    if (nco === true) {
                        unit.nco = base.id;
                        team.leader = true;
                    }
                    team.name = tName;
                    if (base.special.includes("Crew")) {
                        team.crew = true;
                    }
                    let gmn = tName + ";" + teamID + ";" +  unitName + ";" + unit.id + ";" + core;
                    base.token.set("gmnotes",gmn);
                    base.unitID = unit.id;
                    base.teamID = team.id;
                    unit.add(team);
                }
            }
        }





    }


    const changeGraphic = (tok,prev) => {
        if (tok.get('subtype') === "token") {
            //RemoveLines();
            log(tok.get("name") + " moving");
            if ((tok.get("left") !== prev.left) || (tok.get("top") !== prev.top)) {
                let model = ModelArray[tok.id];
                if (!model) {return};
                let oldHex = model.hex;
                let oldHexLabel = model.hexLabel;
                let newLocation = new Point(tok.get("left"),tok.get("top"));
                let newHex = pointToHex(newLocation);
                let newHexLabel = newHex.label();
                newLocation = hexToPoint(newHex); //centres it in hex
                //let newRotation = oldHex.angle(newHex);
                tok.set({
                    left: newLocation.x,
                    top: newLocation.y,
                });
                model.hex = newHex;
                model.hexLabel = newHexLabel;
                model.location = newLocation;
                let index = hexMap[oldHexLabel].tokenIDs.indexOf(tok.id);
                if (index > -1) {
                    hexMap[oldHexLabel].tokenIDs.splice(index,1);
                }
                hexMap[newHexLabel].tokenIDs.push(tok.id);
                if (model.size === "Large") {
                    model.vertices = TokenVertices(tok);
                    LargeTokens(model);
                }
            };
        };
    };











/*
    const destroyGraphic = (tok) => {
        if (tok.get('subtype') === "token") {
            let model = ModelArray[tok.id];
            if (!model) {return};
            model.kill();
        }
    }
*/


    const handleInput = (msg) => {
        if (msg.type !== "api") {
            return;
        }
        let args = msg.content.split(";");
        log(args);
        switch(args[0]) {
            case '!Dump':
                log("STATE");
                log(state.CoC);
                log("Terrain Array");
                log(TerrainArray);
                log("Hex Map");
                log(hexMap);
                log("Model Array");
                log(ModelArray);
                log("Team Array");
                log(TeamArray);
                log("Section Array");
                log(SectionArray);
                break;
            case '!TokenInfo':
                TokenInfo(msg);
                break;
            case '!CheckLOS':
                CheckLOS(msg);
                break;
            case '!ClearState':
                ClearState();
                break;
            case '!StartNew':
                StartNewGame(msg);
                break;
            case '!Lockdown':
                Lockdown(msg);
                break;
            case '!AddAbilities':
                AddAbilities(msg);
                break;
            case '!SetJumpOff':
                SetJumpOff(msg);
                break;
            case '!StartGame':
                StartGame();
                break;
            case '!Roll':
                RollD6(msg);
                break;
            case '!CommandDice':
                CommandDice(msg);
                break;
            case '!UnitCreation':
                UnitCreation(msg);
                break;
            case '!Activate':
                UnitActivation(msg);
                break;
            case '!Order':
                Order(msg);
                break;
            case '!LeaderSelf':
                LeaderSelf(msg);
                break;
            case '!Rejoin':
                Rejoin(msg);
                break;
            case '!LeaderJoin':
                LeaderJoin(msg);
                break;
            case '!FinalizeMarker':
                FinalizeMarker(msg);
                break;
            case '!Fire':
                Fire(msg);
                break;
        }
    };


    const registerEventHandlers = () => {
        on('chat:message', handleInput);
        on('change:graphic',changeGraphic);
        //on('destroy:graphic',destroyGraphic);
    };

    on('ready', () => {
        log("===> Chain of Command <===");
        log("===> Software Version: " + version + " <===");
        LoadPage();
        BuildMap();
        registerEventHandlers();
        sendChat("","API Ready, Map Loaded")
        log("On Ready Done")
    });
    return {
        // Public interface here
    };
})();
