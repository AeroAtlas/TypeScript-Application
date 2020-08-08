abstract class Department{
  // private readonly id: string;
  // private name: string;
  public static fiscalYear = 2020; //can also just be static fiscalYear = 2020
  private readonly work: string = 'DEFAULT';//can only be accessed through its class methods
  protected employees: string[] = [];//like private, but available for inheritence

  //Constructor
  constructor(protected readonly id: string, public name: string) {
    // this.name = n;
    // this.id = id;
    //console.log(this.fiscalYear) //this will not work be this is instance not static
    console.log(Department.fiscalYear) //this will work though
  }
  //Methods
  static createEmployee(name: string) {
    return {name: name}
  }
  //Abstract methods required by all inheritents 
  abstract describe(this: Department): void;

  addEmployee(employee: string){
    this.employees.push(employee)
  }
  printEmployeeInfo(this: Department) {
    console.log(this.employees.length)
    console.log(this.employees)
    console.log(this.work)
  }
}
//Inheritance
class ITDepartment extends Department {
  public admins: string[];
  constructor(id: string, admins: string[]) {
    super(id, 'IT'); //calls base constructor
    this.admins = admins;

  }
  describe() {
    console.log('IT Department - ID: ' + this.id)
  }
}

class AccountingDepartment extends Department {
  private lastReport: string;
  private static instance: AccountingDepartment;

  //Getter lets you access otherwise private values
  get recentReport() {
    if (this.lastReport) {
      return this.lastReport;
    } //has to return something
    throw new Error('No report found');
  }

  //Setter
  set recentReport(value: string) {
    if (!value) {
      throw new Error('Please pass in a value')
    }
    this.addReport(value);
  }

  private constructor(id: string, private reports: string[]) {
    super(id, 'Accounting');
    this.lastReport = reports[0];
  }

  //Singleton
  static getInstance(id:string, array:string[]) {
    if (this.instance) { //can also be AccoutingDepartment.instance
      return this.instance //return existing instance 
    }
    this.instance = new AccountingDepartment(id, array)
    return this.instance//create instance
  }

  describe() {
    console.log('Accounting Department - ID: ' + this.id)
  }
  addEmployee(name: string) {//overwrites Department addEmployee when using accountingdepo
    if (name === 'Max') {
      return;
    } else {
      this.employees.push(name)
    }
  }
  addReport(text: string) {
    this.reports.push(text)
    this.lastReport = text;
  }
  printReports(this:AccountingDepartment) {
    console.log(this.reports);
  }
}

const employee1 = Department.createEmployee('Maxman');
console.log(employee1, Department.fiscalYear)

// const accounting = new Department('D15G', 'Accounting');
const it = new ITDepartment('d1', ['Max']);

//math
let number = Math.ceil(Math.pow(5,2))

it.addEmployee('Max');
it.addEmployee('Bob');
//accounting.employees[2] = 'Anna' // won't work with private

it.describe();
console.log(it)

const accounting = AccountingDepartment.getInstance('d2', []);
const accounting2 = AccountingDepartment.getInstance('d3', ['bob']);
console.log(accounting)
console.log(accounting2)

accounting.recentReport = "Something went right!";
accounting.addReport('Something went wrong');
console.log(accounting.recentReport);



accounting.addEmployee('Max');
accounting.addEmployee('Bobetta')

// accounting.printReports();
// accounting.printEmployeeInfo();
accounting.describe();


// const accountingCopy = { name: 'Dummy', job: accounting.job, employees: [], describe: accounting.describe }
// console.log(accountingCopy);
// accountingCopy.describe();

