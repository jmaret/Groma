"use client";

import { useState } from "react";
import type { Lesson } from "../../content/lessons";

export function LessonView({ lesson }: { lesson: Lesson }) {
  const [picked, setPicked] = useState<Record<string, string>>({});
  const [graded, setGraded] = useState<Record<string, boolean>>({});
  const [planOpen, setPlanOpen] = useState(false);

  return (
    <article id={lesson.id} className="panel px-5 py-5 sm:px-6">
      <h3 className="font-[family-name:var(--font-display)] text-xl tracking-tight">{lesson.title}</h3>
      <p className="mt-2">{lesson.summary}</p>
      <pre className="hcl-block">
        <code>{lesson.code}</code>
      </pre>
      <p>
        <strong>What to notice. </strong>
        {lesson.notice}
      </p>
      {lesson.aside && <p className="aside-note">{lesson.aside}</p>}
      {lesson.reading && (
        <>
          <p>
            <strong>Read this shape. It is not in the plan. </strong>
            A cloud resource uses the same block. This page does not plan it, because a real plan would ask for credentials.
          </p>
          <pre className="hcl-block">
            <code>{lesson.reading}</code>
          </pre>
        </>
      )}
      {lesson.checks.map((check) => {
        const choice = picked[check.id] ?? "";
        const shown = graded[check.id] === true;
        const correct = shown && choice === check.answer;
        return (
          <form
            key={check.id}
            className="check"
            onSubmit={(event) => {
              event.preventDefault();
              if (!choice) return;
              setGraded((current) => ({ ...current, [check.id]: true }));
            }}
          >
            <fieldset>
              <legend>{check.prompt}</legend>
              {check.options.map((option) => (
                <label key={option.id}>
                  <input
                    type="radio"
                    name={check.id}
                    value={option.id}
                    checked={choice === option.id}
                    onChange={() => {
                      setPicked((current) => ({ ...current, [check.id]: option.id }));
                      setGraded((current) => ({ ...current, [check.id]: false }));
                    }}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </fieldset>
            <button type="submit" className="btn-accent mt-3" disabled={!choice}>
              Check
            </button>
            {shown && (
              <p className={correct ? "verdict-ok" : "verdict-bad"} aria-live="polite">
                <strong>{correct ? "Correct. " : "Not yet. "}</strong>
                {check.explanation}
              </p>
            )}
          </form>
        );
      })}
      <button
        type="button"
        className="btn-accent mt-4"
        aria-expanded={planOpen}
        onClick={() => setPlanOpen((open) => !open)}
      >
        {planOpen ? "Hide the plan" : "The plan"}
      </button>
      {planOpen && (
        <pre className="hcl-block" aria-live="polite">
          <code>{lesson.plan}</code>
        </pre>
      )}
    </article>
  );
}
