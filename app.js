function combine(input1, input2, resultType) {
    var result;
    if (typeof input1 === 'number' && typeof input2 === 'number' || resultType === 'as-number') {
        result = +input1 + +input2;
    }
    result = input1.toString() + input2.toString();
    if (resultType === 'as-number') {
        return +(result);
    }
    else {
        return result.toString;
    }
}
;
var combinedStringAges = combine('30', '26', 'as-number');
var combinedAges = combine(30, 26, "as-number");
var combinedNames = combine('Max', 'Anna', "as-text");
