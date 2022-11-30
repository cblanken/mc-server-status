class StatusCard {
    constructor(host, port, is_online, map, online_players, max_players, software) {
        this.host = host;
        this.port = port; 
        this.is_online = is_online;
        this.map = map;
        this.online_players = online_players;
        this.max_players = max_players;
        this.software = software;
        this.card = this.get_card_element();
    }

    add_row_to_card(card, name, value) {
        // Row name
        let names = card.querySelector(".data-names");
        let row_name = document.createElement("div");
        row_name.classList.add("card-item");
        row_name.textContent = name;
        names.append(row_name);

        // Row value
        let values = card.querySelector(".data-values");
        let row_value = document.createElement("div");
        row_value.classList.add("card-item");
        row_value.textContent = value;
        values.append(row_value);
    }

    get_card_element() {
        let status_card = document.createElement("section")
        status_card.classList.add("status-card")

        let data_names = document.createElement("div")
        data_names.classList.add("data-names")
        status_card.append(data_names);

        let data_values = document.createElement("div")
        data_values.classList.add("data-values")
        status_card.append(data_values);

        this.add_row_to_card(status_card, "Host", this.host.toString());
        this.add_row_to_card(status_card, "Port", this.port.toString());
        this.add_row_to_card(status_card, "Online", this.is_online.toString());
        this.add_row_to_card(status_card, "Software", this.software.toString().slice(0, 15));
        this.add_row_to_card(status_card, "Players", `${this.online_players} / ${this.max_players}`);
        return status_card;
    }

    add_plus_button() {
        let btn = document.createElement("div");
        btn.classList.add("add-btn")
        btn.addEventListener(e => {

        })
        this.card.append(btn);
    }

    add_delete_button() {
        let btn = document.createElement("div");
        btn.classList.add("del-btn")
        btn.addEventListener("click", e => {
            // let card = e.parentNode;
            // card.parentNode.removeChild(card);
            this.card.parentNode.removeChild(this.card);
        })
        this.card.append(btn);
    }
}

let host_input = document.querySelector("main .input input[name='ip']");
let submit_btn = document.querySelector("main .input button[type='submit']");
let add_btn = document.querySelector("main .input button[type='submit']");
let cards_element = document.querySelector("main .cards");

let = current_data = {};
submit_btn.addEventListener("click", e => {
    e.preventDefault();
    let host = host_input.value;
    // fetch("https://api.mcsrvstat.us/2/69.153.0.41").then(res => res.json()).then(json => console.log(json))
    // let url = `https://api.mcsrvstat.us/2/${host}`
    let url = `http://localhost:8010/proxy/2/${host}`
    fetch(url, {
        headers: {
            'Accept': 'application/json',
        }
    })
    .then(res => res.json())
    .then(json => {
        current_data = json;
        let card = new StatusCard(
            json?.ip,
            json?.port,
            json?.online,
            json?.map,
            json?.players?.online,
            json?.players?.max,
            json?.software,
        )
        let card_element = card.card;
        card.add_delete_button();
        cards_element.append(card_element);
    })
    .catch(err => {
        console.log(`Error: ${err}`);
    })
});
