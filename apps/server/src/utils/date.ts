const de = 'de-DE'
const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'long'
}

export const germanDate = (date: Date) => date.toLocaleDateString(de, options)
