import "./Table.css"
import { useCallback } from "react"

export default function Table({ rows, cols }) {

    const getTable = useCallback( () => {

        let relWidth = 740/cols;

        let width = {
            width: `min(200px, ${relWidth}px )`
        }

            let table = []
            for (let i = 0; i < rows; i++) {
                let row = []
                for (let j = 0; j < cols; j++) {
                    row.push(
                        <td style={width} key={`r${i}c${j}`}>
                            <input style={width} className="table-input" type="text" defaultValue="0" />
                        </td>
                    )
                }
                table.push(<tr key={i}>{row}</tr>)
            }
            return table
        }, [rows, cols])

    

    return (
        <div style={{overflow: 'auto'}}>
            <table>
                <tbody>
                    {getTable()}
                </tbody>
            </table>
        </ div>
    )
}