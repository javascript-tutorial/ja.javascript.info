function topSalary(salaries) {

<<<<<<< HEAD
  let max = 0;
  let maxName = null;

  for(let [name, salary] of Object.entries(salaries)) {
    if (max < salary) {
      max = salary;
=======
  let maxSalary = 0;
  let maxName = null;

  for(const [name, salary] of Object.entries(salaries)) {
    if (maxSalary < salary) {
      maxSalary = salary;
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b
      maxName = name;
    }
  }

  return maxName;
<<<<<<< HEAD
}


=======
}
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b
