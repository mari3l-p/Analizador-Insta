
interface highlightProps  {
    Icon?: React.ElementType;
    text: string;
}


export default function Highlight({Icon, text}: highlightProps) {
    return (
        <>
            <span className="blue-text">
                {Icon && <Icon size={20} className="mx-2 inline" />}
                {text}
            </span>
        </>
    )
}