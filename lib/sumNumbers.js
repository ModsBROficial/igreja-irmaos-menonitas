export default function sumNumbers(numbers){
    var sum = numbers.reduce(function (accumulator, value) {
        return accumulator + value
    }, 0);
    return sum;
}
