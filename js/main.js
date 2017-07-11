'use strict';

import Storage from './storage'
import reduce from './reducer'
import EventStore from './eventStore'
import postal from 'postal/lib/postal.lodash'

document.getElementById('increment').addEventListener('click', function( event ) {
    let appState = reduce(EventStore.events);

    appState.countTotal++;

    EventStore.add(EventStore.events, [{
        channel: 'async',
        topic: 'myapp.increment.count',
        data: appState
    }]);
}, false);

document.getElementById('decrement').addEventListener('click', function( event ) {
    let appState = reduce(EventStore.events);

    appState.countTotal--;

    EventStore.add(EventStore.events, [{
        channel: 'async',
        topic: 'myapp.decrement.count',
        data: appState
    }]);
}, false);

postal.subscribe({
    channel: 'async',
    topic: 'myapp.increment.count',
    callback: function(data, envelope) {
        document.getElementById('total').innerHTML = data.countTotal
    }.bind(this)
});

postal.subscribe({
    channel: 'async',
    topic: 'myapp.decrement.count',
    callback: function(data, envelope) {
        document.getElementById('total').innerHTML = data.countTotal
    }.bind(this)
})

Storage.get().then( (events) => {
    EventStore.events = events;
});
