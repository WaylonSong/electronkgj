const crypto = require('crypto');
const assert = require('assert');

// Generate Alice's keys...
const alice = crypto.createECDH('secp521r1');
const aliceKey = alice.generateKeys();

// Generate Bob's keys...
const bob = crypto.createECDH('secp521r1');
const bobKey = bob.generateKeys();
console.log(bob.getPrivateKey());
console.log(bob.getPublicKey());

// Exchange and generate the secret...
const aliceSecret = alice.computeSecret(bobKey);
const bobSecret = bob.computeSecret(aliceKey);

assert.strictEqual(aliceSecret.toString('hex'), bobSecret.toString('hex'));


const sign = crypto.createSign('sha256');

sign.update('some data to sign');

const privateKey =
`-----BEGIN EC PRIVATE KEY-----
MHcCAQEEIF+jnWY1D5kbVYDNvxxo/Y+ku2uJPDwS0r/VuPZQrjjVoAoGCCqGSM49
AwEHoUQDQgAEurOxfSxmqIRYzJVagdZfMMSjRNNhB8i3mXyIMq704m2m52FdfKZ2
pQhByd5eyj3lgZ7m7jbchtdgyOF8Io/1ng==
-----END EC PRIVATE KEY-----`;

console.log(sign.sign(privateKey).toString('hex'));