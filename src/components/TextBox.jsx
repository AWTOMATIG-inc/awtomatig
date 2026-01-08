export default function TextBox({ name, placeholder, ...rest }) {
  return (
    <div>
      <textarea
        name={name}
        placeholder={placeholder}
        className="border border-gray-500 p-2 rounded-lg w-full text-right focus:text-left py-3 min-h-32"
        {...rest}
      ></textarea>
    </div>
  );
}
