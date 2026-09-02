function checkInclusion(s1: string, s2: string): boolean {
  if (s1.length > s2.length) {
    return false;
  }

  const need = new Map<string, number>();
  const window = new Map<string, number>();

  for (const char of s1) {
    need.set(char, (need.get(char) ?? 0) + 1);
  }

  let left = 0;
  let matches = 0;

  const requiredMatches = need.size;

  for (let right = 0; right < s2.length; right++) {
    const rightChar = s2.charAt(right);

    const previousCount = window.get(rightChar) ?? 0;
    const newCount = previousCount + 1;

    window.set(rightChar, newCount);

    const requiredCount = need.get(rightChar);

    if (requiredCount !== undefined) {
      if (newCount === requiredCount) {
        matches++;
      } else if (previousCount === requiredCount) {
        matches--;
      }
    }

    while (right - left + 1 > s1.length) {
      const leftChar = s2.charAt(left);

      const currentCount = window.get(leftChar) ?? 0;
      const neededCount = need.get(leftChar);

      if (neededCount !== undefined) {
        if (currentCount === neededCount) {
          matches--;
        } else if (currentCount === neededCount + 1) {
          matches++;
        }
      }

      const newLeftCount = currentCount - 1;

      if (newLeftCount === 0) {
        window.delete(leftChar);
      } else {
        window.set(leftChar, newLeftCount);
      }

      left++;
    }

    const windowSize = right - left + 1;

    if (windowSize === s1.length && matches === requiredMatches) {
      return true;
    }
  }

  return false;
}

console.log(checkInclusion("ab", "eidbaooo")); // true
console.log(checkInclusion("ab", "eidboaoo")); // false
console.log(checkInclusion("adc", "dcda")); // true
