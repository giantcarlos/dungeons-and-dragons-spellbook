window.addEventListener('DOMContentLoaded', () => {
    getSpells()
    document.getElementById("home").addEventListener('click', getSpells)
})

function getSpells() {
    const ul = document.getElementById('spells-list')
    const info = document.getElementById('info')
    info.innerHTML = ''
    fetch('https://www.dnd5eapi.co/api/spells')
    .then(res => res.json())
    .then(data => {
        dataArray = Object.entries(data);
        secondArray = dataArray["1"];
        spellArray = secondArray["1"];
        spellArray.forEach(spell => {
            ul.innerHTML += `
            <li><a href="#" data-url="${spell.url}">${spell.name}</a></li>
            `
       })
       attachLinks()
     })
}

const attachLinks = () => {
    const spells = document.querySelectorAll('a')
    spells.forEach((spell) => {
        spell.addEventListener('click', displaySpell)
    })
}

const displaySpell = (event) => {
    console.log(event.target.dataset.url)
    const info = document.getElementById('info')
    const ul = document.getElementById('spells-list')
    ul.innerHTML = ''
    fetch('https://www.dnd5eapi.co' + `${event.target.dataset.url}`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        info.innerHTML = `
        <h2>${data.name}</h2><br>
        <p>Level: ${data.level}</p>
        <p>School: ${data.school.index}</p>
        <p>Casting Time: ${data.casting_time}</p>
        <p>Range: ${data.range}</p>
        <p>Component: ${data.components.join(", ")} (${data.material})</p>
        <p>Duration: ${data.duration}</p>
        <p>Classes: ${data.classes}</p>
        <p>${data.desc.join(", ")}</p>
        <p>${data.higher_level.join(", ")}
        `
    })
}
