// Nevek betöltése induláskor
window.onload = function () {
    nevekBetoltese();
};

function hozzaadNev() {
    const nev = document.getElementById("nev").value.trim();
    if (nev === "") return;

    let nevek = JSON.parse(localStorage.getItem("nevek")) || [];
    nevek.push(nev);
    localStorage.setItem("nevek", JSON.stringify(nevek));
    document.getElementById("nev").value = "";
    nevekBetoltese();
}

function osszesTorles() {
    localStorage.removeItem("nevek");
    nevekBetoltese();
}

function nevekBetoltese() {
    const listaElem = document.getElementById("nevLista");
    listaElem.innerHTML = "";

    const nevek = JSON.parse(localStorage.getItem("nevek")) || [];

    if (nevek.length === 0) {
        document.getElementById("kiiras").textContent = "Nincs elmentett név.";
        return;
    }

    document.getElementById("kiiras").textContent = "Elmentett nevek:";
    nevek.forEach((nev, index) => {
        const li = document.createElement("li");
        li.textContent = nev;
        listaElem.appendChild(li);
    });
}
