//TEXT BLOCKING
console.log('Hello')

var lines = ["AAA", "BBB", "CCC", "EEE", "FFF", "GGG"];
// var lines = ["AAAAAAAAAAAAA"];
// var lines = ["A","A","A","A","A"];

function newLines(lines){
  // general validation, if line passes add to new arr
  var testArr = lines.filter(function(line){
    var uppercase   = (line == line.toUpperCase());
    var equalLength = (lines[0].length === line.length);
    var lineLength  = (line.length < 50 && line.length != 0);
    if(equalLength && lineLength && uppercase){
      return line;
    }
  });

  // employ validations
  if(lines.length > 50 || lines.length == 0) {
    return "Your input length is either empty or too long";
  }
  else if(testArr.length != lines.length) {
    return "Your elements must be uppercase, equal in length, less than 50 and greater than 0";
  }
  // actual code if input is valid
  else {
    var lineLength    = lines[0].length;
    var splitLines    = [];
    var finalLines    = [];

    lines.forEach(function(line){
        var splitLine = line.split('');
        splitLines.push(splitLine);
    })

    function mutateLines(splitLines){
      for(i = 0; i < lineLength; i++){
        var newLine = [];

          splitLines.forEach(function(line){
            var newLetter = line.pop();
            newLine.push(newLetter);
          })

          var newString = newLine.join().replace(/,/g, '');
          finalLines.push(newString);
      }
    }

    mutateLines(splitLines)
    return finalLines;
  }

}

















