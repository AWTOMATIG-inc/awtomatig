import { Icon } from "@iconify/react";
import AnimatedButton from "../AnimatedButton";
import FadeInSection from "../animation/FadeEffect";
import InputBox from "../InputBox";
import TextBox from "../TextBox";

export default function GetInTouch() {
  return (
    <div className="container font-sora ">
      <div className="grid md:grid-cols-[1.3fr_1fr] gap-16 wrapper">
        <FadeInSection
          initial={{ opacity: 0, x: -150 }}
          scrollTop={{ opacity: 1, x: 0 }}
          scrollBottom={{ opacity: 0, x: -150 }}
          margin="40px 0px -40px 0px"
        >
          <div>
            <h1 className="font-montserrat uppercase">[ get in touch ]</h1>
            <h5 className="font-russo-one text-3xl sm:text-4xl lg:text-6xl  mt-8">
              We’re here to help before, during, and after your project.
            </h5>
            <p className="text-inter text-base sm:text-lg lg:text-2xl mt-8 ">
              Whether you’re exploring a new idea, fixing operational
              bottlenecks, or scaling an existing system, our team is ready to
              guide you. Share your goals, and we’ll suggest the most efficient
              way forward.
            </p>
          </div>
          <div className="mt-14">
            <div className="space-y-6">
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
                <div className="flex items-center gap-x-10 ">
                  <a href="">
                    <Icon icon="mdi:linkedin" width="25" height="25" />
                  </a>
                  <a href="">
                    <Icon icon="prime:twitter" width="19" height="19" />
                  </a>

                  <a href="">
                    <Icon icon="mingcute:medium-fill" width="26" height="26" />
                  </a>
                  <a href="">
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
            className="rounded-xl shadow-lg shadow-teal px-8 py-11 bg-[#201F1F78] max-w-[605px] ml-auto"
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
