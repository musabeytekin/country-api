const setCountry = (data) => {
    for (let country of data) {
        const content = `
        <div class="col-lg-3 col-md-6">
            <div class="card h-100">
                <img src="${country.flags.png}" alt="" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${country.name.common}</h5>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                        ${country.population}
                    </li>
                </ul>
            </div>
        </div>
        `;
        document.querySelector(".container .row").insertAdjacentHTML("beforeend", content);

    }
}

const displayCountry = (country) => {
    const request = new XMLHttpRequest();

    request.open('GET', 'https://restcountries.com/v3.1/name/' + country);

    request.send();

    request.addEventListener("load", function () {
        const data = JSON.parse(this.responseText);
        setCountry(data);

        const neighboingCountries = data[0].borders.toString();
        console.log(neighboingCountries);
        const req = new XMLHttpRequest();
        req.open("GET", 'https://restcountries.com/v3.1/alpha?codes=' + neighboingCountries);
        req.send();

        req.addEventListener("load", function() {
            const data = JSON.parse(this.responseText);
            setCountry(data);
        })
    });
}

displayCountry("tur");



