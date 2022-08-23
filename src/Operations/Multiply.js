async function Multiply(A, B) {

    let pair = {
        A: A,
        B: B
    }

    let message = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pair)
    }

    return await fetch('https://matrix-calculator-v2.herokuapp.com/multiply', message)
}

export default Multiply