# How to contribute

👋 Hi! Great that you want to contribute to Intro-to-Serverless! 😃

We're currently focussed on creating beginner content for Azure Functions written in Javascript, and using VSCode as the code editor.

## Step 1 - GitHub Issues

🔎 Please check if there's an [existing issue](https://github.com/bitprj/Intro-To-Serverless/issues) which matches your idea. Perhaps you can collaborate with someone on this.

💡 If you have  new idea, please [create a new __Content Request__ issue](https://github.com/bitprj/Intro-To-Serverless/issues/new) first where you can describe the topic.

## Step 2 - Process

Once we've discussed the Content Request issue and agree to include the lesson, you can start by forking the [Intro to Serverless repository](https://github.com/bitprj/Intro-To-Serverless) and create a new branch for the topic you want to add

Once you've created the lesson, submit a PR with the lesson, source code, and related files as mentioned in the next section. It will probably take a few iterations to get everything right, don't feel discouraged by this process ♥.

### Curriculum Structure

If you are contributing to create a lesson, please take into account the length and the tone of the existing lessons. We want to have a uniform experience across all of our lessons.

Our curriculum consists of several parts:

#### :one: Response Files
> Response files are located in the `.bit/responses` folder named `{week number}.{step number}-{step title}.md` Example: `.bit/responses/1.1-Week 1 Step 1.md`.
- Use the [step template file](.bit/step-template.md).
- Give the lesson a short but descriptive title. (Make it fun!)
- Create a task list for the student
- Use the Test Your Work section if applicable
- Place long explanations and/or more detailed step by step instructions in dropdowns
- Split the step into clearly marked and digestable sections
- Try your best to make the curriculum not "copy-paste." Ask students to read documentation instead of directly providing them the answer!
- Use code samples and plenty of :exclamation:, :question: and :bulb: call-outs. (Examples are in the template)
- Use gender-neutral language and avoid words such as 'easy' or 'simple'.

Yes, this is a long list, but you don't have to do everything by yourself, we can work together on this! 💪

### Formatting Requirements

In order for the template to successfully sync and parse content, the files **must** be named and formatted like so:

#### :file_folder: [Response files](https://github.com/bitprj/cabin/tree/main/.bit/responses)

File name format: `[Week#].[Step#]-[Step title].md`

> Example: `1.1-Week Step 1.md`

File path: `/.bit/responses/[all response files]`

File content:
* Response files should begin with a **markdown table**
  * Place files here that the student should **include in the pull request** to move on to the next step.
  * Ex: If you place `index.js` in the table for the first step of Week 1, a student will need to merge a pull request containing the file `index.js` in order for the bot to comment the second step of Week 2.
  * Also, place the **week, step number, and step name** in this table.
* The **title** should be formatted with **h2**.
* The **description** of the step should be placed directly under formatted in **h3**.

> Example:
```md
---
files: index.html, js/config.js, README.md
week: 1
step: 1
name: Week 1 Step 1
---

## Week 1 Step 1

### This is the description
```

**Note: Pay special attention to how the files are spaced and where slashes are put.**