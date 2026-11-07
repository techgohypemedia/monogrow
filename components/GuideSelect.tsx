"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import styles from "./GuideSelect.module.css";

export default function GuideSelect({ id, label, options, value, onChange }: {
  id: string;
  label: string;
  options: string[];
  value: number;
  onChange: (value: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(value);
  const root = useRef<HTMLDivElement>(null);
  const search = useRef({ text: "", time: 0 });

  useEffect(() => {
    if (!open) return;
    const dismiss = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [open]);

  useEffect(() => {
    if (open) document.getElementById(`${id}-option-${active}`)?.scrollIntoView({ block: "nearest" });
  }, [open, active, id]);

  function handleKey(event: KeyboardEvent<HTMLButtonElement>) {
    const current = open ? active : value;
    let next = current;
    if (event.key === "Escape" || event.key === "Tab") {
      setOpen(false);
      if (event.key === "Escape") event.preventDefault();
      return;
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (open) onChange(active);
      else setActive(value);
      setOpen(!open);
      return;
    }
    if (event.key === "ArrowDown") next = Math.min(options.length - 1, current + 1);
    else if (event.key === "ArrowUp") next = Math.max(0, current - 1);
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = options.length - 1;
    else if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
      const now = Date.now();
      search.current.text = (now - search.current.time < 700 ? search.current.text : "") + event.key.toLowerCase();
      search.current.time = now;
      const match = options.findIndex(option => option.toLowerCase().startsWith(search.current.text));
      if (match >= 0) next = match;
    } else return;
    event.preventDefault();
    setActive(next);
    setOpen(true);
  }

  return <div ref={root} className={styles.field} onBlur={event => {
    if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
  }}>
    <label id={`${id}-label`} htmlFor={id}>{label}</label>
    <button id={id} type="button" role="combobox" aria-labelledby={`${id}-label`}
      aria-expanded={open} aria-controls={`${id}-list`} aria-haspopup="listbox"
      aria-activedescendant={open ? `${id}-option-${active}` : undefined}
      className={styles.trigger} onKeyDown={handleKey}
      onClick={() => { setActive(value); setOpen(!open); }}>
      <span>{options[value]}</span><svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true"><path d="m5 7 5 5 5-5" /></svg>
    </button>
    {open && <ul id={`${id}-list`} role="listbox" aria-labelledby={`${id}-label`} className={styles.menu}>
      {options.map((option, index) => <li key={option} id={`${id}-option-${index}`} role="option"
        aria-selected={index === value} data-active={index === active}
        onPointerMove={() => setActive(index)} onMouseDown={event => event.preventDefault()}
        onClick={() => { onChange(index); setOpen(false); document.getElementById(id)?.focus(); }}>
        <span>{option}</span>{index === value && <span aria-hidden="true">?</span>}
      </li>)}
    </ul>}
  </div>;
}
