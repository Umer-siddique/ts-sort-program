import fs from "fs";
import path from "path";


enum SortingOrder{
  Ascending="asc",
  Descending="desc",
}

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

    return this.mergeAscending(this.mergeSortAscending(left), this.mergeSortAscending(right));
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

    return this.mergeDescending(this.mergeSortDescending(left), this.mergeSortDescending(right));
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

function main():void {
  // const file = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");
  // const [list] = file.split("\n");
  // const result = list;
  // fs.writeFileSync(path.join(__dirname, "output.txt"), result.toString());
  const argv=process.argv.slice(2);

  if(argv.length !== 3){
    console.log("ERROR💥...Usage! Please run the command npm start <your_input_file.txt> <your_output_file.txt> <sorting_order>");
    console.log(`Sorting order should be "asc" for ascending and "desc" for descending!`)
    process.exit(1);
  }

  

  const inputFile=argv[0];
  const outputFile=argv[1];
  const sortedOrder = argv[2] === SortingOrder.Ascending ? SortingOrder.Ascending : SortingOrder.Descending;


  const numberSorter = new NumberSorter();

  // Calling the ReadFile Method
  numberSorter.readFromFile(inputFile);

  // Calling the Number sorting Method
  if(sortedOrder===SortingOrder.Ascending){
    numberSorter.sortAscending();
  }else{
    numberSorter.sortDescending();
  }

  // Calling the WriteFile Method
  numberSorter.writeToFile(outputFile);

  console.log(
    `Sucessfully sorted ${numberSorter.ListOfNumbers.length} numbers into ${sortedOrder}ending order and written to File output.txt!`
  );
}
main();

