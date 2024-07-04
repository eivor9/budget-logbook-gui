import '../styles/Loading.css';

export default function Loading({ loading }){
    return (
        <div className="loading">
            
            <div className="lds-ripple">
                <div></div>
                <div></div>
            </div>

            {loading === "loading" ? <h2>Loading...</h2> : loading === "updating" ? <h2>Updating...</h2> : null}
        </div>
    )
}