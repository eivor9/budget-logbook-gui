import '../styles/Loading.css'

export default function Loading(){
    return (
        <div className="loading">
            <div class="lds-ripple"><div></div><div></div></div>
            <h2>Loading...</h2>
        </div>
    )
}