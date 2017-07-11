export default function reduce(events) {
    "use strict";

    return events.reduce( (state, event) => {
        if(event.topic === 'myapp.increment.count') {
            state.countTotal = event.data.countTotal;
        }

        if(event.topic === 'myapp.decrement.count') {
            state.countTotal = event.data.countTotal;
        }

        return state;
    }, {
        countTotal: 0
    });
}
