const links = { Steam: "a", Discord: "a", Reddit: "a", "Itch.io": "a", Gamejolt: "a" }

window.addEventListener('load', () => {
    const n = document.getElementById("navbar");
    Object.entries(links).forEach((e) => {
        const el = document.createElement('span');
        el.innerHTML = `<a href="${e[1]}" target="_blank" rel="noopener noreferrer">${e[0]}</a>`;
        n.appendChild(el);
    })
    document.querySelectorAll(".pending.roadmapitem").forEach(e => {
        const el = document.createElement('span');
        el.className = "progress";
        el.style.width = e.getAttribute("pct");
        e.appendChild(el);
    })
});

function cdn(url, elType, fn) {
    fetch(url).then(res =>
        res.json().then(data =>
            data.forEach(e =>
                fetch(e.download_url).then(r =>
                    r.text().then(t => {
                        fn(document.createElement(elType), t)
                    })))))
}

cdn(
    "https://api.github.com/repos/JamFactoryInc/kronitesite/contents/news",
    "span",
    (element, text) => {
        element.innerHTML = text;
        document.querySelector("#news .readable").appendChild(element);
    }
)

cdn(
    "https://api.github.com/repos/JamFactoryInc/kronitesite/contents/styles",
    "style",
    (element, text) => {
        element.innerHTML = text;
        document.querySelector("#news .readable").appendChild(element);
    }
)