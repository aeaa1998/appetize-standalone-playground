const devices = {
  android: [
    {
      name: 'Pixel 7',
      identifier: 'pixel7',
      os: '13.0'.split(','),
      defaultOs: '13.0'
    },
    {
      name: 'Pixel 7 Pro',
      identifier: 'pixel7pro',
      os: '13.0,14.0'.split(','),
      defaultOs: '13.0'
    },
    {
      name: 'Nexus 5',
      identifier: 'nexus5',
      os: '8.1,9.0,10.0,11.0'.split(','),
      defaultOs: '11.0'
    },
    {
      name: 'Pixel 4XL',
      identifier: 'pixel4xl',
      os: '12.0'.split(','),
      defaultOs: '12.0'
    }
  ],
  ios: [
    {
      name: 'iPad 9th generation',
      identifier: 'ipad9thgeneration',
      os: '15.5,16.2,17.2'.split(','),
      defaultOs: '17.2'
    },
    {
      name: 'iPhone 15 Pro',
      identifier: 'iphone15pro',
      os: '17.2'.split(','),
      defaultOs: '17.2'
    },
    {
      name: 'iPhone 14 Pro',
      identifier: 'iphone14pro',
      os: '16.0,17.2'.split(','),
      defaultOs: '17.2'
    },
    {
      name: 'iPhone 13 Pro',
      identifier: 'iphone13pro',
      os: '15.0,16.2,17.2'.split(','),
      defaultOs: '16.2'
    },
    {
      name: 'iPhone 13 Pro Max',
      identifier: 'iphone13promax',
      os: '15.0,16.2,17.2'.split(','),
      defaultOs: '16.2'
    },
    {
      name: 'iPhone 12',
      identifier: 'iphone12',
      os: '14.5,15.5,16.2,17.2'.split(',')
    },
    {
      name: 'iPhone 11 Pro',
      identifier: 'iphone11pro',
      os: '14.5,15.5,16.2,17.2'.split(',')
    },
    {
      name: 'iPhone 8 Plus',
      identifier: 'iphone8plus',
      os: '14.5,15.5,16.2'.split(',')
    },
    {
      name: 'iPhone 8',
      identifier: 'iphone8',
      os: '14.5,15.5,16.2'.split(',')
    }
  ]
}

// The wikipedia applications
const applications = {
  android: '', // Enter your application public key in here,
  ios: '' // Enter your application public key in here
}

/**
 * Helper function to get the application from a system
 * @param {string} system The system we will be selecting the application from
 * @returns {object} The object that represents the current application
 */
const getSelectedApplicationFromSystem = (system) => {
  return { publicKey: applications[system], os: system }
}

// Have the devices mapped by identifier
const deviceByIdentifier = Object.keys(devices).reduce((acc, key) => {
  devices[key].forEach((device) => (acc[device.identifier] = device))
  return acc
}, {})

// Have the list of versions os mapped by device identifier
const deviceOsByIdentifier = Object.keys(devices).reduce((acc, key) => {
  devices[key].forEach((device) => (acc[device.identifier] = device.os))
  return acc
}, {})

// Have the names of the devices by the identifier
const deviceNameByIdentifier = Object.keys(devices).reduce((acc, key) => {
  devices[key].forEach((device) => (acc[device.identifier] = device.name))
  return acc
}, {})

export {
  deviceNameByIdentifier,
  devices,
  deviceOsByIdentifier,
  deviceByIdentifier,
  applications,
  getSelectedApplicationFromSystem
}
