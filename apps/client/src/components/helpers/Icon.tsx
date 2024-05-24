interface IconProps {
    name: string,
    alt?: string
}

const Icon = (props: IconProps) => {
    const { name, alt } = props
    const altText = `${alt || name} icon`
    const src = `/${name}.svg`
    return <img src={src} alt={altText}/>
}

export default Icon;