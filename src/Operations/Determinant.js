async function Determinant(A) {

    function getSolo() {return true}

    let message = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(A)
    }

    return await fetch('http://localhost:8080/determinant', message)
}

export default Determinant