function lengthOfLongestSubstring(s: string): number {
  const window = new Set<string>();

  let left = 0;
  let maxLength = 0;

  for (let right = 0; right < s.length; right++) {
    while (window.has(s[right]!)) {
      window.delete(s[left]!);
      left++;
    }
    window.add(s[right]!);
    const currentLength = right - left + 1;
    maxLength = Math.max(maxLength, currentLength);
  }

  return maxLength;
}
console.log(lengthOfLongestSubstring("abcabcbb"));
console.log(lengthOfLongestSubstring("bbbbb"));
console.log(lengthOfLongestSubstring("pwwkew"));
