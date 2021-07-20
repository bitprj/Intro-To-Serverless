# How to contribute

👋 Hi! Great that you want to contribute to Intro-to-Serverless! 😃

We're currently focussed on creating beginner content for Azure Functions written in Javascript, and using VSCode as the code editor.

## Step 1 - GitHub Issues

🔎 Please check if there's an [existing issue](https://github.com/bitprj/Intro-To-Serverless/issues) which matches your idea. Perhaps you can collaborate with someone on this.

💡 If you have new idea, please [create a new __Content Request__ issue](https://github.com/bitprj/Intro-To-Serverless/issues/new) first where you can describe the topic.

🤝 Want to help out? Get started on an issue [labeled as `Good First Issue`](https://github.com/bitprj/Intro-To-Serverless/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22) and open a pull request to contribute.

## Step 2 - Process

Once we've discussed the Content Request issue and agree to include the lesson, you can start by forking the [Intro to Serverless repository](https://github.com/bitprj/Intro-To-Serverless) and create a new branch for the topic you want to add

Once you've created the lesson, submit a PR with the lesson, source code, and related files as mentioned in the next section. It will probably take a few iterations to get everything right, don't feel discouraged by this process ♥.

### Curriculum Structure

> Students advance through the curriculum by committing code, merging pull requests, and commenting on issues. These commits are checked by the CounselorBot and students advance next section where further instructions are provided by the bot through comments. For this to work, the curriculum stages need to be created in a specific format.

Our curriculum consists of several parts:

#### :one: Response Files
> Response files are located in the `.bit/responses` folder named `{week number}.{step number}-{step title}.md` Example: `.bit/responses/1.1-Week 1 Step 1.md`.
- Use the [step template file](.bit/step-template.md).
- Give the lesson a short but descriptive title. (Make it fun!)
- Create a **task list** for the student
- Use the `Test Your Work` section if applicable
- Place long explanations and/or more detailed step by step instructions in **dropdowns**
- Split the step into clearly marked and digestable sections
- Try your best to make the curriculum **not "copy-paste."** Ask students to read documentation instead of directly providing them the answer!
- Use code samples and plenty of :exclamation:, :question: and :bulb: call-outs. (Examples are in the template)

Yes, this is a long list, but you don't have to do everything by yourself, we can work together on this! 💪

#### :two: Formatting and Configuring the Step
> To ensure your response files will be able to work with the bot and automations, please adhere to the formats specified below and in the template!

**File name format:** `{week #}.{step #}-{step name}.md`

Example: `1.1-Week Step 1.md`

**File path:** `.bit/responses/{week #}.{step #}-{step name}.md`

**Starting the response file:**

* Response files should begin with a **markdown table**
* There should be a subtitle that includes a progress bar, the week and step number, and an estimated completion time.
* The **title** should be formatted with **h2**.
* The Task list title must be formatted in **h3**.

Example:
```
---
files: index.html, js/config.js, README.md
stepType: PRmerge
scripts: n/a
week: 1
step: 1
name: Week 1 Step 1
---
Week 1 Step 1 ⬤◯◯◯◯◯ | 🕐 Estimated completion: 10-30 minutes

## Week 1 Step 1

### ✅ Tasks:
```

**Step Types**
> :exclamation: You can only have one stepType per step. Place the name of the step type in the `stepType` field. Ex: `stepType: checks`

`PRmerge`
  * Place files paths in the `files` field on the table that the student should **include in the pull request** to move on to the next step.
  * Leave the `scripts` field as `n/a`
  * Ex: If you place `index.js` in the table for the first step of Week 1, a student will need to merge a pull request containing the file `index.js` in order for the bot to comment the second step of Week 1.

`checks`
  * Place a script that should be in the `.bit/tests` folder in the `scripts` field. Ex: `scripts: test.1.2.js`
  * Leave the `files` field as `n/a`
  * These scripts will run every time a student makes a commit.
  * If the script passes, then the student will be able to move on.

`IssueComment`
  * Leave both the `files` and `scripts` field as `n/a`
  * The bot will comment the new step once a student comments something on the issue or pull request.

`feedback`
  * Leave both the `files` and `scripts` field as `n/a`
  * The bot will comment the new step once a student comments something AND save their comment as a custom event for instructors to refer back to

#### :three: Solution Code
> If you add additional projects or steps to the curriculum, please place your solution code in this directory. If you modify step instructions that impact the code, please update the solution code as well.

**File name format:** `{week #}.{step #}-{project name}.js`

Example: `1.1-github.js`

**File path:** [`.bit/tests/sample-solutions/week{week#}/{week #}.{step #}-{project name}.js`](.bit/tests/sample-solutions)

:bulb: **Note:** For frontend curriculum (HTML/JS), associated files will be placed in folders.
#### :four: Writing Tests
> To ensure your response files will be able to work with the bot and automations, please adhere to the formats specified below and in the template!

**File name format:** `test.{week #}.{step #}.js`

Example: `1.1-Week Step 1.md`

**File path:** [`.bit/tests/test.{week #}.{step #}.js`](.bit/tests)

To make the test throw an error, please use these statements:

```js
console.error("Log the error for the student. Give a specific message that will be helpful!")
process.exit(1)
```
