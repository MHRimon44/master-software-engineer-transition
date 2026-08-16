function isPalindrome(s: string): boolean {
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    while (left < right && !isAlphaNumeric(s[left])) {
      left++;
    }
    while (left < right && !isAlphaNumeric(s[right])) {
      right--;
    }

    if (s[left]?.toLowerCase() !== s[right]?.toLowerCase()) {
      return false;
    }

    left++;
    right--;
  }
  return true;
}

function isAlphaNumeric(char: string | undefined): boolean {
  if (char === undefined) {
    return false;
  }
  return /^[a-zA-Z0-9]$/.test(char);
}

console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("race a car")); // false
console.log(isPalindrome(" ")); // false
