async function Subtract(A, B) {

    let formData = new FormData()
    // formData.append("A", A)
    // formData.append("B", B)

    let pair = {
        A: A,
        B: B
    }

    formData.append('pair', {A: A, B: B})

    let message = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pair)
    }

    const response = await fetch('https://matrix-calculator-v2.herokuapp.com/subtract', message)

    return response
}

export default Subtract