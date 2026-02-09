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
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3
      maxName = name;
    }
  }

  return maxName;
<<<<<<< HEAD
}


=======
}
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3
