import { RightTopArrowIcon } from "./SvgIcons";

export default function ArticleBar() {
  return (
    <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b py-5 gap-y-8 sm:gap-y-0">
      <div>
        <h5 className="bg-[linear-gradient(180deg,_#FFFFFF_0%,_#02D5E8_100%)] bg-clip-text text-transparent text-5xl font-semibold font-sora">
          20
        </h5>
        <p className="mt-2 font-semibold ">December ’ 24</p>
      </div>
      <div className="font-semibold">
        <h5>andrew</h5>
        <p className="text-teal text-sm">/ Technology/</p>
      </div>
      <div className="flex justify-between">
        <h3 className="font-sora text-xl">Our approach to AI safety </h3>
        <RightTopArrowIcon />
      </div>
    </div>
  );
}
