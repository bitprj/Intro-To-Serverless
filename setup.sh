#!/bin/bash

# Text colors
lightblue=$'\e[97;104m'
red=$'\e[97;41m'
green=$'\e[97;42m'
clear=$'\e[0m'
newline=$'\n'

# Emojis
tada=$'\xF0\x9F\x8E\x89'
rocket=$'\xF0\x9F\x9A\x80'
thumbs_up=$'\xF0\x9F\x91\x8D'
space_invader=$'\xF0\x9F\x91\xBE'
sweat_smile=$'\xF0\x9F\x98\x85'
hourglass=$'\xE2\x8C\x9B'
check_mark=$'\xE2\x9C\x85'
grimace=$'\xF0\x9F\x98\xAC'
mac_command_symbol=$'\xC2\x9D'
sweat_drops=$'\xF0\x9F\x92\xA6'
point_up=$'\xF0\x9F\x91\x86'

# Intro
echo -e "${green}${tada} Welcome to Bit Project! ${tada}${clear}"
echo -e "${lightblue}I will help you install some useful tools you'll need for this cohort! ${rocket}"
echo -e "While this script is installing these tools on your computer you will be asked to enter your password a few times."
echo -e "Just type the same password you use to log into your computer and press return. "
echo -e "Also, if you're prompted to enter [Y/n], just type 'Y' and hit enter."
read -p "Try it now ${hourglass} (return)${clear}"
echo -e "${lightblue}Perfect! You're well on your way! ${rocket}"
read -p "${green}What is your first and last name? (first and last only):${clear} " first_name last_name
echo

while [[ -z ${first_name} || -z ${last_name} ]]
do
    echo -e "${red}Whoops, looks like you may have entered something incorrectly"
    echo -e "Anytime that happens, the text will become red"
    read -p "Please try again. Make sure to type both first AND last names:${clear} " first_name last_name
    echo
done

echo -e "${lightblue}Nice to meet you, ${first_name}!"

# Install some extra dependencies if they're running Linux
if [[ $OSTYPE == linux* ]]
then
    echo -e "It looks like you're using a Linux machine."
    echo -e "In order for this setup to continue correctly, I'm going to need to install a few things first"
    echo -e "When you're prompted to enter a password, you'll enter the password you created when you set up"
    echo -e "your Linux distribution. If you're using Windows Subsystem for Linux, this is NOT your Windows password"
    echo -e "but the Linux/Ubuntu password you set up when you first installed it."
    echo -e "Also, IT WILL LOOK LIKE NOTHING IS TYPING, but it really is. Hit enter when you're done entering your password${clear}"
    
    sudo apt-get update
    sudo apt-get install xdg-utils xclip openssh-client build-essential
fi

# SSH Key
echo -e "${lightblue}Now I'll be creating an SSH key for you."
read -p "This is useful for communicating securely with external services, like GitHub (return)${clear}"

# If SSH Key already exists
if [[ -f ~/.ssh/id_rsa.pub ]]
then
    echo
    sleep 1
    echo -e "${lightblue}Oh wait..."
    sleep 1
    read -p "Actually, it looks like you've already got an SSH key, which is great! ${thumbs_up} (return)${clear}"

    # Save public ssh file contents in variable (looking for the comment)
    IN=$( cat ~/.ssh/id_rsa.pub )
    # Split the string into an array
    arrIN=(${IN})
    # Get the 3rd argument (comment of ssh file, could be email)
    comment=${arrIN[2]}

    echo -e "${lightblue}I was able to pull the email address ${comment} from your existing SSH key."
    read -p "(It's possible this                  ${point_up} isn't really a valid email address, so bear with me.) (return)"
    echo
    echo -e "In a minute, I'll open a browser window to your GitHub settings page so you can verify the email you use for GitHub "
    echo -e "(Just in case something goes wrong, the URL is https://github.com/settings/emails) "
    echo -e "Make sure to come back here once you've verified your email address"
    echo -e "Also, just FYI, you may have to log in to GitHub before it takes you to the settings page (return)${clear}"
    read -p "${green}Okay, for real this time. Hit return to open the GitHub settings page (return)${clear}"

    # Open Github in a browser
    if [[ $OSTYPE == darwin* ]]
    then
        /usr/bin/open https://github.com/settings/emails
    elif [[ $OSTYPE == linux* ]]
    then
        xdg-open https://github.com/settings/emails
    fi

    echo
    echo -e "${lightblue}Welcome back, ${first_name}!${clear}"
    read -p "${green}So, is ${comment} the actual email address you use for GitHub? Y/n:${clear} " response;echo
    while [[ ! ${response} =~ ^[Yy]$ && ! ${response} =~ ^[Nn]$ ]]
    do
        read -p "${red}Whoops, I missed that. Please enter Y or N:${clear} " response;echo
    done

    if [[ ${response} =~ ^[Yy]$ ]]
    then
        email=${comment}
        read -p "${lightblue}Great! We can move forward to the next step then! ${rocket} (return)${clear}"
    elif [[ ${response} =~ ^[Nn]$ ]]
    then
        read -p "${green}Okay, no problem. Please enter the email address you use for GitHub:${clear} " email
        ssh-keygen -f ~/.ssh/id_rsa -c -C ${email}
        read -p "${lightblue}Alright, I've updated your SSH key to contain the correct email address! (return)${clear}"
    fi

# If no existing SSH key found, need to create a new one
else
    sleep 1
    echo
    echo -e "${lightblue}Yup, just checked and it looks like you don't have an SSH file yet, so let's make one now!"
    echo -e "In a minute, I'll open a browser window to your GitHub settings page."
    echo -e "(Just in case something goes wrong, the URL is https://github.com/settings/emails) "
    echo -e "Make sure to come back here once you've verified your email address"
    echo -e "Also, just FYI, you may have to log in to GitHub before it takes you to the settings page${clear}"
    read -p "${green}Okay, for real this time. Hit return to open the GitHub settings page (return)${clear}"

    # Open Github in a browser
    if [[ $OSTYPE == darwin* ]]
    then
        /usr/bin/open https://github.com/settings/emails
    elif [[ $OSTYPE == linux* ]]
    then
        xdg-open https://github.com/settings/emails
    fi

    read -p "${newline}${green}Welcome back! Please enter the email address you use for GitHub, as found on your GitHub settings page:${clear} " email

    # If entered email is empty, keep asking for email
    while [[ -z ${email} ]]
    do
        read -p "${red}Looks like you entered nothing as your email. Please check your GitHub settings for the correct email and enter it here:${clear} " email
    done

    read -p "${green}Is ${email} the correct email address? Y/n:${clear} " response;echo
    if [[ ${response} =~ ^[Yy]$ ]]
    then
        echo -e "${lightblue}Great! I'll create an SSH key for you now... ${space_invader}${clear}"
        ssh-keygen -t rsa -N "" -f ~/.ssh/id_rsa -C ${email}
        sleep 2
        read -p "${lightblue}${check_mark} Done! (return)${clear}"
    else
        read -p "${red}Last chance: what is the email address you use for Github? Double check you typed it in correctly before hitting return:${clear} " email
        read -p "${lightblue}Finally! ${sweat_smile} I'll create an SSH key for you now. ${space_invader} (return)${clear}"
        ssh-keygen -t rsa -N "" -f ~/.ssh/id_rsa -C ${email}
    fi
fi

# Copy the SSH Key to the clipboard
# WARNING - not sure if the nested IF below will work correctly
if [[ $OSTYPE == darwin* ]]
then
    pbcopy < ~/.ssh/id_rsa.pub
elif [[ $OSTYPE == linux* ]]
then
    if clip.exe < ~/.ssh/id_rsa.pub
    then
        echo
    else
        xclip -selection clipboard -in ~/.ssh/id_rsa.pub
        echo
    fi
fi

echo -e "${lightblue}I copied your new SSH key to your clipboard for you"
echo -e "Next, you'll need to add it to your GitHub SSH keys"
echo -e "In a minute, I'm going to open the browser again for you "
echo -e "Here's what you're going to do on your end (it's pretty easy):"
echo -e "The browser will open to the 'new SSH key' page on GitHub"
echo -e "For the \"Title\" field, put something like \"David's 2016 Macbook Pro\""
echo -e "(You can put anything here that will remind you in the future which computer this SSH key is tied to)"
echo -e "Then simply paste (⌘/ctrl + V) the SSH key (which is already copied for you) into the 'Key' input box and hit the green 'Add SSH key' button"
echo -e "Make sure to come back here once you've added your SSH key${clear}"
read -p "${green}Alright, I think you're ready. ${rocket} Opening the browser now (return)${clear}"

# Open Github to new SSH Key page
if [[ $OSTYPE == darwin* ]]
then
    /usr/bin/open https://github.com/settings/ssh/new
elif [[ $OSTYPE == linux* ]]
then
    xdg-open https://github.com/settings/ssh/new
fi

echo
echo -e "${lightblue}Welcome back again! How did that go? It wasn't too bad, was it?"
echo -e "If you happened to get an error that said the SSH key is already in use, that's not a problem and you're all set!)"
echo

# Install Homebrew
echo -e "Next we're going to install Homebrew, a really awesome package manager"
echo -e "Basically it's a great tool for installing developer-y programs to your computer"
echo -e "This step can sometimes take awhile to finish"
echo -e "Hit return to start the install, then follow any directions you're given"
echo -e "(like hitting RETURN and entering your password. And remember, it won't look like your password is typing, but it is)"
echo -e "then just patiently wait until you see the next blue text. ${hourglass}${clear}"
read -p "${green}Once you see the next blue text, you're ready to move on! K, let's do this. (return)${clear}"
echo
echo -e "${lightblue}Installing Homebrew...${clear}"

/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"

if [[ $OSTYPE == linux* ]]
then
    test -d ~/.linuxbrew && eval $(~/.linuxbrew/bin/brew shellenv)
    test -d /home/linuxbrew/.linuxbrew && eval $(/home/linuxbrew/.linuxbrew/bin/brew shellenv)

    if grep -Fq '/bin/brew shellenv' ~/.bash_profile
    then
        echo "Linuxbrew setup lines are already in the ~/.bash_profile file. Skipping..."
    else
        test -r ~/.bash_profile && echo "eval \$($(brew --prefix)/bin/brew shellenv)${newline}" >>~/.bash_profile
    fi

    if grep -Fq '/bin/brew shellenv' ~/.profile
    then
        echo "Linuxbrew setup lines are already in the ~/.profile file. Skipping..."
    else
        echo "eval \$($(brew --prefix)/bin/brew shellenv)${newline}" >>~/.profile
    fi 
fi

read -p "${lightblue}Done! Let's move on ${rocket} (return)${newline}"

# Install and set up NVM
echo -e "Now I'm going to install NVM, which stands for the Node Version Manager"
echo -e "It makes installing and managing Node.js very easy"
echo -e "(It's okay if you're not sure what Node.js is, you'll learn all that in great detail later)${clear}"
read -p "${green}Hit return to start the install. Remember to wait until you see the blue text again! (return)${clear}"
echo
echo -e "${lightblue}Installing NVM...${clear}"

# Install NVM according to https://github.com/nvm-sh/nvm#install--update-script
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

mkdir -p ~/.zsh

if grep -Fq 'export NVM_DIR=' ~/.zshrc
then
    echo "NVM setup lines are already in the ~/.zshrc file. Skipping..."
else

echo "NVM setup lines are NOT YET in the ~/.zshrc. Setting up now..."
cat >> ~/.zshrc << EOL
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"${newline}
EOL

fi

if grep -Fq 'export NVM_DIR=' ~/.bash_profile
then
    echo "NVM setup lines are already in the ~/.bash_profile file. Skipping..."
else
echo "NVM setup lines are NOT YET in the ~/.bash_profile. Setting up now..."

cat >> ~/.bash_profile << EOL
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"${newline}
EOL

fi

# TODO: check if these are even necessary
source ~/.zshrc
source ~/.bash_profile

# Install node.js v14.16.0
echo -e "${lightblue}${sweat_smile} You're enjoying watching me do all the work, aren't you?"
echo -e "Now I'm going to use NVM to install Node.js v14.16.0 which works with Azure${clear}"
read -p "${green}Hit return to start the install (return)${clear}"
echo -e "${lightblue}Installing Node.js node. v14.16.0...${clear}"
nvm install v14.16.0 

# Set up the git config to have the right authors for commits

read -p "${green}Now I just need to configure a couple simple settings with Git (return)${clear}"
echo -e "${lightblue}Setting your name and email in your git config..."
git config --global user.name "${first_name} ${last_name}"
git config --global user.email "${email}"
sleep 2

# Install Git bash completion and change terminal prompt to include working dir and branch name
echo -e "Setting up git completion and branch in prompt...${clear}"

# Add git bash completion scripts to bash_profile
if grep -Fq '# Git tab completion' ~/.bash_profile
then
    echo "Git tab completion code is already in the ~/.bash_profile file. Skipping..."
else

echo "Git tab completion code is NOT YET in the ~/.bash_profile. Setting up now..."
cat >> ~/.bash_profile << EOL
# Git tab completion
if [ -f ~/.git-completion.bash ]; then
  . ~/.git-completion.bash
fi

# Git branch in prompt
parse_git_branch() {
    git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/ (\1)/'
}

EOL

fi

# Update prompt in bash
if grep -Fq 'export PS1="\w\[\033[32m\]\' ~/.bash_profile
then
    echo "Prompt update code is already in the ~/.bash_profile file. Skipping..."
else
    echo "Prompt update code is NOT YET in the ~/.bash_profile file. Setting up now..."
    echo 'export PS1="\w\[\033[32m\]\$(parse_git_branch)\[\033[00m\] $ "' >> ~/.bash_profile
fi

# Update prompt in zsh
if grep -Fq 'autoload -Uz compinit && compinit' ~/.zshrc
then
    echo "Prompt update code is already in the ~/.zshrc file. Skipping..."
else
    echo "Prompt update code is NOT YET in the ~/.zshrc file. Setting up now..."
    echo 'export PROMPT="%B%F{blue}%~%f%b $ "' >> ~/.zshrc
    echo -e 'autoload -Uz compinit && compinit\n\n' >> ~/.zshrc
fi

# DONE!
echo -e "${lightblue}${sweat_smile} Alright! That's everything!"
echo -e "It's been nice working with you, ${first_name}!${clear}"
read -p "${green}The last thing you'll need to do is close out your Terminal window. The next time you open it, everything should be all set up for you! Now, go make the most of your time at Bit Project!${clear}"

