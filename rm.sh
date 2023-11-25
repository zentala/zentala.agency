#!/bin/bash

# Ścieżka do Twojego pliku JSON
FILE_PATH="src/intl/pl.json"

jq . $FILE_PATH 2>&1 | grep -oE 'parse error: .+ at line [0-9]+, column [0-9]+'
