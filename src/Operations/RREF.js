async function RREF(A) {

    function getSolo() {return true}

    let message = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({A:A})
    }

    return await fetch('https://matrix-calculator-v2.herokuapp.com/rref', message)
}

export default RREF