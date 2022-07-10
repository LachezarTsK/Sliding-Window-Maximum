
import java.util.PriorityQueue;

public class Solution {

    private record Element(int value, int index) {}

    public int[] maxSlidingWindow(int[] inputNumbers, int windowSize) {

        PriorityQueue<Element> maxHeap = new PriorityQueue<>((first, second) -> second.value - first.value);
        for (int i = 0; i < windowSize; ++i) {
            maxHeap.add(new Element(inputNumbers[i], i));
        }

        int[] maxValuesWindow = new int[inputNumbers.length - windowSize + 1];
        maxValuesWindow[0] = maxHeap.peek().value;

        for (int i = windowSize; i < inputNumbers.length; ++i) {
            while (!maxHeap.isEmpty() && maxHeap.peek().index < i - windowSize + 1) {
                maxHeap.poll();
            }
            maxHeap.add(new Element(inputNumbers[i], i));
            maxValuesWindow[i - windowSize + 1] = maxHeap.peek().value;
        }

        return maxValuesWindow;
    }
}
