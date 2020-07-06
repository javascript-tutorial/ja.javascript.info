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
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9
      ann: {id: 'ann', name: "Ann Smith", age: 24},
      pete: {id: 'pete', name: "Pete Peterson", age: 31},
    });
  });

  it("works with an empty array", function() {
<<<<<<< HEAD
=======
    users = [];
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9
    assert.deepEqual(groupById(users), {});
  });
});
