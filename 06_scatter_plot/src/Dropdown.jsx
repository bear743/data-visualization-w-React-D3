export const Dropdown = ({ options, id, selectedValue,  onSelectedValueChange }) => (
    <select id={id} value={selectedValue} onChange={event => onSelectedValueChange(event.target.value)}>
        {options.map(({ value, label }) => (
            <option key={value} value={value}>
                {label}
            </option>
        ))}
    </select>
)