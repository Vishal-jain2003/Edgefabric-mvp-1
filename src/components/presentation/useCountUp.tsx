import { useState, useEffect } from "react";

export function useCountUp(target: number, duration = 1200, active = true) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) { setValue(0); return; }
    const start = Date.now();
    const startVal = 0;
    const raf = requestAnimationFrame(function tick() {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(startVal + eased * (target - startVal)));
      if (progress < 1) requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(raf);
  }, [target, duration, active]);

  return value;
}

export function useTypewriter(text: string, speed = 40, active = true) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!active) { setDisplayed(""); return; }
    setDisplayed("");
    let i = 0;
    const id = setInterval(() => {
      if (i <= text.length) {
        setDisplayed(text.slice(0, i));
        i++;
      } else {
        clearInterval(id);
      }
    }, speed);
    return () => clearInterval(id);
  }, [text, speed, active]);

  return displayed;
}
