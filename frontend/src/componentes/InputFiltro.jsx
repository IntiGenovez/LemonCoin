export default function InputFiltro() {

    return (
        <select name='filtro' id='filtro'>
            { seletores.map((seletor) =>
                (<option value='#'>
                    <Seletor
                        nome={ seletor }
                        key={ seletor }
                        isAtivo={ seletorAtivo === seletor }
                        isUp= { isUp && seletorAtivo === seletor }
                        setAtivo={ tratarClique }
                    />
                </option>)
            )}
        </select>
    )
}