//Epic Armageddon Master Script
const EpicArmageddon = (() => {
    const version = "4.7.24"

    if (!state.Armageddon || state.Armageddon == []) {
        state.Armageddon = {
            armourArray: [],
            playerInfo: {},
            orderList: [],
            nations: [],
            stratRating: [],
            factions: [],
            sides: [],
            positions: [],
            newTurn: [false,false],
            tokenID: [],
            rolls: [0,0,0,0,0,0,0],
        }
    } 

    let masterObjectArray = {};
    let terrain = [];
    let warEngineArray = [];
    let LOSLines = [];
    let crossExtra = false;
    const templateInfo = {
        backgroundColour: "#000000",
        fontColour: "#FFFFFF",
        borderStyle: "5px ridge",
        borderColour: "#FFFFFF",
    }
    const pageInfo = {
        page: "",
        gridType: "",
        scale: "",
    }

    let assaultInfo = {};

    const Factions = {
        //Chaos
        "Death Guard": {
            "image": "https://s3.amazonaws.com/files.d20.io/images/259335685/U2r2Mu50Ex3HvLWFb9JENg/thumb.png?1639018968",
            "backgroundColour": "#C7e716",
            "titlefont": "Rye",
            "fontColour": "#000000",
            "borderColour": "#03C04A",
            "borderStyle": "5px ridge",
            "strategy": 4,
        },

        "The Gifted": {
            "image": "https://s3.amazonaws.com/files.d20.io/images/293110971/gqvlUZdxstD2ZEH9OfD11g/thumb.png?1657064856",
            "backgroundColour": "#C7e716",
            "titlefont": "Rye",
            "fontColour": "#000000",
            "borderColour": "#03C04A",
            "borderStyle": "5px ridge",
            "strategy": 2,
        },
        
        //Imperial Guard
        "Cadian Shock Troops": {
            "image": "https://s3.amazonaws.com/files.d20.io/images/262998167/vYkEhSFdotJiLPRpme6FBQ/thumb.png?1641257871",
            "backgroundColour": "#FFFFFF",
            "titlefont": "IM Fell DW Pica",
            "fontColour": "#000000",
            "borderColour": "#000000",
            "borderStyle": "5px double",
            "strategy": 2,
        },
        "Steel Legion": {
            "image": "https://s3.amazonaws.com/files.d20.io/images/208112588/GntUV3Ma2pCTEdiIwv3_Dw/max.jpg?1615690979",
            "backgroundColour": "#FFFFFF",
            "titlefont": "IM Fell DW Pica",
            "fontColour": "#000000",
            "borderColour": "#000000",
            "borderStyle": "5px double",
            "strategy": 2,
        },
        "Baran Siegemasters": {
            "image": "https://s3.amazonaws.com/files.d20.io/images/180893577/HdENEJtkj8p3pIkINqVmww/max.png?1606353952",
            "backgroundColour": "#FFFFFF",
            "titlefont": "IM Fell DW Pica",
            "fontColour": "#000000",
            "borderColour": "#000000",
            "borderStyle": "5px double",
            "strategy": 2,
        },
        "Death Korps of Krieg": {
            "image": "https://s3.amazonaws.com/files.d20.io/images/271807119/jBV-a_a5aVVpxiHXueH3Ag/thumb.png?1645324175",
            "backgroundColour": "#FFFFFF",
            "titlefont": "IM Fell DW Pica",
            "fontColour": "#000000",
            "borderColour": "#000000",
            "borderStyle": "5px double",
            "strategy": 2,
        },
        "Tallarn Desert Raiders": {
            "image": "https://s3.amazonaws.com/files.d20.io/images/273657694/bBzhGDEgV113r80vQ-pZSA/thumb.png?1646271624",
            "backgroundColour": "#FFFFFF",
            "titlefont": "IM Fell DW Pica",
            "fontColour": "#000000",
            "borderColour": "#000000",
            "borderStyle": "5px double",
            "strategy": 2,
        },

        //Other Imperial Forces
        "Imperial Navy": {
            "image": "https://s3.amazonaws.com/files.d20.io/images/267285252/PSu77nGJ28XPj5qR8_BfEA/thumb.png?1643225709",
            "backgroundColour": "#FFFFFF",
            "titlefont": "IM Fell DW Pica",
            "fontColour": "#000000",
            "borderColour": "#000000",
            "borderStyle": "5px double",
            "strategy": 2,
        },
         "Titan Legions": {
            "image": "https://s3.amazonaws.com/files.d20.io/images/267640127/URcXXlTiAUzAUhG1UXlEug/thumb.png?1643400941",
            "backgroundColour": "#FFFFFF",
            "titlefont": "IM Fell DW Pica",
            "fontColour": "#000000",
            "borderColour": "#000000",
            "borderStyle": "5px double",
            "strategy": 3,
        },                  

        "Sisters of Battle": {
            "image": "https://s3.amazonaws.com/files.d20.io/images/274071812/si9tsgJzk-ybQFf99qyyGw/thumb.png?1646499826",
            "backgroundColour": "#276AB3",
            "titlefont": "Arial",
            "fontColour": "#8B0000",
            "borderColour": "#8B0000",
            "borderStyle": "5px double",
            "strategy": 3,
        },

        "Inquisition": {
            "image": "https://s3.amazonaws.com/files.d20.io/images/274145152/UOAkvHfOH4nQa3ZuF2953Q/thumb.png?1646521832",
            "backgroundColour": "#FFFFFF",
            "titlefont": "IM Fell DW Pica",
            "fontColour": "#000000",
            "borderColour": "#000000",
            "borderStyle": "5px double",
            "strategy": 3,
        },


        //Space Marines
        "Ultramarines": {
            "image": "https://s3.amazonaws.com/files.d20.io/images/286611627/kibk6ZIJ8UZrzPsyWXIlBg/thumb.png?1653405340",
            "backgroundColour": "#0000FF",
            "titlefont": "Arial",
            "fontColour": "#FFFFFF",
            "borderColour": "#0000FF",
            "borderStyle": "5px double",
            "strategy": 5 ,
        },

        "Imperial Fists": {
            "image": "https://s3.amazonaws.com/files.d20.io/images/267921781/dIG3mz1BnCHbt40vIqSdvQ/thumb.png?1643503215",
            "backgroundColour": "#FFEA00",
            "titlefont": "Arial",
            "fontColour": "#000000",
            "borderColour": "#000000",
            "borderStyle": "5px double",
            "strategy": 5,
        },


        //Xenos
        "Iybraesil": {
            "image": "https://s3.amazonaws.com/files.d20.io/images/275128821/W6PMmHuNUAIeZUm4nrBx7A/thumb.png?1647048558",
            "backgroundColour": "#3195B7",
            "titlefont": "Arial",
            "fontColour": "#FFFFFF",
            "borderColour": "#3195B7",
            "borderStyle": "5px double",
            "strategy": 4,
        },

        "Orks": {
            "image": "https://s3.amazonaws.com/files.d20.io/images/264354363/8Tc83eS0HHaoctWbV0Z9MA/thumb.png?1641928011",
            "backgroundColour": "#00FF00",
            "titlefont": "Goblin One",
            "fontColour": "#000000",
            "borderColour": "#00FF00",
            "borderStyle": "5px groove",
            "strategy": 3,
        },

    /*
        "": {
            "image": "",
            "backgroundColour": "",
            "titlefont": "",
            "fontColour": "",
            "borderColour": "",
            "borderStyle": "",
            "strategy": ,
        },
    */
    }

    //function to return point if lies within min/max range or return min/max
    const CLAMP = (val,min,max) => {
        return val>max ? max : val<min ? min : val
    }

    const BLASTCHECK = (centreID,targetID,radius) => {
        //rectangle in circle intersection basically
        // where blastCentre is the target icon token and target is the target being queried
        // radius is the blast radius (from the weapon), scale is pagescale
        // theta is rotation of the rectangle, in degrees
        // Angle in radians = Angle in degrees x PI / 180
        let centreObj = masterObjectArray[centreID];
        let targetObj = masterObjectArray[targetID];
        let caught = false;
        let cXo = Number(centreObj.location.x);
        let cYo = Number(centreObj.location.y);
        let dX = Number(targetObj.location.x);
        let dY = Number(targetObj.location.y);

        let theta = -(Number(targetObj.rotation)*Math.PI/180); //convert to radians
        let width = Number(targetObj.width);
        let height = Number(targetObj.height);
        let dXmin = dX - (width/2);
        let dXmax = dX + (width/2);
        let dYmin = dY - (height/2);
        let dYmax = dY + (height/2);
        //rotated circles centre
        let cX = (Math.cos(theta) * (cXo - dX)) - (Math.sin(theta)*(cYo - dY)) + dX
        let cY = (Math.sin(theta) * (cXo - dX)) + (Math.cos(theta)*(cYo - dY)) + dY
        //closest point
        let eX = CLAMP(cX,dXmin,dXmax)
        let eY = CLAMP(cY,dYmin,dYmax)

        let A = (eX - cX)
        let B = (eY - cY)
        let C = Math.sqrt(A*A + B*B)
        C = Math.round(C/70)*pageInfo.scale 
        if (C<=radius) {
            caught = true
        }
        return caught
    }

    const DisplayState = () => {
        log(state.Armageddon);
    }

    const TerrainPolygons = () => {
        //using paths on GM Layer, define polygons that are terrain peices
        //colours of walls define what kind of terrain it is
        let paths = findObjs({                              
          _pageid: Campaign().get("playerpageid"),                              
          _type: "path",
          layer: "gmlayer"
        });

        let vertices = [];
        pageInfo.page = getObj('page', Campaign().get("playerpageid"));
        pageInfo.gridType = pageInfo.page.get("grid_type");
        pageInfo.scale = pageInfo.page.get("snapping_increment");

        paths.forEach((pathObj) => {
            let path = JSON.parse(pathObj.get("path"));
            let center = new pt(pathObj.get("left"), pathObj.get("top"));
            let w = pathObj.get("width");
            let h = pathObj.get("height");
            let rot = pathObj.get("rotation");
            let scaleX = pathObj.get("scaleX");
            let scaleY = pathObj.get("scaleY");
            let colour = pathObj.get("stroke")

            let maxX = 0;
            let maxY = 0;
            let minX = Infinity;
            let minY = Infinity;

            let terrainType = ""
            let infeffect = "nil"
            let vsave = 7
            let cover,isave,height,tokenheight,obscure,supportHeight;
            let stack = false;
            if (colour == "#00ff00") {
                terrainType = "Woods"
                cover = true
                isave = 5
                height = 1
                tokenheight = 0
                obscure = "Partial" 
                supportHeight = 1
                stack = true;
            }
            if (colour == "#20124d") {
                terrainType = "Ruins"
                cover = true
                isave = 4
                height = 0
                tokenheight = 0
                obscure = "Partial" 
                supportHeight = 1
                stack = true;
            }
            if (colour == "#000000") {
                terrainType = "Hill 1"
                cover = false
                isave = 7
                height = 1
                tokenheight = 1
                obscure = "Complete"
                supportHeight = 1
            }
            if (colour == "#434343") {
                terrainType = "Hill 2"
                cover = false
                isave = 7
                height = 2
                tokenheight = 2
                obscure = "Complete"
                supportHeight = 2
            }
            if (colour == "#d9d9d9") {
                terrainType = "Hill 2" //alternate to stand out
                cover = false
                isave = 7
                height = 2
                tokenheight = 2
                obscure = "Complete"
                supportHeight = 2
            }
            if (colour == "#666666") {
                terrainType = "Hill 3"
                cover = false
                isave = 7
                height = 3
                tokenheight = 3
                obscure = "Complete"
                supportHeight = 3

            }
            if (colour == "#d9ead3") {
                terrainType = "Hill 4"
                cover = false
                isave = 7
                height = 4
                tokenheight = 4
                obscure = "Complete"
                supportHeight = 4
            }            
            if (colour == "#ffffff") {
                terrainType = "Road"
                cover = false
                isave = 7
                height = 0
                tokenheight = 0
                obscure = "None"
                supportHeight = 0
                stack = true;
            }
            if (colour == "#980000") {
                terrainType = "Building 1"
                cover = true
                isave = 4
                height = 1
                tokenheight = 0
                obscure = "Complete"
                supportHeight = 1;
                stack = true;
            }
            if (colour == "#ff9900") {
                terrainType = "Building 2"
                cover = true
                isave = 4
                height = 2
                tokenheight = 1
                obscure = "Complete"
                supportHeight = 2
                stack = true;
            }
            if (colour == "#cc4125") {
                terrainType = "Building 3"
                cover = true
                isave = 4
                height = 3
                tokenheight = 1
                obscure = "Complete"
                supportHeight = 3
                stack = true;
            }
            if (colour == "#f1c232") {
                terrainType = "Building 4"
                cover = true
                isave = 4
                height = 4
                tokenheight = 1
                obscure = "Complete"
                supportHeight = 4
                stack = true;
            }
            if (colour == "#b4a7d6") {
                terrainType = "Stockyard"
                cover = true
                isave = 5
                height = 0
                tokenheight = 0
                obscure = "Partial"
                supportHeight = 1
                stack = true;
            }       
            if (colour == "#ff0000") {
                terrainType = "Fortifications"
                cover = true
                isave = 3
                height = 1
                tokenheight = 0
                obscure = "Complete"
                supportHeight = 1
                stack = true;
            }
            if (colour == "#00ffff") {
                terrainType = "Marsh"
                cover = true
                isave = 6
                height = 0
                tokenheight = 0
                obscure = "None"
                supportHeight = 0
                stack = true;
            }
            if (colour == "#0000ff") {
                terrainType = "River"
                cover = true
                isave = 6
                height = 0
                tokenheight = 0
                obscure = "None"
                supportHeight = 0
            }
            if (colour == "#b6d7a8") {
                terrainType = "Scrub/Crops"
                cover = true
                isave = 6
                height = 0
                tokenheight = 0
                obscure = "Partial"
                supportHeight = 0;
                stack = true;
            }
            if (colour == "#ffd966") {
                terrainType = "Orchard"
                cover = true
                isave = 6
                height = 0
                tokenheight = 0
                obscure = "Partial"
                supportHeight = 0;
                stack = true;
            }        
        
            if (colour == "#fce5cd") {
                terrainType = "Rubble"
                cover = true
                isave = 4
                height = 0
                tokenheight = 0
                obscure = "Partial"
                supportHeight = 1
                stack = true;
            }

            if (colour == "#274e13") {
                terrainType = "Jungle"
                cover = true
                isave = 4
                height = 1
                tokenheight = 0
                obscure = "Partial"
                supportHeight = 1
                stack = true;
            }

            if (colour == "#6aa84f") {
                terrainType = "Bocage"
                cover = true
                isave = 4
                height = 1
                tokenheight = 0
                obscure = "Partial"
                supportHeight = 1
                stack = true;
            }


            if (colour == "#5b0f00") {
                terrainType = "Craters"
                cover = true
                isave = 4
                height = 0
                tokenheight = 0
                obscure = "None"
                supportHeight = 0
                stack = true;
            }

            if (colour == "#d5a6bd") {
                terrainType = "Table Edge"
                cover = false
                isave = 7
                height = 100000
                tokenheight = 0
                obscure = "None"
                supportHeight = 100000
                stack = true;
            }

            if (colour == "#a64d79") {
                terrainType = "Wall"
                cover = true
                isave = 5
                height = 0
                tokenheight = 0
                obscure = "Partial"
                supportHeight = 0
                stack = true;
            }

            if (terrainType == "") {return} 
            //covert path vertices from relative coords to actual map coords
            path.forEach((vert) => {
                let tempPt = GetAbsoluteControlPt(vert, center, w, h, rot, scaleX, scaleY);
                if (isNaN(tempPt.x) || isNaN(tempPt.y)) {return}
                vertices.push(tempPt);             
                maxX = Math.max(maxX,tempPt.x);
                maxY = Math.max(maxY,tempPt.y);
                minX = Math.min(minX,tempPt.x);
                minY = Math.min(minY,tempPt.y);
            });
            terrainObj = {
                type: terrainType,
                cover: cover, //cover provided?
                infSave: isave, //infantry save
                vehSave: vsave, //vehicle save (usually 7)
                vertices: vertices,
                height: height,
                tokenheight: tokenheight,
                supportHeight: supportHeight,
                obscure: obscure,
                stack: stack,
                maxX: maxX,
                maxY: maxY,
                minX: minX,
                minY: minY,
            }
            terrain.push(terrainObj)       
            //cleanup before next pathObj
            vertices = [];
        });

        //now check Map layer for Bunkers, Trenches, Gun Emplacements
        let mapTokenArray = findObjs({
            _pageid: Campaign().get("playerpageid"),
            _type: "graphic",
            _subtype: "token",
            layer: "map",
        })

        for (let i=0;i<mapTokenArray.length;i++) {
            let vsave = 7;
            let obj = mapTokenArray[i]
            let names = ["Bunker","Trench","Gun Emplacement","Minefield"]
            let name = obj.get("name")
            if (names.includes(name) == false && name.includes("Bastion") == false) {continue}
            let vertices = tokenVertices(obj);
            let maxX = 0;
            let maxY = 0;
            let minX = Infinity;
            let minY = Infinity;

            for (let i=0;i<4;i++) {
                maxX = Math.max(maxX,vertices[i].x);
                maxY = Math.max(maxY,vertices[i].y);
                minX = Math.min(minX,vertices[i].x);
                minY = Math.min(minY,vertices[i].y);
            }

            if (name == "Bunker") {
                terrainType = "Bunker"
                cover = true
                isave = 3
                height = 0
                tokenheight = 0
                obscure = "Partial"
                supportHeight = 1
            } else if (name == "Trench") {
                terrainType = "Trench"
                cover = true
                isave = 4
                height = 0
                tokenheight = 0
                obscure = "None"
                supportHeight = 1
            } else if (name == "Gun Emplacement") {
                terrainType = "Gun Emplacement"
                cover = true
                isave = 4
                vsave = 5
                height = 0
                tokenheight = 0
                obscure = "None"
                supportHeight = 1
            } else if (name == "Minefield") {
                terrainType = "Minefield"
                cover = false
                isave = 7
                vsave = 7
                height = 0
                tokenheight = 0
                obscure = "None"
                supportHeight = 1                
            } else if (name.includes("Bastion")) {
                terrainType = "Rubble"
                cover = true
                isave = 4
                height = 0
                tokenheight = 0
                obscure = "Partial"
                supportHeight = 1
                stack = true;
            }

            terrainObj = {
                type: terrainType,
                cover: cover,
                infSave: isave,
                vehSave: vsave,
                vertices: vertices,
                height: height,
                tokenheight: tokenheight,
                supportHeight: supportHeight,
                obscure: obscure,
                stack: true,
                maxX: maxX,
                maxY: maxY,
                minX: minX,
                minY: minY,
            }
            terrain.push(terrainObj)
        }

        //adjust terrain heights of 'stackable' terrain like buildings on top of hills 
        for (let i=0;i<terrain.length;i++) {
            let poly1 = terrain[i];
            let addedHeight = 0;
            if (poly1.stack == false) {continue}
            for (let j=0;j<terrain.length;j++) {
                if (j==i) {continue};
                let poly2 = terrain[j]
                if (poly2.stack == true) {continue};
                if (poly1.minX > poly2.maxX || poly1.maxX < poly2.minX || poly1.minY > poly2.maxY || poly1.maxY < poly2.minY) {continue}
                let check = pointInPolygon(poly1.vertices[0],poly2); //check if poly1 is inside poly2
                if (check == false) {
                    check = polyPoly(poly1,poly2); //check if they overlap
                }
                if (check == false) {continue}
                let height2 = poly2.height;
                addedHeight = Math.max(addedHeight,height2);
            }
            terrain[i].height += addedHeight;
            terrain[i].tokenheight += addedHeight;
            terrain[i].supportHeight += addedHeight;
        }
    }

    const polyPoly = (poly1,poly2) => {
        let vertices = poly2.vertices
        let len = (vertices.length - 1)
        for (let v=0;v<len;v++) {
            let pt1 = vertices[v]
            let pt2 = vertices[v+1]
            cross = polyLine(poly1,pt1,pt2)
            if (cross.length > 0) {
                return true
            }
        }
        return false
    }

    const MOA = () => {
        //create an array of all tokens that are in formations and get their information, terrain etc
        //also make a sub-array of warengine ids for LOS purposes
        let start = Date.now();
        let tokens = findObjs({
            _pageid: Campaign().get("playerpageid"),
            _type: "graphic",
            _subtype: "token",
            layer: "objects",
        })
        let c = tokens.length;
        let s = (1===c?'':'s');

        const burndown = () => {
          let t = tokens.shift();
          if(t){
            let name = t.get("name");
            let loc = new pt(Math.round(t.get("left")),Math.round(t.get("top")));
            let rotation = t.get("rotation");
            let vertices = [];
            let gmnotes = unescape(t.get("gmnotes")).split(";");
            let unit = getObj("character", t.get("represents"));    
            if (gmnotes != null && unit != null) {
              let player = gmnotes[0];
              let formationNumber = Number(gmnotes[1]);
              let attributeArray = AttributeArray(unit.id);
              //let ter = TokensTerrain(t);
              if (attributeArray.type.includes("War")) {
                vertices = tokenVertices(t);
                warEngineArray.push(t.id);
              }       
              let height = t.get("height");
              let width = t.get("width");
              obj = {
                name: name,
                health: t.get("bar1_value"),
                player: player,
                formationNumber: formationNumber,
                attributeArray: attributeArray,
                terrain: [],
                location: loc,
                rotation: rotation,
                vertices: vertices,
                height: height,
                width: width,
              }

              masterObjectArray[t.id] = obj;
              let ter = TokensTerrain(t);
              masterObjectArray[t.id].terrain = ter;
              ModeWeapons(t.id);
            }
            setTimeout(burndown,0);
          } else {
            let elapsed = Date.now()-start;
            log(`${c} token${s} loaded in ${elapsed/1000} seconds.`);
          }
        };

        // start the burndown.
        burndown();
    }

    function GetAbsoluteControlPt(controlArray, center, w, h, rot, scaleX, scaleY) {
        let len = controlArray.length;
        let point = new pt(controlArray[len-2], controlArray[len-1]);
        
        //translate relative x,y to actual x,y 
        point.x = scaleX*point.x + center.x - (scaleX * w/2);
        point.y = scaleY*point.y + center.y - (scaleY * h/2);
        
        point = RotatePoint(center.x, center.y, rot, point);
            
        return point;
    }

    function DegreesToRadians(degrees) {
        let pi = Math.PI;
        return degrees * (pi/180);
    }
    
    //cx, cy = coordinates of the center of rotation
    //angle = clockwise rotation angle
    //p = point object
    function RotatePoint(cX,cY,angle, p) {
        //cx, cy = coordinates of the center of rotation
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
    
    function pt(x,y) {
        this.x = x,
        this.y = y
    }

    //convert a token to an object with vertices (corners) with final being the first (used for token in token check)
    function tokenVertices(tok) {
      let corners = []
      let tokX = tok.get("left")
      let tokY = tok.get("top")
      let w = tok.get("width")
      let h = tok.get("height")
      let rot = tok.get("rotation") * (Math.PI/180)

      //define the four corneros of the target token as new points
          //we will also rotate those corners appropirately around the target tok center
      corners.push(RotatePoint(tokX, tokY, rot, new pt( tokX-w/2, tokY-h/2 )))     //Upper left
      corners.push(RotatePoint(tokX, tokY, rot, new pt( tokX+w/2, tokY-h/2 )))     //Upper right
      corners.push(RotatePoint(tokX, tokY, rot, new pt( tokX+w/2, tokY+h/2 )))     //Lower right
      corners.push(RotatePoint(tokX, tokY, rot, new pt( tokX-w/2, tokY+h/2 )))     //Lower left
      corners.push(RotatePoint(tokX, tokY, rot, new pt( tokX-w/2, tokY-h/2 )))     //Upper left

      return corners
    }

    function TokensTerrain(token) {
        //identify Terrain the token is in and send back an array of terrain the token is in, plus the final height, best infantry save, and if has net cover
        //eg forest on hilltop      
        let id1 = token.get("id");
        let obj;
        let coverCheck = false;
        let obscure = "None";
        let platform = false;
        let finalHeight = 0;
        let finalInfSave = 7;
        let finalVehSave = 7;
        let supportHeight = 0;
        let whatPoly = [];
        let point = new pt(token.get("left"),token.get("top"));
        let tokenMarkers = token.get("statusmarkers");
        if (!tokenMarkers) {tokenMarkers = ""};
        if (masterObjectArray[id1]) {
             obj = masterObjectArray[id1];
        } else {
            return "Not in MOA Yet";
        }
        let player = obj.player;
        let formationNumber = obj.formationNumber;
        let type = obj.attributeArray.type;

        if (type.includes("Aircraft") == false || tokenMarkers.includes("snail")) {
          for (p=0;p<terrain.length;p++) {
            polygon = terrain[p]
            if (token.get("left") > polygon.maxX || token.get("left") < polygon.minX || token.get("top") < polygon.minY || token.get("top") > polygon.maxY) {continue} 
            let check = pointInPolygon(point,polygon)
            if (check == true) {
              whatPoly.push(polygon)
              finalHeight = Math.max(polygon.tokenheight,finalHeight)
              supportHeight = Math.max(polygon.supportHeight,supportHeight);
              if (finalHeight < 0) {
                supportHeight = 0
              }
              if (polygon.cover == true && obj.attributeArray.notes.includes("Support") == false) {coverCheck = true}
              if (polygon.obscure == "Partial" && obscure == "None") {obscure = "Partial"}
              if (polygon.obscure == "Complete") {obscure = "Complete"}
              finalInfSave = Math.min(polygon.infSave,finalInfSave)
              finalVehSave = Math.min(polygon.vehSave,finalVehSave)
            }
          }
        }

        let edge = findObjs({                             
                _pageid: Campaign().get("playerpageid"),                              
                _type: "path",
                layer: "gmlayer",
                stroke: "#d5a6bd",
        })[0]

        let left = edge.get("left")

        if (token.get("left") > left) {
            terrainObj = {
              type: "Offboard",
              cover: false, //cover provided?
              infSave: 7, //infantry save
              vehSave: 7,
              vertices: "",
              height: 0,
              tokenheight: 0,
              supportHeight: 0,
              obscure: "None",
            }
            whatPoly.push(terrainObj) 
        }

        if (whatPoly.length == 0 && type.includes("Aircraft") == false) {
            if (type === "Infantry" && player && formationNumber) { //infantry on Overwatch in open (removed when fire)
              if (state.Armageddon.playerInfo[player].formations[formationNumber].currentOrder == "Overwatch" || state.Armageddon.playerInfo[player].formations[formationNumber].currentOrder == "Garrison Overwatch") {
                coverCheck = true
                finalInfSave = 5
              }
            }
            terrainObj = {
              type: "Open Ground",
              cover: false, //cover provided?
              infSave: 7, //infantry save
              vehSave: 7,
              vertices: "",
              height: 0,
              tokenheight: 0,
              supportHeight: 0,
              obscure: "None",
            }
          whatPoly.push(terrainObj) 
        }

        if ((type.includes("Aircraft") && tokenMarkers.includes("snail") == false )  || type.includes("Spacecraft")) {
          terrainObj = {
              type: "Airspace",
              cover: false, //cover provided?
              infSave: 7, //infantry save
              vehSave: 7,
              vertices: "",
              height: 0,
              tokenheight: 1000000
            }
          whatPoly.push(terrainObj)
          finalHeight = 1000000
        }


        //check for platforms on WE
        if (type == "Infantry") {
            for (let i=0;i<warEngineArray.length;i++) {
                warEngineID = warEngineArray[i];
                warEngine = masterObjectArray[warEngineID];
                if (warEngine.attributeArray.notes.includes("Platform") == false) {continue}
                let check = pointInPolygon(point,warEngine)
                if (check == true) {
                    coverCheck = true;
                    platform = true;
                    break;
                }    
            }
        }

        tokenPolyInfo = {
          whatPolys: whatPoly,
          finalHeight: finalHeight,
          finalInfSave: finalInfSave,
          finalVehSave: finalVehSave,
          coverCheck: coverCheck,
          supportHeight: supportHeight,
          obscure: obscure,
          platform: platform,
        }

        return tokenPolyInfo
    }

    const Dump = () => {
        log(masterObjectArray)
        log(state.Armageddon)
        log(terrain)
    }

    function AttributeArray(unitid) {
        let aa = {}
        let attributes = findObjs({_type:'attribute',_characterid: unitid})
        for (let j=0;j<attributes.length;j++) {
            let name = attributes[j].get("name")
            let current = attributes[j].get("current")  
            aa[name] = current
        }
        if (!aa.dc) {aa["dc"] = 1}
        aa["dcMax"] = aa.dc

        let keys = Object.keys(Factions);
        for (let k=0;k<keys.length;k++) {
            if (Factions[keys[k]].image == aa.nationimage) {
                aa["faction"] = keys[k];
                break;
            }
        }

        if (!aa.notes) {aa["notes"] = ""}
        if (!aa.shields) {
            aa.shields = 0;
        } else {
            aa.shields = Abacus(aa.shields);
        }
        if(!aa.criticaleffect) {aa.criticaleffect = ""};
        return aa
    }

    const PLUS = (val) => {
        val = val.toString();
        val = Number(val.replace("+",""));
        if (isNaN(val)) {val = 7};
        return val;
    }

    function pointHexDistance(point1,point2) {
        let distance;
        switch(pageInfo.gridType) {
            case 'hex':
                distance = hexVDistance([point1.x, point1.y], [point2.x, point2.y], pageInfo.scale);
                break;
            case 'hexr':
                distance = hexHDistance([point1.x, point1.y], [point2.x, point2.y], pageInfo.scale);
                break;
        }
        return distance;
    }
    function hexHDistance(unit1, unit2, scale) {
        let q1, q2, r1, r2;
        q1 = Math.round((unit1[0] - 46.48512749037782) / (69.58512749037783 * scale));
        r1 = Math.round((unit1[1] - (39.8443949917523 * scale)) / (39.8443949917523 * scale));
        r1 = Math.floor(r1 / 2);
        q2 = Math.round((unit2[0] - 46.48512749037782) / (69.58512749037783 * scale));
        r2 = Math.round((unit2[1] - (39.8443949917523 * scale)) / (39.8443949917523 * scale));
        r2 = Math.floor(r2 / 2);
        return cubeDistance(oddQToCube(q1, r1), oddQToCube(q2, r2));
    }
    function hexVDistance(unit1, unit2, scale) {
        let q1, q2, r1, r2;
        q1 = Math.round((unit1[0] - (37.59928099223013 * scale)) / (37.59928099223013 * scale));
        r1 = Math.round((unit1[1] - 43.86582782426834) / (66.96582782426833 * scale));
        q1 = Math.floor(q1 / 2);
        q2 = Math.round((unit2[0] - (37.59928099223013 * scale)) / (37.59928099223013 * scale));
        r2 = Math.round((unit2[1] - 43.86582782426834) / (66.96582782426833 * scale));
        q2 = Math.floor(q2 / 2);
        return cubeDistance(oddRToCube(q1, r1), oddRToCube(q2, r2));
    }
    function oddRToCube(q, r) {
        let x, y, z;
        x = q - (r - (r & 1)) / 2;
        z = r;
        y = -x - z;
        return [x, y, z];
    }
    function oddQToCube(q, r) {
        let x, y, z;
        x = q;
        z = r - (q - (q & 1)) / 2;
        y = -x - z;
        return [x, y, z];
    }
    function cubeDistance(cube1, cube2) {
        return Math.max(Math.abs(cube1[0] - cube2[0]), Math.abs(cube1[1] - cube2[1]), Math.abs(cube1[2] - cube2[2]));
    }

    //evaluate if point is in the polygon
    function pointInPolygon(point,polygon) {
        px = point.x
        py = point.y
        collision = false
        vertices = polygon.vertices

        len = vertices.length - 1
        for (let c=0;c<len;c++) {
            vc = vertices[c]
            vn = vertices[c+1]
            if (((vc.y >= py && vn.y < py) || (vc.y < py && vn.y >= py)) && (px < (vn.x-vc.x)*(py-vc.y)/(vn.y-vc.y)+vc.x)) {
                collision = !collision
            }
        }
        return collision
    }

    function ClosestDistance(id1,id2) {   
      
        let unit1 = masterObjectArray[id1];
        let unit2 = masterObjectArray[id2];
        if (!unit1 || !unit2) {return Infinity}
        let type1 = unit1.attributeArray.type;
        let type2 = unit2.attributeArray.type;
        let location1 = unit1.location;
        let location2 = unit2.location;
        let unit1Vertices = unit1.vertices;
        let unit2Vertices = unit2.vertices;
        let point;

      if (type1.includes("War") == false && type2.includes("War") == false) { //both single hex tokens
        let distance = pointHexDistance(location1,location2)
        return distance
      }

      if (type1.includes("War") && type2.includes("War")) { //both war engines
        let closestDist = Infinity
        for (let c=0;c<4;c++) {
          for (let d=0;d<4;d++) {
            let dist = pointLine(unit1Vertices[c].x,unit1Vertices[c].y,unit2Vertices[d].x,unit2Vertices[d].y,unit2Vertices[d+1].x,unit2Vertices[d+1].y)
            if (dist < closestDist) {closestDist = dist}
          }
        }
        for (c=0;c<4;c++) {
          for (d=0;d<4;d++) {
            let dist = pointLine(unit2Vertices[c].x,unit2Vertices[c].y,unit1Vertices[d].x,unit1Vertices[d].y,unit1Vertices[d+1].x,unit1Vertices[d+1].y)
            if (dist < closestDist) {closestDist = dist}
          }
        }
        return closestDist
      }

      //getting to here means 1 is a war engine only
      let closestDist = Infinity

      if (type1.includes("War")) {
          for (let c=0;c<4;c++) {
            let dist = pointLine(location2.x,location2.y,unit1Vertices[c].x,unit1Vertices[c].y,unit1Vertices[c+1].x,unit1Vertices[c+1].y)
            if (dist < closestDist) {closestDist = dist}
          }
      } 
      if (type2.includes("War")) {      
          for (let c=0;c<4;c++) {
            let dist = pointLine(location1.x,location1.y,unit2Vertices[c].x,unit2Vertices[c].y,unit2Vertices[c+1].x,unit2Vertices[c+1].y)
            if (dist < closestDist) {closestDist = dist}
          }
      } 
      return closestDist
    }


    function pointLine(x,y,x1,y1,x2,y2) {
        let A = x - x1;
        let B = y - y1;
        let C = x2 - x1;
        let D = y2 - y1;

        let dot = A * C + B * D;
        let len_sq = C * C + D * D;
        let param = -1;
        if (len_sq != 0) //in case of 0 length line
            param = dot / len_sq;

        let xx, yy;

        if (param < 0) {
          xx = x1;
          yy = y1;
        }
        else if (param > 1) {
          xx = x2;
          yy = y2;
        }
        else {
          xx = x1 + param * C;
          yy = y1 + param * D;
        }

        point1 = {
          x: x,
          y: y
        }

        point2 = {
          x: xx,
          y: yy
        }

        let dist = pointHexDistance(point1,point2)
        return dist
    }

    //Retrieve Values from Character Sheet Attributes
    function Attribute(character,attributename) {
        let attributeobj = findObjs({type:'attribute',characterid: character.id, name: attributename})[0]
        let attributevalue = 0
        if (attributeobj) {
            attributevalue = attributeobj.get('current')
        }
        return attributevalue
    }

    //takes a 1 or 1d3 or 1d3+1 and feeds back the end result
    function Abacus(info) {
        if (info == 0.5) {return 0.5}  
        let result = 0;
        info = info.toString()
        info = info.toLowerCase()
        if (info.indexOf("d") == 0) {info = "1" + info}
        info = info.split("d")
        pt1 = info[0].replace(/[^\d]/g, "");
        if (pt1) {
            pt1 = Number(pt1);
        } else {
            pt1 = 1
        }
        pt2 = info[1]
        if (pt2) {
            pt2 = pt2.split("+")
            pt3 = pt2[1];
            if (pt3) {pt3 = pt3.replace(/[^\d]/g, "")}
            pt2 = Number(pt2[0])
            for (let r=0;r<pt1;r++) {
                res = Number(randomInteger(pt2))
                result += res
            }
            if (pt3) {
                result += Number(pt3)
            }
        } else {
            result = pt1
        }
        return result
    }

    function Markers(array,num,func) {
        markers = ["2006603: Green-01","2006626: Red-01","2006607: Green-02","2006628: Red-02","2006611: Green-03","2006629: Red-03","2006614: Green-04","2006631: Red-04","2006615: Green-05","2006633: Red-05","2006649: Torch","2006398: Plus","2006466: Blood-Transparent"," 2006468: Wet-or-Water-Transparent","2006470: Acid-or-Poison-Transparent"," 2006476: Cold","2006480: Animal-Form","2006492: Poison","2006495: Shield","2006499: Stunned","2006515: Drunk-Transparent"," 2006522: Mounted-Transparent","2006525: Red-CloakTransparent","2006401: Plus-1d4","2006402: Plus-1d6","2006403: Plus-1d8","2006404: Plus-1d10","2006406: Plus-1d12","2006409: Plus-1d20","2006412: Plus-1d30","2006429: Minus-1d4","2006434: Minus-1d6","2006438: Minus-1d8","2006442: Minus-1d10","2006445: Minus-1d12","2006449: Minus-1d20","2006454: Minus-1d30","2006462: Advantage-or-Up","2006464: Disadvantage-or-Down","2006527: Sick-or-Diseased-Transparent","2006530: Stealth-or-Hidden-Transparent","2006549: Slimed-Black-Transparent","2006550: Slimed-Blue - Transparent","2006554: Slimed-Brown-Transparent","2006558: Slimed-Green-Transparent","2006560: Slimed-Mustard-Transparent","2006566: Slimed-Orange-Transparent","2006574: Slimed-Purple-Transparent","2006582: Slimed-Red-Transparent"]
        newSM = markers[num]
        if (func == "marker") {return newSM}
        for (let f=0;f<array.length;f++) {
            let tok = array[f]
            sm = tok.get("statusmarkers").toString()
            if (sm.includes(newSM)) {continue}
            sm += "," + newSM
            tok.set("statusmarkers",sm)
        }
    }

    const RotateFormation = (form,id2) => {
      let unitIDs = form.unitIDs;
      for (let i=0;i<unitIDs.length;i++) {
        let id1 = unitIDs[i];
        let tok = findObjs({_type: "graphic", id: id1})[0];
        let obj1 = masterObjectArray[id1];
        let type = obj1.attributeArray.type;
        if (type.includes("War") || type.includes("Air") || type.includes("Spacecraft")) {continue}
        let angle = TokenAngle(id1,id2);
        tok.set("rotation",angle);
        masterObjectArray[id1].rotation = angle;
      }
    }

    function UnitName(unit,fnum,num) {
        fnum = Number(fnum) + 1
        num = Number(num) + 1
        let type = Attribute(unit,"type")
        let notes = Attribute(unit,"notes").toString()
        let name = unit.get("name")
        let titles = ["Iyanden ","Biel-Tan ","Ulthwe ","Saim-Hann ","Yme-Loc ","Lugganath ","Iybraesil ","Deathguard ","Gifted ", "Dark Angel ","Emperor's Children ","Thousand Sons ", "Black Legion ","Squat ", "Space Wolves ", "Blood Angels ","Imperial Fists ","Salamanders ","Ultramarine ","Iron Hands ","Necron ", "Vior'la", "Iron Warriors","Tallarn ","SOB", "Baran", "Cadian "]
        let character = Attribute(unit,"character")
        for (let r=0;r<titles.length;r++) {
            let title = titles[r]
            if (name.includes(title)) {
                name = name.replace(title,"")
                break
            }
        }
        if ((type.includes("Infantry") || type === "Aircraft") && character == 0) {
            name = name + " " + fnum + "-" + num
        }
        if (type.includes("Vehicle") && character == 0) {
            name = name + " " + fnum + "0" + num
        }
        if (type.includes("Engine") && character == 0) {
            name = name + " " + num
        }
        return name
    }

    const Template = (faction) => {
        let template = "!scriptcard {{ --#title|<<SUBJECTNAME>> --#titleCardBackground|" + Factions[faction].backgroundColour + " --#titleFontSize|1.4em --titleFontLineHeight|1.4em --#titlefontshadow|none --#subtitleFontFace|Arial --#subtitleFontColor|" + Factions[faction].fontColour + " --#oddrowbackground|#EEEEEE --#oddrowfontcolor|#000000 --#evenrowbackground|#FFFFFF --#evenrowfontcolor|#000000 --#titleFontColor|" + Factions[faction].fontColour + " --#titleFontFace|" + Factions[faction].titlefont + " --#tableBorderRadius|1px --#tableborder|" + Factions[faction].borderStyle + " " + Factions[faction].borderColour + " --#titlecardbackgroundimage|url(" + Factions[faction].image + "), url(" + Factions[faction].image + "); background-position: left, right; background-repeat: no-repeat, no-repeat; background-size: contain, contain; align:center,center --#bodyFontFace|Arial --#bodyFontSize|14px --#leftsub|<<LEFTSUB>> --#rightsub|<<RIGHTSUB>>"
        return template
    }

    function BUTTON(phrase,action,faction) {
        let button = " --#buttonBackground|" + Factions[faction].backgroundColour + " --#buttonBorderColor|" + Factions[faction].borderColour + " --#buttonTextColor|" + Factions[faction].fontColour
        button += " --+|[c][button]" + phrase + "::" + action + "[/button][/c]"
        return button
    }

    function InsertLine() {
        return "<hr style='border: 0; height: 0; border-top: 1px solid rgba(0, 0, 0, 0.3); border-bottom: 1px solid rgba(255, 255, 255, 0.3); margin-bottom: 3px; margin-top: 3px;'/>"
    }

    function ClearCurrentTarget(phase) {
        for (let i=0;i<2;i++) {
            for (let j=0;j<state.Armageddon.playerInfo[i].formations.length;j++) {
                if (state.Armageddon.playerInfo[i].formations[j].status.includes("Air") && phase == "Activation") {continue}
                let index = state.Armageddon.playerInfo[i].formations[j].status.indexOf("Current Target")
                if (index > -1) {
                    state.Armageddon.playerInfo[i].formations[j].status.splice(index,1)
                }
                if (phase == "Strategy") {
                    let index = state.Armageddon.playerInfo[i].formations[j].status.indexOf("Jink")
                    if (index > -1) {
                        state.Armageddon.playerInfo[i].formations[j].status.splice(index,1)
                    }
                }
            }
        }
    }

    const SummonedUnits = (ids,result) => {
        let newIDs = [];
        let newDC = 0;
        let summToks = [];
        for (let i=0;i<ids.length;i++) {
            let id = ids[i];
            let obj = masterObjectArray[id];
            let tok = findObjs({_type: "graphic", id: id})[0]
            if (obj.attributeArray.notes.includes("Summoning Cost")) {
                if (result == "Broken") {
                    Dead(id);
                } else {
                    summToks.push(tok);
                }
            } else {
                newIDs.push(id);
                newDC += Number(obj.attributeArray.dc);
            }
        }
        return [newIDs,newDC,summToks];
    }

    function SpreadUnit(tokenArray) {   
        coordArray = new Array([0,0],[-1,-1],[1,-1],[2,0],[1,1],[-1,1],[-2,0],[-3,-1],[-2,-2],[0,-2],[2,-2],[3,-1],[4,0],[3,1],[2,2],[0,2],[-2,2],[-3,1],[-4,0])
        X = tokenArray[0].get("left")
        Y = tokenArray[0].get("top")    
        masterObjectArray[tokenArray[0].get("id")].location = new pt(X,Y);
        for (let i=1;i<tokenArray.length;i++) { //0 is left in place
            let tok = tokenArray[i]
            newX = Math.round(X + coordArray[i][0] * 37.6)
            newY = Math.round(Y + coordArray[i][1] * 67)
            tok.set({
                left: newX,
                top: newY,
            })
            //masterObjectArray[tok.get("id")].location =  new pt(newX,newY);
        }
    }

    function RemoveDead() {
        let tokenArray = findObjs({
            _pageid: Campaign().get("playerpageid"),
            _type: "graphic",
            _subtype: "token",
            layer: "map",
        })

        for (let i=0;i<tokenArray.length;i++) {
            let token = tokenArray[i]
            if (token.get("status_dead") || token.get("name") == "DEAD" || token.get("name") == "vehiclefire") {
                token.remove()
            }
        }
    }

    //Roll Dice
    function ROLL() {
        result = Number(randomInteger(6))
        if (result == 1) {state.Armageddon.rolls[0] += 1};
        if (result == 2) {state.Armageddon.rolls[1] += 1};
        if (result == 3) {state.Armageddon.rolls[2] += 1};
        if (result == 4) {state.Armageddon.rolls[3] += 1};
        if (result == 5) {state.Armageddon.rolls[4] += 1};
        if (result == 6) {state.Armageddon.rolls[5] += 1};
        state.Armageddon.rolls[6] += 1; //the total # of rolls
        return result
    }

    const RollDump = () => {
        let output = "!scriptcards {{ --#title|Roll Distributions";        
        for (let i=0;i<6;i++) {
            let numer = state.Armageddon.rolls[i];
            let denom = state.Armageddon.rolls[6];
            let percent = Math.floor(numer/denom * 100);
            output += " --+|Roll of " + (i+1) + ": " + numer + "/" + denom + " (" + percent + "%)";
        }
        output += " }}"
        sendChat("",output);
    }



    function Offboard(formation) { //checks if a formation/unit is Offboard, returns true if offboard (past the table edge graphic)
        if (formation.status.includes("Destroyed")) {return true}
        let unitIDs = formation.unitIDs
        for (let i=0;i<unitIDs.length;i++) {
            let id = unitIDs[i] 
            let unit = masterObjectArray[id]
            if (!unit || unit.health < 1) {continue}   
            let whatPolys = unit.terrain.whatPolys;
            if (!whatPolys) {return true};
            whatPolys = whatPolys[0];
            let terType = whatPolys.type;
            if (terType == "Offboard") {return true};
        }
        return false
    }

    const OffboardUnit = (id) => { //checks if a unit is Offboard, returns true if offboard (or dead) 
        let unit = masterObjectArray[id];
        if (!unit || unit.health < 1) {return true};
        if (unit.terrain == "N/A" || unit.attributeArray.type == "System") {return false};   
        let whatPolys = unit.terrain.whatPolys[0];
        if (!whatPolys) {return true};    
        let terType = whatPolys.type;
        if (terType == "Offboard") {return true};
        return false
    }

    const MarkerLights = (player,opponent,formNumA,formNumB) => {
        targetForm = state.Armageddon.playerInfo(opponent).formations[formNumB];
        targetFormUnitIDs = targetForm.unitIDs;
        for (let i=0;i<state.Armageddon.playerInfo(player).formations.length;i++) {
            if (i=formNumA) {continue};
            let form = state.Armageddon.playerInfo(player).formations[i];
            if (form.markerlights == false || form.status.includes("Broken") || form.currentOrder.includes("March")) {continue};
            let unitIDs = form.unitIDs;
            for (let j=0;j<unitIDs.length;j++) {
                if (masterObjectArray[unitIDs[j]] == false) {continue};
                let id1 = unitIDs[j];
                for (k=0;k<targetFormUnitIDs.length;k++) {
                    let id2 = targetFormUnitIDs[k];
                    let dist = ClosestDistance(id1,id2);
                    if (dist > 18) {continue};
                    return true;
                }   
            }
        }
        return false;
    }

    const LeaveOrbit = (msg) => {
        let id = msg.selected[0]._id;
        let Tag = msg.content.split(";");
        let Check = Tag[1];
        if (Tag[1] != "Yes") {return};
        let obj = masterObjectArray[id];
        let token = findObjs({_type:"graphic", id: id})[0];
        state.Armageddon.playerInfo[obj.player].formations[obj.formationNumber].status = "Destroyed";
        state.Armageddon.playerInfo[obj.player].formations[obj.formationNumber].unitIDs = "";
        state.Armageddon.playerInfo[obj.player].formations[obj.formationNumber].leaderID = "";
        token.remove()
        let name = obj.name;
        sendChat("",name + " leaves Orbit.")
    }

    const SupportingIDArray = (playerNumber,formationNumbers,defFormNumbers) => {
        let supportingIDArray = [];
        let opponent = (playerNumber == 0) ? 1:0;
        let playerFormations = state.Armageddon.playerInfo[playerNumber].formations;
        let defenderFormations = state.Armageddon.playerInfo[opponent].formations;
        for (let i=0;i<playerFormations.length;i++) {
            if (formationNumbers.includes(i)) {continue};
            let form = playerFormations[i];
            if (!form) {continue};
            if (form.currentOrder == "March" && state.Armageddon.nations[playerNumber].includes("Dark Eldar") == false) {continue};
            if (form.status.includes("Broken")) {continue}  
            if (form.status.includes("Air")) {continue}
            let ids = form.unitIDs;
            if (!ids) {continue};
            for (let j=0;j<ids.length;j++) {
                let id1 = ids[j];
                let unit1 = masterObjectArray[id1];
                if (!unit1) {continue};
                if (unit1.attributeArray.type.includes("Air") || unit1.attributeArray.type.includes("Spacecraft")) {continue};
                let ff = PLUS(unit1.attributeArray.firefight);
                if (ff > 6) {continue};
                Def1:
                for (let k=0;k<defFormNumbers.length;k++) {
                    let defForm = defenderFormations[defFormNumbers[k]]
                    let defUnitIDs = defForm.unitIDs
                    for (let l=0;l<defUnitIDs.length;l++) {
                        let id2 = defUnitIDs[l];
                        if (ClosestDistance(id1,id2) > 6) {continue};
                        supportingIDArray.push(id1);
                        break Def1;
                    };
                };
            };
        };
        return supportingIDArray;
    }


    function AbilitiesOn(gmn,action) {
        let form = state.Armageddon.playerInfo[gmn[0]].formations[gmn[1]]
        let unitIDs = form.unitIDs

        alwaysOn = ["Activate","AA Fire","Teleport","Planetfall","Deathwind","Overwatch Fire","Infestation","Combat Air Interception"]
        listOne = ["Advance and Fire","Double Move and Fire","Marshal","Hold","Ground Attack"]
        listTwo = ["Ranged","Direct","Indirect","One","Slow","Sniper"]

        for (let i=0;i<unitIDs.length;i++) {
            let id = unitIDs[i]
            let token = findObjs({_type: "graphic", id: id})[0]
            if (!token) {continue}
            let slow = false;
            if (token.get("status_purple") == true || token.get("status_pink") == true) {slow = true};
            let unit = getObj("character", token.get("represents"))
            if (!unit) {continue}
            let abilArray = findObjs({  _type: "ability", _characterid: unit.id});
            abilityLoop:
            for (let j=0;j<abilArray.length;j++) {
                let abilName = abilArray[j].get("name")
                if (abilName.includes("Slow") && slow == true) {continue};
                if (abilName.includes("One-Shot") && token.get("status_brown") == true) {continue};

                difficult = false 
                assault = false 
                ranged = false 

                if (form.status.includes("Broken")) {
                    abilArray[j].set("istokenaction",false);
                    continue
                }

                if (alwaysOn.includes(abilName)) {
                    abilArray[j].set("istokenaction",true);
                    continue
                }
                if (alwaysOn.includes(abilName) == false && action == "Strategy") {
                    abilArray[j].set("istokenaction",false);
                    continue
                }

                if (listOne.includes(action)) {
                    difficult = true
                    assault = false
                    ranged = true
                }   

                if (action == "Overwatch Fire") {
                    difficult = false 
                    assault = false 
                    ranged = true
                }

                if (action == "Sustained Fire") {
                    difficult = false
                    assault = false
                    ranged = true
                }

                if (action == "March Move") {
                    difficult = true
                    assault = false
                    ranged = false
                }

                if (action == "Assault Enemy") {
                    difficult = true
                    assault = true
                    ranged = false
                }

                if ((action == "Marshal" || action == "Hold") && abilName.includes("Regroup")) {
                    abilArray[j].set("istokenaction",true);
                    continue
                }

                if (abilName.includes("Difficult")) {
                    abilArray[j].set("istokenaction",difficult);
                    continue
                }

                if (abilName.includes("Assault")) {
                    abilArray[j].set("istokenaction",assault);
                    continue
                }

                for (let e=0;e<listTwo.length;e++) {
                    substring = listTwo[e]
                    if (abilName.includes(substring)) {
                        abilArray[j].set("istokenaction",ranged)
                        continue abilityLoop
                    }
                }
                
                abilArray[j].set("istokenaction",false)
            }
        }
    }

    //check a list of Unit IDs for a condition such as Farseer, returns true if one has it, false if none have it
    function CheckUnits(ids,condition) {
        condition = condition.toLowerCase();
        for (let i=0;i<ids.length;i++) {
            let id = ids[i];
            let unit = masterObjectArray[id];
            if (!unit) {continue}
            let notes = unit.attributeArray.notes.toLowerCase();
            let type = unit.attributeArray.type.toLowerCase();
            let speed = unit.attributeArray.speed.toString().toLowerCase();
            if (notes.includes(condition) || type.includes(condition) || speed.includes(condition)) {return true}
        }
        return false
    }

    //checks units and returns true if all units have the condition
    const Exclusionary = (unitIDs,condition) => { 
        for (let w=0;w<unitIDs.length;w++) {
            let id = unitIDs[w];
            let unit = masterObjectArray[id];
            let notes = unit.attributeArray.notes;
            if (notes.includes(condition)) {continue};
            return false;
        }
        return true;
    }

    function simpleObj(o) {
        p = JSON.parse(JSON.stringify(o));
        return p;
    }

    function getCleanImgsrc(imgsrc) {
        let parts = imgsrc.match(/(.*\/images\/.*)(thumb|med|original|max)([^?]*)(\?[^?]+)?$/);
        if(parts) {
            return parts[1]+'thumb'+parts[3]+(parts[4]?parts[4]:`?${Math.round(Math.random()*9999999)}`);
        }
        return;
    }

    const PlatformDestroyed = (token) => {
 log("In Platform Destroyed")       
        let id = token.get("id");
        let obj = masterObjectArray[id];
        let play = obj.player;
        let weaponObj = obj.killingblow;
 log(weaponObj)       
        let ids = [];
        let forms = [];
        let keys = Object.keys(masterObjectArray);
        //identify tokens inside it
        keys.forEach(element => {
            let obj2 = masterObjectArray[element]
log(obj2.name)
log(obj2.terrain.platform)            
            if (obj2.terrain.platform == true) {
                let check = pointInPolygon(obj2.location,obj);
                if (check == true) {
log(check)                    
                    ids.push(element);
                    forms.push(obj2.formationNumber);
                    masterObjectArray[element].hits = [weaponObj];
                }
            }
        })
        //then apply a hit, with either their own armour save or a cover save, using weaponObj
        let output = ApplySaves(ids,"Transport");
log(output)        
        forms = [...new Set(forms)];
        //run CheckDead on formation(s)
        for (let i=0;i<forms.length;i++) {
            let form = state.Armageddon.playerInfo[play].formations[forms[i]];
            CheckDead(form);
        }
        //display results
        if (output != "") {
            let template = Template(obj.attributeArray.faction);
            template = template.replace("<<SUBJECTNAME>>","Transport Destroyed");
            template = template.replace("<<RIGHTSUB>>","");
            template = template.replace("<<LEFTSUB>>","Hits on Occupants");
            template += output + " }}";
            sendChat("",template);           
        }
    }

    const RemainingActivations = () => {
        let forms = [];
        for (let p=0;p<2;p++) {
            for (let f=0;f<state.Armageddon.playerInfo[p].formations.length;f++) {
                let formation = state.Armageddon.playerInfo[p].formations[f];
                let nam = formation.name;
                if (Offboard(formation)) {continue}
                if (formation.status.includes("Green")) {
                    if (formation.currentOrder.includes("Overwatch") || formation.currentOrder.includes("Garrison Overwatch")) {continue}
                    if (formation.currentOrder.includes("Combat Air Patrol")) {continue}
                    forms.push(nam);
                }
            }
        }
        template = "!scriptcards {{ --#title|Activations Remaining";
        if (forms.length == 0) {
            template += " --+|[c]No Formations Outstanding[/c]";
        } else {
            for (let i=0;i<forms.length;i++) {
                template += " --+|[c]" + forms[i] + "[/c]";
            }
        }
        template += " }}";
        sendChat("",template);
    }




    function LOS(id1,id2,phase) {
        if (!phase) {phase = "Ranged"};
        //unit1 is shooter, unit2 is target
        let distanceT1T2 = ClosestDistance(id1,id2);
        let unit1 = masterObjectArray[id1];
        let unit2 = masterObjectArray[id2];
        if (unit2.terrain.platform == true) {return [false,distanceT1T2]};

        let type1 = unit1.attributeArray.type;
        let type2 = unit2.attributeArray.type;
        let formation1 = state.Armageddon.playerInfo[unit1.player].formations[unit1.formationNumber];
        let formation2;        
        if (type2 == "System") {
            formation2 = {
                name: "Target Icon",
                leaderID: id2,
                unitIDs: [id2],
            }
        } else {
            formation2 = state.Armageddon.playerInfo[unit2.player].formations[unit2.formationNumber];
        }
        let tokminX = Math.min(unit1.location.x,unit2.location.x);
        let tokminY = Math.min(unit1.location.y,unit2.location.y);
        let tokmaxX = Math.max(unit1.location.x,unit2.location.x);
        let tokmaxY = Math.max(unit1.location.y,unit2.location.y);
        let notes1 = unit1.attributeArray.notes;
        if (!notes1) {notes1 = ""};
        let notes2 = unit2.attributeArray.notes;
        if (!notes2) {notes2 = ""};        
        let terrain1 = unit1.terrain;
        let terrain2 = unit2.terrain;
        let token1Height = terrain1.finalHeight;
        let token2Height = terrain2.finalHeight;

        if (notes1.includes("Support")) {
            token1Height = Number(terrain1.supportHeight)
        }
        if (notes2.includes("Support")) {
            token2Height = Number(terrain2.supportHeight)
        }
        if (type1 === "War Engine") {
            token1Height += Number(unit1.attributeArray.weh)
        }
        if (type2 === "War Engine") {
            token2Height += Number(unit2.attributeArray.weh)
        }
        let partObscured = false;
        //let wall = false;
        if (type1.includes("Spacecraft")) {return [true,distanceT1T2]} 
        //if either is an aircraft and not landed
        if (type1.includes("Aircraft") && formation1.status.includes("Landed") == false) {return [true,distanceT1T2]} 
        if (type2.includes("Aircraft") && formation2.status.includes("Landed") == false) {return [true,distanceT1T2]} 
        let skimmer = false;
        if (notes1.includes("Skimmer") && formation1.currentOrder != "Sustained Fire" && formation1.currentOrder != "Marshal") {skimmer = true} 

        if (skimmer == true && notes2.includes("Support")) {
            //shooter is popped up skimmer and target is support - floating above terrain
            return [true,distanceT1T2]
        } 

        if (notes1.includes("Support") && notes2.includes("Support")) {
            //both are support so floating above intervening terrain
            return [true,distanceT1T2]
        }

        let pt3,pt4,cd1,cd2,cd3,cd4,higherHeight;

        //check if any terrain blocks LOS
        for (let p=0;p<terrain.length;p++) {
            let polygon = terrain[p];       
            let pminX = polygon.minX;
            let pminY = polygon.minY;
            let pmaxX = polygon.maxX;
            let pmaxY = polygon.maxY;
            if (tokminX > pmaxX || tokmaxX < pminX || tokmaxY < pminY || tokminY > pmaxY) {continue}; 
            //A: totally to right of polygon, B: totally to left of polygon, C: totally below polygon, D: totally above polygon ; check the remaining polygons for instersections of LOS line
            let polyHeight = polygon.height;
            //an array of any polygon sides crossed by the Line between the two tokens
            //will be length 0 if no intervening terrain
            //otherwise will contain any pts where line between T1 and T2 cross terrain polygon
            let crossPolygonSide = polyLine(polygon,unit1.location,unit2.location);
            let cpsLength = crossPolygonSide.length;

            if (terrain1.whatPolys.includes(polygon) && terrain2.whatPolys.includes(polygon) && polygon.cover == true && notes1.includes("Support") == false && notes2.includes("Support") == false && distanceT1T2 > 4 && polygon.height > 0) {
                //both tokens are in same terrain, neither is a support unit floating over the terrain and the terrain provides cover, and the distance is > 4 and the terrain has a height (not flat or 0)
                return [false,distanceT1T2];
            }

            if (cpsLength == 1 && (polygon.cover == false || polygon.obscure == "None")) {continue}; //crosses only once and no cover for that terrain piece eg. a hill
          
            if (cpsLength == 1 && polygon.cover == true && polygon.obscure != "None") { // crosses once, one of two tokens is 'in cover' and need to check 10cm rule
                let pt3 = crossPolygonSide[0];    
                let coverDistance = 0;
                if (terrain1.whatPolys.includes(polygon) && notes1.includes("Support") == false) {//token1 is in this polygon and in cover, supports are floting over cover
                    coverDistance = pointHexDistance(unit1.location,pt3);
                }
                if (terrain2.whatPolys.includes(polygon) && notes2.includes("Support") == false) {//token2 is in this polygon and in cover, supports are floating over cover
                    coverDistance = pointHexDistance(unit2.location,pt3);
                    if (polygon.obscure == "Partial" || polygon.obscure == "Complete") {partObscured = true};
                }
                if (coverDistance >= 4 && polyHeight > 0) {//max 4 hexes into terrain that is tall
                    return [false,distanceT1T2];
                } 
            }

            if (cpsLength > 1 && skimmer == false && notes1.includes("Support") == false && notes2.includes("Support") == false && polygon.obscure != "None") { // crossing 2 lines of that terrain peice, check heights and ratios now
                pt3 = crossPolygonSide[0];
                pt4 = crossPolygonSide[1]; //2nd point of crossing
                let terrainHeight = polygon.height; //adjusted below for some cases
                if (token1Height > terrainHeight && token2Height >= terrainHeight) { //this terrain is lower than the tokens heights so doesnt block
                    continue;
                }
                if (token1Height == terrainHeight && token2Height == terrainHeight) { //same height, check if LOS partially blocked, eg ruins, fields
                    if (polygon.obscure == "Partial" || polygon.obscure == "Complete") {partObscured = true};
                    /*
                    if (polygon.type.includes("Wall") && type2 == "Infantry") {
                        let cd1 = pointHexDistance(pt2,pt3,token1);
                        let cd2 = pointHexDistance(pt2,pt4,token1);
                        if (Math.min(cd1,cd2) < 2) {wall = true};
                    }
                    */
                    continue
                }
                if (token1Height < terrainHeight && token2Height < terrainHeight) { //terrain in middle higher than either token
                    return [false,distanceT1T2]
                }
                //otherwise some math

                if (polygon.obscure == "Partial" || polygon.obscure == "Complete") {partObscured = true};
/*
                if (polygon.type.includes("Wall") && type2 == "Infantry") {
                    let cd1 = pointHexDistance(pt2,pt3,token1);
                    let cd2 = pointHexDistance(pt2,pt4,token1);
                    if (Math.min(cd1,cd2) < 2) {wall = true};
                }
*/
                if (token1Height <= token2Height) {
                    token2Height -= token1Height; //first reduce all to lowest
                    terrainHeight -= token1Height;
                    token1Height = 0;
                    cd1 = pointHexDistance(unit1.location,pt3);
                    cd2 = pointHexDistance(unit1.location,pt4);
                    higherHeight = token2Height;
                }
                if (token1Height > token2Height) {
                    token1Height -= token2Height;
                    terrainHeight -= token2Height;
                    token2Height = 0;
                    cd1 = pointHexDistance(unit2.location,pt3)
                    cd2 = pointHexDistance(unit2.location,pt4)
                    higherHeight = token1Height
                }

                let closestDist = Math.min(cd1,cd2);
                let X = higherHeight * closestDist / distanceT1T2 //using similar 90 degree triangles

                if (terrainHeight > X) {
                    //terrain height higher than the line of sight
                    return [false,distanceT1T2]
                }
            }

            if (cpsLength > 1 && polygon.obscure != "None" && (skimmer == true || notes1.includes("Support") || notes2.includes("Support")) && polygon.height > 0) { 
                //skimmer/support LOS crossing 2 lines, check distances to terrain piece
                if (token2Height > polygon.height) {return [true,distanceT1T2]}; 
                pt3 = crossPolygonSide[0];
                pt4 = crossPolygonSide[1];
                cd1 = pointHexDistance(unit1.location,pt3);
                cd2 = pointHexDistance(unit1.location,pt4);
                cd3 = pointHexDistance(unit2.location,pt3);
                cd4 = pointHexDistance(unit2.location,pt4);

                let skimmerToTerrain = Math.min(cd1,cd2);
                let targetToTerrain = Math.min(cd3,cd4);
                if (notes2.includes("Support")) {
                    skimmerToTerrain = Math.min(cd3,cd4);
                    targetToTerrain = Math.min(cd1,cd2);
                }
                if (skimmerToTerrain >= targetToTerrain) {return [false,distanceT1T2]};
            }
        } //end polygons    


        //War Engines go here, can skip if already partially obscured
        if (partObscured == false) {
            for (let i=0;i<warEngineArray.length;i++) {
                let warEngineID = warEngineArray[i];
                let warEngineUnit = masterObjectArray[warEngineID];
                if (warEngineUnit.health < 1) {continue};
                if (warEngineID == id1 || warEngineID == id2) {continue};

                if (pointInPolygon(unit1.location,warEngineUnit) == true) {continue}; //shooter is firing from beside/on war engine

                let wminX = warEngineUnit.vertices[3].x;
                let wminY = warEngineUnit.vertices[3].y;
                let wmaxX = warEngineUnit.vertices[1].x;
                let wmaxY = warEngineUnit.vertices[1].y;
                //if (tokminX > wmaxX || tokmaxX < wminX || tokmaxY < wminY || tokminY > wmaxY) {continue}; 
                let warEngineHeight = Number(warEngineUnit.attributeArray.weh) + Number(warEngineUnit.terrain.finalHeight);
                //check if line beteen pt1 and pt2 crosses the polygon of the war Engine
                let potentialCross = polyLine(warEngineUnit,unit1.location,unit2.location);

                if (!potentialCross || potentialCross.length == 0) {continue};
                if (potentialCross.length == 1) {
                        partObscured = true; //the target is sheltering in the war engine (vs shooter firing out which was filtered out above)
                        break;
                }; 
                //0 means doesnt cross, 1 means unit is in 'shadow/cover' - such as an infantry unit
                if (skimmer == false && notes1.includes("Support") == false && notes2.includes("Support") == false) {
                    if (token1Height >= warEngineHeight && token2Height >= warEngineHeight) {
                        //this war engine is lower than both tokens
                        continue;
                    } else {
                        partObscured = true;
                        break;
                    }           
                }
                if (skimmer == true || notes1.includes("Support") || notes2.includes("Support")) {
                    //one of units at least is popped up 
                    pt3 = potentialCross[0];
                    pt4 = potentialCross[1];
                    cd1 = pointHexDistance(unit1.location,pt3);
                    cd2 = pointHexDistance(unit1.location,pt4);
                    cd3 = pointHexDistance(unit2.location,pt3);
                    cd4 = pointHexDistance(unit2.location,pt4);

                    let skimmerToEngine = Math.min(cd1,cd2);
                    let targetToEngine = Math.min(cd3,cd4);

                    if (notes2.includes("Support")) {
                        skimmerToEngine = Math.min(cd3,cd4);
                        targetToEngine = Math.min(cd1,cd2);
                    }

                    if (skimmerToEngine > targetToEngine) {
                        //If the skimmer is farther to the intervening WE then the target is, the line of fire is partially blocked
                        partObscured = true;
                        break;
                    }
                }
            }
        }//end war engines
        //if (phase != "Assault" && wall == true) {return ["Wall",distanceT1T2]}
        if (partObscured == true && phase != "Assault") {return ["Part",distanceT1T2]} 
        return [true,distanceT1T2]
    }

    //line line collision where line1 is pt1 and 2, line2 is pt 3 and 4
    function lineLine(pt1,pt2,pt3,pt4){
        //calculate the direction of the lines
        uA = ( ((pt4.x-pt3.x)*(pt1.y-pt3.y)) - ((pt4.y-pt3.y)*(pt1.x-pt3.x)) ) / ( ((pt4.y-pt3.y)*(pt2.x-pt1.x)) - ((pt4.x-pt3.x)*(pt2.y-pt1.y)) );
        uB = ( ((pt2.x-pt1.x)*(pt1.y-pt3.y)) - ((pt2.y-pt1.y)*(pt1.x-pt3.x)) ) / ( ((pt4.y-pt3.y)*(pt2.x-pt1.x)) - ((pt4.x-pt3.x)*(pt2.y-pt1.y)) );
        if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
            intersection = {
                x: (pt1.x + (uA * (pt2.x-pt1.x))),
                y: (pt1.y + (uA * (pt2.y-pt1.y)))
            }
            return intersection;
        }
        return false;
    }

    //polygon / line collisions where typically pt1 is shooter and pt2 is target
    function polyLine(polygon,pt1,pt2) {
        let vertices = polygon.vertices;
        let len = (vertices.length - 1);
        let crossings = [];
        //go through each vertices, plus the next to create a line for checking intersection
        for (v=0;v<len;v++) {
            let pt3 = vertices[v];
            let pt4 = vertices[v+1];
            let point = lineLine(pt1,pt2,pt3,pt4);
            if (point) {
                crossings.push(point);
            }
        }
        return crossings;
    }

    const SortFormation = (formationA,formationB) => {
        //sorts two formations, A being Shooter, B being Target
        let closestDistance = Infinity;
        let obj;
        fBClosest = formationB[0];
        fAClosest = formationA[0];
        formationA.forEach(function(id1){
            formationB.forEach(function(id2){
                distT1T2 = ClosestDistance(id1,id2);
                if (distT1T2 < closestDistance) {
                    closestDistance = distT1T2;
                    fAClosest = id1;
                    fBClosest = id2;
                }
            })
        })
        let formA = [];
        let formB = [];

        for (let i=0;i<formationA.length;i++) {
            obj = {
                id: formationA[i],
                dist: ClosestDistance(formationA[i],fBClosest)
            }
            formA.push(obj)
        }

        for (let i=0;i<formationB.length;i++) {
            obj = {
                id: formationB[i],
                dist: ClosestDistance(formationB[i],fAClosest)
            }
            formB.push(obj)
        }


        //shooters organized back to front, targets front to back
        formA.sort(function(a,b) {
            return b.dist - a.dist;
        })
        formB.sort(function(a,b) {
            return a.dist - b.dist;
        })

        formationA = formA.map(a => {return a.id})
        formationB = formB.map(a => {return a.id})

        let formations = {
            shooters: formationA,
            targets: formationB,
        }
        return formations;
    }

    const CoverFormation = (form,ignoreTCover) => {
        let c = false
        let newForm = [];
        for (let i=0;i<form.length;i++) {    
            let coverCheck = masterObjectArray[form[i]].terrain.coverCheck     
            if (ignoreTCover == false && coverCheck == true) {c = true}
            if (ignoreTCover == true && coverCheck == true) {continue}
            newForm.push(form[i])
        }
        return [newForm,c]
    }

    const SuppressFormation = (formation,suppression,special) => {
        //returns an formation/ids, that have 1+ weapons with range, proper type and suppressed units removed
        //filter by weapon range unless <= 6 then auto include if has FF weapons
        //special is optional for things like Indirect
        //range is the minimum to the closest unit in target formation
        let newFormation = [];
        for (let i=0;i<formation.length;i++) {
            obj = masterObjectArray[formation[i]];            
            if (obj.distance <= 6 && obj.attributeArray.firefight != "N/A") {
                newFormation.push(formation[i]);
                continue;
            }
            for (let w=1;w<9;w++) {
                let range = obj.attributeArray["weapon" + w + "range"]
                if (!range) {continue}
                let notes = obj.attributeArray["weapon" + w + "notes"]
                if (!notes) {notes = ""}
                if (isNaN(range)) {continue} //a FF or CC weapon
                if (special == "Indirect" && notes.includes("Indirect")) {range *=2}
                if (range < obj.distance) {continue} //closest target too far away for this weapon
                if (special == "Indirect" && (obj.distance < 12 || notes.includes("Indirect") == false)) {continue}
                newFormation.push(formation[i]); //has a weapon with range 
                break;
            }
        }

        if (suppression === 0) {return newFormation}

        let supFormation = [];
        for (let i=0;i<newFormation.length;i++) {
            dc = Number(masterObjectArray[newFormation[i]].attributeArray.dc)
            if (isNaN(dc)) {dc = 1}
            if (dc > suppression) {
                supFormation.push(newFormation[i]);
                continue;
            }
            suppression -= dc
        }
        return supFormation;
    }

    const LOSFormation = (shooterFormation,targetFormation,indirect) => {
        //gets LOS/range and saves it towards an ETA
        let partial = false;
        let newFormation = [];
        for (let i=0;i<shooterFormation.length;i++) {
            let id1 = shooterFormation[i];
            let eta = [];
            for (let j=0;j<targetFormation.length;j++) {
                let id2 = targetFormation[j];
                let obj2 = masterObjectArray[id2];
                if (obj2.terrain.platform == true) {continue};
                let los = [];
                if (indirect == true) {
                    los = [true,ClosestDistance(id1,id2)];
                } else {
                    los = LOS(id1,id2,"Ranged");
                }
                if (los[0] == "Part" || los[0] == "Wall") {partial = true};
                if (los[0] == false) {continue}
                let obj = {
                    id: id2,
                    los: los,
                }
                eta.push(obj)
            }
            if (eta.length > 0) {
                masterObjectArray[id1].eta = eta
                newFormation.push(id1)
            }
        }
        return [newFormation,partial];
    }    

    const WeaponArc = (id1,id2,notes) => {
        if (notes.includes("Arc") == false) {return true}
        if (notes.includes("FwA") || notes.includes("Forward")) {arc = "FwA"}       
        if (notes.includes("FxF") || notes.includes("Fixed Forward")) {arc = "FxF"}
        if (notes.includes("RrA") || notes.includes("Rear")) {arc = "Rear"}
        if (notes.includes("Right")) {arc = "Right"}
        if (notes.includes("Left")) {arc = "Left"}
        let phi = Angle(Number(TokenAngle(id1,id2))) //returns angle
        let rotation = Angle(masterObjectArray[id1].rotation)
        if (arc == "FwA") {
            startAngle = Angle(rotation - 100)
            endAngle = Angle(rotation + 100)
        }
        if (arc == "FxF") {
            startAngle = Angle(rotation -55)
            endAngle = Angle(rotation+55)
        }
        if (arc == "Right") {
            startAngle = Angle(rotation - 190)
            endAngle = Angle(rotation + 10)
        }
        if (arc == "Left") {
            startAngle = Angle(rotation - 10)
            endAngle = Angle(rotation + 190)
        }
        if (arc == "Rear") {
            startAngle = Angle(rotation + 100)
            endAngle = Angle(rotation - 100)
        }
        endAngle = Angle(endAngle - startAngle)
        phi = Angle(phi - startAngle)

        if (phi < endAngle) {return true}
        return false    
    }

    const TokenAngle = (id1,id2) => {
        let origin = masterObjectArray[id1].location;
        let destination = masterObjectArray[id2].location;
        let x = Math.round(origin.x - destination.x);
        let y = Math.round(origin.y - destination.y);
        angle = Math.atan2(y,x)
        angle = angle * (180/Math.PI)
        angle = Math.round(angle)
        angle -= 90
        if (angle < 0) {angle += 360}
        return angle
    }

    const Angle = (theta) => {
        if (theta < 0) {theta += 360}
        if (theta > 360) {theta -= 360}
        return theta
    }

    const Firepower = (input,filter) => {
        let index = input.indexOf(filter) + 2;
        let output = Number(input.charAt(index));
        if (isNaN(output)) {output = 20};
        return output;
    }

    const TKHITS = (str) => {
        let el = str.split(",");
        let index = -1;
        let element;
        for (let y=0;y<el.length;y++) {
            element = el[y];
            if (element.includes("TK") || element.includes("Titan")) {
                index = y;
                break
            }
        }
        element = el[index].toLowerCase();          
        element = element.replace("tk","");
        element = element.replace("titan killer","");
        element = element.replace("(","");
        element = element.replace(")","");
        element = element.replace(" ","");
        let num = Number(Abacus(element));
        return num;
    }

    const AssaultETA = (att,def) => {

        let start = Date.now();
        let count = 0;

        let array1 = [];
        let array2 = [];

        for (let i=0;i<att.length;i++) {
            array1.push(att[i]);
        }
        for (let i=0;i<def.length;i++) {
            array2.push(def[i]);
        }

        const attackBurndown = () => {
            let id1 = array1.shift();
            if (id1) {
                ++count;
                let obj = masterObjectArray[id1];
                let skim1 = false;
                if (obj.attributeArray.notes.includes("Skimmer") || obj.attributeArray.notes.includes("Support") || obj.terrain.platform == true) {
                    skim1 = true;
                }
                let etaCC = [];
                let etaFF = [];

                array2.forEach((id2) => {
                    let obj2 = masterObjectArray[id2];
                    let ccOpp = Number(obj2.ccOpp);
                    let ccMax = Number(obj2.attributeArray.dc * 2);

                    let los = LOS(id1,id2,"Assault");
                    let skim2 = false;
                    if (obj2.attributeArray.notes.includes("Skimmer") || obj2.attributeArray.notes.includes("Support") || obj2.terrain.platform == true) {
                        skim2 = true;
                    }
                
                    if (los[0] == true && los[1] <= 6) {
                        let etaObj = [id2,los[1]]
                        if (los[1] < 2 && skim1 == false && skim2 == false) {
                            if (ccOpp < ccMax) {
                                etaCC.push(id2);
                                masterObjectArray[id2].ccOpp = (ccOpp + 1);
                            }
                        } else {
                            etaFF.push(etaObj);
                        }
                    }
                });
                //sort FFs on distance, sort CC randomly
                etaFF.sort((a,b) => {
                    if (a[1] < b[1]) return -1
                    if (a[1] > b[1]) return +1
                    return 0    
                })
                etaFF = etaFF.map(function(element){return element[0]})
                //scramble the CC array, such as it is
                for (let i=(etaCC.length - 1);i > 0; i--) {
                    let j=randomInteger(i+1) - 1;
                    let temp = etaCC[i];
                    etaCC[i] = etaCC[j];
                    etaCC[j] = temp;
                }
                masterObjectArray[id1].etaCC = etaCC;
                masterObjectArray[id1].etaFF = etaFF;

                setTimeout(attackBurndown,0);
            }
        }
        attackBurndown();
        let elapsed = (Date.now() - start)/1000;
        log("ETA Burndown in " + elapsed + " seconds.") 
    }

    const ClearHits = (ids) => {
        ids.forEach((id) => {
            masterObjectArray[id].hits = [];
        })
    }

    const RemoveLastActivation = () => {
        let orderList = state.Armageddon.orderList
        if (orderList.length == 0) {
            sendChat("","No Activations to be removed.");
            return;
        }
        orderList.pop();
        state.Armageddon.orderList = orderList;
        sendChat("","Last Activation Removed.");
    }

    const RangedHitResults = (type,shooterForm,toHitMod,command,targetting,crossfireCheck,leftsub) => {
        let results = "";
        let halfWeapon = true; //used in .5 weapons like IG infantry

        //shooters will have LOS to at least one target or they will have been culled
        for (let i=0;i<shooterForm.length;i++) {
            let id = shooterForm[i]
            let tok = findObjs({_type: "graphic", id: id})[0];
            let slow = false;
            if (tok.get("status_purple") == true || tok.get("status_pink") == true) {slow = true};
            let shooter = masterObjectArray[id];
            //eta will be keyed on id of target and have LOS and range info

            for (let w=1;w<9;w++) {
                let wname = shooter.attributeArray["weapon"+w+"name"];
                if (!wname || wname == null) {break};
                let wnum = shooter.attributeArray["weapon"+w+"number"];
                let wrange = shooter.attributeArray["weapon"+w+"range"];
                wrange = Number(wrange);
                if (isNaN(wrange)) {continue};
                let wfire = shooter.attributeArray["weapon"+w+"firepower"];
                if (wfire.includes("BP")) {continue}
                let wnotes = shooter.attributeArray["weapon"+w+"notes"];
                if (!wnotes || wnotes == null) {wnotes = ""};
                let wsound = shooter.attributeArray["weapon"+w+"sound"];
                let weaponObj = {
                    name: wname,
                    firepower: wfire,
                    notes: wnotes,
                    command: command,
                    crossfire: crossfireCheck,
                    source: "Ranged",
                }

                if (wnotes.includes("Indirect") && command.includes("Indirect")) {wrange *= 2}

                //skip weapon checks for oneshot, aa, orbital, sniper, slow, macro/tk
                if (command.includes("One-Shot") && (wnotes.includes("One-Shot") == false || tok.get("status_brown"))) {continue}
                if (command.includes("One-Shot") == false && wnotes.includes("One-Shot")){continue}

                if (command.includes("AA") && wfire.includes("AA") == false) {continue}    

                if (wnotes.includes("Orbital") && command != "Orbital") {continue}
                if (command == "Orbital" && wnotes.includes("Orbital") == false) {continue}

                if (wnotes.includes("Sniper") && command != "Sniper") {continue}
                if (command == "Sniper" && wnotes.includes("Sniper") == false) {continue}


                if (wnotes.includes("Slow") && command.includes("Slow") == false) {continue}
                if (command.includes("Slow") && (wnotes.includes("Slow") == false || slow == true)) {continue}

                macro = false
                if (wnotes.includes("Macro") || wfire.includes("MW") || wfire.includes("TK") || wnotes.includes("Titan")) {macro = true} 
                if (macro == true) {noun = " Macro "} else {noun = ""}
                if (type.includes("Macro") && macro == false) {continue}
                if (type.includes("Macro") == false && macro == true) {continue}   

                number = Abacus(wnum)
                if (number == 0) {number = 1}
                if (number == 0.5 && halfWeapon == true) { //alt units have the weapon
                    number = 1
                    halfWeapon = false
                }
                if (number == 0.5 && halfWeapon == false) { //flip for next unit, can check for next weapon if any
                    halfWeapon = true
                    continue
                }                         


                let weta = shooter.eta; //make an eta for this weapon
                let finalETA = [];
                for (let e=0;e<weta.length;e++) {
                    let targ = masterObjectArray[weta[e].id]
                    if (targ.health < 1) {
                        continue
                    }
                    let targType = targ.attributeArray.type
                    if (weta[e].los[1] > wrange) { //out of range for this weapon
                        continue
                    }
                    if (weta[e].los[1] < 12 && command == "Indirect") { //indirect and too close
                        continue
                    }
                    if (wnotes.includes("Arc")) {
                        if (WeaponArc(id,weta[e].id,wnotes) == false) { //out of weapon arc
                            continue
                        }
                    }

                    validTarget = false;
                    if (targetting == "Armour" && (wfire.includes("AT") || wfire.includes("MW")) && (targType.includes("Vehicle") || targType.includes("War")) && targType.includes("Air") == false) {
                        validTarget = true  
                    } else if (targetting == "Infantry" && (wfire.includes("AP") || wfire.includes("MW")) && (targType.includes("Light") || targType.includes("Infantry")) && targType.includes("Air") == false) {
                        validTarget = true
                    } else if (wfire.includes("MW") || wfire.includes("Macro") && targType.includes("Air") == false) {
                        validTarget = true
                    } else if (wfire.includes("AP") && (targType.includes("Light") || targType.includes("Infantry")) && targType.includes("Air") == false) {
                        validTarget = true
                    } else if (wfire.includes("AT") && (targType.includes("Vehicle") || targType.includes("War")) && targType.includes("Air") == false) {
                        validTarget = true
                    } else if (wfire.includes("AA") && targType.includes("Aircraft")) {
                        validTarget = true
                    }

                    if (validTarget == true) {finalETA.push(weta[e])}
                }        

                if (finalETA.length === 0) {
                    log(tok.get("name") + ": no suitable targets with " + wname)
                    continue
                }

                rolls = ""
                hits = 0
                if (wsound) {
                    sound = findObjs({type: "jukeboxtrack", title: wsound})[0]
                    if (sound) {sound.set({playing: true,softstop:false})}
                }
                for (let k=0;k<number;k++) { //for that weapon, # of attacks
                    if (k>0) {rolls += "[br]"}
                    if (number > 1) {
                        rolls += (k+1) + ": "
                    }
                    hitQ = false
                    hitRoll1 = ROLL()
                    hitRoll2 = ROLL()
                    rolls += hitRoll1.toString()
                    targ = 0

                    //hit, need to distribute it using weta
                    for (let m=0;m<(finalETA.length-1);m++) {
                        n = m+1
                        h1 = masterObjectArray[finalETA[m].id].hits.length
                        h2 = masterObjectArray[finalETA[n].id].hits.length
                        if (h2<h1) {
                            targ = n
                            break
                        }
                    }

                    targType = masterObjectArray[finalETA[targ].id].attributeArray.type;

                    let needed = 20;

                    if (targType == "Infantry") {
                        needed = Firepower(wfire,"AP")
                    } 
                    if (targType == "Light Vehicle") {
                        let n1 = Firepower(wfire,"AP");
                        let n2 = Firepower(wfire,"AT");
                        needed = Math.min(n1,n2);  
                    }
                    if (targType == "Armoured Vehicle" || targType == "War Engine") {
                        needed = Firepower(wfire,"AT");
                    }
                    if (targType.includes("Aircraft")) {
                        needed = Firepower(wfire,"AA")
                    }
                    if (wfire.includes("MW")) {
                        needed = Firepower(wfire,"MW")
                    } 
                    needed += toHitMod
                    if (wnotes.includes("Ignore Cover") && leftsub.includes("Cover") ) {needed -= 1};                   
                   
                    if (needed < 2) {needed = 2}
                    if (needed > 9) {
                        rolls += " vs. N/A";
                        continue;
                    }
                    if (hitRoll1 >= needed) {hitQ = true}
                    if (needed === 7 && hitRoll1 === 6 && hitRoll2>3) {hitQ = true}
                    if (needed === 8 && hitRoll1 === 6 && hitRoll2>4) {hitQ = true}
                    if (needed === 9 && hitRoll1 === 6 && hitRoll2>5) {hitQ = true}

                    if (needed > 6 && hitRoll1 === 6) {rolls += "+" + hitRoll2.toString()} 
                    rolls += " vs. " + needed + "+"

                    if (hitQ == true) {
                        hits += 1
                        masterObjectArray[finalETA[targ].id].hits.push(weaponObj)
                    }
                }

                let tip = '[🎲](#" class="showtip" title="' + rolls + ')';
                if (hits === 0 && number == 1) {
                    results += " --+|[c]" + tip + " " + tok.get("name") + " misses with " +  wname + "[/c]"
                } else if (hits === 0 && wnum > 1) {
                    results += " --+|[c]" + tip + " " + tok.get("name") + ": " + wnum + " misses with " + wname + "[/c]"
                } else if (hits > 0) {
                    results += " --+|[c][#0000FF]" + tip + " " + tok.get("name") + ": " + hits + noun + " hit(s) with " + wname + "[/#][/c]"
                }

                if (command.includes("Slow") && wnotes.includes("Slow")) {
                    tok.set("status_purple",true)
                }
                if (command.includes("One-Shot") && wnotes.includes("One-Shot")) {
                    tok.set("status_brown",true)
                } 


            } //end weapons

        } //end shooters
        return results
    }

    const Crossfire = (player,formNum,shooterFormation,targetFormation) => {
        let points = [];
        //make a polygon to check lines with - polygon formed from points made from units in target formation
        for (let i=0;i<targetFormation.length;i++) {
            let id = targetFormation[i];
            let obj = masterObjectArray[id];
            if (obj.attributeArray.type.includes("War")) {
                for (let j=0;j<4;j++) {
                    points.push([obj.vertices[j].x,obj.vertices[j].y]);
                }
            } else {
                points.push([obj.location.x,obj.location.y]);
            }
        }
        polySort(points);
        polyPoints = []
        for (p=0;p<points.length;p++) {
            let x = points[p][0]
            let y = points[p][1]
            let vertex = new pt(x,y)
            polyPoints.push(vertex)
        }   
        let vertex = new pt(points[0][0],points[0][1]) //add in start to complete polygon
        polyPoints.push(vertex)
        polygon = {vertices: polyPoints} //is a polygon of all the points of target tokens, with war engines having 4 pts
        //now check if any other friendly formations are on other side from shooters
        let assocForms = state.Armageddon.playerInfo[player].formations

        let a = shooterFormation[shooterFormation.length - 1]; //the shooter closest to target formation
        let unitA = masterObjectArray[a];
        let b = targetFormation[0];
        for (let i=0;i<assocForms.length;i++) {
            if (i == formNum) {continue};
            let cForm = assocForms[i];
            let cUnitIDs = cForm.unitIDs
            if (cForm.status.includes("Broken") || cForm.status.includes("Air")) {continue};
            if (cForm.currentOrder.includes("March") && state.Armageddon.nations[player] != "Dark Eldar") {continue};
            let c = cForm.leaderID;
            let distAC = ClosestDistance(a,c);
            let distBC = ClosestDistance(b,c);
            if (distAC < distBC) {continue};
            //if get to here, is likely on other side of target formation
            //now check if in crossfire distance (using the token closest), then does it cross the polygon and does it have LOS

            for (let j=0;j<cUnitIDs.length;j++) {
                let id2 = cUnitIDs[j];
                let unit2 = masterObjectArray[id2]
                let crossDist = ClosestDistance(a,id2)
                if (crossDist > 18) {continue}
                let check = polyLine(polygon,unitA.location,unit2.location);
                if (check.length === 0) {continue} //line between a and c doesnt cross polygon of b's
                for (let k=0;k<targetFormation.length;k++) {
                    let id3 = targetFormation[k];
                    check = LOS(id2,id3,"Ranged")[0];
                    if (check == false) {continue};
                    return true;
                }
            }
        }
        return false;
    }

    const LoadedLeader = (id) => { //checks if a leader is Offboard but is really on as a loaded unit, returns true if someone in formation is on the map
        let leaderUnit = masterObjectArray[id];
        let formation = state.Armageddon.playerInfo[leaderUnit.player].formations[leaderUnit.formationNumber];
        if (formation.status.includes("Destroyed")) {return false}
        let unitIDs = formation.unitIDs
        for (let i=0;i<unitIDs.length;i++) {
            let id = unitIDs[i] 
            let unit = masterObjectArray[id]
            if (!unit || unit.health < 1) {continue}   
            let whatPolys = unit.terrain.whatPolys[0];
            if (!whatPolys) {continue};    
            let terType = whatPolys.type;
            if (terType != "Offboard") {return true};
        }
        return false
    }

    const AdjustFormation = (msg) => {
        let Tag = msg.content.split(";");
        log(Tag);
        let tokenID = Tag[1];
        let statuses = Tag[2];
        let order = Tag[3];
        let blastmarkers = Tag[4];
        statuses = statuses.split(",");

        let obj = masterObjectArray[tokenID];
        let formation = state.Armageddon.playerInfo[obj.player].formations[obj.formationNumber];

        let template = Template(obj.attributeArray.faction);
        let formationName = formation.name;
        if (formationName.length > 20) {
            template = template.replace("--#titleFontSize|1.4em","--#titleFontSize|1em");
        }       
        template = template.replace("<<SUBJECTNAME>>",formationName);
        template = template.replace("<<LEFTSUB>>","");
        template = template.replace("<<RIGHTSUB>>","");

        let aura = "#000000";
        let tint = "#FF0000";  

        if (statuses.includes("Broken")) {
            aura = "#FFFF00";
            blastmarkers = 0;
        }
        if (statuses.includes("Green")) {
            aura = "#00FF00";
            order = "Not Activated";
        }
        if (blastmarkers == 0) {
            tint = "transparent";
        } else if (statuses.includes("Broken")) {
            tint = "#FFFF00";
        }

        formation.status = statuses;
        formation.currentOrder = order;   

        let leaderID = formation.leaderID;
        let leaderToken = findObjs({_type: "graphic", id: leaderID})[0];

        leaderToken.set({
            bar3_Value: 0,
            aura1_color: aura,
            tint_color: tint,
        })

        formation = CheckStatus(formation,blastmarkers)[0];
        formation = CheckDead(formation); //updates status, order, leader, unitIDs

        template += " --+|Status Adjusted To: " + statuses;
        template += " --+|Current Order Adjusted  To: " + order;
        template += " --+|New Blast Markers: " + blastmarkers;
        template += " }}"

        sendChat("",template)
    }

    const CheckDeadA = (msg) => {
        let id = msg.selected[0]._id
        let obj = masterObjectArray[id];
        if (!obj) {
            sendChat("","No Object");
            return;
        }
        let formation = state.Armageddon.playerInfo[obj.player].formations[obj.formationNumber];
        if (!formation) {
            sendChat("","No Formation");
            return;            
        }
        CheckDead(formation);
        sendChat("","Checked")
        return;
    }

    const CheckDead = (formation) => {
        //check if any of targets dead
        //if dead, move to map layer, remove dc from dctotal, adjust the unitIDs and leader if needed
        let leaderID = formation.leaderID;
        let leaderUnit = masterObjectArray[leaderID];
        let leaderToken = findObjs({_type: "graphic", id: leaderID})[0];
        if (!leaderToken) {
            //check if is a destroyed formation
            let tempIDs = [];
            for (let i=0;i<formation.unitIDs.length;i++) {
                let id = formation.unitIDs[i];
                let tok = findObjs({_type: "graphic", id: id})[0];
                if (tok) {tempIDs.push(id)};
            }
            if (tempIDs.length > 0) {
                leaderID = tempIDs[0];
                leaderToken = findObjs({_type: "graphic", id: leaderID})[0];
                formation.unitIDs = tempIDs;
                sendChat("",formation.name + " may have issues.")
            } else {
                formation.status = "Destroyed";
                formation.unitIDs = "";
                return formation;
            }
        }
        let blastMarkers = leaderToken.get("bar3_value");
        let statusMarkers = leaderToken.get("statusmarkers");
        let auracolour = leaderToken.get("aura1_color");
        let formNum = leaderUnit.formationNumber;
        let player = leaderUnit.player;
        let unitIDs = formation.unitIDs;
        let newIDs = [];
        let newDC = 0;

        for (let i=0;i<unitIDs.length;i++) {
            let id = unitIDs[i];
            let obj = masterObjectArray[id];
            if (!obj) {
                //token gone, is not in MOA now but id is still in unitIDs
                continue;
            }
            if (obj.health < 1) {
                Dead(id);
                continue;
            }
            newIDs.push(id);
            if (obj.attributeArray.type.includes("War")) {
                newDC += Number(obj.attributeArray.dc) //takes original DC to suppress/break
            } else {
                newDC += 1;
            }
        }

        if (leaderUnit.health < 1 && newDC > 0) {
            leaderID = newIDs[0]
            leaderToken = findObjs({_type: "graphic", id: leaderID})[0];
            leaderToken.set({
                statusmarkers: statusMarkers,
                bar3_value: blastMarkers,
                aura1_color: auracolour,
                aura1_radius: 0.25,
            })
            leaderToken.set("status_dead",false) //as carried over from dead leader in statusMarkers
        }
        if (newDC == 0) {leaderID = ""};
        formation.leaderID = leaderID;
        formation.unitIDs = newIDs;
        formation.dcTotal = newDC;
        state.Armageddon.playerInfo[player].formations[formNum] = formation;
        return formation;
    }

    const FinalAssault = (winner,winningFormationNumbers,winningIDs,losingFormationNumbers,losingIDs,losingSupporters,delta,atta) => {
        let loser = winner == 0 ? 1:0;
        let results = "";
log("Final")
log("Winner: " + winner)
for (let i=0;i<winningIDs.length;i++) {
    log("Winner #" + i + ": " + masterObjectArray[winningIDs[i]].name)
}
log("Loser: " + loser)
for (let i=0;i<losingIDs.length;i++) {
    log("Loser #" + i + ": " + masterObjectArray[losingIDs[i]].name)
}


        //first go through winning formations, add blast markers up, update status, remove tokens/IDs
        let newBM = 0;
        let form = [];
        let sCheck;
        for (let i=0;i<winningFormationNumbers.length;i++) {
            form = state.Armageddon.playerInfo[winner].formations[winningFormationNumbers[i]];
            form = CheckDead(form);
            newBM = Number(form.blastmarkers);
            if (isNaN(newBM)) {newBM = 0};
            if (form.status.includes("Broken")) {newBM = 0}; //already broken formations dont receive any more blast markers
            state.Armageddon.playerInfo[winner].formations[winningFormationNumbers[i]].blastmarkers = 0;
            state.Armageddon.playerInfo[winner].formations[winningFormationNumbers[i]].assaultCasualties = 0;
            if (form.unitIDs.length > 0) {
                sCheck = CheckStatus(form,newBM);
                if (sCheck[1] == "destroyed") {
                    results += " --+|[c]" + form.name + " was destroyed in combat.[/c]"
                } else if (sCheck[1] == "broken") {
                    results += " --+|[c]" + form.name + " was broken in combat due to casualties. It can still consolidate as normal. [/c]";
                    if (sCheck[3] == true) {
                        results += " --+|[c]Any Summoned Units are lost to the Warp![/c]"
                    }
                }
            } else {
                results += " --+|[c]" + form.name + " was destroyed in combat.[/c]"
            }
        }

        //then losing formations
        //First extra casualties based on results delta
        if (CheckUnits(losingIDs,"Stubborn")) {
            delta -= 1;
        }        
        if (delta > 0) {    
            let extraHits = delta;
            let extraDead = 0;            
            //order the losers based on distances from winners, then arrange those in CC (range 1) to farthest
            //extra kills applied closest to farthest, Marines count as double
            let idArray = [];
            for (let i=0;i<losingIDs.length;i++) {
                let closestDist = Infinity;
                let id1 = losingIDs[i];
                for (let j=0;j<winningIDs.length;j++) {
                    let id2 = winningIDs[j];
                    let dist = ClosestDistance(id1,id2);
                    if (dist < closestDist) {
                        closestDist = dist;
                    }
                }
                obj = {
                    id: id1,
                    dist: closestDist,
                }
                idArray.push(obj);
            }

            idArray.sort(function(a,b) {
                return a.dist - b.dist;
            })

            idArray = idArray.map(a => {return a.id})
            let i = 0;
            while (extraHits > 0 && i<idArray.length) {
                let id = idArray[i];
                let obj = masterObjectArray[id];
                let faith = false;
                if (obj.attributeArray.notes.includes("Faithful") && atta == true) {faith = true};
log(obj.name)
log(obj.attributeArray.notes)                
                if (obj.attributeArray.notes.includes("Fearless") == false && faith == false && obj.health > 0) {
                    let dc = Number(obj.attributeArray.dc);
                    let nation = obj.attributeArray.nation;
                    let faction = obj.attributeArray.faction;
                    if (nation == "Space Marines" && faction != "Titan Legions" && faction != "Imperial Navy" ) {
                        dc *= 2
                    }
                    if (dc > extraHits) {break};
                    extraHits -= dc;
                    extraDead += 1;
                    masterObjectArray[id].health = 0;
                }
                i++;
            }
            if (extraDead > 0) {
                results += " --+|[c]The losing side takes " + extraDead + " extra casualties running away...[/c]";
            }
        }

        for (let i=0;i<losingFormationNumbers.length;i++) {
            let form = state.Armageddon.playerInfo[loser].formations[losingFormationNumbers[i]];
            form = CheckDead(form);
            let formFearless = Exclusionary(form,"Fearless"); //true if all units have fearless
            let formFaithful = Exclusionary(form,"Faithful"); //true if all units have faithful
            if (atta == false) {formFaithful = true};
            if (form.unitIDs.length > 0) {
                newBM = 1000; //broken losing formation, kills all non-fearless ; non broken automatically break
                state.Armageddon.playerInfo[loser].formations[losingFormationNumbers[i]].blastmarkers = 0;
                state.Armageddon.playerInfo[loser].formations[losingFormationNumbers[i]].assaultCasualties = 0;
                sCheck = CheckStatus(form,newBM,atta);
                if (sCheck[1] == "destroyed") {
                    results += " --+|[c]" + form.name + " was destroyed.[/c]"
                } else if (sCheck[1] == "broken" && formFearless == false && formFaithful == false) {
                    results += " --+|[c]" + form.name + " was broken and must withdraw.[/c]";
                } else {
                    results += " --+|[c]" + form.name + " was broken. It may withdraw if it chooses. [/c]";
                }
                if (sCheck[3] == true) {
                    results += " --+|[c]Any Summoned Units are lost to the Warp![/c]";
                }

            } else {
                results += " --+|[c]" + form.name + " was destroyed in combat.[/c]"
            }
        }

        //finally losing supporting formations gain 1 blast marker
        //have to identify formation numbers from individual units though
        let formNums = []
        for (let i=0;i<losingSupporters.length;i++) {
            let obj = masterObjectArray[losingSupporters[i]];
            let num = Number(obj.formationNumber);
            if (formNums.includes(num)) {continue};
            formNums.push(num);
        }

        for (let i=0;i<formNums.length;i++) {
            form = state.Armageddon.playerInfo[loser].formations[formNums[i]];
            sCheck = CheckStatus(form,1);
            if (sCheck[1] == "destroyed") {
                results += " --+|[c]" + form.name + " was destroyed in combat.[/c]"
            } else if (sCheck[1] == "broken") {
                results += " --+|[c]" + form.name + " was broken in combat due to blastmarkers. It must withdraw unless Fearless.[/c]";
                if (sCheck[3] == true) {
                    results += " --+|[c]Any Summoned Units are lost to the Warp![/c]";
                }
            }
        }

        return results;
    }

    const ChangeLanded = (formation,status) => {
        //status = true means landed/landing, false means in air
        for (let i=0;i<formation.unitIDs.length;i++) {
            let idAir = formation.unitIDs[i];
            let tok = findObjs({_type: "graphic", id: idAir})[0];
            tok.set("status_snail",status);
        }
        let locAir = formation.status.indexOf("Air");
        let locLanded = formation.status.indexOf("Landed");
        if (status == false && locLanded > -1) {
            formation.status[locLanded] = "Air";
        }
        if (status == true && locAir > -1) {
            formation.status[locAir] = "Landed";
        }
        return formation;
    }

    const FinalDeadAssault = (attacker,attackerFormationNumbers,defenderFormationNumbers) => {
        //called if all attackers and defenders are dead
        let defender = attacker == 0 ? 1:0;

        for (let i=0;i<attackerFormationNumbers;i++) {
            form = state.Armageddon.playerInfo[attacker].formations[attackerFormationNumbers[i]];
            form = CheckDead(form);
            sCheck = CheckStatus(form,0);
        }

        for (let i=0;i<defenderFormationNumbers;i++) {
            form = state.Armageddon.playerInfo[defender].formations[defenderFormationNumbers[i]];
            form = CheckDead(form);
            sCheck = CheckStatus(form,0);
        }
    }

    const Dead = (id) => {
        let token = findObjs({_type: "graphic", id: id})[0];
        let newToken,h,w,img,x,y;

        if (masterObjectArray[id].attributeArray.notes.includes("Supreme")) {
            let temp = state.Armageddon.playerInfo[masterObjectArray[id].player].supreme;
            let x = temp.indexOf(id);
            temp = temp.splice(x,1)
            state.Armageddon.playerInfo[masterObjectArray[id].player].supreme = temp
            if (temp.length == 0) {
                state.Armageddon.playerInfo[masterObjectArray[id].player].supremeused = true;
            }
        }
        if (masterObjectArray[id].attributeArray.notes.includes("Platform")) {
            PlatformDestroyed(token);
        }    

        token.set({
            name: "DEAD",
            showname: false,
            layer: "map",
            tint_color: "transparent",
        })
        toFront(token)
        masterObjectArray[id].health = 0;

        h = token.get("height")/70
        w = token.get("width")/70

        let type = masterObjectArray[id].attributeArray.type;
        if (token.get("imgsrc") == "https://s3.amazonaws.com/files.d20.io/images/268123741/lKrGzGEuueayNv7YSbEihw/thumb.png?164357797755") {
            token.set({
                status_dead: false,
                width: 300,
                height: 300,
                name: "Bastion Rubble",
                isdrawing: true,
                imgsrc: "https://s3.amazonaws.com/files.d20.io/images/67383/thumb.png?1341028898",
                statusmarkers: "",
            });
            TerrainPolygons();
            MOA();
        } 

        if (type.includes("Infantry") == false) {
            y = token.get('top') - (h*33)
            if (randomInteger(2) == 1) {
                img = "https://s3.amazonaws.com/files.d20.io/images/250890242/TNggOuyBFT67qEPS1nxIPg/thumb.png?1634484854"
                x = token.get("left") + w*(30)
            } else {
                img = "https://s3.amazonaws.com/files.d20.io/images/250892520/gL4-_C7Y7-cYDKW9icsUcg/thumb.png?1634485587"
                x = token.get("left") + w*(10)
            }
            newToken = createObj("graphic", {   
                left: x,
                top: y,
                width: 70*h, 
                height: 70*w,  
                name: "vehiclefire",
                isdrawing: true,
                pageid: token.get("pageid"),
                imgsrc: img,
                layer: "map",
            });
            toFront(newToken)
        } else {    
            token.set("status_dead",true)
        }   
    }

    const PlayerReport = (msg) => {
        let tokenID = msg.selected[0]._id
        let obj = masterObjectArray[tokenID];
        let template = Template(obj.attributeArray.faction);
        let nation = state.Armageddon.nations[obj.player];
        template = template.replace("<<SUBJECTNAME>>",nation);
        template = template.replace("<<LEFTSUB>>","");
        template = template.replace("<<RIGHTSUB>>","");
        template += " --#bodyFontSize| 12px";
        if (nation.length > 20) {
            template = template.replace("--#titleFontSize|1.4em","--#titleFontSize|1em");    
        }
        template += " --+|Formations: " + state.Armageddon.playerInfo[obj.player].formations.length;
        let s = state.Armageddon.playerInfo[obj.player].supreme;
        let su = state.Armageddon.playerInfo[obj.player].supremeused;
        let t = "No";
        if (su == true) {t = "Yes"} 
        template += " --+|Supreme Commanders: " + s.length;
        template += " --+|Used this turn?: " + t;
        template += " }}";
        sendChat("",template);
    }

    function squaredPolar(point, centre) {
        return [
            Math.atan2(point[1]-centre[1], point[0]-centre[0]),
            (point[0]-centre[0])**2 + (point[1]-centre[1])**2 // Square of distance
        ];
    }

    // sort points into a polygon
    function polySort(points) {
        // Get "centre of mass"
        let centre = [points.reduce((sum, p) => sum + p[0], 0) / points.length,
                      points.reduce((sum, p) => sum + p[1], 0) / points.length];

        // Sort by polar angle and distance, centered at this centre of mass.
        for (let point of points) point.push(...squaredPolar(point, centre));
        points.sort((a,b) => a[2] - b[2] || a[3] - b[3]);
        // Throw away the temporary polar coordinates
        for (let point of points) point.length -= 2; 
    }


    function NewMultiGame(msg) {
        //!NewMultiGame;?{Player|1|2}
        let Tag = msg.content.split(";");
        terrain = [];
        playerNumber = Number(Tag[1]) - 1;
        if (playerNumber == 0) {
            warEngineArray = [];
            TerrainPolygons();          
            state.Armageddon = {
                playerInfo: {},
                orderList: [],
                nations: [],
                stratRating: [],
                factions: [],
                sides: [],
                positions: [0,0],
                newTurn: [false,false],
                tokenID: [],
                rolls: [0,0,0,0,0,0,0],
            }
        }
        let title = [];
        let nations = [];
        let factions = [];
        state.Armageddon.playerInfo[playerNumber] = {
            formations: [],
            supreme: [],
            supremeused: false,
        }        

        for (let i=0;i<msg.selected.length;i++) {
            let tokenID = msg.selected[i]._id;
            let token = findObjs({_type: "graphic", id: tokenID})[0];
            let nation = masterObjectArray[tokenID].attributeArray.nation;
            let faction = masterObjectArray[tokenID].attributeArray.faction;
            let pos = Math.round(token.get("top")/70);
            nations.push(nation);
            factions.push(faction);
            if (pos > (pageInfo.page.get("height")/2)) {side = "lower"} else {side = "upper"};
        }
        state.Armageddon.nations[playerNumber] = nations;
        state.Armageddon.factions[playerNumber] = factions;
        state.Armageddon.sides[playerNumber] = side;

        if (playerNumber == 0) {
            sendChat("","Add Side 2's Factions Now.");
            return;
        };

        let output = "!script {{ --#title|New Game";
        for (let i=0;i<2;i++) { 
            let stratRating = 0;
            output += " --+|[c][b]Side " + (i+1) + "[/b][/c]" + InsertLine();
            for (let j=0;j<state.Armageddon.factions[i].length;j++) {
                let faction = state.Armageddon.factions[i][j];
                output += " --+|[c]" + faction + "[/c]";      
                stratRating += Factions[faction].strategy;
            }
            stratRating = Math.ceil(stratRating/state.Armageddon.nations[i].length);
            output += " --+|[c]Overall Strategy Rating: " + stratRating + "[/c]";
            state.Armageddon.stratRating[i] = stratRating;
            output += InsertLine() + InsertLine();
        }
        output += " }}";
        sendChat("",output);
    }

    function FormationCreation(msg) {
        MOA();
        let Tag = msg.content.split(";");
        let formationName = Tag[1];
        let initialID = msg.selected[0]._id;
        let token = findObjs({_type:"graphic", id: initialID})[0];
        let unit = getObj("character",token.get("represents"));
        let nation = masterObjectArray[initialID].attributeArray.nation;
        let faction = masterObjectArray[initialID].attributeArray.faction;
        let player;
        if (state.Armageddon.playerInfo == {}) {
            sendChat("","Please use Start Function First");
            return;
        }   
        if (state.Armageddon.factions[0].includes(faction)) {
            player = 0;
        } else if (state.Armageddon.factions[1].includes(faction)){
            player = 1;
        } else if (state.Armageddon.nations[0].includes(nation)) {
            player = 0;
        } else if (state.Armageddon.nations[1].includes(nation)) {
            player = 1;
        } else {
            sendChat("","Error in Faction part of Formation Creation")
            return
        }
        let formationLength = state.Armageddon.playerInfo[player].formations.length;
        let unitIDs = [];
        let tokenArray = [];
        let armourArray = state.Armageddon.armourArray
        if (!armourArray) {armourArray = []}
        let leaderID = "";
        let leaderToken = [];
        let dcTotal = 0;
        let statuses = ["Green"];

        let markerlights = false;
        let farsight = false;

        let leaders = ["Leader","Commander","Supreme Commander","Synapse","Farseer","Alpharius"]
        let airunits = ["Fighter","Bomber","Fighter-Bomber"]

        for (let i=0;i<msg.selected.length;i++) {
            let tokenID = msg.selected[i]._id;
            let token = findObjs({_type:"graphic", id: tokenID})[0];
            let name = token.get("name")
            if (name.includes("Target")) {continue}; //Target Reticules
            let unit = getObj("character",token.get("represents"));
            if (!unit) {continue};
            let vertices = [];
            let height = token.get("height");
            let width = token.get("width");
            let attributeArray = AttributeArray(unit.id);
            if (attributeArray.notes.includes("Termite") && statuses.includes("Termite") == false) {statuses.push("Termite")}
            if (attributeArray.notes.includes("Markerlights")) {markerlights = true}
            if (attributeArray.notes.includes("Farsight")) {farsight = true}
            if (attributeArray.type.includes("Armour") || attributeArray.type.includes("War Engine")) {armourArray.push(tokenID)}
            if (airunits.includes(attributeArray.speed) && statuses.includes("Air") == false) {statuses.push("Air")}
            let unitName = UnitName(unit,formationLength,i);
            let location = new pt(Math.round(token.get('left')),Math.round(token.get('top')));
            let rotation = token.get("rotation");
            if (attributeArray.type.includes("War")) {
                vertices = tokenVertices(token);
            }
            let dc = Math.max(Number(attributeArray.dc),1)
            let ter = {
              type: "Offboard",
              cover: false, //cover provided?
              infSave: 7, //infantry save
              vehSave: 7,
              vertices: "",
              height: 0,
              tokenheight: 0,
              supportHeight: 0,
              obscure: "None",
            }
            unitIDs.push(tokenID)
            tokenArray.push(token);
            masterObjectArray[tokenID] = {
                id: tokenID,
                name: unitName,
                health: dc,
                player: player,
                formationNumber: formationLength,
                attributeArray: attributeArray,
                terrain: ter,
                location: location,
                rotation: rotation,
                vertices: vertices,
                height: height,
                width: width,
            };

            ModeWeapons(tokenID);
            //check notes for any of leader words  in there
            for (let q=0;q<leaders.length;q++) {
                let phrase = leaders[q];
                if (attributeArray.notes.includes(phrase) || attributeArray.character == 1) {                    
                    if (attributeArray.notes.includes(phrase) && (phrase == "Supreme Commander" || phrase.includes("Alpharius"))) {
                        let temp = [];
                        temp = state.Armageddon.playerInfo[player].supreme;
                        temp.push(tokenID);
                        state.Armageddon.playerInfo[player].supreme = temp
                        leaderID = tokenID;
                        leaderToken = token;
                    }
                    if (leaderID == "") {
                        leaderID = tokenID;
                        leaderToken = token;            
                    }               
                }
            }

            id = player + ";" + formationLength + ";" + attributeArray.type

            token.set({
                name: unitName,
                statusmarkers: "",
                gmnotes: id,
                bar1_value: dc, //DC or 1 for non-warengine
                bar1_max: dc,
                bar2_value: attributeArray.shields, //shields if has any
                bar2_max: attributeArray.shields,
                bar3_value: 0,
                bar3_max: 0,
                aura1_color: "",
                aura1_radius: "",
                tint_color: "transparent"
            })
            if (attributeArray.shields > 0) {
                token.set({
                    aura2_color: "#0000FF",
                    aura2_radius: .1,
                    showplayers_aura2: true,
                })
            }
            if (attributeArray.type.includes("Spacecraft")) {
                statuses.push("Spacecraft")
            }

            dcTotal += dc

        }

        if (leaderID == "" || !leaderID) {
            leaderToken = tokenArray[0];
            leaderID = leaderToken.get("id")
        }

        leaderToken.set({
            aura1_color: "#00FF00",
            aura1_radius: 0.25,
            showplayers_aura1: true,
            bar3_max: dcTotal,
        })

        leaderUnit = getObj("character",leaderToken.get("represents"));
        leaderAbilities =  findObjs({  _type: "ability", _characterid: leaderUnit.id});
        for (let i=0;i<leaderAbilities;i++) {
            ability = leaderAbilities[i]
            if (ability.get("name").includes("Activate")) {
                ability.set("istokenaction",true)
                break
            }
        }

        let formation = {
            name: formationName,
            leaderID: leaderID,
            unitIDs: unitIDs,
            dcTotal: dcTotal,
            status: statuses,
            currentOrder: "",
            assaultBlasts: 0,
            reanimateT1: [],
            reanimateT2: [],
            reanimateT3: [],
            markerlights: markerlights,
            farsight: farsight,
            blastmarkers: 0,
            assaultBM: 0,
        }
        Markers(tokenArray,formationLength);

        let temp = state.Armageddon.playerInfo[player].formations
        temp.push(formation);

        state.Armageddon.armourArray = armourArray;
        state.Armageddon.playerInfo[player].formations = temp

        sendChat("",formationName + " Added.");
    }

    function Strategy(msg) {
        let Tag = msg.content.split(";");
        let tokenID = Tag[1];
        let token = findObjs({_type: "graphic", id: tokenID})[0];
        let unit = masterObjectArray[tokenID];
        let gmnotes = unescape(token.get("gmnotes")).split(";");
        let player = masterObjectArray[tokenID].player;
        let formationNumber = masterObjectArray[tokenID].formationNumber;
        let playerNation = state.Armageddon.nations[player];
        let playerFaction = unit.attributeArray.faction;
        let playerFormations = state.Armageddon.playerInfo[player].formations;
        let formation = playerFormations[formationNumber];  
        let unitIDs = formation.unitIDs;
        let dcTotal = formation.dcTotal;
        let template = Template(playerFaction);
        template = template.replace("<<SUBJECTNAME>>","Strategy Roll");
        template = template.replace("<<RIGHTSUB>>","");
        template = template.replace("<<LEFTSUB>>","Strategy");

        if (state.Armageddon.newTurn[player] != true) {
            let command = "!Strategy&#59;" + tokenID;
            let phrase = "Clicking Starts New Round";
            let button = BUTTON(phrase,command,playerFaction);
            template += button;
            template += " }}";
            state.Armageddon.newTurn[player] = true;
            sendChat("",template);
            return;
        } else {
            ClearCurrentTarget("Strategy");
            RemoveDead();

            let stratRating = state.Armageddon.stratRating[player];

            let roll = ROLL();
            let total = roll + Number(stratRating);

            let favourText = "";
            if (playerNation == ("Chaos")) {
                let favour2 = randomInteger(3);
                if (roll == 1) {
                    favourText = " --+|[c]The Gods are Fickle! Reduce the lesser daemon pool by " + favour2 + " points.[/c]";
                }
                if (roll == 6) {
                    favourText = " --+|[c]The Gods Reward! Increase the lesser daemon pool by " + favour2 + " points.[/c]";
                }
            }

            let tooltip = "Roll: " + roll;
            let tip = '[🎲](#" class="showtip" title="' + tooltip + ')';

            template += " --+|[c]" + tip + " Result: " + total + "[/c]";
            template += favourText;
            template += " }}";
            sendChat("",template);

            //reset Supreme Commanders if there & reset statuses/leader auras to green
            //check if any supreme commanders alive
            let sup = [];
            for (let u=0;u<state.Armageddon.playerInfo[player].supreme.length;u++) {
                let supID = state.Armageddon.playerInfo[player].supreme[u];
                if (masterObjectArray[supID] && masterObjectArray[supID].health > 0) {
                    sup.push(supID);    
                };
            }
            state.Armageddon.playerInfo[player].supreme = sup;
            state.Armageddon.playerInfo[player].supremeused = false;

            for (let j=0;j<playerFormations.length;j++) {
                let formA = playerFormations[j];
                if (formA.status.includes("Destroyed")) {continue}
                let index = formA.status.indexOf("Activated");
                if (index != -1) {
                    formA.status[index] = "Green";
                }
                let index2 = formA.status.indexOf("Rallied");
                if (index2 != -1) {
                    formA.status.splice(index2,1);
                }

                if (formA.currentOrder != "Overwatch" && formA.currentOrder != "Garrison Overwatch" && formA.currentOrder !=  "Combat Air Patrol") {
                    formA.currentOrder = "";
                }
                playerFormations[j] = formA;
                //update leader colours
                let formALdID = formA.leaderID;
                let formALdTok = findObjs({_type: "graphic", id: formALdID})[0];
                if (!formALdTok) {
                    formA = CheckDead(formA)
                    if (formA.status.includes("Destroyed")) {continue};
                    formALdID = formA.leaderID;
                    formALdTok = findObjs({_type: "graphic", id: formALdID})[0];
                }

                let status = formA.status.toString();
                let gmn = unescape(formALdTok.get("gmnotes")).split(";");
    log("Status: " + status)
                //enable abilities
                AbilitiesOn(gmn,"Strategy");
                //clear slow weapons, check colours on broken formations, move drop pods to map layer
                for (let i=0;i<formA.unitIDs.length;i++) {
                    let idA = formA.unitIDs[i] ;
                    let objA = masterObjectArray[idA];    
                    if (!objA || objA == null) {continue}                     
                    let tok = findObjs({_type: "graphic", id: idA})[0];  
                    if (!tok) {continue}
                    if (tok.get("status_pink")) {tok.set("status_pink",false)}
                    if (tok.get("status_purple")) {
                        tok.set({
                            status_pink: true,
                            status_purple: false,
                        })
                    }              
                    if (status == "Broken") {
                        tok.set("tint_color","#FFFF00");
                        continue;
                    } else {
                        tok.set("tint_color","transparent")
                    }

                    if (objA.attributeArray.type == "Infantry" && objA.terrain.coverCheck == false) {
                        objA.terrain.coverCheck = CoverCheck(tok.id);
                    }

                    //next lines for Drop Pods
                    let ter = objA.terrain;
                    if (!ter) {continue}
                    let whatPolys = ter.whatPolys
                    if (!whatPolys) {continue}
                    if (!whatPolys[0]) {continue}
                    let terType = whatPolys[0].type;

                    if (objA.name.includes("Drop Pod") && terType != "Offboard") {
                        tok.set({
                            showname: false,
                            layer: "map",
                            statusmarkers: "",
                            tint_color: "transparent",
                        })
                    }
                }

                let colour = "#00FF00";
                if (formA.currentOrder.includes("Overwatch") || formA.currentOrder.includes("Combat Air Patrol")) {
                    colour = "#FF00FF";
                }
                if (formA.status.includes("Broken")) {
                    colour = "#FFFF00";
                }
                if (formA.status.includes("Termite")) {
                    colour = "#000000";
                } 
                formALdTok.set({
                    aura1_color: colour,
                    aura1_radius: 0.25,
                    showplayers_aura1: true,
                })
                playerFormations[j] = formA;
            }
            state.Armageddon.playerInfo[player].formations = playerFormations;
            state.Armageddon.orderList = [];
            state.Armageddon.newTurn[player] = false;
        }
    }   

    function TokenInfo(msg) {
        let Tag = msg.content.split(";");
        let tokenID = Tag[1];
        let unit = masterObjectArray[tokenID];
        let template = Template(unit.attributeArray.faction);
        let tokenTerrainInfo = unit.terrain;

        let tokenName = unit.name;
        if (tokenName.length > 20) {
            template = template.replace("--#titleFontSize|1.4em","--#titleFontSize|1em");
        }       
        let type = unit.attributeArray.type;

        template = template.replace("<<SUBJECTNAME>>",tokenName);
        template = template.replace("<<LEFTSUB>>","");
        template = template.replace("<<RIGHTSUB>>","");

        let terrainPolys = tokenTerrainInfo.whatPolys;
        if (!terrainPolys) {terrainPolys = []};
        let polys = "";
        for (let i=0;i<terrainPolys.length;i++) {
            if (i>0) {polys += ", "};
            polys += terrainPolys[i].type;;
        }
        template += " --+|[c]" + polys + "[/c]";
        template += " --+|[c]Height: " + tokenTerrainInfo.finalHeight + "[/c]";
        if (tokenTerrainInfo.coverCheck == true) {
            template += " --+|[c]Unit has Cover.[/c]";
        }
        if (type.includes("Infantry") && tokenTerrainInfo.finalInfSave < 7) {
            template += " --+|[c]Infantry might benefit from a " + tokenTerrainInfo.finalInfSave + "+ Cover Save.[/c]";
        }
        if (type.includes("Vehicle") && tokenTerrainInfo.finalVehSave < 7) {
            template += " --+|[c]Vehicle might benefit from a " + tokenTerrainInfo.finalVehSave + "+ Cover Save.[/c]";
        }        
        template += " }}";
        sendChat("",template);
    }

    function FormationInfo(msg) {
        let Tag = msg.content.split(";");
        let tokenID = Tag[1];
        let unit = masterObjectArray[tokenID];
        let playerNation = state.Armageddon.nations[unit.player];
        let template = Template(unit.attributeArray.faction);
        let formation = state.Armageddon.playerInfo[unit.player].formations[unit.formationNumber];
        if (!formation) {
            sendChat("","Error with this token/formation");
            return;
        }
        template = template.replace("<<SUBJECTNAME>>",formation.name);
        if (formation.name.length > 20) {
            template = template.replace("--#titleFontSize|1.4em","--#titleFontSize|1em");
        }               
        template = template.replace("<<LEFTSUB>>","");
        template = template.replace("<<RIGHTSUB>>","");
        formationLeaderID = formation.leaderID;
        formationLeaderTok = findObjs({_type: "graphic", id: formationLeaderID})[0] 
        if (!formationLeaderTok) {
            sendChat("","Error w/ Leader ID");
            return;
        }

        formationLeaderUnit = masterObjectArray[formationLeaderID];
        formationUnitIDs = formation.unitIDs;
        formationStatus = formation.status;

        template += " --+|[c]Formation Leader: " + formationLeaderUnit.name + "[/c]"
        template += " --+|[c]" + formationUnitIDs.length + " Units in Formation.[/c]"
        template += " --+|[c]Current Statuses: " + formationStatus.toString() + "[/c]"
        template += " --+|[c]Current Order: " + formation.currentOrder + "[/c]"
        template += " --+|[c]Total DC: " + formation.dcTotal + "[/c]"
        template += " --+|[c]Current Blast Markers: " + formationLeaderTok.get("bar3_value") + "[/c]"
        if (playerNation == "Necrons") {
            let t1Array = formation.reanimateT1;
            let t2Array = formation.reanimateT2;
            let t3Array = formation.reanimateT3;
            let deadNumber = t1Array.length + t2Array.length + t3Array.length;
            template += " --+|[c]Units to be Reanimated: " + deadNumber + "[/c]";
        }
        template += InsertLine();
        for (let i=0;i<formationUnitIDs.length;i++) {
            let id = formationUnitIDs[i];
            let tok = findObjs({_type: "graphic", id: id})[0];
            if (!tok) {name = "No Token: " + id} else {name = tok.get("name")};
            template += " --+|" + name;
        }

        template += " }}";
log(formation)
        sendChat("",template);
    }       

    const WeaponsNotes = (unitIDs,condition) => { 
        //checks units blast weapons for condition, returns true if all have the condition
        for (let w=0;w<unitIDs.length;w++) {
            let id = unitIDs[w];
            let unit = masterObjectArray[id];
            weapons = unit.blastWeapons;
            for (let v=0;v<weapons.length;v++) {
                let weap = weapons[v];
                if (weap.notes.includes(condition)) {continue}
                return false
            }
        }
        return true;
    }

    const RallyCheck = () => {
        let template = "!script {{ --#title|Outstanding Rallies";
        for (p=0;p<2;p++) {
            let nation = state.Armageddon.nations[p];
            template += " --+|[c]" + nation + "[/c]";
            let formations = state.Armageddon.playerInfo[p].formations;
            let dis = false;
            for (let f=0;f<formations.length;f++) {
                let status = formations[f].status;
log(formations[f].name)
log(status)                
                if (status.includes("Destroyed") || status.includes("Rallied") || status.includes("Air")) {continue};
                let leaderID = formations[f].leaderID;
log(leaderID)                
                let leaderTok = findObjs({_type: "graphic", id: leaderID})[0];
                if (!leaderTok) {continue};
                if (masterObjectArray[leaderID].attributeArray.type == "Spacecraft") {continue};
                let bm = Number(leaderTok.get("bar3_value"));
                if (bm == 0 && status.includes("Broken") == false) {continue};
                template += " --+|[c]" + formations[f].name + "[/c]"
                dis = true
            }
            if (dis == false) {
                template += " --+|[c]No Outstanding Rallies[/c]";
            }
            template += InsertLine();
        }
        template += " }}"
        sendChat("",template);
    }


    function Activate(msg) {
        let Tag = msg.content.split(";");
        let action = Tag[1];
        let prevBM = Number(Tag[2]);
        if (!prevBM || prevBM == "" || isNaN(prevBM)) {prevBM = 0}; //optional for BMs
        let associatedBM = 0
        let tokenIDs = [];
        let tokens = [];
        let formations = [];
        let tooltip = "";
        let reroll = "!Activate&#59;Reroll+" + action;
        ClearCurrentTarget("Activation");
        if (!msg.selected) {
            sendChat("","Need to Redo while Selecting Token");
            return;
        }
        let tokenID = msg.selected[0]._id;

        let unit = masterObjectArray[tokenID];
        let player = unit.player;
        let playerNation = state.Armageddon.nations[player];
        let faction = unit.attributeArray.faction;
        let opponent = (player == 0) ? 1:0;

        let template = Template(faction);
        let formationNumber = unit.formationNumber;
        let playerFormations = state.Armageddon.playerInfo[player].formations;
        let formation = playerFormations[formationNumber];
        let opponentFormations = state.Armageddon.playerInfo[opponent].formations;

        if (action.includes("Reroll")) {
            action = action.replace("Reroll+","");
            RerollUsed = true;
            state.Armageddon.playerInfo[player].supremeused = true;
            temp = state.Armageddon.orderList;
            temp.length = Number(temp.length - 1);
            state.Armageddon.orderList = temp
        } else {
            RerollUsed = false;
        }

        template = template.replace("<<SUBJECTNAME>>",formation.name);
        template = template.replace("<<LEFTSUB>>",action);
        template = template.replace("<<RIGHTSUB>>","");
        if (formation.name.length > 20) {
            template = template.replace("--#titleFontSize|1.4em","--#titleFontSize|1em");   
        }
        let formationLeaderID = formation.leaderID;
        let formationLeaderTok = findObjs({_type: "graphic", id: formationLeaderID})[0] 
        let gmnotes = unescape(formationLeaderTok.get("gmnotes")).split(";")
        let formationLeaderUnit = masterObjectArray[formationLeaderID];
        let formationUnitIDs = formation.unitIDs;
        let formationStatus = formation.status;
        let airIndex = formationStatus.indexOf("Air");
        let landedIndex = formationStatus.indexOf("Landed");

        let initiative = 0;
        for (let i=0;i<formationUnitIDs.length;i++) {
            initiative = Math.max(masterObjectArray[formationUnitIDs[i]].attributeArray.initiative,initiative);
        }
        //let initiative = Number(formationLeaderUnit.attributeArray.initiative);
        let farsight = false

        if (playerNation == "Eldar") {
            for (let i=0;i<playerFormations.length;i++) {
                let form = playerFormations[i];
                if (form.farsight == false) {continue}
                let formLdID = form.leaderID;
                let formLd = masterObjectArray[formLdID];
                let formLdTer = formLd.terrain.whatPolys[0].type;
                if (formLdTer == "Offboard") {continue}
                farsight = true
                break
            }
        }

        if (formationStatus.includes("Broken") && RerollUsed == false) {
            template += " --+|[c]Formation is Broken.[/c] }}";
            sendChat("",template);
            return;
        }

        automatonActions = ["Assault","Marshal","Sustained","Overwatch"];
        automataActions = ["Marshal","Sustained","Overwatch"]
        if (CheckUnits(formationUnitIDs,"Automaton")) {
            if (Exclusionary(formationUnitIDs,"Automaton") == true) {
                let act = false;
                for (let y=0;y<automatonActions.length;y++) {
                    let aa = automatonActions[y];
                    if (action.includes(aa)) {
                        act = true;
                        break;
                    }
                }
                if (act == false) {
                    template += " --+|[c]Automaton Formation can only take Assault, Marshal, Sustained Fire or Overwatch Actions.[/c] }}";
                    sendChat("",template);
                    return;                    
                }
            }
        }

        if (CheckUnits(formationUnitIDs,"Automata")) {
            if (Exclusionary(formationUnitIDs,"Automata") == true) {
                let act = false;
                for (let y=0;y<automatonActions.length;y++) {
                    let aa = automataActions[y];
                    if (action.includes(aa)) {
                        act = true;
                        break;
                    }
                }
                if (act == false) {
                    template += " --+|[c]Automata Formation can only take Marshal, Sustained Fire or Overwatch Actions.[/c] }}";
                    sendChat("",template);
                    return;                    
                }
            }
        }

        if (CheckUnits(formationUnitIDs,"Machine Spirit")) {
            if (Exclusionary(formationUnitIDs,"Machine Spirit") == true) {
                let act = false;
                for (let y=0;y<automatonActions.length;y++) {
                    let aa = automatonActions[y];
                    if (action.includes(aa)) {
                        act = true;
                        break;
                    }
                }
                if (act == false) {
                    template += " --+|[c]Machine Spirit Formation can only take Assault, Marshal, Sustained Fire or Overwatch Actions.[/c] }}";
                    sendChat("",template);
                    return;                    
                }
            }
        }

        let excludedActions = ["Overwatch Fire","Combat Air Interception","Disengage Own Edge","Disengage Other Edge","Garrison Overwatch"];

        if (formationStatus.includes("Activated") && RerollUsed == false && excludedActions.includes(action) == false) {
            template += " --+|[c]Formation has already acted.[/c] }}";
            sendChat("",template);
            return;
        }

        if (msg.selected.length > 1) { //coordinated fire or multiple assault via commander
            //formations activated
            formationNumbers = [];
            for (let i=0;i<msg.selected.length;i++) {
                let tokID = msg.selected[i]._id;
                let uni = masterObjectArray[tokID];
                if (player != uni.player) {
                    template += " --+|[c]Error with units being selected on both sides.[/c] }}";
                    sendChat("",template);
                    return;
                }
                let formNum = uni.formationNumber;
                let index = formationNumbers.indexOf(formNum);
                if (index === -1) {
                    formationNumbers.push(formNum);
                }
            }

            if (formationNumbers.length > 3) {
                template += " --+|[c]Too Many Units.[/c] }}";
                sendChat("",template);
                return;
            }

            if (formationNumbers.length > 1) {
                if (action.includes("Assault")) {
                    commanderCheck = false;
                    for (let j=0;j<formationNumbers.length;j++) {
                        let formNum = formationNumbers[j];
                        let form = playerFormations[formNum];
                        let unitIDs = form.unitIDs;

                        let c = CheckUnits(unitIDs,"Commander");
                        if (c == false) {c = CheckUnits(unitIDs,"Supreme Commander")};
                        if (c == true && commanderCheck == false) {commanderCheck = true};

                        let ldrID = form.leaderID;
                        let ldrTok = findObjs({_type: "graphic", id: ldrID})[0];
                        associatedBM += Number(ldrTok.get("bar3_value"));
                    }

                    if (commanderCheck == false) {
                        template += " --+|[c]Formations lacks a Commander.[/c] }}";
                        sendChat("",template);
                        return;
                    }
                }

                if (action.includes("Fire")) {
                    coordinatedCheck = false;
                    for (let j=0;j<formationNumbers.length;j++) {
                        let formNum = formationNumbers[j];
                        let form = playerFormations[formNum];
                        let unitIDs = form.unitIDs;

                        let c = CheckUnits(unitIDs,"Coordinated Fire");
                        if (c == true && coordinatedCheck == false) {coordinatedCheck = true};

                        let ldrID = form.leaderID;
                        let ldrTok = findObjs({_type: "graphic", id: ldrID})[0];
                        associatedBM += Number(ldrTok.get("bar3_value"));
                    }

                    if (coordinatedCheck == false) {
                        template += " --+|[c]Formations lacks Coordinated Fire.[/c] }}";
                        sendChat("",template);
                        return;
                    }
                }
            }
        } else {
            formationNumbers = [formationNumber];
        }

        let orderList = state.Armageddon.orderList
    log("orderList")    
    log(orderList)
        let lastNation = orderList[orderList.length - 1]
        let priorNation = orderList[orderList.length - 2]
        let backNation = orderList[orderList.length - 3]
        let retain = false;

log("Player: " + player)
log("Last Nation: " + lastNation)

        //check if is retained initiative
        if (lastNation == player && excludedActions.includes(action) == false) {
            for (let j=0;j<opponentFormations.length;j++) {
                let oForm = opponentFormations[j];
                let oFormStatus = oForm.status.toString();
                let oFormOrder = oForm.currentOrder.toString(); 
                if (Offboard(oForm) == true) {
                    continue
                };

                if (oFormOrder.includes("Garrison Overwatch") || oFormStatus.includes("Activated") || oFormStatus.includes("Broken") || oFormStatus.includes("Destroyed")) {continue};
                if (oFormOrder.includes("Overwatch") || oFormOrder.includes("Combat Air Patrol")) {continue};
                if (oForm.dcTotal == 0 || oForm.unitIDs.length == 0) {continue};
                retain = "Retain Initiative";
                break;
            }

    log("Retain: " + retain)

            if (priorNation == player && retain == "Retain Initiative") {
                if (playerNation.includes("Eldar") == false || farsight == false) {
                    template += " --+|[c]Opponent's Turn[/c] }}";
                    sendChat("",template);
                    return;
                } else {
                    retain = "Double Retain Initiative";
                    if (backNation === player) {
                        template += " --+|[c]Opponent's Turn[/c] }}";
                        sendChat("",template);
                        return;
                    }
                }
            }
        }

        if (RerollUsed == true) {
            template += " --+|[c]Supreme Commander Reroll Used[/c]";
            let bm = Math.max(Number(formationLeaderTok.get("bar3_value")) - 1,0);
            formationLeaderTok.set("bar3_value",bm);
            let dcTotal = Number(formation.dcTotal);
            if (formation.status.includes("Broken")) {
                bm = dcTotal - 1;
                formationLeaderTok.set({
                    bar3_value: bm,
                    tint_color: "#FF0000",
                });
                index = formation.status.indexOf("Broken");
                formation.status[index] = "Activated";
            }
            if (bm == 0) {
                formationLeaderTok.set("tint_color","transparent");
            }
        }

        if (retain != false) {
            if (CheckUnits(formationUnitIDs,"farsight") == false && CheckUnits(formationUnitIDs,"Living Ancestor") == false) {
                initiative += 1;
                tooltip += "Retain Initiatve[br]";
            }
            template += " --+|[c]" + retain + "[/c]";
        }
        if ((Number(formationLeaderTok.get("bar3_value")) > 0 || associatedBM > 0) && CheckUnits(formationUnitIDs,"Aircraft") == false) {
            initiative += 1;
            tooltip += "Blast Markers[br]";
        }

        if ((action === "Assault") && CheckUnits(formationUnitIDs,"Death Company") && tooltip.includes("Blast Markers")) {
            tooltip = tooltip.replace("Blast Markers[br]","Death Company[br]");
            initiative -= 1;
        }

        if (CheckUnits(formationUnitIDs,"Aircraft")) {
            airBM = Number(formationLeaderTok.get("bar3_value"));
            if (prevBM > 0) {
                airBM = prevBM;
            }
            if (action === "Air Assault or Landing" && CheckUnits(formationUnitIDs,"Death Company")) {
                airBM = 0;
                tooltip += "Death Company[br]";
            }

            if (playerNation == "Space Marines" && faction != "Imperial Navy") {
                    //not Imperial Navy but actual Marines
                    airBM = Math.floor(airBM/2);
            }

            initiative += airBM;
            tooltip += airBM + " Blast Markers[br]";
        }
        if (playerNation.includes("Ork") && (action.includes("Assault") || action.includes("Double") || action.includes("Intercept") || action.includes("Ground"))) {
            tooltip += "Power of the Waaagh![br]";
            initiative -= 2;
        }

        if (playerNation.includes("Tyranids") && action.includes("Assault")) {
            tooltip += "The Hunger[br]";
            initiative -= 1;
        }

        if (CheckUnits(formationUnitIDs,"Daemonic Rage") && action.includes("Assault")) {
            tooltip += "Daemonic Rage[br]";
            initiative -= 1;
        }

        if ((faction == "Death Guard" || playerNation.includes("Necron")) && action.includes("Marshal")) {
            //Death Guard or Necrons
            tooltip += "Implacable Advance[br]";
            initiative -= 1;
        } 

        if ((faction == "Death Guard" || playerNation.includes("Necron")) && action.includes("March")) {
            template += " --+|[c]This army may not be given a March order.[br]Choose another Order.[/c] }}";
            sendChat("",template);
            return;
        }

        if (action === "Overwatch Fire" && formation.currentOrder.includes("Overwatch") == false) {
            template += " --+|[c]Formation is not on Overwatch.[/c] }}";
            sendChat("",template);
            return;
        }

        if ((action.includes("Patrol") || action.includes("Intercept")) && CheckUnits(formationUnitIDs,"Fighter") == false) {
            template += " --+|[c]Air Formation is not able to execute that Order.[/c] }}";
            sendChat("",template);
            return;
        }

        if (action.includes("Disengage")) {
            template += " --+|[c]Air Formation may Disengage[/c] --+|[c]Flak Attacks will be at -1.[/c]";
            if (CheckUnits(formationUnitIDs,"Fighter")) {
                template += " --+|[c]The Formation begins to Jink as well.[/c]"
                formation.status.push("Jink");              
            }
            if (action.includes("Own")) {
                template += " --+|[c]Own Edge: No additional Blast Markers.[/c] }}";
            } else {
                template += " --+|[c]Other Edge: 1 Additional Blast Marker Acquired.[/c] }}";
                let bm = Number(formationLeaderTok.get("bar3_value")) + 1;
                formationLeaderTok.set("bar3_value",bm);            
            }
            ClearCurrentTarget("Disengage");
            sendChat("",template);

            formation = ChangeLanded(formation,false);
            formation.currentOrder = "Disengage";

            playerFormations[formationNumber] = formation;
            state.Armageddon.playerInfo[player].formations = playerFormations;
            return;     
        }

        if (action.includes("Double") && CheckUnits(formationUnitIDs,"Blitzkrieg")) {
            tooltip += "Blitzkrieg![br]";
            initiative -= 1;
        }

        if (action.includes("Garrison") || action == "Overwatch Fire" || action == "Combat Air Interception") {
            tooltip += action + "[br]";
            initiative = 0;
        }

        initiativeRoll = ROLL();

        tooltip += "Initiative Roll: " + initiativeRoll + "[br]Needing: " + initiative + "+";
        let tip = '[🎲](#" class="showtip" title="' + tooltip + ')';

        if (initiativeRoll >= initiative) {
            if (formationNumbers.length > 1) {
                template += " --+|[c]" + tip + " All Selected Formations Activate Successfully.[/c]";
                noun = "Formations";
            } else {
                template += " --+|[c]" + tip + " Formation Activates Successfully.[/c]";
                noun = "Formation";
            }
            success = true;
            
            if (RerollUsed == true) {
                if (playerNation.includes("Chaos") || playerNation.includes("Lost")) {
                    song = "death-to-the-false-emperor"
                }
                if (playerNation.includes("Imperial")) {
                    song = "for-the-glory-of-the-imperium"
                }
                sound = findObjs({type: "jukeboxtrack", title: song})[0]
                if (sound) {sound.set({playing: true,softstop:false})}
            }

            switch(action) {
                case "Advance and Fire":
                    template += " --+|[c]" + noun + " may make a single move and fire with no penalty.[/c]";
                    break;
                case "Double Move and Fire":
                    template += " --+|[c]" + noun + " may take 2 moves, and fire with a -1 to hit.[/c]";
                    break;
                case "March Move":
                    template += " --+|[c]Formation may take 3 moves.[/c]";
                    break;
                case "Sustained Fire":
                    template += " --+|[c]" + noun + " may fire with +1 to hit.[/c] --+|[c]" + noun + " may not move or change facing.[/c] --+|[c]Indirect Barrages can be fired.[/c]";
                    break;
                case "Assault Enemy":
                    template += " --+|[c]" + noun + " may Assault an Enemy Formation.[/c]";
                    break;
                case "Overwatch":
                    template += " --+|[c]Formation is placed on Overwatch.[/c]";
                    break;
                case "Overwatch Fire":
                    template += " --+|[c]Formation chooses to fire from Overwatch.[/c]";
                    break;  
                case "Marshal":
                    template += " --+|[c]Formation may either shoot at -1 OR make a single move.[/c] --+|[c]After that it may Regroup.[/c]";    
                    break;
                case "Garrison Overwatch":
                    template += " --+|[c]Formation is placed on Overwatch.[/c]";
                    break;  
                case "Air Assault or Landing":
                    formation = ChangeLanded(formation,true) ;
                    template += " --+|[c]Formation may Land and Fire[/c] --+|[c]OR may Land and Launch an Assault[/c] --+|[c]OR may Land and Load Troops.[/c]";
                    break;
                case "Combat Air Patrol":
                    template += " --+|[c]Formation is placed on CAP on your table edge.[/c]";
                    formation = ChangeLanded(formation,false) ;
                    break;
                case "Combat Air Interception":
                    formation = ChangeLanded(formation,false) ;
                    template += " --+|[c]Formation may intercept another Air Formation.[/c]";
                    break;  
                case "Intercept":
                    formation = ChangeLanded(formation,false) ;     
                    template += " --+|[c]Formation may Intercept another Air Formation.[/c]";
                    break;          
                case "Ground Attack":
                    formation = ChangeLanded(formation,false) ;  
                    template += " --+|[c]Formation may launch a Ground Attack.[/c]";
                    break;          
                case "Stand Down":  
                    template += " --+|[c]Formation chooses to Stand Down and rearms/refuels.[/c]";
                    break;  
                default:
                    template += " --+|[c]Error![/c]";           
            }
        } else {
            template += " --+|[c][#FF0000]" + tip + " Formation Fails to Activate.[/#][/c]";
            if (formationNumbers.length > 1) {
                template += " --+|[c]The Associated Formations may still activate later in the turn.[/c]";
            }
            if (formation.status.includes("Spacecraft")) {
                template += " --+|[c]The Spacecraft is delayed and may attempt activation next turn.[/c]"
            } else if (CheckUnits(formationUnitIDs,"Aircraft") == false || landedIndex > -1) {
                template += " --+|[c][#FF0000]Formation can either Move, Shoot or Regroup[/#][/c]";
                template += " --+|[c][#FF0000]Formation will gain 1 Blast Marker.[/#][/c]";     
            } else {
                reroll += ";" + airBM;
                template += " --+|[c][#FF0000]Formation will Rearm and Refuel.[/#][/c]";
                formationLeaderTok.set("bar3_value",0);
                formationLeaderTok.set("tint_color","transparent");
                AbilitiesOn(gmnotes,"Refit");
                formationLeaderTok.set("aura1_color","#000000");
                formation.currentOrder = "Refit";
                index = formation.status.indexOf("Green");
                formation.status[index] = "Activated";
            }
            success = false

            if (state.Armageddon.playerInfo[player].supreme.length > 0 && state.Armageddon.playerInfo[player].supremeused == false) {

                for (let i=0;i<state.Armageddon.playerInfo[player].supreme.length;i++) {
                    let supremeUnit = masterObjectArray[state.Armageddon.playerInfo[player].supreme[i]];
                    let supremeFormNum = supremeUnit.formationNumber;
                    let offCheck = LoadedLeader(state.Armageddon.playerInfo[player].supreme[i])
                    if ((supremeFormNum == formationNumber) || offCheck == true) {
                        let phrase = "Supreme Commander Reroll";
                        let button = BUTTON(phrase,reroll,faction) ;
                        template += button;
                        break;
                     }                
                }
            }
        }

        if (action === "Overwatch Fire") {
            let phrase = "Overwatch Fire";
            let add = "!RangedFire;Standard;" + formationLeaderID +"&#59;&#64;&#123;target&#124;token_id&#125;&#59;&#63;&#123;Target&#124;All&#124;Armour&#124;Infantry&#125;&#59;&#63;&#123;Ignore Targets in Cover&#124;No&#124;Yes&#125;";
            let button = BUTTON(phrase,add,faction); 
            template += button;
        }

        if (action === "Combat Air Interception") {
            let phrase = "Air Interception";
            let add = "!RangedFire;AA;" + formationLeaderID +"&#59;&#64;&#123;target&#124;token_id&#125;";
            let button = BUTTON(phrase,add,faction); 
            template += button;
        }

        template += " }}";
        sendChat("",template);

        if (excludedActions.includes(action) == false) {
            temp = state.Armageddon.orderList;
            temp.push(player);
            state.Armageddon.orderList = temp;
        }

        RemoveDead();

        if (success == true) {
            if (playerNation.includes("Ork") && action.includes("Assault")) {
                sound = findObjs({type: "jukeboxtrack", title: "Waaagh!"})[0];
                if (sound) {
                    sound.set({playing: true,softstop:false});
                }
            }

            for (let i=0;i<formationNumbers.length;i++) {
                let formNum = formationNumbers[i];
                let form = playerFormations[formNum];
                let ldTokID = form.leaderID;
                let ldTok = findObjs({_type: "graphic", id: ldTokID})[0];
                let gm = unescape(ldTok.get("gmnotes")).split(";");
                let colour = "#000000";
                if (action == "Overwatch" || action == "Garrison Overwatch" || action == "Combat Air Patrol") {
                    colour = "#FF00FF";
                }
           
                ldTok.set("aura1_color",colour);
                form.currentOrder = action;
                index = form.status.indexOf("Green");
                if (index > -1) {form.status[index] = "Activated"};
                index2 = form.status.indexOf("Broken");
                if (index2 > -1) {form.status[index2] = "Activated"};   
                playerFormations[formNum] = form;

                AbilitiesOn(gm,action);
                if (CheckUnits(formationUnitIDs,"Aircraft") && form.status.includes("Air")) {
                    formationLeaderTok.set("bar3_value",0);
                    formationLeaderTok.set("tint_color","transparent");
                }
            }
        }

        if (success == false && RerollUsed == false  && CheckUnits(formationUnitIDs,"Aircraft") == false) { 
            AbilitiesOn(gmnotes,"Hold");
            let bm = Number(formationLeaderTok.get("bar3_value")) + 1;
            formationLeaderTok.set({
                bar3_value: bm,
                aura1_color: "#000000",
                tint_color: "#FF0000",
            })
            let dcTotal = Number(formation.dcTotal);
            let index = formation.status.indexOf("Green");
            formation.status[index] = "Activated";      
            formation.currentOrder = "Hold";

            if (bm >= dcTotal) { //breaks
                formationLeaderTok.set("bar3_value",0);
                for (let o=0;o<formationUnitIDs.length;o++) {
                    let id = formationUnitIDs[o];
                    let tok = findObjs({_type: "graphic", id: id})[0];
                    tok.set("tint_color","#FFFF00");
                }
                index = formation.status.indexOf("Activated");
                formation.status[index] = "Broken";     
                let template = Template(faction);
                template = template.replace("<<SUBJECTNAME>>",formation.name);
                template = template.replace("<<LEFTSUB>>","");
                template = template.replace("<<RIGHTSUB>>","");
                template += " --+|[c]Formation Breaks![/c] }}";
                sendChat("",template);
            } 
        }

        playerFormations[formationNumber] = formation;
        state.Armageddon.playerInfo[player].formations = playerFormations;
    }

    function AAToggle(msg) {
        toggle = state.Armageddon.AAToggle;
        if (!toggle) {
            toggle = "OFF";
        }

        if (toggle == "ON") {
            let masterTokenArray = findObjs({
                _pageid: Campaign().get("playerpageid"),
                _type: "graphic",
                    _subtype: "token",
                layer: "objects",
            })
            for (let i=0;i<masterTokenArray.length;i++) {
                tok = masterTokenArray[i];
                tok.set({
                    aura2_radius: "",
                    aura2_color: "",
                })
                if (tok.get("bar2_value") > 0) {
                    tok.set({
                        aura2_color: "#0000FF",
                        aura2_radius: .1,
                    })
                }
            }
            state.Armageddon.AAToggle = "OFF";      
            return;
        }

        Tag = msg.content.split(";");
        let tokenID = Tag[1];
        let token = findObjs({_type: "graphic", id: tokenID})[0];
        let unit = getObj("character",token.get("represents"));
        let gmnotes = unescape(token.get("gmnotes")).split(";");
        let player = gmnotes[0];
        let opponent = (player == 0) ? 1:0;

        info = state.Armageddon.playerInfo[player];
        formations = info.formations;

        for (let i=0;i<formations.length;i++) {
            let formation = formations[i];
            if (formation.status.includes("Broken")) {continue};
            let unitIDs = formation.unitIDs;

            for (let j=0;j<unitIDs.length;j++) {
                let id = unitIDs[j];
                let unit = masterObjectArray[id];
                if (!unit) {continue};
                if (unit.attributeArray.type.includes("Air")) {continue};
                if (!unit.terrain.whatPolys[0]) {continue};
                let terType = unit.terrain.whatPolys[0].type;
                if (terType == "Offboard") {continue};
                let weaponRange = 0;
                for (let k=1;k<9;k++) {
                    let nam = "weapon" + k + "firepower";
                    let nam2 = "weapon" + k + "range";          
                    let range = unit.attributeArray[nam2];
                    if (!range || isNaN(range)) {continue}
                    range = Number(range)
                    let firepower = unit.attributeArray[nam];
                    if (!firepower) {continue}
                    if (firepower.includes("AA") == false) {continue};
                    weaponRange = Math.max(weaponRange,range);
                }
                if (weaponRange === 0) {continue};
                let tok = findObjs({_type: "graphic", id: id})[0];
                tok.set({
                    aura2_radius: weaponRange,
                    aura2_color: "#FFFF00",
                    showplayers_aura2: true,
                })
            }
        }

        state.Armageddon.AAToggle = "ON"
        return;
    }

    function Teleport(msg) {
        let Tag = msg.content.split(";");
        let tokenID = Tag[1];
        let unit = masterObjectArray[tokenID];
        let playerNation = state.Armageddon.nations[unit.player];
        let template = Template(unit.attributeArray.faction);
        let playerFormations = state.Armageddon.playerInfo[unit.player].formations;
        let formation = playerFormations[unit.formationNumber];
        template = template.replace("<<SUBJECTNAME>>",formation.name);
        if (formation.name.length > 20) {
            template = template.replace("--#titleFontSize|1.4em","--#titleFontSize|1em");
        }           
        template = template.replace("<<LEFTSUB>>","Teleport");
        template = template.replace("<<RIGHTSUB>>","");
        let formationLeaderID = formation.leaderID;
        let formationLeaderUnit = masterObjectArray[formationLeaderID];
        let formationLeaderTok = findObjs({_type: "graphic", id: formationLeaderID})[0];
        let formationUnitIDs = formation.unitIDs;
        let dcTotal = formation.dcTotal;
        let mime = CheckUnits(formationUnitIDs,"Mime");
        let teleportHomer = false;
        let faction = formationLeaderUnit.attributeArray.faction;
        if (faction == "Dark Angels") { //Dark Angels
            loop1:
            for (let j=0;j<playerFormations.length;j++) {
                let form = playerFormations[j];
                if (j== unit.formationNumber) {continue};
                if (CheckUnits(form.unitIDs,"Teleport Homer")) {
                    for (let k=0;k<form.unitIDs.length;k++) {
                        let id1 = form.unitIDs[k];
                        for (let m=0;m<formationUnitIDs.length;m++) {
                            let id2 = formationUnitIDs[m];
                            let dist = ClosestDistance(id1,id2);
                            if (dist <= 6) {
                                teleportHomer = true;
                                break loop1;
                            }
                        }
                    }
                }
            }
        }

        let startbm = Number(formationLeaderTok.get("bar3_value"));
        let bm = 0;
        let rolls = [];
        for (let i=0;i<formationUnitIDs.length;i++) {
            let roll = ROLL();
            if (teleportHomer == true || mime == true) {
                let roll2 = ROLL();
                if (roll == 6 && roll2 == 6) {bm += 1};
                roll = roll + "/" + roll2;
            } else {
                if (roll === 6) {bm += 1};
            }
            rolls.push(roll)
        }
        endbm = startbm + bm;
        if (endbm > 0 && endbm < dcTotal) {
            formationLeaderTok.set({
                bar3_value : endbm,
                tint_color: "#FF0000",
            }) 
        }   
        if (endbm >= dcTotal) {
            formationLeaderTok.set({
                bar3_value : 0,
                aura1_color: "#FFFF00"
            }) 
            for (let j=0;j<formationUnitIDs.length;j++) {
                let id = formationUnitIDs[j];
                let tok = findObjs({_type: "graphic", id: id})[0];  
                tok.set("tint_color","#FFFF00");
            }
            index = formation.status.indexOf("Green");
            if (index < 0) {index = formation.status.indexOf("Activated")};
            formation.status[index] = "Broken";
            state.Armageddon.playerInfo[player].formations[formationNumber] = formation;
        }
        let tooltip = "Rolls: " + rolls.toString();
        let tip = '[🎲](#" class="showtip" title="' + tooltip + ')';
        template += " --+|[c]" + tip + " " + bm + " Blast Markers from Teleportation.[/c]"
        if (endbm >= dcTotal) {
            template += " --+|[c]The Formation Breaks![/c]";
        }
        template += " }}";
        sendChat("",template);
        sound = findObjs({type: "jukeboxtrack", title: "Teleport"})[0];
        sound.set({playing: true,softstop:false});
    }

    function DifficultTerrain(msg) {    
        let Tag = msg.content.split(";");
        let tokenID = Tag[1];
        let slow = Tag[2];
        let token = findObjs({_type: "graphic", id: tokenID})[0];
        let unit = masterObjectArray[tokenID];
        let notes = unit.attributeArray.notes;
        let formationNumber = unit.formationNumber;
        let playerNation = state.Armageddon.nations[unit.player];
        let template = Template(unit.attributeArray.faction);
        let playerFormations = state.Armageddon.playerInfo[unit.player].formations;
        let formation = playerFormations[unit.formationNumber];
        template = template.replace("<<SUBJECTNAME>>",unit.name);
        if (unit.name.length > 20) {
            template = template.replace("--#titleFontSize|1.4em","--#titleFontSize|1em");
        }           
        template = template.replace("<<LEFTSUB>>","Difficult Terrain Test");
        template = template.replace("<<RIGHTSUB>>","");
        let dc = Number(unit.attributeArray.dc);
        let reroll = false;
        if (notes.includes("Walker") || slow == "Yes") {
            reroll = true;
        }

        for (let t=0;t<unit.terrain.whatPolys.length;t++) {
            if (unit.terrain.whatPolys[t].type == "Minefield") {reroll = false};
        }
        let roll1 = ROLL();
        let roll2 = ROLL();
        let result;
        let tooltip = "Roll: " + roll1;
        if (reroll == true) {
            tooltip += "," + roll2;
        }
        let tip = '[🎲](#" class="showtip" title="' + tooltip + ')';
        if ((roll1 === 1 && reroll == false) || (roll1 === 1 && roll2 === 1 && reroll == true)) {
            result = "Failed.";
            dc -= 1;
            token.set("bar1_value",dc);
            masterObjectArray[tokenID].health = dc;
        } else {
            result = "Passed.";
        }
        formation = CheckDead(formation)
        state.Armageddon.playerInfo[unit.player].formations[unit.formationNumber] = formation;

        template += " --+|[c]" + tip + " Result: " + result + "[/c]";
        template += " }}";
        sendChat("",template);
    }

    const ClearCCFlags = (ids) => {
        for (let i=0;i<ids.length;i++) {
            masterObjectArray[ids[i]].ccOpp = 0;
        }
    }


    function SummonUnits(msg) {
        let Tag = msg.content.split(";");
        let tokenID = Tag[1];
        let token = findObjs({_type: "graphic", id: tokenID})[0];
        let unit = masterObjectArray[tokenID];
        let playerNation = state.Armageddon.nations[unit.player];
        let template = Template(unit.attributeArray.faction);
        template = template.replace("<<SUBJECTNAME>>",unit.name);
        if (unit.name.length > 20) {
            template = template.replace("--#titleFontSize|1.4em","--#titleFontSize|1em");
        }           
        template = template.replace("<<LEFTSUB>>","Summoning");
        template = template.replace("<<RIGHTSUB>>","");

        let command = "!AddUnits&#59;" + tokenID;
        let phrase = "Select All Units to be Summoned and Click";
        let button = BUTTON(phrase,command,unit.attributeArray.faction);
        template += button;
        template += " }}";
        sendChat("",template);
    }

    function AddUnits(msg) {
        let Tag = msg.content.split(";");
        let tokenID = Tag[1];
        let token = findObjs({_type: "graphic", id: tokenID})[0];
        let unit = masterObjectArray[tokenID];
        let formationNumber = unit.formationNumber;
        let player = unit.player
        let playerNation = state.Armageddon.nations[unit.player];
        let template = Template(unit.attributeArray.faction);
        let playerFormations = state.Armageddon.playerInfo[unit.player].formations;
        let formation = playerFormations[unit.formationNumber]; 
        let formationName = formation.name;
        let unitIDs = formation.unitIDs;
        let dcTotal = formation.dcTotal;
        template = template.replace("<<SUBJECTNAME>>",formationName);
        if (formationName.length > 20) {
            template = template.replace("--#titleFontSize|1.4em","--#titleFontSize|1em");
        }               
        template = template.replace("<<LEFTSUB>>","Summoning");
        template = template.replace("<<RIGHTSUB>>","");
        if (!msg.selected) {
            template += " --+|[c]No Units Selected[/c] }}";
            sendChat("",template);
            return;
        }
        for (let i=0;i<msg.selected.length;i++) {
            let id = msg.selected[i]._id;
            let tok = findObjs({_type:"graphic", id: id})[0];
            let uni = getObj("character",tok.get("represents"));
            if (!uni) {continue};
            let attributeArray = AttributeArray(uni.id);
            let uniName = UnitName(uni,formationNumber,i) + " S";
            let location = new pt(Math.round(tok.get('left')),Math.round(tok.get('top')));
            let rotation = tok.get("rotation");
            let gmn = player + ";"+ formationNumber + ";Infantry";
            let gmT = unescape(gmn).split(";");
            let ter = TokensTerrain(tok)
            unitIDs.push(id)
            masterObjectArray[id] = {
                name: uniName,
                player: player,
                formationNumber: formationNumber,
                attributeArray: attributeArray,
                terrain: ter,
                location: location,
                rotation: rotation,
                vertices: [],
            }           
            dcTotal += Number(attributeArray.dc)

            marker = Markers("",formationNumber,"marker")

            tok.set({
                name: uniName,
                statusmarkers: "",
                gmnotes: gmn,
                bar1_value: attributeArray.dc, //DC or 1 for non-warengine
                bar1_max: attributeArray.dc,
                bar2_value: 0, 
                bar2_max: 0,
                bar3_value: 0,
                bar3_max: 0,
                aura1_color: "",
                aura1_radius: "",
                show_tooltip: true,
                tint_color: "transparent"
            })
            tok.set("statusmarkers",marker)
        }

        formation.unitIDs = unitIDs;
        formation.dcTotal = dcTotal;
        let ldID = formation.leaderID;
        let leaderToken = findObjs({_type: "graphic", id: ldID})[0];
        leaderToken.set({
            bar3_max: dcTotal
        });
        state.Armageddon.playerInfo[player].formations[formationNumber] = formation
        template += " --+|[c]" + msg.selected.length + " Units Added[/c] }}"
        sendChat("",template)
        MOA();
    }

    const CreateArc = (weaponInfo,id) => {
        let string = "!weapon-arc ";
        let titles = "";
        let colours = ["#F3FF00","#00FFEC","#FFC300","#FF00EC","#83FF00","#FE5F5F"];
        let c = 0;
        let faction = masterObjectArray[id].attributeArray.faction;
        let template = Template(faction);

        let unitName = masterObjectArray[id].name;
        if (unitName.length > 20) {
            template = template.replace("--#titleFontSize|1.4em","--#titleFontSize|1em");
        }       
        template = template.replace("<<SUBJECTNAME>>",unitName);
        template = template.replace("<<LEFTSUB>>","");
        template = template.replace("<<RIGHTSUB>>","");

        for (let i=0;i<weaponInfo.length;i++) {
            let weapon = weaponInfo[i];
            if (weapon.notes.includes("Arc") == false) {continue};
            let notes = weapon.notes;
            let aw, r;
            if (notes.includes("Forward")) {
                aw = "180";
                if (notes.includes("Fixed")) {aw = "90"};
            };
            if (notes.includes("Left")) {
                aw = "270|180";
            }
            if (notes.includes("Right")) {
                aw = "90|180";
            }
            if (notes.includes("Rear")) {
                aw = "180|180";
                if (notes.includes("Fixed")) {aw = "180|90"};       
            }
            r = weapon.range.toString() + "u";
            string += " --add " + aw + " " + r + " " + colours[c] + " " + colours[c] + " ";
            titles += " --+|[c][" + colours[c] + "]█[/#] ➤ " + weapon.name + "[/c]";
            c++;
        }

        let temp = state.Armageddon.tokenID;
log(temp)                       
        temp.push(id);
        state.Armageddon.tokenID = temp;
log(temp)        
        template += titles
        template += " --+|[c]Click Button when done to remove Lines.[/c]";
        let command = "!RemoveArc";
        let phrase = "Remove All Arcs";
        let button = BUTTON(phrase,command,faction);
        template += button;
        template += " }}";
        sendChat("",string);
        sendChat("",template);
    }

    const WeaponArcDisplay = (msg) => {
        let id = msg.selected[0]._id;
        let obj = masterObjectArray[id];
        let wi = obj.blastWeapons;
        wi = wi.concat(obj.rangedWeapons);
        let dis = false;
        for (let i=0;i<wi.length;i++) {
            if (wi[i].notes.includes("Arc")) {
                dis = true;
                break;
            }
        }
        if (dis == false) {
            sendChat("","No Weapons with Arcs")
            return;;
        } 
        CreateArc(wi,id);
    }

    const RemoveArc = () => {
        let string = "!weapon-arc --clearall";
        sendChat("",string);
        return;
    }

    function Planetfall(msg) {
        let Tag = msg.content.split(";");       
        let tokenID = Tag[1]
        let token = findObjs({_type: "graphic", id: tokenID})[0]
        let gmnotes = unescape(token.get("gmnotes")).split(";");
        let unit = masterObjectArray[tokenID]
        let player = unit.player
        let formationNumber = unit.formationNumber      
        let airIndex = state.Armageddon.playerInfo[player].formations[formationNumber].status.indexOf("Air")
        if (airIndex > -1) {
            state.Armageddon.playerInfo[player].formations[formationNumber].status[airIndex] = "Landed"
        }

        let x = token.get("left")
        let y = token.get("top")

        let distance = Math.floor((ROLL() + ROLL())/2.5) * 70
        let direction = randomInteger(360) * Math.PI / 180
        x += (Math.cos(direction) * distance)
        y += (Math.sin(direction) * distance)
        let point = new pt(x,y)
        unit.location = point
        token.set({
            left: x,
            top: y,
        })
        unit.terrain = TokensTerrain(token);
        if (unit.attributeArray.type.includes("War")) {
            unit.vertices = tokenVertices(token);
        }
        masterObjectArray[tokenID] = unit
        sendChat("","Planetfall Landed")
        return
    }

    function Infestation(msg) {
        let Tag = msg.content.split(";");
        let initialTokenID = Tag[1];
        let initialToken = findObjs({_type: "graphic", id: initialTokenID})[0]
        let formationName = Tag[2];
        if (masterObjectArray[initialTokenID]) {
            if (masterObjectArray[initialTokenID].formationNumber > -1) {
                sendChat("","Error, this Zombie is already part of a Formation.");
                return;                
            }
        }

        let sound = findObjs({type: "jukeboxtrack", title: "Zombies"})[0];
        sound.set({playing: true,softstop:false});
        let unit = getObj("character",initialToken.get("represents"));
        let nation = masterObjectArray[initialTokenID].attributeArray.nation;
        let faction = masterObjectArray[initialTokenID].attributeArray.faction;
        let player = -1;
        if (state.Armageddon.factions[0].includes(faction)) {player = 0};
        if (state.Armageddon.factions[1].includes(faction)) {player = 1};
        if (player == -1) {
            sendChat("","Error, this Zombie doesnt appear to be in the correct Faction.");
            return;
        }
        let formationNumber = state.Armageddon.playerInfo[player].formations.length;
        let gmn = player + ";"+ formationNumber + ";Infantry";
        let gmT = unescape(gmn).split(";");
        let template = Template(faction);
        if (formationName.length > 20) {
            template = template.replace("--#titleFontSize|1.4em","--#titleFontSize|1em");
        }
        template = template.replace("<<SUBJECTNAME>>",formationName)
        template = template.replace("<<LEFTSUB>>","Infestation!");
        template = template.replace("<<RIGHTSUB>>","");

        if (nation.includes("Chaos")) {total = ROLL() + ROLL() + 3};
        if (nation.includes("Lost")) {total = ROLL() + ROLL() + ROLL()};   

        let unitIDs = [];
        let tokenArray = [];
        tokenArray.push(initialToken);
        let dcTotal = total;
        let blastMarkers = 0;
        let infestRolls = [];
        let infestRoll = ROLL(); //the initial Token
        if (infestRoll == 6) {blastMarkers += 1};
        infestRolls.push(infestRoll);

        let t = simpleObj(initialToken) 
        delete t.id;
        t.imgsrc = getCleanImgsrc(t.imgsrc)||'';
        for (let z=0;z<(total-1);z++) { //one less as initialToken is #1
            infestRoll = ROLL();
            infestRolls.push(infestRoll);
            if (infestRoll == 6) {blastMarkers += 1};
            let newToken = createObj('graphic',t);
            tokenArray.push(newToken);
        }   

        let leaderAbilities =  findObjs({  _type: "ability", _characterid: unit.id});
        for (let i=0;i<leaderAbilities;i++) {
            ability = leaderAbilities[i];
            if (ability.get("name").includes("Activate")) {
                ability.set("istokenaction",true);
                break;
            }
        }
        let attributeArray = AttributeArray(unit.id);
        let notes = attributeArray.notes;
        SpreadUnit(tokenArray);
        for (let i=0;i<tokenArray.length;i++) {
            let token = tokenArray[i];
            let id = token.get("id");
            unitIDs.push(id);
            let unitName = UnitName(unit,formationNumber,i);
            token.set({
                name: unitName,
                statusmarkers: "",
                gmnotes: gmn,
                bar1_value: 1,
                bar1_max: 1,
                bar2_value: 0,
                bar2_max: 0,
                bar3_value: 0,
                bar3_max: 0,
                aura1_color: "",
                aura1_radius: "",
                tint_color: "transparent"
            })

            let location = new pt(Math.round(token.get('left')),Math.round(token.get('top')));
            let rotation = token.get("rotation");
            let ter = TokensTerrain(token);
            obj = {
                name: unitName,
                health: 1,
                player: player,
                formationNumber: formationNumber,
                attributeArray: attributeArray,
                terrain: ter,
                location: location,
                rotation: rotation,
            }

            masterObjectArray[id] = obj;
            ModeWeapons(id);
        }

        initialToken.set({
            aura1_color: "#00FF00",
            aura1_radius: 0.25,
            showplayers_aura1: true,
            bar3_max: dcTotal,
        })

        Markers(tokenArray,formationNumber);

        let formation = {
            name: formationName,
            leaderID: initialTokenID,
            unitIDs: unitIDs,
            dcTotal: Number(unitIDs.length),
            status: ["Green"],
            currentOrder: "",
            assaultBlasts: 0,
            reanimateT1: [],
            reanimateT2: [],
            reanimateT3: [],
            markerlights: false,
            farsight: false,
        }

        if (blastMarkers > 0) {
            initialToken.set({
                aura1_color: "#FF0000",
                bar3_value: blastMarkers,
            })
        }        

        let info = state.Armageddon.playerInfo[player].formations;
        info.push(formation);
        state.Armageddon.playerInfo[player].formations = info;

        infestRolls = infestRolls.toString();
        let tooltip = "Rolls: " + infestRolls;
        let tip = '[🎲](#" class="showtip" title="' + tooltip + ')';

        template += " --+|[c]" + dcTotal + " Zombies Arise![/c]"
        template += " --+|[c]" + tip + " " + blastMarkers + " Initial Blast Markers[/c] }}"
        sendChat("",template)
        MOA();
    }

    function Regroup(msg) {
        let Tag = msg.content.split(";");
        let action = Tag[1];
        let tokenID = Tag[2];   
        let token = findObjs({_type: "graphic", id: tokenID})[0];
        let BM = Tag[3]; //optional
        let repShields = Tag[4]; //optional
        let optionTotal = Tag[5]; //optional
        let RerollUsed = false
        if (action.includes("Reroll")) {
            action = action.replace("Reroll+","");
            RerollUsed = true;
        }
        let reroll = "!Regroup&#59;Reroll+Rally&#59;&#64;&#123;selected&#124;token_id&#125;";

        let unit = masterObjectArray[tokenID];
        let player = unit.player;   
        let opponent = (player == 0) ? 1:0;

        let formationNumber = unit.formationNumber;
        let tooltip = "";
        let playerInfo = state.Armageddon.playerInfo[player];
        let opponentInfo = state.Armageddon.playerInfo[opponent];
        let opponentFormations = opponentInfo.formations;
        let playerNation = state.Armageddon.nations[player];
        let faction = unit.attributeArray.faction;
        let template = Template(faction);
        let formation = playerInfo.formations[formationNumber];
        let formationName = formation.name;
        let unitIDs = formation.unitIDs;
        let formationLeaderID = formation.leaderID;
        let formationLeaderTok = findObjs({_type: "graphic", id: formationLeaderID})[0];
        let formationLeaderUnit = masterObjectArray[formationLeaderID];
        let initiative = Number(formationLeaderUnit.attributeArray.initiative);
        template = template.replace("<<SUBJECTNAME>>",formationName);
        template = template.replace("<<LEFTSUB>>",action);
        template = template.replace("<<RIGHTSUB>>","");
        if (formationName.length > 20) {
            template = template.replace("--#titleFontSize|1.4em","--#titleFontSize|1em");       
        }

        //leader search for extra blast markers
        let leaders = 0;
        for (let f=0;f<unitIDs.length;f++) {
            let id = unitIDs[f];
            let uni = masterObjectArray[id];
            if (!uni) {continue};
            let notes = uni.attributeArray.notes;
            if (notes.includes("Leader") || notes.includes("Supreme")) {
                leaders += 1;
            }
        }

        if (formationLeaderUnit.name.includes("Deathwing") || CheckUnits(unitIDs,"Spirit Stones") || CheckUnits(unitIDs,"Bonded Team")) {leaders += 1};

        if (action === "Repair") { //fed back by button
            if (Number(BM) + Number(repShields) > optionTotal) {
                template += " --+|[c]Numbers Don't Add Up, adjust manually.[/c]";
                template += " --+|[c]" + optionTotal + " Points Total to Apply.[/c] }}";
                sendChat("",template);
                return;
            }
            template += " --+|[c]Repair Shields/Remove Blast Markers[/c]";
            if (BM > 0) {
                template += " --+|[c]" + BM + " Blast Markers Removed.[/c]";
            }
            if (repShields > 0) {
                template += " --+|[c]" + repShields + " Shields Repaired.[/c]";
            }
            let shields = Math.min((Number(token.get("bar2_value")) + Number(repShields)), token.get("bar2_max"));
            token.set({
                bar2_value: shields,
                aura2_color: "#0000FF",
                aura2_radius: .1,
            })
            let markers = Math.max((Number(token.get("bar3_value")) - Number(BM)), 0);
            token.set("bar3_value",markers);
            if (token.get("bar3_value") === 0) {
                template += " --+|[c]All Blast Markers Removed.[/c]";
                token.set("tint_color","transparent");
            }
            if (token.get("bar2_value") === token.get("bar2_max")) {
                template += " --+|[c]All Shields Repaired.[/c]";
            }
            template += " }}";
            sendChat("",template);
            return;
        }


        if (action === "Rally") {

            if (RerollUsed == true) {
                template += " --+|[c]Supreme Commander Reroll Used[/c]";
                state.Armageddon.playerInfo[player].supremeused = true;
            }

            if (Number(formationLeaderTok.get("bar3_value")) == 0 && (formationLeaderTok.get("tint_color") != "#FFFF00" && formation.status.includes("Broken") == false )) {
                template += " --+|[c]Formation has no Blast Markers.[/c] }}";
                sendChat("",template);
                return;
            }

            if (formation.status.includes("Rallied") && RerollUsed == false) {
                template += " --+|[c]Formation Already Rallied This Turn.[/c] }}";
                sendChat("",template);
                return;
            }
            if (formation.status.includes("Rallied") == false) {
                formation.status.push("Rallied");
            }

            let mobNum = 0;
            let tips = "";
            let roll = ROLL();
            if (formationLeaderTok.get("tint_color") === "#FFFF00" || formation.status.includes("Broken")) {
                initiative += 2;
                tips += "Formation Broken[br]";
            }
            if (playerNation.includes("Tyranid")) {
                initiative -= 1;
                tips += "The Hunger[br]";
            }
            if (playerNation.includes("Ork")) {
                for (let i=0;i<unitIDs.length;i++) {
                    let orkid = unitIDs[i];
                    let orkunit = masterObjectArray[orkid];
                    let orkname = orkunit.name;
                    if (orkname.includes("Gretchin") || orkname.includes("Big Gun") || orkname.includes("Catapult")) {continue};
                    mobNum += orkunit.attributeArray.dc;    
                }
                if (mobNum > 5) {
                    initiative -= 1;
                    tips += "Mob Rule[br]";
                }
                if (mobNum > 10) {
                    initiative -= 1;
                } 
            }
            //enemy unit search
            if (Offboard(formation) == false) {
                search:
                for (let h=0;h<unitIDs.length;h++) {
                    let qid = unitIDs[h];
                    if (!masterObjectArray[qid]) {continue}
                    if (masterObjectArray[qid].health < 1) {continue};
                    for (let i=0;i<opponentFormations.length;i++) {
                        let oform = opponentFormations[i];
                        let oids = oform.unitIDs;
                        for (let j=0;j<oids.length;j++) {
                            let oid = oids[j];
                            if (!masterObjectArray[oid]) {continue}
                            if (masterObjectArray[oid].health < 1) {continue};
                            let dist = ClosestDistance(qid,oid);
                            if (dist <= 12) {
                                initiative += 1;
                                tips += "Enemy within 12";
                                break search;
                            }
                        }
                    }
                }           
            }

            let tooltip = "Roll: " + roll + "[br]Needing: " + initiative + "+[br]" + tips;
            let tip = '[🎲](#" class="showtip" title="' + tooltip + ')';
            let formBM,rally;
            if (roll < initiative) {
                let song;
                template += " --+|[c]" + tip + " Rally Test Fails![/c]";
                if (formation.status.includes("Broken")) {
                    template += " --+|[c]Unit must make a withdrawal move and remains Broken.[/c]";
                } else {
                    template += " --+|[c]Unit fails to remove any Blast Markers.[/c]";
                }

                if (RerollUsed == true) {
                    if (playerNation.includes("Chaos") || playerNation.includes("Lost")) {
                        song = "they-are-too-strong"
                    }
                    if (playerNation.includes("Imperial")) {
                        song = "flee-theyre-too-much-for-us"
                    }
                    sound = findObjs({type: "jukeboxtrack", title: song})[0]
                    if (sound) {sound.set({playing: true,softstop:false})}
                }


                if (state.Armageddon.playerInfo[player].supreme.length > 0 && state.Armageddon.playerInfo[player].supremeused == false) {

                    for (let i=0;i<state.Armageddon.playerInfo[player].supreme.length;i++) {
                        let supremeUnit = masterObjectArray[state.Armageddon.playerInfo[player].supreme[i]];
                        let supremeFormNum = supremeUnit.formationNumber;
                        let offCheck = LoadedLeader(state.Armageddon.playerInfo[player].supreme[i]);
                        if ((supremeFormNum == formationNumber) || offCheck == true) {
                            let phrase = "Supreme Commander Reroll";
                            let button = BUTTON(phrase,reroll,faction) ;
                            template += button;
                            break;
                         }                
                    }
                }
            } else {
                template += " --+|[c]" + tip + " Rally Test Succeeds![/c]";
                if (RerollUsed == true) {
                    if (playerNation.includes("Chaos") || playerNation.includes("Lost")) {
                        song = "for-the-dark-gods"
                    }
                    if (playerNation.includes("Imperial")) {
                        song = "hold-the-line-damn-it"
                    }
                    sound = findObjs({type: "jukeboxtrack", title: song})[0]
                    if (sound) {sound.set({playing: true,softstop:false})}
                }

                if (playerNation === "Space Marines" && faction != "Titan Legions" && faction != "Imperial Navy" ) {
                    if (formationLeaderTok.get("tint_color") === "#FFFF00") {
                        formBM = Number(formation.dcTotal) * 2;
                    } else {
                        formBM = Number(formationLeaderTok.get("bar3_value"));
                    }
                    leaders = 2*leaders;
                } else {
                    if (formationLeaderTok.get("tint_color") === "#FFFF00") {
                        formBM = Number(formation.dcTotal);
                    } else {
                        formBM = Number(formationLeaderTok.get("bar3_value"));
                    }   
                }
                rally = Math.round(formBM/2) + leaders;

                formBM = Math.max((formBM - rally),0);
                if (formBM === 0) {
                    template += " --+|[c]All Blast Markers removed.[/c]";
                    if (leaders > 0) {
                        template += " --+|[c](" + leaders + " from Leaders.)[/c]";
                    }                               
                } else {
                    template += " --+|[c]" + rally + " Blast Markers removed.[/c]";
                    if (leaders > 0) {
                        template += " --+|[c](" + leaders + " from Leaders.)[/c]";
                    }               
                    template += " --+|[c]The Formation is now at " + formBM + " Blast Markers.[/c]";
                }

                formationLeaderTok.set("bar3_value",formBM);
                let index = formation.status.indexOf("Broken");
                if (index > -1) {
                    formation.status[index] = "Activated";
                }

                formationLeaderTok.set("aura1_color","#000000");
                playerInfo.formations[formationNumber] = formation;
                state.Armageddon.playerInfo[player] = playerInfo;
                let newids = formation.unitIDs;
                for (let u=0;u<newids.length;u++) {
                    let newid = newids[u];
                    let newtok = findObjs({_type:"graphic", id: newid})[0];
                    newtok.set("tint_color","transparent");
                }
            }
        
            let shields = false
            for (let i=0;i<unitIDs.length;i++) {
                let sid = unitIDs[i];
                let sunit = masterObjectArray[sid];
                let snotes = unit.attributeArray.notes;
                let stok = findObjs({_type: "graphic", id: sid})[0];
                if (snotes.includes("Void Shields") == false) {continue}
                shields = true;
                let curShields = Number(stok.get("bar2_value")) + 1;
                curShields = Math.min(curShields,Number(stok.get("bar2_max")));
                stok.set({
                    bar2_value: curShields,
                    aura2_color: "#0000FF",
                    aura2_radius: .1,
                })
            }
            if (shields == true) {
                template += " --+|[c]Any Titans repair 1 Void Shield.[/c]";
            }

            if (Number(formationLeaderTok.get("bar3_value")) > 0 && formation.status.includes("Broken") == false) {
                formationLeaderTok.set("tint_color","#FF0000");
            }
            if (Number(formationLeaderTok.get("bar3_value")) === 0 && formation.status.includes("Broken") == false) {
                formationLeaderTok.set("tint_color","transparent");
            }

            if (CheckUnits(unitIDs,"Summoning Cost") && CheckUnits(unitIDs,"Focus") == false) {                
                let su = SummonedUnits(unitIDs,"Rally");
                state.Armageddon.playerInfo[player].formations[formationNumber].unitIDs = su[0];
                state.Armageddon.playerInfo[player].formations[formationNumber].dcTotal = su[1];

                let sides = state.Armageddon.sides;
                let f = state.Armageddon.positions[player];
                if (!f) {f = 0};
                let side = sides[player];

                let lowerArray = new Array([6618,2120],[7144,2120],[7670,2120],[6618,2521],[7144,2521],[7670,2521],[6618,2923],[7144,2923],[7670,2521],[6618,3325],[7144,3325],[7670,3325]);
                let upperArray = new Array([6577,177],[7103,177],[7630,177],[6577,579],[7103,579],[7630,579],[6577,980],[7103,980],[7630,980],[6577,1382],[7103,1382],[7630,1382]);

                let tokenArray = su[2];
                let X,Y;
                if (side == "upper") {
                    X = upperArray[f][0];
                    Y = upperArray[f][1];
                } else {
                    X = lowerArray[f][0];
                    Y = lowerArray[f][1];
                }

                tokenArray[0].set({
                    left: X,
                    top: Y,
                })

                for (let t=0;t<tokenArray.length;t++) {
                    tokenArray[t].set({
                        gmnotes: "",
                        tint_color: "transparent",
                        bar3_value: 0,
                        aura1_color: "",
                        statusmarkers: "",
                    })
                }

                SpreadUnit(tokenArray);

                f += 1;
                state.Armageddon.positions[player] = f;

                template += " --+|[c]Summoned Units return to the Warp.[/c]";

                if (Number(formationLeaderTok.get("bar3_value") >= su[1])) {
                    let a = CheckStatus(formation,0);
                    if (a[1]) {
                        template += " --+|[c]Formation Breaks as a result.[/c]";
                    }
                }
            }   

            template += " }}";
            sendChat("",template);
            return;
        }

        if (action === "Regroup") {
            let blastMarkers = Number(formationLeaderTok.get("bar3_value"));
            if (formationLeaderTok.get("tint_color") === "#FFFF00") {
                template += " --+|[c]Formation is Broken and cannot Regroup, only Rally.[/c] }}";
                sendChat("",template);
                return;
            }

            let regroupRoll1 = ROLL();
            let regroupRoll2 = ROLL();
            let tooltip = "Roll 1: " + regroupRoll1 + "[br]Roll 2: " + regroupRoll2;
            let regroup = Math.max(regroupRoll1,regroupRoll2) + leaders;
            if (playerNation === "Space Marines" && faction != "https://s3.amazonaws.com/files.d20.io/images/267640127/URcXXlTiAUzAUhG1UXlEug/thumb.png?1643400941") {regroup += leaders};
            if (leaders > 0) {
                tooltip += "[br]" + leaders + " added by Leaders.";
            }
            let tip = '[🎲](#" class="showtip" title="' + tooltip + ')';

            let blast = Math.min(Number(formationLeaderTok.get("bar3_value")),regroup);
            let newBM = Number(formationLeaderTok.get("bar3_value")) - blast;

            template += " --+|[c]" + tip + "Formation Regroups.[/c]";

            let voidshields = ["Space Marines","Imperial Guard","Titan Legion","Lost and the Damned","Chaos","Squats","Skitarii","Sisters of Battle"];
            let shieldToks = [];
            if (voidshields.includes(playerNation)) {
                for (let i=0;i<unitIDs.length;i++) {
                    let vid = unitIDs[i];
                    let vtok = findObjs({_type: "graphic", id: vid})[0];
                    let vunit = masterObjectArray[vid];
                    let vnotes = vunit.attributeArray.notes;
                    if (vnotes.includes("Void Shields")) {
                        shieldToks.push(vtok);
                    }
                }           
            }

            if (shieldToks.length > 1) {
                template += " --+|[c]Due to Multiple Units with Shields and options, this should be done manually[/c]";
                template += " --+|[c]There are " + regroup + " Points available for Shields +/- Blast Markers.[/c]";
                template += " }}";
                sendChat("",template);
                return;
            }

            if (shieldToks.length === 1) {
                vtok = shieldToks[0];
                let shieldDeficit = Number(vtok.get("bar2_max")) - Number(vtok.get("bar2_value"));
                if (shieldDeficit > 0) {
                    if (regroup >= (blast + shieldDeficit)) {
                        //repair shields with remainder
                        vtok.set("bar2_value","bar2_max");
                        vtok.set({
                            aura2_color: "#0000FF",
                            aura2_radius: .1,
                        })
                        template += " --+|[c]All Shields were Repaired.[/c]";
                    } else {
                        template += " --+|[c]There are " + regroup + " Points available for Shields +/- Blast Markers.[/c]";
                        template += " --+|[c]The Unit has " + vtok.get("bar3_value") + " Blast Markers.[/c]";
                        template += " --+|[c]The Unit has " + shieldDeficit + " Shields Down.[/c]";
                        template += " --+|[c]Click Button Below and Select Mix.[/c]";
                        repair = "!Regroup&#59;Repair&#59;&#64;&#123;selected&#124;token_id&#125;&#59;&#63;&#123;Points to Blast Markers&#124;0&#125;&#59;&#63;&#123;Points to Shield Repair&#124;0&#125;&#59;" + regroup;
                        let phrase = "Repair Shields";
                        let button = BUTTON(phrase,repair,faction);
                        template += button + " }}";
                        sendChat("",template);
                        return;             
                    }
                }   
            }

            template += " --+|[c]Removing " + blast + " Blast Markers.[/c]";
            formationLeaderTok.set("bar3_value",newBM);
            if (Number(formationLeaderTok.get("bar3_value")) > 0) {
                formationLeaderTok.set("tint_color","#FF0000");
            }
            if (Number(formationLeaderTok.get("bar3_value")) === 0) {
                formationLeaderTok.set("tint_color","transparent");
            }

            template += " }}";
            sendChat("",template);
        }
    }

    const LOSCheck = (msg) => {       
        let Tag = msg.content.split(";");
        let id1 = Tag[1];
        let id2 = Tag[2];
        let check = LOS(id1,id2,"Ranged");
        let loscheck = check[0];
        let range = check[1];
        let unit1 = masterObjectArray[id1];
        let unit2 = masterObjectArray[id2];
        let faction = unit1.attributeArray.faction;
        let template = Template(faction)
        template = template.replace("<<SUBJECTNAME>>",unit1.name);
        template = template.replace("<<LEFTSUB>>","LOS to: " + unit2.name);
        template = template.replace("<<RIGHTSUB>>","");
        if (unit1.name.length > 20) {
            template = template.replace("--#titleFontSize|1.4em","--#titleFontSize|1em");       
        }
        if (loscheck == false) {
            template += " --+|[c]No LOS to Target.[/c]";
        } else if (loscheck == true) {
            template += " --+|[c]LOS to Target.[/c]";
        } else if (loscheck == "Part") {
            template += " --+|[c]Partial LOS to Target or Target in Cover.[/c]";
        }
        template += " --+|[c]Range of " + range + " Hexes to Target.[/c] }}";
        sendChat("",template);
    }

    const DisplayFormations = () => {
        let output = "!script {{ --#title|Formtions";
        for (let i=0;i<2;i++) {
            output += " --+|[c]" + state.Armageddon.nations[i] + "[/c]" + InsertLine();
            let formations = state.Armageddon.playerInfo[i].formations;
            for (let j=0;j<formations.length;j++) {
                output += " --+|[c]" + formations[j].name + "[/c]";
                output += " --+|[c]" + formations[j].unitIDs.length + " Units[/c][br]"
            }
        }
        output += " }}";
        sendChat("",output);
    }

    const AddAbility = (abilityName,action,unitID) => {
        createObj("ability", {
            name: abilityName,
            characterid: unitID,
            action: action,
            istokenaction: true,
        })
    }

    const KillToken = (msg) => {
        let names = [];
        for (let i=0;i<msg.selected.length;i++) {
            let tokenID = msg.selected[i]._id;
            let token = findObjs({_type: "graphic", id: tokenID})[0];
            token.set("status_dead",true);
            let name = token.get("name");
            names.push(name);
            let obj = masterObjectArray[tokenID];
            masterObjectArray[tokenID].health = 0;
            let formation = state.Armageddon.playerInfo[obj.player].formations[obj.formationNumber];
            CheckDead(formation);
        }
        template = "!script {{ --#title|Kill Tokens";
        template += " --+|[c]Tokens Killed:[/c]" + InsertLine();
        for (let i=0;i<names.length;i++) {
            template += " --+|[c]" + names[i] + "[/c]";
        }
        template += InsertLine();
        template += " --+|[c]Formations Adjusted[/c]";
        template += " }}";
        sendChat("",template);
    }

    const Abilities = (msg) => {

        for (let a=0;a<msg.selected.length;a++) {
            let tokenID = msg.selected[a]._id;
            let token = findObjs({_type:"graphic", id: tokenID})[0];
            let id = token.get("represents");
            let obj = masterObjectArray[tokenID];
            let type = masterObjectArray[tokenID].attributeArray.type;
            let speed = masterObjectArray[tokenID].attributeArray.speed;
            let abilArray = findObjs({  _type: "ability", _characterid: id});
            let notes = obj.attributeArray.notes;
            let blastWeapons = obj.blastWeapons;
            let rangedWeapons = obj.rangedWeapons;
            let abilityName;
            let action;
            let wnotes;
            let fp;

            //clear old abilities   
            for(let i=0;i<abilArray.length;i++) {
                abilArray[i].remove();
            }       
            //Various Abilities
            if (type.includes("Aircraft") == false && type.includes("Spacecraft") == false) {
                abilityName = "Difficult Terrain Test";
                action = "!DifficultTerrain;@{selected|token_id};?{Moving Cautiously|No|Yes}"; 
                AddAbility(abilityName,action,id);
            }
            if (notes.includes("Teleport")) {
                abilityName = "Teleport";
                action = "!Teleport;@{selected|token_id}"; 
                AddAbility(abilityName,action,id);
            }
            if (notes.includes("Infestation")) {
                abilityName = "Infestation";
                action = "!Infestation;@{selected|token_id};?{Formation Name}" ;
                AddAbility(abilityName,action,id);
            }       
            if (notes.includes("Planetfall")) {
                abilityName = "Planetfall";
                action = "!Planetfall;@{selected|token_id}";
                AddAbility(abilityName,action,id);
            }
            if (obj.name.includes("Drop Pod")) {
                abilityName = "Deathwind";
                action = "!ResolveBarrage;@{selected|token_id};Deathwind;0;@{selected|token_id}";
                AddAbility(abilityName,action,id);
            }   

            if (blastWeapons.length > 0) {
                for (let i=0;i<blastWeapons.length;i++) {
                    wnotes = blastWeapons[i].notes;
                    if (wnotes.includes("Orbital")) {
                        abilityName = blastWeapons[i].name;
                        action = "!Barrage;Orbital;@{selected|token_id};@{target|Initial Target|token_id}";
                    } else if (wnotes.includes("Indirect")) {
                        abilityName = blastWeapons[i].name + " (Direct or Indirect)";
                        action = "!Barrage;?{Type|Direct|Indirect};@{selected|token_id};@{target|Initial Target|token_id}";
                    } else {
                        abilityName = blastWeapons[i].name + " (Direct)";
                        action = "!Barrage;Direct;@{selected|token_id};@{target|Initial Target|token_id}";
                    }
                    if (wnotes.includes("Slow")) {
                        abilityName += " (Slow)";
                        action += ";Slow";
                    }
                    if (wnotes.includes("One-Shot")) {
                        abilityName += " (One-Shot)";
                        action += ";One-Shot";
                    }
                    AddAbility(abilityName,action,id);
                }
            }

            if (rangedWeapons.length > 0) {
                let types = [];
                for (let i=0;i<rangedWeapons.length;i++) {
                    let wnotes = rangedWeapons[i].notes;
                    let fp = rangedWeapons[i].firepower
                    let abilityName = "";
                    let addon = "";
                    let c = "";
                    if (wnotes.includes("One-Shot")) {
                        c += ",One-Shot";
                        addon += " (One-Shot)";
                    }  
                    if (wnotes.includes("Slow")) {
                        c += ",Slow";
                        addon += " (Slow)";
                    }
                    if (fp.includes("AA") && types.includes("AA") == false) {
                        types.push("AA");
                        abilityName = "AA Fire";
                        action = "!RangedFire;AA;@{selected|token_id};@{target|token_id};All;No";
                    } else if (wnotes.includes("Pinpoint") && types.includes("Pinpoint") == false) {
                        abilityName = rangedWeapons[i].name + " (Pinpoint)";
                        action = "!RangedFire;Pinpoint;@{selected|token_id};@{target|token_id};All;No";
                    } else if (wnotes.includes("Sniper") && types.includes("Sniper") == false) {
                        abilityName = rangedWeapons[i].name + " (Sniper)";
                        action = "!RangedFire;Sniper;@{selected|token_id};@{target|token_id};All;No";
                    } else if (wnotes.includes("Indirect") && types.includes("Indirect") == false && addon == "") {
                        types.push("Indirect");
                        abilityName = rangedWeapons[i].name + "(Indirect or Direct)";
                        action = "!RangedFire;?{Type|Direct|Indirect};@{selected|token_id};@{target|token_id};?{Target|All|Armour|Infantry};?{Ignore Targets in Cover|No|Yes}";
                    } else if (wnotes.includes("Indirect") == false && types.includes("Direct") == false && addon == "") {
                        types.push("Direct");
                        abilityName = "Direct Fire Weapons";
                        action = "!RangedFire;Direct;@{selected|token_id};@{target|token_id};?{Target|All|Armour|Infantry};?{Ignore Targets in Cover|No|Yes}";
                    } else if (wnotes.includes("Indirect") && addon != "") {
                        abilityName = rangedWeapons[i].name + "(Indirect or Direct)" + addon;
                        action = "!RangedFire;?{Type|Direct|Indirect}" + c + ";@{selected|token_id};@{target|token_id};?{Target|All|Armour|Infantry};?{Ignore Targets in Cover|No|Yes}";
                    } else if (wnotes.includes("Indirect") == false && addon != "") {
                        abilityName = rangedWeapons[i].name + addon;
                        action = "!RangedFire;Direct" + c + ";@{selected|token_id};@{target|token_id};?{Target|All|Armour|Infantry};?{Ignore Targets in Cover|No|Yes}";
                    } else {
                        continue; //skips for duplicates/weapons that are covered in Direct for instance
                    }   
                    AddAbility(abilityName,action,id);
                }
            }

            //activation, assault, overwatch fire, cap intercept, regroup

            if (type.includes("Aircraft")) {
                if (notes.includes("Transport") == false) { 
                    abilityName = "Activate";
                    action = "!Activate;?{Command?|Combat Air Patrol|Intercept|Ground Attack|Stand Down|Disengage Own Edge|Disengage Other Edge};@{selected|token_id}";
                    AddAbility(abilityName,action,id);
                } else {
                    abilityName = "Activate";
                    action = "!Activate;?{Command?|Air Assault or Landing|Combat Air Patrol|Intercept|Ground Attack|Stand Down|Disengage Own Edge|Disengage Other Edge};@{selected|token_id}";
                    AddAbility(abilityName,action,id);
                } 
                abilityName = "Combat Air Interception";
                action = "!Activate;Combat Air Interception;@{selected|token_id}";
                AddAbility(abilityName,action,id);
            } else if (type.includes("Spacecraft")) {
                abilityName = "Activate";
                action = "!Activate;Advance and Fire;@{selected|token_id}";
                AddAbility(abilityName,action,id);
                abilityName = "Leave Orbit";
                action = "!LeaveOrbit;?{Are You Sure?|No|Yes};"
                AddAbility(abilityName,action,id);
            } else {
                abilityName = "Activate";
                action = "!Activate;?{Command?|Advance and Fire|Double Move and Fire|March Move|Sustained Fire|Assault Enemy|Overwatch|Marshal|Garrison Overwatch}";
                AddAbility(abilityName,action,id);
                
                abilityName = "Assault";
                action = "!Assault;@{selected|token_id}";
                AddAbility(abilityName,action,id);

                abilityName = "Overwatch Fire";
                action = "!Activate;Overwatch Fire;@{selected|token_id}";
                AddAbility(abilityName,action,id);

                abilityName = "Regroup";
                action = "!Regroup;Regroup;@{selected|token_id}";
                AddAbility(abilityName,action,id);

            }

        }
        sendChat("","Abilities Added")
    }


    const RangedFire = (msg) => {
    let beforeR,afterR;
    beforeR=_.now();

        let Tag = msg.content.split(";");
        let command = Tag[1];
        log("Command: " + command);
        let shooterTokenID = Tag[2]; // a token from the shooting formation
        let targetTokenID = Tag[3]; // a token from the target formation or a sniper's target 

        if (shooterTokenID === undefined || targetTokenID === undefined) {
            sendChat("API","Please select a character.");
            return;
        }

        if (masterObjectArray[targetTokenID].attributeArray.type == "System" || masterObjectArray[targetTokenID].name.includes("Target")) {
            sendChat("API","Please select a valid target (picked a Target Icon).");
            return;
        }

        let targetting = Tag[4]; //?all, infantry, armour
        let ignoreTCover = false;
        if (Tag[5] == "Yes") {
            ignoreTCover = true;
        }
        let partial = false;
        let shooterUnit = masterObjectArray[shooterTokenID];
        let targetUnit = masterObjectArray[targetTokenID];
        let tooltip = "";
        let blastMarkers = 0;

        let player = shooterUnit.player;
        let opponent = targetUnit.player;

        let playerInfo = state.Armageddon.playerInfo[player];
        let opponentInfo = state.Armageddon.playerInfo[opponent];
        let playerNation = state.Armageddon.nations[player];
        let opponentNation = state.Armageddon.nations[opponent];
        let faction = shooterUnit.attributeArray.faction;
        let template = Template(faction);
        template += " --#bodyFontSize| 12px"

        let formation = playerInfo.formations[shooterUnit.formationNumber];
        let formationUnitIDs = formation.unitIDs;

        template = template.replace("<<SUBJECTNAME>>",formation.name)
        template = template.replace("<<RIGHTSUB>>","")
        if (formation.name.length > 20) {
            template = template.replace("--#titleFontSize|1.4em","--#titleFontSize|1em")        
        }

        let formationLeaderID = formation.leaderID;
        let formationLeaderTok = findObjs({_type: "graphic", id: formationLeaderID})[0];    
        let formationLeaderUnit = masterObjectArray[formationLeaderID];
        let shooterType = formationLeaderUnit.attributeArray.type;

        let opponentFormation = opponentInfo.formations[targetUnit.formationNumber];
        let opponentFormationUnitIDs = opponentFormation.unitIDs;
        let sniperOpponentIDs = opponentFormationUnitIDs;
        state.Armageddon.playerInfo[opponent].formations[targetUnit.formationNumber].blastmarkers = 0; //reset for ranged fire

        let suppression = Number(formationLeaderTok.get("bar3_value"));
        let crossAir = false;
        if (shooterType.includes("Aircraft") && formation.status.includes("Landed") == false) {
            suppression = 0;
            crossAir = true;
        }   
        if (playerNation == "Space Marines" && faction != "Imperial Navy" && faction != "Titan Legions") { //know no fear rule
            suppression = Math.floor(suppression/2);
        }

        if (CheckUnits(formationUnitIDs,"Stubborn") && suppression > 0) {suppression -= 1};

        if (command == "Sniper") {
            suppression = 0;
            formationUnitIDs = [shooterTokenID];
            opponentFormationUnitIDs = [targetTokenID];
        }
        if (command == "Pinpoint") {
            formationUnitIDs = [shooterTokenID];
            opponentFormationUnitIDs = [targetTokenID];
            if (targetUnit.attributeArray.type.includes("War Engine") == false) {
                sendChat("","Target must be a War Engine");
                return;
            }
        }
        if (formation.status.includes("Green") && command != "AA") {
            template = template.replace("<<LEFTSUB>>","Error");     
            template += " --+|[c]Formation needs to be Activated first.[/c] }}";
            sendChat("",template);
            return;
        }

        if (player == opponent) {
            template = template.replace("<<LEFTSUB>>","Error");
            template += " --+|[c]Please recheck, shooting at own units.[/c] }}";    
            sendChat("",template);
            return;
        }

        if (command.includes("Indirect") && formation.currentOrder.includes("Sustained") == false) { //Thudd Guns and similar
            template = template.replace("<<LEFTSUB>>","Error");     
            template += " --+|[c]Formation needs to be on Sustained Fire.[/c] }}";
            sendChat("",template);
            return;
        }

log("initial targets")    
for (let t=0;t<opponentFormationUnitIDs.length;t++) {
    log(masterObjectArray[opponentFormationUnitIDs[t]].name)
}

        //sort formations based on distances
        let bothFormations = SortFormation(formationUnitIDs,opponentFormationUnitIDs);
        let shooterFormation = bothFormations.shooters;
        let targetFormation = bothFormations.targets;
        let crossfireFormation = shooterFormation;

log("after sort")
for (let t=0;t<shooterFormation.length;t++) {
    log(masterObjectArray[shooterFormation[t]].name)
}    
for (let t=0;t<targetFormation.length;t++) {
    log(masterObjectArray[targetFormation[t]].name)
}
        opponentFormation.unitIDs = targetFormation; //sorted, due to extra casualties

        //remove any targets in cover if ignore cover selected
        let coverF = CoverFormation(targetFormation,ignoreTCover);
        targetFormation = coverF[0];
log("after cover removal - target formation")
for (let t=0;t<targetFormation.length;t++) {
    log(masterObjectArray[targetFormation[t]].name)
}
        let marker = false;
        if (playerNation == "Tau" && command != "AA") {
            marker = MarkerLights(player,opponent,shooterUnit.formationNumber,targetUnit.formationNumber)
        }

        let ind = false;
        if (command.includes("Indirect") || marker == true) {
            ind = true;
        }

        //remove shooters without LOS and build ETAs
        let check = LOSFormation(shooterFormation,targetFormation,ind)
        shooterFormation = check[0];
        partial = check[1];
log("after LOS")
for (let t=0;t<shooterFormation.length;t++) {
    log(masterObjectArray[shooterFormation[t]].name)
}    
for (let t=0;t<targetFormation.length;t++) {
    log(masterObjectArray[targetFormation[t]].name)
}

        if (shooterFormation.length === 0) {
            template = template.replace("<<LEFTSUB>>","LOS/Range")      
            template += " --+|[c]LOS is blocked for all units or no appropriate weapons.[/c] }}"
            sendChat("",template)
            return
        }
        //remove shooters based on suppression
        shooterFormation = SuppressFormation(shooterFormation,suppression,command)
        if (shooterFormation.length === 0) {
            template = template.replace("<<LEFTSUB>>","Suppression");       
            template += " --+|[c][b]All Shooters with LOS Suppressed or Range is too great.[/b][/c] }}";
            sendChat("",template);
            return;
        }   
log("after suppression")
for (let t=0;t<shooterFormation.length;t++) {
    log(masterObjectArray[shooterFormation[t]].name)
}    
for (let t=0;t<targetFormation.length;t++) {
    log(masterObjectArray[targetFormation[t]].name)
}

        crossExtra = false; //used to track extra casualties from Crossfire
        let toHitMod = 0;
        let leftsub = [];

        if (coverF[1] == true) {
            toHitMod += 1
            leftsub.push("Cover")
        }
        if (coverF[1] == false && check[1] == true) {
            toHitMod += 1
            leftsub.push("Partially Obscured")
        }
        if (formation.currentOrder.includes("Marshal") && command != "AA") {
            toHitMod += 1
            leftsub.push("Marshal")
        }
        if (formation.currentOrder.includes("Double") && command != "AA") {
            toHitMod += 1
            leftsub.push("Double Move")
        }
        if (formation.currentOrder.includes("Sustained") && command != "AA") {
            toHitMod -= 1
            leftsub.push("Sustained Fire")
        }
        if (opponentFormation.currentOrder.includes("Disengage")) {
            toHitMod += 1
            leftsub.push("Target Disengaging")
        }
        if (formation.currentOrder.includes("Intercept")) {
            toHitMod -= 1
            leftsub.push("Interception")
        }
        if (command == "Sniper") {
            leftsub.push("Sniper")
        }
        if (command == "AA") {
            leftsub.push("Antiaircraft Fire")
        }
        if (marker == true) {
            toHitMod -= 1
            leftsub.push("Markerlights")
        }
    
        if (formation.currentOrder.includes("Sustained") == false && formation.status.includes("Air") == false) {
            RotateFormation(formation,targetFormation[0]);
        }


        let crossfireCheck = false;
        if (command != "Pinpoint" && command != "AA" && crossAir == false && command != "Sniper") {
            crossfireCheck = Crossfire(player,shooterUnit.formationNumber,crossfireFormation,targetFormation);    
        } else if (command == "Sniper") {
            crossfireCheck = Crossfire(player,shooterUnit.formationNumber,crossfireFormation,sniperOpponentIDs);    
        }

        if (crossfireCheck == true) {
            leftsub.push("Crossfire");
        }

        template += " --+|[c][b]Shooters[/b][/c]"

        let saveResultsNorm,saveResultsMacro;

        //Non-Macro weapon attacks first, clear array of hits
        for (let i=0;i<targetFormation.length;i++) {
            masterObjectArray[targetFormation[i]].hits = [];
        }
        hitresults = RangedHitResults("Normal",shooterFormation,toHitMod,command,targetting,crossfireCheck,leftsub);
        template += hitresults;

        saveResultsNorm = ApplySaves(targetFormation);

        if (command == "Sniper" || command == "Pinpoint") {
            opponentFormation.unitIDs = sniperOpponentIDs;
        }

        opponentFormation = CheckDead(opponentFormation);
        if (opponentFormation.unitIDs.length != 0) {
            //Macro weapon next, clear array of hits first
            for (let i=0;i<targetFormation.length;i++) {
                masterObjectArray[targetFormation[i]].hits = [];
            }
            hitresults = RangedHitResults("Macro",shooterFormation,toHitMod,command,targetting,crossfireCheck,leftsub);
            template += hitresults;
            saveResultsMacro = ApplySaves(targetFormation);
            opponentFormation = CheckDead(opponentFormation);
        }

        blastMarkers += state.Armageddon.playerInfo[opponent].formations[targetUnit.formationNumber].blastmarkers

        if (saveResultsNorm != "" || (saveResultsMacro != "" && saveResultsMacro != undefined)) {
            template += InsertLine();
            template += " --+|[c][b]Saves[/b][/c]";
            if (saveResultsNorm != "" ) {
                template += " --+|[c]Normal Weapons[/c]";
                template += saveResultsNorm;
            }
            if (saveResultsMacro != "" && saveResultsMacro != undefined) {
                template += " --+|[c]Macro Weapons[/c]"
                template += saveResultsMacro;               
            }
            template += InsertLine();
        }

        if (opponentFormation.status.includes("Current Target") == false) { //would be true if already fired on by unit eg. with barrage or snipers
            blastMarkers += 1; //the one for being fired upon
            opponentFormation.status.push("Current Target")
        }
        template += " --+|[c]Formation takes " + blastMarkers + " Blast Markers.[/c]"
        if (opponentFormation.unitIDs.length != 0) {
            let scheck = CheckStatus(opponentFormation,blastMarkers);
            opponentFormation = scheck[0];
            if (scheck[1] == "broken") {
                template += " --+|[c]Formation is Broken![/c]"
                if (scheck[3] == true) {
                    template += " --+|[c]Any Summoned Units are lost to the Warp![/c]"
                }
            }
            if (scheck[1] == "destroyed") {
                template += " --+|[c]Formation is Destroyed![/c]"
            }
        } else {
            opponentFormation.status = "Destroyed"
            template += " --+|[c]Formation is Destroyed![/c]"
        }
        opponentFormation.blastmarkers = 0;
        state.Armageddon.playerInfo[opponent].formations[targetUnit.formationNumber] = opponentFormation;

        leftsub = leftsub.toString();
        template = template.replace("<<LEFTSUB>>",leftsub);
        template += " }}";
        sendChat("",template);

    afterR=_.now();
    log(`Elapsed time for 'Ranged Fire' was ${ (afterR-beforeR)/1000 } seconds`);

    }

const ModeWeapons = (id) => {

    let unit = masterObjectArray[id];
    let ccWeapons = [];
    let ffWeapons = [];
    let rangedWeapons = [];
    let blastWeapons = [];
    for (let w=0;w<9;w++) {
        let wname = "weapon"+w+"name";
        if (!unit.attributeArray[wname] || unit.attributeArray[wname] == "") {continue}
        let wnumber = "weapon"+w+"number";
        let wrange = "weapon"+w+"range";
        let wfirepower = "weapon"+w+"firepower";
        let wnotes = "weapon"+w+"notes";
        let wsound = "weapon"+w+"sound";
        let weaponNotes = unit.attributeArray[wnotes];
        if (!weaponNotes) {weaponNotes = ""}

        let weapon = {
            name: unit.attributeArray[wname],
            number: unit.attributeArray[wnumber],
            range: unit.attributeArray[wrange],
            firepower: unit.attributeArray[wfirepower],
            notes: weaponNotes,
            sound: unit.attributeArray[wsound],
        };

        if (weapon.range == "CC") {
            ccWeapons.push(weapon);
        } else if (weapon.range == "FF") {
            ffWeapons.push(weapon);
        } else if (weapon.firepower.includes("BP")) {
            blastWeapons.push(weapon);
        } else {
            rangedWeapons.push(weapon);
        };
    }
    masterObjectArray[id].ccWeapons = ccWeapons;
    masterObjectArray[id].ffWeapons = ffWeapons;
    masterObjectArray[id].rangedWeapons = rangedWeapons;
    masterObjectArray[id].blastWeapons = blastWeapons;
}       


    const ApplySaves = (ids,type) => { //will be a group of ids
        if (!type) {let type = ""};
        let results = "";
        for (let i=0;i<ids.length;i++) {
            let id = ids[i];  
            let obj = masterObjectArray[id];
            if (obj.hits == 0 || obj.hits == null || obj.health < 1) {continue};
            res = SavingThrow(id,type);
            if (!res || res == null) {continue}
            if (res[0] == "Already Dead") {continue};
            results += res[0];
            let bm = Number(state.Armageddon.playerInfo[masterObjectArray[id].player].formations[masterObjectArray[id].formationNumber].blastmarkers);
            if (isNaN(bm)) {bm=0};
            if (type != "Transport") {
                bm += Number(res[1]);
            }
            state.Armageddon.playerInfo[masterObjectArray[id].player].formations[masterObjectArray[id].formationNumber].blastmarkers = bm;

            let cas = Number(state.Armageddon.playerInfo[masterObjectArray[id].player].formations[masterObjectArray[id].formationNumber].assaultCasualties);
            if (isNaN(cas)) {cas = 0};
            cas += Number(res[2]);
            state.Armageddon.playerInfo[masterObjectArray[id].player].formations[masterObjectArray[id].formationNumber].assaultCasualties = cas;
        }
        return results;
    }

    const SavingThrow = (id,type) => {
        let results = "";
        let blastMarkers = 0;
        let assCas = 0;
        let token = findObjs({_type: "graphic", id: id}) [0];
        if (!token) {
log("No Token")            
            return ["Already Dead",0];
        }
        let obj = masterObjectArray[id];
        let initialHealth = obj.health;
        let armourTxt = obj.attributeArray.armour;
        let objNotes = obj.attributeArray.notes;
        if (!objNotes || objNotes == null) {objNotes = ""};
        let armour = PLUS(armourTxt);    
        let shields = Number(token.get("bar2_value"));
        if (isNaN(shields)) {shields = 0};
    log("Name: " + obj.name)    
    log("Object Notes: " + objNotes)
    log("Armour: " + armour)
    log("Shields: " + shields)    
    log("Initial Health: " + initialHealth)
        let shieldsDown = 0;
        let criticalTxt = "";
        let expendable = false;
        let gaunt = false;
        let grotz = false;
        if (CheckUnits(state.Armageddon.playerInfo[obj.player].formations[obj.formationNumber].unitIDs,"Synapse") && (obj.name.includes("Termagant") || obj.name.includes("Hormagaunt") || obj.name.includes("Gargoyle"))) {expendable = true;
            gaunt = true;
        }
        if (objNotes.includes("Summoning")) {expendable = true}; 
        if (objNotes.includes("Expendable")) {expendable = true};
        if (obj.name.includes("Grot") || objNotes.includes("Automata")) {
            expendable = true;
            grotz = true;
        }

        let coverSave = 7;
        if (obj.terrain.coverCheck == true && type != "Assault") {
            if (obj.attributeArray.type == "Infantry") {
                coverSave = obj.terrain.finalInfSave;
            }
            if (obj.attributeArray.type.includes("Vehicle")) {
                coverSave = obj.terrain.finalVehSave;
            }
        }
        let fort = false;
        for (let t=0;t<obj.terrain.whatPolys.length;t++) {
            if (obj.terrain.whatPolys[t].type == "Bunker" || obj.terrain.whatPolys[t].type == "Fortifications") {
                fort = true
                if (obj.attributeArray.faction == "Imperial Fists" && obj.attributeArray.type == "Infantry") {
                    coverSave = 4;
                    objNotes += ",Reinforced Armour";
                }
            };
        }
        if (obj.terrain.platform == true) {
            fort = true
            coverSave = 3;
        };
        //wall
        //faith
        let hits = [];
        let tooltips = "";
        let unitDamage = 0;
        let disrupt = 0;
        let weaponObj;

log("Total Hits: " + obj.hits.length)
        for (let i=0;i<obj.hits.length;i++) {
log("Hit: " + (i+1))            
            if (obj.health < 0) {continue};
            let saveRoll = "";
            let saveRoll2 = "";
            let saveRoll3 = "";
            weaponObj = obj.hits[i];
            if (weaponObj.notes.includes("Disrupt")) {disrupt += 1};
            if (i>0) {tooltips += "[br]"};
            tooltips += "Hit " + (i+1) + ": ";
            let tkHits = 0;
            if (obj.attributeArray.dc > 0 && (weaponObj.notes.includes("TK") || weaponObj.notes.includes("Titan"))) {
                tkHits = TKHITS(weaponObj.notes);
            }
log(weaponObj)
            if ((objNotes.includes("Void Shields") || objNotes.includes("Power Fields") || objNotes.includes("Shadowfields")) && shields > 0 && weaponObj.range != "CC") {
                if (tkHits > 0) {
                    let remnants = tkHits - shields
                    shields = Math.max(0,shields - tkHits)
                    shieldsDown += Math.min(shields,tkHits)
                    if (remnants <= 0) {
                        tooltips += tkHits + " Shields Down[br]"
                        hits.push("Save")
                        continue
                    } 
                    tkHits = remnants
                } else {
                        shields -= 1
                        hits.push("Save")
                        shieldsDown += 1
                        tooltips += "Shield Down[br]"
                        continue
                }
            }
            if (objNotes.includes("Holofield") && shields > 0) {
                let hsave = 3
                if (weaponObj.crossfire == true || weaponObj.command == "Sniper") {hsave = 4}
                let saveRoll = ROLL()
                tooltips += "Holofield " + saveRoll + " vs. " + hsave + "[br]"
                if (saveRoll >= hsave) {
                    hits.push("Save")
                continue
                } 
            } 
            if (state.Armageddon.playerInfo[obj.player].formations[obj.formationNumber].status.includes("Jink")) {
                armour = Math.min(armour,4)
            }
            
            let save = armour;
            if (obj.attributeArray.type == "Infantry" && weaponObj.notes.includes("Ignore Cover") == false) {save = Math.min(armour,coverSave)}
            if (obj.attributeArray.type.includes("Vehicle") && weaponObj.notes.includes("Ignore Cover") == false) {save = Math.min(armour,coverSave)}

            if (obj.attributeArray.faction == "Imperial Fists" && obj.attributeArray.type == "Infantry" && fort == true && weaponObj.notes.includes("Ignore Cover")) {
                //restores as would have had Reinforced Armour added
                objNotes = obj.attributeArray.notes;
                if (!objNotes || objNotes == null) {objNotes = ""}; 
            }

            if (weaponObj.crossfire == true && objNotes.includes("Thick") == false && fort == false) {
                save += 1
            }
            if (weaponObj.command.includes("Sniper")) {
                save += 1
            }

            if (save > 6) {
                savetxt = "N/A[br]"
            } else {
                savetxt = save + "+[br]"
            }

            if (weaponObj.notes.includes("Macro") == false && weaponObj.notes.includes("TK") == false && weaponObj.notes.includes("Titan") == false && weaponObj.firepower.includes("MW") == false) {
                saveRoll = ROLL()
                tooltips += saveRoll + " vs. " + savetxt
                if (saveRoll >= save) {
                    hits.push("Save")
                    continue
                }
            }
            if (objNotes.includes("Reinforced") && weaponObj.notes.includes("Lance") == false &&  weaponObj.notes.includes("TK") == false &&  weaponObj.notes.includes("Titan") == false) {
                saveRoll2 = ROLL()
                tooltips += "Reinforced: " + saveRoll2 + " vs. " + armourTxt + "[br]"
                if (saveRoll2 >= armour) {
                    hits.push("Save")
                    continue
                }
            }
            if (objNotes.includes("Invulnerable") || objNotes.includes("Deflector") || objNotes.includes("Living Metal") || objNotes.includes("Knight Shield") ) {
                saveRoll3 = ROLL()
                if (objNotes.includes("Invulnerable")) {
                    save = 6
                    txt = "Invulnerable: "
                }
                if (objNotes.includes("Deflector")) {
                    save = 5
                    txt = "Deflector Shields: "
                }
                if (objNotes.includes("Living Metal")) {
                    save = 4
                    txt = "Living Metal: "
                }
                if (objNotes.includes("Knight Shield")) {
                    save = 5
                    txt = "Knight Shield: "
                }
                tooltips += txt + saveRoll3 + " vs. " + save + "+[br]"
                if (saveRoll3 >= save) {
                    hits.push("Save")
                    continue
                } 
            }
            if (saveRoll === "" && saveRoll2 === "" && saveRoll3 === "") {
                tooltips += "No Save[br]"               
            }
log("Failed Save")
            //below is all for failed save as saves have continued to next hit
            hits.push("Fail")
            obj.health -= 1
log("Interim Health: " + obj.health)
            let critRoll = ROLL()
            let criticalDam = 0
            if (critRoll === 6 && obj.attributeArray.type.includes("War") && obj.health > 0) {
                criticalTxt += obj.attributeArray.critical.toString()
                criticalEffect = obj.attributeArray.criticaleffect.toString()
                if (criticalEffect.includes("Damage")) {
                    criticalDam = criticalEffect.replace("Damage","")
                    criticalDam = criticalDam.replace(" ","")
                    criticalDam = Abacus(criticalDam)
                    criticalDam = Math.min(obj.health,criticalDam)
                }
                if (criticalEffect.includes("Destroyed")) {
                    criticalDam = obj.health
                }
                if (criticalEffect.includes("Holofield")) {
                    if (token.get("bar2_value") > 0) {
                        token.set("bar2_value",0)
                    } else {
                        criticalDam = 1
                    }
                }
                if (criticalEffect.includes("Hit")){
                    let csaved = false
                    if (ROLL() >= armour) {csaved = true}
                    if (objNotes.includes("Reinforced") && ROLL() >= armour) {csaved = true}
                    if (objNotes.includes("Invulnerable") && ROLL() == 6) {csaved = true}
                    if (objNotes.includes("Deflector") && ROLL() >= 5) {csaved = true}
                    if (objNotes.includes("Living Metal") && ROLL() >= 4) {csaved = true}
                    if (objNotes.includes("Knight Shield") && ROLL() >= 5) {csaved = true}                          
                    if (csaved == false) {
                        criticalTxt += "[br]The Hit was NOT saved and an additional point of damage was taken."
                        criticalDam = 1
                    } else {
                        criticalTxt += "[br]The Hit was Saved."
                        criticalDam = 0
                    }   
                }
                obj.health -= criticalDam;
            }

            if (expendable == false) {
                blastMarkers += criticalDam + 1;

                //below is to account for TK weapon (which wasnt saved) causing multiple damage
                if (tkHits > 1 && obj.health > 0) {
                    criticalTxt += "[br]The Unit took " + tkHits + " Titan Killer Damage."
                    let rem = Math.min(obj.health,(tkHits - 1))
                    blastMarkers += rem
                    obj.health -= rem
                }
                if (weaponObj.crossfire == true && crossExtra == false) { //1st casualty due to crossfire causes extra BM, with exceptions for certain troops
                    blastMarkers += 1;
                    crossExtra = true;
                }
            }


            unitDamage += 1 + (Math.max(tkHits-1,0))

            if (gaunt == false && grotz == false) {
                assCas = Math.min(initialHealth,unitDamage);
            }
            if (obj.health < 1) {break};
        }

        obj.health = Math.max(Number(obj.health),0);
        token.set("bar1_value",obj.health);
        token.set("bar2_value",shields);
log("New Health: " + obj.health)

        tip = '[🎲](#" class="showtip" title="' + tooltips + ')'     

        if (hits.includes("Fail") && obj.health < 1) {
            results += " --+|[#FF0000][c]" + tip + " " + obj.name + " is destroyed.[/c][/#]"
            token.set("status_dead",true)
            obj.killingblow = weaponObj;
log("Killing Blow Weapon")
log(weaponObj)            
        } else if (hits.includes("Fail") && obj.health > 0) {
            results += " --+|[#FF0000][c]" + tip + " " + obj.name  + " takes " + unitDamage + " damage.[/c][/#]"
            if (hits.includes("Save")) {
                let saves = 0;
                for (let i=0;i<hits.length;i++) {
                    if (hits[i] == "Save") {saves += 1};
                }
                results += " --+|[#FF0000][c](Making " + saves + " Saves)[/c][/#]";
            }
        } else {    
            results += " --+|[c]" + tip + " " + obj.name  + " makes all its saves.[/c]"
            blastMarkers += disrupt; //disrupt weapons still cause a blast marker if hit 
        }
        if (token.get("bar2_max") > 0 && obj.health > 0 && objNotes.includes("Holofield") == false) {
            if (shields > 0) {results += " --+|[c][i]" + shieldsDown + " Shields Down ; " + shields + " Shields Remain.[/i][/c]"}
            if (shields <= 0) {
                results += " --+|[c][i]Shields All Down.[/i][/c]"
                token.set({
                    aura2_color: "",
                })
            }
        }
        if (criticalTxt != "") {
            results += " --+|[#FF0000][c]" + criticalTxt + "[/#][/c]"
        }
        obj.hits = []
        masterObjectArray[id] = obj;

        return [results,blastMarkers,assCas];
    }

    const CheckStatus = (formation,blastMarkers,flag) => { //formation is a formation
        //updates status of formation
        let leaderID = formation.leaderID;
        let unitIDs = formation.unitIDs;
        let nation = state.Armageddon.nations[masterObjectArray[leaderID].player];
        let faction = masterObjectArray[leaderID].attributeArray.faction;        
        if (CheckUnits(unitIDs,"Stubborn")) {
            blastMarkers -= 1;
        }            
        let air = false;
        if (CheckUnits(unitIDs,"Aircraft") && formation.status.includes("Landed") == false) {
            air = true;
        }
        let formState;
        let summonedLost = false;
        let extraDead = 0;
        let leaderToken = findObjs({_type: "graphic", id: leaderID})[0];
        let leaderUnit = masterObjectArray[leaderID];
        let currentBM = Number(leaderToken.get("bar3_value"));
        currentBM += Number(blastMarkers);
        let dcTotal = Number(formation.dcTotal);
        if (nation == "Space Marines" && faction != "Titan Legions" && faction != "Imperial Navy") {
            dcTotal *=2
        }
        if (CheckUnits(unitIDs,"Stubborn")) {
            dcTotal += 1;
        }
        let status = formation.status;
        if (currentBM == 0) {formState = "normal"}
        if (status.includes("Broken") == false && currentBM > 0 && air == false) {
            if (currentBM < dcTotal) { 
                for (let i=0;i<unitIDs.length;i++) {
                    let id = unitIDs[i];
                    let tok = findObjs({_type: "graphic", id: id})[0];
                    if (!tok) {continue}
                    tok.set("tint_color","transparent");
                }
                leaderToken.set({
                    bar3_value: currentBM,
                    bar3_max: dcTotal,
                    tint_color: "#FF0000",
                })
                formState = "normal"
            } else { //formation now broken
                leaderToken.set({
                    bar3_value: 0,
                    bar3_max: dcTotal,
                    aura1_color: "#FFFF00",
                    aura1_radius: 0.25,
                })

                for (let i=0;i<unitIDs.length;i++) {
                    let id = unitIDs[i];
                    let tok = findObjs({_type: "graphic", id: id})[0];
                    tok.set("tint_color","#FFFF00");
                    if (!tok) {continue}
                    let temp = masterObjectArray[id];
                    if (temp.attributeArray.notes.includes("Summoning Cost")) {
                        masterObjectArray[id].health = 0;
                        tok.set("status_dead",true);
                        summonedLost = true;
                    } 
                }
                formState = "broken"
                formation.currentOrder = "None";
                let index = formation.status.indexOf("Green");
                if (index < 0) {index = formation.status.indexOf("Activated")}
                if (index < 0) {index = 0}
                formation.status[index] = "Broken";
            }
        } else if (status.includes("Broken") && air == false) {
            formState = "broken"
            //broken unit takes more BM, may lose more units based on blast markers
            let extraHits = Number(blastMarkers);
            let i = 0
            while (extraHits > 0 && i<unitIDs.length) {
                let id = unitIDs[i];
                let obj = masterObjectArray[id];
                if (obj.attributeArray.notes.includes("Fearless") || (obj.attributeArray.notes.includes("Faithful") && flag == true)) {
                    i++;
                    continue;
                };
                let dc = Number(obj.attributeArray.dc);
                if (nation == "Space Marines" && faction != "Imperial Navy" && faction != "Titan Legions" ) {
                    dc *=2
                }                
                if (dc > extraHits) {break};
                extraHits -= dc;
                masterObjectArray[id].health = 0;
                extraDead += 1;
                i++;
            }

            formation = CheckDead(formation);

            if (formation.dcTotal == 0) {
                formation.status = "Destroyed";
                formState = "destroyed";
            } else {
                leaderToken = findObjs({_type: "graphic", id: formation.leaderID})[0];
                leaderToken.set({
                    bar3_value: 0,
                    bar3_max: dcTotal,
                    aura1_color: "#FFFF00",
                    aura1_radius: 0.25,
                })
                for (let i=0;i<formation.unitIDs.length;i++) {
                    let tok = findObjs({_type: "graphic", id: unitIDs[i]})[0];
                    tok.set("tint_color","#FFFF00");
                }            
            }
        } else if (air == true) {
            leaderToken.set({
                bar3_value: currentBM,
            })
        }

        state.Armageddon.playerInfo[leaderUnit.player].formations[leaderUnit.formationNumber] = formation;
        return [formation,formState,extraDead,summonedLost];
    }

    const BarragePart1 = (msg) => {
        let Tag = msg.content.split(";");
        let action = Tag[1]; //used for Direct vs Indirect vs Orbital
        let shooterTokenID = Tag[2];
        let targetTokenID = Tag[3];
        let weaponObj;
        let barragePoints = 0;
        let extra = Tag[4]; //used for noting if OneShot or similar
        if (!extra || extra == null) {extra = " "};

        let shooterUnit = masterObjectArray[shooterTokenID];
        let targetUnit = masterObjectArray[targetTokenID];

        let player = shooterUnit.player;
        let opponent = (player == 0) ? 1:0;
        let indirect = (action == "Direct") ? false:true;
        let shooterNation = state.Armageddon.nations[player];
        let shooterFormation = state.Armageddon.playerInfo[player].formations[shooterUnit.formationNumber];

        let template = Template(shooterUnit.attributeArray.faction);
        template = template.replace("<<SUBJECTNAME>>",shooterFormation.name);
        template = template.replace("<<LEFTSUB>>","Pre-Barrage");
        template = template.replace("<<RIGHTSUB>>","");
        if (shooterFormation.name.length > 20) {
            template = template.replace("--#titleFontSize|1.4em","--#titleFontSize|1em");       
        }

        let formationLeaderID = shooterFormation.leaderID;
        let formationLeaderTok = findObjs({_type: "graphic", id: formationLeaderID})[0];
        let formationType = shooterUnit.attributeArray.type;

        let suppression = Number(formationLeaderTok.get("bar3_value"));

        if (shooterNation == "Space Marines" && shooterUnit.attributeArray.faction != "Titan Legions" && shooterUnit.attributeArray.faction != "Imperial Navy" ) { //know no fear rule
            suppression = Math.floor(suppression/2);
        }

        if (formationType.includes("Aircraft") && shooterFormation.status.includes("Landed") == false) {
            suppression = 0;
        }   

        shooterUnitIDs = shooterFormation.unitIDs;

        if (CheckUnits(shooterUnitIDs,"Stubborn") && suppression > 0) {suppression -= 1};

        if (shooterFormation.currentOrder.includes("Sustained") == false && action.includes("Indirect")) {
            template += " --+|[c]Can only Fire Indirect on Sustained Order.[/c] }}"
            sendChat("",template)
            return
        }

        if (shooterFormation.status.includes("Green")) {
            template += " --+|[c]Formation needs to be Activated first.[/c] }}"
            sendChat("",template)
            return
        }

        if (formationLeaderTok.get("status_purple") || formationLeaderTok.get("status_pink")) {
            template += " --+|[c]Slow Weapon has not reloaded/recharged yet.[/c] }}"
            sendChat("",template)
            return
        }

        let b=2;
        let targetIDArray = [];
        if (action == "Orbital") {
            b = 3;
        }
        let keys = Object.keys(masterObjectArray);

        keys.forEach(element => {
            if (masterObjectArray[element].name.includes("Target")) {return}
            let dist = ClosestDistance(element,targetTokenID);
            let check;
            if (masterObjectArray[element].attributeArray.type.includes("War")) {
                check = pointInPolygon(masterObjectArray[targetTokenID].location,masterObjectArray[element])
            }
            if (dist <= b || check == true) {
                targetIDArray.push(element);
            }             
        });

        if (targetIDArray.length == 0) {
            sendChat("","No Targets under Template.");
            return;
        }

    for (let i=0;i<targetIDArray.length;i++) {
        log(masterObjectArray[targetIDArray[i]].name)   
    }

        bothFormations = SortFormation(shooterUnitIDs,targetIDArray);
        shooterFormation = bothFormations.shooters;
        targetFormation = bothFormations.targets;

        shooterFormation = SuppressFormation(shooterFormation,suppression,action);
        shooterFormation = LOSFormation(shooterFormation,targetFormation,indirect)[0];

        if (shooterFormation.length === 0) {
            template += " --+|[c]All Units are Suppressed or have no LOS[/c] }}";
            sendChat("",template);
            return;
        }

        let finalShooters = [];

        let weaponNames = [];
        let wsound;

        for (let i=0;i<shooterFormation.length;i++) {
            let id = shooterFormation[i];
            let shooterTok = findObjs({_type: "graphic", id: id})[0];
            let slow = false;
            if (shooterTok.get("status_purple") == true || shooterTok.get("status_pink") == true) {slow = true;}
            let baseDistance = ClosestDistance(id,targetTokenID);
            let shooter = masterObjectArray[id];
            let weapons = shooter.blastWeapons;
            let wp = false;
            for (let w=0;w<weapons.length;w++) {
                let weapon = weapons[w];
                let wrange = weapon.range;
                if (action == "Indirect" && weapon.notes.includes("Indirect")) {wrange *= 2};
                if (action == "Indirect" && weapon.notes.includes("Indirect") == false) {continue};
                if (baseDistance > wrange) {continue};
                if (state.Armageddon.playerInfo[player].formations[shooter.formationNumber].currentOrder.includes("Sustained") || shooter.attributeArray.type.includes("Aircraft") || shooter.attributeArray.type.includes("War")) {
                    //can't rotate on a sustained order, planes and war engines don't rotate without player doing so
                    if (WeaponArc(id,targetTokenID,weapon.notes) == false) {continue};
                }
                if (action == "Indirect" && baseDistance < 12) {continue};  
                if (extra.includes("Slow") && (weapon.notes.includes("Slow") == false || slow == true)) {continue}
                if (extra.includes("Slow") == false && weapon.notes.includes("Slow")) {continue}
                if (extra.includes("One-Shot") && (weapon.notes.includes("One-Shot") == false || shooterTok.get("status_brown") == true)) {continue}
                if (extra.includes("One-Shot") == false && weapon.notes.includes("One-Shot")) {continue}
                weaponNames.push(weapon.name);
                let wfire = weapon.firepower;
                wfire = wfire.replace("BP","");
                barragePoints += Abacus(wfire) * weapon.number;
                wp = true;
                wsound = weapon.sound;
            }
            if (wp == true) {
                finalShooters.push(id);
            }

        }

        let wnotes = [];
        //only have following if ALL shooters have it
        //Indirect, Slow and One-Shot already selected out above
        if (WeaponsNotes(finalShooters,"Disrupt")) {wnotes.push("Disrupt")};
        if (WeaponsNotes(finalShooters,"Ignore Cover")) {wnotes.push("Ignore Cover")};
        if (WeaponsNotes(finalShooters,"Macro")) {wnotes.push("Macro Weapon")};
        if (WeaponsNotes(finalShooters,"Slow")) {wnotes.push("Slow")};
        wnotes = wnotes.toString();

        weaponNames = [...new Set(weaponNames)];
        weaponNames = weaponNames.toString();

        weaponObj = {
            name: weaponNames,
            notes: wnotes,
            command: action,
            source: "Barrage",
            sound: wsound,
            firepower: "BP"
        }               
        
        if (barragePoints < 1) {
            template += " --+|[c]No Barrage Weapons in Range/Arc/With Targets.[/c] }}";
            sendChat("",template);
            return;        
        }

        templates = 1
        if (barragePoints>3) {
            templates += 1
        }
        if (barragePoints>7) {
            templates += 1
        }

        template += " --+|[c]Barrage Points: " + barragePoints + "[/c]"
        template += " --+|[c]Templates: " + templates + "[/c]"
        template += " --+|[c]Click Button after placing Templates[/c]"
        template += " --+|[c]Templates Fired at in order selected.[/c]"

        if (templates === 1) {
            command = "!ResolveBarrage&#59;"+shooterTokenID+"&#59;"+action+"&#59;"+extra+"&#59;"+finalShooters+"&#59;&#64;&#123;target&#124;Target1&#124;token_id&#125;"
        }
        if (templates === 2) {
            command = "!ResolveBarrage&#59;"+shooterTokenID+"&#59;"+action+"&#59;"+extra+"&#59;"+finalShooters+"&#59;&#64;&#123;target&#124;Target1&#124;token_id&#125;&#59;&#64;&#123;target&#124;Target2&#124;token_id&#125;"
        }
        if (templates === 3) {
            command = "!ResolveBarrage&#59;"+shooterTokenID+"&#59;"+action+"&#59;"+extra+"&#59;"+finalShooters+"&#59;&#64;&#123;target&#124;Target1&#124;token_id&#125;&#59;&#64;&#123;target&#124;Target2&#124;token_id&#125;&#59;&#64;&#123;target&#124;Target3&#124;token_id&#125;"
        }

        phrase = "Click Once Targets Placed"

        button = BUTTON(phrase,command,shooterUnit.attributeArray.faction)
        template += button
        template += " }}"
        sendChat("",template)

        shooterInfo = {
            barragePoints: barragePoints,
            weaponInfo: weaponObj, // mainly for name,notes,fx and sound
        }
        //ResolveBarrage will be passed the ids of the Templates, and the weaponInfo and barrage Points
        //Range and LOS will have been checked already above
        state.Armageddon.shooterInfo = shooterInfo;
    }




    const ResolveBarrage = (msg) => {
        let Tag = msg.content.split(";");
    log(Tag)
        let shooterTokenID = Tag[1];
        let action = Tag[2];
        let extra = Tag[3];
        let finalShooters = Tag[4];
        finalShooters = finalShooters.split(",");
        let targets = [];

        for (let a=5;a<8;a++) {
            if (!Tag[a]) {break}
            let tokenID = Tag[a]
            targets.push(tokenID)
        }

        let shooterInfo = state.Armageddon.shooterInfo;
        let barragePoints = shooterInfo.barragePoints;
        let weaponInfo = shooterInfo.weaponInfo;

        let shooterUnit = masterObjectArray[shooterTokenID];
        let player = shooterUnit.player
        let shooterFormation = state.Armageddon.playerInfo[player].formations[shooterUnit.formationNumber];
        let formationName = shooterFormation.name;
        let template = Template(shooterUnit.attributeArray.faction);
        template = template.replace("<<SUBJECTNAME>>",formationName)
        template = template.replace("<<LEFTSUB>>","Barrage Results")
        template = template.replace("<<RIGHTSUB>>","")
        template += " --#bodyFontSize| 12px"
        if (formationName.length > 20) {
            template = template.replace("--#titleFontSize|1.4em","--#titleFontSize|1em")    
        }

        if (weaponInfo.notes.includes("One-Shot")) {
            for (let i=0;i<finalShooters.length;i++) {
                let idA = finalShooters[i];
                let tokA = findObjs({_type: "graphic", id: idA})[0];
                tokA.set("status_brown",true);
            }
        }
        if (weaponInfo.notes.includes("Slow")) {
            for (let i=0;i<finalShooters.length;i++) {
                let idA = finalShooters[i];
                let tokA = findObjs({_type: "graphic", id: idA})[0];
                tokA.set("status_purple",true);
            }
        }

        if (shooterFormation.currentOrder.includes("Sustained") == false && shooterFormation.status.includes("Air") == false) {
            RotateFormation(shooterFormation,targets[0]);
        }

        if (weaponInfo.sound) {
          sound = findObjs({type: "jukeboxtrack", title: weaponInfo.sound})[0]
          sound.set({playing: true,softstop:false})

          for (let t=0;t<targets.length;t++) {
            let targetTokenID = targets[t]
            let targetToken = findObjs({_type: "graphic", id: targetTokenID})[0];
            switch(weaponInfo.sound) {
              case "Mortar":
                effect = "glow-smoke"
                break;
              case "Howitzer":
                effect = "bomb-smoke"
                break;
              case "Havoc":
                effect = "glow-fire"
                break;
              case "Explosion":
                effect = "bomb-fire"
                break;
              case "Inferno":
                effect = "bomb-fire"
                break;
              default:
                effect = "glow-fire"
                break;  
            }
            for (let i=0;i<15;i++) {
              setTimeout(function() {
                dX = randomInteger(160)
                dY = randomInteger(160)
                x = targetToken.get("left") - 80 + dX;
                y = targetToken.get("top") - 80 + dY;
                spawnFx(x,y,effect);
              },200*i);
            } 
          } 
        }

        let unsortedTargetArray = [];
        let unsortedFormationArray = [];
        let weaponNotes,weaponName,weaponSound,a,b;
        if (action != "Deathwind") {
            weaponNotes = shooterInfo.weaponInfo.notes
            weaponName = shooterInfo.weaponInfo.name
            weaponSound = shooterInfo.weaponInfo.sound  
            a = 1.85,b = 2; 
        } else {
            barragePoints = 0;
            weaponNotes = "";
            weaponName = "Deathwind Launcher";
            weaponSound = "Havoc"
        }

        if (weaponNotes.includes("Orbital")) {
            a *= 1.6
            b *= 1.6
        }

        let ap=6,at=6,extraBM = 0;
        if (barragePoints === 2) {ap = 5};
        if (barragePoints >= 3) {ap = 4, at = 5};
        if (barragePoints > 5) {extraBM += 1};
        if (barragePoints > 9) {extraBM += 1};
        if (barragePoints > 12) {extraBM += 1};
        if (barragePoints > 15) {extraBM += 1}; 

        if (shooterFormation.currentOrder.includes("Sustained") || action == "Deathwind") {
            ap -= 1
            at -= 1
        }
        if (shooterFormation.currentOrder.includes("Double") || shooterFormation.currentOrder.includes("Marshal")) {
            ap += 1
            at += 1
        }

        //for each target, create array of units under template (in radius of target)
        for (let t=0;t<targets.length;t++) {
            let targetTokenID = targets[t];
            let targetUnit = masterObjectArray[targetTokenID];
            let keys = Object.keys(masterObjectArray);
            keys.forEach(element => {
                let obj = masterObjectArray[element];
                let check = false;
                let formationID = obj.player + "," + obj.formationNumber;             
                if (obj.name.includes("Target") || obj.name.includes("Drop Pod") || obj.health < 1)  {return}
                if (obj.terrain.platform == true) {return};
                if (obj.attributeArray.type.includes("War")) {
                    check = BLASTCHECK(targetTokenID,element,a);
                } else {
                    let dist = ClosestDistance(targetTokenID,element);
                    if (dist <=b) {check = true};
                }
                if (check == true) {
                    unsortedTargetArray.push(element);
                    unsortedFormationArray.push(formationID);
                }
            });
        }

        //remove duplicates 
        sortedTargetArray = [...new Set(unsortedTargetArray)]

        sortedFormationArray = [...new Set(unsortedFormationArray)]

        formationArray = sortedFormationArray.map(a =>{
            obj = {
                formationID: a, //a is formationID from above
                unitIDs: [],
            }
            return obj
        })

        //sort into formations
        for (let i=0;i<sortedTargetArray.length;i++) {
            let obj = masterObjectArray[sortedTargetArray[i]];
            for (let j=0;j<formationArray.length;j++) {
                let id = formationArray[j].formationID.split(",")
                let formPlayer = id[0]
                let formNumber = id[1]
                if (obj.player == formPlayer && obj.formationNumber == formNumber) {
                    formationArray[j].unitIDs.push(sortedTargetArray[i])
                    break
                }
            }
        }

        template += " --+|[c]" + weaponName + "[/c]"
        template += " --+|[c]Order: " + action + "Fire.[/c]"
        template += " --+|[c]Weapon Notes: " + weaponNotes + "[/c]"
        if (extraBM > 0){
            template += " --+|[c]" + extraBM + " Extra Blastmarkers[/c]"
        }
        template += InsertLine()

    log(formationArray)

        //roll to hit, with any mods, for each token in formation, base target is ap or at
        //calculate blast markers, which is 1 + any killed + extraBM
        //and if disrupt then 1 per hit
        //and ignore kills for things like expendable or certain tyranids

        for (let f=0;f<formationArray.length;f++) {
            let formID = formationArray[f].formationID.split(",");
            let formPlayer = formID[0];
            let formNumber = formID[1];
            let targetFormation = state.Armageddon.playerInfo[formPlayer].formations[formNumber];
            let targetIDs = formationArray[f].unitIDs;
            let targetFormationLdID = targetFormation.leaderID
            let targetFormationLdTok = findObjs({_type: "graphic", id: targetFormationLdID})[0]
            let originalBM = Number(targetFormationLdTok.get("bar3_value"))
            let newBM = extraBM;
            if (targetFormation.status.includes("Air")) {continue}
            template += " --+|[c]" + targetFormation.name + "[/c]" + InsertLine()
            let crossfireCheck = false;
            if (weaponNotes.includes("Orbital") == false && shooterFormation.status.includes("Air") == false) {
                crossfireCheck = Crossfire(player,shooterUnit.formationNumber,shooterFormation.unitIDs,targetFormation.unitIDs)
            }
   log(crossfireCheck)         
            weaponInfo.crossfire = crossfireCheck;
            if (crossfireCheck == true) {
                template += " --+|[c]Crossfire[/c]";
            }           
            let casualties = 0

            for (let u=0;u<targetIDs.length;u++) {
                let targetID = targetIDs[u];
                let targetUnit = masterObjectArray[targetID];
                let targetToken = findObjs({_type: "graphic", id: targetID})[0]
                let notes = targetUnit.attributeArray.notes;
                let type = targetUnit.attributeArray.type;

                let tokenCoverCheck = targetUnit.terrain.coverCheck;
                if (notes.includes("Shadowfields") && targetToken.get("bar2_value") > 0 && weaponNotes.includes("Ignore Cover") == false) {
                    tokenCoverCheck = true;
                }

                if (weaponNotes.includes("Macro")) {needed = Math.min(at,ap)} 
                if (type.includes("War") || type.includes("Armour")) {needed = at}
                if (type.includes("Infantry") || type.includes("Light")) {needed = ap}

                if (tokenCoverCheck == true && weaponNotes.includes("Ignore Cover") == false) {needed += 1};
                let hits = 1;
                if (type.includes("War")) {
                    //check if any of target icons are central to war engine
                    check = false;
                    for (let b=0;b<targets.length;b++) {
                        let targetTokenID = targets[b]
                        let point = masterObjectArray[targetTokenID].location
                        check = pointInPolygon(point,targetUnit)
                        if (check == true) {break}
                    }
                    if (check == true) {
                        hits = Math.round(targetUnit.attributeArray.dc)/2
                    }
                }

                for (let h=0;h<hits;h++) {
                    let hitResult;
                    let toHitRoll = ROLL();
                    let tooltip = "To Hit Roll: " + toHitRoll + " vs. " + needed + "+";
                    let tip = '[🎲](#" class="showtip" title="' + tooltip + ')';
                    if (toHitRoll < needed) {
                        template += " --+|[c]" + tip + " " + targetUnit.name + " was missed.[/c]"
                    } else {
                        masterObjectArray[targetID].hits = [weaponInfo];
                        hitResult = SavingThrow(targetID);
                        newBM += Number(hitResult[1]);
                        if (hitResult[0].includes("destroyed")) {casualties += 1};
                        template += " --+|[#0000FF][c]" + tip + " " + targetUnit.name + " was hit.[/c][/#]"
                        template += hitResult[0]; 
                    }
                } //end hits
            }; //end units in this formation

            if (targetFormation.status.includes("Current Target") == false) {
                newBM += 1 //initial for being fired on
                targetFormation.status.push("Current Target")
            }
            if (casualties > 0) {
                template += " --+|[c]" + casualties + " Units Destroyed.[/c]"
            }
            template += " --+|[c]" + newBM + " Blast Markers Added.[/c]"
            targetFormation = CheckDead(targetFormation)//removes dead and updates state        
            let formRes = CheckStatus(targetFormation,newBM);
            targetFormation = formRes[0];
            targetFormation = CheckDead(targetFormation)//removes dead and updates state in case extra casualties
            if (formRes[2] > 0) {
                template += " --+|[#FF0000][c]" + formRes[2] + " additional units killed while running away.[/c][/#]"
            }
            if (formRes[1] == "broken") {
                template += " --+|[#FF0000][c]Formation Broken[/c][/#]"
                if (formRes[3] == true) {
                    template += " --+[c]Any Summoned Units are lost to the Warp![/c]"
                }
            } else if (formRes[1] == "destroyed" || targetFormation.unitIDs.length == 0) {
                template += " --+|[#FF0000][c]Formation Destroyed![/c][/#]"
            }
            template += " --+|[br]"
            state.Armageddon.playerInfo[formPlayer].formations[formNumber] = targetFormation
        }; //end formation
        template += " }}"
        sendChat("",template)

    }

    const AssaultPart1 = (msg) => {
        //part 1 is from a token in assaulting unit, identifies attacker and sets up next part
        let Tag = msg.content.split(";");
    log(Tag)    
        let tokenID = Tag[1];//a unit from the attacking formation
        let unit = masterObjectArray[tokenID];
        if (!unit) {
            sendChat("",tokenID + " No Unit.")
            return
        }        
        let attacker = Number(unit.player);
        let defender = (attacker == 0) ? 1:0;
        assaultInfo = {
            attacker: attacker,
            defender: defender,
            attackerFormationNumber: unit.formationNumber,
            round: 1,
            attackerCasualties: 0,
            defenderCasualties: 0,
        }
        let formation = state.Armageddon.playerInfo[attacker].formations[unit.formationNumber];
        let template = Template(unit.attributeArray.faction);
        template = template.replace("<<SUBJECTNAME>>",formation.name);
        template = template.replace("<<LEFTSUB>>","Assault");
        template = template.replace("<<RIGHTSUB>>","");
        if (formation.name.length > 20) {
            template = template.replace("--#titleFontSize|1.4em","--#titleFontSize|1em")        
        };
        template += " --+|[c]Select one or more units on both sides of Assault, then click the Button.[/c]";
        let command = "!AssaultPart2";
        let phrase = "Click when selected.";
        let button = BUTTON(phrase,command,unit.attributeArray.faction);
        template += button;
        template += " }}";
        sendChat("",template);
        return;
    }

    const AssaultPart2 = (msg) => {
        let attacker = assaultInfo.attacker;
        let defender = assaultInfo.defender;
        let attackerNation = state.Armageddon.nations[attacker];
        let defenderNation = state.Armageddon.nations[defender];
        let aformNum = assaultInfo.attackerFormationNumber;
        let aform = state.Armageddon.playerInfo[attacker].formations[aformNum];
        let aunit = masterObjectArray[aform.leaderID];
        let round = Number(assaultInfo.round);
        let attackerCasualties = Number(assaultInfo.attackerCasualties);
        let defenderCasualties = Number(assaultInfo.defenderCasualties);
        let attackerFormationNumbers = [];
        let defenderFormationNumbers = [];
        //Get formation #s involved in Assault

        for (let i=0;i<msg.selected.length;i++) {
            let tokenID = msg.selected[i]._id;
            let unit = masterObjectArray[tokenID];
            let formNum = unit.formationNumber;
            let player = unit.player;
            if (player == attacker) {
                index = attackerFormationNumbers.indexOf(formNum);
                if (index == -1) {
                    attackerFormationNumbers.push(formNum);
                }
            }
            if (player == defender) {
                index = defenderFormationNumbers.indexOf(formNum);
                if (index == -1) {
                    defenderFormationNumbers.push(formNum);
                }
            }
        }

        let template = Template(aunit.attributeArray.faction);
        template = template.replace("<<SUBJECTNAME>>",aform.name);
        template = template.replace("<<LEFTSUB>>","Assault");
        template = template.replace("<<RIGHTSUB>>","");
        if (aform.name.length > 20) {
            template = template.replace("--#titleFontSize|1.4em","--#titleFontSize|1em")        
        };

        if (attackerFormationNumbers.length === 0 || defenderFormationNumbers.length === 0) {
            template += " --+|[c]Need both attackers and defenders.[/c] }}"
            sendChat("",template)
            return
        }

        let attackerBMs = 0;
        let defenderBMs = 0;
        let addA = 0,addD = 0;
        let attackerIDs = [];
        let defenderIDs = [];
        let defSM = false;
        let attSM = false;

        for (let i=0;i<defenderFormationNumbers.length;i++) {
            let form = state.Armageddon.playerInfo[defender].formations[defenderFormationNumbers[i]];
            let status = form.status;
            let ldrID = form.leaderID;
            let ldrTok = findObjs({_type: "graphic", id: ldrID})[0];
            let ldrUnit = masterObjectArray[ldrID];
            let faction = ldrUnit.attributeArray.faction
            if (status.includes("Broken")) {
                addD = Number(form.unitIDs.length);
            } else {
                addD = Number(ldrTok.get("bar3_value"));
            }
            if (defenderNation == "Space Marine" && addD > 0 && faction != "Titan Legions" && faction != "Imperial Navy") {
                addD = Math.floor(addD/2);
                defSM = true;
            }
            if (CheckUnits(form.unitIDs,"Stubborn") && addD > 0) {
                addD = Math.min(addD - 1, 1);
            }
            defenderBMs += addD;
            for (let j=0;j<form.unitIDs.length;j++) {
                defenderIDs.push(form.unitIDs[j]);
            }
        }

        for (let i=0;i<attackerFormationNumbers.length;i++) {
            let form = state.Armageddon.playerInfo[attacker].formations[attackerFormationNumbers[i]];
            let status = form.status;
            let ldrID = form.leaderID;
            let ldrTok = findObjs({_type: "graphic", id: ldrID})[0];
            let ldrUnit = masterObjectArray[ldrID];
            let faction = ldrUnit.attributeArray.faction
            if (status.includes("Broken")) {
                addA = Number(form.unitIDs.length);
            } else {
                addA = Number(ldrTok.get("bar3_value"));
            }
            if (attackerNation == "Space Marine" && addA > 0 && faction != "Titan Legions" && faction != "Imperial Navy") {
                addA = Math.floor(addA/2);
                attSM = true;
            }
            if (CheckUnits(form.unitIDs,"Stubborn") && addA > 0) {
                addA = Math.min(addA - 1, 1);
            }
            attackerBMs += addA;
            for (let j=0;j<form.unitIDs.length;j++) {
                for (let k=0;k<defenderIDs.length;k++) {
                    let dist = ClosestDistance(form.unitIDs[j],defenderIDs[k]);
                    if (dist <= 6) { //add only attackers 'directly engaged' 
                        attackerIDs.push(form.unitIDs[j]);
                        break
                    }
                }
            }
        }

        //clear cc flags
        ClearCCFlags(attackerIDs);
        ClearCCFlags(defenderIDs);

        AssaultETA(attackerIDs,defenderIDs);

        AssaultETA(defenderIDs,attackerIDs);

        let attackerSupport = SupportingIDArray(attacker,attackerFormationNumbers,defenderFormationNumbers);
        AssaultETA(attackerSupport,defenderIDs);
        let defenderSupport = SupportingIDArray(defender,defenderFormationNumbers,attackerFormationNumbers);
        AssaultETA(defenderSupport,attackerIDs);
        let supportingArrays = {
            attackers: attackerSupport,
            defenders: defenderSupport,
        };
        template += " --+|[c]Attacker Formations[/c]" + InsertLine();
        for (let i=0;i<attackerFormationNumbers.length;i++) {
            template += " --+|[c]" + state.Armageddon.playerInfo[attacker].formations[attackerFormationNumbers[i]].name + "[/c]"
            if (round == 1) {
                state.Armageddon.playerInfo[attacker].formations[attackerFormationNumbers[i]].blastmarkers = 0;
                state.Armageddon.playerInfo[attacker].formations[attackerFormationNumbers[i]].assaultCasualties = 0;
            }
        };
        template += " --+|[br]";
        template += " --+|[c]Defender Formations[/c]" + InsertLine();
        for (let i=0;i<defenderFormationNumbers.length;i++) {
            template += " --+|[c]" + state.Armageddon.playerInfo[defender].formations[defenderFormationNumbers[i]].name + "[/c]"
            if (round == 1) {
                state.Armageddon.playerInfo[defender].formations[defenderFormationNumbers[i]].blastmarkers = 0;
                state.Armageddon.playerInfo[defender].formations[defenderFormationNumbers[i]].assaultCasualties = 0;
            }            
        };
        template += " --+|[br]";
        command = "!AssaultPart3";
        phrase = "Click when ready.";
        button = BUTTON(phrase,command,aunit.attributeArray.faction);
        template += button;
        template += " }}";
        sendChat("",template);
        assaultInfo = {
            attacker: attacker,
            defender: defender,
            attackerFormationNumber: aformNum,
            attackerFormationNumbers: attackerFormationNumbers,
            defenderFormationNumbers: defenderFormationNumbers,
            round: round,
            attackerCasualties: attackerCasualties,
            defenderCasualties: defenderCasualties,
            attackerBMs: attackerBMs,
            defenderBMs: defenderBMs,
            supportingArrays: supportingArrays,
            attackerIDs: attackerIDs,
            defenderIDs: defenderIDs,
            attSM: attSM,
            defSM: defSM,
        }
    log(assaultInfo)
        return;
    }


    const ProcessAssault = (ids,type,support) => {
        //type is first strike, normal or macro 
        //support is true if supporting fire
        let results = "";
        let needed;

        if (!support) {support = false};

        let defaultCC = {
            name: "Assault Weapons",
            number: 1,
            range: "CC",
            notes: "",
        }
        let defaultFF = {
            name: "Small Arms",
            number: 1,
            range: "FF",
            notes: "",
        }

        for (let r=0;r<ids.length;r++) {
            let id1 = ids[r];
            let obj1 = masterObjectArray[id1];
            let name = obj1.name;
    log("ProcessAssault: " + type)        
    log(name)        
            let eta = [];
            let etaCC = [];
            let etaFF = [];
            let oetaCC = obj1.etaCC;
            let oetaFF = obj1.etaFF;
            let obj1CC = PLUS(obj1.attributeArray.closecombat);
            let obj1FF = PLUS(obj1.attributeArray.firefight);

            let modeWeapons = [];
            let fs = false;
            if (obj1.attributeArray.notes.includes("First Strike")) {
                fs = true
            }
            if (obj1.attributeArray.faction == "Imperial Fists" && obj1.attributeArray.type == "Infantry") {
                let ter = obj1.terrain.whatPolys;
                for (let t=0;t<ter.length;t++) {
                    let typ = ter[t].type;
                    if (typ.includes("Trench") || typ.includes("Bunker")) {
                        fs = true;
                        break;
                    }
                }
                if (obj1.terrain.platform == true) {fs = true};
            }

            if (oetaCC.length > 0) {
                for (let t=0;t<oetaCC.length;t++) {
                    let targ = masterObjectArray[oetaCC[t]];
                    if (targ.health < 1) {continue};
                    etaCC.push(oetaCC[t]);
                }
                masterObjectArray[id1].etaCC = etaCC;
            }

            if (oetaFF.length > 0) {
                for (let t=0;t<oetaFF.length;t++) {
                    let targ = masterObjectArray[oetaFF[t]];
                    if (targ.health < 1) {continue};
                    etaFF.push(oetaFF[t]);
                }
                masterObjectArray[id1].etaFF = etaFF;
            }

            if (obj1.attributeArray.type.includes("War") == false) {
                let mode = "FF";
                if (etaCC.length > 0 && support == false) {mode = "CC"};
        
                if (mode == "CC") {
                    needed = obj1CC;
                    eta = etaCC;
                    modeWeapons = obj1.ccWeapons;
                    if (modeWeapons.length == 0 && obj1CC < 7 && type != "Macro") {
                        modeWeapons.push(defaultCC);
                    }
                }

                if (mode == "FF") {
                    needed = obj1FF;
                    eta = etaFF;
                    modeWeapons = obj1.ffWeapons;
                    if (modeWeapons.length == 0 && obj1FF < 7 && type != "Macro") {
                        modeWeapons.push(defaultFF);
                    }
                }


                let newArray = [];
                if (type == "Macro") {
                    for (let w=0;w<modeWeapons.length;w++) {
                        if ((modeWeapons[w].notes.includes("Macro") || modeWeapons[w].notes.includes("Titan")) && modeWeapons[w].notes.includes("First Strike") == false) {
                            newArray.push(modeWeapons[w]);
                        }
                    }
                    modeWeapons = newArray;
                }

                newArray = [];
                if (type == "First Strike" && fs == false) {
                    for (let w=0;w<modeWeapons.length;w++) {
                        if (modeWeapons[w].notes.includes("First Strike")){
                            newArray.push(modeWeapons[w]);
                        }
                    }
                    modeWeapons = newArray;
                }

                newArray = [];
                if (type == "Normal" && support == false) {
                    for (let w=0;w<modeWeapons.length;w++) {
                        if (modeWeapons[w].notes.includes("First Strike") || modeWeapons[w].notes.includes("Macro") || modeWeapons[w].notes.includes("Titan")) {continue}
                        newArray.push(modeWeapons[w]);
                    }
                    modeWeapons = newArray;
                }

                if (modeWeapons.length == 0 || eta.length == 0) {continue}

                for (let w=0;w<modeWeapons.length;w++) {
                    results += AssaultRolls(id1,modeWeapons[w],eta,needed,type);
                }
            } else {
                //War Engines Assault
                //FS = only weapons with first strike unless is unit ability
                //Macro = only weapons with macro
                //Normal = base attacks based on DC as well as any extra in description
                //base attacks can be CC or FF
                let ffAttacks = 0;
                let weaponsFF = [];
                let ccAttacks = 0;
                let weaponsCC = [];

                if (type == "Normal") {
                    weaponsCC.push(defaultCC);
                    weaponsFF.push(defaultFF);
                }

                for (let w=0;w<obj1.ccWeapons.length;w++) {
                    let weapon = obj1.ccWeapons[w];  
                    if (type == "First Strike" && weapon.notes.includes("First"))  {
                        weaponsCC.push(weapon);
                    }
                    if (type == "Macro" && weapon.notes.includes("First") == false && (weapon.notes.includes("Macro") || weapon.notes.includes("Titan"))) {
                        weaponsCC.push(weapon);
                    }
                    if (type == "Normal") {
                        if (weapon.notes.includes("First") || weapon.notes.includes("Macro") || weapon.notes.includes("Titan")) {continue}
                        weaponsCC.push(weapon);
                    }               
                }

                for (let w=0;w<obj1.ffWeapons.length;w++) {
                    let weapon = obj1.ffWeapons[w];
                    if (type == "First Strike" && weapon.notes.includes("First"))  {
                        weaponsFF.push(weapon);
                    }
                    if (type == "Macro" && weapon.notes.includes("First") == false && (weapon.notes.includes("Macro") || weapon.notes.includes("Titan"))) {
                        weaponsFF.push(weapon)
                    }
                    if (type == "Normal") {
                        if (weapon.notes.includes("First") || weapon.notes.includes("Macro") || weapon.notes.includes("Titan")) {continue}
                        weaponsFF.push(weapon)
                    }               
                }


                if (type != "Macro" && type!= "First Strike") {
                    let attacks = Number(obj1.attributeArray.dc);

    log("Attacks: " + attacks)  
    log("ETA CC")
    for (let i=0;i<etaCC.length;i++) {
        log(masterObjectArray[etaCC[i]].name)
    }
    log("ETA FF")
    for (let i=0;i<etaFF.length;i++) {
        log(masterObjectArray[etaFF[i]].name)
    }                

                    if (etaCC.length == 0) {
                        ffAttacks = attacks;
                    } else if (etaFF.length == 0) {
                        ccAttacks = attacks;
                    } else {
                        if (etaCC.length > attacks && obj1CC < obj1FF) {
                            ccAttacks = attacks;
                        } else if (etaFF.length > attacks && obj1FF < obj1CC) {
                            ffAttacks = attacks;
                        } else {
                            y1 = 7 - obj1CC;
                            y2 = 7 - obj1FF;
                            x = (y1 * (6-y2))/(y2 * (6-y1));
                            ratio = x/(x+1);
                            ccAttacks = Math.round(ratio * attacks);
                            ffAttacks = attacks - ccAttacks;
                        }
                    }
                    if (weaponsCC.length > 0) {
                        weaponsCC[0].number = ccAttacks
                    }
                    if (weaponsFF.length > 0) {
                        weaponsFF[0].number = ffAttacks
                    }
                }

                log("Type: " + type)
                log("Weapons CC")
                log(weaponsCC)
                log("Weapons FF")
                log(weaponsFF)

                log("CC Attacks")
                log(ccAttacks)
                log("FF Attacks")
                log(ffAttacks)

                for (let i=0;i<weaponsCC.length;i++) {
                    results += AssaultRolls(id1,weaponsCC[i],etaCC,obj1CC,type);
                }                   

                for (let i=0;i<weaponsFF.length; i++) {
                    results += AssaultRolls(id1,weaponsFF[i],etaFF,obj1FF,type);
                }                   
            }

        } //end all units
        return results;
    }


    const AssaultRolls = (id1,weapon,weaponETA,needed,mode) => {
        let results = "";
        let name = masterObjectArray[id1].name;
        if (weapon.notes.includes("Arc")) {
            let newArray = [];
            for (let e=0;e<weaponETA.length;e++) {
                let check = WeaponArc(id1,weaponETA[e],weapon.notes);
                if (check == false) {continue}; //out of arc
                newArray.push(weaponETA[e])
            }
            weaponETA = newArray;
        }
        if (weaponETA.length == 0) {return results};
        let shots = Abacus(weapon.number);

        let wnotes = weapon.notes;
        if (wnotes.includes("Extra Attacks")) {
            let ex = wnotes.indexOf("Extra Attacks (")
            let exD = wnotes.charAt(ex + 15) + wnotes.charAt(ex+16)
            let extraA = Number(Abacus(exD))
            shots += extraA
        }           

        if (shots == 0) {return results};

        let weaponObj = {
            name: weapon.name,
            range: weapon.range,
            firepower: mode,
            notes: wnotes,
            command: "Assault",
            crossfire: false,
            source: "Assault",
        }

        let shotTips = "";
        let hits = 0;

        for (let v=0;v<shots;v++) {
            let toHitRoll = ROLL();
            if (shots > 1) {noun = "Attack " + (v+1) + ": " } else {noun = "Attack "}
            shotTips += noun + toHitRoll + " vs. " + needed + "+";
            if (toHitRoll === 1 || toHitRoll < needed) {
                shotTips += "[br]"
                continue
            }
            hits += 1;
            //hit, need to distribute it using eta and defenders
            let index = 0;
            let min = Infinity;
            for (let i=0;i<weaponETA.length;i++) {                  
                let compare = masterObjectArray[weaponETA[i]].hits.length;
                if (compare < min) {
                    min = compare;
                    index = i;
                }
            }
            shotTips += " vs. " + masterObjectArray[weaponETA[index]].name + "[br]"
            let temp = masterObjectArray[weaponETA[index]].hits;
            temp.push(weaponObj);
            masterObjectArray[weaponETA[index]].hits = temp;
        }
                             
        tip = '[🎲](#" class="showtip" title="' + shotTips + ')'
        if (hits == 0) {
            results += " --+|" + tip + " " + name + " misses with " + weapon.name;
        } else if (hits == 1) {
            results += " --+|[#0000FF]" + tip + " " + name + " hits with " + weapon.name + "[/#]";
        } else {
            results += " --+|[#0000FF]" + tip + " " + name + " gets " + hits + " hits with " + weapon.name + "[/#]";
        }

        return results;
    }

    const AssaultPart3 = () => {

        sound = findObjs({type: "jukeboxtrack", title: "Assault"})[0]
        if (sound) {sound.set({playing: true,softstop:false})}

        let attacker = assaultInfo.attacker;
        let defender = assaultInfo.defender;
        let attackerNation = state.Armageddon.nations[attacker];
        let defenderNation = state.Armageddon.nations[defender];
        let attackerFormationNumber = assaultInfo.attackerFormationNumber;
        let attackerFormation = state.Armageddon.playerInfo[attacker].formations[attackerFormationNumber]
        let attackerLeaderUnit = masterObjectArray[attackerFormation.leaderID];
        let attackerFormationNumbers = assaultInfo.attackerFormationNumbers;
        let defenderFormationNumbers = assaultInfo.defenderFormationNumbers;
        let round = assaultInfo.round;
        let attackerCasualties = Number(assaultInfo.attackerCasualties);
        if (isNaN(attackerCasualties)) {attackerCasualties = 0};
        let defenderCasualties = Number(assaultInfo.defenderCasualties);
        if (isNaN(defenderCasualties)) {defenderCasualties = 0};    
        let attackerBMs = Number(assaultInfo.attackerBMs);
        let defenderBMs = Number(assaultInfo.defenderBMs);
        let supportingAttackers = assaultInfo.supportingArrays.attackers;
        let supportingDefenders = assaultInfo.supportingArrays.defenders;
        let attackerIDs = assaultInfo.attackerIDs;
        let defenderIDs = assaultInfo.defenderIDs;
        let attSM = assaultInfo.attSM;
        let defSM = assaultInfo.defSM;
        let attDam = 0;
        let defDam = 0;
        let finalAttTip = "";
        let finalDefTip = "";
        let delta = 0;

        if (attackerNation == "Sisters of Battle" || defenderNation == "Sisters of Battle") {
            sound = findObjs({type: "jukeboxtrack", title: "Angels"})[0]
            if (sound) {sound.set({playing: true,softstop:false})}
        }

        ClearHits(attackerIDs);
        ClearHits(defenderIDs);

        let template = Template(attackerLeaderUnit.attributeArray.faction);
        template = template.replace("<<SUBJECTNAME>>","Assault Results");
        template = template.replace("<<LEFTSUB>>","Round: " + round);
        template = template.replace("<<RIGHTSUB>>","");
        template += " --#bodyFontSize| 12px";

        let fsA = ProcessAssault(attackerIDs,"First Strike",false);
        let fsB = ProcessAssault(defenderIDs,"First Strike",false);

        if (fsA != "" || fsB != "") {
            template += InsertLine();
            template += " --+|[c]First Strike Attacks[/c]";
            template += InsertLine();
            if (fsA != "") {template += fsA};
            if (fsB != "") {template += fsB};
            template += ApplySaves(attackerIDs,"Assault");
            template += ApplySaves(defenderIDs);
            //remove dead from First Strike
            attackerIDs = ReduceIDs(attackerIDs);
            defenderIDs = ReduceIDs(defenderIDs);    

            for (let a=0;a<attackerFormationNumbers.length;a++) {
                let form = state.Armageddon.playerInfo[attacker].formations[attackerFormationNumbers[a]];          
                CheckDead(form);
            }
            for (let d=0;d<defenderFormationNumbers.length;d++) {
                let form = state.Armageddon.playerInfo[defender].formations[defenderFormationNumbers[d]];
                CheckDead(form);
            }
            ClearHits(attackerIDs);
            ClearHits(defenderIDs);
            template += InsertLine();
        }

        if (attackerIDs.length > 0 && defenderIDs.length > 0) {
            let ms = false;
            template += "[br]" + InsertLine();
            template += " --+|[c]Normal Attacks[/c]";
            template += InsertLine();
            template += ProcessAssault(attackerIDs,"Normal",false);
            template += ProcessAssault(defenderIDs,"Normal",false);

            let normalSA = ApplySaves(attackerIDs,"Assault");
            let normalSB = ApplySaves(defenderIDs);

            let macroA = ProcessAssault(attackerIDs,"Macro",false);
            let macroB = ProcessAssault(defenderIDs,"Macro",false);
            let macroSA = "";
            let macroSB = "";

            if (macroA != "" || macroB != "") {
                ms = true;
                template += InsertLine();
                template += " --+|[c]Macro Attacks[/c]";
                template += InsertLine();        
                if (macroA != "") {template += macroA};
                if (macroB != "") {template += macroB};
                macroSA = ApplySaves(attackerIDs,"Assault");
                macroSB = ApplySaves(defenderIDs);
            }
            template += InsertLine()
            template += " --+|[c]Normal Saves[/c]"
            template += InsertLine();
            template += normalSA;
            template += normalSB;
            if (ms == true) {
                template += InsertLine();
                template += " --+|[c]Macro & TK Saves[/c]"
                template += InsertLine();
                template += macroSA;
                template += macroSB;
            }
            ClearHits(attackerIDs);
            ClearHits(defenderIDs);
            attackerIDs = ReduceIDs(attackerIDs);
            defenderIDs = ReduceIDs(defenderIDs);           
        }

        if (attackerIDs.length > 0 && defenderIDs.length > 0) {
            //Supporting Fire
            suppA = ProcessAssault(supportingAttackers,"Normal",true);
            suppB = ProcessAssault(supportingDefenders,"Normal",true);
            suppSA = ApplySaves(attackerIDs,"Assault");
            suppSB = ApplySaves(defenderIDs);
            suppA += ProcessAssault(supportingAttackers,"Macro",true);
            suppB += ProcessAssault(supportingDefenders,"Macro",true);
            suppSA += ApplySaves(attackerIDs,"Assault");
            suppSB += ApplySaves(defenderIDs);

            if (suppA != "" || suppB != "") {
                template += InsertLine();         
                template += " --+|[c]Supporting Fire[/c]";
                template += InsertLine();        
                if (suppA != "") {template += suppA};
                if (suppB != "") {template += suppB};
                template += InsertLine();                         
                template += " --+|[c]Saves[/c]"
                template += InsertLine();         
                template += suppSA
                template += suppSB
            }

            attackerIDs = ReduceIDs(attackerIDs);
            defenderIDs = ReduceIDs(defenderIDs);  
        }

        template += InsertLine();         
        template += " --+|[c]Final Results[/c]"
        template += InsertLine();
        let winner = "";
        if (attackerIDs.length == 0 && defenderIDs.length > 0) {
            template += " --+|[c]All Attackers in range killed.[/c]";
            template += " --+|[c]Defenders Win![/c]";
            winner = defender;
        } else if (defenderIDs.length == 0 && attackerIDs.length > 0) {
            template += " --+|[c]All Defenders killed.[/c]";
            template += " --+|[c]Attackers Win![/c]";
            winner = attacker;
        } else if (attackerIDs.length == 0 && defenderIDs.length == 0) {
            template += " --+[c]All Combatants in range were killed![/c]";
            winner = "None"
        } else {
            let attUnits = 0;
            let defUnits = 0;
            let attInspiring = 0;
            let defInspiring = 0;

            for (let i=0;i<attackerFormationNumbers.length;i++) {
                let form = state.Armageddon.playerInfo[attacker].formations[attackerFormationNumbers[i]];               
                if (CheckUnits(form.unitIDs,"Faithful")) {attInspiring += 1}
                let ac = Number(form.assaultCasualties);
                if (isNaN(ac)) {ac = 0};
                attackerCasualties += ac
            }
            for (let i=0;i<defenderFormationNumbers.length;i++) {
                let form = state.Armageddon.playerInfo[defender].formations[defenderFormationNumbers[i]];            
                let dc = Number(form.assaultCasualties);
                if (isNaN(dc)) {dc = 0};
                defenderCasualties += dc
            }

            let attFinalResult = 0;
            let defFinalResult = 0;
            let attRoll1 = ROLL();
            let attRoll2 = ROLL();
            let defRoll1 = ROLL();
            let defRoll2 = ROLL();
            let finalAttRoll = Math.max(attRoll1,attRoll2);
            let finalDefRoll = Math.max(defRoll1,defRoll2);

            attFinalResult += finalAttRoll;
            defFinalResult += finalDefRoll;

            finalAttTip += "Rolls: " + attRoll1 + "/" + attRoll2 + "[br]"
            finalDefTip += "Rolls: " + defRoll1 + "/" + defRoll2 + "[br]"

            finalAttTip += "Casualties Inflicted: " + defenderCasualties + "[br]";
            finalDefTip += "Casualties Inflicted: " + attackerCasualties + "[br]";

            attFinalResult += defenderCasualties;
            defFinalResult += attackerCasualties;

            for (let i=0;i<attackerIDs.length;i++) {
                obj = masterObjectArray[attackerIDs[i]]
                if (obj.attributeArray.notes.includes("Inspiring")) {attInspiring += 1}
                if (obj.health > 0) {
                    attUnits += obj.attributeArray.dc
                }
            }
            for (let i=0;i<defenderIDs.length;i++) {
                obj = masterObjectArray[defenderIDs[i]]
                if (obj.attributeArray.notes.includes("Inspiring")) {defInspiring += 1}        
                if (obj.health > 0) {
                    defUnits += obj.attributeArray.dc
                }        
            }

            if (attUnits > defUnits) {
                attFinalResult += 1;
                finalAttTip += "More Units: +1[br]";
                if (attUnits > (2*defUnits)) {
                    attFinalResult += 1;
                    finalAttTip += "2x More Units: +1[br]";
                }
            }
            if (defUnits > attUnits) {
                defFinalResult += 1;
                finalDefTip += "More Units: +1[br]";
                if (defUnits > (2*attUnits)) {
                    defFinalResult += 1;
                    finalDefTip += "2x More Units: +1[br]";
                }
            }
            //attSM and defSM used to track Space Marines where ATSKNF reduces BMs to zero - they dont gain the "No Blast Markers" also
            if (attackerBMs == 0 && attSM == false) {
                attFinalResult += 1;
                finalAttTip += "No Blast Markers: +1[br]";
            }
            if (defenderBMs == 0 && defSM == false) {
                defFinalResult += 1;
                finalDefTip += "No Blast Markers: +1[br]";
            }

            if (attackerBMs < defenderBMs) {
                attFinalResult += 1;
                finalAttTip += "Fewer Blast Markers: +1[br]";
            }
            if (defenderBMs < attackerBMs) {
                defFinalResult += 1;
                finalDefTip += "Fewer Blast Markers: +1[br]";
            }

            if (attInspiring > 0) {
                attFinalResult += attInspiring;
                finalAttTip += attInspiring + " Inspiring Characters[br]";
            }
            if (defInspiring > 0) {
                defFinalResult += defInspiring;
                finalDefTip += defInspiring + " Inspiring Characters[br]";
            }

            let fatip = '[🎲](#" class="showtip" title="' + finalAttTip + ')'
            let fdtip = '[🎲](#" class="showtip" title="' + finalDefTip + ')'

            template += " --+|[c]" + fatip + " Attacker Total: " + attFinalResult + "[/c]";
            template += " --+|[c]" + fdtip + " Defender Total: " + defFinalResult + "[/c]";

            delta = Math.abs(attFinalResult - defFinalResult);

            if (attFinalResult > defFinalResult) {
                template += " --+|[c]Attacker Wins![/c]"
                winner = attacker;
            } else if (defFinalResult > attFinalResult) {
                template += " --+|[c]Defender Wins![/c]"
                winner = defender;
            } else if (attFinalResult == defFinalResult) {
                template += " --+|[c]Tie.[/c]"
                //remove dead, prompt for Countercharges, loop back with units
                for (let a=0;a<attackerFormationNumbers.length;a++) {
                    let form = state.Armageddon.playerInfo[attacker].formations[attackerFormationNumbers[a]];          
                    CheckDead(form);
                }
                for (let d=0;d<defenderFormationNumbers.length;d++) {
                    let form = state.Armageddon.playerInfo[defender].formations[defenderFormationNumbers[d]];
                    CheckDead(form);
                }
                ClearHits(attackerIDs);
                ClearHits(defenderIDs);
                template += " --+|[c]Units on both sides can make Countercharge Moves.[/c]"
                assaultInfo.round = Number(round) + 1;
                assaultInfo.attackerCasualties = 0;
                assaultInfo.defenderCasualties = 0;
                template += " --+|[c]Select one or more units on both sides of Assault, then click the Button.[/c]";
                let command = "!AssaultPart2";
                let phrase = "Click when selected.";
                let button = BUTTON(phrase,command,attackerLeaderUnit.attributeArray.faction);
                template += button;
                template += " }}";
                sendChat("",template);
                return;
            }
        } 
        let flag = false;
        if (winner == attacker) {
            flag = true;
            winningFormationNumbers = attackerFormationNumbers;
            winningIDs = attackerIDs;
            losingFormationNumbers = defenderFormationNumbers;
            losingIDs = defenderIDs;
            losingSupporters = supportingDefenders;
        } else if (winner == defender) {
            winningFormationNumbers = defenderFormationNumbers;
            winningIDs = defenderIDs;
            losingFormationNumbers = attackerFormationNumbers;
            losingIDs = attackerIDs;
            losingSupporters = supportingAttackers;
        } 

        //clean up the formations, update statuses, add blast markers etc.
        if (winner != "None") {
            template += FinalAssault(winner,winningFormationNumbers,winningIDs,losingFormationNumbers,losingIDs,losingSupporters,delta,flag);
        } else {
            FinalDeadAssault(attacker,attackerFormationNumbers,defenderFormationNumbers) 
        }

        template += " }}";
        sendChat("",template);
        return
    };

    const ReduceIDs = (ids) => {
        newIDs = []
        for (let i=0;i<ids.length;i++) {
            let obj = masterObjectArray[ids[i]];
            if (obj.health > 0) {
                newIDs.push(ids[i]);
            }
        }
        return newIDs;
    }

    const WeaponsCheck = (msg) => {
        let Tag = msg.content.split(";");
        let start = Date.now();
    log(Tag)
        RemoveLines();

        let token1ID = Tag[1];
        let token2ID = Tag[2];

        let obj1 = masterObjectArray[token1ID];
        let obj2 = masterObjectArray[token2ID];
        let player = obj1.player;
        let form1 = state.Armageddon.playerInfo[player].formations[obj1.formationNumber];
        let opponent,form2;

        if (obj2.attributeArray.type != "System") {
            opponent = obj2.player;
            form2 = state.Armageddon.playerInfo[opponent].formations[obj2.formationNumber];            
        } else {
            opponent = (player == 0) ? 1:0;
            form2 = {
                name: "Target Icon",
                leaderID: token2ID,
                unitIDs: [token2ID],
            }
        };

        let template = Template(obj1.attributeArray.faction);

        template = template.replace("<<SUBJECTNAME>>",form1.name)
        template = template.replace("<<LEFTSUB>>","Weapons Check")
        template = template.replace("<<RIGHTSUB>>","")
        template += " --#bodyFontSize| 12px"
        if (form1.name.length > 20) {
            template = template.replace("--#titleFontSize|1.4em","--#titleFontSize|1em")    
        }

        let marks = [];

        for (let i=0;i<form1.unitIDs.length;i++) {
            let id1 = form1.unitIDs[i];
            if (masterObjectArray[id1].health < 1 ) {continue}
            marks = marks.concat(WeaponLOS(id1,form2))
        }

        if (marks.length == 0) {
            template += " --+|[c]No Targets in Range/LOS/Arc of Ranged Weapons.[/c]"
            state.Armageddon.LOSToggle = "OFF"
        } else {
            //remove duplicates 
            let sortedMarks = [...new Set(marks)];            
            for (let i=0;i<sortedMarks.length;i++) {
                template += sortedMarks[i];
            }
            template += " --+|[c]Click Button when done to remove Lines.[/c]";
            let command = "!RemoveLOSLines";
            let phrase = "Remove LOS Lines";
            let button = BUTTON(phrase,command,obj1.attributeArray.faction);
            template += button;
        }

        template += " }}";
        sendChat("",template);
        let elapsed = Date.now()-start;
        log(`Weapons Check done in ${elapsed/1000} seconds.`);        
        return
    }

    const WeaponLOS = (id1,form2) => {      
        let returnArray = [];
        let obj1 = masterObjectArray[id1];
        let weapons = [];
        let weap,weap2;
        let displayWeapons = [];
        let colours = ["#00FF00","#FF0000","#00FFFF","#FFFF00","#2ACAEA","#DA7031","#6666AA","#FF8DA1","#251C8B"]
        let kk = 0;

        for (let w=0;w<obj1.rangedWeapons.length;w++) {
            if (kk > 8) {kk=0};
            weap = clone(obj1.rangedWeapons[w]);
            weap2 = clone(obj1.rangedWeapons[w]);
            if (weap.notes.includes("Indirect")) {
                weap.name += " (Direct)";
                weap.notes = weap.notes.replace("Indirect","");
                weap.colour = colours[kk];                
                weapons.push(weap);
                kk += 1;
                weap2.colour = colours[kk];
                weap2.name += " (Indirect)";
                weap2.range *= 2;
                weapons.push(weap2);
                kk += 1;
            } else {
                weap.colour = colours[kk];
                weapons.push(weap);
                kk += 1;
            }
        }

        for (let w=0;w<obj1.blastWeapons.length;w++) {    
            if (kk > 8) {kk=0};
            weap = clone(obj1.blastWeapons[w]);
            weap2 = clone(obj1.blastWeapons[w]);
            if (weap.notes.includes("Indirect")) {
                weap.name += " (Direct)";
                weap.notes = weap.notes.replace("Indirect","");
                weap.colour = colours[kk];                               
                weapons.push(weap);
                kk += 1;
                weap2.colour = colours[kk];
                weap2.name += " (Indirect)";
                weap2.range *= 2;           
                weapons.push(weap2);
                kk += 1;
            } else {
                weap.colour = colours[kk];
                weapons.push(weap);
                kk += 1;
            }
        }

        let lineIDArray = state.Armageddon.LOSLines;
        if (!lineIDArray) {lineIDArray = []};
        let unitIDs2 = form2.unitIDs;
        for (let i=0;i<unitIDs2.length;i++) {
            let id2 = unitIDs2[i];
            let obj2 = masterObjectArray[id2]; 
            if (obj2.terrain.platform == true) {continue};       
            let type2 = obj2.attributeArray.type;
            if (obj2.health < 1 && type2 != "System") {continue};
            if (OffboardUnit(id2) == true) {continue};
            let LOSCheck = LOS(id1,id2);        

            for (w=0;w<weapons.length;w++) {
                if (LOSCheck[1] > weapons[w].range) {continue};
                if (weapons[w].notes.includes("Indirect") && LOSCheck[1] < 12) {continue}
                if (LOSCheck[0] == false && weapons[w].notes.includes("Indirect") == false) {continue};
                if ((type2.includes("Vehicle") || type2.includes("War")) && (weapons[w].firepower.includes("AT") == false && weapons[w].firepower.includes("MW") == false) && weapons[w].firepower.includes("BP") == false) {continue}
                if ((type2.includes("Infantry") || type2.includes("Light")) && (weapons[w].firepower.includes("AP") == false && weapons[w].firepower.includes("MW") == false) && weapons[w].firepower.includes("BP") == false) {continue}
                if (type2.includes("Aircraft") && weapons[w].firepower.includes("AA") == false) {continue}
                if (WeaponArc(id1,id2,weapons[w].notes) == false) {continue};

                //if (weapons[w].notes.includes("Indirect") && LOSCheck == false && weapons[w].notes.includes("Guided") == false) {continue}
                //if (weapons[w].notes.includes("Guided") && marker == false && LOSCheck == false) {continue}
                let lineID = DrawLine(id1,id2,weapons[w].colour,w);
                lineIDArray.push(lineID);
                displayWeapons.push(weapons[w]);
            }
        }

        state.Armageddon.LOSLines = lineIDArray;

        for (let i=0;i<displayWeapons.length;i++) {
            field = " --+|[c][" + displayWeapons[i].colour + "]█[/#] ➤ " + displayWeapons[i].name + " : " + displayWeapons[i].firepower + "[/c]";
            returnArray.push(field);
        }   
   
        return returnArray;        
    }

    const DrawLine = (id1,id2,colour,offset) => {
        offset *= 10;
        if (offset === 1 || offset === 3 || offset === 5) {
            offset = (-offset);
        } 

        let x1 = masterObjectArray[id1].location.x + offset;
        let x2 = masterObjectArray[id2].location.x + offset;
        let y1 = masterObjectArray[id1].location.y + offset;
        let y2 = masterObjectArray[id2].location.y + offset;

        let width = (x1 - x2);
        let height = (y1 - y2);
        let left = width/2;
        let top = height/2;

        let path = [["M",x1,y1],["L",x2,y2]];
        path = path.toString();
        //path = JSON.stringify(path)

        let newLine = createObj("path", {   
            _pageid: Campaign().get("playerpageid"),
            _path: path,
            layer: "objects",
            fill: colour ,
            stroke: colour ,
            stroke_width: 5,
            left: left,
            top: top,
            width: width,
            height: height,
        });

        let id = newLine.id;
        return id;
    }
        
    const clone = (obj) => {
        if (null == obj || "object" != typeof obj) return obj;
        var copy = obj.constructor();
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
        }
        return copy;
    }

    const RemoveLines = () => {
        let lineIDArray = state.Armageddon.LOSLines;
        if (!lineIDArray) {
            state.Armageddon.LOSLine = [];
            return;
        }
        for (let i=0;i<lineIDArray.length;i++) {
            let id = lineIDArray[i];
            let path = findObjs({_type: "path", id: id})[0];
            if (path) {
                path.remove();
            }
        }
        state.Armageddon.LOSLines = [];  
    }

    const CoverCheck = (id1) => {
        let armourArray = state.Armageddon.armourArray;      
        if (!armourArray) {return false};
        for (let i=0;i<armourArray.length;i++) {
          let id2 = armourArray[i];
          let obj2 = masterObjectArray[id2];
          if (!obj2 || obj.health < 1) {continue};
          let dist = ClosestDistance(id1,id2);
          if (dist < 2) {return true};
        }
    }

    const changeGraphic = (tok,prev) => {
        if (tok.get('subtype') === 'token') {
            if ((tok.get("left") !== prev.left) || (tok.get("top") !== prev.top)) {
                if (!state.Armageddon.playerInfo || state.Armageddon.playerInfo == [] || state.Armageddon.playerInfo == null){return};               
                let obj = masterObjectArray[tok.id];
                if (!obj) {return};
                let gmnotes = unescape(tok.get("gmnotes")).split(";");
                if (!gmnotes) {return};
log(obj.name + " moved.")                
                let location = new pt(Math.round(tok.get('left')),Math.round(tok.get('top')));
                let rotation = tok.get("rotation");
                obj.location = location;
                obj.terrain = TokensTerrain(tok);
                if (obj.attributeArray.type == "Infantry" && obj.terrain.coverCheck == false) {
                    obj.terrain.coverCheck = CoverCheck(tok.id);
                }
                obj.rotation = rotation;
                if (obj.attributeArray.type.includes("War")) {
                    obj.vertices = tokenVertices(tok);
                }
                masterObjectArray[tok.id] = obj;
                RemoveLines();
            }
        }
    }

    const handleInput = (msg) => {
        if (msg.type !== "api") {
            return;
        }
        let args = msg.content.split(";");
        switch(args[0]) {
            case '!State':
                DisplayState();
                break;
            case '!Formation':
                FormationCreation(msg);
                break;
            case '!Strategy':
                Strategy(msg);
                break;
            case '!Activate':
                Activate(msg);
                break;
            case '!TokenInfo':
                TokenInfo(msg);
                break;
            case '!FormationInfo':
                FormationInfo(msg);
                break;
            case '!AAToggle':
                AAToggle(msg);
                break;
            case '!Teleport':
                Teleport(msg);
                break;
            case '!Infestation':
                Infestation(msg);
                break;
            case '!Planetfall':
                Planetfall(msg);
                break;
            case '!SummonUnits':
                SummonUnits(msg);
                break;
            case '!DifficultTerrain':
                DifficultTerrain(msg);
                break;
            case '!AddUnits':
                AddUnits(msg);
                break;
            case '!Regroup':
                Regroup(msg);
                break;
            case '!LOSCheck':
                LOSCheck(msg);
                break;
            case '!RangedFire':
                RangedFire(msg);
                break;
            case '!Barrage':
                BarragePart1(msg);
                break;
            case '!ResolveBarrage':
                ResolveBarrage(msg);
                break;
            case '!Assault':
                AssaultPart1(msg);
                break;
            case '!AssaultPart2':
                AssaultPart2(msg);
                break;
            case '!AssaultPart3':
                AssaultPart3(msg);
                break;    
            case '!WeaponsCheck':
                WeaponsCheck(msg);
                break;
            case '!RemoveLOSLines':
                RemoveLines();
                break;    
            case '!RemoveDead':
                RemoveDead();
                break;
            case '!AddAbilities':
                Abilities(msg);
                break;
            case '!DisplayFormations':
                DisplayFormations();
                break;    
            case '!AdjustFormation':
                AdjustFormation(msg);
                break;    
            case '!RemainingActivations':
                RemainingActivations();
                break;
            case '!RemoveLastActivation':
                RemoveLastActivation();
                break;    
            case '!KillToken':
                KillToken(msg);
                break;    
            case '!PlayerReport':
                PlayerReport(msg);
                break;
            case '!CheckDead':
                CheckDeadA(msg);
                break;
            case '!LeaveOrbit':
                LeaveOrbit(msg);
                break;    
            case '!WeaponArcDisplay':
                WeaponArcDisplay(msg);
                break; 
            case '!RemoveArc':
                RemoveArc();
                state.Armageddon.tokenID = [];
                break;
            case '!RallyCheck':
                RallyCheck();
                break;
            case '!Dump':
                Dump();
                break;
            case '!NewMultiGame':
                NewMultiGame(msg);
                break;
            case '!RollDump':
                RollDump();
                break;
        }
    };

    const registerEventHandlers = () => {
        on('chat:message', handleInput);
        on('change:graphic',changeGraphic);
    };

    on('ready', () => {
        log("==> Epic Armageddon Version: " + version + " <==")
        TerrainPolygons();
        log(terrain.length + " Terrain Loaded.")
        MOA();
        sendChat("","Script Loaded")
        registerEventHandlers();
    });

    return {
        // Public interface here
    };
})();