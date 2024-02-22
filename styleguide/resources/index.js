console.log('index.js');

const getJSON = (filename) => {
    return fetch(filename)
        .then( (response) => { return response.json() } )
        .then( (json) => {  return json } ); 
}

function renderUI() {
    const params = new URL(document.location).searchParams;
    const debug = params.get("debug");
    
    function append(tag, target) {
        const element = document.createElement(tag);
        
        target.appendChild(element);
        return element;
    }

    getJSON('./resources/data.json')
    .then( (data) => {

        // debug method 
        function renderJSON(id, array) {
            const target = document.getElementById(id);

            append("h2", target).innerHTML = id; 
            
  
            for( item of array ) {
                const table = append("table", target);
                const tbody = append("tbody", table);
  
                for( prop of Object.keys(item) ) {
                    const row = append("tr", tbody);
                    const td1 = append("td", row);
                    const td2 = append("td", row);
                    
                    td1.className = "attribute";
                    td2.className = "value";

                    td1.innerHTML = prop;
                    td2.innerHTML = item[prop] 
                }
            }
        }

        function randomQuote() {
            const quotes = data["quotes"];
            const quote = quotes[Math.floor(Math.random() * quotes.length)];

            return( quote.quote + ' -- ' + quote.source);
        }


        function renderElements() {
            const elements = data["elements"];
            const target = document.getElementById("elements");
     
            for (const e of elements) {
                const elemDiv = append("div", target);
                elemDiv.className = "element";

                const element = append(e["element"], elemDiv);
                element.innerHTML = `${e["element"]} : ${e["name"]}`;

                const styles = window.getComputedStyle(element);
                const props = ['font-family', 'font-weight', 'font-size', 
                                'color', 'background-color'];

                const styleDiv = append("div", target);
                styleDiv.className = "element-style";
                append("h3",styleDiv).innerHTML = "Styles";


                for(let i = 0; i < props.length; i++) {
                    let value = styles.getPropertyValue(props[i]);
                    const p = append("p", styleDiv);
                    if ( typeof value === 'object') 
                        value = value.join(", ");
                    p.innerHTML = `${props[i]}: ${value}`;
                }

                styles.innerHTML = element.style;
            }
        }

        function renderColors() {
            const colors = data["colors"].sort( (a,b) => a.hex > b.hex ? 1 : a.hex === b.hex ? 0 : -1);
            const target = document.getElementById("colors");
            
            for ( const color of colors ) {
                const container = append("div", target);
                container.className = "color-container";

                const chip = append("div", container);
                chip.className = "color-chip";
                chip.style.backgroundColor = color.hex;

                const atts = append("div", container);
                atts.className = "color-attributes";

                const table = append("table", atts);
                const tbody = append("tbody", table);

                for ( const att in color ) {
                    const row = append("tr", tbody);
                    const td1 = append("td", row);
                    const td2 = append("td", row);

                    td1.className = "attribute";
                    td2.className = "value";

                    td1.innerHTML = att;
                    if ( typeof color[att] === 'object')   // i.e. an array strings
                        td2.innerHTML = color[att].join('<br>');
                    else
                        td2.innerHTML = color[att];
                }
            } 
        }

        function renderFonts() {
            const fonts = data["font-families"];
            const target = document.getElementById("fonts");

            for ( const font of fonts ) {
                const container = append("div", target);
                const fontDiv = append("div", container);
                const textDiv = append("div", container);

                container.className = "font-container";
                fontDiv.className = "font";
                textDiv.className = "font-text";

                let p1 = append("p", fontDiv);
                p1.style.fontFamily = font["name"];
                p1.style.fontSize = "18pt";
                p1.style.color = "#8080FF"
                p1.innerHTML = font["name"];
                
                p1 = append("p", fontDiv);
                p1.style.fontSize = "12pt";
                p1.style.fontFamily = "Courier New";
                p1.style.padding = "0px 2ch";
                p1.style.color = "#7FFF00";
                const info = `Type: ${font["type"]}<br><br>Applications: ${font["applications"].join(", ")}`;
                p1.innerHTML = info;



                const atts = [["normal","normal","none"],["bold","normal","none"],
                              ["normal","italic","none"],["normal","normal","underline"]];

                for (const att of atts ) {
                    const  p1 = append("p", fontDiv);
                    const info = `${font["name"]} ${att[0]} ${att[1]} ${att[2]}`
                    p1.innerHTML = info.replace("none","").replace("normal","");
                    p1.style.fontFamily = font["name"];
                    p1.style.fontWeight = att[0];
                    p1.style.fontStyle = att[1];
                    p1.style.textDecoration = att[2];
                    p1.style.margin = "1ch 2ch";

                    const p2 = append("p", textDiv);
                    p2.innerHTML = randomQuote();
                    p2.style.fontFamily = font["name"];
                    p2.style.fontWeight = att[0];
                    p2.style.fontStyle = att[1];
                    p2.style.textDecoration = att[2];
                }
            }
        }

        function main() {
            if ( !debug ) {
                renderElements()
                renderColors();
                renderFonts();
            } else 
                for (x of Object.keys(data)) renderJSON(x, data[x]);
        }

        main(); 
    })
    .catch( (error) => console.log('renderUI Promiser error: ', error));

}