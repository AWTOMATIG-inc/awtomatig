import { Icon } from "@iconify/react";
import AnimatedButton from "../AnimatedButton";
import FadeInSection from "../animation/FadeEffect";
import InputBox from "../InputBox";
import TextBox from "../TextBox";

export default function GetInTouch() {
  return (
    <div className="container font-sora ">
      <div className="grid md:grid-cols-2 gap-20 wrapper">
        <FadeInSection
          initial={{ opacity: 0, x: -150 }}
          scrollTop={{ opacity: 1, x: 0 }}
          scrollBottom={{ opacity: 0, x: -150 }}
          margin="40px 0px -40px 0px"
        >
          <div>
            <h1>[ get in touch ]</h1>
            <h5 className="text-3xl sm:text-4xl lg:text-5xl leading-10 lg:leading-[70px] mt-4">
              We are always ready to help you and answer your questions
            </h5>
            <p className="text-base sm:text-lg lg:text-xl my-8 sm:my-10 lg:my-12">
              Pacific hake false trevally queen parrotfish black prickleback
              mosshead warbonnet sweeper! Greenling sleeper.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h1 className="">Call Center</h1>
              <div className="mt-8">
                <a href="#">800 100 975 20 34</a>
                <br />
                <a href="#">+ (123) 1800-234-5678</a>
              </div>
              <div className="mt-14">
                <h1>Email</h1>
                <a href="#">aiero@mail.co</a>
              </div>
            </div>
            <div>
              <h1>Our Location</h1>
              <div className="mt-10">
                <a href="#">261/c khilgaon, road no 9 ,maibag</a>
              </div>
              <div className="mt-12">
                <h1>Social network</h1>
                <div className="flex items-center gap-x-10 mt-8">
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
              get touch
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
