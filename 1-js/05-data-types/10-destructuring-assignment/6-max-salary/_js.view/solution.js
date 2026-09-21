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
>>>>>>> 20208769e528337949e946f526534d61d38bac47
      maxName = name;
    }
  }

  return maxName;
<<<<<<< HEAD
}


=======
}
>>>>>>> 20208769e528337949e946f526534d61d38bac47
