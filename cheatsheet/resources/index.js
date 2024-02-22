const attributes = 
{ 
    headings: ['Attribute','Description'],
    data:
    [   {name: 'src', text: 'Path to the image to display. Required'}, 
        {name: 'alt', text: 'The text that is displayed if the image cannot load.\
                            This text is needed for accessibilty and is read by \
                            screen readers', required: false},
        {name: 'class', text: 'CSS style to apply to the image'},
        {name: 'height', text: 'The intrinsic height of the image, in pixels. Must \
                                be an integer without a unit.'},
        {name: 'width', text: 'The intrinsic width of the image, in pixels. Must \
                                be an integer without a unit.'}
    ]
};


const formats = 
{    
    headings: ['Format','Description'],
    data: 
    [
        {name: 'JPEG', text: '(Joint Photographic Expert Group). Good for Lossy compression,\
                            smaller size, static images .'},
        {name: 'GIF', text: '(Graphic Interchange Format). Good for animations and simple images.'},
        {name: 'PNG', text: '(Portable Network Graphics. Lossless compression. Slightly \
                            better compression than JPEG'},
        {name: 'SVG', text: '(Scalable Vector Graphics. Good for images that must be \
                            accuratley drawn at differnt sizes'}
    ]
};

/* 
    Renders a two-column table into a a target element with the specified id 
    using the given data array of objects each containing a :name and :text
    property. 
*/

function renderTable(id, title, data) {
    const target = document.getElementById(id);
    
    const h2 = document.createElement("h2");
    
    // Set a title ...
    h2.innerHTML = title;
    target.appendChild(h2);
    
    // Create the table and body objecrs
    const table = document.createElement("table");
    const tbody = document.createElement("tbody");

    // Create row heading per spec ...
    const rh1 = document.createElement("th");
    const rh2 = document.createElement("th");
    const toprow = document.createElement("tr")
    
    rh1.className = "attribute"
    rh2.className = "attribute-text"
    rh1.innerHTML = data.headings[0];
    rh2.innerHTML = data.headings[1];

    toprow.appendChild(rh1);    
    toprow.appendChild(rh2);

    tbody.appendChild(toprow);

    data.data.sort((a,b) => a.name < b.name ? -1 : a.name === b.name ? 0 : 1 );
    
    for ( x of data.data ) {
        const row = document.createElement("tr"); 
        const td1 = document.createElement("td");
        const td2 = document.createElement("td");        

        td1.className = "attribute";
        td2.className = "attribute-text";

        td1.innerHTML = x.name;
        td2.innerHTML = x.text;

        row.appendChild(td1);
        row.appendChild(td2);
        tbody.appendChild(row);
    }
    table.appendChild(tbody);
    target.appendChild(table);
}

function renderTables() {
    renderTable('attributes','Commonly Used Attributes', attributes);
    renderTable('formats', 'Popular Image Formats', formats); 
}