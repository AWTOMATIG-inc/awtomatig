export default function BorderAnimateButton({ name, icon, ...rest }) {
  return (
    <button className="animated-border-button  rounded-full text-xl ">
      <span className="px-8 py-6 flex justify-center items-center gap-4  overflow-hidden">
        {name}
        {icon && (
          <svg
            width="28"
            height="30"
            viewBox="0 0 28 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="icon"
          >
            <path
              d="M0.277101 27.3087C-0.10187 27.7105 -0.089806 28.35 0.304047 28.7372C0.6979 29.1244 1.3244 29.1125 1.70337 28.7108L0.990234 28.0098L0.277101 27.3087ZM27.4491 0.991098C27.4386 0.433254 26.987 -0.0106126 26.4406 -0.000305653L17.5353 0.167683C16.9889 0.177991 16.5544 0.638571 16.5649 1.19642C16.5755 1.75426 17.027 2.19813 17.5735 2.18782L25.4892 2.0385L25.6416 10.119C25.6522 10.6769 26.1037 11.1208 26.6502 11.1104C27.1966 11.1001 27.6311 10.6396 27.6206 10.0817L27.4491 0.991098ZM0.990234 28.0098L1.70337 28.7108L27.1728 1.71079L26.4596 1.00976L25.7465 0.308736L0.277101 27.3087L0.990234 28.0098Z"
              fill="white"
            />
          </svg>
        )}
      </span>
    </button>
  );
}
