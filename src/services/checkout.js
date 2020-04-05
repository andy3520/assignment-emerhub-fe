const BASE_URL = process.env.NODE_ENV !== "production" ? "/stripe" : process.env.STRIPE_BE;

const createIntent = async (user, amount, order) => {
  console.log(JSON.stringify({
    amount, user, order
  }, null, 2));
  try {
    const params = {
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount, user, order
      })
    }
    const data = await fetch(`${BASE_URL}/intents`, params)

    return data.json()

  } catch (err) {
    console.log(err);
    throw new Error(`Create intent error ${err.message}`)
  }
}

export {
  createIntent
}