const BASE_URL = process.env.NODE_ENV !== "production" ? "/cfs" : "https://asia-northeast1-emerhub-registry.cloudfunctions.net/handleRegistry";

const createIntent = async (user, amount, order) => {

  try {
    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      crossDomain: true,
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

const postDataToWordpress = async (intentId, user, order) => {
  try {
    const payload = {
      intentId,
      paymentMethod: "Credit Card",
      currency: "USD",
      user,
      order
    }

    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      crossDomain: true,
      body: JSON.stringify({
        ...payload
      })
    }

    console.log(JSON.stringify(payload, null, 2));

    const data = await fetch(`${BASE_URL}/stripeSucces`, params)

    const { result } = await data.json()

    return result
  } catch (error) {
    console.log(error)
    throw new Error(`Can't post payment data to wordpress`)
  }
}

export {
  createIntent,
  postDataToWordpress
}