const PI = 3.14;
let radius = 3;
let area = 0;
// function added 
function circleArea(radius) {
    const area = radius * radius * PI;
    return area;
}
//generating results from functions 
area = circleArea(3)
console.log("Area1:", area)
radius = 4;
area = circleArea(4);
console.log("Area2:", area)