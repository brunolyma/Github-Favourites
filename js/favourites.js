import { GithubUser } from "./GithubUser.js";

export class Favourites {
  constructor(root) {
    this.root = document.querySelector(root);
    this.load();

    GithubUser.search("brunolyma").then((user) => console.log(user));
  }

  load() {
    this.entries =
      JSON.parse(localStorage.getItem("@github-favourites:")) || [];
  }

  save() {
    localStorage.setItem("@github-favourites:", JSON.stringify(this.entries));
  }

  async add(username) {
    try {
      const userExist = this.entries.find((entry) => entry.login === username);

      if (userExist) {
        throw new Error("Usuário já cadastrado!");
      }

      const user = await GithubUser.search(username);

      if (user.login == undefined) {
        throw new Error("Usuário não encontrado!");
      }

      this.entries = [user, ...this.entries];
      this.update();
      this.save();
    } catch (error) {
      alert(error.message);
    }
  }

  delete(user) {
    const filteredEntries = this.entries.filter(
      (entry) => entry.login !== user.login
    );

    this.entries = filteredEntries;
    this.update();
    this.save();
  }
}

export class FavouritesView extends Favourites {
  constructor(root) {
    super(root);

    this.tbody = this.root.querySelector("table tbody");

    this.update();
    this.onAdd();
  }

  onAdd() {
    const addButton = this.root.querySelector(".search button");
    addButton.onclick = () => {
      const { value } = this.root.querySelector(".search input");

      this.add(value);
    };
  }

  update() {
    this.removeAllTr();

    this.entries.forEach((user) => {
      const row = this.createRow();

      row.querySelector(
        ".user img"
      ).src = `https://github.com/${user.login}.png`;
      row.querySelector(".user img").alt = `${user.name} photo profile`;
      row.querySelector(".user p").textContent = `${user.name}`;
      row.querySelector(".user span").textContent = `${user.login}`;
      row.querySelector(".repositories").textContent = `${user.public_repos}`;
      row.querySelector(".followers").textContent = `${user.followers}`;

      row.querySelector(".remove").onclick = () => {
        const isOk = confirm("Tem certeza que deseja deletar essa linha?");
        if (isOk) {
          this.delete(user);
        }
      };

      this.tbody.append(row);
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
