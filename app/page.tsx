import { Courses } from "@/components/Courses";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { SecretProvider } from "@/components/SecretMenu";

export default function Home() {
  return (
    <SecretProvider>
      <main className="grain">
        <Hero />
        <Courses />
        <Footer />
      </main>
    </SecretProvider>
  );
}
