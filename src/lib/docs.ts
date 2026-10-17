import { readFileSync } from "node:fs";
import path from "node:path";

export function readRepoFile(relativePath: string): string {
  return readFileSync(path.join(process.cwd(), relativePath), "utf8");
}

export function readSummary(relativePath: string): string {
  const markdown = readRepoFile(relativePath);
  const summary = extractSection(markdown, "Summary");
  if (!summary) {
    throw new Error(`${relativePath} is missing a ## Summary section`);
  }
  return summary;
}

export function extractSection(markdown: string, heading: string): string {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const start = lines.findIndex((line) => line.trim() === `## ${heading}`);
  if (start === -1) return "";
  const body: string[] = [];
  for (let index = start + 1; index < lines.length; index += 1) {
    const line = lines[index] ?? "";
    if (line.startsWith("## ")) break;
    body.push(line);
  }
  return body.join("\n").trim();
}
