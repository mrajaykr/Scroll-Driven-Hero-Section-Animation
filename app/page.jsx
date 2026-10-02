import HeroSection from "../components/HeroSection";

export default function Home() {
  return (
    <main>
      <HeroSection />

      <section
        style={{
          height: "100vh",
          background: "#0b0b0b",
          color: "#666",
          display: "grid",
          placeItems: "center",
          fontSize: "12px",
          letterSpacing: "0.2em",
        }}
      >
        NEXT SECTION
      </section>
    </main>
  );
}