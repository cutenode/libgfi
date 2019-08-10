const gfi = require('../')

// let's use an async function
async function microsoft () {
  // we're going to await the result and just outright log it – nothing super fancy
  console.log(await gfi('microsoft'))
}

// and let's make sure we execute our function
microsoft()
