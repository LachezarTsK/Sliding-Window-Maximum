
/**
 * @param {number[]} inputNumbers
 * @param {number} windowSize
 * @return {number[]}
 */
var maxSlidingWindow = function (inputNumbers, windowSize) {

    const {PriorityQueue} = require('@datastructures-js/priority-queue');
    const maxHeap = new MaxPriorityQueue({compare: (first, second) => second.value - first.value});

    for (let i = 0; i < windowSize; ++i) {
        maxHeap.enqueue(new Element(inputNumbers[i], i));
    }

    const maxValuesWindow = new Array(inputNumbers.length - windowSize + 1).fill(0);
    maxValuesWindow[0] = maxHeap.front().value;

    for (let i = windowSize; i < inputNumbers.length; ++i) {
        while (!maxHeap.isEmpty() && maxHeap.front().index < i - windowSize + 1) {
            maxHeap.dequeue();
        }
        maxHeap.enqueue(new Element(inputNumbers[i], i));
        maxValuesWindow[i - windowSize + 1] = maxHeap.front().value;
    }

    return maxValuesWindow;
};

/**
 * @param {number} value
 * @param {number} index
 */
function Element(value, index) {
    this.value = value;
    this.index = index;
}
