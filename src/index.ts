import fs from "fs";
import path from "path";

enum SortingOrder {
  Ascending = "asc",
  Descending = "desc",
}

enum SortingAlgorithm {
  MergeSort = "merge",
  QuickSort = "quick",
}

class NumberSorter {
  // Private ListOfNumbers Array
  public ListOfNumbers: number[] = [];

  // constructor(ListOfNumbers:number[]){
  //     this.ListOfNumbers=ListOfNumbers;
  // }

  // Read the list of numbers from the input file
  public readFromFile(inputFile: string): void {
    let _data=[];
    try {
      const data = fs.readFileSync(path.join(__dirname, inputFile), "utf-8");
      // console.log(data);
      _data=[...data];
      for(let i=0; i<=1000000;i++){
        let j=Math.floor((Math.random()*i))
        _data.push(j.toString());
      }
      console.log(_data);
      // const __data=_data.toString();
      // const values = _data.split(", ");
      for (const value of _data) {
        const num = Number(value);
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

  // Sort the list of numbers in ascending order using Merge Sort algorithm
  public sortAscending(): void {
    this.ListOfNumbers = this.mergeSortAscending(this.ListOfNumbers);
  }

  private mergeSortAscending(number: number[]): number[] {
    if (number.length <= 1) {
      return number;
    }

    const mid = Math.floor(number.length / 2);
    const left = number.slice(0, mid);
    const right = number.slice(mid);

    return this.mergeAscending(
      this.mergeSortAscending(left),
      this.mergeSortAscending(right)
    );
  }

  private mergeAscending(left: number[], right: number[]): number[] {
    let result: number[] = [];

    while (left.length && right.length) {
      if (left[0] < right[0]) {
        result.push(left.shift()!);
      } else {
        result.push(right.shift()!);
      }
    }

    return result.concat(left.slice()).concat(right.slice());
  }

  // Sort the list of numbers in descending order using Merge Sort algorithm
  public sortDescending(): void {
    this.ListOfNumbers = this.mergeSortDescending(this.ListOfNumbers);
  }

  private mergeSortDescending(number: number[]): number[] {
    if (number.length <= 1) {
      return number;
    }

    const mid = Math.floor(number.length / 2);
    const left = number.slice(0, mid);
    const right = number.slice(mid);

    return this.mergeDescending(
      this.mergeSortDescending(left),
      this.mergeSortDescending(right)
    );
  }

  private mergeDescending(left: number[], right: number[]): number[] {
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

  // Sort the list of numbers in ascending order using Quick Sort algorithm
  public sortAscendingQuickSort(): void {
    this.quickSortAscending(
      this.ListOfNumbers,
      0,
      this.ListOfNumbers.length - 1
    );
  }

  private partitionAscending(
    numbers: number[],
    low: number,
    high: number
  ): number {
    const pivot = numbers[high];
    let i = low - 1;
    for (let j = low; j <= high - 1; j++) {
      if (numbers[j] < pivot) {
        i++;
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
      }
    }
    [numbers[i + 1], numbers[high]] = [numbers[high], numbers[i + 1]];
    return i + 1;
  }

  private quickSortAscending(
    numbers: number[],
    low: number,
    high: number
  ): void {
    if (low < high) {
      const pi = this.partitionAscending(numbers, low, high);
      this.quickSortAscending(numbers, low, pi - 1);
      this.quickSortAscending(numbers, pi + 1, high);
    }
  }

  // Sort the list of numbers in descending order using Quick Sort algorithm
  public sortDescendingQuickSort(): void {
    this.quickSortDescending(
      this.ListOfNumbers,
      0,
      this.ListOfNumbers.length - 1
    );
  }

  private partitionDescending(
    numbers: number[],
    low: number,
    high: number
  ): number {
    const pivot = numbers[high];
    let i = low - 1;
    for (let j = low; j <= high - 1; j++) {
      if (numbers[j] > pivot) {
        i++;
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
      }
    }
    [numbers[i + 1], numbers[high]] = [numbers[high], numbers[i + 1]];
    return i + 1;
  }

  private quickSortDescending(
    numbers: number[],
    low: number,
    high: number
  ): void {
    if (low < high) {
      const pi = this.partitionDescending(numbers, low, high);
      this.quickSortDescending(numbers, low, pi - 1);
      this.quickSortDescending(numbers, pi + 1, high);
    }
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

function main(): void {
  // const file = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");
  // const [list] = file.split("\n");
  // const result = list;
  // fs.writeFileSync(path.join(__dirname, "output.txt"), result.toString());
  const argv = process.argv.slice(2);

  if (argv.length !== 4) {
    console.log(
      "ERROR💥...Usage! Please run the command npm start <your_input_file.txt> <your_output_file.txt> <sorting_order> <sorting_Algo>"
    );
    console.log(
      `Sorting order should be "asc" for ascending and "desc" for descending!`
    );
    process.exit(1);
  }

  const inputFile = argv[0];
  const outputFile = argv[1];
  const sortedOrder =
    argv[2] === SortingOrder.Ascending
      ? SortingOrder.Ascending
      : SortingOrder.Descending;

  const algoName =
    argv[3] === SortingAlgorithm.MergeSort
      ? SortingAlgorithm.MergeSort
      : SortingAlgorithm.QuickSort;

  const numberSorter = new NumberSorter();

  // Calling the ReadFile Method
  numberSorter.readFromFile(inputFile);

  const startTime=process.hrtime()

  // Calling the Number sorting Method
  if (
    sortedOrder === SortingOrder.Ascending &&
    algoName === SortingAlgorithm.MergeSort
  ) {
    numberSorter.sortAscending();
  } else if (
    sortedOrder === SortingOrder.Descending &&
    algoName === SortingAlgorithm.MergeSort
  ) {
    numberSorter.sortDescending();
  } else if (
    sortedOrder === SortingOrder.Ascending &&
    algoName === SortingAlgorithm.QuickSort
  ) {
    numberSorter.sortAscendingQuickSort();
  } else if (
    sortedOrder === SortingOrder.Descending &&
    algoName === SortingAlgorithm.QuickSort
  ) {
    numberSorter.sortDescendingQuickSort();
  } else {
    console.log("Error💥..Please select the sorting order and sorting algo..");
  }

  const endTime=process.hrtime(startTime)
  // Calling the WriteFile Method
  numberSorter.writeToFile(outputFile);

  const executionTime = endTime[0] + endTime[1] / 1e9;

  console.log(
    `Sucessfully sorted ${numberSorter.ListOfNumbers.length} numbers into ${sortedOrder} ending order using ${algoName} sort and written to File output.txt!`
  );
  console.log(`The program execution time is ${executionTime} seconds.`);
}
main();
