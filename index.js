/*
    To dump or export the TCP/IP configuration, use this command:
        netsh -c interface dump > PATH_AND_FILENAME.txt
    Use this command to import the TCP/IP configuration:
        netsh -f PATH_AND_FILENAME.txt

        netsh -c interface ip dump
        netsh -c interface ipv6 dump

        Add an address to an interface
            netsh interface ip add address name="Ethernet 34" address=192.168.168.101 mask=255.255.255.0
        IPv6 version
            netsh interface ipv6 add address interface="Ethernet 5" address=fd01::172:31:218:39/64

        Remove an address from an interface
            netsh interface ip delete address "Ethernet 34" addr=192.168.168.101
            netsh interface ipv6 delete address interface="Local Area Connection 2" address="fd7e:df1d:94d9:0:381d:a3b4:8849:b4bf"
     */
const {exec} = require('child_process');

const getIPVersion = (ipVersion) => {
    let ipVersionCommand = 'ip';
    if (ipVersion === 6)
        ipVersionCommand = 'ipv6';
    return ipVersionCommand;
};

const executeCommand = (command) => {
    console.log('Executing command: ' + command);
    const executedCommand = exec(command, (error, stdout, stderr) => {
        if (error) {
            console.log(error);
            console.log(stdout);
            console.log(stderr);
        }
    });

    executedCommand.on('exit', (code) => {
        console.log('Command process exited with exit code: ' + code);
    })
};

const deleteAdapterAddress = (adapterName, addr, ipVersion=4) => {
    let ipVersionCommand = getIPVersion(ipVersion);
    const command = `netsh interface ${ipVersionCommand} delete address "${adapterName}" addr=${addr}`;
    executeCommand(command);
};

const addAdapterIPv4Address = (adapterName, addr, subnetMask='255.255.255.0') => {
    let command = `netsh interface ip add address "${adapterName}" address=${addr} mask=${subnetMask}`;
    executeCommand(command);
};

const addAdapterIPv6Address = (adapterName, cidr) => {
    const command = `netsh interface ipv6 add address interface="${adapterName}" addr=${cidr}`;
    executeCommand(command);
};

exports.addAdapterIPv4Address = addAdapterIPv4Address;
exports.addAdapterIPv6Address = addAdapterIPv6Address;
exports.deleteAdapterAddress = deleteAdapterAddress;
