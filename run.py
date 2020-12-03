print("working")
# import os
# unm = os.environ['USERNAME']
# print(unm)
filename = "mydir/test.txt"
with open(filename, 'w') as file:
  file.write('hi')
filename = "mydir/test2.txt"
with open(filename, 'w') as file:
  file.write('hi2')
