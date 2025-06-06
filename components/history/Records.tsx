import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { truncateString } from "@/lib/utils";
import { ExternalLink } from "lucide-react";

// Mock transaction data
const mockTransactions = [
  {
    hash: "0x3bf9ccc4c4a2b37115d569e531d76823d112e17577b81fc5b74d5c46d762f9e9",
    timestamp: "03/20 10:30:00",
    operations: [
      { type: "Approve", token: "USDC", amount: "1000 -> 0x92b7...8f3121" },
      { type: "Transfer", token: "BNB", amount: "0.5 -> 0x92b7...8f3121" },
      { type: "Swap(Pancake)", token: "BNB(0.5) -> USDC(1000)" },
    ],
  },
  {
    hash: "0x75b86a0ac5f75028a2d595807ba5e970cddbf0da1799d6f3baa8fa161fa10696",
    timestamp: "03/20 09:15:00",
    operations: [
      { type: "Approve", token: "USDT", amount: "2000 -> 0x92b7...8f3121" },
      { type: "Swap(Uniswap)", token: "USDT(2000) -> BNB(1.0)" },
    ],
  },
];

const getOperationEmoji = (type: string) => {
  switch (type) {
    case "Approve":
      return "✅";
    case "Transfer":
      return "💸";
    case "Swap(Pancake)":
    case "Swap(Uniswap)":
      return "🔄";
    default:
      return "📝";
  }
};

const Records = () => {
  const handleViewOnExplorer = (hash: string) => {
    window.open(`https://bscscan.com/tx/${hash}#eventlog`, "_blank");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="font-medium shadow-lg shadow-[#00000013] rounded-[10px]">
            <i className="ri-file-history-line text-lg"></i>
            <span>History</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Transaction History (Mock)</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-sh-[80vh] pr-4">
          <div className="space-y-4">
            {mockTransactions.map((tx, index) => (
              <div
                key={index}
                className="rounded-lg border p-4 hover:border-black cursor-pointer transition-colors duration-200"
              >
                <div className="flex items-center justify-between mb-2">

                  <div className="font-mono text-sm bg-muted/50 px-2 py-1 rounded">
                    <span>{tx.timestamp}</span> 
                  </div>

                  <span className="flex items-center gap-2">
                    <small className="opacity-50">{truncateString(tx.hash, 10)}</small>
                    <ExternalLink className="h-4 w-4 text-muted-foreground hover:text-primary"  onClick={() => handleViewOnExplorer(tx.hash)}/>
                  </span>
                </div>
                <div className="space-y-2">
                  {tx.operations.map((op, opIndex) => (
                    <div
                      key={opIndex}
                      className="text-sm flex items-center justify-between border border-gray-200 p-2 rounded hover:bg-muted"
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-base">{getOperationEmoji(op.type)}</span>
                        {op.type}
                      </span>
                      <span className="font-mono px-2 py-1 rounded">
                        {op.token} {op.amount ? `: ${op.amount}` : ''}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default Records;