
/**
 * @param {number[]} inputNumbers
 * @param {number} windowSize
 * @return {number[]}
 */
var maxSlidingWindow = function (inputNumbers, windowSize) {

    const indexes = new DoubleEndedQueue();

    for (let i = 0; i < windowSize; ++i) {
        removeFromDeque(inputNumbers, indexes, windowSize, i);
        indexes.addBack(i);
    }

    const maxValuesWindow = new Array(inputNumbers.length - windowSize + 1).fill(0);
    maxValuesWindow[0] = inputNumbers[indexes.peekFront()];

    for (let i = windowSize; i < inputNumbers.length; ++i) {
        removeFromDeque(inputNumbers, indexes, windowSize, i);
        indexes.addBack(i);
        maxValuesWindow[i - windowSize + 1] = inputNumbers[indexes.peekFront()];
    }

    return maxValuesWindow;
};

/**
 * @param {number[]} inputNumbers
 * @param {DoubleEndedQueue<Number>} indexes 
 * @param {number} windowSize
 * @param {number} currentIndex
 * @return {number[]}
 */
function removeFromDeque(inputNumbers, indexes, windowSize, currentIndex) {
    if (!indexes.isEmpty() && indexes.peekFront() === (currentIndex - windowSize)) {
        indexes.removeFront();
    }
    while (!indexes.isEmpty() && inputNumbers[indexes.peekBack()] <= inputNumbers[currentIndex]) {
        indexes.removeBack();
    }
}

function QueueNode(value) {
    this.value = value;
    this.next = null;
    this.previous = null;
}

class DoubleEndedQueue {

    constructor() {
        this.size = 0;
        this.front = null;
        this.back = null;
    }

    addFront(value) {
        let node = new QueueNode(value);

        if (this.size === 0) {
            this.front = node;
            this.back = this.front;
        } else {
            this.front.previous = node;
            node.next = this.front;
            this.front = node;
        }
        ++this.size;
    }

    addBack(value) {
        let node = new QueueNode(value);

        if (this.size === 0) {
            this.back = node;
            this.front = this.back;
        } else {
            this.back.next = node;
            node.previous = this.back;
            this.back = node;
        }
        ++this.size;
    }

    removeFront() {
        if (this.size === 0) {
            throw "List is empty";
        }

        let storeFront = this.front;
        if (--this.size > 0) {
            this.front = this.front.next;
            this.front.previous = null;
        } else {
            this.front = null;
            this.back = null;
        }
        return storeFront.value;
    }

    removeBack() {
        if (this.size === 0) {
            throw "List is empty";
        }

        let storeBack = this.back;
        if (--this.size > 0) {
            this.back = this.back.previous;
            this.back.next = null;
        } else {
            this.front = null;
            this.back = null;
        }
        return storeBack.value;
    }

    peekFront() {
        return this.front.value;
    }

    peekBack() {
        return this.back.value;
    }

    isEmpty() {
        return this.size === 0;
    }
}
