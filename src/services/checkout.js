const BASE_URL = process.env.NODE_ENV !== "production" ? "/cfs" : "https://asia-northeast1-emerhub-registry.cloudfunctions.net/handleRegistry";

const createIntent = async (user, amount, order) => {

  try {
    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount, user, order
      })
    }
    const data = await fetch(`${BASE_URL}/stripeIntent`, params)

    const { result } = await data.json()

    return result

  } catch (err) {
    console.log(err);
    throw new Error(`Create intent error ${err.message}`)
  }
}

export {
  createIntent
}