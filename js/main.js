"use strict";

import Storage from './storage'
import reduce from './reducer'
import EventStore from './eventStore'

let home = function() {

    let appState = reduce(EventStore.events);

    appState.greeting = 'Hello World!';

    EventStore.add(EventStore.events, [{
        channel: 'async',
        topic: 'myapp.update.greeting',
        data: appState
    }]);
};

postal.subscribe({
    channel: 'async',
    topic: 'myapp.update.greeting',
    callback: function(data, envelope) {
        this.viewModel.greeting = data.greeting;

        this.update(this.viewModel);

    }.bind(this)
});

Storage.get().then( (events) => {
    EventStore.events = events;

    router.init();
});
