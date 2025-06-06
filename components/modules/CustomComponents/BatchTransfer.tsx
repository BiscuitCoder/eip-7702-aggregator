"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TaskModule } from "@/lib/store";
import { PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import TokenSelectSingle from "./TokenSelectSingle";
import { Alert } from "@/components/ui/alert";
import NotOpenAlert from "./NotOpenAlert";

interface TransferItem {
  address: string;
  amount: string;
  token: string;
}

interface BatchTransferProps {
  module: TaskModule;
}

const BatchTransfer = ({ module }: BatchTransferProps) => {
  const [transfers, setTransfers] = useState<TransferItem[]>([
    { address: '', amount: '', token: '' },
  ]);

  const handleAddTransfer = () => {
    setTransfers([...transfers, { address: '', amount: '', token: '' }]);
  };

  const handleRemoveTransfer = (index: number) => {
    const newTransfers = transfers.filter((_, i) => i !== index);
    setTransfers(newTransfers);
  };

  const handleTransferChange = (
    index: number,
    field: keyof TransferItem,
    value: string
  ) => {
    const newTransfers = transfers.map((transfer, i) => {
      if (i === index) {
        return { ...transfer, [field]: value };
      }
      return transfer;
    });
    setTransfers(newTransfers);
  };

  return (
    <div className="space-y-6 col-span-2">
        
        <NotOpenAlert message="Batch transfer is not supported yet." />

      <div className="space-y-4">
        {transfers.map((transfer, index) => (
          <div key={index} className="flex items-end gap-4 p-4 rounded-lg border border-gray-100">
            <div className="w-[160px]">
              <TokenSelectSingle
                value={transfer.token}
                onChange={(value) => handleTransferChange(index, "token", value)}
              />
            </div>
            <div className="w-[160px]">
              <Input
                id={`amount-${index}`}
                type="number"
                placeholder="Enter amount"
                value={transfer.amount}
                onChange={(e) =>
                  handleTransferChange(index, "amount", e.target.value)
                }
                className="h-10 bg-white"
              />
            </div>
            <div className="flex-1">
              <Input
                id={`address-${index}`}
                placeholder="Enter recipient address"
                value={transfer.address}
                onChange={(e) =>
                  handleTransferChange(index, "address", e.target.value)
                }
                className="h-10 bg-white"
              />
            </div>

            {transfers.length > 1 && (
              <Button
                variant="ghost"
                size="icon"
                className="text-red-600 hover:text-red-700 hover:bg-red-50 h-10 w-10"
                onClick={() => handleRemoveTransfer(index)}
              >
                <TrashIcon className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <Button 
          variant="outline" 
          onClick={handleAddTransfer}
          className="h-10 px-6 hover:bg-gray-50"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Transfer
        </Button>
      </div>
    </div>
  );
};

export default BatchTransfer;
