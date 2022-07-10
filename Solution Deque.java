
import java.util.ArrayDeque;
import java.util.Deque;

public class Solution {

    public int[] maxSlidingWindow(int[] inputNumbers, int windowSize) {

        Deque<Integer> indexes = new ArrayDeque<>();
        for (int i = 0; i < windowSize; ++i) {
            removeFromDeque(inputNumbers, indexes, windowSize, i);
            indexes.add(i);
        }

        int[] maxValuesWindow = new int[inputNumbers.length - windowSize + 1];
        maxValuesWindow[0] = inputNumbers[indexes.peekFirst()];

        for (int i = windowSize; i < inputNumbers.length; ++i) {
            removeFromDeque(inputNumbers, indexes, windowSize, i);
            indexes.add(i);
            maxValuesWindow[i - windowSize + 1] = inputNumbers[indexes.peekFirst()];
        }

        return maxValuesWindow;
    }

    private void removeFromDeque(int[] inputNumbers, Deque<Integer> indexes, int windowSize, int currentIndex) {
        if (!indexes.isEmpty() && indexes.peekFirst() == (currentIndex - windowSize)) {
            indexes.removeFirst();
        }
        while (!indexes.isEmpty() && inputNumbers[indexes.peekLast()] <= inputNumbers[currentIndex]) {
            indexes.removeLast();
        }
    }
}
