import Image from 'next/image'

interface IScoreProps {
  streak: number
}

export default function Score({ streak }: IScoreProps) {
  if (!streak) return <></>;
  return <div className="flex flex-wrap gap-4 justify-center items-center">
    {Array(Math.floor(streak / 5)).fill(0).map((_, index) => <Image src="/manu.jpg" key={index} alt="manu" width="48" height="48"/>)}
    {Array(Math.floor(streak % 5)).fill(0).map((_, index) => <span className="text-4xl" key={index} role="img" aria-label="fueguito">🔥</span>)}
  </div>;
}
