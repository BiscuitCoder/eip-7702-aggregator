import { TaskModule, useTaskStore } from "@/lib/store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import TokenSelect from "./TokenSelect";
import { Token, TOKENS } from "@/contracts/tokens";
import { Abi, AbiItem, Address, encodeFunctionData, erc20Abi, parseUnits } from "viem";

const BatchApprove = (module: TaskModule) => {
  const updateModule = useTaskStore((state) => state.updateModule);
  const [amount, setAmount] = useState("");
  const [spenderAddress, setSpenderAddress] = useState("");
  const [selectedTokens, setSelectedTokens] = useState<Token[]>([]);

  // token选择
  const tokens = TOKENS.filter((token) => !token.isNative);
  const handleTokenChange = (tokens: Token[]) => {
    console.log(tokens);
    setSelectedTokens(tokens);
  };


  console.log('module22===>', module);

  useEffect(() => {
    if(!selectedTokens.length) return;
    try {
        const instructions = selectedTokens.map(token => {
            const data = encodeFunctionData({
                abi:erc20Abi,
                functionName: 'approve',
                args: [
                    spenderAddress as Address,
                    parseUnits(amount, token.decimals)
                ]
            })
            return {
                data,
                to:token.address as Address,
            }
        })
    
        console.log('instructions===>', instructions);
    
        updateModule(module.id, {
          params: {
            ...module.params,
            selectedTokens,
            spenderAddress,
            amount,
          },
          customInstructions: instructions,
        });
    } catch (error) {
        console.log('error===>', error);
    }
  }, [selectedTokens]);

  return (
    <>
      {/* Token Selection */}
      <div className="space-y-2 col-span-2">
        <Label>Select Tokens</Label>
        <TokenSelect tokens={tokens} onChange={handleTokenChange} />
      </div>

      {/* Spender Address */}
      <div className="space-y-2">
        <Label htmlFor="spenderAddress">Spender Address</Label>
        <Input
          id="spenderAddress"
          placeholder="Enter spender address"
          value={spenderAddress}
          onChange={(e) => setSpenderAddress(e.target.value)}
        />
      </div>

      {/* Amount */}
      <div className="space-y-2">
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          placeholder="Enter approval amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
    </>
  );
};

export default BatchApprove;
