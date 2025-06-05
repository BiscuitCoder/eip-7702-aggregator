import { useState } from "react"
import { Token } from "@/contracts/tokens"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface TokenSelectProps {
    tokens: Token[]
    onChange?: (selectedTokens: Token[]) => void
}

const TokenSelect = ({ tokens, onChange }: TokenSelectProps) => {
    const [selectedTokens, setSelectedTokens] = useState<Token[]>([])

    const handleTokenChange = (token: Token, checked: boolean) => {
        const newSelectedTokens = checked 
            ? [...selectedTokens, token]
            : selectedTokens.filter(t => t.address !== token.address)
        
        setSelectedTokens(newSelectedTokens)
        onChange?.(newSelectedTokens)
    }

    return (
        <div className="space-y-2 grid grid-cols-5 gap-2">
            {tokens.map((token) => (
                <div key={token.address} className="flex items-center space-x-2 cursor-pointer">
                    <Checkbox
                        id={token.address}
                        onCheckedChange={(checked) => handleTokenChange(token, checked as boolean)}
                    />
                    <Label htmlFor={token.address} className="text-sm font-normal flex items-center space-x-2">
                        <img src={token.icon} alt={token.symbol} className="w-4 h-4" />
                        <span>{token.symbol} ({token.name})</span>
                    </Label>
                </div>
            ))}
        </div>
    )
}

export default TokenSelect