# Windows IP Config
Node.js wrapper for netsh commands used for adding/removing IP addresses

*Note: this package only works for windows, and must be run as an administrator

## Getting Started
```
npm install --save windows-ip-config
```

## Normal Usage
How to delete an address:
```javascript
let adapterName = 'Ethernet 3';
let addr = '192.168.1.5';
let ipVersion = 4;  // Optional parameter, default is 4; the other option is 6
deleteAdapterAddress(adapterName, addr, ipVersion);
```

How to add an IPv4 address
```javascript
let adapterName = 'Ethernet 3';
let addr = '192.168.1.5';
let subnetMask = '255.255.255.0';
addAdapterIPv4Address(adapterName, addr, subnetMask)
```

How to add an IPv6 address
```javascript
let adapterName = 'Ethernet 3';
let cidrAddress = 'fd01::01/64';
addAdapterIPv6Address(adapterName, cidrAddress)
```
