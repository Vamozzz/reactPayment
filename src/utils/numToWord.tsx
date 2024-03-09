export default function numberToWords(num: number) {
  const units = [
    "",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  const teens = [
    "",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
  ];
  const tens = [
    "",
    "ten",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ];

  if (num === 0) {
    return "zero";
  }

  const thousands = Math.floor(num / 1000);
  const hundreds = Math.floor((num % 1000) / 100);
  const tensDigit = Math.floor((num % 100) / 10);
  const onesDigit = num % 10;

  let words = "";

  if (thousands > 0) {
    words += units[thousands] + " thousand ";
  }

  if (hundreds > 0) {
    words += units[hundreds] + " hundred ";
  }

  if (tensDigit === 1 && onesDigit > 0) {
    words += teens[onesDigit] + " ";
  } else {
    words += tens[tensDigit] + " ";
    words += units[onesDigit] + " ";
  }

  const newWord = words.trim();
  return newWord.charAt(0).toUpperCase() + newWord.slice(1);
}
