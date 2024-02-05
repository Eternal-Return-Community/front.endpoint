const docs = {
  version: document.getElementById("game-version"),
  content: document.querySelector("table"),
}

async function getJson() {
  const response = await fetch("./endpoints.json");
  const data = await response.json();
  return data;
}

function newOrder(id) {
  return {
    0: "protocol",
    1: "method",
    2: "base",
    3: "endpoint",
    4: "isPublic",
    5: "description"
  }[id]
}

window.onload = async () => {
  const response = await getJson();

  for (let i = 0; i < response.length; i++) {
    const row = docs.content.insertRow();
    const keys = Object.keys(response[i]);
    for (let j = 0; j < keys.length; j++) {
      const cell = row.insertCell();
      const sort = response.sort((a, b) => b.isPublic - a.isPublic);
      cell.innerText = sort[i][newOrder(j)];
    }
  }
}