window.addEventListener('DOMContentLoaded', () => {
    getSpells()
    document.getElementById("home").addEventListener('click', getSpells)
})

function getSpells() {
    const ul = document.getElementById('spells-list')
    const info = document.getElementById('info')
    ul.innerHTML = ''
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

        let cantripFilter = () => {
            if (data.level === 0) {
                result = "Cantrip"
            } else {
                result = `${data.level}`
            }
            return result;
        }

        let ritualFilter = () => {
            if (data.ritual === true) {
                result = "(ritual)"
            } else {
                result = ""
            }
            return result;
        }

        let materialFilter = () => {
            if (data.material === undefined) {
                result = ""
            } else {
                result = `(${data.material})`
            }
            return result;
        }

        let consentrationFilter = () => {
            if (data.concentration === true) {
                result = "Concentration, "
            } else {
                result = ""
            }
            return result;
        }

        let classesResult = data.classes.map(classes => classes.name);

        info.innerHTML = `
        <h2>${data.name}</h2><br>
        <p>Level: ${cantripFilter()}</p>
        <p>School: ${data.school.name}</p>
        <p>Casting Time: ${data.casting_time} ${ritualFilter()}</p>
        <p>Range: ${data.range}</p>
        <p>Components: ${data.components.join(", ")} ${materialFilter()}</p>
        <p>Duration: ${consentrationFilter()}${data.duration}</p>
        <p>Classes: ${classesResult.join(", ")}</p>
        <p>${data.desc.join(", ")}</p>
        <p>${data.higher_level.join(", ")}
        `
    })
}