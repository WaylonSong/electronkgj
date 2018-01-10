var crypto = require('crypto')
    ,fs = require('fs');
var privatePem = fs.readFileSync('./private.pem');
var publicPem = fs.readFileSync('./public.pub');
var key = privatePem.toString();
var pubkey = publicPem.toString();
var data = "cdss";
console.log(pubkey);
//加密
var sign = crypto.createSign('RSA-SHA256');
sign.update(data);
var sig = sign.sign(key, 'hex');
console.log(sig);
//解密
var verify = crypto.createVerify('RSA-SHA256');
verify.update(data);
console.log(verify.verify(pubkey, sig, 'hex'));

var encryptedBuffer = new Buffer(data);
console.log(encryptedBuffer.toString())
var o = crypto.publicEncrypt(pubkey, encryptedBuffer)
// console.log(o.toString())


console.log(crypto.privateDecrypt(key, o).toString())