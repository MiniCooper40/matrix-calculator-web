import "./Matrix.css"
import Table from "../Table/Table"
import { useState } from "react"
import Button from "../Button/Button"
import { evaluate } from "mathjs";
import RREF from "../../Operations/RREF";

export default function Matrix({operation, setAnswer, setLoading, setError}) {

    const [dim, setDim] = useState({ rows: 2, cols: 2 })
    const [square, setSquare] = useState(false)

    function handleDim({ name, value }) {
        if (value < 2) return

        setDim(prev => {
            if(square) {
                return {
                    rows: parseInt(value),
                    cols: parseInt(value)
                }
            }
            return {
                ...prev,
                [name]: parseInt(value)
            }
        })
    }

    function handleMatrix(e) {
        e.preventDefault()
        const vals = e.target

        let matrix = []
        let { rows, cols } = dim

        for (let i = 0; i < rows; i++) matrix.push(Array(cols).fill(0))

        let mdx = 0

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                matrix[i][j] = parseInt(vals[mdx++].value)
            }
        }

        setLoading(true)
        operation(matrix).then(res => {
            if (res.ok) {
                console.log('Response is ok')
                res.json().then(json => {
                    setError(null)
                    setAnswer(json)
                })
            }
            else {
                console.log('Response returns error')
                res.text().then(text => {
                    setAnswer(null)
                    setError(text)
                })
            }
        })
        setLoading(false)
    }

    function handleChecked(e) {
        setSquare(prev => {
            if(prev) return false
            setDim(prev => {
                return {
                    rows: prev.rows,
                    cols: prev.rows
                }
            })
            return true
        })
    }

    return (

        <form onSubmit={handleMatrix} className="matrix-form">
            <div className="holder vertical matrix-holder">
                <div className="holder">
                    <input form="dummy" type="number" min="2" max={10} name="rows" value={dim.rows} onChange={e => handleDim(e.target)} />
                    <span className="x">x</span>
                    <input disabled={square} form="dummy" type="number" min="2" max={10} name="cols" value={dim.cols} onChange={e => handleDim(e.target)} />
                </div>
                <Table rows={dim.rows} cols={dim.cols} />
            </div>
            <div className="holder checkbox-holder">
                <div className="holder vertical">
                    <label htmlFor="same">Square</label>
                    <input name="square" type="checkbox" id="square" checked={square} onChange={handleChecked} />
                </div>
            </div>
            <Button>Solve</Button>
        </form>

    )

}