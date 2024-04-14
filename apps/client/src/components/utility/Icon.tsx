interface IconProps {
    name: string
}

const Icon = (props: IconProps) => {
    const { name } = props
    const src = `${name}.svg`
    return <img src={src}/>
}

export default Icon;