function runningSum(nums) {
    const result = [];
    let sum = 0;
    for (const num of nums) {
        sum += num;
        result.push(sum);
    }
    return result;
}
console.log(runningSum([1, 2, 3, 4]));
export {};
//# sourceMappingURL=prefix-sum.js.map