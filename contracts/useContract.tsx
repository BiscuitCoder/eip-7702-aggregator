import { useClient, useSendCalls, useWalletClient, useWriteContract } from "wagmi"
import { CONTRACT_CONFIG } from "./config"
import { encodeFunctionData, erc20Abi, parseEther, parseUnits } from "viem"
import { useTaskStore } from "@/lib/store"
import { Call } from "viem"

export const useBatchCallContract = () => {
    const { writeContract, status, data } = useWriteContract()
    const { sendCalls } = useSendCalls()
    const modules = useTaskStore(state => state.modules)
    const { data: walletClient } = useWalletClient();

     // USDC 授权
     const usdcApproveData = encodeFunctionData({
        abi: erc20Abi,
        functionName: 'approve',
        args: [
            '0x881d40237659c251811cec9c364ef91dc08d300c', // spender
            parseUnits('1000', 6) // USDC 6位小数
        ]
    })

    const test = async () => {
        console.log('walletClient===>',walletClient);
        if(!walletClient) return console.log('walletClient is null');
        walletClient.sendCalls({
            account: walletClient.account,
            calls: [
                {
                    to: '0xdac17f958d2ee523a2206206994597c13d831ec7',
                    data: usdcApproveData
                },
                {
                    to: '0xd6985222b31f2a84129ba1fa80387d31d943b189',
                    value: parseEther('0.00001')
                },
                {
                    to: '0x44e506ce628636ab5fb9242097571f330331cbe0',
                    value: parseEther('0.00002')
                },
            ]
        })   
    }
    
    const getBatchCalls = () => {
        console.log("client",walletClient)

        
        
        // USDC 授权
        const usdcApproveData = encodeFunctionData({
            abi: erc20Abi,
            functionName: 'approve',
            args: [
                '0x881d40237659c251811cec9c364ef91dc08d300c', // spender
                parseUnits('1000', 6) // USDC 6位小数
            ]
        })

        // USDT 授权
        const usdtApproveData = encodeFunctionData({
            abi: erc20Abi,
            functionName: 'approve',
            args: [
                '0xc7bBeC68d12a0d1830360F8Ec58fA599bA1b0e9b', // spender
                parseUnits('1000', 6) // USDT 6位小数
            ]
        })

        return [
            {
                data: usdcApproveData,
                to: '0xdac17f958d2ee523a2206206994597c13d831ec7' // USDC 合约地址
            },
            {
                data: usdtApproveData,
                to: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48' // USDT 合约地址
            }
        ] as Call[]
    }
      
    return {
        write:()=>test(),
        status,
        data
    }
}