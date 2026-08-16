function minSubArrayLen(target, nums) {
    let left = 0;
    let windowSum = 0;
    let minLength = Infinity;
    for (let right = 0; right < nums.length; right++) {
        windowSum += nums[right];
        while (windowSum >= target) {
            const currentLength = right - left + 1;
            minLength = Math.min(minLength, currentLength);
            windowSum -= nums[left];
            left++;
        }
    }
    return minLength === Infinity ? 0 : minLength;
}
console.log(minSubArrayLen(7, [2, 3, 1, 2, 4, 3]));
export {};
//# sourceMappingURL=day14-minimum-size-subarray.js.map