"use client";

import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import { sendEmail } from "@/action/sendEmail";
import { FaPaperPlane } from "react-icons/fa";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Contact() {
  const { ref } = useSectionInView("Contact");
  const [isPending, setIsPending] = useState(false);

  // const [errorMessage, formAction, isPending] = useActionState(
  //   sendEmail,
  //   undefined
  // );

  const handleSendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    setIsPending(true);
    try {
      const { data, error } = await sendEmail(formData);
      console.log(error);
      if (error) {
        toast.error(error);
        return;
      }

      toast.success("Email sent successfully");
    } finally {
      setIsPending(false);
    }
  };
  return (
    <motion.section
      ref={ref}
      id="contact"
      className="mb-20 sm:mb-28 w-[min(100%,38rem)] text-center"
      initial={{ opacity: 0 }}
      whileInView={{
        opacity: 1,
      }}
      transition={{
        duration: 1,
      }}
      viewport={{
        once: true,
      }}
    >
      <SectionHeading>Contact Me</SectionHeading>
      <p className="text-gray-700 -mt-6">
        Please contact me directly at{" "}
        <a className="underline" href="mailto:example@gmail.com">
          example@gmail.com
        </a>{" "}
        or through this form.
      </p>
      <form
        className="mt-10 flex flex-col dark:text-black"
        onSubmit={handleSendEmail}
      >
        <input
          className="h-14 px-4 rounded-lg borderBlack dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none"
          type="email"
          name="senderEmail"
          placeholder="Your email"
          maxLength={500}
          required
        />
        <textarea
          className="h-52 my-3 rounded-lg borderBlack p-4 dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all  dark:outline-none"
          name="message"
          placeholder="Your message"
          maxLength={5000}
          required
        />
        <button
          type="submit"
          className="group h-[3rem] w-[8rem] flex items-center justify-center gap-2 bg-gray-900 text-white rounded-full outline-none transition-all focus:scale-110 hover:scale-110 hover:bg-gray-950 disabled:bg-opacity-65 dark:bg-white dark:bg-opacity-10"
          disabled={isPending}
        >
          {isPending ? (
            <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
          ) : (
            <>
              Submit{" "}
              <FaPaperPlane className="text-xs opacity-70 transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />{" "}
            </>
          )}
        </button>
      </form>
    </motion.section>
  );
}
