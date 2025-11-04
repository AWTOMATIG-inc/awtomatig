import InputBox from "@/components/InputBox";
import TextBox from "@/components/TextBox";
import { Icon } from "@iconify/react";

export default function Contact() {
  return (
    <main>
      <section className="hero-banner min-h-[823px] relative">
        <div className="container">
          <div className="flex flex-col justify-center items-center min-h-screen text-center gap-4">
            <h1 className="font-bold text-7xl uppercase">/Contact/</h1>
          </div>
          <h5 className="text-8xl text-border text-transparent uppercase absolute -right-30 top-1/2 -translate-y-1/2 opacity-80 -rotate-90 select-none pointer-events-none tracking-[30%] font-sora">
            Contacts
          </h5>
          <p className="absolute bottom-5 left-5 font-bold">Home / contact</p>
        </div>
      </section>
      <section>
        <div className="container  font-sora pt-32">
          <div className="grid grid-cols-2 gap-20 max-w-[1430px] mx-auto">
            <div>
              <div>
                <h1>[ get in touch ]</h1>
                <h5 className="text-5xl leading-[70px] mt-4">
                  We are always ready to help you and answer your questions
                </h5>
                <p className="text-xl my-12">
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
                    <div className="flex justify-center items-center gap-x-8 mt-5">
                      <a href="">
                        <Icon
                          icon="ic:baseline-facebook"
                          width="25"
                          height="25"
                        />
                      </a>
                      <a href="">
                        <Icon icon="prime:twitter" width="19" height="19" />
                      </a>
                      <a href="">
                        <Icon icon="mdi:linkedin" width="25" height="25" />
                      </a>
                      <a href="">
                        <Icon icon="mdi:youtube" width="26" height="26" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <form
                action="#"
                className="rounded-xl shadow-lg shadow-teal p-8 bg-[#201F1F78] max-w-[605px] mx-auto"
              >
                <h1 className="text-right font-bold text-3xl capitalize mb-8">
                  get touch
                </h1>
                <div className=" rounded-md space-y-5 w-[80%] ml-auto">
                  <InputBox name="fullname" placeholder="FullName" />
                  <InputBox name="email" placeholder="Email" />
                  <InputBox name="subject" placeholder="Subject" />
                  <TextBox name="message" placeholder="Message" />
                </div>
                <button className="capitalize px-8 py-2 border border-gray-500 mt-8 rounded-2xl block ml-auto text-gray-400">
                  send message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <section className="my-20">
        <div className="mx-auto w-fit">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.9298502729616!2d90.41534198641035!3d23.749880833814974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b9e38ce56fbd%3A0x1df25537514931fe!2sawtomatig!5e0!3m2!1sen!2sbd!4v1761484151939!5m2!1sen!2sbd"
            width="1430"
            height="711"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-2xl overflow-hidden"
          ></iframe>
        </div>
      </section>
    </main>
  );
}
