import { Abi, Address } from "viem"
import EIP7702Abi from "./EIP7702Abi.json"

export const CONTRACT_CONFIG = {
    EIP7702: {
        address: "0x80296ff8d1ed46f8e3c7992664d13b833504c2bb" as Address,
        abi: EIP7702Abi as Abi
    }
}