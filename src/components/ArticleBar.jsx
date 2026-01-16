import { RightTopArrowIcon } from "./SvgIcons";

export default function ArticleBar({blog}) {
  return (
    <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b py-5 gap-y-8 sm:gap-y-0">
      <div className="flex-1">
        <h5 className="bg-[linear-gradient(180deg,#FFFFFF_0%,#02D5E8_100%)] bg-clip-text text-transparent text-5xl font-semibold font-sora">
          {blog?.date?.day}
        </h5>
        <p className="mt-2 font-semibold ">{blog?.date?.month} ’ {blog?.date?.year}</p>
      </div>
      <div className="font-semibold flex-1">
        
        <p className="text-teal text-sm">/ {blog.theme} /</p>
      </div>
      <a href={blog.link} target="_blank" className="flex justify-between items-center flex-1 gap-8 hover:text-teal">
        <h3 className="font-sora text-xl">{blog.name}</h3>
        <RightTopArrowIcon />
      </a>
    </div>
  );
}
