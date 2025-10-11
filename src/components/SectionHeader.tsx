
interface HeaderProps {
    title: string,
    subtitle: string,
}


export default function SectionHeader({title, subtitle}: HeaderProps) {

    return <div className="mt-40 mb-20  flex flex-col items-center">
        <h1 className="blue-text text-3xl font-medium text-center">{title}</h1>
        <p className="text-center text-sm gray-text w-2xs mt-5">{subtitle}</p>
      </div>

}