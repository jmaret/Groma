# Vision and requirements

**Product:** Groma

**Last updated:** 2026-10-17

## Summary

Groma is a public room that teaches Terraform. The first page is a short path: a root module, a provider, a resource, variables and locals, an output, the graph, plan and apply, state, and a data source. The last lesson also shows an S3 bucket as a shape to read. Checks are graded in the browser. The plan on each lesson is text written for that configuration. This site does not run Terraform, does not apply a change, and does not ask for cloud credentials.

The name of the product is Groma.

## Vision

Groma teaches Terraform by a short path. The first lessons are the shape of a configuration: a description, not a script, and the provider that can carry it out. The next lessons are the blocks that fill that shape: a resource, a variable, a local, and an output. The last lessons are the ideas that make Terraform Terraform: the graph, the plan, and state. A data source shows a read. A cloud resource shows the same shape aimed at a provider this page does not configure.

The room is free to open. Nothing the visitor answers is stored. The configurations use `hashicorp/random` and `hashicorp/local`, so a visitor who later installs Terraform can run them with no cloud account. The bucket is not one of those configurations.

## Users

- **Visitor** — reads where Terraform came from, then a lesson, answers its checks, and may open the written plan.
- **Builder** — ships the static site and keeps the lessons and these documents together.

## Principles

- **Zero cost** — static export, no account, no paid API, no Terraform host.
- **A real configuration** — each lesson shows one short configuration. The plan is the proposal that configuration produces.
- **A check you can finish here** — the answer is graded in the browser, with the explanation either way.
- **No apply** — the page never runs Terraform and never asks for credentials. State can hold secrets, and this site does not receive it.
- **One visual system** — AetherForge chrome: paper `#F6EAD8`, ink `#152028`, petrol `#0F4C5C`, Source Serif 4, Source Sans 3, IBM Plex Mono, frosted panels. The mark is a surveyor's groma. The backdrop is a survey grid.
- **Living documents** — the vision page and the architecture page render the Summary of these files. A change to the app updates the files in the same work.
- **The name is Groma** — pages, the header, and these documents use that word alone.

## In scope

- `/language` explains the origins of Terraform, HCL, how it compares with CloudFormation, Pulumi, and Ansible, the 2023 license change and OpenTofu, and where people use it.
- Nine lessons on `/`: the root module, `required_providers`, `random_pet`, variables and locals, outputs, references, plan and apply, state, and a data source beside an unread `aws_s3_bucket`.
- One or two checks on each lesson, graded in the browser.
- The plan reveals the written `terraform plan` for that lesson. It does not leave the page.
- `/vision` renders the Summary of this document.
- `/architecture` draws the conceptual, logical, and physical views, then renders the architecture Summary.
- `/releases` renders `CHANGELOG.md`. The header version chip links there and shows the package version.
- A survey grid behind the pages, with the AetherForge paper wash so the type stays readable.
- The public site is `https://jmaret.github.io/Groma/`. The Pages build sets `BASE_PATH=/Groma` so styles and the grid load.

## Out of scope

- Running Terraform, apply, or a cloud provider.
- Accounts, saved answers, or progress that survives a refresh.
- Modules, `count`, `for_each`, workspaces, and remote backends.
- A custom domain, until that is asked for.
- An AetherForge catalog entry, until that is asked for.

## Requirements

| ID | Requirement | Status |
| --- | --- | --- |
| V-1 | Lessons run from a root module through plan, state, and a data source | Met |
| V-2 | Each lesson has one configuration, one or two checks graded in the browser, and a written plan | Met |
| V-3 | The plan is revealed on the page. This site does not run Terraform or apply | Met |
| V-4 | `/vision` renders the Summary of this document | Met |
| V-5 | `/architecture` shows conceptual, logical, and physical pictures, then the architecture Summary | Met |
| V-6 | `/releases` renders the changelog. The header chip links to it and shows the package version | Met |
| V-7 | The chrome matches AetherForge, with the groma mark and the survey-grid backdrop | Met |
| V-8 | The site is a static export with no auth and no paid dependency | Met |
| V-9 | A code change updates this document, the architecture document, and `CHANGELOG.md` together | Met |
| V-10 | The product name is Groma alone | Met |
| V-11 | `/language` covers origins, HCL, comparisons, the license change and OpenTofu, and where Terraform is used | Met |
| V-12 | The public site is `https://jmaret.github.io/Groma/`, and styles load under that path | Met |

## Acceptance

A visitor can read the language page, open a lesson, answer a check, see whether it was right, and open the written plan. The visitor can read the vision summary, the three architecture pictures, and the release notes from the version chip. The page does not ask for a sign-in, a check does not leave the browser, and nothing is applied.

## Changelog

- 2026-10-17 — A plan repeats the arguments written in the configuration. `id` is the line the plan adds.
- 2026-10-17 — First room. Nine lessons, in-browser checks, written plans, and GitHub Pages at `https://jmaret.github.io/Groma/`.
