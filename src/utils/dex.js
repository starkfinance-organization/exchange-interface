import { number, hash, validateAndParseAddress as getAddress, shortString } from 'starknet';

const { toBN } = number;
const { computeHashOnElements, pedersen } = hash;
const { encodeShortString } = shortString;

export const PAIR_CONTRACT_CLASS_HASH = '0x414b41d2c5607a6040c317a3205f7afc8d04a9c0f05af4edd6035bb53ca2416';

export const FACTORY_ADDRESS = '0x594074315e98393351438011f5a558466f1733fde666f73f41738a39804c27';
export const ROUTER_ADDRESS = '0x2d300192ea8d3291755bfd2bb2f9e16b38f48a20e4ce98e189d2daa7be435c2';

export const CONTRACT_ADDRESS_PREFIX = encodeShortString('STARKNET_CONTRACT_ADDRESS');

export const FEE_TO_SETTER = '0x697e8307f5880439bd81610064192e028e65f7835c11bc46139e7b31c1c6aa8';

export function sortsTokenBefore(addressA, addressB) {
    return toBN(addressA).lt(toBN(addressB));
}

export function getPairAddress(addressA, addressB) {}
