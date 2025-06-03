interface MethodIconProps {
  letter: string;
}

export function MethodIcon({ letter }: MethodIconProps) {
  return (
    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
      {letter.toUpperCase()}
    </div>
  );
} 