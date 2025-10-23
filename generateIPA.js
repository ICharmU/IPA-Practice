// TODO Later
// Allow the user to upload JSON files to customize the IPA

const generatePlosive = () => {
    const plosiveRow = document.createElement("div");
    plosiveRow.classList.add("plosive");
}

const generatePlace = (place, unvoicedSymbol="", voicedSymbol="", unvoicedClasses=[], voicedClasses=[]) => {
    const pair = document.createElement("div");
    pair.classList.add(place);

    let unvoiced = generateVoicing("unvoiced", unvoicedSymbol);
    unvoiced = addClasses(unvoiced, unvoicedClasses);
    let voiced = generateVoicing("voiced", voicedSymbol);
    voiced = addClasses(voiced, voicedClasses);

    pair.appendChild(unvoiced);
    pair.appendChild(voiced);
    pair.style.display = "grid";
    pair.style.gridTemplateColumns = "repeat(2, 1fr)";
    pair.style.color = "green";

    return pair
}

const addClasses = (voice, voiceClasses) => {
    try {
        for (let c of voiceClasses) {
            voice.classList.add(c);
        }
    } finally {
        return voice;
    }
}

const generateVoicing = (voicing, symbol) => {
    if (!["unvoiced", "voiced"].includes(voicing)) {
        throw new ReferenceError(`${voicing} is not "voiced" or "unvoiced"`);
    }
    // voicing should be "unvoiced" or "voiced"
    const voice = document.createElement("p"); //paragraph element
    voice.classList.add(voicing);
    voice.innerHTML = symbol;
    voice.style.display = "grid";
    return voice;
}

// generatePlace("bilabial", "p", "b", ["impossible", "c1"], ["impossible", "c2"]);
// generatePlace("bilabial", "g", "h", ["unused"], []);

const places = [
    "Bilabial", "Labiodental", "Dental", "Alveolar",
    "PostAlveolar", "Retroflex","Palatal",
    "Velar", "Uvular", "Pharyngeal", "Glottal"
];

const plosiveSymbols = [
    ["p", "b"],
    "none", 
    ["t", "d"],
    ["t", "d"],
    ["t", "d"],
    ["ʈ", "ɖ"],
    ["c", "ɟ"],
    ["k", "g"],
    ["q", "ɢ"],
    "none",
    "none"
];

console.log(222);
console.log(plosiveSymbols.length, places.length);

const addManner = (manner, mannerObject) => {

    const mannerContainer = document.createElement("div");
    mannerContainer.classList.add(manner);
    mannerContainer.style.display = "grid";
    mannerContainer.style.gridTemplateColumns = `repeat(${places.length+1}, 1fr)`;

    const mannerEl = document.createElement("p");
    mannerEl.innerHTML = manner;
    mannerContainer.append(mannerEl);

    for (let i = 0; i<places.length; i++) {
        let currPlace = places[i];
        currPlace = currPlace.toLowerCase().replaceAll(" ", "-");;

        const unvoiced = mannerObject[currPlace]["unvoiced"];
        const voiced = mannerObject[currPlace]["voiced"];
        const unvoicedSymbol = unvoiced["symbol"];
        const unvoicedTags = unvoiced["tags"];
        const voicedSymbol = voiced["symbol"];
        const voicedTags = voiced["tags"];
     
        let pair = generatePlace(currPlace, unvoicedSymbol, voicedSymbol, unvoicedTags, voicedTags);
        mannerContainer.appendChild(pair);
        console.log([unvoicedSymbol, voicedSymbol]);
    }
    return mannerContainer;
}

const manners = [
    "Plosive", "Nasal", "Trill", "Tap-or-Flap",
    "Fricative", "Lateral Fricative",
    "Approximant", "Lateral Approximant",
];

const plosiveData = await fetch("/manners-data/plosive.json")
    .then(async response => {
      try {
       const data = await response.json()
       return data;
     } catch(error) {
       console.log(error)
     }
});

for (let manner of manners) {
    manner = manner.toLowerCase().replace(" ", "-");
    const mannerData = await fetch(`/manners-data/${manner}.json`)
        .then(async response => {
        try {
        const data = await response.json()
        return data;
        } catch(error) {
        console.error(error)
        }
    });
    const mannerContainer = addManner(manner, mannerData);
    document.body.appendChild(mannerContainer);
}
console.log(plosiveData);


