import ReactDatePicker, { registerLocale } from 'react-datepicker'

import { de } from 'date-fns/locale'
import { differenceInCalendarDays } from 'date-fns'

import "react-datepicker/dist/react-datepicker.css"

type DatePickerProps = {
    date: Date,
    setDate: (date: Date) => void,
    allowPast?: boolean
}

type IntervalPickerProps = {
    start: Date | null,
    end: Date | null,
    onChange: (dates: [Date | null, Date | null]) => void,
    allowPast?: boolean
}

export const DatePicker = ({ date, setDate, allowPast = false }: DatePickerProps) => {
    registerLocale('de', de)

    return <ReactDatePicker
        locale='de'
        dateFormat='dd. MMMM, yyyy'

        showIcon
        toggleCalendarOnIconClick

        selected={date}
        minDate={allowPast ? null : new Date()}
        onChange={(newDate: Date) => setDate(newDate)}
    />
}

export const IntervalPicker = ({start, end, onChange, allowPast = false }: IntervalPickerProps) => {
    registerLocale('de', de)

    return <ReactDatePicker
        locale='de'
        dateFormat='dd. MMMM, yyyy'

        showIcon
        toggleCalendarOnIconClick

        selectsRange
        selected={start}
        startDate={start}
        endDate={end}
        onChange={onChange}

        minDate={allowPast ? null : new Date()}
    />
}

export const currentDate = () => new Date(new Date().toDateString())
export const datediff = (from: Date, until: Date) => {
    return differenceInCalendarDays(until, from) + 1
}