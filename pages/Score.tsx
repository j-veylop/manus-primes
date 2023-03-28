interface IScoreProps {
  streak: number
}

export default function Score({ streak }: IScoreProps) {
  if (!streak) return <></>;
  return <div className="flex flex-wrap gap-4 justify-center">
    {Array(Math.floor(streak / 5)).fill(0).map((_, index) => <span className="text-xl" key={index} role="img" aria-label="fueguito">🔥</span>)}
    {Array(streak % 5).fill(0).map((_, index) => <span className="text-xl" key={index} role="img" aria-label="flamingo">🦩</span>)}
  </div>;
}
