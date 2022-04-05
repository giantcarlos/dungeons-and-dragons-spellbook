window.addEventListener('DOMContentLoaded', () => {
    getSpells()
})

function getSpells() {
    const ul = document.getElementById('spells')
    fetch('https://www.dnd5eapi.co/api/spells')
    .then(res => res.json())
    .then(data => {
       console.log(data)
     })
}