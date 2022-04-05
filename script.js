window.addEventListener('DOMContentLoaded', () => {
    getSpells()
})

function getSpells() {
    const ul = document.getElementById('spells')
    fetch('https://www.dnd5eapi.co/api/spells')
    .then(res => res.json())
    .then(data => {
        console.log(data);
        console.log(Object.entries(data));
        dataArray = Object.entries(data);
        secondArray = dataArray["1"];
        spellArray = secondArray["1"];
        spellArray.forEach(spell => {
            ul.innerHTML += `<li>${spell.name}</li>`
       })
     })
}