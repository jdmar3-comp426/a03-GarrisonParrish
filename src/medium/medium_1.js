// import {variance} from "./data/stats_helpers.js";
//
/**
 * Gets the sum of an array of numbers.
 * @param array
 * @returns {*}
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
 * prototype functions. Very useful
 */
export function getSum(array) {
    let sum = 0;
    array.forEach(element => sum += element);
    return sum;
}


/**
 * Calculates the median of an array of numbers.
 * @param {number[]} array
 * @returns {number|*}
 *
 * example:
 * let array = [3,2,5,6,2,7,4,2,7,5];
 * console.log(getMedian(array)); // 4.5
 */
export function getMedian(array) {
    let median;
    let midpoint = Math.floor(array.length / 2);
    if (array.length % 2 == 0) {
        // even length => midpoint = mean of middle two indices
        median = array[midpoint] + array[midpoint+1]) / 2;
    } else {
        // odd length => midpoint = middle value
        median = array[midpoint];
    }
    return median;
}

/**
 * Calculates statistics (see below) on an array of numbers.
 * Look at the stats_helper.js file. It does variance which is used to calculate std deviation.
 * @param {number[]} array
 * @returns {{min: *, median: *, max: *, variance: *, mean: *, length: *, sum: *, standard_deviation: *}}
 *
 * example:
 * getStatistics([3,2,4,5,5,5,2,6,7])
 * {
  length: 9,
  sum: 39,
  mean: 4.333333333333333,
  median: 5,
  min: 2,
  max: 7,
  variance: 2.6666666666666665,
  standard_deviation: 1.632993161855452
 }
 */
export function getStatistics(array) {
    function getMin() {
        let min = array[0];
        array.forEach(function(item) {
            if (item < min) {
                min = item;
            }
        })
        return min;
    }

    function getMax() {
        let max = array[0];
        array.forEach(function(item) {
            if (item > max) {
                max = item;
            }
        })
        return max;
    }

    function getMean() {
        return getSum(array) / array.length;
    }

    // import {variance} from stats_helpers.js;

    /*
    let result = [
        array.length,
        getSum(array),
        getMean(),
        getMedian(array),
        getMin(),
        getMax(),
        variance(),
    ];
    */
    let result;
    return result;
}