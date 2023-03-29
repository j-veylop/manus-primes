import { useEffect, useState } from "react"

const MAX_NUM = 2 ** 14;

function getPrimes() {
  const primes = [2];

  for (let num = 3; num < MAX_NUM; num += 2) {
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


function resetScore() {
  localStorage.clear();
  window.location.reload();
}

export default function Home() {

  const [num, setNum] = useState(0);
  const [answer, setAnswer] = useState<boolean | null>(null);
  const [primes, setPrimes] = useState<number[]>([]);

  const [rightPrimes, setrightPrimes] = useState(0);
  const [rightAnswers, setRightAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [totalPrimes, setTotalPrimes] = useState(0);

  const [numberList, setNumberList] = useState<number[]>([]);

  function generateNumber(): number {    
    const localNum = Math.floor(Math.random() * MAX_NUM);
    if (localNum % 2 === 0 || localNum % 5 === 0) return generateNumber();
    return localNum;
  }

  const isPrime = (num: number) => {
    return primes.includes(num);
  }

  const answerQuestion = (val: boolean) => {
    setAnswer(val);
  }

  useEffect(() => {
    // Load the stored values
    setrightPrimes(parseInt(localStorage.getItem('rightPrimes') || '0'));
    setRightAnswers(parseInt(localStorage.getItem('rightAnswers') || '0'));
    setWrongAnswers(parseInt(localStorage.getItem('wrongAnswers') || '0'));
    setTotalPrimes(parseInt(localStorage.getItem('totalPrimes') || '0'));
    let numList: number[] = [];
    
    if (!localStorage.numberList) {
      numList = [];
    } else {
      if (localStorage.numberList.at(0) === ',') {
        localStorage.numberList = localStorage.numberList.at(0);
      }
      try {
        numList = JSON.parse(`[${localStorage.getItem('numberList')}]`);
      } catch (err: any) {
        console.error(err.message);
      }
    }
    setNumberList(numList);
    // Initialize the game
    setPrimes(getPrimes());
    setNum(generateNumber());
  }, []);

  useEffect(() => {
    if (answer !== null) {
      localStorage.numberList = [...numberList, num].sort((a, b) => (a - b));
      setNumberList(numberList => [...numberList, num].sort((a, b) => (a - b)));

      if (isPrime(num)) {
        localStorage.totalPrimes = totalPrimes + 1;
        setTotalPrimes(totalPrimes => totalPrimes + 1);
      }

      if (answer === isPrime(num)) {
        if (isPrime(num)) {
          localStorage.rightPrimes = rightPrimes + 1;
          setrightPrimes(rightPrimes => rightPrimes + 1);
        } 
        localStorage.rightAnswers = rightAnswers + 1;
        setRightAnswers(rightAnswers => rightAnswers + 1);
        alert(`Correct 👌, ${num} is ${isPrime(num) ? "" : "not "}prime!`);
      } else {
        localStorage.wrongAnswers = wrongAnswers + 1;
        setWrongAnswers(wrongAnswers => wrongAnswers + 1);
        alert(`Wrong ❌, ${num} is ${isPrime(num) ? "" : "not "}prime!`);
      }
      setNum(generateNumber());
      setAnswer(null);
    }
  }, [answer]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-4xl text-center gap-12 px-12 py-16">
      <p>Is {num} prime?</p>
      <div className="flex flex-row gap-4 text-white w-full">
        <button className="bg-dune-alive rounded-md p-4 w-full" onClick={() => answerQuestion(true)}>Yes</button>
        <button className="bg-dune-alive rounded-md p-4 w-full" onClick={() => answerQuestion(false)}>No</button>
      </div>
      <div className="flex flex-col gap-4 text-sm text-center">
        <p>Right primes guessed: {rightPrimes}</p>
        <p>Total primes: {totalPrimes}</p>
        <p>Right answers: {rightAnswers}</p>
        <p>Wrong answers: {wrongAnswers}</p>
        <p>Percentage of right answers: {(100 * rightAnswers / (rightAnswers + wrongAnswers) || 0).toFixed(2)} %</p>
        <p>Percentage of primes guessed correctly: {(100 * rightPrimes / totalPrimes || 0).toFixed(2)} %</p>
      </div>
      {/* Spotify embed */}
      <iframe src="https://open.spotify.com/embed/album/0RcgQYkpfKAhg7dyoXoPm8?utm_source=generator" width="100%" height="352" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
      <div className="flex flex-col gap-2">
        {numberList.map((num, index) => <p className={`text-xs ${isPrime(num) ? 'font-bold' : ''}`} key={index}>{num}</p>)}
      </div>
      <button onClick={() => resetScore()} className="bg-dune-alive rounded-md p-4 w-full text-white">
        Clear Score
      </button>
    </div>
  )
}
