import mpg_data from "./data/mpg_data.js";
import {getStatistics} from "./medium_1.js";
import {getSum} from "./medium_1.js";

/*
This section can be done by using the array prototype functions.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
see under the methods section
*/


/**
 * This object contains data that has to do with every car in the `mpg_data` object.
 *
 *
 * @param {allCarStats.avgMpg} avgMpg - Average miles per gallon on the highway and in the city. keys `city` and `highway`
 * 
 *
 * @param {allCarStats.allYearStats} allYearStats - result of calling `getStatistics` from medium_1.js on
 * the years the cars were made.
 *
 * @param {allCarStats.ratioHybrids} ratioHybrids - ratio of cars that are hybrids
 */

export function getAvgMpg(arr) {
    const city_mpg_arr = arr.map(car => car["city_mpg"]);
    const highway_mpg_arr = arr.map(car => car["highway_mpg"]);
    const avg_obj = {
        city: getSum(city_mpg_arr) / city_mpg_arr.length,
        highway: getSum(highway_mpg_arr) / highway_mpg_arr.length,
    }
    return avg_obj;


}

export function getAllYearStats(mpg_data) {
    // we now have an array of the years of all cars
    const year_arr = mpg_data.map(car => car["year"]);
    return getStatistics(year_arr);
}

export function getRatioHybrids(mpg_data) {
    let hybrid_count = 0;
    let total = 0;
    mpg_data.forEach(element => {
        if (element["hybrid"] == true) {
            hybrid_count += 1;
        }
        total += 1;
    }); 

    return hybrid_count / total;
}


export const allCarStats = {
    avgMpg: getAvgMpg(mpg_data),
    allYearStats: getAllYearStats(mpg_data),
    ratioHybrids: getRatioHybrids(mpg_data),
};


/**
 * HINT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 *
 * @param {moreStats.makerHybrids} Array of objects where keys are the `make` of the car and
 * a list of `hybrids` available (their `id` string). Don't show car makes with 0 hybrids. Sort by the number of hybrids
 * in descending order.
 *
 *[{
 *     "make": "Buick",
 *     "hybrids": [
 *       "2012 Buick Lacrosse Convenience Group",
 *       "2012 Buick Lacrosse Leather Group",
 *       "2012 Buick Lacrosse Premium I Group",
 *       "2012 Buick Lacrosse"
 *     ]
 *   },
 *{
 *     "make": "BMW",
 *     "hybrids": [
 *       "2011 BMW ActiveHybrid 750i Sedan",
 *       "2011 BMW ActiveHybrid 750Li Sedan"
 *     ]
 *}]
 *
 *
 * @param {moreStats.avgMpgByYearAndHybrid} Object where keys are years and each year
 * an object with keys for `hybrid` and `notHybrid`. The hybrid and notHybrid
 * should be an object with keys for `highway` and `city` average mpg.
 *
 * Only years in the data should be keys.
 *
 * {
 *     2020: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *     2021: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *
 * }
 */

 export function getMakerHybrids(mpg_data) {
    // get the hybrids
    let hybrids_arr = [];
    mpg_data.forEach(car => {
        if (car["hybrid"] == true) {
            hybrids_arr.push({
                make: car["make"],
                hybrids: [car["id"]]
            });
        }
    });
    return hybrids_arr;
}

export function suckMyNuts(mpg_data) {
    // loop through cars and sort into hybrids and nonhybrids
    // sort each by year
    // hybrids: obj with year keys and car array values
    // same for non hybrids
    // getAvgMpg() will return city and highway mpgs for an array of objects
    // if we sort by year, we can get an array of cars that are hybrid and same year
    let cars_by_year = groupBy(mpg_data, "year");  // cars sorted by year
    let cars_by_year_and_type = {};
    Object.entries(cars_by_year).forEach(([key, value]) => {
        cars_by_year_and_type[key] = groupBy(value, "hybrid");
        /*
        cars_by_year_and_type[key]["notHybrid"] = cars_by_year_and_type[key]["false"];
        delete cars_by_year_and_type[key]["false"];
        */
        /*
        cars_by_year_and_type[key]["hybrid"] = getAvgMpg(cars_by_year_and_type[key]["hybrid"]);
        cars_by_year_and_type[key]["notHybrid"] = getAvgMpg(cars_by_year_and_type[key]["notHybrid"]);
        */
    });
    // this is such a mindfuck
    return cars_by_year_and_type;
}

function groupBy(objectArray, property) {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
    return objectArray.reduce(function (acc, obj) {
      let key = obj[property]
      if (!acc[key]) {
        acc[key] = []
      }
      acc[key].push(obj)
      return acc
    }, {})
}

export const moreStats = {
    makerHybrids: getMakerHybrids(mpg_data),
    avgMpgByYearAndHybrid: suckMyNuts(mpg_data),
};
