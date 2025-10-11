
type dataNums = {
    numFollowers: number;
    numFollowing: number;
    numMutuos: number;
}

export default function NumbersResult({numFollowers, numFollowing, numMutuos}: dataNums) {

    return <>
        <div className="w-xs mt-22">
            <h3 className="text-xl font-medium">Resultados del Análisis</h3>
            <div className="mt-6 text-2xl flex justify-between text-center">
                <div><span className="purple-text">{numFollowers}</span> <p className="text-base font-light">Seguidores</p></div>
                <div><span className="turquoise-text">{numFollowing}</span> <p className="text-base font-light">Siguiendo</p></div>
                <div><span className="yellow-text">{numMutuos}</span> <p className="text-base font-light">Mutuos</p></div>
            </div>
        </div>
    </>

}