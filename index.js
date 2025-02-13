const osc = require('node-osc');
const dmxlib = require('dmxnet');

const OSC_OPTIONS = {
    host: '127.0.0.1',
    port: 9000
};

const oscClient = new osc.Client(OSC_OPTIONS.host, OSC_OPTIONS.port);

const DMXNET_OPTIONS = {
    log: { level: 'info' },
    oem: 0,
    esta: 0,
    sName: "Text",
    lName: "Long description",
    hosts: ["127.0.0.1"]
};
const dmxnet = new dmxlib.dmxnet(DMXNET_OPTIONS);

const ARTNET_OPTIONS = {
    subnet: 0,
    universe: 0,
    net: 0
}

const receiver = dmxnet.newReceiver(ARTNET_OPTIONS);

let last_data = new Array(512).fill(0);

receiver.on('data', function(data) {
    let changedValues = [];
    let bundle = [];

    data.forEach((value, i) => {
        if (value !== last_data[i]) {
            last_data[i] = value;
            changedValues.push({ index: i, value: Math.round(value / 255 * 1000) / 1000 });
        }
    });

    if (changedValues.length === 1) {
        const { index, value } = changedValues[0];
        oscClient.send(`/${ARTNET_OPTIONS.universe}/dmx/${index}`, [{ type: 'f', value: value }], function () {
            console.log(`Sent OSC message for channel ${index}`);
        });
    } else if (changedValues.length > 1) {
        changedValues.forEach(({ index, value }) => {
            bundle.push({
                address: `/${ARTNET_OPTIONS.universe}/dmx/${index}`,
                args: [{ type: 'f', value: value }]
            });
        });
        oscClient.send({ address: '', args: [], elements: bundle }, function () {
            console.log('Sent OSC bundle message');
        });
    }
});