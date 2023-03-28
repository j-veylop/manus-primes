export function getPrimes(max: number): number[] {
  const primes = [2];

  for (let num = 3; num < max; num += 2) {
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
