import fs from "fs";
import path from "path";

class NumberSorter {
  // Private ListOfNumbers Array
  public ListOfNumbers: number[] = [];

  // constructor(ListOfNumbers:number[]){
  //     this.ListOfNumbers=ListOfNumbers;
  // }

  // Read the list of numbers from the input file
  public readFromFile(inputFile: string): void {
    try {
      const data = fs.readFileSync(path.join(__dirname, inputFile), "utf-8");
      const values = data.split(", ");
      for (const value of values) {
        const num = Number(value.trim());
        if (!isNaN(num)) {
          this.ListOfNumbers.push(num);
        }
      }
    } catch (err) {
      console.error(`Error reading from file: ${inputFile}`);
      console.log(err);
      process.exit(1);
    }
  }

  // Method for sorting List of numbers
  public sortIntoDescending(): void {
    this.ListOfNumbers = this.mergeSort(this.ListOfNumbers);
  }

  // Applied merge sort---> a sorting algorithm with worst complexity of O(n log n)
  public mergeSort(numbers: number[]): number[] {
    if (numbers.length <= 1) {
      return numbers;
    }

    const mid = Math.floor(numbers.length / 2);
    const left = numbers.slice(0, mid);
    const right = numbers.slice(mid);

    return this.mergeDescending(this.mergeSort(left), this.mergeSort(right));
  }

  public mergeDescending(left: number[], right: number[]): number[] {
    let result: number[] = [];

    while (left.length && right.length) {
      if (right[0] > left[0]) {
        result.push(right.shift()!);
      } else {
        result.push(left.shift()!);
      }
    }

    return result.concat(left.slice()).concat(right.slice());
  }

  // Write the sorted list of numbers to the output file
  public writeToFile(outputFile: string): void {
    try {
      const data = this.ListOfNumbers.join(", ");
      fs.writeFileSync(path.join(__dirname, outputFile), data);
    } catch (err) {
      console.error(`Error writing to file: ${outputFile}`);
      console.error(err);
      process.exit(1);
    }
  }
}

function main() {
  // const file = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");
  // const [list] = file.split("\n");
  // const result = list;
  // fs.writeFileSync(path.join(__dirname, "output.txt"), result.toString());

  const numberSorter = new NumberSorter();

  // Calling the ReadFile Method
  numberSorter.readFromFile("input.txt");

  // Calling the Number sorting Method
  numberSorter.sortIntoDescending();

  // Calling the WriteFile Method
  numberSorter.writeToFile("output.txt");

  console.log(
    `Sucessfully sorted ${numberSorter.ListOfNumbers.length} numbers and written into File output.txt!`
  );
}
main();

export {};
