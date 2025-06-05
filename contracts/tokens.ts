export interface Token {
    address: string
    decimals: number
    name: string
    symbol: string
    isNative: boolean
    isWrapped: boolean
    icon?: string
  }

  export const TOKENS: Token[] = [
    {
    address: "0x0000000000000000000000000000000000000000",
    decimals: 18,
    name: "Ethereum",
    symbol: "ETH",
    isNative: true,
    isWrapped: false,
    icon:'https://bscscan.com/token/images/bnbchain2_32.png'
  },
  {
    address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    decimals: 18,
    name: "Wrapped BNB",
    symbol: "WBNB",
    isNative: false,
    isWrapped: true,
    icon:'https://bscscan.com/token/images/bnbchain2_32.png'
  },
  {
    address: "0x55d398326f99059fF775485246999027B3197955",
    decimals: 18,
    name: "USDT",
    symbol: "USDT",
    isNative: false,
    isWrapped: false,
    icon:'https://bscscan.com/token/images/busdt_32.png'
  },
  {
    address: "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
    decimals: 18,
    name: "USDC",
    symbol: "USDC",
    isNative: false,
    isWrapped: false,
    icon:'https://bscscan.com/token/images/centre-usdc_28.png'
  }
]