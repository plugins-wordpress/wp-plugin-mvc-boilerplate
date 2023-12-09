
for file in *; do mv "$file" "${file%.html}.ejs"; done


for file in *.ejs; do mv "$file" "${file%.ejs}.njk"; done
