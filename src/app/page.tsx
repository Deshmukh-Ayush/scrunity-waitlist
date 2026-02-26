import { Container } from "@/components/container";
import { Form } from "@/components/form";
import { Inter } from "next/font/google";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-neutral-950">
      <Container className="relative min-h-screen px-4 sm:px-6 pt-12 sm:pt-20 pb-16">
        <div className="flex flex-col">
          <Image src="/logo/scrunity-logo-light.png" alt="Scrunity Logo" width={100} height={100} className="mb-4 w-16 h-16 sm:w-[100px] sm:h-[100px]" />
          <h1 className="text-3xl sm:text-5xl md:text-6xl text-neutral-100">Research your ideas</h1>
          <h1 className="text-3xl sm:text-5xl md:text-6xl text-neutral-100">
            Like a Pro with Scrunity AI
          </h1>
          <div
            className={`${inter.className} mt-4 text-md sm:text-lg text-neutral-500`}
          >
            <p>
              Import your everything on scrunity and use AI on top of it and
              create mind-maps, flows and increase your productivity of research
            </p>
          </div>
        </div>
        <Form />

        <footer className="mt-12 sm:absolute sm:bottom-4">
          <p className={`${inter.className} text-neutral-400 text-sm`}>Scrunity © 2026</p>
        </footer>
      </Container>
    </div>
  );
}
