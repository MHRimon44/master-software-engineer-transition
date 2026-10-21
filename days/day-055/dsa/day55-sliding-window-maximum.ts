export function maxSlidingWindow(nums: number[], k: number): number[] {
 if(k<1||k>nums.length) return [];
 const deque:number[]=[]; let head=0; const output:number[]=[];
 for(let i=0;i<nums.length;i++){
  if(head<deque.length && deque[head]<=i-k) head++;
  while(deque.length>head && nums[deque[deque.length-1]]<=nums[i]) deque.pop();
  deque.push(i);
  if(i>=k-1) output.push(nums[deque[head]]);
 }
 return output;
}
console.log(maxSlidingWindow([1,3,-1,-3,5,3,6,7],3)); // [3,3,5,5,6,7]
