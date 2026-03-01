import { Container } from "@/components/container";
import { Form } from "@/components/form";
import { Inter } from "next/font/google";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-neutral-950">
      <Container className="relative min-h-screen px-4 sm:px-6 pt-12 sm:pt-20 pb-16">
        <header className="flex flex-col">
          <Image
            src="/logo/scrunity-logo-light.png"
            alt="Scrunity — AI research and mind map tool"
            width={100}
            height={100}
            className="mb-4 w-16 h-16 sm:w-[100px] sm:h-[100px]"
            priority
          />
          <h1 className="text-3xl sm:text-5xl md:text-6xl text-neutral-100">
            Research your ideas like a pro with Scrunity AI
          </h1>
          <p
            className={`${inter.className} mt-4 text-md sm:text-lg text-neutral-500`}
          >
            Import everything on Scrunity, use AI on top of it, and create
            mind-maps and flows to boost your research productivity.
          </p>
        </header>
        <Form />

        <footer className="mt-12 sm:absolute sm:bottom-4">
          <p className={`${inter.className} text-neutral-400 text-sm`}>Scrunity © 2026</p>
        </footer>
      </Container>
    </div>
  );
}
