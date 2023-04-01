
const BASE_URL = 'https://jsonplaceholder.typicode.com';

async function wait() {
  await new Promise((resolve, reject) => setTimeout(reject, 1000, `Ooops`));

  return 10;
}


