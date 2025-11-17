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
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
      maxName = name;
    }
  }

  return maxName;
<<<<<<< HEAD
}


=======
}
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
