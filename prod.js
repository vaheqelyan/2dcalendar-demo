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
    return str.split('-')[0]
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
    draggable: false
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

// var header = new Konva.Group();

// header.add(new Konva.Rect({
//     width:250,
//     height:10,
//     fill:'red',
//     x:100
// }))

// layer.add(header)
group.add(new Konva.Rect({
    width:100,
    height:100,
    fill:'red',
    y:0
}))
days.map((value, index) => {
    group.add(
        new Konva.Rect({
            fill: colors[index],
            // fill:"white",
            x: index * 39,
            width: 39,
            y: 0,
            height: 18,
            stroke: "black",
            strokeWidth: 2
        })
    );

    var simpleText = new Konva.Text({
        x: index *39,
        y: 2,
        text: value,
        fontSize: 14,
        fontFamily: "Calibri",
        fill: "black",
        width:39,
        align:"center"
    });
    group.add(simpleText);
});


function calcEnd(arr){
    var lastCount = arr[arr.length-1].length;
    // console.log(lastCount,'asd')
    // console.log(7-lastCount
    var dec = 7-lastCount;
    if(dec !== 0) {
        return dec + 7;
    }
}


var res = getDaysArray(2018,8);
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
function isInt(n){
    return Number(n) === n && n % 1 === 0;
}


res.splice(0, 0, ...x);

var chunks = res.chunk_inefficient(7);

// console.log(wc)
var n = calcEnd(chunks);
var b = 7 - chunks[chunks.length-1].length;
// console.log()
var na = []
for(var i =0;i<n;i++){
    // console.log(i,i<=b)
    if(i <= b-1) {
        chunks[chunks.length-1].push('blank')
    } else {
        na.push('blank');
    }
}
chunks.push(na)
console.log(chunks)

        var g = new Konva.Group({
            y:19,
            x:0

        });

var inc = 0;
for (var i = 0; i < chunks.length; i++) {
    // console.log(chunks[i].length)
    for (var j = 0; j < chunks[i].length; j++) {
        var tv:string = chunks[i][j];
        var group_item = new Konva.Group();

        var rect = new Konva.Rect({
            x:j*39,
            y:inc*39,
            fill:colors[j],
            // fill:"black",
            width:39,
            height:39,
            strokeWidth:2,
            stroke:"black"
        })
        var txt = new Konva.Text({
            align: 'center',
            x: j * 39,
            y: inc * 39,
            fill: "black",
            fontSize: 14,
            text: tv == "blank" ? "-" :getDayNumber(tv),
            width: 39,
            lineHeight: 2.5
        });
        txt.on('click',e=>{
            var target = e.target;
            var rect:Konva.Rect = target.getParent().getChildren()[0];
            rect.fill('lightgreen');
            layer.draw()
        })
        group_item.add(rect);
        group_item.add(txt);

        g.add(group_item);

    }
    inc += 1;
}

layer.add(group);
layer.add(g)
// layer.add(bodygroup)
stage.add(layer);
