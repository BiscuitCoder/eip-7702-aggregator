"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TOKENS } from "@/contracts/tokens";
import Image from "next/image";

interface TokenSelectSingleProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const TokenSelectSingle = ({ value, onChange, className }: TokenSelectSingleProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={`h-10 bg-white ${className}`}>
        <SelectValue placeholder="Select Token">
          {value && (
            <div className="flex items-center gap-2">
              <Image
                src={TOKENS.find((t) => t.address === value)?.icon || ""}
                alt="token"
                width={20}
                height={20}
                className="rounded-full"
              />
              <span>
                {TOKENS.find((t) => t.address === value)?.symbol}
              </span>
            </div>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {TOKENS.map((token) => (
          <SelectItem key={token.address} value={token.address}>
            <div className="flex items-center gap-2">
              <Image
                src={token.icon || ""}
                alt={token.symbol}
                width={20}
                height={20}
                className="rounded-full"
              />
              <span>{token.symbol}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default TokenSelectSingle;
