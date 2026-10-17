import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "The language" };

export default function LanguagePage() {
  return (
    <article className="site-wrap space-y-6 py-8 sm:py-12">
      <header className="panel px-5 py-8 sm:px-8 sm:py-10">
        <p className="eyebrow">The language</p>
        <h1 className="mt-2 max-w-2xl font-[family-name:var(--font-display)] text-4xl tracking-tight">
          A description of what should exist, and a plan before anything changes.
        </h1>
        <p className="mt-4 max-w-2xl text-[var(--ink-muted)]">
          Terraform reads HCL and proposes a plan. The lessons teach the blocks. This page is why
          those blocks are a description instead of a script.
        </p>
      </header>

      <section className="panel px-5 py-8 sm:px-8">
        <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-tight">Origins</h2>
        <div className="doc mt-3 max-w-2xl">
          <p>
            Mitchell Hashimoto and Armon Dadgar built Terraform at HashiCorp. The first open-source
            release was on 28 July 2014. The idea was a single description of infrastructure that
            many providers could carry out, with a plan you could read before anything changed.
          </p>
          <p>
            The files are written in HCL, the HashiCorp Configuration Language. HCL is also the
            syntax of other HashiCorp tools. Terraform can read a JSON form of the same
            configuration. People review HCL, because the blocks name resources, arguments, and
            references in a shape that stays short.
          </p>
          <p>
            Terraform 0.12, in 2019, replaced the earlier expression language with a fuller one.
            Terraform 1.0 shipped on 8 June 2021, with a promise that a configuration written for
            1.0 would keep working through the 1.x line. The lessons on this page use that shape.
          </p>
          <p>
            On 10 August 2023 HashiCorp changed the license of future Terraform releases from the
            Mozilla Public License 2.0 to the Business Source License 1.1. OpenTofu, under the
            Linux Foundation, continues the MPL line. Its first stable release was in January 2024.
            The introductory HCL on this page is the shared shape: a root module, resources,
            variables, outputs, a plan, and state. IBM completed its acquisition of HashiCorp in
            2025. The language of the files did not change with the owner.
          </p>
        </div>
      </section>

      <section className="panel px-5 py-8 sm:px-8">
        <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-tight">Beside other tools</h2>
        <p className="mt-3 max-w-2xl">
          These tools all touch infrastructure. They do not all mean the same thing by a change.
        </p>
        <div className="doc mt-4 overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Terraform</th>
                <th>CloudFormation</th>
                <th>Pulumi</th>
                <th>Ansible</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>You write</td>
                <td>HCL, or JSON</td>
                <td>YAML or JSON</td>
                <td>TypeScript, Python, Go, and other languages</td>
                <td>YAML playbooks of tasks</td>
              </tr>
              <tr>
                <td>Scope</td>
                <td>Many clouds and services, through providers</td>
                <td>AWS</td>
                <td>Many clouds and services</td>
                <td>Mostly the configuration of machines that exist</td>
              </tr>
              <tr>
                <td>Before a change</td>
                <td>
                  <code>terraform plan</code>
                </td>
                <td>A change set</td>
                <td>
                  <code>pulumi preview</code>
                </td>
                <td>The tasks run in order</td>
              </tr>
              <tr>
                <td>Memory</td>
                <td>A state file, or a remote backend</td>
                <td>The stack, kept by AWS</td>
                <td>Pulumi state</td>
                <td>Little. It looks at the machine.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="doc mt-2 max-w-2xl">
          <h3>CloudFormation</h3>
          <p>
            Both describe a desired stack and can show a change before they make it. CloudFormation
            is AWS. The template is YAML or JSON, and AWS keeps the memory of the stack. Terraform
            uses HCL, keeps its own state, and talks to AWS through a provider. The same language
            also talks to other clouds. A team that will only ever use AWS can stay in
            CloudFormation and never keep a state file of their own.
          </p>
          <h3>Pulumi</h3>
          <p>
            Both are desired-state tools with a preview and a state. Pulumi writes the description
            in a general-purpose language, so loops, types, and tests are the ones you already
            know. Terraform writes it in HCL, which is smaller and is built for resource blocks.
            The graph and the plan are the shared idea. The language on the page is the difference.
          </p>
          <h3>Ansible</h3>
          <p>
            Ansible is a list of tasks, usually aimed at a machine that already exists: packages,
            files, services. Order is the order of the play. Terraform is a description of objects
            that may not exist yet, and the graph, not the file order, decides what happens first.
            Teams often use both. Ansible configures the machine. Terraform decides the machine
            should exist.
          </p>
        </div>
      </section>

      <section className="panel px-5 py-8 sm:px-8">
        <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-tight">Why someone reaches for it</h2>
        <div className="doc mt-3 max-w-2xl">
          <p>People choose Terraform when a change to infrastructure should be reviewed before it happens.</p>
          <ul>
            <li>One language should describe more than one cloud, or a cloud plus DNS, a database, and a SaaS API.</li>
            <li>A plan should say what will be created, changed, and destroyed, and apply should be a separate step.</li>
            <li>The order of work should come from references, not from the order of the lines.</li>
            <li>The memory of what was created should be state, so the next plan can tell a create from a no-op.</li>
          </ul>
          <p>
            A one-off click in a console, or a script that will run once, does not need this. Terraform
            earns its place when the description will be read again, and when being wrong in production
            is more expensive than reading a plan.
          </p>
        </div>
      </section>

      <section className="panel px-5 py-8 sm:px-8">
        <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-tight">Where it is used</h2>
        <div className="doc mt-3 max-w-2xl">
          <p>
            The following is in the providers, and in the habit of reviewing a plan the way a team
            reviews code.
          </p>
          <ul>
            <li>
              <strong>Clouds. </strong>
              Providers cover Amazon Web Services, Microsoft Azure, and Google Cloud: networks,
              buckets, accounts, and clusters, written as resources.
            </li>
            <li>
              <strong>Kubernetes and SaaS. </strong>
              A provider can describe a Kubernetes object, a GitHub repository, a DNS record, or a
              monitoring check. The block shape stays the same. The provider changes.
            </li>
            <li>
              <strong>Review. </strong>
              A change shows up as a plan: what will be added, changed, and destroyed. People read
              that plan before apply.
            </li>
          </ul>
          <p>
            The lessons stay on <code>hashicorp/random</code> and <code>hashicorp/local</code> so the
            shape can be learned with no cloud account. The last block on the page is an S3 bucket
            you only read.
          </p>
          <p>
            <Link href="/#root">Start with the file</Link> when you want the blocks those plans are made of.
          </p>
        </div>
      </section>
    </article>
  );
}
