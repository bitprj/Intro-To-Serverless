import re
import ast

weeks = []
responses = []
steps = {}

with open(".bit/.info", "r") as myfile:
  readList = ast.literal_eval(myfile.read())
  print(readList)
  responses = readList["responses"]
  weeks = readList["weeks"]
  nweeks = int(max(weeks))
  print("Number of weeks:", nweeks)

# determining number of steps per week
for i in range(1,nweeks+1):
  count = 0
  for file in responses:
    if int(file[0]) == i:
        count += 1
  steps[i] = count

print("Number of steps each week:", steps)

try:
  # determining course name and description
  name = "# (.*)"
  content = "(?<=\*)[^*]+(?=\*)"
  with open(".bit/course-details.md", "r") as file:
    file = file.read()
    course_name = re.findall(name, file)[0]
    course_descr = re.findall(content, file)[0]
except:
  raise Exception("-------------------------\n[WARNING] Syncing was not successful. Please check your 'course-details.md' file and make sure it adheres to the specified format.\n-------------------------")

print("Course name: " + course_name + "\n" + "Course description: " + course_descr)

try:
  # determining step names and descriptions
  stepContent = {}
  for i in responses:
    with open(".bit/responses/" + i, "r") as file:
      title = "## (.*)"
      des = "### (.*)"
      move = "files: (.*)"
      stepType = "stepType: (.*)"
      scripts = "scripts: (.*)"
      file = file.read()
      step_name = re.findall(title, file)[0]
      step_descr = re.findall(des, file)[0]
      step_move = re.findall(move, file)[0].split(", ")
      step_type = re.findall(stepType, file)[0]
      step_scripts = re.findall(scripts, file)[0]
      stepContent[i] = [step_name, step_descr, step_move, step_type, step_scripts]

  print("Step data: ", stepContent)
  
  with open(".bit/.config", "w+") as myfile:
    myfile.write(str(stepContent))
except:
  raise Exception("-------------------------\n[WARNING] Syncing was not successful. Please check your response files and ensure that the content adheres with the specified format.\n-------------------------")
