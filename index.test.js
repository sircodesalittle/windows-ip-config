const netsh = require('./index');

global.console = {
    log: jest.fn()
};

const adapterName = 'Ethernet 3';
const addrIpv4 = '192.168.168.1';
const subnetMask = '255.255.255.0';
const ipv4Version = 4;
const ipv6Version = 6;
const ciderIpv6 = 'fd01::172:31:218:39/64';

afterEach(() => {
    jest.clearAllMocks();
});

test('netsh exists', () => {
    expect(netsh).toBeDefined();
});

test('addAdapterIPv4Address all arguments', () => {
    netsh.addAdapterIPv4Address(adapterName, addrIpv4, subnetMask);
    expect(global.console.log).toHaveBeenCalledWith(`Executing command: netsh interface ip add address \"${adapterName}\" address=${addrIpv4} mask=${subnetMask}`);
});

test('addAdapterIPv4Address using default subnet mask argument', () => {
    netsh.addAdapterIPv4Address(adapterName, addrIpv4);
    expect(global.console.log).toHaveBeenCalledWith(`Executing command: netsh interface ip add address \"${adapterName}\" address=${addrIpv4} mask=${subnetMask}`);
});

test('addAdapterIPv6Address', () => {
    netsh.addAdapterIPv6Address(adapterName, ciderIpv6);
    expect(global.console.log).toHaveBeenCalledWith(`Executing command: netsh interface ipv6 add address interface="${adapterName}" addr=${ciderIpv6}`)
});

test('deleteAdapterAddress all arguments with IPv4', () => {
    netsh.deleteAdapterAddress(adapterName, addrIpv4, ipv4Version);
    expect(global.console.log).toHaveBeenCalledWith(`Executing command: netsh interface ip delete address "${adapterName}" addr=${addrIpv4}`)
});

test('deleteAdapterAddress all arguments with IPv6', () => {
    netsh.deleteAdapterAddress(adapterName, ciderIpv6, ipv6Version);
    expect(global.console.log).toHaveBeenCalledWith(`Executing command: netsh interface ipv6 delete address "${adapterName}" addr=${ciderIpv6}`)
});
