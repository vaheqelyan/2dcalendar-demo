import * as Konva from "konva";
import { ARROW_RIGHT, ARROW_LEFT } from "./arrowPath";
import { ARRAY_DAYS } from "./calendarData";
import CalendarUtil from "./CalendarUtil";
import getDays from "./getDays";
window.getDays = getDays;
// const c = new CalendarUtil(2018, 8);
// c.formatDate();

class Calendar {
    /* days */
    daysArray: any;
    stage = null;
    layer: Konva.Layer = new Konva.Layer();
    header = null;
    body = null;
    curr = null;

    mothNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ];

    days = ARRAY_DAYS;

    headerHeight = 46;

    middle = null;

    middleHeight = 18;

    year: number;
    moth: number;

    getDayNumber(str) {
        return str.split("-")[0];
    }

    constructor({ container, year, moth, width=window.innerWidth, height=window.innerHeight }) {
        this.daysArray = getDays(year, moth);
        this.stage = new Konva.Stage({
            container,
            width,
            height
        });

        this.year = year;
        this.moth = moth;

        this.makeHeader();
        this.makeMiddle();
        this.makeBody();
        this.stage.add(this.layer);
    }
    public makeBody() {
        this.body = new Konva.Group({
            x: 0,
            y: this.headerHeight + this.middleHeight
        });

        this.addItemsToBody();
        this.layer.add(this.body);
    }
    public addItemsToBody(): void {
        let inc = 0;
        const { daysArray: { length }, daysArray } = this;
        for (const i = 0; i < length; i++) {
            for (const j = 0; j < daysArray[i].length; j++) {
                var tv: string = daysArray[i][j];
                var group_item: Konva.Group = new Konva.Group();

                var rect: Konva.Rect = new Konva.Rect({
                    x: j * 39,
                    y: inc * 39,
                    width: 39,
                    height: 39,
                    strokeWidth: 2,
                    stroke: "white"
                    // fill:"red",
                });

                var txt: Konva.Text = new Konva.Text({
                    align: "center",
                    x: j * 39,
                    y: inc * 39,
                    fill: "black",
                    fontSize: 14,
                    text: tv == "blank" ? "-" : this.getDayNumber(tv),
                    width: 39,
                    lineHeight: 2.5
                });
                txt.on("click", this.onClickItem);

                group_item.add(rect);
                group_item.add(txt);

                this.body.add(group_item);
            }
            inc += 1;
        }
    }
    public onClickItem = e => {
        var target = e.target;
        var rect: Konva.Rect = target.getParent().getChildren()[0];

        if (this.curr == null) {
            rect.fill("red");
            this.curr = target;
        } else {
            const getBack = this.curr.getParent().getChildren()[0];
            getBack.fill("white");
            this.curr.fill("black");

            target.fill("white");
            rect.fill("red");
            this.curr = target;
        }
        this.layer.draw();
    };
    public makeMiddle() {
        this.middle = new Konva.Group({
            draggable: false,
            y: this.headerHeight
        });

        for (var i = 0; i < this.days.length; i++) {
            var value = this.days[i];
            this.addToMiddle(value, i);
        }
        this.layer.add(this.middle);
    }
    public addToMiddle(value, index): void {
        this.middle.add(
            new Konva.Rect({
                // fill: "red",
                x: index * 39,
                width: 39,
                y: 0,
                height: 18,
                stroke: "white",
                strokeWidth: 2
            })
        );
        this.middle.add(
            new Konva.Text({
                x: index * 39,
                y: 2,
                text: value,
                fontSize: 14,
                fontFamily: "Calibri",
                fill: "black",
                width: 39,
                align: "center"
            })
        );
    }
    public addLeftArrow(): Konva.Path {
        const path = new Konva.Path({
            x: 10,
            y: this.headerHeight / 3.5,
            data: ARROW_LEFT,
            fill: "black",
            scale: {
                x: 1,
                y: 1
            }
        });

        path.on("mousedown", this.prev);

        return path;
    }
    public addMiddleText(): Konva.Text {
        const make_text = `${this.mothNames[this.moth - 1]}, ${this.year}`;
        return new Konva.Text({
            text: make_text,
            fontSize: 16,
            fontFamily: "Calibri",
            fill: "black",
            x: 39 * 7 / 2.6,
            y: this.headerHeight / 3.5
        });
    }
    public addRightArrow(): Konva.Path {
        const node: Konva.Path = new Konva.Path({
            x: 39 * 6 + 8.5,
            y: this.headerHeight / 3.5,
            data: ARROW_RIGHT,
            fill: "black",
            scale: {
                x: 1,
                y: 1
            }
        });
        node.on("mousedown", this.next.bind(this));
        return node;
    }
    public addHeader(): Konva.Rect {
        const node = new Konva.Rect({
            width: 39 * 7,
            height: this.headerHeight,
            // fill: "red",
            x: 0,
            strokeWidth: 2,
            stroke: "white"
        });

        return node;
    }
    next() {
        // console.log(this.curr.text())
        const  getselectedtext = this.curr.text();
        if (this.moth >= 12) {
            this.year += 1;
            this.moth = 1;
        } else {
            this.moth += 1;
        }

        this.daysArray = getDays(this.year, this.moth);

        let childs = this.body.getChildren();

        let pure_i = 0;
        const { daysArray: { length }, daysArray } = this;
        for (let i = 0; i < length; i++) {
            for (let j = 0; j < daysArray[i].length; j++) {
                var val: string = daysArray[i][j];

                if (childs[pure_i]) {
                    var textItem: Konva.TextPath = childs[
                        pure_i
                    ].getChildren()[1];
                    // console.log(val)
                    const updateText = "blank" ? "-" : this.getDayNumber(val);
                    if(this.getDayNumber(val) == getselectedtext) {
                        this.curr.getParent().getChildren()[0].fill('white');
                        this.curr.fill('black')
                        textItem.getParent().getChildren()[0].fill("red")
                        textItem.fill('white')
                        this.curr = textItem;
                    }
                    // console.log(updateText)
                    // if(updateText === getselectedtext) {
                    //     console.log('yeah')
                    // }
                    textItem.setText(
                        val == "blank" ? "-" : this.getDayNumber(val)
                    );
                    pure_i += 1;
                }
            }
        }

        this.updateMiddleText();

        this.layer.draw();
    }
    updateMiddleText() {
        const text: Konva.TextPath = this.header.getChildren()[3];
        text.setText(`${this.mothNames[this.moth - 1]}, ${this.year}`);
    }
    prev() {
        if (this.moth == 1) {
            this.moth = 12;
            this.year -= 1;
        } else {
            this.moth -= 1;
        }

        this.daysArray = getDays(this.year, this.moth);

        let childs = this.body.getChildren();

        let pure_i = 0;
        const { daysArray: { length }, daysArray } = this;
        for (let i = 0; i < length; i++) {
            for (let j = 0; j < daysArray[i].length; j++) {
                var val: string = daysArray[i][j];

                if (childs[pure_i]) {
                    var textItem: Konva.TextPath = childs[
                        pure_i
                    ].getChildren()[1];

                    textItem.setText(
                        val == "blank" ? "-" : this.getDayNumber(val)
                    );
                    pure_i += 1;
                }
            }
        }

        this.updateMiddleText();

        this.layer.draw();
    }

    createLeftBack(): Konva.Rect {
        const node: Konva.Rect = new Konva.Rect({
            cornerRadius: 100,
            width: 35,
            height: 35,
            // fill: "yellow",
            y: 5.5,
            x: 4
        });
        node.on("mousedown", this.prev.bind(this));
        return node;
    }
    public createRightBack(): Konva.Rect {
        const node: Konva.Rect = new Konva.Rect({
            cornerRadius: 100,
            width: 35,
            height: 35,
            // fill: "yellow",
            y: 5.5,
            x: 39 * 6
        });
        node.on("mousedown", this.next.bind(this));
        return node;
    }
    public makeHeader() {
        this.header = new Konva.Group({
            width: 39 * 7,
            height: 46
        });

        this.header.add(this.addHeader());
        this.header.add(this.createLeftBack());

        this.header.add(this.addLeftArrow());

        this.header.add(this.addMiddleText());
        this.header.add(this.createRightBack());
        this.header.add(this.addRightArrow());

        this.layer.add(this.header);
    }
}

const cal = new Calendar({
    container: "canvas",
    year: 2018,
    moth: 1,
    // width:100,
    // height:100
});
window.cal = cal;
