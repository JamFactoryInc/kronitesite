const dce = Document.prototype.createElement;
const links = { Steam: "a", Discord: "a", Reddit: "a", "Itch.io": "a", Gamejolt: "a" }

window.addEventListener('load', () => {
    const n = document.getElementById("navbar");
    Object.entries(links).forEach((e) => {
        const el = dce('span');
        el.innerHTML = `<a href="${e[1]}" target="_blank" rel="noopener noreferrer">${e[0]}</a>`;
        n.appendChild(el);
    })
    document.querySelectorAll(".pending.roadmapitem").forEach(e => {
        const el = dce('span');
        el.className = "progress";
        el.style.width = e.getAttribute("pct");
        e.appendChild(el);
    })
});

function cdn(url, target, el) {
    fetch(url).then(res =>
        res.json().then(data =>
            data.forEach(e =>
                fetch(e.download_url).then(t => {
                    el.innerHTML = t;
                    document.querySelector(target).appendChild(el);
                }))))
}

cdn(
    "https://api.github.com/repos/JamFactoryInc/krontesite/contents/news",
    "#news .readable",
    dce('span')
)