function average(valuesToAverage) {
    var sum = 0;
    valuesToAverage.forEach(function (value) {
        sum += value;
    });
    return sum / valuesToAverage.length;
}

/// test cases
console.log(average([1, 2, 3, 5, -10000]));
console.log(average([-4.3, 0, 0, 0, 4.3, 0.2]));