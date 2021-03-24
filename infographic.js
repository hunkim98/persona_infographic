const database = new Request("https://personapersonality.com/gatherData");

let json_data;
let user_data;
let personality_array = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let sum_of_personality = 0;

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
fetch(database)
  .then((response) => response.json())
  .then((data) => {
    user_data = data;
    document.querySelector(".title_container .number").innerHTML =
      user_data.length;
  })
  .then(() => {
    for (i = 0; i < user_data.length; i++) {
      personality_array[user_data[i].personality - 1]++;
    }
    console.log(personality_array);
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
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
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
      switch (d.data.id) {
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
      return "value " + "type" + d.data.id; //added class for each
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
      return "value " + "type" + d.data.id; //added class for each
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
