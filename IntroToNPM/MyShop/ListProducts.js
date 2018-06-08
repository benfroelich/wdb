var faker = require("faker");
console.log(
      "---------------------------------\n" 
    + "Hello, here's what's available\n" 
    + "---------------------------------");
for(var i = 0; i < 10; i++)
    console.log(faker.commerce.productName() + " -  $" + faker.commerce.price());
