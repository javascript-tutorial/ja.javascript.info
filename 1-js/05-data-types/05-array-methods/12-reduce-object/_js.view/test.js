describe("groupById", function() {

  it("creates an object grouped by id", function() {
    let users = [
      {id: 'john', name: "John Smith", age: 20},
      {id: 'ann', name: "Ann Smith", age: 24},
      {id: 'pete', name: "Pete Peterson", age: 31},
    ];

    assert.deepEqual(groupById(users), {
      john: {id: 'john', name: "John Smith", age: 20},
      ann: {id: 'ann', name: "Ann Smith", age: 24},
      pete: {id: 'pete', name: "Pete Peterson", age: 31},
    });
  });

  it("works with an empty array", function() {
<<<<<<< HEAD
    let users_empty = [];
    assert.deepEqual(groupById(users_empty), {});
=======
    users = [];
    assert.deepEqual(groupById(users), {});
>>>>>>> b258d7d5b635c88228f7556e14fbe5e5ca7f736d
  });
});
