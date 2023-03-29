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




export default function Home() {

  const [num, setNum] = useState(0);
  const [answer, setAnswer] = useState<boolean | null>(null);
  const [primes, setPrimes] = useState<number[]>([]);

  const [rightPrimes, setrightPrimes] = useState(0);
  const [rightAnswers, setRightAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [totalPrimes, setTotalPrimes] = useState(0);

  const [currentStreak, setCurrentStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);

  const [numberList, setNumberList] = useState<number[]>([]);

  function resetScore() {
    if (window.confirm('Reset score?')) {
      localStorage.clear();
      // window.location.reload();
      reloadLocalVars();
    }
  }

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

  const handler = (e: { code: string; ctrlKey: boolean }) => {
    if (e.ctrlKey) {
      return;
    }

    if (e.code === 'KeyY') {
      answerQuestion(true);
    }

    if (e.code === 'KeyN') {
      answerQuestion(false);
    }

    if (e.code === 'KeyR') {
      resetScore();
    }
  }

  function reloadLocalVars() {
    setrightPrimes(parseInt(localStorage.getItem('rightPrimes') || '0'));
    setRightAnswers(parseInt(localStorage.getItem('rightAnswers') || '0'));
    setWrongAnswers(parseInt(localStorage.getItem('wrongAnswers') || '0'));
    setTotalPrimes(parseInt(localStorage.getItem('totalPrimes') || '0'));
    setCurrentStreak(parseInt(localStorage.getItem('currentStreak') || '0'));
    setMaxStreak(parseInt(localStorage.getItem('maxStreak') || '0'));

    let numList: number[] = [];
    if (localStorage.numberList) {
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
  }

  useEffect(() => {
    document.addEventListener('keydown', handler);
    // Load the stored values
    reloadLocalVars();

    // Initialize the game
    setPrimes(getPrimes());
    setNum(generateNumber());

    return () => {
      document.removeEventListener('keydown', handler);
    }
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
        localStorage.currentStreak = currentStreak + 1;
        setCurrentStreak(currentStreak => currentStreak + 1);
        if (currentStreak > maxStreak) {
          localStorage.maxStreak = maxStreak + 1;
          setMaxStreak(maxStreak => maxStreak + 1)
        }
        if (isPrime(num)) {
          localStorage.rightPrimes = rightPrimes + 1;
          setrightPrimes(rightPrimes => rightPrimes + 1);
        }
        localStorage.rightAnswers = rightAnswers + 1;
        setRightAnswers(rightAnswers => rightAnswers + 1);
        alert(`Correct 👌, ${num} is ${isPrime(num) ? "" : "not "}prime!`);
      } else {
        localStorage.currentStreak = 0;
        setCurrentStreak(0);
        localStorage.wrongAnswers = wrongAnswers + 1;
        setWrongAnswers(wrongAnswers => wrongAnswers + 1);
        alert(`Wrong ❌, ${num} is ${isPrime(num) ? "" : "not "}prime!`);
      }
      setNum(generateNumber());
      setAnswer(null);
    }
  }, [answer]);

  return (
    <div className="flex flex-col bg-purple-100 items-center justify-center min-h-screen text-4xl text-center gap-12 px-12 py-16">
      <p>Is {num} prime?</p>
      <div className="flex flex-row gap-4 text-white w-full">
        <button className="bg-dune-alive rounded-md p-4 w-full" onClick={() => answerQuestion(true)}>Yes</button>
        <button className="bg-dune-alive rounded-md p-4 w-full" onClick={() => answerQuestion(false)}>No</button>
      </div>
      <div className="flex flex-col gap-4 text-sm text-center">
        <p>Current Streak: {currentStreak}</p>
        <p>Max Streak: {maxStreak}</p>
        <p>Right primes guessed: {rightPrimes}</p>
        <p>Total primes: {totalPrimes}</p>
        <p>Right answers: {rightAnswers}</p>
        <p>Wrong answers: {wrongAnswers}</p>
        <p>Percentage of right answers: {(100 * rightAnswers / (rightAnswers + wrongAnswers) || 0).toFixed(2)} %</p>
        <p>Percentage of right primes: {(100 * rightPrimes / totalPrimes || 0).toFixed(2)} %</p>
      </div>
      {/* Spotify embed */}
      <iframe title="dune alive on spotify" src="https://open.spotify.com/embed/album/0RcgQYkpfKAhg7dyoXoPm8?utm_source=generator" width="100%" height="512" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
      <div className="flex flex-col gap-2">
        {numberList.map((num, index) => <p className={`text-xs ${isPrime(num) ? 'font-bold' : ''}`} key={index}>{num}</p>)}
      </div>
      <button onClick={() => resetScore()} className="bg-dune-alive rounded-md p-4 w-full text-white">
        Clear Score
      </button>
    </div>
  )
}
