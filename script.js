window.addEventListener('DOMContentLoaded', () => {
    getSpells()
    document.getElementById("home").addEventListener('click', getSpells) 
    document.getElementById("classes").addEventListener('change', selectClass)
})

const ul = document.getElementById('spells-list')
const info = document.getElementById('info')

const getSpells = () => {
    ul.innerHTML = ''
    info.innerHTML = ''
    document.getElementById('classes').selectedIndex = 0;
    fetch('https://www.dnd5eapi.co/api/spells')
    .then(res => res.json())
    .then(data => {
        console.log(data)
        data.results.forEach(spell => {
            ul.innerHTML += `
            <li><a href="#" data-url="${spell.url}">${spell.name}</a></li>
            `
       })
       attachClickListener()
     })
}

const selectClass = (event) => {
    ul.innerHTML = ''
    info.innerHTML = ''
    fetch('https://www.dnd5eapi.co/api/classes/'+`${event.target.value}`+'/spells')
    .then(res => res.json())
    .then(data => {
        console.log(data)
        data.results.forEach(spell => {
            ul.innerHTML += `
            <li><a href="#" data-url="${spell.url}">${spell.name}</a></li>
            `
       })
       attachClickListener()
     })
}

const attachClickListener = () => {
    const spells = document.querySelectorAll('a')
    spells.forEach((spell) => {
        spell.addEventListener('click', displaySpell)
    })
}

const displaySpell = (event) => {
    console.log(event.target.dataset.url)
    ul.innerHTML = ''
    fetch('https://www.dnd5eapi.co' + `${event.target.dataset.url}`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        info.innerHTML = `
        <h2>${data.name}</h2><br>
        <p>Level: ${(data.level === 0) ? "Cantrip" : `${data.level}`}</p>
        <p>School: ${data.school.name}</p>
        <p>Casting Time: ${data.casting_time} ${(data.ritual === true) ? "(Ritual)" : ""}</p>
        <p>Range: ${data.range}</p>
        <p>Components: ${data.components.join(", ")} ${(data.material === undefined) ? "" : `(${data.material})`}</p>
        <p>Duration: ${data.duration} ${(data.concentration === true) ? "(Concentration)" : ""}</p>
        <p>Classes: ${(data.classes.map(classes => classes.name)).join(", ")}</p>
        <p>${data.desc.join(", ")}</p>
        <p>${data.higher_level.join(", ")}
        `
    })
}