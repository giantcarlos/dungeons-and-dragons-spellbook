window.addEventListener('DOMContentLoaded', () => {
    getSpells()
    document.getElementById("home").addEventListener('click', getSpells) 
    document.getElementById("classes").addEventListener('change', selectClass)
})

const ul = document.getElementById('spells-list')
const info = document.getElementById('info')

function getSpells() {
    ul.innerHTML = ''
    info.innerHTML = ''
    fetch('https://www.dnd5eapi.co/api/spells')
    .then(res => res.json())
    .then(data => {
        console.log(data)
        data.results.forEach(spell => {
            ul.innerHTML += `
            <li><a href="#" data-url="${spell.url}">${spell.name}</a></li>
            `
       })
       attachLinks()
     })
}

function selectClass(event) {
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
    ul.innerHTML = ''
    fetch('https://www.dnd5eapi.co' + `${event.target.dataset.url}`)
    .then(res => res.json())
    .then(data => {
        console.log(data)

        const cantripFilter = () => {
            data.level === 0 ? "Cantrip" : `${data.level}`;
        }

        const ritualFilter = () => {
            data.ritual === true ? "(Ritual)" : "";
        }

        const materialFilter = () => {
            data.material === undefined ? "" : `(${data.material})`;
        }

        const consentrationFilter = () => {
            data.concentration === true ? "(Concentration)" : "";
        }

        const classesResult = data.classes.map(classes => classes.name);

        info.innerHTML = `
        <h2>${data.name}</h2><br>
        <p>Level: ${cantripFilter()}</p>
        <p>School: ${data.school.name}</p>
        <p>Casting Time: ${data.casting_time} ${ritualFilter()}</p>
        <p>Range: ${data.range}</p>
        <p>Components: ${data.components.join(", ")} ${materialFilter()}</p>
        <p>Duration: ${data.duration} ${consentrationFilter()}</p>
        <p>Classes: ${classesResult.join(", ")}</p>
        <p>${data.desc.join(", ")}</p>
        <p>${data.higher_level.join(", ")}
        `
    })
}