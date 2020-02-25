const form = document.getElementById("form-user");
const loading = document.querySelector(".loading");
const API_URL = "http://127.0.0.1:3000/api/users";
const usersElement = document.querySelector(".allUsers");
loading.style.display = "none";
listAllUsers();

form.addEventListener("submit", event => {
  const formData = new FormData(form);
  const name = formData.get("name");
  const surname = formData.get("surname");

  const user = {
    name,
    surname
  };

  console.log("user", user);

  form.style.display = "none";
  loading.style.display = "";

  fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "content-type": "application/json"
    }
  })
    .then(response => response.json())
    .then(createdUser => {
      form.style.display = "";
      loading.style.display = "none";
      form.reset();
      listAllUsers();
      console.log(createdUser);
    });

  event.preventDefault();
});

function listAllUsers() {
  fetch(API_URL, {
    method: "GET"
  })
    .then(response => response.json())
    .then(users => {
      usersElement.textContent = "";
      users.reverse();

      users.forEach(user => {
        const div = document.createElement("div");
        const header = document.createElement("h4");
        const surname = document.createElement("p");
        const created = document.createElement("small");

        header.textContent = user.name.toString();
        surname.textContent = user.surname.toString();
        created.textContent = new Date(user.created);

        div.appendChild(header);
        div.appendChild(surname);
        div.appendChild(created);

        usersElement.appendChild(div);
      });
    });
}
