## :camping: Camp Orientation

*Follow these instructions to get started with your counselor in your new cabin!*

### :book: Camp Vocabulary

| Camp      | Github     |
| --------- | ---------- |
| Cabin     | Repository |
| Issues    | Weeks      |
| Counselor | Github Bot |

### :robot: Installing the CounselorBot

<details>
<summary>Step by step instructions to install the bot ▶️ </summary>

To interact with your counselor on your repository, head to [this link](https://github.com/apps/counselorbot) and click **The Big Green Button** (Install).

![image](https://user-images.githubusercontent.com/69332964/114454174-4e930100-9ba8-11eb-8ac9-551e53795a18.png)



Next, **choose your personal account** to install the bot on.

![image](https://user-images.githubusercontent.com/69332964/114454284-72eedd80-9ba8-11eb-8c0b-b06055444001.png)



Make sure to **install it on ALL repositories** and then click **The Big Green Button** (Install & Authorize).

> This is **very important**: make sure **All repositories** is selected!

![image](https://user-images.githubusercontent.com/69332964/114454571-c06b4a80-9ba8-11eb-943d-cbe171e85ab0.png)



You should then be **automatically** redirected to [this repository](https://github.com/bitprj/Intro-To-Serverless)

![image](https://user-images.githubusercontent.com/69332964/114478884-4d27ff80-9bcd-11eb-905c-1c271069ea51.png)
<br>
</details>

### :house: Moving into your cabin

<details>
<summary>Step by step instructions to start the course ▶️ </summary>

Make sure you are on [this](https://github.com/bitprj/Intro-To-Serverless) repository, and once again, click on **The Big Green Button** (Use this template). You should be prompted to **name** your repo.

> **Tip:** Name your repository something serverless related! Here's a suggestion: `serverless-emotion-reader`

Once you're satisfied with your name, click **The Big Green Button** (Create repository from template)! 

![image](https://user-images.githubusercontent.com/69332964/114455919-4340d500-9baa-11eb-9ef3-359429ccafab.png)



Once your new cabin is created, you should **see a new issue** opened on the top bar of your repository **if you installed your bot correctly**.

![image](https://user-images.githubusercontent.com/69332964/114456826-54d6ac80-9bab-11eb-8f22-2c939d26356c.png)



Click on `Issues` to find your first Week in the camp: `Getting Started`.

![image](https://user-images.githubusercontent.com/69332964/114478985-806a8e80-9bcd-11eb-951c-ac6499317bd3.png)



**Click** on `Getting Started` to find your first step of the week. **Follow your counselor's** instructions and have fun!

![image](https://user-images.githubusercontent.com/69332964/114479022-8fe9d780-9bcd-11eb-956f-6e4132220e11.png)
<br>
</details>

### :x: The Step Failed. What do I do?
No worries, we all make mistakes - now is the time to fix it! The CounselorBot will provide feedback on what went wrong with your code.

<details>
<summary>Step by step instructions on how to view feedback ▶️ </summary>

First, click on `Actions` at the top of your repository.
![image](https://user-images.githubusercontent.com/69332964/120932906-b4da6280-c6c5-11eb-97f8-b8311c72eabb.png)

Next, find the commit that failed. You can identify it by the name you called the commit. **Click on it!**
<img width="1019" alt="Screen Shot 2021-06-06 at 12 51 31 PM" src="https://user-images.githubusercontent.com/69332964/120933012-3cc06c80-c6c6-11eb-9ca9-f3b19a8bb0b8.png">

Now, go ahead and click on ":x: build"
![image](https://user-images.githubusercontent.com/69332964/120933055-68435700-c6c6-11eb-88a9-af248114c6a9.png)

The step that failed **should expand** and you'll see feedback at the bottom. 
![image](https://user-images.githubusercontent.com/69332964/120935920-09380f00-c6d3-11eb-89fe-eec0983fa226.png)

For this one, the feedback was:
```
Error: Got: "hello world", was expecting: "Hello World". 
```
In this case, the student should probably take another look at the capitalization in their code.
<br>
</details>

> :bulb: Using this feedback, fix your code. Every time you commit, the action will run again to check your code!

### :question: Do I have to push a commit to run a check?

Nope! Here's how to manually trigger a check for your code to move on:

#### Setting up
1. Go to `Actions`
2. Click on the specific workflow run that you want to run again.
3. Click on build.

*Refer to the previous section for screenshots*

#### Re-running the check
Click on `Re-run jobs`. If your code is successful, the check will work and you will be able to move on.
<img width="1400" alt="Screen Shot 2021-06-06 at 1 15 32 PM" src="https://user-images.githubusercontent.com/69332964/120933780-a2622800-c6c9-11eb-8b66-8fd28e55e56e.png">
