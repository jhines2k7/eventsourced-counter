export default function reduce(events) {
    "use strict";

    return events.reduce( (state, event) => {
        if(event.topic === 'myapp.update.greeting') {
            state.greeting = event.data.greeting;
        }

        return state;
    }, {
        greeting: 'Goodbye World!'
    });
}
