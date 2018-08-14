import * as Konva from "konva";
Object.defineProperty(Array.prototype, "chunk_inefficient", {
    value: function(chunkSize) {
        var array = this;
        return [].concat.apply(
            [],
            array.map(function(elem, i) {
                return i % chunkSize ? [] : [array.slice(i, i + chunkSize)];
            })
        );
    }
});

var getDaysArray = function(year, month) {
    var names = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    var date = new Date(year, month - 1, 1);
    var result = [];
    while (date.getMonth() == month - 1) {
        result.push(date.getDate() + "-" + names[date.getDay()]);
        date.setDate(date.getDate() + 1);
    }
    return result;
};

var stageWidth = 1000;
var stageHeight = 1000;

var stage = new Konva.Stage({
    container: "canvas",
    width: stageWidth,
    height: stageHeight
});

function getDayNumber(str) {
    return str.split('-')[0]
}

var layer = new Konva.Layer();
stage.add(layer);

// rectangle in bottom right of the stage
var text = new Konva.Text({
    x: 10,
    y: 3,
    fill: "white",
    fontSize: 20,
    text: "Sun",
    width: 250
});

layer.add(text);

var colors = [
    "red",
    "green",
    "yellow",
    "black",
    "blue",
    "lightblue",
    "lightgreen"
];

for (var i = 0; i < 7; i++) {
    var rect = new Konva.Rect({
        fill: colors[i],
        x: i * 50,
        y: 0,
        width: 50,
        height: 25
    });
    layer.add(rect);
}

var days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

for (var i = 0; i < 7; i++) {
    var text = new Konva.Text({
        x: i * 50,
        y: 3,
        fill: "white",
        fontSize: 20,
        text: days[i],
        width: 250
    });

    layer.add(text);
}

var res = getDaysArray(2013, 12);
console.log(res)
// console.log(res)
var rect_y = 25;

var d = 31;

var first = res[0].split("-")[1];
var p = 0;
for (var i = 0; i < days.length; i++) {
    if (days[i] == first) {
        // console.log(p);
        break;
    } else {
        p += 1;
    }
}

var init = 25;

for (var i = 0; i < res.length; i++) {
    if (i >= p) {
    } else {
        console.log("blank");
    }
}
for (var i = 0; i < res.length; i++) {
    if (i <= 7) {
        var rect = new Konva.Rect({
            fill: colors[i],
            x: i * 50,
            y: 25,
            width: 50,
            height: 25
        });
        layer.add(rect);
    }
    if (i <= 14) {
        var rect = new Konva.Rect({
            fill: colors[i],
            x: i * 50,
            y: 50,
            width: 50,
            height: 25
        });
        layer.add(rect);
    }

    if (i <= 21) {
        var rect = new Konva.Rect({
            fill: colors[i],
            x: i * 50,
            y: 75,
            width: 50,
            height: 25
        });
        layer.add(rect);
    }

    if (i <= 28) {
        var rect = new Konva.Rect({
            fill: colors[i],
            x: i * 50,
            y: 100,
            width: 50,
            height: 25
        });
        layer.add(rect);
    }

    if (i <= 35) {
        var rect = new Konva.Rect({
            fill: colors[i],
            x: i * 50,
            y: 125,
            width: 50,
            height: 25
        });
        layer.add(rect);
    }
}

// for(var i =0;i<res.length + p;i++) {
//     if(i <= p-1) {
//         console.log('pass this days')
//     } else {
//         console.log(res[i])
//     }
// }
var x = [];
for (var i = 0; i < p; i++) {
    x.push("blank");
}

res.splice(0, 0, ...x);

var chunks = res.chunk_inefficient(7);

var inc = 1;
for (var i = 0; i < chunks.length; i++) {
    // console.log(chunks[i].length)
    for (var j = 0; j < chunks[i].length; j++) {
        // console.log(chunks[i][j], j,i );
        var tv:string = chunks[i][j];
        var text = new Konva.Text({
            x: j * 51.5,
            y: inc * 25,
            fill: "white",
            fontSize: 20,
            text: tv == "blank" ? " " :getDayNumber(tv),
            width: 250
        });

        layer.add(text);
    }
    inc += 1;
}

// console.log(chunks)

var container = document.querySelector("#canvas");
// now we need to fit stage into parent
var containerWidth = container.offsetWidth;
// to do this we need to scale the stage
var scale = containerWidth / stageWidth;

stage.width(stageWidth * scale);
stage.height(stageHeight * scale);
stage.scale({ x: scale, y: scale });
stage.draw();
