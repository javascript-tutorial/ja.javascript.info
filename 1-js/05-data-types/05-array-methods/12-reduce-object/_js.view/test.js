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
>>>>>>> c56e6a57ac3497aab77128c5bfca13513980709b
      ann: {id: 'ann', name: "Ann Smith", age: 24},
      pete: {id: 'pete', name: "Pete Peterson", age: 31},
    });
  });

  it("works with an empty array", function() {
<<<<<<< HEAD
=======
    users = [];
>>>>>>> c56e6a57ac3497aab77128c5bfca13513980709b
    assert.deepEqual(groupById(users), {});
  });
});
