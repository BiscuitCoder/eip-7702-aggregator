import { erc20Abi } from "viem";
import swapAbi from "./abis/usdt_usdc_pair.json";
import wbnbAbi from "./abis/wbnb.json";

export type MockAbi = {
    name: string
    abi: any
}

export const mockAbi:Record<string, MockAbi> = {
    '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c':{
        name:'WBNB',
        abi:wbnbAbi,
    },
    '0x55d398326f99059fF775485246999027B3197955':{
        name:'USDT',
        abi:erc20Abi,
    },
    '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d':{
        name:'USDC',
        abi:erc20Abi,
    },
    // https://dexscreener.com/bsc/0x92b7807bf19b7dddf89b706143896d05228f3121
    '0x92b7807bf19b7dddf89b706143896d05228f3121':{
        name:'SWAP_USDT_USDC',
        abi:swapAbi,
    },
}

export const mockAArr= Object.entries(mockAbi).map(([key, value]) => ({
    address: key,
    name: value.name,
    abi: value.abi,
}))