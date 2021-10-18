describe("groupById", function() {

  it("creates an object grouped by id", function() {
    let users = [
      {id: 'john', name: "John Smith", age: 20},
      {id: 'ann', name: "Ann Smith", age: 24},
      {id: 'pete', name: "Pete Peterson", age: 31},
    ];

    assert.deepEqual(groupById(users), {
<<<<<<< HEAD
      john: {id: 'john', name: "John Smith", age: 20}
=======
      john: {id: 'john', name: "John Smith", age: 20},
>>>>>>> eda333d423db8ade41f75d2e2d30ea06c7d997ef
      ann: {id: 'ann', name: "Ann Smith", age: 24},
      pete: {id: 'pete', name: "Pete Peterson", age: 31},
    });
  });

  it("works with an empty array", function() {
<<<<<<< HEAD
=======
    users = [];
>>>>>>> eda333d423db8ade41f75d2e2d30ea06c7d997ef
    assert.deepEqual(groupById(users), {});
  });
});
