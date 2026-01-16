import { Icon } from "@iconify/react";
import AnimatedButton from "../AnimatedButton";
import FadeInSection from "../animation/FadeEffect";
import CommonHeading from "../CommonHeading";
import InputBox from "../InputBox";
import TextBox from "../TextBox";

export default function GetInTouch() {
  return (
    <div className="container font-sora overflow-hidden lg:overflow-visible">
      <div className="grid lg:grid-cols-[1.3fr_1fr] gap-16 wrapper">
        <FadeInSection
          initial={{ opacity: 0, x: -150 }}
          scrollTop={{ opacity: 1, x: 0 }}
          scrollBottom={{ opacity: 0, x: -150 }}
          margin="40px 0px -40px 0px"
        >
          <div>
            <CommonHeading title="get in touch">
              We are always ready to help you and answer your questions
            </CommonHeading>

            <p className="text-inter text-base sm:text-lg lg:text-2xl mt-5 sm:mt-8 lg:mt-10 text-justify">
              Have a question, a project in mind, or need clarity before moving
              forward? Share a few details and our team will get back to you
              with a clear, helpful response—no pressure, no noise.
            </p>
          </div>
          <div className="mt-10 lg:mt-24">
            <div className="space-y-6 text-sm md:text-base">
              <div className="grid grid-cols-[1fr_2fr] items-center">
                <h1>Call Center</h1>
                <a href="tel:+8801753-538760">+880 1753-538760</a>
              </div>
              <div className=" grid grid-cols-[1fr_2fr] items-center">
                <h1>E-mail</h1>
                <a href="mailto:awtomatig@gmail.com">awtomatig@gmail.com</a>
              </div>
              <div className="grid grid-cols-[1fr_2fr] items-center">
                <h1>Social network</h1>
                <div className="flex items-center gap-x-10">
                  <a href="https://www.linkedin.com/company/awtomatig/" target="_blank">
                    <Icon icon="mdi:linkedin" width="25" height="25" />
                  </a>
                  <a href="https://x.com/awtomatig86939" target="_blank">
                    <Icon icon="prime:twitter" width="19" height="19" />
                  </a>

                  <a href="https://medium.com/@awtomatig" target="_blank">
                    <Icon icon="mingcute:medium-fill" width="26" height="26" />
                  </a>
                  <a href="https://www.instagram.com/awtomatig/" target="_blank">
                    <Icon icon="lets-icons:insta" width="25" height="25" />
                  </a>
                </div>
              </div>
              <div className="grid grid-cols-[1fr_2fr] items-center">
                <h1>Our Location</h1>
                <a href="#">261/c Khilgaon, road no 9, Malibag, Dhaka-1219</a>
              </div>
            </div>
          </div>
        </FadeInSection>
        <FadeInSection
          initial={{ opacity: 0, x: 150 }}
          scrollTop={{ opacity: 1, x: 0 }}
          scrollBottom={{ opacity: 0, x: 150 }}
          margin="40px 0px -40px 0px"
        >
          <form
            action="#"
            className="rounded-xl shadow-lg shadow-teal px-8 py-11 bg-[#201F1F78] w-full xl:max-w-[605px] mx-auto  lg:ml-auto mb-6 lg:mb-0"
          >
            <h1 className="text-right font-bold text-3xl capitalize mb-8">
              Get in Touch
            </h1>
            <div className=" rounded-md space-y-7 w-[80%] ml-auto">
              <InputBox name="fullname" placeholder="FullName" />
              <InputBox name="email" placeholder="Email" />
              <InputBox name="subject" placeholder="Subject" />
              <TextBox name="message" placeholder="Message" />
            </div>
            <button className="block ml-auto mt-8">
              <AnimatedButton name="Send Message" width="w-[210px]" />
            </button>
          </form>
        </FadeInSection>
      </div>
    </div>
  );
}
