import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 截断字符串
export function truncateString(str: string, showLength: number = 6): string {
  if (str.length <= showLength*2) {
      return str;
  }
  
  const start = str.substring(0, showLength);
  const end = str.substring(str.length - showLength);
  
  return `${start}...${end}`;
}