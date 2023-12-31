const CoC = (() => { 
    const version = '1.9.27';
    if (!state.CoC) {state.CoC = {}};

    const pageInfo = {name: "",page: "",gridType: "",scale: 0,width: 0,height: 0};
    const rowLabels = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","AA","BB","CC","DD","EE","FF","GG","HH","II","JJ","KK","LL","MM","NN","OO","PP","QQ","RR","SS","TT","UU","VV","WW","XX","YY","ZZ","AAA","BBB","CCC","DDD","EEE","FFF","GGG","HHH","III","JJJ","KKK","LLL","MMM","NNN","OOO","PPP","QQQ","RRR","SSS","TTT","UUU","VVV","WWW","XXX","YYY","ZZZ"];

    let TerrainArray = {};
    let ModelArray = {}; //Individual Models, Tanks etc
    let TeamArray = {}; //Teams of Models
    let SectionArray = {}; //to track sections of teams
    let PatrolArray = []; //ids of patrol models
    let CommandDiceArray = [];
    let InfoPoints = [[],[]];

    let hexMap = {}; 
    let edgeArray = [];
    const DIRECTIONS = ["Northeast","East","Southeast","Southwest","West","Northwest"];



    const Colours = {
        green: "#00ff00",
        lightblue: "#00ffff",
        purple: "#800080",
        brown: "#980000",
        red: "#ff0000",
        yellow: "#ffff00",
        orange: "#ff9900",
        darkblue: "#0000ff",
        lightpurple: "#ff00ff",
        black: "#000000",
    }

    const SM = {
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

    const MoralePics = ["https://s3.amazonaws.com/files.d20.io/images/361150399/XPRXFgQ6d6eqInWRlt-SKQ/thumb.png?1696039919","https://s3.amazonaws.com/files.d20.io/images/361150403/FudXeFi6g_PIau8vsM3Ing/thumb.png?1696039919","https://s3.amazonaws.com/files.d20.io/images/361150405/mzuVuU9G6aTS3Q7aMQu-5A/thumb.png?1696039919","https://s3.amazonaws.com/files.d20.io/images/361150401/yY8W-GmkEyuahCwLNKLegA/thumb.png?1696039919","https://s3.amazonaws.com/files.d20.io/images/361150400/PXDMjMztWr_Seb_mJqXC2w/thumb.png?1696039919","https://s3.amazonaws.com/files.d20.io/images/361150404/1iYSySfxjf8Gfh8MrZgjPg/thumb.png?1696039919","https://s3.amazonaws.com/files.d20.io/images/361150402/TiZ9ZyEzGrCRm34nbkDUkA/thumb.png?1696039919","https://s3.amazonaws.com/files.d20.io/images/361150373/jREeUbCi3KVxuyzADd0jnw/thumb.png?1696039911","https://s3.amazonaws.com/files.d20.io/images/361150374/EO212vyxAFxTs4iXeiLTig/thumb.png?169603991","https://s3.amazonaws.com/files.d20.io/images/361150350/lzY6Koc2Lr54zEUnXFcxEA/thumb.png?1696039902","https://s3.amazonaws.com/files.d20.io/images/361150340/O8Vuc8FzxTiRA-epDZcomQ/thumb.png?1696039899","https://s3.amazonaws.com/files.d20.io/images/361150334/j5-rxZbbCxfaWVDImo8vVw/thumb.png?1696039895"];

    const Axis = ["Germany","Italy","Japan"];
    const Allies = ["Soviet","USA","UK","Canada"];

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
            "teammarkers": ["letters_and_numbers0099::4815235","letters_and_numbers0100::4815236","letters_and_numbers0101::4815237","letters_and_numbers0102::4815238","letters_and_numbers0103::4815239","letters_and_numbers0104::4815240","letters_and_numbers0105::4815241","letters_and_numbers0106::4815242","letters_and_numbers0107::4815243","letters_and_numbers0108::4815244"],       
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
            "teammarkers": ["letters_and_numbers0197::4815333","letters_and_numbers0198::4815334","letters_and_numbers0199::4815335","letters_and_numbers0200::4815336","letters_and_numbers0201::4815337","letters_and_numbers0202::4815338","letters_and_numbers0203::4815339","letters_and_numbers0204::4815340","letters_and_numbers0205::4815341","letters_and_numbers0206::4815342"],   
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
            "teammarkers": ["letters_and_numbers0148::4815284","letters_and_numbers0149::4815285","letters_and_numbers0150::4815286","letters_and_numbers0151::4815287","letters_and_numbers0152::4815288","letters_and_numbers0153::4815289","letters_and_numbers0154::4815290","letters_and_numbers0155::4815291","letters_and_numbers0156::4815292","letters_and_numbers0157::4815293"],
        },
        "USA": {
            "image": "https://s3.amazonaws.com/files.d20.io/images/327595663/Nwyhbv22KB4_xvwYEbL3PQ/thumb.png?1676165491",
            "backgroundColour": "#FFFFFF",
            "dice": "USA",
            "titlefont": "Arial",
            "fontColour": "#006400",
            "borderColour": "#006400",
            "borderStyle": "5px double",
            "overwatch": "",
            "covering": "",
            "teammarkers": ["letters_and_numbers0050::4815186","letters_and_numbers0051::4815187","letters_and_numbers0052::4815188","letters_and_numbers0053::4815189","letters_and_numbers0054::4815190","letters_and_numbers0055::4815191","letters_and_numbers0056::4815192","letters_and_numbers0057::4815193","letters_and_numbers0058::4815194","letters_and_numbers0059::4815195"],
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
        "#000000": {name: "Hill 1", height: 10,los: 0,cover: 0,move: 0,obstacle: 0,linear: false},
        "#434343": {name: "Hill 2", height: 20,los: 0,cover: 0,move: 0,obstacle: 0,linear: false},    

        "#00ff00": {name: "Woods", height: 60,los: 2, cover: 2, move: 1, obstacle: 0,linear: false},
        "#93c47d": {name: "Orchard", height: 25, los: 1, cover: 2, move: 1, obstacle: 0,linear: false},
        "#b6d7a8": {name: "Scrub", height: 5, los: 1, cover: 2, move: 1, obstacle: 0,linear: false},
        "#a61c00": {name: "Pit", height: 0, los: 0, cover: 3, move: 1, obstacle: 0,linear: false},

        "#ffffff": {name: "Ridgeline", height: 5, los: 0, cover: 3, move: 0, obstacle: 0,linear: true},

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
        "Tree": {name: "Tree",height: 50,los: 1,cover: 2,move: 1,obstacle: 0},
        
        "Trench": {name: "Trench",height: 0,los: 0,cover: 3,move: 1,obstacle: 0},

        "Ruins": {name: "Ruins",height: 5,los: 2,cover: 3,move: 1,obstacle: 0,linear: false},
        "Stone Building A": {name: "Stone Building",height: 15,los: 3,cover: 3,move: 1,obstacle: 0},
        "Stone Building B": {name: "Stone Building",height: 25,los: 3,cover: 3,move: 1,obstacle: 0},
        "Wood Building A": {name: "Wood Building",height: 15,los: 3,cover: 2,move: 1,obstacle: 0},
        "Wood Building B": {name: "Wood Building",height: 25,los: 3,cover: 2,move: 1,obstacle: 0},
        "Short Hedge": {name: "Short Hedge",height: 3,los: 0,cover: 2,move: 0, obstacle: 1},
        "Short Wall": {name: "Short Wall",height: 3,los: 0,cover: 3,move: 0, obstacle: 1},
        "Medium Hedge": {name: "Medium Hedge",height: 5,los: 3,cover: 2,move: 0, obstacle: 2},
        "Medium Wall": {name: "Medium Wall",height: 5,los: 3,cover: 3,move: 0, obstacle: 2},
        "Tall Hedge": {name: "Tall Hedge",height: 10,los: 3,cover: 2,move: 0, obstacle: 3},
        "Tall Wall": {name: "Tall Wall",height: 10,los: 3,cover: 3,move: 0, obstacle: 3},
        "Bocage": {name: "Bocage",height: 10,los: 3,cover: 3,move: 0, obstacle: 3},


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

    const returnCommonElements = (array1,array2) => {
        return array1.filter(value => array2.includes(value));
    }

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

    const xSpacing = 75.1985619844599;
    const ySpacing = 66.9658278242677;

    const HexInfo = {
        size: {
            x: xSpacing/Math.sqrt(3),
            y: ySpacing * 2/3,
        },
        pixelStart: {
            x: xSpacing/2,
            y: 43.8658278242683,
        },
        halfX: xSpacing/2,
        width: xSpacing,
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
        constructor(player,nation,sectionID,sectionName,core,sectionColour) {
            if (!sectionID) {
                sectionID = stringGen();
            }
            this.id = sectionID;
            this.name = sectionName;
            this.player = player;
            this.nation = nation;
            this.teamIDs = [];
            this.core = core;
            this.colour = sectionColour; //different sections

            SectionArray[sectionID] = this;
        }

        add(team) {
            if (this.teamIDs.includes(team.id) === false) {
                this.teamIDs.push(team.id);
                team.sectionID = this.id;
            }
        }

        remove(team) {
            let index = this.teamIDs.indexOf(team.id);
            if (index > -1) {
                this.teamIDs.splice(index,1);
            }
            if (this.teamIDs.length === 0) {
                delete SectionArray[this.id];
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
            this.type = "";
            this.sectionID = sectionID;
            this.modelIDs = [];
            this.symbol = "";
            this.order = "";
            this.shockTokenID = "";
            this.markerID = ""; //overwatch or covering markers
            this.scout = false; //turned true if a new scout team is created
            this.parentTeamID = ""; //id of team scout team 'belongs to'
            TeamArray[teamID] = this;
        }

        add(model) {
            if (this.modelIDs.includes(model.id) === false) {
                if (model.special.includes("Crew")) {
                    this.modelIDs.unshift(model.id);
                } else {
                    this.modelIDs.push(model.id);
                }
                model.teamID = this.id;
                this.type = model.type;
            }
        }

        leader() {
            this.modelIDs.sort((a,b) => {
                let m1r = parseInt(ModelArray[a].rank);
                let m2r = parseInt(ModelArray[b].rank);
                if (m1r < m2r) return +1
                if (m1r > m2r) return -1
                return 0    
            });
            let men = this.men();
            let leader = ModelArray[this.modelIDs[0]];
            if (leader.special.includes("Leader") === false) {
                leader.token.set({
                    bar3_value: 0,
                    bar3_max: men,
                });
            }
        }

        men() {
            let number = 0;
            for (let i=0;i<this.modelIDs.length;i++) {
                let m = ModelArray[this.modelIDs[i]];
                number += parseInt(m.token.get("bar1_value"));
            }
            return number;
        }



        remove(model) {
            let index = this.modelIDs.indexOf(model.id);
            if (index === 0) {
                let shock = parseInt(model.token.get("bar3_value"));
                let model2 = ModelArray[this.modelIDs[1]];
                if (model2) {
                    model2.token.set("bar3_value",shock);
                }
            }
            if (index > -1) {
                this.modelIDs.splice(index,1);
            }
            if (this.modelIDs.length === 0) {
                delete TeamArray[this.id];
                //Bad Thing
            }
        }

        pinned() {
            let pinned = false;
            let leader = ModelArray[this.modelIDs[0]];
            if (leader.token.get("tint_color") === Colours.red) {
                pinned = true;
            }
            return pinned;
        }

        broken() {
            let broken = false;
            let leader = ModelArray[this.modelIDs[0]];
            if (leader.token.get("tint_color") === Colours.black) {
                broken = true;
            }
            return broken;
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
            let modelHeight = 5;
            if (type === "Vehicle") {modelHeight = 10};

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
            
            let team = TeamArray[teamID];
            let usedNames = [];
            for (let i=0;i<team.modelIDs.length;i++) {
                let m = ModelArray[team.modelIDs[i]];
                let surname = m.name.split(" ");
                surname = surname.slice(-1);
                usedNames.push(surname.toString());
            }
            usedNames = [...new Set(usedNames)];
            let name;
            if (existing === false) {
                name = Naming(charName,nation,rank,crew,usedNames);
            } else {
                name = token.get("name");
            }
            if (type === "Jump Off Point") {name = "Jump Off Point"};
            this.name = name;
            this.id = tokenID;
            this.charID = charID;
            this.charName = charName;
            this.token = token;
            this.player = player;
            this.nation = nation;
            this.teamID = teamID;
            this.sectionID = sectionID;
            this.placingTeamID = "";//used by markers
            this.type = type;
            this.hex = hex;
            this.hexLabel = hexLabel;
            this.rank = rank;
            this.size = size;
            this.radius = radius;
            this.vertices = vertices;
            this.height = modelHeight;

            this.quality = attributeArray.quality;
            this.special = special;
            this.initiative = 0;
            this.command = 0;
            this.leaderTeamIDs = [];
            this.soloNCO = false; //true if is an unattached NCO
            if (this.special.includes("Junior Leader")) {
                this.initiative = 2;
            } else if (this.special.includes("Senior Leader")) {
                this.initiative = 3;
            } else if (this.special.includes("Ranking Leader")) {
                this.initiative = 4;
            }
            this.hexList = [hex]; //hexes that have parts of larger token, mainly for LOS 
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




    }




    const WeaponArray = {
        SMG: {
            Close: {Range: 60, FP: 4},
            Eff: {Range: 120, FP: 2},
            Reroll: false,
            Penalty: 0,
            Cover: "Nil",
        },
        Rifle: {
            Close: {Range: 180, FP: 1},
            Eff: {Range: 1500, FP: 1},
            Reroll: false,
            Penalty: 0,
            Cover: "Nil",
        },
        Carbine: {
            Close: {Range: 180, FP: 1},
            Eff: {Range: 1500, FP: 1},
            Reroll: true,
            Penalty: 0,
            Cover: "Nil",
        },
        BAR: {
            Close: {Range: 180, FP: 3},
            Eff: {Range: 1500, FP: 3},
            Reroll: true,
            Penalty: 0,
            Cover: "Nil",
        },
        "Magazine LMG": {
            Close: {Range: 180, FP: 6},
            Eff: {Range: 1500, FP: 6},
            Reroll: false,
            Penalty: 2,
            Cover: "Nil",
        },
        "Belt-Fed LMG": {
            Close: {Range: 180, FP: 8},
            Eff: {Range: 1500, FP: 8},
            Reroll: false,
            Penalty: 3,
            Cover: "Nil",
        },
        SMG: {
            Close: {Range: 60, FP: 4},
            Eff: {Range: 120, FP: 2},
            Reroll: false,
            Penalty: 0,
            Cover: "Nil",
        },
        "Assault Rifle": {
            Close: {Range: 180, FP: 3},
            Eff: {Range: 480, FP: 1},
            Reroll: false,
            Penalty: 0,
            Cover: "Nil",
        },
        "MMG/HMG": {
            Close: {Range: 240, FP: 10},
            Eff: {Range: 1500, FP: 10},
            Reroll: false,
            Penalty: 3,
            Cover: "Reduces",
        },
        "Pistol": {
            Close: {Range: 90, FP: 1},
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
        let hexes = model2.hexList;
        let closestDist = Infinity;
        let closestHex = model2.hex;
        for (let j=0;j<hexes.length;j++) {
            let hex2 = hexes[j];
            let dist = model1.hex.distance(hex2) * MapScale;
            if (dist < closestDist) {
                closestDist = dist;
                closestHex = hex2;
            }
        }
        let theta = model1.hex.angle(closestHex);
        let phi = Angle(theta - model1.token.get('rotation')); //angle from shooter to target taking into account shooters direction
        let info = {
            distance: closestDist,
            closestHex: closestHex,
            angle: phi,
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
        for (let h=0;h<model.hexList.length;h++) {
            let chlabel = model.hexList[h].label();
            let index = hexMap[chlabel].tokenIDs.indexOf(model.id);
            if (index > -1) {
                hexMap[chlabel].tokenIDs.splice(index,1);
            }                    
        }        
        model.hexList = [];
    }

    const LargeTokens = (model) => {
        ClearLarge(model);
        //adds tokenID to hexMap for LOS purposes
        let radiusHexes = model.hex.radius(model.radius);
        for (let i=0;i<radiusHexes.length;i++) {
            let radiusHex = radiusHexes[i];
            let radiusHexLabel = radiusHex.label();
            //if (radiusHexLabel === model.hexLabel) {continue};
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
                model.hexList.push(radiusHex);
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
            edgeArray.sort((a,b) => parseInt(a) - parseInt(b));
        } else if (edgeArray.length > 2) {
            sendChat("","Error with > 2 edges, Fix and Reload API");
            return
        }
    }

    const BuildMap = () => {
        let startTime = Date.now();
        hexMap = {};
        //builds a hex map, assumes Hex(V) page setting
        let halfToggleX = HexInfo.halfX;
        let rowLabelNum = 0;
        let columnLabel = 1;
        let startX = xSpacing/2;
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
        //setup locations for Chain of Command Info and Dice
        let a = 0;
        let b = 1;
        if (state.CoC.side === "Right") {
            a = 1;
            b = 0;
        }
        let y = 43.8658278242683 + 2*ySpacing;
        let x = Math.floor((pageInfo.width + edgeArray[1])/2);
        let x1 = Math.floor((edgeArray[0])/2);
        for (let z=0;z<3;z++) {
            let a,b;
            if (edgeArray[0] === 0) {
                //all on right side display
                if (state.CoC.side === "Left") {
                    a = new Point(x,y);
                    b = new Point(x,y + pageInfo.height/2);
                } else {
                    b = new Point(x,y);
                    a = new Point(x,y + pageInfo.height/2);
                }
            } else {
                //players on 1 side or other
                if (state.CoC.side === "Left") {
                    a = new Point(x1,y);
                    b = new Point(x,y); 
                } else {
                    b = new Point(x,y);
                    a = new Point(x1,y);
                }
            }
            InfoPoints[0][z] = a;
            InfoPoints[1][z] = b;
            y += 4*ySpacing;

        }
        BuildTerrainArray();

        let taKeys = Object.keys(TerrainArray);
        for (let i=0;i<taKeys.length;i++) {
            let polygon = TerrainArray[taKeys[i]];
            if (polygon.linear === false) {continue};
            Linear(polygon);
        }

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
                    for (let t=0;t<taKeys.length;t++) {
                        let polygon = TerrainArray[taKeys[t]];
                        if (temp.terrain.includes(polygon.name) || polygon.linear === true) {continue};
                        let check = false;
                        let pts = [];
                        pts.push(c);
                        pts = XHEX(pts);
                        let num = 0;
                        for (let i=0;i<5;i++) {
                            check = pointInPolygon(pts[i],polygon);
                            if (i === 0 && check === true) {
                                //centre pt is in hex, can skip rest
                                num = 3;
                                break;
                            }
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


    const Linear = (polygon) => {
        //adds linear obstacles, eg Ridgelines, to hex map
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
                if (hexMap[hexLabel].terrain.includes(polygon.name)) {continue};
                hexMap[hexLabel].terrain.push(polygon.name);
                hexMap[hexLabel].terrainIDs.push(polygon.id);
                hexMap[hexLabel].los = Math.max(hexMap[hexLabel].los,polygon.los);
                hexMap[hexLabel].cover = Math.max(hexMap[hexLabel].cover,polygon.cover);
                hexMap[hexLabel].move = Math.max(hexMap[hexLabel].move,polygon.move);
                hexMap[hexLabel].obstacle = Math.max(hexMap[hexLabel].obstacle,polygon.obstacle);
                hexMap[hexLabel].height = Math.max(hexMap[hexLabel].height,polygon.height);
                if (polygon.cover === 2) {
                    hexMap[hexLabel].coverID = polygon.id
                }
            }
        }
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
            let extraNote = info[5]; //used by markers and scouts
            let extraID = info[6]; // '' ''
            let team = TeamArray[teamID];
            let sectionColour = token.get("aura1_color");
            let statusmarkers = token.get("statusmarkers").split(",")
log(token.get("name"))
log(statusmarkers)
            let teamMarkers = Nations[nation].teammarkers;
            let teamMarker = returnCommonElements(statusmarkers,teamMarkers);

log("Marker: " + teamMarker)

            if (!section) {
                section = new Section(player,nation,sectionID,sectionName,core,sectionColour);
            }
            if (!team) {
                team = new Team(player,nation,teamID,teamName,sectionID);
                team.symbol = teamMarker;
                section.add(team);
            }
            let model = new Model(token.id,sectionID,teamID,true);
            team.add(model);
            if (model.type === "Patrol" && PatrolArray.includes(model.id) === false) {
                PatrolArray.push(model.id);
            }
            if (extraNote === "Marker") {
                ModelArray[extraID].markerID = model.id;
                model.placingTeamID = extraID;
            }
            if (extraNote === "Scouts") {
                team.scout === true;
                team.parentID = extraID;
            }



        });

        let elapsed = Date.now()-start;
        log(`${c} token${s} checked in ${elapsed/1000} seconds - ` + Object.keys(ModelArray).length + " placed in Model Array");
    }

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
                linear: t.linear,
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
                linear: false,
            };
            TerrainArray[id] = info;
        });
    };


    const Naming = (charName,nation,rank,crew,usedNames) => {
        //checks if rank name already in character name on sheet, otherwise assigns based on nation and rank level on sheet
        let NationRanks = {
            "Germany": ["Pvt. ","Obergefreiter ","Unteroffizier ","Feldwebel ","Leutnant ","Hauptmann "],
            "Soviet": ["Pvt. ","Efréĭtor ","Serzhánt ","Starshyná ","Leytenant ","Kapitán "],
            "USA": ["Pvt. ","Cpl. ","Sgt. ","Staff Sgt. ","Lieutenant ","Captain "],
            "UK": ["Pvt. ","Lance Cpl. ","Cpl. ","Sgt. ","Lieutenant ","Captain "],
        };
        let rankName = "";
        if (rankName === "") {
            rankName = NationRanks[nation][rank];
        }
        let surname;
        do {
            surname = Surname(nation);
        }
        while (usedNames.includes(surname) === true);

        let name = rankName + surname;
        if (crew === true) {
            name += " & Crew";
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
        if (!special) {special = ""}; //used to track certain things eg. Flamethrowers
        let model1 = ModelArray[id1];
        let model2 = ModelArray[id2];       

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

        let distanceInfo = ModelDistance(model1,model2);
        let distanceT1T2 = distanceInfo.distance; //in feet
        let phi = distanceInfo.phi; //angle from model1 to model2 taking into account model1's rotation

        let hex1 = hexMap[model1.hexLabel];
        let hex2 = hexMap[model2.hexLabel];
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

        let interHexes = model1.hex.linedraw(model2.hex); 
        //interHexes will be hexes between shooter and target, not including their hexes or closest hexes for large tokens
        let lightCovers = [];

log("Base Level: " + modelLevel)
        let sameTerrain = findCommonElements(hex1.terrainIDs,hex2.terrainIDs);
        let lastElevation = model1Height;
        let smokeGrenade = false;

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

        let fKeys = Object.keys(ModelArray);

        for (let i=1;i<interHexes.length;i++) {
            //0 is tokens own hex
            let qrs = interHexes[i];
            let interHex = hexMap[qrs.label()];

log("<==================>");
log("Hex: " + qrs.label());
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
            if (interHex.smoke === true) {
                //smoke barrage has unlimited height
                los = false;
                break;
            }
            if (interHex.smokeGrenade === true && B <= 20) {
                smokeGrenade = true;
            }
            let friendlyFlag = false;
            let enemyVehicle = false;
            let friendlyHeight = 0;

            if (special !== "Ignore Friendlies") {
    //check for intervening friendlies in 2 hexes of interHex - can ignore if same team
                //if find one, flag and note height
    log("Friendlies")
                for (let t=0;t<fKeys.length;t++) {
                    let fm = ModelArray[fKeys[t]];
                    if (fm.id === model1.id || fm.id === model2.id || fm.player !== model1.player || fm.teamID === model1.teamID) {continue};
    log(fm.name + " Player: " + fm.player)
                    let fHexes = fm.hexList;
                    for (let u=0;u<fHexes.length;u++) {
                        let fHex = fHexes[u];
                        let dis = fHex.distance(qrs) * MapScale;
    log("Friendlies Hex: " + fHex.label() + " / Distance " + dis)
                        if (dis < 20) {
                            friendlyFlag = true;
                            friendlyHeight = Math.max(fm.height,friendlyHeight);
                            if (special === "Flamethrower") {friendlyHeight = 100}; //basically cant fire Flamethrower over heads of friendlies
                        }
                    }
                }
            }
            

            //check for intervening enemy vehicle blocking LOS
            for (let t=0;t<fKeys.length;t++) {
                let fm = ModelArray[fKeys[t]];
                if (fm.id === model1.id || fm.id === model2.id || fm.player === model1.player || fm.type !== "Vehicle") {continue};
                for (let u=0;u<fm.hexList.length;u++) {
                    if (fm.hexList[u].label() === qrs.label()) {
                        enemyVehicle = true;
                        break;
                    }
                }
                friendlyHeight = Math.max(fm.height,friendlyHeight);
            }


            lastElevation = interHexElevation;

            if (interHexHeight + interHexElevation + friendlyHeight >= B) {
                if (friendlyFlag === true) {
log("Intervening Friendly blocks LOS")
                    los = false;
                    break;
                }
                if (enemyVehicle === true) {
log("Enemy Vehicle in LOS")
                    los = false;
                    break;
                }
log("Terrain higher than B")
                if (interHex.cover === 2 && cover < 3 && i > 1) {
                    if (lightCovers.includes(interHex.coverID) === false) {
                        lightCovers.push(interHex.coverID);
                    }
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
            if (model2.type === "Infantry" && model2.token.get(SM.moved) === false) {
                cover = 2;
            } else {
                cover = 0;
            }
        }

        let result = {
            los: los,
            cover: cover,
            distance: distanceT1T2,
            angle: phi,
            smokeGrenade: smokeGrenade,
        }
        return result;
    }

    const modelHeight = (model) => {
        //height of model based on terrain, with additional based on type
        let hex = hexMap[model.hexLabel];
        let height = parseInt(hex.elevation);
        if (model.type === "Infantry" || model.type === "Gun") {
            if (model.token.get(SM.floor2) === true) {
                height += 10;
            } else if (model.token.get(SM.floor3) === true) {
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
        let order = team.order;
        if (order === "") { 
            outputCard.body.push("Has not been activated this Phase");
        } else {
            outputCard.body.push("Activated with " + team.order);
        }
        if (model.special.includes("Leader")) {
            outputCard.body.push("Commands Left: " + (parseInt(model.initiative) - parseInt(model.command)) + " of " + model.initiative);
        }
        for (let i=0;i<team.modelIDs.length;i++) {
            let m = ModelArray[team.modelIDs[i]];
            outputCard.body.push(m.name);
        }


        PrintCard();
    }

    const UpdateShock = (team) => {
        //updates the shock token and checks if broken/pinned
        let teamLeader = ModelArray[team.modelIDs[0]];
        let shock = parseInt(teamLeader.token.get("bar3_value"));
        if (shock === 0) {
            teamLeader.token.set("status_red",false);
        } else {
            teamLeader.token.set("status_red",true);

            //need to see if pinned or broken
            //change aura if is









        }
    }




    const ClearState = () => {
        //clear arrays
        ModelArray = {};
        TeamArray = {};
        SectionArray = {};
        PatrolArray = [];
        //clear token info
        let tokens = findObjs({
            _pageid: Campaign().get("playerpageid"),
            _type: "graphic",
            _subtype: "token",
            layer: "objects",
        });
        let removalNames = ["CoC Dice","Command Dice","covering","tactical","overwatch"]
        tokens.forEach((token) => {
            if (token.get("name").includes("Jump Off Point") === true) {return};
            if (token.get("name") === "CoC Dice" || token.get("name") === "Command Dice") {
                token.remove();
                return;
            }
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
                bar3_value: 0,
                bar3_max: "",
                gmnotes: "",
                statusmarkers: "",
            });                
        })

        RemoveDead("All");

        state.CoC = {
            nations: [[],[]],
            players: {},
            playerInfo: [[],[]],
            diceIDs: [[],[]],
            forceMoraleIDs: [],
            lineArray: [],
            forceMorale: [0,0],
            CoCPoints: [0,0],
            commandDice: [5,5],
            unitnumbers: [0,0],
            sides: [],
            labmode: false,
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
        let removals = ["Jump Off Point","Command Dice","Morale"];
        tokens.forEach((token) => {
            if (token.get("status_dead") === true) {
                token.remove();
            }
            for (let i=0;i<removals.length;i++) {
                if (removals[i] === token.get("name") && info === "All") {
                    token.remove();
                }
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
        let type = Attribute(refChar,"type");
        if (type === "Patrol") {sectionName = "Patrol"};
        if (type === "Jump Off Point") {sectionName = "Jump Off Point"}
        let player = (Allies.includes(nation)) ? 0:1;
        let sectionID = stringGen();
        let sectionColour = "";

        let side = (Allies.includes(nation)) ? 0:1;
        if (state.CoC.nations[side].includes(nation) === false) {
            state.CoC.nations[side].push(nation);
        }

        section = new Section(player,nation,sectionID,sectionName,core,sectionColour);
        if (unitComp === "Patrol" || unitComp === "Jump Off Point") {
            let team = new Team(player,nation,stringGen(),sectionName,sectionID);
            for (let i=0;i<tokenIDs.length;i++) {
                let model = new Model(tokenIDs[i],sectionID,team.id,false);
                team.add(model);
                if (model.type === "Patrol" && PatrolArray.includes(model.id) === false) {
                    PatrolArray.push(model.id);
                }
                let gmn = core + ";" + sectionName + ";" + sectionID + ";" + sectionName + ";" + team.id;
                model.token.set({
                    name: model.name,
                    tint_color: "transparent",
                    showname: true,
                    gmnotes: gmn,
                });
            }
            section.add(team);
        } else if (unitComp === "Sr. Leader") {
            let team = new Team(player,nation,stringGen(),"",sectionID);
            let model = new Model(refToken.id,sectionID,team.id,false);
            team.add(model);
            team.name = model.name;
            section.add(team);
            section.name = model.name;
            let gmn = core + ";" + section.name + ";" + sectionID + ";" + section.name + ";" + team.id;
            model.token.set({
                name: model.name,
                tint_color: "transparent",
                showplayers_bar1: true,
                showname: true,
                showplayers_aura1: false,
                bar1_value: model.initiative,
                bar1_max: model.initiative,
                showplayers_bar3: true,
                bar3_value: 0,
                gmnotes: gmn,
            });
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
                    model.token.set("bar1_max",hp);
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
            }
            team.leader();
            section.add(team);
        } else if (unitComp === "Section") {
            let statusNum = parseInt(state.CoC.unitnumbers[player]);
            let cKeys = Object.keys(Colours);
            let sectionColour = Colours[[cKeys[statusNum]]];
            state.CoC.unitnumbers[player] = statusNum + 1;
            let tokenInfo = {};
            for (let i=0;i<tokenIDs.length;i++) {
                let id = tokenIDs[i];
                let token = findObjs({_type:"graphic", id: id})[0];
                let hex = pointToHex(new Point(token.get("left"),token.get("top")));
                tokenInfo[id] = {
                    token: token,
                    hex: hex,
                }
            }
            
            let groups = [];
            tokenIDs.forEach((id) => {
                let grouped = false;
                //see if can sort into existing group
                sortLoop1:
                for (let i=0;i<groups.length;i++) {
                    group = groups[i];
                    for (let j=0;j<group.length;j++) {
                        let id2 = group[j];
                        if (tokenInfo[id].hex.distance(tokenInfo[id2].hex) <= 1) {
                            grouped = true;
                            groups[i].push(id);
                            break sortLoop1;
                        }
                    }
                }
                if (grouped === false) {
                    //create new group
                    groups.push([id]);
                }
            });

            //now sort into "Teams" and Jr. Leaders
            for (let i=0;i<groups.length;i++) {
                let teamMarker = Nations[nation].teammarkers[i];
                let group = groups[i];
                let letters = ["A","B","C","D","E","F","G"];
                let teamName = sectionName + "/" + letters[i];
                let team = new Team(player,nation,stringGen(),teamName,sectionID);
                team.symbol = teamMarker;
                let gmn = core + ";" + sectionName + ";" + sectionID + ";" + teamName + ";" + team.id;
                for (let i=0;i<group.length;i++) {
                    let model = new Model(group[i],sectionID,team.id,false);
                    team.add(model);
                    let hp = 1;
                    if (model.special.includes("Crew")) {
                        //should be "Crew of X"
                        let index = model.special.indexOf("Crew") + 8;
                        hp = parseInt(model.special.charAt(index));
                    }            
                    if (model.initiative > 0) {
                        hp = model.initiative;
                    }
                    if (hp > 1) {
                        model.token.set("bar1_max",hp);
                    }
                    let ar = 2;
                    if (model.size === "Large") {
                        ar = 6;
                    };

                    model.token.set({
                        name: model.name,
                        tint_color: "transparent",
                        aura1_color: sectionColour,
                        aura1_radius: ar,
                        showplayers_bar1: true,
                        showname: true,
                        bar1_value: hp,
                        showplayers_bar3: true,
                        bar3_value: 0,
                        gmnotes: gmn,
                    });
                    model.token.set("statusmarkers",teamMarker);
                }
                section.add(team);
            }
            for (let i=0;i<section.teamIDs.length;i++) {
                let team = TeamArray[section.teamIDs[i]];
                team.leader();
            }
        }
    }


    const RollD6 = (msg) => {
        let Tag = msg.content.split(";");
        PlaySound("Dice");
        let roll = randomInteger(6);
        if (Tag.length === 1) {
            let playerID = msg.playerid;
            let nation = "Neutral";
            if (!state.CoC.players[playerID] || state.CoC.players[playerID] === undefined) {
                if (msg.selected) {
                    let id = msg.selected[0]._id;
                    if (id) {
                        let tok = findObjs({_type:"graphic", id: id})[0];
                        let char = getObj("character", tok.get("represents")); 
                        nation = Attribute(char,"nation");
                        state.CoC.players[playerID] = nation;
                    }
                } else {
                    sendChat("","Click on one of your tokens then select Roll again");
                    return;
                }
            } else {
                nation = state.CoC.players[playerID];
            }
            let res = "/direct " + DisplayDice(roll,nation,40);
            sendChat("player|" + playerID,res);
        } else {
            let type = Tag[1];
            //type being used for times where fed back by another function
            

        }
    }

    const JumpOff = () => {
        //find patrol markers and create lines
        //lines removed once start 1st turn
        RemoveLines("JO");
        let lineIDArray = [];
        for (let i=0;i<PatrolArray.length;i++) {
            let id1 = PatrolArray[i]
            let patrol1 = ModelArray[id1];
            //for each patrol marker, find closest 2 enemy patrol markers
            let closest = [{id: "",dist: 1000},{id: "",dist: 1000}];
            for (let j=0;j<PatrolArray.length;j++) {
                let id2 = PatrolArray[j];
                let patrol2 = ModelArray[id2];
                if (patrol1.player === patrol2.player) {continue};
                let dist = patrol1.hex.distance(patrol2.hex);
                if (dist < closest[0].dist) {
                    if (closest[0].dist < closest[1].dist) {
                        closest[1].id = closest[0].id;
                        closest[1].dist = closest[0].dist;
                    }
                    closest[0].id = patrol2.id;
                    closest[0].dist = dist;
                    continue;
                }
                if (dist < closest[1].dist) {
                    closest[1].id = patrol2.id;
                    closest[1].dist = dist;
                }
            }
            //now draw lines to each of closest and past it
            for (let j=0;j<2;j++) {
                lineID = DrawLine(closest[j].id,patrol1.id,4,"objects","JumpOff");
                lineIDArray.push(lineID);
            }
        }
        state.CoC.JOLines = lineIDArray;
        SetupCard("Jump Off Points","","Neutral");
        outputCard.body.push("Take Turns Placing Jump Off Points");
        outputCard.body.push("Click button when done placing all");
        ButtonInfo("Start Game","!StartGame");
        PrintCard();
    }

    const DrawLine = (id1,id2,colour,layer,special) => {
        let ColourCodes = ["#00ff00","#ffff00","#ff0000","#00ffff","#000000"];
        colour = ColourCodes[colour];
        let x1,x2,y1,y2,left,top,right,bottom,width,height;
        if (special === "JumpOff") {
            colour = Nations[ModelArray[id2].nation].borderColour;
            x1 = hexMap[ModelArray[id1].hexLabel].centre.x;
            x2 = hexMap[ModelArray[id2].hexLabel].centre.x;
            y1 = hexMap[ModelArray[id1].hexLabel].centre.y;
            y2 = hexMap[ModelArray[id2].hexLabel].centre.y;
            left = 0;
            right = pageInfo.width;
            top = 0;
            bottom = pageInfo.height;
            let dx, dy, py, vx, vy;
            vx = x2 - x1;
            vy = y2 - y1;
            dx = vx < 0 ? left : right;
            dy = py = vy < 0 ? top : bottom;
            if (vx === 0) {
                dx = x1;
            } else if (vy === 0){
                dy = y1;
            } else {
                dy = y1 + (vy / vx) * (dx - x1);
                if (dy < top || dy > bottom) {
                    dx = x1 + (vx / vy) * (py - y1);
                    dy = py;
                }
            }
            x1 = x2; //starts line at patrol, and goes back to edge of map (dx or dy)
            y1 = y2;
            x2 = dx;
            y2 = dy;
        } else {
            x1 = hexMap[ModelArray[id1].hexLabel].centre.x;
            x2 = hexMap[ModelArray[id2].hexLabel].centre.x;
            y1 = hexMap[ModelArray[id1].hexLabel].centre.y;
            y2 = hexMap[ModelArray[id2].hexLabel].centre.y;
        }

        width = (x1 - x2);
        height = (y1 - y2);
        left = width/2;
        top = height/2;

        let path = [["M",x1,y1],["L",x2,y2]];
        path = path.toString();

        let newLine = createObj("path", {   
            _pageid: Campaign().get("playerpageid"),
            _path: path,
            layer: layer,
            fill: colour,
            stroke: colour,
            stroke_width: 5,
            left: left,
            top: top,
            width: width,
            height: height,
        });
        toFront(newLine);
        let id = newLine.id;
        return id;
    }

    const RemoveLines = (type) => {
        let lineIDArray;
        if (type === "JO") {
            lineIDArray = state.CoC.JOLines;
            state.CoC.JOLines = []; 
        } else {
            lineIDArray = state.CoC.LOSLines;
            state.CoC.LOSLines = []; 
        }
        if (!lineIDArray) {
            state.CoC.LOSLines = [];
            state.CoC.LOSLines = []; 
            return;
        }
        for (let i=0;i<lineIDArray.length;i++) {
            let id = lineIDArray[i];
            let path = findObjs({_type: "path", id: id})[0];
            if (path) {
                path.remove();
            }
        }
    }

    const StartGame = () => {
        RemoveLines("JO");
        let keys = Object.keys(ModelArray);
        for (let i=0;i<keys.length;i++) {
            let model = ModelArray[keys[i]];
            if (model.type === "Patrol") {
                model.token.remove();
            } else if (model.type === "Jump Off Point") {
                model.token.set({
                    layer: "map",
                })
            }
        }
       



    }

    const ResetActivations = () => {
        //reset team activations



        Scouts()
    









    }

    const Scouts = () => {
        let teamKeys = Object.keys[TeamArray];
        for (let i=0;i<teamKeys.length;i++) {
            let team1 = TeamArray[teamKeys[i]];
            if (team1.scout === false) {continue};
            let team2 = TeamArray[team1.parentTeamID];
            let section = SectionArray[team1.sectionID];
            if (TeamsInRange(team1,team2) === true) {
                let t1L = ModelArray[team1.modelIDs[0]];
                let t2L = ModelArray[team2.modelIDs[0]];
                let gmn = t2L.get("gmnotes");
                let teamMarker = Nations[nation].teammarkers.filter(value => markers.includes(value));
                let t1Shock = parseInt(t1L.token.get("bar3_value"));
                let t2Shock = parseInt(t2L.token.get("bar3_value")) + t1Shock;
                t2L.token.set("bar3_value",t2Shock);
                for (let j=0;j<team1.modelIDs.length;j++) {
                    let m1 = ModelArray[team1.modelIDs[j]];
                    m1.token.set("gmnotes",gmn);
                    m1.token.set("statusmarkers",teamMarker);
                    team2.add(m1);
                }
                UpdateShock(team2);
                section.remove(team1);
                delete TeamArray[team1.id];
            }
        }
    }






    const CommandDice = (msg) => {
        for (let i=0;i<CommandDiceArray.length;i++) {
            let obj = CommandDiceArray[i];
            obj.remove();
        }
        ResetActivations();
        let nation;
        let changeCoC = 0;
        if (!msg.selected) {
            let playerID = msg.playerid
            nation = state.CoC.players[playerID];
        } else {
            let id = msg.selected[0]._id;
            nation = ModelArray[id].nation;
        }
        let player = (Allies.includes(nation)) ? 0:1;
        if (!nation) {nation = "Neutral"};
        SetupCard("New Phase","",nation);
        let number = parseInt(state.CoC.commandDice[player]);
        let rolls = [];
        //6th Dice is a Red dice, 6s become 5s
        let sixthDice = 0;
        let sixthDiceUsed = false;
        let fives = 0;
        let sixes = 0;
        let command = [];
        PlaySound("Dice");
        for (let i=0;i<number;i++) {
            let roll = randomInteger(6);
            if (number === 6 && i === 5) {
                if (roll === 6) {roll = 5};
                sixthDice = roll;
            }
            rolls.push(roll);
            if (roll === 5) {
                fives += 1
            } else if (roll === 6) {
                sixes += 1;
            } else {
                command.push(roll);
            }
        }
        rolls.sort();
        command.sort();
        let line = "";
        let flip = false;
        if (rolls[0] > 4) {flip = true};
        for (let i=0;i<rolls.length;i++) {
            if (i > 0 && rolls[i] > 4 && flip === false) {
                line += "| ";
                flip = true;
            }
            let diceNation = nation;
            if (rolls[i] === sixthDice && sixthDiceUsed === false) {
                if (nation === "Soviet") {
                    diceNation = "Neutral"
                } else {
                    diceNation = "Soviet";
                }
                sixthDiceUsed = true;
            }
            line += DisplayDice(rolls[i],diceNation,30) + " ";
        }
        outputCard.body.push(line);
        if (fives > 0 || sixes > 1) {
            outputCard.body.push("[hr]");
        }
        if (fives > 0) {
            outputCard.body.push(fives + " Added to Chain of Command");
            changeCoC += fives;
            outputCard.body.push("Total: " + state.CoC.CoCPoints[player]);
        }
        if (sixes > 1) {
            outputCard.body.push(nation + " Retains Initiative for next Phase");
        }
        if (sixes > 2) {
            outputCard.body.push("This is also the final Phase of the Turn");
        }
        if (sixes > 3) {
            outputCard.body.push("Player gains a complete Chain of Command Dice");
            changeCoC += 6;
            let ran = randomInteger(6);
            outputCard.body.push("A Random Event Occurs")
            if (ran === 1) {
                outputCard.body.push("Random Mortar Barrage");
                outputCard.body.push("Consult Book");
            } else if (ran === 2) {
                outputCard.body.push("Jabos! Aircraft overhead, hit the dirt!");
                outputCard.body.push("Nobody knows whose planes they are but movement is halted for this Phase and the next. Other activity continues as normal.");
            } else if (ran === 3) {
                outputCard.body.push("Fire! A building catches fire. Consult Book");
            } else if (ran === 4) {
                outputCard.body.push("A true patriot (or vile collaborator) has informed you where one of your opponent’s Units is lurking. Your opponent must place one of his as yet un‐deployed Units on the table immediately. He may choose which Jump‐Off Point they deploy to.");
            } else if (ran === 5) {
                outputCard.body.push("It has begun to rain very heavily. Visibility is reduced to 18” for the remainder of this Turn. At the end of the Turn roll a D6 and consult Book");
            } else if (ran === 6) {
                outputCard.body.push("Your men have discovered a cache of fine wine buried by its rightful owner and intended to be dug up at the end of the war. Sadly for him, it won’t be there when he returns. Fortunately for you, your Force Morale increases by one point. Bottoms Up!");
                    UpdateForceMorale(1,player);
            }
        }
        //update coc pts and force morale
        UpdateCoCDice(changeCoC,player);
        let pos = DeepCopy(InfoPoints[player][2]);
        //pos.y += 2*ySpacing;
        pos.x -= (Math.floor(command.length - 1)/2) * xSpacing;
        sendPing(pos.x,pos.y, Campaign().get('playerpageid'), null, true); 
        sixthDiceUsed = false;
        for (let i=0;i<command.length;i++) {
            let roll = command[i];
            diceNation = nation;
            if (roll === sixthDice && sixthDiceUsed === false) {
                if (nation === "Soviet") {
                    diceNation = "Neutral"
                } else {
                    diceNation = "Soviet";
                }
                sixthDiceUsed = true;
            }
            let diceObj = createDiceObject(diceNation,roll,pos,70);
            diceObj.set("name","Command Dice");
            pos.x += xSpacing;
            CommandDiceArray.push(diceObj);
        }
        PrintCard();
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
                model.hexList = [newHex];
                if (model.size === "Large") {
                    model.vertices = TokenVertices(tok);
                    LargeTokens(model);
                }
                if (model.type === "Patrol") {
                    let friendFlag = false;
                    let enemyFlag = false;
                    let colour = "transparent"
                    let lockDowns = [];
                    for (let i=0;i<PatrolArray.length;i++) {
                        let id2 = PatrolArray[i];
                        if (id2 === model.id) {continue};
                        let patrol = ModelArray[id2];
                        let dist = model.hex.distance(patrol.hex);
log(patrol.name + ": " + dist)
                        if (patrol.player === model.player) {
                            if (dist <= 12) {
                                friendFlag = true;
                            }
                        } else {
                            if (dist <= 12) {
                                enemyFlag = true;
                                if (lockDowns.includes(id2) === false) {
                                    lockDowns.push(id2);
                                }
                            }
                        }
                    }
                    if (friendFlag === false) {
                        //sendChat("",'Too Far from Friendly Patrol');
                        colour = Colours.red;
                    }
                    if (enemyFlag === true) {
                        //sendChat("","Will be Locked Down");
                        colour = Colours.black;
                        for (let i=0;i<lockDowns.length;i++) {
                            let patrol = ModelArray[lockDowns[i]];
                            patrol.token.set("tint_color",colour);
                        }
                    }
                    model.token.set("tint_color",colour);
                }
            };
            if ((tok.get("height") !== prev.height || tok.get("width") !== prev.width) && state.CoC.labmode === false) {
                let model = ModelArray[tok.id];
                if (!model) {return};
                tok.set("height",prev.height);
                tok.set("width",prev.width);
            }

        };
    };


    const SetupGame = (msg) => {
        let Tag = msg.content.split(";");
        let alliedSide = Tag[1];
        state.CoC.side = alliedSide;
        let alliedMorale = Tag[2];
        let alliedCD = Tag[3];
        let axisMorale = Tag[4];
        let axisCD = Tag[5]
        state.CoC.forceMorale = [alliedMorale,axisMorale];
        state.CoC.commandDice = [alliedCD,axisCD];
        SetupCard("Setup","","Neutral");
        outputCard.body.push("Allied Morale: " + alliedMorale);
        outputCard.body.push("Allied Command Dice: " + alliedCD);
        outputCard.body.push("Axis Morale: " + axisMorale);
        outputCard.body.push("Axis Command Dice: " + axisCD);
        for (let player = 0;player<2;player++) {
            UpdateForceMorale(0,player);
        }
        PrintCard();
    }


    const ToggleLab = () => {
        state.CoC.labmode = (state.CoC.labmode === true) ? false:true;
        sendChat("","Toggled to " + state.CoC.labmode)
    }

    const UpdateCoCDice = (change,player) => {
        let pts = state.CoC.CoCPoints[player] + change;
        state.CoC.CoCPoints[player] = pts;
        let nation = state.CoC.nations[player][0];
        //clear old dice
        let oldIDs = state.CoC.diceIDs[player];
        for (let i=0;i<oldIDs.length;i++) {
            let id = oldIDs[i];
            let token = findObjs({_type:"graphic", id: id})[0];
            if (token) {
                token.remove();
            }
        }
        state.CoC.diceIDs[player] = [];
        //create new dice
        if (pts === 0) {return};
        let dice = 0;
        if (pts > 5) {
            do {
                pts -= 6;
                dice++
            }
            while (pts > 5)
        }
        let sign;
        if (player === 0) {
            sign = (state.CoC.side === "Left") ? 1:-1; 
        } else {
            sign = (state.CoC.side === "Left") ?
            -1:+1
        }  

        let location = DeepCopy(InfoPoints[player][1]);
        let qw = dice/2;
        if (qw < 1) {qw = 0};
        location.x += sign * Math.min(qw,4) * xSpacing;
        for (let d=0;d<dice;d++) {
            let diceObj = createDiceObject(nation,6,location,140);
            diceObj.set("name","CoC Dice");
            state.CoC.diceIDs[player].push(diceObj.id);
            location.x -= sign * 2*xSpacing;
        }
        if (pts > 0) {
            let diceObj = createDiceObject(nation,pts,location,140);
            diceObj.set("name","CoC Dice");
            state.CoC.diceIDs[player].push(diceObj.id);
        }
    }

    const UpdateForceMorale = (change,player) => {
        let morale = parseInt(state.CoC.forceMorale[player]) + parseInt(change);
        state.CoC.forceMorale[player] = morale;
        let nation = state.CoC.nations[player][0];
        //clear old #
        let oldID = state.CoC.forceMoraleIDs[player];
        let token = findObjs({_type:"graphic", id: oldID})[0];
        if (token) {
            token.remove();
        }
        state.CoC.forceMoraleIDs[player] = "";
        //set new
        let location = InfoPoints[player][0];
        let imageURL = getCleanImgSrc(MoralePics[morale]);
        let imageObj = createObj("graphic", {
            left: location.x,
            top: location.y,
            width: 140,
            height: 140,
            isdrawing: true,
            pageid: Campaign().get("playerpageid"),
            imgsrc: imageURL,
            name: "Morale",
            layer: "map",
        });
        toFront(imageObj);
    }




    const createDiceObject = (nation,roll,location,size) => {
        if (!size) {size = 70};
        roll=roll.toString();
        let tablename = Nations[nation].dice;
        let table = findObjs({type:'rollabletable', name: tablename})[0];
        let obj = findObjs({type:'tableitem', _rollabletableid: table.id, name: roll })[0];
        let imageURL = getCleanImgSrc(obj.get('avatar'));
        let diceObj = createObj("graphic", {
            left: location.x,
            top: location.y,
            width: size,
            height: size,
            isdrawing: true,
            pageid: Campaign().get("playerpageid"),
            imgsrc: imageURL,
            layer: "objects",
        });
        toFront(diceObj);
        return diceObj;
    }



    const UnitActivation = (msg) => {
        //Teams and Squads
        //!Activate;@{selected|token_id};Squad;?{Action|Stand and Fire|Tactical Move|Move and Fire|Normal Move|At the Double|Covering Fire|Deploy}
        let Tag = msg.content.split(";");
        let id = Tag[1];
        let size = Tag[2];
        let order = Tag[3];
        let moveAction = false;
        let errorMsg = "";
        if (order.includes("Move") || order.includes("At the")) {
            moveAction = true;
        }
        let model = ModelArray[id];
        let quality = model.quality;
        let team1 = TeamArray[model.teamID];
        let section = SectionArray[team1.sectionID];
        let teamIDs = DeepCopy(section.teamIDs);
        let team1Leader = ModelArray[team1.modelIDs[0]];
        if (team1.order !== "") {
            errorMsg = "Target has already been activated";
        }
        if (team1.broken() === true) {
            errorMsg = "Target is Broken";
        }
        if (team1.pinned() === true && moveAction === true) {
            errorMsg = "Target is Pinned and Cannot Move";
        }
        let requires;
        if (team1Leader.token.get(SM.order) === true) {
            requires = "Using Leader's Order";
        } else {
            requires = "Command Dice: "; 
            if (size === "Team") {
                requires += DisplayDice(1,team1.nation,16);
            } else {
                requires += DisplayDice(2,team1.nation,16);
            }
        }
        SetupCard(order,requires,model.nation);

        if (size === "Section" && errorMsg === "") {
            //check if other team(s) are in range and valid to activate
            for (let i=0;i<section.teamIDs.length;i++) {
                let team2 = TeamArray[section.teamIDs[i]];
                if (team2.id === team1.id) {continue};
                let team2Leader = ModelArray[team2.modelIDs[0]];
                if (team2.order !== "") {
                    errorMsg = team2.name + " has already been activated";
                }
                if (team2.broken() === true) {
                    errorMsg = team2.name + " is Broken";
                }
                if (team2.pinned() === true && moveAction === true) {
                    errorMsg = team2.name + " is Pinned and Cannot Move";
                }
                if (TeamsInRange(team1,team2) === false) {
                    errorMsg = team2.name + ' is > 4" away'
                }
                if (errorMsg !== "") {
                    teamIDs = teamIDs.splice(i,1);
                } 
            }
        } else if (size === "Team") {
            teamIDs = [team1.id];
        }

        if ((order === "Overwatch" || order === "Covering Fire") && team1Leader.token.get(SM.order) === false) {
            errorMsg = "Needs an Order to perform this action";
        }
        if ((order === "Overwatch" || order === "Covering Fire") && size === "Section") {
            errorMsg = "Team Order only (not Section)";
        }


        if (errorMsg !== "") {
            outputCard.body.push(errorMsg);
            PrintCard();
            return;
        }

        let weaponMoveMod = 0;

        if (team1Leader.type === "Infantry" && team1Leader.special.includes("Crew of 5")) {
            let crew = parseInt(team1Leader.token.get("bar1_value"));
            if (crew === 2) {weaponMoveMod = 1};
            if (crew === 1) {order = "Rotate"};
        }

        let moveDice = [];
        for (let i=0;i<3;i++) {
            moveDice.push(randomInteger(6));
        }
        team1Leader.token.set(SM.order,false);
        switch (order) {
            case 'Tactical Move':
                outputCard.body.push("Rolls: " + DisplayDice(moveDice[0],team1.nation,14));
                break;
            case 'Move and Fire':
                outputCard.body.push("Rolls: " + DisplayDice(moveDice[0],team1.nation,14));
                break;
            case 'Normal Move':
                outputCard.body.push("Rolls: " + DisplayDice(moveDice[0],team1.nation,14) + " / " + DisplayDice(moveDice[1],team1.nation,14));
                break;
            case 'At the Double':
                outputCard.body.push("Rolls: " + DisplayDice(moveDice[0],team1.nation,14) + " / " + DisplayDice(moveDice[1],team1.nation,14) + " / " + DisplayDice(moveDice[2],team1.nation,14));
                break;
            case 'Deploy':
                let roll = randomInteger(6);
                let keys = Object.keys(ModelArray);
                let leaderOffboard = false;
                for (let i=0;i<keys.length;i++) {
                    let model2 = ModelArray[keys[i]];
                    if ((model2.special.includes("Senior Leader") || model2.special.includes("Adjutant")) && model2.player === model.player && hexMap[model2.hexLabel].terrain.includes("Offboard")) {
                        leaderOffboard = true;
                        break;
                    };
                }
                if (leaderOffboard === false) {
                    outputCard.body.push("No Senior Leader or Adjutant Offboard: " + DisplayDice(roll,team1.nation,14));
                    if (roll < 4) {
                        outputCard.body.push("The " + size + " failed to receive the Orders");     
                        for (let i=0;i<teamIDs.length;i++) {
                            let team = TeamArray[teamIDs[i]];
                            team.order = "Failed to Deploy"
                        }
                        PrintCard();
                        return;
                    }
                }
                let radius;
                if (quality === "Green") {radius = 4};
                if (quality === "Regular") {radius = 6};
                if (quality === "Elite") {radius = 9};

                outputCard.body.push("The " + size + " can deploy within " + radius + '"' + " of a Jump Off Point");
                outputCard.body.push("They may not move, but may fire at full effect");
                break;
            case 'Overwatch':
                PlaceMarker("overwatch",team1);
                outputCard.body.push("Place Overwatch Marker and rotate to desired position, then Activate it");
                break;
            case 'Covering Fire':
                PlaceMarker("covering",team1);
                outputCard.body.push("Place Covering Fire in desired area (in LOS), then Activate it");
                break;
        }

        teamIDs.forEach((id) => {
            let indTeam = TeamArray[id];
            let move;
            let leaderFlag = false;
            let teamLeader = ModelArray[indTeam.modelIDs[0]];
            indTeam.order = order;
            let shock = parseInt(teamLeader.token.get("bar3_value"));
            let itName = indTeam.name;
            if (teamLeader.special.includes("Leader")) {
                leaderFlag = true;
                itName = teamLeader.name;
                outputCard.body.push(teamLeader.name + " accompanies the Section but may not use his Command Initiative this Phase");
            }
            switch (order) {
                case 'Stand and Fire':
                    outputCard.body.push("[#ff0000]" + itName + " fires at full effect[/#]");
                    break;
                case 'Tactical Move':
                    teamLeader.token.set(SM.tactical,true);
                    move = Math.max(0,moveDice[0] - shock) + '"';
                    outputCard.body.push("[#ff0000]" + itName + " can move " + move + "[/#]");
                    break;
                case 'Move and Fire':
                    move = Math.max(0,moveDice[0] - shock - weaponMoveMod) + '"';
                    outputCard.body.push("[#ff0000]" + itName + " can move " + move + "[/#]");
                    break;
                case 'Normal Move':
                    move = Math.max(0,moveDice[0] + moveDice[1] - shock  - (2*weaponMoveMod)) + '"';
                    move2 = Math.max(0,Math.max(moveDice[0],moveDice[1]) - shock) + '"';
                    move3 = Math.max(0,Math.min(moveDice[0],moveDice[1]) - shock) + '"';
                    if (teamLeader.type === "Gun") {
                        if (teamLeader.special.includes("Light")) {
                            outputCard.body.push("[#ff0000]" + itName + " can move " + move + "[/#]");   
                        } else if (teamLeader.special.includes("Medium")) {
                            outputCard.body.push("[#ff0000]" + itName + " can move " + move2 + "[/#]");
                        } else if (teamLeader.special.includes("Heavy")) {
                            outputCard.body.push("[#ff0000]" + itName + " can move " + move3 + "[/#]");
                        }
                        outputCard.body.push("The Team may not cross Obstacles");
                    } else {
                        outputCard.body.push("[#ff0000]" + itName  + " can move " + move + "[/#]");
                        outputCard.body.push('Low Obstacle/Building: ' + move2);
                        outputCard.body.push('Medium Obstacle: ' + move3);
                    }
                    break;
                case 'At the Double':
                    move = Math.max(0,moveDice[0] + moveDice[1] + moveDice[2] - shock  - (3*weaponMoveMod)) + '"'; 
                    if (leaderFlag === true && parseInt(teamLeader.token.get("bar1_value")) < parseInt(teamLeader.token.get("bar1_max"))) {
                        move = Math.max(0,moveDice[0] + moveDice[1]) + '" (wounded)'; 
                    } else {
                        teamLeader.token.set("bar3_value",(shock+1));
                    }
                    outputCard.body.push("[#ff0000]" + itName + " can move " + move + "[/#]");
                    break;
            }
        });
        switch (order) {
            case "Rotate":
                outputCard.body.push("Team can only rotate the Weapon");
                break;
            case 'Tactical Move':
                outputCard.body.push("Teams take cover while doing so");
                outputCard.body.push('-1" for Heavy Going');
                outputCard.body.push("No Crossing Obstacles");
                break;
            case 'Move and Fire':
                outputCard.body.push("Teams can fire before or after moving, at 1/2 effect");
                outputCard.body.push('-1" for Heavy Going');
                outputCard.body.push("No Crossing Obstacles"); 
                break;
            case 'Normal Move':
                outputCard.body.push('-2" for Heavy Going');
                break;
            case 'At the Double':
                outputCard.body.push("Cannot Move in Broken or Heavy Ground");
                outputCard.body.push("Teams takes 1 point of Shock each");
                break;
        }
        PrintCard();
    }


    const LeaderSelf = (msg) => {
        //!LeaderSelf;@{selected|token_id};?{Tactical Move|Normal Move|At the Double|Deploy};
        let Tag = msg.content.split(";");
        let leaderID = Tag[1];
        let choice = Tag[2];
        let leader = ModelArray[leaderID];
        let quality = leader.quality;
        let d;
        if (leader.special.includes("Senior Leader")) {
            d = 4;
        } else if (leader.special.includes("Junior Leader")) {
            d = 3;
        }
        SetupCard(leader.name,"Command Dice: " + d,leader.nation);
        TeamArray[leader.teamID].order = choice;
        if (parseInt(leader.command) >= parseInt(leader.initiative)) {
            outputCard.body.push(leader.name + " has no more Command Points");
            PrintCard();
            return;
        }
        leader.command++;
        let moveDice = [];
        for (let i=0;i<3;i++) {
            moveDice.push(randomInteger(6));
        }
        switch (choice) {
            case 'Tactical Move':
                outputCard.body.push("Rolls: " + DisplayDice(moveDice[0],leader.nation,14));
                outputCard.body.push(leader.name + " can move " + moveDice[0] + '"');
                outputCard.body.push('-1" for Heavy Going');
                outputCard.body.push("No Crossing Obstacles");
                break;
            case 'Normal Move':
                outputCard.body.push("Rolls: " + DisplayDice(moveDice[0],leader.nation,14) + " / " + DisplayDice(moveDice[1],leader.nation,14));
                move = Math.max(0,moveDice[0] + moveDice[1])  + '"';
                move2 = Math.max(0,Math.max(moveDice[0],moveDice[1])) + '"';
                move3 = Math.max(0,Math.min(moveDice[0],moveDice[1])) + '"';
                outputCard.body.push(leader.name + " can move " + move);
                outputCard.body.push('Low Obstacle/Building: ' + move2);
                outputCard.body.push('Medium Obstacle: ' + move3);
                outputCard.body.push('-2" for Heavy Going');
                break;
            case 'At the Double':
                let out;
                if (parseInt(leader.token.get("bar1_value")) < parseInt(leader.token.get("bar1_max"))) {
                    outputCard.body.push("Rolls: " + DisplayDice(moveDice[0],leader.nation,14) + " / " + DisplayDice(moveDice[1],leader.nation,14));
                    out = leader.name + " can move " + moveDice[0] + moveDice[1] + '" (wounded)';
                } else {
                    outputCard.body.push("Rolls: " + DisplayDice(moveDice[0],leader.nation,14) + " / " + DisplayDice(moveDice[1],leader.nation,14) + " / " + DisplayDice(moveDice[2],leader.nation,14));
                    let move = parseInt(moveDice[0]) + parseInt(moveDice[1]) + parseInt(moveDice[2]);
                    out = leader.name + " can move " + move + '"'
                }
                outputCard.body.push(out);
                outputCard.body.push("Cannot Move in Broken or Heavy Ground");
                break;
            case 'Deploy':
                let roll = randomInteger(6);
                let keys = Object.keys(ModelArray);
                if (leader.special.includes("Junior Leader")) {
                    let leaderOffboard = false;
                    for (let i=0;i<keys.length;i++) {
                        let model2 = ModelArray[keys[i]];
                        if ((model2.special.includes("Senior Leader") || model2.special.includes("Adjutant")) && model2.player === leader.player && hexMap[model2.hexLabel].terrain.includes("Offboard")) {
                            leaderOffboard = true;
                            break;
                        };
                    }
                    if (leaderOffboard === false) {
                        outputCard.body.push("No Senior Leader or Adjutant Offboard: " + DisplayDice(roll,team1.nation,14));
                        if (roll < 4) {
                            outputCard.body.push(leader.name + " failed to receive the Orders");     
                            for (let i=0;i<teamIDs.length;i++) {
                                let team = TeamArray[teamIDs[i]];
                                team.order = "Failed to Deploy"
                            }
                            PrintCard();
                            return;
                        }
                    }
                }
                let radius;
                if (quality === "Green") {radius = 4};
                if (quality === "Regular") {radius = 6};
                if (quality === "Elite") {radius = 9};

                outputCard.body.push(leader.name + " can deploy within " + radius + '"' + " of a Jump Off Point");
                if (leader.special.includes("Junior Leader")) {
                    outputCard.body.push("His section or team may deploy with him");
                    outputCard.body.push("Troops deployed may not move but may fire");
                    outputCard.body.push(leader.name + " may issue Orders");
                } else {
                    outputCard.body.push("He may not move, but may issue Orders");
                }
                break;
        }
        PrintCard();
    }


    const Order = (msg) => {
        //!Order;@{selected|token_id};?{Order|Activate|Rally|Throw/Fire Grenade|Smoke Grenades|Fire Squad AT Weapon|Transfer Man to Target Team|Send Scouts};@{target|token_id}
        let Tag = msg.content.split(";");
        let leaderID = Tag[1];
        let order = Tag[2];
        let targetID = Tag[3];
        let otherTargetID = Tag[4]; //used in transfer or scouts
        let leader = ModelArray[leaderID];
        let leaderTeam = TeamArray[leader.teamID];
        let commandRange = leader.initiative * 30;
        let receivingTeam;

        SetupCard(leader.name,order,leader.nation);
        let errorMsg = "";
        if (leader.command >= leader.initiative) {
            errorMsg = "Unable to give any more Orders this Phase";
        }
        let target = ModelArray[targetID];
        let targetTeam = TeamArray[target.teamID];
        //change target to be the first base of team depending on order
        if (order.includes("Transfer") === false && order.includes("Scout") === false) {
            target = ModelArray[targetTeam.modelIDs[0]];
        }
        let targetSection = SectionArray[targetTeam.sectionID];

        if (TeamsInRange(leaderTeam,targetTeam,commandRange) === false) {
            errorMsg = "Target is out of Command Range";
        }

        if (order.includes("Transfer")) {
            receivingTeam = TeamArray[ModelArray[otherTargetID].teamID];
            if (!receivingTeam || receivingTeam === null) {
                errorMsg = "No Team?"
            }
            if (receivingTeam.id === targetTeam.id) {
                errorMsg = "Same Team";
            } else if (TeamsInRange(leaderTeam,receivingTeam,40) === false) {
                errorMsg = "Other Team is too far to Order the Transfer";
            }
            if (targetTeam.modelIDs.length === 1 && ModelArray[targetTeam.modelIDs[0]].special.includes("Crew")) {
                errorMsg = "Can't transfer from a Crewed Weapons Team";
            }
        }

        if (order.includes("Scouts")) {
            if (targetID === otherTargetID) {
                errorMsg = "Minimum 2 Man Team";
            } else {
                scout2 = ModelArray[otherTargetID];
                if (target.teamID !== scout2.teamID) {
                    errorMsg = "Scouts have to start in same team";
                }
                if (target.special.includes("Crew") || scout2.special.includes("Crew")) {
                    errorMsg = "Can't use Crew to form Scout Team";
                }
            }
        }

        let partOfTeamFlag = false; //leader is assoc/part of targetTeam
        if (TeamsInRange(leaderTeam,targetTeam,40) === true) {
            partOfTeamFlag = true;
        }

        if (order === "Rally" && errorMsg === "" && partOfTeamFlag === false) {
            //check if enemy in LOS, cant rally if is (not part of targetTeam)
            let keys = Object.keys(ModelArray);
            rallyloop1:
            for (let i=0;i<targetTeam.modelIDs.length;i++) {
                let tID = targetTeam.modelIDs[i];
                for (let j=0;j<keys.length;j++) {
                    let losResult = LOS(tID,keys[j],"Ignore Friendlies");
                    if (losResult === true) {
                        errorMsg = "Target Team is in LOS of an Enemy and can't be rallied";
                        break rallyloop1;
                    }
                }
            }
        }

        if (targetTeam.order !== "" && order === "Activate") {
            errorMsg = "Target has already been activated";
        }
        if (targetTeam.broken() === true && order !== "Rally") {
            errorMsg = "Target is Broken";
        }
        if (order.includes("Grenade") || order.includes("AT Weapon")) {
            if (targetTeam.order === "Overwatch" || targetTeam.order === "Tactical") {
                errorMsg = "Teams on Overwatch or Tactical can't throw Grenades or fire Section AT Weapons";
            }
        }

        if (errorMsg !== "") {
            outputCard.body.push(errorMsg);
        } else {
            leader.command += 1;
            if (order === "Rally") {
                outputCard.body.push("1 point of Shock rallied");
                let shock = parseInt(target.token.get("bar3_value"));
                shock -= 1;
                target.token.set("bar3_value",shock);
                UpdateShock(targetTeam);
            } else if (order.includes("Transfer")) {
                targetTeam.remove(target);
                target.token.set("statusmarkers","");
                let receivingLeader = ModelArray[receivingTeam.modelIDs[0]];
                if (receivingLeader.special.includes("Crew")) {
                    let crew = parseInt(receivingLeader.token.get("bar1_value"));
                    let maxCrew = parseInt(receivingLeader.token.get("bar1_max"));
                    if (crew < maxCrew) {
                        crew++;
                        receivingLeader.token.set("bar1_value",crew);
                        outputCard.body.push(target.name + " joins " + receivingLeader.name);
                        target.token.remove();
                    }
                } else {
                    receivingTeam.add(target);
                    target.token.set("gmnotes",receivingLeader.token.get("gmnotes"));
                    target.token.set("statusmarkers",receivingLeader.token.get("statusmarkers"));
                    outputCard.body.push(target.name + " transfers to " + receivingTeam.name);
                }
            } else if (order.includes("Scouts")) {
                let newTeam = new Team(leader.player,leader.nation,stringGen(),"Scouts",targetSection.id);
                let scoutNames = [];
                core = false;
                if (targetSection.core === true) {
                    core = true;
                }
                let gmn = core + ";" + targetSection.name + ";" + targetSection.id + ";" + "Scouts" + ";" + newTeam.id + ";" + "Scouts" + ";" + targetTeam.id;
                let num = targetSection.teamIDs.length;
                let marker = Nations[target.nation].teammarkers[num];
                targetTeam.remove(target);
                newTeam.add(target);
                scoutNames.push(target.name);
                target.token.set({
                    gmnotes: gmn,
                    statusmarkers: marker,
                });
                targetTeam.remove(scout2);
                newTeam.add(scout2);
                scoutNames.push(scout2.name);
                scout2.token.set({
                    gmnotes: gmn,
                    statusmarkers: marker,
                })
                newTeam.scout = true;
                newTeam.parentTeamID = targetTeam.id;
                newTeam.leader();
                targetTeam.leader();
                targetSection.add(newTeam);
                ModelArray[newTeam.modelIDs[0]].token.set(SM.order,true);
                outputCard.body.push(scoutNames[0] + " & " + scoutNames[1] + "  are detached as a Scout Team");
                outputCard.body.push("The Scouts may now activate and take a Move Order");
                UpdateShock(targetTeam);
            } else {
                outputCard.body.push("Unit can now " + order);
                //place status marker on team leader so that can use order
                target.token.set(SM.order,true);
            }
        }
        PrintCard();
    }






    const AddAbility = (abilityName,action,charID) => {
        createObj("ability", {
            name: abilityName,
            characterid: charID,
            action: action,
            istokenaction: true,
        })
    }    

    const AddAbilities = (msg) => {
        if (!msg) {return}
        let id = msg.selected[0]._id;
        if (!id) {return};
        let token = findObjs({_type:"graphic", id: id})[0];
        let model = ModelArray[token.id];
        if (!model) {
            sendChat("","Add into Model Array First");
            return;
        }
        let char = getObj("character", token.get("represents"));
        let abilityName,action;
        let abilArray = findObjs({  _type: "ability", _characterid: char.id});
        //clear old abilities
        for(let a=0;a<abilArray.length;a++) {
            abilArray[a].remove();
        } 
        let type = model.type;

        if (type === "Infantry") {
            let special = model.special;
            let section = SectionArray[model.sectionID];
            sectionFlag = true;
            if (section.teamIDs.length === 1) {
                sectionFlag = false;
            }
            if (special.includes("Leader") === false) {
                abilityName = "Activate" ;
                if (parseInt(model.token.get("bar1_value")) === 5) {
                    action = "!Activate;@{selected|token_id};Team;?{Stand and Fire|Rotate|Normal Move|At the Double|Deploy}";
                } else if (sectionFlag === true) {
                    action = "!Activate;@{selected|token_id};?{Unit|Team|Section};?{Action|Stand and Fire|Tactical Move|Move and Fire|Normal Move|At the Double|Deploy}";
                } else if (sectionFlag === false) {
                    action = "!Activate;@{selected|token_id};Team;?{Action|Stand and Fire|Tactical Move|Move and Fire|Normal Move|At the Double|Deploy}";
                } 
                AddAbility(abilityName,action,char.id);

                abilityName = "Orders";
                action = "!Activate;@{selected|token_id};Team;?{Action|Covering Fire|Overwatch}";
                AddAbility(abilityName,action,char.id);

                abilityName = "Fire";
                action = "!Fire;@{selected|token_id};@{target|token_id}";
                AddAbility(abilityName,action,char.id);

            } else {
                abilityName = "Issue Order";
                action = "!Order;@{selected|token_id};?{Order|Activate|Rally|Throw/Fire Grenade|Smoke Grenades|Fire Squad AT Weapon};@{target|token_id}";
                AddAbility(abilityName,action,char.id);
                if (model.special.includes("Junior")) {
                    abilityName = "Transfer Man"
                    action = "!Order;@{selected|token_id};Transfer;@{target|Man toTransfer|token_id};@{target|Team to Transfer To|token_id};";
                    AddAbility(abilityName,action,char.id);
                } 
                abilityName = "Move/Deploy";
                action = "!LeaderSelf;@{selected|token_id};?{Tactical Move|Normal Move|At the Double|Deploy}";
                AddAbility(abilityName,action,char.id);
                abilityName = "Send Scouts";
                action = "!Order;@{selected|token_id};Send Scouts;@{target|1st Man|token_id};@{target|2nd Man|token_id}";
                AddAbility(abilityName,action,char.id);


            }
        }

        if (type === "Gun") {
            let special = Attribute(char,"special");
            abilityName = "[1] Activate Team";
            if (special.includes("Immobile")) {
                action = "!Activate;@{selected|token_id};Team;?{Stand and Fire|Rotate|Deploy}";
            } else {
                action = "!Activate;@{selected|token_id};Team;?{Stand and Fire|Rotate|Normal Move|Deploy}";
            }
            AddAbility(abilityName,action,char.id);
            abilityName = "Fire";
            action = "!Fire;@{selected|token_id};@{target|token_id}";
            AddAbility(abilityName,action,char.id);





        }





    }


    const TeamsInRange = (team1,team2,range) => {
        if (!range) {range = 40}; //most things
        //returns true if a member of 1 is in range of a member of 2
        let inRange = false;
        inRangeLoop1:
        for (let i=0;i<team1.modelIDs.length;i++) {
            let id1 = team1.modelIDs[i];
            let model1 = ModelArray[id1];
            for (let j=0;j<team2.modelIDs.length;j++) {
                let id2 = team2.modelIDs[j];
                let model2 = ModelArray[id2];
                let dist = ModelDistance(model1,model2).distance;
                if (dist <= range) {
                    inRange = true;
                    break inRangeLoop1;
                }
            }
        }
        return inRange;
    }

    const PlaceMarker = (type,placingTeam) => {
        let img,w,h,charID;
        let placingTeamLeader = ModelArray[placingTeam.modelIDs[0]];
        if (type === "overwatch")  {
            img = getCleanImgSrc("https://s3.amazonaws.com/files.d20.io/images/350758041/b68-lK7VEeV5kUXd8OgekA/thumb.png?1689607404");
            w = 140;
            h = 70;
            charID = "-N_aLRXvf68lFjYj5V3V";
        } else if (type === "covering") {
            img = getCleanImgSrc("https://s3.amazonaws.com/files.d20.io/images/350758027/C1hQ7gQRBQpTshndyQ-XCw/thumb.png?1689607395");
            w = 300;
            h = 150;
            charID = "-N_aLD7-Jrij3WlVHaUl";
        }
        let sectionID = "000000";
        let teamID = stringGen();
        let markerSection = SectionArray[sectionID];
        if (!markerSection) {
            markerSection = new Section(placingTeamLeader.player,placingTeamLeader.nation,sectionID,"Markers",false,"");
        }
        let markerTeam = new Team(placingTeamLeader.player,placingTeamLeader.nation,teamID,"Markers",sectionID);
        markerSection.add(markerTeam);
        let gmn = false + ";Markers;" + sectionID + ";Markers;" + teamID + ";" + "Marker" + ";" + placingTeam.id;

        let location = hexMap[placingTeamLeader.hexLabel].centre
        let newToken = createObj("graphic", {   
            left: location.x,
            top: location.y,
            width: w, 
            height: h,  
            name: type,
            pageid: Campaign().get("playerpageid"),
            represents: charID,
            imgsrc: img,
            gmnotes: gmn,
            layer: "objects",
        });
        toFront(newToken);
        placingTeamLeader.markerID = newToken.id;
        let marker = new Model(newToken.id,sectionID,teamID,true);
        marker.placingTeamID = team.id
        markerTeam.add(marker);
    }

    const FinalizeMarker = (msg) => {
        let Tag = msg.content.split(";");
        let markerID = Tag[1];
        let marker = ModelArray[markerID];
        let teamID = marker.placingTeamID;
        let team = TeamArray[teamID]; //shooting team
        //Covering should be in LOS of one of team, move it to map layer
        if (marker.name === "overwatch") {
            SetupCard("Overwatch","",team.nation);
            let rotation = Angle(marker.token.get("rotation"));
            let hex = ModelArray[team.modelIDs[0]].hex;
            let pos = Math.floor(rotation/60);
            pos = Math.max(0,Math.min(pos,6));
            let dirs = ["Northeast","East","Southeast","Southwest","West","Northwest"];
            hex = hex.neighbour(dirs[pos]);          
            let location = hexMap[hex.label()].centre;
            marker.token.set({
                left: location.x,
                top: location.y,
                layer: "map",
            });
            for (let i=0;i<team.modelIDs.length;i++) {
                let model = ModelArray[team.modelIDs[i]];
                model.token.set("rotation",rotation);   
            }
            outputCard.body.push(team.name + " set on Overwatch");
        } else if (marker.name === "covering") {
            SetupCard("Covering Fire","",team.nation);
            let losCheck = false;
            for (let i=0;i<team.modelIDs.length;i++) {
                let losResult = LOS(team.modelIDs[i],markerID);
                if (losResult.los === true) {
                    losCheck = true;
                    break;
                }
            }
            if (losCheck === false) {
                outputCard.body.push("Team doesn't have LOS to the area selected");
                PrintCard();
                return;
            }
            marker.token.set("layer","map");
            outputCard.body.push(team.name + " lays down Covering Fire");
        } 
        PrintCard();
    }





/*
    const destroyGraphic = (tok) => {
        if (tok.get('subtype') === "token") {

//if is a CoC DIce then remove 6 points, remove id from state             --->   diceObj.set("name","CoC Dice");




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
            case '!Roll':
                RollD6(msg);
                break;
            case '!UnitCreation':
                UnitCreation(msg);
                break;
            case '!JumpOff':
                JumpOff();
                break;
            case '!StartGame':
                StartGame();
                break;
            case '!CommandDice':
                CommandDice(msg);
                break;
            case '!SetupGame':
                SetupGame(msg);
                break;
            case '!ToggleLab':
                ToggleLab();
                break;
            case '!Activate':
                UnitActivation(msg);
                break;
            case '!AddAbilities':
                AddAbilities(msg);
                break;
            case '!FinalizeMarker':
                FinalizeMarker(msg);
                break;
            case '!LeaderSelf':
                LeaderSelf(msg);
                break;
            case '!Order':
                Order(msg);
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
