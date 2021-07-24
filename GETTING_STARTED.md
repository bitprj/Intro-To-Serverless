## :camping: Camp Orientation

*Follow these instructions to get started with your counselor in your new cabin!*
<hr>

### :book: Camp Vocabulary

| Camp      | Github     |
| --------- | ---------- |
| Cabin     | Repository |
| Issues    | Weeks      |
| Counselor | Github Bot |
<hr>

### :computer: Computer Setup

<details>
<summary>Step by step instructions to setup your computer ▶️</summary>
<br>
 
1. Download or update to the newest version of MacOS or Windows.
> 🚩 If you are using Windows, it highly recommended that you use WSL. [Here's](https://docs.microsoft.com/en-us/windows/wsl/install-win10) how.  
2. Install [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git). If you are on Windows, you can install Git on Windows and it should come with WSL (Ubuntu). [Here's](https://docs.microsoft.com/en-us/windows/wsl/tutorials/wsl-git) how. 
3. If you are running WSL(Ubuntu), open a WSL terminal and install curl with the following command:
```
 apt-get install curl
 ```
4. Ensure that you have a [Github](https://github.com/) account and make note of the email address that you used to sign up for the account.   
5. Download [VS Code](https://code.visualstudio.com/download) for your operating system. 
> 🚩 If you are on Windows, [here's](https://code.visualstudio.com/docs/remote/wsl#:~:text=From%20the%20WSL%20terminal%201%20Open%20a%20WSL,3%20Type%20code%20.%20...%20More%20items...%20) how to use VS Code with WSL
6. Enable Azure Account and Azure Functions extensions in VS Code. See below: 

![Azure](https://user-images.githubusercontent.com/57218090/124665871-dff5d480-de72-11eb-86f0-35c3acf07db4.PNG)
<br>
7. Install homebrew if you're on Mac. You can find the instructions [here](https://brew.sh/)

Finally, you are ready for the setup script. Follow the steps listed below:

### If you're on Mac, open a terminal and run the following (otherwise skip to the next step): 
Run: 
```
sudo chown -R $(whoami) /usr/local/var/homebrew
```

### Run the following command in your terminal (WSL terminal if you're on windows)
```
bash <(curl -s https://raw.githubusercontent.com/bitprj/Intro-To-Serverless/fbec8b26e9b51152d389442d2d34dabc42d5923a/setup.sh)
```
The script should guide you much of the way._ Make sure to read the instructions it gives carefully. The script **will do the following automatically for you:**
- Checks if you already have an SSH key
- If not, it creates one for you, using your github email address.
- Copies the SSH key to your clipboard so you can paste it into your Github SSH key settings
- Installs Homebrew
- Sets up the folder structure and .bash_profile commands necessary to ensure nvm works correctly
- Uses nvm to install a version of Node which is compatible with Azure
- Sets up git command tab completion and modifies your terminal prompt to show your current git branch if you're inside a git repository.
- Closes the Terminal program to ensure that all changes are applied.

When everything completes successfully, close and re-open Terminal. Depending on your operating system, you may see the following insecure directories error message:
```
zsh compinit: insecure directories, run compaudit for list.
Ignore insecure directories and continue [y] or abort compinit [n]? yzsh compinit: insecure directories, run compaudit for list.
Ignore insecure directories and continue [y] or abort compinit [n]? y%     ~ $ 
```
Type ‘y’ two times
Run compaudit to see the affected directories
you may then see:
```
There are insecure directories:
/usr/local/share/zsh/site-functions
/usr/local/share/zsh
```
If this happens on Mac, run these commands and you should see the error message(s) cleared
```
sudo chown -R yourusername /usr/local/share/zsh/site-functions
sudo chown -R yourusername /usr/local/share/zsh
compaudit
```

</details>
<hr>

### ⚙️ Installing VS Code Extensions

<details>
<summary>Step by step instructions to install the Vscode extensions ▶️ </summary>
The features that Visual Studio Code includes out-of-the-box are just the start. VS Code extensions let you add languages, debuggers, and tools to your installation to support your development workflow. 
 
Take a look at these [instructions](https://code.visualstudio.com/docs/editor/extension-marketplace) on how to install VS Code extensions. If you already forked the Intro-To-Serverless repo, and opened it in Vs Code, you may have gotten a pop-up  which recommended some extensions. Some of the extensions we will need are:
 
- [Azure Tools](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-node-azure-pack)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint). 
- [Bracket Pair Colorizer](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer)
 
 > Watch this [video](https://www.youtube.com/watch?v=5IGVeq2DdsA) on how to use ESLint with VS Code.
</details>
<hr>

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
<hr>

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
<hr>

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
<hr>

### 🤔 General Debugging Guide

<details>
<summary>Helpful tips in fixing errors ▶️ </summary>
 
Configuration Tips
 
- [ ] Check to make sure that your Azure account (and any resources) was set up properly
- [ ] Make sure that your VS Code is linked to the right Azure account locally
- [ ] When in doubt (or when you make any settings changes on VS Code) close the app and open it again
- [ ] If any action on VS Code is taking longer than it should then close vscode/azure portal and reopen it before trying again
- [ ] If you're Azure account isn't working get a new one WITH the verification code assigned to you (xxxx-xxxx-xxxx-xxxx...)

General Tips
 
- [ ] Adding extra console.log, console.error etc lines to the code
- [ ] How to add a [breakpoint](https://code.visualstudio.com/docs/editor/debugging) and step through code in VS code
- [ ] How and When to add a [log point](https://www.youtube.com/watch?v=g44TZ9ckWQk) and step through code in VS code 
- [ ] Find the debug log inside the azure portal a deployed function
- [ ] Make sure to save/autosave your code
 
 [Microsoft's Debugging Guide](https://docs.microsoft.com/en-us/visualstudio/debugger/debugging-absolute-beginners?view=vs-2019&tabs=csharp)
 
<br>
</details>
<hr>

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
<hr>

### :question: Can I run a check on my own computer?
Yes! You absolutely can. Here is how to configure VScode to allow local checking. This is optional, and is useful if you want to check your code without first commiting for the counselor bot to check. 

1. Go into the `.vscode` folder and click into the `launch.json` file. 
2. Edit the `launch.json` file to be:
```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Attach to Node Functions",
            "type": "node",
            "request": "attach",
            "port": 9229,
            "preLaunchTask": "func: host start"
        },
        {
            "name": "Run Tests",
            "type": "node",
            "request": "launch",
            "console": "integratedTerminal",
            "program": "${workspaceRoot}/.bit/tests/test.${input:week}.${input:step}.js",
            "envFile": "${workspaceRoot}/.env",
            "preLaunchTask": "func: host start"
        }    
    ],
    "inputs": [
        {
          "id": "week",
          "description": "Please select the current week as a number",
          "type": "pickString",
          "options": ["1", "2", "3", "4"],
        },
        {
            "id": "step",
            "description": "Please enter the current step as a number",
            "type": "pickString",
            "options": ["1", "2", "3", "4","5", "6", "7", "8", "9", "10", "11"],
        }
    ]
}
```
3. Create a `.env` file to the root of your project. If done correctly, the `.env` file will show up next to the `.funcignore` file. 
4. Add all the secrets you have in GitHub for that step and any Azure function settings you have in Azure to the `.env` file in the format:
```json
KEY=value
KEY2=value2
```
5. You are all setup. To run this go to the "Run and Debug" tab on the left panel. At the top, where it says, `Attach to Node Functions`, click the dropdown and select `Run Tests`. Now, you can click the green arrow, and follow the prompted steps to test your function locally!

❗❗ This is not required, as you can always commit your code to the counselor bot to check, but is definitely good to know. 
