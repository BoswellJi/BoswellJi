const res = new Set();

function backtrack(nums, track) {
  if (track.size == nums.length) {
    res.add(track);
    return;
  }

  for (let i = 0; i < nums.length; i++) {
    if (track.has(nums[i])) {
      continue;
    }

    track.add(nums[i]);
    backtrack(nums, track);
    track.delete(nums[i]);
  }
}

function permute(nums) {
  const track = new Set();
  backtrack(nums, track);
  return res;
}

const result = permute([1, 2, 3]);
console.log(result);