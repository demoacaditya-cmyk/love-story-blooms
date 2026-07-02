import { createFileRoute } from "@tanstack/react-router";
import { BirthdayExperience } from "@/components/birthday/BirthdayExperience";
import { PasswordGate } from "@/components/birthday/PasswordGate";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Happy Birthday, My Love" },
      { name: "description", content: "A cinematic, romantic birthday story written just for you." },
      { property: "og:title", content: "Happy Birthday, My Love" },
      { property: "og:description", content: "A cinematic, romantic birthday story written just for you." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <PasswordGate>
      <BirthdayExperience />
    </PasswordGate>
  );
}
