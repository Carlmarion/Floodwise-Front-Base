function GradientSeparator({ className = "" }: { className?: string }) {
  return (
    <div
      className={`h-[5px] w-full ${className}`}
      style={{
        background:
          "linear-gradient(to right, #5e59ff 0%, #00deff 50%, #00ffb8 100%)",
      }}
    />
  );
}

export { GradientSeparator };
