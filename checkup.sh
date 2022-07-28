#!/bin/bash

nodev=$(node -v);
funcv=$(func -v);

echo "🛑 Note: If you've installed node and Azure Functions Core Tools but this script is still saying you haven't, please restart your terminal and run the script again."
echo "\n"
echo "--------------------------------";
echo "Checking if node is installed...";
echo "--------------------------------";
if [[ $nodev ]]
then
    if [[ ${nodev:1:2} -lt 14 ]]
    then
        echo "❗️ Your node version is $nodev, which is out of maintenance.";
        echo "Please upgrade your node version to at least version 14.x";
        echo "https://nodejs.org/en/download/";
        echo "Run this script again after to continue.";
        exit
    else
        echo "✅ Node $nodev is installed, skipping...";
    fi
else
    echo "❗️ Node is not installed.";
    echo "Please install node here: https://nodejs.org/en/download/";
    echo "Run this script again after to continue.";
    exit
fi

echo "\n"
echo "------------------------------------------------------";
echo "Checking if Azure Functions Core Tools is installed...";
echo "------------------------------------------------------";
if [[ $funcv ]]
then
    if [[ ${funcv:0:1} < 3 ]]
    then
        echo "❗️ Please upgrade your Azure Functions Core Tools version to version 4.";
        echo "Follow this link to learn how to: https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local?tabs=v4%2Clinux%2Ccsharp%2Cportal%2Cbash#changing-core-tools-versions";
        echo "Run this script again after to continue.";
        exit
    fi
    echo "✅ Azure Function Core Tools v$funcv is installed, skipping...";
else
    echo "❌ Azure Function Core Tools is not installed.";
    echo "Please install it here: https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local?tabs=v4%2Clinux%2Ccsharp%2Cportal%2Cbash#install-the-azure-functions-core-tools";
    echo "Run this script again after to continue.";
    exit
fi

echo "\n"
echo "---------------------------------------"
echo "Checking if versions are compatible..."
echo "---------------------------------------"
if [[ (${nodev:1:2} == "16" || ${nodev:1:2} == "14") && (${funcv:0:1} == "4") ]]
then
    echo "✅ Compatible versions! You are good to go.";
elif [[ (${nodev:1:2} == "14") && (${funcv:0:1} == "3") ]]
then
    echo "✅ Compatible versions! You are good to go.";
elif [[ ${funcv:0:1} == "3" ]]
then
    echo "❗️ Your node version is $nodev but your Azure Core Tools version is $funcv";
    echo "Please upgrade your Azure Core Tools version to version 4.x";
    echo "Follow this link to learn how to: https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local?tabs=v4%2Clinux%2Ccsharp%2Cportal%2Cbash#changing-core-tools-versions";
    echo "Run this script again after to continue.";
fi