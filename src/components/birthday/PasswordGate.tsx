import { useState, type FormEvent } from "react";
import { HeartParticles } from "./HeartParticles";

const PASSWORD = "455012";

export function PasswordGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  if (unlocked) return <>{children}</>;

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (value.trim() === PASSWORD) {
      setError(false);
      setUnlocked(true);
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      });
    } else {
      setError(true);
    }
  };

  return (
    <div className="relative min-h-[100dvh] w-full overflow-hidden bg-[image:var(--gradient-dawn)] flex items-center justify-center px-6">
      <HeartParticles />
      <div className="glass-card relative z-10 w-full max-w-sm rounded-3xl p-8 shadow-[0_20px_80px_-20px_rgba(219,88,142,0.35)]">
        <div className="text-center space-y-2 mb-6">
          <p className="uppercase tracking-[0.35em] text-[10px] text-rose-400/80">A private letter</p>
          <h1 className="font-serif text-3xl text-rose-900/90">For your eyes only</h1>
          <p className="text-sm text-rose-700/70 font-light">Enter the secret to unlock our story.</p>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="password"
            inputMode="numeric"
            autoFocus
            value={value}
            onChange={(e) => { setValue(e.target.value); setError(false); }}
            placeholder="••••••"
            className="w-full rounded-2xl border border-rose-200/60 bg-white/60 backdrop-blur px-5 py-4 text-center tracking-[0.5em] text-lg text-rose-900 placeholder:text-rose-300/70 outline-none focus:border-rose-400/70 focus:ring-2 focus:ring-rose-300/40 transition"
          />
          {error && (
            <p className="text-center text-xs text-rose-500">That's not quite it, my love. Try again.</p>
          )}
          <button
            type="submit"
            className="w-full rounded-2xl bg-gradient-to-r from-rose-400 via-pink-400 to-rose-300 py-4 text-white font-medium tracking-wide shadow-[0_10px_30px_-10px_rgba(219,88,142,0.6)] active:scale-[0.98] transition"
          >
            Unlock
          </button>
        </form>
      </div>
    </div>
  );
}