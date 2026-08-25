function lengthOfLongestSubstring(s) {
    const seen = new Set();
    let left = 0;
    let maxLength = 0;
    for (let right = 0; right < s.length; right++) {
        const currentChar = s[right];
        while (seen.has(currentChar)) {
            seen.delete(s[left]);
            left++;
        }
        seen.add(currentChar);
        maxLength = Math.max(maxLength, right - left + 1);
    }
    return maxLength;
}
console.log(lengthOfLongestSubstring("abcabcbb")); // 3
console.log(lengthOfLongestSubstring("bbbbb")); // 1
console.log(lengthOfLongestSubstring("pwwkew")); // 3
console.log(lengthOfLongestSubstring("")); // 0
console.log(lengthOfLongestSubstring("abcdef")); // 6
export {};
//# sourceMappingURL=longest-substring.js.map