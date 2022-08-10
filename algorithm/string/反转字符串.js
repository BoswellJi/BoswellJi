function reverseString(strs) {
  let right = strs.length - 1;
  let left = 0;

  while(right>left){
    const temp =  strs[right];
    strs[right] = strs[left] ;
    strs[left] = temp;

    right--;
    left++
  }
  console.log(strs);
  return strs;
}

reverseString(['1', '4', '5', '6', '1', 'j', 'm']);