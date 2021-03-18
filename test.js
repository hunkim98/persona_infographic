let array = [];

array[2] = 3;

temporary_object = {};
temporary_object["id"]++;
array[3] = temporary_object;

console.log(array);

for (i = 0; i < array.length; i++) {
  const array_content = document.createElement("div");
  array_content.innerHTML = array[i];
  document.querySelector(".blank").appendChild(array_content);
}

console.log(array[3].id);
console.log(array[4]);
console.log(array[4] === undefined);

if (array[4] === undefined) {
  temporary_object = { A: 3, CPL: 0, W: 0 };
  array[4] = temporary_object;
}

console.log(array[4].A);
array[4].A++;
console.log(array[4].A);
