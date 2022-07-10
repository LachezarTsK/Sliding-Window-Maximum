
#include <queue>
#include <vector>
using namespace std;

class Solution {
    
public:
    vector<int> maxSlidingWindow(vector<int>& inputNumbers, int windowSize) {

        deque<int> indexes;
        for (int i = 0; i < windowSize; ++i) {
            removeFromDeque(inputNumbers, indexes, windowSize, i);
            indexes.push_back(i);
        }

        vector<int> maxValuesWindow(inputNumbers.size() - windowSize + 1);
        maxValuesWindow[0] = inputNumbers[indexes.front()];

        for (int i = windowSize; i < inputNumbers.size(); ++i) {
            removeFromDeque(inputNumbers, indexes, windowSize, i);
            indexes.push_back(i);
            maxValuesWindow[i - windowSize + 1] = inputNumbers[indexes.front()];
        }

        return maxValuesWindow;
    }

private:
    void removeFromDeque(const vector<int>& inputNumbers, deque<int>& indexes, int windowSize, int currentIndex) {
        if (!indexes.empty() && indexes.front() == (currentIndex - windowSize)) {
            indexes.pop_front();
        }
        while (!indexes.empty() && inputNumbers[indexes.back()] <= inputNumbers[currentIndex]) {
            indexes.pop_back();
        }
    }
};
