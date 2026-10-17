export type Choice = {
  id: string;
  label: string;
};

export type Check = {
  id: string;
  prompt: string;
  options: Choice[];
  answer: string;
  explanation: string;
};

export type Lesson = {
  id: string;
  chapter: string;
  title: string;
  summary: string;
  code: string;
  notice: string;
  aside?: string;
  plan: string;
  reading?: string;
  checks: Check[];
};

export function hcl(code: string): string {
  const lines = code.replace(/^\n/, "").replace(/\n\s*$/, "").split("\n");
  const pad = lines
    .filter((line) => line.trim().length > 0)
    .reduce((min, line) => Math.min(min, line.match(/^ */)?.[0].length ?? 0), 80);
  return lines.map((line) => line.slice(pad)).join("\n");
}

const petPlan = hcl(`
  Terraform used the selected providers to generate the following execution
  plan. Resource actions are indicated with the following symbols:
    + create

  Terraform will perform the following actions:

    # random_pet.camp will be created
    + resource "random_pet" "camp" {
        + id        = (known after apply)
        + length    = 2
        + separator = "-"
      }

  Plan: 1 to add, 0 to change, 0 to destroy.
`);

export const lessons: Lesson[] = [
  {
    id: "root",
    chapter: "The description",
    title: "The file describes the camp",
    summary:
      "A Terraform configuration is a description of what should exist. Terraform reads the whole file, then decides what to create. It does not run the lines from the top the way a shell script does.",
    code: hcl(`
      resource "random_pet" "camp" {
        length = 2
      }
    `),
    notice:
      "The directory that holds this file is the root module. One resource block is enough for a first plan. The next lesson names the provider that owns random_pet.",
    plan: petPlan,
    checks: [
      {
        id: "root-run",
        prompt: "What does Terraform do with this file?",
        options: [
          { id: "a", label: "Runs the first line, then the next, and stops at the bottom" },
          { id: "b", label: "Reads the whole description, then proposes a plan" },
          { id: "c", label: "Sends the file to a cloud account" },
        ],
        answer: "b",
        explanation:
          "The file is a desired state. Terraform builds a plan from all of it. Line order is not the order of work.",
      },
      {
        id: "root-module",
        prompt: "What is the directory that holds this file called?",
        options: [
          { id: "a", label: "The root module" },
          { id: "b", label: "The state file" },
          { id: "c", label: "The provider" },
        ],
        answer: "a",
        explanation:
          "The root module is the working directory Terraform reads. State is a separate memory of what was created. A provider is the plugin that knows one kind of object.",
      },
    ],
  },
  {
    id: "providers",
    chapter: "The description",
    title: "The terraform block names the provider",
    summary:
      "A provider is the plugin that knows how to create one family of objects. required_providers names that plugin and the versions Terraform may use.",
    code: hcl(`
      terraform {
        required_providers {
          random = {
            source  = "hashicorp/random"
            version = "~> 3.6"
          }
        }
      }

      resource "random_pet" "camp" {
        length = 2
      }
    `),
    notice:
      "source is the address on the public registry. ~> 3.6 allows 3.6.0 and later 3.x releases, and it refuses 4.0.0.",
    plan: petPlan,
    checks: [
      {
        id: "providers-role",
        prompt: "What does required_providers record?",
        options: [
          { id: "a", label: "The cloud account that will be billed" },
          { id: "b", label: "Which provider plugin to fetch, and which versions are allowed" },
          { id: "c", label: "The order of the resource blocks" },
        ],
        answer: "b",
        explanation:
          "terraform init reads this block and downloads the provider. It does not choose an account, and it does not reorder the resources.",
      },
      {
        id: "providers-version",
        prompt: "Which version satisfies ~> 3.6?",
        options: [
          { id: "a", label: "3.6.2" },
          { id: "b", label: "4.0.0" },
          { id: "c", label: "3.5.1" },
        ],
        answer: "a",
        explanation:
          "The pessimistic constraint allows the 3.6 line and later patches in 3.x. It stops at the next major version, and it does not go backward to 3.5.",
      },
    ],
  },
  {
    id: "resource",
    chapter: "A resource",
    title: "A resource has a type and a name",
    summary:
      "A resource block declares one object Terraform should make sure exists. The type comes from the provider. The name is yours. Arguments inside the block are the settings.",
    code: hcl(`
      terraform {
        required_providers {
          random = {
            source  = "hashicorp/random"
            version = "~> 3.6"
          }
        }
      }

      resource "random_pet" "camp" {
        length    = 2
        separator = "-"
      }
    `),
    notice:
      "random_pet is the type. camp is the local name. The address of this object is random_pet.camp. length and separator are arguments. The id is not an argument. The provider fills it in when the object is created.",
    plan: petPlan,
    checks: [
      {
        id: "resource-address",
        prompt: "What is the address of this object?",
        options: [
          { id: "a", label: "random_pet.camp" },
          { id: "b", label: "camp.random_pet" },
          { id: "c", label: "hashicorp/random" },
        ],
        answer: "a",
        explanation: "The address is type.name. hashicorp/random is the provider source, not this resource.",
      },
      {
        id: "resource-name",
        prompt: "Which word in the block did you choose?",
        options: [
          { id: "a", label: "random_pet, the type" },
          { id: "b", label: "camp, the name" },
          { id: "c", label: "length, the argument" },
        ],
        answer: "b",
        explanation:
          "The type is defined by the provider. The name is a label in this module so other blocks can refer to this object. length is a setting, not the name.",
      },
    ],
  },
  {
    id: "names",
    chapter: "A resource",
    title: "A variable is an input. A local is a name.",
    summary:
      "A variable is a value the caller can set, with a default when they do not. A local names an expression in this module. A local is not an object Terraform creates.",
    code: hcl(`
      variable "length" {
        type    = number
        default = 2
      }

      resource "random_pet" "camp" {
        length = var.length
      }

      locals {
        marker = "camp-\${random_pet.camp.id}"
      }
    `),
    notice:
      "var.length reads the input. With no other value, the default 2 is what the plan uses. marker is computed from the pet's id, so it cannot exist before the pet does. It still is not a resource.",
    plan: hcl(`
      Terraform will perform the following actions:

        # random_pet.camp will be created
        + resource "random_pet" "camp" {
            + id        = (known after apply)
            + length    = 2
            + separator = "-"
          }

      Plan: 1 to add, 0 to change, 0 to destroy.

      locals.marker is not listed. A local is a name for an expression,
      not an object to create.
    `),
    checks: [
      {
        id: "names-default",
        prompt: "What value of length does this plan use?",
        options: [
          { id: "a", label: "2, the default" },
          { id: "b", label: "The text var.length" },
          { id: "c", label: "Nothing, until someone edits the state file" },
        ],
        answer: "a",
        explanation:
          "The plan resolves the variable. The default is 2, so the resource shows length = 2, not the expression that produced it.",
      },
      {
        id: "names-local",
        prompt: "Why is locals.marker absent from the plan?",
        options: [
          { id: "a", label: "A local is a name, not a resource, so there is nothing to create" },
          { id: "b", label: "The local is created only when the file lists it first" },
          { id: "c", label: "Plans never show names that contain a hyphen" },
        ],
        answer: "a",
        explanation:
          "Terraform plans changes to resources and outputs. A local is computed when something uses it. It has no separate create action.",
      },
    ],
  },
  {
    id: "outputs",
    chapter: "A resource",
    title: "An output hands a value back",
    summary:
      "An output publishes a value from the module. Callers, the CLI, and other modules can read it. The pet's id does not exist until apply, so the plan says the output will be known then.",
    code: hcl(`
      resource "random_pet" "camp" {
        length = 2
      }

      output "camp_name" {
        value = random_pet.camp.id
      }
    `),
    notice:
      "value is an expression. Here it is the id the provider will assign. The name camp_name is how you ask for that result after apply.",
    plan: hcl(`
      Terraform will perform the following actions:

        # random_pet.camp will be created
        + resource "random_pet" "camp" {
            + id        = (known after apply)
            + length    = 2
            + separator = "-"
          }

      Changes to Outputs:
        + camp_name = (known after apply)

      Plan: 1 to add, 0 to change, 0 to destroy.
    `),
    checks: [
      {
        id: "outputs-when",
        prompt: "When is camp_name known?",
        options: [
          { id: "a", label: "After apply, once the pet has an id" },
          { id: "b", label: "As soon as the file is saved" },
          { id: "c", label: "Never. Outputs are comments." },
        ],
        answer: "a",
        explanation:
          "The plan can see that an output will exist. It cannot print the id, because the provider chooses that id during apply.",
      },
      {
        id: "outputs-role",
        prompt: "What is an output for?",
        options: [
          { id: "a", label: "To report a value from this module" },
          { id: "b", label: "To create a second pet" },
          { id: "c", label: "To store the cloud password" },
        ],
        answer: "a",
        explanation:
          "An output is a result, not another resource. It should not be where secrets are kept for convenience. State, not the output block, is the memory of the object.",
      },
    ],
  },
  {
    id: "graph",
    chapter: "The graph",
    title: "A reference is an edge",
    summary:
      "When one block reads another, Terraform learns the order. The marker file needs the pet's id, so the pet comes first. Swapping the blocks in the file does not change that.",
    code: hcl(`
      terraform {
        required_providers {
          random = {
            source  = "hashicorp/random"
            version = "~> 3.6"
          }
          local = {
            source  = "hashicorp/local"
            version = "~> 2.5"
          }
        }
      }

      resource "random_pet" "camp" {
        length = 2
      }

      resource "local_file" "marker" {
        filename = "camp-name.txt"
        content  = random_pet.camp.id
      }
    `),
    notice:
      "content = random_pet.camp.id is the edge. local_file.marker depends on random_pet.camp. Terraform, not the order of the text, walks that edge.",
    aside:
      "hashicorp/local writes a file on the machine where Terraform runs. It does not need a cloud account. The examples earlier on this page are the same kind of provider.",
    plan: hcl(`
      Terraform will perform the following actions:

        # local_file.marker will be created
        + resource "local_file" "marker" {
            + content              = (known after apply)
            + directory_permission = "0777"
            + file_permission      = "0777"
            + filename             = "camp-name.txt"
            + id                   = (known after apply)
          }

        # random_pet.camp will be created
        + resource "random_pet" "camp" {
            + id        = (known after apply)
            + length    = 2
            + separator = "-"
          }

      Plan: 2 to add, 0 to change, 0 to destroy.

      marker is listed first in this text. It is still created second,
      because its content reads random_pet.camp.id.
    `),
    checks: [
      {
        id: "graph-first",
        prompt: "Which object is created first?",
        options: [
          { id: "a", label: "random_pet.camp, because the file reads its id" },
          { id: "b", label: "local_file.marker, because a plan always creates files first" },
          { id: "c", label: "Whichever block sits higher in the file" },
        ],
        answer: "a",
        explanation:
          "The reference is the dependency. The pet has to exist before its id can be written into the file.",
      },
      {
        id: "graph-swap",
        prompt: "What changes if you move the local_file block above random_pet?",
        options: [
          { id: "a", label: "Nothing about the order. The reference is still the edge." },
          { id: "b", label: "The file is created first and the pet is skipped" },
          { id: "c", label: "Terraform refuses the configuration" },
        ],
        answer: "a",
        explanation:
          "Block order in the file is for the reader. The graph comes from references, and from explicit depends_on when a reference is not enough.",
      },
    ],
  },
  {
    id: "plan-apply",
    chapter: "Plan and state",
    title: "Plan proposes. Apply changes.",
    summary:
      "terraform plan compares the description with what already exists and prints a proposal. terraform apply is the command that carries the proposal out. This page stops at the proposal.",
    code: hcl(`
      resource "random_pet" "camp" {
        length = 2
      }
    `),
    notice:
      "A plan is allowed to say create, change, or destroy. Those words are a preview. Nothing is created until apply. The closing line counts the actions.",
    aside:
      "Groma shows a plan that was written for this lesson. It does not run Terraform, it does not run apply, and it does not ask for credentials.",
    plan: hcl(`
      Terraform will perform the following actions:

        # random_pet.camp will be created
        + resource "random_pet" "camp" {
            + id        = (known after apply)
            + length    = 2
            + separator = "-"
          }

      Plan: 1 to add, 0 to change, 0 to destroy.
    `),
    checks: [
      {
        id: "plan-effect",
        prompt: "What does terraform plan change?",
        options: [
          { id: "a", label: "Nothing. It prints the proposal." },
          { id: "b", label: "It creates the pet and writes the state file" },
          { id: "c", label: "It deletes every resource that is not in the file" },
        ],
        answer: "a",
        explanation:
          "Plan is a read of the difference. Apply is the write. A destroy appears in the proposal only when the description no longer asks for something state remembers.",
      },
      {
        id: "plan-count",
        prompt: "What would apply do with this plan?",
        options: [
          { id: "a", label: "Create random_pet.camp" },
          { id: "b", label: "Change an existing pet and destroy another" },
          { id: "c", label: "Refuse, because the id is not filled in yet" },
        ],
        answer: "a",
        explanation:
          "1 to add means one create. (known after apply) is normal. The provider chooses the id during apply.",
      },
    ],
  },
  {
    id: "state",
    chapter: "Plan and state",
    title: "State is the memory of what was created",
    summary:
      "After apply, Terraform records the objects in terraform.tfstate. The next plan compares the configuration with that memory. If they agree, the plan is empty.",
    code: hcl(`
      resource "random_pet" "camp" {
        length = 2
      }
    `),
    notice:
      "The configuration does not store the generated id. State does. A later plan uses that memory to tell a create from a change from a no-op.",
    aside:
      "State can hold secrets that the provider returned. Do not commit terraform.tfstate. This website never receives a state file.",
    plan: hcl(`
      No changes. Your infrastructure matches the configuration.

      Terraform has compared your real infrastructure against your
      configuration and found no differences, so no changes are needed.

      That is the plan after apply. The memory that made it possible
      recorded the pet, in shortened form:

      {
        "type": "random_pet",
        "name": "camp",
        "attributes": {
          "id": "steady-heron",
          "length": 2,
          "separator": "-"
        }
      }
    `),
    checks: [
      {
        id: "state-next",
        prompt: "The file is unchanged after a successful apply. What does the next plan report?",
        options: [
          { id: "a", label: "No changes. The configuration matches the recorded objects." },
          { id: "b", label: "Another create, because a plan always adds one" },
          { id: "c", label: "A destroy, because the id was missing from the configuration" },
        ],
        answer: "a",
        explanation:
          "State already remembers random_pet.camp. The length still matches, so there is nothing to add, change, or destroy.",
      },
      {
        id: "state-where",
        prompt: "Where does the pet's id live between commands?",
        options: [
          { id: "a", label: "In terraform.tfstate, on the machine that applied" },
          { id: "b", label: "In this website, beside the lesson" },
          { id: "c", label: "Only in the length argument" },
        ],
        answer: "a",
        explanation:
          "The id is an attribute the provider assigned. State keeps it. Groma stores neither the id nor the state file.",
      },
    ],
  },
  {
    id: "reading",
    chapter: "Reading",
    title: "A data source reads. A cloud block is the same shape.",
    summary:
      "A data source looks up something that already exists. It does not create it. A cloud resource is written with the same resource \"type\" \"name\" shape, and this page does not plan one.",
    code: hcl(`
      terraform {
        required_providers {
          local = {
            source  = "hashicorp/local"
            version = "~> 2.5"
          }
        }
      }

      data "local_file" "marker" {
        filename = "camp-name.txt"
      }
    `),
    notice:
      "data.local_file.marker reads a file. If the earlier local_file resource created camp-name.txt, this block can read it. If the file is missing, apply stops. The data source will not create the file to recover.",
    aside:
      "The random and local examples on this page can be run later with Terraform and no cloud account. The bucket below is not one of those examples.",
    plan: hcl(`
      This plan is only for the data source.

        # data.local_file.marker will be read during apply
       <= data "local_file" "marker" {
            + content  = (known after apply)
            + filename = "camp-name.txt"
            + id       = (known after apply)
          }

      Plan: 0 to add, 0 to change, 0 to destroy.
    `),
    reading: hcl(`
      resource "aws_s3_bucket" "records" {
        bucket = "groma-survey-records"
      }
    `),
    checks: [
      {
        id: "reading-data",
        prompt: "What does data.local_file.marker do?",
        options: [
          { id: "a", label: "Reads a file that already exists" },
          { id: "b", label: "Creates camp-name.txt when it is missing" },
          { id: "c", label: "Uploads the file to a bucket" },
        ],
        answer: "a",
        explanation:
          "A data source is a read. Creating the file is the job of a resource, such as local_file in the earlier lesson. The arrow in the plan is <=, not + create.",
      },
      {
        id: "reading-cloud",
        prompt: "Why is aws_s3_bucket.records left out of the plan?",
        options: [
          { id: "a", label: "Planning it would need cloud credentials, which this site does not ask for" },
          { id: "b", label: "A bucket cannot be written as a resource block" },
          { id: "c", label: "Data sources and resources cannot appear in the same chapter" },
        ],
        answer: "a",
        explanation:
          "The bucket block is the same shape as any other resource. Groma shows it so you can read the shape. It does not configure the AWS provider and it does not apply the bucket.",
      },
    ],
  },
];

export function chapterId(chapter: string): string {
  return chapter
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function lessonsByChapter(source: Lesson[] = lessons): { chapter: string; lessons: Lesson[] }[] {
  const order: string[] = [];
  const groups = new Map<string, Lesson[]>();
  for (const lesson of source) {
    const group = groups.get(lesson.chapter);
    if (group) {
      group.push(lesson);
    } else {
      order.push(lesson.chapter);
      groups.set(lesson.chapter, [lesson]);
    }
  }
  return order.map((chapter) => ({ chapter, lessons: groups.get(chapter) ?? [] }));
}
