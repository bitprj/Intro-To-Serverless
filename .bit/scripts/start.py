import os

responses = sorted(os.listdir(".bit/responses"))

total = {}
weeks = []
rm = []

try:
#  determining number of weeks
  for file in responses:
    if file[-12:] == "-complete.md" and len(file) <= 14:
      rm.append(file)
    elif file[0].isnumeric():
      weeks.append(file[0])
    else:
      rm.append(file)

  for delete in rm:
    responses.remove(delete)

  with open(".bit/.info", "w+") as myfile:
    total["responses"] = responses
    total["weeks"] = weeks
    print(total)
    myfile.write(str(total))

except:
  raise Exception("-------------------------\n[ERROR] Syncing was not successful. Please check your filenames and ensure that they adhere to the specified format.\n-------------------------")