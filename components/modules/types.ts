export interface TaskModule {
  id: string
  type: "approve" | "transfer" | "swap" | "custom"
  title: string
  description: string
  icon: string
  params: Record<string, any>
  contractAddress?: string
  abi?: any[]
}

export interface ModuleTemplate {
  id: string
  type: "approve" | "transfer" | "swap" | "custom"
  title: string
  description: string
  icon: string
  defaultParams: Record<string, any>
}

export interface ContractMethod {
  type: string
  name: string
  inputs: {
    name: string
    type: string
  }[]
  stateMutability: string
  payable?: boolean
}

export interface PresetModule {
  id: string
  type: string
  title: string
  description: string
  icon: string
  method: ContractMethod
  defaultParams?: Record<string, any>
}

export const AVAILABLE_MODULES: PresetModule[] = [
  {
    id: "approve",
    type: "approve",
    title: "授权",
    description: "授权代币给其他地址",
    icon: "🔐",
    method: {
      type: "function",
      name: "approve",
      inputs: [
        { name: "spender", type: "address" },
        { name: "amount", type: "uint256" }
      ],
      stateMutability: "nonpayable"
    }
  },
  {
    id: "transfer",
    type: "transfer",
    title: "转账",
    description: "转账代币到指定地址",
    icon: "💸",
    method: {
      type: "function",
      name: "transfer",
      inputs: [
        { name: "to", type: "address" },
        { name: "amount", type: "uint256" }
      ],
      stateMutability: "nonpayable"
    }
  },
  {
    id: "swap",
    type: "swap",
    title: "兑换",
    description: "在 DEX 上兑换代币",
    icon: "🔄",
    method: {
      type: "function",
      name: "swapExactTokensForTokens",
      inputs: [
        { name: "amountIn", type: "uint256" },
        { name: "amountOutMin", type: "uint256" },
        { name: "path", type: "address[]" },
        { name: "to", type: "address" },
        { name: "deadline", type: "uint256" }
      ],
      stateMutability: "nonpayable"
    }
  }
]