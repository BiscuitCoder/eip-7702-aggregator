export interface TaskModule {
  id: string
  type: "approve" | "transfer" | "swap"
  title: string
  description: string
  icon: string
  params: Record<string, any>
}

export interface ModuleTemplate {
  id: string
  type: "approve" | "transfer" | "swap"
  title: string
  description: string
  icon: string
  defaultParams: Record<string, any>
}

export const AVAILABLE_MODULES: ModuleTemplate[] = [
  {
    id: "approve",
    type: "approve",
    title: "Token Approve",
    description: "授权代币给指定地址",
    icon: "🔓",
    defaultParams: {
      tokenAddress: "",
      spenderAddress: "",
      amount: "",
    },
  },
  {
    id: "transfer",
    type: "transfer",
    title: "Token Transfer",
    description: "转账代币到指定地址",
    icon: "💸",
    defaultParams: {
      tokenAddress: "",
      toAddress: "",
      amount: "",
    },
  },
  {
    id: "swap",
    type: "swap",
    title: "Token Swap",
    description: "在DEX上交换代币",
    icon: "🔄",
    defaultParams: {
      tokenIn: "",
      tokenOut: "",
      amountIn: "",
      slippage: "0.5",
    },
  },
]