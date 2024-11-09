

export default function TextGasto({despesa, valorDespesa}){
    
    return (
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <span>{despesa}</span>
            <span>{valorDespesa}</span>
        </div>
    );
}