import { useEffect, useState } from "react"

const MAX_NUM = 2 ** 14;

function getPrimes() {
  const primes = [2];

  for (let num = 3; num < MAX_NUM; num+=2) {
    for (const prime of primes) {
      if (num % prime === 0) {
        break;
      }
      if (prime * prime > num) {
        primes.push(num);
        break;
      }
    }
  }

  return primes;
}

function generateNumber() {
  return Math.floor(Math.random() * MAX_NUM);
}

export default function Home() {

  const [num, setNum] = useState(0);
  const [answer, setAnswer] = useState<boolean | null>(null);
  const [primes, setPrimes] = useState<number[]>([]);

  const [rightAnswers, setRightAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [totalPrimes, setTotalPrimes] = useState(0);

  const isPrime = (num: number) => {
    return primes.includes(num);
  }

  useEffect(() => {
    setPrimes(getPrimes());
    setNum(generateNumber());
  }, []);

  useEffect(() => {
    if (answer !== null) {
      if (isPrime(num)) setTotalPrimes(totalPrimes + 1);

      if (answer === isPrime(num)) {
        setRightAnswers(rightAnswers + 1);
        alert(`Correct, ${num} is ${isPrime(num) ? "" : "not "}prime!`);
      } else {
        setWrongAnswers(wrongAnswers + 1);
        alert(`Wrong, ${num} is ${isPrime(num) ? "" : "not "}prime!`);
      }
      setNum(generateNumber());
      setAnswer(null);
    }
  }, [answer]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-4xl gap-32">
      <p>Is {num} prime?</p>
      <div className="flex flex-row gap-4 text-white">
        <button className="bg-blue-600 rounded-md p-4 w-24" onClick={() => setAnswer(true)}>Yes</button>
        <button className="bg-blue-600 rounded-md p-4 w-24" onClick={() => setAnswer(false)}>No</button>
      </div>
      <div className="flex flex-col gap-4 text-xl text-center">
        <p>Right answers: {rightAnswers}</p>
        <p>Wrong answers: {wrongAnswers}</p>
        <p>Total primes: {totalPrimes}</p>
        <p>Prime percentage: {(100 * primes.length / MAX_NUM).toFixed(2)} %</p>
        <p>Current run prime percentage: {(100 * (totalPrimes / (rightAnswers + wrongAnswers)) || 0).toFixed(2)} %</p>
      </div>
    </div>
  )
}
