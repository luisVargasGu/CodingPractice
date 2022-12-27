function fib(n) {
	if (n == 0) {
		return 1
	}
	if (n == 1) {
		return 1
	}
	return fib(n-1) + fib(n-2)
}

var db = {}

function memoize_fib(n) {
	if (n == 0) {
		return 1
	}
	if (n == 1) {
		return 1
	}
	if (db[n]) {
		return db[n]
	}
	const value = memoize_fib(n-1) + memoize_fib(n-2)
	db[n] = value
	return value
}

// console.log("reg", fib(6))
// console.log("reg", fib(42))
// console.log("memoize", memoize_fib(6))
// console.log("memoize", memoize_fib(110))

function grid_traveler(m, n, memo = {}) {
	if (memo[`${m}-${n}`]) { return memo[`${m}-${n}`] }
	if (m == 0 || n == 0) { return 0 }
	if (m == 1 && n == 1) { return 1 }
	const value = grid_traveler(m - 1, n, memo) + grid_traveler(m, n - 1, memo)
	memo[`${m}-${n}`] = value
	return value
}

// console.log('grid(2X3): ', grid_traveler(120, 120))

// PROBLEM with my implementations for canSum can't retun true
// sometimes will sum a 0 with a true

//My implementation unmemoized
function canSum(n, nums) {
	if (n < 0) return 0
	if (n == 0) return 1
	var sum = 0
	for (var i = 0; i < nums.length; i++) {
		sum += canSum(n - nums[i], nums)
		if (sum >= 1) { return true } //can't have this
	}
	return sum > 0
}

//My implementation memoized
function canSumMem(sum, nums, memo = {}) {
	if (memo[sum]) { return memo[sum] }
	if (sum < 0) return false
	if (sum == 0) return true
	var sum = 0
	for (var i = 0; i < nums.length; i++) {
		const value = canSum(sum - nums[i], nums, memo)
		memo[sum] = value
		if (value >= 1) { return 1 } //can't have this
		sum += value
	}
	return sum > 0
}


// console.log('canSum:', canSum(7, [5,3,4,7]))
// console.log('canSum:', canSum(300, [7, 14]))
// console.log('canSum:', canSum(300, [7,14]))
// console.log('canSumMem:', canSumMem(300,[7,14]))

// my working solution
function howSum(targetSum, numbers) {
	if (targetSum == 0) { return [] }
	if (targetSum < 0) { return null }
	for (let num of numbers) {
		let posValue = howSum(targetSum-num, numbers);
		if (posValue != null) {
			// Use spread operator stupid `[...test,1,2,3]`
			return [].concat(posValue,[num]);
		}
	}
	return null
}

// console.log('howSum:', howSum(7,[5,3,4,7]))
// console.log('howSum:', howSum(7,[2,7]))
// console.log('howSum:', howSum(100,[5,3,4,7]))
// console.log('howSum:', howSum(1,[5,3,4,7]))
// console.log('howSum:', howSum(0,[5,3,4,7]))
// console.log('howSum:', howSum(300,[14,7]))


// my working solution with memoization
function howSumMemo(targetSum, numbers, memo = {}) {
	if (memo[targetSum]) { return memo[targetSum] }
	if (targetSum == 0) { return [] }
	if (targetSum < 0) { return null }
	for (let num of numbers) {
		let posValue = howSum(targetSum-num, numbers, memo);
		memo[targetSum] = posValue
		if (posValue != null) {
			// Use spread operator stupid `[...test,1,2,3]`
			return [].concat(posValue,[num]);
		}
	}
	return null
}

// console.log('howSumMemo:', howSumMemo(7,[5,3,4,7]))
// console.log('howSumMemo:', howSumMemo(7,[2,7]))
// console.log('howSumMemo:', howSumMemo(100,[5,3,4,7]))
// console.log('howSumMemo:', howSumMemo(1,[5,3,4,7]))
// console.log('howSumMemo:', howSumMemo(0,[5,3,4,7]))
// console.log('howSumMemo:', howSumMemo(300,[14,7]))

//my working solution
function bestSum(targetSum, numbers) {
	if (targetSum == 0) { return [] }
	if (targetSum < 0) { return null }
	const finalOut = [];
	for (let num of numbers) {
		let posValue = howSum(targetSum-num, numbers);
		if (posValue != null) {
			finalOut.push([...posValue, num]);
		}
	}
	let bestArray = finalOut[1];
	for (var i = finalOut.length - 1; i >= 1; i--) {
		if (finalOut[i].length < bestArray.length) {
			bestArray = finalOut[i];
		}
	}
	return bestArray;
}

// console.log('bestSum', bestSum(8, [2,3,5]))
// console.log('bestSum', bestSum(7, [5,3,7,4]))
// console.log('bestSum', bestSum(1, [5,3,7,4]))
// console.log('bestSum', bestSum(0, [5,3,7,4]))
// console.log('bestSum', bestSum(300, [14, 7]))

//my working memoized solution (first)
function bestSumMemo(targetSum, numbers, memo = {}) {
	if (memo[targetSum]) { return memo[targetSum] }
	if (targetSum == 0) { return [] }
	if (targetSum < 0) { return null }
	const finalOut = [];
	for (let num of numbers) {
		let posValue = howSum(targetSum-num, numbers, memo);
		memo[targetSum] = posValue
		if (posValue != null) {
			finalOut.push([...posValue, num]);
		}
	}
	let bestArray = finalOut[1];
	for (var i = finalOut.length - 1; i >= 1; i--) {
		if (finalOut[i].length < bestArray.length) {
			bestArray = finalOut[i];
		}
	}
	return bestArray;
}

// Comments on my work:
// 1. It's supposed to return null if it's not possible and currently it returns undefined

//my working memoized solution (final)
function bestSumMemo(targetSum, numbers, memo = {}) {
	if (memo[targetSum]) { return memo[targetSum] }
	if (targetSum == 0) { return [] }
	if (targetSum < 0) { return null }
	let bestArray = null;
	for (let num of numbers) {
		let posValue = howSum(targetSum-num, numbers, memo);
		memo[targetSum] = posValue
		if (posValue != null) {
			const combination = [...posValue, num];
			if (bestArray == null || combination.length < bestArray.length) {
				bestArray = combination;
			}
		}
	}
	return bestArray;
}

console.log('bestSumMemo', bestSumMemo(8, [2,3,5]))
console.log('bestSumMemo', bestSumMemo(7, [5,3,7,4]))
console.log('bestSumMemo', bestSumMemo(1, [5,3,7,4]))
console.log('bestSumMemo', bestSumMemo(300, [14, 7]))
console.log('bestSumMemo', bestSumMemo(3000, [1,3,7,4]))

















