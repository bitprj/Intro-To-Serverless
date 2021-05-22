import re
import ast

weeks = []
responses = []
stepContent = {}
steps = {}

name = "# (.*)"
content = "(?<=\*)[^*]+(?=\*)"
with open(".bit/course-details.md", "r") as file:
  file = file.read()
  course_name = re.findall(name, file)[0]
  course_descr = re.findall(content, file)[0]

with open(".bit/.info", "r") as myfile:
  readList = ast.literal_eval(myfile.read())
  print(readList)
  responses = readList["responses"]
  weeks = readList["weeks"]

with open(".bit/.config", "r") as myfile:
  stepContent = ast.literal_eval(myfile.read())

for i in range(1,int(max(weeks))+1):
  count = 0
  for file in responses:
    if int(file[0]) == i:
        count += 1
  steps[i] = count

print("Steps", steps)
print(stepContent)
print(responses)

def createStep(week, title, descr, event, response, files, stepType, scripts):
  content = "    - title: 'Week %s: %s'\n      description: '%s'\n      event: %s\n      stepType: %s\n      actions:\n        - type: respond\n          with: %s\n          files: %s\n          scripts: %s\n" % (week, title, descr, event, stepType, response, files, scripts)
  return content

def createWorkStep(stepNo, count, script):
  content = "      - name: Step %s\n        if: ${{steps.vars.outputs.count == %s && github.event.head_commit.message != 'Update progress'}}\n        run: |\n          node .bit/tests/%s\n\n" %(stepNo, count, script)
  return content

def createActions():
  count = 0
  file = ""
  for i in range(int(max(weeks))):
    print(i)
    start = "name: Week %s\non:\n  push:\n    branches:\n      - week%s\n\njobs:\n  build:\n    runs-on: ubuntu-latest\n\n    steps:\n      - name: Checkout Code\n        uses: actions/checkout@v2\n\n      - name: Setup Node Environment\n        uses: actions/setup-node@v2\n        with:\n          node-version: '14'\n\n      - name: Get Count\n        id: vars\n        run: echo ::set-output name=count::$(cat ./.bit/.progress)\n\n" % (str(i+1), str(i+1))
    for y in range(steps[i+1]):
      if stepContent[responses[count]][3] == "checks":
        print("Week: "+str(i))
        print("Step: " + str(y))
        print(createWorkStep(str(y+1), count, stepContent[responses[count]][4]))
        start += createWorkStep(str(y+1), count, stepContent[responses[count]][4])
      count += 1
    with open(".bit/workflows/week%s.yml" % (str(i+1)), "w+") as myfile:
      myfile.write(start)

def writeyml():
  print("Creating the config.yml...")
  final = ""
  content = "title: %s\ndescription: >-\n    %s\ntemplate:\n    name: %s\n    repo: %s\nbefore:\n    - type: createIssue\n      title: Week 1\n      body: %s" % (course_name, course_descr, "learninglab-template", "your-learninglab-template", responses[0])
  count = 0
  for i in range(int(max(weeks))):
    for y in range(steps[i+1]):
      stepCat = ""

      if y == steps[i+1]-1:
        response = "feedback.md"
      else:
        response = responses[count+1]

      if stepContent[responses[count]][3] == "PRmerge":
        stepCat = "pull_request.closed"
      elif stepContent[responses[count]][3] == "checks":
        stepCat = "workflow_run.completed"
      elif stepContent[responses[count]][3] == "IssueComment" or stepContent[responses[count]][3] == "feedback":
        stepCat = "issue_comment.created"

      final += createStep(i+1, stepContent[responses[count]][0], stepContent[responses[count]][1], stepCat, response, stepContent[responses[count]][2], stepContent[responses[count]][3], stepContent[responses[count]][4])

      if y == steps[i+1]-1 and i == int(max(weeks)) - 1:
        final += "    - title: 'Week %s: Feedback'\n      description: Provide your feedback for Week %s!\n      event: issue_comment.created\n      stepType: IssueComment\n      actions:\n        - type: respond\n          with: %s\n        - type: closeIssue\n" % (i+1, i+1, str(i+1)+"-complete.md")
      elif y == steps[i+1]-1:
        final += "    - title: 'Week %s: Feedback'\n      description: Provide your feedback for Week %s!\n      event: issue_comment.created\n      stepType: IssueComment\n      actions:\n        - type: respond\n          with: %s\n        - type: createIssue\n          title: Week %s\n          body: %s\n        - type: closeIssue\n" % (i+1, i+1, str(i+1)+"-complete.md", i+2, responses[count+1])
      count += 1
  
  configyml = content + "\nsteps:\n" + final
  return configyml

try:
  with open(".bit/responses/feedback.md", "w+") as myfile:
    print("Creating response files...")
    myfile.write("## Providing Feedback\n\nWhat was confusing about this week? If you could change or add something to this week, what would you do? Your feedback is valued and appreciated!")

  for i in range(1,int(max(weeks))+1):
    with open(".bit/responses/" + str(i) + "-complete.md", "w+") as response:
      if i == int(max(weeks)):
        response.write("That's it for Week %s! Great job on finishing the course!" % str(i))
      else:
        response.write("That's it for Week %s, move on to Week %s in your new issue!" % (str(i), str(i + 1)))

  with open(".bit/config.yml", "w+") as file:
    file.write(writeyml())

  createActions()
  
except:
  raise Exception("[ERROR] Was not able to create response and/or config.yml files. Refer to errors in previous steps for guidance.")
