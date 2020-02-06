function randn_bm() {
    var u = 0, v = 0;
    while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while (v === 0) v = Math.random();
    return parseInt((Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v) * 100)) + 400;
}

export default function dataGen() {
    var out = []
    var ids = ["Normal Distr.", "Normal Distr2.", "Normal Distr3"]
    for (var i in ids) {
        out.push(dpGen(ids[i]));
    }
    return out;
}

function dpGen(id) {
    var nums = []
    var variance = Math.random()
    console.log(variance)
    for (var i = 0; i < 100000*(1-(variance/1.5)); i++) {
        nums.push(randn_bm());
    }

    var histogramm = {}

    for (var i = 0; i < nums.length; i++) {
        if (histogramm[nums[i]] === undefined) {
            histogramm[nums[i]] = 1;
        } else {
            histogramm[nums[i]]++;
        }
    }

    var data = {
        "id": id,
        "data": []
    }


    for (var key in histogramm) {
        var dp = { "x": key, "y": histogramm[key] };
        data["data"].push(dp)
    }

    return data;
}


