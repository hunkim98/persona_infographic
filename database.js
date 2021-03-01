const database = new Request("https://personapersonality.com/gatherData");
// https://personapersonality.com/gatherData
let user_data;

fetch(database)
  .then((response) => response.json())
  .then((data) => (user_data = data))
  .then(() => {
    for (i = 0; i < user_data.length; i++) {
      const data_list = document.createElement("div");
      data_list.className = "data_list";
      const data_name = document.createElement("div");
      data_name.innerHTML = user_data[i].name;
      const data_personality = document.createElement("div");
      data_personality.innerHTML = user_data[i].personality;
      const data_timestamp = document.createElement("div");
      data_timestamp.innerHTML = user_data[i].timestamp;
      data_list.appendChild(data_name);
      data_list.appendChild(data_personality);
      data_list.appendChild(data_timestamp);
      document.body.appendChild(data_list);
    }
    document.querySelector(".total_users .amount").innerHTML = user_data.length;
  });
