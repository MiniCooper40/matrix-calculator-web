async function Add(A, B) {

    let form = new FormData()
    form.append('A', JSON.stringify(A))
    form.append('B', JSON.stringify(B))

    let message = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({A: A, B: B})
    }

    return await fetch('https://matrix-calculator-v2.herokuapp.com/add', message)
}

export default Add