print("working")
import os
unm = os.environ['USERNAME']
print(unm)
filename = "test.txt"
with open(filename, 'w') as file:
  file.write('hi')
print('test output')
