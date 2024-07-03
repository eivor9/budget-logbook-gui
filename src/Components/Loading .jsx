import '../styles/Loading.css'

export default function Loading(){
    return (
        <div className="loading">
            <div className="lds-ripple"><div></div><div></div></div>
            <h2>Loading...</h2>
        </div>
    )
}