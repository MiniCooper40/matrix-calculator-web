import "./Table.css"
const Fraction = require('fractional').Fraction

export default function AnswerTable({ data }) {

    let getTable = () => {

        //console.log(data)

        let res = []

        for (let i = 0; i < data.length; i++) {
            let row = []
            for (let j = 0; j < data[0].length; j++) {
                let val
                if(Number.isInteger(data[i][j])) val = data[i][j]
                else {
                    var f = new Fraction(data[i][j])
                    val = f.numerator + "/" + f.denominator
                }
                row.push(
                    <td className="answer-output" key={i + ', ' + j}>{val}</td>
                )
            }
            res.push(
                <tr key={i}>{row}</tr>
            )
        }

        //console.log(res)

        return res
    }

    return (
        <div className="answer-holder">
            <div className="medium">Result</div>
            <table>
                <tbody>
                    {getTable()}
                </tbody>
            </table>
        </div>
    )
}