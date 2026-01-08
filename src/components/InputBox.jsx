export default function InputBox({ name, placeholder, ...rest }) {
  return (
    <div>
      <input
        name={name}
        placeholder={placeholder}
        className="border border-gray-500 p-2 rounded-lg w-full text-right focus:text-left py-3"
        {...rest}
      />
    </div>
  );
}
