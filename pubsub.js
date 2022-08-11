const PubNub = require('pubnub');

const credentials = {
    publishKey: 'pub-c-d1c210d3-e2a9-4bc0-a6e3-4a1be72870ad',
    subscribeKey: 'sub-c-49051b94-6b94-48ba-8eb0-5cddf330412d',
    secretKey: 'sec-c-ZmE1MTIyY2UtM2QzMC00Y2NmLTgwYzktZTgwYTUwY2I4ZGIw'
};

const CHANNELS = {
    TEST: 'TEST',
};

class PubSub {
    constructor() {
        this.pubnub = new PubNub(credentials);
        this.pubnub.subscribe({ channels: Object.values(CHANNELS) });
        this.pubnub.addListener(this.listener());
    };

    listener() {
        return {
            message: (messageObject) => {
                const { channel, message } = messageObject;

                console.log(`Message recived. Channel: ${channel}. Message: ${message}`);
            }
        }
    };

    publish({ channel, message }) {
        this.pubnub.publish({ channel, message });
    };
};

const testPubSub = new PubSub();
testPubSub.publish({ channel: CHANNELS.TEST, message: 'hello pubnub'});

module.exports = PubSub;