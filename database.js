const database = new Request("http://localhost:3000/gatherData");
let user_data;

fetch(database)
  .then((response) => response.json())
  .then((data) => (user_data = data))
  .then(() => {
    for (i = 0; i < user_data.length; i++) {
      const data_name = document.createElement("div");
      data_name.innerHTML = user_data[i].name;
      const data_personality = document.createElement("div");
      data_personality.innerHTML = user_data[i].personality;
      document.body.appendChild(data_name);
      document.body.appendChild(data_personality);
    }
  });
