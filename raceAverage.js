// RACE AVERAGE
console.log('SteelHouse')

var times = ["02:00 PM, DAY 19", "02:00 PM, DAY 20", "01:58 PM, DAY 20"]
// var times = ["12:00 PM, DAY 1", "12:01 PM, DAY 1"]
// var times = ["12:00 AM, DAY 2"]

// subtract time from baselineDT if > 0 then valid
class RaceAverage {

  constructor(times, title) {
    this.title = title,
    this.times = times
  }

  avgMinutes(times){
    var err = "Your start input must be after the start time;"
    // general validation, if line passes add to new arr
    var regexArr = times.filter(function(time){
      var regex   = /^([0]\d|[1][0-2]):([0-5]\d)\s(?:AM|PM),\s(DAY)\s(\d?[1-9]|[1-9]0)$/i;
      if(regex.test(time)){
        return time;
      }
    });

    if(!(times.length > 1 && times.length < 50)) {
      return 'Your input length is invalid.';
    }
    else if(regexArr.length != times.length){
      return 'Your input format is invalid.';
    }
    else {
      var baseLineDT = new Date(2025, 5, 1, 8, 0);
      var totalTime  = 0;

      var getDiff = function(raceTime, baseLineDT){
        var diff = (raceTime - baseLineDT) / 1000 / 60;
        if(diff >= 1){return diff;}
        else{throw err}
      };

      var calculateHours = function(hour, minutes, amPM, numDays){
        if(amPM === 'AM' && hour == 12) {
          var raceTime = new Date(2025, 5, numDays, 0, minutes);
          totalTime = (totalTime + getDiff(raceTime, baseLineDT));
        }
        else if(amPM === 'AM') {
          var raceTime = new Date(2025, 5, numDays, hour, minutes);
          totalTime = (totalTime + getDiff(raceTime, baseLineDT));
        }
        else if(amPM === 'PM' && hour == 12) {
          var raceTime = new Date(2025, 5, numDays, 12 , minutes);
          totalTime = (totalTime + getDiff(raceTime, baseLineDT));
        }
        else {
          var raceTime = new Date(2025, 5, numDays, 12 + hour, minutes);
          totalTime = (totalTime + getDiff(raceTime, baseLineDT));
        }
      };

      times.forEach(function(time){
        var hour        = Number(time.slice(0,2));
        var minutes     = Number(time.slice(3,5));
        var amPM        = time.slice(6,8);
        var numDays     = Number(time.slice(14,16));
        calculateHours(hour, minutes, amPM, numDays);
      })

      var average = Math.round(totalTime / times.length);
      return this.title + "'s average in minutes: " + average;
    }
  }

}
