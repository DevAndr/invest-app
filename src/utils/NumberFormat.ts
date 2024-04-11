import numeral from 'numeral'

export class NumberFormat {
    public static format(value: string | number): string {
        return numeral(value).format('0.[0]a')
    }
}