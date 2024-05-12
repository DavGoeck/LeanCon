const de = 'de-DE'
const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'long',
    year: '2-digit'
}

export const germanDate = (date: Date) => date.toLocaleDateString(de, options)