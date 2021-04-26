# dextest
This is a test rest api on the aeternity blockchain

a token contract is already deployed on the testnet

that is my contract cus

for minting purpose only the owner of the contract can call that method

in the config folder there are information about the owner(the keypair)

it has 3 APIs

/api/aeternity/balance/:publicKey

that checks the balance

api/aeternity/mint

which mints and responds an event

the mint event. that we can use as a proof that the token was minted

last api

api/aeternity/burn

which for the time being takes public key and private key of a valid account(which has some amount of Ae in it)

and burns their tokens
