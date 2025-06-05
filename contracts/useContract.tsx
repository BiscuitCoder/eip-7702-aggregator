import {
  useAccount,
  useClient,
  useSendCalls,
  useWalletClient,
  useWriteContract,
} from "wagmi";
import { CONTRACT_CONFIG } from "./config";
import { Address, encodeFunctionData, erc20Abi, parseEther, parseUnits } from "viem";
import { useTaskStore } from "@/lib/store";
import { Call } from "viem";

export const useBatchCallContract = () => {
  const { sendCalls, status, data } = useSendCalls();
  const modules = useTaskStore((state) => state.modules);
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient()

  // USDC 授权
  /*
     const usdcApproveData = encodeFunctionData({
        abi: erc20Abi,
        functionName: 'approve',
        args: [
            '0x881d40237659c251811cec9c364ef91dc08d300c', // spender
            parseUnits('1000', 6) // USDC 6位小数
        ]
    })
    */

    const getBatchCalls = () => {
        
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

  const write = async () => {
    if (!address) return console.log("address is null");
    /*
    const batchCalls = getBatchCalls()
    console.log("batchCalls",batchCalls)
    walletClient?.sendCalls({
      account: address,
      calls: batchCalls as Call[],
    })
    return;
    */
    const transactionData = modules.map((module, index) => {
      console.log('module write===>', module);
      if(module.customInstructions){
        return module.customInstructions;
      }
      // 构建交易数据
      const data = encodeFunctionData({
        abi: [module.method],
        functionName: module.method.name,
        args: Object.values(module.params),
      });

      return [{
        data,
        to: module.contractAddress as Address,
      }];
    });

    console.log("Transaction data:", transactionData);

    // 将二维数组转为一维数组
    const flatTransactionData = transactionData.flat();

    // 构建最终交易对象
    const transactions = flatTransactionData.map((tx) => ({
      data: tx.data,
      to: tx.to,
    }));

    // console.log("batchCalls",getBatchCalls());

    console.log("Final transactions:", transactions);
    walletClient?.sendCalls({
      account: address,
      calls: transactions as Call[],
    })
  };

  return {
    write,
    status,
    data,
  };
};
