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
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9
      maxName = name;
    }
  }

  return maxName;
<<<<<<< HEAD
}


=======
}
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9
