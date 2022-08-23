import "./Matrix.css"
import Table from "../Table/Table"
import { useState } from "react"
import Button from "../Button/Button"
import { evaluate } from "mathjs";

export default function TwoMatricies({ operation, setAnswer, setLoading, setError, multiplying }) {

    //console.log('multiplying = ', multiplying)

    const [dimA, setDimA] = useState({ rows: 2, cols: 2 })
    const [dimB, setDimB] = useState({ rows: 2, cols: 2 })

    const [inverse, setInverse] = useState(false)
    const [same, setSame] = useState(false)

    function handleDimA({ name, value }) {
        if (value < 1) return


        setDimA(prev => {

            let newDim = {
                ...prev,
                [name]: parseInt(value)
            }

            //console.log('newDim', newDim)
            //multiplying ? dimA.cols : dimB.rows

            if (same) {
                setDimB(newDim)
            }
            else if(multiplying && name === 'cols') {
                setDimB( prev => {
                    return {
                        ...prev,
                        rows: parseInt(value)
                    }
                })
            }
            else if (inverse) {
                setDimB({ rows: newDim.cols, cols: newDim.rows })
            }

            return newDim
        })

        //console.log('newDim', newDim)
    }

    function handleDimB({ name, value }) {
        if (value < 2) return

        setDimB(prev => {
            return {
                ...prev,
                [name]: parseInt(value)
            }
        })
    }

    function handleChecked({ name, value }) {
        console.log('name', `'${name}'`)
        console.log('value', `'${value}'`)
        switch (name) {
            case 'inverse':
                if (!inverse) {
                    if (same) setSame(false)
                    setInverse(true)
                    setDimB({ rows: dimA.cols, cols: dimA.rows })
                }
                else setInverse(false)
                break
            default:
                if (!same) {
                    if (inverse) setInverse(false)
                    setSame(true)
                    setDimB(dimA)
                }
                else setSame(false)
                break
        }

        console.log('same', same)
        console.log('inverse', inverse)
    }

    function handleMatrices(e) {
        e.preventDefault()

        try {
            const vals = e.target

            let matrixA = []
            let { rows: rowsA, cols: colsA } = dimA

            let matrixB = []
            let { rows: rowsB, cols: colsB } = dimB

            for (let i = 0; i < rowsA; i++) matrixA.push(Array(colsA).fill(0))
            for (let i = 0; i < rowsB; i++) matrixB.push(Array(colsB).fill(0))

            let mdx = 0

            for (let i = 0; i < rowsA; i++) {
                for (let j = 0; j < colsA; j++) {
                    matrixA[i][j] = evaluate(vals[mdx++].value)
                }
            }

            for (let i = 0; i < rowsB; i++) {
                for (let j = 0; j < colsB; j++) {
                    matrixB[i][j] = evaluate(vals[mdx++].value)
                }
            }

            setLoading(true)
            let opp = operation(matrixA, matrixB).then(res => {
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
            console.log(opp)
            setLoading(false)
        } catch (error) {
            console.log('error', error)
            setAnswer(null)
            setError('Invalid characters have been entered!')
        }


    }

    return (
        <form onSubmit={handleMatrices} className="matrix-form">
            <div className="holder vertical">
                <div className="holder vertical matrix-holder">
                    <div className="holder">
                        <input form="dummy" type="number" min="2" max={20} name="rows" value={dimA.rows} onChange={e => handleDimA(e.target)} />
                        <span className="x">x</span>
                        <input form="dummy" type="number" min="1" max={20} name="cols" value={dimA.cols} onChange={e => handleDimA(e.target)} />
                    </div>
                    <Table rows={dimA.rows} cols={dimA.cols} />
                </div>
                <div className="holder vertical matrix-holder">
                    <div className="holder">
                        <input disabled={inverse || same || multiplying} form="dummy" type="number" min="2" max={20} name="rows" value={multiplying ? dimA.cols : dimB.rows} onChange={e => handleDimB(e.target)} />
                        <span className="x">x</span>
                        <input disabled={inverse || same} form="dummy" type="number" min="1" max={20} name="cols" value={dimB.cols} onChange={e => handleDimB(e.target)} />
                    </div>
                    <Table rows={dimB.rows} cols={dimB.cols} />
                </div>
            </ div>
            <div className="holder checkbox-holder">
                <div className="holder vertical" style={{width: 'fit-content'}}>
                    <label htmlFor="same">Same</label>
                    <input name="same" type="checkbox" id="same" checked={same} onChange={e => handleChecked(e.target)} />
                </div>
                <div className="holder vertical" style={{width: 'fit-content'}}>
                    <label htmlFor="inverse">Inverse</label>
                    <input disabled={multiplying ? true : false} name="inverse" type="checkbox" id="inverse" checked={inverse} onChange={e => handleChecked(e.target)} />
                </div>
            </div>
            <Button>Solve</Button>
        </form>
    )

}