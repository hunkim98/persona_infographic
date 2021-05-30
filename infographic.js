const database = new Request("https://personapersonality.com/gatherData");

let json_data;
let user_data;
let personality_array = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let sum_of_personality = 0;
let chosen_user;
let chosen_data = 26590;
let chosen_data_analysis = { A: 0, CPL: 0, W: 0, P: 0, CPT: 0, R: 0 };

const mask_names = [
  "삐꺽거리는 로봇",
  "귀여운 날다람쥐",
  "호탕한 양반댁",
  "신비한 요술쟁이",
  "고독한 스님",
  "총총거리는 토끼",
  "호기심 많은 도깨비",
  "불 같은 악마",
  "평화로운 자연인",
];
fetch(database, { method: "POST" })
  .then((response) => response.json())
  .then((data) => {
    user_data = data;
    document.querySelector(".title_container .number").innerHTML =
      user_data.length;
    console.log(user_data[chosen_data]);
  })
  .then(() => {
    for (i = 0; i < user_data.length; i++) {
      personality_array[user_data[i].personality - 1]++;
    }
    console.log(user_data[chosen_data].personality);
    chosen_user = user_data[chosen_data]; //instantiate chosen_user
    for (let key in chosen_data_analysis) {
      //we use for.. in.. to loop json object
      for (i = 0; i < user_data[chosen_data].choice.length; i++) {
        if (key === user_data[chosen_data].choice[i].choice) {
          chosen_data_analysis[key]++;
        }
      }
      console.log(key + chosen_data_analysis[key]);
    }
    //from this, this is for d3
    let min_hornevian = 9; //total of 9 hornevian questions
    let min_harmonic = 5; //total of 5 harmonic questions
    for (let key in chosen_data_analysis) {
      if (key === "A" || key === "CPL" || key === "W") {
        if (chosen_data_analysis[key] < min_hornevian) {
          min_hornevian = chosen_data_analysis[key];
        }
      } else if (key === "P" || key === "CPT" || key === "R") {
        if (chosen_data_analysis[key] < min_harmonic) {
          min_harmonic = chosen_data_analysis[key];
        }
      }
    }
    for (let key in chosen_data_analysis) {
      if (key === "A" || key === "CPL" || key === "W") {
        if (
          chosen_data_analysis[key] === min_hornevian &&
          chosen_data_analysis[key] != 3
        ) {
          delete chosen_data_analysis[key]; // this deletes the element
        }
      } else if (key === "P" || key === "CPT" || key === "R") {
        if (chosen_data_analysis[key] === min_harmonic) {
          delete chosen_data_analysis[key];
        }
      }
    }
    console.log(chosen_data_analysis);
    let hornevian_length = 9; //total of 9 hornevian questions
    let harmonic_length = 5;
    let complete_analysis = {};
    for (let key in chosen_data_analysis) {
      if (key === "A" || key === "CPL" || key === "W") {
        for (let nested_key in chosen_data_analysis) {
          //nested loop
          if (key === "A") {
            if (nested_key === "P") {
              complete_analysis["E7"] =
                (chosen_data_analysis[key] / hornevian_length +
                  chosen_data_analysis[nested_key] / harmonic_length) *
                50;
            } else if (nested_key === "CPT") {
              complete_analysis["E3"] =
                (chosen_data_analysis[key] / hornevian_length +
                  chosen_data_analysis[nested_key] / harmonic_length) *
                50;
            } else if (nested_key === "R") {
              complete_analysis["E8"] =
                (chosen_data_analysis[key] / hornevian_length +
                  chosen_data_analysis[nested_key] / harmonic_length) *
                50;
            }
          } else if (key === "CPL") {
            if (nested_key === "P") {
              complete_analysis["E2"] =
                (chosen_data_analysis[key] / hornevian_length +
                  chosen_data_analysis[nested_key] / harmonic_length) *
                50;
            } else if (nested_key === "CPT") {
              complete_analysis["E1"] =
                (chosen_data_analysis[key] / hornevian_length +
                  chosen_data_analysis[nested_key] / harmonic_length) *
                50;
            } else if (nested_key === "R") {
              complete_analysis["E6"] =
                (chosen_data_analysis[key] / hornevian_length +
                  chosen_data_analysis[nested_key] / harmonic_length) *
                50;
            }
          } else if (key === "W") {
            if (nested_key === "P") {
              complete_analysis["E9"] =
                (chosen_data_analysis[key] / hornevian_length +
                  chosen_data_analysis[nested_key] / harmonic_length) *
                50;
            } else if (nested_key === "CPT") {
              complete_analysis["E5"] =
                (chosen_data_analysis[key] / hornevian_length +
                  chosen_data_analysis[nested_key] / harmonic_length) *
                50;
            } else if (nested_key === "R") {
              complete_analysis["E4"] =
                (chosen_data_analysis[key] / hornevian_length +
                  chosen_data_analysis[nested_key] / harmonic_length) *
                50;
            }
          }
        }
      }
    }
    console.log(complete_analysis);
    //add mask to it
    const mask_option = document.createElement("div");
    mask_option.className = "mask_option";
    const mask_option_img = document.createElement("img");
    const mask_percentage = document.createElement("div");
    let maximum_option = 0;
    const filepath = "./mask_raw/";
    for (i = 1; i < 10; i++) {
      if (chosen_user.personality === i) {
        let finalpath = filepath + i + ".svg";
        mask_option_img.src = finalpath;
        mask_option.appendChild(mask_option_img);
        for (let key in complete_analysis) {
          if (key.slice(1, 3) != chosen_user.personality) {
            if (complete_analysis[key] > maximum_option) {
              maximum_option = complete_analysis[key];
              console.log(maximum_option);
            }
          } else {
            mask_percentage.innerHTML = complete_analysis[key].toFixed(1) + "%";
            console.log(mask_percentage);
            mask_option.appendChild(mask_percentage);
          }
        }
        document
          .querySelector(".mask_option_container")
          .appendChild(mask_option);
      }
    }
    const mask_second_option = document.createElement("div");
    const mask_second_option_img = document.createElement("img");
    mask_second_option.className = "mask_option";
    const mask_second_percentage = document.createElement("div");
    for (let key in complete_analysis) {
      if (
        complete_analysis[key] == maximum_option &&
        key.slice(1, 3) != chosen_user.personality
      ) {
        let finalpath = filepath + key.slice(1, 3) + ".svg";
        mask_second_option_img.src = finalpath;
        mask_second_option.appendChild(mask_second_option_img);
        mask_second_percentage.innerHTML =
          complete_analysis[key].toFixed(1) + "%";
        mask_second_option.appendChild(mask_second_percentage);
        document
          .querySelector(".mask_option_container")
          .appendChild(mask_second_option);

        break;
      }
    }

    //this is for d3
    json_data = { children: [] };
    for (j = 0; j < 9; j++) {
      json_data.children[j] = {
        name: mask_names[j],
        value: personality_array[j],
        id: j + 1,
      };
    }
    sum_of_personality = personality_array.reduce(function (a, b) {
      return a + b;
    }, 0);
    d3_object(
      json_data,
      Math.max(...personality_array),
      Math.min(...personality_array)
    ); //draw the data
    console.log(json_data);

    // return fetch("./data.json") //fetch inside fetch
    //   .then(function (response) {
    //     return response.json();
    //   })
    //   .then(function (myJson) {
    //     json_data = myJson;
    //   })
    //   .then(function () {
    //     console.log(json_data.children[0]);
    //     for (i = 0; i < json_data.children.length; i++) {
    //       json_data.children[i].value = personality_array[i];
    //       console.log(json_data.children[i].value);
    //     }
    //   })
    //   .then(function () {
    //     console.log(json_data);
    //     d3_object(json_data);
    //   });
  });

// set the dimensions and margins of the graph
var margin = { top: 10, right: 10, bottom: 10, left: 10 },
  width = 700 - margin.left - margin.right,
  height = 700 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3
  .select("#my_dataviz")
  .append("svg")
  .attr("preserveAspectRatio", "xMinYMin meet")
  .attr("viewBox", "0 0 700 700")
  .classed("svg-content", true)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

const d3_object = function (json_object, maximum, minimum) {
  // read json data
  // d3.json("./data.json", function (data) {
  // Give the data to this cluster layout:
  var root = d3.hierarchy(json_object).sum(function (d) {
    console.log(d);
    return d.value;
  }); // Here the size of each leave is given in the 'value' field in input data

  // Then d3.treemap computes the position of each element of the hierarchy
  d3.treemap().size([width, height]).paddingInner(8)(
    // Padding between each rectangle
    //.paddingOuter(6)
    //.padding(20)
    root
  );

  // prepare a color scale
  var color = d3.scaleOrdinal().range(["#402D54", "#D18975", "#8FD175"]);

  // And a opacity scale
  var opacity = d3.scaleLinear().domain([minimum, maximum]).range([0.3, 1]);

  var font_size = d3.scaleLinear().domain([minimum, maximum]).range([20, 40]);

  // use this information to add rectangles:
  let box_index = 0;
  svg
    .selectAll("rect")
    .data(root.leaves())
    .enter()
    .append("rect")
    .attr("class", function () {
      box_index = box_index + 1;
      return "box-" + box_index; //added class for each
    })
    .attr("x", function (d) {
      return d.x0;
    })
    .attr("y", function (d) {
      return d.y0;
    })
    .attr("width", function (d) {
      return d.x1 - d.x0;
    })
    .attr("height", function (d) {
      return d.y1 - d.y0;
    })
    .style("stroke", "black")
    .style("fill", function (d) {
      if (chosen_user.personality === d.data.id) {
        switch (chosen_user.personality) {
          case 1:
            return "#FFC312";
          case 2:
            return "#FDA7DF";
          case 3:
            return "#12CBC4";
          case 4:
            return "#9980FA";
          case 5:
            return "#12CBC4";
          case 6:
            return "#FDA7DF";
          case 7:
            return "#C4E538";
          case 8:
            return "#EA2027";
          case 9:
            return "#FDA7DF";
        }
      } else {
        return "#656565";
      }
    });

  svg
    .selectAll("images")
    .data(root.leaves())
    .enter()
    .append("image")
    .attr("class", function (d) {
      return "image" + d.data.id; //added class for each
    })
    .attr("xlink:href", function (d) {
      switch (d.data.id) {
        case 1:
          return "./mask_raw/1.svg";
        case 2:
          return "./mask_raw/2.svg";
        case 3:
          return "./mask_raw/3.svg";
        case 4:
          return "./mask_raw/4.svg";
        case 5:
          return "./mask_raw/5.svg";
        case 6:
          return "./mask_raw/6.svg";
        case 7:
          return "./mask_raw/7.svg";
        case 8:
          return "./mask_raw/8.svg";
        case 9:
          return "./mask_raw/9.svg";
      }
    })
    .attr("x", function (d) {
      if (d.x1 - d.x0 > d.y1 - d.y0) {
        return d.x0 + (d.x1 - d.x0) / 2 - (d.y1 - d.y0) / 2;
      } else {
        return d.x0;
      }
    })
    .attr("y", function (d) {
      if (d.x1 - d.x0 > d.y1 - d.y0) {
        return d.y0;
      } else {
        return d.y0 + (d.y1 - d.y0) / 2 - (d.x1 - d.x0) / 2;
      }
    })
    .attr("width", function (d) {
      if (d.x1 - d.x0 > d.y1 - d.y0) {
        return d.y1 - d.y0;
      } else {
        return d.x1 - d.x0;
      }
    })
    .attr("height", function (d) {
      if (d.x1 - d.x0 > d.y1 - d.y0) {
        return d.y1 - d.y0;
      } else {
        return d.x1 - d.x0;
      }
    });

  // and to add the text labels
  svg
    .selectAll("vals")
    .data(root.leaves())
    .enter()
    .append("text")
    .attr("class", function (d) {
      if (chosen_user.personality === d.data.id) {
        return null;
      } else {
        return "value " + "type" + d.data.id; //added class for each
      }
    })
    .attr("x", function (d) {
      return d.x1 - 10;
    }) // +10 to adjust position (more right)
    .attr("y", function (d) {
      return d.y1 - 10;
    }) // +20 to adjust position (lower)
    .text(function (d) {
      return ((d.data.value / sum_of_personality) * 100).toFixed(2) + "%";
    })
    .attr("font-size", function (d) {
      return font_size(d.data.value);
    })
    .attr("fill", "black")
    .attr("text-anchor", "end");

  svg
    .selectAll("vals")
    .data(root.leaves())
    .enter()
    .append("text")
    .attr("class", function (d) {
      if (chosen_user.personality === d.data.id) {
        return null;
      } else {
        return "value " + "type" + d.data.id; //added class for each
      }
    })
    .attr("x", function (d) {
      return d.x0 + 10;
    }) // +10 to adjust position (more right)
    .attr("y", function (d) {
      return d.y0 + 20;
    }) // +20 to adjust position (lower)
    .text(function (d) {
      return d.data.value;
    })
    .attr("font-size", 15)
    .attr("fill", "white")
    .attr("text-anchor", "start");

  // Add title for the 3 groups
  svg
    .selectAll("titles")
    .data(
      root.descendants().filter(function (d) {
        return d.depth == 1;
      })
    )
    .enter()
    .append("text")
    .attr("x", function (d) {
      return d.x0 + 5;
    })
    .attr("y", function (d) {
      return d.y0 + 21;
    })
    .text(function (d) {})
    .attr("font-size", "19px")
    .attr("fill", "white");
};
