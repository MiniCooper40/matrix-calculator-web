import "./Problem.css"
import TwoMatricies from "../Matrix/TwoMatricies"
import { useState } from "react"
import Add from "../../Operations/Add"
import AnswerTable from "../Table/AnswerTable"
import Multiply from "../../Operations/Multiply"
import Matrix from "../Matrix/Matrix"
import RREF from "../../Operations/RREF"
import Subtract from "../../Operations/Subtract"
import { isInteger } from "mathjs"

export default function Problem() {

    const operations = {
        'RREF': RREF,
        'Add': Add,
        'Subtract': Subtract,
        'Multiply': Multiply,
    }

    const [loading, setLoading] = useState(false)
    const [answer, setAnswer] = useState(null)
    const [error, setError] = useState(null)
    const [operation, setOperation] = useState('RREF')

    //console.log(operations[operation].length)

    return (
        <div className="holder" style={{'flexDirection': 'column'}}>
            <div style={{display: 'flex', gap: '10px', padding:'10px'}}>
                <label htmlFor="operation">Operation</label>
                <select value={operation} id="operation" name="operation" onChange={e => setOperation(e.target.value)} >
                    <option value="RREF" >Reduced Row Echelon</option>
                    <option value="Add" >Addition</option>
                    <option value="Subtract" >Subtraction</option>
                    <option value="Multiply" >Multiplication</option>
                </select>
            </div>
            <div className="problem-holder">
                {operations[operation].length === 1 && <Matrix operation={operations[operation]} setAnswer={setAnswer} setLoading={setLoading} setError={setError} />}
                {operations[operation].length === 2 && <TwoMatricies multiplying={operation === 'Multiply'} operation={operations[operation]} setAnswer={setAnswer} setLoading={setLoading} setError={setError} />}
                {loading && <h1 className="medium">LOADING!!</h1>}
                {(!loading && answer) && <AnswerTable data={answer} />}
                {(!loading && !answer && error) && <h1 className="medium">{error}</h1>}
            </div>
        </div>
    )
}