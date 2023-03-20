// const bip39 = require("bip39");
// const ethereumjs = require("ethereumjs-wallet").default;
// const { BIP32Factory } = require("bip32");
// const ecc = require("tiny-secp256k1");

// // single adresses

// // const createBip = (req, res) => {
// //   const bip32 = BIP32Factory(ecc);

// //   const path = "m/44'/60'/0'/0";
// //   const path1 = "m/44'/60'/0'/1";
// //   const path2 = "m/44'/60'/0'/2";

// //   const mnemonic = bip39.generateMnemonic(256);
// //   console.log("Mnemonic:", mnemonic);

// //   const seed = bip39.mnemonicToSeedSync(mnemonic);
// //   const root = bip32.fromSeed(seed);

// //   const account = root.derivePath(path);
// //   const node = account.derive(0);

// //   const wallet = ethereumjs.fromPrivateKey(node.privateKey);
// //   const address = wallet.getAddressString();
// //   const privateKey = wallet.getPrivateKeyString();
// //   const publicKey = wallet.getPublicKeyString();

// //   console.log(`
// //  Wallet generated:
// //  - Address  : ${address},
// //  - Private key : ${privateKey},
// //  - Public key : ${publicKey},
// //  - Mnemonic : ${mnemonic}
// // `);
// // res.send({
// //   address: address,
// //   privateKey: privateKey,
// //   publicKey: publicKey,
// //   mnemonic: mnemonic
// // });

// // }

// // end single adresses

// // without showing path

// // const createBip = (req, res) => {
// //   const bip32 = BIP32Factory(ecc);
// //   const numAddresses = 51; // Number of addresses to generate
// //   const basePath = "m/44'/60'/0'/0'/"; // Base path

// //   const mnemonic = bip39.generateMnemonic(256);
// //   console.log("Mnemonic:", mnemonic);

// //   const seed = bip39.mnemonicToSeedSync(mnemonic);
// //   const root = bip32.fromSeed(seed);

// //   const wallets = [];

// //   for (let i = 0; i < numAddresses; i++) {
// //     const currentPath = basePath + i;

// //     const account = root.derivePath(currentPath);
// //     const node = account.derive(0);
// //     const wallet = ethereumjs.fromPrivateKey(node.privateKey);
// //     const address = wallet.getAddressString();
// //     const privateKey = wallet.getPrivateKeyString();
// //     const publicKey = wallet.getPublicKeyString();

// //     wallets.push({
// //       address: address,
// //       privateKey: privateKey,
// //       publicKey: publicKey,
// //       path:path
// //     });

// //     console.log(`
// //       Wallet ${i} generated:
// //       - Address  : ${address},
// //       - Private key : ${privateKey},
// //       - Public key : ${publicKey},
// //       - Mnemonic : ${mnemonic}
// //     `);
// //   }

// //   res.send({
// //     wallets: wallets,
// //     mnemonic: mnemonic
// //   });
// // };

// // end without showing path

// // final code

// const createBip = (req, res) => {
//   const bip32 = BIP32Factory(ecc);
//   const numAddresses = 51; // Number of addresses to generate
//   const basePath = `m/44'/60'/0'/`; // Base path

//   const mnemonic = bip39.generateMnemonic(256);
//   console.log("Mnemonic:", mnemonic);

//   const seed = bip39.mnemonicToSeedSync(mnemonic);
//   const root = bip32.fromSeed(seed);

//   const wallets = [];
//   //let path = [];

//   for (let i = 0; i < numAddresses; i++) {
//     const currentPath = basePath + i;
//     // path.push(currentPath);
//     const account = root.derivePath(currentPath);
//     const node = account.derive(0);
//     const wallet = ethereumjs.fromPrivateKey(node.privateKey);
//     const address = wallet.getAddressString();
//     const privateKey = wallet.getPrivateKeyString();
//     const publicKey = wallet.getPublicKeyString();

//     wallets.push({
//       address: address,
//       privateKey: privateKey,
//       publicKey: publicKey,
//       path: currentPath,
//     });

//     console.log(`
//       Wallet ${i} generated:
//       - Address  : ${address},
//       - Path: ${currentPath},
//       - Private key : ${privateKey},
//       - Public key : ${publicKey},
//       - Mnemonic : ${mnemonic}
//     `);
//   }

//   res.send({
//     wallets: wallets,
//     mnemonic: mnemonic,
//   });
// };

// // end final code

// module.exports = createBip;
// const bip32 = require('bip32')

const bip39 = require("bip39");
const ethereumjs = require("ethereumjs-wallet").default;
const { BIP32Factory } = require("bip32");
const ecc = require("tiny-secp256k1");

const createBip = (req, res) => {
  const bip32 = BIP32Factory(ecc);

  const mnemonic = bip39.generateMnemonic(256);
  console.log("Mnemonic:", mnemonic);

  const seed = bip39.mnemonicToSeedSync(mnemonic);
  const root = bip32.fromSeed(seed);

  const wallets = [];

  const pathAdderss = 100;
  for (let i = 0; i < pathAdderss; i++) {
    const currentPath = `m/44'/60'/0'/0/${i}`;
    const account = root.derivePath(currentPath);
    const wallet = ethereumjs.fromPrivateKey(account.privateKey);
    const address = wallet.getAddressString();
    const privateKey = wallet.getPrivateKeyString();
    const publicKey = wallet.getPublicKeyString();

    wallets.push({
      address: address,
      privateKey: privateKey,
      publicKey: publicKey,
      path: currentPath,
    });

    console.log(`
      Wallet ${i} generated:
      - Address  : ${address},
      - Path: ${currentPath},
      - Private key : ${privateKey}, 
      - Public key : ${publicKey}, 
      - Mnemonic : ${mnemonic}
    `);
  }

  res.send({
    wallets: wallets,
    mnemonic: mnemonic,
  });
};

module.exports = createBip;
