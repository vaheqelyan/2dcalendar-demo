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

function calcEnd(arr){
  		var lastCount = arr[arr.length - 1].length;
		var dec = 7 - lastCount;
		if (dec !== 0) {
			return dec + 7;
		}
}

export default function getDays(year, month) {
    var names = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    var date = new Date(year, month - 1, 1);
    var result = [];
    while (date.getMonth() == month - 1) {
        result.push(date.getDate() + "-" + names[date.getDay()]);
        date.setDate(date.getDate() + 1);
    }
  
  var first = result[0].split("-")[1];
		var p = 0;
		for (var i = 0; i < names.length; i++) {
			if (names[i] == first) {
				break;
			} else {
				p += 1;
			}
		}
  		var x = [];
		for (var i = 0; i < p; i++) {
			x.push("blank");
		}

		result.splice(0, 0, ...x);

    var chunks = result.chunk_inefficient(7);
  
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
  return chunks;
};
