
#include <queue>
#include <vector>
using namespace std;

class Solution {

    struct Element {
        int value{};
        int index{};
        Element(int value, int index) : value{value}, index{index}{}
    };
    
    inline static auto maxValueOnTop = [](const Element& first, const Element& second) {
        return first.value < second.value;
    };

public:
    vector<int> maxSlidingWindow(vector<int>& inputNumbers, int windowSize) {
        
        priority_queue<Element, vector<Element>, decltype(maxValueOnTop) > maxHeap(maxValueOnTop);
        for (int i = 0; i < windowSize; ++i) {
            maxHeap.emplace(Element(inputNumbers[i], i));
        }

        vector<int> maxValuesWindow(inputNumbers.size() - windowSize + 1);
        maxValuesWindow[0] = maxHeap.top().value;

        for (int i = windowSize; i < inputNumbers.size(); ++i) {
            while (!maxHeap.empty() && maxHeap.top().index < i - windowSize + 1) {
                maxHeap.pop();
            }
            maxHeap.emplace(Element(inputNumbers[i], i));
            maxValuesWindow[i - windowSize + 1] = maxHeap.top().value;
        }

        return maxValuesWindow;
    }
};
