import { Container } from "@/components/container";
import { Form } from "@/components/form";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-neutral-950">
      <Container className="h-screen pt-20">
        <div className="flex flex-col">
          <h1 className="text-6xl text-neutral-100">Research your ideas</h1>
          <h1 className="text-6xl text-neutral-100">
            Like a Pro with Scrunity
          </h1>
          <div
            className={`${inter.className} mt-4 text-md text-neutral-500 flex flex-col`}
          >
            <p>
              Import your everything on scrunity and use AI on top of it and
            </p>
            <p>
              create mind-maps, flows and increase your productivity of research
            </p>
          </div>
        </div>
        <Form />
      </Container>
    </div>
  );
}
