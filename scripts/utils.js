var keyframes = {
    0: {
        transform: "matrix(1, 0, 0, 1, 0, 0)",
        opacity: 1
    },
    40: {
        opacity: 1
    },
    50: {
        transform: "matrix(1.3, 0, 0, 1,3, 0, 0)",
        opacity: 0
    },
    100: {
        transform: "matrix(1.3, 0, 0, 1,3, 0, 0)",
        opacity: 0
    }
};
var applyKeyframe = function (element, keyframes, percentage) {
    var startKeyframe = Math.floor(percentage / 10) * 10;
    var endKeyframe = Math.ceil(percentage / 10) * 10;
    var startStyle = keyframes[startKeyframe];
    var endStyle = keyframes[endKeyframe];
    var interpolate = function (start, end, factor) {
        return start + (end - start) * factor;
    };
    var factor = (percentage - startKeyframe) / (endKeyframe - startKeyframe);
    var newStyle = {};
    var _loop_1 = function (property) {
        if (startStyle.hasOwnProperty(property) && endStyle.hasOwnProperty(property)) {
            if (property === 'transform') {
                var startTransform = startStyle[property].match(/matrix\(([^)]+)\)/)[1].split(',').map(parseFloat);
                var endTransform_1 = endStyle[property].match(/matrix\(([^)]+)\)/)[1].split(',').map(parseFloat);
                var interpolatedTransform = startTransform.map(function (startValue, index) { return interpolate(startValue, endTransform_1[index], factor); });
                newStyle[property] = "matrix(".concat(interpolatedTransform.join(', '), ")");
            }
            else if (typeof startStyle[property] === 'number' && typeof endStyle[property] === 'number') {
                newStyle[property] = interpolate(startStyle[property], endStyle[property], factor);
            }
            else {
                newStyle[property] = startStyle[property];
            }
        }
    };
    for (var property in startStyle) {
        _loop_1(property);
    }
    console.log(newStyle);
    // Object.assign(element.style, newStyle);
};
applyKeyframe("foo", keyframes, 0);
