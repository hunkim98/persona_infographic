const database = new Request("https://personapersonality.com/gatherData");
// https://personapersonality.com/gatherData
let user_data;
let user_choice;

fetch(database, { method: "POST" })
  .then((response) => response.json())
  .then((data) => {
    user_data = data;
  })
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
      document.querySelector(".total_data").appendChild(data_list);
    }
    gatherAnswer();
    document.querySelector(".total_users .amount").innerHTML = user_data.length;
  });

function gatherAnswer() {
  console.log("Gather Answer currently working");
  let hornevian_question = [];
  let harmonic_question = [];
  let dummies = [];
  for (i = 0; i < user_data.length; i++) {
    //this brings all the user data including name personality and timestamp

    for (j = 0; j < user_data[i].choice.length; j++) {
      //we will now analyze the total choices
      //user_data[i].choice[j].length has to do with the number of questions the user solved
      //this number can change inthe future
      //each user_data[i].choice[j] looks like {"key":-5,"choice":"P"}
      if (user_data[i].choice[j].key > 0 && user_data[i].choice[j].key < 100) {
        //this is hornevian
        const questionNumber = user_data[i].choice[j].key - 1;
        if (hornevian_question[questionNumber] === undefined) {
          //this is to check whether an object has never been set for that question
          //for example if hornevian_question[8], meaning answer for question number 8
          //has never been defined, the function will initialize that element with an object
          temporary_object = { A: 0, CPL: 0, W: 0 };
          hornevian_question[questionNumber] = temporary_object;
          //now the array question has an object
          //no matter how many questions have been made
          //no matter whether a question was added later on
          //the upper function will work since a blank array, for example that is assigned array[2] = 1
          //just creates an array with a length of 3 -> [empty, empty, 1]
        }
        if (user_data[i].choice[j].choice === "A") {
          hornevian_question[questionNumber].A++;
        }
        if (user_data[i].choice[j].choice === "CPL") {
          hornevian_question[questionNumber].CPL++;
        }
        if (user_data[i].choice[j].choice === "W") {
          hornevian_question[questionNumber].W++;
        }
      } else if (user_data[i].choice[j].key < 0) {
        //this is harmonic
        const questionNumber = Math.abs(user_data[i].choice[j].key) - 1;
        //Math.abs function was used since harmonic questions' keys are negative
        if (harmonic_question[questionNumber] === undefined) {
          //this is to check whether an object has never been set for that question
          //for example if harmonic_question[3], meaning the answer for harmonic question number 3
          //has never been defined, the function will initialize that element with an object
          temporary_object = { P: 0, CPT: 0, R: 0 };
          harmonic_question[questionNumber] = temporary_object;
          //now the array question has an object
          //no matter how many questions have been made
          //no matter whether a question was added later on
          //the upper function will work since a blank array, for example that is assigned array[2] = 1
          //just creates an array with a length of 3 -> [empty, empty, 1]
        }
        if (user_data[i].choice[j].choice === "P") {
          harmonic_question[questionNumber].P++;
        }
        if (user_data[i].choice[j].choice === "CPT") {
          harmonic_question[questionNumber].CPT++;
        }
        if (user_data[i].choice[j].choice === "R") {
          harmonic_question[questionNumber].R++;
        }
      } else if (user_data[i].choice[j].key >= 100) {
        const questionNumber = user_data[i].choice[j].key - 100;
        if (dummies[questionNumber] === undefined) {
          temporary_object = { A: 0, B: 0, C: 0 };
          dummies[questionNumber] = temporary_object;
        }
        if (user_data[i].choice[j].choice === 1) {
          dummies[questionNumber].A++;
        }
        if (user_data[i].choice[j].choice === 2) {
          dummies[questionNumber].B++;
        }
        if (user_data[i].choice[j].choice === 3) {
          dummies[questionNumber].C++;
        }
      }
    }
  }

  const hornevian_answers = document.querySelectorAll(
    ".hornevian_answers .question_answers"
  );
  hornevian_answers.forEach((item, i) => {
    const first_choice = document.createElement("div");
    const second_choice = document.createElement("div");
    const third_choice = document.createElement("div");
    first_choice.innerHTML = "Assertive : " + hornevian_question[i].A;
    second_choice.innerHTML = "Compliant : " + hornevian_question[i].CPL;
    third_choice.innerHTML = "Withdrawn : " + hornevian_question[i].W;
    item.appendChild(first_choice);
    item.appendChild(second_choice);
    item.appendChild(third_choice);
  });

  const harmonic_questions = document.querySelectorAll(
    ".harmonic_answers .question_answers"
  );
  harmonic_questions.forEach((item, i) => {
    const first_choice = document.createElement("div");
    const second_choice = document.createElement("div");
    const third_choice = document.createElement("div");
    first_choice.innerHTML = "Positive Outlook : " + harmonic_question[i].P;
    second_choice.innerHTML = "Competency : " + harmonic_question[i].CPT;
    third_choice.innerHTML = "Reactive : " + harmonic_question[i].R;
    item.appendChild(first_choice);
    item.appendChild(second_choice);
    item.appendChild(third_choice);
  });
  //dummies
  const dummies_answers = document.querySelectorAll(
    ".dummies_answers .question_answers"
  );
  dummies_answers.forEach((item, i) => {
    const first_choice = document.createElement("div");
    const second_choice = document.createElement("div");
    const third_choice = document.createElement("div");
    first_choice.innerHTML = "Choice1 : " + dummies[i].A;
    second_choice.innerHTML = "Choice2 : " + dummies[i].B;
    third_choice.innerHTML = "Choice3 : " + dummies[i].C;
    item.appendChild(first_choice);
    item.appendChild(second_choice);
    item.appendChild(third_choice);
  });

  console.log(hornevian_question);
  console.log(harmonic_question);
  console.log(dummies);
}
