export default function formatLocalCurrency(valor, locale = 'pt-BR') {
    return new Intl.NumberFormat(locale, { style: 'decimal' , minimumFractionDigits: 2, maximumFractionDigits: 2}  ).format(valor);
}