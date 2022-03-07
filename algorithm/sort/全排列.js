function permutate(str) {
  const result = [];
  const used = Array.from({ length: str.length }, () => false);

  function backtracking(candidate, memo) {
    if (memo.length === str.length) {
      result.push(memo.slice());
      return;
    }

    for (let i = 0; i < candidate.length; i++) {
      if (used[i]) continue;
      memo.push(candidate[i]);
      used[i] = true;
      backtracking(candidate, memo);
      used[i] = false;
      memo.pop(candidate[i]);
    }
  }

  backtracking(str, []);

  return result;
}

console.log(permutate('abc'));