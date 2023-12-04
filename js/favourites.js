export class Favourites {
  constructor(root) {
    this.root = document.querySelector(root);
  }
}

export class FavouritesView extends Favourites {
  constructor(root) {
    super(root);

    this.update();
  }
  update() {
    this.removeAllTr();

    const entries = [
      {
        login: "brunolyma",
        name: "Bruno Lima",
        public_repos: "24",
        followers: "21",
      },
      {
        login: "maykbrito",
        name: "Mayk Brito",
        public_repos: "76",
        followers: "120000",
      },
    ];

    entries.forEach((user) => {
      console.log(user);
    });
  }

  createRow() {
    const tr = document.createElement("tr");

    tr.innerHTML = `
    <td class="user">
        <img src="https://github.com/maykbrito.png" alt="Mayke Brito profile picture">
        <a href="https://github.com/maykbrito">
            <p>Mayk Brito</p>
            <span>maykbrito</span>
        </a>
    </td>
    <td class="repositories">78</td>
    <td class="followers">9589</td>
    <td>
        <button class="remove">&times;</button>
    </td>
`;

    return tr;
  }

  removeAllTr() {
    const tbody = this.root.querySelector("table tbody");

    tbody.querySelectorAll("tr").forEach((tr) => {
      tr.remove();
    });
  }
}
