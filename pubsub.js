const PubNub = require('pubnub');

const credentials = {
    publishKey: process.env.PUBNUB_PUBLISH_KEY,
    subscribeKey: process.env.PUBNUB_SUBSCRIBE_KEY,
    secretKey: process.env.PUBNUB_SECRET_KEY
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