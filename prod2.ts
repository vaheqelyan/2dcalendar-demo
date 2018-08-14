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

function getDayNumber(str) {
    return str.split("-")[0];
}

var width = window.innerWidth;
var height = window.innerHeight;

var stage = new Konva.Stage({
    container: "canvas",
    width: width,
    height: height
});

var layer = new Konva.Layer();

var group = new Konva.Group({
    draggable: false,
    y: 46
});

var days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
var colors = [
    "red",
    "green",
    "yellow",
    "black",
    "blue",
    "lightblue",
    "lightgreen"
];

var header = new Konva.Group({
    width: 39 * 7,
    height: 46
});

header.add(
    new Konva.Rect({
        width: 39 * 7,
        height: 46,
        fill: "white",
        x: 0,
        strokeWidth: 2,
        stroke: "white"
    })
);
header.add(
    new Konva.Path({
        x: 10,
        y: 46/4,
        data:
            "M8.41 10l5.29-5.29c.19-.18.3-.43.3-.71a1.003 1.003 0 0 0-1.71-.71l-6 6c-.18.18-.29.43-.29.71 0 .28.11.53.29.71l6 6a1.003 1.003 0 0 0 1.42-1.42L8.41 10z",
        fill: "black",
        scale: {
            x: 1,
            y: 1
        }
    })
);
header.add(new Konva.Text({
    text:"August, 2018",
            fontSize: 16,
        fontFamily: "Calibri",
        fill: "black",
        width: 100,
        x:39*7/3,
        y:47/4
        // align: "center"
}))

header.add(
    new Konva.Path({
        x: 39*6+10,
        y: 47/4,
        data:
            "M13.71 9.29l-6-6a1.003 1.003 0 0 0-1.42 1.42l5.3 5.29-5.29 5.29c-.19.18-.3.43-.3.71a1.003 1.003 0 0 0 1.71.71l6-6c.18-.18.29-.43.29-.71 0-.28-.11-.53-.29-.71z",
        fill: "black",
        scale: {
            x: 1,
            y: 1
        }
    })
);

layer.add(header);

group.add(
    new Konva.Rect({
        width: 100,
        height: 100,
        fill: "white",
        y: 0
    })
);
days.map((value, index) => {
    group.add(
        new Konva.Rect({
            // fill: colors[index],
            fill:"white",
            x: index * 39,
            width: 39,
            y: 0,
            height: 18,
            stroke: "white",
            strokeWidth: 2
        })
    );

    var simpleText = new Konva.Text({
        x: index * 39,
        y: 2,
        text: value,
        fontSize: 14,
        fontFamily: "Calibri",
        fill: "black",
        width: 39,
        align: "center"
    });
    group.add(simpleText);
});

function calcEnd(arr) {
    var lastCount = arr[arr.length - 1].length;
    // console.log(lastCount,'asd')
    // console.log(7-lastCount
    var dec = 7 - lastCount;
    if (dec !== 0) {
        return dec + 7;
    }
}

var res = getDaysArray(2022, 11);
// console.log(res)
var first = res[0].split("-")[1];
var p = 0;
for (var i = 0; i < days.length; i++) {
    if (days[i] == first) {
        break;
    } else {
        p += 1;
    }
}

var x = [];
for (var i = 0; i < p; i++) {
    x.push("blank");
}
function isInt(n) {
    return Number(n) === n && n % 1 === 0;
}

res.splice(0, 0, ...x);

var chunks = res.chunk_inefficient(7);

// console.log(wc)
var n = calcEnd(chunks);
var b = 7 - chunks[chunks.length - 1].length;
// console.log()
var na = [];
for (var i = 0; i < n; i++) {
    // console.log(i,i<=b)
    if (i <= b - 1) {
        chunks[chunks.length - 1].push("blank");
    } else {
        na.push("blank");
    }
}
chunks.push(na);
console.log(chunks);

var g = new Konva.Group({
    y: 46 + 18,
    x: 0
});

var inc = 0;
var curr = null;
for (var i = 0; i < chunks.length; i++) {
    // console.log(chunks[i].length)
    for (var j = 0; j < chunks[i].length; j++) {
        var tv: string = chunks[i][j];
        var group_item = new Konva.Group();

        var rect = new Konva.Rect({
            x: j * 39,
            y: inc * 39,
            // fill: colors[j],
            fill:"white",
            width: 39,
            height: 39,
            strokeWidth: 2,
            stroke: "white"
        });
        var txt = new Konva.Text({
            align: "center",
            x: j * 39,
            y: inc * 39,
            fill: "black",
            fontSize: 14,
            text: tv == "blank" ? "-" : getDayNumber(tv),
            width: 39,
            lineHeight: 2.5
        });
        txt.on("click", e => {
            var target = e.target;
            var rect: Konva.Rect = target.getParent().getChildren()[0];
            console.log(curr)
            if(curr==null) {
                rect.fill("red")
                curr = target

            }  else {
                curr.getParent().getChildren()[0].fill('white')
                curr.fill('black')

                target.fill('white');
                target.getParent().getChildren()[0].fill('red')

                curr = target
                // console.log(curr)
                // console.log(target.getParent().getParent().getChildren()[curr].getChildren()[1])
            }
            // rect.fill("#1890ff");
            // target.fill("#fff")
            layer.draw();
        });
        group_item.add(rect);
        group_item.add(txt);

        g.add(group_item);
    }
    inc += 1;
}

layer.add(group);
layer.add(g);

// window.g = g
// layer.add(bodygroup)
stage.add(layer);
