"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TaskModule } from "@/lib/store";
import { useState } from "react";
import TokenSelectSingle from "./TokenSelectSingle";
import NotOpenAlert from "./NotOpenAlert";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowDownIcon } from "@radix-ui/react-icons";

interface SwapProps {
  module: TaskModule;
}

type DexType = "uniswap" | "pancake" | "SushiSwap";

interface DexOption {
  value: DexType;
  label: string;
  icon: string;
}

const dexOptions: DexOption[] = [
  { value: "uniswap", label: "Uniswap",icon:'https://dd.dexscreener.com/ds-data/dexes/uniswap.png' },
  { value: "pancake", label: "PancakeSwap",icon:'https://dd.dexscreener.com/ds-data/dexes/pancakeswap.png' },
  { value: "SushiSwap", label: "SushiSwap",icon:'https://dd.dexscreener.com/ds-data/dexes/sushiswap.png' },
];

const Swap = ({ module }: SwapProps) => {
  const [dex, setDex] = useState<DexType>("uniswap");
  const [fromToken, setFromToken] = useState("");
  const [toToken, setToToken] = useState("");
  const [amount, setAmount] = useState("");
  const [slippage, setSlippage] = useState("0.5");

  return (
    <div className="space-y-6 col-span-2">
      <NotOpenAlert message="Swap is not supported yet." />

      <div className="space-y-6 w-[600px] mx-auto border border-gray-100 rounded-lg p-4">
        {/* DEX Selection */}
        <Tabs defaultValue="uniswap" className="w-full" onValueChange={(value) => setDex(value as DexType)}>
          <TabsList className="grid w-full grid-cols-3">
            {dexOptions.map((option) => (
              <TabsTrigger key={option.value} value={option.value}>
                <div className="flex items-center gap-2">
                    <img src={option.icon} alt={option.label} className="w-4 h-4" />
                    {option.label}
                </div>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Swap Form */}
        <div className="space-y-4 p-4 rounded-lg border border-gray-100">
          {/* From Token */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-500">
              <span>From</span>
              <span>Balance: 0.00</span>
            </div>
            <div className="flex gap-2">
              <div className="w-[160px]">
                <TokenSelectSingle
                  value={fromToken}
                  onChange={setFromToken}
                />
              </div>
              <div className="flex-1">
                <Input
                  type="number"
                  placeholder="0.0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="h-10 bg-white text-base"
                />
              </div>
            </div>
          </div>

          {/* Swap Direction Arrow */}
          <div className="flex justify-center">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full border border-gray-200"
              onClick={() => {
                const temp = fromToken;
                setFromToken(toToken);
                setToToken(temp);
              }}
            >
              <i className="ri-arrow-up-down-line"></i> 
            </Button>
          </div>

          {/* To Token */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-500">
              <span>To</span>
              <span>Balance: 0.00</span>
            </div>
            <div className="flex gap-2">

              <div className="w-[160px]">
                <TokenSelectSingle
                  value={toToken}
                  onChange={setToToken}
                />
              </div>

              <div className="flex-1">
                <Input
                  type="number"
                  placeholder="0.0"
                  value={amount}
                  readOnly
                  className="h-10 bg-white text-base"
                />
              </div>
            </div>
          </div>

          {/* Slippage Settings */}
          <div className="space-y-2 pt-4">
            <div className="flex justify-between text-sm text-gray-500">
              <span>Slippage Tolerance</span>
              <span>{slippage}%</span>
            </div>
            <div className="flex gap-2">
              {["0.1", "0.5", "1.0"].map((value) => (
                <Button
                  key={value}
                  variant={slippage === value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSlippage(value)}
                >
                  {value}%
                </Button>
              ))}
              <div className="flex-1">
                <Input
                  type="number"
                  placeholder="Custom"
                  value={slippage}
                  onChange={(e) => setSlippage(e.target.value)}
                  className="h-9 bg-white"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Swap;
